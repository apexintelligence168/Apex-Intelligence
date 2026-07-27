'use client';

import { useEffect } from 'react';

/**
 * Adds `home` to <body> for the homepage only.
 *
 * styles/home.css is scoped under `body.home` so its rules win the
 * selectors it shares with globals.css (.logo, .cta-button, .dropdown,
 * .footer-socials …) and never leak onto another route.
 *
 * Two mechanisms, deliberately:
 *  - an inline script, so the class is present before first paint (the
 *    App Router gives a page no way to set <body className> directly)
 *  - an effect whose cleanup removes it again, so a client-side
 *    navigation away from `/` drops the homepage styling.
 */
const APPLY = `try{document.body.classList.add('home')}catch(e){}`;

export default function HomeBodyClass() {
  useEffect(() => {
    document.body.classList.add('home');
    return () => document.body.classList.remove('home');
  }, []);

  return (
    <script
      // eslint-disable-next-line react/no-danger -- must run before paint
      dangerouslySetInnerHTML={{ __html: APPLY }}
    />
  );
}
