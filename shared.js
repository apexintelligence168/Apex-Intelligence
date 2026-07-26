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

    // ── DARK MODE TOGGLE ──
    const darkModeToggle = document.getElementById('darkModeToggle');
    const savedMode = localStorage.getItem('darkMode');
    
    // Apply saved dark mode preference
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

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

    // ── SCROLL REVEAL ANIMATION ──
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealScroll = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    revealScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealScroll);
    window.addEventListener('resize', revealScroll);

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
