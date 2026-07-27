# Website guide

A page-by-page map of what is on the site and which file produces it.

---

## `/` — Home

**File:** `app/(home)/page.tsx` · **Styles:** `styles/home.css` (scoped to `body.home`)

| Section          | Contents                                                      |
| ---------------- | ------------------------------------------------------------- |
| Info strip       | Location, phone, email — from `lib/site.ts`                   |
| Header           | Two-line logo, four dropdowns, theme toggle, CTA              |
| Hero             | `core` WebGL scene, badge, headline, two CTAs, six service pills |
| Stats bar        | Four counters that roll up on scroll (`data-count`)           |
| Trust marquee    | Scrolling industry list                                       |
| About            | Figure image + "What we do" list                              |
| Services         | Three cards, expanding to six (`ServicesGrid`)                |
| Testimonials     | Three client quotes                                           |
| CTA band         | Rotating stamp + contact button                               |
| Footer           | Four columns: brand, services, company, contact               |

Unique to this page: the intro loader, the scroll progress bar, and the
"sheet" dividers (`Sheet 02 — Company`) from the blueprint design language.

---

## `/about` — About Us

**File:** `app/(site)/about/page.tsx`

Hero with the `lattice` scene · founding story · team photo · six value
cards (tilt-enabled) · closing CTA.

---

## `/services` — Services

**File:** `app/(site)/services/page.tsx`

Seven detailed service cards, each with an anchor id so the header dropdown
can deep-link:

| Anchor         | Service              |
| -------------- | -------------------- |
| `#web`         | Web Development      |
| `#apps`        | Enterprise Apps      |
| `#erp`         | ERP Systems          |
| `#ml`          | Machine Learning     |
| `#analytics`   | Data Analytics & BI  |
| `#cloud`       | Cloud & DevOps       |
| `#maintenance` | Maintenance & AMC    |

---

## `/products` — Our Work

**File:** `app/(site)/products/page.tsx`

- `#portfolio` — six case-study cards with images
- `#tech` — the technology stack, grouped by category

---

## `/process` — How We Work

**File:** `app/(site)/process/page.tsx`

Three guarantee cards (14-day demo, fixed quote, 30-day hypercare) followed
by a four-step timeline: Discovery → Design → Build → Launch. Each step
lists its deliverables.

---

## `/insights` — Insights

**File:** `app/(site)/insights/page.tsx` · **Data:** `lib/content.ts`

- `#blog` — three article cards
- `#faq` — five-question accordion (`FaqAccordion`, single-open, keyboard
  operable)

---

## `/contact` — Contact

**File:** `app/(site)/contact/page.tsx` · **Form:** `components/sections/ContactForm.tsx`

Four contact cards (phone, WhatsApp, email, address) beside the enquiry
form. The form posts to `/api/contact`; see [DEPLOYMENT.md](DEPLOYMENT.md)
for wiring up delivery.

---

## 404

**File:** `app/not-found.tsx`

Large `404`, explanation, and two escape routes. Carries the `lattice`
scene and its own header/footer, since it renders outside the `(site)`
group. Marked `noindex`.

---

## Cross-cutting elements

| Element               | Component                              | Appears on |
| --------------------- | -------------------------------------- | ---------- |
| WhatsApp float button | `components/ui/WhatsAppButton.tsx`     | every page |
| Back-to-top           | `ScrollTopButton` / `HomeChrome`       | every page |
| Theme toggle          | `components/ui/ThemeToggle.tsx`        | every page |
| Skip-to-content link  | `(site)/layout.tsx`, `(home)/page.tsx` | every page |

---

## Behaviour

**Scroll reveals** — elements with `.reveal` or `.reveal-3d` fade and lift
into place via one IntersectionObserver per page. Add `.d1`–`.d6` to
stagger a grid.

**Counters** — any element with `data-count="120"` and optional
`data-suffix="+"` rolls up when scrolled into view.

**Card tilt** — `data-tilt` on a card tracks the pointer in 3D with a
specular sweep. Disabled on touch devices and under reduced motion.

**Theme** — one `dark-mode` class on `<body>`, applied before first paint,
persisted in `localStorage` under `apexTheme`, and broadcast to the WebGL
scenes so they repaint their palettes.

**Navigation** — dropdowns open on hover on desktop and on tap below 768px
(760px on the homepage). Escape closes the mobile menu; it also closes on
outside click and on route change.

---

## Accessibility

- Skip link on every page, visible on focus
- Semantic landmarks: `<header>`, `<nav aria-label="Main">`, `<main>`, `<footer>`
- Hamburger and dropdowns expose `aria-expanded` / `aria-controls`
- Active nav item carries `aria-current="page"`
- FAQ questions are real buttons with `aria-expanded` and labelled panels
- Form controls have associated `<label>`s and `autoComplete` hints
- Submission results are announced via `role="status"` and `role="alert"`
- Decorative icons are `aria-hidden`; canvases are `aria-hidden`
- All animation respects `prefers-reduced-motion`
