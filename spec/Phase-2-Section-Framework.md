# 【Phase 2】Section SDD 規格框架
（獨立 Section 詳細規格文件範本）

此文件為「Section SDD 規格框架」，定義每個 Section 獨立 SDD 檔案應包含的完整結構與內容。

所有 Section SDD 檔案（如 `Phase-2-Hero-SDD.md`、`Phase-2-About-SDD.md` 等）皆應遵循此框架撰寫，確保規格文件的一致性與完整性。

---

## 版本資訊

| 版本   | 日期       | 修改內容                     | 修改者 |
|--------|------------|------------------------------|--------|
| v1.1.0 | 2025-11-17 | 新增第 8 節開發與整合檢查清單 | -      |
| v1.0.0 | 2025-11-17 | 初版：定義 Section SDD 框架規範 | -      |

---

## 目錄

- [1. 框架說明](#1-框架說明)
- [2. Section SDD 完整結構](#2-section-sdd-完整結構)
- [3. 各區塊詳細說明](#3-各區塊詳細說明)
- [4. HTML 插槽規範](#4-html-插槽規範)
- [5. CSS 插槽規範](#5-css-插槽規範)
- [6. 填寫檢查清單](#6-填寫檢查清單)
- [7. Section SDD 模板](#7-section-sdd-模板)
- [8. 開發與整合檢查清單](#8-開發與整合檢查清單)

---

## 1. 框架說明

### 1.1 目的

- 定義單一 Section 的完整規格，包含內容、視覺、互動、資料來源等
- 確保 Section SDD 檔案結構統一，便於開發、審核、維護
- 為 AI 或開發者提供清晰的開發指引

### 1.2 適用範圍

- Navigation、Hero、Podcast、Newsletter、Works、About、Contact、Footer 等所有 Section
- 每個 Section 獨立撰寫一份 SDD 檔案

### 1.3 檔案命名規則

格式：`Phase-2-{SectionName}-SDD.md`

範例：
- `Phase-2-Hero-SDD.md`
- `Phase-2-About-SDD.md`
- `Phase-2-Podcast-SDD.md`
- `Phase-2-Newsletter-SDD.md`
- `Phase-2-Works-SDD.md`
- `Phase-2-Contact-SDD.md`
- `Phase-2-Nav-SDD.md`
- `Phase-2-Footer-SDD.md`

---

## 2. Section SDD 完整結構

每份 Section SDD 檔案應包含以下區塊（按順序）：

```
【Phase 2】{Section 名稱} SDD
├─ 1. Section 基本資訊
├─ 2. 內容需求
├─ 3. 視覺設計需求
├─ 4. 資料來源與結構
├─ 5. HTML 結構與插槽
├─ 6. CSS 樣式與插槽
├─ 7. RWD 需求
├─ 8. 互動行為（如需要）
└─ 9. 特殊需求與備註
```

---

## 3. 各區塊詳細說明

### 3.1 Section 基本資訊

用一個表格快速定義 Section 的基本屬性：

| 項目 | 內容 |
|------|------|
| **Section 名稱** | 例：Hero、About、Podcast |
| **Section ID** | 例：`hero`、`about`、`podcast` |
| **Section Class** | 例：`section section-hero`、`section section-about` |
| **位置** | 網站中的位置（例：首頁最上層、作品集前） |
| **內容類型** | 靜態（Static）/ 動態（Dynamic） |
| **資料來源** | 例：staticContent.js、podcast.json、newsletter.json |
| **預期內容量** | 精簡（< 100 字）、 中等（100-300 字）、 較多（> 300 字） |

### 3.2 內容需求

詳細列出 Section 中的所有文案、標題、按鈕等內容要素：

**標題**
- 標題文字
- 標題層級（h1、h2、h3 等）
- 位置

**副標題 / 摘要**
- 文案內容

**主體文案**
- 段落數量
- 字數範圍
- 語氣與風格

**列表項目**
- 項目數量
- 每項內容

**按鈕 / 連結**
- 按鈕文字
- 按鈕連結目標
- 按鈕樣式（Primary / Secondary 等）

**其他元素**
- 圖片需求
- 圖示需求
- 特殊格式

### 3.3 視覺設計需求

定義 Section 的視覺風格與佈局：

**配色**
- 背景色
- 文字色
- 強調色

**字體**
- 標題字體大小與字重
- 正文字體大小
- 行高

**間距**
- Section 內部 padding
- 元素間距
- 對齊方式

**排版佈局**
- 單欄 / 多欄
- 卡片式 / 列表式
- 對齊方向（左、中、右）

**特殊視覺元素**
- 背景圖片 / 背景色
- 邊框 / 陰影
- 裝飾性元素
- 分隔線

### 3.4 資料來源與結構

說明 Section 的資料來源與欄位結構：

**資料來源**
- 檔案路徑（如 `data/podcast1.json`）
- 來源類型（RSS、Arweave、靜態 JS 物件等）
- 更新頻率

**資料結構**
- JSON Schema 或資料物件範例
- 必填欄位
- 選填欄位
- 資料格式說明

**容錯策略**
- 資料缺失時的顯示方式
- Fallback 邏輯
- 預設值

### 3.5 HTML 結構與插槽

描述 HTML 應如何組織，包含插槽位置：

**HTML 插槽標記**
```html
<!-- SECTION:{SECTION_NAME}-START -->
<section id="{section_id}" class="section section-{name}">
  <!-- 內容放在此 -->
</section>
<!-- SECTION:{SECTION_NAME}-END -->
```

**主要 HTML 元素**
- `<header>` / 標題區
- `<article>` / 卡片區
- `<footer>` / 頁腳區
- 等等

**元素層級與巢狀結構**
- 縮進示意
- 父子關係

**HTML 限制**
- 禁止 JavaScript
- 禁止 `onclick` 等事件屬性
- 僅支援純 CSS 互動（如 hover）

### 3.6 CSS 樣式與插槽

描述 CSS 樣式組織與插槽：

**CSS 插槽標記**
```css
/* ========== CSS:{SECTION_NAME}-START ========== */
/* CSS 樣式寫在此 */
/* ========== CSS:{SECTION_NAME}-END ========== */
```

**主要 CSS 類別**
- `.section-{name}`
- `.{name}-title`
- `.{name}-card`
- 等等

**樣式層級**
- 全域樣式
- 元素選擇器
- 類別選擇器
- 巢狀組合

**CSS 限制**
- 禁止 ID 選擇器（#id）
- 使用 class 與元素選擇器
- 禁止 inline style

### 3.7 RWD 需求

定義不同斷點下的響應式設計：

**斷點**
- Mobile：320px 以上
- Tablet：768px 以上
- Desktop：1440px 以上

**各斷點下的佈局**
- 單欄 / 多欄
- 字體大小調整
- 間距調整
- 元素隱藏 / 顯示

**RWD CSS 插槽**
```css
/* ========== CSS:RWD-START ========== */
@media (min-width: 768px) {
  /* Tablet 及以上樣式 */
}

@media (min-width: 1440px) {
  /* Desktop 樣式 */
}
/* ========== CSS:RWD-END ========== */
```

### 3.8 互動行為

定義 Section 中的互動需求（如有）：

**按鈕互動**
- Hover 效果
- Active 狀態
- Focus 狀態（無障礙）

**連結行為**
- 內部錨點連結
- 外部連結

**其他互動**
- 展開 / 摺疊（如不使用 JS，可用 CSS）
- 分頁
- 篩選

**注意**
- 若無 JavaScript，互動應透過純 CSS 實現（如 checkbox hack）

### 3.9 特殊需求與備註

記錄其他特殊需求或開發注意事項：

- 特殊圖片處理
- 特殊文字格式
- 外部資源連結
- SEO 注意事項
- 無障礙要求
- 效能最佳化
- 其他開發建議

---

## 4. HTML 插槽規範

### 4.1 插槽標記格式

所有 Section HTML 必須用標準註解包含：

```html
<!-- SECTION:{SECTION_NAME}-START -->
<section id="{section_id}" class="section section-{name}">
  <!-- Section 內容 -->
</section>
<!-- SECTION:{SECTION_NAME}-END -->
```

### 4.2 命名規則

- `SECTION_NAME` 使用全大寫，用底線連接（如 `PODCAST`、`NEWSLETTER`）
- `section_id` 使用小寫，如 `podcast`、`newsletter`
- `section class` 使用小寫與 hyphen，如 `section-podcast`

### 4.3 插槽示例

**Navigation 區**
```html
<!-- SECTION:NAV-START -->
<nav id="nav" class="section section-nav">
  <!-- 導航內容 -->
</nav>
<!-- SECTION:NAV-END -->
```

**Podcast 區**
```html
<!-- SECTION:PODCAST-START -->
<section id="podcast" class="section section-podcast">
  <!-- Podcast 內容 -->
</section>
<!-- SECTION:PODCAST-END -->
```

---

## 5. CSS 插槽規範

### 5.1 插槽標記格式

所有 CSS 必須用標準註解包含：

```css
/* ========== CSS:{SECTION_NAME}-START ========== */
/* CSS 樣式 */
/* ========== CSS:{SECTION_NAME}-END ========== */
```

### 5.2 命名規則

- `SECTION_NAME` 使用全大寫
- 前後各有一行空行
- 使用統一的分隔符號（`=` 號 × 20）

### 5.3 插槽示例

**Hero 區 CSS**
```css
/* ========== CSS:HERO-START ========== */
.section-hero {
  background-image: url(...);
  min-height: 100vh;
}
/* ========== CSS:HERO-END ========== */
```

**RWD 區 CSS**
```css
/* ========== CSS:RWD-START ========== */
@media (min-width: 768px) {
  .section-hero {
    padding: 6rem 4rem;
  }
}
/* ========== CSS:RWD-END ========== */
```

---

## 6. 填寫檢查清單

撰寫 Section SDD 時，確認以下事項已完成：

### 基本資訊
- [ ] Section 名稱明確
- [ ] Section ID 與 class 已定義
- [ ] 內容類型標明（靜態 / 動態）
- [ ] 資料來源說明

### 內容需求
- [ ] 所有標題文字已列出
- [ ] 正文內容已說明
- [ ] 按鈕與連結目標已定義
- [ ] 圖片需求已說明

### 設計需求
- [ ] 配色已定義
- [ ] 排版佈局已說明
- [ ] 間距與對齊已明確
- [ ] 特殊視覺元素已描述

### 技術規範
- [ ] HTML 插槽格式正確
- [ ] CSS 插槽格式正確
- [ ] 元素名稱 / 類別命名規範遵循
- [ ] RWD 斷點已定義

### 資料結構
- [ ] 資料來源明確
- [ ] JSON Schema 或資料結構示例已提供
- [ ] 必填 / 選填欄位已標明
- [ ] 容錯策略已說明

### 特殊需求
- [ ] 互動行為已說明（如有）
- [ ] 無障礙需求已列出（如有）
- [ ] 特殊注意事項已記錄

---

## 7. Section SDD 模板

以下為標準的 Section SDD 模板，複製此模板後填入對應內容即可：

```markdown
# 【Phase 2】{Section 名稱} SDD

## 版本資訊

| 版本   | 日期       | 修改內容 | 修改者 |
|--------|------------|----------|--------|
| v1.0.0 | YYYY-MM-DD | 初版     | -      |

---

## 1. Section 基本資訊

| 項目 | 內容 |
|------|------|
| **Section 名稱** | 例：Hero |
| **Section ID** | `hero` |
| **Section Class** | `section section-hero` |
| **位置** | 網站最上層，首頁主視覺 |
| **內容類型** | 靜態 |
| **資料來源** | staticContent.js |
| **預期內容量** | 中等（100-300 字） |

---

## 2. 內容需求

### 標題
- 文字：「Hi，我是雞蛋糕」
- 層級：h1
- 位置：Section 最上方

### 副標題
- 文字：「Frontend Developer \| Podcaster \| Blockchain Enthusiast」
- 位置：標題下方

### 主體文案
- 段落數：1
- 內容：簡短自我介紹（1-2 句話）

### 按鈕
- 按鈕 1：「查看作品集」，連結至 `#works`，樣式 Primary
- 按鈕 2：「聯絡我」，連結至 `#contact`，樣式 Secondary

### 圖片
- 無（使用背景圖）

---

## 3. 視覺設計需求

### 配色
- 背景：Unsplash 圖片 + 半透明深色遮罩（rgba(40, 40, 40, 0.7)）
- 文字色：淺色 (#ebdbb2)
- 強調色：黃色 (#fabd2f) 標題，紅色 (#fb4934) 按鈕

### 排版佈局
- 單欄置中
- 文字置中對齊
- 最小高度：100vh（全螢幕高度）

### 特殊視覺元素
- 背景圖片來自 Unsplash (`https://source.unsplash.com/1600x900/?workspace,coding`)
- 按鈕有 hover 效果（顏色變深、陰影增加）

---

## 4. 資料來源與結構

### 資料來源
- 檔案：`staticContent.js`
- 格式：JavaScript 物件

### 資料結構
\`\`\`javascript
{
  hero: {
    title: "Hi，我是雞蛋糕",
    subtitle: "Frontend Developer | Podcaster | Blockchain Enthusiast",
    description: "簡短自我介紹"
  }
}
\`\`\`

---

## 5. HTML 結構與插槽

\`\`\`html
<!-- SECTION:HERO-START -->
<section id="hero" class="section section-hero">
  <div class="hero-content">
    <h1 class="hero-title">Hi，我是雞蛋糕</h1>
    <p class="hero-subtitle">Frontend Developer | Podcaster | Blockchain Enthusiast</p>
    <p class="hero-description">簡短自我介紹</p>
    <div class="hero-cta">
      <a href="#works" class="btn btn-primary">查看作品集</a>
      <a href="#contact" class="btn btn-secondary">聯絡我</a>
    </div>
  </div>
</section>
<!-- SECTION:HERO-END -->
\`\`\`

---

## 6. CSS 樣式與插槽

\`\`\`css
/* ========== CSS:HERO-START ========== */
.section-hero {
  background-image: url('https://source.unsplash.com/1600x900/?workspace,coding');
  background-size: cover;
  background-position: center;
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
  width: 100%;
  height: 100%;
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
  color: #fabd2f;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
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
\`\`\`

---

## 7. RWD 需求

### Mobile（< 768px）
- 標題字體：2rem
- 副標題字體：1.2rem
- 按鈕改為垂直堆疊

### Tablet / Desktop（≥ 768px）
- 標題字體：3rem
- 副標題字體：1.5rem
- 按鈕水平並排

\`\`\`css
/* ========== CSS:RWD-START ========== */
@media (max-width: 768px) {
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
\`\`\`

---

## 8. 互動行為

無 JavaScript 互動，按鈕透過 CSS hover 效果提供視覺反饋。

---

## 9. 特殊需求與備註

- 背景圖片必須使用 Unsplash 相關服務
- 所有連結必須有明確的 href 值
- 須確保文字在背景圖上可讀（使用半透明遮罩）
- 滿足 WCAG 2.1 Level AA 無障礙標準
```

---

## 8. 開發與整合檢查清單

### 何時使用此清單

此檢查清單用於 **Phase 2 Section SDD 開發完成後的審核與整合階段**，確保：

1. **SDD 規格完整**：所有 9 大區塊已撰寫清楚
2. **程式碼實作正確**：HTML/CSS/JS 與 SDD 規格相符
3. **整合無衝突**：新增程式碼已正確插入對應插槽
4. **品質把關**：滿足專案的編碼規範與效能標準

### 使用方式

1. 在 Section 開發完成後進行逐項檢查
2. 所有項目勾選完畢才提交 PR（Pull Request）
3. Code Review 時使用此清單作為審核標準
4. 合併前確保「終檢清單」全數完成

### HTML 結構檢查

- [ ] **插槽標記正確**：`<!-- SECTION:{NAME}-START -->` 與 `<!-- SECTION:{NAME}-END -->` 使用正確
- [ ] **插槽位置正確**：HTML 內容插入 `index.html` 中對應的插槽位置
- [ ] **元素 ID 正確**：Section 的 `id` 屬性與規格相符（如 `id="hero"`）
- [ ] **Class 命名一致**：使用 `.section` 與 `.section-{name}` 的組合，避免 ID 選擇器
- [ ] **語義正確**：使用適當的 HTML 元素（`<section>`、`<article>`、`<div>` 等）
- [ ] **無障礙檢查**：所有圖片有 `alt` 屬性，連結有明確文字描述

### CSS 樣式檢查

- [ ] **插槽標記正確**：`/* ========== CSS:{NAME}-START ========== */` 與 `/* ========== CSS:{NAME}-END ========== */` 格式正確
- [ ] **插槽位置正確**：CSS 樣式插入 `style.css` 中對應的插槽位置
- [ ] **無 ID 選擇器**：CSS 中不使用 `#id` 選擇器，改用 `.class` 與元素選擇器
- [ ] **類別命名一致**：遵循 `.section-{name}`、`.{name}-title`、`.{name}-card` 等命名規則
- [ ] **RWD 樣式分離**：所有 media query 集中在 `CSS:RWD-START/END` 插槽中
- [ ] **樣式完整性**：包含正常狀態、hover 狀態、active 狀態、focus 狀態等

### JavaScript 模組檢查

#### 資料層

- [ ] **資料定義**：Section 的資料物件已定義在 `staticContent.js` 或對應 JSON 檔案
- [ ] **資料結構清晰**：資料物件的欄位與 SDD 規格相符
- [ ] **必填欄位完備**：所有必填欄位已包含，選填欄位已標註
- [ ] **資料格式統一**：日期格式、字串格式、陣列結構保持一致

#### 渲染層

- [ ] **渲染函式實作**：對應的 `*_render.js` 檔案已實作（如 `static_render.js`、`podcast_render.js`）
- [ ] **函式署名清晰**：export 函式名稱清楚反映用途（如 `renderHero()`、`renderPodcast()`）
- [ ] **DOM 操作正確**：渲染函式正確生成 HTML，與 SDD 定義的 HTML 結構相符
- [ ] **資料綁定正確**：模板變數正確引用資料物件欄位
- [ ] **條件渲染**：處理資料缺失、陣列為空等邊界情況

#### 路由與控制層

- [ ] **路由註冊**：Section 的路由已在 `app.js` 路由表中註冊（如有需要）
- [ ] **事件綁定**：按鈕、連結等互動元素已正確綁定事件處理函式
- [ ] **無 Inline JS**：HTML 中不出現 `onclick`、`onchange` 等內聯事件
- [ ] **模組導入**：正確 `import` 所需的渲染函式與資料

#### 工具函式

- [ ] **工具函式複用**：日期格式化、分頁、篩選等通用邏輯放在 `util.js` 中
- [ ] **函式可測試性**：工具函式易於單元測試，無副作用

### 整合檢查

- [ ] **無衝突**：新增的 HTML/CSS/JS 與既有程式碼無衝突
- [ ] **渲染成功**：在瀏覽器中正確渲染該 Section
- [ ] **樣式正確**：CSS 樣式正確應用，無異常覆蓋或未載入
- [ ] **資料顯示**：從資料來源正確讀取並顯示資料
- [ ] **互動正常**：所有按鈕、連結、hover 效果正常工作
- [ ] **RWD 有效**：在 320px、768px、1440px 等斷點下正確顯示

### 文件與版本控制檢查

- [ ] **SDD 文件完整**：Phase-2-{SectionName}-SDD.md 包含 9 大區塊
- [ ] **Changelog 更新**：更新 CHANGELOG.md 記錄本次開發
- [ ] **版本號更新**：更新 SDD 版本號與規格書版本號
- [ ] **Commit 訊息清晰**：Git commit message 包含版本號與功能說明（如 `feat: v1.1.0 完成 Hero Section 開發`）

### 效能與最佳化檢查

- [ ] **檔案大小**：HTML/CSS/JS 檔案大小合理，無冗餘程式碼
- [ ] **載入速度**：Section 不會顯著增加頁面載入時間
- [ ] **記憶體使用**：長時間運行不會導致記憶體洩漏
- [ ] **瀏覽器相容性**：在主要瀏覽器中正常工作

### 終檢清單

- [ ] 以上所有檢查項目已確認完成
- [ ] Section 已準備好合併入主分支
- [ ] 相關文件已更新完畢

---

## 結論

此 Phase 2 Section SDD 規格框架確保：

✅ **一致性**：所有 Section SDD 結構統一  
✅ **完整性**：涵蓋內容、設計、技術、資料等所有層面  
✅ **可維護性**：清晰的插槽與命名規則  
✅ **易擴充**：新增 Section 只需複製模板  
✅ **品質把關**：完整的開發檢查清單確保交付品質

遵循此框架撰寫 Section SDD，能有效提高開發效率與品質。
