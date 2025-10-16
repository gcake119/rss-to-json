(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();function p(e=""){return(e||"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t])}function w(e){try{return new Date(e).toISOString().slice(0,16).replace("T"," ")}catch{return e||""}}function f(){const e=location.hash.split("?"),t=new URLSearchParams(e[1]||"");return Object.fromEntries(t.entries())}function v(e,t=1,s=10){return e.slice((t-1)*s,t*s)}function E(e,t,s,n){let a="";for(let r=1;r<=t;r++)a+=`<button onclick="${n.name}(${r})"${r===s?' style="font-weight:bold"':""}>${r}</button> `;e.innerHTML=a}const d={home:`
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
  `},g=12;function L(e,t){if(e["itunes:image"]){if(e["itunes:image"].$&&typeof e["itunes:image"].$.href=="string")return e["itunes:image"].$.href;if(e["itunes:image"].href&&typeof e["itunes:image"].href=="string")return e["itunes:image"].href;if(typeof e["itunes:image"]=="string")return e["itunes:image"]}return e.coverimg?e.coverimg:e.showCover?e.showCover:t}function $(e){if(typeof e=="string"&&e.includes(":"))return e;let t=parseInt(e,10);if(isNaN(t)||t<=0)return"";const s=Math.floor(t/3600),n=Math.floor(t%3600/60),a=t%60;return s===0?[n,a].map(r=>String(r).padStart(2,"0")).join(":"):[s,n,a].map((r,i)=>i===0?r:String(r).padStart(2,"0")).join(":")}async function u(e,t=1){const s=`/data/${e}.json`;let n;try{if(n=await(await fetch(s,{cache:"no-cache"})).json(),!Array.isArray(n))throw new Error("Podcast JSON 必須是單集陣列")}catch(o){return`<div class="card"><p>載入失敗: ${o.message}</p></div>`}const a=n?.[0]?.coverimg||n?.[0]?.image||n?.[0]?.showCover||"/img/podcast-default.png",r=v(n,t,g),i=Math.ceil(n.length/g);let l=`<div class="card"><p class="meta">共 ${n.length} 篇 · 分頁 ${t}/${i}</p></div>`;return r.forEach(o=>{const c=L(o,a);l+=`
      <div class="card" style="cursor:pointer;" onclick="location.hash='#viewPodcast?json=${encodeURIComponent(e)}&guid=${encodeURIComponent(o.guid)}'">
        <div style="display:flex;align-items:center;">
          ${c?`<img src="${c}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">`:""}
          <div>
            <h3 style="margin:0.2rem 0;">${p(o.title||"")}</h3>
            <div class="meta">
              ${w(o.pubDate||o.date||"")}
              ${o.duration?`｜${$(o.duration)}`:""}
              ${o.season?`｜S${o.season}`:""}
              ${o.episode?`E${o.episode}`:""}
            </div>
          </div>
        </div>
      </div>`}),l+='<div id="podcast-pager"></div>',setTimeout(()=>{const o=document.getElementById("podcast-pager");o&&E(o,i,t,async c=>{document.getElementById("main-content").innerHTML=await u(e,c),window.scrollTo(0,0)})},0),l}async function _(e,t){const s=`/data/${e}.json`,r=(await(await fetch(s)).json()).find(c=>c.guid===t);if(!r)return`<div class="card"><p>找不到單集（guid=${t}）。</p></div>`;setTimeout(()=>{const c=document.getElementById("podcast-article-title"),m=c&&c.closest(".card");m?m.scrollIntoView({behavior:"smooth",block:"start"}):c&&c.scrollIntoView({behavior:"smooth",block:"start"})},0);function i(c){return typeof c!="string"?null:c.startsWith("https://open.firstory.me/story/")?c.replace("/story/","/embed/story/"):null}const l=i(r.permalink||r.link);let o=r.description_html||r.description||r.content||"";return/<\w+/.test(o)||(o=p(o).replace(/\n/g,"<br>")),`
    <div class="card">
      <h2 id="podcast-article-title">${p(r.title||"")}</h2>
      <div class="meta">
        ${w(r.pubDate||r.date||"")}
        ${r.duration?`｜${$(r.duration)}`:""}
        ${r.season?`｜S${r.season}`:""}
        ${r.episode?`E${r.episode}`:""}
      </div>
      ${l?`<iframe class="podcast-player" src="${l}" allow="autoplay"></iframe>`:""}
      <div class="desc" style="margin-top:1em;">${o}</div>
      <div class="pager" style="margin-top:40px;">
        <a href="javascript:location.hash='#${e}';setTimeout(()=>window.dispatchEvent(new HashChangeEvent('hashchange')),0);">← 返回列表</a>
      </div>
    </div>`}const T=20;async function y(e,t=1){const n=await(await fetch(`/data/${e}.json`)).json();return"<ul>"+v(n,t,T).map(i=>{const l=i.coverimg?.src?`<img src="${i.coverimg.src}" alt="cover" width="80" style="vertical-align:middle; margin-right:8px;">`:"";return`<li>
          <a href="article-${i.id}" onclick="window.showNewsletterDetail && showNewsletterDetail('${e}', '${i.id}'); return false;">
            ${l}
            ${i.title}
          </a>
          ${i.subtitle?`<br><small>${i.subtitle}</small>`:""}
          <br><small>${i.pubDate||i.date}</small>
        </li>`}).join("")+"</ul>"}async function k(e,t){const a=(await(await fetch(`/data/${e}.json`)).json()).find(c=>c.id===t);if(!a)return"<p>查無此文章</p>";const r=a.coverimg?.src?`<img src="${a.coverimg.src}" alt="cover" width="240"><br>`:"",i=a.subtitle?`<h3>${a.subtitle}</h3>`:"",l=a.link?`<b><a href="${a.link}" target="_blank" rel="noopener">原文連結</a></b><br>`:"",o=P(a.blocks||a.contentBlocks||[]);return`
    <h2>${a.title}</h2>
    ${i}
    <b>${a.pubDate||a.date}</b><br>
    ${r}
    ${l}
    <div>${o}</div>
  `}function P(e=[]){return e.map(t=>{switch(t.type){case"paragraph":return`<p>${t.content?.text||""}</p>`;case"heading":return`<h${t.attrs?.level||2}>${t.content?.text||""}</h${t.attrs?.level||2}>`;case"bulletList":return`<ul>${t.content?t.content.map(s=>`<li>${s.content?.text||""}</li>`).join(""):""}</ul>`;case"horizontalRule":return"<hr>";case"table":return`<table>${t.content?t.content.map(s=>`<tr>${s.content?s.content.map(n=>`<td>${n.content?.text||""}</td>`).join(""):""}</tr>`).join(""):""}</table>`;default:return`<div style="color:gray;">未支援型態: ${t.type}</div>`}}).join("")}async function j(){const e=`
    <h1>Podcast｜《喂喂你還好不好》</h1>
    <div class="card">
      <p>談精神健康、康復與支持網絡的真實分享。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `,t=await u("podcast_1");return e+t}async function S(){const e=`
    <h1>Podcast｜《雞蛋糕孵蛋中》</h1>
    <div class="card">
      <p>第二檔節目，主題延伸與創作實驗。</p>
      <p><a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">支持與贊助</a></p>
    </div>
  `,t=await u("podcast_2");return e+t}async function I(){const e=`
    <h1>Newsletter｜《喂喂你還好不好》</h1>
    <div class="card">
      <ul>
        <li>Firstory：<a href="https://open.firstory.me/join/wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
        <li>Substack：<a href="https://wwhowbuhow.substack.com/" target="_blank" rel="noopener">連結</a></li>
        <li>Paragraph：<a href="https://paragraph.com/@wwhowbuhow" target="_blank" rel="noopener">連結</a></li>
      </ul>
    </div>
  `,t=await y("newsletter_1");return e+t}async function M(){const e=`
    <h1>Newsletter｜《區塊鏈文摘》</h1>
    <div class="card">
      <ul>
        <li>Substack：<a href="https://taiweb3.substack.com/" target="_blank" rel="noopener">連結</a></li>
        <li>Paragraph：<a href="https://paragraph.com/@tw3" target="_blank" rel="noopener">連結</a></li>
      </ul>
    </div>
  `,t=await y("newsletter_2");return e+t}const h={podcast_1:j,podcast_2:S,newsletter_1:I,newsletter_2:M};window.switchContent=async function(e,t){if(h[t]){const s=await h[t]();document.getElementById("main-content").innerHTML=s;return}if(e==="static"&&d[t]){document.getElementById("main-content").innerHTML=d[t];return}document.getElementById("main-content").innerHTML="<p>找不到頁面</p>"};async function b(){const[e]=location.hash.replace("#","").split("?"),t=e||"home",s=document.getElementById("main-content");try{if(t==="viewPodcast"){const n=f();!n.json||!n.guid?s.innerHTML='<div class="card"><p>缺少參數。</p></div>':s.innerHTML=await _(n.json,n.guid)}else if(t==="viewNewsletter"){const n=f();!n.dir||!n.slug?s.innerHTML='<div class="card"><p>缺少參數。</p></div>':s.innerHTML=await k(n.dir,n.slug)}else h[t]?s.innerHTML=await h[t]():s.innerHTML=d[t]||d.home}catch(n){console.error("渲染錯誤:",n),s.innerHTML=`<div class="card"><p>載入失敗：${n.message||n}</p></div>`}}window.addEventListener("hashchange",b);document.addEventListener("DOMContentLoaded",b);
