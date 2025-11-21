# 📋 GCAKE.Space 框架移植開發策略實作檢核清單 & 程式碼範本

**文件用途**：以 Nuxt 官方 Portfolio 範本（nuxt-ui-templates/portfolio）為目標，循序漸進從現有 JS SPA 移植到 Nuxt + SSG 架構。
**更新時間**：2025年11月17日  
**版本號**：v1.0.1  

---

## 一、開發策略檢核流程

### Phase 1：環境準備 & Vite+Vue3 初期化

```bash
# 1. 安裝 Node.js LTS + pnpm
node --version  # v18+
npm install -g pnpm

# 2. 建立 Vite+Vue3 SPA 專案
pnpm create vite gcake-next --template vue
cd gcake-next
pnpm install

# 3. 驗證環境
pnpm run dev
# 開啟 http://localhost:5173
```

**目標達成檢核點**：
- [ ] Node.js v18+ 已安裝
- [ ] pnpm 全域可用
- [ ] Vite 開發伺服器成功啟動

---

### Phase 2：SPA 原始碼組件化 & VueRouter 導入

**目標**：將現有 HTML/CSS/JS 拆分成 Vue3 模組化組件

#### 2.1 建立專案資料夾結構
```
gcake-next/
├── src/
│   ├── App.vue                 # 根元件
│   ├── main.js                 # 入口點
│   ├── router.js               # VueRouter 設定
│   ├── pages/
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   ├── ProjectsPage.vue
│   │   ├── PodcastPage.vue
│   │   ├── NewsletterPage.vue
│   │   └── ContactPage.vue
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Nav.vue
│   │   │   └── Footer.vue
│   │   ├── sections/
│   │   │   ├── HeroSection.vue
│   │   │   ├── ProjectCard.vue
│   │   │   ├── PodcastCard.vue
│   │   │   └── BlogCard.vue
│   │   └── common/
│   │       ├── Button.vue
│   │       └── Badge.vue
│   ├── composables/
│   │   ├── useFetchData.js
│   │   └── useNavigation.js
│   ├── utils/
│   │   └── staticContent.js
│   ├── style/
│   │   └── main.css            # 遷移原本 style.css
│   └── assets/
│       ├── images/
│       └── icons/
├── public/
│   └── data/
│       ├── podcasts.json
│       ├── newsletters.json
│       ├── projects.json
│       └── aboutContent.json
├── package.json
└── vite.config.js
```

#### 2.2 VueRouter 設定
```javascript
// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import PodcastPage from './pages/PodcastPage.vue'
import NewsletterPage from './pages/NewsletterPage.vue'
import ContactPage from './pages/ContactPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/projects/:slug', component: ProjectDetail },
  { path: '/podcast', component: PodcastPage },
  { path: '/newsletter', component: NewsletterPage },
  { path: '/contact', component: ContactPage },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
```

#### 2.3 App.vue 根元件
```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <Nav />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Nav from './components/layout/Nav.vue'
import Footer from './components/layout/Footer.vue'
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
```

#### 2.4 Composable：資料取得
```javascript
// src/composables/useFetchData.js
import { ref } from 'vue'

export function useFetchData() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchData(url) {
    loading.value = true
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
```

**目標達成檢核點**：
- [ ] 全部頁面組件已建立
- [ ] VueRouter 已設定並測試
- [ ] 遷移原本 CSS 至 `src/style/main.css`
- [ ] 組件化元件（Header、Nav、Footer、Card）已建立
- [ ] Composable 資料取得函式可用

---

### Phase 3：Portfolio 範本風格重現（Vite+Vue3）

**目標**：參考 portfolio-template.nuxt.dev 設計，用現有技術快速驗證視覺與互動

#### 3.1 Hero Section 範本
```vue
<!-- src/components/sections/HeroSection.vue -->
<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <div class="hero-cta">
        <button class="btn btn-primary" @click="scrollToProjects">
          {{ ctaText }}
        </button>
      </div>
    </div>
    <img v-if="heroImage" :src="heroImage" :alt="title" class="hero-image" />
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'GCAKE 雞蛋糕' },
  subtitle: { type: String, default: '運動科學研究者 × 內容創作者' },
  ctaText: { type: String, default: 'View My Work' },
  heroImage: { type: String, default: null },
})

const emit = defineEmits(['scroll-to-projects'])

const scrollToProjects = () => {
  emit('scroll-to-projects')
  // 或實際捲動到 projects section
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>
```

#### 3.2 Project Card 元件
```vue
<!-- src/components/sections/ProjectCard.vue -->
<template>
  <div class="project-card">
    <div class="project-image">
      <img :src="project.image" :alt="project.title" />
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <router-link 
        :to="`/projects/${project.slug}`"
        class="project-link"
      >
        View Project →
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
    validator: (obj) => obj.title && obj.description && obj.image && obj.slug
  }
})
</script>

<style scoped>
.project-card {
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.project-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  color: #333;
}

.project-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.project-link:hover {
  color: #0052a3;
}
</style>
```

#### 3.3 Projects List 頁面
```vue
<!-- src/pages/ProjectsPage.vue -->
<template>
  <div class="projects-page">
    <section class="projects-header">
      <h1>Projects & Works</h1>
      <p>A selection of my recent projects showcasing my skills and experience.</p>
    </section>

    <section class="projects-filter">
      <button 
        v-for="tag in allTags"
        :key="tag"
        :class="{ active: selectedTag === tag }"
        @click="selectedTag = selectedTag === tag ? null : tag"
        class="filter-btn"
      >
        {{ tag }}
      </button>
    </section>

    <section class="projects-grid">
      <ProjectCard 
        v-for="project in filteredProjects"
        :key="project.slug"
        :project="project"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectCard from '../components/sections/ProjectCard.vue'
import { useFetchData } from '../composables/useFetchData.js'

const projects = ref([])
const selectedTag = ref(null)
const { fetchData } = useFetchData()

onMounted(async () => {
  const response = await fetch('/data/projects.json')
  projects.value = await response.json()
})

const allTags = computed(() => {
  const tags = new Set()
  projects.value.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projects.value
  return projects.value.filter(p => p.tags?.includes(selectedTag.value))
})
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.projects-header {
  text-align: center;
  margin-bottom: 3rem;
}

.projects-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.projects-header p {
  color: #666;
  font-size: 1.125rem;
}

.projects-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #0066cc;
  color: #0066cc;
}

.filter-btn.active {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 1rem;
  }

  .projects-header h1 {
    font-size: 1.75rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

#### 3.4 JSON 資料格式
```json
// public/data/projects.json
[
  {
    "slug": "podcast-website",
    "title": "Podcast 管理網站",
    "description": "使用 Nuxt + Tailwind 建立的 Podcast 播放與管理平台，支援 RSS 自動同步、靜態生成、IPFS 分散式存儲。",
    "image": "/assets/images/podcast-site.jpg",
    "tags": ["Nuxt", "Vue3", "Tailwind", "Web3"],
    "link": "https://gcake119.github.io/rss-to-json",
    "date": "2025-11-17"
  },
  {
    "slug": "blockchain-newsletter",
    "title": "區塊鏈電子報",
    "description": "深度介紹區塊鏈基礎概念與應用案例，定期發布給超過 500+ 訂閱者。",
    "image": "/assets/images/newsletter.jpg",
    "tags": ["Blockchain", "Content", "Newsletter"],
    "link": "#",
    "date": "2025-10-01"
  }
]
```

**目標達成檢核點**：
- [ ] Hero Section 視覺完成，RWD 測試通過
- [ ] Projects Page 卡片網格正常顯示
- [ ] 標籤篩選功能可用
- [ ] 專案詳細頁路由正常
- [ ] 所有 Section 設計對照官方範本完成

---

### Phase 4：Nuxt CLI 初始化 & 框架遷移

```bash
# 1. 初始化 Nuxt 專案
npx nuxi init gcake-nuxt
cd gcake-nuxt
pnpm install

# 2. 安裝 Tailwind CSS
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. 安裝 Nuxt Content
pnpm install @nuxt/content
```

#### 4.1 Nuxt 設定（nuxt.config.ts）
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // 基本設定
  ssr: true,
  devtools: { enabled: true },

  // Module 集成
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  // Content 設定
  content: {
    documentDriven: false,
  },

  // Tailwind 配置
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
  },

  // Meta & SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'GCAKE 雞蛋糕 | 創作者・研究者',
      meta: [
        {
          name: 'description',
          content: '運動科學研究者 × 內容創作者，分享 Podcast、電子報、技術心得。'
        },
        {
          name: 'og:image',
          content: '/og-image.jpg'
        }
      ],
    }
  },

  // Vite 設定
  vite: {
    logLevel: 'info',
  },
})
```

#### 4.2 Tailwind 設定（tailwind.config.ts）
```typescript
// tailwind.config.ts
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#666666',
        accent: '#ff6600',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### 4.3 Nuxt 頁面結構（自動路由）
```
app/
├── app.vue
├── pages/
│   ├── index.vue              # /
│   ├── about.vue              # /about
│   ├── projects/
│   │   ├── index.vue          # /projects
│   │   └── [slug].vue         # /projects/:slug
│   ├── podcast/
│   │   ├── index.vue          # /podcast
│   │   └── [id].vue           # /podcast/:id
│   ├── newsletter/
│   │   ├── index.vue          # /newsletter
│   │   └── [id].vue           # /newsletter/:id
│   └── contact.vue            # /contact
├── components/
│   ├── Header.vue
│   ├── Nav.vue
│   ├── Footer.vue
│   └── ProjectCard.vue
├── layouts/
│   └── default.vue
└── server/
    └── routes/
        └── sitemap.xml.ts     # 動態 sitemap
```

#### 4.4 Nuxt 頁面範例（index.vue）
```vue
<!-- app/pages/index.vue -->
<template>
  <div class="homepage">
    <HeroSection />
    <section id="projects" class="projects-section">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard 
            v-for="project in projects"
            :key="project.slug"
            :project="project"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const projects = ref([])

onMounted(async () => {
  const response = await fetch('/data/projects.json')
  projects.value = await response.json()
})

// SEO
useHead({
  title: 'GCAKE 雞蛋糕 | 創作者・研究者',
  meta: [
    {
      name: 'description',
      content: '運動科學研究者 × 內容創作者'
    }
  ]
})
</script>

<style scoped>
.homepage {
  @apply min-h-screen;
}

.projects-section {
  @apply py-12 px-4;
}

.container {
  @apply max-w-6xl mx-auto;
}

.projects-section h2 {
  @apply text-3xl font-bold mb-8 text-center;
}
</style>
```

**目標達成檢核點**：
- [ ] Nuxt 專案已初始化
- [ ] Tailwind CSS 已安裝並測試
- [ ] 路由自動生成正常
- [ ] 開發伺服器 `pnpm run dev` 可用

---

### Phase 5：CSS 逐步轉換至 Tailwind

#### 5.1 CSS → Tailwind 對照表
```
原 CSS                          Tailwind Utility Class
.text-center                    text-center
.mt-4                          mt-4
.bg-blue-500                   bg-blue-500
.text-white                    text-white
.px-4 py-2                     px-4 py-2
.rounded                       rounded
.flex gap-2                    flex gap-2
.grid grid-cols-3             grid grid-cols-3
.hover:shadow                  hover:shadow-lg
@media (max-width: 768px)     md:hidden, sm:block 等
```

#### 5.2 CSS 轉換範例
```vue
<!-- 舊：style.css 搭配 class -->
<div class="hero-section">
  <h1 class="hero-title">Title</h1>
</div>

<style>
.hero-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
}
</style>

<!-- 新：Tailwind utility classes -->
<div class="px-8 py-16 max-w-6xl mx-auto">
  <h1 class="text-5xl font-bold leading-tight">Title</h1>
</div>

<!-- 或使用 @apply 抽象複用組合 -->
<style scoped>
.hero-section {
  @apply px-8 py-16 max-w-6xl mx-auto;
}
.hero-title {
  @apply text-5xl font-bold leading-tight;
}
</style>
```

**目標達成檢核點**：
- [ ] 所有頁面已轉換為 Tailwind utility classes
- [ ] 自訂 CSS 已用 @apply 整理
- [ ] RWD 斷點（sm:、md:、lg:）正常工作
- [ ] 顏色方案已自訂至 tailwind.config.ts

---

### Phase 6：Nuxt Content 內容管理

#### 6.1 Markdown 檔案結構
```
content/
├── projects/
│   ├── podcast-website.md
│   ├── blockchain-newsletter.md
│   └── exercise-science-blog.md
├── blog/
│   ├── web3-intro.md
│   └── nuxt-migration-guide.md
└── pages/
    ├── about.md
    └── contact.md
```

#### 6.2 Markdown 內容格式
```markdown
---
title: Podcast 管理網站
description: 使用 Nuxt + Tailwind 建立的 Podcast 播放與管理平台
slug: podcast-website
image: /assets/images/podcast-site.jpg
tags:
  - Nuxt
  - Vue3
  - Tailwind
  - Web3
date: 2025-11-17
---

# Podcast 管理網站

這是一個完整的 Podcast 播放平台...

## 技術棧

- **前端框架**: Nuxt 3
- **樣式**: Tailwind CSS
- **內容管理**: Nuxt Content
- **部署**: GitHub Pages + IPFS

## 功能特色

1. RSS 自動同步
2. 靜態網站生成 (SSG)
3. 響應式設計
4. SEO 優化

---
```

#### 6.3 Nuxt 頁面讀取 Content
```vue
<!-- app/pages/projects/[slug].vue -->
<template>
  <div class="project-detail" v-if="project">
    <img :src="project.image" :alt="project.title" class="project-hero" />
    <article class="project-content">
      <h1>{{ project.title }}</h1>
      <p class="description">{{ project.description }}</p>
      <div class="tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <ContentRenderer :value="project" class="prose" />
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: project } = await useAsyncData(
  'project',
  () => queryContent('projects').where({ slug: route.params.slug }).findOne()
)

useHead({
  title: project?.value?.title,
  meta: [
    {
      name: 'description',
      content: project?.value?.description
    }
  ]
})
</script>

<style scoped>
.project-hero {
  @apply w-full h-96 object-cover rounded-lg mb-8;
}

.project-content {
  @apply max-w-3xl mx-auto px-4 py-8;
}

.description {
  @apply text-xl text-gray-600 mb-4;
}

.tags {
  @apply flex gap-2 flex-wrap mb-8;
}

.tag {
  @apply bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm;
}
</style>
```

**目標達成檢核點**：
- [ ] Markdown 檔案已建立在 `/content` 資料夾
- [ ] useAsyncData/useContentFetch 正常讀取
- [ ] 詳細頁動態渲染 Markdown 內容
- [ ] SEO meta 標籤自動生成

---

### Phase 7：SSG & 靜態生成

#### 7.1 預生成路由配置（nuxt.config.ts）
```typescript
export default defineNuxtConfig({
  // 其他配置...
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/rss.xml'],
      ignore: ['/admin']
    }
  },
  routeRules: {
    // 緩存靜態頁面 (1 小時)
    '/': { cache: { maxAge: 60 * 60 } },
    '/projects/**': { cache: { maxAge: 60 * 60 } },
    // API 路由 (不緩存)
    '/api/**': { cache: false }
  }
})
```

#### 7.2 Sitemap 生成（server/routes/sitemap.xml.ts）
```typescript
// server/routes/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const content = await queryCollection('content').find()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gcake.space/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  ${content.map(item => `
  <url>
    <loc>https://gcake.space${item._path}</loc>
    <lastmod>${item.updatedAt || item.createdAt}</lastmod>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
```

#### 7.3 Build & Preview
```bash
# 生成靜態站點
pnpm run build

# 預覽靜態生成結果
pnpm run preview

# dist/ 資料夾即為最終靜態檔案
```

**目標達成檢核點**：
- [ ] `pnpm run build` 成功完成
- [ ] `dist/` 資料夾包含所有靜態 HTML
- [ ] Sitemap 正常生成
- [ ] 離線模式下靜態檔案可瀏覽

---

### Phase 8：GitHub Actions 自動化部署

#### 8.1 GitHub Actions 工作流（.github/workflows/deploy.yml）
```yaml
name: Deploy to GitHub Pages & IPFS

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: gcake.space
      
      - name: Upload to Storj
        run: |
          # Storj 上傳指令
          uplink cp --recursive ./dist s3://gcake-space/latest/
      
      - name: Pin to IPFS
        run: |
          # Pinata API 上傳
          curl -X POST https://api.pinata.cloud/pinning/pinFileToIPFS \
            -H "Authorization: Bearer ${{ secrets.PINATA_JWT }}" \
            -F "file=@./dist"
```

#### 8.2 設定環境變數（GitHub Secrets）
在 GitHub Repository Settings → Secrets → New repository secret 新增：
- `PINATA_JWT`: Pinata API JWT Token
- `STORJ_ACCESS_GRANT`: Storj 存取憑證
- `ENS_PRIVATE_KEY`: ENS 私鑰（用於更新 contenthash）

**目標達成檢核點**：
- [ ] GitHub Actions 工作流已建立
- [ ] Push 觸發自動部署
- [ ] 靜態檔案成功部署至 GitHub Pages
- [ ] IPFS pin 成功
- [ ] ENS contenthash 已更新

---

### Phase 9：完成檢核 & 長期維運

#### 9.1 最終測試清單
- [ ] 首頁 Hero + Projects 正常顯示
- [ ] 所有路由可訪問 (`/projects`, `/podcast`, `/newsletter` 等)
- [ ] 專案詳細頁動態渲染
- [ ] RWD 在手機/平板/桌面正常
- [ ] 暗黑模式支援（如有）
- [ ] SEO meta 標籤正確
- [ ] 頁面載入時間 < 3 秒
- [ ] Lighthouse 分數 > 90

#### 9.2 持續維護檢核清單
- [ ] 每月更新 CHANGELOG.md
- [ ] 季度檢查依賴版本更新
- [ ] 新內容自動同步 (JSON → Markdown)
- [ ] GitHub Actions 運行狀態監控
- [ ] IPFS/Storj 備份驗證

#### 9.3 文檔更新
```markdown
# GCAKE.Space 移植完成紀錄

## 完成時間
- Phase 1 (Vite+Vue3): [完成日期]
- Phase 2 (SPA 組件化): [完成日期]
- Phase 3 (Portfolio 設計): [完成日期]
- Phase 4 (Nuxt CLI): [完成日期]
- Phase 5 (Tailwind): [完成日期]
- Phase 6 (Content): [完成日期]
- Phase 7 (SSG): [完成日期]
- Phase 8 (CI/CD): [完成日期]

## 最終指標
- 靜態檔案大小: [XXX KB]
- 首屏載入時間: [XXX ms]
- Lighthouse 分數: [XXX]
- SEO 關鍵字排名: [XXX]

## 已知問題 & TODO
- [ ] 項目 1
- [ ] 項目 2
```

---

## 附錄：常用命令速查表

```bash
# 開發
pnpm run dev          # 啟動開發伺服器 (http://localhost:3000)
pnpm run build        # 生成靜態檔案到 dist/
pnpm run preview      # 預覽生成結果

# 部署
pnpm run deploy       # 推送至 GitHub Pages
git push origin main  # 觸發 GitHub Actions

# 內容
# 新增文章：content/projects/my-project.md
# 新增頁面：app/pages/my-page.vue

# 調試
# 開啟 Nuxt DevTools: Shift + Alt + D
# 檢查路由: http://localhost:3000/__nuxt_error
```

---

**最後更新**：2025/11/17  
**版本**：1.0
