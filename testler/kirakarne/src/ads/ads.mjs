// Kirakarne ad generator (Turkish only): node ads/ads.mjs -> writes kreatifler/_work/ad-<id>-<format>.html + ads.json
// (render.py turns them into PNG + MP4; _work is deleted afterwards).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TR } from "../copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..", "..");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const LIRA = '<svg class="lira" viewBox="0 0 10 14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" aria-hidden="true"><path d="M3.4 1v8.2c0 2.2 1.6 3.6 3.9 3.6"/><path d="M.8 6.6 9.2 4M.8 9.6 9.2 7"/></svg>';
const lira = (s) => s.replace(/₺/g, LIRA);
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8"/></svg>';
const LOCK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></svg>';

const k = TR.card;
const card = (six, share) => `<div class="kcw blk"><div class="kc${six ? " six" : ""}"><div class="kc-h"><b>${esc(k.title)}</b><span>${esc(k.period)}</span></div>
  <div class="kc-who"><span>${esc(k.tenant)}</span><b>${esc(k.tenantName)}</b></div>
  <div class="kc-grid">${k.months.map((m) => `<div class="cell"><i>${esc(m)}</i><b>${esc(k.amount)}</b><span class="stamp">${CHECK}${esc(k.stamp)}</span></div>`).join("")}</div>
  <div class="kc-f"><div class="kc-n"><b data-count>12</b>${esc(k.count[1])}</div><div class="kc-bar"><u></u></div></div>
  ${share ? `<div class="kc-share">${LOCK}<span>${esc(k.share)}</span></div>` : ""}</div></div>`;

const ADS = {
  sorun: { lines: ["Yeni ev sahibi", "<em>3 kira depozito</em>", "istiyor"], flat: "Yeni ev sahibi 3 kira depozito istiyor", kind: "sorun" },
  sonuc: { lines: ["12 ay, 12 onay,", "<em>tek karne</em>"], flat: "12 ay, 12 onay, tek karne", kind: "sonuc" },
  fiyat: { lines: ["Kira karnesi", "<em>ücretsiz</em>"], flat: "Kira karnesi ücretsiz", kind: "fiyat" },
};

function html(id, a, format) {
  const sq = format === "square";
  let main = "";
  if (a.kind === "sorun") {
    main = `<div class="slip blk"><div class="l"><small>Depozito talebi</small><div class="eq">3 × ₺22.500</div></div><div class="tot">₺67.500</div></div>
      ${card(true, false)}
      ${sq ? "" : `<p class="cap blk">Kirakarne: düzenli ödemenin ev sahibi onaylı kaydı</p>`}`;
  } else if (a.kind === "sonuc") {
    main = sq ? `${card(true, true)}<p class="cap blk">Süreli linkle yeni ev sahibine göster</p>` : `${card(false, true)}<p class="cap blk">Süreli linkle yeni ev sahibine göster</p>`;
  } else {
    main = `<div class="zero blk"><div class="big">₺0</div><p>ücretsiz olacak</p></div>
      <div class="pills blk"><span>Kira artış hesaplayıcı</span><span>Süreli paylaşım linki</span><span>Ödeme günü hatırlatma</span></div>`;
  }
  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><title>${esc(a.flat)}</title><link rel="stylesheet" href="ad.css"></head>
<body class="${format}" data-ad="${a.kind}">
<span class="chip"><i></i>Yakında <b>·</b> Kirakarne</span>
<h1 class="hl">${a.lines.map((l) => `<span class="ln">${lira(l)}</span>`).join("")}</h1>
${lira(main)}
<script src="karne.js"></script><script src="ad.js"></script>
</body></html>
`;
}

const work = path.join(root, TR.slug, "kreatifler", "_work");
fs.rmSync(work, { recursive: true, force: true });
fs.mkdirSync(path.join(work, "fonts"), { recursive: true });
for (const f of ["ad.css", "ad.js"]) fs.copyFileSync(path.join(here, f), path.join(work, f));
fs.copyFileSync(path.join(here, "..", "karne.js"), path.join(work, "karne.js"));
for (const f of fs.readdirSync(path.join(here, "..", "fonts"))) fs.copyFileSync(path.join(here, "..", "fonts", f), path.join(work, "fonts", f));
const manifest = [];
for (const [id, a] of Object.entries(ADS)) {
  for (const [format, w, h] of [["story", 1080, 1920], ["square", 1080, 1080]]) {
    const file = `ad-${id}-${format}.html`;
    fs.writeFileSync(path.join(work, file), html(id, a, format));
    manifest.push({ file, id, format, w, h, headline: a.flat });
  }
}
fs.writeFileSync(path.join(work, "ads.json"), JSON.stringify(manifest, null, 2));
console.log("hazır:", manifest.length, "sayfa ->", work);
