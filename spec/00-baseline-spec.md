# 【GCAKE.Space】現狀 Baseline 規格書 v1.0
（反向工程現有架構，為後續改版與框架遷移預留清晰邊界）

**文件用途**：盤點現有完成功能、確立模組邊界、為後續改版與 Nuxt 遷移預留明確的插槽邊界。

**更新時間**：2025年11月16日  
**測試站**：https://gcake119.github.io/rss-to-json  
**GitHub Repo**：https://github.com/gcake119/rss-to-json

---

## 一、全站定位與核心目標

### 專案目標
以 ENS、IPFS、RSS feeds、Storj 等分散式技術為基礎，建立「完全免伺服器的個人創作中心」，包含：
- 2 個 Podcast 節目（列表 + 單集詳頁）
- 2 份 Newsletter 電子報（列表 + 單集詳頁）
- 前端開發作品集（規劃中）
- 聯絡與分享功能

### 架構理念
- **靜態為主**：所有內容靜態化為 JSON，托管在 Storj + GitHub
- **動態補充**：RSS-to-JSON 自動化流程，內容無需手動上傳
- **零成本維運**：僅需 ENS 年費 + 少量鏈上 gas，無伺服器成本
- **分散式存儲**：GitHub Pages（開發） + IPFS（公開） + ENS（域名解析）

---

## 二、技術棧與約束條件（Baseline）

### 必須遵守的約束

1. **前端技術**
   - 純 HTML/CSS/JavaScript（ES modules）
   - 無任何前端框架（暫時）
   - 採用 hash route SPA 架構
   - 支援離線瀏覽（本地 JSON 緩存）

2. **數據來源**
   - 靜態內容：`staticContent.js` 硬編碼（如首頁、關於、聯絡）
   - 動態內容：`/data/*.json` RSS-to-JSON 輸出
   - 備援來源：Storj 多媒體 URL

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

---

## 三、資訊架構（IA）與頁面結構

### 全站結構樹

```
🏠 首頁 (HERO)
   ├─ 快速導航欄 (NAV)
   ├─ 名字 + 簡介
   ├─ 最新 Podcast / Newsletter 預告
   └─ CTA 按鈕（進入作品集、聯絡我）

📻 Podcast 中心
   ├─ Podcast 1（「系列名稱 1」）
   │  ├─ 列表頁（節目 1-1、1-2、1-3...）
   │  └─ 詳頁（單集播放 + 完整資訊）
   ├─ Podcast 2（「系列名稱 2」）
   │  ├─ 列表頁（節目 2-1、2-2、2-3...）
   │  └─ 詳頁（單集播放 + 完整資訊）

📧 Newsletter 中心
   ├─ Newsletter 1（「系列名稱 1」）
   │  ├─ 列表頁（期刊 1-1、1-2、1-3...）
   │  └─ 詳頁（完整內容展示）
   ├─ Newsletter 2（「系列名稱 2」）
   │  ├─ 列表頁（期刊 2-1、2-2、2-3...）
   │  └─ 詳頁（完整內容展示）

👤 關於我 (ABOUT)
   ├─ 個人簡介
   ├─ 主要技能與成就
   └─ 聯絡方式

💼 作品集 (PORTFOLIO)
   ├─ 前端作品（規劃中）
   └─ 教學資源（規劃中）

📞 聯絡我 (CONTACT)
   ├─ 聯絡表單 or 聯絡資訊
   └─ 社群連結
```

### 路由對應

| 路由 Hash | 頁面名稱 | 數據來源 | 優先級 | 狀態 |
|----------|---------|--------|--------|------|
| `#/` | 首頁 | `staticContent.js` | P0 | ✅ 完成 |
| `#/podcast/1/list` | Podcast 1 列表 | `/data/podcast_1.json` | P1 | ✅ 完成 |
| `#/podcast/1/:id` | Podcast 1 詳頁 | `/data/podcast_1.json` | P1 | ✅ 完成 |
| `#/podcast/2/list` | Podcast 2 列表 | `/data/podcast_2.json` | P1 | ✅ 完成 |
| `#/podcast/2/:id` | Podcast 2 詳頁 | `/data/podcast_2.json` | P1 | ✅ 完成 |
| `#/newsletter/1/list` | Newsletter 1 列表 | `/data/newsletter_1.json` | P2 | ⏳ 進行中 |
| `#/newsletter/1/:id` | Newsletter 1 詳頁 | `/data/newsletter_1.json` | P2 | ⏳ 進行中 |
| `#/newsletter/2/list` | Newsletter 2 列表 | `/data/newsletter_2.json` | P2 | ⏳ 進行中 |
| `#/newsletter/2/:id` | Newsletter 2 詳頁 | `/data/newsletter_2.json` | P2 | ⏳ 進行中 |
| `#/about` | 關於我 | `staticContent.js` | P2 | 📋 待規劃 |
| `#/contact` | 聯絡我 | `staticContent.js` | P3 | 📋 待規劃 |

---

## 四、現有模組結構與邊界定義

### 4.1 文件結構概覽

```
rss-to-json/
├─ index.html                  # 主 HTML（唯一入口）
├─ js/
│  ├─ app.js                   # 路由、初始化、核心邏輯
│  ├─ staticContent.js          # 靜態頁面內容定義
│  ├─ pages/
│  │  ├─ podcastList.js         # Podcast 列表頁邏輯
│  │  ├─ podcastDetail.js       # Podcast 詳頁邏輯
│  │  ├─ newsletterList.js      # Newsletter 列表頁邏輯 (待完成)
│  │  ├─ newsletterDetail.js    # Newsletter 詳頁邏輯 (待完成)
│  │  ├─ about.js               # 關於我頁面邏輯 (待規劃)
│  │  └─ contact.js             # 聯絡我頁面邏輯 (待規劃)
│  └─ components/
│     ├─ navigation.js          # 導航欄元件
│     ├─ podcast-player.js      # 音檔播放器元件
│     ├─ card.js                # 卡片元件 (可復用)
│     └─ loader.js              # 加載狀態元件
├─ css/
│  ├─ base.css                 # 全局樣式 (重置、字體、基礎佈局)
│  ├─ sections.css             # 各 Section 樣式
│  ├─ responsive.css           # RWD 斷點樣式
│  └─ themes.css               # 主題色系 (Gruvbox)
├─ data/
│  ├─ podcast_1.json           # Podcast 1 內容 (RSS-to-JSON 輸出)
│  ├─ podcast_2.json           # Podcast 2 內容 (RSS-to-JSON 輸出)
│  ├─ newsletter_1.json        # Newsletter 1 內容 (RSS-to-JSON 輸出)
│  └─ newsletter_2.json        # Newsletter 2 內容 (RSS-to-JSON 輸出)
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ fonts/
└─ docs/
   └─ spec/
      ├─ 00-baseline-spec.md       # (本文件) 現狀規格書
      ├─ 01-section-template.md    # Section 更新規格模板
      ├─ 02-data-schema.md         # 數據結構標準
      └─ CHANGELOG.md              # 規格書更新日誌
```

### 4.2 HTML 層結構（單一 index.html）

所有 Section 都在同一份 `index.html` 中，用註釋標記邊界：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <!-- Meta 與 SEO -->
</head>
<body>
  <div id="app" class="app-container">
    
    <!-- NAV SECTION: 導航欄 -->
    <!-- SECTION:NAV-START -->
    <!-- SECTION:NAV-END -->

    <!-- HERO SECTION: 首頁 -->
    <!-- SECTION:HERO-START -->
    <!-- SECTION:HERO-END -->

    <!-- MAIN CONTENT: 動態內容渲染區 -->
    <!-- SECTION:MAIN-START -->
    <main id="main-content" class="main-content"></main>
    <!-- SECTION:MAIN-END -->

    <!-- FOOTER SECTION: 頁腳 -->
    <!-- SECTION:FOOTER-START -->
    <!-- SECTION:FOOTER-END -->

  </div>

  <!-- JavaScript Modules -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

### 4.3 JavaScript 層結構

#### 層級劃分

| 層級 | 檔案 | 責務 | 說明 |
|-----|------|------|------|
| **Init Layer** | `app.js` | 路由、狀態初始化、事件委派 | 應用程式入口，控制整體流程 |
| **Data Layer** | `staticContent.js` | 靜態內容定義 | 首頁、About、Contact 等硬編碼內容 |
| **Data Layer** | `/data/*.json` | 動態 JSON 資料 | RSS-to-JSON 輸出，Podcast/Newsletter 內容 |
| **Page Layer** | `/pages/*.js` | 頁面邏輯、資料處理、事件綁定 | 各個路由對應的頁面實現 |
| **Component Layer** | `/components/*.js` | 可復用元件邏輯 | 播放器、卡片、導航等 UI 邏輯 |

#### 核心模組說明

**app.js**
- 責務：初始化、路由管理、事件監聽
- 流程：
  1. 初始化時偵聽 `hashchange` 事件
  2. 根據 `location.hash` 判斷要呈現的頁面
  3. 動態載入對應的 page 模組
  4. 將頁面內容渲染到 `#main-content`
  5. 委派 component 事件處理

```javascript
// 虛擬邏輯
const routes = {
  '/': () => renderHero(),
  '/podcast/1/list': () => loadPage('pages/podcastList.js', {series: 1}),
  '/podcast/1/:id': (params) => loadPage('pages/podcastDetail.js', {series: 1, id: params.id}),
  // ...其他路由
};

window.addEventListener('hashchange', () => {
  const hash = location.hash.slice(1);
  const page = resolveRoute(hash);
  page.render();
});
```

**staticContent.js**
- 責務：管理所有靜態內容（首頁簡介、About 描述、聯絡資訊等）
- 導出物件結構：
  ```javascript
  export const staticContent = {
    hero: { name, subtitle, cta_buttons, ... },
    about: { bio, skills, ... },
    contact: { email, social, ... }
  };
  ```

**pages/podcastList.js**
- 責務：Podcast 列表頁邏輯
- 流程：
  1. 接收 series_id（如 `podcast_1`）
  2. 從 `/data/podcast_1.json` 讀取資料
  3. 渲染列表（每個項目為可點選的卡片）
  4. 綁定「點擊進入詳頁」事件

**pages/podcastDetail.js**
- 責務：Podcast 詳頁邏輯
- 流程：
  1. 接收 series_id 與 episode_id
  2. 從 `/data/podcast_1.json` 查找特定集數
  3. 渲染詳頁（標題、播放器、完整內容、返回按鈕）
  4. 初始化音檔播放器

**components/podcast-player.js**
- 責務：音檔播放器邏輯
- 提供：進度條、音量控制、播放/暫停、下載連結等

### 4.4 CSS 層結構

所有 CSS 寫在 css file，用 slot 註釋分隔：

```css
/* ========== CSS:BASE-START ========== */
/* 全局重置、字體、基礎佈局 */
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
a { text-decoration: none; color: inherit; }
/* CSS:BASE-END */

/* ========== CSS:NAV-START ========== */
/* 導航欄樣式 */
nav { position: sticky; top: 0; ... }
/* CSS:NAV-END */

/* ========== CSS:HERO-START ========== */
/* 首頁樣式 */
.section-hero { ... }
/* CSS:HERO-END */

/* ========== CSS:MAIN-START ========== */
/* 主內容區域樣式 */
.main-content { ... }
/* CSS:MAIN-END */

/* ========== CSS:PODCAST-LIST-START ========== */
/* Podcast 列表樣式 */
.podcast-list { display: grid; ... }
/* CSS:PODCAST-LIST-END */

/* ========== CSS:PODCAST-DETAIL-START ========== */
/* Podcast 詳頁樣式 */
.podcast-detail { ... }
.podcast-player { ... }
/* CSS:PODCAST-DETAIL-END */

/* ========== CSS:RWD-START ========== */
/* 響應式設計斷點 */
@media (min-width: 768px) { ... }
@media (min-width: 1440px) { ... }
/* CSS:RWD-END */
```

---

## 五、數據結構標準與 JSON Schema

### 5.1 Podcast JSON Schema

```json
{
  "type": "podcast",
  "series_id": "podcast_1",
  "series_title": "系列名稱 1",
  "series_description": "系列簡介",
  "series_cover_url": "https://storj.example.com/covers/podcast_1_cover.jpg",
  "series_rss_url": "https://feeds.example.com/podcast_1.xml",
  "items": [
    {
      "id": "ep_001",
      "episode_number": 1,
      "title": "第 1 集：主題名稱",
      "description": "集數簡介（可含 HTML）",
      "pubDate": "2025-01-01T12:00:00Z",
      "link": "https://example.com/podcast/ep_001",
      "audio_url": "https://storj.example.com/audio/podcast_1_ep001.mp3",
      "audio_duration_seconds": 3600,
      "cover_url": "https://storj.example.com/covers/podcast_1_ep001.jpg",
      "content_encoded": "<p>完整 HTML 內容或 Markdown</p>",
      "guid": "unique_guid_for_episode",
      "storj_backup_url": "https://storj.example.com/backups/podcast_1_ep001.mp3"
    }
  ]
}
```

### 5.2 Newsletter JSON Schema

```json
{
  "type": "newsletter",
  "series_id": "newsletter_1",
  "series_title": "系列名稱 1",
  "series_description": "電子報簡介",
  "series_cover_url": "https://storj.example.com/covers/newsletter_1_cover.jpg",
  "series_rss_url": "https://feeds.example.com/newsletter_1.xml",
  "items": [
    {
      "id": "issue_001",
      "issue_number": 1,
      "title": "第 1 期：主題名稱",
      "description": "期號簡介",
      "pubDate": "2025-01-01T12:00:00Z",
      "link": "https://example.com/newsletter/issue_001",
      "cover_url": "https://storj.example.com/covers/newsletter_1_issue001.jpg",
      "content_encoded": "<p>完整 HTML 或 Markdown 內容</p>",
      "guid": "unique_guid_for_issue",
      "storj_backup_url": "https://storj.example.com/backups/newsletter_1_issue001.html"
    }
  ]
}
```

### 5.3 staticContent.js 結構

```javascript
export const staticContent = {
  site: {
    title: "GCAKE.Space - 雞蛋糕",
    description: "個人創作中心",
    author: "雞蛋糕",
    email: "contact@gcake.space",
  },
  
  hero: {
    name: "雞蛋糕",
    subtitle: "Podcast 主持人 / Web3 開發者 / 教學內容創作者",
    bio: "我在做什麼...",
    cta_buttons: [
      { text: "進入作品集", href: "#/portfolio" },
      { text: "聯絡我", href: "#/contact" }
    ],
  },
  
  about: {
    bio_paragraph_1: "第一段自我介紹...",
    bio_paragraph_2: "第二段背景與風格...",
    highlights: [
      "專長 1",
      "專長 2",
      "專長 3"
    ],
    buttons: [
      { text: "查看作品集", href: "#/portfolio" },
      { text: "聯絡我", href: "#/contact" }
    ],
  },
  
  contact: {
    email: "contact@gcake.space",
    social: [
      { name: "Twitter", url: "https://twitter.com/gcake119" },
      { name: "GitHub", url: "https://github.com/gcake119" },
      { name: "LinkedIn", url: "https://linkedin.com/in/gcake119" }
    ]
  }
};
```

---

## 六、已完成功能清單

### ✅ P0 Priority（核心）

- [x] 單一 `index.html` 入口
- [x] hash route SPA 架構
- [x] 導航欄全頁導航（各路由可切換）
- [x] 首頁 Hero Section 展示
- [x] RSS-to-JSON 流程（GitHub Action 自動轉換）

### ✅ P1 Priority（主要內容）

- [x] Podcast 1 列表頁（從 JSON 讀取並渲染）
- [x] Podcast 1 詳頁（單集選擇、播放器、完整內容）
- [x] Podcast 2 列表頁
- [x] Podcast 2 詳頁
- [x] 基礎音檔播放器（HTML5 `<audio>` 標籤）
- [x] GitHub Pages 部署

### ⏳ P2 Priority（進行中）

- [ ] Newsletter 1 列表頁
- [ ] Newsletter 1 詳頁
- [ ] Newsletter 2 列表頁
- [ ] Newsletter 2 詳頁
- [ ] SEO meta 標籤（動態更新 title、description、og:image）
- [ ] Storj 多媒體上傳流程確認

### 📋 P3 Priority（待規劃）

- [ ] About 頁面
- [ ] Contact 頁面
- [ ] Portfolio 作品集
- [ ] 推播系統（Telegram、Email 等）
- [ ] IPFS + ENS 完整部署
- [ ] Nuxt3 框架遷移

---

## 七、現有插槽標記系統

### 7.1 HTML 插槽（在 index.html 中）

所有 Section 以註釋標記邊界，格式：`<!-- SECTION:NAME-START -->` 到 `<!-- SECTION:NAME-END -->`

| Section 名稱 | 用途 | 插槽位置 |
|------------|------|--------|
| `NAV` | 導航欄 | 頁面頂部 |
| `HERO` | 首頁（靜態內容） | `NAV` 之下 |
| `MAIN` | 動態內容區（路由渲染） | `HERO` 之下 |
| `FOOTER` | 頁腳 | 頁面底部 |

### 7.2 CSS 插槽（在 `<style>` 中）

所有 CSS 段落以註釋標記邊界，格式：`/* CSS:NAME-START */` 到 `/* CSS:NAME-END */`

| Slot 名稱 | 用途 | 順序 |
|----------|------|------|
| `CSS:BASE` | 全局重置、字體、基礎佈局 | 第 1 位 |
| `CSS:NAV` | 導航欄樣式 | 第 2 位 |
| `CSS:HERO` | 首頁樣式 | 第 3 位 |
| `CSS:MAIN` | 主內容區樣式 | 第 4 位 |
| `CSS:LIST` | Podcast/Newsletter 列表樣式 | 第 5 位 |
| `CSS:PODCAST-DETAIL` | Podcast 詳頁樣式 | 第 6 位 |
| `CSS:NEWSLETTER-DETAIL` | Newsletter 詳頁樣式 | 第 7 位 |
| `CSS:RWD` | 響應式設計斷點 | 最後位 |

### 7.3 JavaScript 插槽（在各檔案中）

各 `.js` 模組內部用註釋標記邊界，格式：`// MODULE:NAME-START` 到 `// MODULE:NAME-END`

例如在 `app.js` 中：
```javascript
// MODULE:ROUTES-START
const routes = { ... };
// MODULE:ROUTES-END

// MODULE:HISTORY-START
window.addEventListener('hashchange', () => { ... });
// MODULE:HISTORY-END
```

---

## 八、RWD 斷點與設計規則

### 設計優先級
採用 **Mobile-First** 策略，從小屏開始設計，逐步向大屏擴展。

### 斷點定義

| 裝置 | 寬度範圍 | 用途 | 佈局特色 |
|-----|---------|------|---------|
| **手機** | 320px - 767px | 主要目標設備 | 單欄、縱向堆疊 |
| **平板** | 768px - 1199px | 中等設備 | 雙欄或三欄、側邊欄 |
| **桌面** | 1200px+ | 寬屏設備 | 多欄佈局、最適化排版 |

### 核心 RWD 規則

1. **無水平捲動**：任何寬度下都不出現水平捲動
2. **字體縮放**：根據屏幕寬度調整字體大小（使用 `clamp()` 或 media query）
3. **圖像自適應**：`max-width: 100%`，`height: auto`
4. **Flexbox / Grid**：優先使用 flexbox 和 CSS Grid 實現響應式佈局

---

## 九、SEO 與可訪問性（A11y）基礎

### SEO 策略

1. **Meta 標籤**
   - `<meta name="description">` 每頁 50-160 字元
   - `<meta property="og:title">` 社群分享標題
   - `<meta property="og:image">` 社群分享圖片
   - `<meta property="og:description">` 社群分享描述
   - `<meta property="og:url">` 頁面規範 URL

2. **結構化標籤**
   - 首頁：`<h1>` 只出現一次
   - 各頁：`<h2>`、`<h3>` 依層級使用
   - 內部連結：所有 `<a>` 有明確文字描述

3. **URL 結構**
   - hash route：`#/podcast/1/list`、`#/podcast/1/ep_001` 等
   - 適合 IPFS（hash route 不觸發伺服器請求）

### A11y 基礎

1. **圖像**：所有 `<img>` 有 `alt` 屬性
2. **顏色對比**：符合 WCAG AA 標準
3. **鍵盤導航**：所有可互動元素可用 Tab 鍵訪問
4. **ARIA 標籤**：複雜元件添加 `aria-label`、`aria-labelledby` 等

---

## 十、改版計畫與 Phase 劃分

### Phase 0（現在）- 基線穩定
**目標**：確認現有功能完整、文檔化現狀

- [x] Podcast 列表 + 詳頁正常運行
- [x] 導航欄各頁切換無誤
- [x] RSS-to-JSON 流程完整
- [x] GitHub Pages 部署順利
- [ ] **補全現狀規格書**（本文件）

**預期成果**：規格書 v1.0 完成，所有邊界清晰

### Phase 1（短期，1-2 週）- 功能完善
**目標**：完成 Newsletter 與基礎 SEO

- [ ] Newsletter 列表頁完成
- [ ] Newsletter 詳頁完成
- [ ] SEO meta 標籤補全（動態更新）
- [ ] RWD 測試與調整（手機 / 平板 / 桌面）
- [ ] 性能優化（JSON 緩存、懶加載）

**交付物**：更新的規格書 v1.1、部署更新

### Phase 2（中期，3-4 週）- 框架遷移準備
**目標**：設計 Nuxt3 遷移方案

- [ ] 架構評估：現有數據流 vs. Nuxt 組件模型對應
- [ ] 建立 Nuxt 骨架與路由結構
- [ ] 靜態內容遷移（`staticContent` → Nuxt composable）
- [ ] JSON API 整合測試

**交付物**：Nuxt 遷移規格書、骨架項目

### Phase 3（長期，5 週+）- 框架遷移執行
**目標**：逐步遷移至 Nuxt3，啟用 SSG/SEO

- [ ] Podcast 模組遷移
- [ ] Newsletter 模組遷移
- [ ] SSG 預渲染配置
- [ ] IPFS 部署自動化

**交付物**：Nuxt 版本主站、部署流程

---

## 十一、自我檢查清單

部署或改版前，務必確認以下項目已完成：

### 功能檢查
- [ ] 所有 JSON 文件正確加載（無 404 錯誤）
- [ ] Hash route 所有連結無死鏈接
- [ ] 導航欄可正確切換所有頁面
- [ ] Podcast 列表可點擊進入詳頁
- [ ] Podcast 詳頁播放器正常運作
- [ ] 「返回列表」按鈕正常運作
- [ ] Newsletter 頁面無錯誤（完成後檢查）

### RWD 檢查
- [ ] 手機版（320px）無水平捲動
- [ ] 平板版（768px）排版正確
- [ ] 桌面版（1440px）排版最適化
- [ ] 字體大小在各寬度下清晰易讀

### SEO 檢查
- [ ] 每頁 `<title>` 不重複且內容豐富
- [ ] 每頁 `<meta name="description">` 50-160 字元
- [ ] 社群分享圖片存在且清晰
- [ ] 內部連結文字有意義（避免「點擊這裡」）
- [ ] 無 console error

### 部署檢查
- [ ] GitHub Pages 測試站部署無誤
- [ ] IPFS CID 與 ENS 對應正確
- [ ] Storj 多媒體 URL 正常訪問
- [ ] 離線瀏覽可正常使用（本地 JSON 緩存）

### 文檔檢查
- [ ] 規格書已更新版本號
- [ ] CHANGELOG 記錄本次改動
- [ ] 所有插槽邊界清晰標記

---

## 十二、常見問題與維護指南

### Q1：如何新增一集 Podcast？
**A**：
1. 更新對應的 RSS feed（例如在Podcast平台發佈）
2. RSS-to-JSON 流程自動抓取（通過 GitHub Action）
3. `/data/podcast_1.json` 自動更新
4. 前端自動渲染新集數，無需手動修改

### Q2：如何修改首頁內容？
**A**：編輯 `staticContent.js` 中的 `hero` 物件，儲存後重新部署。

### Q3：如何新增一個新 Section？
**A**：
1. 在 `index.html` 中新增 HTML 插槽（`<!-- SECTION:XXX-START/END -->`）
2. 在 `css/style.css` 中新增 CSS 插槽（`/* CSS:XXX-START/END */`）
3. 建立新的 `pages/xxx.js` 模組
4. 在 `app.js` 路由中註冊新頁面
5. 遵循本規格書格式進行

### Q4：如何測試 IPFS 部署？
**A**：
1. 本地構建靜態檔（npm run build）
2. 上傳至 Pinata 或 Infura IPFS
3. 記錄返回的 CID
4. 更新 ENS 指向新 CID

### Q5：離線瀏覽為什麼有效？
**A**：所有 JSON 和資源都是靜態的，第一次訪問時瀏覽器會緩存。如果需要持久化離線支援，未來可添加 Service Worker。

---

## 十三、關鍵詞彙定義

| 詞彙 | 定義 |
|-----|------|
| **Hash Route** | 使用 `location.hash`（URL 中 `#` 後的部分）實現路由，不觸發伺服器請求 |
| **RSS-to-JSON** | 將 RSS/Atom XML 自動轉換為 JSON 格式的流程 |
| **SPA** | Single Page Application，只有一個 HTML 入口，通過 JavaScript 動態切換內容 |
| **Storj** | 分散式雲存儲服務，用於備份音檔和圖片 |
| **IPFS** | 點對點分散式文件系統，用於長期發佈網站 |
| **ENS** | Ethereum Name Service，將錢包地址或內容映射到域名 |
| **Section** | 網站的一個功能區塊（如 Hero、Podcast、Newsletter 等） |
| **Slot** | 規格書中的「邊界標記」，用於插入或修改程式碼 |

---

## 十四、版本控制與更新日誌

### v1.0 (2025-11-16)
- 初版規格書：盤點現有架構、定義模組邊界、確立改版路線

### 未來版本
- v1.1：Phase 1 完成後更新（Newsletter 完成、SEO 補全）
- v2.0：Phase 2 完成後（Nuxt 遷移規格書）

---

**下一步行動**：

1. **檢視本規格書**：確認是否準確反映現有代碼
2. **補全 Section 更新模板**（`01-section-template.md`）：為後續改版做準備
3. **建立 CHANGELOG**：記錄每次改動

規格書完成後，後續任何改版都可參照模板，邊界清晰、維護高效！
