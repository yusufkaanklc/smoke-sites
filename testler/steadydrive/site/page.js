/* Steady Drive page script: road scene loop, reveal-on-scroll, sticky CTA.
   Progressive enhancement: the page reads fully without it. */
(function () {
  "use strict";
  var doc = document;
  var qs = function (s, el) { return (el || doc).querySelector(s); };
  var qsa = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };

  var svg = qs("#scene");
  if (svg && window.DriveScene) DriveScene.mount(svg);

  var items = qsa(".rv");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });

  /* sticky CTA (phones): appears once the hero form has scrolled away, hides at the closing band */
  var sticky = qs(".sticky"), heroForm = qs(".hero .lead-inline"), closing = qs(".close");
  if (sticky && heroForm && "IntersectionObserver" in window) {
    var past = false, atEnd = false;
    var sync = function () { sticky.classList.toggle("on", past && !atEnd); };
    new IntersectionObserver(function (es) { past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; sync(); }).observe(heroForm);
    if (closing) new IntersectionObserver(function (es) { atEnd = es[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(closing);
  }
})();
