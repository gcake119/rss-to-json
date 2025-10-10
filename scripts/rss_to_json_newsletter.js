// scripts/rss_to_json_newsletter.js
// 用法：node scripts/rss_to_json_newsletter.js --feed "<RSS_URL>" --out data/newsletter/newsletter_1
import fs from 'fs';
import path from 'path';
import process from 'process';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { formatISO } from 'date-fns';

// 讀參數
const args = process.argv.slice(2);
const FEED_URL = getArg('--feed') || process.env.FEED_URL;
const OUT_DIR = getArg('--out') || 'data/newsletter';
if (!FEED_URL) {
  console.error('FEED_URL is required. Use --feed "<url>" or set env FEED_URL');
  process.exit(1);
}
await ensureDir(OUT_DIR);

// 1) 拉取 RSS
const xml = await (await fetch(FEED_URL)).text();

// 2) 解析 XML
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  cdataPropName: 'cdata'
});
const rss = parser.parse(xml);

// Substack 多為 RSS 2.0，結構為 rss.channel.item[]
const channel = rss?.rss?.channel || {};
const items = Array.isArray(channel.item) ? channel.item : (channel.item ? [channel.item] : []);

// 3) 組 show 層
const channelImage = channel?.image?.url || null;
const show = {
  title: textOf(channel.title),
  description_html: htmlOf(channel.description),
  link: textOf(channel.link),
  image: channelImage,
  language: textOf(channel.language) || 'zh-TW',
  updated_at: toISO(textOf(channel.lastBuildDate)) || formatISO(new Date())
};

// 4) 逐篇轉成單篇 JSON（僅新增或變更才寫檔）
const summaries = [];

for (const it of items) {
  // 基本欄位
  const guid = textOf(it.guid?.cdata || it.guid?._ || it.guid) || genGUID(it);
  const title = textOf(it.title);
  const link = textOf(it.link);
  const pubISO = toISO(textOf(it.pubDate)) || formatISO(new Date());
  const author = textOf(it['dc:creator']) || textOf(channel['managingEditor']) || null;

  // HTML 內容：優先 content:encoded，否則 description
  const descriptionHTML = htmlOf(it['content:encoded']) || htmlOf(it.description) || '';
  const descriptionText = toText(descriptionHTML);

  // Hero/cover：Substack 常在 description 或 content 內第一張 <img>
  const cover = extractFirstImage(descriptionHTML) || channelImage;

  // Voiceover/Audio：Substack 若附音訊，多見於 enclosure 或內容中 a/audio 標籤
  const voiceover = detectVoiceover(it, descriptionHTML);

  // 文章檔名：以日期+slug 或 guid 命名
  const slug = buildSlug(title, link, guid);
  const filename = filenameFromDateSlug(pubISO, slug);
  const outPath = path.join(OUT_DIR, filename);

  // 單篇 JSON 結構
  const article = {
    id: guid,
    slug,
    title,
    author,
    pub_date: pubISO,
    link,
    cover,
    voiceover, // 若有音訊，格式詳見 detectVoiceover 回傳
    content_html: descriptionHTML,
    content_text: descriptionText,
    tags: extractCategories(channel, it),
    show,
    updated_at: formatISO(new Date())
  };

  // checksum：核心欄位
  const checksum = computeChecksum({
    title, pub_date: pubISO, link, cover, voiceover, content_html: descriptionHTML
  });
  article.meta = { checksum };

  // 寫檔策略：不存在→寫；存在→checksum 不同才覆寫
  const needWrite = await shouldWrite(outPath, checksum);
  if (needWrite) {
    await fs.promises.writeFile(outPath, JSON.stringify(article, null, 2), 'utf8');
    console.log(`Wrote article: ${filename}`);
  } else {
    console.log(`Skip (no change): ${filename}`);
  }

  // 摘要供 index 用
  summaries.push({
    id: guid,
    slug,
    title,
    pub_date: pubISO,
    link,
    cover,
    has_voiceover: !!(voiceover && voiceover.url),
    permalink: `#newsletter/${slug}`
  });
}

// 5) 重建 index 分頁（每次覆蓋）
summaries.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
const pageSize = 10;
const total = summaries.length;
const totalPages = Math.max(1, Math.ceil(total / pageSize));

for (let p = 1; p <= totalPages; p++) {
  const slice = summaries.slice((p - 1) * pageSize, p * pageSize);
  const index = {
    type: 'newsletter',
    page: p,
    page_size: pageSize,
    total_items: total,
    total_pages: totalPages,
    updated_at: formatISO(new Date()),
    items: slice
  };
  const file = path.join(OUT_DIR, `index-p${p}.json`);
  await fs.promises.writeFile(file, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Rebuilt index: index-p${p}.json`);
}

console.log('Substack RSS → JSON done.');

function getArg(k) {
  const i = args.indexOf(k);
  if (i >= 0) return args[i + 1];
  return null;
}
function textOf(v) {
  if (!v) return null;
  if (typeof v === 'string') return v;
  if (v.cdata) return v.cdata;
  if (v._) return v._;
  return String(v);
}
function htmlOf(v) {
  const t = textOf(v);
  return t || '';
}
function toISO(rfc822) {
  if (!rfc822) return null;
  const d = new Date(rfc822);
  if (isNaN(d)) return null;
  return formatISO(d);
}
function toText(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+\n/g, '\n')
    .trim();
}
function computeChecksum(obj) {
  const json = JSON.stringify(obj);
  return crypto.createHash('sha256').update(json).digest('hex');
}
async function shouldWrite(filePath, newChecksum) {
  try {
    const exists = fs.existsSync(filePath);
    if (!exists) return true;
    const cur = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    const old = cur?.meta?.checksum || null;
    return old !== newChecksum;
  } catch {
    return true;
  }
}
async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}
function buildSlug(title, link, guid) {
  // 優先用 link 的最後一段（Substack 文章 slug），退而求其次用標題或 guid
  const fromLink = (() => {
    try {
      if (!link) return null;
      const u = new URL(link);
      const parts = u.pathname.split('/').filter(Boolean);
      return parts[parts.length - 1] || null;
    } catch { return null; }
  })();
  const base = fromLink || title || guid;
  return String(base)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || String(guid);
}
function filenameFromDateSlug(iso, slug) {
  // 2025-08-12_companion-squad.json
  const d = iso ? new Date(iso) : new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${dd}_${slug}.json`;
}
function extractFirstImage(html) {
  const m = html.match(/<img\s[^>]*src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}
function extractCategories(ch, it) {
  const toArr = v => (Array.isArray(v) ? v : v ? [v] : []);
  const a = toArr(ch.category).map(textOf);
  const b = toArr(it.category).map(textOf);
  return [...new Set([...a, ...b].filter(Boolean))];
}
function detectVoiceover(item, html) {
  // 1) RSS <enclosure type="audio/*">
  if (item.enclosure && /^audio\//i.test(item.enclosure.type || '')) {
    return {
      url: item.enclosure.url || null,
      type: item.enclosure.type || null,
      bytes: item.enclosure.length ? parseInt(item.enclosure.length, 10) || null : null,
      source: 'enclosure'
    };
  }
  // 2) 常見自定欄位（若有）
  const vo = item.voiceover || item['x-voiceover'] || item['podcast:audio'];
  if (vo && (vo.url || vo.href)) {
    return {
      url: vo.url || vo.href,
      type: vo.type || 'audio/mpeg',
      bytes: vo.length ? parseInt(vo.length, 10) || null : null,
      source: 'custom'
    };
  }
  // 3) 內容中的音訊連結（簡單偵測）
  const m = html.match(/https?:\/\/[^\s"'<>]+\.mp3\b/);
  if (m) {
    return {
      url: m[0],
      type: 'audio/mpeg',
      bytes: null,
      source: 'content'
    };
  }
  return null;
}
function genGUID(it) {
  const base = `${textOf(it.title) || ''}-${textOf(it.pubDate) || ''}-${textOf(it.link) || ''}`;
  return crypto.createHash('md5').update(base).digest('hex');
}

