# 【Phase 2】Section SDD 規格框架
（獨立 Section 詳細規格文件範本）

此文件為「Section SDD 規格框架」，定義每個 Section 獨立 SDD 檔案應包含的完整結構與內容。

所有 Section SDD 檔案（如 `Phase-2-Hero-SDD.md`、`Phase-2-About-SDD.md` 等）皆應遵循此框架撰寫，確保規格文件的一致性與完整性。

---

## 版本資訊

| 版本   | 日期       | 修改內容                     | 修改者 |
|--------|------------|------------------------------|--------|
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
```javascript
{
  hero: {
    title: "Hi，我是雞蛋糕",
    subtitle: "Frontend Developer | Podcaster | Blockchain Enthusiast",
    description: "簡短自我介紹"
  }
}
```

---

## 5. HTML 結構與插槽

```html
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
```

---

## 6. CSS 樣式與插槽

```css
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
```

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

```css
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
```

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

## 結論

此 Phase 2 Section SDD 規格框架確保：

✅ **一致性**：所有 Section SDD 結構統一  
✅ **完整性**：涵蓋內容、設計、技術、資料等所有層面  
✅ **可維護性**：清晰的插槽與命名規則  
✅ **易擴充**：新增 Section 只需複製模板  

遵循此框架撰寫 Section SDD，能有效提高開發效率與質量。
