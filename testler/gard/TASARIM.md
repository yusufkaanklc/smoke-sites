# Gard: tasarım özeti (04.10.2026)

Yusuf'un talebi: sayfa ve kreatifler şablondan değil, uygulamaya göre baştan tasarlanır. Bu özet Gard'ın (TR) ve Guard'ın (EN) ortak tasarım dilidir.

## Görsel metafor: kamera vizörü + boksörün yandan pozu
Gard telefon kamerasıyla çalışan bir uygulama; bu yüzden her şey bir **vizörün içinde** olur: köşe işaretleri, REC noktası, üçte bir ızgarası.
İçindeki tek karakter, yandan görünen bir **poz iskeleti** (eklem noktalı çubuk figür). Arka el jab sırasında çene hattının altına iner;
ekranda kesikli **GARD HATTI** çizgisi kırmızıya döner, "ARKA EL −14 cm / Eli çeneye çek" işareti çıkar, el çeneye dönünce "GARD ✓" olur ve puan 72 → 91 gider.
Aynı figür sayfada ve reklamlarda aynı motorla (`src/figure.js`, `GardFig.mount(svg,{labels,onScore}) → {setT(t)}`, 6,4 sn döngü, deterministik) çalışır.

## Palet (tek bilinçli palet)
| Rol | Renk |
|---|---|
| Mürekkep siyahı (zemin) | `#0D0D0B` (panel `#171714`) |
| Kemik (metin, açık bölümler) | `#ECE6D8` (kağıt `#F5F0E3`) |
| Tek vurgu: sinyal kırmızısı | `#FF3D1E` |
| Nötr gri | `#8F8B80` (koyu üstünde), `#5A564C` (açık üstünde) |

Kırmızı yalnızca "dikkat/düzelt" anlarında ve büyük blok olarak (köşe notu bandı, kapanış) kullanılır. Gradyan, blob, dekoratif daire yok.

## Tipografi
Başlıklar **Archivo 900/800**, büyük harf, sıkı satır aralığı (1.02–1.05), küçük etiketler geniş harf aralıklı. Gövde **Figtree** 400/600/700.
Türkçe büyük harf için `lang="tr"` kullanılır (İ/ı doğru dönüşür); aksan/kuyruklar kesilmesin diye başlıklara dikey iç boşluk verilir.
Fontlar `fonts/` içinde (latin + latin-ext woff2). ₺ simgesi Archivo'da küçük kaldığı için sayfada ve kreatiflerde çizilmiş SVG simgesiyle yazılır;
✓ işareti de fontta olmadığı için figürde çizgiyle çizilir.

## Sayfa akışı (şablondan farklı)
1. **Koyu vizör hero:** büyük başlık + vizör (canlı figür, REC süresi, canlı GARD PUANI), kırmızı birincil buton.
2. **Köşe notu bandı** (kırmızı): koç sözü, tek cümle ("Jab atarken arka eli çenede tut.").
3. **01 · Sorun:** tek paragraf, tek başına çalışılan anlar, "olmadan / ile" iki sütun.
4. **02 · Hakem kartı** (açık kemik zemin): GARD 72 · AYAK 85 · ÇENE 64, her satırda kendi çizimi (gard hattı, ayak genişliği, çene açısı), puan çubuğu ve "düzelt/iyi" etiketi; altta "sıradaki düzeltme".
5. **03 · Program:** 4 hafta = 4 raund zili zaman çizelgesi + 3 dk çalışma / 1 dk dinlenme çubuğu.
6. **04 · Köşe:** koç diyaloğu (soru kemik çerçeveli, cevap kırmızı sol bantlı kart).
7. **05 · Tarife** (açık zemin): planlanan fiyatlar, yıllık plan siyah; "planlanan fiyat" etiketi.
8. **06 · Sorular**, ardından dev tek cümlelik **kapanış CTA** (kırmızı zemin) ve mobilde yapışkan CTA çubuğu.

EN sayfa kendi cümleleriyle yazılır ("corner note", "scorecard", "your corner", "tariff" yerine "pricing"); birebir çeviri değildir.

## İmza etkileşim
Vizördeki figür döngüsü: jab → arka el iner → kırmızı halka, çizgi ve "−14 cm" → el çeneye döner → GARD ✓. Skor sayacı figürle birlikte 88 → 72 → 91 gider.
Hareket azaltma tercihi açıksa figür sabit (işaretli kare) durur. JavaScript kapalıyken işaretli kare sayfaya gömülü olarak gelir.

## Kreatifler
Aynı dil: vizör çerçevesi, iskelet, kırmızı işaretler. Her dilde 3 farklı sahne:
- **sorun:** büyük figür, arka elin inmesi + işaret + canlı puan (video işaretli karede başlar ve biter).
- **sonuç:** üç puan çubuğu (GARD 72, AYAK 85, ÇENE 64) ve düzeltme (GARD 72 → 91, "düzeldi").
- **fiyat:** kırmızı fiyat etiketi (planlanan fiyat) + küçük vizör ve üç özellik.
Story'nin alt %25'inde yazı yoktur. Her kare `window.__setT(t)` ile deterministik üretilir (30 fps, 6,4 sn + 1,2 sn bekleme).

## Üretim
`src/copy.mjs` (metinler) → `node src/build.mjs` (iki site), `python3 src/static_fig.py` (JS'siz figür karesi),
`node src/ads/ads.mjs` + `python3 src/ads/render.py <kreatifler/_work>` (PNG + MP4).
