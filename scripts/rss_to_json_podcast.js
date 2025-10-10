const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

// 輸入 RSS 檔案與輸出資料夾
const xmlFile = './example.xml';      // <-- 改成你的 XML 路徑
const outDir = './out_json';          // <-- 改成你的輸出資料夾

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// 輔助函式
function parsePubDate(pub) {
  const d = new Date(pub);
  return isNaN(d.getTime()) ? '' : d.toISOString();
}
function storyIdFromGuidOrLink(guid, link) {
  if (guid && typeof guid === 'string' && /^[a-zA-Z0-9]{16,}$/.test(guid)) return guid;
  if (link && typeof link === 'string') {
    const m = link.match(/\/story\/([a-zA-Z0-9]+)/);
    if (m) return m[1];
  }
  return '';
}
function safeInt(val, fallback = '') {
  return val === undefined ? fallback : String(val).padStart(2, '0');
}
function itemFilename(pubDate, season, episode) {
  // YYYY-season-episode.json
  try {
    const d = new Date(pubDate);
    if (isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear();
    const ss = safeInt(season);
    const epi = safeInt(episode);
    return `${yyyy}-${ss}-${epi}.json`;
  } catch {
    return '';
  }
}
function fixSeconds(secStr) {
  if (/^\d+$/.test(secStr)) {
    const s = parseInt(secStr, 10);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }
  return secStr;
}

function safeText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if ('#text' in node) return node['#text'];
  return '';
}

// 轉檔主程式
function rssToPodcastJson() {
  const xmlRaw = fs.readFileSync(xmlFile, 'utf8');
  const feed = parser.parse(xmlRaw);

  const channel = feed.rss.channel;
  const show = {
    id: 'show',
    title: channel.title,
    author: channel['itunes:author'] || channel['dc:creator'] || channel.author,
    image: channel.image?.url || channel['itunes:image']?.href,
    link: channel.link,
    language: channel.language,
  };

  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  const itemsOut = [];
  for (const item of items) {
    const pubDateISO = parsePubDate(item.pubDate);
    const link = typeof item.link === 'string' ? item.link : '';
    const guid = typeof item.guid === 'string' ? item.guid : (item.guid?.['#text'] || '');
    const slug = storyIdFromGuidOrLink(guid, link);

    const seasonRaw = item['itunes:season'] || item['season'] || 1;
    const episodeRaw = item['itunes:episode'] || item['episode'] || 1;
    const season = Number(seasonRaw) || 1;
    const episode = Number(episodeRaw) || 1;
    const filename = itemFilename(pubDateISO, season, episode);

    // 音訊
    let audioUrl = item.enclosure?.url || '';
    let audioType = item.enclosure?.type || '';
    let audioBytes = item.enclosure?.length ? Number(item.enclosure.length) : undefined;

    // 封面與摘要
    const image = item['itunes:image']?.href || channel.image?.url;
    const descriptionHtml =
      item['content:encoded'] ||
      item['itunes:summary'] ||
      item['description'] ||
      '';
    const descriptionText = descriptionHtml.replace(/<[^>]+>/g, '');

    // permalink
    const permalink = `https://open.firstory.me/story/${slug}`;

    const entry = {
      id: slug,
      slug,
      filename,
      season,
      episode,
      title: item.title,
      author: item['itunes:author'] || item['dc:creator'] || show.author,
      pub_date: pubDateISO,
      duration: fixSeconds(item['itunes:duration'] || ''),
      episode_type: item['itunes:episodeType'] || undefined,
      audio: {
        url: audioUrl,
        type: audioType,
        bytes: audioBytes,
      },
      image,
      permalink,
      description_html: descriptionHtml,
      description_text: descriptionText,
      tags: Array.isArray(item.category) ? item.category : (item.category ? [item.category] : []),
      show,
    };

    // 單集 JSON
    if (filename) {
      fs.writeFileSync(path.join(outDir, filename), JSON.stringify(entry, null, 2));
    }

    // index item
    itemsOut.push({
      id: slug,
      slug,
      filename,
      season,
      episode,
      title: item.title,
      pub_date: pubDateISO,
      duration: entry.duration,
      image,
      permalink,
      audio: entry.audio,
    });
  }

  // INDEX
  const indexJson = {
    type: 'podcast',
    show,
    page: 1,
    page_size: itemsOut.length,
    total_items: itemsOut.length,
    total_pages: 1, // 若需分頁請自行調整
    updated_at: new Date().toISOString(),
    items: itemsOut
  };
  fs.writeFileSync(path.join(outDir, 'index-p1.json'), JSON.stringify(indexJson, null, 2));
}

rssToPodcastJson();
