# 📋 GCAKE.Space 開發待辦清單

> 最後更新：2026-01-19  
> 學會 Vue 框架後回來接手開發！

---

## 目錄

- [Newsletter 3 實作](#newsletter-3-實作)
- [短期任務（P2）](#短期任務p2)
- [中期任務（P3）](#中期任務p3)
- [長期任務（Nuxt 遷移）](#長期任務nuxt-遷移)
- [IPFS/IPNS 部署](#ipfsipns-部署)

---

## Newsletter 3 實作

《雞蛋糕的前端修煉屋》電子報新增

### Phase 1：資料來源設定

- [ ] **取得 Paragraph 錢包地址**
  - 確認《雞蛋糕的前端修煉屋》在 Paragraph 的發布錢包地址
  - 格式：`0x...` (Ethereum 地址)
  - 確認方式：Paragraph 後台 → Settings → Wallet

- [ ] **更新 `scripts/newsletter.js`**
  ```javascript
  // 第 7-9 行，新增 newsletter_3 設定
  const WALLET_ADDRESSES = [
    { id: 'newsletter_1', wallet: '0x1d1F6bEbaB8A03a09fd2E28A2D152a912d4D87c9' },
    { id: 'newsletter_2', wallet: '0xD1eb5d0C5e5990063016fbd6f32BB3cFa8014C9b' },
    { id: 'newsletter_3', wallet: '0x???????????????????????????????????????' }  // ← 新增
  ];
  ```

### Phase 2：資料檔案建立

- [ ] **建立 `data/newsletter_3.json`**（初始為空陣列 `[]`）
- [ ] **同步到 `docs/data/newsletter_3.json`**

### Phase 3：GitHub Actions 更新

- [ ] **更新 `.github/workflows/rss-json.yml`**
  - Step 3 voiceover_sync 新增 newsletter_3：
  ```yaml
  node scripts/voiceover_sync.js --voiceover_dir "./voiceover/newsletter_3" --json_dir "data/newsletter/newsletter_3"
  ```

### Phase 4：前端路由與渲染

- [ ] **更新 `js/app.js`** - 新增路由
  ```javascript
  'newsletter_3': () => renderNewsletterList('newsletter_3'),
  'newsletter_3-detail': (params) => renderNewsletterDetail('newsletter_3', params.id),
  ```

- [ ] **更新 `js/staticContent.js`** - 首頁新增第三張卡片
  ```javascript
  {
    title: '雞蛋糕的前端修煉屋',
    description: '前端開發技術分享與學習筆記',
    coverImage: '...',
    link: '#newsletter_3'
  }
  ```

- [ ] **更新導航選單**（如有）

### Phase 5：驗證

- [ ] 本地測試 `npm run dev`
- [ ] 執行一次 `node scripts/newsletter.js`
- [ ] 確認 `#newsletter_3` 可正常訪問
- [ ] 確認首頁顯示 3 張 Newsletter 卡片
- [ ] 確認 RWD 排版正常

---

## 短期任務（P2）

預計 1-2 週內完成

### Newsletter 1 & 2 功能完善

目前狀態：⏳ 進行中

- [ ] 確認 `data/newsletter_1.json` 資料格式符合 Phase-3-JSON-Spec
- [ ] 確認 `data/newsletter_2.json` 資料格式符合 Phase-3-JSON-Spec
- [ ] 測試 Newsletter 1 列表頁
- [ ] 測試 Newsletter 1 詳頁
- [ ] 測試 Newsletter 2 列表頁
- [ ] 測試 Newsletter 2 詳頁
- [ ] 測試 blocks 渲染（paragraph、heading、bulletList、table）

### SEO Meta 標籤動態更新

- [ ] 在 `js/app.js` 加入 `updateMeta()` 函式
  ```javascript
  function updateMeta(title, description, image) {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
  }
  ```
- [ ] 在各頁面渲染時呼叫 `updateMeta()`
- [ ] 測試 OG 標籤（Facebook Debugger / Twitter Card Validator）

---

## 中期任務（P3）

預計 1 個月內完成

### Works 頁面強化

- [ ] 定義 `data/works.json` 完整結構（參考 Phase-3-JSON-Spec）
- [ ] 建立 `data/works.json` 檔案
- [ ] 擴充 `staticContent.js` 的 works 區塊
- [ ] 新增專案卡片元件
- [ ] 新增篩選功能（按技術標籤）

### About / Contact 頁面完善

- [ ] About：新增技能標籤
- [ ] About：新增成就列表
- [ ] Contact：整合社群連結 icon
- [ ] Contact：優化抖內區塊 UI

---

## 長期任務（Nuxt 遷移）

參考：`spec/01-portfolio-dev-guide.md`

### Phase 1-2：Vite+Vue3 初期化（2-3 天）

- [ ] 安裝 Node.js LTS + pnpm
- [ ] 建立 Vite+Vue3 SPA 專案
- [ ] 驗證環境 `pnpm run dev`
- [ ] 建立專案資料夾結構
- [ ] 設定 VueRouter
- [ ] 建立根元件 App.vue
- [ ] 建立 Composable 資料取得函式
- [ ] 遷移原本 CSS 至 `src/style/main.css`

### Phase 3：Portfolio 範本風格重現（3-5 天）

- [ ] 建立 HeroSection.vue
- [ ] 建立 ProjectCard.vue
- [ ] 建立 PodcastCard.vue
- [ ] 建立 BlogCard.vue
- [ ] 頁面組件化完成

### Phase 4-5：Nuxt CLI + Tailwind（2-3 天）

- [ ] 遷移至 Nuxt3
- [ ] 安裝 Tailwind CSS
- [ ] 重構樣式

### Phase 6-7：Content + SSG（2-3 天）

- [ ] 設定 Nuxt Content
- [ ] SSG 預渲染設定
- [ ] SEO 優化

### Phase 8-9：CI/CD + 完成檢核（1-2 天）

- [ ] GitHub Actions 設定
- [ ] 部署測試
- [ ] Lighthouse 分數 > 90

---

## IPFS/IPNS 部署

參考：`spec/Phase-3-JSON-Spec.md` 1.3-1.4 節

### 架構說明

```
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
    └── data/*.json
```

### 費用說明

| 操作 | 費用 |
|------|------|
| 上傳檔案到 IPFS 網路 | **免費** |
| 取得 CID（Content ID） | **免費** |
| 更新 IPNS 指向 | **免費** |
| Pinata Pinning（1GB 內） | **免費** |
| ENS 初始設定 contenthash | ⚡ 一次性 gas（~$5-20） |
| **日常維運** | **$0** |

### 實作步驟

#### 一次性設定（需要 Gas）

- [ ] **在 Pinata 建立帳號**
  - 取得 API Key、API Secret、JWT Token

- [ ] **建立 IPNS Key**
  ```bash
  curl -X POST "https://api.pinata.cloud/v3/ipns/keys" \
    -H "Authorization: Bearer YOUR_PINATA_JWT" \
    -d '{"keyName": "gcake-site"}'
  # 記下回傳的 ipns_id: k51qzi5uqu5d...
  ```

- [ ] **設定 GitHub Secrets**
  - `PINATA_API_KEY`
  - `PINATA_API_SECRET`
  - `PINATA_JWT`
  - `IPNS_KEY_ID`

- [ ] **建立部署腳本 `scripts/deploy-ipfs.js`**
  - 上傳 dist/ 到 Pinata IPFS
  - 更新 IPNS 指向新 CID

- [ ] **在 ENS App 設定 contenthash**
  - contenthash: `ipns://k51qzi5uqu5d...`
  - ⚡ 這是唯一需要支付 gas 的步驟

#### 日常更新（免費）

- [ ] **更新 GitHub Actions**
  - 新增 Deploy to IPFS + Update IPNS 步驟
  - 參考 `spec/Phase-3-JSON-Spec.md` 附錄 A2

---

## 快速參考

### 相關規格書

| 文件 | 用途 |
|------|------|
| `spec/00-baseline-spec.md` | 專案基線規格（v1.1.0） |
| `spec/01-portfolio-dev-guide.md` | Nuxt 遷移開發指南 |
| `spec/Phase-1-Site-Skeleton.md` | 網站骨架定義 |
| `spec/Phase-3-JSON-Spec.md` | JSON 資料規格（v1.1.0） |
| `CHANGELOG.md` | 變更紀錄 |

### 常用指令

```bash
# 開發
npm run dev

# 建置
npm run build

# 抓取 Podcast RSS
node scripts/podcast.js

# 抓取 Newsletter（Arweave）
node scripts/newsletter.js

# 部署到 GitHub Pages
npm run deploy
```

---

## 完成標記說明

- `[ ]` 待完成
- `[x]` 已完成
- `[-]` 已取消/不適用

---

> 💪 學會 Vue 後回來把這些任務一個個打勾吧！
