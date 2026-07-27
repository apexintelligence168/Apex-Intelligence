'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ThemeToggle from '@/components/ui/ThemeToggle';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { contact, navigation, siteConfig } from '@/lib/site';

/**
 * Homepage header — the blueprint variant, with the fixed info strip
 * above it. Kept separate from SiteHeader because the two have different
 * chrome (info strip, two-line logo, mono CTA) and different styling.
 */
export default function HomeHeader() {
  const { scrolled } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
        setOpenGroup(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setOpenGroup(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleGroupClick = (e: React.MouseEvent, label: string) => {
    if (window.innerWidth <= 760) {
      e.preventDefault();
      setOpenGroup((cur) => (cur === label ? null : label));
    }
  };

  return (
    <>
      <div className="nav-strip">
        <span>
          <i className="fas fa-location-dot" aria-hidden="true" />
          {contact.city}, {contact.region}, {contact.country}
        </span>
        <span>
          <i className="fas fa-phone" aria-hidden="true" />
          <a href={contact.phoneHref} style={{ textDecoration: 'none' }}>
            {contact.phoneDisplay}
          </a>
        </span>
        <span>
          <i className="fas fa-envelope" aria-hidden="true" />
          <a href={contact.emailHref} style={{ textDecoration: 'none' }}>
            {contact.email}
          </a>
        </span>
      </div>

      <header id="mainHeader" className={scrolled ? 'scrolled' : undefined}>
        <nav ref={navRef} aria-label="Main">
          <Link href="/" className="logo">
            {siteConfig.name}
            <span className="logo-tag">{siteConfig.tagline}</span>
          </Link>

          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            id="hamburger"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul id="navMenu" className={menuOpen ? 'active' : undefined}>
            {navigation.map((group) => (
              <li
                key={group.label}
                className={`nav-item${openGroup === group.label ? ' open' : ''}`}
              >
                <Link href={group.href} onClick={(e) => handleGroupClick(e, group.label)}>
                  {group.label}{' '}
                  <i className="fas fa-chevron-down nav-chevron" aria-hidden="true" />
                </Link>
                <div className="dropdown">
                  {group.items.map((item, i) =>
                    item.divider ? (
                      // eslint-disable-next-line react/no-array-index-key -- dividers have no stable id
                      <div className="dropdown-divider" key={`divider-${i}`} />
                    ) : (
                      <Link href={item.href} key={item.href + item.label}>
                        <i className={item.icon} aria-hidden="true" /> {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            <ThemeToggle id="modeToggle" className="mode-toggle" />
            <Link href="/contact" className="cta-button">
              Contact us
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
