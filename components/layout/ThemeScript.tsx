/**
 * Applies the saved theme before first paint.
 *
 * This has to be a blocking inline script: the stylesheet keys off
 * `body.dark-mode`, so resolving the theme in an effect would show a
 * flash of the light sheet first. Rendered as the first child of
 * <body> so it runs before any page content is painted.
 *
 * Migrates the two pre-2.0 storage keys (`darkMode`, `apexPrintMode`)
 * so returning visitors keep their choice.
 */

const THEME_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem('apexTheme');
if(!s){
  if(localStorage.getItem('darkMode')==='enabled'||localStorage.getItem('apexPrintMode')==='blueprint')s='dark';
  else if(localStorage.getItem('darkMode')==='disabled'||localStorage.getItem('apexPrintMode')==='whiteprint')s='light';
}
if(!s&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)s='dark';
if(s==='dark')document.body.classList.add('dark-mode');
}catch(e){}})();`;

export default function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger -- must run synchronously before paint
      dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }}
    />
  );
}
