import {
  getBasePath,
  paginate,
  renderPager,
  fmtDate,
  htmlEscape,
} from "./util.js";
const PAGESIZE = 12;

// 單集封面多格式 fallback 工具
function getEpisodeImage(ep, fallback) {
  // 優先單集 itunes:image
  if (ep["itunes:image"]) {
    // itunes:image 可能為 object
    if (ep["itunes:image"].$ && typeof ep["itunes:image"].$.href === "string")
      return ep["itunes:image"].$.href;
    // 也可能為 { href: ... }
    if (ep["itunes:image"].href && typeof ep["itunes:image"].href === "string")
      return ep["itunes:image"].href;
    // 或字串
    if (typeof ep["itunes:image"] === "string") return ep["itunes:image"];
  }
  // fallback: 節目封面
  if (ep.coverimg) return ep.coverimg;
  if (ep.showCover) return ep.showCover;
  return fallback || "/img/podcast-default.png";
}

// 時長統一格式
function formatDuration(duration) {
  if (typeof duration === "string" && duration.includes(":")) return duration;
  let sec = parseInt(duration, 10);
  if (isNaN(sec) || sec <= 0) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h === 0) return [m, s].map((v) => String(v).padStart(2, "0")).join(":");
  return [h, m, s]
    .map((v, i) => (i === 0 ? v : String(v).padStart(2, "0")))
    .join(":");
}

// Podcast 列表渲染函數
export async function renderPodcastList(jsonPath, page = 1) {
  const base = getBasePath();
  const url = `${base}data/${jsonPath}.json`;
  let items;
  try {
    const res = await fetch(url, { cache: "no-cache" });
    items = await res.json();
    if (!Array.isArray(items)) throw new Error("Podcast JSON 必須是單集陣列");
  } catch (e) {
    return `<div class="card"><p>載入失敗: ${e.message}</p></div>`;
  }

  const showCover =
    items?.[0]?.coverimg ||
    items?.[0]?.image ||
    items?.[0]?.showCover ||
    "/img/podcast-default.png";
  const pageItems = paginate(items, page, PAGESIZE);
  const totalPages = Math.ceil(items.length / PAGESIZE);

  let html = `<div class="card"><p class="meta">共 ${items.length} 篇 · 分頁 ${page}/${totalPages}</p></div>`;
  pageItems.forEach((ep) => {
    const imgSrc = getEpisodeImage(ep, showCover);
    html += `
      <div class="card" style="cursor:pointer;" onclick="location.hash='#viewPodcast?json=${encodeURIComponent(
        jsonPath
      )}&guid=${encodeURIComponent(ep.guid)}'">
        <div style="display:flex;align-items:center;">
          ${
            imgSrc
              ? `<img src="${imgSrc}" alt="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:1rem;">`
              : ""
          }
          <div>
            <h3 style="margin:0.2rem 0;">${htmlEscape(ep.title || "")}</h3>
            <div class="meta">
              ${fmtDate(ep.pubDate || ep.date || "")}
              ${ep.duration ? `｜${formatDuration(ep.duration)}` : ""}
              ${ep.season ? `｜S${ep.season}` : ""}
              ${ep.episode ? `E${ep.episode}` : ""}
            </div>
          </div>
        </div>
      </div>`;
  });

  html += `<div id="podcast-pager"></div>`;
  setTimeout(() => {
    const pager = document.getElementById("podcast-pager");
    if (pager) {
      renderPager(pager, totalPages, page, async (p) => {
        document.getElementById("main-content").innerHTML =
          await renderPodcastList(jsonPath, p);
        window.scrollTo(0, 0);
      });
    }
  }, 0);

  return html;
}

// 詳細頁渲染
export async function renderPodcastDetail(jsonPath, guid) {
  // 1. 載入 podcast JSON
  const base = getBasePath();
  const url = `${base}data/${jsonPath}.json`;
  const res = await fetch(url);
  const items = await res.json();

  // 2. 單集查找（這裡放 find）
  const ep = items.find((x) => x.guid === guid);
  if (!ep) return `<div class="card"><p>找不到單集（guid=${guid}）。</p></div>`;

  // 3. 渲染詳頁內容

  // 滾動到標題
  setTimeout(() => {
    // 取得單集 <h2 ...>，取其 parent.card
    const heading = document.getElementById("podcast-article-title");
    const card = heading && heading.closest(".card");
    if (card) {
      // 捲到 .card 的頂端
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (heading) {
      // fallback: 只捲動標題本身
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 0);

  // Firstory Player嵌入
  function firstoryEmbedFromPermalink(permalink) {
    if (typeof permalink !== "string") return null;
    if (permalink.startsWith("https://open.firstory.me/story/"))
      return permalink.replace("/story/", "/embed/story/");
    return null;
  }
  const embed = firstoryEmbedFromPermalink(ep.permalink || ep.link);

  // 說明欄位，帶 HTML 的直接插入 innerHTML，否則 escape
  let description = ep.description_html || ep.description || ep.content || "";
  if (!/<\w+/.test(description)) {
    description = htmlEscape(description).replace(/\n/g, "<br>");
  }

  return `
    <div class="card">
      <h2 id="podcast-article-title">${htmlEscape(ep.title || "")}</h2>
      <div class="meta">
        ${fmtDate(ep.pubDate || ep.date || "")}
        ${ep.duration ? `｜${formatDuration(ep.duration)}` : ""}
        ${ep.season ? `｜S${ep.season}` : ""}
        ${ep.episode ? `E${ep.episode}` : ""}
      </div>
      ${
        embed
          ? `<iframe class="podcast-player" src="${embed}" allow="autoplay"></iframe>`
          : ""
      }
      <div class="desc" style="margin-top:1em;">${description}</div>
      <div class="pager" style="margin-top:40px;">
        <a href="javascript:location.hash='#${jsonPath}';setTimeout(()=>window.dispatchEvent(new HashChangeEvent('hashchange')),0);">← 返回列表</a>
      </div>
    </div>`;
}
