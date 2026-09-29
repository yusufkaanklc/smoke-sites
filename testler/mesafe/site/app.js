/* Smoke test landing page runtime.
   1) Anonymous event tracking (no cookies, no third parties; random session id in sessionStorage).
   2) Early-access dialog with a button-to-dialog morph.
   3) Motion: hero choreography, live phone demo, scroll tour, section reveals (GSAP, self-hosted).
   Without GSAP or with reduced motion, the page stays fully usable in its static final state. */
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
  var dev = matchMedia("(max-width: 640px)").matches ? "mobile" : matchMedia("(max-width: 1024px)").matches ? "tablet" : "desktop";
  var refHost = ""; try { refHost = doc.referrer ? new URL(doc.referrer).hostname : ""; } catch (e) {}

  function send(ev, extra) {
    var body = { sid: sid, ev: ev, utm: utm, dev: dev };
    if (ev === "page_view" && refHost && refHost !== location.hostname) body.ref = refHost;
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

  /* ================================================================ motion setup */
  var G = window.gsap;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animate = !!(G && window.ScrollTrigger && window.SplitText && window.SmokeDemo && !reduced);
  if (animate) {
    window.__smkMotion = true;
    G.registerPlugin(ScrollTrigger, SplitText);
    var runScene = SmokeDemo.runScene, countUp = SmokeDemo.countUp;
  } else {
    root.classList.remove("motion");
  }
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
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;
      var email = form.email.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { showError("Geçerli bir e-posta adresi yaz."); form.email.focus(); return; }
      if (!form.consent.checked) { showError("Devam etmek için onay kutusunu işaretle."); return; }
      var button = qs('button[type="submit"]', form);
      button.disabled = true;
      fetch(API + "lead", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sid: sid, email: email, consent: true, plan: chosenPlan, utm: utm, dev: dev }) })
        .then(function (r) {
          if (r.ok) return showDone(email);
          if (r.status === 429) showError("Çok fazla deneme yapıldı. Biraz sonra tekrar dene.");
          else if (r.status === 400) showError("E-posta adresini kontrol edip tekrar dene.");
          else showError("Kaydın şu an alınamadı. Birazdan tekrar dene.");
        })
        .catch(function () { showError("Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar dene."); })
        .then(function () { button.disabled = false; });
    });
  }

  if (!animate) return;

  /* ================================================================ phone demo controller */
  var phone = qs(".phone"), phoneWrap = qs(".phone-wrap");
  var scenes = qsa(".ph-scenes .scene");
  var sceneIds = scenes.map(function (s) { return s.getAttribute("data-scene"); });
  var caption = qs(".ph-caption-in");
  var shape = qs(".stage-shape");
  var shapeTints = (function () {
    if (!shape) return [];
    var a = getComputedStyle(shape).backgroundColor;
    shape.style.background = "color-mix(in srgb, " + cssVar("--accent") + " 16%, " + cssVar("--bg") + ")";
    var b = getComputedStyle(shape).backgroundColor;
    shape.style.background = "";
    return [a, b];
  })();
  var demo = { i: 0, tl: null, timer: null, auto: true, visible: true, started: false };

  demo.show = function (i, opts) {
    opts = opts || {};
    if (typeof opts.auto === "boolean") demo.auto = opts.auto;
    clearTimeout(demo.timer);
    var prev = scenes[demo.i], next = scenes[i];
    if (demo.started && i === demo.i && !opts.force) { demo.schedule(); return; }
    if (demo.tl) demo.tl.progress(1, false).kill();
    var enter = G.timeline();
    var swap = prev !== next && demo.started;
    if (swap) {
      enter.to(prev, { xPercent: -14, autoAlpha: 0, duration: 0.42, ease: "power3.in" }, 0)
        .add(function () { prev.classList.remove("is-active"); G.set(prev, { clearProps: "transform" }); });
    }
    enter.add(function () { next.classList.add("is-active"); }, swap ? 0.16 : 0)
      .fromTo(next, { xPercent: swap ? 16 : 0, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }, swap ? 0.16 : 0);
    if (caption) {
      var text = next.getAttribute("data-caption") || "";
      if (caption.textContent !== text) {
        enter.to(caption, { yPercent: -120, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
          .add(function () { caption.textContent = text; })
          .fromTo(caption, { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "expo.out" });
      }
    }
    if (shape && shapeTints.length === 2) G.to(shape, { backgroundColor: shapeTints[i % 2], duration: 1, ease: "power2.inOut" });
    demo.i = i;
    demo.started = true;
    demo.tl = G.timeline({ delay: opts.delay || 0, onComplete: demo.schedule });
    demo.tl.add(enter).add(runScene(next), swap ? 0.22 : 0.05);
  };
  demo.schedule = function () {
    clearTimeout(demo.timer);
    if (!demo.auto || !demo.visible || doc.hidden) return;
    if (demo.tl && demo.tl.progress() < 1) return; // the running scene calls back when it finishes
    demo.timer = setTimeout(function () { demo.show((demo.i + 1) % scenes.length); }, 1700);
  };
  doc.addEventListener("visibilitychange", function () { if (!doc.hidden && demo.auto && demo.tl && !demo.tl.isActive()) demo.schedule(); });

  /* ================================================================ hero choreography */
  function intro() {
    var split = SplitText.create(".hero-title", { type: "lines", mask: "lines", linesClass: "line" });
    if (shape) G.set(shape, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
    var tl = G.timeline({ defaults: { ease: "expo.out" } });
    tl.set([".hero-title", ".lead", ".hero-actions", ".hero-note", ".phone-wrap", ".stage-shape", ".stage-orbit", ".float", ".hero-copy .hero-pill", ".hero-points"], { visibility: "visible" })
      .from(".hero-copy .hero-pill", { y: 14, autoAlpha: 0, scale: 0.94, duration: 0.9 }, 0)
      .from(split.lines, { yPercent: 108, duration: 1.15, stagger: 0.085 }, 0.08)
      .from(".lead", { y: 20, autoAlpha: 0, duration: 1 }, 0.3)
      .from(".hero-actions > *", { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.45)
      .from(".hero-points li", { y: 12, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, 0.6)
      .from(".hero-note", { autoAlpha: 0, duration: 0.8 }, 0.75)
      .from(".stage-shape", { scale: 0.4, autoAlpha: 0, duration: 1.5, ease: "expo.out" }, 0.05)
      .from(".stage-orbit", { scale: 0.7, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.2)
      .from(phone, { y: 140, rotationX: 28, rotation: 9, autoAlpha: 0, duration: 1.4, ease: "smk-spring" }, 0.15)
      .from(".ph-caption", { y: 14, autoAlpha: 0, duration: 0.6 }, 0.95);
    // UI cards pop out of the phone once it has landed, then drift gently
    qsa(".float").forEach(function (f, i) {
      var dir = f.classList.contains("float--1") ? 1 : -1;
      tl.from(f, { x: dir * 70, y: dir * 30, scale: 0.55, autoAlpha: 0, duration: 1.1, ease: "smk-spring" }, 1.05 + i * 0.16);
      G.to(f, { yPercent: dir * 9, duration: 2.8 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 + i * 0.5 });
    });
    // highlighter sweeps under the key phrase once the line has landed
    var hls = qsa(".hero-title .hl");
    if (hls.length) tl.fromTo(hls, { backgroundSize: "0% 0.3em" }, { backgroundSize: "100% 0.3em", duration: 0.9, stagger: 0.12, ease: "power3.inOut" }, 0.95);
    tl.add(function () { split.revert(); });
    demo.show(0, { force: true, delay: 0.9 });
    root.classList.remove("motion");
  }

  /* ================================================================ scroll choreography */
  function sections() {
    qsa(".h-reveal").forEach(function (h) {
      var s = SplitText.create(h, { type: "words", mask: "words", wordsClass: "word" });
      G.from(s.words, { yPercent: 110, duration: 1, stagger: 0.05, ease: "expo.out",
        scrollTrigger: { trigger: h, start: "top 86%", once: true }, onComplete: function () { s.revert(); } });
    });

    // reading progress
    var prog = qs(".progress i");
    if (prog) G.to(prog, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

    // hero backdrop drifts slower than the page
    if (qs(".stage-bg")) G.to(".stage-bg", { yPercent: 16, ease: "none", scrollTrigger: { trigger: ".stage", start: "top top", end: "bottom top", scrub: true } });

    // moments: endless tapes; scrolling speeds them up, then they settle back
    var mqs = qsa(".mq");
    if (mqs.length) {
      var loops = mqs.map(function (row) {
        var track = qs(".mq-track", row), rev = row.classList.contains("mq--b");
        var dur = Math.max(18, track.scrollWidth / 2 / 55);
        return G.fromTo(track, { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, duration: dur, ease: "none", repeat: -1 });
      });
      var settle = null;
      ScrollTrigger.create({ trigger: ".moments", start: "top bottom", end: "bottom top",
        onToggle: function (self) { loops.forEach(function (l) { if (self.isActive) l.play(); else l.pause(); }); },
        onUpdate: function (self) {
          var boost = 1 + Math.min(Math.abs(self.getVelocity()) / 320, 5);
          loops.forEach(function (l) { G.to(l, { timeScale: boost, duration: 0.2, overwrite: true }); });
          if (settle) settle.kill();
          settle = G.delayedCall(0.18, function () { loops.forEach(function (l) { G.to(l, { timeScale: 1, duration: 1.4, ease: "power2.out", overwrite: true }); }); });
        } });
      G.fromTo(".mq--a", { rotation: -4.2, xPercent: -2 }, { rotation: -1.4, xPercent: 2, ease: "none", scrollTrigger: { trigger: ".moments", start: "top bottom", end: "bottom top", scrub: 0.6 } });
      G.fromTo(".mq--b", { rotation: 3.4, xPercent: 2 }, { rotation: 0.8, xPercent: -2, ease: "none", scrollTrigger: { trigger: ".moments", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }

    // statement lights up word by word while it scrolls through the viewport
    var stx = qs(".statement-text");
    if (stx) {
      var sw = SplitText.create(stx, { type: "words" });
      G.fromTo(sw.words, { opacity: 0.13 }, { opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: stx, start: "top 80%", end: "bottom 42%", scrub: 0.5 } });
      if (qs(".statement .eyebrow")) G.from(".statement .eyebrow", { x: -20, autoAlpha: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".statement", start: "top 85%", once: true } });
    }

    // features: cards rise in row order, their mini screens play; hover replays them
    qsa(".bento-card").forEach(function (card, i) {
      var scr = qs(".bento-screen", card), at = (i % 3) * 0.09;
      var btl = G.timeline({ scrollTrigger: { trigger: card, start: "top 86%", once: true } });
      btl.from(card, { y: 70, autoAlpha: 0, scale: 0.96, duration: 1.1, ease: "expo.out" }, at)
        .from(qs(".bento-ic", card), { scale: 0.3, rotation: -25, duration: 0.9, ease: "smk-spring" }, at + 0.15)
        .from(qsa(".bento-copy > h3, .bento-copy > p", card), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" }, at + 0.2);
      if (scr) {
        var live = null;
        btl.add(function () { live = runScene(scr); }, at + 0.45);
        card.addEventListener("mouseenter", function () { if (live && !live.isActive()) live = runScene(scr); });
      }
    });

    // compare: the two cards slide in from their sides, items follow
    if (qs(".cmp")) {
      G.timeline({ scrollTrigger: { trigger: ".cmp", start: "top 80%", once: true } })
        .from(".cmp-card--without", { x: -50, autoAlpha: 0, duration: 1.05, ease: "expo.out" })
        .from(".cmp-card--with", { x: 50, autoAlpha: 0, duration: 1.05, ease: "expo.out" }, 0.12)
        .from(".cmp-card--without li", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" }, 0.35)
        .from(".cmp-card--with li", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "expo.out" }, 0.6)
        .from(".cmp-card--with .cmp-ic", { scale: 0, rotation: -40, duration: 0.7, stagger: 0.1, ease: "smk-spring" }, 0.66);
    }

    // facts: rise and count
    var facts = qsa(".fact");
    if (facts.length) {
      var ftl = G.timeline({ scrollTrigger: { trigger: ".facts-grid", start: "top 84%", once: true } });
      facts.forEach(function (f, i) {
        ftl.from(f, { y: 36, autoAlpha: 0, duration: 1, ease: "expo.out" }, i * 0.1)
          .fromTo(f, { borderTopColor: "rgba(0,0,0,0)" }, { borderTopColor: cssVar("--ink"), duration: 0.8, ease: "power2.out" }, i * 0.1 + 0.1);
        var dd = qs("dd", f);
        if (dd.hasAttribute("data-count")) countUp(ftl, dd, i * 0.1 + 0.15, 1.4);
      });
    }

    // steps: line draws with scroll, nodes pop as it reaches them
    var list = qs(".steps-list");
    if (list) {
      var line = qs(".steps-line i", list);
      var vertical = function () { return getComputedStyle(qs(".steps-line", list)).width === "2px"; };
      G.fromTo(line, { scaleX: function () { return vertical() ? 1 : 0; }, scaleY: function () { return vertical() ? 0 : 1; } },
        { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 62%", scrub: 0.6, invalidateOnRefresh: true } });
      qsa("li", list).forEach(function (li) {
        G.timeline({ scrollTrigger: { trigger: li, start: "top 78%", once: true } })
          .from(qs(".steps-dot", li), { scale: 0, duration: 0.6, ease: "smk-spring" })
          .from(qsa("h3, p", li), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.07, ease: "expo.out" }, 0.08);
      });
    }

    // pricing: cards rise, prices count up
    var plans = qsa(".plan");
    if (plans.length) {
      var ptl = G.timeline({ scrollTrigger: { trigger: ".plans", start: "top 80%", once: true } });
      ptl.from(plans, { y: 50, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "expo.out" });
      qsa(".plan-price strong", doc).forEach(function (el, i) { countUp(ptl, el, 0.25 + i * 0.12, 1.1); });
      if (qs(".plan-badge")) ptl.from(".plan-badge", { y: -8, scale: 0.8, autoAlpha: 0, duration: 0.6, ease: "smk-spring" }, 0.6);
    }

    // FAQ answers open and close with height
    qsa(".faq details").forEach(function (d) {
      var s = qs("summary", d), a = qs(".faq-a", d);
      s.addEventListener("click", function (e) {
        e.preventDefault();
        if (d.open) {
          d.classList.add("is-closing");
          G.to(a, { height: 0, duration: 0.38, ease: "power2.inOut", onComplete: function () { d.open = false; d.classList.remove("is-closing"); G.set(a, { clearProps: "height" }); } });
        } else {
          d.open = true;
          G.fromTo(a, { height: 0 }, { height: "auto", duration: 0.5, ease: "expo.out" });
          G.from(a.firstElementChild, { y: -8, autoAlpha: 0, duration: 0.45, ease: "expo.out" });
        }
      });
    });

    // closing statement lights up word by word as it scrolls in
    var ct = qs(".closing-title");
    if (ct) {
      var cs = SplitText.create(ct, { type: "words" });
      G.fromTo(cs.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ".closing", start: "top 78%", end: "center 58%", scrub: 0.4 } });
      G.from(qsa(".closing p, .closing .btn"), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ".closing .btn", start: "top 92%", once: true } });
    }

    // header: tuck away while reading down, return on the way up
    var top = qs(".top");
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: function (self) {
      var y = self.scroll();
      top.classList.toggle("is-scrolled", y > 8);
      top.classList.toggle("is-hidden", self.direction === 1 && y > 520 && !(dialog && dialog.open));
    } });

    // mobile: sticky CTA after the hero button scrolls away, hidden again at the closing CTA
    var bar = qs(".mbar");
    G.set(bar, { yPercent: 110, autoAlpha: 0 });
    var st = { past: false, end: false };
    var setBar = function () {
      var show = st.past && !st.end;
      G.to(bar, { yPercent: show ? 0 : 110, autoAlpha: show ? 1 : 0, duration: show ? 0.6 : 0.35, ease: show ? "expo.out" : "power2.in", overwrite: true });
    };
    ScrollTrigger.create({ trigger: ".hero-actions", start: "bottom top", onEnter: function () { st.past = true; setBar(); }, onLeaveBack: function () { st.past = false; setBar(); } });
    ScrollTrigger.create({ trigger: ".closing .btn", start: "top bottom", onEnter: function () { st.end = true; setBar(); }, onLeaveBack: function () { st.end = false; setBar(); } });
  }

  /* ================================================================ responsive: tour + pointer effects */
  function responsive() {
    var mm = G.matchMedia();

    // pause the demo loop when the phone is off screen
    ScrollTrigger.create({ trigger: phoneWrap, start: "top bottom", end: "bottom top",
      onToggle: function (self) { demo.visible = self.isActive; if (self.isActive) demo.schedule(); else clearTimeout(demo.timer); } });

    mm.add("(min-width: 60rem)", function () {
      var steps = qsa(".tour-step");
      steps.forEach(function (step) {
        var idx = Math.max(0, sceneIds.indexOf(step.getAttribute("data-scene")));
        ScrollTrigger.create({ trigger: step, start: "top 58%", end: "bottom 58%",
          onToggle: function (self) {
            step.classList.toggle("is-current", self.isActive);
            if (self.isActive) demo.show(idx, { auto: false });
          } });
        G.from(qsa(".tour-text > *", step), { y: 30, duration: 0.9, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 70%", once: true } });
      });
      ScrollTrigger.create({ trigger: ".hero-copy", start: "top top", end: "bottom 58%",
        onEnterBack: function () { demo.show((demo.i + 1) % scenes.length, { auto: true }); } });
      G.to(shape, { scale: 1.18, rotation: 0.01, ease: "none", scrollTrigger: { trigger: ".tour", start: "top bottom", end: "bottom bottom", scrub: 1 } });
      qsa(".float").forEach(function (f) {
        var dir = f.classList.contains("float--1") ? 1 : -1;
        G.to(f, { x: dir * 60, scale: 0.6, autoAlpha: 0, ease: "power1.in", immediateRender: false,
          scrollTrigger: { trigger: ".tour", start: "top 88%", end: "top 40%", scrub: 0.8 } });
      });
      return function () { qsa(".tour-step").forEach(function (s) { s.classList.remove("is-current"); }); };
    });

    mm.add("(max-width: 59.99rem)", function () {
      qsa(".float").forEach(function (f, i) {
        G.to(f, { y: i ? 40 : -40, ease: "none", immediateRender: false, scrollTrigger: { trigger: phoneWrap, start: "top 80%", end: "bottom top", scrub: 0.6 } });
      });
      qsa(".tour-step").forEach(function (step) {
        var card = qs(".screen-card", step);
        G.timeline({ scrollTrigger: { trigger: step, start: "top 78%", once: true } })
          .from(qsa(".tour-text > *", step), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07, ease: "expo.out" })
          .from(card, { y: 50, autoAlpha: 0, rotation: -2, duration: 1, ease: "smk-spring" }, 0.1)
          .add(runScene(card), 0.45);
      });
    });

    mm.add("(hover: hover) and (pointer: fine)", function () {
      var spots = qsa(".bento-card").map(function (card) {
        var move = function (e) { var r = card.getBoundingClientRect(); card.style.setProperty("--mx", (e.clientX - r.left) + "px"); card.style.setProperty("--my", (e.clientY - r.top) + "px"); };
        card.addEventListener("pointermove", move, { passive: true });
        return function () { card.removeEventListener("pointermove", move); };
      });
      var rx = G.quickTo(phone, "rotationX", { duration: 0.9, ease: "power3" });
      var ry = G.quickTo(phone, "rotationY", { duration: 0.9, ease: "power3" });
      var onMove = function (e) {
        var r = phone.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / innerWidth, dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        ry(G.utils.clamp(-10, 10, dx * 18)); rx(G.utils.clamp(-8, 8, -dy * 14));
        fx.forEach(function (q, i) { q(-dx * (i ? 22 : 34)); });
      };
      var fx = qsa(".float").map(function (f) { return G.quickTo(f, "xPercent", { duration: 1.1, ease: "power3" }); });
      addEventListener("pointermove", onMove, { passive: true });

      var mags = qsa("[data-magnetic]").map(function (el) {
        var x = G.quickTo(el, "x", { duration: 0.5, ease: "power3" }), y = G.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        var move = function (e) {
          var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          var dx = e.clientX - cx, dy = e.clientY - cy;
          if (Math.abs(dx) < r.width / 2 + 40 && Math.abs(dy) < r.height / 2 + 40) { x(dx * 0.22); y(dy * 0.3); }
          else { x(0); y(0); }
        };
        addEventListener("pointermove", move, { passive: true });
        return move;
      });
      return function () { removeEventListener("pointermove", onMove); mags.forEach(function (m) { removeEventListener("pointermove", m); }); spots.forEach(function (off) { off(); }); G.set(phone, { rotationX: 0, rotationY: 0 }); };
    });
  }

  /* ================================================================ start (after fonts, never later than 900ms) */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    intro();
    sections();
    responsive();
    ScrollTrigger.refresh();
  }
  if (doc.fonts && doc.fonts.ready) { doc.fonts.ready.then(start); setTimeout(start, 900); } else start();
})();
