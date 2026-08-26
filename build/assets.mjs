// Asset pipeline: optimise the 17 source assets into dist/assets.
// PNG is kept only where transparency / scan fidelity matters (logos, QRIS).
// The two large photographic PNGs become WebP with a JPEG fallback.
import sharp from 'sharp';
import { mkdir, readdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve(process.argv[2] ?? 'src-assets');
const OUT = path.resolve(process.argv[3] ?? 'dist/assets');

// Cap the longest edge. Nothing in this design displays wider than ~940px, so
// 1440 still leaves headroom for high-DPR screens while cutting the tall
// portrait photos that were shipping ~4x the pixels they render.
const MAX_EDGE = 1440;

// Photographic PNGs -> webp + jpeg fallback (no transparency needed).
const PHOTO_PNGS = new Set(['jumat-berkah-1.png', 'jumat-berkah-2.png']);
// Keep as PNG for transparency.
const KEEP_PNG = new Set(['logo-cream.png', 'logo-wine.png']);
// QRIS codes: recompressed losslessly only — never quantised, resized, or
// re-encoded lossily, so the scanned payload stays bit-for-bit the original.
const QRIS = new Set(['qris-code.png', 'qris-cinta-foundation.png']);

const manifest = {};

async function record(name, file) {
  const meta = await sharp(file).metadata();
  const { size } = await stat(file);
  manifest[name] = { w: meta.width, h: meta.height, bytes: size };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

  for (const f of files) {
    const from = path.join(SRC, f);
    const img = sharp(from, { unlimited: true });
    const meta = await img.metadata();
    const longest = Math.max(meta.width, meta.height);
    const resize = longest > MAX_EDGE
      ? (meta.width >= meta.height
          ? { width: MAX_EDGE, withoutEnlargement: true }
          : { height: MAX_EDGE, withoutEnlargement: true })
      : null;

    if (/\.jpe?g$/i.test(f)) {
      const to = path.join(OUT, f);
      let p = sharp(from);
      if (resize) p = p.resize(resize);
      await p.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(to);
      await record(f, to);
      continue;
    }

    if (PHOTO_PNGS.has(f)) {
      const base = f.replace(/\.png$/i, '');
      const webp = path.join(OUT, `${base}.webp`);
      const jpg = path.join(OUT, `${base}.jpg`);
      let a = sharp(from);
      let b = sharp(from);
      if (resize) { a = a.resize(resize); b = b.resize(resize); }
      await a.flatten({ background: '#F7F3EC' }).webp({ quality: 80 }).toFile(webp);
      await b.flatten({ background: '#F7F3EC' }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(jpg);
      await record(`${base}.webp`, webp);
      await record(`${base}.jpg`, jpg);
      continue;
    }

    if (QRIS.has(f)) {
      const to = path.join(OUT, f);
      await sharp(from).png({ compressionLevel: 9, effort: 10, palette: false }).toFile(to);
      await record(f, to);
      continue;
    }

    if (KEEP_PNG.has(f)) {
      const to = path.join(OUT, f);
      await sharp(from).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile(to);
      await record(f, to);
      continue;
    }

    throw new Error(`Unclassified asset: ${f}`);
  }

  // Social share card. Regenerate after editing build/static/og-cover.html:
  //   cp build/static/og-cover.html dist/_og.html
  //   node build/serve.mjs &   (then)
  //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  //     --window-size=1200,630 --force-device-scale-factor=1 --virtual-time-budget=6000 \
  //     --screenshot=build/static/og-cover.png http://localhost:4321/_og.html
  const og = path.join(OUT, 'og-cover.jpg');
  await sharp(path.resolve('build/static/og-cover.png'))
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(og);
  await record('og-cover.jpg', og);

  // Favicon derived from the wine logo.
  const fav = path.join(OUT, 'favicon.png');
  await sharp(path.join(SRC, 'logo-wine.png'))
    .resize({ width: 180, height: 180, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(fav);
  await record('favicon.png', fav);

  await writeFile(path.resolve('build/asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  const total = Object.values(manifest).reduce((n, m) => n + m.bytes, 0);
  console.log(`${Object.keys(manifest).length} assets, ${(total / 1024 / 1024).toFixed(2)} MB total`);
}

run();
