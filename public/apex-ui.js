// ════════════════════════════════════════════════════════════════
// APEX UI — theme, 3D tilt, parallax, depth reveals
// Classic script (no module). Loaded on every page with `defer`.
// ════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    var reduceMotion = window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : { matches: false };

    var finePointer = window.matchMedia
        ? window.matchMedia('(hover: hover) and (pointer: fine)')
        : { matches: true };

    // ────────────────────────────────────────────────────────────
    // THEME — single source of truth for every page
    // The class is applied by the inline boot snippet before paint;
    // this block owns toggling, persistence and change broadcasts.
    // ────────────────────────────────────────────────────────────

    var THEME_KEY = 'apexTheme';

    function isDark() {
        return document.body.classList.contains('dark-mode');
    }

    function syncToggles() {
        var dark = isDark();
        var toggles = document.querySelectorAll('#darkModeToggle, #modeToggle, [data-theme-toggle]');
        for (var i = 0; i < toggles.length; i++) {
            var btn = toggles[i];
            btn.innerHTML = dark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
            btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
            btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    function setTheme(dark) {
        document.body.classList.toggle('dark-mode', dark);
        try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (e) { /* private mode */ }
        syncToggles();
        window.dispatchEvent(new CustomEvent('apex:theme', { detail: { dark: dark } }));
    }

    function initTheme() {
        syncToggles();
        document.addEventListener('click', function (e) {
            var btn = e.target.closest
                ? e.target.closest('#darkModeToggle, #modeToggle, [data-theme-toggle]')
                : null;
            if (!btn) return;
            e.preventDefault();
            setTheme(!isDark());
        });
    }

    window.ApexTheme = { isDark: isDark, set: setTheme, toggle: function () { setTheme(!isDark()); } };

    // ────────────────────────────────────────────────────────────
    // TILT — pointer-tracked 3D rotation on [data-tilt] elements
    // Transform is written inline so it always beats :hover rules
    // that would otherwise reset the card mid-gesture.
    // ────────────────────────────────────────────────────────────

    function initTilt() {
        if (reduceMotion.matches || !finePointer.matches) return;

        var cards = document.querySelectorAll('[data-tilt]');

        Array.prototype.forEach.call(cards, function (card) {
            var maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 7;
            var lift = parseFloat(card.getAttribute('data-tilt-lift'));
            if (isNaN(lift)) lift = 18;

            var frame = null;
            var pending = null;

            function apply() {
                frame = null;
                if (!pending) return;
                card.style.transform =
                    'perspective(1000px) rotateX(' + pending.rx.toFixed(2) + 'deg)' +
                    ' rotateY(' + pending.ry.toFixed(2) + 'deg)' +
                    ' translateZ(' + lift + 'px)';
                card.style.setProperty('--tilt-gx', pending.gx.toFixed(1) + '%');
                card.style.setProperty('--tilt-gy', pending.gy.toFixed(1) + '%');
            }

            card.addEventListener('pointerenter', function () {
                card.classList.add('tilting');
                card.style.setProperty('--tilt-glare', '1');
            });

            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                if (!r.width || !r.height) return;
                var px = (e.clientX - r.left) / r.width;   // 0 → 1
                var py = (e.clientY - r.top) / r.height;   // 0 → 1
                pending = {
                    rx: (0.5 - py) * maxTilt * 2,
                    ry: (px - 0.5) * maxTilt * 2,
                    gx: px * 100,
                    gy: py * 100
                };
                if (frame === null) frame = requestAnimationFrame(apply);
            });

            card.addEventListener('pointerleave', function () {
                if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
                pending = null;
                card.classList.remove('tilting');
                card.style.setProperty('--tilt-glare', '0');
                // Hand the element back to its CSS hover/rest styles
                card.style.transform = '';
            });
        });
    }

    // ────────────────────────────────────────────────────────────
    // PARALLAX — depth drift on [data-parallax="<factor>"]
    // ────────────────────────────────────────────────────────────

    function initParallax() {
        if (reduceMotion.matches) return;

        var items = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
        if (!items.length) return;

        var ticking = false;

        function update() {
            ticking = false;
            var vh = window.innerHeight;
            for (var i = 0; i < items.length; i++) {
                var el = items[i];
                var r = el.getBoundingClientRect();
                if (r.bottom < -200 || r.top > vh + 200) continue;
                var factor = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                // Distance of the element's centre from the viewport centre
                var offset = (r.top + r.height / 2 - vh / 2) * factor;
                el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
            }
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    }

    // ────────────────────────────────────────────────────────────
    // REVEALS — .reveal / .reveal-3d via IntersectionObserver,
    // plus [data-count] number roll-ups.
    // ────────────────────────────────────────────────────────────

    function animateCount(el) {
        if (el.dataset.counted === 'true') return;
        el.dataset.counted = 'true';

        var target = parseFloat(el.getAttribute('data-count'));
        if (isNaN(target)) return;
        var suffix = el.getAttribute('data-suffix') || '';

        if (reduceMotion.matches) {
            el.textContent = target + suffix;
            return;
        }

        var duration = 1500;
        var start = performance.now();

        function tick(now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    }

    function initReveals() {
        var targets = document.querySelectorAll('.reveal, .reveal-3d, [data-count]');
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(targets, function (el) {
                el.classList.add('visible');
                if (el.hasAttribute('data-count')) animateCount(el);
            });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                if (entry.target.hasAttribute('data-count')) animateCount(entry.target);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

        // Anything already above the fold on load shows immediately
        requestAnimationFrame(function () {
            Array.prototype.forEach.call(targets, function (el) {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                    el.classList.add('visible');
                    if (el.hasAttribute('data-count')) animateCount(el);
                }
            });
        });
    }

    // ────────────────────────────────────────────────────────────
    // MAGNETIC BUTTONS — pointer attraction on primary actions
    // ────────────────────────────────────────────────────────────

    function initMagnetic() {
        if (reduceMotion.matches || !finePointer.matches) return;

        var els = document.querySelectorAll('[data-magnetic], .primary-btn, .cta-button');
        Array.prototype.forEach.call(els, function (el) {
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - r.left - r.width / 2) * 0.22;
                var y = (e.clientY - r.top - r.height / 2) * 0.32;
                el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
            });
            el.addEventListener('pointerleave', function () {
                el.style.transform = '';
            });
        });
    }

    // ────────────────────────────────────────────────────────────

    function boot() {
        initTheme();
        initTilt();
        initParallax();
        initReveals();
        initMagnetic();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
