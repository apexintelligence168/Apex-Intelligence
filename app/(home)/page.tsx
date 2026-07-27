import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import HomeBodyClass from '@/components/home/HomeBodyClass';
import HomeChrome from '@/components/home/HomeChrome';
import ServicesGrid from '@/components/home/ServicesGrid';
import LazyScene from '@/components/three/LazyScene';
import PageEffects from '@/components/layout/PageEffects';
import { siteConfig } from '@/lib/site';

import '@/styles/home.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/insights?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data must be inline JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <HomeBodyClass />
      <HomeChrome />
      <HomeHeader />

      <main>
        {/* ================= HERO (WebGL scene: core) ================= */}
        <section id="home" className="hero" data-apex-3d="core">
                <LazyScene scene="core" />
          <div className="hero-aurora">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="hero-inner reveal">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Est. 2025 &nbsp;&middot;&nbsp; Nashik, India &nbsp;&middot;&nbsp; 120+ Projects
            </div>

            <h1>
              Software that<br />
              <span className="line-grad">actually works</span><br />
              for your business.
            </h1>

            <p className="lead">Websites, ERP systems, ML tools &amp; cloud infrastructure &mdash; quoted upfront, demoed in 14 days, supported long after launch.</p>

            <div className="hero-buttons">
              <Link href="/contact" className="primary-btn">Book a free call <i className="fas fa-arrow-right"></i></Link>
              <Link href="/products" className="secondary-btn">See our work <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="hero-services">
              <span className="hero-svc-pill"><i className="fas fa-globe"></i> Web Dev</span>
              <span className="hero-svc-pill"><i className="fas fa-layer-group"></i> ERP Systems</span>
              <span className="hero-svc-pill"><i className="fas fa-brain"></i> Machine Learning</span>
              <span className="hero-svc-pill"><i className="fas fa-chart-line"></i> Analytics</span>
              <span className="hero-svc-pill"><i className="fas fa-cloud"></i> Cloud &amp; DevOps</span>
              <span className="hero-svc-pill"><i className="fas fa-tools"></i> AMC Support</span>
            </div>
          </div>

          <div className="hero-stats-bar reveal reveal-delay-2">
            <div className="hero-stats-bar-item">
              <div className="hero-stats-bar-num" data-count="120" data-suffix="+">0+</div>
              <div className="hero-stats-bar-lbl">Projects Delivered</div>
            </div>
            <div className="hero-stats-bar-item">
              <div className="hero-stats-bar-num" data-count="98" data-suffix="%">0%</div>
              <div className="hero-stats-bar-lbl">AMC Renewal Rate</div>
            </div>
            <div className="hero-stats-bar-item">
              <div className="hero-stats-bar-num" data-count="4">0</div>
              <div className="hero-stats-bar-lbl">Founders on Every Call</div>
            </div>
            <div className="hero-stats-bar-item">
              <div className="hero-stats-bar-num" data-count="14">0</div>
              <div className="hero-stats-bar-lbl">Days to First Demo</div>
            </div>
          </div>
        </section>

        {/* ================= TRUST ================= */}
        <section className="trust-section" aria-label="Industries we work with">
          <p className="trust-label">Built for businesses across every industry</p>
          <div className="logo-marquee">
            <div className="logo-track">
              <span className="client-logo">Retail &amp; E-commerce</span>
              <span className="client-logo">Construction &amp; Real Estate</span>
              <span className="client-logo">Hospitality</span>
              <span className="client-logo">Healthcare</span>
              <span className="client-logo">Manufacturing</span>
              <span className="client-logo">Telecom</span>
              <span className="client-logo">Retail &amp; E-commerce</span>
              <span className="client-logo">Construction &amp; Real Estate</span>
              <span className="client-logo">Hospitality</span>
              <span className="client-logo">Healthcare</span>
              <span className="client-logo">Manufacturing</span>
              <span className="client-logo">Telecom</span>
            </div>
          </div>
        </section>

        <div className="dim-divider"><span className="dim-line"></span>Sheet 02 — Company<span className="dim-line"></span></div>

        {/* ================= ABOUT ================= */}
        <section id="about" className="section-frame">
          <span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span>
          <div className="section-header reveal">
            <div className="eyebrow">Who we are</div>
            <h2 className="section-title">A software company from Nashik</h2>
            <p className="section-subtitle">We started in 2025 because most software vendors were too slow, too expensive, or too far away to care.</p>
          </div>
          <div className="about-grid depth-scene">
            <div className="figure-frame reveal-3d" data-tilt="" data-tilt-max="6" data-tilt-lift="14">
              <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" alt="Innovation and technology" width={900} height={600} priority sizes="(max-width: 760px) 100vw, 50vw" />
              <div className="figure-caption"><span>FIG. 01 — Studio, Nashik</span><span>Scale 1:1</span></div>
            </div>
            <div className="about-content reveal-3d d1">
              <h3>What we do</h3>
              <p>We build e-commerce sites, ERP systems, ML tools, analytics dashboards, and cloud setups. Everything is quoted upfront and you get a working demo within 14 days of starting.</p>
              <ul className="about-list">
                <li>E-commerce stores, admin panels, order systems</li>
                <li>ERP, analytics and ML</li>
                <li>Cloud, DevOps and AMC support</li>
                <li>On-site visits across Maharashtra</li>
              </ul>
              <div className="about-links">
                <Link className="ghost-link" href="/services"><i className="fas fa-layer-group"></i> View services</Link>
                <Link className="ghost-link" href="/products"><i className="fas fa-briefcase"></i> Case studies</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="dim-divider"><span className="dim-line"></span>Sheet 03 — Modules<span className="dim-line"></span></div>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section-frame">
          <span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span>
          <div className="section-header reveal">
            <div className="eyebrow">Services</div>
            <h2 className="section-title">What we build</h2>
            <p className="section-subtitle">From a basic business website to a full ERP with integrations, we handle the whole thing.</p>
          </div>
          <ServicesGrid />
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="testimonial-section">
          <div className="section-frame">
            <div className="section-header reveal">
              <div className="eyebrow">Clients</div>
              <h2 className="section-title">What clients say</h2>
              <p className="section-subtitle">Feedback from businesses we&apos;ve worked with.</p>
            </div>
            <div className="testimonial-grid depth-scene">
              <div className="testimonial-card reveal-3d" data-tilt="" data-tilt-max="5">
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>&quot;Working demo in under 2 weeks. The ERP replaced 4 tools we were juggling. Our team uses it every single day.&quot;</blockquote>
                <div className="testimonial-author lift-1">
                  <div className="author-avatar">OH</div>
                  <div className="author-info"><strong>Operations Head</strong><span>Retail Client, Nashik</span></div>
                </div>
              </div>
              <div className="testimonial-card reveal-3d d1" data-tilt="" data-tilt-max="5">
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>&quot;Site and admin panel live in 3 weeks. Order tracking, inventory sync, all of it works. Best money we&apos;ve spent on tech.&quot;</blockquote>
                <div className="testimonial-author lift-1">
                  <div className="author-avatar">EC</div>
                  <div className="author-info"><strong>Founder</strong><span>E-commerce Client</span></div>
                </div>
              </div>
              <div className="testimonial-card reveal-3d d2" data-tilt="" data-tilt-max="5">
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>&quot;The dashboard shows us live data across all our sites. Renewed the AMC straight away, no hesitation.&quot;</blockquote>
                <div className="testimonial-author lift-1">
                  <div className="author-avatar">CC</div>
                  <div className="author-info"><strong>Director</strong><span>Construction Client</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section-frame" style={{ paddingTop: '5.5rem' }}>
          <div className="cta-band reveal-3d">
            <div>
              <h2>Have a project in mind?</h2>
              <p>Send us a brief or book a call. We&apos;ll come back with a clear plan and a fixed price, usually the same day.</p>
              <div className="hero-buttons" style={{ marginTop: '1.6rem', marginBottom: '0', justifyContent: 'flex-start' }}>
                <Link href="/contact" className="primary-btn">Contact us <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <svg className="stamp float-slow" viewBox="0 0 108 108" aria-hidden="true">
              <g className="stamp-rotate">
                <circle cx="54" cy="54" r="50" fill="none" stroke="var(--amber)" strokeWidth="1.4" strokeDasharray="3 4" />
                <path id="stampCircle" d="M54,54 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
                <text fontFamily="IBM Plex Mono" fontSize="8.4" fill="var(--amber)" letterSpacing="2">
                  <textPath href="#stampCircle" startOffset="2%">READY TO BUILD • FIXED QUOTE • 14 DAY DEMO •</textPath>
                </text>
              </g>
              <text x="54" y="58" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="700" fontSize="13" fill="var(--amber)">GO</text>
            </svg>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
      </main>

      <HomeFooter />
      <PageEffects />
    </>
  );
}
