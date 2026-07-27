'use client';

import { useEffect, useState } from 'react';

interface ScrollState {
  progress: number;
  scrolled: boolean;
  pastFold: boolean;
}

/** Drives the homepage progress bar, sticky header state and back-to-top. */
export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrolled: false,
    pastFold: false,
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        progress: docHeight > 0 ? (y / docHeight) * 100 : 0,
        scrolled: y > 40,
        pastFold: y > 500,
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
