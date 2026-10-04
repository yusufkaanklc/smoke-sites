#!/usr/bin/env python3
"""Pre-render the hero figure (t=2.6 s, the flagged frame) into _fig_<lang>.svg so the page reads without JavaScript."""
import json, os, subprocess
from playwright.sync_api import sync_playwright
here = os.path.dirname(os.path.abspath(__file__))
labels = json.loads(subprocess.check_output(["node", "-e", f"import('{here}/copy.mjs').then(m=>console.log(JSON.stringify({{tr:m.TR.fig,en:m.EN.fig}})))"], text=True))
html = "<!doctype html><meta charset=utf-8><body><svg id=s></svg>"
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.set_content(html)
    pg.add_script_tag(path=os.path.join(here, "figure.js"))
    for lang, L in labels.items():
        inner = pg.evaluate("(L)=>{var s=document.getElementById('s');GardFig.mount(s,{labels:L}).setT(2.6);return s.innerHTML}", L)
        inner = inner.replace('class="gf-ok" ', 'class="gf-ok" ')
        open(os.path.join(here, f"_fig_{lang}.svg"), "w", encoding="utf-8").write(inner)
    b.close()
print("ok")
