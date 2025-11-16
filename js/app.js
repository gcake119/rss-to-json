/* ========== MODULE:IMPORTS-START ========== */
import '/style.css';
import { staticPages } from './staticContent.js';
// 這兩個渲染模組各自同時提供列表和詳頁函式
import { renderPodcastList, renderPodcastDetail } from './podcast_render.js';
import { renderNewsletterList, renderNewsletterDetail } from './newsletter_render.js';
import { renderHome, renderWorks, renderAbout, renderContact } from './static_render.js';
/* ========== MODULE:IMPORTS-END ========== */

/* ========== MODULE:ROUTES-START ========== */
const main = document.getElementById('main-content');
// 定義 SPA 路由表，每頁配對渲染函式
const routes = {
  // 靜態頁
  '': () => main.innerHTML = renderHome(staticPages.home),
  'home': () => main.innerHTML = renderHome(staticPages.home),
  'about': () => main.innerHTML = renderAbout(staticPages.about),
  'contact': () => main.innerHTML = renderContact(staticPages.contact),
  'works': () => main.innerHTML = renderWorks(staticPages.works),

  // Podcast
  'podcast_1': async () => { main.innerHTML = await renderPodcastList('podcast_1'); },
  'podcast_2': async () => { main.innerHTML = await renderPodcastList('podcast_2'); },

  // Newsletter
  'newsletter_1': async () => { main.innerHTML = await renderNewsletterList('newsletter_1');},
  'newsletter_2': async () => { main.innerHTML = await renderNewsletterList('newsletter_2');},
};
/* ========== MODULE:ROUTES-END ========== */

/* ========== MODULE:HISTORY-START ========== */
async function render() {
  const hash = window.location.hash.slice(1) || 'home';
  // routes：包含所有列表/靜態頁 async callback，首頁可能不用 async
  if (routes[hash]) {
    // 若 callback 為 async，需 await
    await routes[hash]();
    return;
  }
  // 處理 podcast 單集詳頁
  const [base, queryStr] = hash.split('?');
  if (/^podcast_\d-detail$/.test(base)) {
    const params = new URLSearchParams(queryStr);
    const id = params.get('id');
    const main = document.getElementById('main-content');
    // 詳頁要 async await
    main.innerHTML = await renderPodcastDetail(base.replace('-detail', ''), id);
    return;
  }
  // 處理 newsletter 詳頁
  if (/^newsletter_\d-detail$/.test(base)) {
    const params = new URLSearchParams(queryStr);
    const id = params.get('id');
    const main = document.getElementById('main-content');
    main.innerHTML = await renderNewsletterDetail(base.replace('-detail', ''), id);
    return;
  }
  document.getElementById('main-content').innerHTML = '<p>找不到頁面</p>';
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
/* ========== MODULE:HISTORY-END ========== */


/* ========== MODULE:INIT-START ========== */
render();
/* ========== MODULE:INIT-END ========== */
