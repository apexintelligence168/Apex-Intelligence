# Project structure

```
Apex-Intelligence/
├── app/                      # routes (Next.js App Router)
├── components/               # React components
├── hooks/                    # reusable client-side behaviour
├── lib/                      # site config and content data
├── styles/                   # stylesheets
├── types/                    # shared TypeScript types
├── public/                   # static assets served at /
├── next.config.mjs
├── tsconfig.json
├── .eslintrc.json
└── package.json
```

---

## `app/` — routes

```
app/
├── layout.tsx                # root: fonts, metadata, JSON-LD, base CSS
├── not-found.tsx             # 404 (outside the group, so it carries its own shell)
├── sitemap.ts                # generates /sitemap.xml
├── robots.ts                 # generates /robots.txt
│
├── (home)/
│   └── page.tsx              # /
│
├── (site)/                   # every route that shares the standard shell
│   ├── layout.tsx            # SiteHeader + SiteFooter + ScrollTop + PageEffects
│   ├── about/page.tsx        # /about
│   ├── services/page.tsx     # /services
│   ├── products/page.tsx     # /products
│   ├── process/page.tsx      # /process
│   ├── insights/page.tsx     # /insights
│   └── contact/page.tsx      # /contact
│
└── api/
    └── contact/route.ts      # POST /api/contact
```

**Why two route groups?** The homepage and the inner pages have genuinely
different chrome — the homepage has an info strip, a two-line logo, a loader
and a four-column footer; the inner pages have a compact header and footer.
Route groups let each own its shell without either paying for the other's
markup. Parentheses mean the folder name never appears in the URL.

`not-found.tsx` must live at the app root, so it imports the shared shell
components directly rather than inheriting a layout.

Every page is a **server component**. Interactivity lives in the small client
components under `components/`, so almost no per-page JavaScript ships.

---

## `components/`

```
components/
├── home/                     # homepage only
│   ├── HomeHeader.tsx        # info strip + blueprint header
│   ├── HomeFooter.tsx        # four-column footer
│   ├── HomeChrome.tsx        # loader, scroll progress, back-to-top
│   ├── HomeBodyClass.tsx     # adds `body.home` before paint
│   └── ServicesGrid.tsx      # six service cards + "view all" expander
│
├── layout/
│   ├── SiteHeader.tsx        # header for the (site) group
│   ├── SiteFooter.tsx        # compact footer
│   ├── ThemeScript.tsx       # pre-paint theme application
│   └── PageEffects.tsx       # binds reveal/tilt/magnetic to the page
│
├── sections/
│   ├── ContactForm.tsx       # posts to /api/contact
│   └── FaqAccordion.tsx      # single-open accordion
│
├── three/
│   ├── scenes.ts             # the two WebGL scene builders
│   ├── Scene3D.tsx           # renderer lifecycle, resize, parallax, disposal
│   └── LazyScene.tsx         # dynamic(ssr:false) boundary — keeps three.js off the server
│
└── ui/
    ├── ThemeToggle.tsx
    ├── ScrollTopButton.tsx
    └── WhatsAppButton.tsx
```

---

## `hooks/`

Each hook operates on plain class or data attributes, so pages stay server
components and ship no per-element JavaScript.

| Hook                 | Drives                                                        |
| -------------------- | ------------------------------------------------------------- |
| `useTheme`           | `body.dark-mode`, `apexTheme` storage, `apex:theme` broadcast  |
| `useReveal`          | `.reveal` / `.reveal-3d` visibility + `[data-count]` roll-ups  |
| `useTilt`            | pointer-tracked 3D tilt on `[data-tilt]`                       |
| `useMagnetic`        | pointer attraction on `.primary-btn`, `.cta-button`            |
| `useScrollProgress`  | progress bar, sticky-header state, back-to-top visibility      |
| `useMediaQuery`      | SSR-safe media queries (+ `useReducedMotion`, `useFinePointer`)|

---

## `lib/`

| File         | Contents                                                        |
| ------------ | --------------------------------------------------------------- |
| `site.ts`    | `siteConfig`, `contact`, `navigation`, social links, sitemap routes |
| `content.ts` | FAQ entries for `/insights`                                     |

`lib/site.ts` is the single source of truth for contact details and
navigation. Before the migration those were duplicated across eight HTML
files; changing a phone number meant eight edits and usually missing one.

---

## `styles/`

| File          | Size  | Loaded by                          | Contents                                  |
| ------------- | ----- | ---------------------------------- | ----------------------------------------- |
| `base.css`    | ~5 kB | root layout (every route)          | reset, design tokens, global widgets      |
| `3d.css`      | ~9 kB | root layout (every route)          | canvas, tilt, depth reveals, parallax     |
| `globals.css` | ~35 kB| `(site)` layout + `not-found`      | header, nav, hero, sections, cards, forms |
| `pages.css`   | ~29 kB| `(site)` layout + `not-found`      | route-scoped blocks (about/process/contact/404) |
| `home.css`    | ~31 kB| `/` only                           | the homepage blueprint design             |

**The homepage does not load `globals.css`.** The original `index.html` was
self-contained and never linked `shared.css`; 19 selectors collide
(`.logo`, `.cta-button`, `.dropdown`, `.about-grid`, `.footer-socials`, …).
Loading both would silently alter the homepage — `globals.css` sets
properties, like `.logo { gap: 0.5rem }`, that `home.css` never declares and
therefore cannot override.

`home.css` is additionally scoped under `body.home`, applied before paint by
`HomeBodyClass`, so its rules win any remaining collision and are dropped
when a client-side navigation leaves `/`.

---

## `public/`

| File                  | Used for                                        |
| --------------------- | ----------------------------------------------- |
| `icon.svg`            | favicon (Next serves it from the file name)     |
| `opengraph-image.svg` | OpenGraph / Twitter card, 1200×630              |

---

## `types/`

Shared types: navigation shapes, `SceneName`, `ScenePalette`,
`ContactPayload`, `ContactStatus`.

---

## Build output

```
Route (app)                    Size     First Load JS
┌ ○ /                          5.8 kB          106 kB
├ ○ /_not-found                194 B          87.5 kB
├ ○ /about                     347 B           100 kB
├ ƒ /api/contact               0 B                0 B
├ ○ /contact                   2.37 kB        89.7 kB
├ ○ /insights                  725 B          93.7 kB
├ ○ /process                   1.2 kB         95.3 kB
├ ○ /products                  437 B          93.5 kB
├ ○ /services                  1.2 kB         95.3 kB
├ ○ /robots.txt                0 B                0 B
└ ○ /sitemap.xml               0 B                0 B
+ First Load JS shared by all  87.3 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

three.js does not appear in the shared bundle — `LazyScene` pulls it in on
the client, only for routes that mount a scene.
