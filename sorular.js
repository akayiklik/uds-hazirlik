/* Tıbbi Sekreter UDS soru bankası.
   Yeni soru eklemek için ilgili konunun SONUNA bir s(...) satırı ekleyin:
   s('konu-id', 'Soru metni', ['A şıkkı','B şıkkı','C şıkkı','D şıkkı'], doğruŞıkSırası(0-3), 'Açıklama');
   Soruları araya eklemeyin ya da silmeyin; ilerleme kayıtları soru sırasına bağlıdır. */
(function () {
  var KONULAR = [
    { id: 'turkce', no: 1, ad: 'Türkçe Dil Bilgisi', grup: 'genel', ozet: [
      'Bağlaç olan "de/da" ve "ki" ayrı yazılır; ek olan "-de/-da" ve "-ki" bitişik yazılır. Cümleden çıkarınca anlam bozulmuyorsa bağlaçtır.',
      '"Hiçbir, hiçbiri, birkaç, birçok, herhangi" bitişik; "her şey, hiç kimse, bir şey" ayrı yazılır.',
      'Belirli bir tarih bildiren ay ve gün adları büyük harfle başlar: 3 Mart 2025 Pazartesi.',
      'Ünsüz yumuşaması: p, ç, t, k ile biten sözcük ünlüyle başlayan ek alınca b, c, d, ğ olur (ağaç, ağacı).',
      'Anlatım bozukluğunda en sık sorulanlar: gereksiz sözcük, özne-yüklem uyumsuzluğu, yanlış anlamda sözcük kullanımı.'
    ]},
    { id: 'genel-kultur', no: 2, ad: 'Genel Kültür', grup: 'genel', ozet: [
      'Samsun\'a çıkış 19 Mayıs 1919, TBMM\'nin açılışı 23 Nisan 1920, Cumhuriyet\'in ilanı 29 Ekim 1923.',
      'Soyadı Kanunu 1934, Türk Medeni Kanunu 1926, Harf İnkılabı 1928.',
      '1982 Anayasası: yasama yetkisi TBMM\'ye, yürütme yetkisi Cumhurbaşkanına, yargı yetkisi bağımsız ve tarafsız mahkemelere aittir.',
      'İstiklal Marşı\'nın şairi Mehmet Akif Ersoy, bestecisi Osman Zeki Üngör\'dür.',
      'Dünya Sağlık Örgütü\'nün (DSÖ) merkezi İsviçre\'nin Cenevre şehrindedir.'
    ]},
    { id: 'mevzuat', no: 3, ad: '657 sayılı Kanun ve 1 sayılı CBK', grup: 'mevzuat', ozet: [
      '657 temel ilkeler (md. 3): sınıflandırma, kariyer, liyakat.',
      'Adaylık süresi bir yıldan az, iki yıldan çok olamaz (md. 54).',
      'Yıllık izin: hizmeti 1 yıldan 10 yıla kadar (10 yıl dahil) olanlar için 20 gün, 10 yıldan fazla olanlar için 30 gün (md. 102).',
      'Mazeret izinleri (md. 104): evlilik 7 gün, eşin doğum yapması 10 gün, yakın ölümü 7 gün.',
      'Disiplin cezaları (md. 125): uyarma, kınama, aylıktan kesme, kademe ilerlemesinin durdurulması, Devlet memurluğundan çıkarma. Görevden uzaklaştırma ceza değil, tedbirdir.',
      '1 sayılı CBK: Sağlık Bakanlığının görevleri 352. maddede sayılır; Bakanlık merkez ve taşra teşkilatından oluşur (md. 353).'
    ]},
    { id: 'dokumantasyon', no: 4, ad: 'Tıbbi Dokümantasyon', grup: 'alan', ozet: [
      'Tıbbi dokümantasyon: hastaya ait tıbbi bilgilerin toplanması, düzenlenmesi, saklanması ve gerektiğinde kullanıma sunulmasıdır.',
      'Hasta dosyası kurumun malıdır; içindeki bilgi hastaya aittir.',
      'Anamnez hastalık öyküsü, epikriz ise yatıştan çıkışa kadar olan süreci özetleyen çıkış özetidir.',
      'Kayıttaki hata silinmez, karalanmaz: üzeri tek çizgiyle çizilir, doğrusu yazılır, tarih atılıp paraflanır.',
      'Merkezi dosyalamada her hastanın tek dosyası olur; bilgi bütünlüğü sağlanır.'
    ]},
    { id: 'terminoloji', no: 5, ad: 'Tıbbi Terminoloji', grup: 'alan', ozet: [
      'Son ekler: -itis iltihap, -ektomi cerrahi çıkarma, -oma tümör, -algia ağrı, -uria idrarla ilgili durum.',
      'Kökler: hepat- karaciğer, nefr-/ren- böbrek, gastr- mide, kardi- kalp, oste- kemik, derm- deri.',
      'Ön ekler: hiper- fazla/yüksek, hipo- az/düşük, taşi- hızlı, bradi- yavaş, dis- güçlük/bozukluk, a-/an- yokluk.',
      'Dispne nefes darlığı, taşikardi kalp hızının artması, hematüri idrarda kan, hipertansiyon yüksek tansiyon.'
    ]},
    { id: 'sekreterlik', no: 6, ad: 'Tıbbi Sekreterlik Teknikleri', grup: 'alan', ozet: [
      'Tıbbi sekreter hasta kabul, kayıt, randevu, yazışma, raporlama ve dosyalama işlerini yürütür; tanı koymaz, tedavi düzenlemez.',
      'Telefona çıkınca önce kurum/birim ve kendi adı söylenir; not alınırken arayan, konu, tarih-saat ve dönüş numarası yazılır.',
      'Zaman yönetiminin özü işleri önem ve aciliyete göre sıralamaktır.',
      'HBYS: Hastane Bilgi Yönetim Sistemi.'
    ]},
    { id: 'halkla-iliskiler', no: 7, ad: 'Halkla İlişkiler', grup: 'alan', ozet: [
      'Halkla ilişkiler, kurum ile hedef kitlesi arasında karşılıklı anlayış ve güvene dayalı, iki yönlü iletişim sürecidir.',
      'Süreç sırası: araştırma, planlama, uygulama, değerlendirme.',
      'İletişimin ögeleri: kaynak, mesaj, kanal, alıcı, geri bildirim.',
      'İç hedef kitle kurum çalışanlarıdır; dış hedef kitle hastalar, hasta yakınları, basın ve toplumdur.',
      'Empati, kendini karşıdakinin yerine koyarak onun duygu ve düşüncelerini anlamaktır.'
    ]},
    { id: 'on-parmak', no: 8, ad: 'On Parmak Yazım Teknikleri', grup: 'alan', ozet: [
      'F klavye Türkçe için geliştirilmiş standart klavyedir (İhsan Sıtkı Yener, 1955).',
      'F klavyede temel sıra: sol el U İ E A, sağ el K M L Y. İşaret parmakları A ve K tuşlarında durur; bu tuşlarda kabartı vardır.',
      'Boşluk tuşuna başparmakla basılır. Büyük harf için, harfi yazan elin karşısındaki elin serçe parmağıyla Shift tutulur.',
      'Yazarken klavyeye değil metne ya da ekrana bakılır; dik oturulur, ayaklar yere tam basar.'
    ]},
    { id: 'etik', no: 9, ad: 'Meslek Etiği', grup: 'alan', ozet: [
      'Etik, neyin doğru neyin yanlış olduğunu inceleyen ahlak felsefesidir; deontoloji meslek ödevleri bilgisidir.',
      'Hasta bilgileri sırdır; sır saklama yükümlülüğü görevden ayrıldıktan ve hasta öldükten sonra da sürer.',
      'Sağlık verileri 6698 sayılı Kişisel Verilerin Korunması Kanunu\'na göre özel nitelikli kişisel veridir.',
      'Temel ilkeler: adalet, eşitlik, dürüstlük, tarafsızlık, gizlilik, sorumluluk. Kayırmacılık ve çıkar sağlama etik dışıdır.'
    ]},
    { id: 'yazisma', no: 10, ad: 'Yazışma Teknikleri', grup: 'alan', ozet: [
      'Resmî yazılar A4 (210x297 mm) boyutunda hazırlanır; yazı tipi Times New Roman veya Arial\'dir.',
      'Üst makama "arz ederim", alt ve aynı düzeydeki makama "rica ederim", ikisine birden yazılıyorsa "arz ve rica ederim".',
      '"İlgi", yazının bağlantılı olduğu önceki belgeleri gösterir.',
      'Gizlilik dereceleri: Çok Gizli, Gizli, Özel, Hizmete Özel.',
      'Elektronik ortamdaki resmî yazılar güvenli elektronik imza ile imzalanır.'
    ]},
    { id: 'diksiyon', no: 11, ad: 'Güzel Konuşma ve Diksiyon', grup: 'alan', ozet: [
      'Diksiyon, sözcükleri doğru, anlaşılır ve kurallarına uygun söyleme sanatıdır.',
      'Boğumlanma (artikülasyon), seslerin ses organlarıyla doğru ve eksiksiz çıkarılmasıdır.',
      'Türkçede vurgu genellikle son hecededir; yer adlarında çoğunlukla baştaki hecelere kayar (Ankara).',
      'Doğru nefes diyafram nefesidir. Ulama, ünsüzle biten sözcüğün ünlüyle başlayan sözcüğe bağlanarak okunmasıdır.'
    ]},
    { id: 'arsiv', no: 12, ad: 'Dosyalama Arşivleme', grup: 'alan', ozet: [
      'Birim arşivi: güncelliğini koruyan belgelerin 1-5 yıl saklandığı arşiv. Kurum arşivi: belgelerin 10-14 yıl saklandığı merkezi arşiv.',
      'Dosyalama sistemleri: alfabetik, numerik, kronolojik (tarih sırası), coğrafi, konu esaslı.',
      'Standart Dosya Planı, belgelerin konularına göre aynı kodlarla dosyalanmasını sağlar.',
      'Ayıklama, saklama süresi dolan ve arşiv değeri olmayan belgelerin ayrılmasıdır; imha komisyon kararıyla yapılır.'
    ]},
    { id: 'icd', no: 13, ad: 'Hastalıkların Uluslararası Sınıflandırması', grup: 'alan', ozet: [
      'ICD: International Classification of Diseases. Dünya Sağlık Örgütü yayımlar.',
      'ICD-10 kodları alfanümeriktir: bir harf ve ardından rakamlar (örnek: J45).',
      'Bazı bölümler: A00-B99 enfeksiyon ve paraziter hastalıklar, I00-I99 dolaşım sistemi, J00-J99 solunum sistemi.',
      'Kodlamanın amacı hastalık ve ölüm istatistiklerini karşılaştırılabilir kılmak, planlama ve geri ödemeye veri sağlamaktır.',
      'ICD-11, 1 Ocak 2022\'de yürürlüğe girmiştir.'
    ]}
  ];

  var S = [];
  function s(k, soru, o, d, a) { S.push({ k: k, s: soru, o: o, d: d, a: a }); }

  // 1 Türkçe Dil Bilgisi
  s('turkce', 'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?', ['Toplantı pazartesi günü yapılacak.', 'Herkes görevini eksiksiz yaptı.', 'Bu konuda hiç birimiz bilgilendirilmedik.', 'Türk Dil Kurumu yeni bir sözlük yayımladı.'], 2, '"Hiçbirimiz" bitişik yazılır.');
  s('turkce', 'Aşağıdaki cümlelerin hangisinde "de" bağlacının yazımı yanlıştır?', ['Raporu ben de okudum.', 'Hasta kabulde bekleyenlerde vardı.', 'Sen de gelecek misin?', 'Evrakı imzaladı da göndermedi.'], 1, 'Bağlaç olan "de" ayrı yazılır: "bekleyenler de vardı".');
  s('turkce', 'Aşağıdaki sözcüklerin hangisinde ünsüz yumuşaması vardır?', ['kitapçı', 'ağacı', 'sınıfta', 'gözlük'], 1, '"Ağaç" sözcüğü ünlüyle başlayan ek alınca ç sesi c\'ye dönüşmüştür.');
  s('turkce', 'Aşağıdaki cümlelerin hangisinde gereksiz sözcük kullanımından kaynaklanan anlatım bozukluğu vardır?', ['Yaklaşık yüz kadar dosya incelendi.', 'Dosyalar dün arşive gönderildi.', 'Toplantı saat onda başlayacak.', 'Raporu müdür yardımcısı imzaladı.'], 0, '"Yaklaşık" ve "kadar" aynı anlamı verir; biri gereksizdir.');
  s('turkce', 'Aşağıdaki cümlelerin hangisinin sonuna soru işareti konmalıdır?', ['Raporun ne zaman biteceğini bilmiyorum', 'Toplantıya kimlerin katılacağı belli değil', 'Dosyayı arşive sen mi kaldırdın', 'Nereye gittiğini söylemedi'], 2, 'Yalnızca bu cümle soru anlamı taşır; diğerlerinde soru sözcükleri cümleye soru anlamı katmamıştır.');
  s('turkce', 'Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili yanlışlık vardır?', ['Sağlık Bakanlığı yeni bir genelge yayımladı.', 'Yazıyı 3 mart 2025\'te gönderdik.', 'Sınavı Ankara Üniversitesi yapacak.', 'Bu yaz Ege\'ye gideceğiz.'], 1, 'Belirli bir tarih bildiren ay adları büyük harfle başlar: 3 Mart 2025.');
  s('turkce', '"Sekreter, hasta dosyalarını dün arşive teslim etti." cümlesinde "dün" sözcüğü hangi ögedir?', ['Özne', 'Belirtili nesne', 'Zarf tümleci', 'Dolaylı tümleç'], 2, '"Dün" yüklemi zaman yönünden tamamlar; zarf tümlecidir.');
  s('turkce', 'Aşağıdaki cümlelerin hangisinde "ki"nin yazımı yanlıştır?', ['Duydum ki unutmuşsun.', 'Masadaki dosya senin mi?', 'Benimki daha yeni.', 'Öyle yoruldumki anlatamam.'], 3, 'Bağlaç olan "ki" ayrı yazılır: "yoruldum ki".');

  // 2 Genel Kültür
  s('genel-kultur', 'Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?', ['19 Mayıs 1919', '23 Nisan 1920', '30 Ağustos 1922', '29 Ekim 1923'], 1, 'TBMM 23 Nisan 1920\'de Ankara\'da açılmıştır.');
  s('genel-kultur', 'Cumhuriyet hangi tarihte ilan edilmiştir?', ['23 Nisan 1920', '24 Temmuz 1923', '29 Ekim 1923', '3 Mart 1924'], 2, 'Cumhuriyet 29 Ekim 1923\'te ilan edilmiştir.');
  s('genel-kultur', '1982 Anayasası\'na göre yasama yetkisi kime aittir?', ['Cumhurbaşkanına', 'Türkiye Büyük Millet Meclisine', 'Anayasa Mahkemesine', 'Danıştaya'], 1, 'Yasama yetkisi Türk Milleti adına TBMM\'nindir ve devredilemez.');
  s('genel-kultur', 'İstiklal Marşı\'nın şairi kimdir?', ['Namık Kemal', 'Ziya Gökalp', 'Mehmet Akif Ersoy', 'Yahya Kemal Beyatlı'], 2, 'İstiklal Marşı\'nı Mehmet Akif Ersoy yazmıştır.');
  s('genel-kultur', 'Tamamı Türkiye sınırları içinde olan en uzun akarsu hangisidir?', ['Fırat', 'Sakarya', 'Kızılırmak', 'Yeşilırmak'], 2, 'Kızılırmak, Türkiye topraklarında doğup Türkiye\'den denize dökülen en uzun akarsudur.');
  s('genel-kultur', 'Mustafa Kemal Paşa Samsun\'a hangi tarihte çıkmıştır?', ['19 Mayıs 1919', '22 Haziran 1919', '23 Temmuz 1919', '4 Eylül 1919'], 0, '19 Mayıs 1919, Millî Mücadele\'nin başlangıcı kabul edilir.');
  s('genel-kultur', 'Soyadı Kanunu hangi yıl kabul edilmiştir?', ['1926', '1928', '1930', '1934'], 3, 'Soyadı Kanunu 1934\'te kabul edilmiştir.');
  s('genel-kultur', 'Dünya Sağlık Örgütü\'nün merkezi hangi şehirdedir?', ['New York', 'Cenevre', 'Paris', 'Brüksel'], 1, 'DSÖ\'nün merkezi İsviçre\'nin Cenevre şehrindedir.');

  // 3 Mevzuat
  s('mevzuat', 'Aşağıdakilerden hangisi 657 sayılı Devlet Memurları Kanunu\'nun temel ilkelerinden biri değildir?', ['Sınıflandırma', 'Kariyer', 'Liyakat', 'Kıdem'], 3, 'Kanunun 3. maddesindeki temel ilkeler sınıflandırma, kariyer ve liyakattir.');
  s('mevzuat', '657 sayılı Kanun\'a göre aday memurluk süresi için aşağıdakilerden hangisi doğrudur?', ['Altı aydan az, bir yıldan çok olamaz', 'Bir yıldan az, iki yıldan çok olamaz', 'Bir yıldan az, üç yıldan çok olamaz', 'İki yıldan az, üç yıldan çok olamaz'], 1, 'Madde 54: adaylık süresi bir yıldan az, iki yıldan çok olamaz.');
  s('mevzuat', '657 sayılı Kanun\'a göre hizmeti 12 yıl olan bir memurun yıllık izin süresi kaç gündür?', ['15 gün', '20 gün', '30 gün', '45 gün'], 2, 'Madde 102: hizmeti on yıldan fazla olanların yıllık izni 30 gündür; 1-10 yıl arası için 20 gündür.');
  s('mevzuat', 'Aşağıdakilerden hangisi 657 sayılı Kanun\'da sayılan disiplin cezalarından biri değildir?', ['Uyarma', 'Kınama', 'Aylıktan kesme', 'Görevden uzaklaştırma'], 3, 'Görevden uzaklaştırma bir disiplin cezası değil, ihtiyati bir tedbirdir.');
  s('mevzuat', '657 sayılı Kanun\'a göre eşi doğum yapan memura isteği üzerine kaç gün babalık izni verilir?', ['3 gün', '5 gün', '7 gün', '10 gün'], 3, 'Madde 104: eşinin doğum yapması hâlinde memura on gün babalık izni verilir.');
  s('mevzuat', '657 sayılı Kanun\'a göre izinsiz veya kabul edilen mazereti olmaksızın görevi kesintisiz kaç gün terk eden memur çekilme isteğinde bulunmuş sayılır?', ['3 gün', '5 gün', '10 gün', '20 gün'], 2, 'Madde 94: görevin terk edilmesi ve bu terkin kesintisiz 10 gün devam etmesi hâlinde çekilme isteğinde bulunulmuş sayılır.');
  s('mevzuat', '1 sayılı Cumhurbaşkanlığı Kararnamesi\'ne göre Sağlık Bakanlığı teşkilatı aşağıdakilerden hangisinde doğru verilmiştir?', ['Yalnızca merkez teşkilatı', 'Merkez ve taşra teşkilatı', 'Merkez, taşra ve yurt dışı teşkilatı', 'Merkez teşkilatı ve bağlı kuruluşlar'], 1, 'Madde 353: Sağlık Bakanlığı merkez ve taşra teşkilatından oluşur.');
  s('mevzuat', '1 sayılı Cumhurbaşkanlığı Kararnamesi\'ne göre ilaç fiyatlarının belirlenmesine ilişkin usul ve esaslar, Bakanlığın teklifi üzerine kim tarafından belirlenir?', ['Sağlık Bakanı', 'Cumhurbaşkanı', 'Türkiye İlaç ve Tıbbi Cihaz Kurumu', 'Hazine ve Maliye Bakanlığı'], 1, 'Madde 352/2: usul ve esaslar Bakanlığın teklifi üzerine Cumhurbaşkanınca belirlenir.');

  // 4 Tıbbi Dokümantasyon
  s('dokumantasyon', 'Tıbbi dokümantasyonun tanımı aşağıdakilerden hangisidir?', ['Hastalıkların tanı ve tedavisinin yapılması', 'Hastaya ait tıbbi bilgilerin toplanması, düzenlenmesi, saklanması ve kullanıma sunulması', 'Sağlık personelinin özlük dosyalarının tutulması', 'Hastane giderlerinin muhasebeleştirilmesi'], 1, 'Tıbbi dokümantasyon, tıbbi bilgi ve belgelerin toplanıp düzenlenerek gerektiğinde kullanıma sunulmasıdır.');
  s('dokumantasyon', 'Hasta dosyasının sahipliği ile ilgili aşağıdakilerden hangisi doğrudur?', ['Dosya da içindeki bilgi de hekime aittir', 'Dosya kuruma, içindeki bilgi hastaya aittir', 'Dosya hastaya, içindeki bilgi kuruma aittir', 'Dosya ve bilgi tıbbi sekretere aittir'], 1, 'Dosyanın kendisi sağlık kurumunun malıdır; içerdiği bilgi hastaya aittir.');
  s('dokumantasyon', 'Hastanın yatışından taburcu oluşuna kadar geçen sürecin özetlendiği belge hangisidir?', ['Anamnez', 'Epikriz', 'Konsültasyon formu', 'Order'], 1, 'Epikriz, çıkış özetidir.');
  s('dokumantasyon', 'Hastanın şikâyetleri, özgeçmişi ve soygeçmişini içeren hastalık öyküsüne ne ad verilir?', ['Anamnez', 'Prognoz', 'Epikriz', 'Otopsi'], 0, 'Anamnez, hastadan ya da yakınından alınan hastalık öyküsüdür.');
  s('dokumantasyon', 'Hasta kaydına yanlış bilgi yazıldığında doğru düzeltme yöntemi hangisidir?', ['Yanlış bilgi silinir ve yerine doğrusu yazılır', 'Sayfa yırtılıp yeniden yazılır', 'Yanlışın üzeri okunacak şekilde tek çizgiyle çizilir, doğrusu yazılıp tarih atılarak paraflanır', 'Yanlışın üzeri okunmayacak şekilde karalanır'], 2, 'Kayıtlar yasal belgedir; yanlış bilgi okunur kalmalı, düzeltmeyi yapan belli olmalıdır.');
  s('dokumantasyon', 'Tıbbi bir girişim öncesinde hastanın bilgilendirilerek rızasının alındığını gösteren belge hangisidir?', ['Epikriz', 'Aydınlatılmış onam formu', 'Sevk formu', 'Hasta kabul kâğıdı'], 1, 'Aydınlatılmış onam, hastanın bilgilendirildikten sonra verdiği rızadır.');
  s('dokumantasyon', 'Merkezi dosyalama sisteminin en önemli üstünlüğü hangisidir?', ['Her klinikte ayrı dosya tutulması', 'Her hasta için tek dosya tutulması ve bilgi bütünlüğünün sağlanması', 'Dosyaların hastada saklanması', 'Arşiv personeline ihtiyaç kalmaması'], 1, 'Merkezi sistemde hastanın tüm kayıtları tek dosyada toplanır.');
  s('dokumantasyon', 'Aşağıdakilerden hangisi hasta dosyasının kullanım amaçlarından biri değildir?', ['Hasta bakımının sürekliliğini sağlamak', 'Hukuki delil oluşturmak', 'Eğitim ve araştırmaya kaynak olmak', 'Hasta bilgilerini reklam amacıyla paylaşmak'], 3, 'Hasta bilgileri gizlidir; reklam amacıyla paylaşılamaz.');

  // 5 Tıbbi Terminoloji
  s('terminoloji', '"-itis" son eki hangi anlamı taşır?', ['Tümör', 'İltihap', 'Ağrı', 'Kanama'], 1, '-itis iltihap anlamına gelir (örnek: gastritis).');
  s('terminoloji', '"Hepat-" kökü hangi organı ifade eder?', ['Böbrek', 'Mide', 'Karaciğer', 'Akciğer'], 2, 'Hepat- karaciğer demektir (hepatit: karaciğer iltihabı).');
  s('terminoloji', '"-ektomi" son eki hangi anlamı taşır?', ['Bir organın cerrahi olarak çıkarılması', 'Bir organa ağız açılması', 'Görüntüleme', 'Dikme'], 0, '-ektomi cerrahi çıkarma demektir (apendektomi).');
  s('terminoloji', '"Taşikardi" teriminin anlamı nedir?', ['Kalp hızının yavaşlaması', 'Kalp hızının artması', 'Solunumun durması', 'Tansiyonun düşmesi'], 1, 'Taşi- hızlı, kardi- kalp demektir.');
  s('terminoloji', '"Nefr-" kökü hangi organı ifade eder?', ['Sinir', 'Böbrek', 'Burun', 'Kas'], 1, 'Nefr- böbrek demektir (nefrit: böbrek iltihabı).');
  s('terminoloji', '"Dispne" teriminin anlamı nedir?', ['Yutma güçlüğü', 'Nefes darlığı', 'Sindirim güçlüğü', 'Ağrılı idrar yapma'], 1, 'Dispne solunum güçlüğü, nefes darlığıdır.');
  s('terminoloji', '"Hematüri" teriminin anlamı nedir?', ['Kan kusma', 'İdrarda kan bulunması', 'Kanda şeker yüksekliği', 'Burun kanaması'], 1, 'Hemat- kan, -üri idrar demektir.');
  s('terminoloji', '"Hipertansiyon" teriminin anlamı nedir?', ['Düşük kan basıncı', 'Yüksek kan basıncı', 'Yüksek ateş', 'Düşük kan şekeri'], 1, 'Hiper- yüksek/fazla demektir; hipertansiyon yüksek kan basıncıdır.');

  // 6 Tıbbi Sekreterlik Teknikleri
  s('sekreterlik', 'Aşağıdakilerden hangisi tıbbi sekreterin görevlerinden biri değildir?', ['Hasta kabul ve kayıt işlemlerini yapmak', 'Randevuları düzenlemek', 'Hastaya tanı koyup tedavi düzenlemek', 'Tıbbi raporları yazmak'], 2, 'Tanı ve tedavi hekimin görevidir.');
  s('sekreterlik', 'Kuruma gelen telefona yanıt verirken ilk yapılması gereken nedir?', ['Arayanın kim olduğunu sormak', 'Kurumu ya da birimi ve kendini tanıtmak', 'Arayanı beklemeye almak', 'Aramayı ilgili kişiye aktarmak'], 1, 'Önce kurum/birim ve görevlinin adı söylenir.');
  s('sekreterlik', 'Hasta kabul işlemlerinde ilk adım hangisidir?', ['Hastayı kliniğe yatırmak', 'Hastanın kimlik bilgilerini doğrulayıp kaydını yapmak', 'Epikriz düzenlemek', 'Hastayı taburcu etmek'], 1, 'Tüm işlemler doğru kimlik ve kayıt üzerine kurulur.');
  s('sekreterlik', 'Zaman yönetiminde temel yaklaşım aşağıdakilerden hangisidir?', ['İşleri geliş sırasına göre yapmak', 'İşleri önem ve aciliyetine göre sıralamak', 'Kolay işleri öne almak', 'Tüm işleri aynı anda yürütmek'], 1, 'Önceliklendirme, zaman yönetiminin temelidir.');
  s('sekreterlik', 'Yöneticisi yerinde yokken alınan telefon notunda aşağıdakilerden hangisinin bulunması gerekmez?', ['Arayanın adı ve kurumu', 'Aramanın tarihi ve saati', 'Sekreterin arayan hakkındaki kişisel yorumu', 'Geri dönüş için telefon numarası'], 2, 'Not nesnel olmalı; kişisel yorum içermemelidir.');
  s('sekreterlik', 'HBYS kısaltmasının açılımı nedir?', ['Hasta Bakım Yönetim Sistemi', 'Hastane Bilgi Yönetim Sistemi', 'Hekim Bilgi Yönlendirme Sistemi', 'Hastane Bütçe Yönetim Sistemi'], 1, 'HBYS: Hastane Bilgi Yönetim Sistemi.');
  s('sekreterlik', 'Birime gelen resmî evrak için ilk yapılacak işlem hangisidir?', ['Dosyalamak', 'Kayda almak', 'Cevap yazmak', 'İmha etmek'], 1, 'Gelen evrak önce kaydedilir, sonra ilgili kişiye ya da birime havale edilir.');
  s('sekreterlik', 'Randevu planlamasında aşağıdakilerden hangisi yanlıştır?', ['Randevular kayıt altına alınır', 'Değişiklikler ilgililere zamanında bildirilir', 'Aynı saate bilerek birden fazla randevu verilir', 'Görüşme süreleri dikkate alınır'], 2, 'Çakışan randevu hem hastayı hem hekimi mağdur eder.');

  // 7 Halkla İlişkiler
  s('halkla-iliskiler', 'Halkla ilişkilerin en doğru tanımı hangisidir?', ['Kurumun ürünlerini satma çabası', 'Kurum ile hedef kitlesi arasında karşılıklı anlayış ve güvene dayalı iki yönlü iletişim', 'Yalnızca basın bülteni hazırlama işi', 'Kurum içi disiplinin sağlanması'], 1, 'Halkla ilişkiler iki yönlüdür ve güven oluşturmayı amaçlar.');
  s('halkla-iliskiler', 'İletişim sürecinde alıcının kaynağa verdiği tepkiye ne ad verilir?', ['Kanal', 'Mesaj', 'Geri bildirim', 'Kodlama'], 2, 'Geri bildirim (feedback), alıcının mesaja verdiği karşılıktır.');
  s('halkla-iliskiler', 'Bir kişinin kendisini karşısındakinin yerine koyarak onun duygu ve düşüncelerini anlamasına ne denir?', ['Sempati', 'Empati', 'Antipati', 'Önyargı'], 1, 'Empati, karşıdakinin bakış açısından bakabilmektir.');
  s('halkla-iliskiler', 'Aşağıdakilerden hangisi sözsüz iletişim örneğidir?', ['Telefon görüşmesi', 'Resmî yazı', 'Jest ve mimikler', 'Toplantı konuşması'], 2, 'Jest, mimik, duruş ve göz teması sözsüz iletişim araçlarıdır.');
  s('halkla-iliskiler', 'Bir hastanenin iç hedef kitlesi aşağıdakilerden hangisidir?', ['Hastalar', 'Hasta yakınları', 'Basın mensupları', 'Hastane çalışanları'], 3, 'İç hedef kitle kurumun kendi çalışanlarıdır.');
  s('halkla-iliskiler', 'Öfkeli bir hasta yakınıyla karşılaşan tıbbi sekreterin ilk tutumu ne olmalıdır?', ['Aynı ses tonuyla karşılık vermek', 'Sözünü kesmeden sakin biçimde dinlemek', 'Görmezden gelmek', 'Hemen güvenlik çağırmak'], 1, 'Önce dinlemek gerginliği azaltır ve sorunun anlaşılmasını sağlar.');
  s('halkla-iliskiler', 'Halkla ilişkiler sürecinin ilk aşaması hangisidir?', ['Planlama', 'Uygulama', 'Araştırma', 'Değerlendirme'], 2, 'Sıra: araştırma, planlama, uygulama, değerlendirme.');
  s('halkla-iliskiler', 'Aşağıdakilerden hangisi etkin dinlemeye aykırıdır?', ['Göz teması kurmak', 'Anladığını geri bildirimle göstermek', 'Dinlerken başka işle uğraşmak', 'Konuşanın sözünü kesmemek'], 2, 'Etkin dinleme dikkatin tümüyle konuşana verilmesini gerektirir.');

  // 8 On Parmak
  s('on-parmak', 'Türkçenin yapısına göre geliştirilmiş standart klavye hangisidir?', ['Q klavye', 'F klavye', 'Dvorak klavye', 'AZERTY klavye'], 1, 'F klavye Türkçe için geliştirilmiştir.');
  s('on-parmak', 'F klavyede sol elin temel sıra harfleri hangileridir?', ['A S D F', 'U İ E A', 'K M L Y', 'F G Ğ I'], 1, 'Sol el U İ E A, sağ el K M L Y tuşlarında durur.');
  s('on-parmak', 'F klavyede işaret parmaklarının yerini bulmayı sağlayan kabartılı tuşlar hangileridir?', ['F ve J', 'A ve K', 'U ve Y', 'E ve M'], 1, 'F klavyede kabartılar A ve K tuşlarındadır.');
  s('on-parmak', 'On parmak yazımda boşluk tuşuna hangi parmakla basılır?', ['İşaret parmağı', 'Orta parmak', 'Serçe parmak', 'Başparmak'], 3, 'Boşluk tuşuna başparmakla basılır.');
  s('on-parmak', 'On parmak yazım sırasında gözler nereye bakmalıdır?', ['Klavyeye', 'Parmaklara', 'Yazılan metne ya da ekrana', 'Fareye'], 2, 'Klavyeye bakmadan yazmak tekniğin temelidir.');
  s('on-parmak', 'Sol elle yazılan bir harfi büyük yazmak için Shift tuşuna hangi parmakla basılır?', ['Sol el serçe parmağı', 'Sağ el serçe parmağı', 'Sağ el başparmağı', 'Sol el işaret parmağı'], 1, 'Harfi yazan elin karşısındaki elin serçe parmağı Shift tuşunu tutar.');
  s('on-parmak', 'Klavye başında doğru oturuş için aşağıdakilerden hangisi yanlıştır?', ['Sırt dik tutulur', 'Ayaklar yere tam basar', 'Bilekler masaya yaslanıp sabitlenir', 'Dirsekler gövdeye yakın durur'], 2, 'Bilekler serbest olmalıdır; yaslanmak hızı düşürür ve yorar.');
  s('on-parmak', 'F klavyeyi geliştiren kişi kimdir?', ['İhsan Sıtkı Yener', 'Christopher Sholes', 'August Dvorak', 'Agâh Sırrı Levend'], 0, 'F klavye 1955\'te İhsan Sıtkı Yener tarafından geliştirilmiştir.');

  // 9 Meslek Etiği
  s('etik', 'Neyin doğru, neyin yanlış olduğunu inceleyen ahlak felsefesine ne ad verilir?', ['Etik', 'Estetik', 'Mantık', 'Retorik'], 0, 'Etik, ahlaki değerleri inceleyen felsefe dalıdır.');
  s('etik', 'Tıbbi sekreterin hasta bilgilerini yetkisiz kişilerle paylaşmaması hangi ilkeyle ilgilidir?', ['Verimlilik', 'Gizlilik', 'Rekabet', 'Hiyerarşi'], 1, 'Hasta bilgileri sırdır; gizlilik ilkesi gereği korunur.');
  s('etik', 'Aşağıdakilerden hangisi etik dışı bir davranıştır?', ['Dürüstlük', 'Tarafsızlık', 'Kayırmacılık', 'Sorumluluk'], 2, 'Kayırmacılık, adalet ve eşitlik ilkelerine aykırıdır.');
  s('etik', 'Sır saklama yükümlülüğü ile ilgili aşağıdakilerden hangisi doğrudur?', ['Mesai bitince sona erer', 'Hasta taburcu olunca sona erer', 'Görevden ayrıldıktan ve hasta öldükten sonra da devam eder', 'Yalnızca hekimler için geçerlidir'], 2, 'Yükümlülük süresizdir ve tüm sağlık çalışanlarını kapsar.');
  s('etik', 'Hastalara dil, din, ırk, cinsiyet ayrımı yapmadan eşit hizmet verilmesi hangi ilkenin gereğidir?', ['Adalet', 'Gizlilik', 'Özerklik', 'Verimlilik'], 0, 'Adalet ilkesi eşit ve ayrımsız hizmeti gerektirir.');
  s('etik', 'Sağlık verileri 6698 sayılı Kanun\'a göre hangi tür veridir?', ['Anonim veri', 'Özel nitelikli kişisel veri', 'Kamuya açık veri', 'Ticari veri'], 1, 'Sağlık verileri özel nitelikli kişisel verilerdendir.');
  s('etik', 'Meslek üyelerinin uyması gereken ödev ve yükümlülükleri inceleyen bilgi alanı hangisidir?', ['Deontoloji', 'Ontoloji', 'Patoloji', 'Etimoloji'], 0, 'Deontoloji, meslek ödevleri bilgisidir.');
  s('etik', 'Hasta yakınının işini öne almak için sunduğu hediyeyi kabul eden görevli hangi ilkeyi çiğnemiş olur?', ['Tarafsızlık ve dürüstlük', 'Hız', 'Tasarruf', 'Süreklilik'], 0, 'Görevle ilgili çıkar sağlamak etik dışıdır.');

  // 10 Yazışma Teknikleri
  s('yazisma', 'Resmî yazılar hangi boyuttaki kâğıda hazırlanır?', ['A3', 'A4', 'A5', 'B5'], 1, 'Resmî yazılar A4 (210x297 mm) boyutundadır.');
  s('yazisma', 'Resmî yazılarda kullanılan yazı tipleri hangileridir?', ['Calibri veya Verdana', 'Times New Roman veya Arial', 'Tahoma veya Cambria', 'Courier veya Georgia'], 1, 'Yönetmelik Times New Roman veya Arial kullanılmasını öngörür.');
  s('yazisma', 'Resmî yazıda "İlgi" bölümü neyi gösterir?', ['Yazının gönderildiği makamı', 'Yazının bağlantılı olduğu önceki belgeleri', 'Yazının eklerini', 'Yazıyı hazırlayanı'], 1, 'İlgi, yazının dayandığı ya da cevap verdiği belgeleri belirtir.');
  s('yazisma', 'Aşağıdakilerden hangisi gizlilik derecelerinden biri değildir?', ['Çok Gizli', 'Hizmete Özel', 'Özel', 'Günlüdür'], 3, '"Günlüdür" bir süre ibaresidir; gizlilik dereceleri Çok Gizli, Gizli, Özel ve Hizmete Özel\'dir.');
  s('yazisma', 'Üst makama yazılan resmî yazı hangi ifadeyle bitirilir?', ['Rica ederim', 'Arz ederim', 'Bilgilerinize', 'Saygılarımla'], 1, 'Üst makama "arz ederim", alt ve eş düzey makama "rica ederim" yazılır.');
  s('yazisma', 'Hem üst hem alt makamlara birlikte gönderilen yazı hangi ifadeyle bitirilir?', ['Arz ederim', 'Rica ederim', 'Arz ve rica ederim', 'Bilgi edinilmesini dilerim'], 2, 'Dağıtımlı yazılarda "arz ve rica ederim" kullanılır.');
  s('yazisma', 'Elektronik ortamda hazırlanan resmî yazılar nasıl imzalanır?', ['Taranmış ıslak imza ile', 'Güvenli elektronik imza ile', 'Yalnızca paraf ile', 'Mühür ile'], 1, 'Elektronik belgeler güvenli elektronik imza ile imzalanır.');
  s('yazisma', 'Resmî yazıyı hazırlayan ve kontrol eden görevlilerin attığı kısa imzaya ne ad verilir?', ['Onay', 'Paraf', 'Tasdik', 'Şerh'], 1, 'Paraf, yazının hazırlanması ve kontrolünde atılan kısaltılmış imzadır.');

  // 11 Diksiyon
  s('diksiyon', 'Diksiyonun tanımı hangisidir?', ['Hızlı konuşma becerisi', 'Sözcükleri doğru, anlaşılır ve kurallarına uygun söyleme sanatı', 'Yazı yazma tekniği', 'Yabancı sözcük kullanma becerisi'], 1, 'Diksiyon, doğru ve güzel söyleyiş bilgisidir.');
  s('diksiyon', 'Seslerin ses organları yardımıyla doğru ve eksiksiz çıkarılmasına ne denir?', ['Tonlama', 'Vurgu', 'Boğumlanma', 'Ulama'], 2, 'Boğumlanmanın diğer adı artikülasyondur.');
  s('diksiyon', 'Türkçe sözcüklerde vurgu genellikle hangi hecededir?', ['İlk hecede', 'Ortadaki hecede', 'Son hecede', 'Her hecede eşit'], 2, 'Türkçede sözcük vurgusu çoğunlukla son hecededir.');
  s('diksiyon', '"Ankara" gibi yer adlarında vurgu genellikle nerededir?', ['Son hecede', 'Baştaki hecelerde', 'Vurgu yoktur', 'Her hecede'], 1, 'Yer adlarında vurgu son heceden başa doğru kayar.');
  s('diksiyon', 'Güzel konuşma için en uygun nefes türü hangisidir?', ['Göğüs nefesi', 'Omuz nefesi', 'Diyafram nefesi', 'Ağız nefesi'], 2, 'Diyafram nefesi sesi destekler ve konuşmacıyı yormaz.');
  s('diksiyon', 'Ünsüzle biten bir sözcüğün ünlüyle başlayan sözcüğe bağlanarak okunmasına ne denir?', ['Ulama', 'Durak', 'Vurgu', 'Kekeleme'], 0, 'Ulama örneği: "evrak aldım" söylenirken "evra-kaldım" biçiminde bağlanır.');
  s('diksiyon', 'Konuşmada sesin anlam ve duyguya göre yükselip alçalmasına ne denir?', ['Boğumlanma', 'Tonlama', 'Ulama', 'Pelteklik'], 1, 'Tonlama konuşmaya anlam ve canlılık katar.');
  s('diksiyon', 'Konuşurken anlamı belirginleştirmek ve nefes almak için verilen kısa araya ne denir?', ['Durak', 'Vurgu', 'Ezgi', 'Ton'], 0, 'Durak, konuşmadaki kısa susuşlardır.');

  // 12 Dosyalama Arşivleme
  s('arsiv', 'Güncelliğini kaybetmemiş, günlük işlerde kullanılan belgelerin 1-5 yıl saklandığı arşiv hangisidir?', ['Birim arşivi', 'Kurum arşivi', 'Devlet arşivi', 'Özel arşiv'], 0, 'Birim arşivinde belgeler 1-5 yıl saklanır.');
  s('arsiv', 'Kurum arşivinde belgeler kaç yıl süreyle saklanır?', ['1-5 yıl', '5-9 yıl', '10-14 yıl', '15-19 yıl'], 2, 'Kurum arşivinde saklama süresi 10-14 yıldır.');
  s('arsiv', 'Belgelerin tarih sırasına göre dosyalandığı sistem hangisidir?', ['Alfabetik', 'Coğrafi', 'Kronolojik', 'Konu esaslı'], 2, 'Kronolojik dosyalamada sıralama ölçütü tarihtir.');
  s('arsiv', 'Kurumlarda belgelerin konularına göre aynı kodlarla dosyalanmasını sağlayan düzenleme hangisidir?', ['Standart Dosya Planı', 'Teşkilat şeması', 'Norm kadro cetveli', 'Görev tanımı formu'], 0, 'Standart Dosya Planı dosyalamada birlik sağlar.');
  s('arsiv', 'Saklama süresini dolduran ve arşiv değeri olmayan belgelerin ayrılması işlemine ne denir?', ['Tasnif', 'Ayıklama', 'Devir', 'Kayıt'], 1, 'Ayıklama sonucunda saklanacak ve imha edilecek belgeler ayrılır.');
  s('arsiv', 'Hasta dosyalarının hasta numarasına göre yerleştirildiği dosyalama sistemi hangisidir?', ['Alfabetik', 'Numerik', 'Coğrafi', 'Konu esaslı'], 1, 'Hastane arşivlerinde en yaygın sistem numerik dosyalamadır.');
  s('arsiv', 'Yataklı Tedavi Kurumları Tıbbi Kayıt ve Arşiv Hizmetleri Yönergesi\'ne göre hasta dosyaları en az kaç yıl saklanır?', ['5 yıl', '10 yıl', '15 yıl', '20 yıl'], 3, 'Yönergeye göre hasta dosyaları en az 20 yıl saklanır.');
  s('arsiv', 'Arşivden çıkarılan dosyanın yerine, kimin aldığını gösteren hangi araç konur?', ['Kılavuz kart', 'Dosya gömleği', 'Çıktı (ödünç) fişi ya da kartı', 'Etiket'], 2, 'Çıktı fişi dosyanın nerede olduğunun izlenmesini sağlar.');

  // 13 ICD
  s('icd', 'ICD kısaltmasının açılımı nedir?', ['International Code of Doctors', 'International Classification of Diseases', 'Internal Classification of Drugs', 'International Clinical Database'], 1, 'ICD: Hastalıkların Uluslararası Sınıflandırması.');
  s('icd', 'ICD hangi kuruluş tarafından yayımlanır?', ['UNICEF', 'Dünya Sağlık Örgütü', 'Dünya Tabipler Birliği', 'Avrupa Birliği'], 1, 'ICD\'yi Dünya Sağlık Örgütü (DSÖ/WHO) yayımlar.');
  s('icd', 'ICD-10 kodlarının yapısı nasıldır?', ['Yalnızca rakam', 'Yalnızca harf', 'Bir harf ve ardından rakamlar', 'Roma rakamları'], 2, 'ICD-10 kodları alfanümeriktir (örnek: J45).');
  s('icd', 'ICD-10\'da I00-I99 kod aralığı hangi hastalık grubunu kapsar?', ['Solunum sistemi hastalıkları', 'Dolaşım sistemi hastalıkları', 'Sindirim sistemi hastalıkları', 'Sinir sistemi hastalıkları'], 1, 'I harfi dolaşım sistemi hastalıklarını gösterir.');
  s('icd', 'ICD-10\'da J00-J99 kod aralığı hangi hastalık grubunu kapsar?', ['Solunum sistemi hastalıkları', 'Dolaşım sistemi hastalıkları', 'Deri hastalıkları', 'Göz hastalıkları'], 0, 'J harfi solunum sistemi hastalıklarını gösterir.');
  s('icd', 'ICD-10\'da A00-B99 kod aralığı hangi grubu kapsar?', ['Neoplazmlar', 'Bazı enfeksiyöz ve paraziter hastalıklar', 'Ruhsal ve davranışsal bozukluklar', 'Yaralanma ve zehirlenmeler'], 1, 'A ve B harfleri enfeksiyöz ve paraziter hastalıklara ayrılmıştır.');
  s('icd', 'Aşağıdakilerden hangisi hastalık kodlamasının amaçlarından biri değildir?', ['Hastalık ve ölüm istatistiklerini karşılaştırılabilir kılmak', 'Sağlık planlamasına veri sağlamak', 'Geri ödeme işlemlerine temel oluşturmak', 'Hastaların tedavisini hekim yerine belirlemek'], 3, 'Kodlama bir sınıflandırma ve kayıt aracıdır; tedaviyi belirlemez.');
  s('icd', 'ICD-11 hangi tarihte yürürlüğe girmiştir?', ['1 Ocak 2010', '1 Ocak 2015', '1 Ocak 2022', '1 Ocak 2025'], 2, 'ICD-11, 1 Ocak 2022\'de yürürlüğe girmiştir.');

  // Kullanıcının ChatGPT ile hazırlattığı 50 özgün soru (15.11.2026). Beşinci şık (E) hiçbir soruda doğru cevap olmadığı için çıkarıldı; sınav dört şıklı.
  s("dokumantasyon", "Hasta dosyasında kayıtların birbiriyle çelişip çelişmediğini değerlendirmek hangi denetim türüne girer?", ["Niteliksel analiz", "Maliyet analizi", "Demirbaş sayımı", "Risk haritası"], 0, "Niteliksel inceleme, kayıtların anlamı ve tutarlılığıyla ilgilidir.");
  s("dokumantasyon", "Hasta bilgilerini elektronik ortamda saklayan sistemde öncelikli güvenlik ilkesi nedir?", ["Herkese açık erişim", "Yetkiye dayalı erişim", "Ortak parola", "Kayıtsız veri silme"], 1, "Sağlık bilgisine yalnız yetkili kişiler erişmelidir.");
  s("dokumantasyon", "Bir hekimin başka branştan görüş istemesi üzerine düzenlenen belge hangisidir?", ["Epikriz", "Taburcu fişi", "Konsültasyon notu", "İrsaliye"], 2, "Konsültasyon, başka hekimden istenen uzman görüşüdür.");
  s("dokumantasyon", "Hastanın yatıştan taburculuğa kadar tedavisini özetleyen belge hangisidir?", ["Nöbet çizelgesi", "İş emri", "Stok kartı", "Epikriz"], 3, "Epikriz taburculukta klinik süreci özetler.");
  s("dokumantasyon", "Anamnez kavramı neyi ifade eder?", ["Hastanın öyküsünü", "Kan grubu kartını", "Taburcu ücretini", "Hastane bütçesini"], 0, "Anamnez, hastanın sağlık öyküsünün alınmasıdır.");
  s("sekreterlik", "HBYS kısaltması ne anlama gelir?", ["Hasta Bakım Yazılım Standardı", "Hastane Bilgi Yönetim Sistemi", "Halk Bilgilendirme Yazı Servisi", "Hızlı Başvuru Yönlendirme Sistemi"], 1, "HBYS hastane süreçlerini bilgi ortamında yönetir.");
  s("sekreterlik", "Bir hasta kaydında yanlış kişiye ait bilgi açıldığında ilk doğru yaklaşım nedir?", ["Ekranı paylaşmak", "Kaydı rastgele silmek", "İşlemi durdurup yetkiliye bildirmek", "Bütün kayıtlara bakmak"], 2, "Kimlik ve veri güvenliği için işlem durdurulup usulüne uygun düzeltilmelidir.");
  s("terminoloji", "Bel bölgesini ifade eden tıbbi kök hangisidir?", ["Cardio", "Nephro", "Hepato", "Lumbar"], 3, "Lumbar bel bölgesiyle ilişkilidir.");
  s("terminoloji", "Kanlı kusmanın tıbbi karşılığı hangisidir?", ["Hematemez", "Hemoptizi", "Hematüri", "Dispne"], 0, "Hematemez kan kusmayı ifade eder.");
  s("sekreterlik", "Tıbbi sekreterin doğrudan görevi olmayan işlem hangisidir?", ["Randevu kaydı", "Bağımsız tedavi kararı verme", "Hasta kabulü", "Resmî yazışma"], 1, "Tıbbi tedaviye bağımsız karar verme hekim yetkisindedir.");
  s("terminoloji", "Kısa süreli bayılma için kullanılan terim hangisidir?", ["Dispne", "Ödem", "Senkop", "Taşikardi"], 2, "Senkop geçici bilinç kaybıdır.");
  s("terminoloji", "Cerrahi olarak çıkarma anlamını veren sonek hangisidir?", ["-itis", "-algia", "-scopy", "-ectomy"], 3, "-ectomy cerrahi çıkarılmayı anlatır.");
  s("terminoloji", "Mideyle ilişkili tıbbi kök hangisidir?", ["Gastro", "Neuro", "Osteo", "Hepato"], 0, "Gastro mide anlamındadır.");
  s("terminoloji", "Mesanenin endoskopik incelenmesi hangisidir?", ["Artroskopi", "Sistoskopi", "Kolonoskopi", "Bronkoskopi"], 1, "Sistoskopi idrar kesesinin incelenmesidir.");
  s("sekreterlik", "Çalışma masasının kişinin beden ölçülerine uyarlanması hangi alanla ilgilidir?", ["Patoloji", "Farmakoloji", "Ergonomi", "Mikrobiyoloji"], 2, "Ergonomi çalışma ortamını insana uyumlu kılar.");
  s("etik", "Hasta sonuçlarının kalabalık koridorda yüksek sesle okunması öncelikle hangi ilkeyi ihlal eder?", ["Verimlilik", "Tasarruf", "Zaman yönetimi", "Mahremiyet"], 3, "Hastanın sağlık bilgileri gizlidir.");
  s("sekreterlik", "Hastanede çocuk kaçırılması şüphesinde kullanılan acil durum kodu hangisidir?", ["Pembe kod", "Mavi kod", "Beyaz kod", "Kırmızı kod"], 0, "Pembe kod çocuk kaçırılması olaylarıyla ilişkilidir.");
  s("sekreterlik", "Klinik sekreterin uygun görevi hangisidir?", ["Reçete yazmak", "Servis kabul kayıtlarını yürütmek", "Ameliyat yapmak", "İlaç dozu belirlemek"], 1, "Servis kabul ve kayıt işlemleri sekreterlik kapsamındadır.");
  s("sekreterlik", "İleri uzmanlık ve yüksek teknoloji gerektiren sağlık hizmetleri ağırlıkla hangi basamaktadır?", ["Birinci", "İkinci", "Üçüncü", "Sıfırıncı"], 2, "Üçüncü basamak ileri uzmanlaşmış sağlık hizmetlerini kapsar.");
  s("sekreterlik", "Kurumların mülkiyete göre sınıflandırılmasında hangisi bir ölçüttür?", ["Yatak rengi", "Bina katı", "Poliklinik saati", "Kamu veya özel oluşu"], 3, "Mülkiyet yönünden kamu ve özel ayrımı yapılır.");
  s("sekreterlik", "Yalnız belirli bir hastalık grubuna hizmet veren hastane nasıl adlandırılır?", ["Özel dal hastanesi", "Genel hastane", "Aile sağlığı merkezi", "Eczane"], 0, "Özel dal hastaneleri belirli hastalık veya branş alanına odaklanır.");
  s("sekreterlik", "Hangisi sağlık hizmetinin doğrudan sunucusudur?", ["Mobilya tedarikçisi", "Hastane", "Kırtasiye firması", "Reklam ajansı"], 1, "Hastaneler doğrudan sağlık hizmeti sunar.");
  s("halkla-iliskiler", "Halkla ilişkilerde geri bildirim alınması hangi niteliği gösterir?", ["Tek yönlülük", "Gizlilik", "İki yönlü iletişim", "Zorunlu sessizlik"], 2, "Etkili halkla ilişkiler karşılıklı iletişim gerektirir.");
  s("halkla-iliskiler", "Kurumun sunduğu bilgilerin doğru ve dürüst olması hangi ilkeyle ilgilidir?", ["Geciktirme", "Tekrar", "Gösteriş", "Güvenilirlik"], 3, "Doğruluk güven ilişkisini destekler.");
  s("halkla-iliskiler", "Bir hastanenin dış çevresine örnek hangisidir?", ["Ekonomik koşullar", "Personel vardiyası", "Birim içi görev çizelgesi", "İç yönerge"], 0, "Ekonomik koşullar kurumun dış çevresindedir.");
  s("halkla-iliskiler", "Hangisi kurumun iç çevresindendir?", ["Ulusal enflasyon", "Çalışanlar", "Bölgesel nüfus", "Yasa değişikliği"], 1, "Çalışanlar kurumun iç unsurudur.");
  s("halkla-iliskiler", "Bilgi bankosunda öfkeli bir hastayla iletişimde ilk uygun tutum hangisidir?", ["Sözünü kesmek", "Ses yükseltmek", "Sakin şekilde dinlemek", "Yüz çevirmek"], 2, "Sakin dinleme gerilimi azaltır ve ihtiyacı anlamayı sağlar.");
  s("on-parmak", "F klavye hangi amaçla Türkçeye uygun biçimde geliştirilmiştir?", ["Görüntü işleme", "Ses kaydı", "Şifreleme", "Verimli yazım"], 3, "F klavye Türkçedeki harf kullanımına göre tasarlanmıştır.");
  s("on-parmak", "Hangisi klavye düzeni adı değildir?", ["HBYS", "QWERTY", "AZERTY", "F"], 0, "HBYS bir hastane bilgi sistemidir.");
  s("on-parmak", "Türk F klavyesinin geliştirilmesiyle anılan isim hangisidir?", ["Alexander Fleming", "İhsan Sıtkı Yener", "Louis Pasteur", "Alan Turing"], 1, "F klavye çalışmalarında İhsan Sıtkı Yener öncü isimdir.");
  s("etik", "Hasta kimlik bilgisi telefonla sorulduğunda doğrulanmamış arayana nasıl davranılır?", ["Hemen paylaşılır", "Mesajla gönderilir", "Bilgi verilmez; yetki doğrulanır", "Sosyal medya hesabı sorulur"], 2, "Yetki doğrulanmadan hasta bilgisi açıklanamaz.");
  s("etik", "Bir sekreterin hekim adına kendi başına tanı girmesi neden sakıncalıdır?", ["Çok hızlı olduğu için", "Kağıt kullandığı için", "Randevuyu uzattığı için", "Yetki ve kayıt doğruluğu nedeniyle"], 3, "Klinik karar ve kayıt yetkisi sınırlarına uyulmalıdır.");
  s("yazisma", "Kurum içi resmî evrakın elektronik ortamda yönetimi için hangi sistem kullanılır?", ["EBYS", "DICOM", "PACS", "EKG"], 0, "EBYS elektronik belge akışını yönetir.");
  s("yazisma", "Resmî yazının konusu hangi unsura yazılır?", ["Dağıtım", "Konu", "Ek", "İmza"], 1, "Konu alanı yazının içeriğini kısaca belirtir.");
  s("yazisma", "Önceki yazışmaya yapılan atıf çoğunlukla hangi başlık altında gösterilir?", ["Ekler", "Adres", "İlgi", "Paraf"], 2, "İlgi bölümü bağlantılı önceki belgeleri gösterir.");
  s("sekreterlik", "Kurumsal telefonda uygun ifade hangisidir?", ["Kimsin?", "Ne var?", "Bilmiyorum, kapatıyorum", "İyi günler, nasıl yardımcı olabilirim?"], 3, "Nazik ve açık karşılama profesyonel iletişimdir.");
  s("halkla-iliskiler", "Telefon görüşmesinde karşı tarafı anlamak için en yararlı davranış hangisidir?", ["Aktif dinleme", "Sürekli söz kesme", "Başka işle uğraşma", "Ses yükseltme"], 0, "Aktif dinleme yanlış anlamaları azaltır.");
  s("diksiyon", "Etkili sözlü iletişimde sözcüklerin anlaşılabilir söylenmesi neyle ilgilidir?", ["Arşivleme", "Diksiyon", "Kodlama", "İstatistik"], 1, "Diksiyon açık ve düzgün konuşmayı destekler.");
  s("arsiv", "Hasta dosyasına farklı kişilerin aynı numarayı vermesi hangi riskin göstergesidir?", ["Daha hızlı kayıt", "Daha az kağıt", "Kimlik karışması", "Doğru indeksleme"], 2, "Hasta kimliklerinin karışması ciddi güvenlik riskidir.");
  s("arsiv", "Hasta dosyasının arşivden çıkarılması nasıl izlenmelidir?", ["Sözlü söylentiyle", "Kayıtsız biçimde", "Kişisel telefonla", "Teslim ve izleme kaydıyla"], 3, "İzleme kaydı dosyanın nerede olduğunu gösterir.");
  s("dokumantasyon", "Tıbbi kayıtların hukuki önemi hangi ifadeyle açıklanır?", ["Bakım sürecine ilişkin kanıt oluşturması", "Sadece dekor amaçlı olması", "Tıbbi karardan bağımsız olması", "Sadece mali belge olması"], 0, "Tıbbi kayıtlar gerektiğinde hukuki değerlendirmede kanıt işlevi görür.");
  s("arsiv", "Arşivde eksik belge tespit edilirse uygun işlem hangisidir?", ["Görmezden gelmek", "İlgili birime tamamlatmak", "Rastgele belge eklemek", "Dosyayı atmak"], 1, "Eksik belge yetkili süreçle tamamlatılmalıdır.");
  s("dokumantasyon", "Bir hastanın kayıtlarına güvenli erişim için en güçlü tanımlayıcı hangisidir?", ["Saç rengi", "Mahalle adı", "T.C. kimlik numarası ve ek kimlik doğrulaması", "Bina girişi"], 2, "Tekil kimlik numarası ve doğrulama karışmaları azaltır.");
  s("arsiv", "Kurumsal belgede standart dosya planı kodu neyi belirtir?", ["Maaş kademesini", "Cihaz seri numarasını", "Hasta yatak numarasını", "Belgenin konu sınıfını"], 3, "Standart dosya planı kodları belge konularını sınıflandırır.");
  s("arsiv", "Arşivden alınan dosyanın yerine konan takip aracı hangisidir?", ["Vekil dosya", "Epikriz", "İstem formu", "Muayene raporu"], 0, "Vekil dosya, çıkarılan asıl dosyanın yerini ve takibini gösterir.");
  s("dokumantasyon", "Hasta dosyalarının kurumsal korunmasında temel sorumluluk kimdedir?", ["Rastgele ziyaretçide", "Sağlık kuruluşunda", "Yalnız hastanın komşusunda", "Tedarikçide"], 1, "Sağlık kuruluşu, tuttuğu kayıtların güvenli yönetiminden sorumludur.");
  s("arsiv", "Hasta kayıtlarının saklama süresi belirlenirken hangisi esas alınır?", ["Rafın boşluğu", "Personel tercihi", "İlgili güncel mevzuat ve saklama planı", "Hastanın yaşı tek başına"], 2, "Saklama süreleri kayıt türüne ve yürürlükteki kurallara bağlıdır.");
  s("icd", "Hastalıklara ilişkin uluslararası tanı sınıflandırması için hangisi kullanılır?", ["HTML", "SMTP", "PDF", "ICD"], 3, "ICD, hastalık sınıflandırması için kullanılan sistemdir.");
  s("icd", "ICD kodlamasının önemli amaçlarından biri hangisidir?", ["Sağlık verilerini karşılaştırılabilir kılmak", "Yemek listesi hazırlamak", "Telefon yönlendirmek", "Bina bakımını yapmak"], 0, "Standart kodlama analiz ve karşılaştırmayı kolaylaştırır.");
  s("icd", "Tıbbi kod kaydı yapılmadan önce hangi bilgi esas alınmalıdır?", ["Tahmini hastalık", "Hekim tarafından belgelenmiş tanı", "İnternet söylentisi", "Hasta yakınının tercihi"], 1, "Kodlama doğrulanmış klinik kayda dayanmalıdır.");

  // Kullanıcının ChatGPT ile hazırlattığı 262 soruluk kitabın 212 konu testi sorusu (15.11.2026). İlk 50 soru yukarıdaki setle aynı olduğu için alınmadı.
  // Sınav dört şıklı olduğundan her sorudan doğru olmayan son şık çıkarıldı.
  s("sekreterlik", "Tıbbi sekreterin hasta randevularında temel amacı nedir?", ["Tahlil yorumlama", "Ameliyat kararı verme", "Bağımsız tanı koyma", "Doğru randevu kaydı ve yönlendirme"], 3, "Randevu ve yönlendirme sekreterin idari görevlerindendir.");
  s("sekreterlik", "Randevu saatinin ilgili birime doğru aktarılmasını sağlayan işlem nedir?", ["Doğru randevu kaydı ve yönlendirme", "Ameliyat kararı verme", "Tahlil yorumlama", "Bağımsız tanı koyma"], 0, "Randevu ve yönlendirme sekreterin idari görevlerindendir.");
  s("sekreterlik", "Sağlık çalışanları arasında yetki sınırına uymak neyi gerektirir?", ["Kesin teşhis bildirme", "Tedaviyi kendiliğinden kesme", "İlaç dozunu değiştirme", "Tıbbi kararı yetkili sağlık çalışanına bırakma"], 3, "Tıbbi karar klinik yetkisi olan profesyonele aittir.");
  s("sekreterlik", "Sekreterin kendisinden tedavi değişikliği istendiğinde uygun yaklaşım hangisidir?", ["İlaç dozunu değiştirme", "Tedaviyi kendiliğinden kesme", "Tıbbi kararı yetkili sağlık çalışanına bırakma", "Hasta yerine karar verme"], 2, "Tıbbi karar klinik yetkisi olan profesyonele aittir.");
  s("sekreterlik", "Sekreterin belge hazırlarken uygulaması gereken temel kalite ilkesi nedir?", ["Belgeyi imzasız çoğaltma", "Rastgele alan doldurma", "Kayıt doğruluğunu kontrol etme", "Eski dosyayı gizlice değiştirme"], 2, "Doğru kayıt idari ve klinik güvenlik için zorunludur.");
  s("sekreterlik", "Bir formda tarih ve kimlik alanlarını ikinci kez kontrol etmek hangi yaklaşımı gösterir?", ["Kayıt doğruluğunu kontrol etme", "Eksik bilgiyi tahmin etme", "Eski dosyayı gizlice değiştirme", "Rastgele alan doldurma"], 0, "Doğru kayıt idari ve klinik güvenlik için zorunludur.");
  s("sekreterlik", "Bir görev başka birimin yetkisindeyse uygun hareket nedir?", ["Kaydı yok etme", "Doğru birime yönlendirme", "İşlemi gizlice yapma", "Yetkiyi kendiliğinden kullanma"], 1, "Yetki sınırına uygun yönlendirme yapılır.");
  s("sekreterlik", "Hastanın işlemine yetkili olmayan personel nasıl yardımcı olmalıdır?", ["Hastayı yanlış bilgilendirme", "Yetkiyi kendiliğinden kullanma", "Doğru birime yönlendirme", "Kaydı yok etme"], 2, "Yetki sınırına uygun yönlendirme yapılır.");
  s("sekreterlik", "Ekip içinde bilginin izlenebilir aktarımı nasıl sağlanır?", ["Belgeli görev devri", "Belgesiz işlem", "Sözlü söylenti", "Ortak şifre paylaşımı"], 0, "Kayıtlı devir iş sürekliliğini artırır.");
  s("sekreterlik", "Nöbet devrinde açık kalan işlerin kayıtla bildirilmesi hangi ilkeye uyar?", ["Sözlü söylenti", "Kimlik gizleme", "Belgeli görev devri", "Ortak şifre paylaşımı"], 2, "Kayıtlı devir iş sürekliliğini artırır.");
  s("sekreterlik", "Bir işlem tamamlanamadığında en doğru tutum nedir?", ["Rastgele imza atma", "Başka hastanın belgesini kullanma", "Dosyayı kayıpsız görünmesi için saklama", "Eksikliği kayıt altına alıp ilgili birime bildirme"], 3, "Eksikliğin görünür ve izlenebilir olması gerekir.");
  s("sekreterlik", "Eksik evrak nedeniyle bekleyen dosya nasıl ele alınır?", ["Rastgele imza atma", "Eksikliği kayıt altına alıp ilgili birime bildirme", "Dosyayı kayıpsız görünmesi için saklama", "Sorunu görmezden gelme"], 1, "Eksikliğin görünür ve izlenebilir olması gerekir.");
  s("sekreterlik", "Sekreterlikte zaman yönetiminin temel amacı nedir?", ["Tüm işleri erteleme", "Tedaviyi kendi başına değiştirme", "Gizli bilgileri ilan etme", "Önceliğe göre düzenli iş akışı"], 3, "İş planı verimlilik ve doğruluğa hizmet eder.");
  s("sekreterlik", "Çok sayıda başvuru aynı anda geldiğinde iş sırasını düzenlemek neyi sağlar?", ["Önceliğe göre düzenli iş akışı", "Kimlik kontrolünü kaldırma", "Gizli bilgileri ilan etme", "Tüm işleri erteleme"], 0, "İş planı verimlilik ve doğruluğa hizmet eder.");
  s("sekreterlik", "Aynı isimli hastaları ayırmada en güvenli yöntem nedir?", ["Yalnız oda numarası", "Sadece ses tonu", "Yalnız saç rengi", "Birden çok güvenilir kimlik tanımlayıcısı"], 3, "Kimlik doğrulamada tek bir benzerlik yeterli değildir.");
  s("sekreterlik", "İki Ahmet Yılmaz kaydı ekranda varsa sekreter neye başvurmalıdır?", ["Yalnız saç rengi", "Birden çok güvenilir kimlik tanımlayıcısı", "Sadece ses tonu", "Sadece sıra numarası"], 1, "Kimlik doğrulamada tek bir benzerlik yeterli değildir.");
  s("sekreterlik", "Yanlış hasta kaydına işlem girilirse ilk yaklaşım ne olmalıdır?", ["Hasta yerine başka isim yazma", "İşlemi durdurup yetkili düzeltme sürecini başlatma", "Durumu gizleme", "Kaydı rastgele silme"], 1, "Kayıt hataları usulüne uygun düzeltilmelidir.");
  s("sekreterlik", "Laboratuvar istemi yanlış kişi ekranında açıldığında ne yapılır?", ["İşlemi durdurup yetkili düzeltme sürecini başlatma", "Hasta yerine başka isim yazma", "Durumu gizleme", "Kaydı rastgele silme"], 0, "Kayıt hataları usulüne uygun düzeltilmelidir.");
  s("sekreterlik", "Hasta kabul sırasında iletişim bilgisini doğrulamanın amacı nedir?", ["Hastanın şifresini isteme", "Dosyayı imha etme", "Tanıyı değiştirme", "İletişim verisini yetkili usulle güncelleme"], 3, "İletişim verisi doğruluğu hizmet sürekliliğine katkı sağlar.");
  s("sekreterlik", "Yanlış telefon numarası nedeniyle randevu bilgisi ulaşmıyorsa hangi adım gereklidir?", ["Birim kodunu silme", "Tanıyı değiştirme", "Dosyayı imha etme", "İletişim verisini yetkili usulle güncelleme"], 3, "İletişim verisi doğruluğu hizmet sürekliliğine katkı sağlar.");
  s("sekreterlik", "Servis transferinde hangi bilginin güncellenmesi gerekir?", ["Personel yemek sayısı", "Arşiv raf rengi", "Binanın metrekare bilgisi", "Yeni servis ve transfer kaydı"], 3, "Transfer hasta hareket kaydını gerektirir.");
  s("sekreterlik", "Başka servise alınan hasta için idari kayıtta öncelikle ne izlenir?", ["İhale numarası", "Personel yemek sayısı", "Yeni servis ve transfer kaydı", "Arşiv raf rengi"], 2, "Transfer hasta hareket kaydını gerektirir.");
  s("sekreterlik", "Taburculukta idari süreç bakımından temel adım nedir?", ["Tüm kayıtların silinmesi", "Taburculuk işleminin kayıtla tamamlanması", "Yetkisiz epikriz yazılması", "Eski dosyanın yakılması"], 1, "Taburculuk belgeleri yetkili iş akışında tamamlanır.");
  s("sekreterlik", "Taburcu edilen hasta için açık kayıtların uygun biçimde kapatılması hangi işlemdir?", ["Eski dosyanın yakılması", "Yetkisiz epikriz yazılması", "Yeni tanı uydurulması", "Taburculuk işleminin kayıtla tamamlanması"], 3, "Taburculuk belgeleri yetkili iş akışında tamamlanır.");
  s("sekreterlik", "Hasta mahremiyetini gözeten çağırma yaklaşımı hangisidir?", ["Tanıyı yüksek sesle söyleme", "Kişisel telefonu ortak ekrana verme", "Kayıt ekranını herkese gösterme", "Gereken en az bilgiyi kullanma"], 3, "Başvuru yönetimi özel veriyi gereksiz ifşa etmemelidir.");
  s("sekreterlik", "Kalabalık alanda hastaya ait hassas tanıyı duyurmadan yönlendirme nasıl yapılır?", ["Tanıyı yüksek sesle söyleme", "Tam dosyayı sıraya dağıtma", "Kayıt ekranını herkese gösterme", "Gereken en az bilgiyi kullanma"], 3, "Başvuru yönetimi özel veriyi gereksiz ifşa etmemelidir.");
  s("sekreterlik", "Acil yönlendirme isteyen hastada sekreterin rolü nedir?", ["Hastayı eve gönderme", "Hızla klinik değerlendirme birimine yönlendirme", "İlaç dozu belirleme", "Kendi teşhisini koyma"], 1, "Acil tıbbi değerlendirme sağlık çalışanlarınca yapılır.");
  s("sekreterlik", "Belirgin acil yakınmayla gelen kişi için sekreter nasıl hareket eder?", ["Hızla klinik değerlendirme birimine yönlendirme", "Tahlili kendi yorumlama", "Hastayı eve gönderme", "Kendi teşhisini koyma"], 0, "Acil tıbbi değerlendirme sağlık çalışanlarınca yapılır.");
  s("dokumantasyon", "Dosyada eksik belge olup olmadığını sorgulayan inceleme nedir?", ["Piyasa analizi", "Maliyet tahmini", "Niceliksel kontrol", "Stok sayımı"], 2, "Niceliksel kontrol belge varlığını ve biçimsel tamlığı inceler.");
  s("dokumantasyon", "Onam formunun dosyada bulunmadığını fark etmek hangi kontrol türüne örnektir?", ["Personel denetimi", "Piyasa analizi", "Niceliksel kontrol", "Maliyet tahmini"], 2, "Niceliksel kontrol belge varlığını ve biçimsel tamlığı inceler.");
  s("dokumantasyon", "Dosyadaki kayıtların birbirini tutmasını araştıran inceleme nedir?", ["Arşiv raf temizliği", "Bina kontrolü", "Yemek çizelgesi", "Niteliksel kontrol"], 3, "Niteliksel kontrol içerik tutarlılığına odaklanır.");
  s("dokumantasyon", "Klinik notlarda farklı tarih ve bilgi çelişkisi görmek hangi kontrolde öne çıkar?", ["Bina kontrolü", "Yemek çizelgesi", "Demirbaş sayımı", "Niteliksel kontrol"], 3, "Niteliksel kontrol içerik tutarlılığına odaklanır.");
  s("dokumantasyon", "Tıbbi dokümanın tarihli olması neden önemlidir?", ["Zaman içinde izlenebilirlik", "Dosya kapağı boyutu", "Renk seçimi", "Kağıt kalınlığı"], 0, "Tarih işlem sırasını ve izlenebilirliği sağlar.");
  s("dokumantasyon", "Aynı hastanın ardışık işlemlerinin sırasını anlamak hangi kayıt özelliğine bağlıdır?", ["Dosya kapağı boyutu", "Kağıt kalınlığı", "Renk seçimi", "Zaman içinde izlenebilirlik"], 3, "Tarih işlem sırasını ve izlenebilirliği sağlar.");
  s("dokumantasyon", "Yetkisiz kişinin kayıt değişikliği yapmaması hangi ilkeyle ilgilidir?", ["Mobilya düzenini", "Randevu broşürünü", "Yalnız baskı hızını", "Veri bütünlüğü ve yetki denetimi"], 3, "Yetkisiz değişiklik kayıt bütünlüğünü bozar.");
  s("dokumantasyon", "Hastane kayıtlarına herkesin düzenleme yapmasının önlenmesi neyi korur?", ["Yalnız baskı hızını", "Veri bütünlüğü ve yetki denetimi", "Randevu broşürünü", "Mobilya düzenini"], 1, "Yetkisiz değişiklik kayıt bütünlüğünü bozar.");
  s("dokumantasyon", "Kayıtlarda işlem yapan kişinin görünmesi ne sağlar?", ["Nöbet kartı", "Hasta bilekliği", "Bütçe planı", "Denetim izi"], 3, "Denetim izi işlem geçmişini görünür kılar.");
  s("dokumantasyon", "Bir düzeltmenin kim tarafından yapıldığının sistemde izlenmesi hangi özelliktir?", ["Bütçe planı", "Dosya zımbası", "Hasta bilekliği", "Denetim izi"], 3, "Denetim izi işlem geçmişini görünür kılar.");
  s("dokumantasyon", "Tıbbi belgeye eklenen bilgi nasıl olmalıdır?", ["Görsel tasarım", "Ekran parlaklığı", "Kaynağı belli ve doğrulanabilir olma", "Süsleme"], 2, "Tıbbi kayıtlar güvenilir kaynağa dayanmalıdır.");
  s("dokumantasyon", "Sonradan eklenen notun kaynağı belli değilse hangi ilke ihlal edilir?", ["Ekran parlaklığı", "Kaynağı belli ve doğrulanabilir olma", "Görsel tasarım", "Süsleme"], 1, "Tıbbi kayıtlar güvenilir kaynağa dayanmalıdır.");
  s("dokumantasyon", "Hasta dosyası arşivlenmeden önce hangi süreç uygundur?", ["Tüm sayfaları çıkarma", "Dosya tamlık ve sıralama kontrolü", "Belgesiz imha", "Rastgele karıştırma"], 1, "Dosya düzeni doğru erişim ve bütünlük için önemlidir.");
  s("dokumantasyon", "Belgeleri yanlış sırada toplanmış dosya arşive giderken ne yapılmalıdır?", ["Dosya tamlık ve sıralama kontrolü", "Tüm sayfaları çıkarma", "Rastgele karıştırma", "İçeriği başkasına verme"], 0, "Dosya düzeni doğru erişim ve bütünlük için önemlidir.");
  s("dokumantasyon", "Hastanın önceki sağlık öyküsünün alınması hangisidir?", ["Arşiv fişi", "Anamnez", "Dağıtım", "Epikriz"], 1, "Anamnez sağlık öyküsünün alınmasıdır.");
  s("dokumantasyon", "Hekim, kişinin geçmiş hastalıklarını ve şikâyetini öğreniyor. Bu işlem nedir?", ["Anamnez", "Arşiv fişi", "Epikriz", "Dağıtım"], 0, "Anamnez sağlık öyküsünün alınmasıdır.");
  s("dokumantasyon", "Bir uzman hekimin diğer uzmandan görüş istemesi hangisidir?", ["Arşiv devri", "Demirbaş zimmeti", "İşe giriş bildirimi", "Konsültasyon"], 3, "Konsültasyon uzman görüşü istemedir.");
  s("dokumantasyon", "Ortopedinin kardiyoloji görüşü istemesi hangi süreçtir?", ["İşe giriş bildirimi", "Arşiv devri", "Konsültasyon", "Demirbaş zimmeti"], 2, "Konsültasyon uzman görüşü istemedir.");
  s("dokumantasyon", "Yatış süreci sonunda verilen klinik özet nedir?", ["İrsaliye", "Epikriz", "Puantaş", "Yoklama"], 1, "Epikriz klinik süreç özetidir.");
  s("dokumantasyon", "Taburcu olurken tanı ve tedavilerin özetlendiği belge hangisidir?", ["İrsaliye", "Sipariş formu", "Yoklama", "Epikriz"], 3, "Epikriz klinik süreç özetidir.");
  s("dokumantasyon", "Hastanın bir işlem hakkında bilgilendirilip onam vermesi hangi süreçtir?", ["Arşiv imhası", "Dosya tasnifi", "Stok sayımı", "Aydınlatılmış onam"], 3, "Onam süreci bilgilendirmeyi de içerir.");
  s("dokumantasyon", "İşlem öncesinde hastaya risk ve alternatifler açıklanıyor. Bu süreç nedir?", ["Stok sayımı", "Evrak iadesi", "Aydınlatılmış onam", "Arşiv imhası"], 2, "Onam süreci bilgilendirmeyi de içerir.");
  s("dokumantasyon", "Tetkik yapılmasını talep eden belge hangisidir?", ["Demirbaş fişi", "Sonuç raporu", "Epikriz", "Tetkik istemi"], 3, "İstem ile sonuç farklı aşamalardır.");
  s("dokumantasyon", "Hekim hastadan kan testi istiyor. Oluşturulan ilk kayıt nedir?", ["Sonuç raporu", "Epikriz", "Arşiv defteri", "Tetkik istemi"], 3, "İstem ile sonuç farklı aşamalardır.");
  s("dokumantasyon", "Tamamlanmış tetkikin bulgularını bildiren belge nedir?", ["Randevu talebi", "Malzeme teslimi", "İzin kağıdı", "Sonuç raporu"], 3, "Bulgular sonuç raporunda yer alır.");
  s("dokumantasyon", "Laboratuvar analizinin çıktısı hangi belge niteliğindedir?", ["Randevu talebi", "İzin kağıdı", "Sonuç raporu", "Personel çizelgesi"], 2, "Bulgular sonuç raporunda yer alır.");
  s("dokumantasyon", "Klinik gözlem kayıtlarının temel işlevi nedir?", ["Süreç boyunca klinik izlemi", "Klavye düzenini", "İhale kararını", "Telefon rehberini"], 0, "İzlem kayıtları klinik sürekliliği destekler.");
  s("dokumantasyon", "Hasta izleminde gün içinde değişen klinik durumun kaydı neyi sağlar?", ["Klavye düzenini", "Bina envanterini", "İhale kararını", "Süreç boyunca klinik izlemi"], 3, "İzlem kayıtları klinik sürekliliği destekler.");
  s("terminoloji", "Kalbi ifade eden tıbbi kök hangisidir?", ["Hepato", "Osteo", "Nephro", "Cardio"], 3, "Cardio kalp anlamındadır.");
  s("terminoloji", "Cardioloji kelimesindeki organ kökü hangi anlamı taşır?", ["Hepato", "Gastro", "Cardio", "Osteo"], 2, "Cardio kalp anlamındadır.");
  s("terminoloji", "Böbrekle ilişkili tıbbi kök hangisidir?", ["Neuro", "Derma", "Nephro", "Gastro"], 2, "Nephro böbrek anlamındadır.");
  s("terminoloji", "Nefroloji kelimesinin kök anlamı hangisidir?", ["Cardio", "Gastro", "Neuro", "Nephro"], 3, "Nephro böbrek anlamındadır.");
  s("terminoloji", "Karaciğer ile ilişkili tıbbi kök hangisidir?", ["Hepato", "Cardio", "Osteo", "Gastro"], 0, "Hepato karaciğeri ifade eder.");
  s("terminoloji", "Hepatoloji kelimesinin kökü hangi organı belirtir?", ["Cysto", "Gastro", "Cardio", "Hepato"], 3, "Hepato karaciğeri ifade eder.");
  s("terminoloji", "Sinirle ilişkili tıbbi kök hangisidir?", ["Hepato", "Nephro", "Gastro", "Neuro"], 3, "Neuro sinirle ilgilidir.");
  s("terminoloji", "Nöroloji sözcüğünde kullanılan kök hangisidir?", ["Hepato", "Derma", "Neuro", "Gastro"], 2, "Neuro sinirle ilgilidir.");
  s("terminoloji", "Kemiği belirten tıbbi kök hangisidir?", ["Cardio", "Neuro", "Hepato", "Osteo"], 3, "Osteo kemik anlamındadır.");
  s("terminoloji", "Osteoporoz kelimesinde organ-doku kökü hangisidir?", ["Neuro", "Gastro", "Osteo", "Hepato"], 2, "Osteo kemik anlamındadır.");
  s("terminoloji", "Deriyi ifade eden tıbbi kök hangisidir?", ["Derma", "Hepato", "Gastro", "Nephro"], 0, "Derma deriyle ilişkilidir.");
  s("terminoloji", "Dermatoloji sözcüğünün kökü ne anlama gelir?", ["Hepato", "Derma", "Gastro", "Cardio"], 1, "Derma deriyle ilişkilidir.");
  s("terminoloji", "İltihap anlamına gelen tıbbi sonek hangisidir?", ["-ectomy", "-itis", "-stomy", "-scopy"], 1, "-itis iltihap anlamındadır.");
  s("terminoloji", "Gastrit kelimesindeki -it eki hangi anlama karşılık gelir?", ["-algia", "-stomy", "-scopy", "-itis"], 3, "-itis iltihap anlamındadır.");
  s("terminoloji", "Ağrıyı ifade eden tıbbi sonek hangisidir?", ["-scopy", "-ectomy", "-stomy", "-algia"], 3, "-algia ağrı anlamı taşır.");
  s("terminoloji", "Nevralji kelimesindeki -alji eki hangi durumu bildirir?", ["-ectomy", "-stomy", "-algia", "-scopy"], 2, "-algia ağrı anlamı taşır.");
  s("terminoloji", "İdrarda kan bulunmasına ne ad verilir?", ["Senkop", "Hematüri", "Dispne", "Hemoptizi"], 1, "Hematüri idrarda kan demektir.");
  s("terminoloji", "Hastanın idrarında kan görülmesi için kullanılan terim nedir?", ["Hemoptizi", "Hematemez", "Senkop", "Hematüri"], 3, "Hematüri idrarda kan demektir.");
  s("terminoloji", "Öksürükle kan gelmesine ne ad verilir?", ["Senkop", "Hematüri", "Hemoptizi", "Ödem"], 2, "Hemoptizi öksürükle kan gelmesidir.");
  s("terminoloji", "Solunum yolundan öksürürken kan çıkarılması hangi terimdir?", ["Hemoptizi", "Hematemez", "Senkop", "Ödem"], 0, "Hemoptizi öksürükle kan gelmesidir.");
  s("terminoloji", "Solunum güçlüğüne verilen ad nedir?", ["Dispne", "Miyalji", "Senkop", "Sefalji"], 0, "Dispne nefes darlığıdır.");
  s("terminoloji", "Nefes almakta zorlanmayı belirten tıbbi terim hangisidir?", ["Sefalji", "Dispne", "Hematüri", "Miyalji"], 1, "Dispne nefes darlığıdır.");
  s("terminoloji", "Baş ağrısını belirten terim hangisidir?", ["Miyalji", "Otoloji", "Lumbalji", "Sefalji"], 3, "Sefalji baş ağrısıdır.");
  s("terminoloji", "Sefalji yakınması hangi ağrıyı belirtir?", ["Otoloji", "Sefalji", "Miyalji", "Nevralji"], 1, "Sefalji baş ağrısıdır.");
  s("terminoloji", "Kas ağrısının tıbbi karşılığı nedir?", ["Senkop", "Dispne", "Miyalji", "Sefalji"], 2, "Miyalji kas ağrısıdır.");
  s("terminoloji", "Miyalji ifadesinde hangi yakınma anlatılır?", ["Senkop", "Hemoptizi", "Miyalji", "Sefalji"], 2, "Miyalji kas ağrısıdır.");
  s("terminoloji", "Kalın bağırsağın endoskopik incelenmesi hangisidir?", ["Bronkoskopi", "Artroskopi", "Kolonoskopi", "Otoskopi"], 2, "Kolonoskopi kalın bağırsak incelemesidir.");
  s("terminoloji", "Kolonun görüntülenmesi amacıyla yapılan endoskopik işlem nedir?", ["Artroskopi", "Sistoskopi", "Otoskopi", "Kolonoskopi"], 3, "Kolonoskopi kalın bağırsak incelemesidir.");
  s("terminoloji", "Hava yollarının endoskopik incelenmesi hangisidir?", ["Gastroskopi", "Sistoskopi", "Bronkoskopi", "Kolonoskopi"], 2, "Bronkoskopi hava yollarının incelenmesidir.");
  s("terminoloji", "Bronşların aletle görüntülenmesi hangi işlemdir?", ["Artroskopi", "Bronkoskopi", "Kolonoskopi", "Sistoskopi"], 1, "Bronkoskopi hava yollarının incelenmesidir.");
  s("sekreterlik", "Hastane hasta kabul ve klinik kayıt işleyişinin ana bilgi sistemi hangisidir?", ["HBYS", "EBYS", "DICOM", "SMTP"], 0, "HBYS hastane iş akışlarına yöneliktir.");
  s("sekreterlik", "Poliklinik ve servis kayıtları ortak sistemde tutuluyor. Bu sistem hangisidir?", ["SMTP", "DICOM", "EBYS", "HBYS"], 3, "HBYS hastane iş akışlarına yöneliktir.");
  s("sekreterlik", "Kurumsal resmî yazı yönetimi için kullanılan sistem hangisidir?", ["ICD", "HBYS", "EBYS", "PACS"], 2, "EBYS resmî belge akışını yönetir.");
  s("sekreterlik", "İdari yazının paraf ve imza akışı hangi sistemde yürütülür?", ["ICD", "EKG", "HBYS", "EBYS"], 3, "EBYS resmî belge akışını yönetir.");
  s("sekreterlik", "Tıbbi görüntülerin arşivlenmesinde yaygın sistem adı nedir?", ["EBYS", "Bordro", "PACS", "DTS"], 2, "PACS tıbbi görüntü saklama ve erişim sistemidir.");
  s("sekreterlik", "Radyoloji görüntülerinin geçmişe dönük görüntülenmesini hangi sistem destekler?", ["DTS", "PACS", "SMS", "Bordro"], 1, "PACS tıbbi görüntü saklama ve erişim sistemidir.");
  s("sekreterlik", "Tıbbi görüntüleme iletişim standardı hangisidir?", ["SMTP", "HBYS", "EBYS", "DICOM"], 3, "DICOM görüntü iletişim standardıdır.");
  s("sekreterlik", "Farklı görüntüleme cihazlarının standart veri alışverişinde hangisi kullanılır?", ["SMTP", "DICOM", "HBYS", "ICD"], 1, "DICOM görüntü iletişim standardıdır.");
  s("sekreterlik", "Bireysel kullanıcı hesabı kullanmanın en önemli nedeni nedir?", ["Kayıtları gizlice silme", "Herkesin aynı şifreyi kullanması", "Hesap bazında izlenebilirlik", "Şifreyi duvara asma"], 2, "Kişisel hesaplar denetim izini destekler.");
  s("sekreterlik", "İşlemin hangi kullanıcı tarafından yapıldığını bilmek neye bağlıdır?", ["Ortak oturum açma", "Şifreyi duvara asma", "Herkesin aynı şifreyi kullanması", "Hesap bazında izlenebilirlik"], 3, "Kişisel hesaplar denetim izini destekler.");
  s("sekreterlik", "İş istasyonundan ayrılırken hangi davranış güvenlidir?", ["Şifreyi ekranda bırakmak", "Tüm dosyaları indirmek", "Bilgiyi paylaşmak", "Ekranı kilitlemek"], 3, "Ekran kilidi yetkisiz görüntülemeyi önler.");
  s("sekreterlik", "Sekreter masadan kalkarken açık hasta ekranı için ne yapmalıdır?", ["Ekranı kilitlemek", "Tüm dosyaları indirmek", "Bilgiyi paylaşmak", "Hesabı devretmek"], 0, "Ekran kilidi yetkisiz görüntülemeyi önler.");
  s("sekreterlik", "Yanlış eşleşmiş görüntü raporu nasıl ele alınmalıdır?", ["Rastgele taşımak", "Hastaya sormadan silmek", "Kayıtsız değiştirmek", "Yetkili doğrulama ve düzeltme"], 3, "Kimlik-veri eşleşmesi kayıt güvenliği açısından kritiktir.");
  s("sekreterlik", "Rapor başka hastaya bağlanmış görünüyorsa ne gerekir?", ["Yetkili doğrulama ve düzeltme", "Hastaya sormadan silmek", "Herkese mail atmak", "Kayıtsız değiştirmek"], 0, "Kimlik-veri eşleşmesi kayıt güvenliği açısından kritiktir.");
  s("sekreterlik", "İşlem kayıtlarının sistemde tutulmasının işlevi nedir?", ["Denetim kayıtları", "Ekran süsleme", "Klavyeyi hızlandırma", "İnternet reklamı"], 0, "Denetim kayıtları geriye dönük izlemeyi sağlar.");
  s("sekreterlik", "Hangi kayda ne zaman erişildiğinin bilinmesi hangi özelliktir?", ["Ekran süsleme", "Klavyeyi hızlandırma", "İnternet reklamı", "Denetim kayıtları"], 3, "Denetim kayıtları geriye dönük izlemeyi sağlar.");
  s("etik", "Sağlık verilerine yalnız görev gereği bakma ilkesi nedir?", ["Ortak şifre", "Kayıtsız çıktı alma", "Yetki ve amaçla sınırlı erişim", "Tanı ilanı"], 2, "Erişim görev amacıyla sınırlanmalıdır.");
  s("etik", "Sekreterin komşusunun kaydını meraktan açmaması hangi davranıştır?", ["Kayıtsız çıktı alma", "Yetki ve amaçla sınırlı erişim", "Tanı ilanı", "Açık dosya paylaşımı"], 1, "Erişim görev amacıyla sınırlanmalıdır.");
  s("etik", "Hastaya ait bilgi kalabalıkta nasıl korunur?", ["Dosyayı dağıtmak", "Sosyal medyada yazmak", "Ses yükseltmek", "Özel görüşme ortamı sağlamak"], 3, "Hassas bilgi mahrem ortamda paylaşılır.");
  s("etik", "Muayene sonucu bankoda herkesin duyabileceği yerde konuşuluyorsa ne yapılır?", ["Ses yükseltmek", "Özel görüşme ortamı sağlamak", "Sosyal medyada yazmak", "Dosyayı dağıtmak"], 1, "Hassas bilgi mahrem ortamda paylaşılır.");
  s("etik", "Hastanın yakını bilgi istediğinde hangi kontrol önemlidir?", ["Tanıyı söyleme", "Yalnız ses tonuna güvenme", "Herkese açık yanıt", "Kimlik ve yetki doğrulaması"], 3, "Akrabalık beyanı tek başına erişim yetkisi değildir.");
  s("etik", "Telefonda biri hasta yakını olduğunu söylüyor. Bilgi verilmeden önce ne gerekir?", ["Yalnız ses tonuna güvenme", "Tanıyı söyleme", "Kimlik ve yetki doğrulaması", "Fotoğraf paylaşma"], 2, "Akrabalık beyanı tek başına erişim yetkisi değildir.");
  s("etik", "Farklı dil konuşan hastaya saygılı yaklaşım hangisidir?", ["Hastayı azarlamak", "Kayıt açmamak", "Uygun iletişim ve yönlendirme desteği sağlamak", "Sırasını silmek"], 2, "Eşit hizmet ve anlaşılır iletişim esastır.");
  s("etik", "Anlaşılması güç bir başvuruda sekreter nasıl yardımcı olur?", ["Kayıt açmamak", "Sırasını silmek", "Bilgiyi uydurmak", "Uygun iletişim ve yönlendirme desteği sağlamak"], 3, "Eşit hizmet ve anlaşılır iletişim esastır.");
  s("etik", "Hasta kayıt örneği istediğinde ne yapılmalıdır?", ["Tüm dosyaları dağıtmak", "Belgeyi rastgele vermek", "Talebi tamamen yok saymak", "Kimlik doğrulayarak resmî talep sürecine yönlendirme"], 3, "Bilgi talepleri yetkili süreçle karşılanır.");
  s("etik", "Bir kişi kendi dosyasını almak için başvurduğunda uygun yol hangisidir?", ["Şifreyi açıklamak", "Tüm dosyaları dağıtmak", "Talebi tamamen yok saymak", "Kimlik doğrulayarak resmî talep sürecine yönlendirme"], 3, "Bilgi talepleri yetkili süreçle karşılanır.");
  s("etik", "Yanlış kişiye evrak verildiği fark edildiğinde ne yapılır?", ["İhlali yetkiliye gecikmeden bildirmek", "Kaydı silmek", "Her şey yolunda demek", "Yeni kopyaları dağıtmak"], 0, "Olası mahremiyet ihlali kurum prosedürüyle yönetilir.");
  s("etik", "Bir rapor yanlış ziyaretçiye teslim edilmişse ilk kurumsal tutum ne olmalıdır?", ["Her şey yolunda demek", "Kaydı silmek", "Yeni kopyaları dağıtmak", "İhlali yetkiliye gecikmeden bildirmek"], 3, "Olası mahremiyet ihlali kurum prosedürüyle yönetilir.");
  s("etik", "Hasta şikâyetinde ayrımcılıktan kaçınma neyi gerektirir?", ["Gizli kayıt", "Eşit ve saygılı hizmet", "Belge silme", "Keyfî sıra değiştirme"], 1, "Herkese saygılı ve tarafsız hizmet sunulmalıdır.");
  s("etik", "Giyim ve ekonomik durumuna bakmadan aynı kayıt yaklaşımı uygulamak hangi ilkedir?", ["Tıbbi tanı uydurma", "Keyfî sıra değiştirme", "Eşit ve saygılı hizmet", "Gizli kayıt"], 2, "Herkese saygılı ve tarafsız hizmet sunulmalıdır.");
  s("sekreterlik", "Temel ilk başvuru sağlık hizmetleri ağırlıkla hangi basamaktadır?", ["Mülkiyet sınıfı", "Birinci basamak", "Üçüncü basamak", "İkinci basamak"], 1, "Aile hekimliği temel birinci basamak örneğidir.");
  s("sekreterlik", "Aile hekimliği hizmetleri hangi basamağa örnektir?", ["Üçüncü basamak", "Birinci basamak", "Mülkiyet sınıfı", "Özel dal sınıfı"], 1, "Aile hekimliği temel birinci basamak örneğidir.");
  s("sekreterlik", "Uzmanlık hizmeti veren pek çok hastanenin temel basamağı hangisidir?", ["Arşiv basamağı", "Birinci basamak", "Üçüncü basamak", "İkinci basamak"], 3, "İkinci basamak uzmanlık ve hastane hizmetleriyle ilişkilidir.");
  s("sekreterlik", "Genel uzmanlık poliklinikleriyle hizmet veren bir hastane genelde hangi düzeydedir?", ["Birinci basamak", "Üçüncü basamak", "Arşiv basamağı", "İkinci basamak"], 3, "İkinci basamak uzmanlık ve hastane hizmetleriyle ilişkilidir.");
  s("sekreterlik", "İleri uzmanlaşmış sağlık hizmetleri hangi basamaktadır?", ["İkinci basamak", "Birinci basamak", "Büro hizmeti", "Üçüncü basamak"], 3, "Üçüncü basamak ileri uzmanlaşmayı ifade eder.");
  s("sekreterlik", "Karmaşık ileri teknoloji tedavileri hangi hizmet düzeyiyle ilişkilidir?", ["İkinci basamak", "Üçüncü basamak", "Büro hizmeti", "Halkla ilişkiler"], 1, "Üçüncü basamak ileri uzmanlaşmayı ifade eder.");
  s("sekreterlik", "Çeşitli branşlarda hizmet veren hastane türü nedir?", ["Eczane", "Genel hastane", "Laboratuvar deposu", "Aile sağlığı merkezi"], 1, "Genel hastane birden çok alanda hizmet sunabilir.");
  s("sekreterlik", "Birçok farklı uzmanlık dalı bulunan kurum nasıl adlandırılır?", ["Laboratuvar deposu", "Eczane", "Özel dal hastanesi", "Genel hastane"], 3, "Genel hastane birden çok alanda hizmet sunabilir.");
  s("sekreterlik", "Yalnız belirli branşa odaklanan hastane türü nedir?", ["Arşiv birimi", "Özel dal hastanesi", "Genel hastane", "Aile sağlığı merkezi"], 1, "Özel dal hastaneleri belirli branşa yoğunlaşır.");
  s("sekreterlik", "Sadece belirli hastalık alanına yoğunlaşan yataklı kurum nedir?", ["Arşiv birimi", "İşletme deposu", "Genel hastane", "Özel dal hastanesi"], 3, "Özel dal hastaneleri belirli branşa yoğunlaşır.");
  s("sekreterlik", "Kamu-özel ayrımı hangi sınıflamadır?", ["Mülkiyet sınıflaması", "Tanı sınıflaması", "Arşiv sınıflaması", "Basamak sınıflaması"], 0, "Kamu/özel ayrımı mülkiyetle ilgilidir.");
  s("sekreterlik", "Bir hastanenin devlet veya özel kişi kuruluşuna ait olması neyi gösterir?", ["Kod sınıflaması", "Basamak sınıflaması", "Tanı sınıflaması", "Mülkiyet sınıflaması"], 3, "Kamu/özel ayrımı mülkiyetle ilgilidir.");
  s("sekreterlik", "Hastanenin eğitim işlevi hangi niteliği anlatır?", ["Arşiv rafı", "Mülkiyetin tek ölçütü", "Klavye türü", "Eğitim ve araştırma niteliği"], 3, "Eğitim niteliği mülkiyetten farklıdır.");
  s("sekreterlik", "Uzman yetiştirme faaliyetleriyle tanımlanan hastane özelliği hangisidir?", ["Klavye türü", "Eğitim ve araştırma niteliği", "Arşiv rafı", "Mülkiyetin tek ölçütü"], 1, "Eğitim niteliği mülkiyetten farklıdır.");
  s("halkla-iliskiler", "Etkili halkla ilişkiler iletişiminin yönü nasıl olmalıdır?", ["Gizli duyuru", "Sessiz iletişim", "Kayıtsız konuşma", "İki yönlü iletişim"], 3, "Geri bildirim iki yönlü iletişimin parçasıdır.");
  s("halkla-iliskiler", "Hastadan geri bildirim dinleyen kurum hangi iletişim yöntemini kullanır?", ["İki yönlü iletişim", "Gizli duyuru", "Tek taraflı emir", "Sessiz iletişim"], 0, "Geri bildirim iki yönlü iletişimin parçasıdır.");
  s("halkla-iliskiler", "Öfkeli hastayla ilk uygun iletişim davranışı hangisidir?", ["Söz kesme", "Şikâyeti yok sayma", "Alay etme", "Sakin ve aktif dinleme"], 3, "Sakin dinleme gerilimi azaltır.");
  s("halkla-iliskiler", "Sırası geciken kişi bağırdığında sekreterin ilk yaklaşımı nedir?", ["Ses yükseltme", "Söz kesme", "Şikâyeti yok sayma", "Sakin ve aktif dinleme"], 3, "Sakin dinleme gerilimi azaltır.");
  s("halkla-iliskiler", "Anlaşılmayan yönerge karşısında iyi iletişim nasıl kurulur?", ["Açık ve yeniden doğrulanmış yönlendirme", "Bilinmeyen bilgi uydurma", "Hızlıca geçiştirme", "Azarlama"], 0, "Anlaşılırlığı teyit etmek hataları azaltır.");
  s("halkla-iliskiler", "Hasta tarif edilen servisi bulamadığında hangi tutum uygundur?", ["Azarlama", "Açık ve yeniden doğrulanmış yönlendirme", "Bilinmeyen bilgi uydurma", "Hızlıca geçiştirme"], 1, "Anlaşılırlığı teyit etmek hataları azaltır.");
  s("halkla-iliskiler", "Karşı tarafın bakış açısını anlamaya çalışma nedir?", ["Empati", "Kodlama", "Denetim izi", "Arşivleme"], 0, "Empati karşı tarafın duygusunu anlamaya yöneliktir.");
  s("halkla-iliskiler", "Kaygılı hastanın durumunu anlamak için kendisini onun yerine koymak hangi beceridir?", ["Kodlama", "Denetim izi", "Paraf", "Empati"], 3, "Empati karşı tarafın duygusunu anlamaya yöneliktir.");
  s("halkla-iliskiler", "Telefon karşılama için hangi konuşma biçimi uygundur?", ["Ses yükseltme", "Kim arıyor diye sert çıkış", "Konuşmadan kapatma", "Nazik kurum tanıtımı ve yardım teklifi"], 3, "Telefon karşılama açık ve saygılı olmalıdır.");
  s("halkla-iliskiler", "Kurumu arayan kişiye ilk söz nasıl olmalıdır?", ["Konuşmadan kapatma", "Kim arıyor diye sert çıkış", "Kişisel bilgi istemeden alay etme", "Nazik kurum tanıtımı ve yardım teklifi"], 3, "Telefon karşılama açık ve saygılı olmalıdır.");
  s("halkla-iliskiler", "İletişimde geri bildirim neyi sağlar?", ["Kimlik karıştırma", "Rapor silme", "Evrak imhası", "Anlamayı doğrulama"], 3, "Geri bildirim iletişim hatalarını azaltır.");
  s("halkla-iliskiler", "Hastanın verilen bilgiyi doğru anlayıp anlamadığını kontrol etmek nedir?", ["Anlamayı doğrulama", "Kimlik karıştırma", "Evrak imhası", "Konuyu kapatma"], 0, "Geri bildirim iletişim hatalarını azaltır.");
  s("halkla-iliskiler", "Bilmediği konuda bilgi uydurmamak hangi yaklaşımı gösterir?", ["Gizli işlem", "Yanlış vaat", "Tıbbi tanı", "Dürüst ve doğru bilgilendirme"], 3, "Bilgi doğruluğu güvenin temelidir.");
  s("halkla-iliskiler", "Sekreter kesin olmayan işlem saatini söylemek yerine kontrol edeceğini belirtiyor. Bu nedir?", ["Tıbbi tanı", "Yanlış vaat", "Gizli işlem", "Dürüst ve doğru bilgilendirme"], 3, "Bilgi doğruluğu güvenin temelidir.");
  s("on-parmak", "Ekran ve sandalyenin vücut ölçüsüne uygunluğu hangi kavramdır?", ["Farmakoloji", "Kodlama", "Ergonomi", "Mikrobiyoloji"], 2, "Ergonomi çalışma düzeninin insana uyumudur.");
  s("on-parmak", "Uzun bilgisayar çalışmasında oturma yüksekliğini ayarlamak hangi uygulamadır?", ["Kodlama", "Patoloji", "Farmakoloji", "Ergonomi"], 3, "Ergonomi çalışma düzeninin insana uyumudur.");
  s("on-parmak", "Türkçe harf kullanımına göre geliştirilmiş klavye hangisidir?", ["DICOM", "AZERTY", "QWERTY", "F klavye"], 3, "F klavye Türkçe için tasarlanmıştır.");
  s("on-parmak", "Türkçede verimli tuş yerleşimi sunmayı amaçlayan klavye hangisidir?", ["DICOM", "F klavye", "AZERTY", "HBYS"], 1, "F klavye Türkçe için tasarlanmıştır.");
  s("on-parmak", "QWERTY neyi ifade eder?", ["Hasta tanısını", "Klavye düzenini", "Muayene kodunu", "Arşiv saklama süresini"], 1, "QWERTY klavye düzenidir.");
  s("on-parmak", "Bir bilgisayarda QWERTY seçimi yapılması hangi ayarı değiştirir?", ["Klavye düzenini", "Kurum yetkisini", "Muayene kodunu", "Arşiv saklama süresini"], 0, "QWERTY klavye düzenidir.");
  s("on-parmak", "Yazım hatasını azaltmada en yararlı yöntem nedir?", ["Belge saklama süresini kısaltma", "Son kontrol", "Tanı değiştirme", "Rastgele kopyalama"], 1, "Son kontrol veri giriş hatalarını azaltır.");
  s("on-parmak", "Hasta adını sisteme girdikten sonra ikinci kez okumak ne sağlar?", ["Belge saklama süresini kısaltma", "Rastgele kopyalama", "Şifre paylaşımı", "Son kontrol"], 3, "Son kontrol veri giriş hatalarını azaltır.");
  s("on-parmak", "Yapılacak işlerin öncelik sırasına konması hangi beceridir?", ["Tanı kodlama yetkisi", "Görüntü yorumlama", "İş planlama", "Ameliyat hazırlama"], 2, "Planlama kaynakların düzenli kullanımını sağlar.");
  s("on-parmak", "Acil idari işler ile rutin görevlerin sıralanması neyle ilgilidir?", ["İş planlama", "Görüntü yorumlama", "Ameliyat hazırlama", "İlaç uygulama"], 0, "Planlama kaynakların düzenli kullanımını sağlar.");
  s("on-parmak", "Resmî metindeki yazım bütünlüğü nasıl korunur?", ["Belge standardizasyonu", "Hasta seçme", "Tedavi değiştirme", "Şifreleme"], 0, "Standart biçim izlenebilirliği kolaylaştırır.");
  s("on-parmak", "Yazının tarih ve sayı alanlarını tutarlı biçimde yazmak hangi amaca hizmet eder?", ["Tedavi değiştirme", "Rastgele tasarım", "Belge standardizasyonu", "Hasta seçme"], 2, "Standart biçim izlenebilirliği kolaylaştırır.");
  s("on-parmak", "Uzun süre klavye kullanan çalışanda mola düzeninin amacı nedir?", ["Dosya karıştırma", "Veri kaydı gizleme", "Şifre paylaşma", "Çalışma sağlığını destekleme"], 3, "Uygun çalışma düzeni fiziksel yükü azaltabilir.");
  s("on-parmak", "Tekrarlı bilgisayar kullanımında kısa uygun aralar verilmesi hangi yaklaşımdır?", ["Şifre paylaşma", "İstem silme", "Çalışma sağlığını destekleme", "Veri kaydı gizleme"], 2, "Uygun çalışma düzeni fiziksel yükü azaltabilir.");
  s("yazisma", "Önceki bağlantılı yazının belirtildiği resmî yazı alanı hangisidir?", ["Ek", "Dağıtım", "İmza", "İlgi"], 3, "İlgi önceki bağlantılı belgeye atıf yapar.");
  s("yazisma", "Önceki tarihli yazıya cevap veren belgede başvuru ne altında gösterilir?", ["Dağıtım", "Konu", "İlgi", "İmza"], 2, "İlgi önceki bağlantılı belgeye atıf yapar.");
  s("yazisma", "Yazının ana içeriğini özetleyen alan hangisidir?", ["Ek", "İlgi", "İmza", "Konu"], 3, "Konu yazının ana içeriğini özetler.");
  s("yazisma", "Evrakın ne hakkında olduğunu kısaca belirten başlık nedir?", ["Dağıtım", "Ek", "İmza", "Konu"], 3, "Konu yazının ana içeriğini özetler.");
  s("yazisma", "Yazının kimlere gönderildiğini belirten alan hangisidir?", ["Konu", "İlgi", "Sayı", "Dağıtım"], 3, "Dağıtım alıcıları gösterir.");
  s("yazisma", "İlgili birimlerin alıcı listesi yazının hangi bölümündedir?", ["Dağıtım", "Konu", "Tarih", "İlgi"], 0, "Dağıtım alıcıları gösterir.");
  s("yazisma", "Yazı ile birlikte sunulan belgeler hangi başlıkta listelenir?", ["Paraf", "İmza", "İlgi", "Ek"], 3, "Ek alanı iliştirilen belgeleri belirtir.");
  s("yazisma", "Resmî yazıya iliştirilmiş tablo ve dosya hangi bölümde gösterilir?", ["İlgi", "Tarih", "İmza", "Ek"], 3, "Ek alanı iliştirilen belgeleri belirtir.");
  s("yazisma", "Belgenin kurumsal onay aşamasında adı geçen unsur hangisidir?", ["Sadece ek", "Sadece dağıtım", "İmza veya onay", "Sadece konu"], 2, "Yetkili onay belgenin resmî sürecindedir.");
  s("yazisma", "Yetkili kişinin yazıyı resmen doğrulaması hangi işlemdir?", ["Sadece konu", "Sadece dağıtım", "Sadece ilgi", "İmza veya onay"], 3, "Yetkili onay belgenin resmî sürecindedir.");
  s("yazisma", "Kurumsal yazışma akışının elektronik ortamda tutulması nedir?", ["DICOM", "PACS", "EKG", "EBYS"], 3, "EBYS elektronik belge yönetimidir.");
  s("yazisma", "Yazı hazırlama ve sevk süreçleri dijital izleniyorsa hangi sistem kullanılır?", ["DICOM", "EKG", "EBYS", "PACS"], 2, "EBYS elektronik belge yönetimidir.");
  s("yazisma", "Belge konusuna göre dosyalama için kullanılan yapı hangisidir?", ["Hasta sıra listesi", "Standart dosya planı", "Malzeme kataloğu", "Acil kod listesi"], 1, "Standart dosya planı belge konularını sınıflandırır.");
  s("yazisma", "Bir evrakın arşivde konu başlığı altında kodlanması hangi sistemi kullanır?", ["Hasta sıra listesi", "Acil kod listesi", "Klavye düzeni", "Standart dosya planı"], 3, "Standart dosya planı belge konularını sınıflandırır.");
  s("arsiv", "Arşivden çıkan dosyanın yerine konan izleme aracı nedir?", ["Vekil dosya", "Anamnez", "Epikriz", "Reçete"], 0, "Vekil dosya çıkarılan dosyanın hareketini gösterir.");
  s("arsiv", "Asıl dosya başka birimdeyken rafta yerine konan takip nesnesi hangisidir?", ["Vekil dosya", "Reçete", "Anamnez", "Epikriz"], 0, "Vekil dosya çıkarılan dosyanın hareketini gösterir.");
  s("arsiv", "Belgelerde eksik imza tespiti hangi arşiv işidir?", ["Ameliyat kararı", "Reçete yenileme", "Stok sayımı", "Eksik belge takibi"], 3, "Eksik belge ilgili süreçte tamamlatılır.");
  s("arsiv", "Arşiv biriminde imzası olmayan form görüldüğünde hangi işlem başlar?", ["Eksik belge takibi", "Tanı değiştirme", "Stok sayımı", "Reçete yenileme"], 0, "Eksik belge ilgili süreçte tamamlatılır.");
  s("arsiv", "Dosyanın kimde olduğunu izlemek için ne gerekir?", ["Dosya hareket kaydı", "Sözlü söylenti", "Ortak şifre", "Rastgele raf"], 0, "Hareket kaydı dosyanın yerini belirlemeyi sağlar.");
  s("arsiv", "Bir dosya başka servise teslim edildiğinde hangi kayıt önemlidir?", ["Dosya hareket kaydı", "Ortak şifre", "İmhasız kayıp", "Rastgele raf"], 0, "Hareket kaydı dosyanın yerini belirlemeyi sağlar.");
  s("arsiv", "Benzer isimli dosyaların karışmaması için hangi yöntem uygundur?", ["Tekil dosya numarası ve kimlik kontrolü", "Hastanın kıyafeti", "Sayfa kalınlığı", "Rafın rengi"], 0, "Tekil kimlik ve indeksleme karışmayı azaltır.");
  s("arsiv", "Arşiv rafında aynı isimde iki kişi varsa neye göre eşleme yapılmalıdır?", ["Hastanın kıyafeti", "Tekil dosya numarası ve kimlik kontrolü", "Sayfa kalınlığı", "Rafın rengi"], 1, "Tekil kimlik ve indeksleme karışmayı azaltır.");
  s("arsiv", "Eski tıbbi belgelerin imhasında hangi yaklaşım gereklidir?", ["Süre dolmadan silme", "Herkese dağıtma", "Güncel mevzuata uygun yetkili imha süreci", "Çalışanın kişisel kararı"], 2, "Tıbbi kayıt imhası usul ve yetki gerektirir.");
  s("arsiv", "Saklama süresi dolduğu düşünülen kayıtların yok edilmesinde ne esas alınır?", ["Güncel mevzuata uygun yetkili imha süreci", "Herkese dağıtma", "Süre dolmadan silme", "Rastgele çöpe atma"], 0, "Tıbbi kayıt imhası usul ve yetki gerektirir.");
  s("arsiv", "Arşivde dosyanın bulunabilirliğini ne sağlar?", ["Ortak parola", "Adsız klasör", "Hatalı numara", "Düzenli indeksleme"], 3, "İndeksleme aranan kaydı bulmayı kolaylaştırır.");
  s("arsiv", "Sorgulanan hastanın dosyasına hızlı erişmek hangi düzenin başarısıdır?", ["Hatalı numara", "Ortak parola", "Adsız klasör", "Düzenli indeksleme"], 3, "İndeksleme aranan kaydı bulmayı kolaylaştırır.");
  s("arsiv", "Hukuki inceleme için belge talebinde ne gerekir?", ["Kişisel hesapla", "Ziyaretçiye rastgele", "Kayıtsız elden", "Yetkili resmî paylaşım prosedürüyle"], 3, "Hukuki talepler kurum prosedürüne uygun yürütülür.");
  s("arsiv", "Resmî kurumdan dosya istenmesi halinde kayıt nasıl verilir?", ["Kişisel hesapla", "Kayıtsız elden", "Yetkili resmî paylaşım prosedürüyle", "Ziyaretçiye rastgele"], 2, "Hukuki talepler kurum prosedürüne uygun yürütülür.");
  s("icd", "Hastalıkların uluslararası sınıflandırmasına verilen kısa ad nedir?", ["HBYS", "EBYS", "ICD", "PACS"], 2, "ICD hastalık sınıflandırmasıdır.");
  s("icd", "Tanı kodlarını standart biçimde göstermek için kullanılan sınıflandırma hangisidir?", ["EBYS", "PACS", "ICD", "HBYS"], 2, "ICD hastalık sınıflandırmasıdır.");
  s("icd", "Tanı kodlamasının istatistikte sağladığı temel yarar nedir?", ["Rastgele metin", "Şifresiz kayıt", "Serbest tanı uydurma", "Standart kodlama"], 3, "Standart kodlar karşılaştırılabilir veri sağlar.");
  s("icd", "Farklı dönemlerde hastalık sayılarının karşılaştırılması neyle kolaylaşır?", ["Şifresiz kayıt", "Standart kodlama", "Kayıtsız işlem", "Serbest tanı uydurma"], 1, "Standart kodlar karşılaştırılabilir veri sağlar.");
  s("icd", "Kodlama öncesi hangi klinik bilgi esas alınmalıdır?", ["Sosyal medya yorumu", "Komşu önerisi", "Hekim tarafından belgelenmiş tanı", "Tahmin"], 2, "Kodlamada doğrulanmış klinik tanı esastır.");
  s("icd", "Sekreterin kod seçmeden önce bakması gereken güvenilir bilgi hangisidir?", ["Tahmin", "Sosyal medya yorumu", "Komşu önerisi", "Hekim tarafından belgelenmiş tanı"], 3, "Kodlamada doğrulanmış klinik tanı esastır.");
  s("icd", "ICD-10 ve ICD-11 arasındaki fark hangi başlıkla ilgilidir?", ["Hastane katı", "Telefon numarası", "Hasta yaşı", "Sürüm farklılığı"], 3, "ICD sürümleri farklı sınıflandırma sürümleridir.");
  s("icd", "Uluslararası sınıflandırma adındaki 10 ve 11 sayıları neyi anlatır?", ["Arşiv sırası", "Sürüm farklılığı", "Hastane katı", "Telefon numarası"], 1, "ICD sürümleri farklı sınıflandırma sürümleridir.");
  s("icd", "Yanlış hastaya tanı kodu girilmesi ne tür sorundur?", ["Kimlik ve kodlama doğruluğu hatası", "Bina bakım sorunu", "Klavye tercih hatası", "Telefon protokolü"], 0, "Tanı kodu doğru kişiye bağlanmalıdır.");
  s("icd", "Başka kişinin kodunun dosyaya işlenmesi hangi kalite riskini doğurur?", ["Bina bakım sorunu", "Telefon protokolü", "Kimlik ve kodlama doğruluğu hatası", "Mobilya sorunu"], 2, "Tanı kodu doğru kişiye bağlanmalıdır.");
  s("icd", "Kodlama ile HBYS arasındaki ilişki hangisidir?", ["Kodlar yalnız yazışmada kullanılır", "Aynı iki isimdir", "Kod standardı ile uygulama sistemi farklıdır", "ICD resim standardıdır"], 2, "ICD sınıflandırma; HBYS uygulama sistemidir.");
  s("icd", "Sistemde kullanılan ICD kodu ile hasta kayıt programı nasıl ayrılır?", ["Kod standardı ile uygulama sistemi farklıdır", "HBYS sadece klavyedir", "Aynı iki isimdir", "Kodlar yalnız yazışmada kullanılır"], 0, "ICD sınıflandırma; HBYS uygulama sistemidir.");
  s("icd", "Kod açıklaması ile hekim tanısı uyuşmazsa ne yapılır?", ["Tanıyı tahmin etme", "Yetkili doğrulama ve düzeltme", "Herkese yayınlama", "Durumu gizleme"], 1, "Uyumsuz kayıt doğrulanmalıdır.");
  s("icd", "Girilen kod klinik kayda uymuyorsa uygun yaklaşım nedir?", ["Durumu gizleme", "Rastgele kod seçimi", "Herkese yayınlama", "Yetkili doğrulama ve düzeltme"], 3, "Uyumsuz kayıt doğrulanmalıdır.");
  s("sekreterlik", "Kalp veya solunum durmasıyla ilişkili acil renk hangisidir?", ["Yeşil kod", "Kırmızı kod", "Pembe kod", "Mavi kod"], 3, "Mavi kod yaşamsal acil durumla ilişkilidir.");
  s("sekreterlik", "Arrest durumunda ekip çağrısı için hangi renk kodu kullanılır?", ["Yeşil kod", "Kırmızı kod", "Mavi kod", "Pembe kod"], 2, "Mavi kod yaşamsal acil durumla ilişkilidir.");
  s("sekreterlik", "Sağlık çalışanına şiddet olaylarıyla ilişkili renk hangisidir?", ["Kırmızı kod", "Beyaz kod", "Pembe kod", "Mavi kod"], 1, "Beyaz kod sağlıkta şiddet bildirimine ilişkindir.");
  s("sekreterlik", "Personele saldırı olayı için bilinen güvenlik kodu hangisidir?", ["Sarı kod", "Beyaz kod", "Pembe kod", "Kırmızı kod"], 1, "Beyaz kod sağlıkta şiddet bildirimine ilişkindir.");
  s("sekreterlik", "Bebek veya çocuk kaçırılmasını bildiren renk hangisidir?", ["Mavi kod", "Kırmızı kod", "Pembe kod", "Mor kod"], 2, "Pembe kod çocuk/bebek kaçırma şüphesine ilişkindir.");
  s("sekreterlik", "Yenidoğan kaybolması şüphesinde hangi renk kodu gündeme gelir?", ["Pembe kod", "Beyaz kod", "Mavi kod", "Mor kod"], 0, "Pembe kod çocuk/bebek kaçırma şüphesine ilişkindir.");
  s("sekreterlik", "Yangın olaylarıyla ilişkili renk kodu hangisidir?", ["Gri kod", "Kırmızı kod", "Pembe kod", "Mavi kod"], 1, "Kırmızı kod yangınla ilişkilidir.");
  s("sekreterlik", "Bir serviste yangın alarmı verilmesi hangi renkle ilişkilidir?", ["Mavi kod", "Kırmızı kod", "Beyaz kod", "Gri kod"], 1, "Kırmızı kod yangınla ilişkilidir.");
  s("sekreterlik", "Acil durum renk kodlarında telefon numarasını nereden öğrenmek gerekir?", ["Rastgele internet yorumundan", "Başka şehirdeki numaradan", "Tahminle", "Kurumun güncel acil durum talimatından"], 3, "Arama numaraları kurum uygulamasıyla doğrulanmalıdır.");
  s("sekreterlik", "Yeni göreve başlayan sekreter acil numaraları hangi kaynaktan doğrulamalıdır?", ["Kurumun güncel acil durum talimatından", "Başka şehirdeki numaradan", "Tahminle", "Rastgele internet yorumundan"], 0, "Arama numaraları kurum uygulamasıyla doğrulanmalıdır.");
  s("sekreterlik", "Acil durum çağrısını yapan sekreterin uygun görevi nedir?", ["Dosyayı imha etmek", "Doğru kodu yetkili prosedüre göre bildirmek", "Olayı gizlemek", "İlaç dozunu değiştirmek"], 1, "Bildirim ve koordinasyon sekreterin rolü olabilir.");
  s("sekreterlik", "Olayı gördüğünde sekreter hangi adımı önceler?", ["Olayı gizlemek", "Doğru kodu yetkili prosedüre göre bildirmek", "İlaç dozunu değiştirmek", "Bağımsız ameliyat yapmak"], 1, "Bildirim ve koordinasyon sekreterin rolü olabilir.");

  // Claude'un yazdığı özgün sorular, 2. set (15.11.2026). 657 soruları Kanun metninden, Kararname soruları Sağlık Bakanlığı bölümünden kontrol edilerek yazıldı.
  // 3 Mevzuat: 657 sayılı Kanun
  s("mevzuat", "657 sayılı Kanun'a göre, memurlara sınıfları içinde en yüksek derecelere kadar ilerleme imkânı sağlanması hangi temel ilkenin gereğidir?", ["Sınıflandırma", "Kariyer", "Liyakat", "Tarafsızlık"], 1, "Madde 3/B: kariyer ilkesi, memura sınıfı içinde en yüksek derecelere kadar ilerleme imkânı sağlamaktır.");
  s("mevzuat", "657 sayılı Kanun'a göre, kamu hizmeti görevlerine girmenin, ilerleme ve yükselmenin, görevin sona erdirilmesinin yeterliğe dayandırılması hangi temel ilkedir?", ["Kariyer", "Sınıflandırma", "Liyakat", "Eşitlik"], 2, "Madde 3/C: liyakat ilkesi, bu işlemleri liyakat sistemine dayandırmak ve memuru güvenliğe sahip kılmaktır.");
  s("mevzuat", "Aşağıdakilerden hangisi 657 sayılı Kanun'un 36. maddesinde sayılan hizmet sınıflarından biri değildir?", ["Avukatlık Hizmetleri Sınıfı", "Din Hizmetleri Sınıfı", "Yardımcı Hizmetler Sınıfı", "Adalet Hizmetleri Sınıfı"], 3, "Madde 36'da on iki sınıf sayılır; “Adalet Hizmetleri” adıyla bir sınıf yoktur.");
  s("mevzuat", "Tıbbi sekreter kadrosu 657 sayılı Kanun'a göre hangi hizmet sınıfında yer alır?", ["Genel İdare Hizmetleri Sınıfı", "Sağlık Hizmetleri ve Yardımcı Sağlık Hizmetleri Sınıfı", "Teknik Hizmetler Sınıfı", "Yardımcı Hizmetler Sınıfı"], 1, "Tıbbi sekreter, Sağlık Hizmetleri ve Yardımcı Sağlık Hizmetleri Sınıfındaki kadrolardandır; bu nedenle atama unvan değişikliği sınavıyla yapılır.");
  s("mevzuat", "Aşağıdakilerden hangisi 657 sayılı Kanun'un 48. maddesinde sayılan memurluğa alınmanın genel şartlarından biri değildir?", ["Türk vatandaşı olmak", "Kamu haklarından mahrum bulunmamak", "En az lisans düzeyinde öğrenim görmüş olmak", "Görevini devamlı yapmasına engel olabilecek akıl hastalığı bulunmamak"], 2, "Genel şartlarda öğrenim için 41. maddeye atıf yapılır; lisans mezuniyeti genel şart değildir.");
  s("mevzuat", "657 sayılı Kanun'a göre başka yerdeki bir göreve atanan memur, atama emrinin tebliğinden itibaren kaç gün içinde o yere hareket etmek zorundadır?", ["7 gün", "10 gün", "15 gün", "30 gün"], 2, "Madde 62: başka yerdeki göreve atananlar 15 gün içinde hareket eder ve yol süresini izleyen iş günü işe başlar.");
  s("mevzuat", "657 sayılı Kanun'a göre kademe ilerlemesi için memurun bulunduğu kademede en az ne kadar çalışmış olması gerekir?", ["6 ay", "1 yıl", "2 yıl", "3 yıl"], 1, "Madde 64: bulunduğu kademede en az bir yıl çalışmış olmak ve ilerleyebileceği bir kademenin bulunması gerekir.");
  s("mevzuat", "657 sayılı Kanun'a göre son kaç yıl içinde disiplin cezası almayan memura bir kademe ilerlemesi uygulanır?", ["3 yıl", "5 yıl", "8 yıl", "10 yıl"], 2, "Madde 64: son sekiz yıl içinde herhangi bir disiplin cezası almayanlara bir kademe ilerlemesi verilir.");
  s("mevzuat", "657 sayılı Kanun'a göre usulüne uygun olarak görevinden çekilen memur, kaç ay geçmeden yeniden memurluğa atanamaz?", ["3 ay", "6 ay", "12 ay", "36 ay"], 1, "Madde 97/A: usulüne uygun çekilenler 6 ay geçmeden atanamaz.");
  s("mevzuat", "İzinsiz olarak görevini terk ettiği için çekilmiş sayılan memur, 657 sayılı Kanun'a göre ne kadar süre geçmeden yeniden atanamaz?", ["6 ay", "1 yıl", "3 yıl", "Hiçbir şekilde atanamaz"], 1, "Madde 97/B: usule uymadan görevden ayrılanlar 1 yıl geçmeden atanamaz.");
  s("mevzuat", "Devir ve teslim yükümlülüğünü yerine getirmeden görevini bırakan memur, 657 sayılı Kanun'a göre kaç yıl geçmeden yeniden memurluğa alınamaz?", ["1 yıl", "2 yıl", "3 yıl", "5 yıl"], 2, "Madde 97/C: 95. maddedeki devir teslim zorunluluğuna uymayanlar 3 yıl geçmeden atanamaz.");
  s("mevzuat", "657 sayılı Kanun'a göre hizmeti tam 10 yıl olan memurun yıllık izin süresi kaç gündür?", ["15 gün", "20 gün", "25 gün", "30 gün"], 1, "Madde 102: hizmeti 1 yıldan 10 yıla kadar (10 yıl dahil) olanların izni 20 gündür; 30 gün için 10 yıldan fazla hizmet gerekir.");
  s("mevzuat", "657 sayılı Kanun'a göre kullanılmayan yıllık izinlerle ilgili aşağıdakilerden hangisi doğrudur?", ["Kullanılmayan izinler süresiz birikir", "Cari yıl ile bir önceki yıl hariç, önceki yıllara ait kullanılmayan izin hakları düşer", "Yalnızca cari yılın izni kullanılabilir", "Kullanılmayan izinlerin ücreti ödenir"], 1, "Madde 103: cari yıl ile bir önceki yıl dışındaki yıllara ait kullanılmayan izin hakları düşer.");
  s("mevzuat", "657 sayılı Kanun'a göre kadın memura verilen analık izni, doğum öncesi ve sonrası toplam kaç haftadır?", ["12 hafta", "14 hafta", "16 hafta", "24 hafta"], 2, "Madde 104/A: doğumdan önce 8, doğumdan sonra 8 olmak üzere toplam 16 hafta; çoğul gebelikte doğum öncesine 2 hafta eklenir.");
  s("mevzuat", "657 sayılı Kanun'a göre kadın memura verilen süt izni süreleri hangisinde doğru verilmiştir?", ["İlk altı ayda günde 3 saat, ikinci altı ayda günde 1,5 saat", "İlk altı ayda günde 1,5 saat, ikinci altı ayda günde 3 saat", "Bir yıl boyunca günde 2 saat", "İlk altı ayda günde 2 saat, ikinci altı ayda günde 1 saat"], 0, "Madde 104/D: ilk altı ayda günde üç saat, ikinci altı ayda günde bir buçuk saat.");
  s("mevzuat", "657 sayılı Kanun'a göre kanser, verem ve akıl hastalığı gibi uzun süreli tedavi gerektiren hastalıklarda memura en çok ne kadar hastalık izni verilir?", ["6 aya kadar", "12 aya kadar", "18 aya kadar", "24 aya kadar"], 2, "Madde 105: uzun süreli tedavi gerektiren hastalıklarda 18 aya, diğer hastalıklarda 12 aya kadar izin verilir.");
  s("mevzuat", "657 sayılı Kanun'a göre beş hizmet yılını tamamlayan memura, memuriyeti boyunca verilebilecek isteğe bağlı aylıksız izin hangisidir?", ["Bir defada 6 aya kadar", "En fazla iki defada kullanılmak üzere toplam 1 yıla kadar", "Her yıl 3 aya kadar", "En fazla üç defada toplam 2 yıla kadar"], 1, "Madde 108/E: beş hizmet yılını tamamlayanlara, en fazla iki defada kullanılmak üzere toplam bir yıla kadar aylıksız izin verilebilir.");
  s("mevzuat", "657 sayılı Kanun'a göre aylıktan kesme cezası, memurun brüt aylığından hangi oranlar arasında kesinti yapılmasıdır?", ["1/30 ile 1/8 arasında", "1/15 ile 1/4 arasında", "1/10 ile 1/2 arasında", "1/40 ile 1/10 arasında"], 0, "Madde 125/C: aylıktan kesme, brüt aylıktan 1/30 ile 1/8 arasında kesinti yapılmasıdır.");
  s("mevzuat", "657 sayılı Kanun'a göre kademe ilerlemesinin durdurulması cezası hangi süreler için uygulanır?", ["6 ay ile 1 yıl", "1 yıl ile 3 yıl", "2 yıl ile 5 yıl", "3 yıl ile 6 yıl"], 1, "Madde 125/D: fiilin ağırlık derecesine göre kademe ilerlemesi 1 ile 3 yıl durdurulur.");
  s("mevzuat", "657 sayılı Kanun'a göre disiplin cezasını gerektiren fiilin işlendiği tarihten itibaren ne kadar süre içinde ceza verilmezse ceza verme yetkisi zamanaşımına uğrar?", ["6 ay", "1 yıl", "2 yıl", "5 yıl"], 2, "Madde 127: fiilin işlendiği tarihten itibaren en geç iki yıl içinde ceza verilmezse yetki zamanaşımına uğrar.");
  s("mevzuat", "657 sayılı Kanun'a göre hakkında disiplin soruşturması yapılan memura savunması için verilecek süre en az kaç gündür?", ["3 gün", "5 gün", "7 gün", "15 gün"], 2, "Madde 130: savunma alınmadan ceza verilemez; verilen süre 7 günden az olamaz.");
  s("mevzuat", "657 sayılı Kanun'a göre uyarma ve kınama cezaları uygulanmalarından kaç yıl sonra, memurun isteği üzerine özlük dosyasından silinebilir?", ["2 yıl", "5 yıl", "8 yıl", "10 yıl"], 1, "Madde 133: uyarma ve kınama 5 yıl, memurluktan çıkarma dışındaki diğer cezalar 10 yıl sonra silinebilir.");
  s("mevzuat", "657 sayılı Kanun'a göre disiplin cezalarına karşı itiraz süresi, kararın tebliğinden itibaren kaç gündür?", ["7 gün", "10 gün", "15 gün", "30 gün"], 0, "Madde 135: itiraz süresi 7 gündür; itiraz mercii 30 gün içinde karar verir.");
  s("mevzuat", "657 sayılı Kanun'a göre görevden uzaklaştırılan memura bu süre içinde aylığının ne kadarı ödenir?", ["Tamamı", "Yarısı", "Üçte ikisi", "Dörtte biri"], 2, "Madde 141: görevden uzaklaştırılan ve tutuklanan memura aylığının üçte ikisi ödenir.");
  s("mevzuat", "657 sayılı Kanun'a göre bir disiplin kovuşturması nedeniyle yapılan görevden uzaklaştırma en çok ne kadar sürebilir?", ["1 ay", "3 ay", "6 ay", "1 yıl"], 1, "Madde 145: disiplin kovuşturması gereği görevden uzaklaştırma en çok 3 ay sürer.");
  s("mevzuat", "657 sayılı Kanun'a göre memurun görevi sırasında öğrendiği gizli bilgilerle ilgili aşağıdakilerden hangisi doğrudur?", ["Görevden ayrıldıktan sonra serbestçe açıklayabilir", "Görevinden ayrılmış olsa bile, yetkili bakanın yazılı izni olmadan açıklayamaz", "Amirinin sözlü izniyle açıklayabilir", "Yalnızca basına açıklayamaz"], 1, "Madde 31: gizli bilgiler, görevden ayrılmış olunsa bile yetkili bakanın yazılı izni olmadıkça açıklanamaz.");
  // 3 Mevzuat: 1 sayılı Cumhurbaşkanlığı Kararnamesi, Sağlık Bakanlığı
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre aşağıdakilerden hangisi Sağlık Bakanlığının hizmet birimlerinden biri değildir?", ["Halk Sağlığı Genel Müdürlüğü", "Kamu Hastaneleri Genel Müdürlüğü", "Türkiye İlaç ve Tıbbi Cihaz Kurumu", "Sağlık Yatırımları Genel Müdürlüğü"], 2, "Türkiye İlaç ve Tıbbi Cihaz Kurumu bağlı kuruluştur; 354. maddede sayılan hizmet birimleri arasında yer almaz.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre birinci basamak sağlık hizmetlerini yürütmek, hastalık izleme ve aşılama programlarını uygulamak hangi birimin görevidir?", ["Sağlık Hizmetleri Genel Müdürlüğü", "Halk Sağlığı Genel Müdürlüğü", "Kamu Hastaneleri Genel Müdürlüğü", "Sağlığın Geliştirilmesi Genel Müdürlüğü"], 1, "Madde 361: birinci basamak hizmetleri ve hastalık kontrol programları Halk Sağlığı Genel Müdürlüğünün görevidir.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre afet ve acil durumlarda sağlık hizmetlerini planlamak ve hastane öncesi acil sağlık birimlerini kurup işletmek hangi birimin görevidir?", ["Acil Sağlık Hizmetleri Genel Müdürlüğü", "Halk Sağlığı Genel Müdürlüğü", "Sağlık Yatırımları Genel Müdürlüğü", "Yönetim Hizmetleri Genel Müdürlüğü"], 0, "Madde 356: bu görevler Acil Sağlık Hizmetleri Genel Müdürlüğüne aittir.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre Bakanlığa bağlı hastanelerin kurulması ve işletilmesi hangi birimin görev alanındadır?", ["Sağlık Hizmetleri Genel Müdürlüğü", "Halk Sağlığı Genel Müdürlüğü", "Kamu Hastaneleri Genel Müdürlüğü", "Strateji Geliştirme Başkanlığı"], 2, "Madde 362: Bakanlığa bağlı hastanelerin açılması ve işletilmesi Kamu Hastaneleri Genel Müdürlüğünün görevidir.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre Bakanlığın personel planlaması ile atama ve özlük işlemlerini yürüten birim hangisidir?", ["Hukuk Hizmetleri Genel Müdürlüğü", "Yönetim Hizmetleri Genel Müdürlüğü", "Teftiş Kurulu Başkanlığı", "Özel Kalem Müdürlüğü"], 1, "Madde 366: personel işlemleri, satın alma, taşınır ve arşiv hizmetleri Yönetim Hizmetleri Genel Müdürlüğündedir. Unvan değişikliği sınavını da bu birim yürütür.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre sağlık bilişimi alanında ülke politikasını ve standartlarını belirlemek hangi birimin görevidir?", ["Sağlığın Geliştirilmesi Genel Müdürlüğü", "Sağlık Bilgi Sistemleri Genel Müdürlüğü", "Sağlık Hizmetleri Genel Müdürlüğü", "Basın ve Halkla İlişkiler Müşavirliği"], 1, "Madde 358: sağlık bilgi sistemleri politika ve standartları Sağlık Bilgi Sistemleri Genel Müdürlüğünce belirlenir.");
  s("mevzuat", "1 sayılı Cumhurbaşkanlığı Kararnamesi'ne göre Bakanlık binalarının proje, yapım ve onarım işlerini yürüten birim hangisidir?", ["Sağlık Yatırımları Genel Müdürlüğü", "Yönetim Hizmetleri Genel Müdürlüğü", "Kamu Hastaneleri Genel Müdürlüğü", "Strateji Geliştirme Başkanlığı"], 0, "Madde 359: yatırım, proje ve yapım işleri Sağlık Yatırımları Genel Müdürlüğünün görevidir.");
  s("mevzuat", "Aşağıdakilerden hangisi 1 sayılı Cumhurbaşkanlığı Kararnamesi'nin 352. maddesinde Sağlık Bakanlığının görevleri arasında sayılır?", ["Sosyal güvenlik primlerini toplamak", "Uluslararası öneme sahip halk sağlığı risklerinin ülkeye girmesini önlemek", "Tıp fakültelerinin kontenjanlarını belirlemek", "Sağlık çalışanlarının emeklilik işlemlerini yürütmek"], 1, "Madde 352/1-c: uluslararası öneme sahip halk sağlığı risklerinin ülkeye girmesini önlemek Bakanlığın görevidir.");

  // 1 Türkçe Dil Bilgisi
  s("turkce", "Aşağıdaki sözcüklerin hangisinde ünlü düşmesi vardır?", ["oğlu", "kitabı", "geliyor", "hissetmek"], 0, "“Oğul” sözcüğü ünlüyle başlayan ek alınca ikinci hecedeki dar ünlü düşer: oğlu.");
  s("turkce", "Aşağıdaki sözcüklerin hangisinde ünlü daralması vardır?", ["bekliyor", "geldi", "okudu", "yazıyor"], 0, "“Bekle-” fiilinin sonundaki e, -yor ekinin etkisiyle i'ye daralmıştır.");
  s("turkce", "Aşağıdaki sözcüklerin hangisinde ünsüz benzeşmesi (sertleşme) vardır?", ["evde", "yolda", "sınıfta", "kalemde"], 2, "Sert ünsüzle (f) biten sözcüğe gelen -da eki -ta olmuştur.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?", ["Birkaç dosya eksik çıktı.", "Hiçbir evrak kaybolmadı.", "Herşey yolunda görünüyor.", "Herhangi bir sorun yok."], 2, "“Her şey” ayrı yazılır.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?", ["Raporda yanlış bir tarih var.", "Yanlız iki kişi başvurdu.", "Bu konuda yalnız değilsiniz.", "Yanlışlıkla başka dosyayı açmış."], 1, "Sözcüğün doğru yazımı “yalnız”dır (yalın kökünden).");
  s("turkce", "Aşağıdaki cümlelerin hangisinde soru ekinin yazımı yanlıştır?", ["Raporu okudun mu?", "Toplantı bugün mü?", "Dosyayı getirdinmi?", "Güzel mi güzel bir gün."], 2, "Soru eki ayrı yazılır: “getirdin mi?”");
  s("turkce", "Aşağıdaki cümlelerin hangisinde sayıların yazımıyla ilgili bir yanlışlık vardır?", ["Toplantıya on beş kişi katıldı.", "Sınav yüz elli dakika sürdü.", "Arşivde onaltı klasör var.", "İki yüz elli sayfa okudu."], 2, "Birden fazla sözcükten oluşan sayılar ayrı yazılır: “on altı”.");
  s("turkce", "Aşağıdakilerin hangisinde kısaltmaya getirilen ekin yazımı yanlıştır?", ["TBMM'nin", "THY'nin", "TDK'nın", "ABD'nin"], 2, "Büyük harfli kısaltmalara gelen ekler son harfin okunuşuna göre yazılır: “TDK'nin”.");
  s("turkce", "Kendisinden sonra açıklama yapılacak ya da örnek verilecek cümlenin sonuna hangi noktalama işareti konur?", ["Noktalı virgül", "İki nokta", "Üç nokta", "Virgül"], 1, "Açıklama ve örnekten önce iki nokta kullanılır.");
  s("turkce", "Aşağıdakilerin hangisinde kesme işareti yanlış kullanılmıştır?", ["Atatürk'ün", "Erzurum'dan", "İzmir'li", "Van Gölü'ne"], 2, "Özel adlara getirilen yapım ekleri kesmeyle ayrılmaz: “İzmirli”.");
  s("turkce", "“Göz atmak” deyiminin anlamı aşağıdakilerden hangisidir?", ["Dikkatle incelemek", "Kısaca, üstünkörü bakmak", "Kıskanmak", "Gözden kaybetmek"], 1, "Göz atmak, ayrıntıya girmeden kısaca bakmak demektir.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde ek yanlışlığından kaynaklanan bir anlatım bozukluğu vardır?", ["Hastaları ilgilenmek görevimizdir.", "Dosyaları sırasıyla yerleştirdik.", "Raporu zamanında teslim etti.", "Randevuları sekreter düzenliyor."], 0, "“İlgilenmek” fiili “ile” ister: “Hastalarla ilgilenmek”.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde anlamca çelişen sözcüklerin bir arada kullanılmasından kaynaklanan anlatım bozukluğu vardır?", ["Yarın kesinlikle gelebilir.", "Rapor yarın teslim edilecek.", "Belki toplantıya katılırım.", "Evrak mutlaka imzalanmalı."], 0, "“Kesinlikle” kesinlik, “-ebilir” olasılık bildirir; birlikte kullanılamaz.");
  s("turkce", "Aşağıdaki cümlelerden hangisi yüklemine göre isim cümlesidir?", ["Sekreter dosyaları düzenledi.", "Bugün poliklinik çok kalabalık.", "Hasta kayıt için bekliyor.", "Raporlar dün imzalandı."], 1, "Yüklemi “kalabalık” sözcüğüdür; yüklemi isim soylu sözcük olan cümle isim cümlesidir.");
  s("turkce", "Aşağıdaki cümlelerden hangisi devrik cümledir?", ["Beklenen rapor sonunda geldi.", "Geldi sonunda beklenen rapor.", "Rapor sonunda masaya bırakıldı.", "Sonunda herkes raporu okudu."], 1, "Yüklemi (geldi) sonda olmayan cümle devrik cümledir.");
  s("turkce", "“Hızlı yazan sekreter aranıyor.” cümlesinde “hızlı” sözcüğünün türü nedir?", ["Sıfat", "Zarf", "Zamir", "Edat"], 1, "“Hızlı”, “yazan” fiilimsisini nitelediği için zarftır.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde “ile” bağlaç olarak kullanılmıştır?", ["Notları kalem ile yazdı.", "Dosya ile rapor masada duruyor.", "Hastaneye otobüs ile gitti.", "Sevinç ile haberi duyurdu."], 1, "Yerine “ve” getirilebilen “ile” bağlaçtır: dosya ve rapor.");
  s("turkce", "“Gelen evrakı deftere kaydetti.” cümlesinde “gelen” sözcüğü hangi fiilimsi türüdür?", ["İsim-fiil", "Sıfat-fiil", "Zarf-fiil", "Fiilimsi değildir"], 1, "-an/-en eki sıfat-fiil (ortaç) ekidir; “gelen” evrakı niteler.");
  s("turkce", "Aşağıdaki birleşik fiillerden hangisinin yazımı yanlıştır?", ["hissetmek", "fark etmek", "kaybolmak", "yardımetmek"], 3, "Ses olayı olmayan birleşik fiiller ayrı yazılır: “yardım etmek”.");
  s("turkce", "Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili bir yanlışlık vardır?", ["Cumhuriyet 29 Ekim 1923 Pazartesi günü ilan edildi.", "Her Cuma birim toplantısı yapılır.", "Türk Dil Kurumu 1932'de kuruldu.", "Dünya, Güneş'in çevresinde döner."], 1, "Belirli bir tarih bildirmeyen gün adları küçük harfle yazılır: “her cuma”.");
  s("turkce", "“Gözlükçü” sözcüğü kaç yapım eki almıştır?", ["Bir", "İki", "Üç", "Yapım eki almamıştır"], 1, "göz-lük-çü: -lük ve -çü yapım ekleridir.");
  s("turkce", "“Müdür, raporu dikkatle inceledi.” cümlesinde “raporu” sözcüğü hangi ögedir?", ["Özne", "Belirtili nesne", "Dolaylı tümleç", "Zarf tümleci"], 1, "Belirtme hâl eki (-u) almış nesne belirtili nesnedir.");

  // 2 Genel Kültür
  s("genel-kultur", "“Milletin istiklalini yine milletin azim ve kararı kurtaracaktır.” ifadesi hangi belgede yer alır?", ["Amasya Genelgesi", "Erzurum Kongresi kararları", "Misak-ı Millî", "Mudanya Ateşkesi"], 0, "Bu ifade, 22 Haziran 1919 tarihli Amasya Genelgesi'nde geçer.");
  s("genel-kultur", "Erzurum Kongresi hangi tarihte toplanmıştır?", ["19 Mayıs 1919", "22 Haziran 1919", "23 Temmuz 1919", "4 Eylül 1919"], 2, "Erzurum Kongresi 23 Temmuz 1919'da, Sivas Kongresi 4 Eylül 1919'da toplanmıştır.");
  s("genel-kultur", "Misak-ı Millî hangi mecliste kabul edilmiştir?", ["Türkiye Büyük Millet Meclisi", "Son Osmanlı Mebusan Meclisi", "Sivas Kongresi", "Erzurum Kongresi"], 1, "Misak-ı Millî, 28 Ocak 1920'de son Osmanlı Mebusan Meclisi'nde kabul edilmiştir.");
  s("genel-kultur", "Saltanat hangi tarihte kaldırılmıştır?", ["23 Nisan 1920", "1 Kasım 1922", "29 Ekim 1923", "3 Mart 1924"], 1, "Saltanat 1 Kasım 1922'de kaldırılmıştır.");
  s("genel-kultur", "Lozan Barış Antlaşması hangi tarihte imzalanmıştır?", ["11 Ekim 1922", "24 Temmuz 1923", "29 Ekim 1923", "20 Temmuz 1936"], 1, "Lozan Antlaşması 24 Temmuz 1923'te imzalanmıştır.");
  s("genel-kultur", "Halifelik hangi tarihte kaldırılmıştır?", ["1 Kasım 1922", "29 Ekim 1923", "3 Mart 1924", "17 Şubat 1926"], 2, "Halifelik 3 Mart 1924'te kaldırılmıştır.");
  s("genel-kultur", "Yeni Türk harflerinin kabulü hangi yıl gerçekleşmiştir?", ["1925", "1926", "1928", "1934"], 2, "Harf İnkılabı 1 Kasım 1928'de yapılmıştır.");
  s("genel-kultur", "Türk kadınına milletvekili seçme ve seçilme hakkı hangi yıl tanınmıştır?", ["1924", "1930", "1933", "1934"], 3, "Kadınlar 1930'da belediye, 1933'te muhtarlık, 1934'te milletvekili seçimlerine katılma hakkı kazanmıştır.");
  s("genel-kultur", "Kurtuluş Savaşı'nda Doğu Cephesi komutanı kimdir?", ["İsmet Paşa", "Kâzım Karabekir Paşa", "Fevzi Paşa", "Refet Paşa"], 1, "Doğu Cephesi'nde Ermenilere karşı Kâzım Karabekir Paşa komuta etmiştir.");
  s("genel-kultur", "Millî egemenlik ilkesiyle en yakından ilgili Atatürk ilkesi hangisidir?", ["Devletçilik", "Cumhuriyetçilik", "Laiklik", "İnkılapçılık"], 1, "Cumhuriyetçilik, egemenliğin millete ait olmasını esas alır.");
  s("genel-kultur", "Anayasa'ya göre Cumhurbaşkanının görev süresi kaç yıldır?", ["4 yıl", "5 yıl", "6 yıl", "7 yıl"], 1, "Cumhurbaşkanının görev süresi 5 yıldır.");
  s("genel-kultur", "Türkiye Büyük Millet Meclisi kaç milletvekilinden oluşur?", ["450", "550", "600", "650"], 2, "TBMM 600 milletvekilinden oluşur.");
  s("genel-kultur", "Anayasa'ya göre milletvekili seçilebilmek için en az kaç yaşını doldurmuş olmak gerekir?", ["18", "21", "25", "30"], 0, "Milletvekili seçilme yaşı 18'dir.");
  s("genel-kultur", "Anayasa'nın değiştirilemeyecek hükümleri hangi maddelerdir?", ["İlk üç madde", "İlk beş madde", "İlk on madde", "Yalnızca birinci madde"], 0, "Anayasa'nın ilk üç maddesi değiştirilemez ve değiştirilmesi teklif edilemez (madde 4).");
  s("genel-kultur", "Temel hak ve özgürlüklerinin kamu gücü tarafından ihlal edildiğini düşünen kişiler bireysel başvuruyu hangi mahkemeye yapar?", ["Yargıtay", "Danıştay", "Anayasa Mahkemesi", "Sayıştay"], 2, "Bireysel başvuru Anayasa Mahkemesine yapılır.");
  s("genel-kultur", "Kamu idarelerinin gelir, gider ve mallarını TBMM adına denetleyen kurum hangisidir?", ["Danıştay", "Sayıştay", "Devlet Denetleme Kurulu", "Kamu Denetçiliği Kurumu"], 1, "Sayıştay, TBMM adına mali denetim yapar.");
  s("genel-kultur", "Türkiye'nin en yüksek dağı hangisidir?", ["Erciyes Dağı", "Kaçkar Dağı", "Ağrı Dağı", "Süphan Dağı"], 2, "Ağrı Dağı 5137 metre ile Türkiye'nin en yüksek dağıdır.");
  s("genel-kultur", "Türkiye'nin yüzölçümü en büyük gölü hangisidir?", ["Tuz Gölü", "Van Gölü", "Beyşehir Gölü", "Eğirdir Gölü"], 1, "Van Gölü Türkiye'nin en büyük gölüdür.");
  s("genel-kultur", "Aşağıdaki ülkelerden hangisi Türkiye'nin kara sınırı komşusu değildir?", ["Gürcistan", "Ermenistan", "Lübnan", "İran"], 2, "Türkiye'nin Lübnan ile sınırı yoktur.");
  s("genel-kultur", "Türkiye'de ilk Sağlık Bakanı (Sıhhiye ve Muavenet-i İçtimaiye Vekili) kimdir?", ["Refik Saydam", "Adnan Adıvar", "Behçet Uz", "Tevfik Sağlam"], 1, "Sağlık Bakanlığı 3 Mayıs 1920'de kurulmuş, ilk bakan Dr. Adnan Adıvar olmuştur.");
  s("genel-kultur", "Tıp Bayramı her yıl hangi tarihte kutlanır?", ["14 Mart", "7 Nisan", "12 Mayıs", "1 Aralık"], 0, "14 Mart Tıp Bayramı'dır; 7 Nisan Dünya Sağlık Günü, 12 Mayıs Hemşireler Günü'dür.");
  s("genel-kultur", "Büyük Taarruz hangi tarihte başlamıştır?", ["23 Ağustos 1921", "26 Ağustos 1922", "30 Ağustos 1922", "9 Eylül 1922"], 1, "Büyük Taarruz 26 Ağustos 1922'de başlamış, 30 Ağustos'ta Başkomutanlık Meydan Muharebesi kazanılmıştır.");

  // 11 Güzel Konuşma ve Diksiyon
  s("diksiyon", "Aşağıdaki durumların hangisinde ulama yapılmaz?", ["Ünsüzle biten sözcükten sonra ünlüyle başlayan sözcük geldiğinde", "İki sözcük arasında noktalama işareti bulunduğunda", "Şiir okunurken", "Sözcükler aynı söz öbeğinde olduğunda"], 1, "Araya virgül, nokta gibi bir işaret girdiğinde ulama yapılmaz.");
  s("diksiyon", "Türkçede “ğ” sesinin söylenişiyle ilgili aşağıdakilerden hangisi doğrudur?", ["Belirgin biçimde “g” olarak söylenir", "Kendinden önceki ünlüyü uzatır", "“y” sesine dönüşmez", "Sözcük başında bulunabilir"], 1, "“ğ” çoğu durumda kendinden önceki ünlünün uzamasına yol açar: dağ, yağmur.");
  s("diksiyon", "Türkçenin ölçünlü (standart) konuşma dili hangi ağıza dayanır?", ["Ankara ağzı", "İstanbul ağzı", "İzmir ağzı", "Konya ağzı"], 1, "Ölçünlü Türkçe İstanbul ağzını esas alır.");
  s("diksiyon", "Olumsuzluk eki (-ma, -me) alan fiillerde vurgu nerede bulunur?", ["Olumsuzluk ekinin üzerinde", "Olumsuzluk ekinden önceki hecede", "Her zaman son hecede", "Her zaman ilk hecede"], 1, "Olumsuzluk eki vurgusuzdur; vurguyu kendinden önceki heceye atar: “gel-me-di”.");
  s("diksiyon", "Soru eki (mı, mi, mu, mü) vurgu bakımından nasıl bir özellik gösterir?", ["Vurguyu üzerine çeker", "Vurgusuzdur; vurgu kendinden önceki hecede kalır", "Sözcüğün ilk hecesini vurgulu yapar", "Vurguyu tümüyle ortadan kaldırır"], 1, "Soru eki vurgusuzdur: “geldiniz mi?” söylenirken vurgu “-niz” hecesindedir.");
  s("diksiyon", "“S, z, ş” gibi seslerin dilin dişler arasına girmesiyle bozuk çıkarılması hangi konuşma kusurudur?", ["Kekemelik", "Pelteklik", "Tutukluk", "Hızlı konuşma"], 1, "Pelteklik, özellikle ıslıklı seslerin bozuk boğumlanmasıdır.");
  s("diksiyon", "Konuşmanın akıcılığının ses, hece tekrarları ve takılmalarla bozulması hangi konuşma kusurudur?", ["Kekemelik", "Pelteklik", "Genizden konuşma", "Hece yutma"], 0, "Kekemelik bir akıcılık bozukluğudur.");
  s("diksiyon", "Konuşma sırasında yüz kaslarının hareketleriyle duygu ve düşüncelerin yansıtılmasına ne denir?", ["Jest", "Mimik", "Tonlama", "Vurgu"], 1, "Mimik yüz hareketleri, jest el, kol ve baş hareketleridir.");
  s("diksiyon", "Aşağıdakilerden hangisi hazırlıklı konuşma türüdür?", ["Sohbet", "Telefon görüşmesi", "Konferans", "Tanışma"], 2, "Konferans önceden hazırlanan bir konuşma türüdür; diğerleri hazırlıksız konuşmalardır.");
  s("diksiyon", "Sesin incelik ya da kalınlık özelliğine ne ad verilir?", ["Şiddet", "Perde", "Tını", "Süre"], 1, "Perde sesin tizlik ya da pesliğidir; şiddet gürlük, tını ise sese özgü renktir.");
  s("diksiyon", "“Hala” ve “hâlâ” sözcüklerinde düzeltme işaretinin işlevi nedir?", ["Sözcüğü süslemek", "Anlamı ve söylenişi ayırmak", "Vurguyu ilk heceye taşımak", "Sözcüğü büyük harfle başlatmak"], 1, "Düzeltme işareti uzun ünlüyü gösterir ve yazılışı aynı, anlamı farklı sözcükleri ayırır.");
  s("diksiyon", "“Geliyorum” sözcüğünün “geliyom” biçiminde söylenmesi hangi boğumlanma kusuruna örnektir?", ["Ulama", "Hece yutma", "Vurgu yanlışı", "Tonlama eksikliği"], 1, "Sözcükteki ses ya da hecelerin söylenmemesi hece yutmadır.");
  s("diksiyon", "Resmî bir telefon görüşmesinde karşıdaki kişiye hangi hitap biçimi kullanılmalıdır?", ["“Sen” hitabı", "“Siz” hitabı", "Lakap", "Yalnızca ön adı"], 1, "Resmî görüşmelerde nezaket gereği “siz” kullanılır.");
  s("diksiyon", "Sesi oluşturan ses telleri hangi organda bulunur?", ["Yutak", "Gırtlak", "Soluk borusu", "Akciğer"], 1, "Ses telleri gırtlakta (larinks) yer alır.");
  s("diksiyon", "Doğru nefes almada rol oynayan diyafram nedir?", ["Ses tellerini geren kıkırdak", "Göğüs boşluğunu karın boşluğundan ayıran kas", "Burun boşluğundaki zar", "Dilin arka bölümü"], 1, "Diyafram, göğüs ve karın boşluklarını ayıran, solunumun temel kasıdır.");

  // 4 Tıbbi Dokümantasyon
  s("dokumantasyon", "Hasta dosyasındaki formların eksiksiz olup olmadığının, imza ve tarihlerin bulunup bulunmadığının kontrol edilmesi hangi analiz türüdür?", ["Niteliksel analiz", "Niceliksel analiz", "İstatistiksel analiz", "Maliyet analizi"], 1, "Niceliksel analiz eksiklik denetimidir; niteliksel analiz içeriğin tutarlılık ve doğruluğuna bakar.");
  s("dokumantasyon", "Hastaya ilk başvurusunda verilen dosya numarasının sonraki bütün başvurularında da kullanıldığı numaralama sistemi hangisidir?", ["Seri numaralama", "Ünite numaralama", "Seri-ünite numaralama", "Kronolojik numaralama"], 1, "Ünite numaralamada hastanın tek numarası ve tek dosyası olur.");
  s("dokumantasyon", "Hastaya her başvurusunda yeni bir dosya numarası verilen numaralama sistemi hangisidir?", ["Seri numaralama", "Ünite numaralama", "Son rakam sistemi", "Alfabetik sistem"], 0, "Seri numaralamada her başvuru yeni numara alır; hastanın kayıtları dağınık kalır.");
  s("dokumantasyon", "Hastanın kimlik bilgileriyle dosya numarası arasında bağlantı kuran ve dosyanın bulunmasını sağlayan kayıt hangisidir?", ["Hasta ana indeksi", "Hastalık indeksi", "Ameliyat indeksi", "Hekim indeksi"], 0, "Hasta ana indeksi, hastayı adından ya da kimliğinden dosya numarasına ulaştırır.");
  s("dokumantasyon", "“Morbidite” terimi aşağıdakilerden hangisini ifade eder?", ["Ölüm oranını", "Hastalık durumunu ve hastalanma sıklığını", "Doğum oranını", "Yatak doluluk oranını"], 1, "Morbidite hastalık, mortalite ölüm ile ilgili istatistikleri ifade eder.");
  s("dokumantasyon", "Hekimin hasta için yazdığı tedavi ve bakım talimatlarına ne ad verilir?", ["Epikriz", "Order", "Anamnez", "Konsültasyon"], 1, "Order, hekim istemidir; hemşirelik uygulamaları buna göre yapılır.");
  s("dokumantasyon", "Bir hastalığın olası seyri ve sonucu hakkındaki öngörüye ne ad verilir?", ["Diyagnoz", "Prognoz", "Semptom", "Etiyoloji"], 1, "Prognoz hastalığın gidişine ilişkin öngörüdür; diyagnoz tanı, etiyoloji nedendir.");

  // 12 Dosyalama Arşivleme
  s("arsiv", "Hasta dosyalarının, dosya numarasının son iki hanesine göre raflara yerleştirildiği sistem hangisidir?", ["Düz numerik sistem", "Son rakam (terminal digit) sistemi", "Alfabetik sistem", "Kronolojik sistem"], 1, "Son rakam sisteminde dosyalar raflara eşit dağılır ve yanlış yerleştirme azalır.");
  s("arsiv", "Uzun süredir işlem görmeyen hasta dosyalarının ayrı bir bölümde saklanmasına ne ad verilir?", ["Aktif arşiv", "Pasif arşiv", "Birim arşivi", "Geçici arşiv"], 1, "Sık kullanılan dosyalar aktif, uzun süredir kullanılmayanlar pasif arşivde tutulur.");
  s("arsiv", "Dosya sırtlarında renk kodu kullanılmasının temel yararı nedir?", ["Dosyaların daha az yer kaplaması", "Yanlış yere konan dosyanın kolayca fark edilmesi", "Dosyaların gizliliğinin artması", "Saklama süresinin uzaması"], 1, "Renk kodları yanlış yerleştirmeyi görünür kılar ve erişimi hızlandırır.");
  s("arsiv", "Merkezi olmayan (dağınık) dosyalama sisteminin en önemli sakıncası hangisidir?", ["Dosyaya erişimin yavaş olması", "Aynı hastaya ait bilgilerin farklı birimlerde dağınık kalması", "Arşiv personeli gerektirmesi", "Tek numara kullanılması"], 1, "Dağınık sistemde hastanın kayıtları bölünür; bilgi bütünlüğü sağlanamaz.");

  // 10 Yazışma Teknikleri
  s("yazisma", "Resmî yazılarda tarih nasıl yazılır?", ["Yalnızca yıl yazılır", "Gün, ay ve yıl sırasıyla; rakamla, aralarına nokta konularak ya da ay adı harfle yazılarak", "Ay, gün ve yıl sırasıyla, eğik çizgiyle", "Yıl, ay ve gün sırasıyla, kısa çizgiyle"], 1, "Tarih gün, ay, yıl sırasıyla yazılır: 15.11.2026 ya da 15 Kasım 2026.");
  s("yazisma", "Resmî yazının “Sayı” bölümünde aşağıdakilerden hangisi bulunur?", ["Yazının gönderileceği makam", "Belgenin kayıt numarası ve dosya planı kodu", "Yazıyı imzalayanın unvanı", "Ek listesi"], 1, "Sayı bölümü, yazıyı izlemeyi sağlayan kurumsal kod, dosya planı kodu ve kayıt numarasından oluşur.");
  s("yazisma", "Resmî yazıda ekler nerede gösterilir?", ["Metnin başında", "İmza bloğundan sonra, yazı alanının solunda", "Konu bölümünde", "Sayfanın üst bilgisinde"], 1, "“Ek:” başlığı imza bloğundan sonra, sol tarafa yazılır.");
  s("yazisma", "Birden çok muhataba gönderilen resmî yazının “Dağıtım” bölümü hangi kısımlara ayrılabilir?", ["Arz ve rica", "Gereği ve bilgi", "İlgi ve ek", "Sayı ve konu"], 1, "İşlem yapacak makamlar “Gereği”, bilgi verilenler “Bilgi” kısmında gösterilir.");
  s("yazisma", "Makam onayı alınan resmî yazılarda, onaylayan yetkilinin imza bölümüne hangi ifade yazılır?", ["Uygundur", "Olur", "Görülmüştür", "Aslı gibidir"], 1, "Onay yazılarında “Olur” ifadesi kullanılır; ara kademe “Uygun görüşle arz ederim” yazar.");

  // 13 ICD
  s("icd", "ICD-10'da C00-D48 kod aralığı hangi hastalık grubunu kapsar?", ["Neoplazmlar (tümörler)", "Kan hastalıkları", "Deri hastalıkları", "Konjenital anomaliler"], 0, "C ve D harflerinin bu aralığı neoplazmlara ayrılmıştır.");
  s("icd", "ICD-10'da O00-O99 kod aralığı hangi grubu kapsar?", ["Göz hastalıkları", "Gebelik, doğum ve lohusalık", "Kulak hastalıkları", "Perinatal dönemde ortaya çıkan durumlar"], 1, "O harfi gebelik, doğum ve lohusalık (puerperium) dönemine ayrılmıştır; perinatal durumlar P ile kodlanır.");
  s("icd", "ICD-10'da S00-T98 kod aralığı hangi grubu kapsar?", ["Ruhsal bozukluklar", "Yaralanma, zehirlenme ve dış nedenlerin diğer sonuçları", "Sindirim sistemi hastalıkları", "Kas-iskelet sistemi hastalıkları"], 1, "S ve T harfleri yaralanma ve zehirlenmeler için kullanılır.");
  s("icd", "ICD-10'da K00-K93 kod aralığı hangi hastalık grubunu kapsar?", ["Sindirim sistemi hastalıkları", "Solunum sistemi hastalıkları", "Genitoüriner sistem hastalıkları", "Sinir sistemi hastalıkları"], 0, "K harfi sindirim sistemi hastalıklarını gösterir.");
  s("icd", "“E11.9” biçimindeki bir ICD-10 kodunda noktadan önceki üç karakter neyi gösterir?", ["Alt kategoriyi", "Üç karakterli ana kategoriyi", "Hastanın yaş grubunu", "Hastaneye yatış türünü"], 1, "İlk üç karakter kategoriyi, noktadan sonraki karakter alt kategoriyi belirtir.");
  s("icd", "Hastalık kodlamasında “ana tanı” neyi ifade eder?", ["Hastanın bilinen en eski hastalığını", "Hastanın sağlık kuruluşuna başvurmasına ya da yatışına esas olan durumu", "Dosyada yazan ilk tanıyı", "En pahalı tedaviyi gerektiren hastalığı"], 1, "Ana tanı, bakım sürecinin asıl nedeni olarak belirlenen durumdur; diğerleri ek tanıdır.");

  var say = {};
  S.forEach(function (q) { say[q.k] = (say[q.k] || 0) + 1; q.id = q.k + '-' + say[q.k]; });
  // Çıkmış sınavlar: yalnızca resmî cevap anahtarı tutulur, soru metinleri kopyalanmaz (hakları MEB'e aittir).
  window.CIKMIS = [
    { id: '2020', ad: '4 Ekim 2020 görevde yükselme ve unvan değişikliği sınavı', sik: 5, sure: 60, iptal: [18, 29, 34, 47, 50],
      not: 'A kitapçığı. Beş seçenekli. 18, 29, 34, 47 ve 50. sorular iptal edildiği için puanlanmaz. Süre 60 dakika varsayıldı.',
      anahtar: 'CEABBABCCABEEECDDEABDBDBACCAADEABCEDACDEECDCDBBDAE',
      url: 'https://www.scribd.com/document/961103031/T%C4%B1bbi-Sekreter-Soru',
      yerel: 'KAYNAKLAR/2020_UDS_TIBBI_SEKRETER_A.pdf' },
    { id: '2017', ad: '8 Ekim 2017 unvan değişikliği sınavı', sik: 4, sure: 60, not: 'A kitapçığı.',
      anahtar: 'BDACADCADBBCADCBADCDCABCADCDBDBADDACBADCABDABCABDC',
      url: 'https://odsgm.meb.gov.tr/meb_iys_dosyalar/2017_10/11155331_48._GRUP_TIBBY_SEKRETER_A.pdf',
      yerel: 'KAYNAKLAR/2017_UDS_TIBBI_SEKRETER_A.pdf' },
    { id: '2015', ad: '28 Haziran 2015 unvan değişikliği sınavı', sik: 5, sure: 60, not: 'A kitapçığı. Bu sınav beş seçenekliydi.',
      anahtar: 'EDADCCBCEADBECBAEABDCBEADCAEDCBABDCBCEBDEEADCBAEAD',
      url: 'https://odsgm.meb.gov.tr/meb_iys_dosyalar/2015_06/30113651_saglik4147.zip',
      yerel: 'KAYNAKLAR/2015_UDS_TIBBI_SEKRETER_A.pdf', ek: 'İnternetteki bağlantı 41-47. grupların arşivini indirir; içinden “41. TIBBİ SEKRETER TEKNİKERİ” dosyası açılır.' },
    { id: '2009', ad: '2009 unvan değişikliği sınavı', sik: 4, sure: 75, not: 'A kitapçığı.',
      anahtar: 'CDABCDCDABCADBCADBADBACADAAACABCDABBDCABDACDBABCDC',
      url: 'https://www.memurlar.net/common/news/documents/155826/17_tibbisekreter.pdf',
      yerel: 'KAYNAKLAR/2009_UDS_TIBBI_SEKRETER_A.pdf' }
  ];
  window.KONULAR = KONULAR;
  window.SORULAR = S;
})();
