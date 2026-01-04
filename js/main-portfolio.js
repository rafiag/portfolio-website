/**
 * Main Entry Point for portfolio.html
 * Initializes all modules for the portfolio page
 */

// Import shared modules
import { MobileMenu } from './modules/mobile-menu.js';
import { initSmoothScroll, cleanupSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initNavbarScrollEffect, cleanupNavbarEffects } from './modules/navbar-effects.js';
import { initGlobalErrorHandlers } from './modules/error-handler.js';
import { PortfolioModal } from './modules/portfolio-modal.js';
import { ImageLoader } from './modules/accessibility.js';
import { initFontLoader } from './modules/font-loader.js';
import BackToTop from './modules/back-to-top.js';

// Import page-specific modules
import { PortfolioFilter } from './modules/portfolio-filter.js';
import { initCopyrightYear } from './modules/index-page.js';

// Import structured data
import { initStructuredData } from './modules/structured-data.js';

// Store module instances for cleanup
const moduleInstances = {
    mobileMenu: null,
    portfolioModal: null,
    imageLoader: null,
    portfolioFilter: null,
    backToTop: null
};

// Store load animation timers for cleanup
const loadAnimationTimers = [];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load fonts asynchronously (CSP compliant)
    initFontLoader();

    // Shared components
    moduleInstances.mobileMenu = new MobileMenu();
    initSmoothScroll();
    initNavbarScrollEffect();
    moduleInstances.portfolioModal = new PortfolioModal('.portfolio-card[data-portfolio-id]');
    moduleInstances.imageLoader = new ImageLoader();
    moduleInstances.backToTop = new BackToTop();

    // Portfolio page specific
    moduleInstances.portfolioFilter = new PortfolioFilter();

    // Scroll animations for portfolio cards
    initScrollAnimations('.portfolio-card');

    // Update copyright year
    initCopyrightYear();

    // Inject structured data for SEO
    initStructuredData('portfolio');
});

// Staggered animation for portfolio grid on page load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        const timerId = setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            // Remove timer from array once executed
            const timerIndex = loadAnimationTimers.indexOf(timerId);
            if (timerIndex > -1) {
                loadAnimationTimers.splice(timerIndex, 1);
            }
        }, index * 50);
        loadAnimationTimers.push(timerId);
    });
});

// Initialize global error handlers
initGlobalErrorHandlers();

// Cleanup all event listeners and observers on page unload
window.addEventListener('beforeunload', () => {
    // Clear any pending load animation timers
    loadAnimationTimers.forEach(timerId => clearTimeout(timerId));
    loadAnimationTimers.length = 0;

    // Cleanup class instances
    moduleInstances.mobileMenu?.destroy();
    moduleInstances.portfolioModal?.destroy();
    moduleInstances.imageLoader?.destroy();
    moduleInstances.portfolioFilter?.destroy();
    moduleInstances.backToTop?.destroy();

    // Cleanup function-based modules
    cleanupSmoothScroll();
    cleanupNavbarEffects();
});
