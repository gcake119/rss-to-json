const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const primaryDir = argv.primary;
const fallbackDir = argv.fallback;
if (!primaryDir || !fallbackDir) {
  console.error("Usage: newsletter_merge_fallback.js --primary DIR --fallback DIR");
  process.exit(1);
}

function loadIndex(dir) {
  const idxFile = path.join(dir, 'index.json');
  if (!fs.existsSync(idxFile)) return [];
  const idx = JSON.parse(fs.readFileSync(idxFile, 'utf8'));
  return Array.isArray(idx.items) ? idx.items : [];
}

function mergeArticles(main, fallback) {
  const lookup = {};
  main.forEach(a => {
    lookup[a.slug || a.link] = 1;
  });
  const merged = [...main];
  fallback.forEach(a => {
    const key = a.slug || a.link;
    if (!lookup[key]) {
      a.meta = a.meta || {};
      a.meta.source = "fallback"; // 也可在詳細頁複製時標記
      merged.push(a);
      // Fallback 來源詳細 json補標複製
      const srcFile = path.join(fallbackDir, `${key}.json`);
      const tgtFile = path.join(primaryDir, `${key}.json`);
      if (fs.existsSync(srcFile) && !fs.existsSync(tgtFile)) {
        let detail = JSON.parse(fs.readFileSync(srcFile, "utf8"));
        detail.meta = detail.meta || {};
        detail.meta.source = "fallback";
        fs.writeFileSync(tgtFile, JSON.stringify(detail, null, 2));
      }
    }
  });
  merged.sort((a, b) => new Date(b.pubdate || b.date) - new Date(a.pubdate || a.date));
  return merged;
}

function writeIndex(dir, merged) {
  // index.json 更新為最新合併結果
  const mergedIndex = {
    type: "newsletter",
    updatedat: new Date().toISOString(),
    totalitems: merged.length,
    items: merged
  };
  fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify(mergedIndex, null, 2));
}

const primaryList = loadIndex(primaryDir);
const fallbackList = loadIndex(fallbackDir);
if (primaryList.length === 0 && fallbackList.length === 0) {
  console.error("[ERROR] No articles found to merge from either source.");
  process.exit(1);
}
const merged = mergeArticles(primaryList, fallbackList);
writeIndex(primaryDir, merged);

console.log(`[newsletter_merge_fallback] 合併完成，共 ${merged.length} 篇資料已更新至 ${primaryDir}/index.json`);
