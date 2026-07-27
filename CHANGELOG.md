# Changelog

All notable changes to this project.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-07-28

Migration from a static HTML site to Next.js 14. **The rendered site is
visually unchanged** — this release is architecture, performance and
maintainability only.

### Added

- Next.js 14 App Router application in TypeScript (strict mode)
- Route groups: `(home)` and `(site)`, each owning its own shell
- `/api/contact` — validating enquiry endpoint with a pluggable delivery seam
- Six reusable hooks (`useTheme`, `useReveal`, `useTilt`, `useMagnetic`,
  `useScrollProgress`, `useMediaQuery`)
- 17 components replacing duplicated markup
- `lib/site.ts` — single source of truth for contact details and navigation
- SEO: per-route metadata, OpenGraph and Twitter cards, canonical URLs,
  generated `sitemap.xml` and `robots.txt`, `ProfessionalService` and
  `WebSite` JSON-LD, OG image
- Accessibility: skip links, landmarks, `aria-expanded`/`aria-controls` on
  disclosures, `aria-current` on the active nav item, labelled form
  controls, live regions for form results
- Security headers in `next.config.mjs`
- `DEPLOYMENT.md`, `PROJECT_STRUCTURE.md`, `CHANGELOG.md`

### Changed

- three.js moved from a vendored 670 kB file to the `three` npm package,
  loaded through a `dynamic(ssr: false)` boundary — it no longer sits in the
  shared bundle
- Google Fonts moved from a render-blocking CDN `<link>` to self-hosted
  `next/font`
- All remote images now use `next/image` (AVIF/WebP, lazy by default)
- Stylesheets split by scope: `base.css`, `globals.css`, `pages.css`,
  `home.css`, `3d.css`
- The homepage's stylesheet is scoped under `body.home` and no longer loads
  the shared component styles — see *Fixed* below
- Service cards, FAQ entries and navigation became data rather than repeated
  markup
- `package.json` trimmed from 8 runtime dependencies to 4; `framer-motion`,
  `react-icons`, `tailwindcss`, `autoprefixer` and `postcss` removed as unused

### Fixed

- **Homepage style collisions.** The original `index.html` never linked
  `shared.css`. Loading both in the migrated build silently changed the
  homepage in 19 places — `.logo` gained a `gap`, `.about-grid` a
  `margin-top`, `.footer-socials` a `margin-top` — because `globals.css`
  set properties `home.css` never declared and so could not override.
  Resolved by scoping `home.css` under `body.home` and not loading
  `globals.css` on `/`.
- **Stretched images.** `next/image` emits `width`/`height` attributes; with
  a constrained width and no `height: auto` the attribute height won and
  distorted the figure. Added the rule to `base.css`.
- **Underlined buttons.** Hero and CTA actions became `<Link>` elements, so
  they inherited the anchor underline and the 1.65 body line-height. Reset
  to match the `<button>` markup they replaced.
- **Card tilt lift.** `Number(null)` is `0`, not `NaN`, so the default 18px
  `translateZ` silently collapsed on every card without an explicit
  `data-tilt-lift`. Now uses `parseFloat`.
- The floating WhatsApp button is now styled on the homepage. It previously
  rendered unstyled there, because `index.html` did not load the stylesheet
  that defines it.

### Removed

- Eight static HTML files, `shared.css`, `shared.js`, `apex-3d.css`,
  `apex-3d.js`, `apex-ui.js`, `vendor/three.module.min.js`
- Unused `#toast` element and its `showToast` helper from the homepage
- Duplicate CSS blocks left over from the 1.x design (two conflicting
  definitions each of `.hero h1`, `.primary-btn`, `.secondary-btn` and
  `.hero-stats-bar`)
- Tailwind and PostCSS configuration — no Tailwind directives were in use

### Verification

Migrated and original sites were rendered side by side in headless Chrome at
1440×900, in both themes. Six of seven pages match to **0–5px** of document
height; the homepage differs by 27px, accounted for by the removed dead
`#toast` element. Colours, fonts, headings, card counts and header
backgrounds match exactly. Build, ESLint and `tsc --noEmit` are clean, and
the browser console is free of errors on every route.

---

## [1.1.0] — 2026-07-27

### Added

- WebGL depth layer across the site: `core` scene on the homepage hero,
  `lattice` scene on inner heroes
- Pointer-tracked card tilt, perspective scroll reveals, depth shadows
- Floating WhatsApp button on every page

### Changed

- Unified the theme system. The homepage used `body.whiteprint` with the
  `apexPrintMode` key while every other page used `body.dark-mode` with
  `darkMode`, so the choice was lost on navigation. Consolidated on one
  class and one key (`apexTheme`), migrating both legacy keys.
- Contact details updated to `+91 91453 10264` / `info@apexintelligence.in`

### Fixed

- Removed duplicate and dead CSS from `index.html`

---

## [1.0.0] — 2026-07-27

Initial static site: eight HTML pages, `shared.css`, `shared.js`.
