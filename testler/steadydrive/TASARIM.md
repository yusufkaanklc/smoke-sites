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

## v2: ön kayıt sayfası (23.10.2026, SMK-1)
Smoke test "geçerli" kapandı; sahte kapı yerine gerçek ön kayıt kampanyası. Veri: trafiğin %98'i mobil, oturumların %4'ü sayfanın yarısına iniyor, CTA'nın çoğu hero formundan. Karar: **her şey ilk ekranda**, gerisi kısa.

- **İlk ekran (390×844):** başlık → yol sahnesi + gerçek uygulama ekranı → "Ön kayıt olana" sözü → tek satır e-posta + "Ön kayıt ol" → onay → WhatsApp. Ölçüm: buton altı ≈ 603 px, onay kutusu ≈ 650 px (v1'de ürün görseli ilk ekranda yoktu).
- **Başlık = reklam kancası:** `copy.mjs` → `HOOKS`. `<head>`teki küçük betik `utm_content` önekine (yoksa oturumdaki `smk_utm`) bakıp ilk boyamadan önce `data-hook` koyar; başlık ve sahne o kancanınki olur (kayma yok). Varsayılan `usta`. Yeni kanca eklemek = `HOOKS`'a bir satır.
- **Söz:** "Play Store'a çıktığında ilk sen haber alırsın" + "Yayından önce kapalı teste davet edilirsin". Fiyat/indirim sözü yok; planlanan fiyat bölümü kaldırıldı (plan tıklaması 0'dı). Ücret yalnızca SSS'de bilinen gerçekle: ilk 3 sürüş ücretsiz, ücretli planların fiyatı belli değil.
- **Kapalı test = Gmail:** Play kapalı testi Google hesabına davetle çalışır; yer tutucu "E-posta (tercihen Gmail)", pencerede ve "Ön kayıttan sonra" bölümünde nedeni yazılı.
- **KVKK:** onay metni ve aydınlatma metni "çıkış haberi **ve kapalı test daveti**" amacını ve Play Console test listesine aktarımı söyler (`copy.mjs` → `legal`, "Sürüm: v2"). Kirakarne metnine dokunulmadı. Yusuf 23.10.2026 19:49'da onayladı (fiyat bölümünün kaldırılmasıyla birlikte).
- **Sayfa akışı:** hero → Ön kayıttan sonra (davet, çıkış haberi, başka e-posta yok) → Nasıl çalışır (2 ekran + 5 gerçek cümle + karne) → Bilmen gerekenler (sınırlar + gizlilik, aynen) → SSS (5) → sarı kapanış → yapışkan CTA. Mobil boy 10.250 px → ≈ 5.250 px. "Kimin için" ve fiyat bölümleri çıktı.
- **Hafiflik:** sahne artık tarayıcıda çalışmıyor (v1'de her karede `innerHTML` yazan 8 sn döngü vardı; GSAP zaten yoktu). İki statik kare build'de SVG olarak gömülü; `scene.js` yalnızca build ve kreatif üretiminde kullanılır. CSS satır içi; reveal animasyonu kaldırıldı; Inter 600 düşürüldü (2 font dosyası daha az). Lighthouse mobil (yerel, sıkıştırmasız sunucu): Performance 95 (v1: 90), Accessibility 100, CLS 0, LCP 2,6 sn.
- **Ses şeridi rengi:** kırmızı yalnızca kritik uyarıda ("Dikkat, öndeki araç!"); "Dikkat, yaya" levha mavisinde (reklamlarla aynı).
- **Ölçüm sözleşmesi değişmedi:** `core.js` aynı. `data-cta` = header | bottom | sticky; hero formu `form_focus` + `cta_click(hero-form)`, WhatsApp `cta_click(whatsapp-hero|whatsapp-modal)`. Plan butonları (ve `plan_click`) artık yok.

### v2 kreatifler
`node src/kreatif.mjs` → `kreatifler/usta-v2-*.png`, `yeni-ehliyet-v2-*.png` (4:5 1080×1350, 9:16 1080×1920; 9:16'da üst 280 / alt 350 px boş). Sayfayla aynı başlık, aynı sahne + gerçek ekran (`hazir/`), alt sarı bant: "Ön kayıt açık · Play Store'a çıkınca ilk sen haber al · Kapalı teste davet edil", düğme "Erken erişim →", sağ üstte "YAKINDA · ANDROID". Reklam bağlantısı `utm_content=usta-v2` / `yeni-ehliyet-v2` olmalı (sayfa önekle eşleştirir).

### Üretim notu
`src/package.json` (`"type": "commonjs"`) şart: üst klasördeki `type: module`, `scene.js`'i ESM yapıp build'i bozuyordu.

## v3: Meta pikseli + çerez onay şeridi (23.10.2026, SMK-2)
Ön kayıt kampanyası Meta'da LANDING_PAGE_VIEWS ile optimize ediyordu; kayıt başı maliyeti Meta'da görmek için piksel (1663309671877482) eklendi. Kampanya ayarı bu işin kapsamında değil.

- **Onaydan önce Meta'ya hiçbir istek yok.** `<head>`teki küçük betik `localStorage.smk_consent` boşsa ilk boyamadan önce `data-cc="ask"` koyar, şerit görünür. `fbevents.js` (async) ancak "Kabul et"ten sonra, ya da daha önce kabul etmiş biri geri geldiğinde indirilir. JS yoksa şerit de piksel de yok.
- **Şerit:** altta, beyaz, mavi üst çizgi; "Reddet" / "Kabul et" aynı stil ve boyutta (sarı kullanılmadı, CTA'yla yarışmasın). 390×844'te şerit 735 px'ten başlıyor (2 satır metin, 109 px); başlık, e-posta alanı, buton (603 px) ve onay kutusu (650 px) açıkta. 360 px'te metin 3 satır (128 px). Yapışkan CTA şeridin üstüne oturur (`--cc-h`).
- **Piksel olayları:** `PageView` (yüklenince), `Lead` (`/api/lead` 200 döndükten sonra, `showDone` ile aynı yerde), `Contact` (WhatsApp tıklaması). Seçim yapılmadan olan Lead/Contact bellekte bekler; "Kabul"de gönderilir, "Reddet"te atılır.
- **Kişisel veri yok:** piksele yalnızca olay adı gider. `fbq('set','autoConfig',false,id)` ile otomatik olaylar kapalı, gelişmiş eşleştirme kullanılmıyor. Testte `/tr` isteklerinde e-posta ya da `ud[...]` yoktu. Events Manager'da "otomatik gelişmiş eşleştirme" kapalı tutulmalı.
- **Rızayı geri alma:** altbilgideki "Çerez tercihi" şeridi yeniden açar. "Reddet" → `fbq('consent','revoke')`, `_fbp` / `_fbc` çerezleri silinir, o andan sonra piksel bir şey göndermez.
- **Ölçüm sözleşmesine eklenen:** `consent_accept`, `consent_reject` (yalnızca düğmeye basılınca; yenilemede tekrar sayılmaz). Sunucu `api.py` `EVENTS` listesinde bu iki olay olmadan 400 döner (smoke-control PR'ıyla eklendi; o PR önce birleşmeli). Diğer olaylar değişmedi.
- **Ölçüm (yerel, sıkıştırmasız sunucu, Lighthouse 12 mobil):** Performance 94-95, Accessibility 100, CLS ≈ 0,02 (main'de de aynı, font değişimi). LCP öğesi başlık; şerit değil.
- **KVKK v3:** `copy.mjs` → `cookies` (`kvkk.html#cerez`): ne toplanır, amaç (ölçüm + reklam gösterimi), Meta Platforms Ireland'a ve ABD'ye aktarım, rızanın "Çerez tercihi"nden geri alınması. "Bunun dışında üçüncü kişilerle paylaşılmaz" cümlesi piksel istisnasıyla güncellendi. Onay metni ve şerit metni: Yusuf, 23.10.2026 22:25 (#ai-studio, "İki işe de onay veriyorum").

### v3.1: kısa görünür alan (23.10.2026, SMK-3)
Instagram/Facebook uygulama içi tarayıcısında 390×844 bir telefonda görünür alan ≈ 390×670-750; şerit açıkken buton ve onay kutusu şeridin altında kalıyordu.
- **Kural:** `@media (max-width:899px) and (max-height:799px)` (`page.css`, şerit bloğunun altında). 800 px ve daha uzun ekranlar ile masaüstü değişmedi (390×844, 360×800 ölçüleri birebir aynı).
- **Ne sıkıştı:** sahne yalnızca gökyüzünden kırpılıyor (`.scene svg{margin-top:-7.5%}`, "Sınır 50" ve "Yaya" etiketlerinin üstü; uyarı şeridi ve gerçek ekran yerinde), "Ön kayıt olana" başlığı gizli (iki madde duruyor), başlık 30 px, alt metin ve maddeler 14 px, boşluklar 8 px; şeritte iç boşluk 8 px, düğmeler 40 px (ikisi hâlâ aynı stil ve boyutta). Metinlere dokunulmadı.
- **Ölçüm (şerit açık, fontlar yüklü, iki kanca):** 390×700 kutu altı 548 / şerit 600; 375×667 558 / 567; 360×680 550 / 562; 390×750 548 / 650. 320×568'de form hâlâ şeridin altında (kapsam dışı).
