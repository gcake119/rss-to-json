# 【Phase 2】Works SDD 區塊規格書

## 版本資訊

| 版本   | 日期       | 修改內容 | 修改者 |
|--------|------------|----------|--------|
| v1.0.0 | 2025-11-17 | v1.0     | -      |

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