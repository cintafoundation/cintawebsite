// Page bodies. Markup and copy are lifted verbatim from the design source;
// the only changes are template expressions resolved to literals, in-page
// screen switching replaced by real links, and JS-computed state moved to CSS.
import { esc } from './chrome.mjs';
import {
  PILLARS, FRAMEWORK, PROGRAM_ARCHIVE, MISSIONS, FAQS,
  TITIP_PROGRAMS, TITIP_AMOUNTS, TITIP_RECIPIENTS, RAIL_LABELS,
  LAP_FILTERS, REPORTS, ARTICLES
} from './data.mjs';

const A = (name) => `/assets/${name}`;
let manifest = {};
export function useManifest(m) { manifest = m; }
const dim = (name) => {
  const m = manifest[name];
  return m ? ` width="${m.w}" height="${m.h}"` : '';
};

const CARD_BASE = 'border-radius: 22px; padding: 32px 26px 36px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; text-align: left; transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none;';
// Pillar numerals. Heritage Gold reads well on the Deep Wine card (5.01:1) but
// only 1.97:1 on Blush, so the light cards use the palette's text gold instead
// (3.22:1). Same palette, no new colour — see the audit's FIX 4.
const NUM_ON_WINE = "font-family: 'Lora', serif; font-style: italic; font-size: 17px; color: #C8A063; letter-spacing: 0.1em;";
const NUM_ON_BLUSH = "font-family: 'Lora', serif; font-style: italic; font-size: 17px; color: #A0793F; letter-spacing: 0.1em;";
const DON_TAB_BASE = "font-family: 'Poppins', sans-serif; font-size: 13.5px; padding: 9px 16px; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: all 0.2s ease;";
const FILTER_BASE = "font-family: 'Poppins', sans-serif; font-size: 13.5px; letter-spacing: 0.02em; padding: 9px 18px; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: all 0.2s ease;";
const CHIP_BASE = "font-family: 'Poppins', sans-serif; font-size: 14px; padding: 13px 24px; border-radius: 999px; cursor: pointer; transition: all 0.2s ease; min-height: 46px;";
const OPT_BASE = 'display: flex; flex-direction: column; gap: 8px; text-align: left; padding: 24px 26px; border-radius: 18px; cursor: pointer; transition: all 0.2s ease;';
const RAIL_BASE = "font-family: 'Poppins', sans-serif; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; display: flex; gap: 7px; align-items: baseline;";

/* ================================================================ BERANDA */

export function beranda() {
  const pillars = PILLARS.map((p) => {
    const card = CARD_BASE + (p.dark
      ? ' background: #5E1F39; border: 1px solid rgba(200,160,99,0.3);'
      : ' background: #F3E4E8; border: 1px solid rgba(200,160,99,0.3);');
    const name = p.dark
      ? "font-family: 'Lora', serif; font-weight: 600; font-size: 20px; color: #F7F3EC; line-height: 1.25;"
      : "font-family: 'Lora', serif; font-weight: 600; font-size: 20px; color: #5E1F39; line-height: 1.25;";
    const teaser = p.dark
      ? "font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14.5px; line-height: 1.6; color: #FFFFFF; text-wrap: pretty;"
      : "font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14.5px; line-height: 1.6; color: #2A1820; text-wrap: pretty;";
    return `<a class="hv-lift" href="/program" style="${card}">
                <span style="${p.dark ? NUM_ON_WINE : NUM_ON_BLUSH}">${esc(p.numeral)}</span>
                <span style="${name}">${esc(p.name)}</span>
                <span style="${teaser}">${esc(p.teaser)}</span>
              </a>`;
  }).join('\n              ');

  const marqueeRow = `<div style="display: flex; gap: 44px; padding-right: 44px; font-family: 'Lora', serif; font-style: italic; font-size: 16px; color: #7B2F4D; white-space: nowrap;">
            <span>Berbagi &amp; Memberi</span><span style="color: #C8A063;">✦</span><span>Pelayanan Nyata</span><span style="color: #C8A063;">✦</span><span>Waktu Berkualitas</span><span style="color: #C8A063;">✦</span><span>Kata Penguat</span><span style="color: #C8A063;">✦</span><span>Sentuhan Kepedulian</span><span style="color: #C8A063;">✦</span>
          </div>`;

  const donTabs = ['QRIS', 'Transfer Bank', 'Panduan'].map((label) =>
    `<button type="button" role="tab" data-don-tab="${esc(label)}" class="don-tab" aria-selected="${label === 'QRIS' ? 'true' : 'false'}" style="${DON_TAB_BASE}">${esc(label)}</button>`
  ).join('\n                ');

  return `
    <main style="flex: 1;">

      <!-- Hero -->
      <section style="position: relative; padding: clamp(84px, 12vw, 150px) 32px clamp(72px, 9vw, 110px); text-align: center; overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(52% 46% at 50% 18%, rgba(243,228,232,0.95) 0%, rgba(243,228,232,0) 100%), radial-gradient(30% 30% at 82% 68%, rgba(200,160,99,0.16) 0%, rgba(200,160,99,0) 100%), radial-gradient(26% 30% at 12% 60%, rgba(201,125,144,0.14) 0%, rgba(201,125,144,0) 100%); animation: drift 14s ease-in-out infinite;"></div>
        <div style="position: relative; max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 30px;">
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(48px, 8vw, 88px); line-height: 1.04; letter-spacing: -0.015em; color: #5E1F39; margin: 0; text-wrap: balance; animation: fadeUp 0.7s ease 0.12s both;">Ada banyak cara<br><em style="font-style: italic; color: #7B2F4D;">mencintai.</em></h1>
          <p style="font-family: 'Lora', serif; font-style: italic; font-size: clamp(17px, 2vw, 21px); line-height: 1.65; color: #2A1820; max-width: 600px; margin: 0; text-wrap: pretty; animation: fadeUp 0.7s ease 0.24s both;">Di sini, cinta disalurkan dalam bentuk makanan hangat dua pekan sekali di hari Jumat, dukungan dan pemberdayaan anak dan perempuan, serta kepekaan untuk hadir saat dibutuhkan.</p>
          <a class="as-btn hv-deep" href="/program" style="margin-top: 10px; font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 17px 38px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease; animation: fadeUp 0.7s ease 0.36s both;">Kenali Cara Kami →</a>
        </div>
      </section>

      <!-- Marquee -->
      <div aria-hidden="true" style="border-top: 1px solid rgba(200,160,99,0.4); border-bottom: 1px solid rgba(200,160,99,0.4); padding: 16px 0; overflow: hidden; background: rgba(243,228,232,0.5);">
        <div style="display: flex; width: max-content; gap: 0; animation: marquee 32s linear infinite;">
          ${marqueeRow}
          ${marqueeRow}
        </div>
      </div>

      <!-- Cara kami menerjemahkan cinta -->
      <section style="padding: clamp(72px, 9vw, 120px) 32px;">
        <div style="max-width: 1140px; margin: 0 auto; display: flex; flex-direction: column; gap: 52px;">
          <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column; gap: 14px; max-width: 620px;">
              <div style="font-size: 11.5px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #A0793F;">Bahasa Cinta</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(32px, 4.6vw, 48px); line-height: 1.12; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Cara kami menerjemahkan <em style="font-style: italic; color: #7B2F4D;">cinta</em></h2>
              <p style="font-weight: 300; font-size: 15.5px; line-height: 1.75; color: #2A1820; margin: 0; max-width: 520px; text-wrap: pretty;">Lima bahasa cinta adalah kerangka berpikir kami — bukan lima program terpisah. Dari kerangka ini, program yang sedang berjalan lahir.</p>
            </div>
            <a class="as-btn hv-fill" href="/program" style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.5); padding: 13px 30px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: all 0.2s ease; white-space: nowrap;">Lihat Program →</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; align-items: stretch;">
              ${pillars}
          </div>
        </div>
      </section>

      <!-- Trust strip -->
      <section style="padding: 0 32px clamp(64px, 8vw, 100px);">
        <div style="max-width: 1000px; margin: 0 auto; background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); border-radius: 28px; padding: clamp(36px, 5vw, 56px); display: flex; flex-wrap: wrap; align-items: center; gap: 32px; justify-content: space-between;">
          <div style="max-width: 560px; display: flex; flex-direction: column; gap: 10px;">
            <div style="font-family: 'Lora', serif; font-size: clamp(20px, 2.6vw, 25px); font-weight: 600; color: #5E1F39; line-height: 1.35;">Yayasan resmi &amp; terdaftar</div>
            <div style="font-weight: 300; font-size: 15px; line-height: 1.75; color: #2A1820;">SK Kemenkumham No. AHU-0006826.AH.01.04.Tahun 2024, lengkap dengan akta pendirian dan NPWP. Setiap penyaluran tercatat dan dilaporkan terbuka.</div>
          </div>
          <a class="as-btn hv-fill" href="/laporan" style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: #7B2F4D; border: 1.5px solid rgba(123,47,77,0.5); background: rgba(247,243,236,0.7); padding: 13px 30px; border-radius: 999px; cursor: pointer; white-space: nowrap; transition: all 0.2s ease;">Lihat Laporan Kegiatan →</a>
        </div>
      </section>

      <!-- Jumat Berkah -->
      <section style="padding: 0 20px;">
        <div style="max-width: 1240px; margin: 0 auto; background: #5E1F39; border-radius: 36px; padding: clamp(56px, 8vw, 100px) clamp(28px, 6vw, 84px); position: relative; overflow: clip;">
          <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(42% 52% at 85% 10%, rgba(200,160,99,0.14) 0%, rgba(200,160,99,0) 100%);"></div>
          <div style="position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 56px; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 22px;">
              <div style="display: inline-flex; align-self: flex-start; align-items: center; gap: 8px; background: rgba(247,243,236,0.12); border: 1px solid rgba(200,160,99,0.5); border-radius: 999px; padding: 8px 18px; font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #C8A063;">Program Rutin</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(34px, 5vw, 54px); line-height: 1.08; letter-spacing: -0.01em; color: #F7F3EC; margin: 0;">Jumat <em style="font-style: italic;">Berkah</em></h2>
              <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #F3E4E8; margin: 0; max-width: 480px; text-wrap: pretty;">Lewat Jumat Berkah, kami menyiapkan dan membagikan makanan kepada orang-orang yang kami temui di jalan dan ruang publik atau melalui masjid-masjid.&nbsp;</p>
              <div style="margin-top: 8px; display: flex; gap: 14px; flex-wrap: wrap;">
                <a class="as-btn hv-blush" href="/laporan" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #5E1F39; background: #F7F3EC; border: 0; padding: 16px 34px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease;">Dukung Kegiatan</a>
              </div>
            </div>
            <div style="aspect-ratio: 4 / 3.4; border-radius: 200px 200px 28px 28px; overflow: hidden; border: 1px solid rgba(247,243,236,0.3);">
              <picture style="display: block; width: 100%; height: 100%;">
                <source srcset="${A('jumat-berkah-1.webp')}" type="image/webp">
                <img src="${A('jumat-berkah-1.jpg')}" alt="Relawan Cinta Foundation menyerahkan paket makanan kepada seorang pekerja di tepi jalan"${dim('jumat-berkah-1.jpg')} loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; object-position: center 32%; display: block;">
              </picture>
            </div>
          </div>
        </div>
      </section>

      <!-- Mau ikut jadi bagian -->
      <section style="padding: clamp(80px, 10vw, 130px) 32px 0;">
        <div style="max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: clamp(40px, 5vw, 72px); align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(30px, 4.2vw, 46px); line-height: 1.12; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Mau ikut jadi <em style="font-style: italic; color: #7B2F4D;">bagian?</em></h2>
            <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">Kebaikan bisa dimulai dari yang sederhana. Pilih cara yang paling nyaman untukmu.</p>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px;">
              <a class="as-btn hv-deep" href="/titip-cinta" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 15px 30px; border-radius: 12px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease;">Titip Cinta →</a>
              <button type="button" data-focus-donasi class="hv-soft" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.4); padding: 15px 28px; border-radius: 12px; cursor: pointer; letter-spacing: 0.03em; transition: all 0.2s ease;">Donasi Langsung</button>
            </div>
          </div>

          <div id="donasi-panel" style="background: rgba(247,243,236,0.75); border: 1px solid rgba(200,160,99,0.4); border-radius: 24px; padding: clamp(24px, 3vw, 34px); display: flex; flex-direction: column; gap: 24px;">
            <div role="tablist" aria-label="Metode donasi" style="display: flex; gap: 8px; border-bottom: 1px solid rgba(123,47,77,0.15); padding-bottom: 14px;">
                ${donTabs}
            </div>

            <div class="don-panel is-on" data-don-panel="QRIS" style="display: flex; flex-direction: column; gap: 18px; align-items: flex-start;">
              <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
                <img src="${A('qris-code.png')}" alt="Kode QRIS resmi Cinta Foundation ID, NMID ID1025412604759"${dim('qris-code.png')} loading="lazy" decoding="async" style="width: 190px; height: auto; display: block; border-radius: 10px; background: #FFFFFF; border: 1px solid rgba(200,160,99,0.4);">
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #5E1F39;">Scan QRIS untuk berdonasi</div>
                  <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 18px; color: #7B2F4D;">Cinta Foundation</div>
                  <div style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 12.5px; color: rgba(42,24,32,0.7);">NMID: ID1025412604759 · 3326968</div>
                </div>
              </div>
              <a class="hv-fill" href="${A('qris-cinta-foundation.png')}" download="QRIS-Cinta-Foundation.png" style="font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 500; color: #7B2F4D; border: 1.5px solid rgba(123,47,77,0.4); border-radius: 10px; padding: 12px 22px; text-decoration: none; transition: all 0.2s ease;">Simpan QRIS</a>
            </div>

            <div class="don-panel" data-don-panel="Transfer Bank" style="display: flex; flex-direction: column; gap: 18px; align-items: flex-start;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="font-family: 'Poppins', sans-serif; font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">Nama Bank</div>
                <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 21px; color: #5E1F39;">Bank BJB</div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="font-family: 'Poppins', sans-serif; font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">Nomor Rekening</div>
                <div style="font-family: 'Lora', serif; font-size: clamp(24px, 3vw, 30px); letter-spacing: 0.09em; color: #7B2F4D;">1122888820201</div>
              </div>
              <div style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.7; color: #2A1820;">a.n. <strong style="font-weight: 500; color: #5E1F39;">Yayasan Cinta Negeri Persada</strong> (Cinta Foundation)</div>
              <button type="button" data-copy-rek="1122888820201" class="hv-fill" style="font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.4); border-radius: 10px; padding: 12px 22px; cursor: pointer; transition: all 0.2s ease;">Salin nomor rekening</button>
            </div>

            <div class="don-panel" data-don-panel="Panduan" style="display: flex; flex-direction: column; gap: 18px; align-items: flex-start;">
              <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 19px; color: #5E1F39;">Panduan singkat</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: grid; grid-template-columns: 26px 1fr; gap: 12px;">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 12.5px; color: #A0793F;">1</span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14.5px; line-height: 1.7; color: #2A1820;">Pilih metode donasi yang paling nyaman.</span>
                </div>
                <div style="display: grid; grid-template-columns: 26px 1fr; gap: 12px;">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 12.5px; color: #A0793F;">2</span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14.5px; line-height: 1.7; color: #2A1820;">Transfer atau scan QRIS sesuai nominal yang ingin kamu titipkan.</span>
                </div>
                <div style="display: grid; grid-template-columns: 26px 1fr; gap: 12px;">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 12.5px; color: #A0793F;">3</span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14.5px; line-height: 1.7; color: #2A1820;">Konfirmasi donasi agar kami dapat mencatat dan menyampaikan laporannya.</span>
                </div>
              </div>
              <a class="hv-deeptext" href="/laporan" style="font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 500; color: #7B2F4D; background: none; border: 0; padding: 4px 0; cursor: pointer; text-decoration: none;">Lihat laporan kegiatan →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Closing -->
      <section style="padding: clamp(88px, 11vw, 140px) 32px; text-align: center; position: relative; overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(46% 60% at 50% 100%, rgba(243,228,232,0.9) 0%, rgba(243,228,232,0) 100%);"></div>
        <div style="position: relative; max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 28px;">
          <div style="font-family: 'Lora', serif; font-size: 26px; color: #C8A063;">✦</div>
          <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(34px, 5.2vw, 54px); line-height: 1.12; letter-spacing: -0.01em; color: #5E1F39; margin: 0; text-wrap: balance;">Mulai dari satu langkah <em style="font-style: italic; color: #7B2F4D;">kecil</em> hari ini.</h2>
        </div>
      </section>

    </main>
`;
}

/* ================================================================ PROGRAM */

export function program() {
  const framework = FRAMEWORK.map((fw) => `<div style="display: flex; flex-direction: column; gap: 8px; padding: 26px 0; border-top: 1px solid rgba(200,160,99,0.35);">
                <div style="display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap;">
                  <h3 style="font-family: 'Lora', serif; font-weight: 600; font-size: 22px; color: #5E1F39; margin: 0;">${esc(fw.name)}</h3>
                  <span style="font-family: 'Lora', serif; font-style: italic; font-size: 15.5px; color: #C97D90;">${esc(fw.translation)}</span>
                </div>
                <p style="font-weight: 300; font-size: 15.5px; line-height: 1.75; color: #2A1820; margin: 0; max-width: 660px; text-wrap: pretty;">${esc(fw.body)}</p>${fw.related ? `
                <div style="display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-top: 4px;">
                  <span style="font-size: 10.5px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #A0793F;">Terkait</span>
                  <span style="font-family: 'Lora', serif; font-style: italic; font-size: 15px; color: #7B2F4D;">${esc(fw.related)}</span>
                </div>` : ''}
              </div>`).join('\n              ');

  const archive = PROGRAM_ARCHIVE.map((ar) => `<article style="background: rgba(247,243,236,0.85); border: 1px solid rgba(200,160,99,0.4); border-radius: 24px; padding: clamp(28px, 4vw, 40px); display: flex; flex-direction: column; gap: 18px;">
                <h3 style="font-family: 'Lora', serif; font-weight: 600; font-size: clamp(22px, 2.8vw, 28px); color: #5E1F39; margin: 0;">${esc(ar.name)}</h3>
                <div role="img" aria-label="${esc(ar.photoAlt)}" style="width: 100%; aspect-ratio: 16 / 9; border-radius: 16px; background-image: url(&quot;${A(ar.photo)}&quot;); background-size: cover; background-position: center 45%;"></div>
                <p style="font-weight: 300; font-size: 15px; line-height: 1.75; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(ar.body)}</p>
                <div>
                  <a class="as-btn hv-fill" href="${ar.href}" style="font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.5); padding: 12px 26px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: all 0.2s ease; display: inline-block;">Lihat Perjalanannya →</a>
                </div>
              </article>`).join('\n              ');

  return `
    <main style="flex: 1;">

      <section style="position: relative; padding: clamp(72px, 10vw, 120px) 32px clamp(48px, 6vw, 72px); text-align: center; overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(50% 46% at 50% 12%, rgba(243,228,232,0.95) 0%, rgba(243,228,232,0) 100%);"></div>
        <div style="position: relative; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 26px;">
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(34px, 5.2vw, 56px); line-height: 1.12; letter-spacing: -0.01em; color: #5E1F39; margin: 0; text-wrap: balance; animation: fadeUp 0.7s ease both;">Ada banyak cara mencintai. <em style="font-style: italic; color: #7B2F4D;">Ini yang sedang kami jalani.</em></h1>
          <p style="font-weight: 300; font-size: 16.5px; line-height: 1.8; color: #2A1820; max-width: 620px; margin: 0; text-wrap: pretty; animation: fadeUp 0.7s ease 0.14s both;">Mulai dari apa yang sedang kami jalankan hari ini, bagaimana kami menerjemahkan cinta menjadi tindakan, hingga berbagai inisiatif yang telah kami hadirkan sebelumnya.</p>
        </div>
      </section>

      <!-- SECTION 01 — Program yang Sedang Berjalan -->
      <section style="padding: clamp(24px, 4vw, 40px) 20px clamp(24px, 4vw, 40px);">
        <div style="max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 34px;">
          <div style="max-width: 640px; display: flex; flex-direction: column; padding: 0 clamp(8px, 2vw, 20px);">
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(28px, 4vw, 42px); line-height: 1.15; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Program yang Sedang Berjalan</h2>
          </div>

          <!-- Jumat Berkah — featured -->
          <div style="background: #5E1F39; border-radius: 36px; padding: clamp(48px, 7vw, 88px) clamp(28px, 6vw, 76px); position: relative; overflow: clip;">
            <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(42% 52% at 88% 8%, rgba(200,160,99,0.16) 0%, rgba(200,160,99,0) 100%);"></div>
            <div style="position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 52px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 20px;">
                
                <h3 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(32px, 4.6vw, 50px); line-height: 1.1; letter-spacing: -0.01em; color: #F7F3EC; margin: 0;">Jumat <em style="font-style: italic;">Berkah</em></h3>
                <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #F3E4E8; margin: 0; max-width: 500px; text-wrap: pretty;">Makanan yang dibeli, dikemas, dan diantarkan langsung ke tangan penerima — ke pesantren, masjid, dan orang-orang di jalan.</p>
                <div style="margin-top: 6px;">
                  <a class="as-btn hv-blush" href="/laporan" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #5E1F39; background: #F7F3EC; border: 0; padding: 16px 34px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease; display: inline-block;">Lihat Perjalanan Jumat Berkah →</a>
                </div>
              </div>
              <div style="aspect-ratio: 4 / 3.2; border-radius: 200px 200px 28px 28px; overflow: hidden; border: 1px solid rgba(247,243,236,0.3);">
                <picture style="display: block; width: 100%; height: 100%;">
                  <source srcset="${A('jumat-berkah-2.webp')}" type="image/webp">
                  <img src="${A('jumat-berkah-2.jpg')}" alt="Seorang petugas kebersihan menerima paket makanan Jumat Berkah"${dim('jumat-berkah-2.jpg')} loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; object-position: center 38%; display: block;">
                </picture>
              </div>
            </div>
          </div>

          <!-- Titip Cinta — second active -->
          <div style="background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); border-radius: 36px; padding: clamp(40px, 6vw, 72px) clamp(28px, 6vw, 76px); display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(40px, 5vw, 64px); align-items: start;">
            <div style="display: flex; flex-direction: column; gap: 18px;">
              <h3 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(28px, 4vw, 42px); line-height: 1.12; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Titip <em style="font-style: italic; color: #7B2F4D;">Cinta</em></h3>
              <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #2A1820; margin: 0; max-width: 520px; text-wrap: pretty;">Titipkan kebaikan melalui kami, pilih programnya, kami mengantarkannya, lalu kami sampaikan laporannya. Bisa juga dititipkan atas nama seseorang yang kamu kasihi.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 26px; max-width: 440px;">
              <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 19px; color: #5E1F39;">Cara kerjanya</div>
              <div style="display: flex; flex-direction: column;">
                <div style="display: grid; grid-template-columns: 34px 1fr; gap: 4px 14px; padding-bottom: 18px; border-bottom: 1px solid rgba(123,47,77,0.15);">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 400; letter-spacing: 0.14em; color: #A0793F; padding-top: 3px;">01</span>
                  <span style="font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500; color: #5E1F39;">Pilih program</span>
                  <span></span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.7; color: #2A1820;">Tentukan kegiatan yang ingin kamu dukung.</span>
                </div>
                <div style="display: grid; grid-template-columns: 34px 1fr; gap: 4px 14px; padding: 18px 0; border-bottom: 1px solid rgba(123,47,77,0.15);">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 400; letter-spacing: 0.14em; color: #A0793F; padding-top: 3px;">02</span>
                  <span style="font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500; color: #5E1F39;">Titip atas nama seseorang</span>
                  <span></span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.7; color: #2A1820;">bisa orang tua, teman dekat, atau orang yang kamu kasihi</span>
                </div>
                <div style="display: grid; grid-template-columns: 34px 1fr; gap: 4px 14px; padding-top: 18px;">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 400; letter-spacing: 0.14em; color: #A0793F; padding-top: 3px;">03</span>
                  <span style="font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500; color: #5E1F39;">Konfirmasi &amp; Kami salurkan sampai laporannya</span>
                  <span></span>
                  <span style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.7; color: #2A1820;">Kirim konfirmasi donasi, setelahnya kami bagikan bukti penyalurannya melalui laporan kegiatan</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
                <a class="as-btn hv-deep" href="/titip-cinta" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 15px 30px; border-radius: 12px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease;">Titip Cinta →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 02 — Cara Kami Menerjemahkan Cinta -->
      <section style="padding: clamp(80px, 10vw, 120px) 32px;">
        <div style="max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 44px;">
          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 620px;">
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(28px, 4vw, 42px); line-height: 1.15; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Cara Kami Menerjemahkan Cinta</h2>
            <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">Lima bahasa cinta bukan lima program yang berjalan sendiri-sendiri. Ini kerangka berpikir yang kami pakai untuk menerjemahkan cinta menjadi tindakan.</p>
          </div>
          <div style="display: flex; flex-direction: column;">
              ${framework}
          </div>
        </div>
      </section>

      <!-- SECTION 03 — Program & Inisiatif Lainnya -->
      <section style="padding: clamp(80px, 10vw, 120px) 32px; background: rgba(243,228,232,0.55);">
        <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 640px;">
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(28px, 4vw, 42px); line-height: 1.15; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Program &amp; Inisiatif Lainnya</h2>
            <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">Berbagai bentuk kebaikan yang pernah kami hadirkan, mulai dari program berkelanjutan hingga kolaborasi dan inisiatif khusus.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
              ${archive}
          </div>
        </div>
      </section>

      <!-- Closing CTA -->
      <section style="padding: clamp(72px, 9vw, 110px) 32px; text-align: center;">
        <div style="max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px;">
          <div style="font-family: 'Lora', serif; font-size: 24px; color: #C8A063;">✦</div>
          <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(30px, 4.4vw, 46px); line-height: 1.15; letter-spacing: -0.01em; color: #5E1F39; margin: 0; text-wrap: balance;">Ingin ikut menjalankan salah satu <em style="font-style: italic; color: #7B2F4D;">program</em> ini?</h2>
          <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 4px;">
            <a class="as-btn hv-deep" href="/titip-cinta" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 16px 34px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease;">Titip Cinta</a>
            <a class="hv-fill" href="mailto:admin@cintafoundation.org" style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #7B2F4D; border: 1.5px solid rgba(123,47,77,0.5); padding: 16px 34px; border-radius: 999px; text-decoration: none; letter-spacing: 0.03em; transition: all 0.2s ease;">Hubungi Kami</a>
          </div>
        </div>
      </section>

    </main>
`;
}

/* ============================================================ TENTANG KAMI */

export function tentang() {
  const missions = MISSIONS.map((m) => `<div class="hv-tint" style="display: flex; gap: 28px; align-items: baseline; padding: 28px 12px; border-bottom: 1px solid rgba(200,160,99,0.35); border-radius: 12px; transition: background 0.25s ease;">
                <div style="font-family: 'Lora', serif; font-style: italic; font-size: 26px; color: #C8A063; min-width: 52px; letter-spacing: 0.04em;">${esc(m.numeral)}</div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 21px; color: #5E1F39;">${esc(m.title)}</div>
                  <div style="font-weight: 300; font-size: 15.5px; line-height: 1.7; color: #2A1820; text-wrap: pretty;">${esc(m.body)}</div>
                </div>
              </div>`).join('\n              ');

  // <details>/<summary> keeps every answer in the HTML and gives the
  // disclosure behaviour for free — no JS, and the copy stays crawlable.
  const faqs = FAQS.map((f) => `<details class="faq">
                <summary>
                  <span class="faq-q">${esc(f.q)}</span>
                  <span class="faq-chev" aria-hidden="true">+</span>
                </summary>
                <div class="faq-a">${esc(f.a)}</div>
              </details>`).join('\n              ');

  return `
    <main style="flex: 1;">

      <section style="position: relative; padding: clamp(80px, 11vw, 130px) 32px; overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(44% 50% at 78% 10%, rgba(243,228,232,0.9) 0%, rgba(243,228,232,0) 100%);"></div>
        <div style="position: relative; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px;">
          <div style="display: inline-flex; align-self: flex-start; align-items: center; gap: 8px; background: rgba(247,243,236,0.85); border: 1px solid rgba(200,160,99,0.5); border-radius: 999px; padding: 9px 20px; font-size: 11.5px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: #A0793F; animation: fadeUp 0.7s ease both;">Tentang Kami</div>
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-style: italic; font-size: clamp(42px, 6.5vw, 72px); line-height: 1.04; letter-spacing: -0.015em; color: #5E1F39; margin: 0; animation: fadeUp 0.7s ease 0.12s both;">Cinta adalah <span style="color: #7B2F4D;">kata kerja.</span></h1>
          <div style="font-weight: 300; font-size: 16.5px; line-height: 1.85; color: #2A1820; display: flex; flex-direction: column; gap: 18px; animation: fadeUp 0.7s ease 0.24s both;">
            <p style="margin: 0; text-wrap: pretty;">Cinta Foundation lahir dari satu keyakinan: bahwa cinta adalah kekuatan sosial terbesar yang dimiliki manusia. Di tengah dunia yang semakin kompleks dan terpolarisasi, kami memilih pendekatan yang sederhana namun kuat, menjadikan cinta sebagai fondasi setiap perubahan yang kami perjuangkan.</p>
            <p style="margin: 0; text-wrap: pretty;">Kami berdiri untuk bergerak, untuk membuka peluang, membuka ruang, dan menumbuhkan harapan bersama. Bukan karena kewajiban atau rasa bersalah, melainkan karena keyakinan yang tumbuh dari pilihan: bahwa setiap manusia, tanpa terkecuali, berhak mendapatkan cinta dan kesetaraan.</p>
          </div>
          <div style="font-family: 'Lora', serif; font-style: italic; font-size: clamp(20px, 2.6vw, 25px); line-height: 1.45; color: #7B2F4D; border-left: 3px solid #C8A063; padding-left: 24px;">Cinta bukan kata sifat — cinta adalah pilihan.</div>
        </div>
      </section>

      <!-- Visi -->
      <section style="padding: 0 20px;">
        <div style="max-width: 1240px; margin: 0 auto; background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); border-radius: 36px; padding: clamp(56px, 8vw, 90px) clamp(28px, 6vw, 84px);">
          <div style="max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; text-align: center; align-items: center;">
            <div style="font-size: 11.5px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #A0793F;">Visi</div>
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-style: italic; font-size: clamp(28px, 4.2vw, 44px); line-height: 1.2; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Menjadi Ruang Dimana Setiap Manusia Merasa&nbsp;<span style="color: rgb(123, 47, 77);">Dicintai.</span></h2>
            <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty; max-width: 620px;">Menunjukkan bahwa setiap manusia berhak mendapatkan cinta, ketulusan, dan kesetaraan dengan menciptakan ekosistem program sosial, pendidikan, dan spiritual yang memberdayakan serta berkelanjutan.</p>
          </div>
        </div>
      </section>

      <!-- Misi -->
      <section style="padding: clamp(72px, 9vw, 110px) 32px;">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
          <div style="font-size: 11.5px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #A0793F;">Misi</div>
          <div style="display: flex; flex-direction: column;">
              ${missions}
          </div>
        </div>
      </section>

      <!-- Legalitas -->
      <section style="padding: 0 20px;">
        <div style="max-width: 1000px; margin: 0 auto; background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); border-radius: 28px; padding: clamp(40px, 5vw, 60px); display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 11.5px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #A0793F;">Legalitas &amp; Keabsahan</div>
          <p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">Cinta Foundation adalah nama publik dari <strong style="font-weight: 500; color: #5E1F39;">Yayasan Cinta Negeri Persada</strong>, yayasan nirlaba yang terdaftar resmi di Indonesia berdasarkan <strong style="font-weight: 500; color: #5E1F39;">SK Menteri Hukum dan HAM No. AHU-0006826.AH.01.04.Tahun 2024</strong> — lengkap dengan akta pendirian dan NPWP. Kami berkomitmen menjalankan setiap program sesuai regulasi yang berlaku, dan melaporkannya secara terbuka lewat halaman Laporan Kegiatan kami.</p>
        </div>
      </section>

      <!-- FAQ -->
      <section style="padding: clamp(72px, 9vw, 110px) 32px clamp(88px, 11vw, 130px);">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 36px;">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="font-size: 11.5px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #A0793F;">FAQ</div>
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(28px, 4vw, 42px); letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Frequently Asked <em style="font-style: italic; color: #7B2F4D;">Questions</em></h2>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
              ${faqs}
          </div>
        </div>
      </section>

    </main>
`;
}

/* ============================================================ TITIP CINTA */

export function titip() {
  const rail = RAIL_LABELS.map((label, i) => {
    const n = i + 1;
    return `<div class="rail-step" data-rail="${n}" data-state="${n === 1 ? 'active' : 'todo'}" style="${RAIL_BASE}"><span style="font-family: 'Lora', serif; font-style: italic;">0${n}</span> ${esc(label)}</div>`;
  }).join('\n              ');

  const programChoices = TITIP_PROGRAMS.map((p) => `<button type="button" class="t-option" data-program="${esc(p.key)}" data-program-title="${esc(p.title)}" aria-pressed="false" style="${OPT_BASE}">
                    <span style="font-family: 'Lora', serif; font-weight: 600; font-size: 19px; color: #5E1F39;">${esc(p.title)}</span>
                    <span style="font-weight: 300; font-size: 14.5px; line-height: 1.6; color: #2A1820;">${esc(p.desc)}</span>
                  </button>`).join('\n                  ');

  const amountChoices = TITIP_AMOUNTS.map((a) =>
    `<button type="button" class="t-chip" data-amount="${esc(a)}" aria-pressed="false" style="${CHIP_BASE}">${esc(a)}</button>`
  ).join('\n                  ');

  const recipientChoices = TITIP_RECIPIENTS.map((r) =>
    `<button type="button" class="t-chip" data-recipient="${esc(r)}" aria-pressed="false" style="${CHIP_BASE}">${esc(r)}</button>`
  ).join('\n                  ');

  const summaryRows = [
    ['Program', 'program', '—'],
    ['Nominal', 'amount', '—'],
    ['Dari', 'donor', 'Hamba Allah'],
    ['Dititipkan untuk', 'recipient', 'Atas nama sendiri']
  ].map(([label, key, value]) => `<div style="display: flex; flex-wrap: wrap; gap: 6px 20px; justify-content: space-between; align-items: baseline; padding: 16px 0; border-bottom: 1px solid rgba(200,160,99,0.4);">
                    <dt style="font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(label)}</dt>
                    <dd data-summary="${key}" style="margin: 0; font-family: 'Lora', serif; font-size: 18px; color: #5E1F39; text-align: right;">${esc(value)}</dd>
                  </div>`).join('\n                  ');

  return `
    <main style="flex: 1;">

      <section style="position: relative; padding: clamp(72px, 10vw, 120px) 32px clamp(40px, 5vw, 64px); text-align: center; overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(52% 46% at 50% 14%, rgba(243,228,232,0.95) 0%, rgba(243,228,232,0) 100%), radial-gradient(26% 30% at 84% 66%, rgba(200,160,99,0.14) 0%, rgba(200,160,99,0) 100%); animation: drift 14s ease-in-out infinite;"></div>
        <div style="position: relative; max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 22px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(247,243,236,0.85); border: 1px solid rgba(200,160,99,0.5); border-radius: 999px; padding: 9px 20px; font-size: 11.5px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: #A0793F; animation: fadeUp 0.7s ease both;">Berbagi &amp; Memberi</div>
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(46px, 7.5vw, 78px); line-height: 1.04; letter-spacing: -0.015em; color: #5E1F39; margin: 0; animation: fadeUp 0.7s ease 0.12s both;">Titip <em style="font-style: italic; color: #7B2F4D;">Cinta</em></h1>
          <div style="font-family: 'Lora', serif; font-style: italic; font-size: clamp(19px, 2.6vw, 25px); color: #7B2F4D; line-height: 1.4; animation: fadeUp 0.7s ease 0.2s both;">Cinta yang dititipkan, akan selalu sampai.</div>
          <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #2A1820; margin: 0; max-width: 600px; text-wrap: pretty; animation: fadeUp 0.7s ease 0.3s both;">Titip artinya percaya — bahwa apa yang kamu serahkan akan dijaga dan disampaikan dengan benar. Titip Cinta adalah cara kami menerima kepercayaan itu, lalu melaporkan sampainya di halaman Laporan Kegiatan.</p>
        </div>
      </section>

      <!-- Journey -->
      <section style="padding: 0 20px clamp(64px, 8vw, 100px);">
        <div data-titip-flow style="max-width: 940px; margin: 0 auto; background: rgba(243,228,232,0.55); border: 1px solid rgba(200,160,99,0.4); border-radius: 32px; padding: clamp(28px, 4vw, 52px); display: flex; flex-direction: column; gap: 32px;">

          <!-- Step rail -->
          <nav aria-label="Langkah Titip Cinta" style="display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; padding-bottom: 22px; border-bottom: 1px solid rgba(200,160,99,0.4);">
              ${rail}
          </nav>

          <!-- STEP 1 — Pilih program -->
          <div class="t-step is-on" data-step="1" style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 01</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Cinta ini untuk apa?</h2>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                  ${programChoices}
            </div>
          </div>

          <!-- STEP 2 — Nominal -->
          <div class="t-step" data-step="2" style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 02</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Berapa yang ingin dititipkan?</h2>
              <p style="font-family: 'Lora', serif; font-style: italic; font-size: 16px; color: #7B2F4D; margin: 0;">Tidak perlu menunggu jumlah besar.</p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                  ${amountChoices}
            </div>
            <label style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
              <span style="font-size: 12.5px; font-weight: 400; color: #2A1820;">Atau tulis jumlah lain</span>
              <input type="text" inputmode="numeric" data-custom-amount placeholder="Rp" style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #2A1820; background: rgba(247,243,236,0.9); border: 1px solid rgba(200,160,99,0.5); border-radius: 10px; padding: 14px 16px; min-height: 48px;">
            </label>
          </div>

          <!-- STEP 3 — Identitas -->
          <div class="t-step" data-step="3" style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 03</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Boleh kami tahu namamu?</h2>
              <p style="font-weight: 300; font-size: 15px; line-height: 1.7; color: #2A1820; margin: 0; max-width: 520px;">Hanya untuk konfirmasi. Kalau ingin tetap anonim, tulis “Hamba Allah”.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; max-width: 640px;">
              <label style="display: flex; flex-direction: column; gap: 8px;">
                <span style="font-size: 12.5px; color: #2A1820;">Nama</span>
                <input type="text" data-donor-name placeholder="Nama atau Hamba Allah" style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #2A1820; background: rgba(247,243,236,0.9); border: 1px solid rgba(200,160,99,0.5); border-radius: 10px; padding: 14px 16px; min-height: 48px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 8px;">
                <span style="font-size: 12.5px; color: #2A1820;">Email atau WhatsApp</span>
                <input type="text" data-donor-contact placeholder="Agar kami bisa mengonfirmasi" style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #2A1820; background: rgba(247,243,236,0.9); border: 1px solid rgba(200,160,99,0.5); border-radius: 10px; padding: 14px 16px; min-height: 48px;">
              </label>
            </div>
          </div>

          <!-- STEP 4 — Titip untuk seseorang -->
          <div class="t-step" data-step="4" style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 04</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Titip untuk <em style="font-style: italic; color: #7B2F4D;">seseorang</em>?</h2>
              <p style="font-family: 'Lora', serif; font-style: italic; font-size: 16.5px; line-height: 1.6; color: #7B2F4D; margin: 0; max-width: 540px;">Cinta bisa dititipkan atas nama orang yang kamu cintai — yang masih ada, atau yang sudah pergi.</p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                  ${recipientChoices}
            </div>
            <label style="display: flex; flex-direction: column; gap: 8px; max-width: 380px;">
              <span style="font-size: 12.5px; color: #2A1820;">Nama yang dititipi (opsional)</span>
              <input type="text" data-recipient-name placeholder="Misal: Ibu Siti" style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #2A1820; background: rgba(247,243,236,0.9); border: 1px solid rgba(200,160,99,0.5); border-radius: 10px; padding: 14px 16px; min-height: 48px;">
            </label>
            <button type="button" data-skip-recipient style="align-self: flex-start; font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 400; color: #7B2F4D; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 8px 0;">Titipkan atas nama saya sendiri</button>
          </div>

          <!-- STEP 5 — Pembayaran -->
          <div class="t-step" data-step="5" style="display: flex; flex-direction: column; gap: 24px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 05</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Cara menitipkan</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; align-items: stretch;">
              <div style="background: #5E1F39; border-radius: 22px; padding: 32px 30px; display: flex; flex-direction: column; justify-content: center; gap: 12px;">
                <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #C8A063;">Transfer Bank</div>
                <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 21px; color: #F7F3EC;">Bank BJB</div>
                <div style="font-family: 'Lora', serif; font-size: clamp(24px, 3vw, 30px); letter-spacing: 0.1em; color: #F3E4E8;">1122888820201</div>
                <div style="font-weight: 300; font-size: 14px; line-height: 1.6; color: #F3E4E8;">a.n. <strong style="font-weight: 500; color: #F7F3EC;">Yayasan Cinta Negeri Persada</strong> (Cinta Foundation)</div>
              </div>
              <div style="border: 1px solid rgba(200,160,99,0.6); background: rgba(247,243,236,0.9); border-radius: 22px; padding: 28px 30px 30px; display: flex; flex-direction: column; gap: 14px; justify-content: center; align-items: center; text-align: center;">
                <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #A0793F;">QRIS</div>
                <img src="${A('qris-code.png')}" alt="Kode QRIS resmi Cinta Foundation ID, NMID ID1025412604759"${dim('qris-code.png')} loading="lazy" decoding="async" style="width: 100%; max-width: 300px; height: auto; display: block; border-radius: 10px; background: #FFFFFF;">
                <div style="display: flex; flex-direction: column; gap: 3px;">
                  <div style="font-family: 'Lora', serif; font-weight: 600; font-size: 16px; color: #5E1F39;">Cinta Foundation ID</div>
                  <div style="font-weight: 300; font-size: 13px; letter-spacing: 0.04em; color: #2A1820;">NMID: ID1025412604759 · 3326968</div>
                </div>
                <div style="font-weight: 300; font-size: 13.5px; line-height: 1.6; color: #2A1820;">Scan dengan aplikasi apa pun yang berlogo QRIS.</div>
              </div>
            </div>
            <p style="font-weight: 300; font-size: 14.5px; line-height: 1.75; color: #2A1820; margin: 0; max-width: 620px; text-wrap: pretty;">Setelah menitipkan, kirimkan bukti transfer ke <a href="mailto:admin@cintafoundation.org" style="color: #7B2F4D;">admin@cintafoundation.org</a> agar kami bisa mencatat dan mengonfirmasinya.</p>
          </div>

          <!-- STEP 6 — Konfirmasi -->
          <div class="t-step" data-step="6" style="display: flex; flex-direction: column; gap: 24px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Langkah 06</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 34px); color: #5E1F39; margin: 0;">Ringkasan titipanmu</h2>
            </div>
            <dl style="margin: 0; display: flex; flex-direction: column; gap: 0;">
                  ${summaryRows}
            </dl>
            <p style="font-family: 'Lora', serif; font-style: italic; font-size: 17px; line-height: 1.7; color: #7B2F4D; margin: 0; max-width: 560px; text-wrap: pretty;">Terima kasih. Titipanmu akan kami catat, salurkan, dan laporkan.</p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a class="as-btn hv-fill" href="/laporan" style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.5); padding: 14px 28px; border-radius: 999px; cursor: pointer; transition: all 0.2s ease;">Lihat Laporan Kegiatan →</a>
              <button type="button" data-flow-reset style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; color: #7B2F4D; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 14px 4px;">Mulai titipan baru</button>
            </div>
          </div>

          <!-- Nav buttons -->
          <div class="flow-nav" data-flow-nav style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; padding-top: 8px;">
            <button type="button" class="flow-back is-off hv-fill" data-flow-back style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: #7B2F4D; background: transparent; border: 1.5px solid rgba(123,47,77,0.5); padding: 14px 28px; border-radius: 999px; cursor: pointer; transition: all 0.2s ease;">← Kembali</button>
            <button type="button" class="hv-deep" data-flow-next style="font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 15px 34px; border-radius: 999px; cursor: pointer; letter-spacing: 0.03em; transition: background 0.2s ease;">Lanjut →</button>
          </div>

        </div>
      </section>

      <!-- Closing -->
      <section style="padding: 0 20px clamp(64px, 8vw, 96px);">
        <div style="max-width: 1000px; margin: 0 auto; background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); border-radius: 28px; padding: clamp(44px, 6vw, 68px); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px;">
          <div style="font-family: 'Lora', serif; font-size: 22px; color: #C8A063;">✦</div>
          <div style="font-family: 'Lora', serif; font-style: italic; font-size: clamp(21px, 3vw, 28px); line-height: 1.5; color: #7B2F4D; text-wrap: balance; max-width: 560px;">Tidak perlu menunggu jumlah besar. Titip Cinta dimulai dari langkah kecil — dan kami akan pastikan sampai.</div>
        </div>
      </section>

    </main>
`;
}

/* ======================================================== LAPORAN KEGIATAN */

export function laporan() {
  const filters = LAP_FILTERS.map((label) =>
    `<button type="button" role="tab" class="lap-filter" data-filter="${esc(label)}" aria-selected="${label === 'Semua' ? 'true' : 'false'}" style="${FILTER_BASE}">${esc(label)}</button>`
  ).join('\n            ');

  const titleStyle = "font-family: 'Lora', serif; font-weight: 600; font-size: clamp(23px, 2.9vw, 30px); line-height: 1.22; letter-spacing: -0.01em; color: #5E1F39; text-decoration: none; transition: color 0.2s ease;";

  const feed = REPORTS.map((it) => {
    const media = it.image
      ? `<div role="img" aria-label="${esc(it.alt)}" style="aspect-ratio: 4 / 3; border-radius: 14px; border: 1px solid rgba(200,160,99,0.35); background-color: #F3E4E8; background-size: cover; background-repeat: no-repeat; background-image: url(&quot;${A(it.image)}&quot;); background-position: ${it.focus};"></div>`
      : `<div style="aspect-ratio: 4 / 3; border-radius: 14px; background: #F3E4E8; border: 1px solid rgba(200,160,99,0.35); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 20px;">
                <div role="img" aria-label="Logo Cinta Foundation" style="width: 40%; max-width: 110px; aspect-ratio: 1 / 1; background-image: url('${A('logo-wine.png')}'); background-size: contain; background-repeat: no-repeat; background-position: center; opacity: 0.55;"></div>
              </div>`;
    // The 14 Agustus report has no standalone page yet, so its title is not a link.
    const title = it.url
      ? `<a class="hv-wine" href="${it.url}" style="${titleStyle}">${esc(it.title)}</a>`
      : `<span style="${titleStyle}">${esc(it.title)}</span>`;
    return `<article class="feed-item" data-category="${esc(it.category)}" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: clamp(24px, 3.5vw, 44px); align-items: start; padding: clamp(32px, 4.5vw, 52px) 0; border-top: 1px solid rgba(200,160,99,0.35);">
              ${media}
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(it.category)}</div>
                ${title}
                <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(it.preview)}</p>
              </div>
            </article>`;
  }).join('\n            ');

  return `
    <main style="flex: 1;">

      <section style="position: relative; padding: clamp(64px, 8vw, 96px) 32px clamp(20px, 3vw, 32px); overflow: clip;">
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(50% 46% at 50% 0%, rgba(243,228,232,0.9) 0%, rgba(243,228,232,0) 100%);"></div>
        <div style="position: relative; max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(38px, 5.4vw, 58px); line-height: 1.08; letter-spacing: -0.015em; color: #5E1F39; margin: 0;">Laporan <em style="font-style: italic; color: #7B2F4D;">Kegiatan</em></h1>
          <p style="font-weight: 300; font-size: 16.5px; line-height: 1.8; color: #2A1820; max-width: 640px; margin: 0; text-wrap: pretty;">Setiap kegiatan punya cerita, proses, dan hasil yang berbeda. Di halaman ini, kami mencatatnya satu per satu supaya apa yang kami jalankan bisa dilihat kembali dengan lebih jelas.</p>
          <p style="font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 14.5px; line-height: 1.7; color: #7B2F4D; margin: 0;">Pilih kategori untuk melihat kegiatan yang ingin kamu ikuti:</p>
        </div>
      </section>

      <section style="padding: 0 32px clamp(28px, 4vw, 44px);">
        <div class="filter-rail" style="max-width: 780px; margin: 0 auto; display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;" role="tablist" aria-label="Kategori kegiatan">
            ${filters}
        </div>
      </section>

      <section style="padding: 0 32px clamp(56px, 7vw, 88px);">
        <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column;">
            ${feed}
          <div class="feed-empty" data-feed-empty style="border-top: 1px solid rgba(200,160,99,0.35); padding: clamp(40px, 5vw, 60px) 0;">
            <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: rgba(42,24,32,0.7); margin: 0;">Belum ada laporan pada kategori ini. Kegiatannya kami tambahkan di sini begitu berjalan.</p>
          </div>
          <div style="border-top: 1px solid rgba(200,160,99,0.35);"></div>
        </div>
      </section>

      <section style="padding: clamp(8px, 2vw, 16px) 32px clamp(88px, 11vw, 130px); text-align: center;">
        <div style="max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; border-top: 1px solid rgba(200,160,99,0.4); padding-top: clamp(48px, 6vw, 72px);">
          <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.6vw, 36px); line-height: 1.2; letter-spacing: -0.01em; color: #5E1F39; margin: 0;">Ada yang ingin ditanyakan?</h2>
          <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; max-width: 520px; text-wrap: pretty;">Kalau ada yang ingin kamu tanyakan tentang kegiatan, penyaluran, atau laporan kami, silakan hubungi kami.</p>
          <a class="hv-fill" href="mailto:admin@cintafoundation.org" style="font-size: 14px; font-weight: 500; color: #7B2F4D; border: 1.5px solid rgba(123,47,77,0.5); padding: 13px 30px; border-radius: 999px; text-decoration: none; transition: all 0.2s ease;">admin@cintafoundation.org</a>
        </div>
      </section>

    </main>
`;
}

/* ========================================================== LAPORAN DETAIL */

function segments(segs) {
  return segs.map((g) => {
    if (g.bold) return `<strong style="font-weight: 500; color: #5E1F39;">${esc(g.txt)}</strong>`;
    if (g.isLink) return `<a class="hv-ul" href="${g.to}" style="font-family: inherit; font-size: inherit; font-weight: 400; line-height: inherit; color: #7B2F4D; background: none; border: 0; border-bottom: 1px solid rgba(123,47,77,0.35); padding: 0; text-decoration: none;">${esc(g.txt)}</a>`;
    return `<span>${esc(g.txt)}</span>`;
  }).join('');
}

function blocks(list) {
  return list.map((b) => {
    if (b.isLead) return `<p style="font-family: 'Lora', serif; font-size: clamp(18px, 2vw, 21px); font-weight: 400; line-height: 1.65; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(b.text)}</p>`;
    if (b.isPara) return `<p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${segments(b.segs)}</p>`;
    if (b.isH2) return `<h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(23px, 3vw, 30px); line-height: 1.22; color: #5E1F39; margin: 22px 0 0; text-wrap: pretty;">${esc(b.text)}</h2>`;
    if (b.isQuote) return `<div style="margin: 14px 0; padding: 26px 30px; background: #F3E4E8; border-radius: 22px; font-family: 'Lora', serif; font-style: italic; font-size: clamp(18px, 2.1vw, 21px); line-height: 1.6; color: #7B2F4D; text-wrap: pretty;">${esc(b.text)}</div>`;
    if (b.isPhoto) {
      // Explicit width/height on the <img> so the box is reserved before the
      // file lands; the cover is eager, the two below it lazy.
      return `<figure style="margin: 14px 0; display: flex; flex-direction: column; gap: 8px;">
                    <picture style="display: block; width: 100%; max-width: ${b.maxW};">
                      <source srcset="${A(b.name + '.webp')}" type="image/webp">
                      <img src="${A(b.name + '.jpg')}" alt="${esc(b.alt)}" width="${b.w}" height="${b.h}"${b.eager ? '' : ' loading="lazy"'} decoding="async" style="width: 100%; height: auto; display: block; border-radius: 22px;">
                    </picture>
                    <figcaption style="font-weight: 300; font-size: 12.5px; line-height: 1.6; color: #74656A; max-width: ${b.maxW};">${esc(b.caption)}</figcaption>
                  </figure>`;
    }
    if (b.isFigure) {
      const maxW = b.maxW || '100%';
      return `<figure style="margin: 14px 0; display: flex; flex-direction: column; gap: 8px;">
                    <div role="img" aria-label="${esc(b.alt)}" style="width: 100%; max-width: ${maxW}; aspect-ratio: ${b.ratio || '16 / 11'}; border-radius: 22px; background-image: url(&quot;${A(b.image)}&quot;); background-size: cover; background-repeat: no-repeat; background-position: center;"></div>
                    <figcaption style="font-weight: 300; font-size: 12.5px; line-height: 1.6; color: #74656A; max-width: ${maxW};">${esc(b.caption)}</figcaption>
                  </figure>`;
    }
    return '';
  }).join('\n                ');
}

/* A photo-led report: heading, then images and copy, and nothing after it.
   The three earlier reports close with a Drive documentation panel; this one
   deliberately has none. */
function photoReport(rep, art) {
  return `
    <main style="flex: 1;">
      <section style="padding: clamp(56px, 7vw, 88px) 32px clamp(72px, 9vw, 110px);">
        <div style="max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <a class="hv-deeptext" href="/laporan" style="align-self: flex-start; font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 400; color: #7B2F4D; background: none; border: 0; padding: 0; cursor: pointer; letter-spacing: 0.02em; text-decoration: none;">← Laporan Kegiatan</a>
          <div style="font-family: 'Poppins', sans-serif; font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(rep.category)}</div>
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(32px, 4.6vw, 48px); line-height: 1.12; letter-spacing: -0.015em; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(rep.heading)}</h1>
        </div>

        <div style="max-width: 720px; margin: 32px auto 0; width: 100%; display: flex; flex-direction: column; gap: 22px;">
                ${blocks(art.blocks)}
        </div>
      </section>
    </main>
`;
}

export function report(rep) {
  const art = ARTICLES[rep.article] || {};
  if (art.layout === 'photo') return photoReport(rep, art);
  const heading = rep.heading || rep.title;
  const heroMaxW = art.heroMaxW || '100%';
  const heroRatio = art.heroRatio || '16 / 8.6';
  const hasBlocks = !!art.blocks;

  const meta = hasBlocks ? `
          <div style="display: flex; flex-wrap: wrap; gap: 8px 22px; padding-top: 4px; font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 12.5px; letter-spacing: 0.04em; color: #74656A;">
            ${art.meta.map((mt) => `<span>${esc(mt)}</span>`).join('\n            ')}
          </div>` : '';

  const facts = hasBlocks ? `<div class="facts-grid" style="display: grid; gap: 18px; padding-bottom: 12px; border-bottom: 1px solid rgba(200,160,99,0.4);">
                  ${art.facts.map((ft) => `<div style="display: flex; flex-direction: column; gap: 3px;">
                    <div style="font-family: 'Lora', serif; font-size: 26px; line-height: 1.1; color: #7B2F4D;">${esc(ft.value)}</div>
                    <div style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 12.5px; color: #74656A;">${esc(ft.label)}</div>
                  </div>`).join('\n                  ')}
                </div>` : '';

  const donation = art.donation ? `
            <section style="max-width: 720px; margin: 0 auto; width: 100%; border: 1px solid rgba(200,160,99,0.5); border-radius: 30px; padding: clamp(28px, 4vw, 42px); display: flex; flex-direction: column; gap: 18px;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(art.donation.kicker)}</div>
                <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(23px, 3vw, 30px); line-height: 1.22; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(art.donation.title)}</h2>
              </div>
              <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(art.donation.body)}</p>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${art.donation.steps.map((st) => `<div style="display: grid; grid-template-columns: 26px 1fr; gap: 12px; align-items: baseline;">
                  <div style="font-family: 'Lora', serif; font-size: 15px; color: #C8A063;">${esc(st.n)}</div>
                  <div style="font-weight: 300; font-size: 15px; line-height: 1.7; color: #2A1820; text-wrap: pretty;">${esc(st.text)}</div>
                </div>`).join('\n                ')}
              </div>
              <a class="as-btn hv-deep" href="/titip-cinta" style="align-self: flex-start; margin-top: 4px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 13px 24px; border-radius: 12px; cursor: pointer;">${esc(art.donation.cta)}</a>
              <p style="font-weight: 300; font-size: 12.5px; line-height: 1.6; color: #74656A; margin: 0;">${esc(art.donation.note)}</p>
            </section>` : '';

  const articleBody = hasBlocks ? `
            <div style="max-width: 720px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 22px;">
                ${facts}

                ${blocks(art.blocks)}
            </div>
${donation}
            <section style="background: #F3E4E8; border-radius: 30px; padding: clamp(30px, 4vw, 46px); display: flex; flex-direction: column; gap: 14px;">
              <div style="font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(art.closingEyebrow)}</div>
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(24px, 3.2vw, 33px); line-height: 1.2; color: #5E1F39; margin: 0; max-width: 640px; text-wrap: pretty;">${esc(art.closingTitle)}</h2>
              <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #2A1820; margin: 0; max-width: 620px; text-wrap: pretty;">${esc(art.closingBody)}</p>
            </section>` : '';

  const barakahBody = rep.article === 'bb' ? `
            <div style="max-width: 720px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 20px;">
              ${art.intro.map((p) => `<p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(p)}</p>`).join('\n              ')}
            </div>

            <div style="display: flex; flex-direction: column; gap: 0;">
              <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(26px, 3.4vw, 36px); line-height: 1.2; color: #5E1F39; margin: 0 0 8px; text-wrap: pretty;">Tiga pekan Barakah Bazaar</h2>
              ${art.weeks.map((wk) => `<div class="bb-week" style="display: grid; gap: clamp(18px, 3vw, 40px); padding: clamp(32px, 4vw, 46px) 0; border-top: 1px solid rgba(200,160,99,0.4);">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #A0793F;">${esc(wk.label)}</div>
                  <div style="font-family: 'Lora', serif; font-size: 20px; line-height: 1.3; color: #7B2F4D;">${esc(wk.date)}</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; min-width: 0;">
                  <h3 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(21px, 2.4vw, 27px); line-height: 1.25; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(wk.title)}</h3>${wk.body ? `
                  <p style="font-weight: 300; font-size: 15.5px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(wk.body)}</p>` : ''}${wk.bodyAmount ? `
                  <p style="font-weight: 300; font-size: 15.5px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(wk.bodyPre)}<span style="color: #7B2F4D; font-weight: 500;">${esc(wk.bodyAmount)}</span>${esc(wk.bodyPost)}</p>` : ''}
                  <figure style="margin: 8px 0 0; display: flex; flex-direction: column; gap: 8px;">
                    <div role="img" aria-label="${esc(wk.alt)}" style="width: 100%; aspect-ratio: 16 / 11; border-radius: 20px; background-image: url(&quot;${A(wk.image)}&quot;); background-size: cover; background-position: center;"></div>
                    <figcaption style="font-weight: 300; font-size: 12.5px; color: #74656A;">${esc(wk.caption)}</figcaption>${wk.note ? `
                    <figcaption style="font-weight: 300; font-size: 11.5px; line-height: 1.6; color: #9A767F;">${esc(wk.note)}</figcaption>` : ''}
                  </figure>
                </div>
              </div>`).join('\n              ')}
            </div>

            <div style="max-width: 720px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 20px;">
              ${art.closing.map((p) => `<p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(p)}</p>`).join('\n              ')}

              <section style="margin-top: 22px; padding-top: 34px; border-top: 1px solid rgba(200,160,99,0.4); display: flex; flex-direction: column; gap: 18px;">
                <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(24px, 3.2vw, 33px); line-height: 1.2; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(art.noteTitle)}</h2>
                <p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(art.notePre)}<span style="color: #7B2F4D; font-weight: 600; white-space: nowrap;">${esc(art.noteAmount)}</span>${esc(art.notePost)}</p>
                <p style="font-weight: 300; font-size: 16px; line-height: 1.85; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(art.noteSecond)}</p>
              </section>

              <div style="margin-top: 14px; font-family: 'Lora', serif; font-style: italic; font-size: 17px; line-height: 1.7; color: #7B2F4D; text-wrap: pretty;">${esc(art.thanks)}</div>
            </div>` : '';

  return `
    <main style="flex: 1;">
      <section style="padding: clamp(56px, 7vw, 88px) 32px clamp(72px, 9vw, 110px);">
        <div style="max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <a class="hv-deeptext" href="/laporan" style="align-self: flex-start; font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 400; color: #7B2F4D; background: none; border: 0; padding: 0; cursor: pointer; letter-spacing: 0.02em; text-decoration: none;">← Laporan Kegiatan</a>
          <div style="font-family: 'Poppins', sans-serif; font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #A0793F;">${esc(rep.category)}</div>
          <h1 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(32px, 4.6vw, 48px); line-height: 1.12; letter-spacing: -0.015em; color: #5E1F39; margin: 0; text-wrap: pretty;">${esc(heading)}</h1>
          <p style="font-weight: 300; font-size: 16px; line-height: 1.8; color: #2A1820; margin: 0; text-wrap: pretty;">${esc(rep.preview)}</p>${meta}
        </div>

        <div style="max-width: 940px; margin: 40px auto 0; display: flex; flex-direction: column; gap: clamp(48px, 6vw, 72px);">

          <figure style="margin: 0; display: flex; flex-direction: column; gap: 10px;">
            <div role="img" aria-label="${esc(rep.alt)}" style="width: 100%; max-width: ${heroMaxW}; aspect-ratio: ${heroRatio}; border-radius: 28px; background-image: url(&quot;${A(rep.image)}&quot;); background-size: cover; background-repeat: no-repeat; background-position: center 40%;"></div>
            <figcaption style="font-weight: 300; font-size: 12.5px; color: #74656A; text-align: left; max-width: ${heroMaxW};">${esc(art.heroCaption)}</figcaption>
          </figure>
${articleBody}${barakahBody}

          <section style="background: #5E1F39; border-radius: 30px; padding: clamp(30px, 4vw, 46px); display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
            <h2 style="font-family: 'Lora', serif; font-weight: 500; font-size: clamp(24px, 3.2vw, 33px); line-height: 1.2; color: #F7F3EC; margin: 0;">Dokumentasi lengkap</h2>
            <p style="font-weight: 300; font-size: 15.5px; line-height: 1.8; color: #EADDE1; margin: 0; max-width: 620px; text-wrap: pretty;">${esc(art.docsBody)}</p>
            <a class="hv-blush" href="${esc(art.docsUrl)}" target="_blank" rel="noopener noreferrer" style="margin-top: 6px; display: inline-flex; align-items: center; gap: 10px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; text-decoration: none; background: #F7F3EC; color: #7B2F4D; padding: 13px 22px; border-radius: 12px;">${esc(art.docsLabel)}</a>
          </section>

        </div>
      </section>
    </main>
`;
}

/* ============================================ DONASI — JUMAT BERKAH (ads) */
// TikTok ad landing page. Not linked from the site navigation, noindex, and
// kept out of the sitemap (see build.mjs). Copy supplied by B, Sep 2026.

const MAILTO_BUKTI = 'mailto:admin@cintafoundation.org?subject=' +
  encodeURIComponent('Bukti donasi Jumat Berkah') + '&body=' +
  encodeURIComponent('Nama (atau Hamba Allah):\nNominal:\nTanggal transfer:\n\n(lampirkan screenshot bukti transfer)');

export function donasiJumatBerkah() {
  return `
    <main class="dl" data-landing="jumat-berkah" data-landing-name="Donasi Jumat Berkah">

      <section class="dl-hero">
        <div class="dl-poster"><img src="${A('donasi-jb-poster.jpg')}" alt="Poster Jumat Berkah Cinta Foundation: Seporsi Nasi, Sepenuh Berkah. Relawan membagikan nasi kotak kepada petugas kebersihan, pengemudi ojek online, dan warga."${dim('donasi-jb-poster.jpg')} fetchpriority="high" decoding="async"></div>
        <div class="dl-kicker">Jumat Berkah</div>
        <h1>Seporsi Nasi, <em>Sepenuh Berkah</em></h1>
      </section>

      <section class="dl-story">
        <blockquote class="dl-opening">“Mas, makanannya boleh satu? Saya belum sempat makan sejak pagi.”</blockquote>
        <p>Kalimat itu kami dengar dari seorang bapak yang sedang beristirahat di tepi jalan. Sejak pagi ia sudah bekerja di bawah terik matahari, tetapi makan siang masih menjadi sesuatu yang harus ditunda.</p>
        <p>Di sudut-sudut kota, ada banyak orang dengan hari yang serupa. Ada yang menarik gerobak, menjaga parkiran, menawarkan dagangan, ada juga yang sedang duduk sebentar melepas lelah. Pekerjaan mereka jalan terus, dan jam makan sering jadi yang pertama dikorbankan.</p>
        <p>Melalui Jumat Berkah, satu nasi yang kita titipkan mungkin terlihat sederhana. Namun bagi seseorang di jalanan, ia bisa menjadi tenaga untuk melanjutkan hari dan bagi kita, menjadi sedekah yang semoga diterima dan dicatat sebagai kebaikan.</p>

        <figure class="dl-ayat">
          <blockquote>“Dan mereka memberikan makanan yang disukainya kepada orang miskin, anak yatim, dan orang yang ditawan.”</blockquote>
          <figcaption>QS. Al-Insan: 8</figcaption>
        </figure>

        <p>Memberi makan termasuk amalan yang dicintai Allah, dan hari Jumat punya keistimewaannya sendiri. Karena itu kami memilih Jumat untuk berbagi sebungkus nasi dengan mereka yang sedang bekerja di jalan.</p>
        <p>Melalui program Jumat Berkah, Cinta Foundation menyalurkan makanan siap saji sekaligus membagikannya kepada saudara-saudara kita yang berada di jalanan. Program ini kami jalankan secara rutin setiap pekan atau setiap dua pekan sekali, di jalanan di Jakarta Selatan.</p>

        <div class="dl-pull">
          <div class="dl-kicker">Jalanan menjadi titik temu kebaikan</div>
          <p>tempat niat baik bertemu dengan kebutuhan nyata, dan tempat berbagi menjadi lebih dekat, lebih bermakna.</p>
        </div>

        <p class="dl-cta-lead">Bantu wujudkan Jumat yang penuh berkah dan kenyang.</p>
        <p>Klik tombol donasi di bawah dan sebarkan halaman ini agar lebih banyak yang tergerak.</p>
      </section>

      <section class="dl-donate" id="donasi" aria-labelledby="donasi-judul">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="dl-kicker">Donasi Jumat Berkah</div>
          <h2 id="donasi-judul">Pilih cara yang paling mudah</h2>
        </div>

        <div class="dl-tabs" role="tablist" aria-label="Cara donasi">
          <button type="button" role="tab" aria-selected="true" data-dl-tab="qris">QRIS</button>
          <button type="button" role="tab" aria-selected="false" data-dl-tab="bank">Transfer Bank</button>
        </div>

        <div class="dl-panel is-on" data-dl-panel="qris" role="tabpanel">
          <div class="dl-qr"><img src="${A('qris-code.png')}" alt="Kode QRIS resmi Cinta Foundation ID, NMID ID1025412604759"${dim('qris-code.png')} decoding="async"></div>
          <div>
            <div class="dl-merchant">Cinta Foundation ID</div>
            <div class="dl-nmid">NMID: ID1025412604759</div>
          </div>
          <a class="dl-btn dl-btn-primary" href="${A('qris-code.png')}" download="QRIS-Cinta-Foundation.png" data-ttq="Download" data-ttq-label="Simpan QRIS" data-toast="Gambar QRIS disimpan">⤓ Simpan gambar QRIS</a>
          <ol class="dl-steps">
            <li><span>1</span><div>Simpan gambar QRIS di atas.</div></li>
            <li><span>2</span><div>Buka m-banking atau e-wallet (GoPay, OVO, DANA, ShopeePay, dll), pilih <b>Scan / Bayar QRIS</b>, lalu ambil gambar dari galeri.</div></li>
            <li><span>3</span><div>Isi nominal, selesaikan pembayaran, dan simpan buktinya.</div></li>
          </ol>
        </div>

        <div class="dl-panel" data-dl-panel="bank" role="tabpanel">
          <div class="dl-bank">
            <div class="dl-kicker">Transfer Bank</div>
            <div class="dl-bank-name">Bank BJB</div>
            <div class="dl-rek">1122888820201</div>
            <div class="dl-an">a.n. <b>Yayasan Cinta Negeri Persada</b></div>
          </div>
          <button class="dl-btn dl-btn-ghost" type="button" data-copy="1122888820201" data-ttq="ClickButton" data-ttq-label="Salin rekening" data-toast="Nomor rekening disalin">Salin nomor rekening</button>
        </div>

        <div class="dl-confirm">
          <p>Sudah berdonasi? Kirim buktinya supaya bisa kami catat dan konfirmasi.</p>
          <a class="dl-btn dl-btn-primary" href="${esc(MAILTO_BUKTI)}" data-ttq="Contact" data-ttq-label="Email bukti">✉ Kirim bukti via email</a>
          <a class="dl-btn dl-btn-ghost" href="https://ig.me/m/cinta_foundation" target="_blank" rel="noopener noreferrer" data-ttq="Contact" data-ttq-label="DM Instagram">Kirim via DM Instagram</a>
          <p class="dl-note">Email tidak terbuka? Kirim ke <b>admin@cintafoundation.org</b> <button class="dl-linkish" type="button" data-copy="admin@cintafoundation.org" data-toast="Alamat email disalin">Salin</button></p>
        </div>
      </section>

      <section class="dl-block">
        <ul class="dl-promise">
          <li>Semua bantuan disalurkan dalam bentuk makanan siap saji/nasi kotak.</li>
          <li>Donasi kamu akan dikelola secara transparan dan dilaporkan secara berkala melalui kanal resmi Cinta Foundation. Follow Instagram: <a href="https://www.instagram.com/cinta_foundation/" target="_blank" rel="noopener noreferrer">@cinta_foundation</a></li>
        </ul>
      </section>

      <section class="dl-block">
        <div class="dl-kicker">Catatan terakhir</div>
        <ul class="dl-log">
          <li><span>28 Agustus 2026 · Mega Kuningan</span><b>13 porsi</b></li>
          <li><span>31 Juli 2026 · Mega Kuningan</span><b>13 paket</b></li>
          <li><span>17 Juli 2026 · Mega Kuningan</span><b>15 paket</b></li>
        </ul>
        <a class="dl-quiet" href="/laporan">Lihat laporan lengkap di Laporan Kegiatan →</a>
      </section>

      <section class="dl-block">
        <div class="dl-trust">
          <b>Yayasan Cinta Negeri Persada</b> (Cinta Foundation) — yayasan resmi terdaftar, SK Kemenkumham No. AHU-0006826.AH.01.04.Tahun 2024.<br>
          Pastikan kamu hanya berdonasi melalui QRIS <b>Cinta Foundation ID</b> atau rekening BJB <b>a.n. Yayasan Cinta Negeri Persada</b>.
        </div>
      </section>

    </main>

    <div class="dl-sticky" data-sticky><a class="dl-btn dl-btn-primary" href="#donasi">Donasi Jumat Berkah</a></div>
    <div class="dl-toast" data-toast-el role="status" aria-live="polite"></div>
`;
}
