# 【Phase 3】動態資料 JSON 規格書

（Podcast / Newsletter / Works 資料來源與前端使用規範）

此文件定義網站動態內容的 JSON 資料格式、來源、自動化流程與前端使用規範，確保資料結構統一、容錯機制完善、維護成本最小化。

---

## 版本資訊

| 版本   | 日期       | 修改內容                           | 修改者 |
|--------|------------|------------------------------------|--------|
| v1.1.0 | 2026-01-19 | Storj → IPNS 架構調整、新增 Newsletter 3 | -      |
| v1.0.0 | 2025-11-17 | 初版：定義 Podcast/Newsletter/Works JSON 規格 | -      |

---

## 目錄

- [1. 總體架構說明](#1-總體架構說明)
- [2. Podcast 資料規格](#2-podcast-資料規格)
- [3. Newsletter 資料規格](#3-newsletter-資料規格)
- [4. Works 作品集資料規格](#4-works-作品集資料規格)
- [5. 前端使用規範](#5-前端使用規範)
- [6. 容錯與備援策略](#6-容錯與備援策略)
- [7. 維護流程](#7-維護流程)

---

## 1. 總體架構說明

### 1.1 設計原則

- **靜態主體 + 動態 JSON**：網站核心檔案（HTML/CSS/JS）與 JSON 一同打包至 IPFS，透過 IPNS 指向最新版本。
- **自動化優先**：Podcast、Newsletter 透過自動化腳本產生 JSON，減少人工維護。
- **統一格式**：所有 JSON 皆採用相同命名慣例與結構邏輯，便於前端統一處理。
- **容錯設計**：前端具備 fallback 機制，確保單一來源失效時仍可正常運作。
- **零 Gas 維運**：日常更新透過 IPNS 完成，無需修改 ENS，完全免費。

### 1.2 資料流向

```text
1. Podcast：RSS Feed → GitHub Action 自動轉換 → podcast1.json / podcast2.json → IPFS（透過 IPNS 指向）
2. Newsletter：Arweave (Paragraph) → GitHub Action 抓取 transactions → newsletter1.json / newsletter2.json / newsletter3.json → IPFS（透過 IPNS 指向）
3. Works：手動維護 works.json（未來可串接 GitHub API） → GitHub Action 同步 → IPFS（透過 IPNS 指向）
4. 前端：Nuxt3 fetch 相對路徑 JSON → 渲染頁面 → SSG/SEO 優化
```

### 1.3 IPNS 架構說明

```text
ENS (gcake.eth)
    │
    │ contenthash: ipns://k51qzi5uqu5d...
    │ （一次設定，永不改變）
    │
    ▼
IPNS Key (k51qzi5uqu5d...)
    │
    │ 目前指向: bafybeig...xyz  ← 每次更新改這裡（免費）
    │
    ▼
Pinata 上的 IPFS CID (bafybeig...xyz)
    │
    └── index.html
    └── style.css
    └── js/app.js
    └── data/
        ├── podcast_1.json
        ├── podcast_2.json
        ├── newsletter_1.json
        ├── newsletter_2.json
        └── newsletter_3.json
```

| 層級 | 功能 | 變動頻率 |
|------|------|----------|
| **ENS** | 人類可讀域名 → IPNS | ❄️ 永不變 |
| **IPNS** | 可變指標 → IPFS CID | 🔄 每次更新 |
| **Pinata/IPFS** | 實際檔案存放 | 🔄 每次更新 |

### 1.4 費用說明

| 操作 | 費用 |
|------|------|
| 上傳檔案到 IPFS 網路 | **免費** |
| 取得 CID（Content ID） | **免費** |
| 更新 IPNS 指向 | **免費** |
| Pinata Pinning（1GB 內） | **免費** |
| ENS 初始設定 contenthash | ⚡ 一次性 gas（~$5-20） |
| **日常維運** | **$0** |

### 1.5 檔案命名規則

- Podcast JSON：`podcast1.json`、`podcast2.json`（對應兩個 Podcast 節目）
- Newsletter JSON：`newsletter1.json`、`newsletter2.json`、`newsletter3.json`（對應三份電子報）
- Works JSON：`works.json`（統一作品集檔案）

---

## 2. Podcast 資料規格

### 2.1 資料來源

- **來源**：RSS Feed（兩個 Podcast 節目各有獨立 RSS URL）
- **轉換腳本**：GitHub Action 定期執行 RSS-to-JSON 轉換
- **更新頻率**：每日自動檢查更新（可設定為 cron job）

### 2.2 JSON Schema

```json
{
  "podcast": {
    "title": "節目名稱",
    "description": "節目簡介",
    "coverImage": "封面圖 URL",
    "author": "作者名稱",
    "feedUrl": "RSS Feed URL",
    "websiteUrl": "節目官網 URL（選填）",
    "language": "zh-TW"
  },
  "episodes": [
    {
      "guid": "唯一識別碼（通常為 RSS item guid）",
      "title": "集數標題",
      "pubDate": "發布日期（ISO 8601 格式，如 2025-11-17T10:00:00Z）",
      "description": "集數摘要（HTML 或純文字）",
      "audioUrl": "音檔連結（MP3 等）",
      "duration": "時長（秒數或 HH:MM:SS 格式）",
      "imageUrl": "集數封面圖 URL（選填，無則使用 podcast.coverImage）",
      "link": "集數網頁連結（選填）",
      "explicit": false
    }
  ]
}
```

### 2.3 欄位說明

| 欄位名稱              | 類型    | 必填 | 說明                                           |
|-----------------------|---------|------|------------------------------------------------|
| `podcast.title`       | string  | 是   | 節目名稱                                       |
| `podcast.description` | string  | 是   | 節目簡介                                       |
| `podcast.coverImage`  | string  | 是   | 節目封面圖 URL                                 |
| `podcast.author`      | string  | 是   | 作者/主持人名稱                                |
| `podcast.feedUrl`     | string  | 是   | RSS Feed URL                                   |
| `podcast.websiteUrl`  | string  | 否   | 節目官網                                       |
| `podcast.language`    | string  | 是   | 語言代碼（如 zh-TW）                           |
| `episodes[].guid`     | string  | 是   | 唯一識別碼（用於去重與排序）                   |
| `episodes[].title`    | string  | 是   | 集數標題                                       |
| `episodes[].pubDate`  | string  | 是   | 發布日期（ISO 8601）                           |
| `episodes[].description` | string | 是 | 集數摘要                                       |
| `episodes[].audioUrl` | string  | 是   | 音檔連結                                       |
| `episodes[].duration` | string/number | 否 | 時長                                        |
| `episodes[].imageUrl` | string  | 否   | 集數封面圖（無則使用 podcast.coverImage）      |
| `episodes[].link`     | string  | 否   | 集數網頁連結                                   |
| `episodes[].explicit` | boolean | 否   | 是否為成人內容                                 |

### 2.4 自動化流程

```text
1. GitHub Action 定期觸發（cron: 每日 00:00 UTC）
2. 執行 RSS Parser 腳本，抓取最新 episodes
3. 轉換為 JSON 格式，寫入 podcast1.json / podcast2.json
4. 重新打包網站上傳 IPFS（透過 Pinata）
5. 更新 IPNS 指向新 CID（免費）
6. 前端通過 IPNS 解析取得最新 JSON
```

---

## 3. Newsletter 資料規格

### 3.1 資料來源

- **來源**：Arweave 鏈上資料（透過 Paragraph 綁定 publication 錢包地址）
- **抓取方式**：GitHub Action 定期查詢錢包地址的 transactions，解析 data 欄位
- **更新頻率**：每日自動檢查更新

### 3.2 JSON Schema

```json
{
  "newsletter": {
    "title": "電子報名稱",
    "description": "電子報簡介",
    "author": "作者名稱",
    "publicationUrl": "Paragraph publication URL",
    "walletAddress": "Arweave 錢包地址",
    "language": "zh-TW"
  },
  "articles": [
    {
      "slug": "文章代碼（唯一識別）",
      "title": "文章標題",
      "publishedAt": "發布時間（ISO 8601 格式）",
      "content": "正文內容（HTML 或 Markdown）",
      "summary": "摘要（選填，無則截取 content 前 200 字）",
      "author": "作者名稱",
      "tags": ["標籤1", "標籤2"],
      "coverImage": "封面圖 URL（選填）",
      "txId": "Arweave transaction ID"
    }
  ]
}
```

### 3.3 欄位說明

| 欄位名稱                    | 類型    | 必填 | 說明                                      |
|-----------------------------|---------|------|-------------------------------------------|
| `newsletter.title`          | string  | 是   | 電子報名稱                                |
| `newsletter.description`    | string  | 是   | 電子報簡介                                |
| `newsletter.author`         | string  | 是   | 作者名稱                                  |
| `newsletter.publicationUrl` | string  | 是   | Paragraph publication URL                 |
| `newsletter.walletAddress`  | string  | 是   | Arweave 錢包地址                          |
| `newsletter.language`       | string  | 是   | 語言代碼                                  |
| `articles[].slug`           | string  | 是   | 文章代碼（用於 URL 與去重）               |
| `articles[].title`          | string  | 是   | 文章標題                                  |
| `articles[].publishedAt`    | string  | 是   | 發布時間（ISO 8601）                      |
| `articles[].content`        | string  | 是   | 正文內容（HTML/Markdown）                 |
| `articles[].summary`        | string  | 否   | 摘要                                      |
| `articles[].author`         | string  | 是   | 作者名稱                                  |
| `articles[].tags`           | array   | 否   | 標籤列表                                  |
| `articles[].coverImage`     | string  | 否   | 封面圖 URL                                |
| `articles[].txId`           | string  | 是   | Arweave transaction ID（用於驗證與追溯）  |

### 3.4 自動化流程

```text
1. GitHub Action 定期觸發（cron: 每日 00:00 UTC）
2. 查詢 Arweave 錢包地址的最新 transactions
3. 解析 transaction data，轉換為 JSON 格式
4. 寫入 newsletter1.json / newsletter2.json / newsletter3.json
5. 重新打包網站上傳 IPFS（透過 Pinata）
6. 更新 IPNS 指向新 CID（免費）
7. 前端通過 IPNS 解析取得最新 JSON
```

---

## 4. Works 作品集資料規格

### 4.1 資料來源

- **來源**：手動維護 `works.json`（未來可考慮串接 GitHub API 自動抓取 repo metadata）
- **更新方式**：開發者直接編輯 JSON，push 至 GitHub，觸發 Action 上傳 IPFS 並更新 IPNS
- **更新頻率**：依需求手動更新

### 4.2 JSON Schema

```json
[預留 Slot：此區塊將於後續階段補充完整 JSON 結構與欄位說明]
```

### 4.3 欄位說明

[預留 Slot：此區塊將於後續階段補充]

### 4.4 自動化流程

```text
[預留 Slot：此區塊將於後續階段補充]
```

---

## 5. 前端使用規範

### 5.1 資料取得路徑

- **相對路徑優先**：`/data/podcast1.json`（SSG 預渲染時直接使用）
- **IPFS Gateway fallback**：多 Gateway 備援（dweb.link / ipfs.io / cloudflare-ipfs.com）
- **本地快取**：前端可實作 localStorage 快取，提升載入速度

### 5.2 Nuxt3 Fetch 範例

```javascript
// 範例：在 Nuxt3 頁面中 fetch Podcast 資料
const IPFS_GATEWAYS = [
  'https://dweb.link',
  'https://ipfs.io',
  'https://cloudflare-ipfs.com',
  'https://gateway.pinata.cloud'
]

export default {
  async asyncData() {
    // 相對路徑優先（SSG 預渲染時直接使用）
    try {
      const podcast1 = await $fetch('/data/podcast1.json')
      return { podcast1 }
    } catch (error) {
      console.error('相對路徑取得失敗，嘗試 IPFS Gateway', error)
    }

    // IPFS Gateway fallback
    for (const gateway of IPFS_GATEWAYS) {
      try {
        const podcast1 = await $fetch(`${gateway}/ipns/gcake.eth/data/podcast1.json`)
        return { podcast1 }
      } catch (err) {
        console.error(`${gateway} 失敗`, err)
      }
    }

    return { podcast1: null }
  }
}
```

### 5.3 必填欄位檢查

前端應檢查關鍵必填欄位，避免 undefined 錯誤：

```javascript
if (!podcast1?.episodes || podcast1.episodes.length === 0) {
  // 顯示「目前無集數」或預設內容
}
```

### 5.4 SSG/SEO 設定

- **Nuxt3 generate**：預渲染 Podcast/Newsletter/Works 列表頁與詳細頁
- **Meta 標籤**：從 JSON 提取 `title`、`description`、`coverImage` 填入 meta
- **Structured Data**：建議加入 JSON-LD 結構化資料，強化 SEO

```javascript
// 範例：動態生成 meta
head() {
  return {
    title: this.podcast1.podcast.title,
    meta: [
      { hid: 'description', name: 'description', content: this.podcast1.podcast.description },
      { hid: 'og:image', property: 'og:image', content: this.podcast1.podcast.coverImage }
    ]
  }
}
```

---

## 6. 容錯與備援策略

### 6.1 資料來源失效處理

- **相對路徑失效**：依序嘗試多個 IPFS Gateway
- **IPFS Gateway 失效**：顯示本地快取（localStorage）
- **所有來源失效**：顯示預設訊息（如「資料載入中，請稍後再試」）

### 6.2 欄位缺失處理

- **必填欄位缺失**：前端顯示預設值或隱藏該項目
- **選填欄位缺失**：使用預設值（如 coverImage 缺失時使用網站 logo）

### 6.3 錯誤監控

- 建議串接前端錯誤監控服務（如 Sentry），即時偵測 JSON fetch 失敗

---

## 7. 維護流程

### 7.1 日常內容更新

```text
1. Podcast/Newsletter：GitHub Action 自動執行，無需手動操作
2. Works：編輯 works.json → git push → GitHub Action 自動上傳 IPFS 並更新 IPNS
3. 確認前端顯示正常（透過 IPFS Gateway URL 直接訪問 JSON 檢查）
```

### 7.2 規格書更新

- 新增欄位或修改結構時，同步更新本規格書
- 更新 `CHANGELOG.md` 記錄變更
- 更新對應版本號

### 7.3 重大更新（需更新 ENS contenthash）

僅在以下情況才需要修改 ENS contenthash（需消耗 gas）：

- 更換 IPNS Key（極罕見）
- ENS 域名變更

日常 JSON 內容更新、前端架構調整、CSS/JS 重構等，**全部透過 IPNS 更新**，不需要消耗 ENS gas fee。

---

## 附錄：GitHub Action 腳本範例

### A1. Pinata 部署腳本（deploy-ipfs.js）

```javascript
// scripts/deploy-ipfs.js
import fs from 'fs'
import path from 'path'

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET
const PINATA_JWT = process.env.PINATA_JWT
const IPNS_KEY_ID = process.env.IPNS_KEY_ID

async function uploadDirectory() {
  // 上傳 dist/ 資料夾到 Pinata IPFS
  // 回傳 CID
}

async function updateIPNS(cid) {
  // 更新 IPNS 指向新 CID（免費）
  const response = await fetch(`https://api.pinata.cloud/v3/ipns/name/${IPNS_KEY_ID}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cid })
  })
  return response.json()
}

async function main() {
  const cid = await uploadDirectory()
  await updateIPNS(cid)
  console.log(`✅ Deployed! CID: ${cid}`)
}

main()
```

### A2. GitHub Action 完整流程

```yaml
name: RSS to JSON + Deploy IPFS

on:
  schedule:
    - cron: '0 4 * * *'  # 每日 04:00 UTC
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    env:
      PINATA_API_KEY: ${{ secrets.PINATA_API_KEY }}
      PINATA_API_SECRET: ${{ secrets.PINATA_API_SECRET }}
      PINATA_JWT: ${{ secrets.PINATA_JWT }}
      IPNS_KEY_ID: ${{ secrets.IPNS_KEY_ID }}

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci

      # 1. Fetch RSS/Arweave → JSON
      - run: node scripts/podcast.js
      - run: node scripts/newsletter.js

      # 2. Build site
      - run: npm run build

      # 3. Deploy to IPFS + Update IPNS（免費）
      - run: node scripts/deploy-ipfs.js
```

---

## 結語

本規格書確保 Podcast、Newsletter、Works 三類資料來源與格式統一，前端可依循固定邏輯取得資料，並具備完善的容錯機制。

**架構優勢**：
- 日常維護僅需更新 JSON，透過 IPNS 自動指向最新版本
- ENS 設定一次後永不需要修改
- 達成「一次設定、持續更新、零 gas 維運」的目標
