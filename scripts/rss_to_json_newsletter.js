// scripts/rss_to_json_newsletter.js
// Usage:
// node scripts/rss_to_json_newsletter.js --feed "https://wwhowbuhow.substack.com/feed" --out "data/newsletter/newsletter_1"

import fs from 'fs';
import path from 'path';
import process from 'process';
import fetch from 'node-fetch';
import FeedParser from 'feedparser';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { formatISO } from 'date-fns';

const args = process.argv.slice(2);
const FEED_URL = getArg('--feed') || process.env.FEED_URL;
const OUT_DIR = getArg('--out') || 'data/newsletter';
if (!FEED_URL) {
  console.error('FEED_URL is required. Use --feed "<url>" or env FEED_URL');
  process.exit(1);
}
await ensureDir(OUT_DIR);

// 1) 抓取 RSS，附帶 User-Agent/Accept 以避免 403
const res = await fetch(FEED_URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Node.js CI Fetcher; +https://github.com/actions)',
    'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8'
  }
});
if (!res.ok) {
  console.error('Fetch failed:', res.status, res.statusText);
  process.exit(1);
}
const stream = res.body;

// 2) 用 feedparser 解析
const feedparser = new FeedParser();
const items = await new Promise((resolve, reject) => {
  const acc = [];
  feedparser.on('readable', function () {
    let item;
    while ((item = this.read())) {
      acc.push(item);
    }
  });
  feedparser.on('meta', function(meta) {
    // 可視需要保留 meta
  });
  feedparser.on('end', () => resolve(acc));
  feedparser.on('error', reject);
  stream.pipe(feedparser);
});

// 3) show（channel/meta）
const meta = feedparser.meta || {};
const show = {
  title: meta.title || null,
  author: meta.author || meta.creator || null,
  link: meta.link || null,
  image: meta.image?.url || null,
  language: meta.language || 'zh-TW',
  updated_at: formatISO(new Date())
};

// 4) 逐篇轉 json
const summaries = [];

for (const it of items) {
  const guid = it.guid || it.link || hash(`${it.title}-${it.date}-${it.link}`);
  const title = it.title || null;
  const link = it.link || null;
  const pubISO = it.date ? formatISO(new Date(it.date)) : formatISO(new Date());
  const author = it.author || it.creator || show.author || null;

  // 內容：優先 description（feedparser 會將 content:encoded/description 解析到這些欄位）
  const contentHTML = it.description || it.summary || '';
  const contentText = toText(contentHTML);

  // 封面圖：HTML 中第一張圖，退回 show.image
  const cover = extractFirstImage(contentHTML) || show.image || null;

  // voiceover：enclosures 或內容中的 .mp3
  const voiceover = detectVoiceover(it, contentHTML);

  // tags：categories
  const tags = Array.isArray(it.categories) ? it.categories.filter(Boolean) : [];

  // slug：link 最後段或 guid
  const slug = buildSlug(title, link, guid);

  // 檔名：YYYY-MM-DD_slug.json
  const filename = filenameFromDateSlug(pubISO, slug);
  const outPath = path.join(OUT_DIR, filename);

  // 單篇 JSON
  const article = {
    id: guid,
    title,
    author,
    pub_date: pubISO,
    slug,
    link,
    cover,
    voiceover,
    tags,
    content_html: contentHTML,
    content_text: contentText,
    show,
    updated_at: formatISO(new Date())
  };

  // checksum 判斷差異
  const checksum = computeChecksum({
    title, pub_date: pubISO, link, cover, voiceover, content_html: contentHTML
  });
  article.meta = { checksum };

  // 新增或變更才覆寫
  const needWrite = await shouldWrite(outPath, checksum);
  if (needWrite) {
    await fs.promises.writeFile(outPath, JSON.stringify(article, null, 2), 'utf8');
    console.log(`Wrote: ${filename}`);
  } else {
    console.log(`Skip (no change): ${filename}`);
  }

  // 摘要（列表用）
  summaries.push({
    id: guid,
    slug,
    title,
    pub_date: pubISO,
    link,
    cover,
    has_voiceover: !!(voiceover && voiceover.url),
    tags,
    permalink: `#newsletter/${slug}`
  });
}

// 5) 重建 index 分頁（每次覆蓋）
summaries.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
const pageSize = 10;
const total = summaries.length;
const totalPages = Math.max(1, Math.ceil(total / pageSize));

for (let p = 1; p <= Math.max(1, totalPages); p++) {
  const slice = summaries.slice((p - 1) * pageSize, p * pageSize);
  const index = {
    type: 'newsletter',
    page: p,
    page_size: pageSize,
    total_items: total,
    total_pages: Math.max(1, totalPages),
    updated_at: formatISO(new Date()),
    items: slice
  };
  const file = path.join(OUT_DIR, `index-p${p}.json`);
  await fs.promises.writeFile(file, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Rebuilt index: index-p${p}.json`);
}

console.log('Substack RSS → JSON (feedparser + UA) done');


// --------------- Helpers ---------------
function getArg(k) {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : null;
}
async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}
function toText(html) {
  return sanitizeHtml(html || '', { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+\n/g, '\n')
    .trim();
}
function extractFirstImage(html) {
  const m = (html || '').match(/<img\s[^>]*src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}
function buildSlug(title, link, guid) {
  const fromLink = (() => {
    try {
      if (!link) return null;
      const u = new URL(link);
      const parts = u.pathname.split('/').filter(Boolean);
      return parts[parts.length - 1] || null;
    } catch { return null; }
  })();
  const base = fromLink || title || guid;
  return String(base).toLowerCase()
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || String(guid);
}
function filenameFromDateSlug(iso, slug) {
  const d = iso ? new Date(iso) : new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${dd}_${slug}.json`;
}
function detectVoiceover(item, html) {
  if (Array.isArray(item.enclosures)) {
    const audio = item.enclosures.find(e => /^audio\//i.test(e.type || '') && e.url);
    if (audio) {
      return {
        url: audio.url,
        type: audio.type || 'audio/mpeg',
        bytes: audio.length ? parseInt(audio.length, 10) || null : null,
        source: 'enclosure'
      };
    }
  }
  const m = (html || '').match(/https?:\/\/[^\s"'<>]+\.mp3\b/);
  if (m) return { url: m[0], type: 'audio/mpeg', bytes: null, source: 'content' };
  return null;
}
function computeChecksum(obj) {
  return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}
async function shouldWrite(filePath, newChecksum) {
  try {
    if (!fs.existsSync(filePath)) return true;
    const cur = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    return (cur?.meta?.checksum || null) !== newChecksum;
  } catch { return true; }
}
function hash(s) {
  return crypto.createHash('md5').update(String(s)).digest('hex');
}
