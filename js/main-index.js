/**
 * Main Entry Point for index.html
 * Initializes all modules for the home page
 */

// Import shared modules
import { MobileMenu } from './modules/mobile-menu.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initNavbarScrollEffect, initActiveNavLinks } from './modules/navbar-effects.js';
import { initGlobalErrorHandlers } from './modules/error-handler.js';
import { PortfolioModal } from './modules/portfolio-modal.js';
import { ImageLoader, KeyboardNavigation } from './modules/accessibility.js';
import { initFontLoader } from './modules/font-loader.js';

// Import page-specific modules
import { PortfolioCarousel } from './modules/portfolio-carousel.js';
import {
    initHeroParallax,
    initExperienceCards,
    initSkillBarsAnimation,
    initPageLoadAnimation
} from './modules/index-page.js';

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
    initActiveNavLinks();
    new PortfolioModal();
    new ImageLoader();
    new KeyboardNavigation();

    // Scroll animations for index page elements
    initScrollAnimations('.section-header, .experience-item, .skill-category, .testimonial-card, .portfolio-item, .contact-item');

    // Index page specific features
    new PortfolioCarousel();
    initHeroParallax();
    initExperienceCards();
    initSkillBarsAnimation();
    initPageLoadAnimation();

    // Inject structured data for SEO
    initStructuredData('index');
});

// Initialize global error handlers
initGlobalErrorHandlers();
