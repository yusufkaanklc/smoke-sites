# Steady Drive: tasarım özeti (19.10.2026)

Yusuf'un kendi uygulaması; reklam kreatifleri hazır geldi (`HAZIR_KREATIFLER.md`, `kreatifler/`). Sayfa aynı görsel dille, baştan yazıldı.

## Görsel metafor: yol levhası + sürücü gözünden yol
Sayfa bir **yol levhası sistemi** gibi kurulur: asfalt zemin, beyaz iç çerçeveli mavi bilgi levhaları, reflektif sarı vurgu, yol şeridi kesikleri.
Uygulamanın özü "telefonun yolda gördüğünü işaretlemesi" olduğu için imza görsel, sürücü gözünden bir yol sahnesidir: önde bir araç, sağda yaya ve hız sınırı levhası,
her birinin çevresinde sarı algılama kutusu; takip mesafesi kısaldığında kırmızı sesli uyarı şeridi ("Dikkat, öndeki araç!") çıkar, sonra yaya için ikinci uyarı gelir.

## Palet (hazır kreatiflerle aynı; 3 renk + nötr)
| Rol | Renk |
|---|---|
| Asfalt (zemin, ana yüzeyler) | `#262B30` |
| Levha mavisi (bilgi: puan, sesli cümle) | `#0B5AA8` |
| Reflektif sarı (CTA, vurgu, şerit, algılama kutusu) | `#F2B300` |
| Beton (açık zemin) | `#E8EBEE` |
| İşaret kırmızısı (yalnız kritik uyarı) | `#C8102E` |

Gradyan, blob, dekoratif daire yok. Kırmızı yalnızca uyarı anında ve hız sınırı levhasında.

## Tipografi
Başlıklar **Barlow Semi Condensed 800** (sıkı, levha gibi), gövde **Inter** 400/600/700. İkisi de OFL, woff2 olarak `fonts/` altında (latin + latin-ext; İ/ı/ş/ğ için).
`lang="tr"` büyük harf için şart. Başlıklara satır yüksekliği ≥ 1.05 verilir (aksan/kuyruk kesilmesin). ₺ simgesi çizim (SVG) olarak yazılır.

## Sayfa akışı
1. **Asfalt hero:** tek fikir ("Telefonun, yanındaki sakin sürüş koçu olsun."), satır içi e-posta formu, sağda yol sahnesi (imza görsel).
2. **Şerit kesiği ayracı** (sarı), **Nasıl çalışır:** tak, izler, karne; her adım gerçek uygulama ekranıyla.
3. **Ne zaman konuşur** (asfalt): uygulamadaki 5 gerçek cümle mavi levha olarak, yanında neyi izlediği.
4. **Karne** (beton): gerçek karne ekranı + sürüş sonrası neler var.
5. **Kimin için:** yeni sürücü, aday sürücü, ebeveyn (karne sürücünün isteğiyle paylaşılır).
6. **Bilmen gerekenler:** sınırlar (yardımcıdır, gece/kötü hava, hız sınırı her yolda yok) ve gizlilik (hesap yok, görüntü telefondan çıkmaz).
7. **Planlanan fiyatlar:** Ücretsiz / Aylık / Aday Sürücü Paketi; "planlanan fiyat" etiketi.
8. SSS, sarı kapanış bandı, mobilde yapışkan CTA.

## İmza etkileşim
Yol sahnesi 8 sn'lik döngü, zamanın saf fonksiyonu (`DriveScene.markup(t)`): şerit kesikleri akar, takip mesafesi 2,4 sn → 0,85 sn → 2,2 sn,
kutuya bağlı etiket ("Öndeki araç · 0,9 sn") güncellenir, uyarı şeridi yalnızca mesafe kısayken görünür. Hareket azaltma açıksa ya da JS yoksa işaretli kare (t = 3,6) sayfaya gömülü gelir.

## Ölçüm sözleşmesi
`core.js` (Kirakarne/Gard ile aynı, değişmedi). `data-cta` = header | hero | plan-ucretsiz | plan-aylik | plan-aday | bottom | sticky; plan butonları `data-plan` (`ucretsiz`, `aylik`, `aday`).
`<dialog id="early">`, hero'da `form.lead-form[data-origin="inline"]`, WhatsApp bağlantısı (`data-wa`), `kvkk.html`, `robots.txt`, `favicon.svg`, `durum.json`.

## Üretim
`node src/build.mjs` → `site/`. Görseller `src/img` (hazir/ ekranlarından küçültülmüş WebP).
