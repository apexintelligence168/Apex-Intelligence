'use client';

import { useState, type FormEvent } from 'react';

import type { ContactPayload, ContactStatus } from '@/types';

/**
 * Contact form — UI unchanged from the original markup.
 *
 * Submits JSON to the internal `/api/contact` route rather than posting
 * straight to a third-party endpoint. That keeps the provider (and its
 * credentials) on the server, where it can be swapped without touching
 * this component. See app/api/contact/route.ts.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? 'Request failed');
      }

      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  const submitting = status === 'submitting';

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          autoComplete="name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          Phone{' '}
          <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+91 XXXXX XXXXX"
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="e.g. ERP project for my business"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project..."
          required
        />
      </div>

      <button type="submit" className="submit-btn" id="submitBtn" disabled={submitting}>
        <span id="btnText">
          {submitting ? (
            <>
              <i className="fas fa-circle-notch fa-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane" aria-hidden="true" /> Send Message
            </>
          )}
        </span>
      </button>

      {/* Both panels are always in the DOM as live regions so screen
          readers announce the outcome without a focus jump. */}
      <div
        id="formSuccess"
        role="status"
        aria-live="polite"
        style={{
          display: status === 'success' ? 'block' : 'none',
          padding: '1rem',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: '8px',
          color: '#16a34a',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        <i className="fas fa-check-circle" aria-hidden="true" /> Message sent! We&apos;ll get back
        to you within 1 business day.
      </div>

      <div
        id="formError"
        role="alert"
        style={{
          display: status === 'error' ? 'block' : 'none',
          padding: '1rem',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '8px',
          color: '#dc2626',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        <i className="fas fa-exclamation-circle" aria-hidden="true" />{' '}
        {error ?? 'Something went wrong.'} Please try again or email us directly.
      </div>
    </form>
  );
}
