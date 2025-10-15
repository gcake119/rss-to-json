// arweave-newsletter-batch.js
import fetch from 'node-fetch';
import fs from 'fs';

const WALLET_ADDRESSES = [
  { id: 'newsletter_1', wallet: '0xD1eb5d0C5e5990063016fbd6f32BB3cFa8014C9b' },
  { id: 'newsletter_2', wallet: '0x1d1F6bEbaB8A03a09fd2E28A2D152a912d4D87c9' }
];

/**
 * 用 GraphQL 查詢每個錢包下所有 Paragraph 文章 txid
 */
async function fetchTxIds(wallet) {
  const query = {
    query: `
      {
        transactions(
          tags:[
            { name: "AppName", values: ["Paragraph"] },
            { name: "Contributor", values: ["${wallet}"] }
          ],
          sort: HEIGHT_DESC,
          first: 100
        ){
          edges{
            node{
              id
            }
          }
        }
      }
    `
  };
  const resp = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  });
  const json = await resp.json();
  return json.data.transactions.edges.map(e => e.node.id);
}

/**
 * 依照 txid 抓取每篇文章內容
 * 預設為 JSON 標準格式（Paragraph上鏈格式）
 */
async function fetchContent(txid) {
  const url = `https://arweave.net/${txid}`;
  const resp = await fetch(url);
  const raw = await resp.text();
  let data = {};
  try { data = JSON.parse(raw); } catch { data = { content: raw }; }
  return { txid, ...data };
}

/**
 * 查詢指定錢包所有公開 newsletter 文章
 */
async function getPublishedNewsletters(wallet) {
  const txids = await fetchTxIds(wallet);
  const result = [];
  for (const txid of txids) {
    try {
      const item = await fetchContent(txid);
      // 只保留 published:true 的文章
      if (item.published === true) {
        result.push({
          txid: item.txid,
          published: item.published,
          updatedAt: item.updatedAt,
          title: item.title,
          author: item.author,
          slug: item.slug,
          url: item.url,
          cover: item.cover,
          markdown: item.markdown,
          content: item.content || item.markdown // 部分格式兼容純文本內容
        });
      }
    } catch (e) {
      console.warn(`Error on ${txid}:`, e);
    }
  }
  return result;
}

/**
 * 主流程：查詢兩個wallet、分別輸出json到資料夾
 */
async function main() {
    for (const { id, wallet } of WALLET_ADDRESSES) {
      console.log(`同步 ${id} (${wallet}) ...`);
      const newsletters = await getPublishedNewsletters(wallet);
  
      // 目標資料夾：data/newsletter/newsletter_x/
      const targetDir = path.join('data', 'newsletter', id);
      // 檢查資料夾是否存在，沒有就建立（遞迴式確保多層結構）
      fs.mkdirSync(targetDir, { recursive: true });
      // 輸出檔案到該資料夾
      const outPath = path.join(targetDir, `${id}.json`);
      fs.writeFileSync(outPath, JSON.stringify(newsletters, null, 2));
      console.log(`${id}: 公開文章 ${newsletters.length} 筆，已產生 ${outPath}`);
    }
    console.log('全部同步完畢！');
  }

main();
