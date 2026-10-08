// Kirakarne copy (Turkish only: tests are TR-only since 08.10.2026). Legal page adapted from Gard's.
import { TR as GT } from "../../gard/src/copy.mjs";

const swap = (html, from, to) => html.replaceAll(from, to);
// Kirakarne also offers a WhatsApp opt-in: the legal text names the extra data and its purpose.
const legal = (html) => html
  .replace("<li><strong>E-posta adresin ve seçtiğin plan:</strong> yalnızca formu doldurup onay verirsen.</li>",
    "<li><strong>E-posta adresin:</strong> yalnızca formu doldurup onay verirsen.</li>\n    <li><strong>Telefon numaran ve WhatsApp'ta paylaştığın ad:</strong> yalnızca \"WhatsApp'tan haber ver\" bağlantısıyla bize mesaj yazarsan. Mesajı yazman, çıkış haberi için numaranın kullanılmasına izin verdiğin anlamına gelir.</li>")
  .replace("E-posta adresin, açık rızana dayanarak yalnızca Kirakarne yayına çıktığında seni bilgilendirmek için işlenir.",
    "E-posta adresin ve (WhatsApp'tan yazdıysan) telefon numaran, açık rızana dayanarak yalnızca Kirakarne yayına çıktığında seni bilgilendirmek için işlenir. WhatsApp mesajların WhatsApp'ın (Meta) altyapısı üzerinden iletilir; bu aktarım WhatsApp'ın kendi koşullarına tabidir.")
  .replace("E-posta adresin ürün", "E-posta adresin ve telefon numaran ürün");

export const TR = {
  lang: "tr", slug: "kirakarne", name: "Kirakarne", home: "https://kirakarne.yusufkaanklc.dev",
  seo: {
    title: "Kirakarne: kirayı düzenli ödediğini ev sahibi onayıyla göster",
    description: "Her ay kira ödemeni kaydet; ev sahibi uygulama indirmeden onaylasın. Onaylar yeni ev ararken paylaşabileceğin bir karne olur. Yakında, erken erişim listesi açık.",
  },
  headerCta: "Erken erişim",
  hero: {
    eyebrow: "Yakında · iOS ve Android",
    before: "Kirayı düzenli ödediğini ", hot: "ev sahibi onayıyla", after: " göster",
    subtitle: "Her ay ödemeni kaydet, dekontunu ekle. Ev sahibi WhatsApp'taki linkten, uygulama indirmeden onaylasın. Biriken onaylar, yeni ev ararken gösterebileceğin bir karne olur.",
    cta: "Çıkınca haber ver", secondary: "Nasıl çalışır?",
    formLabel: "E-posta adresin", formPlaceholder: "E-posta adresin",
    note: "Henüz yayında değil. Kira karnesi ücretsiz olacak; ödeme bilgisi istemiyoruz.",
    points: ["Ev sahibi uygulama indirmez", "Karne yalnızca senindir", "Ücretsiz kira artış hesaplayıcı"],
  },
  card: {
    title: "KİRA KARNESİ", period: "Oca – Ara 2027", tenant: "Kiracı", tenantName: "A. Yılmaz",
    months: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"], amount: "₺22.500",
    stamp: "ONAY", count: ["", " / 12 ev sahibi onaylı"], share: "Süreli link · 7 gün · salt okunur",
    aria: "Kira karnesi taslağı: on iki aylık kira ödemesi tek tek ev sahibi onay mührüyle işaretleniyor, sonda süreli bir paylaşım linki beliriyor.",
  },
  steps: {
    label: "Nasıl çalışır", title: "Üç adım, kimse uygulama indirmeden",
    items: [
      { n: "01", t: "Kiracı kaydeder", p: "Ödemeni yaptığın gün tutarı ve dekontu ekle. Banka dekontu zaten elinde." },
      { n: "02", t: "Ev sahibi onaylar", p: "Ev sahibine WhatsApp'tan bir link gider. Telefonuna gelen kodu girip \"aldım\" der. Uygulama ya da hesap yok." },
      { n: "03", t: "Karne birikir", p: "Onaylanan her ay karneye mühürlenir. Yeni ev ararken karneyi süreli bir linkle ev sahibine ya da emlakçıya gösterirsin." },
    ],
    receipt: { head: "DEKONT", rows: [["Tür", "Havale / EFT"], ["Tarih", "03 Eki 2027"], ["Tutar", "₺22.500"], ["Açıklama", "Ekim kirası"]], tag: "Kayıtlı" },
    wa: { head: "WhatsApp", text: "Merhaba, A. Yılmaz Ekim kirası olarak ₺22.500 gönderdiğini bildirdi. Aldıysan onaylamak için:", link: "Linki aç ve onayla", sms: "SMS kodu", code: ["4", "8", "2", "1"], btn: "Aldım" },
    mini: { title: "KARNE", chip: "Süreli link · 7 gün", hint: "Salt okunur, kiracı paylaşır" },
  },
  own: {
    label: "Karne kimin?",
    lines: ["Karne", "kiracıya aittir."],
    sub: "Ev sahibi onaylar; not, puan ya da yorum ekleyemez. Karneyi yalnızca kiracı paylaşır.",
    no: ["kara liste", "olumsuz not", "ev sahibi puanı"],
    yes: ["Kiracı paylaşır", "Süreli link", "Salt okunur"],
  },
  calc: {
    label: "Ücretsiz araç", title: "Kira artışını hesapla",
    lede: "Uygulamanın ilk aracı bu olacak. Mevcut kirayı ve artış oranını yaz; yeni kirayı ve farkı gör.",
    rent: "Mevcut kira (₺)", rate: "Artış oranı (%)", rentDef: 22500, rateDef: 30,
    hint: "Konutlarda yasal artış üst sınırı çoğu zaman TÜİK'in 12 aylık TÜFE ortalamasıdır. Güncel oranı kendin gir; bu araç bilgi amaçlıdır, hukuki görüş değildir.",
    out: { next: "Yeni kira", month: "Aylık fark", year: "Yıllık fark" },
    remind: ["Ödeme günü", "Yenileme tarihi", "5. yıl"], remindLabel: "Hatırlatmalar",
  },
  faq: {
    label: "Sorular", title: "Merak edilenler",
    items: [
      ["Ev sahibi uygulama indirmek zorunda mı?", "Hayır. Ev sahibine WhatsApp'tan bir link gider; telefonuna gelen SMS koduyla \"aldım\" der. Uygulama ya da hesap gerekmez. Tasarım hedefi bu."],
      ["Karneyi kim görür?", "Yalnızca sen paylaşırsan: süreli ve salt okunur bir linkle yeni ev sahibine ya da emlakçıya. Ev sahibi karneye not ya da puan ekleyemez."],
      ["Onayı kiracının bir arkadaşı verebilir mi?", "Onay, sözleşmedeki ev sahibinin telefonuna gider. Sahte onayı zorlaştıracak doğrulama adımları tasarlanıyor; ayrıntıları yayın öncesi netleşecek."],
      ["Yeni ev sahibi karneye güvenir mi?", "Bunu henüz bilmiyoruz, bu sayfayla ilgiyi ölçüyoruz. Karne bir kanıt sunar; depozito ya da kefil kararı ev sahibinindir."],
      ["Ücretli mi?", "İlk sürüm ücretsiz olacak. Şu an hiçbir şey satmıyoruz ve senden ödeme bilgisi istemiyoruz."],
      ["Ne zaman çıkacak?", "Şu an geliştiriliyor. E-posta bırakırsan çıktığı gün haber veririz."],
    ],
  },
  close: { title: "Karneni ilk aydan başlat", text: "Çıktığında ilk kullananlardan ol.", cta: "Erken erişime katıl" },
  footer: { text: "Kirakarne geliştirme aşamasında. Satın alma yok, ödeme bilgisi istenmez.", legal: "KVKK aydınlatma metni" },
  sticky: { text: "Kira karnesi, ücretsiz", cta: "Erken erişim" },
  dialog: {
    close: "Kapat", title: "Ücretsiz kira karnesi çıkınca sana haber verelim",
    p1: "Her ay ödediğin kirayı ev sahibi onayıyla kaydet, yeni ev sahibine 12 aylık onaylı karneni göster. Kirakarne geliştiriliyor; e-postanı bırakırsan çıktığı gün tek bir e-postayla haber veririz.",
    p2: "Satın alma yok, senden ödeme bilgisi istemiyoruz.",
    label: "E-posta adresin", placeholder: "ornek@eposta.com",
    consentPre: "", consentLink: "Aydınlatma metnini", consentPost: " okudum; e-postamın çıkış haberi için işlenmesini kabul ediyorum.",
    submit: "Haber ver",
    doneTitle: "Kaydın alındı",
    donePre: "Kirakarne yayına çıktığında ", donePost: " adresine haber vereceğiz. Başka bir amaçla e-posta göndermeyeceğiz.",
    doneBtn: "Tamam", msgs: null,
  },
  wa: {
    number: "905306329579", label: "WhatsApp'tan haber ver", or: "ya da",
    text: "Merhaba, Kirakarne çıkınca bana haber verin.",
    note: "WhatsApp'tan yazarsan telefon numaran bana ulaşır; yalnızca çıkış haberi için kullanılır.",
  },
  legal: { ...GT.legal, title: "KVKK aydınlatma metni: Kirakarne", desc: "Kirakarne KVKK aydınlatma metni", html: legal(swap(GT.legal.html, "Gard", "Kirakarne")) },
};
