/**
 * Main Entry Point for portfolio.html
 * Initializes all modules for the portfolio page
 */

// Import shared modules
import { MobileMenu } from './modules/mobile-menu.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initNavbarScrollEffect } from './modules/navbar-effects.js';
import { initGlobalErrorHandlers } from './modules/error-handler.js';
import { PortfolioModal } from './modules/portfolio-modal.js';
import { ImageLoader } from './modules/accessibility.js';
import { initFontLoader } from './modules/font-loader.js';

// Import page-specific modules
import { PortfolioFilter } from './modules/portfolio-filter.js';

// Import structured data
import { initStructuredData } from './modules/structured-data.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load fonts asynchronously (CSP compliant)
    initFontLoader();

    // Shared components
    new MobileMenu();
    initSmoothScroll();
    initNavbarScrollEffect();
    new PortfolioModal('.portfolio-card[data-portfolio-id]');
    new ImageLoader();

    // Portfolio page specific
    new PortfolioFilter();

    // Scroll animations for portfolio cards
    initScrollAnimations('.portfolio-card');

    // Inject structured data for SEO
    initStructuredData('portfolio');
});

// Staggered animation for portfolio grid on page load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// Initialize global error handlers
initGlobalErrorHandlers();
