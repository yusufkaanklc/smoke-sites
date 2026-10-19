// Steady Drive site generator (no template engine, no theme preset): node build.mjs
// Writes testler/steadydrive/site (Turkish only) from copy.mjs + page.css/page.js/scene.js/core.js.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { TR } from "./copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const Scene = createRequire(import.meta.url)("./scene.js");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const rd = (f) => fs.readFileSync(path.join(here, f), "utf8");
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const assets = { "styles.css": rd("page.css"), "scene.js": rd("scene.js"), "core.js": rd("core.js"), "page.js": rd("page.js") };
const v = (f) => f + "?v=" + hash(assets[f]);

const LIRA = '<svg class="lira" viewBox="0 0 10 14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" aria-label="₺" role="img"><path d="M3.4 1v8.2c0 2.2 1.6 3.6 3.9 3.6"/><path d="M.8 6.6 9.2 4M.8 9.6 9.2 7"/></svg>';
const withLira = (h) => h.replace(/₺/g, () => LIRA);
const MARK = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#0B5AA8"/><path d="M12.5 8h7l6 18h-4l-1-3.4h-9l-1 3.4h-4z" fill="#fff"/><path d="M16 12v3M16 18.5v3" stroke="#F2B300" stroke-width="2.4" stroke-linecap="round"/></svg>';
const faviconSvg = MARK.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ') + "\n";
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8"/></svg>';
const WARN = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2.5 18 16.5H2z"/><path d="M10 8v4M10 14.2v.1"/></svg>';

function page(c) {
  const h = c.hero, s = c.steps, vo = c.voice, k = c.karne, w = c.who, kn = c.know, p = c.price, d = c.dialog, wa = c.wa;
  const waUrl = `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.text)}`;
  const waBtn = (origin) => `<p class="wa-or">${esc(wa.or)}</p>
        <a class="btn btn--wa" href="${waUrl}" target="_blank" rel="noopener" data-wa="${origin}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.1-.2.200-.6.800-.8 1-.1.200-.3.200-.5.100-.2-.100-1-.4-1.900-1.200-.7-.6-1.200-1.400-1.300-1.600-.1-.2 0-.4.100-.5l.4-.4c.1-.1.100-.2.200-.4.100-.1 0-.3 0-.4-.1-.1-.6-1.400-.8-1.900-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.100-.6.300-.2.200-.8.800-.8 1.900s.8 2.200.9 2.300c.1.200 1.600 2.500 3.900 3.400 2.300.9 2.300.6 2.700.6.400 0 1.400-.6 1.600-1.100.2-.6.200-1 .1-1.100-.1-.1-.2-.2-.4-.3z"/></svg>${esc(wa.label)}</a>
        <p class="wa-note">${esc(wa.note)}</p>`;
  const consent = `${esc(d.consentPre)}<a href="kvkk.html" target="_blank" rel="noopener">${esc(d.consentLink)}</a>${esc(d.consentPost)}`;
  const msgAttrs = d.msgs ? ` data-msg-email="${esc(d.msgs.email)}" data-msg-consent="${esc(d.msgs.consent)}" data-msg-rate="${esc(d.msgs.rate)}" data-msg-bad="${esc(d.msgs.bad)}" data-msg-fail="${esc(d.msgs.fail)}" data-msg-net="${esc(d.msgs.net)}"` : "";

  const steps = s.items.map((it) => {
    const vis = it.img
      ? `<img src="img/${it.img}" alt="${esc(it.alt)}" width="1200" height="${Math.round(1200 * 1170 / 2532)}" loading="lazy" decoding="async">`
      : `<div class="levha levha--score" role="img" aria-label="${esc(it.score.l)} ${esc(it.score.v)} ${esc(it.score.of)}. ${esc(it.score.note)}"><small>${esc(it.score.l)}</small><b>${esc(it.score.v)}<i>${esc(it.score.of)}</i></b><span>${esc(it.score.note)}</span></div>`;
    return `
        <li class="step rv"><div class="step-vis">${vis}</div><div class="step-tx"><span class="step-n" aria-hidden="true">${esc(it.n)}</span><h3>${esc(it.t)}</h3><p>${esc(it.p)}</p></div></li>`;
  }).join("");
  const voice = vo.items.map((it) => `
        <li class="say rv"><span class="levha levha--say">${esc(it[0])}</span><div><b>${esc(it[1])}</b><p>${esc(it[2])}</p></div></li>`).join("");
  const kitems = k.items.map((it) => `
        <li>${CHECK}<div><b>${esc(it[0])}</b><span>${esc(it[1])}</span></div></li>`).join("");
  const who = w.items.map((it) => `
        <article class="who-c rv"><h3>${esc(it.t)}</h3><p>${esc(it.p)}</p></article>`).join("");
  const plans = p.plans.map((pl) => `
        <article class="plan rv${pl.hi ? " plan--hi" : ""}">
          ${pl.price === "0" ? "" : `<p class="plan-tag">${esc(p.tag)}</p>`}
          <h3>${esc(pl.name)}</h3>
          <p class="plan-price"><b>₺${esc(pl.price)}</b><span>${esc(pl.per)}</span></p>
          <ul>${pl.feats.map((f) => `<li>${CHECK}<span>${esc(f)}</span></li>`).join("")}</ul>
          <button class="btn ${pl.hi ? "btn--y" : "btn--dark"} btn--full" data-cta="plan-${pl.id}" data-plan="${pl.id}">${esc(pl.cta)}</button>
        </article>`).join("");
  const faq = c.faq.items.map((q) => `
        <details><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join("");
  const list = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join("");

  const html = `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${esc(c.seo.description)}">
<meta name="theme-color" content="#262B30">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/barlow-semi-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${v("styles.css")}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="pad-sticky">

<header class="top"><div class="wrap top-in">
  <a class="logo" href="./" aria-label="${esc(c.name)}">${MARK}<span>${esc(c.name)}</span></a>
  <button class="btn btn--y" data-cta="header">${esc(c.headerCta)}</button>
</div></header>

<main>
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-tx">
      <p class="kick">${esc(h.eyebrow)}</p>
      <h1>${esc(h.before)}<em>${esc(h.hot)}</em>${esc(h.after)}</h1>
      <p class="lede">${esc(h.subtitle)}</p>
      <form class="lead-form lead-inline" data-origin="inline" novalidate>
        <label class="sr" for="lead-email-inline">${esc(h.formLabel)}</label>
        <div class="inline-row">
          <input id="lead-email-inline" name="email" type="email" inputmode="email" autocomplete="email" required placeholder="${esc(h.formPlaceholder)}">
          <button type="submit" class="btn btn--y">${esc(h.cta)}</button>
        </div>
        <label class="consent"><input type="checkbox" name="consent" required>
          <span>${consent}</span></label>
        <p class="form-error" role="alert" hidden></p>
        ${waBtn("hero")}
        <p class="inline-done" role="status" hidden>${esc(d.doneTitle)}. ${esc(d.donePre)}<strong class="done-email"></strong>${esc(d.donePost)}</p>
      </form>
      <p class="hero-note">${esc(h.note)}</p>
      <ul class="points">${h.points.map((x) => `<li>${CHECK}${esc(x)}</li>`).join("")}</ul>
    </div>
    <figure class="scene" aria-label="${esc(h.sceneLabel)}">
      <svg id="scene" viewBox="0 0 800 500" role="img" aria-label="${esc(h.sceneLabel)}" xmlns="http://www.w3.org/2000/svg">${Scene.markup(Scene.STATIC_T)}</svg>
    </figure>
  </div>
</section>
<div class="lane" aria-hidden="true"></div>

<section class="sec" id="nasil">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick kick--dk">${esc(s.label)}</p><h2 class="h2">${esc(s.title)}</h2></div>
    <ol class="steps">${steps}
    </ol>
  </div>
</section>

<section class="sec sec--road">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick">${esc(vo.label)}</p><h2 class="h2">${esc(vo.title)}</h2><p class="lede">${esc(vo.lede)}</p></div>
    <ul class="says">${voice}
    </ul>
    <p class="sensors rv">${WARN}${esc(vo.sensors)}</p>
  </div>
</section>

<section class="sec">
  <div class="wrap karne">
    <div class="karne-img rv"><img src="img/karne.webp" alt="${esc(k.imgAlt)}" width="640" height="${Math.round(640 * 2532 / 1170)}" loading="lazy" decoding="async"></div>
    <div class="karne-tx rv">
      <p class="kick kick--dk">${esc(k.label)}</p>
      <h2 class="h2">${esc(k.title)}</h2>
      <ul class="ticks">${kitems}
      </ul>
    </div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick kick--dk">${esc(w.label)}</p><h2 class="h2">${esc(w.title)}</h2></div>
    <div class="who">${who}
    </div>
  </div>
</section>

<section class="sec sec--road">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick">${esc(kn.label)}</p><h2 class="h2">${esc(kn.title)}</h2></div>
    <div class="know">
      <div class="know-c know-c--lim rv"><h3>${esc(kn.limits.t)}</h3><ul>${list(kn.limits.items)}</ul></div>
      <div class="know-c know-c--pri rv"><h3>${esc(kn.privacy.t)}</h3><ul>${list(kn.privacy.items)}</ul></div>
    </div>
  </div>
</section>

<section class="sec" id="fiyat">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick kick--dk">${esc(p.label)}</p><h2 class="h2">${esc(p.title)}</h2><p class="lede lede--dk">${esc(p.lede)}</p></div>
    <div class="plans">${plans}
    </div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick kick--dk">${esc(c.faq.label)}</p><h2 class="h2">${esc(c.faq.title)}</h2></div>
    <div class="faq rv">${faq}
    </div>
  </div>
</section>

<section class="close">
  <div class="wrap close-in">
    <h2>${esc(c.close.title)}</h2>
    <p>${esc(c.close.text)}</p>
    <button class="btn btn--dark" data-cta="bottom">${esc(c.close.cta)}</button>
  </div>
</section>
</main>

<footer class="foot"><div class="wrap foot-in">
  <a class="logo" href="./">${MARK}<span>${esc(c.name)}</span></a>
  <p>${esc(c.footer.text)}</p>
  <p><a href="kvkk.html">${esc(c.footer.legal)}</a></p>
</div></footer>

<div class="sticky" role="region" aria-label="${esc(c.sticky.text)}"><span>${esc(c.sticky.text)}</span><button class="btn btn--y" data-cta="sticky" tabindex="-1">${esc(c.sticky.cta)}</button></div>

<dialog class="modal" id="early" aria-labelledby="early-title"${msgAttrs}>
  <div class="modal-in">
    <form method="dialog" class="modal-close-row"><button class="modal-x" aria-label="${esc(d.close)}" value="close">×</button></form>
    <div class="modal-body" data-state="form">
      <h2 id="early-title">${esc(d.title)}</h2>
      <p>${esc(d.p1)}</p>
      <p>${esc(d.p2)}</p>

      <form class="lead-form" data-origin="modal" novalidate>
        <label for="lead-email">${esc(d.label)}</label>
        <input id="lead-email" name="email" type="email" inputmode="email" autocomplete="email" required placeholder="${esc(d.placeholder)}">
        <label class="consent"><input type="checkbox" name="consent" required>
          <span>${consent}</span></label>
        <p class="form-error" role="alert" hidden></p>
        <button type="submit" class="btn btn--y btn--full">${esc(d.submit)}</button>
        ${waBtn("modal")}
      </form>
    </div>
    <div class="modal-body modal-done" data-state="done" hidden>
      <svg class="done-mark" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" pathLength="100"/><path d="M15 27l7.5 7.5L37.5 19" pathLength="100"/></svg>
      <h2>${esc(d.doneTitle)}</h2>
      <p>${esc(d.donePre)}<strong class="done-email"></strong>${esc(d.donePost)}</p>
      <form method="dialog"><button class="btn btn--dark btn--full" value="close">${esc(d.doneBtn)}</button></form>
    </div>
  </div>
</dialog>
<script src="${v("scene.js")}" defer></script>
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
<meta name="theme-color" content="#262B30">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${v("styles.css")}">
</head>
<body class="doc">
<header class="top"><div class="wrap top-in"><a class="logo" href="./">${MARK}<span>${esc(c.name)}</span></a></div></header>
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
const imgFiles = fs.readdirSync(path.join(here, "img")).filter((f) => f !== "simge.webp");
const built = new Date().toISOString();
for (const c of [TR]) {
  const out = path.join(root, c.slug, "site");
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(path.join(out, "fonts"), { recursive: true });
  fs.mkdirSync(path.join(out, "img"), { recursive: true });
  for (const [f, body] of Object.entries(assets)) fs.writeFileSync(path.join(out, f), body);
  for (const f of fontFiles) fs.copyFileSync(path.join(here, "fonts", f), path.join(out, "fonts", f));
  for (const f of imgFiles) fs.copyFileSync(path.join(here, "img", f), path.join(out, "img", f));
  fs.writeFileSync(path.join(out, "index.html"), page(c));
  fs.writeFileSync(path.join(out, "kvkk.html"), legal(c));
  fs.writeFileSync(path.join(out, "robots.txt"), robots);
  fs.writeFileSync(path.join(out, "favicon.svg"), faviconSvg);
  fs.writeFileSync(path.join(out, "durum.json"), JSON.stringify({ slug: c.slug, name: c.name, built_at: built }, null, 2) + "\n");
  console.log("built", c.slug, fs.readdirSync(out).length, "entries");
}
