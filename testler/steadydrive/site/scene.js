/* Steady Drive signature scene: driver's-eye road. Pure function of time: DriveScene.markup(t) returns SVG inner markup.
   Browser: DriveScene.mount(svg) plays the 8 s loop. Node (build): require() for the static frame. */
(function (root) {
  "use strict";
  var T = 8, STATIC_T = 3.6, HZ = 215;
  var C = { asf: "#262B30", road: "#3B424A", mavi: "#0B5AA8", sari: "#F2B300", bet: "#E8EBEE", kir: "#C8102E", sky: "#AFD2EE", car: "#35506E" };
  var FONT = "'Barlow Semi Condensed','Arial Narrow',sans-serif";

  var gapKeys = [[0, 2.4], [1.5, 2.4], [3.3, 0.85], [4.4, 0.85], [6.6, 2.2], [7.4, 2.2], [8, 2.4]];
  function ss(x) { return x * x * (3 - 2 * x); }
  function gap(t) {
    for (var i = 1; i < gapKeys.length; i++) {
      if (t <= gapKeys[i][0]) {
        var a = gapKeys[i - 1], b = gapKeys[i];
        return a[1] + (b[1] - a[1]) * ss((t - a[0]) / (b[0] - a[0]));
      }
    }
    return gapKeys[gapKeys.length - 1][1];
  }
  var fmt = function (n) { return n.toFixed(1).replace(".", ","); };
  var fade = function (t, a, b, f) { return Math.max(0, Math.min(1, Math.min((t - a) / f, (b - t) / f))); };

  function label(x, y, text, w) {
    return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><rect x="' + (-w / 2).toFixed(1) + '" y="-30" width="' + w.toFixed(1) +
      '" height="30" rx="6" fill="' + C.sari + '"/><text x="0" y="-9" text-anchor="middle" font-family="' + FONT + '" font-weight="700" font-size="20" fill="' + C.asf + '">' + text + '</text></g>';
  }
  function box(x, y, w, h) {
    return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="6" fill="none" stroke="' + C.sari + '" stroke-width="4"/>';
  }
  function voice(text, op) {
    return '<g opacity="' + op.toFixed(2) + '"><rect x="30" y="398" width="' + (text.length * 12.5 + 78).toFixed(0) + '" height="56" rx="12" fill="' + C.kir + '" stroke="#fff" stroke-width="3"/>' +
      '<path d="M54 426v-6h8l9-8v22l-9-8z" fill="#fff"/><path d="M78 417q6 9 0 18" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="94" y="434" font-family="' + FONT + '" font-weight="800" font-size="27" fill="#fff">' + text + '</text></g>';
  }

  function markup(t) {
    t = ((t % T) + T) % T;
    var g = gap(t), o = [];
    // sky, distant buildings, ground
    o.push('<rect width="800" height="' + HZ + '" fill="' + C.sky + '"/>');
    o.push('<ellipse cx="170" cy="70" rx="90" ry="17" fill="#fff" opacity=".7"/><ellipse cx="610" cy="48" rx="110" ry="18" fill="#fff" opacity=".7"/>');
    var bl = [[0, 70, 110], [120, 100, 80], [250, 60, 60], [492, 70, 70], [575, 110, 100], [690, 80, 130]];
    bl.forEach(function (b, i) { o.push('<rect x="' + b[0] + '" y="' + (HZ - b[2]) + '" width="' + b[1] + '" height="' + b[2] + '" fill="' + (i % 2 ? "#CDB8A0" : "#EADFCF") + '"/>'); });
    o.push('<rect y="' + HZ + '" width="800" height="285" fill="#C3C8CD"/>');
    // road
    o.push('<polygon points="388,' + HZ + ' 412,' + HZ + ' 900,500 -100,500" fill="' + C.road + '"/>');
    o.push('<polygon points="388,' + HZ + ' 392,' + HZ + ' -100,500 -112,500" fill="#fff" opacity=".85"/><polygon points="412,' + HZ + ' 408,' + HZ + ' 900,500 912,500" fill="#fff" opacity=".85"/>');
    // lane dashes, scrolling with time
    var ph = (t * 0.9) % 1;
    for (var i = 0; i < 6; i++) {
      var a = (i + ph) / 6, b = (i + ph + 0.45) / 6;
      var ya = HZ + 285 * a * a, yb = HZ + 285 * Math.min(1, b) * Math.min(1, b);
      if (ya >= 500) continue;
      var wa = 1.2 + 11 * a * a, wb = 1.2 + 11 * Math.min(1, b) * Math.min(1, b);
      o.push('<polygon points="' + (400 - wa / 2).toFixed(1) + "," + ya.toFixed(1) + " " + (400 + wa / 2).toFixed(1) + "," + ya.toFixed(1) + " " + (400 + wb / 2).toFixed(1) + "," + yb.toFixed(1) + " " + (400 - wb / 2).toFixed(1) + "," + yb.toFixed(1) + '" fill="' + C.sari + '"/>');
    }
    // speed-limit sign (right)
    o.push('<rect x="708" y="190" width="5" height="100" fill="#8A929A"/><circle cx="710" cy="178" r="22" fill="' + C.kir + '"/><circle cx="710" cy="178" r="15" fill="#fff"/>' +
      '<text x="710" y="184" text-anchor="middle" font-family="' + FONT + '" font-weight="800" font-size="19" fill="' + C.asf + '">50</text>');
    o.push(box(676, 148, 68, 68)); // sign detection box
    o.push(label(710, 148, "Sınır 50", 92));
    // pedestrian on the right curb
    var pOp = fade(t, 4.4, 7.2, 0.5);
    if (pOp > 0) {
      var px = 628, py = 312;
      o.push('<g opacity="' + pOp.toFixed(2) + '"><rect x="' + (px - 5) + '" y="' + (py - 52) + '" width="10" height="52" rx="4" fill="#2B2F36" transform="rotate(' + (6 * Math.sin(t * 5)).toFixed(1) + " " + px + " " + (py - 52) + ')"/>' +
        '<rect x="' + (px - 15) + '" y="' + (py - 100) + '" width="30" height="52" rx="12" fill="#E07B2F"/><circle cx="' + px + '" cy="' + (py - 112) + '" r="12" fill="#8A5A3C"/></g>');
      o.push('<g opacity="' + pOp.toFixed(2) + '">' + box(px - 28, py - 130, 56, 136) + label(px, py - 130, "Yaya", 66) + "</g>");
    }
    // lead car (rear view)
    var cw = 300 / g, ch = cw * 0.46, cy = HZ + 125 / g, cx = 400, x0 = cx - cw / 2, y0 = cy - ch;
    o.push('<ellipse cx="' + cx + '" cy="' + (cy + 2).toFixed(1) + '" rx="' + (cw * 0.55).toFixed(1) + '" ry="' + (cw * 0.05).toFixed(1) + '" fill="#000" opacity=".28"/>');
    o.push('<rect x="' + (x0 + cw * 0.1).toFixed(1) + '" y="' + y0.toFixed(1) + '" width="' + (cw * 0.8).toFixed(1) + '" height="' + (ch * 0.62).toFixed(1) + '" rx="' + (cw * 0.1).toFixed(1) + '" fill="' + C.car + '"/>');
    o.push('<rect x="' + (x0 + cw * 0.17).toFixed(1) + '" y="' + (y0 + ch * 0.06).toFixed(1) + '" width="' + (cw * 0.66).toFixed(1) + '" height="' + (ch * 0.32).toFixed(1) + '" rx="' + (cw * 0.05).toFixed(1) + '" fill="#8FA6BC"/>');
    o.push('<rect x="' + x0.toFixed(1) + '" y="' + (y0 + ch * 0.36).toFixed(1) + '" width="' + cw.toFixed(1) + '" height="' + (ch * 0.5).toFixed(1) + '" rx="' + (cw * 0.06).toFixed(1) + '" fill="' + C.car + '"/>');
    o.push('<rect x="' + (x0 + cw * 0.04).toFixed(1) + '" y="' + (y0 + ch * 0.46).toFixed(1) + '" width="' + (cw * 0.2).toFixed(1) + '" height="' + (ch * 0.13).toFixed(1) + '" rx="3" fill="#E24B4B"/><rect x="' + (x0 + cw * 0.76).toFixed(1) + '" y="' + (y0 + ch * 0.46).toFixed(1) + '" width="' + (cw * 0.2).toFixed(1) + '" height="' + (ch * 0.13).toFixed(1) + '" rx="3" fill="#E24B4B"/>');
    o.push('<rect x="' + (x0 + cw * 0.38).toFixed(1) + '" y="' + (y0 + ch * 0.55).toFixed(1) + '" width="' + (cw * 0.24).toFixed(1) + '" height="' + (ch * 0.1).toFixed(1) + '" rx="2" fill="#F3F4F6"/>');
    o.push('<rect x="' + (x0 + cw * 0.06).toFixed(1) + '" y="' + (y0 + ch * 0.84).toFixed(1) + '" width="' + (cw * 0.18).toFixed(1) + '" height="' + (ch * 0.16).toFixed(1) + '" rx="3" fill="#15181B"/><rect x="' + (x0 + cw * 0.76).toFixed(1) + '" y="' + (y0 + ch * 0.84).toFixed(1) + '" width="' + (cw * 0.18).toFixed(1) + '" height="' + (ch * 0.16).toFixed(1) + '" rx="3" fill="#15181B"/>');
    o.push(box(x0 - 8, y0 - 8, cw + 16, ch + 16));
    var lw = Math.max(150, ("Öndeki araç · " + fmt(g) + " sn").length * 10.4 + 22);
    o.push(label(cx, y0 - 8, "Öndeki araç · " + fmt(g) + " sn", lw));
    // dashboard edge + speed readout
    o.push('<path d="M0 470q400-26 800 0v30H0z" fill="#171B1F"/>');
    o.push('<rect x="620" y="418" width="150" height="66" rx="10" fill="#050608" stroke="#3A4149" stroke-width="2"/><text x="640" y="462" font-family="' + FONT + '" font-weight="800" font-size="40" fill="#F0F2F4">47</text><text x="684" y="462" font-family="' + FONT + '" font-weight="700" font-size="16" fill="#A9B2BA">km/sa</text>');
    // voice strips
    var v1 = g < 1.35 ? Math.min(1, (1.35 - g) / 0.2) : 0;
    var v2 = fade(t, 5.3, 7.0, 0.25);
    if (v1 > 0) o.push(voice("Dikkat, öndeki araç!", v1));
    else if (v2 > 0) o.push(voice("Dikkat, yaya", v2));
    return o.join("");
  }

  function mount(svg) {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    svg.innerHTML = markup(STATIC_T);
    if (reduce) return;
    var t0 = null, vis = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(svg);
    (function frame(ts) {
      if (t0 === null) t0 = ts - STATIC_T * 1000;
      if (vis) svg.innerHTML = markup((ts - t0) / 1000);
      requestAnimationFrame(frame);
    })(performance.now());
  }

  var api = { markup: markup, mount: mount, T: T, STATIC_T: STATIC_T, setT: function (svg, t) { svg.innerHTML = markup(t); } };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.DriveScene = api;
})(typeof window !== "undefined" ? window : globalThis);
