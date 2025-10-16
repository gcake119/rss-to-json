import '../css/style.css'
import '../css/theme-gruvbox.css'
import { params } from './util.js';
import { staticPages } from './staticContent.js';
import { pagePodcast1, pagePodcast2, pageNewsletter1, pageNewsletter2 } from './pages.js';
import { renderPodcastList, renderPodcastDetail } from './podcast_render.js';
import { renderNewsletterList, renderNewsletterDetail } from './newsletter_render.js';


const ROUTES = {
  podcast_1: pagePodcast1,
  podcast_2: pagePodcast2,
  newsletter_1: pageNewsletter1,
  newsletter_2: pageNewsletter2
};

// 切換內容
window.switchContent = async function(type, id) {
  // 1. 若是組件型頁（包含分頁、渲染），優先由 ROUTES 執行
  if (ROUTES[id]) {
    const html = await ROUTES[id]();
    document.getElementById('main-content').innerHTML = html;
    return;
  }
  // 2. 靜態頁面再由 staticPages 提供內容（簡單 HTML 模板）
  if (type === 'static' && staticPages[id]) {
    document.getElementById('main-content').innerHTML = staticPages[id];
    return;
  }
  // 3. 未知型別可給404/錯誤提示
  document.getElementById('main-content').innerHTML = '<p>找不到頁面</p>';
};

// SPA 路由主控
async function render() {
  const [routePart] = location.hash.replace('#', '').split('?');
  const hash = routePart || 'home';
  const app = document.getElementById('main-content');

  try {
    // 1. detail 型頁面（如 viewPodcast/viewNewsletter）
    if (hash === 'viewPodcast') {
      const q = params();
      if (!q.json || !q.guid) app.innerHTML = `<div class="card"><p>缺少參數。</p></div>`;
      else app.innerHTML = await renderPodcastDetail(q.json, q.guid);
    } else if (hash === 'viewNewsletter') {
      const q = params();
      if (!q.dir || !q.slug) app.innerHTML = `<div class="card"><p>缺少參數。</p></div>`;
      else app.innerHTML = await renderNewsletterDetail(q.dir, q.slug);
    }
    // 2. ROUTES 組件頁
    else if (ROUTES[hash]) {
      app.innerHTML = await ROUTES[hash]();
    }
    // 3. 靜態頁片段
    else {
      app.innerHTML = staticPages[hash] || staticPages.home;
    }
  } catch (e) {
    console.error('渲染錯誤:', e);
    app.innerHTML = `<div class="card"><p>載入失敗：${e.message||e}</p></div>`;
  }
}

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);

