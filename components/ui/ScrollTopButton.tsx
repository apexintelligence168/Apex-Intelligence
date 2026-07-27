'use client';

import { useEffect, useState } from 'react';

/** Back-to-top control used by the inner-page layout. */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="scrollTopBtn"
      type="button"
      className={visible ? 'visible' : undefined}
      title="Back to top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
