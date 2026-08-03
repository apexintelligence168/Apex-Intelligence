# Contact form — email setup

Enquiries from `/contact` are emailed to **info@apexintelligence.in**.

The code is finished and tested. All that is left is giving it the
mailbox credentials, which takes about five minutes.

---

## What happens on every submission

1. **You get a notification** at `info@apexintelligence.in` with the
   name, email, phone, subject and message. **Reply-To is set to the
   enquirer**, so hitting reply in Gmail or Outlook goes straight to
   them — no copying addresses.
2. **They get an acknowledgement** confirming it arrived, repeating what
   they sent, and giving your phone number in case it is urgent.

If the mail cannot be sent, the visitor is told to call or WhatsApp
instead. The form never claims success when nothing was delivered.

---

## Setup — Hostinger SMTP

`info@apexintelligence.in` is hosted on Hostinger (mail.hostinger.com),
so mail is sent through that mailbox directly. No third-party service,
no signup, and **no app password** — Hostinger accepts the normal
mailbox password.

### 1. These are your settings

```bash
CONTACT_TO=info@apexintelligence.in
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@apexintelligence.in
SMTP_PASS=<your mailbox password>
CONTACT_FROM="Apex Intelligence Website <info@apexintelligence.in>"
```

Port 465 uses implicit SSL, which is what Hostinger recommends. If it is
ever blocked on your network, 587 with STARTTLS also works — the code
picks the right mode from the port number automatically.

### 2. Get the password

It is the password you use at <https://mail.hostinger.com>. If you do not
know it, reset it in **hPanel → Emails → Email Accounts →** the three
dots beside `info@apexintelligence.in` **→ Change password**.

### 3. Local development

`.env.local` already exists in the project root with everything filled in
except the password. Replace `PASTE_YOUR_MAILBOX_PASSWORD_HERE`, then:

```bash
npm run build && npm start
curl http://localhost:3000/api/contact
# { "ok": true, "channel": "smtp", "configured": true }
```

`.env.local` is gitignored — credentials never reach the repository.

### Other hosts

If the mailbox ever moves, only the first two lines change:

| Host | SMTP_HOST | SMTP_PORT | App password? |
| ---- | --------- | --------- | ------------- |
| Hostinger | `smtp.hostinger.com` | 465 | No |
| Google Workspace | `smtp.gmail.com` | 587 | **Yes** |
| Microsoft 365 | `smtp.office365.com` | 587 | **Yes** |
| Zoho Mail | `smtp.zoho.in` | 587 | No |
| GoDaddy | `smtpout.secureserver.net` | 587 | No |
| cPanel / shared | `mail.apexintelligence.in` | 465 | No |

### 4. Production (Vercel)

Project → Settings → Environment Variables. Add the same six, select
**Production, Preview and Development**, then redeploy.

### 5. Check it worked

```bash
curl https://apexintelligence.in/api/contact
```

```json
{ "ok": true, "channel": "smtp", "configured": true }
```

`"channel": "none"` means the variables have not been picked up —
redeploy after adding them. Then send a real message through the form
and confirm both emails arrive.

---

## Alternative — Resend

Better deliverability once volume grows; free for 3,000 emails a month.
Requires verifying `apexintelligence.in` at
<https://resend.com/domains> by adding DNS records.

```bash
CONTACT_TO=info@apexintelligence.in
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_FROM="Apex Intelligence Website <website@apexintelligence.in>"
```

No code change — the route picks it up automatically.

---

## Alternative — Webhook

Forwards the raw JSON somewhere else (Zapier, Make, n8n, a CRM). The
site sends no email itself; whatever receives the POST decides.

```bash
CONTACT_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
```

---

## Which one wins

Checked in this order, first match used:

1. `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS` → SMTP
2. `RESEND_API_KEY` → Resend
3. `CONTACT_WEBHOOK_URL` → webhook
4. none → the form returns 503 and tells the visitor to call

---

## Spam protection

Already in place, nothing to configure:

- **Honeypot** — a hidden field real people never see. Anything that
  fills it is silently discarded with a fake success, so the bot does
  not learn what caught it.
- **Timing check** — submissions completed in under three seconds are
  treated as automated.
- **Rate limit** — five submissions per IP per ten minutes, then 429.
- **Validation** — email format, field lengths, and a ten-character
  minimum on the message.

---

## Troubleshooting

**`Invalid login: 535 Authentication failed`**
On Gmail or Microsoft 365 you are using the account password. Generate
an app password instead.

**`Connection timeout`**
Wrong port. Try 465 with implicit TLS, or 587 with STARTTLS. The code
picks the right mode automatically from the port number.

**Mail lands in spam**
Add an SPF record for your mail host, and DKIM if the provider offers
it. Both are DNS changes at your domain registrar. Sending through the
real mailbox (SMTP) rather than a third party already helps here.

**`Message failed: 550 5.7.60 SMTP; Client does not have permission to send as this sender`**
`CONTACT_FROM` must be an address the mailbox may send as — normally
`SMTP_USER` itself. The enquirer's address goes in Reply-To, never in
From; putting them in From is exactly what SPF and DMARC reject.

---

## Where the code lives

| File | Does |
| ---- | ---- |
| `app/api/contact/route.ts` | Validation, spam screening, rate limiting |
| `lib/mailer.ts` | Transport selection and sending |
| `lib/email-templates.ts` | The two email bodies, HTML and plain text |
| `components/sections/ContactForm.tsx` | The form, honeypot and timing field |
| `.env.example` | Every variable, with comments |
