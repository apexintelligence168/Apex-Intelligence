# Deployment

The project is a standard Next.js 14 app. It deploys to Vercel with **no
build configuration** — no `vercel.json`, no custom commands, no output
directory override.

---

## Vercel (recommended)

### 1. Push to Git

```bash
git add -A
git commit -m "Migrate to Next.js 14"
git push
```

### 2. Import

1. <https://vercel.com/new>
2. Import the repository
3. Vercel detects Next.js and fills in every field:

   | Setting          | Value           |
   | ---------------- | --------------- |
   | Framework        | Next.js         |
   | Build command    | `next build`    |
   | Output directory | `.next`         |
   | Install command  | `npm install`   |
   | Node version     | 18.x or newer   |

4. **Deploy**

### 3. Environment variables

Optional — the site builds and runs without any of these.

| Variable               | Purpose                                                | Example                          |
| ---------------------- | ------------------------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical host for metadata, OG tags and the sitemap    | `https://apexintelligence.in`    |
| `CONTACT_WEBHOOK_URL`  | Where `/api/contact` forwards enquiries                 | `https://hooks.example.com/…`    |

Without `NEXT_PUBLIC_SITE_URL` the site falls back to `VERCEL_URL`, then to
`https://apexintelligence.in`. **Set it once you have the real domain** —
canonical URLs and the sitemap depend on it.

### 4. Custom domain

Project → Settings → Domains → add `apexintelligence.in`, then follow the DNS
instructions. Set `NEXT_PUBLIC_SITE_URL` to the same value and redeploy so
metadata matches.

---

## Other hosts

Any platform that runs a Node server works, because `/api/contact` needs one:

```bash
npm ci
npm run build
npm start          # listens on $PORT, default 3000
```

Netlify, Render, Railway, Fly.io and a plain VPS behind nginx all work
unchanged.

### Static export

Not supported as-is — `/api/contact` requires a server. To export
statically you would delete the API route and point the form at a
third-party endpoint, then add `output: 'export'` to `next.config.mjs`.
Note that `next/image` optimisation is also unavailable in export mode
without a custom loader.

---

## Wiring up the contact form

Enquiries are **not delivered** until you configure this. The route
validates and logs, then returns success.

### Option A — webhook (no code)

Set `CONTACT_WEBHOOK_URL`. The route POSTs the validated JSON payload:

```json
{ "name": "…", "email": "…", "phone": "…", "subject": "…", "message": "…" }
```

Works with Zapier, Make, n8n, a Google Apps Script, or your own endpoint.

### Option B — email provider (small code change)

Replace the body of `deliver()` in `app/api/contact/route.ts`:

```ts
async function deliver(payload: ContactPayload): Promise<void> {
  const { Resend } = await import('resend');
  await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: 'site@apexintelligence.in',
    to: 'info@apexintelligence.in',
    replyTo: payload.email,
    subject: `Website enquiry — ${payload.subject}`,
    text: payload.message,
  });
}
```

Then `npm install resend` and add `RESEND_API_KEY` to the environment.

---

## Pre-deploy checklist

```bash
npm ci
npm run typecheck    # must be clean
npm run lint         # must be clean
npm run build        # must succeed
npm start            # smoke-test locally
```

Then verify:

- [ ] Every route loads: `/`, `/about`, `/services`, `/products`, `/process`, `/insights`, `/contact`
- [ ] An unknown URL renders the 404 page
- [ ] `/sitemap.xml` and `/robots.txt` return the production host
- [ ] The theme toggle persists across a navigation
- [ ] The 3D hero renders (and the page still works with WebGL disabled)
- [ ] The contact form submits and shows the success panel
- [ ] Browser console is free of errors

---

## Post-deploy

- Submit `https://<domain>/sitemap.xml` to Google Search Console
- Check the OpenGraph card at <https://cards-dev.twitter.com/validator>
- Run Lighthouse against the production URL, not the dev server

---

## Notes

**Security headers** are set in `next.config.mjs`: `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`. Add a
Content-Security-Policy there if you need one — remember the inline theme
script requires a nonce or hash.

**Caching**: static routes are served from Vercel's CDN automatically.
`/api/contact` is `force-dynamic` and never cached.

**Font Awesome** loads from `cdnjs.cloudflare.com` with SRI. Fonts
themselves are self-hosted by `next/font`, so the only external runtime
dependency is the icon stylesheet.
