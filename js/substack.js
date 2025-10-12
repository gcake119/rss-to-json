import { htmlEscape, fmtDate } from './util.js';
import { cleanContentHtml } from './render.js';
import { marked } from '/node_modules/marked/lib/marked.esm.js'

// markdown 內容：只允許簡潔正確的 markdown 語法與連結
const CALLOUT_MD = `
**歡迎贊助支持我繼續創作**

[Crypto 贊助](https://gcake119.fkey.id)

透過連結購買 Ledger 冷錢包，你我都可以得到最高 20U 等值的比特幣  

[Ledger 推薦連結](https://shop.ledger.com/pages/referral-program?referral_code=NNS6VK4T6YRFP)

讀者贊助專案

法幣與信用卡支付請使用下方專屬連結

受限於台灣金流管制法規，無法開啟個人 Stripe 收款，造成不便敬請見諒🙏  

[Firstory 贊助連結](https://open.firstory.me/join/wwhowbuhow/tier/01925f48-ec8c-449e-74f2-b5ee9380e637)
`;

// 宣傳大段原文
const RAW_PROMO_TEXT = `使用信箱註冊會以電子報形式收到文章更新透過連結購買 Ledger 冷錢包，你我都可以得到最高 20U 等值的比特幣https://shop.ledger.com/pages/referral-program?referral_code=NNS6VK4T6YRFPCrypto 贊助讀者贊助專案法幣與信用卡支付請使用下方專屬連結受限於台灣金流管制法規，無法開啟個人 Stripe 收款，造成不便敬請見諒🙏https://open.firstory.me/join/wwhowbuhow/tier/01925f48-ec8c-449e-74f2-b5ee9380e637`;

// html: 移除 blockquote 全部
function removePromotionFromHtml(raw) {
  if (!raw) return '';
  return raw.replace(/<blockquote[\s\S]*?<\/blockquote>/gi, '').trim();
}

// text: 精確剔除指定宣傳字串（你可以再優化比對首尾，但建議全部 replace）
function removePromotionFromText(raw) {
  if (!raw) return '';
  return raw.replace(RAW_PROMO_TEXT, '').trim();
}

// markdown 區塊只出現一次、用外層容器包住並應有樣式
//function renderCalloutHtml(md) {
//  return `<div class="callout-box">${marked.parse(md)}</div>`;
//}

function renderCalloutHtml(md) {
  console.log('callout markdown before parse:', md);
  const html = marked.parse(md);
  console.log('callout html:', html);
  return `<div class="callout-box">${html}</div>`;
}

// 渲染主文時同時處理兩欄資料
export function renderSubstackDetailObject(art) {
  const tags = Array.isArray(art.tags) && art.tags.length
    ? `<p class="meta"># ${art.tags.map(htmlEscape).join(' · ')}</p>`
    : '';
  const coverImg = art.cover ? `<img class="cover" src="${art.cover}" alt="">` : '';
  const voiceoverBlock = art.voiceover?.url
    ? `<p><a href="${art.voiceover.url}" target="_blank" rel="noopener">🎵 Voiceover 音訊</a></p>`
    : '';

  // 僅「一次」 remove 宣傳段，正文內容全部保留
  let mainContent = '';
  if (art.content_html && art.content_html.trim()) {
    mainContent = cleanContentHtml(removePromotionFromHtml(art.content_html), art.cover);
  } else if (art.content_text && art.content_text.trim()) {
    mainContent = `<p>${htmlEscape(removePromotionFromText(art.content_text))}</p>`;
  } else {
    mainContent = '<p>⚠ 內文缺失或載入失敗</p>';
  }

  // callout 只包在 mainContent 之前一次、且只有一個樣式
  const calloutHtml = renderCalloutHtml(CALLOUT_MD);

  return `
    <div class="card">
      <h2>${htmlEscape(art.title || '')}</h2>
      <div class="meta">${fmtDate(art.pub_date || art.pubDate || '')}</div>
      ${tags}
      ${coverImg}
      ${voiceoverBlock}
      ${calloutHtml}
      <div class="newsletter-content" style="margin-top:0.8em;">
        ${mainContent}
      </div>
      <div class="pager"><a href="javascript:history.back()">← 返回列表</a></div>
    </div>
  `;
}
