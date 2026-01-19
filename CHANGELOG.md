# 變更紀錄 (CHANGELOG)

本文件記錄專案所有重要變更。  
規格書詳細內容請參閱：[/spec/](./spec/)

---

## 版本索引

| 版本   | 日期       | 重點摘要                            | 對應規格書                                    |
| ------ | ---------- | ----------------------------------- | --------------------------------------------- |
| v1.1.0 | 2026-01-19 | Storj → IPNS 架構調整、新增 Newsletter 3 | [Baseline v1.1.0](./spec/00-baseline-spec.md) |
| v1.0.1 | 2025-11-17 | 完成 Podcast 模組化、SDD 規格書導入 | [Baseline v1.0.1](./spec/00-baseline-spec.md) |
| v1.0.0 | 2025-11-16 | 初版 SPA 架構、RSS-to-JSON 自動化   | [Baseline v1.0](./spec/00-baseline-spec.md)   |

---

## [v1.1.0] - 2026-01-19

> **對應規格書**：[/spec/00-baseline-spec.md v1.1.0](./spec/00-baseline-spec.md)

### 🔄 架構調整（BREAKING CHANGE）

#### Storj → IPNS 架構遷移

- 移除 Storj CDN 依賴，改用 IPFS + IPNS 架構
- ENS 指向 IPNS Key，日常更新透過 IPNS 完成（免 gas）
- 新增 Pinata 部署腳本（`scripts/deploy-ipfs.js`）
- **規格對應**：[Phase-3-JSON-Spec 1.3 IPNS 架構說明](./spec/Phase-3-JSON-Spec.md#13-ipns-架構說明)

#### 費用優化

- 日常內容更新完全免費（IPFS 上傳 + IPNS 更新皆免費）
- 僅 ENS 初始設定需一次性 gas（~$5-20）
- **規格對應**：[Phase-3-JSON-Spec 1.4 費用說明](./spec/Phase-3-JSON-Spec.md#14-費用說明)

### ➕ 新增功能

#### Newsletter 3（雞蛋糕的前端修煉屋）

- 新增第三份電子報：《雞蛋糕的前端修煉屋》
- 前端技術分享與學習筆記
- 新增路由：`#newsletter_3`、`#newsletter_3-detail?id=xxx`
- 新增資料檔：`data/newsletter_3.json`
- **規格對應**：[Baseline 三、資訊架構](./spec/00-baseline-spec.md#三資訊架構ia與頁面結構)

### 📝 文件更新

- 更新 `/spec/00-baseline-spec.md` v1.1.0
- 更新 `/spec/Phase-1-Site-Skeleton.md`（新增 Newsletter 3 卡片）
- 更新 `/spec/Phase-3-JSON-Spec.md` v1.1.0（IPNS 架構 + Newsletter 3）
- 更新 `README.md`（3 份電子報）

---

## [v1.0.1] - 2025-11-17

> **對應規格書**：[/spec/00-baseline-spec.md v1.0.1](./spec/00-baseline-spec.md)
> **本次更新**：[Commit 4dc2cd4](https://github.com/gcake119/rss-to-json/commit/4dc2cd4f07b0f95cc8a60d2d9bef7e39b9a2c2e3)

### ✅ 已完成功能

#### Podcast 模組化重構

- 將 podcast 列表與詳頁渲染邏輯完全模組化（`podcast_render.js`）
- 支援動態路由：`#podcast_1`, `#podcast_1-detail?id=guid`
- 單集定位、描述 HTML 解析、分頁按鈕（移除 inline onclick）
- 回列表可滾動定位
- 音檔/封面自動 fallback（Storj/主機/CDN）
- **規格對應**：[Section: Podcast](./spec/00-baseline-spec.md#四現有模組結構與邊界定義)

#### 靜態內容物件化

- 新增 `static_render.js` 渲染模組
- `staticContent.js` 改為物件結構（非 HTML 字串）
- 支援 home/about/works/contact 四頁動態渲染
- **規格對應**：[Section: JavaScript 層結構](./spec/00-baseline-spec.md#43-javascript-層結構)

#### 樣式整合

- 整合主題與配色到單一 `style.css`
- 移除多餘 inline style，所有樣式以 slot 註解分隔
- **規格對應**：[Section: CSS 層結構](./spec/00-baseline-spec.md#44-css-層結構)

#### SDD 規格書導入

- 建立 `/spec/00-baseline-spec.md` Baseline規格書
- 所有模組邊界、插槽標記、資料結構皆明確定義
- **規格對應**：[完整規格書](./spec/00-baseline-spec.md)

### 🔧 技術改進

- **路由系統**：統一 hash route 格式（`podcast_1` 而非 `podcast1`）
- **async/await**：所有動態渲染皆支援非同步載入
- **錯誤處理**：JSON fetch 失敗時有明確錯誤訊息

### 📝 文件更新

- 新增 CHANGELOG.md（本文件）
- 更新 README.md 為「專案說明頁」格式
- 完成 Baseline 規格書 v1.0.1

### 🐛 修正問題

- 修正 podcast 列表點擊單集時路徑錯誤（jsonPath 參數未動態帶入）
- 修正詳頁 hash 路由判斷式（`/^podcast_\d-detail$/` 而非 `podcast\d-detail`）
- 修正 routes 表未主動插入 `main.innerHTML` 導致畫面空白

---

## [v1.0.0] - 2025-11-16

## [v1.0.0] - 2025-11-16

> **對應規格書**：Baseline v1.0（已被 v1.0.1 覆蓋，請查看 [Commit 9c5ba12](https://github.com/gcake119/rss-to-json/commit/9c5ba126f1f5a5ff4ed8e30a0ef0e8cde2c4f4dd)）

### ✅ 已完成功能

#### 核心架構（P0）

- 單一 `index.html` + 單一 `style.css` SPA 架構
- Hash route 路由系統
- 導航欄全頁導航
- 首頁 Hero Section 展示
- RSS-to-JSON 自動化流程（GitHub Action）

#### Podcast 功能（P1）

- Podcast 1 列表頁（從 JSON 讀取並渲染）
- Podcast 1 詳頁（單集選擇、播放器、完整內容）
- Podcast 2 列表頁
- Podcast 2 詳頁
- 基礎音檔播放器（HTML5 `<audio>` 標籤）
- GitHub Pages 部署

### 🚧 進行中

#### Newsletter 功能（P2）

- [ ] Newsletter 1 列表頁
- [ ] Newsletter 1 詳頁
- [ ] Newsletter 2 列表頁
- [ ] Newsletter 2 詳頁
- [ ] Newsletter 3 列表頁
- [ ] Newsletter 3 詳頁

#### SEO 與優化

- [ ] SEO meta 標籤（動態更新 title、description、og:image）

### 📋 待規劃（P3）

- [ ] About 頁面完善
- [ ] Contact 頁面完善
- [ ] Portfolio 作品集
- [ ] 推播系統（Telegram、Email 等）
- [x] ~~IPFS + ENS 完整部署~~（v1.1.0 已完成架構設計）
- [ ] Nuxt3 框架遷移

---

## 變更類型說明

- ✅ **已完成**：功能已實作並測試通過
- 🔧 **技術改進**：重構、優化、架構調整
- 📝 **文件更新**：規格書、README、註解等
- 🐛 **修正問題**：Bug fix
- 🚧 **進行中**：開發中功能
- 📋 **待規劃**：未來計畫功能
- ⚠️ **BREAKING CHANGE**：不相容變更

---

## 維護規則

1. **每次改動必須更新 CHANGELOG**：新增版本區塊，記錄變更內容
2. **每個版本對應規格書**：在版本標題註明對應的規格書版本與連結
3. **重大變更標註 BREAKING CHANGE**：影響現有功能或 API 的變更
4. **所有條目連結規格書**：用「規格對應」標註相關章節
