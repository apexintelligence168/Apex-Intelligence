# Customization

Where to change things, and what each change affects.

---

## Contact details

**File:** `lib/site.ts` → `contact`

```ts
export const contact = {
  phoneDisplay: '+91 91453 10264',
  phoneHref: 'tel:+919145310264',
  whatsappNumber: '919145310264',
  whatsappHref: 'https://wa.me/919145310264',
  email: 'info@apexintelligence.in',
  emailHref: 'mailto:info@apexintelligence.in',
  addressLines: ['G-square Jatra Hotel', 'Nashik, Maharashtra'],
  …
};
```

One edit updates the homepage info strip, both footers, the floating
WhatsApp button and the `ProfessionalService` structured data.

The `/contact` page cards are the exception — they carry the numbers in
their own markup so the layout can differ per card. Search
`app/(site)/contact/page.tsx` if you change the number.

---

## Navigation

**File:** `lib/site.ts` → `navigation`

```ts
{
  label: 'Services',
  href: '/services',
  items: [
    { label: 'Web Development', href: '/services#web', icon: 'fas fa-globe' },
    { divider: true },
    …
  ],
}
```

Drives both headers. `{ divider: true }` renders a separator. Icons are
Font Awesome 6 class names.

---

## Page copy

Each route's text lives in its own file:

| Page      | File                             |
| --------- | -------------------------------- |
| Home      | `app/(home)/page.tsx`            |
| About     | `app/(site)/about/page.tsx`      |
| Services  | `app/(site)/services/page.tsx`   |
| Work      | `app/(site)/products/page.tsx`   |
| Process   | `app/(site)/process/page.tsx`    |
| Insights  | `app/(site)/insights/page.tsx`   |
| Contact   | `app/(site)/contact/page.tsx`    |

Two blocks are data-driven instead:

- **Homepage service cards** — `components/home/ServicesGrid.tsx`, the
  `MODULES` array. Set `extra: true` to hide a card behind "View all modules".
- **FAQ** — `lib/content.ts`.

---

## Colours

### Shared palette

**File:** `styles/base.css`

```css
:root {
    --primary-color: #E4570F;
    --accent-color:  #FF7A3D;
    --bg-primary:    #ffffff;
    --text-primary:  #171310;
    …
}

body.dark-mode {
    --primary-color: #FF7A3D;
    --bg-primary:    #15120F;
    --text-primary:  #ffffff;
    …
}
```

Change both blocks — light and dark are defined separately.

### Homepage palette

**File:** `styles/home.css`

The homepage has its own "blueprint" tokens (`--cyan`, `--amber`,
`--navy-900`, `--paper`) in a `:root` block, plus light/dark sheets on
`body.home` and `body.home.dark-mode`.

> `--cyan` is a historical name — it holds the brand orange `#FF7A3D`.
> Renaming it means updating ~40 references in `home.css`.

### 3D scene colours

**File:** `components/three/scenes.ts` → `PALETTE`

```ts
export const PALETTE = {
  light: { core: 0xe4570f, rim: 0xffa45c, /* … */ additive: false },
  dark:  { core: 0xff7a3d, rim: 0xffd8a8, /* … */ additive: true  },
};
```

Hex numbers, not strings. `additive` controls blend mode — additive glow
reads well on dark backgrounds and washes out on light ones.

---

## Typography

**File:** `app/layout.tsx`

Three families are self-hosted through `next/font/google` and exposed as CSS
variables:

| Family            | Variable         | Used for                     |
| ----------------- | ---------------- | ---------------------------- |
| Inter             | `--font-inter`   | body text                    |
| Plus Jakarta Sans | `--font-jakarta` | headings, logo               |
| IBM Plex Mono     | `--font-ibm`     | eyebrows, labels, info strip |

To swap a family, change the import and the `variable` name stays the same —
the stylesheets reference the variable, not the family name.

---

## The 3D scenes

**File:** `components/three/scenes.ts`

### Tuning the homepage scene

Inside `buildCore`:

| What                      | Where                                     |
| ------------------------- | ----------------------------------------- |
| Lattice size              | `new THREE.IcosahedronGeometry(1.12, 1)`  |
| Composition offset        | `BASE_Y`, `BASE_Z`                        |
| Orbit rings               | the `ringSpecs` array                     |
| Node size                 | `sprite.scale.setScalar(0.19)`            |
| Grid horizon              | `new THREE.GridHelper(40, 40, …)`, `grid.position.y` |
| Particle count / spread   | `particleField(700, 8.5, palette)`        |

### Tuning the inner-page scene

Inside `buildLattice`: the loop over 14 shapes. Positions deliberately avoid
the centre column (`side * (3.4 + Math.random() * 4.4)`) so headline copy
stays readable — keep that if you change the spread.

### Camera and motion

**File:** `components/three/Scene3D.tsx` — field of view, base position,
pointer-parallax damping (`0.045`), and the DPR cap.

### Adding a scene

1. Write a builder in `scenes.ts` returning `{ themed, update, dispose }`.
2. Register it in `BUILDERS`.
3. Add its name to `SceneName` in `types/index.ts`.
4. Mount it: `<section data-apex-3d="yourScene"><LazyScene scene="yourScene" /></section>`

---

## 3D UI effects

**File:** `styles/3d.css`

Applied by adding attributes to markup — no JavaScript per element:

| Attribute / class      | Effect                                      |
| ---------------------- | ------------------------------------------- |
| `data-tilt`            | pointer-tracked 3D tilt                     |
| `data-tilt-max="5"`    | max rotation in degrees (default 7)         |
| `data-tilt-lift="14"`  | translateZ in px while hovered (default 18) |
| `.reveal-3d`           | perspective reveal on scroll                |
| `.d1` … `.d6`          | stagger delay for reveals                   |
| `.depth-scene`         | shared perspective root for a grid          |
| `.lift-1/2/3`          | push a child forward off the card face      |
| `data-parallax="0.15"` | scroll drift                                |

All of them are disabled under `prefers-reduced-motion` and on coarse
pointers.

---

## SEO

- **Defaults** (title template, OpenGraph, Twitter, robots, keywords):
  `app/layout.tsx`
- **Per page**: the `metadata` export in each `page.tsx`
- **Sitemap**: `lib/site.ts` → `routes`, consumed by `app/sitemap.ts`
- **Structured data**: `ProfessionalService` in `app/layout.tsx`,
  `WebSite` in `app/(home)/page.tsx`
- **Canonical host**: set `NEXT_PUBLIC_SITE_URL`

---

## Images

Remote images use `next/image` and are optimised automatically. New remote
hosts must be allowed in `next.config.mjs`:

```js
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
}
```

Give every `<Image>` a `width`/`height` matching the source aspect ratio.
`base.css` sets `img { height: auto }` so the rendered height follows the
container width — without it the attribute height wins and the image
stretches.
