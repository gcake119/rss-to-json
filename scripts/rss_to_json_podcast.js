// scripts/rss_to_json.js
import fs from 'fs';
import path from 'path';
import process from 'process';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { parse } from 'node:path';
import { formatISO, parse as parseDate } from 'date-fns';

// CLI args
const args = process.argv.slice(2);
const FEED_URL = getArg('--feed') || process.env.FEED_URL;
const OUT_DIR = getArg('--out') || 'data/podcast';
if (!FEED_URL) {
  console.error('FEED_URL is required. Use --feed or env FEED_URL');
  process.exit(1);
}

await ensureDir(OUT_DIR);

// 1) Fetch RSS
const xml = await (await fetch(FEED_URL)).text();

// 2) Parse XML
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  cdataPropName: 'cdata',
  preserveOrder: false
});
const rss = parser.parse(xml);

// 3) Normalize channel/items
const channel = rss.rss?.channel || {};
const items = Array.isArray(channel.item) ? channel.item : (channel.item ? [channel.item] : []);

// Helper: get channel-level fallbacks
const channelImage =
  channel['itunes:image']?.href ||
  channel.image?.url ||
  null;

const show = {
  id: channel['atom:link']?.href?.split('/').pop() || 'show',
  title: textOf(channel.title),
  author: textOf(channel['itunes:author'] || channel.author),
  image: channelImage,
  link: textOf(channel.link),
  language: textOf(channel.language)
};

// 4) Convert items to episode JSON
const episodes = [];
for (const it of items) {
  const guid = textOf(it.guid?.cdata || it.guid?._ || it.guid) || genGUID(it);
  const title = textOf(it.title);
  const pubDateRaw = textOf(it.pubDate);
  const pubISO = toISO(pubDateRaw);
  const durationRaw = valOf(it['itunes:duration']);
  const duration = normalizeDuration(durationRaw);
  const season = toInt(valOf(it['itunes:season']));
  const episode = toInt(valOf(it['itunes:episode']));
  const episodeType = valOf(it['itunes:episodeType']) || 'full';
  const explicit = toBool(valOf(it['itunes:explicit']));

  const enclosure = it.enclosure || {};
  const audio = {
    url: enclosure.url || null,
    type: enclosure.type || null,
    bytes: toInt(enclosure.length)
  };

  const image =
    it['itunes:image']?.href ||
    channelImage ||
    null;

  // Prefer content:encoded > description
  const descHTML =
    htmlOf(it['content:encoded']) ||
    htmlOf(it.description) ||
    '';

  const descText = sanitizeHtml(descHTML, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+\n/g, '\n')
    .trim();

  const permalink = textOf(it.link);

  const quarter = calcQuarter(pubISO);
  const filename = buildFilename(quarter, season, episode, pubISO, guid); // 2025Q3e03.json as first choice
  const outPath = path.join(OUT_DIR, filename);

  // Build episode JSON
  const episodeJson = {
    id: guid,
    guid,
    title,
    author: show.author || null,
    pub_date: pubISO,
    season: season || null,
    episode: episode || null,
    quarter,
    episode_type: episodeType,
    duration,
    audio,
    image,
    permalink,
    description_html: descHTML,
    description_text: descText,
    tags: channelCategoryList(channel),
    show: {
      id: show.id,
      title: show.title,
      author: show.author,
      image: show.image,
      link: show.link
    },
    updated_at: formatISO(new Date())
  };

  // Compute checksum for selected fields
  const checksum = computeChecksum({
    title, pub_date: pubISO, duration, audio, image, description_html: descHTML
  });
  episodeJson.meta = { checksum };

  // Write policy: new only, or overwrite if diff
  const needWrite = await shouldWrite(outPath, checksum);
  if (needWrite) {
    await fs.promises.writeFile(outPath, JSON.stringify(episodeJson, null, 2), 'utf8');
    console.log(`Wrote: ${filename}`);
  } else {
    console.log(`Skip (no change): ${filename}`);
  }

  // Push to summary
  episodes.push({
    slug: filename.replace(/\.json$/, ''),
    id: guid,
    title,
    pub_date: pubISO,
    duration,
    image,
    audio: { url: audio.url, type: audio.type },
    permalink: `#podcast/${safeId(guid)}`
  });
}

// 5) Build index pages (always rebuild)
episodes.sort((a, b) => (new Date(b.pub_date) - new Date(a.pub_date)));
const pageSize = 10;
const total = episodes.length;
const totalPages = Math.max(1, Math.ceil(total / pageSize));

for (let p = 1; p <= totalPages; p++) {
  const slice = episodes.slice((p - 1) * pageSize, p * pageSize);
  const index = {
    type: 'podcast',
    show,
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

// 6) Done
console.log('RSS→JSON done');

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
function valOf(v) {
  return textOf(v);
}
function htmlOf(v) {
  const t = textOf(v);
  if (!t) return '';
  return t;
}
function toISO(rfc822) {
  if (!rfc822) return null;
  const d = new Date(rfc822);
  if (isNaN(d)) return null;
  return formatISO(d);
}
function toInt(s) {
  if (s === null || s === undefined) return null;
  const n = parseInt(String(s), 10);
  return isNaN(n) ? null : n;
}
function toBool(s) {
  if (s === null || s === undefined) return null;
  const t = String(s).toLowerCase();
  if (t === 'yes' || t === 'true' || t === '1') return true;
  if (t === 'no' || t === 'false' || t === '0') return false;
  return null;
}
function normalizeDuration(raw) {
  if (!raw) return null;
  const str = String(raw).trim();
  if (/^\d+$/.test(str)) {
    const sec = parseInt(str, 10);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const pad = x => String(x).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }
  return str;
}
function calcQuarter(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  const q = m <= 3 ? 1 : m <= 6 ? 2 : m <= 9 ? 3 : 4;
  return `${y}Q${q}`;
}
function buildFilename(quarter, season, episode, iso, guid) {
  if (quarter && season && episode) {
    return `${quarter}e${String(episode).padStart(2, '0')}.json`;
  }
  if (iso) {
    const d = new Date(iso);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${dd}.json`;
  }
  return `${safeId(guid)}.json`;
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
  } catch (e) {
    return true;
  }
}
function channelCategoryList(ch) {
  const c = ch.category;
  if (!c) return [];
  const arr = Array.isArray(c) ? c : [c];
  return arr.map(textOf).filter(Boolean);
}
function safeId(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, '');
}
function genGUID(it) {
  const base = `${textOf(it.title) || ''}-${textOf(it.pubDate) || ''}-${textOf(it.link) || ''}`;
  return crypto.createHash('md5').update(base).digest('hex');
}
async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}
