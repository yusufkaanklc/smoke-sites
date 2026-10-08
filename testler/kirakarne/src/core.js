/* Smoke test landing page runtime.
   1) Anonymous event tracking (no cookies, no third parties; random session id in sessionStorage).
   2) Early-access dialog (native <dialog>).
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

  /* ================================================================ early-access forms: hero (inline) + dialog */
  var dialog = qs("#early");
  var forms = qsa(".lead-form");
  var formState = dialog && qs('[data-state="form"]', dialog), doneState = dialog && qs('[data-state="done"]', dialog);
  var chosenPlan = null, submitted = false;
  var M = (dialog && dialog.dataset) || {}; // English pages set data-msg-*; Turkish defaults live below

  function openDialog() {
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal !== "function") { dialog.setAttribute("open", ""); return; }
    dialog.showModal();
    var input = qs('input[type="email"]', dialog);
    if (input && !submitted) input.focus();
  }
  function closeDialog() { if (dialog && dialog.open) dialog.close(); }
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
    openDialog();
  });

  // WhatsApp bağlantısı: yeni sekmede açılır; tıklama niyet sinyali olarak cta_click (btn: whatsapp-<yer>) sayılır.
  doc.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-wa]") : null;
    if (a) send("cta_click", { btn: "whatsapp-" + a.getAttribute("data-wa") });
  });

  var inlineIntent = false;
  forms.forEach(function (form) {
    var origin = form.getAttribute("data-origin") || "modal";
    var errorBox = qs(".form-error", form), focused = false;
    // E-posta alanına ilk odaklanma: form açılıp kaç kişinin gerçekten yazmaya başladığını ölçer.
    form.addEventListener("focusin", function (e) {
      if (focused || !e.target.matches || !e.target.matches("input")) return;
      focused = true;
      send("form_focus", { btn: origin });
      // Hero formuna odaklanmak, eski hero butonuna basmak gibi sayılır (CTA oranı önceki testlerle kıyaslanabilir kalsın).
      if (origin === "inline" && !inlineIntent) { inlineIntent = true; send("cta_click", { btn: "hero-form" }); }
    });
    function showError(msg) { if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; } }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;
      var email = form.email.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { showError(M.msgEmail || "Geçerli bir e-posta adresi yaz."); form.email.focus(); return; }
      if (!form.consent.checked) { showError(M.msgConsent || "Devam etmek için onay kutusunu işaretle."); return; }
      var button = qs('button[type="submit"]', form);
      button.disabled = true;
      fetch(API + "lead", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sid: sid, email: email, consent: true, plan: chosenPlan || origin, utm: utm, dev: dev }) })
        .then(function (r) {
          if (r.ok) return showDone(email);
          if (r.status === 429) showError(M.msgRate || "Çok fazla deneme yapıldı. Biraz sonra tekrar dene.");
          else if (r.status === 400) showError(M.msgBad || "E-posta adresini kontrol edip tekrar dene.");
          else showError(M.msgFail || "Kaydın şu an alınamadı. Birazdan tekrar dene.");
        })
        .catch(function () { showError(M.msgNet || "Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar dene."); })
        .then(function () { button.disabled = false; });
    });
  });

  // Kayıt başarılı: hem sayfadaki hem penceredeki formu "alındı" durumuna al.
  function showDone(email) {
    submitted = true;
    qsa(".done-email").forEach(function (n) { n.textContent = email; });
    if (formState && doneState) { formState.hidden = true; doneState.hidden = false; }
    qsa(".lead-inline").forEach(function (f) {
      qsa(".inline-row, .consent, .form-error, .wa-or, .btn--wa, .wa-note", f).forEach(function (n) { n.hidden = true; });
      var d = qs(".inline-done", f); if (d) d.hidden = false;
    });
  }
})();
