// Steady Drive copy (Turkish only). Product facts come from ../HAZIR_KREATIFLER.md; nothing beyond them is promised.
// v2 (23.10.2026): real pre-registration campaign. Promise = launch notice + closed-test invite. No price/discount promise.
// Legal page: Kirakarne text (e-mail + optional WhatsApp number + anonymous visit data) plus the closed-test purpose.
import { TR as KT } from "../../kirakarne/src/copy.mjs";

// Kapalı test daveti yeni bir amaç ve Google'a aktarım demek: aydınlatma metnine yazılır (yalnızca Steady Drive).
const legal = (html) => html
  .replace("yalnızca Steady Drive yayına çıktığında seni bilgilendirmek için işlenir.",
    "yalnızca Steady Drive yayına çıktığında seni bilgilendirmek ve yayından önce uygulamanın kapalı testine davet etmek için işlenir.")
  .replace("Veriler veri sorumlusunun kontrolündeki sunucuda saklanır ve üçüncü kişilerle paylaşılmaz, satılmaz.",
    "Veriler veri sorumlusunun kontrolündeki sunucuda saklanır ve satılmaz. Kapalı teste katılmak için davet bağlantısını kabul edersen e-posta adresin, yalnızca test erişimi tanımlamak amacıyla Google Play Console'daki test kullanıcıları listesine eklenir; bu aktarım Google'ın kendi koşullarına tabidir. Bunun dışında üçüncü kişilerle paylaşılmaz.")
  .replace("Sürüm: v1", "Sürüm: v2 (kapalı test daveti eklendi)");

// Reklam kancaları: utm_content bu önekle başlıyorsa başlık ve sahne o kancanınki olur; yoksa ilki (usta).
export const HOOKS = [
  { id: "usta", h1: ["Yanında hep sakin bir ", "usta sürücü", " olsa?"], t: 3.6, screen: "ekran-uyari-k.webp",
    sceneLabel: "Steady Drive'ın yolda gördükleri: öndeki araç ve hız sınırı sarı kutularla işaretli; mesafe kısalınca \"Dikkat, öndeki araç!\" diye uyarıyor. Sağ altta uygulamanın gerçek uyarı ekranı." },
  { id: "yeni-ehliyet", h1: ["Ehliyet yeni mi? ", "Yalnız sürme.", ""], t: 6.7, screen: "ekran-k.webp",
    sceneLabel: "Steady Drive'ın yolda gördükleri: öndeki araç, yaya ve hız sınırı sarı kutularla işaretli; önde yaya varken \"Dikkat, yaya\" diyor. Sağ altta uygulamanın gerçek sürüş ekranı." },
];

export const TR = {
  lang: "tr", slug: "steadydrive", name: "Steady Drive", home: "https://steadydrive.yusufkaanklc.dev",
  seo: {
    title: "Steady Drive: ön kayıt açık · telefonun, sakin bir sürüş koçu",
    description: "Telefonu ön cama tak; Steady Drive yolu izler, riskli anda tek cümleyle uyarır, sürüşten sonra puanlı karne verir. Ön kayıt ol: Play Store'a çıktığında ilk sen haber al, kapalı teste davet edil.",
  },
  headerCta: "Ön kayıt",
  hero: {
    eyebrow: "Yakında Android'de · Erken erişim",
    subtitle: "Telefonun ön camda yolu izler, riskli anda tek cümleyle uyarır, sürüşten sonra karne verir.",
    promiseTitle: "Ön kayıt olana",
    promise: ["Play Store'a çıktığında ilk sen haber alırsın", "Yayından önce kapalı teste davet edilirsin"],
    cta: "Ön kayıt ol",
    formLabel: "E-posta adresin", formPlaceholder: "E-posta (tercihen Gmail)",
    note: "Ücretsiz. Ödeme bilgisi istemiyoruz. İlk sürüm Android 11 ve üstü; iPhone sürümü yok.",
  },
  after: {
    label: "Ön kayıttan sonra", title: "Seni neler bekliyor",
    items: [
      { n: "1", t: "Kapalı test daveti", p: "Uygulama Play Store'da kapalı testteyken sana bir davet e-postası gelir. Bağlantıyı açıp Play Store'dan yüklersin. Davetin çalışması için Play Store'da kullandığın Gmail adresini yazman en kolayı." },
      { n: "2", t: "Çıkış haberi", p: "Steady Drive Play Store'da herkese açıldığı gün tek bir e-postayla haber veririz." },
      { n: "3", t: "Başka e-posta yok", p: "Bülten, reklam ya da başka bir amaçla yazmayız. Listeden çıkmak istersen bize yazman yeterli." },
    ],
  },
  how: {
    label: "Nasıl çalışır", title: "Tak, sür, karnene bak",
    items: [
      { n: "1", t: "Telefonu ön cama tak", p: "Bir tutucuyla ön cama tak, \"Sürüşe başla\"ya bas. Ek cihaz ya da hesap gerekmez.", img: "surus-ekrani.webp", alt: "Steady Drive sürüş ekranı: 28 km/sa, takip mesafesi 2,4 sn, hız sınırı 50" },
      { n: "2", t: "Yolu izler, gerektiğinde konuşur", p: "Arka kamera ve GPS yolu izler. Yalnızca riskli anda kısa bir ses ya da tek cümleyle konuşur; gerisinde sessizdir.", img: "surus-ekrani-uyari.webp", alt: "Steady Drive uyarı ekranı: kırmızı çerçeve, DİKKAT, öndeki araç 0,8 sn" },
    ],
    saysLabel: "Uygulamadaki gerçek cümleler",
    says: ["Dikkat, öndeki araç!", "Mesafe kısa", "Dikkat, yaya", "Dikkat, bisikletli", "Sınırın üstündesin"],
  },
  karne: {
    n: "3", label: "Sürüşten sonra", title: "Karnen hazır",
    imgAlt: "Steady Drive sürüş karnesi: puan 77/100, son 5 sürüşün puanları ve puanı en çok düşüren alışkanlık",
    items: [
      ["100 üzerinden puan", "Olaylar harita üzerinde, son sürüşlerinle birlikte."],
      ["Bir sonraki sürüş için tek hedef", "Örneğin: takip mesafeni 2 saniyenin üstünde tut."],
      ["2 dakikalık dersler", "2 saniye kuralı, yaya önceliği, hız sınırları; aday sürücülüğün ne kadar kaldığı."],
    ],
  },
  know: {
    label: "Bilmen gerekenler", title: "Yardımcıdır; yol ve karar senindir",
    limits: {
      t: "Sınırları",
      items: [
        "Uyarılar yardımcıdır, kazayı önleme garantisi vermez.",
        "Sürerken telefona dokunulmaz.",
        "Gece ve kötü havada kamera sınırlı çalışır.",
        "Hız sınırı yalnızca Türkiye'de harita verisi olan yollarda bilinir.",
      ],
    },
    privacy: {
      t: "Gizlilik",
      items: [
        "Hesap gerekmez; veriler telefonda kalır.",
        "Görüntü telefondan çıkmaz, sunucuya hiçbir şey gitmez.",
        "Karneyi paylaşmak istersen görsel ya da PDF olarak sen paylaşırsın.",
      ],
    },
  },
  faq: {
    label: "Sorular", title: "Merak edilenler",
    items: [
      ["Ne zaman çıkacak?", "Uygulama çalışıyor ve Play Store'a hazırlanıyor. Önce ön kayıt olanlarla kapalı test yapacağız, sonra herkese açılacak. Tarih kesinleşince e-postayla haber veririz."],
      ["Kapalı test ne demek?", "Uygulamanın Play Store'da yalnızca davet edilenlere açık sürümü. Davet bağlantısıyla normal bir uygulama gibi yüklersin; görüşlerini istersen bize yazarsın."],
      ["iPhone'da kullanabilir miyim?", "Hayır. İlk sürüm yalnızca Android 11 ve üstü için."],
      ["Ücretli mi?", "Ön kayıt ücretsiz, ödeme bilgisi istemiyoruz. Uygulamada ilk 3 sürüş tam koçluk ücretsiz; çarpışma riski uyarısı ücretsiz planda da her zaman açık. Ücretli planların fiyatı henüz belli değil."],
      ["Görüntüm ya da konumum bir yere gidiyor mu?", "Hayır. Veriler telefonda kalır; görüntü telefondan çıkmaz, sunucuya hiçbir şey gitmez."],
    ],
  },
  close: { title: "Play Store'a çıktığında ilk sen haber al", text: "Ön kayıt ol, kapalı teste de davet edelim.", cta: "Ön kayıt ol" },
  footer: { text: "Steady Drive geliştirme aşamasında. Satın alma yok, ödeme bilgisi istenmez.", legal: "KVKK aydınlatma metni" },
  sticky: { text: "Ön kayıt açık: ilk sen haber al", cta: "Ön kayıt ol" },
  dialog: {
    close: "Kapat", title: "Steady Drive için ön kayıt ol",
    p1: "Play Store'a çıktığında ilk sen haber alırsın, yayından önce kapalı teste davet edilirsin. Davet için Play Store'da kullandığın Gmail adresini yazman en kolayı.",
    p2: "Ücretsiz; ödeme bilgisi istemiyoruz.",
    label: "E-posta adresin", placeholder: "ornek@gmail.com",
    consentPre: "", consentLink: "Aydınlatma metnini", consentPost: " okudum; e-postamın çıkış haberi ve kapalı test daveti için işlenmesini kabul ediyorum.",
    submit: "Ön kayıt ol",
    doneTitle: "Ön kaydın alındı",
    donePre: "Kapalı test daveti ve çıkış haberi ", donePost: " adresine gelecek. Başka bir amaçla e-posta göndermeyeceğiz.",
    doneBtn: "Tamam", msgs: null,
  },
  wa: {
    number: "905306329579", label: "WhatsApp'tan haber al", or: "ya da",
    text: "Merhaba, Steady Drive çıkınca bana haber verin.",
    note: "WhatsApp'tan yazarsan telefon numaran bize ulaşır; yalnızca çıkış haberi için kullanılır.",
  },
  legal: { ...KT.legal, title: "KVKK aydınlatma metni: Steady Drive", desc: "Steady Drive KVKK aydınlatma metni", html: legal(KT.legal.html.replaceAll("Kirakarne", "Steady Drive")) },
};
