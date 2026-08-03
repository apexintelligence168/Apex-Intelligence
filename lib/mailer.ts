/**
 * Enquiry delivery.
 *
 * Sends two messages per submission:
 *   1. a notification to CONTACT_TO (info@apexintelligence.in)
 *   2. an acknowledgement to whoever filled in the form
 *
 * Three transports, tried in order of what is configured:
 *
 *   SMTP     — set SMTP_HOST / SMTP_USER / SMTP_PASS. Sends through the
 *              info@ mailbox itself, so no third-party service is
 *              involved and mail lands in the normal inbox.
 *   Resend   — set RESEND_API_KEY. Better deliverability at volume;
 *              needs the domain verified in Resend.
 *   Webhook  — set CONTACT_WEBHOOK_URL. Forwards the raw JSON to Zapier,
 *              Make, a CRM, or anything else that accepts a POST.
 *
 * With none of them set the enquiry is logged and the caller is told
 * delivery is unconfigured, so a silent failure is impossible.
 */

import nodemailer, { type Transporter } from 'nodemailer';

import {
  acknowledgementHtml,
  acknowledgementSubject,
  acknowledgementText,
  notificationHtml,
  notificationSubject,
  notificationText,
  type EnquiryMeta,
} from './email-templates';
import { contact } from './site';
import type { ContactPayload } from '@/types';

export type DeliveryChannel = 'smtp' | 'resend' | 'webhook' | 'none';

export interface DeliveryResult {
  delivered: boolean;
  channel: DeliveryChannel;
  /** True when the enquirer's acknowledgement also went out. */
  acknowledged: boolean;
}

const TO = process.env.CONTACT_TO ?? contact.email;

/**
 * Envelope sender. This must be an address the transport is allowed to
 * send as — with SMTP that is normally the authenticating mailbox
 * itself, which is why it defaults to CONTACT_TO rather than the
 * visitor's address. The visitor goes in Reply-To instead; putting them
 * in From is what gets mail rejected by SPF and DMARC.
 */
const FROM =
  process.env.CONTACT_FROM ?? `"Apex Intelligence Website" <${process.env.SMTP_USER ?? TO}>`;

/* ------------------------------------------------------------------ */
/* SMTP                                                                */
/* ------------------------------------------------------------------ */

let cachedTransport: Transporter | null = null;

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport(): Transporter {
  if (cachedTransport) return cachedTransport;

  const port = Number(process.env.SMTP_PORT ?? 587);

  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransport;
}

/** Verifies the SMTP credentials without sending anything. */
export async function verifyTransport(): Promise<{ ok: boolean; error?: string }> {
  if (!smtpConfigured()) return { ok: false, error: 'SMTP is not configured' };
  try {
    await getTransport().verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function sendViaSmtp(
  payload: ContactPayload,
  meta: EnquiryMeta,
): Promise<{ acknowledged: boolean }> {
  const transport = getTransport();

  // The notification is the one that must not fail.
  await transport.sendMail({
    from: FROM,
    to: TO,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject: notificationSubject(payload),
    text: notificationText(payload, meta),
    html: notificationHtml(payload, meta),
  });

  // The acknowledgement is a courtesy; a failure here must not lose the
  // enquiry that has already been delivered.
  try {
    await transport.sendMail({
      from: FROM,
      to: `"${payload.name}" <${payload.email}>`,
      replyTo: TO,
      subject: acknowledgementSubject(),
      text: acknowledgementText(payload),
      html: acknowledgementHtml(payload),
    });
    return { acknowledged: true };
  } catch (err) {
    console.warn('[contact] acknowledgement failed (enquiry was delivered):', err);
    return { acknowledged: false };
  }
}

/* ------------------------------------------------------------------ */
/* Resend                                                              */
/* ------------------------------------------------------------------ */

async function sendViaResend(
  payload: ContactPayload,
  meta: EnquiryMeta,
): Promise<{ acknowledged: boolean }> {
  const key = process.env.RESEND_API_KEY!;

  const post = (body: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

  const res = await post({
    from: FROM,
    to: [TO],
    reply_to: payload.email,
    subject: notificationSubject(payload),
    text: notificationText(payload, meta),
    html: notificationHtml(payload, meta),
  });

  if (!res.ok) {
    throw new Error(`Resend rejected the notification (${res.status}): ${await res.text()}`);
  }

  try {
    const ack = await post({
      from: FROM,
      to: [payload.email],
      reply_to: TO,
      subject: acknowledgementSubject(),
      text: acknowledgementText(payload),
      html: acknowledgementHtml(payload),
    });
    return { acknowledged: ack.ok };
  } catch (err) {
    console.warn('[contact] acknowledgement failed (enquiry was delivered):', err);
    return { acknowledged: false };
  }
}

/* ------------------------------------------------------------------ */
/* Webhook                                                             */
/* ------------------------------------------------------------------ */

async function sendViaWebhook(payload: ContactPayload, meta: EnquiryMeta): Promise<void> {
  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, ...meta, to: TO }),
  });

  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/* ------------------------------------------------------------------ */

/** Which transport a submission would use right now. */
export function activeChannel(): DeliveryChannel {
  if (smtpConfigured()) return 'smtp';
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.CONTACT_WEBHOOK_URL) return 'webhook';
  return 'none';
}

export async function deliverEnquiry(
  payload: ContactPayload,
  meta: EnquiryMeta,
): Promise<DeliveryResult> {
  const channel = activeChannel();

  switch (channel) {
    case 'smtp': {
      const { acknowledged } = await sendViaSmtp(payload, meta);
      return { delivered: true, channel, acknowledged };
    }
    case 'resend': {
      const { acknowledged } = await sendViaResend(payload, meta);
      return { delivered: true, channel, acknowledged };
    }
    case 'webhook': {
      await sendViaWebhook(payload, meta);
      return { delivered: true, channel, acknowledged: false };
    }
    default:
      // Loud on purpose. An enquiry that cannot be delivered is worse
      // than one that errors, because nobody finds out.
      console.error(
        '[contact] NO DELIVERY CHANNEL CONFIGURED — enquiry not sent to',
        TO,
        JSON.stringify({ ...payload, message: `${payload.message.slice(0, 120)}…` }),
      );
      return { delivered: false, channel: 'none', acknowledged: false };
  }
}
