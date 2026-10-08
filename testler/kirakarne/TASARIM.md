# Kirakarne: tasarım özeti (08.10.2026)

Yusuf'un kuralları: sayfa ve kreatifler şablondan değil, uygulamaya göre baştan tasarlanır; testler yalnızca Türkçedir (EN site/reklam yok).

## Görsel metafor: defter kartı + onay mührü
Kirakarne bir **kira karnesi**: 12 aylık ızgara, her hücreye ev sahibi onaylayınca "ONAY" mührü basılır. Tüm sayfa ve reklamlar bu tek nesne etrafında kurulur
(`src/karne.js`, `Karne.mount(el) → {setT(t)}`, 9,4 sn döngü, deterministik). Mühür sırayla basılır, sayaç 0 → 12 ve ilerleme çubuğu birlikte dolar.
Sayfada ve reklamlarda aynı motor çalışır.

## Palet
| Rol | Renk |
|---|---|
| Kâğıt (zemin) | `#F2EDE0` (ikinci kâğıt `#E8E1CF`, kart `#FBF8F0`) |
| Mürekkep | `#17150F` |
| Tek vurgu: onay yeşili | `#1F6B4F` (koyu üstünde `#8FD0B3`) |
| Nötr | `#6C6653`, çizgi `#CFC6AE` |

Gradyan, blob, dekoratif daire yok. Kartın gölgesi düz, sert (8px siyah).

## Tipografi
Başlıklar **Fraunces 800/700 italik** (vurgulu ifade yeşil italik), gövde **Karla 400/700**; fontlar `fonts/` içinde (latin + latin-ext). `lang="tr"`.
₺ fontta küçük kaldığı için çizilmiş SVG simgeyle yazılır; ✓ işareti de çizgiyle çizilir.

## Sayfa akışı
1. Hero: "Kirayı düzenli ödediğini ev sahibi onayıyla göster" + canlı karne.
2. Nasıl çalışır: dekont/giriş → WhatsApp + kod ile ev sahibi onayı → karne.
3. "Karne kiracıya aittir": yapmaz / yapar listesi (ödeme almaz, kredi notu üretmez, hukuki belge değildir).
4. Kira artış hesaplayıcı (yalnızca bilgilendirme, hukuki tavsiye değil).
5. Sorular (dürüst cevaplar; "yeni ev sahibi güvenir mi?" → henüz bilmiyoruz), kapanış CTA, mobilde yapışkan CTA.
Ücret sunulmaz: ilk sürüm ücretsiz olacak; kayıt formu yalnızca e-posta toplar.

## Reklamlar (story 1080×1920 PNG+MP4, square 1080×1080 PNG)
| id | Açı | Başlık |
|---|---|---|
| sorun | Somut an | Yeni ev sahibi 3 kira depozito istiyor (3 × ₺22.500 = ₺67.500 fişi + karne) |
| sonuc | Sonuç | 12 ay, 12 onay, tek karne |
| fiyat | Ücret | Kira karnesi ücretsiz (₺0 bloğu + üç özellik) |

Story'de içerik y=1440 üstünde kalır. Her reklamda "Yakında · Kirakarne" etiketi; sahte sayı/yorum/aciliyet yok. Demo karne verisi (A. Yılmaz, ₺22.500) örnektir.
