# GCAKE.Space 專案進度與架構說明 2025/10/10 21:55

## 專案目的

以 ENS、IPFS、RSS feed（Podcast/Newsletter）及 Storj 的去中心化檔案服務，打造 GCAKE 的個人網路創作者平台。實作內容包含 Podcast 與電子報多源發佈、資料可公開存取、分發不中斷的自動化流程。

---

## 網站架構

- **SPA 前端**
  - 純原生 JavaScript 單頁應用（無框架），hash 路由多頁分流
  - 響應式設計（RWD），Gruvbox 暗色主題，卡片式排版
  
- **內容展示**
  - Podcast／Newsletter 均為卡片列表，細節頁點擊展開
  - Podcast：嵌入 Firstory 播放器，封面自動顯示 it.image → show.image
  - Newsletter：主視覺大圖＋結構化內文，cover 作為封面圖來源

- **語音朗讀／voiceover 升級**
  - Newsletter 詳細頁將增設語音播放器，音檔放於 Storj（如 `newsletter_1/voiceover/`）
  - 前端會根據 JSON 資料中的 voiceover 欄位自動顯示播放器（新功能開發中）

---

## 資料結構

- **Podcast**
  - `index-pN.json`：卡片分頁資料
  - 詳細檔名如 `2025Q3e03.json`，欄位有 slug, title, pub_date, audio, image, duration, season, episode, tags

- **Newsletter**
  - `index-pN.json`：卡片分頁資料
  - 詳細檔名如 `YYYY-MM-DD_slug.json`，欄位有 slug, title, cover, summary, pub_date, tags, content_html, content_text
  - **voiceover 規劃**：mp3 檔存放於 storj/newsletter_X/voiceover/，JSON 未來會新增 voiceover 欄位（url, duration, format 等）

- **資料分層**
  - `/data/podcast/{podcast_N}/`
  - `/data/newsletter/{newsletter_N}/`
  - `/data/voiceover/{newsletter_N}/`
  - 音檔、資料檔自動／手動上傳於 Storj，網站直接讀取 Storj 公網 URL

- **GitHub Actions 自動化**
  - 定時抓取 RSS 並產生 JSON 檔至 `/data/`
  - 【規劃中】JSON 檔也會自動同步上傳 Storj，網站即時讀取

---

## 目前已完成

- Podcast／Newsletter 列表、細節頁渲染，前後端結構完整
- Podcast Firstory 播放器嵌入、封面自動切換
- Newsletter 內文插圖自動限寬高、去重與內容清理
- RSS to JSON 腳本穩定，slug/cover/image 欄位自動化對齊前端需求
- GitHub Actions 持續部署與定時自動更新
- Fallback 機制部署、YAML 與 Shell 腳本完善

---

## 進行中事項

- **資料結構升級**
  - Newsletter JSON 詳細檔將擴充 voiceover 欄位，與 Storj 音檔同步對應
- **前端開發**
  - 語音播放器渲染函式增加，根據 JSON voiceover 欄位自動顯示
- **Storj 整合**
  - 音檔、資料檔 JSON 都規劃同步傳至 Storj，網站讀取 Storj 公網址
  - CORS 設定確保跨站直接存取音訊
- **UI/功能加強**
  - 動畫、主題切換、OGP/meta 標籤、標籤過濾、全文搜尋系統等持續進行

---

## 待辦事項

- Works／FAQ／自定內容分頁完善
- SEO 靜態快照、OGP/meta 自動補全
- 內容聚合、去重與多平台主 key 同步比對
- API／外掛擴展（如留言互動、插件接口）
- podcast/newsletter 資料合併、比對與去重自動化
- 多語系、社群小工具、安全存取、Accessibility(a11y)

---

### 全站現況

目前網站內容更新、前後端整合、多平台備援機制穩定，voiceover 結構與 Storj 檔案同步成為下一階段重點，預計帶來語音媒體內容升級與多元備援發佈力。

---
