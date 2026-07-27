import type { Metadata } from 'next';

import ContactForm from '@/components/sections/ContactForm';
import LazyScene from '@/components/three/LazyScene';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Call, WhatsApp or email Apex Intelligence in Nashik. Send a brief and we usually reply the same day with a clear plan and a fixed price.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Apex Intelligence',
    description:
      'Call, WhatsApp or email Apex Intelligence in Nashik. Send a brief and we usually reply the same day with a clear plan and a fixed price.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" data-apex-3d="lattice">
              <LazyScene scene="lattice" />
              <div className="page-hero-content">
                  <span className="section-tag">Get In Touch</span>
                  <h1>Let&apos;s talk about<br /><span className="highlight">your project</span></h1>
                  <p>Drop us a message or call directly. We usually reply the same day.</p>
              </div>
          </section>

          <section className="section">
              <div className="contact-grid">
                  <div className="contact-info">
                      <div className="contact-item reveal-3d" data-tilt="" data-tilt-max="5">
                          <i className="fas fa-phone"></i>
                          <div>
                              <h3>Phone</h3>
                              <p><a href="tel:+919145310264">+91 91453 10264</a></p>
                          </div>
                      </div>
                      <div className="contact-item reveal-3d" data-tilt="" data-tilt-max="5">
                          <i className="fab fa-whatsapp"></i>
                          <div>
                              <h3>WhatsApp</h3>
                              <p><a href="https://wa.me/919145310264" target="_blank" rel="noopener">+91 91453 10264</a></p>
                          </div>
                      </div>
                      <div className="contact-item reveal-3d" data-tilt="" data-tilt-max="5">
                          <i className="fas fa-envelope"></i>
                          <div>
                              <h3>Email</h3>
                              <p><a href="mailto:info@apexintelligence.in">info@apexintelligence.in</a></p>
                          </div>
                      </div>
                      <div className="contact-item reveal-3d" data-tilt="" data-tilt-max="5">
                          <i className="fas fa-map-marker-alt"></i>
                          <div>
                              <h3>Address</h3>
                              <p>G-square Jatra Hotel<br />Nashik, Maharashtra</p>
                          </div>
                      </div>
                  </div>

            
                  <ContactForm />
              </div>
          </section>
    </>
  );
}
