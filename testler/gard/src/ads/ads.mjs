// Gard ad generator: node ads.mjs  ->  writes ad-<id>-<format>.html + ads.json into testler/<slug>/kreatifler/_work
// (render.py turns them into PNG + MP4 and the _work folder is deleted afterwards).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TR, EN } from "../copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..", "..");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const LIRA = '<svg class="lira" viewBox="0 0 10 14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" aria-hidden="true"><path d="M3.4 1v8.2c0 2.2 1.6 3.6 3.9 3.6"/><path d="M.8 6.6 9.2 4M.8 9.6 9.2 7"/></svg>';
const lira = (s) => s.replace(/₺/g, LIRA);

const LANGS = {
  tr: {
    c: TR, chip: ["Yakında", "Gard"], bars: ["GARD", "AYAK", "ÇENE"], fix: "DÜZELT", good: "İYİ", okTag: "DÜZELDİ",
    ads: {
      sorun: { file: "sorun", lines: ["Tek başına", "çalışırken", "tekniğini", "<em>kimse</em>", "<em>düzeltmiyor</em>"], flat: "Tek başına çalışırken tekniğini kimse düzeltmiyor" },
      sonuc: { file: "sonuc", lines: ["Videonu çek,", "gard ve ayak", "<em>puanını gör</em>"], flat: "Videonu çek, gard ve ayak puanını gör" },
      fiyat: { file: "fiyat", lines: ["Boks tekniği", "analizi ayda", "<em>₺199</em>"], flat: "Boks tekniği analizi ayda ₺199", amt: "₺199", per: "/ ay", planned: "Planlanan fiyat", feats: ["Video analizi", "Yapay zekâ koç", "4 haftalık program"] },
    },
  },
  en: {
    c: EN, chip: ["Coming soon", "Guard"], bars: ["GUARD", "FEET", "CHIN"], fix: "FIX", good: "GOOD", okTag: "FIXED",
    ads: {
      problem: { file: "problem", kind: "sorun", lines: ["Training", "alone, nobody", "<em>corrects your</em>", "<em>technique</em>"], flat: "Training alone, nobody corrects your technique" },
      result: { file: "result", kind: "sonuc", lines: ["Film your round,", "see your guard", "and footwork", "<em>score</em>"], flat: "Film your round, see your guard and footwork score" },
      price: { file: "price", kind: "fiyat", lines: ["Boxing technique", "feedback for", "<em>$7.99</em> a month"], flat: "Boxing technique feedback for $7.99 a month", amt: "$7.99", per: "/ mo", planned: "Planned price", feats: ["Video analysis", "AI coach", "4-week program"] },
    },
  },
};

const figLabels = (c) => esc(JSON.stringify(c.fig));

function html(L, id, a, format) {
  const c = L.c, kind = a.kind || id;
  const fig = `<svg class="fig" viewBox="0 0 400 500" data-labels="${figLabels(c)}"></svg>`;
  const hud = `<div class="hud"><span class="rec"><i></i>REC <b data-time>00:00</b></span><span>${esc(c.vf.side)}</span></div>`;
  const frame = `<i class="k k1"></i><i class="k k2"></i><i class="k k3"></i><i class="k k4"></i>`;
  const top = `<div class="top"><span class="chip">${esc(L.chip[0])} <b>·</b> ${esc(L.chip[1])}</span><span class="rec" style="visibility:hidden"><i></i>REC</span></div>`;
  const head = `<h1 class="hl">${a.lines.map((l) => `<span class="ln">${lira(l)}</span>`).join("")}</h1>`;
  let main = "";
  if (kind === "sorun") {
    main = `<div class="vf sorun"><div class="grid"></div>${fig}${frame}${hud}
      <div class="score"><small>${esc(c.vf.score)}</small><b>72</b><u><i></i></u></div></div>`;
  } else if (kind === "sonuc") {
    const vals = [72, 85, 64];
    const rows = L.bars.map((nm, i) => `<div class="r${i === 1 ? "" : " fix"}"><div class="l"><span>${esc(nm)}</span></div>
        <div class="v"><b>0</b>${i === 0 ? `<s>72</s>` : ""}</div><div class="bar"><i></i></div>
        <span class="tg${i === 1 ? " ok" : ""}" data-fix="${esc(L.fix)}" data-ok="${esc(L.okTag)}">${esc(i === 1 ? L.good : L.fix)}</span></div>`).join("");
    main = `<div class="vf sonuc"><div class="grid"></div>${fig}${frame}${hud}<div class="rows">${rows}</div></div>`;
  } else {
    main = `<div class="tag"><div class="in"><div class="amt">${lira(esc(a.amt))}<span>${esc(a.per)}</span></div><div class="pl">${esc(a.planned)}</div></div></div>
      <div class="vf fiyat"><div class="grid"></div>${fig}${frame}${hud}<ul class="feat">${a.feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>`;
  }
  // price ad: the feature list lives outside .vf in the square (left column), inside in the story
  if (kind === "fiyat" && format === "square") {
    main = `<div class="tag"><div class="in"><div class="amt">${lira(esc(a.amt))}<span>${esc(a.per)}</span></div><div class="pl">${esc(a.planned)}</div></div></div>
      <ul class="feat">${a.feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <div class="vf fiyat"><div class="grid"></div>${fig}${frame}${hud}</div>`;
  }
  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><title>${esc(a.flat)}</title>
<link rel="stylesheet" href="ad.css"><link rel="stylesheet" href="figure.css">
</head>
<body class="${format}" data-ad="${kind}">
${top}
${head}
${main}
<script src="figure.js"></script><script src="ad.js"></script>
</body></html>
`;
}

const only = process.argv[2];
for (const [lang, L] of Object.entries(LANGS)) {
  const slug = L.c.slug;
  if (only && only !== lang) continue;
  const work = path.join(root, slug, "kreatifler", "_work");
  fs.mkdirSync(path.join(work, "fonts"), { recursive: true });
  for (const f of ["ad.css", "ad.js"]) fs.copyFileSync(path.join(here, f), path.join(work, f));
  fs.copyFileSync(path.join(here, "..", "figure.js"), path.join(work, "figure.js"));
  fs.copyFileSync(path.join(here, "..", "figure.css"), path.join(work, "figure.css"));
  for (const f of fs.readdirSync(path.join(here, "..", "fonts"))) fs.copyFileSync(path.join(here, "..", "fonts", f), path.join(work, "fonts", f));
  const manifest = [];
  for (const [id, a] of Object.entries(L.ads)) {
    for (const [format, w, h] of [["story", 1080, 1920], ["square", 1080, 1080]]) {
      const file = `ad-${a.file}-${format}.html`;
      fs.writeFileSync(path.join(work, file), html(L, id, a, format));
      manifest.push({ file, id: a.file, format, w, h, headline: a.flat });
    }
  }
  fs.writeFileSync(path.join(work, "ads.json"), JSON.stringify(manifest, null, 2));
  console.log("ads", slug, manifest.length);
}
