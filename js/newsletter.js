import { getBasePath, htmlEscape, fmtDate, params } from './util.js';
import { pager, cleanContentHtml } from './render.js';

// 載入 JSON 檔
async function loadJSON(url) {
  const res = await fetch(url, { cache:'no-cache' });
  if (!res.ok) throw new Error(`Load failed ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Newsletter 列表
export async function renderNewsletterList(rootDir, baseHash) {
  const BASE = getBasePath();
  const p = parseInt(params().p || '1', 10);
  const idxUrl = `${BASE}${rootDir}/index-p${p}.json`;
  let idx;
  try { idx = await loadJSON(idxUrl); }
  catch(e) { if (p !== 1) return renderNewsletterList(rootDir, baseHash.replace(/\?p=\d+$/, '')); throw e; }
  let html = `<div class="card"><p class="meta">共 ${idx.total_items} 篇 · 分頁 ${p}/${idx.total_pages}</p></div>`;
  for(const it of idx.items) {
    html += `
    <div class="card" style="cursor:pointer;"
         onclick="location.hash='#viewNewsletter?dir=${encodeURIComponent(rootDir)}&slug=${encodeURIComponent(it.slug)}'">
      <div style="display:flex;align-items:center;">
        ${it.cover ? `<img src="${it.cover}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">` : ''}
        <div style="flex:1;">
          <h3 style="margin:0.2rem 0;">${htmlEscape(it.title||'')}${it.has_voiceover ? `<span class="badge">voiceover</span>` : ''}</h3>
          <div class="meta">${fmtDate(it.pub_date||'')}</div>
          ${it.summary ? `<p style="margin:0.3rem 0; color:#a89984; font-size:0.9em;">${htmlEscape(it.summary)}</p>` : ''}
        </div>
      </div>
    </div>`;
  }
  html += pager(idx.total_pages||1, baseHash, p);
  return html;
}

// Newsletter 詳細頁
export async function renderNewsletterDetail(dir, slug) {
  const BASE = getBasePath();
  const tryPages = [1,2,3,4,5];
  let itemMeta = null;
  for(const p of tryPages) {
    try {
      const idx = await loadJSON(`${BASE}${dir}/index-p${p}.json`);
      itemMeta = (idx.items||[]).find(x=>x.slug===slug);
      if(itemMeta) break;
    } catch{}
  }
  if(!itemMeta) return `<div class="card"><p>找不到文章（slug=${htmlEscape(slug)}）。</p></div>`;
  const d = new Date(itemMeta.pub_date||Date.now());
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth()+1).padStart(2,'0');
  const dd = String(d.getUTCDate()).padStart(2,'0');
  const file = `${BASE}${dir}/${yyyy}-${mm}-${dd}_${slug}.json`;
  let art;
  try{ art = await loadJSON(file); }
  catch{ return `<div class="card"><h3>${htmlEscape(itemMeta.title||'')}</h3><p>無法載入本地文章。</p></div>`; }
  const tags = Array.isArray(art.tags) && art.tags.length ? `<p class="meta"># ${art.tags.map(htmlEscape).join(' · ')}</p>` : '';
  return `
    <div class="card">
      <h2>${htmlEscape(art.title||'')}</h2>
      <div class="meta">${fmtDate(art.pub_date||'')}</div>
      ${tags}
      ${art.cover ? `<img class="cover" src="${art.cover}" alt="">` : ''}
      ${art.voiceover?.url ? `<p><a href="${art.voiceover.url}" target="_blank" rel="noopener">🎵 Voiceover 音訊</a></p>` : ''}
      <div class="newsletter-content" style="margin-top:0.8em;">
        ${
            art.content_html
                ? cleanContentHtml(art.content_html, art.cover)
                : `<p>${htmlEscape(art.content_text||'')}</p>`
        }
      </div>
      <div class="pager"><a href="javascript:history.back()">← 返回列表</a></div>
    </div>
  `;
}
