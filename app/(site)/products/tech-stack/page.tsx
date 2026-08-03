import type { Metadata } from 'next';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';
import { techPrinciples, techStack } from '@/lib/work';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tech Stack — What We Build With',
  description:
    'The frontend, backend, data, ML, cloud and integration tools Apex Intelligence uses, and the reasoning behind each choice.',
  alternates: { canonical: '/products/tech-stack' },
  openGraph: {
    title: 'Tech Stack | Apex Intelligence',
    description: 'What we build with, and why we picked each piece.',
    url: '/products/tech-stack',
  },
};

export default function TechStackPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
        <LazyScene scene="lattice" />
        <div className="page-hero-content">
          <span className="section-tag">Tech Stack</span>
          <h1>
            What we build with
            <br />
            <span className="highlight">and why</span>
          </h1>
          <p>
            No stack is right for everything. Here is what we reach for by default, what we reach
            for when the default is wrong, and the reasoning in both cases.
          </p>
        </div>
      </section>

      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products">Work</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Tech Stack</span>
      </nav>

      {/* ── principles ── */}
      <section className="section">
        <div className="section-header reveal">
          <span className="section-tag">Principles</span>
          <h2 className="section-title">How we choose</h2>
          <p className="section-subtitle">
            Four rules that decide most of it. They are why our stack looks unexciting, which is
            the point.
          </p>
        </div>

        <div className="detail-steps depth-scene">
          {techPrinciples.map((p, i) => (
            <article
              key={p.title}
              className={`detail-step reveal-3d${i % 3 ? ` d${i % 3}` : ''}`}
              data-tilt
              data-tilt-max="5"
            >
              <div className="detail-step-head">
                <span className="detail-step-num">
                  <i className={p.icon} aria-hidden="true" />
                </span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── the stack ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header reveal">
          <span className="section-tag">The stack</span>
          <h2 className="section-title">Everything we use in production</h2>
          <p className="section-subtitle">
            If something is not on this list, we either have not needed it or would not recommend
            it to you.
          </p>
        </div>

        <div className="case-grid depth-scene">
          {techStack.map((group, i) => (
            <article
              key={group.title}
              className={`case-card reveal-3d${i % 3 ? ` d${i % 3}` : ''}`}
              data-tilt
              data-tilt-max="4"
            >
              <div className="case-card-head">
                <span className="case-sector">
                  <i className={group.icon} aria-hidden="true" /> {group.title}
                </span>
              </div>
              <div className="case-card-body">
                <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                  {group.blurb}
                </p>
                <ul className="detail-check" style={{ marginBottom: 0 }}>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <i className="fas fa-circle-check" aria-hidden="true" />
                      <span>
                        <strong style={{ color: 'var(--text-primary)' }}>{item.name}</strong>
                        {' — '}
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── ownership ── */}
      <section className="section">
        <div className="detail-split">
          <div className="detail-prose reveal">
            <span className="section-tag">Ownership</span>
            <h2 className="section-title">You own all of it</h2>
            <p>
              Every project ends with the code in your Git repository, the cloud accounts in your
              name, and no proprietary layer of ours sitting in the middle. If you decide to move
              to another team, nothing has to be asked of us first.
            </p>
            <p>
              That is deliberate. We would rather keep clients because the work is good than
              because leaving is expensive — which is also why 98% of AMC clients renew without
              being locked in.
            </p>
          </div>

          <aside className="detail-aside reveal-3d d1" data-tilt data-tilt-max="4">
            <h3>Every handover includes</h3>
            <ul className="detail-check">
              {[
                'Source code in your repository',
                'Cloud and domain accounts in your name',
                'Environment and deployment documentation',
                'A recorded training session',
                'Runbooks for the likely failures',
                '30 days of free fixes',
              ].map((item) => (
                <li key={item}>
                  <i className="fas fa-circle-check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/products/case-studies" className="sdc-cta">
              See it applied <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section detail-cta-section">
        <div className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <h2>Not sure what your project needs?</h2>
            <p>
              Tell us the problem rather than the technology. Recommending the stack is our job.
            </p>
          </div>
          <div className="detail-cta-actions">
            <Link href="/contact" className="cta-button">
              Get a recommendation
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
