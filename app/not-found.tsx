import type { Metadata } from 'next';
import Link from 'next/link';

import PageEffects from '@/components/layout/PageEffects';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import LazyScene from '@/components/three/LazyScene';

import '@/styles/globals.css';
import '@/styles/pages.css';
import '@/styles/detail.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

/**
 * Global 404. Carries its own header and footer because it is rendered
 * outside the (site) route group, which is where that shell normally
 * comes from.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <div className="error-page" data-apex-3d="lattice">
          <LazyScene scene="lattice" />
          <div>
            <div className="error-code">404</div>
            <h2>Page not found</h2>
            <p>
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
              you back on track.
            </p>
            <div className="error-btns">
              <Link href="/" className="btn-home">
                <i className="fas fa-home" aria-hidden="true" /> Back to Home
              </Link>
              <Link href="/contact" className="btn-contact">
                <i className="fas fa-envelope" aria-hidden="true" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <PageEffects />
    </>
  );
}
