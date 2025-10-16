import fetch from "node-fetch";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { parseStringPromise } from "xml2js";
import path from "path";
import cliProgress from "cli-progress";

// 轉換多個 podcast feed
const podcasts = [
  { id: "podcast_1", feed: "https://feed.firstory.me/rss/user/ck60hb2c90wp50873k099tilh" },
  { id: "podcast_2", feed: "https://feed.firstory.me/rss/user/ckfqmqknj6k7e0800m9lk8at1" }
];

async function fetchAndParseRSS(feedUrl) {
  const resp = await fetch(feedUrl);
  const xml = await resp.text();
  const result = await parseStringPromise(xml, { explicitArray: false });
  const channel = result.rss.channel;

  // 節目共用封面（頻道/itunes/googleplay/image...）
  const showCover =
    channel["itunes:image"]?.href ||
    channel["googleplay:image"]?.href ||
    channel.image?.url ||
    null;

  // 強制 items 為陣列
  const items = Array.isArray(channel.item)
    ? channel.item
    : [channel.item].filter(Boolean);

  // 主進度條：每集解析
  const bar = new cliProgress.SingleBar({
    format: `{podcast} |{bar}| {value}/{total} Episodes`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true
  }, cliProgress.Presets.shades_classic);

  bar.start(items.length, 0, { podcast: feedUrl });

  // 完整欄位展開，保留所有原始欄位 & 標準欄位
  const episodes = items.map((item, i) => {
    // 單集封面、優先多種類型
    const coverimg =
      item["itunes:image"]?.href ||
      item["googleplay:image"]?.href ||
      showCover ||
      null;

    // 音檔
    const audio =
      item.enclosure?.url ||
      item["media:content"]?.url ||
      null;

    // 時長
    const duration =
      item["itunes:duration"] ||
      item.duration ||
      null;

    // 主內容
    const content =
      item["content:encoded"] ||
      item.description ||
      "";

    // 所有原始 RSS 欄位 + 標準欄位
    const episode = {
      ...item,
      coverimg,
      audio,
      duration,
      content,
      showCover, // 節目 fallback
      guid: (item.guid && item.guid._) || item.guid,
      season: item["itunes:season"] || null,
      episode: item["itunes:episode"] || null
    };

    bar.update(i + 1);
    return episode;
  });

  bar.stop();
  return episodes;
}

// 資料夾準備
const dataDir = path.join("data");
if (!existsSync(dataDir)) mkdirSync(dataDir);

(async function main() {
  for (const { id, feed } of podcasts) {
    try {
      console.log(`[RSS→JSON] ${id}`);
      const episodes = await fetchAndParseRSS(feed);
      const outPath = path.join("data", `${id}.json`);
      writeFileSync(outPath, JSON.stringify(episodes, null, 2));
      console.log(`[完成] ${id}: ${episodes.length} 集 → ${outPath}`);
    } catch (err) {
      console.warn(`[錯誤] ${id}:`, err);
    }
  }
})();
