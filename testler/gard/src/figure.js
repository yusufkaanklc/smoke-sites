/* Gard figure engine: a boxer in profile, drawn as a pose skeleton with live annotations.
   Deterministic: GardFig.mount(svg, opts) returns {setT(t), loop}. Used by the page hero and the ad frames. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var clamp = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var seg = function (t, a, b) { return ease(clamp((t - a) / (b - a))); };
  var mix = function (a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; };
  var G = { head: [214, 96], neck: [205, 130], shL: [212, 152], shR: [192, 154], hip: [186, 272],
    kF: [236, 352], fF: [272, 442], kR: [158, 356], fR: [116, 442],
    eL: [238, 208], fL: [262, 126], eR: [206, 216], fR2: [232, 140] };
  var LOOP = 6.4;

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function mount(svg, o) {
    o = o || {};
    var L = o.labels || {};
    svg.setAttribute("viewBox", "0 0 400 500");
    svg.innerHTML = "";
    var g = el("g", {}, svg);
    // reference lines
    var chin = el("line", { x1: 20, x2: 380, y1: 128, y2: 128, "stroke-dasharray": "3 6", class: "gf-chin" }, g);
    var chinTxt = el("text", { x: 22, y: 120, class: "gf-tag" }, g); chinTxt.textContent = L.line || "GARD HATTI";
    var floor = el("line", { x1: 20, x2: 380, y1: 452, y2: 452, class: "gf-floor" }, g);
    // limbs
    var rear = el("g", { class: "gf-rear" }, g);
    var front = el("g", { class: "gf-front" }, g);
    function limb(parent, n) { var a = []; for (var i = 0; i < n; i++) a.push(el("line", { class: "gf-bone" }, parent)); return a; }
    var rb = limb(rear, 2);           // rear upper arm, forearm
    var rl = limb(rear, 2);           // rear leg
    var torso = limb(front, 2);       // spine, shoulders
    var fl = limb(front, 2);          // front leg
    var lb = limb(front, 2);          // lead arm
    var head = el("circle", { r: 27, class: "gf-head" }, front);
    var fistL = el("circle", { r: 11, class: "gf-fist" }, front);
    var fistR = el("circle", { r: 11, class: "gf-fist gf-fist--rear" }, rear);
    var ghost = el("circle", { r: 14, cx: G.fR2[0], cy: G.fR2[1], class: "gf-ghost" }, g);
    var ring = el("circle", { r: 22, class: "gf-ring" }, g);
    var lead = el("path", { class: "gf-lead" }, g);
    var flagTxt = el("text", { class: "gf-flag" }, g);
    var flagSub = el("text", { class: "gf-flagsub" }, g);
    var ok = el("text", { class: "gf-ok" }, g);
    function set(a, p, q) { a.setAttribute("x1", p[0]); a.setAttribute("y1", p[1]); a.setAttribute("x2", q[0]); a.setAttribute("y2", q[1]); }

    function setT(t) {
      t = ((t % LOOP) + LOOP) % LOOP;
      var jab = seg(t, 1.0, 1.3) - seg(t, 1.9, 2.4);
      var sag = seg(t, 1.1, 1.6) - seg(t, 4.1, 4.7);
      var flag = seg(t, 1.9, 2.1) - seg(t, 4.0, 4.2);
      var fixed = seg(t, 4.7, 4.9) - seg(t, 6.1, 6.4);
      var br = Math.sin(t * 2.1) * 1.6;
      var eL = mix(G.eL, [292, 172], jab), fL = mix(G.fL, [350, 150], jab);
      var eR = mix(G.eR, [200, 254], sag), fR = mix(G.fR2, [210, 232], sag);
      var off = function (p) { return [p[0], p[1] + br]; };
      var neck = off(G.neck), shL = off(G.shL), shR = off(G.shR), hd = off(G.head);
      set(torso[0], neck, G.hip); set(torso[1], shR, shL);
      set(rb[0], shR, off(eR)); set(rb[1], off(eR), off(fR));
      set(lb[0], shL, off(eL)); set(lb[1], off(eL), off(fL));
      set(fl[0], G.hip, G.kF); set(fl[1], G.kF, G.fF);
      set(rl[0], G.hip, G.kR); set(rl[1], G.kR, G.fR);
      head.setAttribute("cx", hd[0]); head.setAttribute("cy", hd[1]);
      var fl2 = off(fL), fr2 = off(fR);
      fistL.setAttribute("cx", fl2[0]); fistL.setAttribute("cy", fl2[1]);
      fistR.setAttribute("cx", fr2[0]); fistR.setAttribute("cy", fr2[1]);
      chin.setAttribute("class", "gf-chin" + (flag > 0.05 ? " is-hot" : ""));
      ghost.style.opacity = flag * 0.9;
      ring.setAttribute("cx", fr2[0]); ring.setAttribute("cy", fr2[1]); ring.style.opacity = flag;
      ring.setAttribute("r", 20 + (1 - flag) * 14);
      fistR.setAttribute("class", "gf-fist gf-fist--rear" + (flag > 0.5 ? " is-hot" : ""));
      lead.setAttribute("d", "M" + (fr2[0] + 18) + " " + (fr2[1] + 8) + " L 300 262 L 392 262");
      lead.style.opacity = flag;
      flagTxt.setAttribute("x", 300); flagTxt.setAttribute("y", 252); flagTxt.style.opacity = flag; flagTxt.textContent = L.drop || "ARKA EL −14 cm";
      flagSub.setAttribute("x", 300); flagSub.setAttribute("y", 284); flagSub.style.opacity = flag; flagSub.textContent = L.fix || "Eli çeneye çek";
      ok.setAttribute("x", 300); ok.setAttribute("y", 252); ok.style.opacity = fixed; ok.textContent = L.ok || "GARD ✓";
      var score = 88 - 16 * flag + 19 * (seg(t, 4.7, 4.9)) - 19 * seg(t, 6.1, 6.4);
      if (o.onScore) o.onScore(Math.round(score), flag, t);
    }
    return { setT: setT, loop: LOOP };
  }

  function run(svg, o) {
    var f = mount(svg, o), start = null, rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) { f.setT(2.6); return f; }
    function tick(ts) { if (start === null) start = ts; f.setT((ts - start) / 1000); requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
    return f;
  }
  window.GardFig = { mount: mount, run: run, LOOP: LOOP };
})();
