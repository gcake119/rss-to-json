# 🎯 GCAKE.Space 雞蛋糕個人創作者網站

> 零伺服器、去中心化的個人創作中心  
> 測試站：[gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json)

---

## 📋 這是什麼？

GCAKE.Space 是一個完全免伺服器的個人創作者網站，整合了：

- **2 個 Podcast 節目**（列表 + 單集詳頁，支援播放器）
- **3 份 Newsletter 電子報**（列表 + 內容詳頁）
- **靜態頁面**（首頁、About、作品集、聯絡方式）

### 核心特色

- **零維運成本**：採用 ENS、IPFS、IPNS 等去中心化技術，日常更新完全免費
- **自動化內容同步**：RSS-to-JSON 自動轉換，內容更新無需手動上傳
- **模組化架構**：單一 HTML/CSS，所有 JS 以插槽邊界明確分隔，未來可無痛遷移 Nuxt/Vue
- **SDD 規格書驅動**：所有架構與功能演進皆以 `/spec` 內規格文件追蹤

---

## 🚀 怎麼跑起來？

### 開發環境需求

- Node.js 18+
- npm 或 pnpm

### 快速開始

```bash
# 1. 克隆專案
git clone https://github.com/gcake119/rss-to-json.git
cd rss-to-json

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 瀏覽器開啟 http://localhost:5173
```

### 部署指令

```bash
# 構建靜態檔案
npm run build

# 部署到 GitHub Pages（需先設定 repo）
npm run deploy

# 預覽構建結果
npm run preview
```

---

## 📁 結構怎麼看？

### 目錄結構概覽

```text
rss-to-json/
├─ index.html              # 唯一 HTML 入口（SPA 架構）
├─ style.css               # 單一 CSS（Gruvbox 主題 + RWD）
├─ js/                     # JavaScript 模組
│  ├─ app.js               # 路由與核心邏輯
│  ├─ staticContent.js     # 靜態頁內容（物件化）
│  ├─ static_render.js     # 靜態頁渲染模組
│  ├─ podcast_render.js    # Podcast 列表/詳頁渲染
│  ├─ newsletter_render.js # Newsletter 列表/詳頁渲染
│  └─ util.js              # 工具函式
├─ data/                   # JSON 資料（RSS-to-JSON 自動生成）
│  ├─ podcast_1.json
│  ├─ podcast_2.json
│  ├─ newsletter_1.json
│  ├─ newsletter_2.json
│  └─ newsletter_3.json
├─ spec/                   # SDD 規格書
│  ├─ 00-baseline-spec.md  # 專案基線規格
│  ├─ 01-rss-automation.md # RSS-to-JSON 自動化流程
│  ├─ 02-deployment.md     # 部署與發布流程
│  └─ 03-future-roadmap.md # 未來功能規劃
├─ img/                    # 圖片資源
├─ scripts/                # 自動化腳本
└─ dist/                   # 構建輸出（自動生成）
```

### 重點檔案說明

| 檔案 | 用途 | 修改頻率 |
|------|------|---------|
| `index.html` | SPA 唯一入口，所有 Section 以插槽註解標記 | 低 |
| `style.css` | 全站樣式（主題、RWD、各 Section 樣式） | 中 |
| `js/app.js` | 路由管理、初始化、事件監聽 | 中 |
| `js/staticContent.js` | 靜態頁內容（首頁、About、Works、Contact） | 高 |
| `js/podcast_render.js` | Podcast 列表與詳頁渲染邏輯 | 中 |
| `data/*.json` | RSS-to-JSON 自動生成，**不應手動編輯** | 自動 |
| `spec/*.md` | 規格書與變更紀錄 | 高 |

---

## 🆕 最新進度摘要

- **2025-11-17**：完成 v1.0.1 Baseline 規格書更新
- **2025-11-16**：導入 SDD 規格書，完成 Podcast SPA 模組化重構
- **2025-11-10**：完成 RSS-to-JSON 自動化資料流

> 詳細變更紀錄請參閱：[CHANGELOG.md](./CHANGELOG.md) 或 [/spec](./spec/)

---

## 📚 延伸閱讀

- **規格書**：[/spec/00-baseline-spec.md](./spec/00-baseline-spec.md) - 完整專案架構與邊界定義
- **開發流程**：參考 `/spec` 內 SDD 文件
- **RSS-to-JSON**：自動化內容同步流程說明（規劃中）

---

## 🤝 貢獻指南

歡迎提交 Issue 或 Pull Request！  
所有改動請先參考 `/spec` 內規格書，並更新對應文件。

---

## 📝 授權

MIT License

---

> **核心精神**：從規格書到資料流到程式碼全面模組化，自動化資料同步，最大程度降低維護成本，創作者網站自主管理韌性再升級！
