import type { Metadata } from 'next';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';

export const metadata: Metadata = {
  title: 'How We Work — Our Process',
  description:
    'Four steps, no surprises: discovery, design with a fixed quote, build with weekly demos, and launch with 30 days of hypercare.',
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'How We Work — Our Process | Apex Intelligence',
    description:
      'Four steps, no surprises: discovery, design with a fixed quote, build with weekly demos, and launch with 30 days of hypercare.',
    url: '/process',
  },
};

export default function ProcessPage() {
  return (
    <>
      {/* HERO */}
          <section className="process-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="process-hero-content">
                  <span className="section-tag">How We Work</span>
                  <h1>How a project<br /><span className="highlight">actually runs</span></h1>
                  <p>Four steps. Fixed price. Working demo in 14 days. No endless back-and-forth.</p>
              </div>
          </section>

          {/* GUARANTEES */}
          <section className="section">
              <div className="guarantees-grid depth-scene">
                  <div className="guarantee-card reveal-3d" data-tilt="" data-tilt-max="6">
                      <div className="guarantee-num">14</div>
                      <h4>Days to first demo</h4>
                      <p>You see working software within two weeks of starting, not wireframes or slide decks.</p>
                  </div>
                  <div className="guarantee-card reveal-3d d1" data-tilt="" data-tilt-max="6">
                      <div className="guarantee-num">Fixed</div>
                      <h4>Quote before we start</h4>
                      <p>You know the full cost before we write a single line of code.</p>
                  </div>
                  <div className="guarantee-card reveal-3d d2" data-tilt="" data-tilt-max="6">
                      <div className="guarantee-num">30</div>
                      <h4>Days of hypercare</h4>
                      <p>Every launch includes 30 days of free fixes, training, and support.</p>
                  </div>
              </div>
          </section>

          {/* TIMELINE */}
          <section className="section" style={{ background: 'var(--bg-secondary)', maxWidth: '100%', padding: '5rem 2rem' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div className="section-header reveal">
                      <span className="section-tag">The Process</span>
                      <h2 className="section-title">4 steps, no surprises</h2>
                      <p className="section-subtitle">Every project follows the same path. You always know where things stand.</p>
                  </div>
                  <div className="timeline">

                      <div className="timeline-step reveal-3d">
                          <div className="step-num-wrap">
                              <div className="step-num">1</div>
                              <span className="step-duration">Day 1–3</span>
                          </div>
                          <div className="step-body">
                              <span className="step-tag">Discovery</span>
                              <h3>Step 1: We understand your business</h3>
                              <p>We start with a site visit or video call. We look at your workflows, your data, and what you actually need the software to do. We write it all down and share it back with you before anything else happens.</p>
                              <div className="step-deliverables">
                                  <span className="deliverable"><i className="fas fa-circle"></i> Workflow map</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Data source audit</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Success metrics defined</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Scope document</span>
                              </div>
                          </div>
                      </div>

                      <div className="timeline-step reveal-3d d1">
                          <div className="step-num-wrap">
                              <div className="step-num">2</div>
                              <span className="step-duration">Day 4–7</span>
                          </div>
                          <div className="step-body">
                              <span className="step-tag">Design</span>
                              <h3>Step 2: Wireframes and a fixed price</h3>
                              <p>We turn the notes into clickable screens and a fixed quote. You approve every screen before we start building. Changes at this stage cost nothing. Changes after development starts cost time and money, so we get this right first.</p>
                              <div className="step-deliverables">
                                  <span className="deliverable"><i className="fas fa-circle"></i> Clickable wireframes</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Fixed-price quote</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Tech stack decision</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Timeline with milestones</span>
                              </div>
                          </div>
                      </div>

                      <div className="timeline-step reveal-3d d2">
                          <div className="step-num-wrap">
                              <div className="step-num">3</div>
                              <span className="step-duration">Week 2–N</span>
                          </div>
                          <div className="step-body">
                              <span className="step-tag">Build</span>
                              <h3>Step 3: We build and show you every week</h3>
                              <p>Development runs in weekly sprints. Every Friday you see what&apos;s been built. Real software, not status updates. We connect Tally, POS, legacy SQL, and third-party APIs in this phase.</p>
                              <div className="step-deliverables">
                                  <span className="deliverable"><i className="fas fa-circle"></i> Weekly working demos</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> System integrations</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> QA & security testing</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Staging environment</span>
                              </div>
                          </div>
                      </div>

                      <div className="timeline-step reveal-3d d3">
                          <div className="step-num-wrap">
                              <div className="step-num">4</div>
                              <span className="step-duration">Launch + 30d</span>
                          </div>
                          <div className="step-body">
                              <span className="step-tag">Launch</span>
                              <h3>Step 4: Launch and 30 days of free support</h3>
                              <p>We go live, train your team on-site, and hand over full documentation. For the next 30 days we fix anything that comes up at no extra cost. After that, most clients move to an AMC for ongoing updates and support.</p>
                              <div className="step-deliverables">
                                  <span className="deliverable"><i className="fas fa-circle"></i> Production deployment</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> On-site team training</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> Full documentation</span>
                                  <span className="deliverable"><i className="fas fa-circle"></i> 30-day free support</span>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </section>

          {/* COMPARISON */}
          <section className="section">
              <div className="section-header reveal">
                  <span className="section-tag">Why it works</span>
                  <h2 className="section-title">Us vs. a typical agency</h2>
                  <p className="section-subtitle">Most agencies make the process complicated. We keep it simple.</p>
              </div>
              <div className="reveal" style={{ overflowX: 'auto' }}>
                  <table className="compare-table">
                      <thead>
                          <tr>
                              <th>What clients care about</th>
                              <th>Apex Intelligence</th>
                              <th>Typical Agency</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Fixed price before development</td>
                              <td><i className="fas fa-check"></i> Always</td>
                              <td><i className="fas fa-times"></i> Rarely</td>
                          </tr>
                          <tr>
                              <td>Working demo within 14 days</td>
                              <td><i className="fas fa-check"></i> Guaranteed</td>
                              <td><i className="fas fa-times"></i> Weeks of planning first</td>
                          </tr>
                          <tr>
                              <td>Co-founder on every call</td>
                              <td><i className="fas fa-check"></i> Yes</td>
                              <td><i className="fas fa-times"></i> Account manager</td>
                          </tr>
                          <tr>
                              <td>On-site support in Maharashtra</td>
                              <td><i className="fas fa-check"></i> Yes</td>
                              <td><i className="fas fa-times"></i> Remote only</td>
                          </tr>
                          <tr>
                              <td>30-day post-launch hypercare</td>
                              <td><i className="fas fa-check"></i> Included</td>
                              <td><i className="fas fa-times"></i> Billed separately</td>
                          </tr>
                          <tr>
                              <td>Full documentation & training</td>
                              <td><i className="fas fa-check"></i> Included</td>
                              <td><i className="fas fa-times"></i> Optional add-on</td>
                          </tr>
                          <tr>
                              <td>AMC renewal rate</td>
                              <td><i className="fas fa-check"></i> 98%</td>
                              <td>Industry avg ~60%</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </section>

          {/* CTA */}
          <div className="process-cta reveal">
              <h2>Want to get started?</h2>
              <p>Book a free 30-minute call. We&apos;ll look at your situation and give you an honest answer, no sales pitch.</p>
              <Link href="/contact" className="cta-btn-white">Book a free call <i className="fas fa-arrow-right"></i></Link>
          </div>
    </>
  );
}
