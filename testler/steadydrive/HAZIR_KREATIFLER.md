# Steady Drive · hazır kreatifler ve ürün bilgisi (Yusuf, 19.10.2026)

Bu test Yusuf'un kendi geliştirdiği uygulama içindir; fikir seçimi ve kreatif üretimi yapılmaz. Reklam görselleri
`kreatifler/` altında hazırdır (Türkçe). Sayfa ve reklam metni **yalnızca aşağıdaki ürün bilgisine** dayanır; burada
olmayan bir özellik vaat edilmez.

## Ürün (gerçek, çalışan uygulama; henüz mağazada değil)

- **Ad:** Steady Drive. Yeni ve aday sürücüler için sakin bir sürüş koçu. İlk sürüm **Android** (Android 11 ve
  üstü); iPhone sürümü yok. Yayında değil: "yakında / erken erişim".
- **Nasıl çalışır:** Telefon bir tutucuyla ön cama takılır, "Sürüşe başla"ya basılır. Arka kamera ve GPS ile yolu
  izler; yalnızca riskli anda kısa bir ses ya da tek cümleyle konuşur. Uygulamadaki gerçek cümleler: "Dikkat, öndeki
  araç!", "Mesafe kısa", "Dikkat, yaya", "Dikkat, bisikletli", "Sınırın üstündesin".
- **Neyi izler:**
  - Öndeki araçla takip mesafesi (saniye cinsinden) ve çarpışma riski.
  - Yavaş giderken önde yakındaki yaya ve bisikletli.
  - Hız ve hız sınırı (Türkiye'de harita verisi olan yollarda; her yolda sınır bilinmez).
  - Sert fren, sert kalkış/hızlanma ve hızlı viraj (telefonun sensörlerinden).
- **Sürüşten sonra:** 100 üzerinden puanlı karne, olaylar harita üzerinde, bir sonraki sürüş için tek hedef;
  haftalık ilerleme; 2 dakikalık dersler (2 saniye kuralı, yaya önceliği, hız sınırları); aday sürücülük süresinin
  ne kadar kaldığı.
- **Gizlilik:** Hesap gerekmez. Veriler telefonda kalır; görüntü telefondan çıkmaz, sunucuya hiçbir şey gitmez.
  Karne istenirse görsel/PDF olarak paylaşılabilir.
- **Ücret:** İlk 3 sürüş tam koçluk ücretsiz; çarpışma riski uyarısı ücretsiz planda da her zaman açık. Ücretli
  planlar: **Aylık** ve **Aday Sürücü Paketi** (6 ay, tek ödeme). Fiyatlar henüz belirlenmedi: sayfada "planlanan
  fiyat" olarak gösterilir, hangi tutarın neden seçildiği test kartına varsayım olarak yazılır.

## Vaat edilmeyecekler

- "Kazayı önler", "güvenli sürüş garantisi", "hiç kaza yapmazsın" gibi sonuç vaadi yok. Uyarılar yardımcıdır; yol ve
  karar sürücünündür. Sürerken telefona dokunulmaz.
- "Kamera kaydı yok" denmez (uyarı anının fotoğrafı telefonda saklanabiliyor); doğrusu "görüntü telefondan çıkmaz".
- Gece/kötü havada kamera sınırlıdır; hız sınırı her yolda bilinmez: "her zaman", "her yolda" gibi mutlak ifade yok.
- Ebeveyn açısında uygulamanın çocuğu izlediği/konum paylaştığı ima edilmez: veriler sürücünün telefonunda kalır,
  karneyi yalnızca o isterse paylaşır.

## Görsel dil ("Yol levhası"; sayfa da bu dille kurulmalı)

| Ad | Renk | Rolü |
| --- | --- | --- |
| Asfalt | `#262B30` | Zemin, üst bantlar, ana düğme |
| Levha mavisi | `#0B5AA8` | Bilgi levhası (puan, sesli cümle) |
| Reflektif sarı | `#F2B300` | Vurgu, CTA, şerit kesikleri, algılama kutuları |
| Beton | `#E8EBEE` | Açık zemin |
| İşaret kırmızısı | `#C8102E` | Yalnızca kritik uyarı |

Yazı: **Barlow Semi Condensed** (başlıklar, 700–800) ve **Inter** (gövde); ikisi de Google Fonts, OFL. İmza öğeler:
trafik levhası gibi beyaz iç çerçeveli mavi levha, yol şeridi kesikleri, sürücü gözünden yol sahnesinde telefonun
gördüklerini işaretleyen sarı kutular.

`hazir/` klasöründe sayfada kullanılabilecek gerçek uygulama görselleri: `simge.png` (uygulama simgesi),
`surus-ekrani.png` (sürüş ekranı, yatay), `surus-ekrani-uyari.png` (kritik uyarı anı), `karne.png` (sürüş karnesi).

## Reklamlar (4 kanca; aynı ürün, yalnızca başlık değişir)

Her reklamın iki görseli var: `<id>-4x5.png` (1080×1350, akış) ve `<id>-9x16.png` (1080×1920, hikâye/Reels; üst
~280 px ve alt ~350 px boş bırakıldı). Görsellerdeki düğme "Erken erişim". Düğme: `LEARN_MORE` ya da `SIGN_UP`.
Bağlantı: `https://steadydrive.yusufkaanklc.dev/?utm_source=meta&utm_medium=paid&utm_campaign=steadydrive&utm_content=<id>`.

### `usta` (yol sahnesi; "Dikkat, öndeki araç!")
- Ana metin: Yeni sürücüyken en çok istediğin şey: yanında sakin bir usta. Steady Drive telefonunu bir sürüş koçuna
  çevirir. Ön cama tak; öndeki aracı ve yayayı izler, riskli anda tek cümleyle uyarır. Sürüş bitince karnen hazır.
  Yakında Android'de; erken erişim listesine katıl.
- Başlık: Yakında: Steady Drive, sürüş koçun
- Açıklama: Erken erişim listesine katıl

### `telefon-koc` (3 adım)
- Ana metin: Ek cihaz yok, hesap yok. Sadece telefonun. 1) Telefonunu ön cama tak. 2) Steady Drive yolu izler, riskli
  anda sesli uyarır. 3) Sürüşten sonra puanını ve bir sonraki hedefini gör. Yakında Android'de; erken erişim için kaydol.
- Başlık: Yakında: telefonun bir sürüş koçu
- Açıklama: Erken erişim listesine katıl

### `yeni-ehliyet` (yol sahnesi; "Dikkat, yaya")
- Ana metin: Ehliyet yeni, yollar kalabalık. Yalnız sürmek zorunda değilsin. Steady Drive yanında sakin bir koç:
  önünde yaya ya da bisikletli olunca, öndeki araca fazla yaklaşınca kısa bir sesle haber verir. Sürüşten sonra neyi
  iyi yaptığını, neyi geliştireceğini gösterir. Yakında Android'de; erken erişim listesine katıl.
- Başlık: Yakında: Ehliyet yeni mi? Yalnız sürme.
- Açıklama: Erken erişim listesine katıl

### `ebeveyn` (3 adım)
- Ana metin: Ehliyetini yeni alan çocuğunuz direksiyonda; siz her zaman yanında olamıyorsunuz. Steady Drive onun
  telefonunda sakin bir koç olur: yolu izler, riskli anda kısa bir sesle uyarır, her sürüşten sonra karne verir.
  Karnesini dilerse sizinle paylaşabilir. Yakında Android'de; erken erişim listesine katılın.
- Başlık: Yakında: Çocuğunuz yolda, koçu yanında
- Açıklama: Erken erişim listesine katılın

Görseller `marketing/smoke-test/build_creatives.py` ile üretildi (surus-kocu deposu); burada değiştirilmez.
