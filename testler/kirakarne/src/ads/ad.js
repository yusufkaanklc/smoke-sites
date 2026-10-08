/* Kirakarne ad frames: pure function of time. window.__setT(t) draws the frame at video-time t seconds,
   window.__still is the video time of the PNG (final frame), window.__ready flips when layout is done. */
(function () {
  "use strict";
  var body = document.body, kind = body.getAttribute("data-ad");
  var clamp = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var seg = function (t, a, b) { return ease(clamp((t - a) / (b - a))); };
  var qs = function (s) { return document.querySelector(s); };
  var qsa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  function init() {
    var story = body.classList.contains("story"), hl = qs(".hl");
    // headline: shrink until every line fits
    var size = story ? 108 : 86; hl.style.fontSize = size + "px";
    var maxW = hl.clientWidth;
    while (qsa(".hl .ln").some(function (l) { return l.scrollWidth > maxW + 1; }) && size > 44) { size -= 1; hl.style.fontSize = size + "px"; }
    qsa(".kcw").forEach(function (w) { var kc = w.querySelector(".kc"), s = w.clientWidth / 560; kc.style.transform = "scale(" + s + ")"; w.style.height = Math.ceil(kc.offsetHeight * s + 12 * s) + "px"; });
    var last = qsa(".hl .ln").pop(), hlTop = parseFloat(getComputedStyle(hl).top), hlBottom = hlTop + last.offsetTop + last.offsetHeight;
    // vertical rhythm below the headline; story keeps everything above y=1440
    var area = story ? 1440 : 1010, gap = story ? 56 : 36, y = hlBottom + gap;
    var blocks = qsa(".blk");
    blocks.forEach(function (b) { b.style.top = y + "px"; var h = b.getBoundingClientRect().height; y += h + (story ? 34 : 24); });
    var overflow = y - (story ? 34 : 24) - area;
    if (overflow > 0) console.warn("content overflows safe area by", overflow);
    window.__overflow = overflow;

    var card = qs(".kc"), K = card && window.Karne ? Karne.mount(card) : null;
    var slip = qs(".slip"), zero = qs(".zero"), pills = qs(".pills"), cap = qs(".cap");
    function setT(t) {
      if (K) K.setT(t);
      if (slip) { var a = seg(t, 0.1, 0.7); slip.style.opacity = a; slip.style.transform = "translateY(" + (1 - a) * 28 + "px)"; }
      if (zero) { var z = seg(t, 0.1, 0.7); zero.style.opacity = z; zero.style.transform = "translateY(" + (1 - z) * 28 + "px)"; }
      if (pills) qsa(".pills span").forEach(function (s, i) { var p = seg(t, 1.0 + i * 0.35, 1.5 + i * 0.35); s.style.opacity = p; s.style.transform = "translateX(" + (1 - p) * -30 + "px)"; });
      if (cap) { var c = seg(t, 5.7, 6.2); cap.style.opacity = c; }
    }
    window.__setT = setT; window.__still = 6.4; setT(6.4);
    window.__ready = true;
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { return Promise.all(["800 100px Fraunces", "700 italic 100px Fraunces", "700 20px Karla"].map(function (f) { return document.fonts.load(f, "İşğÇÖÜı₺0123456789"); })); }).then(init);
})();
