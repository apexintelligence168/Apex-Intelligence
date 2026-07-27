'use client';

import { useEffect, useState } from 'react';

import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * Homepage-only chrome: the intro loader, the scroll progress bar and
 * the back-to-top button.
 *
 * The loader is dismissed on window load (with the original short hold)
 * and, as a safety net, after a timeout — so a slow third-party asset
 * can never leave a visitor staring at the overlay.
 */
export default function HomeChrome() {
  const { progress, pastFold } = useScrollProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let hold: ReturnType<typeof setTimeout>;

    const dismiss = () => {
      hold = setTimeout(() => setLoaded(true), 900);
    };

    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });

    // Never trap the page behind the overlay
    const failSafe = setTimeout(() => setLoaded(true), 4000);

    return () => {
      clearTimeout(hold);
      clearTimeout(failSafe);
      window.removeEventListener('load', dismiss);
    };
  }, []);

  return (
    <>
      <div id="page-loader" className={loaded ? 'hidden' : undefined} aria-hidden={loaded}>
        <svg viewBox="0 0 100 100" role="img" aria-label="Loading">
          <path
            className="ldr-path"
            d="M50 8 L50 38 M50 62 L50 92 M50 50 L18 22 M50 50 L82 22 M50 50 L14 62 M50 50 L86 62"
          />
        </svg>
        <div className="loader-label">Loading system // Apex Intelligence</div>
      </div>

      <div id="scrollProgress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <button
        id="backToTop"
        type="button"
        className={pastFold ? 'visible' : undefined}
        title="Back to top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up" aria-hidden="true" />
      </button>
    </>
  );
}
