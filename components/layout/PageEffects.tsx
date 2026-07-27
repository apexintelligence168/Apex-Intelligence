'use client';

import { useMagnetic } from '@/hooks/useMagnetic';
import { useReveal } from '@/hooks/useReveal';
import { useTilt } from '@/hooks/useTilt';

/**
 * Attaches the shared scroll/pointer behaviours to whatever markup the
 * current route rendered.
 *
 * These operate on plain class and data attributes (`.reveal-3d`,
 * `[data-tilt]`, `[data-count]`), so pages stay server components and
 * ship no per-element JavaScript.
 */
export default function PageEffects() {
  useReveal();
  useTilt();
  useMagnetic();
  return null;
}
