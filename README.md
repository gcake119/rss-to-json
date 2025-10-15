# 🎯 GCAKE.Space 雞蛋糕個人創作者網站專案最新進度總結

**更新時間：** 2025年10月15日 03:01 PM  
**GitHub repo：** [gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
**測試站（開發用途）：** [gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json/)

---

## 📋 專案概述

結合 **ENS**、**IPFS**、**RSS feeds**、**Storj** 等 Web3 技術，打造去中心化、免伺服器的個人內容網站：

- Podcast / Newsletter 內容自動同步 & 靜態化流程
- 分散式備援，支援多平台分發
- 僅需 ENS 年費和必要上鏈 gas，主站免日常維運

---

## 🏗️ 網站架構與開發流程

### 前端技術
- 原生 JS SPA，支援 hash 路由與多卡片頁面互動
- Gruvbox 暗色主題，響應式排版
- Newsletter 支援主圖與語音欄位（voiceover 先用 Firstory podcast 播放器嵌入）
- app.js 採用 ES module，CSS 統一 import 管控
- index.html 移除 `<link rel="stylesheet">`，統一用 JS載入樣式

### 開發與打包
- 開發環境移至 Cursor IDE，支援即時預覽與 terminal 管理
- npm build 及同步腳本修正，data/assets/css 自動打包，杜絕遺漏
- Vite 設定 outDir=docs、base=./，build 結果與預覽一致
- `npm run deploy` 一步完成 build、檔案同步、git push
- 測試階段使用 GitHub Pages（main/docs）僅供預覽、debug

---

## 📊 資料流與資料結構

- 所有 JS 腳本均採 ES module，工作流與腳本設計乾淨統一
- Podcast/Newsletter 資料自動化批次產生 JSON，路徑分明（`data/podcast/podcast_x/podcast_x.json`、`data/newsletter/newsletter_x/newsletter_x.json`）
- RSS 轉 JSON 與 Arweave 自動同步腳本定時執行，build 流程即時吃最新資料
- Storj 儲存所有 podcast/newsletter 多媒體（未來資料備援：JSON 附 Storj 公開檔案url，前端 fetch 可自動載入）
- 靜態變動內容全部 JSON、前端分離架構
- 資料夾結構：  
  - `/data/podcast/{podcast_N}/`  Podcast 靜態結構（Storj 公網網址等）
  - `/data/newsletter/{newsletter_N}/`  Newsletter 靜態結構（主圖、語音 Storj url）
  - `/assets/` 前端主站 logo 圖片
  - `/css/` 主題響應式設計
  - `/docs/` Build / Deploy 的唯一展示資料夾（IPFS/預覽站用途）

---

## ✅ 修正與測試完成項目

- historic build/檔案漏打包完全解決，CSS/資產完全自動同步
- 前後端嚴格分工：靜態展示、原始碼、內容各自獨立
- deploy 流程純 JS+腳本化，開發效率極高、回滾快速
- SPA 路由、fetch 靜態資料、主題樣式穩定可即時預覽每次更新

---

## 🚧 進行中／待辦事項

- Storj 多媒體上傳流程優化、自動同步 JSON(Data) 公開網址
- Podcast/Newsletter JSON 結構優化，封面圖／主圖及音檔完整補全 Storj 公開 url
- IPFS 上線一次固定 hash，後續內容透過 Storj 管理變動
- 前端 SEO/a11y 結構強化，API/資料聚合功能持續開發
- ENS 指向最新 IPFS hash，主站域名去中心化與網域解析整合

---

## 🎯 專案現況

- 靜態網站骨架已穩定可預覽，SEO及主要頁面完善中
- 兩個電子報各自獨立 Firstory 節目，單集 voiceover 直接嵌入，用作內容展示
- 前後端及自動化流程高度穩定，能快速測試、回滾及持續部署
- GitHub Pages 僅供 preview，不作正式入口
- IPFS+ENS 架構已就緒，一次部署即作入口，內容動態更新皆交由 Storj/JSON 串流處理，未來維護成本極低

---

**整體目標：全流程強調自動化、模組化、數據分離、備援高度彈性，確保網站能長期擴展、極高韌性維運！**
