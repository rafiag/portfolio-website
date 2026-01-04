/**
 * Index Page Specific Features
 * Handles features unique to the index.html page
 * OPTIMIZED: Uses requestAnimationFrame for smooth 60fps animations
 */

import { optimizedScrollHandler } from './performance-utils.js';

// Store cleanup handlers for the module
const cleanupHandlers = {
    parallaxHandler: null,
    experienceCardHandlers: new Map(),
    loadHandler: null,
    skillObserver: null
};

// Parallax effect for hero image
export function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Use optimized scroll handler with requestAnimationFrame
        const handleParallax = optimizedScrollHandler(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            // Use transform for GPU acceleration (already has will-change in CSS)
            heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        });

        window.addEventListener('scroll', handleParallax, { passive: true });
        // Store handler for cleanup
        cleanupHandlers.parallaxHandler = handleParallax;
    }
}

// Experience company card selection
export function initExperienceCards() {
    const companyCards = document.querySelectorAll('.experience-company-card');
    const detailContents = document.querySelectorAll('.experience-detail-content');

    if (companyCards.length === 0 || detailContents.length === 0) {
        return;
    }

    companyCards.forEach(card => {
        const handler = () => {
            const companyId = card.getAttribute('data-company');

            // Remove active class from all cards and contents
            companyCards.forEach(c => c.classList.remove('active'));
            detailContents.forEach(d => d.classList.remove('active'));

            // Add active class to clicked card and corresponding content
            card.classList.add('active');
            const activeContent = document.querySelector(`.experience-detail-content[data-company="${companyId}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        };
        card.addEventListener('click', handler);
        // Store handler for cleanup
        cleanupHandlers.experienceCardHandlers.set(card, handler);
    });
}

// Skill bars animation
export function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-level');

    if (skillBars.length === 0 || !('IntersectionObserver' in window)) {
        return;
    }

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
    // Store observer for cleanup
    cleanupHandlers.skillObserver = skillObserver;
}

// Page load animation
export function initPageLoadAnimation() {
    const handler = () => {
        document.body.classList.add('loaded');
    };
    window.addEventListener('load', handler);
    // Store handler for cleanup
    cleanupHandlers.loadHandler = handler;
}

// Update copyright year dynamically
export function initCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Cleanup function to remove all event listeners and observers
 * Call this function when the page is unloaded or navigated away from
 */
export function cleanupIndexPage() {
    // Remove parallax scroll listener
    if (cleanupHandlers.parallaxHandler) {
        window.removeEventListener('scroll', cleanupHandlers.parallaxHandler);
        cleanupHandlers.parallaxHandler = null;
    }

    // Remove experience card click listeners
    cleanupHandlers.experienceCardHandlers.forEach((handler, card) => {
        card.removeEventListener('click', handler);
    });
    cleanupHandlers.experienceCardHandlers.clear();

    // Remove load listener
    if (cleanupHandlers.loadHandler) {
        window.removeEventListener('load', cleanupHandlers.loadHandler);
        cleanupHandlers.loadHandler = null;
    }

    // Disconnect IntersectionObserver
    if (cleanupHandlers.skillObserver) {
        cleanupHandlers.skillObserver.disconnect();
        cleanupHandlers.skillObserver = null;
    }
}
