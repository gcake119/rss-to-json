#!/usr/bin/env node
// auto_commit_msg.js
// Node.js script: auto summary commit message for major data changes (podcast/newsletter/voiceover)

import { execSync } from 'child_process';
import path from 'path';

// 只偵測 data/ 目錄下所有變動
const changed = execSync('git status --porcelain data/', { encoding: 'utf-8' })
  .split('\n')
  .filter(Boolean);

let podcastCount = 0;
let newsletterCount = 0;
let voiceoverCount = 0;
let details = [];

// 檔案路徑判斷和細節記錄
for (const line of changed) {
  // 格式: M data/podcast/podcast_1/podcast_1.json
  const file = line.replace(/^[ M?]+/, '');
  if (file.includes('data/podcast/')) {
    podcastCount++;
    const seg = file.split('/');
    details.push(`🎧 ${seg[2]}/${seg[3]}`);
  }
  if (file.includes('data/newsletter/')) {
    newsletterCount++;
    const seg = file.split('/');
    details.push(`📰 ${seg[2]}/${seg[3]}`);
    if (file.includes('voiceover')) {
      voiceoverCount++;
      details.push(`🔊 ${seg.slice(-1)[0]}`);
    }
  }
}

// Emoji commit summary（移除 fallback，僅聚焦 podcast/newsletter/voiceover）
let msg = '';
if (podcastCount) msg += `🎧 Podcast RSS同步 ${podcastCount} 集 | `;
if (newsletterCount) msg += `📰 Newsletter同步 ${newsletterCount} 篇 | `;
if (voiceoverCount) msg += `🔊 新增語音 ${voiceoverCount} 檔 | `;
if (!msg) msg = '✨ No major data changes | ';
msg += details.length ? `Details: ${details.join(', ')}` : '';

console.log(msg);
