import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import FeedParser from "feedparser";

// 輔助函數
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 解析參數
const [,, INFILE, OUTDIR = "data/newsletter/newsletter_p1"] = process.argv;
if (!INFILE) {
  console.error("Usage: node scripts/rss_to_json_paragraph.js <input_rss.xml> <output_dir>");
  process.exit(1);
}
if (!fs.existsSync(INFILE)) {
  console.error("Input XML not found:", INFILE);
  process.exit(1);
}
fs.mkdirSync(OUTDIR, { recursive: true });

// 實作 feedparser 解析本地 XML
const stream = fs.createReadStream(INFILE, { encoding: "utf-8" });
const feedparser = new FeedParser();
const items = [];

feedparser.on('error', err => { throw err; });

feedparser.on('readable', function() {
  let item;
  while (item = this.read()) items.push(item);
});

feedparser.on('end', () => {
  // 處理每一篇
  const resultItems = [];
  for (const it of items) {
    // 優先 guid slug，否則 link 最後一節
    let slug = "";
    if (it.guid) {
      const ref = typeof it.guid === "object" && it.guid._ ? it.guid._ : it.guid;
      slug = ref.split("/").pop();
    } else if (it.link) {
      slug = it.link.split("/").pop();
    }
    slug = slug.replace(/[^a-zA-Z0-9-_]/g, "") || `post${Date.now()}`;

    // FeedParser 會把所有主要欄位都解析成物件屬性
    const pubDate = new Date(it.pubdate || it.date || it["dc:date"] || Date.now()).toISOString();
    const cover = it.image?.url || it.enclosures?.[0]?.url || "";
    const tagsArr = Array.isArray(it.categories) ? it.categories : (it.categories ? [it.categories] : []);
    // Paragraph 文章常用 content:encoded/description/body
    const contentHtml = it["content:encoded"] || it.description || it.summary || "";
    const art = {
      slug,
      title: it.title || "",
      pub_date: pubDate,
      content_html: contentHtml,
      content_text: it.summary || "",
      cover,
      tags: tagsArr,
      link: it.link,
      voiceover: null
    };
    // 單篇檔案
    const d = new Date(pubDate);
    const yyyy = d.getUTCFullYear(), mm = String(d.getUTCMonth() + 1).padStart(2, "0"), dd = String(d.getUTCDate()).padStart(2, "0");
    const articleFn = `${yyyy}-${mm}-${dd}_${slug}.json`;
    fs.writeFileSync(path.join(OUTDIR, articleFn), JSON.stringify(art, null, 2));
    resultItems.push({
      slug,
      title: art.title,
      pub_date: pubDate,
      link: art.link,
      cover,
      has_voiceover: false,
      tags: tagsArr,
      permalink: `#newsletter/${slug}`,
    });
  }

  // index-p1.json
  const index = {
    type: "newsletter",
    page: 1,
    page_size: 10,
    total_items: resultItems.length,
    total_pages: Math.ceil(resultItems.length / 10),
    updated_at: new Date().toISOString(),
    items: resultItems
  };
  fs.writeFileSync(path.join(OUTDIR, "index-p1.json"), JSON.stringify(index, null, 2));
  console.log(`[OK] Parsed ${resultItems.length} articles using feedparser.`);
});

stream.pipe(feedparser);
