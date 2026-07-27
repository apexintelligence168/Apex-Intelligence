'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import ThemeToggle from '@/components/ui/ThemeToggle';
import { navigation, siteConfig } from '@/lib/site';

/**
 * Header used on every route except the homepage, which has its own
 * blueprint-styled variant.
 *
 * Dropdowns open on hover on desktop (CSS) and on tap on mobile (state),
 * matching the original behaviour.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Close on outside click
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

  // Escape closes the mobile menu
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
    // On mobile the parent link toggles its dropdown instead of navigating
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setOpenGroup((cur) => (cur === label ? null : label));
    }
  };

  return (
    <header id="mainHeader" className={scrolled ? 'scrolled' : undefined}>
      <nav ref={navRef} aria-label="Main">
        <Link href="/" className="logo">
          {siteConfig.name}
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
          {navigation.map((group) => {
            const isActive = pathname === group.href || pathname.startsWith(`${group.href}/`);
            return (
              <li
                key={group.label}
                className={`nav-item${openGroup === group.label ? ' open' : ''}`}
              >
                <Link
                  href={group.href}
                  className={isActive ? 'active' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleGroupClick(e, group.label)}
                >
                  {group.label} <i className="fas fa-chevron-down nav-chevron" aria-hidden="true" />
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
            );
          })}
        </ul>

        <ThemeToggle id="darkModeToggle" className="dark-mode-toggle" />

        <Link href="/contact" className="cta-button">
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
