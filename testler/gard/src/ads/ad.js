/* Gard ad frames: everything is a pure function of time. window.__setT(t) draws the frame at t seconds (video time);
   window.__still is the video time of the still image (PNG). figure.js supplies the skeleton. */
(function () {
  "use strict";
  var body = document.body, kind = body.getAttribute("data-ad");
  var clamp = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var seg = function (t, a, b) { return ease(clamp((t - a) / (b - a))); };
  var qs = function (s) { return document.querySelector(s); };
  var qsa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var LOOP = GardFig.LOOP;
  var sample = "İŞĞÇÖÜıçğöşü₺−·0123456789";
  function init() {

  /* headline: shrink until every line fits the box */
  var hl = qs(".hl");
  if (hl) {
    var size = parseFloat(getComputedStyle(hl).fontSize), maxW = hl.clientWidth, maxH = hl.clientHeight;
    var fits = function () { return qsa(".hl .ln").every(function (l) { return l.scrollWidth <= maxW + 1; }) && hl.scrollHeight <= maxH + 1; };
    var base = body.classList.contains("square") ? 76 : 96;
    size = base; hl.style.fontSize = size + "px";
    while (!fits() && size > 40) { size -= 1; hl.style.fontSize = size + "px"; }
  }

  var svgs = qsa("svg.fig"), figs = svgs.map(function (s) {
    var L = {}; try { L = JSON.parse(s.getAttribute("data-labels") || "{}"); } catch (e) {}
    return GardFig.mount(s, { labels: L, onScore: function (sc) { s.__score = sc; } });
  });
  var lines = qsa(".hl .ln"), tim = qs("[data-time]"), scoreEl = qs(".score b"), scoreBox = qs(".score"), bar = qs(".score u i");

  /* video-time -> figure-time. Problem: starts and ends on the flagged frame. Result/price: ends on the fixed frame. */
  function figT(t) { return kind === "sorun" ? (t + 2.1) % LOOP : Math.min(t, 5.6); }

  /* vertical rhythm: headline, then the panel(s), centred in the safe area (story: above y=1440) */
  (function layout() {
    var story = body.classList.contains("story"), ln = qsa(".hl .ln"), last = ln[ln.length - 1];
    var hlH = last.offsetTop + last.offsetHeight, hlTop = story ? 176 : 130, areaEnd = story ? 1440 : 1010;
    var vf = qs(".vf"), tag = qs(".tag"), feat0 = qs(".feat");
    var gap = story ? 60 : 44, parts;
    if (kind === "fiyat" && story) parts = [hlH, gap, 380, 40, 440];
    else if (kind === "fiyat") parts = [hlH, gap, 570];
    else parts = [hlH, gap, story ? 740 : 560];
    var total = parts.reduce(function (a, b) { return a + b; }, 0);
    var shift = Math.max(0, Math.floor((areaEnd - hlTop - total) / 2) - (story ? 20 : 0));
    hl.style.top = (hlTop + shift) + "px";
    var y = hlTop + shift + hlH + gap;
    if (kind === "fiyat" && story) { tag.style.top = y + "px"; vf.style.top = (y + 380 + 40) + "px"; }
    else if (kind === "fiyat") {
      var h = Math.min(570, areaEnd - y);
      tag.style.top = y + "px"; vf.style.top = y + "px"; vf.style.height = h + "px";
      feat0.style.top = (y + 340) + "px";
    } else { vf.style.top = y + "px"; vf.style.height = Math.min(parts[2], areaEnd - y) + "px"; }
  })();

  var rows = qsa(".r"), tags = qsa(".r .tg"), tagBox = qs(".tag"), feat = qs(".feat");
  var AYAK = 85, CENE = 64, GARD = 72, FIXED = 91;

  function setT(t) {
    var ft = figT(t);
    figs.forEach(function (f) { f.setT(ft); });
    if (tim) tim.textContent = "00:0" + Math.min(6, Math.floor(Math.min(t, 6.4)));
    lines.forEach(function (l, i) {
      var p = seg(t, 0.05 + i * 0.09, 0.55 + i * 0.09);
      l.style.opacity = p; l.style.transform = "translateY(" + ((1 - p) * 26) + "px)";
    });
    if (scoreEl) {
      var s = svgs[0].__score || 88;
      scoreEl.textContent = s; bar.style.width = s + "%"; scoreBox.classList.toggle("ok", s >= 80);
    }
    if (kind === "sonuc") {
      var up = seg(t, 0.4, 1.6);
      var gard = t < 4.7 ? GARD * up : GARD + (FIXED - GARD) * seg(t, 4.7, 5.2);
      var vals = [gard, AYAK * up, CENE * up];
      rows.forEach(function (r, i) {
        r.querySelector(".v b").textContent = Math.round(vals[i]);
        r.querySelector(".bar i").style.width = vals[i] + "%";
      });
      rows[0].classList.toggle("fix", t < 4.7);
      var was = rows[0].querySelector("s"); was.style.opacity = seg(t, 4.7, 5.0);
      tags[0].style.opacity = 0; tags[1].style.opacity = seg(t, 1.6, 1.9); tags[2].style.opacity = seg(t, 1.9, 2.2);
      var gt = rows[0].querySelector(".tg");
      gt.style.opacity = t < 4.7 ? seg(t, 1.6, 1.9) : 1;
      gt.className = "tg" + (t >= 4.7 ? " ok" : "");
      gt.textContent = t >= 4.7 ? gt.getAttribute("data-ok") : gt.getAttribute("data-fix");
    }
    if (kind === "fiyat") {
      var p = seg(t, 0.2, 0.9);
      if (tagBox) { tagBox.style.opacity = p; tagBox.style.transform = "translateX(" + ((1 - p) * -120) + "px)"; }
      if (feat) { var q = seg(t, 0.9, 1.5); feat.style.opacity = q; feat.style.transform = "translateY(" + ((1 - q) * 20) + "px)"; }
    }
  }
  window.__setT = setT;
  window.__still = kind === "sorun" ? 6.9 : 7.0;
  window.__dur = 7.6;
  setT(window.__still);
  window.__ready = true;
  }
  Promise.all([document.fonts.load("900 96px Archivo", sample), document.fonts.load("800 26px Archivo", sample), document.fonts.load("700 40px Figtree", sample)])
    .then(function () { return document.fonts.ready; }).then(init);
})();
