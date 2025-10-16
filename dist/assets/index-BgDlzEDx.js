(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function v(){const e=window.location.pathname;return e.endsWith("index.html")?e.replace("index.html",""):e}function u(e=""){return(e||"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t])}function $(e){try{return new Date(e).toISOString().slice(0,16).replace("T"," ")}catch{return e||""}}function g(){const e=location.hash.split("?"),t=new URLSearchParams(e[1]||"");return Object.fromEntries(t.entries())}function y(e,t=1,s=10){return e.slice((t-1)*s,t*s)}function _(e,t,s,n){let r="";for(let o=1;o<=t;o++)r+=`<button onclick="${n.name}(${o})"${o===s?' style="font-weight:bold"':""}>${o}</button> `;e.innerHTML=r}const h={home:`
    <h1>Welcome to GCAKE.Space | 雞蛋糕的多重宇宙</h1>
    <p>個人品牌與創作空間，聚焦 Podcast、電子報與研究作品。</p>
    <div class="grid">
      <div class="card">
        <h3>Podcast</h3>
        <p><a href="#podcast_1">《喂喂你還好不好》</a></p>
        <p><a href="#podcast_2">《雞蛋糕孵蛋中》</a></p>
      </div>
      <div class="card">
        <h3>Newsletter</h3>
        <p><a href="#newsletter_1">喂喂你還好不好</a></p>
        <p><a href="#newsletter_2">區塊鏈文摘</a></p>
      </div>
    </div>
  `,works:`
    <h1>Works & Resources</h1>
    <div class="card">
      <h3>Taiwan Podcaster 龐大資訊人包</h3>
      <p><a href="https://sites.google.com/view/taiwanpodcast/" target="_blank" rel="noopener">入口 1</a> ｜ <a href="https://sites.google.com/view/taiwanpodcast/%E9%A6%96%E9%A0%81?authuser=0" target="_blank" rel="noopener">入口 2</a></p>
    </div>
  `,about:`
    <h1>About</h1>
    <img src="img/gcake_pod.png" alt="Avatar" class="avatar">
    <p>現役躁鬱症患者，有一個 podcast 、兩份電子報。</p>
    <p>運動科學（運動生物力學）研究員、區塊鏈推廣者。</p>
    <p>台灣最大免費 Podcast 製作教學網站內容編輯。</p>
    <p>邀約聯絡：<a href="mailto:wwhowbuhow@pm.me">wwhowbuhow@pm.me</a></p>
  `,contact:`
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
  `},w=12;function T(e,t){if(e["itunes:image"]){if(e["itunes:image"].$&&typeof e["itunes:image"].$.href=="string")return e["itunes:image"].$.href;if(e["itunes:image"].href&&typeof e["itunes:image"].href=="string")return e["itunes:image"].href;if(typeof e["itunes:image"]=="string")return e["itunes:image"]}return e.coverimg?e.coverimg:e.showCover?e.showCover:t}function b(e){if(typeof e=="string"&&e.includes(":"))return e;let t=parseInt(e,10);if(isNaN(t)||t<=0)return"";const s=Math.floor(t/3600),n=Math.floor(t%3600/60),r=t%60;return s===0?[n,r].map(o=>String(o).padStart(2,"0")).join(":"):[s,n,r].map((o,a)=>a===0?o:String(o).padStart(2,"0")).join(":")}async function m(e,t=1){const n=`${v()}data/${e}.json`;let r;try{if(r=await(await fetch(n,{cache:"no-cache"})).json(),!Array.isArray(r))throw new Error("Podcast JSON 必須是單集陣列")}catch(i){return`<div class="card"><p>載入失敗: ${i.message}</p></div>`}const o=r?.[0]?.coverimg||r?.[0]?.image||r?.[0]?.showCover||"/img/podcast-default.png",a=y(r,t,w),l=Math.ceil(r.length/w);let d=`<div class="card"><p class="meta">共 ${r.length} 篇 · 分頁 ${t}/${l}</p></div>`;return a.forEach(i=>{const c=T(i,o);d+=`
      <div class="card" style="cursor:pointer;" onclick="location.hash='#viewPodcast?json=${encodeURIComponent(e)}&guid=${encodeURIComponent(i.guid)}'">
        <div style="display:flex;align-items:center;">
          ${c?`<img src="${c}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">`:""}
          <div>
            <h3 style="margin:0.2rem 0;">${u(i.title||"")}</h3>
            <div class="meta">
              ${$(i.pubDate||i.date||"")}
              ${i.duration?`｜${b(i.duration)}`:""}
              ${i.season?`｜S${i.season}`:""}
              ${i.episode?`E${i.episode}`:""}
            </div>
          </div>
        </div>
      </div>`}),d+='<div id="podcast-pager"></div>',setTimeout(()=>{const i=document.getElementById("podcast-pager");i&&_(i,l,t,async c=>{document.getElementById("main-content").innerHTML=await m(e,c),window.scrollTo(0,0)})},0),d}async function k(e,t){const n=`${v()}data/${e}.json`,a=(await(await fetch(n)).json()).find(c=>c.guid===t);if(!a)return`<div class="card"><p>找不到單集（guid=${t}）。</p></div>`;setTimeout(()=>{const c=document.getElementById("podcast-article-title"),f=c&&c.closest(".card");f?f.scrollIntoView({behavior:"smooth",block:"start"}):c&&c.scrollIntoView({behavior:"smooth",block:"start"})},0);function l(c){return typeof c!="string"?null:c.startsWith("https://open.firstory.me/story/")?c.replace("/story/","/embed/story/"):null}const d=l(a.permalink||a.link);let i=a.description_html||a.description||a.content||"";return/<\w+/.test(i)||(i=u(i).replace(/\n/g,"<br>")),`
    <div class="card">
      <h2 id="podcast-article-title">${u(a.title||"")}</h2>
      <div class="meta">
        ${$(a.pubDate||a.date||"")}
        ${a.duration?`｜${b(a.duration)}`:""}
        ${a.season?`｜S${a.season}`:""}
        ${a.episode?`E${a.episode}`:""}
      </div>
      ${d?`<iframe class="podcast-player" src="${d}" allow="autoplay"></iframe>`:""}
      <div class="desc" style="margin-top:1em;">${i}</div>
      <div class="pager" style="margin-top:40px;">
        <a href="javascript:location.hash='#${e}';setTimeout(()=>window.dispatchEvent(new HashChangeEvent('hashchange')),0);">← 返回列表</a>
      </div>
    </div>`}const P=20;async function E(e,t=1){const n=await(await fetch(`/data/${e}.json`)).json();return"<ul>"+y(n,t,P).map(a=>{const l=a.coverimg?.src?`<img src="${a.coverimg.src}" alt="cover" width="80" style="vertical-align:middle; margin-right:8px;">`:"";return`<li>
          <a href="article-${a.id}" onclick="window.showNewsletterDetail && showNewsletterDetail('${e}', '${a.id}'); return false;">
            ${l}
            ${a.title}
          </a>
          ${a.subtitle?`<br><small>${a.subtitle}</small>`:""}
          <br><small>${a.pubDate||a.date}</small>
        </li>`}).join("")+"</ul>"}async function j(e,t){const r=(await(await fetch(`/data/${e}.json`)).json()).find(i=>i.id===t);if(!r)return"<p>查無此文章</p>";const o=r.coverimg?.src?`<img src="${r.coverimg.src}" alt="cover" width="240"><br>`:"",a=r.subtitle?`<h3>${r.subtitle}</h3>`:"",l=r.link?`<b><a href="${r.link}" target="_blank" rel="noopener">原文連結</a></b><br>`:"",d=S(r.blocks||r.contentBlocks||[]);return`
    <h2>${r.title}</h2>
    ${a}
    <b>${r.pubDate||r.date}</b><br>
    ${o}
    ${l}
    <div>${d}</div>
  `}function S(e=[]){return e.map(t=>{switch(t.type){case"paragraph":return`<p>${t.content?.text||""}</p>`;case"heading":return`<h${t.attrs?.level||2}>${t.content?.text||""}</h${t.attrs?.level||2}>`;case"bulletList":return`<ul>${t.content?t.content.map(s=>`<li>${s.content?.text||""}</li>`).join(""):""}</ul>`;case"horizontalRule":return"<hr>";case"table":return`<table>${t.content?t.content.map(s=>`<tr>${s.content?s.content.map(n=>`<td>${n.content?.text||""}</td>`).join(""):""}</tr>`).join(""):""}</table>`;default:return`<div style="color:gray;">未支援型態: ${t.type}</div>`}}).join("")}async function I(){const e=`
    <h1>Podcast｜《喂喂你還好不好》</h1>
    <div class="card">
      <p>談精神健康、康復與支持網絡的真實分享。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `,t=await m("podcast_1");return e+t}async function M(){const e=`
    <h1>Podcast｜《雞蛋糕孵蛋中》</h1>
    <div class="card">
      <p>第二檔節目，主題延伸與創作實驗。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `,t=await m("podcast_2");return e+t}async function N(){const e=`
    <h1>Newsletter｜《喂喂你還好不好》</h1>
    <div class="card">
      <ul>
        <li>Firstory：<a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
        <li>Substack：<a href="https://wwhowbuhow.substack.com/" target="_blank" rel="noopener">連結</a></li>
        <li>Paragraph：<a href="https://paragraph.com/@wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
      </ul>
    </div>
  `,t=await E("newsletter_1");return e+t}async function H(){const e=`
    <h1>Newsletter｜《區塊鏈文摘》</h1>
    <div class="card">
      <ul>
        <li>Substack：<a href="https://taiweb3.substack.com/" target="_blank" rel="noopener">連結</a></li>
        <li>Paragraph：<a href="https://paragraph.com/@tw3" target="_blank" rel="noopener">連結</a></li>
      </ul>
    </div>
  `,t=await E("newsletter_2");return e+t}const p={podcast_1:I,podcast_2:M,newsletter_1:N,newsletter_2:H};window.switchContent=async function(e,t){if(p[t]){const s=await p[t]();document.getElementById("main-content").innerHTML=s;return}if(e==="static"&&h[t]){document.getElementById("main-content").innerHTML=h[t];return}document.getElementById("main-content").innerHTML="<p>找不到頁面</p>"};async function L(){const[e]=location.hash.replace("#","").split("?"),t=e||"home",s=document.getElementById("main-content");try{if(t==="viewPodcast"){const n=g();!n.json||!n.guid?s.innerHTML='<div class="card"><p>缺少參數。</p></div>':s.innerHTML=await k(n.json,n.guid)}else if(t==="viewNewsletter"){const n=g();!n.dir||!n.slug?s.innerHTML='<div class="card"><p>缺少參數。</p></div>':s.innerHTML=await j(n.dir,n.slug)}else p[t]?s.innerHTML=await p[t]():s.innerHTML=h[t]||h.home}catch(n){console.error("渲染錯誤:",n),s.innerHTML=`<div class="card"><p>載入失敗：${n.message||n}</p></div>`}}window.addEventListener("hashchange",L);document.addEventListener("DOMContentLoaded",L);
