import { NextResponse } from 'next/server';

import type { ContactPayload } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enquiry intake endpoint.
 *
 * Validation, normalisation and the response contract live here. The
 * actual delivery step is deliberately NOT hardcoded — plug in whichever
 * provider you use (Resend, SendGrid, Formspree, a CRM webhook, a
 * database write) inside `deliver()` below.
 *
 * Until a provider is configured the route validates the payload and
 * logs it, returning success so the UI can be exercised end to end.
 * Set CONTACT_WEBHOOK_URL to forward enquiries with zero code changes.
 */

const MAX = { name: 120, email: 200, phone: 40, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: ContactPayload;
}

function validate(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: ['Malformed request body'] };
  }

  const raw = input as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');

  const name = str('name');
  const email = str('email');
  const phone = str('phone');
  const subject = str('subject');
  const message = str('message');

  if (!name) errors.push('Name is required');
  if (name.length > MAX.name) errors.push('Name is too long');

  if (!email) errors.push('Email is required');
  else if (!EMAIL_RE.test(email)) errors.push('Email looks invalid');
  if (email.length > MAX.email) errors.push('Email is too long');

  if (phone.length > MAX.phone) errors.push('Phone is too long');

  if (!subject) errors.push('Subject is required');
  if (subject.length > MAX.subject) errors.push('Subject is too long');

  if (!message) errors.push('Message is required');
  if (message.length > MAX.message) errors.push('Message is too long');

  if (errors.length) return { ok: false, errors };

  return { ok: true, errors: [], data: { name, email, phone, subject, message } };
}

/**
 * Delivery seam. Replace the body with your provider call.
 *
 * @example Resend
 *   const { Resend } = await import('resend');
 *   await new Resend(process.env.RESEND_API_KEY).emails.send({
 *     from: 'site@apexintelligence.in',
 *     to: 'info@apexintelligence.in',
 *     replyTo: payload.email,
 *     subject: `Website enquiry — ${payload.subject}`,
 *     text: payload.message,
 *   });
 */
async function deliver(payload: ContactPayload): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Delivery failed with status ${res.status}`);
    return;
  }

  // No provider configured yet — surface it in the server logs so the
  // enquiry is not silently lost during setup.
  console.warn(
    '[contact] No CONTACT_WEBHOOK_URL configured; enquiry not delivered:',
    JSON.stringify({ ...payload, message: `${payload.message.slice(0, 80)}…` }),
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok || !result.data) {
    return NextResponse.json({ ok: false, error: result.errors.join('. ') }, { status: 422 });
  }

  try {
    await deliver(result.data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] delivery error:', err);
    return NextResponse.json(
      { ok: false, error: 'Could not send your message right now' },
      { status: 502 },
    );
  }
}
