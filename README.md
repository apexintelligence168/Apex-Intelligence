# Apex Intelligence

Marketing site for Apex Intelligence — a web, ERP, ML, analytics and cloud
development studio in Nashik, India.

Built with **Next.js 14 (App Router)**, TypeScript and **three.js**. Every
page is statically prerendered; the only server-rendered endpoint is the
contact API.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

Node **18.17+** is required (see `engines` in `package.json`).

---

## What's here

| Route          | File                           | Rendering |
| -------------- | ------------------------------ | --------- |
| `/`            | `app/(home)/page.tsx`          | Static    |
| `/about`       | `app/(site)/about/page.tsx`    | Static    |
| `/services`    | `app/(site)/services/page.tsx` | Static    |
| `/products`    | `app/(site)/products/page.tsx` | Static    |
| `/process`     | `app/(site)/process/page.tsx`  | Static    |
| `/insights`    | `app/(site)/insights/page.tsx` | Static    |
| `/contact`     | `app/(site)/contact/page.tsx`  | Static    |
| 404            | `app/not-found.tsx`            | Static    |
| `/api/contact` | `app/api/contact/route.ts`     | Dynamic   |
| `/sitemap.xml`, `/robots.txt` | generated       | Static    |

Full layout in [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

---

## The 3D layer

Two WebGL scenes, defined in `components/three/scenes.ts`:

- **`core`** — homepage hero: a fresnel-shaded lattice, three tilted orbit
  rings with billboarded nodes, a receding blueprint grid horizon, and a
  drifting particle field.
- **`lattice`** — inner page heroes: wireframe polyhedra kept clear of the
  central copy column.

Mount one by giving a container `data-apex-3d` and rendering `<LazyScene />`
inside it:

```tsx
<section className="page-hero" data-apex-3d="lattice">
  <LazyScene scene="lattice" />
  …
</section>
```

`LazyScene` is a `next/dynamic` boundary with `ssr: false`, so three.js
stays out of the shared bundle and off the server entirely.

**Guards, all deliberate:**

- `prefers-reduced-motion` renders one static composed frame — no loop
- the render loop is skipped while the host is off-screen or the tab is hidden
- device pixel ratio is capped at 2
- WebGL failure hides the canvas and leaves the CSS backdrop intact
- every geometry, material and renderer is disposed on unmount

---

## Theming

One flag drives everything: the `dark-mode` class on `<body>`.

- `components/layout/ThemeScript.tsx` applies it **before first paint**, so
  there is no flash. It has to be a blocking inline script — the stylesheet
  keys off `body.dark-mode`, so resolving it in an effect would be too late.
- `hooks/useTheme.ts` owns changes and broadcasts an `apex:theme` event,
  which the WebGL scenes listen for to repaint their palettes.
- The stored key is `apexTheme`; the two pre-2.0 keys (`darkMode`,
  `apexPrintMode`) are migrated automatically.

---

## Stylesheets

CSS is plain and global, split by scope rather than by component. See
[CUSTOMIZATION.md](CUSTOMIZATION.md) for what belongs where.

| File          | Loaded by                          |
| ------------- | ---------------------------------- |
| `base.css`    | root layout — every route          |
| `3d.css`      | root layout — every route          |
| `globals.css` | `(site)` layout + `not-found` only |
| `pages.css`   | `(site)` layout + `not-found` only |
| `home.css`    | `/` only, scoped under `body.home` |

> The homepage does **not** load `globals.css`. The original `index.html`
> was self-contained, and 19 of its selectors collide with the shared
> component styles. `home.css` is scoped under `body.home` so it wins those
> collisions and never leaks onto another route.

---

## Contact form

The form posts JSON to `/api/contact`. That route validates and normalises
the payload, then calls a single `deliver()` function.

**`deliver()` is intentionally not wired to a provider.** Set
`CONTACT_WEBHOOK_URL` to forward enquiries with no code change, or replace
the function body with your own call (Resend, SendGrid, a CRM webhook, a
database write). Until then it validates, logs a warning, and returns
success so the UI can be exercised end to end.

```bash
# .env.local
CONTACT_WEBHOOK_URL=https://…
NEXT_PUBLIC_SITE_URL=https://apexintelligence.in
```

---

## Deploying

Push to a Git remote and import the repository on Vercel. No build
configuration is required. Details and alternatives in
[DEPLOYMENT.md](DEPLOYMENT.md).

---

## Documentation

| Document                                     | Covers                                 |
| -------------------------------------------- | -------------------------------------- |
| [QUICKSTART.md](QUICKSTART.md)               | Getting running in five minutes        |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Every directory and file               |
| [CUSTOMIZATION.md](CUSTOMIZATION.md)         | Editing content, colours, copy, the 3D |
| [WEBSITE_GUIDE.md](WEBSITE_GUIDE.md)         | Page-by-page content map               |
| [DEPLOYMENT.md](DEPLOYMENT.md)               | Vercel, env vars, domains, checks      |
| [COMPLETION_REPORT.md](COMPLETION_REPORT.md) | What the 2.0 migration changed and why |
| [CHANGELOG.md](CHANGELOG.md)                 | Version history                        |
