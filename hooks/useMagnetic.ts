'use client';

import { useEffect } from 'react';

/** Pointer attraction on primary actions. */
export function useMagnetic(selector = '[data-magnetic], .primary-btn, .cta-button') {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !fine) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    const cleanups = els.map((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      };
      const onLeave = () => {
        el.style.transform = '';
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [selector]);
}
