# Cinta Foundation — Website Export

Exported 24 August 2026. This package contains the complete, current version of the site.

---

## What's in here

```
export/
├── index.html          ← standalone site, single file, ready to host
├── README.md           ← this file
└── source/
    ├── Cinta Foundation Website v2.dc.html   ← editable source
    ├── support.js                            ← runtime required by the source file
    └── assets/                               ← all 17 images (logos, QRIS, photos)
```

### index.html — the deployable file

One self-contained file, 5.0 MB, with every image embedded. Open it directly in a browser or upload it to any host. Nothing else needs to travel with it.

### source/ — the editable version

Use this to make changes. `Cinta Foundation Website v2.dc.html`, `support.js`, and `assets/` must stay in the same folder together. After editing, the standalone `index.html` needs to be regenerated from the source.

---

## Pages

Five pages, switched in-page (no separate files):

- **Beranda** — hero, program summary, donation block with tabs (QRIS / Transfer Bank / Panduan)
- **Program** — Jumat Berkah, Barakah Bazaar, Titip Cinta with the three-step flow
- **Laporan Kegiatan** — filterable archive; three entries have full articles (31 Juli 2026, 17 Juli 2026, Barakah Bazaar), one is pending documentation
- **Tentang Kami**
- **Titip Cinta** — six-step donation flow

---

## Fonts

Two Google Fonts, loaded over the network:

| Role | Font | Weights |
|---|---|---|
| Headings, quotes, numerals | **Lora** (serif) | 400, 500, 600, 700 + italics |
| Body, UI, labels | **Poppins** (sans-serif) | 300, 400, 500, 600 |

Stylesheet URL used in both files:

```
https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Poppins:wght@300;400;500;600&display=swap
```

Both are free under the SIL Open Font License and need no account. The site falls back to system serif/sans if offline. If you need the fonts embedded in the file for fully offline use, the `.woff2` files can be downloaded from fonts.google.com and wired in as `@font-face` — ask and I'll do it.

---

## Colours

| Use | Hex |
|---|---|
| Page background (cream) | `#F7F3EC` |
| Primary wine | `#7B2F4D` |
| Deep wine (headings, dark panels) | `#5E1F39` |
| Soft pink (cards, quote blocks) | `#F3E4E8` |
| Gold accent (eyebrows, rules) | `#C8A063` |
| Gold text | `#A0793F` |
| Body text | `#2A1820` |
| Muted text (captions, meta) | `#74656A` |

---

## Assets

| File | Used for |
|---|---|
| `logo-wine.png` | Header logo, pending-photo placeholder |
| `logo-cream.png` | Footer logo |
| `qris-code.png` | QRIS shown on Beranda and Titip Cinta |
| `qris-cinta-foundation.png` | Downloadable QRIS sheet |
| `jumat-berkah-1.png`, `jumat-berkah-2.png` | Beranda and Program hero imagery |
| `jb-hero.jpg`, `jb-2.jpg`, `jb-3.jpg` | Jumat Berkah 17 Juli 2026 report |
| `jb31-hero.jpg`, `jb31-prep.jpg`, `jb31-clean.jpg`, `jb31-ojol.jpg` | Jumat Berkah 31 Juli 2026 report |
| `bb-hero.jpg`, `bb-week1.jpg`, `bb-week2.jpg`, `bb-week3.jpg` | Barakah Bazaar report |

---

## Hosting

**Any static host** — upload `index.html`. Netlify, Vercel, Cloudflare Pages, and GitHub Pages all work and are free at this scale.

**Inside the existing Wix site** — Wix cannot serve an HTML file as a page. Host `index.html` on one of the above, then add a Wix page with an Embed → HTML iframe pointing at that URL. Note that iframe content is not indexed as part of the Wix site, and the iframe height must be set manually.

---

## Known items

- **Barakah Bazaar, pekan pertama** carries an internal review note about an unconfirmed file date. Remove it before publication if the date is settled.
- **Jumat Berkah 14 Agustus 2026** shows the logo placeholder; supply photos and the article copy to complete it.
- The **QRIS download link** points at `qris-cinta-foundation.png`. Confirm that file is the sheet you want distributed.
