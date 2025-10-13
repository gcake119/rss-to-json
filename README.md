# 🎯 GCAKE.Space 雞蛋糕個人創作者網站專案進度總結

**更新時間：** 2025年10月14日 01:12 AM  
**GitHub repo：** [gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
**測試站（開發用途）：** [gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json/)

---

## 📋 專案概述

結合 **ENS**、**IPFS**、**RSS feeds**、**Storj** 等 Web3 技術，建置無伺服器、去中心化的個人內容平台：

- Podcast / Newsletter 內容自動同步 & 靜態化流程
- 分散式備援，支援多平台異地分發
- 只需負擔 ENS 年費及必要上鏈 gas，主站永久免管維運

---

## 🏗️ 網站架構與開發流程

### 前端技術
- 原生 JS 實作 SPA，支援 hash 路由與多分頁卡片式互動
- Gruvbox 暗色主題，支援響應式佈局
- 分頁細節渲染完善，Newsletter 支援主圖與語音欄位
- 入口 app.js 採用 ES module 標準，CSS 統一用 import 控管，確保打包完整
- 移除了 index.html 的 `<link rel="stylesheet">`，一律由 JS import 控制樣式

### 開發與打包
- 移轉至 Cursor IDE 開發，支援即時預覽與 terminal 直接操作，開發體驗大幅升級
- 補足 npm build 打包步驟，scripts 全自動 cp 同步 data/assets/css 到 dist/docs，解決靜態檔案漏打包問題
- Vite 設定 outDir=docs、base=./，build 結果與預覽完全一致
- `npm run deploy` 一次完成 build、靜態檔案同步、docs 更新與 git push，無需手動處理繁瑣流程
- 測試階段主機完全用 GitHub Pages（main/docs），僅作開發用 preview 站

### 資料流與自動化
- RSS 轉 JSON 自動化腳本、GitHub Actions 定時同步，提供最新資料串給前端
- Storj 管理所有 Podcast/Newsletter 多媒體內容，資料網址納入 json 靜態資料，供前端 fetch
- 前端所有 fetch 路徑均採相對路徑設計，確保 build、deploy 結果一致不出錯

### 部署策略
- **GitHub Pages 現階段僅作為開發測試站**，協助 debug & 預覽網站運作，未來不當作終端用戶入口
- 網站正式版僅部署一次到 IPFS，之後所有動態內容皆透過 Storj 公開網址提供
- ENS 連結最新 IPFS hash 作為真正入口（最終用戶連線位址）

---

## 📊 資料結構設計

- `/data/podcast/{podcast_N}/`   Podcast 靜態結構（含 Storj 多媒體網址）
- `/data/newsletter/{newsletter_N}/`   Newsletter 靜態結構（含語音、主圖 Storj url）
- `/assets/` 前端必須的圖片/logo
- `/css/` 主題樣式、響應式設計檔案
- `/docs/` 為 build/deploy 官方唯一可展示資料夾，僅供測試站用途

---

## ✅ 修正與成效

- 解決 historic build/檔案漏同步，如 data/assets/css，流程全自動化、build 不再遺漏
- 前後端分工明確，靜態展示與原始碼完全分離，各自 git 管理
- deploy 流程優化為純腳本自動化，開發效率大幅提升
- SPA 路由、fetch 靜態資料、主題樣式完全穩定，能即時預覽每次修改成果

---

## 🚧 待辦/優化

- Storj 多媒體內容上傳流程測試與優化
- Newsletter JSON 結構升級，主圖和音檔同步 Storj 公網網址自動補全
- IPFS 上線一次永久 hash，後續全部內容變動由 Storj 備援
- a11y、SEO、API 或資料聚合功能持續開發
- ENS 指向 IPFS hash、主站去中心化與網域轉址整合

---

## 🎯 專案現況

- 前、後端與自動化流程皆穩定運作，已可高效率進行快速測試/部屬/回滾
- GitHub Pages 只作為開發階段 preview，不作正式公開站
- IPFS+ENS 部屬架構已規劃，下一步將主力開發 Storj 備援內容與分布式自動更新腳本

---

**目前一切以「高效率開發－快速部署測試」為首要目標，將所有工程、資料、展示流程拆分，準備大規模內容防呆備援與自動化部署！**
