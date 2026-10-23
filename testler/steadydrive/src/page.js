/* Steady Drive page script (v2): sticky CTA on phones. Progressive enhancement: the page reads fully without it.
   v1's road-scene loop and reveal-on-scroll are gone: the hero frame is static SVG rendered at build time. */
(function () {
  "use strict";
  var qs = function (s) { return document.querySelector(s); };

  /* sticky CTA (phones): appears once the hero form has scrolled away, hides at the closing band */
  var sticky = qs(".sticky"), heroForm = qs(".hero .lead-inline"), closing = qs(".close");
  if (sticky && heroForm && "IntersectionObserver" in window) {
    var past = false, atEnd = false;
    var sync = function () { sticky.classList.toggle("on", past && !atEnd); };
    new IntersectionObserver(function (es) { past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; sync(); }).observe(heroForm);
    if (closing) new IntersectionObserver(function (es) { atEnd = es[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(closing);
  }
})();
