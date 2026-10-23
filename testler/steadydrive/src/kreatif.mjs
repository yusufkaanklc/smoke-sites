// Steady Drive v2 ad creatives (pre-registration campaign): node kreatif.mjs [hook-id]
// Same hook headline, road scene + real app screen, palette and fonts as the v2 page, so the ad and the first screen match.
// Writes ../kreatifler/<hook>-v2-4x5.png (1080x1350, feed) and <hook>-v2-9x16.png (1080x1920, stories/Reels; content kept
// inside the safe area: top ~280 px and bottom ~350 px left empty). Rendered with local Chrome/Edge (headless), no npm deps.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { HOOKS, TR } from "./copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "..", "kreatifler");
const hazir = path.resolve(here, "..", "hazir");
const Scene = createRequire(import.meta.url)("./scene.js");
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("Chrome ya da Edge bulunamadı");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const dataUri = (f) => "data:image/png;base64," + fs.readFileSync(path.join(hazir, f)).toString("base64");
// page.css starts with the @font-face rules; point them at the woff2 files on disk.
const fontCss = fs.readFileSync(path.join(here, "page.css"), "utf8").split("\n").filter((l) => l.startsWith("@font-face"))
  .map((l) => l.replace(/url\(fonts\//g, "url(" + pathToFileURL(path.join(here, "fonts")).href + "/")).join("\n");
const MARK = '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#0B5AA8"/><path d="M12.5 8h7l6 18h-4l-1-3.4h-9l-1 3.4h-4z" fill="#fff"/><path d="M16 12v3M16 18.5v3" stroke="#F2B300" stroke-width="2.4" stroke-linecap="round"/></svg>';
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 10.5l3.6 3.6 7.4-8"/></svg>';
// Real app screens at full resolution for the phone in the scene corner.
const SCREEN = { "ekran-uyari-k.webp": "surus-ekrani-uyari.png", "ekran-k.webp": "surus-ekrani.png" };

const AD = {
  sub: TR.hero.subtitle,
  chip: "YAKINDA · ANDROID", // written in caps: CSS uppercase would turn "Android" into "ANDROİD" under lang=tr
  kick: "Ön kayıt açık",
  promise: ["Play Store'a çıkınca ilk sen haber al", "Kapalı teste davet edil"], // the page's promise, in the ad's imperative
  cta: "Erken erişim",
};

function html(hook, [w, h], safeTop, safeBottom) {
  const scene = `<svg viewBox="0 40 800 470" xmlns="http://www.w3.org/2000/svg">${Scene.withScreen(hook.t, dataUri(SCREEN[hook.screen]))}</svg>`;
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;background:#262B30;overflow:hidden}
body{font-family:"Inter",sans-serif;color:#F0F2F4;-webkit-font-smoothing:antialiased}
.c{position:absolute;left:60px;right:60px;top:${safeTop || 56}px;bottom:${safeBottom || 56}px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:18px;font:800 46px/1 "Barlow Semi Condensed"}
.logo svg{width:72px;height:72px}
.chip{border:3px solid #F2B300;color:#F2B300;border-radius:999px;padding:12px 24px;font:800 30px/1 "Barlow Semi Condensed";letter-spacing:.04em}
h1{font:800 104px/1.04 "Barlow Semi Condensed";letter-spacing:-.005em;margin:44px 0 18px;padding-block:.04em}
h1 em{font-style:normal;color:#F2B300}
h1.br em{display:block}
.sub{font-size:35px;line-height:1.38;color:#A9B2BA;max-width:930px}
.scene{margin-top:auto;flex:none;border-radius:26px;overflow:hidden;border:8px solid #15181B;background:#15181B;box-shadow:0 24px 50px rgba(0,0,0,.4)}
.scene svg{display:block;width:100%;height:auto}
.band{margin-top:30px;display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F2B300;color:#262B30;border-radius:24px;padding:26px 28px 26px 34px}
.band b{display:block;font:800 30px/1 "Barlow Semi Condensed";letter-spacing:.05em;text-transform:uppercase;margin-bottom:12px}
.band ul{list-style:none;display:grid;gap:6px}
.band li{display:flex;align-items:center;gap:12px;font:700 29px/1.2 "Inter"}
.band li svg{width:28px;height:28px;flex:none}
.btn{flex:none;background:#262B30;color:#F0F2F4;border-radius:999px;padding:24px 34px;font:800 38px/1 "Barlow Semi Condensed";white-space:nowrap}
</style></head><body><div class="c">
<div class="top"><div class="logo">${MARK}<span>Steady Drive</span></div><span class="chip">${esc(AD.chip)}</span></div>
<h1${hook.h1[2] ? "" : ' class="br"'}>${esc(hook.h1[0])}<em>${esc(hook.h1[1])}</em>${esc(hook.h1[2])}</h1>
<p class="sub">${esc(AD.sub)}</p>
<div class="scene">${scene}</div>
<div class="band"><div><b>${esc(AD.kick)}</b><ul>${AD.promise.map((p) => `<li>${CHECK}${esc(p)}</li>`).join("")}</ul></div><span class="btn">${esc(AD.cta)} →</span></div>
</div></body></html>`;
}

const FORMATS = { "4x5": { size: [1080, 1350], safe: [0, 0] }, "9x16": { size: [1080, 1920], safe: [280, 350] } };
const only = process.argv[2];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sd-kreatif-"));
for (const hook of HOOKS.filter((x) => !only || x.id === only)) {
  for (const [fmt, f] of Object.entries(FORMATS)) {
    const file = path.join(tmp, `${hook.id}-${fmt}.html`);
    fs.writeFileSync(file, html(hook, f.size, f.safe[0], f.safe[1]));
    const png = path.join(outDir, `${hook.id}-v2-${fmt}.png`);
    execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=4000",
      `--window-size=${f.size[0]},${f.size[1]}`, `--screenshot=${png}`, pathToFileURL(file).href], { stdio: "ignore" });
    console.log("wrote", path.relative(path.resolve(here, ".."), png));
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
