import type { Metadata } from 'next';
import Link from 'next/link';

import FaqAccordion from '@/components/sections/FaqAccordion';
import LazyScene from '@/components/three/LazyScene';
import { allFaqs, faqGroups } from '@/lib/faq';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ — Questions We Get Asked',
  description:
    'Costs, timelines, code ownership, integrations, support and response times — answered plainly, before you have to ask.',
  alternates: { canonical: '/insights/faq' },
  openGraph: {
    title: 'FAQ | Apex Intelligence',
    description: 'Costs, timelines, ownership, integrations and support — answered plainly.',
    url: '/insights/faq',
  },
};

export default function FaqPage() {
  /** FAQPage schema — these can surface directly in search results. */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data must be inline JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="page-hero" data-apex-3d="lattice">
        <LazyScene scene="lattice" />
        <div className="page-hero-content">
          <span className="section-tag">FAQ</span>
          <h1>
            Questions we get
            <br />
            <span className="highlight">before every project</span>
          </h1>
          <p>
            {allFaqs.length} answers covering cost, timelines, ownership, integrations and
            support. If yours is not here, call {contact.phoneDisplay} and ask.
          </p>
        </div>
      </section>

      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/insights">Insights</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">FAQ</span>
      </nav>

      {/* ── section jump links ── */}
      <section className="section detail-facts-section">
        {/* five columns, but only where five columns fit — the count is
            handled in detail.css, not inline, so the media queries win */}
        <div className="detail-facts detail-facts-five depth-scene">
          {faqGroups.map((group, i) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className={`detail-fact reveal-3d${i % 4 ? ` d${i % 4}` : ''}`}
              data-tilt
              data-tilt-max="5"
              style={{ textDecoration: 'none' }}
            >
              <span className="detail-fact-label">
                <i className={group.icon} aria-hidden="true" /> {group.items.length} answers
              </span>
              <strong className="detail-fact-value">{group.title}</strong>
            </a>
          ))}
        </div>
      </section>

      {/* ── grouped questions ── */}
      {faqGroups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          className="section"
          style={i % 2 === 1 ? { background: 'var(--bg-secondary)' } : undefined}
        >
          <div className="section-header reveal">
            <span className="section-tag">
              <i className={group.icon} aria-hidden="true" /> {group.title}
            </span>
            <h2 className="section-title">{group.title}</h2>
            <p className="section-subtitle">{group.intro}</p>
          </div>
          <FaqAccordion items={group.items} />
        </section>
      ))}

      <section className="section detail-cta-section">
        <div className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <h2>Still have a question?</h2>
            <p>
              Call, WhatsApp or send a brief. You will get a straight answer from someone who
              would be working on the project, not a sales rep.
            </p>
          </div>
          <div className="detail-cta-actions">
            <Link href="/contact" className="cta-button">
              Ask us directly
            </Link>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="sdc-cta">
              <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
