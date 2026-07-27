// ════════════════════════════════════════════════════════════════
// SHARED JAVASCRIPT - All Pages
// ════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // ── SCROLL TO TOP ──
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── DARK MODE ──
    // Owned by apex-ui.js so the homepage and inner pages share one
    // theme class, one storage key and one broadcast event.

    // ── HAMBURGER MENU ──
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Mobile sub-dropdown toggle: clicking a nav-item parent link toggles its dropdown
        navMenu.querySelectorAll('.nav-item > a').forEach(link => {
            link.addEventListener('click', function (e) {
                const isMobile = window.innerWidth <= 768;
                if (!isMobile) return;
                const dropdown = this.parentElement.querySelector('.dropdown');
                if (!dropdown) return;
                e.preventDefault();
                const isOpen = this.parentElement.classList.contains('open');
                // Close all
                navMenu.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
                if (!isOpen) this.parentElement.classList.add('open');
            });
        });

        // Close menu when a dropdown link is clicked
        navMenu.querySelectorAll('.dropdown a').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('nav')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navMenu.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
            }
        });
    }

    // ── FAQ ACCORDION ──
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('open');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current FAQ item
            if (!isOpen) {
                faqItem.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── SCROLL REVEAL ──
    // Owned by apex-ui.js (IntersectionObserver, covers .reveal,
    // .reveal-3d and [data-count]).

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── BLOG READ MORE LINKS ──
    const blogReadMore = document.querySelectorAll('.blog-read-more');
    blogReadMore.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ── HEADER SCROLL EFFECT ──
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// ════════════════════════════════════════════════════════════════
// PAGE LOAD ANIMATION
// ════════════════════════════════════════════════════════════════

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════

function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
