# 🎯 GCAKE.Space 雞蛋糕個人創作者網站

**專案現況與技術總覽（2025-11-16 03:30）**

> GitHub repo：[gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
> 測試站：[gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json)

---

## 📋 專案宗旨

- 採用 ENS、IPFS、Storj、RSS feeds 等去中心化技術，構建零伺服器高韌性的創作者主頁
- Podcast、電子報內容全程自動化、公開同步，每次內容修正皆產生靜態 JSON
- 界面與資料結構完全模組化設計，清楚分離內容、樣式、邏輯
- 支援 IPFS/CDN 多路徑，一站完成前端展示、數據備援與反查

---

## 🏗️ 核心架構與開發流程

### 技術選型

- 原生 ES module+SPA，hash route（無框架）
- 單一 css 搭配 Gruvbox 主題，RWD 支援主流設備
- 靜態內容（首頁/About/作品集/聯絡）獨立於 staticContent.js 物件管理
- Podcast/Newsletter JSON 動態渲染（data/資料分流, podcast/newsletter_x.json）
- **全新導入 SDD（Spec Driven Development）模組化規格書**，所有架構與功能演進皆以 `/spec` 內規格文件驅動與追蹤

### 主要開發流程

1. 全程 Cursor IDE 本地開發，npm script 一鍵 hot reload、deploy、同步 GitHub Pages
2. 部署流程自動化，含 Vite build、IPFS 推送、GitHub Actions
3. 前端資料流經由 RSS-to-JSON workflow，內容每日同步 Storj 公網備份
4. 前後端結構、資料格式皆有獨立 baseline/section SDD 規格書可追溯，完整專案演進脈絡

---

## 📊 資料結構與自動化流程

- `data/podcast_1.json`、`data/newsletter_1.json`... 皆自動產生並同步 Storj
- podcast/newsletter schema 皆含封面、音檔跨服務 fallback（Storj/主機/CDN）
- `/assets/`、`/css/`、`/docs/` 子資料夾專責靜態、樣式與說明

---

## ✅ 已完成功能/修正重點

- Podcast 詳細頁/列表/分頁，全部動態渲染＋主題相容
  - 單集定位、描述 HTML 解析、分頁按鈕（自定義函式，移除 inline onclick）
  - 回列表可滾動定位
  - 音檔/cover 自動 fallback
- SPA 多路由與 hash 切換、主選單導覽全部可用
- RSS-to-JSON workflow 及公開同步已測試
- 整合主題/樣式到單一 CSS 文件按需增刪

---

## 🚧 進行中／待辦功能

- Storj 上傳、json 公網同步流程自動化補強
- Newsletter 詳頁、分頁、滾動補齊
- 各資料 schema 增加多封面、多語音欄位
- SEO/a11y、社群 API 集成強化
- IPFS/ENS 綁定、CID 版本自動同步腳本
- 推播/Email/Telegram 多平台通知
- 前端模組自動測試、Storybook 文檔優化

---

## 🎯 專案現況・模組化優勢

- 全站主架構與渲染模組已穩定、易於擴展
- SPA/router/hash RWD/SEO 可持續優化
- 每個 JS/CSS/JSON/靜態內容檔皆明確對應單一責任
- 資料流「機械化、可追溯、可自動測」
- 適合個人/小團隊永久開源維護
- **所有架構 SDD 規格書皆於 `/spec` 目錄透明公開**

---

> **核心精神**：  
> 從規格書到資料流到程式碼全面模組化，自動化資料同步，最大程度降低維護成本，創作者網站自主管理韌性再升級！
