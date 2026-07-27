# Migration completion report

**Project:** Apex Intelligence marketing site
**Migration:** static HTML → Next.js 14 (App Router) + TypeScript
**Date:** 28 July 2026
**Status:** complete, builds clean, ready to deploy

---

## Objective

Convert the existing site to a production-ready Next.js 14 application that
deploys to Vercel with zero configuration, **without changing how the site
looks**. This was a migration and optimisation exercise, not a redesign.

---

## Result

| Check                          | Status                                            |
| ------------------------------ | ------------------------------------------------- |
| Visual parity                  | ✅ 6 of 7 pages within 0–5px; home within 27px    |
| Both themes                    | ✅ light and dark verified separately             |
| `npm run build`                | ✅ compiles, 12 routes generated                  |
| `npm run lint`                 | ✅ no warnings or errors                          |
| `npm run typecheck`            | ✅ clean (strict mode)                            |
| Console errors                 | ✅ none on any route                              |
| 3D scenes                      | ✅ mount and render on all 8 pages                |
| Navigation                     | ✅ client-side, theme and scoping survive it      |
| Contact API                    | ✅ 422 on invalid, 200 on valid                   |
| Vercel-ready                   | ✅ no config files needed                         |

---

## Verification method

Rather than eyeballing screenshots, the original site and the migrated build
were served simultaneously (`:5500` and `:3000`) and driven through the
Chrome DevTools Protocol in headless Chrome at 1440×900, in both themes.

For each page pair the harness compared: `h1` text, theme class, canvas
count and ready state, tilt-element count, card count, heading count,
computed body background, body colour, header background, and total document
height — then captured matched screenshots.

**Final measurements (light theme, document height in px):**

| Page      | Original | Migrated | Δ  |
| --------- | -------- | -------- | -- |
| Home      | 4739     | 4712     | 27 |
| About     | 4204     | 4204     | 0  |
| Services  | 3600     | 3605     | 5  |
| Products  | 2282     | 2282     | 0  |
| Insights  | 2275     | 2275     | 0  |
| Process   | 3982     | 3982     | 0  |
| Contact   | 1576     | 1576     | 0  |

Dark theme matched the same way. Section-level measurement on the homepage
confirmed hero, trust, about, services, testimonials, CTA and footer are
each **identical to the pixel**.

The homepage's 27px is the removed `#toast` element — dead markup driven by
a `showToast()` function that was never called.

---

## Four bugs the migration surfaced

These were found by measurement, not assumption, and each is fixed.

**1. Homepage style collisions — the significant one.**
The original `index.html` was self-contained; it never linked `shared.css`.
Once both stylesheets loaded together, 19 selectors collided and silently
changed the homepage: `.logo` gained `gap: 0.5rem`, `.about-grid` gained
`margin-top: 2rem`, `.footer-socials` gained `margin-top: 1.5rem`. These
could not be overridden by import order, because `globals.css` was setting
properties `home.css` never declared. Fixed by splitting the shared
stylesheet into `base.css` (universal) and `globals.css` (components, loaded
only by the `(site)` group), and scoping `home.css` under `body.home`.

**2. Stretched images.** `next/image` emits `width`/`height` attributes.
With `max-width: 100%` and no `height: auto`, the attribute height wins and
distorts the image — the about figure rendered 489×549 instead of 474×304.

**3. Underlined buttons.** Hero and CTA actions became `<Link>` elements
because they navigate. Anchors inherit the body underline and the 1.65
line-height that buttons do not, making them 56px tall instead of 51px.

**4. Collapsed card tilt.** In the ported `useTilt` hook,
`Number(getAttribute(...))` returns `0` for a missing attribute, not `NaN` —
so the `Number.isNaN` guard never fired and the default 18px `translateZ`
silently became 0 on every card. Switched to `parseFloat`.

---

## Files

### Created (46)

```
app/               13   layout, 8 pages, 404, api route, sitemap, robots
components/        17   home (5), layout (4), sections (2), three (3), ui (3)
hooks/              6   theme, reveal, tilt, magnetic, scroll, media query
lib/                2   site config, FAQ content
styles/             5   base, globals, pages, home, 3d
types/              1   shared types
public/             2   icon, OG image
config/             4   next.config.mjs, tsconfig.json, .eslintrc.json, .gitignore
docs/               8   README + 7 guides
```

### Removed (14)

Eight HTML pages · `shared.css` · `shared.js` · `apex-3d.css` ·
`apex-3d.js` · `apex-ui.js` · `vendor/three.module.min.js` ·
`tailwind.config.js` · `postcss.config.js` · `setup.sh`

### Rewritten

`package.json` — runtime dependencies cut from 8 to 4. Removed
`framer-motion`, `react-icons`, `tailwindcss`, `autoprefixer`, `postcss`;
none were used. No Tailwind directive existed anywhere in the CSS.

---

## Performance

| Change                | Before                          | After                                       |
| --------------------- | ------------------------------- | ------------------------------------------- |
| three.js              | 670 kB vendored, parser-blocking | npm package, `dynamic(ssr:false)`, off the shared bundle |
| Fonts                 | Render-blocking Google CDN      | Self-hosted via `next/font`, no layout shift |
| Images                | Raw `<img>`, full-size          | `next/image`, AVIF/WebP, lazy, sized        |
| Rendering             | Static files                    | Prerendered at build, CDN-served            |
| Page JS               | 3 scripts on every page         | 87.3 kB shared; pages add 194 B – 5.8 kB    |
| Duplicate CSS         | 4 conflicting rule pairs        | Removed                                     |

Build output: **11 static routes, 1 dynamic**. Shared first-load JS
**87.3 kB**; the heaviest route (home) totals 106 kB.

Runtime guards carried over intact: reduced-motion renders one static frame,
scenes pause off-screen and when the tab is hidden, DPR is capped at 2, and
WebGL failure degrades to the CSS backdrop.

---

## SEO

Added: per-route titles and descriptions with a shared template · canonical
URLs · OpenGraph and Twitter card metadata with a 1200×630 image ·
`ProfessionalService` and `WebSite` JSON-LD · generated `sitemap.xml` with
per-route priority and change frequency · generated `robots.txt` excluding
`/api/` · keywords · `theme-color` for light and dark · favicon.

The canonical host reads from `NEXT_PUBLIC_SITE_URL`, falling back to
`VERCEL_URL`. **Set it once the domain is live.**

---

## Accessibility

Added: skip-to-content link on every page (off-screen until focused) ·
semantic landmarks · `aria-expanded` and `aria-controls` on the hamburger
and dropdowns · `aria-current="page"` on the active nav item · FAQ
questions as real buttons with labelled panels · `autoComplete` hints on
form fields · `role="status"` and `role="alert"` live regions for
submission results · `aria-hidden` on decorative icons and canvases ·
Escape closes the mobile menu.

All motion continues to respect `prefers-reduced-motion`.

---

## Contact form — action required

The form UI is unchanged and now posts JSON to `/api/contact`, which
validates the payload (422 on invalid, 200 on success) and calls a single
`deliver()` function.

**`deliver()` is deliberately not wired to a provider**, per the brief not to
hardcode backend logic. Until one is configured the route validates, logs a
warning, and returns success.

Two ways to finish it:

1. Set `CONTACT_WEBHOOK_URL` — no code change.
2. Replace the `deliver()` body with a provider call (an example using Resend
   is in the doc comment).

This also supersedes the old Formspree form `mjgzdppy`, whose delivery
address could only be changed from that Formspree account.

---

## Deployment

```bash
npm install && npm run build && npm start
```

Vercel: import the repository and deploy. Framework detection fills in every
setting; there is no `vercel.json` and nothing to override. Full steps and a
pre-flight checklist are in [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Known items

- **Enquiry delivery is not configured** (above). This is the one thing
  standing between the form and a working inbox.
- **`--cyan` holds the brand orange** in `home.css` — a name inherited from
  the 1.x palette. Renaming touches ~40 references; left alone deliberately.
- **Font Awesome remains a CDN dependency.** Self-hosting it would remove
  the last external runtime request, at the cost of a larger repository.
- The homepage renders three service cards and expands to six; the original
  rendered all six and hid three with `display: none`. Visually identical,
  less DOM.

---

## Conclusion

The site is a production-ready Next.js 14 application. It looks the same as
before, ships materially less JavaScript, is statically prerendered,
properly indexed, keyboard accessible, and deployable to Vercel without
configuration. Build, lint and type checks all pass, and every page was
verified against the original rather than assumed correct.
