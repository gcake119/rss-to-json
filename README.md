# 🎯 GCAKE.Space 雞蛋糕個人創作者網站專案進度總結

**更新時間：** 2025年10月12日 23:58 PM  
**GitHub repo：** [gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
**測試網站：** [gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json/)

---

## 📋 專案概述

利用 **ENS**、**IPFS**、**RSS feeds**、**Storj** 等 Web3 技術建立去中心化的內容創作者網站：

- Podcast 與 Newsletter 內容自動同步
- 分散式備援與無縫內容分發
- 全站無伺服器，僅負擔 ENS 年費 + 上鏈 gas

---

## 🏗️ 網站架構

### 前端技術
- 純原生 JS SPA（hash 路由、卡片式多頁面）
- Gruvbox 暗色系響應式主題
- Podcast/Newsletter 詳細分頁完整渲染
- Newsletter 支援主圖、語音欄位

### 資料流程
- RSS 轉 JSON 靜態化，前端 fetch 載入內容
- Firstory Podcast 播放/封面自動嵌入
- GitHub Actions 定時同步 RSS feeds，自動補齊 slug/cover/image 欄位

### 部署策略
- GitHub Pages：靜態站維護主站，CI/CD 自動化測試＋部署
- 網站靜態架構完成後才推送 IPFS、設定 ENS 轉址（節省多次上鏈 gas 費）
- 動態資料（Podcast/Newsletter/語音）規劃 fetch Storj 公網 JSON 資料
- IPFS 免費空間規劃：主站僅數十KB～數百KB，Pinata 1GB 免費額度非常足夠

---

## 📊 資料結構設計

- `/data/podcast/{podcast_N}/`   Podcast 資料結構  
- `/data/newsletter/{newsletter_N}/`   Newsletter 資料結構  
- `/data/voiceover/{newsletter_N}/`   Newsletter 語音檔（規劃中）  

---

## ✅ 已完成功能／測試項目

### 內容體驗
- SPA 多分頁 hash 路由與主題 UI 運作無誤
- Podcast/Newsletter 詳細卡片分頁渲染
- Firstory 播放器 iframe、cover 自動切換
- Newsletter 圖像優化、排版去重、內文清理

### 自動化與資料處理
- RSS 轉 JSON 自動欄位補齊、slug/cover/image結構優化
- 多 RSS 來源合併＋異常不覆蓋原內容
- Github Actions CI 做到最新內容自動部署  
- Storj bucket 已建立 & access key 已設 secret  
- aws-sdk（S3 Gateway）**已完成安裝，尚待實測連線/批次上傳**

### 技術驗證
- ✔️ GitHub Pages 靜態分頁、API響應、SPA UI全數通過
- ✔️ 多來源 Podcast/Newsletter、cover／語音欄位初步串接成功

---

## 🚧 進行中／待辦事項

- **Storj實測** aws-sdk（S3 Gateway）實際連線與上傳批次測試  
- **Newsletter JSON結構升級** 主圖、音檔 Storj欄位同步自動補全  
- **a11y設計** 全站無障礙語意標記、aria/alt、tab鍵盤導航
- **前端功能增強** 語音播放器／搜尋／動畫／主題切換
- **SEO/OGP** meta/ogp產生加強搜尋與社群友好
- **多語系留言API、互動支援、社交分享**  
- **IPFS推送/ENS解析/全站分散主機施作**  
- **Storj媒體備份流程、批次異常處理與自動 fallback**  
- **資料聚合與API外掛** 讚/留言/社群功能雛形  
- **GitHub Actions 工作流優化與自動升級**

---

## 🎯 專案現況總結

- 主站內容自動化、靜態 SPA、多平台備援結構已就緒
- Storj aws-sdk安裝已完成，待下階段進行連線與批次上傳測試
- Github workflow + RSS資料同步穩定可用，靜態主站運作良好

**下一步重點：**
1. Storj連線＆多媒體自動批次上傳測試
2. 完善主站/備站推送流程與 fallback 機制
3. 部署 Web3(IPFS+ENS)+Storj備援，全面進入分散式內容服務
4. a11y、SEO、API販售/社群互動、資料聚合等進階開發

---
**待辦事項已記錄：明天執行 Storj 正式連線與批量上傳測試，自動備援流程開發啟動！**
