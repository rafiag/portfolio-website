/**
 * Main Entry Point for index.html
 * Initializes all modules for the home page
 */

// Import shared modules
import { MobileMenu } from './modules/mobile-menu.js';
import { initSmoothScroll, cleanupSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initNavbarScrollEffect, initActiveNavLinks, cleanupNavbarEffects } from './modules/navbar-effects.js';
import { initGlobalErrorHandlers } from './modules/error-handler.js';
import { PortfolioModal } from './modules/portfolio-modal.js';
import { ImageLoader, KeyboardNavigation } from './modules/accessibility.js';
import { initFontLoader } from './modules/font-loader.js';
import BackToTop from './modules/back-to-top.js';

// Import page-specific modules
import { PortfolioCarousel } from './modules/portfolio-carousel.js';
import { TestimonialsCarousel } from './modules/testimonials-carousel.js';
import { initStatisticsCounter } from './modules/statistics-counter.js';
import {
    initHeroParallax,
    initExperienceCards,
    initSkillBarsAnimation,
    initPageLoadAnimation,
    cleanupIndexPage
} from './modules/index-page.js';

// Import structured data
import { initStructuredData } from './modules/structured-data.js';

// Store module instances for cleanup
const moduleInstances = {
    mobileMenu: null,
    portfolioModal: null,
    imageLoader: null,
    keyboardNavigation: null,
    portfolioCarousel: null,
    testimonialsCarousel: null,
    backToTop: null,
    statisticsCounter: null
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load fonts asynchronously (CSP compliant)
    initFontLoader();

    // Shared components
    moduleInstances.mobileMenu = new MobileMenu();
    initSmoothScroll();
    initNavbarScrollEffect();
    initActiveNavLinks();
    moduleInstances.portfolioModal = new PortfolioModal();
    moduleInstances.imageLoader = new ImageLoader();
    moduleInstances.keyboardNavigation = new KeyboardNavigation();
    moduleInstances.backToTop = new BackToTop();

    // Scroll animations for index page elements
    initScrollAnimations('.section-header, .experience-item, .skill-category, .testimonial-card, .portfolio-item, .contact-item');

    // Index page specific features
    moduleInstances.portfolioCarousel = new PortfolioCarousel();
    moduleInstances.testimonialsCarousel = new TestimonialsCarousel();
    moduleInstances.statisticsCounter = initStatisticsCounter();
    initHeroParallax();
    initExperienceCards();
    initSkillBarsAnimation();
    initPageLoadAnimation();

    // Inject structured data for SEO
    initStructuredData('index');
});

// Initialize global error handlers
initGlobalErrorHandlers();

// Cleanup all event listeners and observers on page unload
window.addEventListener('beforeunload', () => {
    // Cleanup class instances
    moduleInstances.mobileMenu?.destroy();
    moduleInstances.portfolioModal?.destroy();
    moduleInstances.imageLoader?.destroy();
    moduleInstances.keyboardNavigation?.destroy();
    moduleInstances.portfolioCarousel?.destroy();
    moduleInstances.testimonialsCarousel?.destroy();
    moduleInstances.backToTop?.destroy();
    moduleInstances.statisticsCounter?.cleanup();

    // Cleanup function-based modules
    cleanupSmoothScroll();
    cleanupNavbarEffects();
    cleanupIndexPage();
});
