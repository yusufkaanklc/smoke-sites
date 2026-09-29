# smoke-sites

Haftalık "sahte kapı" testlerinin landing page'leri ve reklam kreatifleri. Her test kendi klasöründe:

```
testler/<slug>/
├── content.json    sayfanın ve reklamların kaynağı
├── site/           yayınlanan statik site (https://<slug>.yusufkaanklc.dev)
└── kreatifler/     reklam görselleri (PNG) ve videoları (MP4)
```

Hangi sitenin yayında olduğunu bu repo değil, özel `smoke-control` reposundaki `sites.json` belirler.
Test bittiğinde site yayından kalkar; klasör burada kalır.
