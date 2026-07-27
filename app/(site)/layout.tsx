import '@/styles/globals.css';
import '@/styles/pages.css';

import PageEffects from '@/components/layout/PageEffects';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import ScrollTopButton from '@/components/ui/ScrollTopButton';

/**
 * Shell for every route except the homepage: shared header, footer,
 * back-to-top and the scroll/pointer effect bindings.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollTopButton />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <PageEffects />
    </>
  );
}
