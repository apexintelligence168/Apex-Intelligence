import Link from 'next/link';

import { contact, homeFooterSocials, siteConfig } from '@/lib/site';

const serviceLinks = [
  { href: '/services#web', label: 'Web Development' },
  { href: '/services#erp', label: 'ERP Systems' },
  { href: '/services#ml', label: 'Machine Learning' },
  { href: '/services#analytics', label: 'Data Analytics' },
  { href: '/services#cloud', label: 'Cloud & DevOps' },
  { href: '/services#maintenance', label: 'Maintenance (AMC)' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/process', label: 'How We Work' },
  { href: '/products', label: 'Our Work' },
  { href: '/insights', label: 'Insights' },
];

/** Expanded four-column footer, homepage only. */
export default function HomeFooter() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>{siteConfig.name}</h3>
          <p>
            Web development, ERP, ML, analytics, cloud &amp; maintenance — est.{' '}
            {siteConfig.founded}, {contact.city}.
          </p>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={contact.phoneHref}>
                <i className="fas fa-phone" aria-hidden="true" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref}>
                <i className="fas fa-envelope" aria-hidden="true" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp us
              </a>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/insights#faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-rev">
          © {siteConfig.founded} {siteConfig.name} — Rev. 2026.07 — {contact.city}, MH,{' '}
          {contact.country}
        </p>
        <div className="footer-socials">
          {homeFooterSocials.map((s) => (
            <a key={s.label} href={s.href} title={s.label} aria-label={s.label}>
              <i className={s.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
