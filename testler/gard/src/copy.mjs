// Gard page copy. TR is written in Turkish; EN is written natively in English (not a translation).
// Facts shared by both: planned prices (TR ₺199/mo, ₺1.199/yr; EN $7.99/mo, $49.99/yr), scores GARD 72 · FEET 85 · CHIN 64.

export const TR = {
  lang: "tr", slug: "gard", name: "Gard", home: "https://gard.yusufkaanklc.dev",
  seo: {
    title: "Gard: telefon kamerasıyla boks tekniği analizi",
    description: "Antrenmanını telefonla çek; Gard duruşunu, gardını ve ayak oyununu puanlasın, düzeltmeni söylesin. Yakında, erken erişim listesi açık.",
  },
  headerCta: "Erken erişim",
  hero: {
    eyebrow: "Yakında · iOS ve Android",
    before: "Tek başına çalışırken tekniğini ", hot: "Gard düzeltir", after: "",
    subtitle: "Antrenmanını telefonla çek. Gard duruşunu, gardını ve ayak oyununu puanlar, neyi düzeltmen gerektiğini söyler.",
    points: ["Video analizi: gard, ayak, çene", "4 haftalık boks programı", "Boks soruları için yapay zekâ koçu"],
    cta: "Premium'u al", secondary: "Nasıl çalışır?",
    note: "Henüz yayında değil. iOS ve Android için geliştiriliyor.",
  },
  fig: { line: "GARD HATTI", drop: "ARKA EL −14 cm", fix: "Eli çeneye çek", ok: "GARD" },
  vf: { score: "GARD PUANI", side: "YAN GÖRÜNÜM", aria: "Telefon kamerası vizörü: boksörün arka eli jab sırasında çene hattının altına iniyor, Gard işaretliyor." },
  note: { label: "Köşe notu", text: "Jab atarken arka eli çenede tut.", small: "Gard koçundan örnek bir not." },
  problem: {
    label: "01 · Sorun",
    say: "Antrenör her an yanında olamaz. <em>Tek başına çalışırken yanlış alışkanlık fark edilmeden yerleşir.</em> Gard telefonla çektiğin videoyu izler, gardın ve ayağın için somut düzeltme verir.",
    momentsLabel: "Tek başına çalıştığın anlar",
    moments: ["Torba başında tek başına", "Evde ayna karşısında", "Salon boşken, akşam geç saatte", "Antrenör başka öğrenciyle ilgilenirken", "Sparring öncesi son hafta", "Yeni kombinasyon öğrenirken", "Hafta sonu parkta gölge boksta"],
    without: { label: "Gard olmadan", items: ["Hata fark edilmez", "Gard her yumrukta iner", "Neyi düzelteceğini tahmin edersin"] },
    with: { label: "Gard ile", items: ["Video analizi hatayı işaretler", "Gard puanı takip edilir", "Sıradaki düzeltme net"] },
  },
  score: {
    label: "02 · Hakem kartı", title: "Videodan üç nokta, üç puan",
    steps: [["Videoyu çek", "Telefonu karşına koy, bir raund çalış."], ["Puanı gör", "Gard, ayak ve çene puanlanır."], ["Düzelt", "Koçun önerisiyle tekrar dene."]],
    head: ["Hakem kartı", "Jab · çapraz"],
    rows: [
      { id: "guard", name: "Gard", detail: "Gard yüksekliği · iniyor", v: 72, tag: "Düzelt", fix: true },
      { id: "feet", name: "Ayak", detail: "Ayak genişliği · omuz hizasında", v: 85, tag: "İyi", fix: false },
      { id: "chin", name: "Çene", detail: "Çene · hafif yukarıda", v: 64, tag: "Düzelt", fix: true },
    ],
    footLabel: "Sıradaki düzeltme", foot: "Çene",
  },
  program: {
    label: "03 · Program", title: "4 hafta, 4 raund",
    lede: "Her hafta bir raund zili: haftada 3 gün çalışırsın, ne yapacağını bilirsin.",
    round: "Raund", week: "Hafta",
    weeks: [["Duruş ve jab", "3 gün"], ["Çapraz ve gard", "3 gün"], ["Ayak oyunu", "3 gün"], ["Kombinasyonlar", "3 gün"]],
    timerLabel: "Raund zamanlayıcı", work: "3 dk çalışma", rest: "1 dk",
    timerText: "<b>3 dk</b> çalışma, <b>1 dk</b> dinlenme, <b>6 raund</b>. Zamanlayıcı ücretsiz olacak.",
  },
  talk: {
    label: "04 · Köşe", title: "Sor, köşeden cevap gelsin",
    lede: "Jab atarken gardın neden indiğini sor; koç hangi harekete bakacağını söylesin. Yalnız boks konuşur, tıbbi ya da yaralanma tavsiyesi vermez.",
    q: "Jab atarken arka elim neden iniyor?",
    aLabel: "Köşe",
    a: "Jab'a odaklanınca arka dirseğin gevşiyor. Eli çeneye yapıştır, bir sonraki videoda puanı karşılaştır.",
    small: "Örnek sohbet. Yapay zekâ koçu geliştirme aşamasında.",
  },
  price: {
    label: "05 · Tarife", title: "Planlanan fiyatlar",
    sub: "Raund zamanlayıcı ve temel program ücretsiz olacak. Premium video analizini ve yapay zekâ koçunu açar.",
    planned: "Planlanan fiyat",
    plans: [
      { id: "aylik", name: "Aylık", amount: "₺199", per: "/ ay", features: ["Video analizi", "Yapay zekâ koç sohbeti", "4 haftalık programlar"], cta: "Aylık planı al" },
      { id: "yillik", name: "Yıllık", amount: "₺1.199", per: "/ yıl", badge: "En avantajlı", note: "Ayda yaklaşık ₺100'e denk gelir", features: ["Aylık plandaki her şey", "Gelişim grafiği", "Sınırsız video"], cta: "Yıllık planı al" },
    ],
    fine: "Satın alma henüz açık değil; senden ödeme bilgisi istemiyoruz.",
  },
  faq: {
    label: "06 · Sorular", title: "Sık sorulanlar",
    items: [
      ["Gard ne zaman çıkacak?", "Şu an geliştiriliyor. E-posta bırakırsan çıktığı gün haber veririz."],
      ["Boks bilmeyen biri kullanabilir mi?", "Başlangıç seviyesi için duruş ve jab ile başlayan program tasarlanıyor. Yine de gerçek bir antrenörün yerini tutmayı hedeflemiyoruz."],
      ["Videolarım saklanacak mı?", "Tasarım hedefi, videoyu yalnızca analiz için kullanmak. Ayrıntılar yayın öncesi gizlilik metninde yazılacak."],
      ["İptal edebilecek miyim?", "Abonelikler App Store ve Google Play üzerinden yönetilecek; istediğin zaman iptal edilebilecek."],
    ],
  },
  close: { title: "Bir sonraki antrenmana düzeltilmiş gel.", text: "Çıktığında ilk kullananlardan ol.", cta: "Premium'u al" },
  footer: { text: "Gard geliştirme aşamasında. Satın alma henüz açık değil.", legal: "KVKK aydınlatma metni" },
  sticky: { text: "Yakında", cta: "Erken erişim" },
  dialog: {
    close: "Kapat", title: "Gard henüz hazır değil",
    p1: "Uygulamayı şu an geliştiriyoruz. Satın alma henüz açık değil ve senden ödeme bilgisi istemiyoruz.",
    p2: "Çıktığında ilk sen haberdar olmak istersen e-posta adresini bırak.",
    label: "E-posta adresin", placeholder: "ornek@eposta.com",
    consentPre: "", consentLink: "Aydınlatma metnini", consentPost: " okudum; Gard çıktığında haber verilmesi için e-posta adresimin işlenmesine onay veriyorum.",
    submit: "Çıkınca haber ver",
    doneTitle: "Kaydın alındı",
    donePre: "Gard yayına çıktığında ", donePost: " adresine haber vereceğiz. Başka bir amaçla e-posta göndermeyeceğiz.",
    doneBtn: "Tamam",
    msgs: null,
  },
  legal: {
    title: "KVKK aydınlatma metni: Gard", desc: "Gard KVKK aydınlatma metni", back: "Ana sayfaya dön", version: "Sürüm: v1",
    html: `<h1>KVKK aydınlatma metni</h1>
  <p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi kapsamında, Gard ön tanıtım sayfasında işlenen kişisel veriler hakkında seni bilgilendirmek için hazırlandı.</p>
  <h2>Veri sorumlusu</h2>
  <p>Yusuf Kağan Kılıç<br>İletişim: <a href="mailto:support@yusufkaanklc.dev">support@yusufkaanklc.dev</a></p>
  <h2>Hangi verileri işliyoruz?</h2>
  <ul>
    <li><strong>E-posta adresin ve seçtiğin plan:</strong> yalnızca formu doldurup onay verirsen.</li>
    <li><strong>Anonim ziyaret bilgileri:</strong> sayfanın görüntülenmesi, ne kadar kaydırıldığı, hangi butonlara basıldığı, geldiğin reklamın kaynağı (UTM etiketleri) ve cihaz türü (mobil/masaüstü). Bunlar tarayıcı oturumu boyunca tutulan rastgele bir oturum kimliğiyle ilişkilendirilir; adın, IP adresin veya çerez kaydedilmez.</li>
  </ul>
  <h2>Amaç ve hukuki sebep</h2>
  <p>E-posta adresin, açık rızana dayanarak yalnızca Gard yayına çıktığında seni bilgilendirmek için işlenir. Anonim ziyaret bilgileri, ürüne olan ilgiyi ölçmek ve sayfayı geliştirmek amacıyla, veri sorumlusunun meşru menfaati kapsamında işlenir.</p>
  <h2>Saklama ve aktarım</h2>
  <p>Veriler veri sorumlusunun kontrolündeki sunucuda saklanır ve üçüncü kişilerle paylaşılmaz, satılmaz. Site Cloudflare altyapısı üzerinden sunulduğu için bağlantı sırasında IP adresin teknik olarak Cloudflare tarafından işlenebilir. E-posta adresin ürün yayına çıktığında yapılacak bilgilendirmeden sonra, ürün yayına çıkmazsa en geç 12 ay içinde silinir.</p>
  <h2>Hakların</h2>
  <p>KVKK'nın 11. maddesi uyarınca verilerinin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve rızanı geri alma hakların var. Bunun için <a href="mailto:support@yusufkaanklc.dev">support@yusufkaanklc.dev</a> adresine yazman yeterli; talebini en geç 30 gün içinde sonuçlandırırız.</p>
  <p class="legal-meta">Sürüm: v1</p>`,
  },
};

export const EN = {
  lang: "en", slug: "gard-en", name: "Guard", home: "https://gard-en.yusufkaanklc.dev",
  seo: {
    title: "Guard: boxing technique feedback from your phone camera",
    description: "Film your training; Guard scores your stance, guard and footwork and tells you what to fix. Coming soon: join the early access list.",
  },
  headerCta: "Early access",
  hero: {
    eyebrow: "Coming soon · iOS and Android",
    before: "Training alone? ", hot: "Guard fixes your technique", after: "",
    subtitle: "Prop your phone up and train. Guard scores your stance, guard and footwork, then tells you what to fix next.",
    points: ["Video analysis: guard, feet, chin", "A 4-week boxing program", "An AI coach for boxing questions"],
    cta: "Get early access", secondary: "How it works",
    note: "Not released yet. In development for iOS and Android.",
  },
  fig: { line: "GUARD LINE", drop: "REAR HAND −5.5 in", fix: "Tuck it back to your chin", ok: "GUARD" },
  vf: { score: "GUARD SCORE", side: "SIDE VIEW", aria: "Phone camera viewfinder: the boxer's rear hand drops below the chin line during a jab and Guard flags it." },
  note: { label: "Corner note", text: "Keep the rear hand on your chin when you jab.", small: "A sample note from the Guard coach." },
  problem: {
    label: "01 · The problem",
    say: "Your coach can't be at every session. <em>Training alone, bad habits settle in unnoticed.</em> Guard watches the video you film and gives you specific fixes for your guard and your feet.",
    momentsLabel: "When you train alone",
    moments: ["At the heavy bag, alone", "In front of the mirror at home", "At the gym late, after hours", "Coach busy with another student", "The last week before sparring", "Learning a new combination", "Shadowboxing in the park"],
    without: { label: "Without Guard", items: ["Mistakes go unnoticed", "Your guard drops on every punch", "You guess what to fix"] },
    with: { label: "With Guard", items: ["Video analysis flags the mistake", "Your guard score is tracked", "The next fix is clear"] },
  },
  score: {
    label: "02 · Scorecard", title: "Three checkpoints, three scores",
    steps: [["Film a round", "Prop your phone up and train."], ["See the score", "Guard, feet and chin each get scored."], ["Fix and retry", "Run it back with the coach's tip."]],
    head: ["Scorecard", "Jab · cross"],
    rows: [
      { id: "guard", name: "Guard", detail: "Guard height · dropping", v: 72, tag: "Fix", fix: true },
      { id: "feet", name: "Feet", detail: "Stance width · shoulder width", v: 85, tag: "Good", fix: false },
      { id: "chin", name: "Chin", detail: "Chin · slightly high", v: 64, tag: "Fix", fix: true },
    ],
    footLabel: "Next fix", foot: "Chin",
  },
  program: {
    label: "03 · Program", title: "4 weeks, 4 rounds",
    lede: "One bell a week: three days of work, and you always know what's next.",
    round: "Round", week: "Week",
    weeks: [["Stance and jab", "3 days"], ["Cross and guard", "3 days"], ["Footwork", "3 days"], ["Combinations", "3 days"]],
    timerLabel: "Round timer", work: "3 min work", rest: "1 min",
    timerText: "<b>3 min</b> on, <b>1 min</b> off, <b>6 rounds</b>. The timer will be free.",
  },
  talk: {
    label: "04 · Your corner", title: "Ask. Your corner answers.",
    lede: "Ask why your guard drops when you jab and the coach points to what to watch. It only talks boxing; no medical or injury advice.",
    q: "Why does my rear hand drop when I jab?",
    aLabel: "Corner",
    a: "Your rear elbow loosens as you reach. Snap the hand back to your chin and compare your score on the next clip.",
    small: "A sample chat. The AI coach is in development.",
  },
  price: {
    label: "05 · Pricing", title: "Planned pricing",
    sub: "The round timer and a basic plan will be free. Premium unlocks video analysis and the AI coach.",
    planned: "Planned price",
    plans: [
      { id: "monthly", name: "Monthly", amount: "$7.99", per: "/ mo", features: ["Video analysis", "AI coach chat", "4-week programs"], cta: "Get monthly" },
      { id: "yearly", name: "Yearly", amount: "$49.99", per: "/ yr", badge: "Best value", note: "About $4.17 a month", features: ["Everything in Monthly", "Progress chart", "Unlimited videos"], cta: "Get yearly" },
    ],
    fine: "Purchasing isn't open yet, and we won't ask you for payment details.",
  },
  faq: {
    label: "06 · Questions", title: "Good to know",
    items: [
      ["When will Guard launch?", "It's in development. Leave your email and we'll tell you the day it's out."],
      ["Can a beginner use it?", "A beginner program starting with stance and jab is being designed. It isn't meant to replace a real coach."],
      ["Will my videos be stored?", "The design goal is to use video only for analysis. Details will be in the privacy notice before launch."],
      ["Can I cancel?", "Subscriptions will be managed through the App Store and Google Play, and can be cancelled any time."],
    ],
  },
  close: { title: "Walk into your next session with a fix in hand.", text: "Be among the first to use it.", cta: "Get early access" },
  footer: { text: "Guard is in development. Purchasing isn't open yet.", legal: "Privacy notice" },
  sticky: { text: "Coming soon", cta: "Early access" },
  dialog: {
    close: "Close", title: "Guard isn't ready yet",
    p1: "We're still building the app. Purchasing isn't open yet and we won't ask you for payment details.",
    p2: "Leave your email if you'd like to be the first to know when it launches.",
    label: "Your email address", placeholder: "you@example.com",
    consentPre: "I have read the ", consentLink: "privacy notice", consentPost: " and consent to my email address being processed so I can be notified when Guard launches.",
    submit: "Notify me at launch",
    doneTitle: "You're on the list",
    donePre: "We'll email ", donePost: " when Guard launches. We won't use it for anything else.",
    doneBtn: "Done",
    msgs: { email: "Enter a valid email address.", consent: "Tick the checkbox to continue.", rate: "Too many attempts. Please try again in a bit.", bad: "Check your email address and try again.", fail: "We couldn't save your signup right now. Please try again shortly.", net: "Couldn't connect. Check your internet connection and try again." },
  },
  legal: {
    title: "Privacy notice: Guard", desc: "Guard privacy notice", back: "Back to home page", version: "Version: v1-en",
    html: `<h1>Privacy notice</h1>
  <p>This notice explains what personal data is processed on the Guard pre-launch page, as required by the EU General Data Protection Regulation (GDPR) and similar laws.</p>
  <h2>Data controller</h2>
  <p>Yusuf Kağan Kılıç<br>Contact: <a href="mailto:support@yusufkaanklc.dev">support@yusufkaanklc.dev</a></p>
  <h2>What data we process</h2>
  <ul>
    <li><strong>Your email address and the plan you chose:</strong> only if you fill in the form and give your consent.</li>
    <li><strong>Anonymous visit information:</strong> that the page was viewed, how far it was scrolled, which buttons were pressed, the ad source you came from (UTM tags) and the device type (mobile/desktop). This is linked only to a random session ID kept for the browser session; your name, IP address or cookies are not stored.</li>
  </ul>
  <h2>Purpose and legal basis</h2>
  <p>Your email address is processed on the basis of your consent (Art. 6(1)(a) GDPR) solely to tell you when Guard launches. Anonymous visit information is processed to measure interest in the product and improve the page, based on the controller's legitimate interest (Art. 6(1)(f) GDPR).</p>
  <h2>Storage and sharing</h2>
  <p>Data is stored on a server under the controller's control and is not shared with third parties or sold. Because the site is served through Cloudflare, your IP address may be processed technically by Cloudflare while you connect. Your email address is deleted after the launch announcement, or within 12 months at the latest if the product does not launch.</p>
  <h2>Your rights</h2>
  <p>You can ask whether your data is processed, request access, correction or deletion, object to processing, withdraw your consent at any time and lodge a complaint with your data protection authority. Write to <a href="mailto:support@yusufkaanklc.dev">support@yusufkaanklc.dev</a>; we respond within 30 days.</p>
  <p class="legal-meta">Version: v1-en</p>`,
  },
};
