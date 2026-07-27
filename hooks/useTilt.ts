'use client';

import { useEffect } from 'react';

/**
 * Pointer-tracked 3D tilt for every `[data-tilt]` element on the page.
 *
 * The transform is written inline because the cards also carry `:hover`
 * rules in globals.css — an inline style is the only thing that reliably
 * wins mid-gesture. On pointerleave it is cleared so the CSS rest state
 * takes over again.
 */
export function useTilt() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !fine) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
    if (!cards.length) return;

    const cleanups = cards.map((card) => {
      // parseFloat, not Number: Number(null) is 0, which would silently
      // flatten the lift on every card that omits the attribute.
      const maxTilt = parseFloat(card.getAttribute('data-tilt-max') ?? '') || 7;
      const liftAttr = parseFloat(card.getAttribute('data-tilt-lift') ?? '');
      const lift = Number.isNaN(liftAttr) ? 18 : liftAttr;

      let frame: number | null = null;
      let pending: { rx: number; ry: number; gx: number; gy: number } | null = null;

      const apply = () => {
        frame = null;
        if (!pending) return;
        card.style.transform =
          `perspective(1000px) rotateX(${pending.rx.toFixed(2)}deg)` +
          ` rotateY(${pending.ry.toFixed(2)}deg) translateZ(${lift}px)`;
        card.style.setProperty('--tilt-gx', `${pending.gx.toFixed(1)}%`);
        card.style.setProperty('--tilt-gy', `${pending.gy.toFixed(1)}%`);
      };

      const onEnter = () => {
        card.classList.add('tilting');
        card.style.setProperty('--tilt-glare', '1');
      };

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        pending = {
          rx: (0.5 - py) * maxTilt * 2,
          ry: (px - 0.5) * maxTilt * 2,
          gx: px * 100,
          gy: py * 100,
        };
        if (frame === null) frame = requestAnimationFrame(apply);
      };

      const onLeave = () => {
        if (frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
        }
        pending = null;
        card.classList.remove('tilting');
        card.style.setProperty('--tilt-glare', '0');
        card.style.transform = '';
      };

      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);

      return () => {
        if (frame !== null) cancelAnimationFrame(frame);
        card.removeEventListener('pointerenter', onEnter);
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
