// scripts/rss_to_json_newsletter_substack.js
// Usage:
// node scripts/rss_to_json_newsletter_substack.js --feed "https://wwhowbuhow.substack.com/feed" --out "data/newsletter/newsletter_1"

import fs from 'fs';
import path from 'path';
import process from 'process';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { formatISO } from 'date-fns';

// --------------- CLI ---------------
const args = process.argv.slice(2);
const FEED_URL = getArg('--feed') || process.env.FEED_URL;
const OUT_DIR = getArg('--out') || 'data/newsletter';
if (!FEED_URL) {
  console.error('FEED_URL is required. Use --feed "<url>" or env FEED_URL');
  process.exit(1);
}
await ensureDir(OUT_DIR);

// --------------- Fetch & Parse ---------------
const xml = await (await fetch(FEED_URL)).text();
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  cdataPropName: 'cdata',
  ignoreNameSpace: true   // 關鍵：忽略命名空間前綴，讓 content:encoded / dc:creator 變成普通 key
});
const rss = parser.parse(xml);

// 兼容多層結構，確保能拿到 channel 與 item
const channel = rss?.rss?.channel || rss?.channel || {};
let items = [];
if (Array.isArray(channel.item)) items = channel.item;
else if (channel.item) items = [channel.item];
else items = [];

// Debug（必要時打開）
// console.log('items.length =', items.length);
// if (items.length === 0) {
//   console.log('Parsed channel =', JSON.stringify(channel, null, 2).slice(0, 4000));
// }

// Channel-level fallbacks
const channelImage = channel?.image?.url || null;
const show = {
  title: textOf(channel.title),
  author: textOf(channel['itunes:author']) || textOf(channel['googleplay:author']) || textOf(channel['dc:creator']) || textOf(channel.copyright),
  link: textOf(channel.link),
  image: channelImage,
  language: textOf(channel.language) || 'zh-TW',
  updated_at: toISO(textOf(channel.lastBuildDate)) || formatISO(new Date())
};

// --------------- Convert Items ---------------
const summaries = [];

for (const it of items) {
  // 以 namespace 已忽略為前提，以下 key 都是簡名（無冒號）
  const guid = textOf(it?.guid?.cdata || it?.guid?._ || it?.guid) || genGUID(it);
  const title = textOf(it?.title);
  const link = textOf(it?.link);
  const pubISO = toISO(textOf(it?.pubDate)) || formatISO(new Date());
  const author = textOf(it?.['dc:creator']) || textOf(it?.creator) || show.author;

  // Prefer content:encoded > description
  const contentHTML = htmlOf(it?.['content:encoded']) || htmlOf(it?.description) || '';
  const contentText = toText(contentHTML);

  // Cover image: prefer first <img> in content; fallback channel image
  const cover = extractFirstImage(contentHTML) || channelImage;

  // Voiceover: enclosure audio > first .mp3 in content
  const voiceover = detectVoiceover(it, contentHTML);

  // Tags: combine channel/item category
  const tags = extractTags(channel, it);

  // Slug from link last segment, fallback guid
  const slug = buildSlug(title, link, guid);

  // Filename: YYYY-MM-DD_slug.json
  const filename = filenameFromDateSlug(pubISO, slug);
  const outPath = path.join(OUT_DIR, filename);

  // JSON object
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

  // Checksum on sensitive fields
  const checksum = computeChecksum({
    title, pub_date: pubISO, link, cover, voiceover, content_html: contentHTML
  });
  article.meta = { checksum };

  // Write policy: new or changed only
  const needWrite = await shouldWrite(outPath, checksum);
  if (needWrite) {
    await fs.promises.writeFile(outPath, JSON.stringify(article, null, 2), 'utf8');
    console.log(`Wrote: ${filename}`);
  } else {
    console.log(`Skip (no change): ${filename}`);
  }

  // Summary for index
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

// --------------- Build index pages (always rebuild) ---------------
summaries.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
const pageSize = 10;
const total = summaries.length;
const totalPages = Math.max(1, Math.ceil(total / pageSize));

// 若無項目，仍產生 index-p1.json，方便前端處理
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

console.log('Substack RSS → JSON done');


// --------------- Helpers ---------------
function getArg(k) { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; }
function textOf(v) { if (v === null || v === undefined) return null; if (typeof v === 'string') return v; if (v?.cdata) return v.cdata; if (v?._) return v._; return String(v); }
function htmlOf(v) { return textOf(v) || ''; }
function toISO(rfc822) { if (!rfc822) return null; const d = new Date(rfc822); if (isNaN(d)) return null; return formatISO(d); }
function toText(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+\n/g, '\n')
    .trim();
}
function computeChecksum(obj) { return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex'); }
async function shouldWrite(filePath, newChecksum) {
  try {
    if (!fs.existsSync(filePath)) return true;
    const cur = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    return (cur?.meta?.checksum || null) !== newChecksum;
  } catch { return true; }
}
async function ensureDir(dir) { await fs.promises.mkdir(dir, { recursive: true }); }
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
  return String(base).toLowerCase().replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 80) || String(guid);
}
function filenameFromDateSlug(iso, slug) {
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
function extractTags(ch, it) {
  const toArr = v => (Array.isArray(v) ? v : v ? [v] : []);
  const a = toArr(ch?.category).map(textOf);
  const b = toArr(it?.category).map(textOf);
  return [...new Set([...a, ...b].filter(Boolean))];
}
function detectVoiceover(item, html) {
  // enclosure audio
  const enc = item?.enclosure;
  if (enc && /^audio\//i.test(enc.type || '')) {
    return {
      url: enc.url || null,
      type: enc.type || null,
      bytes: enc.length ? parseInt(enc.length, 10) || null : null,
      source: 'enclosure'
    };
    }
  // content 中的 mp3
  const m = (html || '').match(/https?:\/\/[^\s"'<>]+\.mp3\b/);
  if (m) {
    return { url: m[0], type: 'audio/mpeg', bytes: null, source: 'content' };
  }
  return null;
}
function genGUID(it) {
  const base = `${textOf(it?.title) || ''}-${textOf(it?.pubDate) || ''}-${textOf(it?.link) || ''}`;
  return crypto.createHash('md5').update(base).digest('hex');
}
