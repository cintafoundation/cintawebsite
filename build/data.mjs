// Content extracted verbatim from "Cinta Foundation Website v2.dc.html".
// Every string here is the literal Indonesian copy from the design source.

/** paragraph made of plain / bold / link segments */
export const P = (...segs) => ({
  isPara: true,
  segs: segs.map((x) => (typeof x === 'string' ? { txt: x, plain: true } : x))
});
export const B = (t) => ({ txt: t, bold: true });
export const L = (t, to) => ({ txt: t, isLink: true, to });

export const NAV_ITEMS = [
  { label: 'Beranda', key: 'beranda', href: '/' },
  { label: 'Program', key: 'program', href: '/program' },
  { label: 'Laporan Kegiatan', key: 'laporan', href: '/laporan' },
  { label: 'Tentang Kami', key: 'tentang', href: '/tentang-kami' }
];

export const MOBILE_NAV_ITEMS = [
  { label: 'Beranda', key: 'beranda', href: '/' },
  { label: 'Program', key: 'program', href: '/program' },
  { label: 'Dampak', key: 'laporan', href: '/laporan' },
  { label: 'Tentang Kami', key: 'tentang', href: '/tentang-kami' }
];

export const FOOTER_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Program', href: '/program' },
  { label: 'Laporan Kegiatan', href: '/laporan' },
  { label: 'Tentang Kami', href: '/tentang-kami' }
];

export const PILLARS = [
  { numeral: 'I', name: 'Berbagi & Memberi', teaser: 'Makanan, bantuan, dan pemberian yang berarti.', dark: true },
  { numeral: 'II', name: 'Pelayanan Nyata', teaser: 'Tangan yang bekerja, bukan hanya niat baik.', dark: false },
  { numeral: 'III', name: 'Waktu Berkualitas', teaser: 'Ruang untuk berhenti sejenak dan menemani.', dark: false },
  { numeral: 'IV', name: 'Kata Penguat', teaser: 'Afirmasi dan doa yang menemani, tanpa menghakimi.', dark: false },
  { numeral: 'V', name: 'Sentuhan Kepedulian', teaser: 'Hadir lewat kepekaan saat dibutuhkan.', dark: false }
];

export const FRAMEWORK = [
  { name: 'Berbagi & Memberi', translation: 'Receiving Gifts', related: 'Jumat Berkah · Titip Cinta',
    body: 'Bentuk cinta yang hadir lewat makanan, bantuan, dan pemberian yang berarti bagi orang yang membutuhkannya.' },
  { name: 'Pelayanan Nyata', translation: 'Act of Service', related: '',
    body: 'Cinta yang bekerja dengan tangan — hadir dalam perbaikan fasilitas ibadah dan pendidikan, serta kolaborasi dengan komunitas setempat.' },
  { name: 'Waktu Berkualitas', translation: 'Quality Time', related: '',
    body: 'Cinta yang menemani. Kadang yang dibutuhkan bukan solusi, tapi ruang untuk berhenti sejenak bersama.' },
  { name: 'Kata Penguat', translation: 'Word of Affirmation', related: '',
    body: 'Cinta yang diucapkan dengan tulus — afirmasi dan doa yang menguatkan tanpa mendesak siapa pun.' },
  { name: 'Sentuhan Kepedulian', translation: 'Physical Touch', related: '',
    body: 'Cinta yang datang lebih dulu saat keadaan darurat, sebelum sempat menjelaskan.' }
];

export const PROGRAM_ARCHIVE = [
  { name: 'Barakah Bazar Ramadhan 2026', status: 'Program Musiman · Selesai',
    photo: 'bb-hero.jpg', photoAlt: 'Warga berkumpul dalam rangkaian Barakah Bazaar',
    body: 'Ramadhan 1447 H / 2026: bazar UMKM lokal, santunan anak yatim, buka bersama, dan kajian Ramadhan dalam satu ruang berkumpul.',
    href: '/laporan/barakah-bazaar' }
];

export const MISSIONS = [
  { numeral: 'I.', title: 'Akses Universal', body: 'Menyalurkan cinta melalui akses pendidikan, kesehatan, dan ekonomi.' },
  { numeral: 'II.', title: 'Pemberdayaan', body: 'Mengangkat potensi komunitas — bukan dengan belas kasihan, tapi keberdayaan.' },
  { numeral: 'III.', title: 'Ekosistem Kolaboratif', body: 'Membangun ekosistem sosial yang transparan, partisipatif, dan terbuka.' },
  { numeral: 'IV.', title: 'Ruang Terbuka', body: 'Menjadi rumah bagi siapa saja yang ingin berbuat baik.' },
  { numeral: 'V.', title: 'Anak & Perempuan', body: 'Memberdayakan anak-anak dan perempuan melalui dampak jangka panjang.' }
];

export const FAQS = [
  { q: 'Apa itu Cinta Foundation?', a: 'Cinta Foundation adalah gerakan sosial yang berfokus pada penyebaran kebaikan melalui program donasi dan pemberdayaan anak-anak dan perempuan — dijalankan lewat lima bahasa cinta sebagai kerangka berpikir kami.' },
  { q: 'Apakah Cinta Foundation terdaftar secara resmi?', a: 'Ya. Kami beroperasi di bawah Yayasan Cinta Negeri Persada, terdaftar resmi berdasarkan SK Kemenkumham No. AHU-0006826.AH.01.04.Tahun 2024. Kami berkomitmen penuh terhadap transparansi dan pelaporan yang jujur.' },
  { q: 'Apa itu Bahasa Cinta?', a: 'Kerangka berpikir kami untuk menerjemahkan cinta menjadi tindakan — bukan lima program terpisah. Penjelasan lengkapnya ada di halaman Program.' },
  { q: 'Bagaimana saya tahu donasi saya benar-benar sampai?', a: 'Setiap kegiatan kami catat dan laporkan lewat halaman Laporan Kegiatan. Rekap kuantitatifnya sedang kami susun dari catatan lapangan agar akurat sebelum ditayangkan.' },
  { q: 'Bagaimana saya bisa terlibat selain berdonasi?', a: 'Kalau punya keahlian atau komunitas yang ingin berkolaborasi, hubungi kami di admin@cintafoundation.org. Program relawan sedang kami siapkan.' }
];

export const TITIP_PROGRAMS = [
  { key: 'jumat', title: 'Jumat Berkah', desc: 'Makanan yang dibeli, dikemas, dan diantarkan langsung ke tangan penerima.' },
  { key: 'paling', title: 'Biarkan kami menyalurkan', desc: 'Kami antarkan ke tempat yang paling membutuhkan saat titipanmu masuk.' }
];
export const TITIP_AMOUNTS = ['Rp 25.000', 'Rp 50.000', 'Rp 100.000', 'Rp 250.000'];
export const TITIP_RECIPIENTS = ['Orang Tua', 'Guru', 'Teman', 'Orang Lain'];
export const RAIL_LABELS = ['Program', 'Nominal', 'Identitas', 'Titipan', 'Pembayaran', 'Konfirmasi'];

export const LAP_FILTERS = ['Semua', 'Jumat Berkah', 'Komunitas', 'Santunan'];

// ---------------------------------------------------------------- articles

export const jbArticle = {
  heroRatio: '7 / 8', heroMaxW: '520px',
  heroCaption: 'Salah satu dari 15 paket Jumat Berkah diserahkan kepada pengemudi ojek online yang ditemui di kawasan Mega Kuningan, Jakarta Selatan.',
  meta: ['17 Juli 2026', 'Mega Kuningan, Jakarta Selatan', 'Cinta Foundation'],
  facts: [
    { value: '15', label: 'Paket makanan dibawa' },
    { value: '17', label: 'Juli 2026' },
    { value: 'Jakarta', label: 'Mega Kuningan' }
  ],
  blocks: [
    { isLead: true, text: 'Di tengah padatnya aktivitas kota pada hari Jumat, kendaraan masih datang dan pergi. Pengemudi ojek online menunggu perjalanan berikutnya, sementara para pekerja lapangan di sekitar kawasan Mega Kuningan masih menjalani rutinitas mereka.' },
    P('Di tengah suasana itulah Cinta Foundation kembali menjalankan ', B('Jumat Berkah pada 17 Juli 2026'), '.'),
    P('Hari itu, tim relawan membawa ', B('15 paket makanan lengkap dengan air mineral'), '. Pembagian dilakukan dengan menyusuri beberapa titik di kawasan Mega Kuningan, Jakarta Selatan, dan memberikannya langsung kepada orang-orang yang ditemui sepanjang perjalanan.'),
    P('Salah satunya adalah seorang pengemudi ojek online yang sedang berhenti di tepi jalan. Tim menghampiri, menyapa, lalu menyerahkan satu paket makanan sebelum ia kembali melanjutkan aktivitasnya.'),
    { isH2: true, text: 'Berbagi dari satu titik ke titik berikutnya' },
    P('Perjalanan kemudian berlanjut ke beberapa titik lain di sekitar kawasan tersebut. Dari 15 paket yang dibawa, satu per satu mulai dibagikan kepada para pekerja dan pengemudi yang ditemui di sepanjang perjalanan.'),
    P('Di lokasi berikutnya, tim bertemu dengan seorang pekerja yang masih menjalankan aktivitasnya. Paket makanan kembali diserahkan secara langsung, disertai sapaan dan percakapan singkat.'),
    { isFigure: true, image: 'jb-2.jpg', ratio: '7 / 8', maxW: '480px',
      alt: 'Seorang pekerja menerima paket makanan dalam kegiatan Jumat Berkah Cinta Foundation pada 17 Juli 2026.',
      caption: 'Salah satu pekerja yang ditemui menerima paket makanan Jumat Berkah di tengah aktivitasnya.' },
    P('Tidak ada acara khusus ataupun titik pembagian yang dipusatkan di satu tempat. Cara ini membuat tim dapat bertemu langsung dengan orang-orang yang memang sedang berada di jalan dan menjalankan aktivitas sehari-hari mereka.'),
    P('Ada yang sedang bekerja, ada yang sedang menunggu penumpang, dan ada pula yang ditemui ketika tim berpindah dari satu titik ke titik lainnya.'),
    { isQuote: true, text: 'Kami ingin Jumat Berkah tetap terasa sederhana: datang, menyapa, berbagi, lalu melanjutkan perjalanan.' },
    { isH2: true, text: 'Berbagi dengan tetap menjaga kenyamanan' },
    P('Dalam setiap kegiatan Jumat Berkah, kami berusaha memastikan bahwa proses pembagian dilakukan dengan cara yang wajar dan tetap menghargai orang yang menerima.'),
    P('Dokumentasi kegiatan penting sebagai bagian dari transparansi. Namun yang tidak kalah penting adalah memastikan proses tersebut tetap nyaman bagi penerima dan tidak membuat mereka merasa menjadi objek dari kegiatan sosial.'),
    P('Mereka yang kami temui hari itu adalah orang-orang yang sedang bekerja, berkendara, dan menjalani aktivitas seperti biasanya. Karena itu, interaksi kami pun dibuat sesederhana mungkin: menyapa, menawarkan paket makanan, menyerahkannya, kemudian memberikan ruang bagi mereka untuk kembali melanjutkan aktivitas.'),
    { isFigure: true, image: 'jb-3.jpg', ratio: '2 / 3', maxW: '440px',
      alt: 'Relawan Cinta Foundation menyerahkan paket makanan kepada seorang pekerja dalam Jumat Berkah 17 Juli 2026.',
      caption: 'Pertemuan singkat lainnya selama perjalanan pembagian Jumat Berkah 17 Juli 2026.' },
    { isH2: true, text: 'Jumat Berkah akan terus berjalan' },
    P('Kegiatan pada 17 Juli menjadi bagian dari rangkaian ', B('Program Jumat Berkah Cinta Foundation'), ' yang kami jalankan secara berkala.'),
    P('Melalui program ini, kami ingin menjaga kegiatan berbagi makanan agar tidak berhenti pada satu pelaksanaan saja. Setiap kegiatan mungkin memiliki rute, suasana, dan orang-orang yang berbeda. Namun tujuannya tetap sama: membawa makanan yang telah dipersiapkan dan membagikannya langsung kepada mereka yang kami temui.'),
    P('Pada akhirnya, 15 paket makanan yang dibawa hari itu telah dibagikan selama perjalanan. Jumlahnya sederhana, tetapi kami ingin memastikan setiap paket benar-benar sampai kepada orang yang menerimanya.'),
    P('Terima kasih kepada seluruh Sahabat Cinta yang terus mengikuti perjalanan Jumat Berkah bersama kami. Sampai bertemu di Jumat Berkah berikutnya.')
  ],
  closingEyebrow: 'Jumat Berkah',
  closingTitle: 'Kegiatan kecil yang kami jaga agar terus berjalan.',
  closingBody: 'Dokumentasi kegiatan menjadi bagian dari transparansi kami kepada Sahabat Cinta, sekaligus catatan perjalanan setiap Jumat Berkah yang telah dilaksanakan.',
  docsBody: 'Lihat dokumentasi lengkap Jumat Berkah 17 Juli 2026 melalui Google Drive Cinta Foundation.',
  docsUrl: 'https://drive.google.com/drive/folders/1D_YxpfNxOE6YECQ137FvU8y_IfLuHnwV',
  docsLabel: 'Buka dokumentasi 17 Juli 2026 →'
};

export const jb31Article = {
  heroRatio: '2 / 3', heroMaxW: '480px',
  heroCaption: 'Paket Jumat Berkah diserahkan langsung kepada salah satu pekerja yang ditemui selama perjalanan pada 31 Juli 2026.',
  meta: ['31 Juli 2026', 'Mega Kuningan, Jakarta Selatan', 'Cinta Foundation'],
  facts: [
    { value: '13', label: 'Paket makanan' },
    { value: '31', label: 'Juli 2026' },
    { value: 'Jakarta', label: 'Mega Kuningan' }
  ],
  blocks: [
    { isLead: true, text: 'Dua minggu setelah kegiatan sebelumnya, tim Cinta Foundation kembali mempersiapkan Jumat Berkah pada 31 Juli 2026.' },
    P('Kegiatan dimulai dengan menyiapkan makanan yang akan dibagikan. Setelahnya, tim membawanya menyusuri beberapa titik untuk menemui orang-orang yang beraktivitas di jalanan kawasan Mega Kuningan, Jakarta Selatan.'),
    P('Sepanjang perjalanan, kami bertemu dengan pekerja kebersihan, pekerja lapangan, pengemudi ojek online, dan beberapa orang lain yang masih bekerja di sekitar area yang kami lewati.'),
    P('Pembagiannya dilakukan secara langsung. Tim menghampiri, menyapa, menyerahkan paket makanan, kemudian melanjutkan perjalanan menuju titik berikutnya.'),
    { isH2: true, text: 'Sebelum dibagikan, semuanya dipersiapkan terlebih dahulu' },
    P('Jumat Berkah tidak dimulai ketika paket pertama diberikan.'),
    P('Sebelumnya, ada proses menyiapkan makanan, melengkapi setiap paket, dan memastikan semuanya siap untuk dibawa.'),
    P('Proses ini mungkin terlihat sederhana, tetapi menjadi bagian penting dari kegiatan. Kami ingin paket yang diberikan sudah dalam kondisi baik dan siap diterima ketika tim bertemu dengan orang-orang di sepanjang perjalanan.'),
    { isFigure: true, image: 'jb31-prep.jpg', ratio: '11 / 12', maxW: '500px',
      alt: 'Makanan dipersiapkan untuk kegiatan Jumat Berkah Cinta Foundation pada 31 Juli 2026.',
      caption: 'Makanan dan pelengkap dipersiapkan sebelum dibawa keluar untuk kegiatan Jumat Berkah.' },
    P('Setelah persiapan selesai, makanan kemudian dibawa keluar untuk mulai dibagikan.'),
    P('Dokumentasi kegiatan 31 Juli juga merekam proses tersebut, sehingga perjalanan setiap paket tidak hanya terlihat ketika sudah sampai kepada penerima, tetapi sejak sebelum kegiatan dimulai.'),
    { isH2: true, text: 'Bertemu langsung dengan mereka yang masih bekerja' },
    P('Salah satu pertemuan hari itu terjadi dengan seorang pekerja kebersihan yang masih menjalankan pekerjaannya.'),
    P('Tim relawan menghampiri dan menyerahkan satu paket makanan secara langsung. Setelah percakapan singkat, ia kembali melanjutkan aktivitasnya.'),
    { isFigure: true, image: 'jb31-clean.jpg', ratio: '3 / 4', maxW: '460px',
      alt: 'Tim Cinta Foundation menyerahkan paket makanan kepada pekerja kebersihan dalam kegiatan Jumat Berkah 31 Juli 2026.',
      caption: 'Salah satu paket diserahkan kepada pekerja kebersihan yang ditemui di tengah aktivitasnya.' },
    P('Perjalanan kemudian berlanjut.'),
    P('Di titik lainnya, kami bertemu dengan pekerja lapangan dan beberapa orang yang sedang berada di sekitar area kegiatan. Paket makanan kembali dibagikan satu per satu.'),
    P('Kami memilih untuk mendatangi mereka di tengah aktivitasnya agar proses berbagi tetap tidak banyak mengganggu rutinitas orang-orang yang kami temui.'),
    P('Ada pula interaksi yang sedikit lebih lama, ada juga yang hanya cukup untuk saling menyapa dan mengucapkan terima kasih.'),
    P('Setelah itu, mereka kembali bekerja dan tim relawan melanjutkan perjalanan.'),
    { isFigure: true, image: 'jb31-ojol.jpg', ratio: '3 / 4', maxW: '460px',
      alt: 'Paket makanan Jumat Berkah Cinta Foundation diberikan kepada pengemudi ojek online pada 31 Juli 2026.',
      caption: 'Paket makanan juga dibagikan kepada pengemudi ojek online yang ditemui selama perjalanan.' },
    { isH2: true, text: 'Dokumentasi sebagai bagian dari transparansi' },
    P('Dalam setiap kegiatan Jumat Berkah, dokumentasi menjadi bagian penting dari proses yang kami jalankan.'),
    P('Melalui foto dan video, Sahabat Cinta dapat melihat bagaimana kegiatan berlangsung — mulai dari proses persiapan hingga makanan benar-benar dibagikan.'),
    P('Namun bagi kami, transparansi tetap perlu berjalan bersama dengan kenyamanan orang yang menerima.'),
    P('Mereka yang kami temui bukan sekadar bagian dari dokumentasi kegiatan. Mereka adalah orang-orang yang sedang bekerja dan menjalani kesehariannya.'),
    P('Karena itu, kami berusaha menjaga setiap interaksi tetap natural dan sewajarnya: menyapa, memberikan paket, berbincang sebentar ketika memungkinkan, kemudian memberikan ruang bagi mereka untuk kembali melanjutkan aktivitas.'),
    { isH2: true, text: 'Menjaga Jumat Berkah tetap berjalan' },
    P('Kegiatan pada 31 Juli menjadi lanjutan dari ', L('Jumat Berkah sebelumnya yang dilaksanakan pada 17 Juli 2026', '/laporan/jumat-berkah-17-juli-2026'), '.'),
    P('Setiap pelaksanaan tentu tidak selalu sama.'),
    P('Rute yang dilalui bisa berbeda, begitu juga dengan orang-orang yang kami temui. Namun ada satu hal yang ingin terus kami pertahankan: memastikan kegiatan berbagi ini dapat berjalan secara berkala dan setiap paket yang sudah dipersiapkan benar-benar sampai kepada penerimanya.'),
    P('Jumat Berkah tidak kami rancang sebagai sebuah acara besar.'),
    P('Kami ingin kegiatan ini tetap mudah dijalankan, dan bisa terus dilakukan.'),
    P('Terima kasih kepada seluruh Sahabat Cinta yang terus mengikuti perjalanan Jumat Berkah bersama kami. Sampai bertemu di kegiatan berikutnya.')
  ],
  donation: {
    kicker: 'Ikut Mendukung',
    title: 'Dukung Jumat Berkah Berikutnya via QRIS',
    body: 'Jika Sahabat Cinta ingin ikut mendukung kegiatan berikutnya, donasi dapat dilakukan melalui alur donasi resmi Cinta Foundation dan dilanjutkan menggunakan QRIS.',
    steps: [
      { n: '1', text: 'Buka halaman resmi Cinta Foundation.' },
      { n: '2', text: 'Pilih program Jumat Berkah.' },
      { n: '3', text: 'Isi nominal dan data yang diperlukan.' },
      { n: '4', text: 'Lanjutkan hingga QRIS muncul, lalu selesaikan pembayaran melalui aplikasi pilihanmu.' }
    ],
    cta: 'Donasi via QRIS →',
    note: 'Gunakan hanya halaman dan QRIS resmi Cinta Foundation.'
  },
  closingEyebrow: 'Jumat Berkah',
  closingTitle: 'Kegiatan sederhana yang kami jaga agar terus berjalan.',
  closingBody: 'Dokumentasi ini menjadi bagian dari transparansi kami kepada Sahabat Cinta, sekaligus catatan perjalanan setiap kegiatan yang telah dijalankan.',
  docsBody: 'Foto dan video lengkap kegiatan Jumat Berkah 31 Juli 2026 dapat dilihat melalui Google Drive Cinta Foundation.',
  docsUrl: 'https://drive.google.com/drive/folders/1uSK-B8j0ysoXXL8FtL-XSJizE_eQXaM4',
  docsLabel: 'Buka dokumentasi 31 Juli 2026 →'
};

export const bbArticle = {
  heroCaption: 'Suasana rangkaian Barakah Bazaar bersama warga.',
  dek: 'Tiga akhir pekan untuk bertemu, berbagi, dan mengisi waktu Ramadan bersama.',
  intro: [
    'Kegiatan berlangsung pada 22 Februari, 1 Maret, dan 14 Maret 2026. Setiap pekannya diisi dengan bazar makanan, kajian, penampilan rebana, dan buka bersama.',
    'Tidak dibuat sebagai acara besar, Barakah Bazaar berlangsung dekat dengan keseharian warga. Lapak makanan dibuka di sekitar area kegiatan, warga datang bergantian, sebagian mengikuti kajian, dan menjelang sore orang-orang berkumpul untuk berbuka bersama.'
  ],
  weeks: [
    { label: 'Pekan pertama', date: '22 Februari 2026', title: 'Rangkaian dimulai',
      body: 'Barakah Bazaar dimulai dengan pembukaan bazar makanan, kajian, rebana, dan buka bersama. Formatnya sederhana: kegiatan ditempatkan dekat dengan lingkungan warga agar orang bisa datang, ikut sebentar, atau tinggal sampai waktu berbuka.',
      image: 'bb-week1.jpg', alt: 'Lapak makanan dalam rangkaian Barakah Bazaar',
      caption: 'Suasana bazar makanan dalam rangkaian Barakah Bazaar.',
      note: 'Catatan preview: visual ini mewakili rangkaian bazar; tanggal file spesifik perlu dikonfirmasi sebelum publikasi final.' },
    { label: 'Pekan kedua', date: '1 Maret 2026', title: 'Komunitas kembali berkumpul',
      body: 'Kegiatan kembali dilaksanakan pada pekan kedua dengan rangkaian yang sama. Penampilan rebana menjadi salah satu bagian dari suasana hari itu, berdampingan dengan aktivitas bazar, kajian, dan persiapan buka bersama.',
      image: 'bb-week2.jpg', alt: 'Penampilan rebana dalam rangkaian Barakah Bazaar',
      caption: 'Penampilan rebana menjadi bagian dari rangkaian Barakah Bazaar pada pekan kedua.' },
    { label: 'Pekan ketiga', date: '14 Maret 2026', title: 'Ditutup dengan santunan',
      bodyPre: 'Pada pekan terakhir, rangkaian Barakah Bazaar ditutup dengan santunan kepada 30 anak yatim. Cinta Foundation menyalurkan santunan dengan total ',
      bodyAmount: 'Rp1.500.000', bodyPost: ' sebagai bagian dari kegiatan penutup hari itu.',
      image: 'bb-week3.jpg', alt: 'Anak-anak dalam penutupan Barakah Bazaar',
      caption: 'Rangkaian Barakah Bazaar ditutup dengan santunan kepada 30 anak yatim.' }
  ],
  closing: [
    'Barakah Bazaar menjadi salah satu pengalaman Cinta Foundation dalam hadir melalui kegiatan berbasis komunitas. Bukan hanya lewat bantuan yang diberikan, tetapi juga melalui ruang yang memungkinkan orang untuk datang, bertemu, berbagi waktu, dan ikut berkontribusi.'
  ],
  noteTitle: 'Setelah tiga pekan berakhir',
  notePre: 'Ada satu hal yang kemudian melanjutkan perjalanan Barakah Bazaar. Setelah seluruh rangkaian selesai, panitia dan komunitas menyerahkan hasil kegiatan yang berasal dari penjualan dan penyewaan tenda kepada Cinta Foundation sebagai donasi sebesar ',
  noteAmount: 'Rp15.750.000',
  notePost: '.',
  noteSecond: 'Donasi tersebut diterima setelah kegiatan berakhir dan menjadi bentuk kepercayaan komunitas kepada Cinta Foundation untuk meneruskan manfaatnya melalui kegiatan sosial berikutnya.',
  thanks: 'Terima kasih kepada panitia, komunitas, warga, dan semua yang telah mengambil bagian dalam tiga pekan Barakah Bazaar.',
  docsBody: 'Foto dan video dari seluruh rangkaian Barakah Bazaar disimpan dalam arsip dokumentasi kegiatan. Halaman ini hanya menampilkan pilihan visual utama agar laporan tetap mudah dibaca.',
  docsUrl: 'https://drive.google.com/drive/folders/1VyJrdTdbRmVqyJkV-DHIbwb6QI3vn7d_',
  docsLabel: 'Lihat dokumentasi Barakah Bazaar →'
};

// 28 Agustus 2026 — a photo-led report. Copy, captions and alt text are
// verbatim from INSTRUKSI_CLAUDE_CODE_28_AGUSTUS.md and must not be reworded.
// No documentation-link block: the public Drive folder is not curated yet, and
// the instruction is explicit that it lands in a separate commit.
export const jb28Article = {
  layout: 'photo',
  blocks: [
    { isPhoto: true, name: 'jumat-berkah-28agu-cover', w: 1447, h: 1087, maxW: '640px', eager: true,
      alt: 'Seorang relawan menyerahkan bungkus nasi kepada petugas kebersihan di tepi jalan kawasan Mega Kuningan',
      caption: 'Pagi itu di Mega Kuningan, satu bungkus berpindah tangan di tepi jalan.' },
    P('Jumat kemarin, sekitar pukul sembilan pagi, Jumat Berkah berjalan di kawasan Mega Kuningan, Jakarta Selatan.'),
    { isPhoto: true, name: 'jumat-berkah-28agu-serah-terima', w: 941, h: 1672, maxW: '460px',
      alt: 'Relawan menyerahkan nasi kotak dari tangan ke tangan, dengan pengemudi ojek daring menunggu di belakang',
      caption: 'Nasi hangat dan snack ringan, dibagikan langsung dari tangan ke tangan.' },
    P('Tiga belas porsi nasi hangat dan snack ringan kami bagikan pagi itu. Tidak terlalu banyak. Tapi cukup untuk menemani seseorang yang sedang atau baru selesai bekerja, dan untuk mereka yang pagi itu belum sempat sarapan.'),
    { isPhoto: true, name: 'jumat-berkah-28agu-penerima-pagi', w: 646, h: 1158, maxW: '460px',
      alt: 'Dua petugas berseragam menerima bungkus nasi sambil tersenyum',
      caption: 'Sebagian penerima pagi itu adalah mereka yang sudah bekerja sejak subuh.' },
    P('Jumat Berkah berjalan dua pekan sekali sejak Agustus 2025. Terima kasih untuk setiap nama yang ikut menitipkan rezekinya pekan ini. Sampai jumpa di Jumat Berkah berikutnya. Salam.')
  ]
};

// 18 September 2026 — photo-led, same pattern as 28 Agustus, plus the first
// closing collage. Copy, captions and alt text are verbatim from
// INSTRUKSI_CLAUDE_CODE_18_SEPTEMBER.md and must not be reworded. No
// documentation-link block, by instruction.
export const jb18sepArticle = {
  layout: 'photo',
  blocks: [
    { isPhoto: true, name: 'jumat-berkah-18sep-cover', w: 626, h: 728, maxW: '640px', eager: true,
      alt: 'Relawan menyerahkan nasi kotak kepada petugas kebersihan yang sedang memegang sapu di trotoar',
      caption: 'Seorang petugas kebersihan berhenti sejenak dari menyapu untuk menerima nasi kotak.' },
    P('Jumat, 18 September 2026, sekitar pukul setengah sepuluh pagi, Jumat Berkah berjalan di sekitar kawasan Mega Kuningan, Jakarta Selatan.'),
    { isPhoto: true, name: 'jumat-berkah-18sep-ojol', w: 626, h: 820, maxW: '460px',
      alt: 'Pengemudi ojek daring berhelm oranye tersenyum saat menerima nasi kotak dari tangan relawan',
      caption: 'Salah satu pengemudi ojek daring yang kami temui di tepi jalan.' },
    P('Tiga belas porsi nasi kotak, lengkap dengan minuman dan camilan, kami bagikan pagi itu. Penerimanya orang-orang yang sudah bekerja sejak pagi: petugas kebersihan, petugas PPSU, pengemudi ojek daring, kurir, dan petugas keamanan gedung. Kebanyakan sedang di tengah pekerjaan, jadi serah terimanya singkat. Di tepi trotoar, di atas motor, di depan pagar rumah.'),
    { isPhoto: true, name: 'jumat-berkah-18sep-ppsu', w: 520, h: 692, maxW: '460px',
      alt: 'Dua petugas PPSU berseragam oranye tersenyum di atas motor sambil memegang bungkus nasi',
      caption: 'Dua petugas PPSU menerima nasi di sela jam kerja.' },
    P('Jumat Berkah berjalan dua pekan sekali sejak Agustus 2025. Terima kasih untuk setiap nama yang ikut menitipkan rezekinya pekan ini. Sampai jumpa di Jumat Berkah berikutnya. Salam.')
  ],
  kolase: {
    name: 'jumat-berkah-18sep-kolase', w: 1608, h: 1422,
    alt: 'Kolase enam foto penerima Jumat Berkah: pengemudi ojek daring, petugas keamanan, petugas PPSU, dua kurir, dan relawan yang menyerahkan nasi kepada petugas pengangkut sampah',
    caption: 'Penerima lain pagi itu: pengemudi ojek daring, petugas keamanan, petugas PPSU, kurir, dan petugas pengangkut sampah.'
  }
};

// 2 Oktober 2026 — photo-led with a closing collage, same pattern as
// 18 September. Copy, captions and alt text are verbatim from
// INSTRUKSI_CLAUDE_CODE_02_OKTOBER.md and must not be reworded. No
// documentation-link block, by instruction.
export const jb02oktArticle = {
  layout: 'photo',
  blocks: [
    { isPhoto: true, name: 'jumat-berkah-02okt-cover', w: 618, h: 790, maxW: '640px', eager: true,
      alt: 'Relawan menyerahkan nasi kotak kepada pedagang gerobak di trotoar, dengan gedung perkantoran di latar belakang',
      caption: 'Seorang pedagang gerobak menerima nasi kotak di trotoar, dengan gedung-gedung Mega Kuningan di belakangnya.' },
    P('Jumat, 2 Oktober 2026, sekitar pukul setengah sepuluh pagi, Jumat Berkah kembali berjalan di sekitar kawasan Mega Kuningan, Jakarta Selatan.'),
    { isPhoto: true, name: 'jumat-berkah-02okt-satpam', w: 583, h: 662, maxW: '460px',
      alt: 'Petugas keamanan berompi kuning tersenyum menerima nasi kotak dari relawan di depan pagar rumah',
      caption: 'Seorang petugas keamanan menerima nasi kotak di depan pagar tempatnya berjaga.' },
    P('Tiga belas porsi kami bagikan. Setiap kotak berisi nasi, ayam goreng, dan orek tempe, ditambah minuman dan kue basah sebagai camilan.'),
    P('Kali ini sebagian besar penerimanya pedagang kaki lima yang sudah membuka gerobak sejak pagi, mulai dari penjual tahu gejrot sampai penjual es cokelat. Sisanya petugas keamanan, petugas kebersihan, dan petugas cleaning service gedung.'),
    { isPhoto: true, name: 'jumat-berkah-02okt-cleaning-service', w: 618, h: 790, maxW: '460px',
      alt: 'Seorang pekerja berseragam biru tersenyum sambil memegang bungkus nasi',
      caption: 'Seorang pekerja tersenyum saat menerima nasi kotak.' },
    P('Jumat Berkah berjalan dua pekan sekali sejak Agustus 2025. Terima kasih untuk setiap nama yang ikut menitipkan rezekinya pekan ini. Sampai jumpa di Jumat Berkah berikutnya. Salam.')
  ],
  kolase: {
    name: 'jumat-berkah-02okt-kolase', w: 1608, h: 2127,
    alt: 'Kolase sembilan foto: petugas kebersihan, isi nasi kotak, petugas keamanan, seorang pedagang keliling, kue basah dalam wadah, dan empat pedagang gerobak menerima nasi kotak dari relawan',
    caption: 'Penerima lain pagi itu: petugas kebersihan, petugas keamanan, dan para pedagang kaki lima. Dua foto memperlihatkan isi nasi kotak dan kue basah yang dibagikan.'
  }
};

// 16 Oktober 2026 — photo-led with a closing collage, same pattern as
// 2 Oktober. Copy, captions and alt text are verbatim from
// INSTRUKSI_CLAUDE_CODE_16_OKTOBER.md and must not be reworded. Image 2 is
// only 380px wide, so it is capped at its native width. No
// documentation-link block, by instruction.
export const jb16oktArticle = {
  layout: 'photo',
  blocks: [
    { isPhoto: true, name: 'jumat-berkah-16okt-cover', w: 642, h: 1146, maxW: '640px', eager: true,
      alt: 'Pedagang keliling bertopi tersenyum sambil memegang nasi kotak di samping gerobaknya',
      caption: 'Seorang pedagang keliling tersenyum memegang nasi kotak di samping gerobaknya.' },
    P('Jumat, 16 Oktober 2026, sekitar pukul setengah sepuluh pagi, Jumat Berkah kembali berjalan di kawasan Mega Kuningan, Jakarta Selatan. Rutenya menyusuri jalan besar sampai gang-gang kecil di sekitarnya.'),
    { isPhoto: true, name: 'jumat-berkah-16okt-penyerahan', w: 380, h: 584, maxW: '380px',
      alt: 'Relawan membungkuk menyerahkan nasi kotak kepada seorang bapak lanjut usia yang duduk di tepi jalan',
      caption: 'Di satu tepi jalan, relawan membungkuk untuk menyerahkan nasi kotak kepada bapak yang sedang duduk.' },
    P('Tiga belas porsi nasi ayam bakar kami bawa pagi itu, masing-masing dengan tempe, lalapan, dan sambal. Kotak-kotaknya disiapkan sebelum berangkat.'),
    P('Di sepanjang rute, nasi kotak itu sampai ke tangan seorang pedagang keliling di samping gerobaknya, petugas PPSU di dekat pagar seng, petugas kebersihan di trotoar, pengemudi ojek daring yang sedang beristirahat di pinggir jalan, dan beberapa bapak di mulut gang.'),
    { isPhoto: true, name: 'jumat-berkah-16okt-petugas', w: 648, h: 1006, maxW: '460px',
      alt: 'Seorang pekerja berseragam biru tersenyum sambil memegang nasi kotak',
      caption: 'Seorang pekerja berseragam biru menerima nasi kotak di sela tugasnya.' },
    P('Jumat Berkah berjalan dua pekan sekali sejak Agustus 2025. Terima kasih untuk setiap nama yang ikut menitipkan rezekinya pekan ini. Sampai jumpa di Jumat Berkah berikutnya. Salam.')
  ],
  kolase: {
    name: 'jumat-berkah-16okt-kolase', w: 1608, h: 2127,
    alt: 'Kolase sembilan foto: dua foto persiapan nasi kotak, petugas kebersihan, petugas PPSU, pengemudi ojek daring, dan beberapa pekerja menerima nasi kotak di jalan',
    caption: 'Sepanjang rute pagi itu, dari persiapan nasi kotak sebelum berangkat hingga gang dan tepi jalan di sekitar Mega Kuningan.'
  }
};

// ------------------------------------------------------------ report index
// `url` null  => no standalone page (report still listed in the archive).
// Ordered newest first, matching the source's date sort.

export const REPORTS = [
  {
    slug: 'jumat-berkah-16-oktober-2026', url: '/laporan/jumat-berkah-16-oktober-2026',
    date: '2026-10-16', category: 'Jumat Berkah',
    title: 'Lihat Laporan: Jumat Berkah 16 Oktober 2026',
    heading: 'Jumat Berkah Menyusuri Gang dan Tepi Jalan Mega Kuningan',
    seoTitle: 'Jumat Berkah 16 Oktober 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 16 Oktober 2026: 13 porsi nasi ayam bakar dibagikan di gang dan tepi jalan sekitar Mega Kuningan, Jakarta Selatan.',
    preview: 'Laporan Jumat Berkah 16 Oktober 2026: 13 porsi nasi ayam bakar dibagikan di gang dan tepi jalan sekitar Mega Kuningan, Jakarta Selatan.',
    image: 'jumat-berkah-16okt-og.jpg', ogImage: 'jumat-berkah-16okt-og.jpg', focus: 'center',
    alt: 'Pedagang keliling bertopi tersenyum sambil memegang nasi kotak di samping gerobaknya',
    full: true, article: 'jb16okt'
  },
  {
    slug: 'jumat-berkah-2-oktober-2026', url: '/laporan/jumat-berkah-2-oktober-2026',
    date: '2026-10-02', category: 'Jumat Berkah',
    title: 'Lihat Laporan: Jumat Berkah 2 Oktober 2026',
    heading: 'Jumat Berkah Singgah di Gerobak-Gerobak Pedagang Kaki Lima',
    seoTitle: 'Jumat Berkah 2 Oktober 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 2 Oktober 2026: 13 porsi nasi kotak dibagikan kepada pedagang kaki lima dan pekerja pagi di kawasan Mega Kuningan.',
    preview: 'Laporan Jumat Berkah 2 Oktober 2026: 13 porsi nasi kotak dibagikan kepada pedagang kaki lima dan pekerja pagi di kawasan Mega Kuningan.',
    image: 'jumat-berkah-02okt-og.jpg', ogImage: 'jumat-berkah-02okt-og.jpg', focus: 'center',
    alt: 'Relawan menyerahkan nasi kotak kepada pedagang gerobak di trotoar, dengan gedung perkantoran di latar belakang',
    full: true, article: 'jb02okt'
  },
  {
    slug: 'jumat-berkah-18-september-2026', url: '/laporan/jumat-berkah-18-september-2026',
    date: '2026-09-18', category: 'Jumat Berkah',
    title: 'Lihat Laporan: Jumat Berkah 18 September 2026',
    heading: 'Jumat Berkah Menemui Mereka yang Sudah Bekerja Sejak Pagi',
    seoTitle: 'Jumat Berkah 18 September 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 18 September 2026: 13 porsi nasi kotak dibagikan kepada para pekerja pagi di kawasan Mega Kuningan, Jakarta Selatan.',
    preview: 'Laporan Jumat Berkah 18 September 2026: 13 porsi nasi kotak dibagikan kepada para pekerja pagi di kawasan Mega Kuningan, Jakarta Selatan.',
    image: 'jumat-berkah-18sep-og.jpg', ogImage: 'jumat-berkah-18sep-og.jpg', focus: 'center',
    alt: 'Relawan menyerahkan nasi kotak kepada petugas kebersihan yang sedang memegang sapu di trotoar',
    full: true, article: 'jb18sep'
  },
  {
    slug: 'jumat-berkah-28-agustus-2026', url: '/laporan/jumat-berkah-28-agustus-2026',
    date: '2026-08-28', category: 'Jumat Berkah',
    title: 'Lihat Laporan: Jumat Berkah 28 Agustus 2026',
    heading: 'Jumat Berkah Membawa Nasi Hangat di Jalanan Mega Kuningan',
    seoTitle: 'Jumat Berkah 28 Agustus 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 28 Agustus 2026: 13 porsi nasi hangat dibagikan di kawasan Mega Kuningan, Jakarta Selatan.',
    preview: 'Laporan Jumat Berkah 28 Agustus 2026: 13 porsi nasi hangat dibagikan di kawasan Mega Kuningan, Jakarta Selatan.',
    image: 'jumat-berkah-28agu-og.jpg', ogImage: 'jumat-berkah-28agu-og.jpg', focus: 'center',
    alt: 'Seorang relawan menyerahkan bungkus nasi kepada petugas kebersihan di tepi jalan kawasan Mega Kuningan',
    full: true, article: 'jb28'
  },
  {
    slug: 'jumat-berkah-14-agustus-2026', url: null,
    date: '2026-08-14', category: 'Jumat Berkah',
    title: 'Lihat Laporan: Jumat Berkah 14 Agustus 2026',
    preview: 'Makanan dibawa dan dibagikan langsung kepada orang-orang yang kami temui di tengah aktivitas mereka. Seperti biasa, kami berusaha menjaga prosesnya tetap sederhana, hangat, dan tidak mengganggu keseharian penerima.',
    image: '', focus: 'center', alt: '', full: false
  },
  {
    slug: 'jumat-berkah-31-juli-2026', url: '/laporan/jumat-berkah-31-juli-2026',
    date: '2026-07-31', category: 'Jumat Berkah',
    seoTitle: 'Jumat Berkah 31 Juli 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 31 Juli 2026: 13 paket makanan dibagikan langsung kepada para pekerja yang kami temui di jalan dan ruang publik.',
    title: 'Lihat Laporan: Jumat Berkah 31 Juli 2026',
    heading: 'Membawa Jumat Berkah ke Tengah Aktivitas Kota',
    preview: 'Pada 31 Juli 2026, Cinta Foundation kembali menjalankan Jumat Berkah. 13 paket makanan yang telah dipersiapkan dibawa langsung untuk dibagikan kepada para pekerja yang kami temui di jalan dan ruang publik.',
    image: 'jb31-hero.jpg', focus: 'center 30%',
    alt: 'Seorang pekerja menerima paket makanan dalam kegiatan Jumat Berkah Cinta Foundation pada 31 Juli 2026.',
    full: true, article: 'jb31'
  },
  {
    slug: 'jumat-berkah-17-juli-2026', url: '/laporan/jumat-berkah-17-juli-2026',
    date: '2026-07-17', category: 'Jumat Berkah',
    seoTitle: 'Jumat Berkah 17 Juli 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Laporan Jumat Berkah 17 Juli 2026: 15 paket makanan dibagikan menyusuri kawasan Mega Kuningan, Jakarta Selatan.',
    title: 'Lihat Laporan: Jumat Berkah 17 Juli 2026',
    heading: 'Hadir untuk Berbagi di Tengah Kesibukan Kota',
    preview: 'Jumat Berkah kembali berjalan pada 17 Juli 2026. Kali ini, 15 paket makanan dibawa menyusuri kawasan Mega Kuningan, Jakarta Selatan, dan dibagikan kepada orang-orang yang kami temui di tengah aktivitas mereka.',
    image: 'jb-hero.jpg', focus: 'center 40%',
    alt: 'Pengemudi ojek online menerima paket makanan dalam kegiatan Jumat Berkah Cinta Foundation pada 17 Juli 2026.',
    full: true, article: 'jb17'
  },
  {
    slug: 'ramadhan-penuh-cinta-barakah-bazaar', url: '/laporan/barakah-bazaar',
    date: '2026-03-20', category: 'Komunitas',
    seoTitle: 'Barakah Bazaar Ramadan 2026 — Laporan | Cinta Foundation',
    seoDescription: 'Selama Ramadan 2026, Barakah Bazaar hadir tiga akhir pekan sebagai ruang warga untuk bertemu, berbagi, dan menjalani waktu menjelang berbuka.',
    title: 'Ramadhan Penuh Cinta: Barakah Bazaar',
    preview: 'Selama Ramadan 2026, Barakah Bazaar hadir selama tiga akhir pekan sebagai ruang bagi warga untuk bertemu, berbagi, dan menjalani waktu menjelang berbuka bersama.',
    image: 'bb-hero.jpg', focus: 'center 45%',
    alt: 'Warga berkumpul dalam rangkaian Barakah Bazaar',
    full: true, article: 'bb'
  }
];

export const ARTICLES = { jb17: jbArticle, jb31: jb31Article, bb: bbArticle, jb28: jb28Article, jb18sep: jb18sepArticle, jb02okt: jb02oktArticle, jb16okt: jb16oktArticle };
