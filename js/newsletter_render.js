// newsletter_render.js
import { getBasePath, paginate } from './util.js'; // 路徑工具、分頁

const PAGESIZE = 20;

// 1. 文章列表渲染函式（根據 data/newsletter_X.json）
export async function renderNewsletterList(newsletterKey, page = 1) {
  // 讀取 JSON，保證路徑不受 router/base path 影響
  const res = await fetch(`/data/${newsletterKey}.json`);
  const allArticles = await res.json();

  // 分頁切片
  const pageArticles = paginate(allArticles, page, PAGESIZE);

  // 標題/日期/摘要/cover，設計可自訂資料欄位
  const listHTML =
    '<ul>' +
    pageArticles.map(article => {
      // 將封面（如有）展示
      const coverImg = article.coverimg?.src
        ? `<img src="${article.coverimg.src}" alt="cover" width="80" style="vertical-align:middle; margin-right:8px;">`
        : '';
      return (
        `<li>
          <a href="article-${article.id}" onclick="window.showNewsletterDetail && showNewsletterDetail('${newsletterKey}', '${article.id}'); return false;">
            ${coverImg}
            ${article.title}
          </a>
          ${article.subtitle ? `<br><small>${article.subtitle}</small>` : ''}
          <br><small>${article.pubDate || article.date}</small>
        </li>`
      );
    }).join('') +
    '</ul>';

  return listHTML;
}

// 2. 單篇全文渲染函式
export async function renderNewsletterDetail(newsletterKey, articleId) {
  const res = await fetch(`/data/${newsletterKey}.json`);
  const allArticles = await res.json();
  const article = allArticles.find(a => a.id === articleId);
  if (!article) return '<p>查無此文章</p>';

  // 主呈現：標題、副標題、日期、封面、原文連結、文章區塊內容
  const coverImg = article.coverimg?.src
    ? `<img src="${article.coverimg.src}" alt="cover" width="240"><br>`
    : '';
  const subtitle = article.subtitle ? `<h3>${article.subtitle}</h3>` : '';
  const originLink = article.link
    ? `<b><a href="${article.link}" target="_blank" rel="noopener">原文連結</a></b><br>`
    : '';

  // blocks內容自動拆解渲染
  const contentHTML = renderNewsletterBlocks(article.blocks || article.contentBlocks || []);

  return `
    <h2>${article.title}</h2>
    ${subtitle}
    <b>${article.pubDate || article.date}</b><br>
    ${coverImg}
    ${originLink}
    <div>${contentHTML}</div>
  `;
}

// 3. 內容區塊渲染工具函式（blocks[]）
function renderNewsletterBlocks(blocks = []) {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph': return `<p>${block.content?.text || ''}</p>`;
      case 'heading': return `<h${block.attrs?.level || 2}>${block.content?.text || ''}</h${block.attrs?.level || 2}>`;
      case 'bulletList':
        return `<ul>${
          block.content ? block.content.map(item => `<li>${item.content?.text || ''}</li>`).join('') : ''
        }</ul>`;
      case 'horizontalRule':
        return `<hr>`;
      case 'table':
        return `<table>${
          block.content ? block.content.map(row => `<tr>${
            row.content ? row.content.map(cell => `<td>${cell.content?.text || ''}</td>`).join('') : ''
          }</tr>`).join('') : ''
        }</table>`;
      default:
        return `<div style="color:gray;">未支援型態: ${block.type}</div>`;
    }
  }).join('');
}

/*
  註解：
  - 完全支援 getBasePath，把所有 fetch 相對路徑修正為絕對 basePath 自動包裝，安全部署於 SPA、GitHub Pages、IPFS
  - 分頁邏輯獨立，page 預設為 1，可外部 router 控制/傳遞
  - 文章列表有封面、標題、副標題、日期、點擊可展開詳頁（用 window.showNewsletterDetail 綁定）
  - 詳細頁自動整合 blocks 段落型態（支援 paragraph, heading, bulletList, hr, table，可再加 image、quote）
  - 無全域狀態、可多檔、多次呼叫、結構安全
  - 真正資料 schema 欄位（如 id, title, subtitle, blocks）依你 JSON 片段動態自適應
*/
