import type { Metadata } from 'next';
import Link from 'next/link';

import LazyScene from '@/components/three/LazyScene';

export const metadata: Metadata = {
  title: 'Services — Web Dev, ERP, ML, Analytics & More',
  description:
    'Web development, ERP systems, machine learning, data analytics, cloud & DevOps, and AMC support. All in-house, all from Nashik.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Web Dev, ERP, ML, Analytics & More | Apex Intelligence',
    description:
      'Web development, ERP systems, machine learning, data analytics, cloud & DevOps, and AMC support. All in-house, all from Nashik.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="page-hero-content">
                  <span className="section-tag">What We Do</span>
                  <h1>What we build<br /><span className="highlight">and how we do it</span></h1>
                  <p>Web, ERP, ML, analytics, cloud, and maintenance. All in-house, all from Nashik.</p>
              </div>
          </section>

          <section className="section">
              <div className="services-detail-grid depth-scene">

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="web">
                      <div className="sdc-icon"><i className="fas fa-globe"></i></div>
                      <div className="sdc-body">
                          <h3>Web Development</h3>
                          <p>Online stores, admin panels, order tracking systems, and custom portals. We handle design, development, and launch end to end.</p>
                          <ul className="sdc-list">
                              <li>E-commerce Websites & Stores</li>
                              <li>Admin Panels & Dashboards</li>
                              <li>Order Handling & Tracking Systems</li>
                              <li>Custom CMS & Content Portals</li>
                              <li>Payment Gateway Integration</li>
                              <li>Mobile-Responsive Design</li>
                          </ul>
                          <Link href="/services/web-development" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="apps">
                      <div className="sdc-icon"><i className="fas fa-cube"></i></div>
                      <div className="sdc-body">
                          <h3>Enterprise App Development</h3>
                          <p>Custom web, mobile, and desktop apps built for how your business actually works. We handle UI, backend, APIs, and deployment.</p>
                          <ul className="sdc-list">
                              <li>Web & Mobile Applications</li>
                              <li>Cross-platform with Flutter & React Native</li>
                              <li>REST & GraphQL APIs</li>
                              <li>Progressive Web Apps (PWA)</li>
                          </ul>
                          <Link href="/services/enterprise-apps" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="erp">
                      <div className="sdc-icon"><i className="fas fa-layer-group"></i></div>
                      <div className="sdc-body">
                          <h3>ERP Systems & Integration</h3>
                          <p>Custom ERP that connects with Tally, POS, and your existing systems. Inventory, HR, payroll, and finance all in one place.</p>
                          <ul className="sdc-list">
                              <li>Custom ERP Development</li>
                              <li>Tally & POS Integration</li>
                              <li>Inventory & Supply Chain Modules</li>
                              <li>HR, Payroll & Finance Automation</li>
                          </ul>
                          <Link href="/services/erp-systems" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="ml">
                      <div className="sdc-icon"><i className="fas fa-brain"></i></div>
                      <div className="sdc-body">
                          <h3>Machine Learning Solutions</h3>
                          <p>Predictive models, image recognition, NLP, and recommendation systems. We only add AI where it saves you real time, not just to look impressive.</p>
                          <ul className="sdc-list">
                              <li>Predictive Analytics</li>
                              <li>Computer Vision & Image Recognition</li>
                              <li>NLP & Chatbots</li>
                              <li>Recommendation Engines</li>
                          </ul>
                          <Link href="/services/machine-learning" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="analytics">
                      <div className="sdc-icon"><i className="fas fa-chart-line"></i></div>
                      <div className="sdc-body">
                          <h3>Data Analytics & BI</h3>
                          <p>Power BI and Tableau dashboards, data pipelines, and live reports. See what&apos;s happening in your business without waiting for a weekly summary.</p>
                          <ul className="sdc-list">
                              <li>Power BI & Tableau Dashboards</li>
                              <li>Data Warehousing & ETL Pipelines</li>
                              <li>Real-time Reporting</li>
                              <li>Sales & Operations Analytics</li>
                          </ul>
                          <Link href="/services/data-analytics" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="cloud">
                      <div className="sdc-icon"><i className="fas fa-cloud"></i></div>
                      <div className="sdc-body">
                          <h3>Cloud Infrastructure & DevOps</h3>
                          <p>AWS, Azure, and GCP setup with Docker, Kubernetes, and CI/CD pipelines. We set it up properly so it doesn&apos;t break at 2am.</p>
                          <ul className="sdc-list">
                              <li>AWS / Azure / GCP Setup</li>
                              <li>Docker & Kubernetes</li>
                              <li>CI/CD Pipelines</li>
                              <li>Infrastructure as Code (Terraform)</li>
                          </ul>
                          <Link href="/services/cloud-devops" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>

                  <div className="service-detail-card reveal-3d" data-tilt="" data-tilt-max="4" id="maintenance">
                      <div className="sdc-icon"><i className="fas fa-tools"></i></div>
                      <div className="sdc-body">
                          <h3>Maintenance & Support (AMC)</h3>
                          <p>Bug fixes, updates, server monitoring, and on-site visits when needed. 98% of our clients renew every year because it actually works.</p>
                          <ul className="sdc-list">
                              <li>Annual Maintenance Contracts (AMC)</li>
                              <li>Bug Fixes & Feature Updates</li>
                              <li>Server & Uptime Monitoring</li>
                              <li>Performance Optimization</li>
                              <li>Security Patches & Backups</li>
                              <li>On-site Support (Maharashtra)</li>
                          </ul>
                          <Link href="/services/maintenance-amc" className="sdc-cta">Read more <i className="fas fa-arrow-right"></i></Link>
                      </div>
                  </div>



              </div>
          </section>

          <section className="section" style={{ paddingTop: '0' }}>
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg,var(--primary-dark),var(--primary-color))', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: '0', background: 'radial-gradient(circle at 20% 50%,rgba(255,255,255,0.12),transparent 50%)', pointerEvents: 'none' }}></div>
                  <h2 style={{ fontFamily: '\'Plus Jakarta Sans\',sans-serif', fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem', position: 'relative' }}>Have a project in mind?</h2>
                  <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', marginBottom: '2rem', position: 'relative' }}>Tell us what you need. We&apos;ll come back with a plan and a fixed price, usually the same day.</p>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: '#fff', color: 'var(--primary-dark)', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', textDecoration: 'none', transition: 'all 0.3s ease' }}>Start a project <i className="fas fa-arrow-right"></i></Link>
              </div>
          </section>
    </>
  );
}
