// pages.js
import { renderPodcastList } from './podcast_render.js';
import { renderNewsletterList } from './newsletter_render.js';
import { getBasePath } from './util.js';

// Podcast 第一檔節目頁面
export async function pagePodcast1() {
  const head = `
    <h1>Podcast｜《喂喂你還好不好》</h1>
    <div class="card">
      <p>談精神健康、康復與支持網絡的真實分享。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `;
  const list = await renderPodcastList('podcast_1');
  return head + list;
}

export async function pagePodcast2() {
  const head = `
    <h1>Podcast｜《雞蛋糕孵蛋中》</h1>
    <div class="card">
      <p>第二檔節目，主題延伸與創作實驗。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `;
  const list = await renderPodcastList('podcast_2');
  return head + list;
}

export async function pageNewsletter1() {
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
  const list = await renderNewsletterList('newsletter_1');
  return head + list;
}

export async function pageNewsletter2() {
  const head = `
    <h1>Newsletter｜《區塊鏈文摘》</h1>
    <div class="card">
      <ul>
        <li>Substack：<a href="https://taiweb3.substack.com/" target="_blank" rel="noopener">連結</a></li>
        <li>Paragraph：<a href="https://paragraph.com/@tw3" target="_blank" rel="noopener">連結</a></li>
      </ul>
    </div>
  `;
  const list = await renderNewsletterList('newsletter_2');
  return head + list;
}
