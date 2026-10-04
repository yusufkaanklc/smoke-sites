/* Gard page script: viewfinder figure loop, reveal-on-scroll, score count-up, sticky CTA.
   Everything here is progressive enhancement; the page reads fully without it. */
(function () {
  "use strict";
  var doc = document;
  var qs = function (s, el) { return (el || doc).querySelector(s); };
  var qsa = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- viewfinder ---- */
  var vf = qs(".vf"), svg = vf && qs("svg.fig", vf);
  if (svg && window.GardFig) {
    var labels = {};
    try { labels = JSON.parse(svg.getAttribute("data-labels") || "{}"); } catch (e) {}
    var num = qs("[data-score]", vf), bar = qs(".vf-bar u", vf), tim = qs("[data-time]", vf);
    var lastScore = -1, lastSec = -1;
    GardFig.run(svg, { labels: labels, onScore: function (score, flag, t) {
      if (score !== lastScore) {
        lastScore = score;
        if (num) num.textContent = score;
        if (bar) bar.style.width = score + "%";
        vf.classList.toggle("ok", score >= 80);
      }
      var sec = Math.floor(t);
      if (tim && sec !== lastSec) { lastSec = sec; tim.textContent = "00:0" + sec; }
    } });
  }

  /* ---- reveal + count-up ---- */
  function countUp(el) {
    var to = parseInt(el.getAttribute("data-count"), 10), t0 = null;
    if (reduce || isNaN(to)) { el.textContent = to; return; }
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 900);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var items = qsa(".rv");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        qsa("[data-count]", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- sticky CTA (phones): appears once the hero button has scrolled away ---- */
  var sticky = qs(".sticky"), heroCta = qs('.hero [data-cta="hero"]'), closing = qs(".close");
  if (sticky && heroCta && "IntersectionObserver" in window) {
    var past = false, atEnd = false;
    var sync = function () { sticky.classList.toggle("on", past && !atEnd); };
    new IntersectionObserver(function (es) { past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; sync(); }).observe(heroCta);
    if (closing) new IntersectionObserver(function (es) { atEnd = es[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(closing);
  }
})();
