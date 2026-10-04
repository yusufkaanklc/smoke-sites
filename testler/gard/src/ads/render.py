#!/usr/bin/env python3
"""Render Gard ad frames: python3 render.py <work-dir> [--no-video]
For every ad-<id>-<format>.html: <id>-<format>.png (still) and, for story, <id>-story.mp4 (30 fps, 6.4 s + 1.2 s hold,
frame by frame via window.__setT). Output goes next to the work dir (its parent)."""
import json, os, shutil, subprocess, sys, tempfile
from concurrent.futures import ProcessPoolExecutor
from playwright.sync_api import sync_playwright

FPS, LEN, HOLD = 30, 6.4, 1.2

def render_one(args):
    work, a, video = args
    out = os.path.dirname(work)
    url = "file://" + os.path.join(work, a["file"])
    msgs = []
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--allow-file-access-from-files"])
        pg = b.new_page(viewport={"width": a["w"], "height": a["h"]}, device_scale_factor=1)
        pg.on("console", lambda m: msgs.append(m.text) if m.type in ("error", "warning") else None)
        pg.on("pageerror", lambda e: msgs.append(str(e)))
        pg.goto(url)
        pg.wait_for_function("window.__ready === true", timeout=20000)
        pg.evaluate("window.__setT(window.__still)")
        pg.wait_for_timeout(150)
        png = os.path.join(out, f"{a['id']}-{a['format']}.png")
        pg.screenshot(path=png)
        if video and a["format"] == "story":
            frames = tempfile.mkdtemp()
            n = int(round((LEN + HOLD) * FPS))
            for i in range(n):
                t = min(i / FPS, LEN)
                pg.evaluate(f"window.__setT({t:.4f})")
                pg.screenshot(path=os.path.join(frames, f"f{i:04d}.png"))
            mp4 = os.path.join(out, f"{a['id']}-story.mp4")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(frames, "f%04d.png"),
                            "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow",
                            "-movflags", "+faststart", "-an", mp4], check=True)
            shutil.rmtree(frames, ignore_errors=True)
        b.close()
    return a["file"], msgs

if __name__ == "__main__":
    work = os.path.abspath(sys.argv[1]); video = "--no-video" not in sys.argv
    ads = json.load(open(os.path.join(work, "ads.json")))
    if "--only" in sys.argv:
        only = sys.argv[sys.argv.index("--only") + 1]
        ads = [a for a in ads if only in a["file"]]
    with ProcessPoolExecutor(max_workers=3) as ex:
        for f, msgs in ex.map(render_one, [(work, a, video) for a in ads]):
            print(f, "OK" if not msgs else msgs)
