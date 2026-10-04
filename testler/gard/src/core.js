/* Smoke test landing page runtime.
   1) Anonymous event tracking (no cookies, no third parties; random session id in sessionStorage).
   2) Early-access dialog with a button-to-dialog morph.
   Bespoke pages use this shared core; page visuals are written per test. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var qs = function (s, el) { return (el || doc).querySelector(s); };
  var qsa = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };

  /* ================================================================ tracking */
  var API = "/api/";
  var store = (function () {
    try { var k = "__t"; sessionStorage.setItem(k, k); sessionStorage.removeItem(k); return sessionStorage; }
    catch (e) { var m = {}; return { getItem: function (k) { return m[k] || null; }, setItem: function (k, v) { m[k] = String(v); } }; }
  })();
  var sid = store.getItem("smk_sid") || (window.crypto && crypto.randomUUID ? crypto.randomUUID() : "s" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12));
  store.setItem("smk_sid", sid);
  var utm = (function () {
    var q = new URLSearchParams(location.search), fresh = {};
    ["source", "medium", "campaign", "content", "term"].forEach(function (k) { var v = q.get("utm_" + k); if (v) fresh[k] = v.slice(0, 120); });
    if (Object.keys(fresh).length) { store.setItem("smk_utm", JSON.stringify(fresh)); return fresh; }
    try { return JSON.parse(store.getItem("smk_utm") || "{}"); } catch (e) { return {}; }
  })();
  // Kendi ziyaretlerini saymamak için: sayfayı bir kez ?k=1 ile aç (tarayıcıda kalıcı), kapatmak için ?k=0.
  (function () {
    var k = new URLSearchParams(location.search).get("k");
    try {
      if (k === "1") localStorage.setItem("smk_internal", "1");
      else if (k === "0") localStorage.removeItem("smk_internal");
      if (localStorage.getItem("smk_internal") === "1") utm = { source: "kontrol", medium: "internal" };
    } catch (e) {}
  })();
  // Reklam tıklama kimliği (değeri saklanmaz, yalnızca türü) ve otomasyon işareti: bot/önizleme ayrımı için.
  var cid = (function () {
    var q = new URLSearchParams(location.search);
    return q.get("fbclid") ? "fb" : q.get("gclid") || q.get("gbraid") || q.get("wbraid") ? "g" : null;
  })();
  var wd = navigator.webdriver === true;
  var dev = matchMedia("(max-width: 640px)").matches ? "mobile" : matchMedia("(max-width: 1024px)").matches ? "tablet" : "desktop";
  var refHost = ""; try { refHost = doc.referrer ? new URL(doc.referrer).hostname : ""; } catch (e) {}

  function send(ev, extra) {
    var body = { sid: sid, ev: ev, utm: utm, dev: dev };
    if (ev === "page_view" && refHost && refHost !== location.hostname) body.ref = refHost;
    if (ev === "page_view") { if (cid) body.cid = cid; if (wd) body.wd = true; }
    for (var k in extra) if (extra[k] != null) body[k] = extra[k];
    var data = JSON.stringify(body);
    try { if (navigator.sendBeacon && navigator.sendBeacon(API + "e", data)) return; } catch (e) {}
    try { fetch(API + "e", { method: "POST", body: data, keepalive: true, headers: { "Content-Type": "text/plain" } }); } catch (e) {}
  }
  send("page_view");
  var marks = { 50: false, 90: false };
  function onScrollDepth() {
    var h = root, max = h.scrollHeight - h.clientHeight, pct = max > 0 ? (h.scrollTop / max) * 100 : 100;
    [50, 90].forEach(function (m) { if (!marks[m] && pct >= m) { marks[m] = true; send("scroll_" + m, { depth: m }); } });
    if (marks[50] && marks[90]) removeEventListener("scroll", onScrollDepth);
  }
  addEventListener("scroll", onScrollDepth, { passive: true });
  // Gerçek kullanıcı etkileşimi (güvenilir dokunma/tıklama/tuş/kaydırma): botlar ve önizleyiciler genelde üretmez.
  var engaged = false;
  function onHuman(e) {
    if (engaged || !e.isTrusted) return;
    engaged = true;
    send("engaged");
    ["pointerdown", "touchstart", "keydown", "wheel"].forEach(function (t) { removeEventListener(t, onHuman, true); });
  }
  ["pointerdown", "touchstart", "keydown", "wheel"].forEach(function (t) { addEventListener(t, onHuman, { capture: true, passive: true }); });

  var G = null, animate = false;
  var cssVar = function (n) { return getComputedStyle(root).getPropertyValue(n).trim(); };
  /* ================================================================ early-access dialog */
  var dialog = qs("#early"), inner = dialog && qs(".modal-in", dialog);
  var form = dialog && qs(".lead-form", dialog);
  var formState = dialog && qs('[data-state="form"]', dialog), doneState = dialog && qs('[data-state="done"]', dialog);
  var errorBox = form && qs(".form-error", form);
  var chosenPlan = null, submitted = false, closing = false;

  function openDialog(fromEl) {
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal !== "function") { dialog.setAttribute("open", ""); return; }
    dialog.showModal();
    var input = qs('input[type="email"]', dialog);
    if (!animate || !fromEl) { if (input && !submitted) input.focus(); return; }
    var r = fromEl.getBoundingClientRect(), d = inner.getBoundingClientRect();
    var ghost = doc.createElement("div");
    ghost.className = "morph-ghost";
    ghost.style.cssText = "left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;height:" + r.height + "px;border-radius:" + getComputedStyle(fromEl).borderRadius;
    dialog.appendChild(ghost);
    G.set(inner, { autoAlpha: 0 });
    G.timeline({ onComplete: function () { ghost.remove(); if (input && !submitted) input.focus({ preventScroll: true }); } })
      .to(ghost, { left: d.left, top: d.top, width: d.width, height: d.height, borderRadius: getComputedStyle(inner).borderRadius,
        backgroundColor: cssVar("--surface"), duration: 0.6, ease: "expo.inOut" })
      .to(inner, { autoAlpha: 1, duration: 0.2 }, "-=0.14")
      .from(qsa(".modal-body:not([hidden]) > *", inner), { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.045, ease: "expo.out" }, "-=0.1")
      .to(ghost, { autoAlpha: 0, duration: 0.2 }, "<");
  }
  function closeDialog() {
    if (!dialog || !dialog.open || closing) return;
    if (!animate) { dialog.close(); return; }
    closing = true;
    G.to(inner, { autoAlpha: 0, y: 10, scale: 0.97, duration: 0.25, ease: "power2.in", onComplete: function () {
      dialog.close(); G.set(inner, { clearProps: "transform,opacity,visibility" }); closing = false;
    } });
  }
  if (dialog) {
    dialog.addEventListener("cancel", function (e) { e.preventDefault(); closeDialog(); });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) { closeDialog(); return; }
      var b = e.target.closest && e.target.closest('button[value="close"]');
      if (b) { e.preventDefault(); closeDialog(); }
    });
    dialog.addEventListener("close", function () { if (!submitted) send("modal_close"); });
  }

  doc.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-cta]") : null;
    if (!el) return;
    e.preventDefault();
    var btn = el.getAttribute("data-cta"), plan = el.getAttribute("data-plan");
    if (plan) { chosenPlan = plan; send("plan_click", { plan: plan, btn: btn }); }
    send("cta_click", { btn: btn, plan: plan });
    openDialog(el);
  });

  function showError(msg) { if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; if (animate) G.fromTo(errorBox, { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }); } }
  function showDone(email) {
    submitted = true;
    qs(".done-email", doneState).textContent = email;
    if (!animate) { formState.hidden = true; doneState.hidden = false; return; }
    var mark = qs(".done-mark", doneState);
    G.timeline()
      .to(formState, { autoAlpha: 0, y: -10, duration: 0.25, ease: "power2.in" })
      .add(function () { formState.hidden = true; doneState.hidden = false; })
      .fromTo(qs("circle", mark), { strokeDashoffset: 100, strokeDasharray: 100 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(qs("path", mark), { strokeDashoffset: 100, strokeDasharray: 100 }, { strokeDashoffset: 0, duration: 0.45, ease: "power3.out" }, "-=0.2")
      .from(qsa(".modal-done > :not(svg)", doneState), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: "expo.out" }, "-=0.3");
  }
  var M = (dialog && dialog.dataset) || {}; // English pages set data-msg-*; Turkish defaults live below
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;
      var email = form.email.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { showError(M.msgEmail || "Geçerli bir e-posta adresi yaz."); form.email.focus(); return; }
      if (!form.consent.checked) { showError(M.msgConsent || "Devam etmek için onay kutusunu işaretle."); return; }
      var button = qs('button[type="submit"]', form);
      button.disabled = true;
      fetch(API + "lead", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sid: sid, email: email, consent: true, plan: chosenPlan, utm: utm, dev: dev }) })
        .then(function (r) {
          if (r.ok) return showDone(email);
          if (r.status === 429) showError(M.msgRate || "Çok fazla deneme yapıldı. Biraz sonra tekrar dene.");
          else if (r.status === 400) showError(M.msgBad || "E-posta adresini kontrol edip tekrar dene.");
          else showError(M.msgFail || "Kaydın şu an alınamadı. Birazdan tekrar dene.");
        })
        .catch(function () { showError(M.msgNet || "Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar dene."); })
        .then(function () { button.disabled = false; });
    });
  }


})();
