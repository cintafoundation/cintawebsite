# Cinta Foundation — static site build

The Claude Design export rebuilt so that search engines and link-preview
crawlers can read it. Same design, same copy, eight real URLs.

`dist/` is the deliverable: plain HTML, CSS, one small JS file, and images.
No framework, no build step on the host.

---

## Deploy

```sh
npm install    # once — pulls sharp for the image pass
npm run build  # domain is pinned in package.json
```

Then upload `dist/` to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.
All four serve `dist/program/index.html` at `/program` with no configuration.
For Cloudflare Pages: build command empty, output directory `dist`.

**Domain: `www.cintafoundation.org`.** The site is served from the `www`
hostname on Cloudflare Pages. The apex `cintafoundation.org` still points at an
old Wix site and must never appear in a canonical, `og:url`, or sitemap entry —
Google would follow it there and never index this build.

`npm run build` pins `--domain=www.cintafoundation.org` so an accidental bare
build cannot fall back to placeholders. A bare `node build/build.mjs` still
emits `DOMAIN_PLACEHOLDER` and warns.

Two greps must both come back empty before deploy:

```sh
grep -rn "https://cintafoundation.org" dist/   # apex leaked into a URL
grep -rn DOMAIN_PLACEHOLDER dist/              # unresolved build
```

The plain-text email `admin@cintafoundation.org` and the footer's `cintafoundation.org`
wordmark are design copy, not URLs — they stay on the apex and are expected.

`./set-domain.sh <host>` only substitutes `DOMAIN_PLACEHOLDER`; it cannot
re-point a build whose domain is already resolved, and now exits non-zero
saying so rather than reporting a misleading success. **To change domains,
rebuild from source.**

> Links are root-absolute (`/program`). Deploy at a domain root or a custom
> domain — a GitHub Pages *project* path (`user.github.io/repo/`) would break them.

## Preview locally

```sh
node build/serve.mjs
```

`http://localhost:4321` — mimics how the static hosts resolve directory URLs,
and gzips text the way they do.

---

## What's here

```
build/            the generator (dev only — never deployed)
  build.mjs         assembles dist/, writes robots + sitemap, runs the checks
  data.mjs          every Indonesian string, lifted verbatim from the .dc.html
  chrome.mjs        <head>, both headers, mobile drawer, footer
  pages.mjs         the five page bodies + the report-detail renderer
  assets.mjs        image pipeline
  static/site.css   shared stylesheet, copied to dist/css/
  static/site.js    in-page interactions, copied to dist/js/
  static/og-cover.* social share card and the page it is rendered from
  serve.mjs         local preview
  serve-ref.mjs     serves source/ for side-by-side comparison with the original
src-assets/       image originals the pipeline reads
dist/             ← deploy this
```

Editing copy means editing `build/data.mjs` and rebuilding. Nothing in `dist/`
should be hand-edited; the next build overwrites it.

---

## Routing

The five in-page screens became five files; the three full reports became three
more. `support.js` is gone, and so is the `<script type="__bundler/template">`
wrapper that hid the markup from crawlers.

| URL | file |
|---|---|
| `/` | `index.html` |
| `/program` | `program/index.html` |
| `/laporan` | `laporan/index.html` |
| `/tentang-kami` | `tentang-kami/index.html` |
| `/titip-cinta` | `titip-cinta/index.html` |
| `/laporan/jumat-berkah-31-juli-2026` | + `index.html` |
| `/laporan/jumat-berkah-17-juli-2026` | + `index.html` |
| `/laporan/barakah-bazaar` | + `index.html` |

Every nav item, CTA, and report link is now an `<a href>`. Genuinely in-page
behaviour stayed in-page, in `build/static/site.js`: the mobile drawer, the
donation tabs, the account-number copy, the archive filter, and the six-step
Titip Cinta flow. The FAQ needs no JS at all — it is `<details>/<summary>`.

**Nothing is injected on click.** Collapsed tabs, the closed FAQ answers, the
five hidden Titip Cinta steps and the filtered-out archive entries are all in
the HTML source, hidden with CSS. `curl` any page and the full visible copy is
there without executing a line of JavaScript.

The desktop and mobile headers both ship on every page; the source switched
between them on a JS `isMobile` flag, and that is now a CSS media query at the
same 768px breakpoint.

---

## Checks the build runs

`node build/build.mjs` fails if any page has more than one `<h1>`, is missing
`lang="id"`, contains a `{{ }}` expression, contains `noindex`, or still
references the design runtime.

---

## Audit fixes applied

Against `CINTA_AUDIT_FIXES.md` (verdict: PASS, four pre-deploy fixes):

1. **Report `<title>` tags shortened** to 54–56 characters so they don't truncate
   in search results. `og:title` follows automatically. The on-page `<h1>`
   headlines are untouched — still the evocative versions from the design. Set
   per report via `seoTitle` in `build/data.mjs`.
2. **Report meta descriptions shortened** to 111–141 characters, via
   `seoDescription` in the same place. `og:description` follows.
3. **`sameAs` filled** with the Instagram profile, plus a `ContactPoint`, in the
   NGO schema on `/`.
4. **Pillar numerals recoloured on the light cards only.** The four on Blush went
   Heritage Gold `#C8A063` (1.97:1) to Gold text `#A0793F` (3.22:1). The fifth
   sits on Deep Wine, where Heritage Gold already measures 5.01:1 and `#A0793F`
   would drop it to 3.06:1 — so that one kept Heritage Gold.

   3.22:1 is a deliberate tradeoff, not an oversight: full WCAG AA (4.5:1) at
   this size would need Deep Wine, which changes the look. Lighthouse still
   reports the contrast audit as failing for that reason.
