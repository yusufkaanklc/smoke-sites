/* Kirakarne page script: karne stamp loop, reveal-on-scroll, rent-increase calculator, sticky CTA.
   Progressive enhancement: the page reads fully without it. */
(function () {
  "use strict";
  var doc = document;
  var qs = function (s, el) { return (el || doc).querySelector(s); };
  var qsa = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };

  var kc = qs(".hero .kc");
  if (kc && window.Karne) Karne.run(kc);

  var items = qsa(".rv");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });

  /* rent-increase calculator */
  var calc = qs(".calc");
  if (calc) {
    var rent = qs("[name=rent]", calc), rate = qs("[name=rate]", calc), lang = doc.documentElement.lang;
    var nf = new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US", { maximumFractionDigits: 0 });
    var sym = lang === "tr" ? "₺" : "$";
    var fmt = function (n) { return lang === "tr" ? nf.format(n) + " " + sym : sym + nf.format(n); };
    var set = function (k, v) { var el = qs("[data-out=" + k + "]", calc); if (el) el.textContent = v; };
    var upd = function () {
      var r = parseFloat(String(rent.value).replace(",", ".")), p = parseFloat(String(rate.value).replace(",", "."));
      if (!isFinite(r) || !isFinite(p) || r < 0 || p < 0) { set("next", "-"); set("month", "-"); set("year", "-"); return; }
      var next = r * (1 + p / 100);
      set("next", fmt(next)); set("month", fmt(next - r)); set("year", fmt((next - r) * 12));
    };
    rent.addEventListener("input", upd); rate.addEventListener("input", upd); upd();
  }

  /* sticky CTA (phones): appears once the hero button has scrolled away */
  var sticky = qs(".sticky"), heroCta = qs(".hero .lead-inline"), closing = qs(".close");
  if (sticky && heroCta && "IntersectionObserver" in window) {
    var past = false, atEnd = false;
    var sync = function () { sticky.classList.toggle("on", past && !atEnd); };
    new IntersectionObserver(function (es) { past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; sync(); }).observe(heroCta);
    if (closing) new IntersectionObserver(function (es) { atEnd = es[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(closing);
  }
})();
