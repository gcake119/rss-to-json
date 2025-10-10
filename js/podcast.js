import { getBasePath, htmlEscape, fmtDate, params } from './util.js';
import { pager } from './render.js';

// Firstory 內嵌播放器 url
function firstoryEmbedFromPermalink(permalink) {
  if (typeof permalink !== "string") return null;
  if (permalink.startsWith("https://open.firstory.me/story/"))
    return permalink.replace("/story/", "/embed/story/");
  return null;
}

// 載入 JSON 檔
async function loadJSON(url) {
  const res = await fetch(url, { cache:'no-cache' });
  if (!res.ok) throw new Error(`Load failed ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Podcast 列表
export async function renderPodcastList(rootDir, baseHash) {
  const BASE = getBasePath();
  const p = parseInt(params().p || '1', 10);
  const idxUrl = `${BASE}${rootDir}/index-p${p}.json`;
  let idx;
  try { idx = await loadJSON(idxUrl); }
  catch(e) { if (p !== 1) return renderPodcastList(rootDir, baseHash.replace(/\?p=\d+$/, '')); throw e; }
  let html = `<div class="card"><p class="meta">共 ${idx.total_items} 篇 · 分頁 ${p}/${idx.total_pages}</p></div>`;
  for(const it of idx.items) {
    html += `
    <div class="card" style="cursor:pointer;"
         onclick="location.hash='#viewPodcast?dir=${encodeURIComponent(rootDir)}&slug=${encodeURIComponent(it.slug)}'">
      <div style="display:flex;align-items:center;">
        ${(it.image || idx.show.image) ? `<img src="${it.image || idx.show.image}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">` : ''}
        <div>
          <h3 style="margin:0.2rem 0;">${htmlEscape(it.title || '')}</h3>
          <div class="meta">${fmtDate(it.pub_date || '')}${it.duration ? `｜${it.duration}` : ''}${it.season ? `｜S${it.season}` : ''}${it.episode ? `E${it.episode}` : ''}</div>
        </div>
      </div>
    </div>`;
  }
  html += pager(idx.total_pages||1, baseHash, p);
  return html;
}

// Podcast 詳細頁
export async function renderPodcastDetail(dir, slug) {
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
  if(!itemMeta) return `<div class="card"><p>找不到單集（slug=${htmlEscape(slug)}）。</p></div>`;
  const file = `${BASE}${dir}/${slug}.json`;
  let art;
  try { art = await loadJSON(file); }
  catch { return `<div class="card"><h3>${htmlEscape(itemMeta.title||'')}</h3><p>無法載入本地單集資料。</p>${itemMeta.link ? `<p><a href="${itemMeta.link}" target="_blank" rel="noopener">前往原文</a></p>` : ''}</div>`; }
  const embed = firstoryEmbedFromPermalink(art.permalink||art.link);
  return `
    <div class="card">
      <h2>${htmlEscape(art.title||'')}</h2>
      <div class="meta">${fmtDate(art.pub_date||'')}${art.duration ? `｜${art.duration}`: ''}${art.season?`｜Season ${art.season}`:''}${art.episode?`｜Ep${art.episode}`:''}</div>
      ${art.cover ? `<img class="cover" src="${art.cover}" alt="">` : ''}
      ${embed ? `<iframe class="podcast-player" src="${embed}" allow="autoplay"></iframe>` : ''}
      ${art.audio ? `<p><a href="${art.audio}" target="_blank" rel="noopener">下載音檔</a></p>` : ''}
      <div style="margin-top:0.8em;">${art.description_html||htmlEscape(art.description_text||'')}</div>
      ${art.link ? `<p><a href="${art.link}" target="_blank" rel="noopener">原文連結</a></p>` : ''}
      <div class="pager"><a href="javascript:history.back()">← 返回列表</a></div>
    </div>
  `;
}
