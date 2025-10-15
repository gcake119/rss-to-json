// scripts/podcast.js
// 用 ES modules 撰寫，請確保 package.json 有 "type": "module"
// 需安裝 xml2js 與 node-fetch: npm install xml2js node-fetch

import fetch from 'node-fetch';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { parseStringPromise } from 'xml2js';

/**
 * Podcast RSS feed 設定清單
 * 每個節目包含 id, rss feed url, 輸出 json 路徑
 */
const podcasts = [
  {
    id: 'podcast_1',
    feed: 'https://feed.firstory.me/rss/user/ck60hb2c90wp50873k099tilh',
    out: 'data/podcast/podcast_1/podcast_1.json'
  },
  {
    id: 'podcast_2',
    feed: 'https://feed.firstory.me/rss/user/ckfqmqknj6k7e0800m9lk8at1',
    out: 'data/podcast/podcast_2/podcast_2.json'
  }
];

/**
 * 取得 RSS feed 並轉 json
 * 只拉下標準項目：title, link, pubDate, description, guid
 */
async function fetchAndParseRSS(feedUrl) {
  const resp = await fetch(feedUrl);
  const xml = await resp.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  // 防呆解析 RSS 結構，轉換重要欄位
  const items = (parsed?.rss?.channel?.item ?? [])
    .map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      guid: item.guid?._ || item.guid
    }));
  return items;
}

/**
 * 全部 Podcast 一次批次更新
 */
const run = async () => {
  for (const podcast of podcasts) {
    try {
      console.log(`同步 ${podcast.id} ...`);
      const feedItems = await fetchAndParseRSS(podcast.feed);

      // 確保輸出目錄存在
      mkdirSync(dirname(podcast.out), { recursive: true });
      // 寫入 JSON 檔案
      writeFileSync(podcast.out, JSON.stringify(feedItems, null, 2));
      console.log(`✔ 寫入 ${podcast.out} 共 ${feedItems.length} 集`);
    } catch (err) {
      console.warn(`❌ ${podcast.id} RSS fetch/parse failed:`, err);
      // 不中斷流程，繼續下個 podcast
    }
  }
  console.log('全部 Podcast feed 同步完成！');
};

run();

export {}; // 結尾留空，方便 ES module 編譯
