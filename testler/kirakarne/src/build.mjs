// Kirakarne site generator (no template engine, no theme preset): node build.mjs
// Writes testler/kirakarne/site (Turkish only) from copy.mjs + page.css/page.js/karne.js/core.js.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { TR } from "./copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const rd = (f) => fs.readFileSync(path.join(here, f), "utf8");
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const assets = { "styles.css": rd("page.css"), "karne.js": rd("karne.js"), "core.js": rd("core.js"), "page.js": rd("page.js") };
const v = (f) => f + "?v=" + hash(assets[f]);

const LIRA = '<svg class="lira" viewBox="0 0 10 14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" aria-label="₺" role="img"><path d="M3.4 1v8.2c0 2.2 1.6 3.6 3.9 3.6"/><path d="M.8 6.6 9.2 4M.8 9.6 9.2 7"/></svg>';
const withLira = (h) => h.replace(/₺/g, () => LIRA);
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8"/></svg>';
const LOCK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></svg>';
const MARK = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="3" fill="#17150F"/><path d="M9 11h14M9 16h14M9 21h8" stroke="#F2EDE0" stroke-width="2" stroke-linecap="square"/><circle cx="23" cy="22" r="5.5" fill="#1F6B4F" stroke="#F2EDE0" stroke-width="1.6"/><path d="M20.6 22.2l1.7 1.7 3-3.4" stroke="#F2EDE0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const faviconSvg = MARK.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ') + "\n";

function karne(c, id) {
  const k = c.card;
  const cells = k.months.map((m) => `<div class="cell"><i>${esc(m)}</i><b>${esc(k.amount)}</b><span class="stamp">${CHECK}${esc(k.stamp)}</span></div>`).join("");
  return `<div class="kc" role="img" aria-label="${esc(k.aria)}"${id ? ` id="${id}"` : ""}>
        <div class="kc-h"><b>${esc(k.title)}</b><span>${esc(k.period)}</span></div>
        <div class="kc-who"><span>${esc(k.tenant)}</span><b>${esc(k.tenantName)}</b></div>
        <div class="kc-grid">${cells}</div>
        <div class="kc-f"><div class="kc-n"><b data-count>12</b>${esc(k.count[1])}</div><div class="kc-bar"><u></u></div></div>
        <div class="kc-share">${LOCK}<span>${esc(k.share)}</span></div>
      </div>`;
}

function page(c) {
  const h = c.hero, s = c.steps, d = c.dialog, cl = c.calc;
  const consent = `${esc(d.consentPre)}<a href="kvkk.html" target="_blank" rel="noopener">${esc(d.consentLink)}</a>${esc(d.consentPost)}`;
  const msgAttrs = d.msgs ? ` data-msg-email="${esc(d.msgs.email)}" data-msg-consent="${esc(d.msgs.consent)}" data-msg-rate="${esc(d.msgs.rate)}" data-msg-bad="${esc(d.msgs.bad)}" data-msg-fail="${esc(d.msgs.fail)}" data-msg-net="${esc(d.msgs.net)}"` : "";
  const rc = s.receipt, wa = s.wa, mi = s.mini;
  const mocks = [
    `<div class="rc"><h4>${esc(rc.head)}<span>${esc(rc.tag)}</span></h4><dl>${rc.rows.map((r) => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl></div>`,
    `<div class="wa"><small>${esc(wa.head)}</small><p>${esc(wa.text)}</p><span class="lnk">${esc(wa.link)}</span><hr><small>${esc(wa.sms)}</small><div class="code">${wa.code.map((n) => `<i>${n}</i>`).join("")}<span class="btn btn--g" aria-hidden="true">${esc(wa.btn)}</span></div></div>`,
    `<div class="mini"><h4>${esc(mi.title)}</h4><div class="g">${"<i></i>".repeat(12)}</div><div class="chip">${LOCK}${esc(mi.chip)}</div><small>${esc(mi.hint)}</small></div>`,
  ];
  const steps = s.items.map((it, i) => `
        <li class="step rv"><span class="step-n">${esc(it.n)}</span><h3>${esc(it.t)}</h3><p>${esc(it.p)}</p><div class="mock">${mocks[i]}</div></li>`).join("");
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
<meta name="theme-color" content="#F2EDE0">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/fraunces-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${v("styles.css")}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="pad-sticky">

<header class="top"><div class="wrap top-in">
  <a class="logo" href="./" aria-label="${esc(c.name)}">${MARK}<span>${esc(c.name)}</span></a>
  <button class="btn" data-cta="header">${esc(c.headerCta)}</button>
</div></header>

<main>
<section class="hero">
  <div class="wrap hero-in">
    <div>
      <p class="kick">${esc(h.eyebrow)}</p>
      <h1>${esc(h.before)}<em>${esc(h.hot)}</em>${esc(h.after)}</h1>
      <p class="lede">${esc(h.subtitle)}</p>
      <div class="cta-row">
        <button class="btn btn--g" data-cta="hero">${esc(h.cta)}</button>
        <a class="textlink" href="#nasil">${esc(h.secondary)}</a>
      </div>
      <p class="hero-note">${esc(h.note)}</p>
      <ul class="points">${h.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>
    ${karne(c)}
  </div>
</section>

<section class="sec" id="nasil">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick">${esc(s.label)}</p><h2 class="h2">${esc(s.title)}</h2></div>
    <ol class="steps">${steps}
    </ol>
  </div>
</section>

<section class="own">
  <div class="wrap own-in">
    <div class="rv">
      <p class="kick">${esc(c.own.label)}</p>
      <h2>${c.own.lines.map((l) => `<span>${esc(l)}</span>`).join("")}</h2>
      <p class="sub">${esc(c.own.sub)}</p>
    </div>
    <div class="lists rv">
      <div class="no"><h3>${c.lang === "tr" ? "Yok" : "Not here"}</h3><ul>${c.own.no.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="yes"><h3>${c.lang === "tr" ? "Var" : "Here"}</h3><ul>${c.own.yes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>
  </div>
</section>

<section class="sec sec--paper2">
  <div class="wrap calc">
    <div class="rv">
      <p class="kick">${esc(cl.label)}</p>
      <h2 class="h2">${esc(cl.title)}</h2>
      <p class="lede">${esc(cl.lede)}</p>
      <div class="remind"><b>${esc(cl.remindLabel)}</b>${cl.remind.map((r) => `<span>${esc(r)}</span>`).join("")}</div>
    </div>
    <div class="calc-card rv">
      <div class="fields">
        <label><span>${esc(cl.rent)}</span><input name="rent" inputmode="decimal" value="${cl.rentDef}"></label>
        <label><span>${esc(cl.rate)}</span><input name="rate" inputmode="decimal" value="${cl.rateDef}"></label>
      </div>
      <div class="outs" aria-live="polite">
        <div><span>${esc(cl.out.next)}</span><b data-out="next"></b></div>
        <div><span>${esc(cl.out.month)}</span><b data-out="month"></b></div>
        <div><span>${esc(cl.out.year)}</span><b data-out="year"></b></div>
      </div>
      <p class="hint">${esc(cl.hint)}</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><p class="kick">${esc(c.faq.label)}</p><h2 class="h2">${esc(c.faq.title)}</h2></div>
    <div class="faq rv">${faq}
    </div>
  </div>
</section>

<section class="close">
  <div class="wrap">
    <h2>${esc(c.close.title)}</h2>
    <p>${esc(c.close.text)}</p>
    <button class="btn btn--paper" data-cta="bottom">${esc(c.close.cta)}</button>
  </div>
</section>
</main>

<footer class="foot"><div class="wrap foot-in">
  <a class="logo" href="./">${MARK}<span>${esc(c.name)}</span></a>
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
        <button type="submit" class="btn btn--g btn--full">${esc(d.submit)}</button>
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
<script src="${v("karne.js")}" defer></script>
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
<meta name="theme-color" content="#F2EDE0">
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
const built = new Date().toISOString();
for (const c of [TR]) {
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
