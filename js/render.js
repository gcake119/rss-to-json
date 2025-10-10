// 提供共用的元件及分頁器

// 分頁器產生器
export function pager(totalPages, baseHash, current=1) {
  let html = `<div class="pager">`;
  for(let p=1; p<=totalPages; p++) {
    const cls = p === current ? 'current' : '';
    html += `<a class="${cls}" href="${baseHash}?p=${p}">第${p}頁</a>`;
  }
  html += `</div>`;
  return html;
}

// newsletter/文章內文清理排版
export function cleanContentHtml(html, coverUrl) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  for (const img of wrapper.querySelectorAll('img')) {
    if (coverUrl && img.src === coverUrl) {
      img.remove();
      continue;
    }
    img.classList.add('newsletter-img');
    img.setAttribute('loading', 'lazy');
  }
  for (const sel of [
    '.captioned-image-container','.button','.subscribe-button','.share',
    '.sharing','.newsletter-toolbar','[data-testid="SubscriptionButton"]',
    'form','iframe','svg','.icon','.subscription-widget'
  ]) {
    for (const el of wrapper.querySelectorAll(sel)) { el.remove(); }
  }
  for (const el of wrapper.querySelectorAll('a,button')) {
    const isBlock = (
      el.tagName === 'BUTTON' ||
      window.getComputedStyle(el).display === 'block' ||
      el.className.match(/button|subscribe|share|icon/i)
    );
    if (isBlock && el.textContent.match(/訂閱|subscribe|分享|share/i)) el.remove();
  }
  return wrapper.innerHTML;
}
