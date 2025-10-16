// 工具模組: 常用函式與路由參數

// 取得 base path（根據 index.html 目錄自動推算）
export function getBasePath() {
  const path = window.location.pathname;
  return path.endsWith('index.html') ? path.replace('index.html', '') : path;
}

// HTML 轉義，避免 XSS
export function htmlEscape(s='') {
  return (s||'').replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}

// 日期格式 yyyy-mm-dd hh:mm
export function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0,16).replace('T',' ');
  } catch { return iso || ''; }
}

// 解析 hash/url 參數
export function params() {
  const h = location.hash.split('?');
  const qs = new URLSearchParams(h[1] || '');
  return Object.fromEntries(qs.entries());
}

// 分頁器
export function paginate(arr, page = 1, size = 10) {
  return arr.slice((page - 1) * size, page * size);
}
export function renderPager(container, totalPages, currentPage, callback) {
  // callback 是 function(pageNum) {...}
  let html = '';
  for (let p = 1; p <= totalPages; p++) {
    html += `<button onclick="${callback.name}(${p})"${p===currentPage?' style="font-weight:bold"':''}>${p}</button> `;
  }
  container.innerHTML = html;
}