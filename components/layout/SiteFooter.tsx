import { siteConfig, socialLinks } from '@/lib/site';

/** Compact footer used on every route except the homepage. */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          &copy; {siteConfig.founded} {siteConfig.name}. All rights reserved.
        </p>
        <div className="footer-socials">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} title={s.label}>
              <i className={s.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
