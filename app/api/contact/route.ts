import { NextResponse } from 'next/server';

import { activeChannel, deliverEnquiry } from '@/lib/mailer';
import type { ContactPayload } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enquiry intake.
 *
 * Validates, screens for bots, rate-limits, then hands off to
 * lib/mailer.ts which emails info@apexintelligence.in and sends the
 * enquirer an acknowledgement.
 */

const MAX = { name: 120, email: 200, phone: 40, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

/**
 * In-memory sliding window — enough to stop a script hammering the form
 * from one address. It resets when the serverless instance recycles,
 * which is acceptable for this volume; put Upstash or similar in front
 * if the site ever needs a shared limit across instances.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: ContactPayload;
  /** Set when the submission looks automated. */
  bot?: boolean;
}

function validate(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: ['Malformed request body'] };
  }

  const raw = input as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');

  // Honeypot: a real person never sees this field, so anything in it is
  // a bot filling every input on the page.
  if (str('company')) return { ok: false, errors: [], bot: true };

  // Anything submitted in under three seconds was not typed by a human.
  const elapsed = Number(raw.elapsed);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 3000) {
    return { ok: false, errors: [], bot: true };
  }

  const name = str('name');
  const email = str('email');
  const phone = str('phone');
  const subject = str('subject');
  const message = str('message');

  if (!name) errors.push('Name is required');
  else if (name.length > MAX.name) errors.push('Name is too long');

  if (!email) errors.push('Email is required');
  else if (!EMAIL_RE.test(email)) errors.push('That email address looks invalid');
  else if (email.length > MAX.email) errors.push('Email is too long');

  if (phone.length > MAX.phone) errors.push('Phone is too long');

  if (!subject) errors.push('Subject is required');
  else if (subject.length > MAX.subject) errors.push('Subject is too long');

  if (!message) errors.push('Message is required');
  else if (message.length > MAX.message) errors.push('Message is too long');
  else if (message.length < 10) errors.push('Please add a little more detail');

  if (errors.length) return { ok: false, errors };

  return { ok: true, errors: [], data: { name, email, phone, subject, message } };
}

/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages from this connection. Please try again shortly.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = validate(body);

  // Bots get a success response. Telling them what tripped the filter
  // only helps them get past it next time.
  if (result.bot) {
    console.warn('[contact] discarded a submission that looked automated, ip:', ip);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!result.ok || !result.data) {
    return NextResponse.json({ ok: false, error: result.errors.join('. ') }, { status: 422 });
  }

  const meta = {
    receivedAt: new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date()),
    page: request.headers.get('referer') ?? undefined,
  };

  try {
    const delivery = await deliverEnquiry(result.data, meta);

    if (!delivery.delivered) {
      // Configuration problem, not the visitor's problem — but we must
      // not tell them it was sent when it was not.
      return NextResponse.json(
        {
          ok: false,
          error:
            'We could not send your message right now. Please call or WhatsApp us instead.',
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, acknowledged: delivery.acknowledged }, { status: 200 });
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not send your message right now. Please try again.' },
      { status: 502 },
    );
  }
}

/** Configuration check — does not expose credentials. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    channel: activeChannel(),
    configured: activeChannel() !== 'none',
  });
}
