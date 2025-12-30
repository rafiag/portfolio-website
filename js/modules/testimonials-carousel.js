/**
 * Testimonials Carousel Module
 * Handles smooth scroll-based testimonials navigation
 * OPTIMIZED: Uses scroll-snap and throttled scroll tracking
 */

import { throttle } from './performance-utils.js';
import { LAYOUT, ANIMATION, IS_DEV } from '../constants.js';

export class TestimonialsCarousel {
    constructor() {
        try {
            this.container = document.querySelector('.testimonials-carousel');
            this.track = document.querySelector('.testimonials-track');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.prevBtn = document.querySelector('.testimonials-prev');
            this.nextBtn = document.querySelector('.testimonials-next');

            this.currentIndex = 0;
            this.cachedGap = null;
            this.cachedCardWidth = null;

            // Store bound handlers for cleanup
            this.boundHandlers = {
                prevHandler: null,
                nextHandler: null,
                scrollHandler: null,
                resizeHandler: null
            };

            if (!this.container) {
                if (IS_DEV) {
                    console.warn('TestimonialsCarousel: testimonials-carousel element not found');
                }
                return;
            }

            if (this.cards.length === 0) {
                if (IS_DEV) {
                    console.warn('TestimonialsCarousel: no testimonial cards found');
                }
                return;
            }

            this.init();
        } catch (error) {
            console.error('TestimonialsCarousel initialization error:', error);
        }
    }

    init() {
        try {
            // Only initialize if there are multiple testimonials
            if (this.cards.length <= 1) {
                if (IS_DEV) {
                    console.log('TestimonialsCarousel: Only one testimonial, skipping carousel initialization');
                }
                return;
            }

            this.cacheStyles();
            this.addEventListeners();
        } catch (error) {
            console.error('TestimonialsCarousel init error:', error);
        }
    }

    /**
     * Cache computed styles for better performance
     * Reduces DOM reads during scroll events
     */
    cacheStyles() {
        try {
            if (!this.track || !this.cards[0]) {
                return;
            }

            const computedStyle = window.getComputedStyle(this.track);
            this.cachedGap = parseFloat(computedStyle.gap) || LAYOUT.CAROUSEL_GAP;
            this.cachedCardWidth = this.cards[0].offsetWidth + this.cachedGap;
        } catch (error) {
            console.error('TestimonialsCarousel cacheStyles error:', error);
            // Fallback to default values
            this.cachedGap = LAYOUT.CAROUSEL_GAP;
            this.cachedCardWidth = this.cards[0]?.offsetWidth + LAYOUT.CAROUSEL_GAP || 400;
        }
    }

    addEventListeners() {
        try {
            // Button handlers
            this.boundHandlers.prevHandler = () => this.prev();
            this.boundHandlers.nextHandler = () => this.next();

            this.prevBtn?.addEventListener('click', this.boundHandlers.prevHandler);
            this.nextBtn?.addEventListener('click', this.boundHandlers.nextHandler);

            // Scroll tracking with throttling for better performance
            this.boundHandlers.scrollHandler = throttle(() => {
                const scrollLeft = this.track.scrollLeft;
                // Use cached card width for better performance
                const newIndex = Math.round(scrollLeft / this.cachedCardWidth);
                if (newIndex !== this.currentIndex && newIndex < this.cards.length) {
                    this.currentIndex = newIndex;
                }
            }, 16); // 60fps

            this.track.addEventListener('scroll', this.boundHandlers.scrollHandler, { passive: true });

            // Update cached values on window resize
            this.boundHandlers.resizeHandler = throttle(() => {
                this.cacheStyles();
            }, ANIMATION.RESIZE_THROTTLE);

            window.addEventListener('resize', this.boundHandlers.resizeHandler, { passive: true });
        } catch (error) {
            console.error('TestimonialsCarousel addEventListeners error:', error);
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateCarousel();
    }

    next() {
        this.currentIndex = Math.min(this.cards.length - 1, this.currentIndex + 1);
        this.updateCarousel();
    }

    updateCarousel() {
        try {
            if (!this.cards[0]) {
                if (IS_DEV) {
                    console.warn('TestimonialsCarousel: No cards available to update');
                }
                return;
            }

            // Use cached card width for better performance
            this.track.scrollTo({
                left: this.currentIndex * this.cachedCardWidth,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error('TestimonialsCarousel updateCarousel error:', error);
        }
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the carousel is no longer needed
     */
    destroy() {
        // Remove button listeners
        if (this.prevBtn && this.boundHandlers.prevHandler) {
            this.prevBtn.removeEventListener('click', this.boundHandlers.prevHandler);
        }
        if (this.nextBtn && this.boundHandlers.nextHandler) {
            this.nextBtn.removeEventListener('click', this.boundHandlers.nextHandler);
        }

        // Remove scroll listener
        if (this.track && this.boundHandlers.scrollHandler) {
            this.track.removeEventListener('scroll', this.boundHandlers.scrollHandler);
        }

        // Remove resize listener
        if (this.boundHandlers.resizeHandler) {
            window.removeEventListener('resize', this.boundHandlers.resizeHandler);
        }

        // Clear references
        this.container = null;
        this.track = null;
        this.cards = null;
        this.cachedGap = null;
        this.cachedCardWidth = null;
        this.boundHandlers = null;
    }
}
