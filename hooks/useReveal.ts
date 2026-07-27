'use client';

import { useEffect } from 'react';

/**
 * Adds `.visible` to `.reveal` / `.reveal-3d` elements as they enter the
 * viewport, and rolls up any `[data-count]` numbers.
 *
 * One observer per page rather than per element — the markup is authored
 * with plain classes, exactly as it was before the migration.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCount = (el: HTMLElement) => {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';

      const target = Number(el.getAttribute('data-count'));
      if (Number.isNaN(target)) return;
      const suffix = el.getAttribute('data-suffix') ?? '';

      if (reduce) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = `${target}${suffix}`;
      };
      requestAnimationFrame(tick);
    };

    const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-3d, [data-count]');
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('visible');
          if (el.hasAttribute('data-count')) animateCount(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );

    targets.forEach((el) => io.observe(el));

    // Anything already above the fold shows immediately
    const raf = requestAnimationFrame(() => {
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add('visible');
          if (el.hasAttribute('data-count')) animateCount(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
}
