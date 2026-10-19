// Steady Drive copy (Turkish only). Product facts come from ../HAZIR_KREATIFLER.md; nothing beyond them is promised.
// Legal page: reuse the Kirakarne text (same data practices: e-mail + optional WhatsApp number + anonymous visit data).
import { TR as KT } from "../../kirakarne/src/copy.mjs";

export const TR = {
  lang: "tr", slug: "steadydrive", name: "Steady Drive", home: "https://steadydrive.yusufkaanklc.dev",
  seo: {
    title: "Steady Drive: telefonun, sakin bir sürüş koçu",
    description: "Telefonu ön cama tak; Steady Drive yolu izler, riskli anda tek cümleyle uyarır, sürüşten sonra puanlı karne verir. Yakında Android'de, erken erişim listesi açık.",
  },
  headerCta: "Erken erişim",
  hero: {
    eyebrow: "Yakında · Android · Erken erişim",
    before: "Telefonun, yanındaki ", hot: "sakin sürüş koçu", after: " olsun.",
    subtitle: "Steady Drive'ı ön cama takarsın. Yolu izler, öndeki araca ya da yayaya fazla yaklaşınca tek cümleyle uyarır. Sürüş bitince puanlı karnen hazır.",
    cta: "Çıkınca haber ver", secondary: "Nasıl çalışır?",
    formLabel: "E-posta adresin", formPlaceholder: "E-posta adresin",
    note: "Henüz yayında değil. İlk sürüm Android 11 ve üstü için; iPhone sürümü yok.",
    points: ["Hesap gerekmez", "Görüntü telefondan çıkmaz", "İlk 3 sürüş ücretsiz"],
    sceneLabel: "Steady Drive'ın yolda gördükleri: öndeki araç, yaya ve hız sınırı sarı kutularla işaretlenir; mesafe kısalınca sesli uyarı çıkar.",
  },
  steps: {
    label: "Nasıl çalışır", title: "Tak, sür, karnene bak",
    items: [
      { n: "1", t: "Telefonu ön cama tak", p: "Telefon tutucusuyla ön cama tak ve \"Sürüşe başla\"ya bas. Ek cihaz ya da hesap gerekmez.", img: "surus-ekrani.webp", alt: "Steady Drive sürüş ekranı: 28 km/sa, takip mesafesi 2,4 sn, hız sınırı 50" },
      { n: "2", t: "Yolu izler, gerekirse konuşur", p: "Arka kamera ve GPS yolu izler. Yalnızca riskli anda kısa bir ses ya da tek cümleyle konuşur.", img: "surus-ekrani-uyari.webp", alt: "Steady Drive uyarı ekranı: kırmızı çerçeve, DİKKAT, öndeki araç 0,8 sn" },
      { n: "3", t: "Sürüşten sonra karnen hazır", p: "100 üzerinden puanın, olayların ve bir sonraki sürüş için tek hedefin seni bekler.", score: { l: "Puan", v: "77", of: "/100", note: "Son 4 sürüş ortalamasının 6 puan üstünde" } },
    ],
  },
  voice: {
    label: "Ne zaman konuşur", title: "Yalnızca gerektiğinde konuşur",
    lede: "Uygulamadaki gerçek cümleler bunlar. Gerisinde sessiz kalır.",
    items: [
      ["Dikkat, öndeki araç!", "Çarpışma riski", "Öndeki araca çarpma riski oluştuğunda."],
      ["Mesafe kısa", "Takip mesafesi", "Öndeki araçla aranı saniye cinsinden ölçer; kısaldığında söyler."],
      ["Dikkat, yaya", "Yaya", "Yavaş giderken önünde yakın bir yaya olduğunda."],
      ["Dikkat, bisikletli", "Bisikletli", "Yavaş giderken önünde yakın bir bisikletli olduğunda."],
      ["Sınırın üstündesin", "Hız sınırı", "Türkiye'de harita verisi olan yollarda hızını sınırla karşılaştırır."],
    ],
    sensors: "Sert fren, sert kalkış ve hızlı viraj telefonun sensörlerinden izlenir.",
  },
  karne: {
    label: "Sürüşten sonra", title: "Neyi iyi yaptığını, neyi geliştireceğini gösterir",
    imgAlt: "Steady Drive sürüş karnesi: puan 77/100, son 5 sürüşün puanları, sonraki sürüşün hedefi",
    items: [
      ["100 üzerinden puan", "Her sürüş için, son sürüşlerinle birlikte."],
      ["Olaylar harita üzerinde", "Sert fren ya da kısa mesafe nerede oldu, gör."],
      ["Bir sonraki sürüş için tek hedef", "Örneğin: takip mesafeni 2 saniyenin üstünde tut."],
      ["Haftalık ilerleme", "Puanın zamanla nasıl değiştiğini izle."],
      ["2 dakikalık dersler", "2 saniye kuralı, yaya önceliği, hız sınırları."],
      ["Aday sürücülük süresi", "Aday sürücülüğün ne kadar kaldığını gösterir."],
    ],
  },
  who: {
    label: "Kimin için", title: "Yeni ve aday sürücüler için",
    items: [
      { t: "Ehliyeti yeni olanlar", p: "Yalnız sürmek zorunda değilsin. Önünde yaya ya da bisikletli olunca, öndeki araca fazla yaklaşınca kısa bir sesle haber verir." },
      { t: "Ehliyete hazırlananlar", p: "Her sürüşten sonra puanını ve gelişecek tek bir alanı görürsün; 2 dakikalık derslerle kuralları pekiştirirsin." },
      { t: "Ebeveynler", p: "Çocuğunuz uygulamayı kendi telefonunda kullanır. Veriler onun telefonunda kalır; karnesini yalnızca o isterse sizinle paylaşır." },
    ],
  },
  know: {
    label: "Bilmen gerekenler", title: "Yardımcıdır, yol ve karar senindir",
    limits: {
      t: "Sınırları",
      items: [
        "Uyarılar yardımcıdır; yolu ve kararı sen verirsin. Steady Drive kazayı önleme garantisi vermez.",
        "Sürerken telefona dokunulmaz.",
        "Gece ve kötü havada kamera sınırlı çalışır.",
        "Hız sınırı, Türkiye'de harita verisi olan yollarda gösterilir; her yolda sınır bilinmez.",
      ],
    },
    privacy: {
      t: "Gizlilik",
      items: [
        "Hesap gerekmez.",
        "Veriler telefonda kalır.",
        "Görüntü telefondan çıkmaz, sunucuya hiçbir şey gitmez.",
        "Karneyi paylaşmak istersen görsel ya da PDF olarak sen paylaşırsın.",
      ],
    },
  },
  price: {
    label: "Planlanan fiyatlar", title: "İlk 3 sürüş tam koçluk, ücretsiz",
    lede: "Henüz satışta değil. Aşağıdaki tutarlar planlanan fiyattır ve değişebilir; şimdi ödeme istemiyoruz.",
    tag: "Planlanan fiyat",
    plans: [
      { id: "ucretsiz", name: "Ücretsiz", price: "0", per: "", feats: ["İlk 3 sürüşte tam koçluk", "Çarpışma riski uyarısı her zaman açık"], cta: "Erken erişim" },
      { id: "aylik", name: "Aylık", price: "99", per: "/ ay", feats: ["Her sürüşte tam koçluk", "Karne, haftalık ilerleme ve dersler"], cta: "Aylık planı istiyorum" },
      { id: "aday", name: "Aday Sürücü Paketi", price: "449", per: "6 ay, tek ödeme", feats: ["6 ay boyunca tam koçluk", "Ayda yaklaşık ₺75'e denk gelir"], cta: "Paketi istiyorum", hi: true },
    ],
  },
  faq: {
    label: "Sorular", title: "Merak edilenler",
    items: [
      ["Ne zaman çıkacak?", "Uygulama çalışıyor, mağazada yayınlanmayı bekliyor. E-posta bırakırsan çıktığı gün haber veririz."],
      ["iPhone'da kullanabilir miyim?", "Hayır. İlk sürüm yalnızca Android 11 ve üstü için."],
      ["Ek cihaz ya da hesap gerekir mi?", "Hayır. Yalnızca telefonun ve onu ön cama sabitleyecek bir tutucu yeterli. Hesap açmazsın."],
      ["Görüntüm ya da konumum bir yere gidiyor mu?", "Hayır. Veriler telefonda kalır; görüntü telefondan çıkmaz, sunucuya hiçbir şey gitmez."],
      ["Kazayı önler mi?", "Hayır, böyle bir söz vermiyoruz. Uyarılar yardımcıdır; yol ve karar sürücünündür. Gece ve kötü havada kamera sınırlıdır."],
      ["Ücretsiz kısmı ne kadar?", "İlk 3 sürüşte tam koçluk ücretsiz. Çarpışma riski uyarısı ücretsiz planda da her zaman açık."],
      ["Hız sınırını her yolda bilir mi?", "Hayır. Türkiye'de harita verisi olan yollarda gösterir; her yolda sınır bilinmez."],
    ],
  },
  close: { title: "İlk sürüşünde yanında koç olsun", text: "Çıktığında ilk haber alanlardan ol.", cta: "Erken erişime katıl" },
  footer: { text: "Steady Drive geliştirme aşamasında. Satın alma yok, ödeme bilgisi istenmez.", legal: "KVKK aydınlatma metni" },
  sticky: { text: "Sakin bir sürüş koçu, yakında", cta: "Erken erişim" },
  dialog: {
    close: "Kapat", title: "Steady Drive çıkınca sana haber verelim",
    p1: "Telefonunu ön cama takınca yolu izleyen, riskli anda tek cümleyle uyaran sürüş koçu Android için geliştiriliyor. E-postanı bırakırsan çıktığı gün tek bir e-postayla haber veririz.",
    p2: "Satın alma yok, senden ödeme bilgisi istemiyoruz.",
    label: "E-posta adresin", placeholder: "ornek@eposta.com",
    consentPre: "", consentLink: "Aydınlatma metnini", consentPost: " okudum; e-postamın çıkış haberi için işlenmesini kabul ediyorum.",
    submit: "Haber ver",
    doneTitle: "Kaydın alındı",
    donePre: "Steady Drive yayına çıktığında ", donePost: " adresine haber vereceğiz. Başka bir amaçla e-posta göndermeyeceğiz.",
    doneBtn: "Tamam", msgs: null,
  },
  wa: {
    number: "905306329579", label: "WhatsApp'tan haber ver", or: "ya da",
    text: "Merhaba, Steady Drive çıkınca bana haber verin.",
    note: "WhatsApp'tan yazarsan telefon numaran bana ulaşır; yalnızca çıkış haberi için kullanılır.",
  },
  legal: { ...KT.legal, title: "KVKK aydınlatma metni: Steady Drive", desc: "Steady Drive KVKK aydınlatma metni", html: KT.legal.html.replaceAll("Kirakarne", "Steady Drive") },
};
