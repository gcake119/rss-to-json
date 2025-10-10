import { getBasePath, htmlEscape, fmtDate, params } from './util.js';
import { pager } from './render.js';

// 載入 JSON 檔
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Load failed ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Paragraph 列表
export async function renderParagraphList(rootDir, baseHash) {
  const BASE = getBasePath();
  const p = parseInt(params().p || '1', 10);
  const idxUrl = `${BASE}${rootDir}/index-p${p}.json`;
  let idx;
  try {
    idx = await loadJSON(idxUrl);
  } catch (e) {
    if (p !== 1) return renderParagraphList(rootDir, baseHash.replace(/\?p=\d+$/, ''));
    throw e;
  }
  let html = `<div class="card"><p class="meta">共 ${idx.total_items} 篇 · 分頁 ${p}/${idx.total_pages}</p></div>`;
  for (const it of idx.items) {
    html += `
      <div class="card" style="cursor:pointer;" 
        onclick="location.hash='#viewParagraph?dir=${encodeURIComponent(rootDir)}&slug=${encodeURIComponent(it.slug)}'">
        <div style="display:flex;align-items:center;">
          ${it.cover ? `<img src="${it.cover}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">` : ''}
          <div style="flex:1;">
            <h3 style="margin:0.2rem 0;">${htmlEscape(it.title || '')}</h3>
            <div class="meta">${fmtDate(it.pub_date || '')}</div>
          </div>
        </div>
      </div>
    `;
  }
  html += pager(idx.total_pages || 1, baseHash, p);
  return html;
}

// Paragraph 單篇文章渲染
export async function renderParagraphDetail(dir, slug) {
  const BASE = getBasePath();
  const tryPages = [1, 2, 3, 4, 5];
  let itemMeta = null;

  // 1. 載入列表，找 meta
  for (const p of tryPages) {
    try {
      const idx = await loadJSON(`${BASE}${dir}/index-p${p}.json`);
      itemMeta = (idx.items || []).find(x => x.slug === slug);
      if (itemMeta) break;
    } catch {}
  }
  if (!itemMeta) {
    return `<div class="card"><p>找不到文章（slug=${htmlEscape(slug)}）。</p></div>`;
  }

  // 2. 取得單篇詳細檔
  const d = new Date(itemMeta.pub_date || Date.now());
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const file = `${BASE}${dir}/${yyyy}-${mm}-${dd}_${slug}.json`;
  let art;
  try {
    art = await loadJSON(file);
  } catch {
    return `<div class="card">
      <h3>${htmlEscape(itemMeta.title || "")}</h3>
      <p>無法載入本地文章。</p>
    </div>`;
  }

  // 3. 標籤顯示排版
  const tags = Array.isArray(art.tags) && art.tags.length
    ? `<p class="meta"># ${art.tags.map(htmlEscape).join(" · ")}</p>`
    : "";

  // 4. 主內文格式化
  let rawHtml = "";
  if (art.content_html) {
    if (typeof art.content_html === "string") {
      rawHtml = art.content_html;
    } else if (typeof art.content_html === "object" && typeof art.content_html["#"] === "string") {
      rawHtml = art.content_html["#"];
    }
  }
  if (!rawHtml) {
    rawHtml = `<p>${htmlEscape(art.content_text || "")}</p>`;
  }

  // 5. 只保留 callout 其餘 data-type div remove，動態加 class
  // 只移除純自動產生、沒有明確內文描述的 firstory/open.firstory 連結。正文內有說明的 a 會完整保留！
  function cleanParagraphHtml(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  // 保留 callout
  wrapper.querySelectorAll('div[data-type]').forEach(el => {
    if (el.getAttribute('data-type') !== 'callout') el.remove();
  });

  // 為 callout 動態加 class
  wrapper.querySelectorAll('div[data-type="callout"]').forEach(el => {
    const t = el.getAttribute('data-callout-type');
    el.classList.add('callout-box');
    if (t) el.classList.add(`callout-${t}`);
  });

  // 移除 embedly player 卡片相關
  wrapper.querySelectorAll('a.embedly-card, a[data-card-widget], a.card, a[data-dynamic-card]').forEach(el => el.remove());
  // 移除任何在 data-type="embedly" 的父層下的 a
  wrapper.querySelectorAll('div[data-type="embedly"] a').forEach(el => el.remove());

  // 移除 a 只要沒有描述文字(內文為網址本身)且 href為 firstory
  wrapper.querySelectorAll('a').forEach(el => {
    const href = el.getAttribute('href') || "";
    const text = (el.textContent || "").trim();
    // 僅刪除明顯自動卡片類連結
    if (
      /(firstory\.me|open\.firstory\.me)/i.test(href) &&
      // 文字是網址（純卡片）
      (text.replace(/^https?:\/\//,'') === href.replace(/^https?:\/\//,''))
    ) {
      el.remove();
    }
  });

  // 清掉所有 firstory/embedly 平台來源img
  wrapper.querySelectorAll('img').forEach(el => {
    const src = el.src || "";
    if (/(firstory\.me|open\.firstory\.me|embedly|platforms)/i.test(src)) el.remove();
  });

  // 移除含"訂閱""subscribe""分享""share"的 button,a
  wrapper.querySelectorAll('button, a').forEach(el => {
    const text = el.textContent?.toLowerCase();
    if (text && /訂閱|subscribe|分享|share/i.test(text)) el.remove();
  });

  return wrapper.innerHTML;
}


  const mainHtml = cleanParagraphHtml(rawHtml);
  
  // 6. 最終渲染
  return `
    <div class="card">
      <h2>${htmlEscape(art.title || "")}</h2>
      <div class="meta">${fmtDate(art.pub_date || "")}</div>
      ${tags}
      ${art.cover ? `<img class="cover" src="${art.cover}" alt="">` : ""}
      <div class="newsletter-content" style="margin-top:0.8em;">
        ${mainHtml}
      </div>
      <div class="pager">
        <a href="javascript:history.back()">← 返回列表</a>
      </div>
    </div>
  `;
}

