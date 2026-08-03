/**
 * Email bodies for the contact form.
 *
 * Two messages go out per enquiry:
 *   1. the notification to info@apexintelligence.in
 *   2. an acknowledgement to whoever submitted the form
 *
 * Both are built as HTML with a plain-text alternative, because a fair
 * number of business mail clients still render text only.
 */

import type { ContactPayload } from '@/types';
import { contact, siteConfig } from './site';

const BRAND = '#E4570F';
const INK = '#171310';
const MUTED = '#5B5650';
const LINE = '#EADFD4';

/** Minimal escaping — these values come from a public form. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Preserve the sender's line breaks without allowing markup through. */
function paragraphs(text: string): string {
  return esc(text)
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 14px;">${block.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

function row(label: string, value: string, href?: string): string {
  const shown = href
    ? `<a href="${href}" style="color:${BRAND};text-decoration:none;">${esc(value)}</a>`
    : esc(value);

  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${LINE};width:130px;
                 font:600 12px/1.4 Arial,sans-serif;letter-spacing:.08em;
                 text-transform:uppercase;color:${MUTED};vertical-align:top;">
        ${esc(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${LINE};
                 font:400 15px/1.6 Arial,sans-serif;color:${INK};">
        ${shown}
      </td>
    </tr>`;
}

/* ------------------------------------------------------------------ */
/* 1. Notification to info@apexintelligence.in                         */
/* ------------------------------------------------------------------ */

export function notificationSubject(payload: ContactPayload): string {
  return `New enquiry — ${payload.subject} (${payload.name})`;
}

export function notificationText(payload: ContactPayload, meta: EnquiryMeta): string {
  return [
    'NEW WEBSITE ENQUIRY',
    '',
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Phone:   ${payload.phone || '—'}`,
    `Subject: ${payload.subject}`,
    '',
    'Message:',
    payload.message,
    '',
    '---',
    `Received: ${meta.receivedAt}`,
    meta.page ? `Page: ${meta.page}` : '',
    '',
    `Reply directly to this email to reach ${payload.name}.`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function notificationHtml(payload: ContactPayload, meta: EnquiryMeta): string {
  const phoneDigits = payload.phone?.replace(/[^\d+]/g, '') ?? '';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:24px;background:#F7F4EE;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
         style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;
                overflow:hidden;border:1px solid ${LINE};">
    <tr>
      <td style="background:${INK};padding:22px 28px;">
        <div style="font:700 18px/1.2 Arial,sans-serif;color:#ffffff;">
          ${esc(siteConfig.name)}
        </div>
        <div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:.16em;
                    text-transform:uppercase;color:${BRAND};margin-top:5px;">
          New website enquiry
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding:28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          ${row('Name', payload.name)}
          ${row('Email', payload.email, `mailto:${payload.email}`)}
          ${payload.phone ? row('Phone', payload.phone, `tel:${phoneDigits}`) : ''}
          ${row('Subject', payload.subject)}
        </table>

        <div style="margin:26px 0 8px;font:600 12px/1.4 Arial,sans-serif;
                    letter-spacing:.08em;text-transform:uppercase;color:${MUTED};">
          Message
        </div>
        <div style="background:#FAF7F2;border-left:3px solid ${BRAND};border-radius:0 8px 8px 0;
                    padding:16px 18px;font:400 15px/1.7 Arial,sans-serif;color:${INK};">
          ${paragraphs(payload.message)}
        </div>

        <div style="margin-top:26px;">
          <a href="mailto:${esc(payload.email)}?subject=Re:%20${encodeURIComponent(payload.subject)}"
             style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;
                    font:600 14px/1 Arial,sans-serif;padding:13px 22px;border-radius:100px;">
            Reply to ${esc(payload.name)}
          </a>
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding:16px 28px;background:#FAF7F2;border-top:1px solid ${LINE};
                 font:400 12px/1.6 Arial,sans-serif;color:${MUTED};">
        Received ${esc(meta.receivedAt)}${meta.page ? ` · from ${esc(meta.page)}` : ''}<br />
        Hitting reply goes straight to ${esc(payload.name)} — the Reply-To is already set.
      </td>
    </tr>
  </table>
</body></html>`;
}

/* ------------------------------------------------------------------ */
/* 2. Acknowledgement to the enquirer                                  */
/* ------------------------------------------------------------------ */

export function acknowledgementSubject(): string {
  return `We've got your message — ${siteConfig.name}`;
}

export function acknowledgementText(payload: ContactPayload): string {
  return [
    `Hi ${payload.name},`,
    '',
    "Thanks for getting in touch. Your message has reached us and one of the",
    'founders will reply within one business day — usually the same day.',
    '',
    'For reference, this is what you sent:',
    '',
    `Subject: ${payload.subject}`,
    payload.message,
    '',
    'If it is urgent, call or WhatsApp us instead:',
    `  Phone:    ${contact.phoneDisplay}`,
    `  WhatsApp: ${contact.whatsappHref}`,
    '',
    '—',
    `${siteConfig.name}`,
    `${contact.addressLines.join(', ')}`,
    `${contact.email}`,
  ].join('\n');
}

export function acknowledgementHtml(payload: ContactPayload): string {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:24px;background:#F7F4EE;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
         style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;
                overflow:hidden;border:1px solid ${LINE};">
    <tr>
      <td style="background:${INK};padding:22px 28px;">
        <div style="font:700 18px/1.2 Arial,sans-serif;color:#ffffff;">
          ${esc(siteConfig.name)}
        </div>
        <div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:.16em;
                    text-transform:uppercase;color:${BRAND};margin-top:5px;">
          Message received
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding:28px;font:400 15px/1.7 Arial,sans-serif;color:${INK};">
        <p style="margin:0 0 16px;">Hi ${esc(payload.name)},</p>
        <p style="margin:0 0 16px;">
          Thanks for getting in touch. Your message has reached us and one of the
          founders will reply <strong>within one business day</strong> — usually
          the same day.
        </p>

        <div style="margin:24px 0 8px;font:600 12px/1.4 Arial,sans-serif;
                    letter-spacing:.08em;text-transform:uppercase;color:${MUTED};">
          What you sent
        </div>
        <div style="background:#FAF7F2;border-left:3px solid ${BRAND};border-radius:0 8px 8px 0;
                    padding:16px 18px;">
          <div style="font:600 15px/1.5 Arial,sans-serif;color:${INK};margin-bottom:10px;">
            ${esc(payload.subject)}
          </div>
          <div style="font:400 14px/1.7 Arial,sans-serif;color:${MUTED};">
            ${paragraphs(payload.message)}
          </div>
        </div>

        <p style="margin:24px 0 0;">
          If it is urgent, call or WhatsApp instead —
          <a href="${contact.phoneHref}" style="color:${BRAND};text-decoration:none;font-weight:600;">
            ${esc(contact.phoneDisplay)}
          </a>.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:16px 28px;background:#FAF7F2;border-top:1px solid ${LINE};
                 font:400 12px/1.7 Arial,sans-serif;color:${MUTED};">
        <strong style="color:${INK};">${esc(siteConfig.name)}</strong><br />
        ${esc(contact.addressLines.join(', '))}<br />
        <a href="mailto:${contact.email}" style="color:${BRAND};text-decoration:none;">
          ${esc(contact.email)}
        </a>
        &nbsp;·&nbsp;
        <a href="${contact.phoneHref}" style="color:${BRAND};text-decoration:none;">
          ${esc(contact.phoneDisplay)}
        </a>
      </td>
    </tr>
  </table>

  <div style="max-width:600px;margin:14px auto 0;font:400 11px/1.6 Arial,sans-serif;
              color:${MUTED};text-align:center;">
    You are receiving this because you submitted the contact form at
    ${esc(siteConfig.url.replace(/^https?:\/\//, ''))}.
  </div>
</body></html>`;
}

export interface EnquiryMeta {
  receivedAt: string;
  page?: string;
}
