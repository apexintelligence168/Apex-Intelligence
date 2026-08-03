import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import FaqAccordion from '@/components/sections/FaqAccordion';
import LazyScene from '@/components/three/LazyScene';
import { faqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Insights — Blog & FAQ',
  description:
    'Practical articles on ERP, cloud and security, plus answers to the questions businesses ask us most often.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights — Blog & FAQ | Apex Intelligence',
    description:
      'Practical articles on ERP, cloud and security, plus answers to the questions businesses ask us most often.',
    url: '/insights',
  },
};

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="page-hero-content">
                  <span className="section-tag">Knowledge</span>
                  <h1>Notes from<br /><span className="highlight">the team</span></h1>
                  <p>Things we&apos;ve learned building software for businesses in Nashik and across India.</p>
              </div>
          </section>

      <nav className="detail-breadcrumb" aria-label="Section">
        <Link href="/insights/blog">All articles</Link>
        <span aria-hidden="true">/</span>
        <Link href="/insights/faq">Full FAQ</Link>
      </nav>

          <section id="blog" className="section">
              <div className="section-header reveal">
                  <span className="section-tag">Blog</span>
                  <h2 className="section-title">Blog</h2>
                  <p className="section-subtitle">Short posts on things we run into while building.</p>
              </div>
              <div className="blog-grid depth-scene">
                  <div className="blog-card reveal-3d" data-tilt="" data-tilt-max="6">
                      <div className="blog-image">
                          <Image src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" alt="ERP" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      </div>
                      <div className="blog-content">
                          <div className="blog-date">Jan 2025</div>
                          <h3>How we build e-commerce sites that don&apos;t break under load</h3>
                          <p>What we&apos;ve learned from building stores with admin panels, order handling, and payment integrations for retail clients.</p>
                          <a href="#" className="blog-read-more">Read More →</a>
                      </div>
                  </div>
                  <div className="blog-card reveal-3d d1" data-tilt="" data-tilt-max="6">
                      <div className="blog-image">
                          <Image src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80" alt="Cloud" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      </div>
                      <div className="blog-content">
                          <div className="blog-date">Mar 2025</div>
                          <h3>Moving a business to the cloud without the drama</h3>
                          <p>A practical look at what actually goes wrong when businesses migrate to AWS or Azure, and how we handle it.</p>
                          <a href="#" className="blog-read-more">Read More →</a>
                      </div>
                  </div>
                  <div className="blog-card reveal-3d d2" data-tilt="" data-tilt-max="6">
                      <div className="blog-image">
                          <Image src="https://images.unsplash.com/photo-1563986768496-4da905aed4f7?auto=format&fit=crop&w=600&q=80" alt="Security" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      </div>
                      <div className="blog-content">
                          <div className="blog-date">May 2025</div>
                          <h3>When ERP and analytics actually talk to each other</h3>
                          <p>What changes when your ERP data feeds directly into your Power BI dashboard instead of living in separate spreadsheets.</p>
                          <a href="#" className="blog-read-more">Read More →</a>
                      </div>
                  </div>
              </div>
          </section>

          <section id="faq" className="section" style={{ background: 'var(--bg-secondary)' }}>
              <div className="section-header reveal">
                  <span className="section-tag">FAQ</span>
                  <h2 className="section-title">Questions we get asked a lot</h2>
                  <p className="section-subtitle">Honest answers before you pick up the phone.</p>
              </div>
              <FaqAccordion items={faqs} />
          </section>
    </>
  );
}
