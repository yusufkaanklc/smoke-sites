// Gard site generator (no template engine, no theme preset): node build.mjs
// Writes testler/gard/site and testler/gard-en/site from copy.mjs + page.css/figure.css/page.js/core.js/figure.js.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { TR, EN } from "./copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");           // testler/
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const rd = (f) => fs.readFileSync(path.join(here, f), "utf8");
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);

const css = rd("page.css") + "\n" + rd("figure.css");
const assets = { "styles.css": css, "figure.js": rd("figure.js"), "core.js": rd("core.js"), "page.js": rd("page.js") };
const v = (f) => f + "?v=" + hash(assets[f]);

const staticFig = (c) => { try { return fs.readFileSync(path.join(here, `_fig_${c.lang}.svg`), "utf8"); } catch { return ""; } };

/* ---------- inline SVG glyphs (custom, 64x64 grid) ---------- */
const S = 'viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const icons = {
  guard: `<svg ${S}><circle cx="24" cy="14" r="8"/><path d="M5 32h54" stroke-dasharray="4 5" stroke-width="2.4"/><circle cx="40" cy="48" r="8"/><path d="M40 38v-8m-5 5 5-5 5 5" stroke="#FF3D1E" stroke-width="3.6"/></svg>`,
  feet: `<svg ${S}><rect x="5" y="44" width="20" height="11" rx="5.5"/><rect x="39" y="44" width="20" height="11" rx="5.5"/><path d="M15 12v26M49 12v26" stroke-dasharray="2 5" stroke-width="2.4"/><path d="M15 25h34M15 19v12M49 19v12" stroke="#FF3D1E" stroke-width="3.6"/></svg>`,
  chin: `<svg ${S}><circle cx="24" cy="22" r="15"/><path d="M33 36l25 10M33 36h28" stroke-width="2.6"/><path d="M50 36a18 18 0 0 1 4.6 7" stroke="#FF3D1E" stroke-width="3.6"/></svg>`,
  bell: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 28c0-9 5-16 13-16s13 7 13 16z"/><path d="M5 31h30"/><path d="M20 12V8"/><circle cx="20" cy="35" r="2.2" fill="currentColor"/></svg>`,
  mark: `<svg viewBox="0 0 24 24" fill="none" stroke="#ECE6D8" stroke-width="2.4" stroke-linecap="square" aria-hidden="true"><path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6"/><circle cx="12" cy="12" r="2.2" fill="#FF3D1E" stroke="none"/></svg>`,
};
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0D0D0B"/><path d="M14 26V14h12M38 14h12v12M50 38v12H38M26 50H14V38" fill="none" stroke="#ECE6D8" stroke-width="5" stroke-linecap="square"/><circle cx="32" cy="32" r="6" fill="#FF3D1E"/></svg>\n`;

const LIRA = '<svg class="lira" viewBox="0 0 10 14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" aria-label="₺" role="img"><path d="M3.4 1v8.2c0 2.2 1.6 3.6 3.9 3.6"/><path d="M.8 6.6 9.2 4M.8 9.6 9.2 7"/></svg>';
const withLira = (html) => html.replace(/₺/g, () => LIRA);

/* ---------- page ---------- */
function page(c) {
  const tr = c.lang === "tr";
  const sc = c.score, pg = c.program, pr = c.price, d = c.dialog;
  const consent = `${esc(d.consentPre)}<a href="kvkk.html" target="_blank" rel="noopener">${esc(d.consentLink)}</a>${esc(d.consentPost)}`;
  const msgAttrs = d.msgs
    ? ` data-msg-email="${esc(d.msgs.email)}" data-msg-consent="${esc(d.msgs.consent)}" data-msg-rate="${esc(d.msgs.rate)}" data-msg-bad="${esc(d.msgs.bad)}" data-msg-fail="${esc(d.msgs.fail)}" data-msg-net="${esc(d.msgs.net)}"`
    : "";
  const labels = esc(JSON.stringify(c.fig));
  const hero = c.hero;

  const rows = sc.rows.map((r) => `
        <div class="row${r.fix ? " fix" : ""}" style="--v:${r.v}%">
          ${icons[r.id]}
          <div class="nm">${esc(r.name)}</div>
          <div class="dt">${esc(r.detail)}</div>
          <div class="sc"><span data-count="${r.v}">${r.v}</span><small class="${r.fix ? "fix" : "good"}">${esc(r.tag)}</small></div>
          <div class="bar"><u></u></div>
        </div>`).join("");

  const weeks = pg.weeks.map((w, i) => `
        <li class="rv">
          <div class="bell">${icons.bell}</div>
          <div><div class="r">${esc(pg.round)} ${i + 1} · ${esc(pg.week)} ${i + 1}</div><h3>${esc(w[0])}</h3><p>${esc(w[1])}</p></div>
        </li>`).join("");

  const plans = pr.plans.map((p, i) => `
        <div class="plan${i ? " plan--pro" : ""} rv">
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
          <div class="pn">${esc(p.name)}</div>
          <div class="price"><b>${esc(p.amount)}</b><span>${esc(p.per)}</span></div>
          <div class="tag">${esc(pr.planned)}</div>${p.note ? `<p class="note2">${esc(p.note)}</p>` : ""}
          <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          <button class="btn${i ? "" : " btn--ink"} btn--full" data-cta="plan-${p.id}" data-plan="${p.id}">${esc(p.cta)}</button>
        </div>`).join("");

  const faq = c.faq.items.map((q) => `
        <details><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join("");

  const html = `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${esc(c.seo.description)}">
<meta name="theme-color" content="#0D0D0B">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/archivo-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${v("styles.css")}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="pad-sticky">

<header class="top"><div class="wrap top-in">
  <a class="logo" href="./" aria-label="${esc(c.name)}">${icons.mark}<span>${esc(c.name)}</span></a>
  <button class="btn" data-cta="header">${esc(c.headerCta)}</button>
</div></header>

<main>
<section class="hero">
  <div class="wrap hero-in">
    <div>
      <p class="kick"><b>●</b> ${esc(hero.eyebrow)}</p>
      <h1>${esc(hero.before)}<em>${esc(hero.hot)}</em>${esc(hero.after)}</h1>
      <p class="lede">${esc(hero.subtitle)}</p>
      <div class="cta-row">
        <button class="btn" data-cta="hero">${esc(hero.cta)}</button>
        <a class="textlink" href="#nasil">${esc(hero.secondary)}</a>
      </div>
      <p class="hero-note">${esc(hero.note)}</p>
      <ul class="points">${hero.points.map((p, i) => `<li><span>0${i + 1}</span>${esc(p)}</li>`).join("")}</ul>
    </div>
    <div class="vf" role="img" aria-label="${esc(c.vf.aria)}">
      <div class="vf-grid"></div>
      <svg class="fig" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true" data-labels="${labels}">${staticFig(c)}</svg>
      <i></i><i></i><i></i><i></i>
      <div class="vf-hud vf-hud--t"><span class="rec">REC <span data-time>00:02</span></span><span class="vf-side">${esc(c.vf.side)}</span></div>
      <div class="vf-bar"><u></u></div>
      <div class="vf-hud vf-hud--b">
        <div class="vf-score"><b data-score>72</b><span>${esc(c.vf.score)}</span></div>
      </div>
    </div>
  </div>
</section>

<section class="note" aria-label="${esc(c.note.label)}">
  <div class="wrap note-in rv">
    <p class="kick">${esc(c.note.label)}</p>
    <p class="big">${esc(c.note.text)}</p>
    <small>${esc(c.note.small)}</small>
  </div>
</section>

<section class="sec">
  <div class="wrap story">
    <div class="rv">
      <p class="kick">${esc(c.problem.label)}</p>
      <p class="say">${c.problem.say}</p>
      <p class="moments"><b>${esc(c.problem.momentsLabel)}</b>${c.problem.moments.map((m) => `<span>${esc(m)}</span>`).join("")}</p>
    </div>
    <div class="vs rv">
      <div class="without"><h3>${esc(c.problem.without.label)}</h3><ul>${c.problem.without.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
      <div class="with"><h3>${esc(c.problem.with.label)}</h3><ul>${c.problem.with.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
    </div>
  </div>
</section>

<section class="sec sec--bone" id="nasil">
  <div class="wrap score-grid">
    <div class="rv">
      <p class="kick">${esc(sc.label)}</p>
      <h2 class="h2 h2--s" style="margin:14px 0 26px">${esc(sc.title)}</h2>
      <ol class="steps">${sc.steps.map((s, i) => `<li><b>${i + 1}</b><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span></li>`).join("")}</ol>
    </div>
    <div class="card rv">
      <div class="card-h"><span>${esc(sc.head[0])}</span><span>${esc(sc.head[1])}</span></div>${rows}
      <div class="card-f"><span>${esc(sc.footLabel)}</span><span>${esc(sc.foot)}</span></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head rv">
      <p class="kick">${esc(pg.label)}</p>
      <h2 class="h2">${esc(pg.title)}</h2>
      <p class="lede">${esc(pg.lede)}</p>
    </div>
    <ol class="tl">${weeks}
    </ol>
    <div class="timer rv">
      <h3>${esc(pg.timerLabel)}</h3>
      <div class="tbar"><span class="w">${esc(pg.work)}</span><span class="rest">${esc(pg.rest)}</span></div>
      <p>${pg.timerText}</p>
    </div>
  </div>
</section>

<section class="sec sec--ink2">
  <div class="wrap talk">
    <div class="rv">
      <p class="kick">${esc(c.talk.label)}</p>
      <h2 class="h2 h2--s" style="margin:14px 0 18px">${esc(c.talk.title)}</h2>
      <p class="lede">${esc(c.talk.lede)}</p>
    </div>
    <div class="dlg rv">
      <div class="q">${esc(c.talk.q)}</div>
      <div class="a"><p class="kick">${esc(c.talk.aLabel)}</p><p>${esc(c.talk.a)}</p></div>
      <small>${esc(c.talk.small)}</small>
    </div>
  </div>
</section>

<section class="sec sec--bone">
  <div class="wrap">
    <div class="sec-head rv">
      <p class="kick">${esc(pr.label)}</p>
      <h2 class="h2">${esc(pr.title)}</h2>
      <p class="lede">${esc(pr.sub)}</p>
    </div>
    <div class="plans">${plans}
    </div>
    <p class="fine">${esc(pr.fine)}</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head rv">
      <p class="kick">${esc(c.faq.label)}</p>
      <h2 class="h2">${esc(c.faq.title)}</h2>
    </div>
    <div class="faq rv">${faq}
    </div>
  </div>
</section>

<section class="close">
  <div class="wrap">
    <h2>${esc(c.close.title)}</h2>
    <p>${esc(c.close.text)}</p>
    <button class="btn btn--ink" data-cta="bottom">${esc(c.close.cta)}</button>
  </div>
</section>
</main>

<footer class="foot"><div class="wrap foot-in">
  <a class="logo" href="./">${icons.mark}<span>${esc(c.name)}</span></a>
  <p>${esc(c.footer.text)}</p>
  <p><a href="kvkk.html">${esc(c.footer.legal)}</a></p>
</div></footer>

<div class="sticky" role="region" aria-label="${esc(c.sticky.text)}"><span>${esc(c.sticky.text)}</span><button class="btn" data-cta="sticky" tabindex="-1">${esc(c.sticky.cta)}</button></div>

<dialog class="modal" id="early" aria-labelledby="early-title"${msgAttrs}>
  <div class="modal-in">
    <form method="dialog" class="modal-close-row"><button class="modal-x" aria-label="${esc(d.close)}" value="close">×</button></form>
    <div class="modal-body" data-state="form">
      <h2 id="early-title">${esc(d.title)}</h2>
      <p>${esc(d.p1)}</p>
      <p>${esc(d.p2)}</p>

      <form class="lead-form" novalidate>
        <label for="lead-email">${esc(d.label)}</label>
        <input id="lead-email" name="email" type="email" inputmode="email" autocomplete="email" required placeholder="${esc(d.placeholder)}">
        <label class="consent"><input type="checkbox" name="consent" required>
          <span>${consent}</span></label>
        <p class="form-error" role="alert" hidden></p>
        <button type="submit" class="btn btn--full">${esc(d.submit)}</button>
      </form>
    </div>
    <div class="modal-body modal-done" data-state="done" hidden>
      <svg class="done-mark" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" pathLength="100"/><path d="M15 27l7.5 7.5L37.5 19" pathLength="100"/></svg>
      <h2>${esc(d.doneTitle)}</h2>
      <p>${esc(d.donePre)}<strong class="done-email"></strong>${esc(d.donePost)}</p>
      <form method="dialog"><button class="btn btn--ghost btn--full" value="close">${esc(d.doneBtn)}</button></form>
    </div>
  </div>
</dialog>
<script src="${v("figure.js")}" defer></script>
<script src="${v("core.js")}" defer></script>
<script src="${v("page.js")}" defer></script>
</body>
</html>
`;
  return withLira(html);
}

function legal(c) {
  const L = c.legal;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${esc(L.title)}</title>
<meta name="description" content="${esc(L.desc)}">
<meta name="theme-color" content="#0D0D0B">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${v("styles.css")}">
</head>
<body class="doc">
<header class="top"><div class="wrap top-in"><a class="logo" href="./">${icons.mark}<span>${esc(c.name)}</span></a></div></header>
<main class="wrap legal">
  ${L.html}
  <p><a class="textlink" href="./">${esc(L.back)}</a></p>
</main>
</body>
</html>
`;
}

const robots = `User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /durum.json
Disallow: /
`;

const fontFiles = fs.readdirSync(path.join(here, "fonts"));
const built = new Date().toISOString();
for (const c of [TR, EN]) {
  const out = path.join(root, c.slug, "site");
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(path.join(out, "fonts"), { recursive: true });
  for (const [f, body] of Object.entries(assets)) fs.writeFileSync(path.join(out, f), body);
  for (const f of fontFiles) fs.copyFileSync(path.join(here, "fonts", f), path.join(out, "fonts", f));
  fs.writeFileSync(path.join(out, "index.html"), page(c));
  fs.writeFileSync(path.join(out, "kvkk.html"), legal(c));
  fs.writeFileSync(path.join(out, "robots.txt"), robots);
  fs.writeFileSync(path.join(out, "favicon.svg"), faviconSvg);
  fs.writeFileSync(path.join(out, "durum.json"), JSON.stringify({ slug: c.slug, name: c.name, built_at: built }, null, 2) + "\n");
  console.log("built", c.slug, fs.readdirSync(out).length, "entries");
}
