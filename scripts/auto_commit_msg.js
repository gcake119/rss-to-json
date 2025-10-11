#!/usr/bin/env node
// auto_commit_msg.js
// Node.js script to auto summary JSON/data changes with emoji for commit message

import { execSync } from 'child_process';
import path from 'path';

// Run git status, only data/ changes
const changed = execSync('git status --porcelain data/', { encoding: 'utf-8' })
  .split('\n')
  .filter(Boolean);

let podcastCount = 0;
let newsletterCount = 0;
let voiceoverCount = 0;
let fallbackCount = 0;
let details = [];

for (const line of changed) {
  // Format: M data/podcast/podcast_1/2024Q3e09.json
  const file = line.replace(/^[ M?]+/, '');
  if (file.includes('podcast')) {
    podcastCount++;
    const seg = file.split('/');
    details.push(`🎧 ${seg.slice(-1)[0]}`);
  }
  if (file.includes('newsletter')) {
    newsletterCount++;
    const seg = file.split('/');
    details.push(`📰 ${seg.slice(-1)[0]}`);
    if (file.includes('voiceover')) {
      voiceoverCount++;
      details.push(`🔊 ${seg.slice(-1)[0]}`);
    }
    if (file.includes('newsletter_p')) {
      fallbackCount++;
      details.push(`🟦 fallback: ${seg.slice(-1)[0]}`);
    }
  }
}

// Emoji summary
let msg = '';
if (podcastCount) msg += `🎧 Podcast RSS同步 ${podcastCount} 集 | `;
if (newsletterCount) msg += `📰 Newsletter同步 ${newsletterCount} 篇 | `;
if (voiceoverCount) msg += `🔊 新增語音 ${voiceoverCount} 檔 | `;
if (fallbackCount) msg += `🟦 Fallback合併 ${fallbackCount} 篇 | `;
if (!msg) msg = '✨ No major data changes | ';
msg += details.length ? `Details: ${details.join(', ')}` : '';

console.log(msg);
