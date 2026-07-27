import type { Metadata } from 'next';
import Image from 'next/image';

import LazyScene from '@/components/three/LazyScene';

export const metadata: Metadata = {
  title: 'Our Work — Case Studies & Tech Stack',
  description:
    'Case studies and the technology stack behind Apex Intelligence projects across retail, construction, healthcare and manufacturing.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Our Work — Case Studies & Tech Stack | Apex Intelligence',
    description:
      'Case studies and the technology stack behind Apex Intelligence projects across retail, construction, healthcare and manufacturing.',
    url: '/products',
  },
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="page-hero-content">
                  <span className="section-tag">Our Work</span>
                  <h1>Things we&apos;ve built<br /><span className="highlight">and shipped</span></h1>
                  <p>Real projects for businesses in Nashik and across Maharashtra.</p>
              </div>
          </section>

          <section id="portfolio" className="section">
              <div className="section-header reveal">
                  <span className="section-tag">Case Studies</span>
                  <h2 className="section-title">Projects we&apos;ve delivered</h2>
                  <p className="section-subtitle">Across retail, construction, hospitality, and telecom.</p>
              </div>
              <div className="portfolio-grid depth-scene">
                  <div className="portfolio-item reveal-3d" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80" alt="PNG Jewelers" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>PNG Jewelers</h3>
                          <p>Inventory and customer analytics system</p>
                      </div>
                  </div>
                  <div className="portfolio-item reveal-3d d1" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80" alt="Giri Construction" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>Giri Construction</h3>
                          <p>Project tracking and resource management</p>
                      </div>
                  </div>
                  <div className="portfolio-item reveal-3d d2" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" alt="PhoneWale" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>PhoneWale</h3>
                          <p>E-commerce and retail management platform</p>
                      </div>
                  </div>
                  <div className="portfolio-item reveal-3d d3" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80" alt="Cellular Care Centre" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>Cellular Care Centre</h3>
                          <p>Service tracking and job management system</p>
                      </div>
                  </div>
                  <div className="portfolio-item reveal-3d d4" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80" alt="DMart" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>DMart</h3>
                          <p>Retail analytics and inventory reporting</p>
                      </div>
                  </div>
                  <div className="portfolio-item reveal-3d d5" data-tilt="" data-tilt-max="6">
                      <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Ibis Hotels" width={600} height={400} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
                      <div className="portfolio-content">
                          <h3>Ibis Hotels</h3>
                          <p>Booking and operations management system</p>
                      </div>
                  </div>
              </div>
          </section>

          <section id="tech" className="section" style={{ background: 'var(--bg-secondary)' }}>
              <div className="section-header reveal">
                  <span className="section-tag">Toolbox</span>
                  <h2 className="section-title">Tech we use</h2>
                  <p className="section-subtitle">Tools we&apos;ve actually shipped with, not just listed on a resume.</p>
              </div>
              <div className="tech-stack reveal">
                  <span className="tech-pill"><i className="fab fa-html5"></i> HTML / CSS</span>
                  <span className="tech-pill"><i className="fab fa-js"></i> JavaScript</span>
                  <span className="tech-pill"><i className="fab fa-react"></i> React</span>
                  <span className="tech-pill"><i className="fab fa-python"></i> Python</span>
                  <span className="tech-pill"><i className="fab fa-node-js"></i> Node.js</span>
                  <span className="tech-pill"><i className="fab fa-js"></i> TypeScript</span>
                  <span className="tech-pill"><i className="fas fa-database"></i> PostgreSQL</span>
                  <span className="tech-pill"><i className="fas fa-database"></i> MongoDB</span>
                  <span className="tech-pill"><i className="fas fa-cloud"></i> AWS</span>
                  <span className="tech-pill"><i className="fas fa-cloud"></i> Azure</span>
                  <span className="tech-pill"><i className="fas fa-brain"></i> TensorFlow</span>
                  <span className="tech-pill"><i className="fas fa-brain"></i> PyTorch</span>
                  <span className="tech-pill"><i className="fab fa-docker"></i> Docker</span>
                  <span className="tech-pill"><i className="fas fa-cube"></i> Kubernetes</span>
                  <span className="tech-pill"><i className="fas fa-mobile-alt"></i> Flutter</span>
                  <span className="tech-pill"><i className="fas fa-shopping-cart"></i> WooCommerce</span>
                  <span className="tech-pill"><i className="fab fa-wordpress"></i> WordPress</span>
                  <span className="tech-pill"><i className="fas fa-chart-bar"></i> Power BI</span>
                  <span className="tech-pill"><i className="fas fa-chart-line"></i> Tableau</span>
              </div>
          </section>
    </>
  );
}
