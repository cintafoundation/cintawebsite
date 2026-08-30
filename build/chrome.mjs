// Shared page shell: <head>, the two headers, the mobile drawer, the footer.
// Markup is copied from the design source; only the routing changed.
import { NAV_ITEMS, MOBILE_NAV_ITEMS, FOOTER_LINKS } from './data.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NAV_BASE = "font-family: 'Poppins', sans-serif; font-size: 13.5px; cursor: pointer; letter-spacing: 0.02em; padding: 9px 16px; border-radius: 999px; border: 0; transition: all 0.2s ease; text-decoration: none; text-align: center;";
const NAV_ON = 'color: #5E1F39; font-weight: 500; background: rgba(243,228,232,0.95);';
const NAV_OFF = 'color: #7B2F4D; font-weight: 400; background: transparent;';

const MOB_BASE = "display: block; width: 100%; text-align: left; background: none; border: 0; padding: 14px 0; font-family: 'Lora', serif; font-size: 27px; line-height: 1.25; letter-spacing: -0.01em; cursor: pointer; min-height: 52px; text-decoration: none;";
const MOB_ON = 'color: #7B2F4D; font-weight: 600;';
const MOB_OFF = 'color: #2A1820; font-weight: 400;';

const FOOTER_LINK = "font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; color: #F3E4E8; cursor: pointer; background: none; border: 0; padding: 2px 0; text-align: left; text-decoration: none;";

export function head({ domain, url, title, description, ogType = 'website', ogImage, schema = '' }) {
  ogImage = ogImage || 'og-cover.jpg';
  const abs = `https://${domain}${url}`;
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(abs)}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="id_ID">
<meta property="og:site_name" content="Cinta Foundation">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(abs)}">
<meta property="og:image" content="https://${domain}/assets/${ogImage}">
${ogImage === 'og-cover.jpg' ? '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' : ''}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&amp;family=Poppins:wght@300;400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css">
${schema}</head>
<body>

<div style="min-height: 100vh; background: #F7F3EC; display: flex; flex-direction: column; overflow-x: clip;">
`;
}

export function headers(active) {
  const navLinks = NAV_ITEMS.map((n) => {
    const on = n.key === active;
    return `<a class="as-btn hv-nav" href="${n.href}"${on ? ' aria-current="page"' : ''} style="${NAV_BASE} ${on ? NAV_ON : NAV_OFF}">${esc(n.label)}</a>`;
  }).join('\n            ');

  const mobLinks = MOBILE_NAV_ITEMS.map((n) => {
    const on = n.key === active;
    return `<a href="${n.href}"${on ? ' aria-current="page"' : ''} style="${MOB_BASE} ${on ? MOB_ON : MOB_OFF}">${esc(n.label)}</a>`;
  }).join('\n          ');

  return `
  <!-- ============ FLOATING NAV (desktop) ============ -->
  <header class="hdr-desktop" style="position: sticky; top: 14px; z-index: 50; padding: 0 20px;">
    <div style="max-width: 1160px; margin: 0 auto; background: rgba(247,243,236,0.9); backdrop-filter: blur(14px); border: 1px solid rgba(200,160,99,0.35); border-radius: 999px; box-shadow: 0 12px 36px -18px rgba(94,31,57,0.35); padding: 10px 12px 10px 22px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
      <a href="/" aria-label="Cinta Foundation — ke Beranda" style="display: flex; align-items: center; gap: 11px; cursor: pointer; margin-right: auto; background: none; border: 0; padding: 2px; text-decoration: none;">
        <img src="/assets/logo-wine.png" alt="" width="442" height="384" decoding="async" style="height: 34px; width: auto; display: block;">
        <span style="font-family: 'Lora', serif; font-weight: 600; font-size: 18px; color: #7B2F4D; letter-spacing: 0.01em;">Cinta Foundation</span>
      </a>
      <nav aria-label="Navigasi utama" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
        ${navLinks}
        <a class="as-btn hv-deep" href="/titip-cinta" style="font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 500; color: #F7F3EC; background: #7B2F4D; border: 0; padding: 12px 24px; border-radius: 999px; cursor: pointer; letter-spacing: 0.02em; margin-left: 8px; transition: background 0.2s ease; text-decoration: none; text-align: center;">Titip Cinta</a>
      </nav>
    </div>
  </header>

  <!-- ============ MOBILE HEADER ============ -->
  <header class="hdr-mobile" style="position: sticky; top: 0; z-index: 60; background: #F7F3EC; border-bottom: 1px solid rgba(200,160,99,0.35); height: 68px; display: flex; align-items: center;">
    <div style="width: 100%; padding: 0 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <a href="/" aria-label="Cinta Foundation — ke Beranda" style="display: flex; align-items: center; gap: 9px; background: none; border: 0; padding: 4px 2px; cursor: pointer; font: inherit; min-height: 44px; text-decoration: none;">
        <img src="/assets/logo-wine.png" alt="" width="442" height="384" decoding="async" style="height: 28px; width: auto; display: block;">
        <span style="font-family: 'Lora', serif; font-weight: 600; font-size: 16.5px; color: #7B2F4D; letter-spacing: 0.01em; white-space: nowrap;">Cinta Foundation</span>
      </a>
      <button type="button" data-menu-open aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="mobile-menu" style="display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 44px; align-items: flex-end; background: none; border: 0; padding: 0 2px; cursor: pointer; flex-shrink: 0;">
        <span style="display: block; width: 22px; height: 1.5px; background: #2A1820;"></span>
        <span style="display: block; width: 22px; height: 1.5px; background: #2A1820;"></span>
      </button>
    </div>
  </header>

  <!-- ============ MOBILE MENU DRAWER ============ -->
  <div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu navigasi" style="position: fixed; inset: 0; z-index: 100; background: #F7F3EC; flex-direction: column; animation: drawerIn 0.24s ease both;">
    <div style="height: 68px; flex-shrink: 0; padding: 0 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(200,160,99,0.35);">
      <span style="font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: #A0793F;">Cinta Foundation</span>
      <button type="button" data-menu-close aria-label="Tutup menu" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: none; border: 0; cursor: pointer; font-size: 22px; line-height: 1; color: #2A1820; margin-right: -8px;">✕</button>
    </div>
    <nav aria-label="Navigasi utama" style="flex: 1; overflow-y: auto; padding: 40px 24px 32px; display: flex; flex-direction: column;">
      ${mobLinks}
      <div style="height: 1px; background: rgba(200,160,99,0.4); margin: 32px 0 28px;"></div>
      <a href="/titip-cinta" style="width: 100%; background: #7B2F4D; color: #F7F3EC; border: 0; border-radius: 10px; padding: 18px 20px; font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500; letter-spacing: 0.03em; cursor: pointer; min-height: 56px; text-decoration: none; text-align: center; display: block;">Titip Cinta</a>
      <a href="https://instagram.com/cinta_foundation" target="_blank" rel="noopener noreferrer" style="margin-top: 28px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 300; letter-spacing: 0.06em; color: #7B2F4D; text-decoration: none; padding: 10px 0; min-height: 44px; display: flex; align-items: center;">Instagram</a>
    </nav>
  </div>
`;
}

export function footer() {
  const links = FOOTER_LINKS
    .map((l) => `<a class="hv-rose" href="${l.href}" style="${FOOTER_LINK}">${esc(l.label)}</a>`)
    .join('\n              ');

  return `
  <!-- ============ FOOTER ============ -->
  <footer style="padding: clamp(40px, 5vw, 64px) 20px 20px;">
    <div style="max-width: 1240px; margin: 0 auto; background: #5E1F39; border-radius: 36px; padding: clamp(56px, 7vw, 84px) clamp(32px, 5vw, 72px) 40px; position: relative; overflow: clip;">
      <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(40% 50% at 90% 0%, rgba(200,160,99,0.12) 0%, rgba(200,160,99,0) 100%);"></div>
      <div style="position: relative; display: flex; flex-direction: column; gap: 44px;">
        <div style="display: flex; flex-wrap: wrap; gap: 44px; justify-content: space-between; align-items: flex-start;">
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 340px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="/assets/logo-cream.png" alt="Cinta Foundation" width="442" height="384" loading="lazy" decoding="async" style="height: 38px; width: auto; display: block;">
              <span style="font-family: 'Lora', serif; font-weight: 600; font-size: 18px; color: #F7F3EC;">Cinta Foundation</span>
            </div>
            <div style="font-family: 'Lora', serif; font-style: italic; font-size: 16px; color: #C97D90; line-height: 1.5;">Karena Semua Manusia Layak Mendapatkan Cinta</div>
          </div>
          <nav aria-label="Navigasi footer" style="display: flex; gap: clamp(28px, 4vw, 56px); flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #C8A063;">Jelajahi</div>
              ${links}
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
              <div style="font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #C8A063;">Terlibat</div>
              <a class="hv-rose" href="/titip-cinta" style="${FOOTER_LINK}">Titip Cinta</a>
              <a class="hv-rose" href="https://instagram.com/cinta_foundation" target="_blank" rel="noopener noreferrer" style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; color: #F3E4E8; text-decoration: none; padding: 2px 0;">Instagram</a>
              <a class="hv-rose" href="mailto:admin@cintafoundation.org" style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 14px; color: #F3E4E8; text-decoration: none; padding: 2px 0;">Hubungi Kami</a>
            </div>
          </nav>
        </div>
        <div style="border-top: 1px solid rgba(200,160,99,0.3); padding-top: 28px; display: flex; flex-direction: column; gap: 10px; align-items: center; text-align: center;">
          <div style="font-family: 'Lora', serif; font-style: italic; font-size: 15px; color: #F3E4E8;">Tak Perlu Banyak Untuk Berbagi.</div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 14px; font-weight: 300; font-size: 13px; color: #C8A063;"><span>cintafoundation.org</span><span>·</span><a href="https://instagram.com/cinta_foundation" target="_blank" rel="noopener noreferrer" style="color: #C8A063; text-decoration: none;">@cinta_foundation</a><span>·</span><a href="mailto:admin@cintafoundation.org" style="color: #C8A063; text-decoration: none;">admin@cintafoundation.org</a></div>
          <div style="font-weight: 300; font-size: 12.5px; color: #C97D90;">© 2026 Yayasan Cinta Negeri Persada (Cinta Foundation)</div>
        </div>
      </div>
    </div>
  </footer>

</div>

<script src="/js/site.js" defer></script>
</body>
</html>
`;
}
