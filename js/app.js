import '/css/style.css'
import '/css/theme-gruvbox.css'
import { renderPodcastList, renderPodcastDetail } from './podcast.js';
import { renderNewsletterList, renderNewsletterDetail } from './newsletter.js';
import { params } from './util.js';

/* ========================================
     * 靜態頁面內容
     * ======================================== */
    
    const staticPages = {
      home: `
        <h1>Welcome to GCAKE.Space</h1>
        <p>個人品牌與創作空間，聚焦 Podcast、電子報與研究作品。</p>
        <div class="grid">
          <div class="card">
            <h3>Podcast</h3>
            <p><a href="#podcast">《喂喂你還好不好》</a></p>
            <p><a href="#podcast2">《雞蛋糕孵蛋中》</a></p>
          </div>
          <div class="card">
            <h3>Newsletter</h3>
            <p><a href="#newsletter">喂喂你還好不好</a></p>
            <p><a href="#newsletter2">區塊鏈文摘</a></p>
          </div>
        </div>
      `,
      works: `
        <h1>Works & Resources</h1>
        <div class="card">
          <h3>Taiwan Podcaster 龐大資訊人包</h3>
          <p><a href="https://sites.google.com/view/taiwanpodcast/" target="_blank" rel="noopener">入口 1</a> ｜ <a href="https://sites.google.com/view/taiwanpodcast/%E9%A6%96%E9%A0%81?authuser=0" target="_blank" rel="noopener">入口 2</a></p>
        </div>
      `,
      about: `
        <h1>About</h1>
        <img src="img/gcake_pod.png" alt="Avatar" class="avatar">
        <p>現役躁鬱症患者，有一個 podcast 、兩份電子報。</p>
        <p>運動科學（運動生物力學）研究員、區塊鏈推廣者。</p>
        <p>台灣最大免費 Podcast 製作教學網站內容編輯。</p>
        <p>邀約聯絡：<a href="mailto:wwhowbuhow@pm.me">wwhowbuhow@pm.me</a></p>
      `,
      contact: `
        <h1>Contact & Support</h1>
        <div class="card">
          <h3>Email</h3>
          <p><a href="mailto:wwhowbuhow@pm.me">wwhowbuhow@pm.me</a></p>
        </div>
        <div class="card">
          <h3>加密貨幣抖內</h3>
          <p><a href="https://gcake119.fkey.id/" target="_blank" rel="noopener">抖內頁</a></p>
          <ul>
            <li>BTC on-chain: bc1qty2qy4vp69w5yecn5m8q56zlu80yz6uh3w9whr</li>
            <li>BTC lightning: <a href="mailto:gcake119@walletofsatoshi.com">gcake119@walletofsatoshi.com</a></li>
            <li>ETH: gcake119.fkey.eth</li>
            <li>ADA handle: $gcake119</li>
            <li>TEZ: gcake119.tez</li>
          </ul>
        </div>
        <div class="card">
          <h3>硬體錢包夥伴</h3>
          <ul>
            <li><a href="https://shop.ledger.com/pages/referral-program?referral_code=NNS6VK4T6YRFP" target="_blank" rel="noopener">Ledger</a></li>
            <li><a href="https://affil.trezor.io/SHh5" target="_blank" rel="noopener">Trezor</a></li>
            <li><a href="https://www.coolwallet.io/products/coolwallet-pro/?ref=zta0ymf" target="_blank" rel="noopener">CoolWallet</a></li>
          </ul>
        </div>
      `
    };


/* ========================================
     * 頁面組件函式
     * ======================================== */
    
    // Podcast 第一檔節目頁面
    async function pagePodcast1() {
      const head = `
        <h1>Podcast｜《喂喂你還好不好》</h1>
        <div class="card">
          <p>談精神健康、康復與支持網絡的真實分享。</p>
          <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
        </div>
      `;
      const list = await renderPodcastList('data/podcast/podcast_1', '#podcast');
      return head + list;
    }
    
    // Podcast 第二檔節目頁面
    async function pagePodcast2() {
      const head = `
        <h1>Podcast｜《雞蛋糕孵蛋中》</h1>
        <div class="card">
          <p>第二檔節目，主題延伸與創作實驗。</p>
          <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
        </div>
      `;
      const list = await renderPodcastList('data/podcast/podcast_2', '#podcast2');
      return head + list;
    }
    
    // Newsletter 第一份電子報頁面
    async function pageNewsletter1() {
      const head = `
        <h1>Newsletter｜《喂喂你還好不好》</h1>
        <div class="card">
          <ul>
            <li>Firstory：<a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
            <li>Substack：<a href="https://wwhowbuhow.substack.com/" target="_blank" rel="noopener">連結</a></li>
            <li>Paragraph：<a href="https://paragraph.com/@wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
          </ul>
        </div>
      `;
      const list = await renderNewsletterList('data/newsletter/newsletter_1', '#newsletter');
      return head + list;
    }
    
    // Newsletter 第二份電子報頁面
    async function pageNewsletter2() {
      const head = `
        <h1>Newsletter｜《區塊鏈文摘》</h1>
        <div class="card">
          <ul>
            <li>Substack：<a href="https://taiweb3.substack.com/" target="_blank" rel="noopener">連結</a></li>
            <li>Paragraph：<a href="https://paragraph.com/@tw3" target="_blank" rel="noopener">連結</a></li>
          </ul>
        </div>
      `;
      const list = await renderNewsletterList('data/newsletter/newsletter_2', '#newsletter2');
      return head + list;
    }

// SPA 路由主控
async function render() {
  const [routePart] = location.hash.replace('#','').split('?');
  const hash = routePart || 'home';
  const app = document.getElementById('app');
  try {
    if (hash === 'podcast')      app.innerHTML = await pagePodcast1();
    else if (hash === 'podcast2')app.innerHTML = await pagePodcast2();
    else if (hash === 'newsletter')app.innerHTML = await pageNewsletter1();
    else if (hash === 'newsletter2')app.innerHTML = await pageNewsletter2();
    else if (hash === 'viewPodcast') {
      const q = params();
      if (!q.dir || !q.slug) app.innerHTML = `<div class="card"><p>缺少參數。</p></div>`;
      else app.innerHTML = await renderPodcastDetail(q.dir, q.slug);
    } else if (hash === 'viewNewsletter') {
      const q = params();
      if (!q.dir || !q.slug) app.innerHTML = `<div class="card"><p>缺少參數。</p></div>`;
      else app.innerHTML = await renderNewsletterDetail(q.dir, q.slug);
    } else {
      app.innerHTML = staticPages[hash] || staticPages.home;
    }
  } catch (e) {
    console.error('渲染錯誤:', e);
    app.innerHTML = `<div class="card"><p>載入失敗：${e.message||e}</p></div>`;
  }
}
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);
