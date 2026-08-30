// Emits dist/ — plain static HTML. No framework, no client-side routing,
// nothing for the host to build. Run: node build/build.mjs [--domain=example.org]
import { mkdir, writeFile, copyFile, readFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { head, headers, footer, esc } from './chrome.mjs';
import * as pages from './pages.mjs';
import { REPORTS, FAQS } from './data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const arg = process.argv.find((a) => a.startsWith('--domain='));
const DOMAIN = (arg ? arg.slice('--domain='.length) : process.env.SITE_DOMAIN) || 'DOMAIN_PLACEHOLDER';

const BUILD_DATE = '2026-08-24';

const ld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>\n`;

const ngoSchema = () => ld({
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Cinta Foundation',
  legalName: 'Yayasan Cinta Negeri Persada',
  url: `https://${DOMAIN}`,
  logo: `https://${DOMAIN}/assets/logo-wine.png`,
  slogan: 'Karena Semua Manusia Layak Mendapatkan Cinta',
  description: 'Yayasan yang menerjemahkan cinta menjadi tindakan nyata melalui program Jumat Berkah, Barakah Bazaar, dan Titip Cinta.',
  identifier: 'SK Kemenkumham No. AHU-0006826.AH.01.04.Tahun 2024',
  address: { '@type': 'PostalAddress', addressCountry: 'ID' },
  email: 'admin@cintafoundation.org',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'admin@cintafoundation.org',
    contactType: 'customer support',
    availableLanguage: 'id'
  },
  sameAs: ['https://www.instagram.com/cinta_foundation/']
});

const faqSchema = () => ld({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
});

const articleSchema = (rep) => ld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: rep.heading || rep.title,
  description: rep.preview,
  datePublished: rep.date,
  dateModified: rep.date,
  inLanguage: 'id',
  image: `https://${DOMAIN}/assets/${rep.image}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `https://${DOMAIN}${rep.url}` },
  author: { '@type': 'NGO', name: 'Cinta Foundation' },
  publisher: {
    '@type': 'NGO',
    name: 'Cinta Foundation',
    logo: { '@type': 'ImageObject', url: `https://${DOMAIN}/assets/logo-wine.png` }
  }
});

// --------------------------------------------------------------- page list

const SITE = [
  {
    file: 'index.html', url: '/', nav: 'beranda',
    title: 'Cinta Foundation — Karena Semua Manusia Layak Mendapatkan Cinta',
    description: 'Yayasan Cinta Negeri Persada. Lima bahasa cinta yang kami terjemahkan menjadi program nyata: Jumat Berkah, Barakah Bazaar, dan Titip Cinta.',
    lastmod: BUILD_DATE, schema: ngoSchema, body: pages.beranda
  },
  {
    file: 'program/index.html', url: '/program', nav: 'program',
    title: 'Program & Inisiatif — Cinta Foundation',
    description: 'Lima pilar program Cinta Foundation, dari Jumat Berkah setiap pekan hingga Barakah Bazaar. Cara kami menerjemahkan cinta jadi tindakan.',
    lastmod: BUILD_DATE, body: pages.program
  },
  {
    file: 'laporan/index.html', url: '/laporan', nav: 'laporan',
    title: 'Laporan Kegiatan — Cinta Foundation',
    description: 'Dokumentasi terbuka setiap kegiatan Cinta Foundation. Setiap titipan tercatat, setiap penyaluran dilaporkan.',
    lastmod: BUILD_DATE, body: pages.laporan
  },
  {
    file: 'tentang-kami/index.html', url: '/tentang-kami', nav: 'tentang',
    title: 'Tentang Kami — Cinta Foundation',
    description: 'Yayasan Cinta Negeri Persada, terdaftar resmi di Kemenkumham. Visi, misi, legalitas, dan pertanyaan yang sering diajukan.',
    lastmod: BUILD_DATE, schema: faqSchema, body: pages.tentang
  },
  {
    file: 'titip-cinta/index.html', url: '/titip-cinta', nav: 'titip',
    title: 'Titip Cinta — Cara Menitipkan Donasi | Cinta Foundation',
    description: 'Cara menitipkan donasi ke Cinta Foundation melalui QRIS atau transfer bank BJB. Cinta yang dititipkan, akan selalu sampai.',
    lastmod: BUILD_DATE, body: pages.titip
  },
  ...REPORTS.filter((r) => r.url).map((rep) => ({
    file: `${rep.url.replace(/^\//, '')}/index.html`, url: rep.url, nav: 'laporan',
    title: rep.seoTitle || `${rep.heading || rep.title} — Laporan Kegiatan | Cinta Foundation`,
    description: rep.seoDescription || rep.preview,
    ogType: 'article',
    ogImage: rep.ogImage,
    lastmod: rep.date,
    schema: () => articleSchema(rep),
    body: () => pages.report(rep)
  }))
];

// -------------------------------------------------------------------- run

async function run() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  execFileSync('node', [path.join(ROOT, 'build/assets.mjs'), path.join(ROOT, 'src-assets'), path.join(DIST, 'assets')], { cwd: ROOT, stdio: 'inherit' });
  const manifest = JSON.parse(await readFile(path.join(ROOT, 'build/asset-manifest.json'), 'utf8'));
  pages.useManifest(manifest);

  await mkdir(path.join(DIST, 'css'), { recursive: true });
  await mkdir(path.join(DIST, 'js'), { recursive: true });
  await copyFile(path.join(ROOT, 'build/static/site.css'), path.join(DIST, 'css/site.css'));
  await copyFile(path.join(ROOT, 'build/static/site.js'), path.join(DIST, 'js/site.js'));

  const problems = [];

  for (const p of SITE) {
    const html =
      head({
        domain: DOMAIN, url: p.url, title: p.title, description: p.description,
        ogType: p.ogType || 'website', ogImage: p.ogImage, schema: p.schema ? p.schema() : ''
      }) +
      headers(p.nav) +
      p.body() +
      footer();

    const out = path.join(DIST, p.file);
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, html);

    // ---- checks that the brief calls out explicitly
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) problems.push(`${p.url}: ${h1} <h1> elements (expected exactly 1)`);
    if (html.includes('{{')) problems.push(`${p.url}: unresolved {{ }} template expression`);
    if (!html.includes('<html lang="id">')) problems.push(`${p.url}: missing lang="id"`);
    if (/noindex/i.test(html)) problems.push(`${p.url}: contains noindex`);
    if (html.includes('support.js') || html.includes('__bundler/template')) problems.push(`${p.url}: design runtime leaked into output`);
  }

  await writeFile(path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`);

  const urls = SITE.map((p) => `  <url>
    <loc>https://${DOMAIN}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`).join('\n');
  await writeFile(path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  // Netlify / Vercel / Cloudflare Pages serve /program/index.html at /program
  // out of the box; this only makes the redirect explicit for hosts that ask.
  await writeFile(path.join(DIST, '_headers'),
    `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/css/*\n  Cache-Control: public, max-age=604800\n/js/*\n  Cache-Control: public, max-age=604800\n`);

  console.log(`\n${SITE.length} pages -> dist/`);
  SITE.forEach((p) => console.log(`  ${p.url.padEnd(38)} ${p.file}`));
  if (DOMAIN === 'DOMAIN_PLACEHOLDER') {
    console.log('\n  ! domain not set — canonical/OG/sitemap carry DOMAIN_PLACEHOLDER');
    console.log('    fix with: node build/build.mjs --domain=example.org');
  }
  if (problems.length) {
    console.error('\nFAILED CHECKS:');
    problems.forEach((x) => console.error('  - ' + x));
    process.exit(1);
  }
  console.log('\nchecks passed: one <h1> per page, lang="id", no {{ }}, no noindex, no runtime');
}

run();
