# 【Phase 1】建立網站骨架

（一個 index.html + 一個 style.css，嚴禁 JS + 使用 Unsplash 圖庫 + HTML/CSS 皆預留插槽 + CSS 禁用 ID 選擇器）

你現在是一位「前端工程師 + 教練」，  
任務是幫我建立一個個人創作網站的「環境與骨架」，HTML 與 CSS 分離為獨立檔案，並且要幫開發者預留好「HTML 區塊插槽」與「CSS 區塊插槽」，方便之後用其他 Prompt 來替換。

請依照以下所有規格，產出一個完整的 **index.html** 與 **style.css**。

---

## 全站環境規格書 v1.0

### 一、技術限制（必須嚴格遵守）

**1. 僅能使用 HTML + CSS**

- 禁止任何 JavaScript
- 不可以出現：
  - `<script>` 標籤
  - 任何 `onclick`、`onchange` 等事件屬性
  - 任何 `addEventListener`、`console.log` 或其他 JS 語法

**2. 外部資源限制**

- 不可以使用 `<link rel="stylesheet">` 載入外部 CSS（除了連結 style.css）
- 不可以使用任何外部 JS 或 CSS CDN（包含 Google Fonts、Bootstrap 等）
- 所有 CSS 必須寫在獨立的 `style.css` 檔案中

**3. 檔案結構**

- `index.html`：包含完整 HTML 結構與插槽註解
- `style.css`：包含所有 CSS 樣式與插槽註解
- 在 `index.html` 的 `<head>` 中使用 `<link rel="stylesheet" href="style.css">` 連結樣式表

**4. 語系與文字**

- `<html lang="zh-Hant">`
- 內容全部使用繁體中文（台灣用語）

**5. RWD 策略**

- 採用手機優先（mobile-first）
- 保證在 320px、768px、1440px 寬度下不會產生水平捲動
- 使用 media query 實作響應式設計

**6. 不要向我提問**

- 不可以要求我補資料或確認
- 如有不明確處，請你自行填入合理預設值並直接產出結果

**7. CSS 禁用 ID 選擇器（非常重要）**

- 在整份 CSS 中「禁止」使用任何 ID 選擇器（例如 `#hero`、`#about` 等）
- 所有樣式請一律使用：
  - 元素選擇器（例如 `body`、`img`）
  - 類別選擋器（例如 `.section-hero`、`.nav-link`）
  - 或巢狀組合（例如 `.section-hero h1`）
- 為什麼？因為 HTML 的 `id` 屬性是給「錨點連結」與「JS 操作」用的，CSS 不應該依賴 `id`

---

### 二、網站結構與內容需求

**1. 導航列（Navigation）**

- Logo：顯示「GCAKE.Space」或「雞蛋糕的創作空間」
- 導航連結（使用錨點 `#` 連結）：
  - 首頁（`#home`）
  - Podcast（`#podcast`）
  - Newsletter（`#newsletter`）
  - 作品集（`#works`）
  - 關於我（`#about`）
  - 聯絡我（`#contact`）

**2. 各 Section 需求**

每個 Section 都要有對應的 `id` 屬性（供錨點連結使用），但 CSS 不可以使用 `#id` 選擇器。

#### Section: Hero（首頁主視覺）

- `id="hero"`
- `class="section section-hero"`
- 內容：
  - 大標題：「Hi，我是雞蛋糕」
  - 副標題：「Frontend Developer | Podcaster | Blockchain Enthusiast」
  - 簡短介紹（1-2 句話）
  - CTA 按鈕：「查看作品集」連到 `#works`、「聯絡我」連到 `#contact`
- 視覺：
  - 背景使用 Unsplash 圖片（可用 `https://source.unsplash.com/1600x900/?workspace,coding`）
  - 文字置中，背景圖覆蓋半透明遮罩

#### Section: Podcast

- `id="podcast"`
- `class="section section-podcast"`
- 內容：
  - 標題：「Podcast 節目」
  - 簡介：「我主持兩個 Podcast 節目，分享生活、技術與區塊鏈觀察」
  - 兩個 Podcast 卡片（使用 grid 或 flex 排版）：
    - 卡片 1：「喂喂你還好不好」
      - 封面圖（Unsplash：`https://source.unsplash.com/400x400/?podcast,microphone`）
      - 簡介：「生活觀察與心情分享」
      - 按鈕：「查看節目」（`#podcast_1`）
    - 卡片 2：「雞蛋糕孵蛋中」
      - 封面圖（Unsplash：`https://source.unsplash.com/400x400/?technology,podcast`）
      - 簡介：「區塊鏈技術與 Web3 探索」
      - 按鈕：「查看節目」（`#podcast_2`）

#### Section: Newsletter

- `id="newsletter"`
- `class="section section-newsletter"`
- 內容：
  - 標題：「電子報」
  - 簡介：「定期發送技術文章與區塊鏈觀察」
  - 兩個電子報卡片（與 Podcast 類似排版）：
    - 卡片 1：「喂喂你還好不好」
      - 封面圖（Unsplash：`https://source.unsplash.com/400x400/?newsletter,writing`）
      - 簡介：「生活與技術隨筆」
      - 按鈕：「閱讀文章」（`#newsletter_1`）
    - 卡片 2：「區塊鏈文摘」
      - 封面圖（Unsplash：`https://source.unsplash.com/400x400/?blockchain,news`）
      - 簡介：「區塊鏈新聞與深度分析」
      - 按鈕：「閱讀文章」（`#newsletter_2`）

#### Section: Works（作品集）

- `id="works"`
- `class="section section-works"`
- 內容：
  - 標題：「作品集」
  - 簡介：「前端開發作品與開源專案」
  - 作品卡片（至少 3 個，使用 grid 排版）：
    - 卡片範例：
      - 專案名稱：「Taiwan Podcaster 龐大資訊人包」
      - 縮圖（Unsplash：`https://source.unsplash.com/400x300/?project,coding`）
      - 簡介：「台灣 Podcast 資料整合平台」
      - 標籤：「Vue3」、「IPFS」、「Web3」
      - 按鈕：「查看專案」（外部連結或 `#`）

#### Section: About（關於我）

- `id="about"`
- `class="section section-about"`
- 內容：
  - 標題：「關於我」
  - 個人照片（Unsplash：`https://source.unsplash.com/400x400/?portrait,developer`）
  - 自我介紹（2-3 段）：
    - 第一段：目前在做什麼（Frontend Developer / Podcaster / Blockchain Enthusiast）
    - 第二段：技能與專長（Vue、Nuxt、Web3、IPFS）
    - 第三段：興趣與價值觀（喜歡教學、重視溝通）
  - 技能列表（3-5 項）：
    - 前端開發（Vue、Nuxt、JavaScript）
    - 區塊鏈應用（IPFS、ENS、Arweave）
    - Podcast 製作與主持
  - RWD：手機版照片在上、文字在下；平板以上照片在左、文字在右

#### Section: Contact（聯絡我）

- `id="contact"`
- `class="section section-contact"`
- 內容：
  - 標題：「聯絡我」
  - 聯絡方式卡片（使用 grid 排版）：
    - Email：顯示 email icon + 「mailto:wwhowbuhow@pm.me」
    - Twitter/X：顯示 icon + 「@gcake119」
    - GitHub：顯示 icon + 「github.com/gcake119」
  - 抖內資訊：
    - 加密貨幣錢包地址（ETH/BTC）
    - 硬體錢包推薦連結（CoolWallet）
  - 注意：icon 使用 Unicode emoji 或 CSS 繪製，不使用圖片

#### Footer（頁腳）

- 內容：
  - 版權聲明：「© 2025 GCAKE.Space. All rights reserved.」
  - 社群連結：Twitter、GitHub、Email（使用 emoji）
  - 備註：「Powered by IPFS, ENS, Storj」

---

### 三、HTML 插槽規範

所有 Section 都必須用註解標記清楚的「插槽邊界」，格式如下：

```html
<!-- SECTION:HERO-START -->
<section id="hero" class="section section-hero">
  <!-- Hero 內容 -->
</section>
<!-- SECTION:HERO-END -->

<!-- SECTION:PODCAST-START -->
<section id="podcast" class="section section-podcast">
  <!-- Podcast 內容 -->
</section>
<!-- SECTION:PODCAST-END -->

<!-- 以此類推 -->
```

**必須標記的插槽**：

- `SECTION:NAV-START` / `SECTION:NAV-END`
- `SECTION:HERO-START` / `SECTION:HERO-END`
- `SECTION:PODCAST-START` / `SECTION:PODCAST-END`
- `SECTION:NEWSLETTER-START` / `SECTION:NEWSLETTER-END`
- `SECTION:WORKS-START` / `SECTION:WORKS-END`
- `SECTION:ABOUT-START` / `SECTION:ABOUT-END`
- `SECTION:CONTACT-START` / `SECTION:CONTACT-END`
- `SECTION:FOOTER-START` / `SECTION:FOOTER-END`

---

### 四、CSS 插槽規範

`style.css` 必須用註解將樣式分成以下區塊，每個區塊用清楚的插槽標記：

```css
/* ========== CSS:BASE-START ========== */
/* 全域重置與基礎樣式 */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; line-height: 1.6; color: #333; }
/* ========== CSS:BASE-END ========== */

/* ========== CSS:NAV-START ========== */
/* 導航列樣式 */
.nav { ... }
/* ========== CSS:NAV-END ========== */

/* ========== CSS:HERO-START ========== */
/* Hero Section 樣式 */
.section-hero { ... }
/* ========== CSS:HERO-END ========== */

/* 以此類推 */
```

**必須標記的 CSS 插槽**：

- `CSS:BASE-START` / `CSS:BASE-END`（全域樣式）
- `CSS:NAV-START` / `CSS:NAV-END`
- `CSS:HERO-START` / `CSS:HERO-END`
- `CSS:PODCAST-START` / `CSS:PODCAST-END`
- `CSS:NEWSLETTER-START` / `CSS:NEWSLETTER-END`
- `CSS:WORKS-START` / `CSS:WORKS-END`
- `CSS:ABOUT-START` / `CSS:ABOUT-END`
- `CSS:CONTACT-START` / `CSS:CONTACT-END`
- `CSS:FOOTER-START` / `CSS:FOOTER-END`
- `CSS:RWD-START` / `CSS:RWD-END`（RWD media queries）

---

### 五、設計要求

**1. 配色方案**

- 主色：深色系（如 Gruvbox Dark 風格：`#282828` 背景、`#ebdbb2` 文字）
- 強調色：暖色系（如 `#fb4934` 紅、`#fabd2f` 黃）
- 可參考 Gruvbox 配色或自行設計簡潔專業的配色

**2. 字體**

- 使用系統字體堆疊（避免外部字體）：
  
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
  ```

**3. 間距與排版**

- Section 之間有明顯間距（如 `padding: 4rem 2rem`）
- 使用 flexbox 或 grid 實作卡片排版
- 按鈕有 hover 效果（如顏色變化、微陰影）

**4. 圖片**

- 所有圖片使用 Unsplash 隨機圖（`https://source.unsplash.com/`）
- 圖片必須設定 `alt` 屬性（無障礙）
- 圖片使用 `object-fit: cover` 確保比例

**5. RWD**

- 手機版（< 768px）：
  - 導航列改為垂直排列或漢堡選單（純 CSS，使用 checkbox hack）
  - 卡片單欄顯示
  - About Section 照片在上、文字在下
- 平板版（768px ~ 1024px）：
  - 卡片雙欄顯示
  - About Section 照片在左、文字在右
- 桌面版（> 1024px）：
  - 卡片三欄顯示
  - 最大寬度限制（如 `max-width: 1200px`）

---

### 六、禁止事項（再次強調）

1. ❌ 不可以使用任何 JavaScript
2. ❌ 不可以使用 `onclick`、`onchange` 等事件屬性
3. ❌ 不可以使用外部 CSS/JS CDN（除了 style.css）
4. ❌ 不可以在 CSS 中使用 ID 選擇器（`#hero`、`#about` 等）
5. ❌ 不可以使用 `<script>` 標籤
6. ❌ 不可以向我提問或要求補充資料

---

### 七、產出要求

請產出以下兩個檔案：

**1. index.html**

- 完整的 HTML 結構
- 所有 Section 都有插槽註解標記
- 使用 `<link rel="stylesheet" href="style.css">` 連結樣式表
- 所有圖片使用 Unsplash
- 所有錨點連結正確設定

**2. style.css**

- 完整的 CSS 樣式
- 所有樣式都有插槽註解標記
- 禁用 ID 選擇器
- 實作 RWD（mobile-first）
- 使用 Gruvbox 或類似配色
- 所有按鈕有 hover 效果

---

### 八、範例插槽標記

#### HTML 範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GCAKE.Space - 雞蛋糕的創作空間</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- SECTION:NAV-START -->
  <nav class="nav">
    <div class="nav-container">
      <div class="nav-logo">GCAKE.Space</div>
      <ul class="nav-links">
        <li><a href="#home" class="nav-link">首頁</a></li>
        <li><a href="#podcast" class="nav-link">Podcast</a></li>
        <li><a href="#newsletter" class="nav-link">Newsletter</a></li>
        <li><a href="#works" class="nav-link">作品集</a></li>
        <li><a href="#about" class="nav-link">關於我</a></li>
        <li><a href="#contact" class="nav-link">聯絡我</a></li>
      </ul>
    </div>
  </nav>
  <!-- SECTION:NAV-END -->

  <!-- SECTION:HERO-START -->
  <section id="hero" class="section section-hero">
    <div class="hero-content">
      <h1 class="hero-title">Hi，我是雞蛋糕</h1>
      <p class="hero-subtitle">Frontend Developer | Podcaster | Blockchain Enthusiast</p>
      <p class="hero-description">熱愛前端開發、Podcast 製作與 Web3 技術探索</p>
      <div class="hero-cta">
        <a href="#works" class="btn btn-primary">查看作品集</a>
        <a href="#contact" class="btn btn-secondary">聯絡我</a>
      </div>
    </div>
  </section>
  <!-- SECTION:HERO-END -->

  <!-- 其他 Section... -->

</body>
</html>
```

#### CSS 範例

```css
/* ========== CSS:BASE-START ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", sans-serif;
  line-height: 1.6;
  color: #ebdbb2;
  background-color: #282828;
}

.section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
/* ========== CSS:BASE-END ========== */

/* ========== CSS:NAV-START ========== */
.nav {
  background-color: #1d2021;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fabd2f;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: #ebdbb2;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #fabd2f;
}
/* ========== CSS:NAV-END ========== */

/* ========== CSS:HERO-START ========== */
.section-hero {
  background-image: url('https://source.unsplash.com/1600x900/?workspace,coding');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.section-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(40, 40, 40, 0.7);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ebdbb2;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fabd2f;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #fb4934;
  color: #fff;
}

.btn-primary:hover {
  background-color: #cc241d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid #fabd2f;
  color: #fabd2f;
}

.btn-secondary:hover {
  background-color: #fabd2f;
  color: #282828;
}
/* ========== CSS:HERO-END ========== */

/* 其他 Section CSS... */

/* ========== CSS:RWD-START ========== */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-cta {
    flex-direction: column;
  }
}
/* ========== CSS:RWD-END ========== */
```

---

## 開始產出

請依照上述所有規格，產出完整的 `index.html` 與 `style.css`，確保：

1. ✅ 所有 HTML Section 都有插槽註解
2. ✅ 所有 CSS 區塊都有插槽註解
3. ✅ 禁用 JavaScript 與 ID 選擇器
4. ✅ 使用 Unsplash 圖片
5. ✅ 實作 RWD（mobile-first）
6. ✅ 所有錨點連結正確
7. ✅ HTML 與 CSS 分離為獨立檔案

現在開始產出！
