# 【GCAKE.Space】現狀 Baseline 規格書 v1.1.0

（SPA 單檔版，模組化架構，為未來 SSG+SEO 遷移預留）

**文件用途**：盤點現有完成功能、確立模組邊界、為後續改版與 Nuxt 遷移預留清晰的插槽邊界。
**更新時間**：2026年1月19日  
**版本號**：v1.1.0  
**對應變更紀錄**：[CHANGELOG.md v1.0.1](../CHANGELOG.md#v101---2025-11-17)
**測試站**：[https://gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json)  
**GitHub Repo**：[https://github.com/gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)

---

## 版本履歷

| 版本 | 日期 | 主要變更 | 詳細紀錄 |
|------|------|---------|---------|| v1.1.0 | 2026-01-19 | Storj → IPNS 架構調整、新增 Newsletter 3 | [CHANGELOG](../CHANGELOG.md#v110---2026-01-19) || v1.0.1 | 2025-11-17 | Podcast 模組化、SDD 導入 | [CHANGELOG](../CHANGELOG.md#v101---2025-11-17) |
| v1.0 | 2025-11-16 | 初版規格書 | [CHANGELOG](../CHANGELOG.md#v100---2025-11-16) |

---

## 一、全站定位與核心目標

### 專案目標

以 ENS、IPFS、IPNS、RSS feeds 等分散式技術為基礎，建立「完全免伺服器的個人創作中心」，包含：

- 2 個 Podcast 節目（列表 + 單集詳頁）
- 3 份 Newsletter 電子報（列表 + 單篇詳頁）
- 靜態頁面（首頁、About、Works、Contact）
- 前端開發作品集（規劃中）

### 架構理念

- **靜態為主**：所有內容靜態化為 JSON，與網站一同打包至 IPFS
- **動態補充**：RSS-to-JSON 自動化流程，內容無需手動上傳
- **零成本維運**：僅需 ENS 年費 + 一次性 gas 設定，日常更新免費
- **分散式存儲**：GitHub Pages（開發） + IPFS/IPNS（公開） + ENS（域名解析）
- **模組化設計**：所有 JS/CSS/HTML 皆以插槽邊界明確分隔，未來可無痛遷移 Nuxt/Vue

---

## 二、技術棧與約束條件（Baseline）

### 必須遵守的約束

1. **前端技術**
   - 純 HTML/CSS/JavaScript（ES modules）
   - 單一 `index.html` + 單一 `style.css`
   - 採用 hash route SPA 架構（#podcast_1, #podcast_1-detail?id=xxx）
   - 支援離線瀏覽（本地 JSON 緩存）

2. **數據來源**
   - 靜態內容：`staticContent.js` 物件化管理（首頁、About、Works、Contact）
   - 動態內容：`/data/*.json` RSS-to-JSON 輸出
   - 備援來源：多 IPFS Gateway fallback

3. **部署與維護**
   - GitHub Pages：開發測試站
   - IPFS：公開發佈站（通過 Pinata 或其他 provider）
   - ENS：域名解析（長期投資）
   - 無任何後端服務、數據庫、CDN

4. **禁止事項**
   - ❌ 不使用任何伺服器或後端 API
   - ❌ 不使用用戶認證或登錄機制
   - ❌ 不涉及個人數據存儲
   - ❌ 不使用外部資源（Google Fonts、Bootstrap 等）
   - ❌ 禁用 inline JS/事件處理（所有互動由模組管理）
   - ❌ 禁用 ID selector（除 main-content 等核心 slot）

---

## 三、資訊架構（IA）與頁面結構

### 全站結構樹

```text
🏠 首頁 (Home)
   ├─ 導航欄 (NAV)
   ├─ Hero Section（名字 + 簡介 + 快速導航）
   └─ CTA 按鈕（進入作品集、聯絡我）

📻 Podcast 中心
   ├─ Podcast 1（喂喂你還好不好）
   │  ├─ 列表頁（podcast_1）
   │  └─ 詳頁（podcast_1-detail?id=guid）
   ├─ Podcast 2（雞蛋糕孵蛋中）
   │  ├─ 列表頁（podcast_2）
   │  └─ 詳頁（podcast_2-detail?id=guid）

📧 Newsletter 中心
   ├─ Newsletter 1（喂喂你還好不好）
   │  ├─ 列表頁（newsletter_1）
   │  └─ 詳頁（newsletter_1-detail?id=slug）
   ├─ Newsletter 2（區塊鏈文摘）
   │  ├─ 列表頁（newsletter_2）
   │  └─ 詳頁（newsletter_2-detail?id=slug）
   ├─ Newsletter 3（雞蛋糕的前端修煉屋）
   │  ├─ 列表頁（newsletter_3）
   │  └─ 詳頁（newsletter_3-detail?id=slug）

👤 關於我 (About)
   ├─ 個人簡介
   ├─ 主要技能與成就
   └─ 聯絡方式

💼 作品集 (Works)
   ├─ Taiwan Podcaster 龐大資訊人包

📞 聯絡我 (Contact)
   ├─ Email
   ├─ 加密貨幣抖內
   └─ 硬體錢包推薦連結
```

### 路由對應

| 路由 Hash | 頁面名稱 | 數據來源 | 優先級 | 狀態 |
|----------|---------|--------|--------|------|
| `#home` 或 `#` | 首頁 | `staticContent.js` | P0 | ✅ 完成 |
| `#podcast_1` | Podcast 1 列表 | `/data/podcast_1.json` | P1 | ✅ 完成 |
| `#podcast_1-detail?id=xxx` | Podcast 1 詳頁 | `/data/podcast_1.json` | P1 | ✅ 完成 |
| `#podcast_2` | Podcast 2 列表 | `/data/podcast_2.json` | P1 | ✅ 完成 |
| `#podcast_2-detail?id=xxx` | Podcast 2 詳頁 | `/data/podcast_2.json` | P1 | ✅ 完成 |
| `#newsletter_1` | Newsletter 1 列表 | `/data/newsletter_1.json` | P2 | ⏳ 進行中 |
| `#newsletter_1-detail?id=xxx` | Newsletter 1 詳頁 | `/data/newsletter_1.json` | P2 | ⏳ 進行中 |
| `#newsletter_2` | Newsletter 2 列表 | `/data/newsletter_2.json` | P2 | ⏳ 進行中 |
| `#newsletter_2-detail?id=xxx` | Newsletter 2 詳頁 | `/data/newsletter_2.json` | P2 | ⏳ 進行中 |
| `#newsletter_3` | Newsletter 3 列表 | `/data/newsletter_3.json` | P2 | ⏳ 進行中 |
| `#newsletter_3-detail?id=xxx` | Newsletter 3 詳頁 | `/data/newsletter_3.json` | P2 | ⏳ 進行中 |
| `#about` | 關於我 | `staticContent.js` | P2 | ✅ 完成 |
| `#works` | 作品集 | `staticContent.js` | P2 | ✅ 完成 |
| `#contact` | 聯絡我 | `staticContent.js` | P3 | ✅ 完成 |

---

## 四、現有模組結構與邊界定義

> 最後更新：v1.0.1 (2025-11-17) | [變更紀錄](../CHANGELOG.md#v101---2025-11-17)

### 4.1 文件結構概覽

```text
rss-to-json/
├─ index.html                  # 主 HTML（唯一入口，所有 Section 皆標記插槽）
├─ style.css                   # 單一 CSS（主題 + RWD + 各 Section 樣式）
├─ js/
│  ├─ app.js                   # 路由、初始化、核心 SPA 邏輯
│  ├─ staticContent.js          # 靜態頁面內容（物件化管理）
│  ├─ static_render.js          # 靜態頁渲染模組（home/about/works/contact）
│  ├─ podcast_render.js         # Podcast 列表 + 詳頁渲染模組
│  ├─ newsletter_render.js      # Newsletter 列表 + 詳頁渲染模組
│  ├─ util.js                   # 工具函式（分頁、日期格式化等）
│  └─ pages.js                  # （舊版，待移除）
├─ data/
│  ├─ podcast_1.json           # Podcast 1 內容（RSS-to-JSON 輸出）
│  ├─ podcast_2.json           # Podcast 2 內容
│  ├─ newsletter_1.json        # Newsletter 1 內容
│  ├─ newsletter_2.json        # Newsletter 2 內容
│  └─ newsletter_3.json        # Newsletter 3 內容（雞蛋糕的前端修煉屋）
├─ img/                        # 圖片資源
├─ docs/                       # 文件資料夾
├─ dist/                       # 構建輸出
├─ scripts/                    # 自動化腳本
└─ spec/
   └─ 00-baseline-spec.md       # (本文件) 現狀基線規格書
```

### 4.2 HTML 層結構（單一 index.html）

所有 Section 都在同一份 `index.html` 中，用註釋標記邊界：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GCAKE.Space - 雞蛋糕的創作空間</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  
  <!-- SECTION:NAV-START -->
  <header>
    <nav>
      <!-- 導航連結 -->
    </nav>
  </header>
  <!-- SECTION:NAV-END -->

  <!-- SECTION:HERO-START -->
  <!-- 首頁 Hero（暫時保留，實際內容由 JS 動態渲染） -->
  <!-- SECTION:HERO-END -->

  <!-- SECTION:MAIN-START -->
  <main id="main-content" class="main-content">
    <!-- SPA 動態渲染區 -->
  </main>
  <!-- SECTION:MAIN-END -->

  <!-- SECTION:FOOTER-START -->
  <footer>
    <!-- 頁腳內容 -->
  </footer>
  <!-- SECTION:FOOTER-END -->

  <script type="module" src="/js/app.js"></script>
</body>
</html>
```

### 4.3 JavaScript 層結構

#### 層級劃分

| 層級 | 檔案 | 責務 | 說明 |
|-----|------|------|------|
| **Init Layer** | `app.js` | 路由、狀態初始化、事件委派 | 應用程式入口，控制整體流程 |
| **Data Layer** | `staticContent.js` | 靜態內容定義（物件結構） | 首頁、About、Works、Contact 內容 |
| **Data Layer** | `/data/*.json` | 動態 JSON 資料 | RSS-to-JSON 輸出，Podcast/Newsletter 內容 |
| **Render Layer** | `static_render.js` | 靜態頁渲染邏輯 | 將 staticContent 物件轉為 HTML |
| **Render Layer** | `podcast_render.js` | Podcast 列表 + 詳頁渲染 | 包含 renderPodcastList, renderPodcastDetail |
| **Render Layer** | `newsletter_render.js` | Newsletter 列表 + 詳頁渲染 | 包含 renderNewsletterList, renderNewsletterDetail |
| **Utility Layer** | `util.js` | 工具函式 | 分頁、日期格式化、HTML escape 等 |

#### 核心模組說明

**app.js**

- 責務：初始化、路由管理、事件監聽
- 流程：
  1. 初始化時偵聽 `hashchange` 事件
  2. 根據 `location.hash` 判斷要呈現的頁面
  3. 動態載入對應的渲染模組
  4. 將頁面內容渲染到 `#main-content`
  5. 支援 async 渲染（Podcast/Newsletter 需 fetch JSON）

路由表範例：

```javascript
const routes = {
  '': () => main.innerHTML = renderHome(staticPages.home),
  'home': () => main.innerHTML = renderHome(staticPages.home),
  'podcast_1': async () => { main.innerHTML = await renderPodcastList('podcast_1'); },
  'podcast_2': async () => { main.innerHTML = await renderPodcastList('podcast_2'); },
  // ... 其他路由
};
```

**staticContent.js**

- 責務：管理所有靜態內容（物件化結構，非 HTML 字串）
- 導出物件結構：

```javascript
export const staticPages = {
  home: { title, description, grid: [...] },
  about: { title, avatar, paragraphs: [...], contact: {...} },
  works: { title, resources: [...] },
  contact: { title, cards: [...] }
};
```

**static_render.js**

- 責務：將 staticContent 物件轉換為 HTML 字串
- 導出函式：

```javascript
export function renderHome(obj) { /* 將 obj 組成 HTML */ }
export function renderAbout(obj) { /* ... */ }
export function renderWorks(obj) { /* ... */ }
export function renderContact(obj) { /* ... */ }
```

**podcast_render.js**

- 責務：Podcast 列表頁與詳頁渲染邏輯
- 導出函式：

```javascript
export async function renderPodcastList(jsonPath, page = 1) { 
  // fetch JSON + 渲染列表
}
export async function renderPodcastDetail(jsonPath, guid) { 
  // fetch JSON + 渲染詳頁
}
```

**newsletter_render.js**

- 責務：Newsletter 列表頁與詳頁渲染邏

## 五、版本控制與更新日誌

本規格書採用語意化版本號（Semantic Versioning）：

- **主版本號（Major）**：不相容的架構變更（如框架遷移）
- **次版本號（Minor）**：新增功能但向下相容（如新增 Newsletter）
- **修訂號（Patch）**：Bug 修正與小幅調整

所有變更細節請參閱：[CHANGELOG.md](../CHANGELOG.md)
