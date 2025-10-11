// scripts/newsletter_voiceover_sync.js
import fs from 'fs';
import path from 'path';

function parseArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return null;
}

const voiceoverDir = parseArg('--voiceover_dir');
const jsonDir = parseArg('--json_dir');

if (!voiceoverDir || !jsonDir) {
  console.error('用法: node newsletter_voiceover_sync.js --voiceover_dir <dir> --json_dir <dir>');
  process.exit(1);
}

const files = fs.existsSync(voiceoverDir)
  ? fs.readdirSync(voiceoverDir).filter(f => f.endsWith('.mp3'))
  : [];

let updated = 0;
for (const fname of files) {
  const slug = fname.replace(/\.mp3$/, '');
  const jsonPath = path.join(jsonDir, slug + '.json');
  if (fs.existsSync(jsonPath)) {
    const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const storjUrl = `https://link.storjshare.io/YOUR_BUCKET_PATH/${fname}`;
    if (!json.voiceover || !json.voiceover.url || json.voiceover.url !== storjUrl) {
      json.voiceover = { url: storjUrl };
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
      updated++;
      console.log(`Voiceover synced: ${slug}`);
    }
  } else {
    console.warn(`無對應 JSON: ${jsonPath}`);
  }
}

console.log(`Voiceover 欄位自動同步完成，共 ${updated} 筆。`);
