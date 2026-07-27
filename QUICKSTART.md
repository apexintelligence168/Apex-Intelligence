# Quickstart

Running locally in five minutes.

---

## 1. Prerequisites

- **Node.js 18.17 or newer** — check with `node --version`
- npm (ships with Node)

---

## 2. Install

```bash
cd Apex-Intelligence
npm install
```

Installs four runtime packages (`next`, `react`, `react-dom`, `three`) and
the TypeScript/ESLint toolchain.

---

## 3. Run

```bash
npm run dev
```

Open **http://localhost:3000**.

The dev server hot-reloads on save. The first request to each route compiles
on demand, so the very first load of a page is slower than the rest.

---

## 4. Check it works

| What                | How                                                        |
| ------------------- | ---------------------------------------------------------- |
| 3D hero             | The homepage lattice rotates and reacts to the pointer      |
| Theme switch        | Click the moon/sun in the header — persists across pages    |
| Card tilt           | Hover a service card on a desktop pointer                   |
| Mobile nav          | Narrow the window below 760px, open the hamburger           |
| Contact form        | Fill in `/contact` and submit — expect the success panel    |
| 404                 | Visit any unknown URL, e.g. `/nope`                         |

---

## 5. Build for production

```bash
npm run build
npm start
```

`npm run build` must finish with no errors before deploying. It runs ESLint
and the TypeScript compiler as part of the build.

Expected output: 9 static routes, 1 dynamic (`/api/contact`), and a shared
first-load JS budget around **87 kB**.

---

## Common tasks

**Change the phone number, email or address**
→ `lib/site.ts`, the `contact` object. One edit updates every page.

**Change navigation links**
→ `lib/site.ts`, the `navigation` array.

**Edit page copy**
→ The matching `app/(site)/<route>/page.tsx`.

**Edit FAQ entries**
→ `lib/content.ts`.

**Change colours**
→ `styles/base.css` for the shared palette; `styles/home.css` for the
homepage's own blueprint tokens.

More detail in [CUSTOMIZATION.md](CUSTOMIZATION.md).

---

## Troubleshooting

**Port 3000 is taken**

```bash
npm run dev -- -p 3001
```

**The 3D scene does not appear**

Check the browser console for a WebGL warning. The site is designed to work
without WebGL — the canvas hides itself and the CSS backdrop takes over — so
a missing scene is not a broken page. Scenes also render a single static
frame when the OS has "reduce motion" enabled.

**Icons show as empty squares**

Font Awesome loads from a CDN. Check network access to `cdnjs.cloudflare.com`.

**Type or lint errors after editing**

```bash
npm run typecheck
npm run lint
```

Both must be clean; the production build will fail otherwise.
