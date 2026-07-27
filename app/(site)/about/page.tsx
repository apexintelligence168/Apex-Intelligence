import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Four engineers from Nashik building software people actually use. Learn how Apex Intelligence works, what we value, and who we build for.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Apex Intelligence',
    description:
      'Four engineers from Nashik building software people actually use. Learn how Apex Intelligence works, what we value, and who we build for.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
          <section className="about-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="about-hero-content">
                  <span className="section-tag">About Apex Intelligence</span>
                  <h1>We build software<br /><span className="highlight">people actually use</span></h1>
                  <p>Four engineers from Nashik who got tired of watching businesses run on broken tools and endless spreadsheets. So we started building better ones.</p>
                  <div className="hero-badges">
                      <span className="hero-badge-pill"><i className="fas fa-map-marker-alt"></i> Nashik, Maharashtra</span>
                      <span className="hero-badge-pill"><i className="fas fa-calendar"></i> Founded 2025</span>
                      <span className="hero-badge-pill"><i className="fas fa-users"></i> 4 Co-founders</span>
                      <span className="hero-badge-pill"><i className="fas fa-star"></i> 120+ Deployments</span>
                  </div>
              </div>
          </section>

          {/* MISSION */}
          <div className="mission-band">
              <h2>&quot;Software should work for the people using it, not the other way around.&quot;</h2>
              <p>That&apos;s what we keep coming back to on every project.</p>
          </div>

          {/* STORY */}
          <section className="section">
              <div className="story-grid">
                  <div className="story-img reveal">
                      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" alt="Apex Intelligence team" width={900} height={600} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                  </div>
                  <div className="story-content reveal">
                      <span className="section-tag">Our Story</span>
                      <h2>From a Nashik office to 120+ projects delivered</h2>
                      <p>We started Apex Intelligence in 2025 after seeing the same problem everywhere: expensive software that nobody actually used. Vendors who disappeared after launch. Systems that needed a consultant just to run a report.</p>
                      <p>We work with clients in retail, construction, hospitality, and telecom. We build their websites, ERP systems, dashboards, and cloud setups. Our 98% AMC renewal rate means clients keep us around because the software keeps working.</p>
                      <ul className="story-list">
                          <li><i className="fas fa-check-circle"></i> A co-founder is on every project, not a junior developer</li>
                          <li><i className="fas fa-check-circle"></i> You get a fixed price before we write any code</li>
                          <li><i className="fas fa-check-circle"></i> Working demo within 14 days of starting</li>
                          <li><i className="fas fa-check-circle"></i> 30 days of free support after every launch</li>
                          <li><i className="fas fa-check-circle"></i> On-site visits across Maharashtra</li>
                      </ul>
                  </div>
              </div>

              {/* STATS */}
              <div className="stats-row">
                  <div className="stat-box reveal">
                      <div className="stat-box-num">120+</div>
                      <div className="stat-box-lbl">Enterprise Deployments</div>
                  </div>
                  <div className="stat-box reveal">
                      <div className="stat-box-num">98%</div>
                      <div className="stat-box-lbl">AMC Renewal Rate</div>
                  </div>
                  <div className="stat-box reveal">
                      <div className="stat-box-num">2025</div>
                      <div className="stat-box-lbl">Est. Year</div>
                  </div>
                  <div className="stat-box reveal">
                      <div className="stat-box-num">14</div>
                      <div className="stat-box-lbl">Days to First Demo</div>
                  </div>
              </div>
          </section>

          {/* VALUES */}
          <section className="section" style={{ background: 'var(--bg-secondary)', maxWidth: '100%', padding: '5rem 2rem' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div className="section-header reveal">
                      <span className="section-tag">What drives us</span>
                      <h2 className="section-title">How we work</h2>
                      <p className="section-subtitle">Six things that matter to us on every project.</p>
                  </div>
                  <div className="values-grid depth-scene">
                      <div className="value-card reveal-3d" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-bullseye"></i></div>
                          <h3>Results over features</h3>
                          <p>We care about whether the software actually helps your business, not how many features it has.</p>
                      </div>
                      <div className="value-card reveal-3d d1" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-handshake"></i></div>
                          <h3>No hidden costs</h3>
                          <p>Fixed quotes, weekly updates, no surprise invoices. You always know what&apos;s happening and what it costs.</p>
                      </div>
                      <div className="value-card reveal-3d d2" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-shield-alt"></i></div>
                          <h3>We write code that lasts</h3>
                          <p>Clean, documented, and trainable. Your team should be able to use and extend the system without calling us every time.</p>
                      </div>
                      <div className="value-card reveal-3d d3" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-bolt"></i></div>
                          <h3>Fast start</h3>
                          <p>You see a working demo within 14 days. Not a presentation, not a prototype. Something you can actually click through.</p>
                      </div>
                      <div className="value-card reveal-3d d4" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-users"></i></div>
                          <h3>Talk to the founders</h3>
                          <p>You deal with us directly. No account managers, no handoffs to someone who wasn&apos;t on the original call.</p>
                      </div>
                      <div className="value-card reveal-3d d5" data-tilt="" data-tilt-max="6">
                          <div className="value-icon"><i className="fas fa-leaf"></i></div>
                          <h3>AI only where it helps</h3>
                          <p>We add ML and AI when it saves real time. If a simpler solution works better, we use that instead.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* WHY US */}
          <section className="section">
              <div className="section-header reveal">
                  <span className="section-tag">Why Apex Intelligence</span>
                  <h2 className="section-title">Why clients pick us</h2>
                  <p className="section-subtitle">We&apos;re not a large agency and we&apos;re not a freelancer. We&apos;re a small team that takes full ownership of what we build.</p>
              </div>
              <div className="why-grid">
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-map-marker-alt"></i></div>
                      <div>
                          <h4>We&apos;re based in Nashik</h4>
                          <p>We can come to your office. For kickoffs, training, and go-live days, we show up in person across Maharashtra.</p>
                      </div>
                  </div>
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-file-invoice-dollar"></i></div>
                      <div>
                          <h4>Fixed price, always</h4>
                          <p>Every project is scoped and priced before we start. If scope changes, we talk about it openly before touching the budget.</p>
                      </div>
                  </div>
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-bolt"></i></div>
                      <div>
                          <h4>Demo in 14 days</h4>
                          <p>Two weeks after kickoff you&apos;ll see something working. This keeps the project honest and catches problems early.</p>
                      </div>
                  </div>
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-headset"></i></div>
                      <div>
                          <h4>98% AMC renewal</h4>
                          <p>Clients keep renewing because the software keeps working. Support after launch is part of the job, not an add-on.</p>
                      </div>
                  </div>
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-code-branch"></i></div>
                      <div>
                          <h4>Everything in-house</h4>
                          <p>Design, frontend, backend, ML, and cloud. We don&apos;t subcontract. The team you meet is the team that builds it.</p>
                      </div>
                  </div>
                  <div className="why-item reveal">
                      <div className="why-icon"><i className="fas fa-graduation-cap"></i></div>
                      <div>
                          <h4>Training included</h4>
                          <p>We train your team before we leave and hand over full documentation. You shouldn&apos;t need us to run your own system.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* CTA */}
          <div className="about-cta reveal">
              <h2>Want to work with us?</h2>
              <p>Book a free 30-minute call. We&apos;ll look at your workflow and tell you honestly what we can and can&apos;t do for you.</p>
              <Link href="/contact" className="cta-btn-white">Book a free call <i className="fas fa-arrow-right"></i></Link>
          </div>
    </>
  );
}
