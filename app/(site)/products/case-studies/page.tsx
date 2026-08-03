import type { Metadata } from 'next';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';
import { caseStudies } from '@/lib/work';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Case Studies — Work We Have Shipped',
  description:
    'Six projects across retail, e-commerce, construction, manufacturing, hospitality and healthcare — the problem, the approach and what changed.',
  alternates: { canonical: '/products/case-studies' },
  openGraph: {
    title: 'Case Studies | Apex Intelligence',
    description:
      'Six projects across retail, e-commerce, construction, manufacturing, hospitality and healthcare.',
    url: '/products/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
        <LazyScene scene="lattice" />
        <div className="page-hero-content">
          <span className="section-tag">Case Studies</span>
          <h1>
            What we built
            <br />
            <span className="highlight">and what changed</span>
          </h1>
          <p>
            Six projects, described the way we would describe them to you on a call — the problem,
            what we did, and what was different afterwards.
          </p>
        </div>
      </section>

      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products">Work</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Case Studies</span>
      </nav>

      <section className="section">
        <div className="section-header reveal">
          <span className="section-tag">A note on names</span>
          <h2 className="section-title">Sectors, not logos</h2>
          <p className="section-subtitle">
            Most of this is internal software, and the businesses would rather not publish how
            their operations run. Sector, scale and outcome are real; the names are withheld. We
            are happy to arrange a reference call.
          </p>
        </div>

        <div className="case-grid depth-scene">
          {caseStudies.map((study, i) => (
            <article
              key={study.id}
              className={`case-card reveal-3d${i % 3 ? ` d${i % 3}` : ''}`}
              data-tilt
              data-tilt-max="4"
            >
              <div className="case-card-head">
                <span className="case-sector">{study.sector}</span>
                <span className="case-place">{study.place}</span>
              </div>

              <div className="case-card-body">
                <h3>{study.title}</h3>

                <div className="case-block">
                  <span className="case-block-label">The problem</span>
                  <p>{study.challenge}</p>
                </div>

                <div className="case-block">
                  <span className="case-block-label">What we did</span>
                  <p>{study.approach}</p>
                </div>

                <div className="case-block">
                  <span className="case-block-label">What changed</span>
                  <p>{study.outcome}</p>
                </div>

                <div className="case-results">
                  {study.results.map((r) => (
                    <div key={r.label}>
                      <span className="case-result-value">{r.value}</span>
                      <span className="case-result-label">{r.label}</span>
                    </div>
                  ))}
                </div>

                <div className="case-stack">
                  {study.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <p style={{ marginTop: '1.25rem' }}>
                  <Link href={study.service.href} className="sdc-cta">
                    {study.service.label} <i className="fas fa-arrow-right" aria-hidden="true" />
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section detail-cta-section">
        <div className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <h2>Want to talk to one of them?</h2>
            <p>
              We can usually arrange a reference call with a client in your sector. Ask when you
              get in touch.
            </p>
          </div>
          <div className="detail-cta-actions">
            <Link href="/contact" className="cta-button">
              Start a project
            </Link>
            <a href={contact.phoneHref} className="sdc-cta">
              <i className="fas fa-phone" aria-hidden="true" /> {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
