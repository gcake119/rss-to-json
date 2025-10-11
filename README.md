# 🎯 GCAKE.Space 雞蛋糕個人創作者網站專案進度總結

**更新時間：** 2025年10月11日 22:50 PM  
**GitHub 倉庫：** [gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
**測試網站：** [gcake119.github.io/rss-to-json](https://gcake119.github.io/rss-to-json/)

---

## 📋 專案概述

利用 **ENS**、**IPFS**、**RSS feeds**、**Storj** 等去中心化技術建立的內容創作者個人網站，目標包含：
- Podcast 與 Newsletter 內容自動同步
- 跨平台備援與分發不中斷  
- 靜態網站免伺服器維護
- Web3 技術棧的實際應用

---

## 🏗️ 網站架構

### 前端技術
- 純原生 JavaScript SPA：hash 路由多頁面導航
- 響應式設計：Gruvbox 暗色系主題，卡片式 UI
- 多內容類型：Podcast/Newsletter 完整分頁與單篇渲染

### 資料處理流程
- RSS → JSON 轉換：完全靜態化後端，fetch 方式載入
- Firstory 播放器整合：Podcast 嵌入式播放器
- 多平台內容支援：Newsletter 主圖、語音欄位、文字優化

### 部署策略
- GitHub Pages：CI/CD 開發主站（靜態測試）
- 最終階段：全部網站靜態架構完成後，才會推送到 IPFS 服務，同步設定 ENS 轉址  
  （可最大程度節省 gas fee，減少多次上鏈修改成本）
- 動態資料（Podcast/Newsletter/語音）將透過 fetch Storj 端 data 實現前端動態更新
- GitHub workflow 自動抓取 RSS feed 並更新最新內容

---

## 📊 資料結構設計

### 目錄結構
- `/data/podcast/{podcast_N}/` - Podcast 資料
- `/data/newsletter/{newsletter_N}/` - Newsletter 資料
- `/data/voiceover/{newsletter_N}/` - 語音檔案（規劃中）

---

## ✅ 已完成功能

### 核心功能實現
- SPA 路由系統：多頁面 hash 路由正常運作
- 內容管理：Podcast 與 Newsletter 卡片分頁、詳細內文渲染
- 播放器整合：Firstory 播放器 iframe 嵌入與封面自動切換
- 內容優化：Newsletter 圖像限寬、去重、雜訊內容清理

### 自動化流程
- RSS 轉換腳本：slug/cover/image 欄位自動對齊前端需求
- GitHub Actions CI：持續部署與資料更新流程穩定
- Fallback 機制：多 RSS 來源自動合併，異常時不覆蓋既有內容

### 測試驗證項目
- ✔️ GitHub Pages 靜態網站部署，分頁 API 正常
- ✔️ 多來源內容呈現（Firstory, Substack, Paragraph）
- ✔️ Podcast/Newsletter 同步拉取、資料結構統一
- ✔️ SPA 響應式排版、主題功能運作無誤

---

## 🚧 進行中 / 待辦事項

- **資料結構升級** Newsletter 詳細 JSON 支援 voiceover 欄位（音檔 Storj）
- **前端功能增強** UI 持續優化，語音播放器渲染、動畫、主題切換、標籤過濾、全文搜尋
- **Storj 整合** 音檔和 JSON 同步 Storj，跨域讀取 Storj 公網路 URL
- **SEO/OGP** 靜態快照、meta 產生，提升搜尋與社群預覽
- **資料聚合** 多來源自動合併、重覆內容去重
- **API／外掛互動** 規劃留言互動、社群插件
- **多語系、社群工具、安全/a11y**
- **無障礙（a11y）設計優化**
  - 語意化結構標記（header/main/article/footer）調整
  - img 元素加 alt 屬性，icon/圖示補 aria-label
  - 主題與按鈕色彩對比度檢查
  - 主選單與路由操作可 Tab/Enter
  - 表單欄位加 label，錯誤提示有文字/不只靠顏色
  - 加入 skip link 跳主內容
  - 動態內容 aria-live 宣告
  - 鍵盤操作/焦點管理強化
  - Podcast/voiceover內容補充語音文字稿或摘要
- **IPFS 傳播備援推送 & ENS 轉址設定**（待架構完全後進行，尚未實測）
- **Storj 備援推送測試**（將於主站穩定後進行資料批次備援與多媒體同步）
  
---

## 🎯 專案現況總結

GCAKE.Space 創作者個人網站已達成核心目標：
- 內容自動更新機制運作穩定
- 多平台備援策略部署、靜態主站流程建置順利
- GitHub workflow 驗證完成（尚未有 IPFS / Storj 實際推送）

**下一階段重點：**
1. 靜態架構定稿後推送 IPFS，設定 ENS 轉址，正式啟用分散式主站
2. Storj 多媒體、voiceover 資料完整備援測試
3. Web3 架構完善、a11y 無障礙全面覆蓋
