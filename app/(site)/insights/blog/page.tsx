import type { Metadata } from 'next';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';
import { posts } from '@/lib/blog';
import { contact, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — Notes From the Team',
  description:
    'Practical writing on ERP, cloud cost, security, analytics and machine learning for Indian SMEs — from the people doing the work.',
  alternates: { canonical: '/insights/blog' },
  openGraph: {
    title: 'Blog | Apex Intelligence',
    description: 'Practical writing on ERP, cloud, security and analytics for Indian SMEs.',
    url: '/insights/blog',
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/insights/blog`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { '@type': 'Organization', name: siteConfig.name },
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
          <span className="section-tag">Blog</span>
          <h1>
            Notes from
            <br />
            <span className="highlight">the team</span>
          </h1>
          <p>
            What we have learned building software for businesses in Nashik and across
            Maharashtra. No thought leadership, just the things we end up explaining on calls.
          </p>
        </div>
      </section>

      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/insights">Insights</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Blog</span>
      </nav>

      {/* ── featured ── */}
      <section className="section">
        <div className="section-header reveal">
          <span className="section-tag">Latest</span>
          <h2 className="section-title">Most recent</h2>
        </div>

        <article className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <div className="post-tags" style={{ marginBottom: '0.9rem' }}>
              {featured.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h2 style={{ marginBottom: '0.75rem' }}>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <p className="post-date" style={{ marginTop: '1rem' }}>
              {featured.displayDate} · {featured.readTime}
            </p>
          </div>
        </article>
      </section>

      {/* ── archive ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header reveal">
          <span className="section-tag">Archive</span>
          <h2 className="section-title">Everything else</h2>
          <p className="section-subtitle">
            Eight more, newest first. Want one of these as a conversation instead? Call{' '}
            {contact.phoneDisplay}.
          </p>
        </div>

        <div className="post-list">
          {rest.map((post) => (
            <article key={post.id} className="post-row reveal">
              <div className="post-meta">
                <span className="post-date">{post.displayDate}</span>
                <span className="post-readtime">{post.readTime}</span>
              </div>

              <div className="post-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <span className="post-arrow" aria-hidden="true">
                <i className="fas fa-arrow-right" />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section detail-cta-section">
        <div className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <h2>Got a question one of these does not answer?</h2>
            <p>
              Ask it directly. We would rather have the conversation than write another article
              about it.
            </p>
          </div>
          <div className="detail-cta-actions">
            <Link href="/contact" className="cta-button">
              Ask us
            </Link>
            <Link href="/insights/faq" className="sdc-cta">
              Read the FAQ <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
