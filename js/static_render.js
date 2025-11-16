// static_render.js

export function renderHome(obj) {
    let html = `<h1>${obj.title}</h1><p>${obj.description}</p><div class="grid">`;
    obj.grid.forEach(card => {
      html += `<div class="card"><h3>${card.section}</h3>`;
      card.items.forEach(item => {
        html += `<p><a href="${item.href}">${item.text}</a></p>`;
      });
      html += `</div>`;
    });
    html += `</div>`;
    return html;
  }
  
  export function renderWorks(obj) {
    let html = `<h1>${obj.title}</h1>`;
    obj.resources.forEach(r => {
      html += `<div class="card"><h3>${r.name}</h3><p>`;
      r.links.forEach(link => {
        html += `<a href="${link.href}"${link.blank ? ' target="_blank" rel="noopener"' : ''}>${link.text}</a>`;
      });
      html += `</p></div>`;
    });
    return html;
  }
  
  export function renderAbout(obj) {
    let html = `<h1>${obj.title}</h1>`;
    if (obj.avatar) html += `<img src="${obj.avatar.src}" alt="${obj.avatar.alt}" class="avatar">`;
    obj.paragraphs.forEach(p => { html += `<p>${p}</p>`; });
    if (obj.contact) {
      html += `<p>${obj.contact.label}: <a href="mailto:${obj.contact.email}">${obj.contact.email}</a></p>`;
    }
    return html;
  }
  
  export function renderContact(obj) {
    let html = `<h1>${obj.title}</h1>`;
    obj.cards.forEach(card => {
      html += `<div class="card"><h3>${card.title}</h3>`;
      if (card.list && Array.isArray(card.list)) {
        html += `<ul>`;
        card.list.forEach(item => {
          // 信箱、抖內頁
          if (item.type === "email" || item.type === "external") {
            html += `<li><a href="${item.href}"${item.blank ? ' target="_blank" rel="noopener"' : ''}>${item.value}</a></li>`;
          }
          // 帳號/地址
          else if (item.href) {
            html += `<li><a href="${item.href}"${item.blank ? ' target="_blank" rel="noopener"' : ''}>${item.value}</a></li>`;
          }
          else {
            html += `<li>${item.value}${item.type ? ' (' + item.type + ')' : ''}</li>`;
          }
        });
        html += `</ul>`;
      }
      html += `</div>`;
    });
    return html;
  }
  