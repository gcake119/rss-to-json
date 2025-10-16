import fetch from 'node-fetch';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import cliProgress from 'cli-progress'; // 進度條套件

const WALLET_ADDRESSES = [
  { id: 'newsletter_1', wallet: '0x1d1F6bEbaB8A03a09fd2E28A2D152a912d4D87c9' },
  { id: 'newsletter_2', wallet: '0xD1eb5d0C5e5990063016fbd6f32BB3cFa8014C9b' }
];

// 查詢 wallet 下所有文章 txid
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

// 依 txid 取文章內容
async function fetchContent(txid) {
  const resp = await fetch(`https://arweave.net/${txid}`);
  const raw = await resp.text();
  try { return { txid, ...JSON.parse(raw) }; }
  catch { return { txid, content: raw }; }
}

// 主流程：wallet 批次，全部 JSON 直接存 data/ 目錄
async function main() {
    for (const { id, wallet } of WALLET_ADDRESSES) {
      console.log(`同步 ${id} (${wallet}) ...`);
      const txids = await fetchTxIds(wallet);
      console.log(`取得 ${txids.length} 篇公開文章`);
  
      // 初始化進度條
      const bar = new cliProgress.SingleBar({
        format: `${id} | {bar} | {value}/{total} 篇`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
      }, cliProgress.Presets.shades_classic);
  
      bar.start(txids.length, 0);
  
      const newsletters = [];
      for (let i = 0; i < txids.length; i++) {
        const txid = txids[i];
        const item = await fetchContent(txid);
        if (item.published === true) newsletters.push(item);
        bar.update(i + 1);
      }
      bar.stop();
  
      const outPath = path.join('data', `${id}.json`);
      fs.writeFileSync(outPath, JSON.stringify(newsletters, null, 2));
      console.log(`${id}: 公開文章 ${newsletters.length} 筆，已產生 ${outPath}`);
    }
    console.log('全部同步完畢！');
  }

main();
