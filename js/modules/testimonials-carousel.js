/**
 * Testimonials Carousel Module
 * Handles smooth scroll-based testimonials navigation
 * OPTIMIZED: Uses scroll-snap and throttled scroll tracking
 */

import { throttle } from './performance-utils.js';

export class TestimonialsCarousel {
    constructor() {
        try {
            this.container = document.querySelector('.testimonials-carousel');
            this.track = document.querySelector('.testimonials-track');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.dotsContainer = document.querySelector('.testimonials-dots');
            this.prevBtn = document.querySelector('.testimonials-prev');
            this.nextBtn = document.querySelector('.testimonials-next');

            this.currentIndex = 0;

            // Store bound handlers for cleanup
            this.boundHandlers = {
                prevHandler: null,
                nextHandler: null,
                scrollHandler: null,
                dotHandlers: new Map()
            };

            if (!this.container) {
                if (window.location.hostname === 'localhost') {
                    console.warn('TestimonialsCarousel: testimonials-carousel element not found');
                }
                return;
            }

            if (this.cards.length === 0) {
                if (window.location.hostname === 'localhost') {
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
                if (window.location.hostname === 'localhost') {
                    console.log('TestimonialsCarousel: Only one testimonial, skipping carousel initialization');
                }
                return;
            }

            this.createDots();
            this.addEventListeners();
        } catch (error) {
            console.error('TestimonialsCarousel init error:', error);
        }
    }

    createDots() {
        try {
            if (!this.dotsContainer) {
                if (window.location.hostname === 'localhost') {
                    console.warn('TestimonialsCarousel: dots container not found, skipping dots creation');
                }
                return;
            }

            // Create one dot per card for individual navigation
            this.cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
                if (index === 0) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.setAttribute('aria-selected', 'false');
                }

                const handler = () => this.goToSlide(index);
                dot.addEventListener('click', handler);
                this.boundHandlers.dotHandlers.set(dot, handler);
                this.dotsContainer.appendChild(dot);
            });

            this.dots = document.querySelectorAll('.testimonial-dot');
        } catch (error) {
            console.error('TestimonialsCarousel createDots error:', error);
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
                // Calculate gap dynamically from computed style
                const computedStyle = window.getComputedStyle(this.track);
                const gap = parseFloat(computedStyle.gap) || 32; // fallback to 2rem = 32px
                const cardWidth = this.cards[0].offsetWidth + gap;
                const newIndex = Math.round(scrollLeft / cardWidth);
                if (newIndex !== this.currentIndex && newIndex < this.cards.length) {
                    this.currentIndex = newIndex;
                    this.updateDots();
                }
            }, 16); // 60fps

            this.track.addEventListener('scroll', this.boundHandlers.scrollHandler, { passive: true });
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
                if (window.location.hostname === 'localhost') {
                    console.warn('TestimonialsCarousel: No cards available to update');
                }
                return;
            }

            // Calculate gap dynamically from computed style
            const computedStyle = window.getComputedStyle(this.track);
            const gap = parseFloat(computedStyle.gap) || 32; // fallback to 2rem = 32px
            const cardWidth = this.cards[0].offsetWidth + gap;
            this.track.scrollTo({
                left: this.currentIndex * cardWidth,
                behavior: 'smooth'
            });
            this.updateDots();
        } catch (error) {
            console.error('TestimonialsCarousel updateCarousel error:', error);
        }
    }

    updateDots() {
        try {
            if (!this.dots || this.dots.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('TestimonialsCarousel: No dots available to update');
                }
                return;
            }

            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                    dot.setAttribute('tabindex', '0');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-selected', 'false');
                    dot.setAttribute('tabindex', '-1');
                }
            });
        } catch (error) {
            console.error('TestimonialsCarousel updateDots error:', error);
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

        // Remove dot click listeners
        this.boundHandlers.dotHandlers.forEach((handler, dot) => {
            dot.removeEventListener('click', handler);
        });
        this.boundHandlers.dotHandlers.clear();

        // Clear references
        this.container = null;
        this.track = null;
        this.cards = null;
        this.dotsContainer = null;
        this.dots = null;
        this.boundHandlers = null;
    }
}
