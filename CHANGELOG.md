# Changelog

All notable changes to this project.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.3.0] — 2026-08-04

### Added — the contact form now actually delivers

Enquiries are emailed to **info@apexintelligence.in**. Previously the
route validated the payload and returned success without sending
anything, which meant a visitor could be told their message went through
when nobody had received it.

- **Two emails per submission.** A notification to `info@` with the
  enquirer's details and message, and an acknowledgement to the enquirer
  confirming it arrived. Both are HTML with a plain-text alternative,
  because plenty of business mail clients still render text only.
- **Reply-To is the enquirer**, so hitting reply in Gmail or Outlook goes
  straight to them. The From stays as the site mailbox — putting the
  visitor in From is exactly what SPF and DMARC reject.
- **Three transports**, first configured one wins: SMTP through the
  `info@` mailbox itself (recommended — no third party, no signup),
  Resend, or a webhook. Selection is by environment variable; no code
  change to switch.
- **Spam protection**: a honeypot field hidden from sight, screen readers
  and the tab order; a timing check that rejects anything submitted in
  under three seconds; and a five-per-ten-minutes rate limit per IP.
  Bots receive a fake success so they cannot learn what caught them.
- **`GET /api/contact`** reports which transport is live without
  exposing credentials.
- `.env.example` and `EMAIL_SETUP.md` — SMTP hosts and ports for the six
  common Indian providers, app-password instructions for Google and
  Microsoft, and the four errors most likely to come up.

### Changed

- Validation now requires a message of at least ten characters, and the
  error messages read as sentences rather than field names.
- `ContactForm` keeps a reference to the form element before awaiting;
  React nulls `currentTarget` across an await, so `form.reset()` on
  success had been running against nothing.

### Fixed

- **Email bodies had no charset declaration**, so mail clients read the
  UTF-8 bytes as Latin-1 and rendered `·` as `Â·` and `—` as `â€"`.
  Found by rendering the templates and looking at them.
- An unconfigured form now returns **503 with an honest message** telling
  the visitor to call instead. It previously returned 200 and claimed
  success.

### Verification

Sent real mail through a live disposable SMTP server: both messages were
accepted by the server (`{"ok":true,"acknowledged":true}`), and both were
rendered and inspected visually. Spam handling verified — honeypot and
sub-three-second submissions discarded, invalid payloads rejected with
422, sixth request in ten minutes returns 429. With no credentials the
endpoint reports `{"channel":"none","configured":false}` and refuses the
submission with 503. Build, ESLint and `tsc --noEmit` clean. Test
credentials and the temporary preview route were removed afterwards, and
`.env.local` is gitignored.

---

## [2.2.0] — 2026-08-04

### Added — every dropdown link is now a real page

The header dropdowns pointed at anchors on three shared pages, so eleven
of the fifteen menu items scrolled to a heading rather than opening
anything. All eleven now have their own page with full content.

- **Seven service pages** — `/services/web-development`,
  `/enterprise-apps`, `/erp-systems`, `/machine-learning`,
  `/data-analytics`, `/cloud-devops`, `/maintenance-amc`. Each carries an
  overview, an at-a-glance panel (timeline, starting price, what happens
  after launch), a scope checklist, a four-stage process, deliverables, a
  named technology stack, four FAQs and two related services —
  750–800 words apiece. Built as one `[slug]` route driven by
  `lib/services.ts`, prerendered at build time.
- **`/products/case-studies`** — six projects across retail, e-commerce,
  construction, manufacturing, hospitality and healthcare, each with the
  problem, the approach, the outcome, three measured results and the
  stack used.
- **`/products/tech-stack`** — six technology groups with the reasoning
  per choice, four selection principles, and what every handover includes.
- **`/insights/blog`** — nine article entries with dates, read times and
  tags, plus `Blog` structured data.
- **`/insights/faq`** — 24 questions in five groups (working together,
  scope and pricing, delivery, technical, support) with jump links and
  `FAQPage` structured data, which can surface directly in search results.

### Changed

- Navigation, the homepage service cards and the `/services` overview
  cards all link to the detail pages instead of anchors
- Sitemap grew from 7 to 18 entries; service routes are derived from
  `lib/services.ts` so a new service appears automatically
- `Service` JSON-LD added per service page

### Fixed

- The FAQ jump-link grid forced `repeat(5, 1fr)` via an inline style,
  which no media query could override — it overflowed a 320px screen by
  467px. Moved to a class so the breakpoints apply.
- Breadcrumbs are `<nav>` elements and were inheriting
  `justify-content: space-between` from the global nav rule, spreading
  the crumbs across the full page width.

### Verification

All 18 routes return 200; an unknown URL still 404s. Every one of the 15
dropdown links was followed and checked for real content — 13 return
500–1300 words with 6–20 headings and a working 3D scene; the two
exceptions are both `/contact`, which is a form rather than prose. The
six new page types pass the responsive audit at all eight viewports with
zero layout problems, and the three modified overview pages show no
regression. Build, ESLint and `tsc --noEmit` clean, console free of
errors.

---

## [2.1.0] — 2026-07-29

### Fixed — responsive layout

Audited all 7 routes across 8 viewports (320 / 390 / 430 / 768 / 1024 /
1440 / 1920 / 2560px) in headless Chrome, measuring real overflow rather
than eyeballing. Everything below was a measured failure.

- **Inner-page header overflowed on phones.** The `Contact Us` CTA pushed
  87px past a 320px viewport, giving every inner page a horizontal
  scrollbar. Hidden below 768px, matching the homepage; Contact stays
  reachable from the menu.
- **Tablet header was broken.** At 768px the desktop nav was still active,
  so the logo wrapped onto two lines, `// SYSTEMS STUDIO` wrapped, and the
  CTA broke across two lines. The hamburger now takes over at ≤1024px, and
  the JS breakpoints in both headers were moved to match.
- **Hamburger was a 24×16px tap target.** Now 44×44.
- **Homepage hero was 1324px tall on a 390px phone** — 1.6 viewports before
  any content. Now 960px, with a tighter headline clamp, smaller lead, and
  the two CTAs stacked at equal width.
- **TV/4K was a small island in the middle of the screen.** Containers now
  widen to 1560 / 1800 / 2100px at 1600 / 2000 / 2560px, and type scales
  with them — the homepage headline goes 89.6px → 117.8px at 2560px.
- **The `/process` comparison table overflowed** a 320px screen by 57px.
  It now scrolls inside its own container.
- Landscape phones no longer get a 100vh hero; touch devices get 44px
  targets and 16px form inputs (below that iOS zooms the page); print
  hides the canvas, overlays and animation.

### Added

- `styles/responsive.css` — every device adaptation in one file. All rules
  sit in media queries that exclude 1024–1599px, so the desktop rendering
  verified in 2.0.0 is provably untouched.

### Verification

56 page/viewport combinations, **0 layout problems**. Laptop (1440px)
measurements are identical to the 2.0.0 baseline. The mobile menu opens,
expands dropdowns and closes on both header variants at phone and tablet
widths, with no console errors.

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
