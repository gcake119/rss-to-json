import { getBasePath, htmlEscape, fmtDate, params } from './util.js';
import { pager, cleanContentHtml } from './render.js';
import { renderSubstackDetailObject } from './substack.js';
import { renderParagraphDetailObject } from './paragraph.js';

// 共用：用於列表渲染
export async function renderNewsletterList(rootDir, baseHash) {
  const BASE = getBasePath(); // 取得目錄基礎路徑
  const p = parseInt(params.p || 1, 10);
  const idxUrl = `${BASE}${rootDir}/index-p${p}.json`; // 組出 index json 路徑
  let idx;
  try {
    idx = await loadJSON(idxUrl); // 載入列表 json
  } catch (e) {
    if (p !== 1)
      // 若不是第1頁（可能分頁出錯）就直接回到第1頁重試
      return renderNewsletterList(rootDir, baseHash.replace(/\?p=.*/, ''));
    throw e;
  }

  // 列表頁排版
  let html = `<div class="card"><p class="meta">共 ${idx.total_items} 篇 · 分頁 ${p}/${idx.total_pages}</p></div>`;
  for (const it of idx.items) {
    html += `
      <div class="card" style="cursor:pointer" onclick="location.hash='viewNewsletter?dir=${encodeURIComponent(rootDir)}&slug=${encodeURIComponent(it.slug)}'">
        <div style="display:flex;align-items:center;">
          ${it.cover ? `<img src="${it.cover}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">` : ''}
          <div style="flex:1">
            <h3 style="margin:0.2rem 0">${htmlEscape(it.title)}${it.has_voiceover ? '<span class="badge">voiceover</span>' : ''}</h3>
            <div class="meta">${fmtDate(it.pub_date)}</div>
            ${it.summary ? `<p style="margin:0.3rem 0; color:#a89984; font-size:0.9em">${htmlEscape(it.summary)}</p>` : ''}
          </div>
        </div>
      </div>
    `;
  }
  html += pager(idx.total_pages || 1, baseHash, p);
  return html;
}

// 通用 json 載入
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error('Load failed: ' + res.status + res.statusText + ' for ' + url);
  return res.json();
}

// 單篇文章詳情分流
export async function renderNewsletterDetail(dir, slug) {
  const BASE = getBasePath();
  const tryPages = [1, 2, 3, 4, 5]; // 最多分頁查找
  let itemMeta = null;
  for (const p of tryPages) {
    try {
      const idx = await loadJSON(`${BASE}${dir}/index-p${p}.json`);
      itemMeta = idx.items.find(xx => xx.slug === slug);
      if (itemMeta) break; // 找到單篇 meta 即跳出
    } catch (e) { /* index json 失敗自動跳過 */ }
  }
  if (!itemMeta)
    // 沒找到 meta
    return `<div class="card"><p>找不到文章：${htmlEscape(slug)}</p></div>`;

  // 用 index 記錄的 pub_date 與 slug 組出單篇檔案名
  // 檔案規則： yyyy-mm-dd_slug.json
  const pub = new Date(itemMeta.pub_date);
  const yyyy = pub.getFullYear();
  const mm = String(pub.getMonth() + 1).padStart(2, '0');
  const dd = String(pub.getDate()).padStart(2, '0');
  const jsonFile = `${BASE}${dir}/${yyyy}-${mm}-${dd}_${slug}.json`;

  let art;
  try {
    art = await loadJSON(jsonFile);
  } catch {
    return `<div class="card"><h3>${htmlEscape(itemMeta.title)}</h3><p>詳細內容載入失敗</p></div>`;
  }

  // 內容分流渲染
  if (art.meta?.source === "fallback") {
    return renderParagraphDetailObject(art);
  } else {
    return renderSubstackDetailObject(art);
  }
}
