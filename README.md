# GCAKE.Space 雞蛋糕個人創作者網站專案進度總結 2025/10/11 05:44  
**GitHub**：[gcake119/rss-to-json](https://github.com/gcake119/rss-to-json)  
**測試站**：GitHub Pages 上部署，作為 IPFS/Storj 上鏈前之測試預覽

---

## 專案目的

- 利用 **ENS**、**IPFS**、**RSS feed**（Podcast、Newsletter）、**Storj** 等去中心化技術
- 建立雞蛋糕（GCAKE）的內容創作者個人網站
- 特色：Podcast/電子報內容自動匯入、跨平台長備援、靜態網站免伺服器、分發不中斷

---

## 網站架構

- **前端：**  
  - 純原生 JavaScript SPA 構建，hash 路由多頁分流
  - 響應式設計（RWD），Gruvbox 暗色系，卡片式 UI
  - Podcast/Newsletter 完整分頁與詳細列表、單篇展開各自渲染

- **資料流：**
  - RSS 自動轉 JSON，後端完全靜態，fetch 加載分頁與單篇
  - Podcast 列表與單集嵌入 Firstory 播放器
  - Newsletter 支援主圖、語音欄位、純文字索引、內文插圖優化

- **測試與發佈：**
  - GitHub Pages 作為 CI/CD 開發主站（靜態測試）
  - 未來正式服務將 IPFS、Storj 作為分發與主存儲層，GitHub Pages 作備援

---

## 資料結構

- **Podcast**
  - `index-pN.json`：分頁卡片內容，分期分頁
  - 單集：`{年季}{集}.json`（例：2025Q3e03.json），含 slug, title, pub_date, audio, image, duration, tags等

- **Newsletter**
  - `index-pN.json`：分頁列表
  - 詳細：`YYYY-MM-DD_slug.json`，欄位有 slug, title, cover, summary, pub_date, tags, content_html, content_text
  - **預計 voiceover 欄位**：對應 mp3 放 Storj 上

- **資料目錄分層**
  - `/data/podcast/{podcast_N}/`
  - `/data/newsletter/{newsletter_N}/`
  - `/data/voiceover/{newsletter_N}/`

- **GitHub Actions**
  - 自動抓 RSS 產生 JSON，JSON（未來音訊檔）同步 Storj/Pages
  - YAML+Shell 腳本自動處理分頁、slug、欄位正規化

---

## 已完成重點

- SPA 架構就緒，多路由與 hash 分頁正常
- Podcast 與 Newsletter 卡片分頁、詳細內文、主圖皆能正常渲染
- Podcast 支援 Firstory 播放器 iframe 嵌入/與 show 封面自動切換
- Newsletter 內文圖像限寬優化、去重、雜訊內容清理準確
- Newsletter 詳細頁資料結構支援 voiceover 欄位，前端預留語音播放器生成邏輯
- 完整 RSS to JSON 腳本，slug/cover/image 各欄位自動對齊前端渲染
- GitHub Actions/CI 持續部署與資料更新流程穩定
- Fallback 機制，Podcast/Newsletter 多 RSS 來源自動合併資料

---

## 已完成測試/驗證項目

- ✔️ GitHub Pages 靜態網站正式部署，index-pN.json 分頁與單篇 API 資料皆測試正常
- ✔️ 呈現多來源（Firstory, Substack, Paragraph）內容均 OK，分頁 UI 完整可瀏覽
- ✔️ Podcast/Newsletter 內容同步拉取、資料結構統一
- ✔️ fallback RSS 來源抓取異常時能補回主資料，不覆蓋既有內容
- ✔️ SPA 響應式排版、主題切換功能運作無誤

---

## 進行中／待辦事項

- **資料結構升級**  
  - Newsletter 詳細 JSON 將擴充 voiceover 欄位（音檔 Storj）
- **前端功能**
  - 語音播放器渲染函式設計，根據 JSON 自動顯示 voiceover 聲音
  - UI 持續優化：動畫、主題切換功能擴充、標籤過濾與全文搜尋
- **Storj 整合**
  - 音檔和 JSON 同步傳到 Storj，網站直接跨域讀取 Storj 公網路 URL
- **SEO/OGP**
  - 自動化靜態快照、meta 產生，助攻搜尋與社群預覽
- **資料聚合/自動去重**
  - 跨平台主 key 比對、API 多來源自動合併與重覆內容同步排除
- **API／外掛互動**
  - 規劃留言互動、社群插件等額外模組
- **多語系、社群小工具、安全/a11y 提升**

---

## 結論與現況

**GCAKE.Space 創作者個站，已達成內容自動更新、多平台備援、前後端一體化流程。**  
現已穩定運行於 GitHub Pages、測試過 IPFS 傳播可行性，下一步主攻 voiceover 音訊升級與 Storj 直連存取改善。  
專案持續擴充，API、互動服務與內容搜尋為下一階段成長重點。

---
