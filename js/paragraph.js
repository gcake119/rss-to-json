import { htmlEscape, fmtDate } from './util.js';

// 這個 function 專門給 newsletter.js 用，直接渲染 Paragraph 詳細物件
export function renderParagraphDetailObject(art) {
  const tags = Array.isArray(art.tags) && art.tags.length
    ? `<p class="meta">${art.tags.map(htmlEscape).join(' / ')}</p>` : '';

  // 判斷內容格式
  let rawHtml = '';
  if (art.contenthtml) {
    if (typeof art.contenthtml === 'string') rawHtml = art.contenthtml;
    else if (typeof art.contenthtml === 'object' && typeof art.contenthtml['string'] === 'string') rawHtml = art.contenthtml['string'];
  }
  if (!rawHtml) rawHtml = `<p>${htmlEscape(art.contenttext || '')}</p>`;

  // 保持與原 paragraph 詳細頁一致的內容清洗，必要時移除/優化 block
  function cleanParagraphHtml(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    // 這裡補原檔案內的「callout、embedly、firstory」移除段落
    for (const sel of [".callout", ".embedly-card", "[src*='firstory']", ".subscription-widget"]) {
      for (const el of wrapper.querySelectorAll(sel)) {
        el.remove();
      }
    }

    // 其他 DOM 優化，如加 lazy loading
    for (const img of wrapper.querySelectorAll("img")) {
      img.setAttribute("loading", "lazy");
      img.classList.add("newsletter-img");
    }
    return wrapper.innerHTML;
  }

  const mainHtml = cleanParagraphHtml(rawHtml);

  return `
    <div class="card">
      <h2>${htmlEscape(art.title)}</h2>
      <div class="meta">${fmtDate(art.pubdate)}</div>
      ${tags}
      ${art.cover ? `<img class="cover" src="${art.cover}" alt="">` : ''}
      <div class="newsletter-content" style="margin-top:0.8em;">${mainHtml}</div>
      <div class="pager"><a href="javascript:history.back()">上一頁</a></div>
    </div>
  `;
}
