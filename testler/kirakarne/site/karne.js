/* Kirakarne stamp engine: a rent record fills up as landlord confirmations are stamped on, month by month.
   Pure function of time. Karne.mount(root, {onCount}) -> {setT(t)}; Karne.run(root) plays it in a loop.
   The static HTML is the final state (all 12 stamped), so the page reads fully without JavaScript. */
(function () {
  var clamp = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var seg = function (t, a, b) { return ease(clamp((t - a) / (b - a))); };
  var LOOP = 9.4, FIRST = 0.7, STEP = 0.36, DUR = 0.2, SHARE_AT = 5.7, FADE_AT = 8.7;

  function mount(root, o) {
    o = o || {};
    var cells = [].slice.call(root.querySelectorAll(".cell"));
    var stamps = cells.map(function (c) { return c.querySelector(".stamp"); });
    var share = root.querySelector(".kc-share"), bar = root.querySelector(".kc-bar u"), num = root.querySelector("[data-count]");
    function setT(t) {
      t = ((t % LOOP) + LOOP) % LOOP;
      var f = 1 - seg(t, FADE_AT, LOOP - 0.2), n = 0;
      cells.forEach(function (c, i) {
        var p = clamp((t - (FIRST + i * STEP)) / DUR), e = ease(p);
        var s = stamps[i];
        s.style.opacity = p > 0 ? Math.min(1, p * 3) * f : 0;
        s.style.transform = "translate(-50%,-50%) rotate(" + (-8 + (1 - e) * 12) + "deg) scale(" + (1 + (1 - e) * 0.9) + ")";
        c.style.setProperty("--k", (p >= 1 ? 1 : p) * f);
        if (p >= 1 && f > 0.5) n++;
      });
      if (share) { var k = seg(t, SHARE_AT, SHARE_AT + 0.45) * f; share.style.opacity = k; share.style.transform = "translateY(" + (1 - k) * 10 + "px)"; }
      if (num) num.textContent = n;
      if (bar) bar.style.width = (n / cells.length * 100) + "%";
      if (o.onCount) o.onCount(n, t);
    }
    return { setT: setT, loop: LOOP };
  }
  function run(root, o) {
    var f = mount(root, o), start = null;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { f.setT(7.6); return f; }
    function tick(ts) { if (start === null) start = ts; f.setT((ts - start) / 1000); requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
    return f;
  }
  window.Karne = { mount: mount, run: run, LOOP: LOOP };
})();
