'use client';

import { useTheme } from '@/hooks/useTheme';

/**
 * Light/blueprint switch. Renders the moon icon during SSR and the first
 * paint, then swaps once the client knows the real theme — the icon is
 * decorative, so a one-frame settle is invisible and it keeps the markup
 * hydration-safe.
 */
export default function ThemeToggle({ id, className = '' }: { id?: string; className?: string }) {
  const { isDark, mounted, toggle } = useTheme();

  return (
    <button
      type="button"
      id={id}
      className={className}
      onClick={toggle}
      aria-pressed={mounted ? isDark : undefined}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true" />
    </button>
  );
}
