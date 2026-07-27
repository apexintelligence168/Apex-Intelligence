'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'apexTheme';
/** Scenes listen for this to repaint their palettes. */
export const THEME_EVENT = 'apex:theme';

export type Theme = 'light' | 'dark';

/**
 * Reads and writes the single theme flag (`body.dark-mode`).
 *
 * The class itself is applied pre-paint by <ThemeScript />; this hook
 * syncs React state to whatever that decided, then owns changes.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains('dark-mode'));
    setMounted(true);
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    document.body.classList.toggle('dark-mode', dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      /* storage blocked (private mode) — theme still applies for this session */
    }
    setIsDark(dark);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { dark } }));
  }, []);

  const toggle = useCallback(() => {
    setTheme(!document.body.classList.contains('dark-mode'));
  }, [setTheme]);

  return { isDark, mounted, setTheme, toggle };
}
