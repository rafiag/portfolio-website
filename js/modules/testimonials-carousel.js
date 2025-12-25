/**
 * Testimonials Carousel Module
 * Handles auto-rotating testimonials with pause-on-hover functionality
 * OPTIMIZED: Uses RAF for smooth animations and proper cleanup
 */

import { throttle } from './performance-utils.js';

export class TestimonialsCarousel {
    constructor(options = {}) {
        try {
            this.container = document.querySelector('.testimonials-carousel');
            this.track = document.querySelector('.testimonials-track');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.dotsContainer = document.querySelector('.testimonials-dots');
            this.prevBtn = document.querySelector('.testimonials-prev');
            this.nextBtn = document.querySelector('.testimonials-next');

            // Configuration
            this.config = {
                autoRotateInterval: options.autoRotateInterval || 5000, // 5 seconds
                transitionDuration: options.transitionDuration || 600, // 600ms
                cardsPerView: options.cardsPerView || 2, // Cards to show at once
                ...options
            };

            this.currentIndex = 0;
            this.isTransitioning = false;
            this.isPaused = false;
            this.autoRotateTimer = null;
            this.cardsPerView = 2; // Default to 2 cards
            this.isMobile = false;

            // Store bound handlers for cleanup
            this.boundHandlers = {
                prevHandler: null,
                nextHandler: null,
                mouseEnterHandler: null,
                mouseLeaveHandler: null,
                dotHandlers: new Map(),
                cardMouseEnterHandlers: new Map(),
                cardMouseLeaveHandlers: new Map()
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

            // Detect mobile/desktop and adjust cards per view
            this.checkViewport();
            window.addEventListener('resize', () => this.checkViewport());

            this.createDots();
            this.addEventListeners();
            this.updateCarousel();
            this.startAutoRotate();
        } catch (error) {
            console.error('TestimonialsCarousel init error:', error);
        }
    }

    checkViewport() {
        const previousIsMobile = this.isMobile;
        this.isMobile = window.innerWidth < 769; // Tablet breakpoint
        this.cardsPerView = this.isMobile ? 1 : 2;

        // If viewport changed, update carousel
        if (previousIsMobile !== this.isMobile && this.cards.length > 0) {
            this.updateCarousel();
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

            // Calculate number of slides (groups of cards)
            // For 4 cards with 2 per view = 2 slides
            const numSlides = Math.ceil(this.cards.length / this.cardsPerView);

            for (let slideIndex = 0; slideIndex < numSlides; slideIndex++) {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                dot.setAttribute('role', 'button');
                const cardIndices = slideIndex * this.cardsPerView;
                dot.setAttribute('aria-label', `Go to slide ${slideIndex + 1}`);
                if (slideIndex === 0) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                }

                const handler = () => this.goToSlide(cardIndices);
                dot.addEventListener('click', handler);
                this.boundHandlers.dotHandlers.set(dot, handler);
                this.dotsContainer.appendChild(dot);
            }

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

            // Pause on hover for the entire carousel
            this.boundHandlers.mouseEnterHandler = () => this.pauseAutoRotate();
            this.boundHandlers.mouseLeaveHandler = () => this.resumeAutoRotate();

            this.container.addEventListener('mouseenter', this.boundHandlers.mouseEnterHandler);
            this.container.addEventListener('mouseleave', this.boundHandlers.mouseLeaveHandler);

            // Also pause on individual card hover for extra assurance
            this.cards.forEach((card) => {
                const enterHandler = () => this.pauseAutoRotate();
                const leaveHandler = () => this.resumeAutoRotate();

                card.addEventListener('mouseenter', enterHandler);
                card.addEventListener('mouseleave', leaveHandler);

                this.boundHandlers.cardMouseEnterHandlers.set(card, enterHandler);
                this.boundHandlers.cardMouseLeaveHandlers.set(card, leaveHandler);
            });
        } catch (error) {
            console.error('TestimonialsCarousel addEventListeners error:', error);
        }
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.currentIndex = index;
        this.updateCarousel();
    }

    prev() {
        if (this.isTransitioning) return;

        // Go back by cardsPerView
        this.currentIndex = (this.currentIndex - this.cardsPerView + this.cards.length) % this.cards.length;
        this.updateCarousel();
    }

    next() {
        if (this.isTransitioning) return;

        // Advance by cardsPerView
        this.currentIndex = (this.currentIndex + this.cardsPerView) % this.cards.length;
        this.updateCarousel();
    }

    updateCarousel() {
        try {
            if (this.cards.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('TestimonialsCarousel: No cards available to update');
                }
                return;
            }

            this.isTransitioning = true;

            // Calculate which cards should be visible
            const visibleIndices = [];
            for (let i = 0; i < this.cardsPerView; i++) {
                const index = (this.currentIndex + i) % this.cards.length;
                visibleIndices.push(index);
            }

            // Hide all cards first (remove active class immediately)
            this.cards.forEach((card) => {
                card.classList.remove('active');
                card.setAttribute('aria-hidden', 'true');
            });

            // Force reflow to ensure removeClass takes effect
            void this.track.offsetHeight;

            // Show visible cards using RAF for smooth animation
            requestAnimationFrame(() => {
                visibleIndices.forEach((index) => {
                    const card = this.cards[index];
                    card.classList.add('active');
                    card.setAttribute('aria-hidden', 'false');
                });
            });

            this.updateDots();

            // Reset transition flag after animation completes
            setTimeout(() => {
                this.isTransitioning = false;
            }, this.config.transitionDuration);
        } catch (error) {
            console.error('TestimonialsCarousel updateCarousel error:', error);
            this.isTransitioning = false;
        }
    }

    updateDots() {
        try {
            if (!this.dots || this.dots.length === 0) {
                return;
            }

            // Calculate which dot should be active based on current index
            const activeSlideIndex = Math.floor(this.currentIndex / this.cardsPerView);

            this.dots.forEach((dot, index) => {
                if (index === activeSlideIndex) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-current', 'false');
                }
            });
        } catch (error) {
            console.error('TestimonialsCarousel updateDots error:', error);
        }
    }

    startAutoRotate() {
        if (this.cards.length <= 1) return;

        this.stopAutoRotate();
        this.autoRotateTimer = setInterval(() => {
            if (!this.isPaused) {
                this.next();
            }
        }, this.config.autoRotateInterval);
    }

    stopAutoRotate() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
    }

    pauseAutoRotate() {
        this.isPaused = true;
    }

    resumeAutoRotate() {
        this.isPaused = false;
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the carousel is no longer needed
     */
    destroy() {
        // Stop auto-rotation
        this.stopAutoRotate();

        // Remove button listeners
        if (this.prevBtn && this.boundHandlers.prevHandler) {
            this.prevBtn.removeEventListener('click', this.boundHandlers.prevHandler);
        }
        if (this.nextBtn && this.boundHandlers.nextHandler) {
            this.nextBtn.removeEventListener('click', this.boundHandlers.nextHandler);
        }

        // Remove container listeners
        if (this.container) {
            if (this.boundHandlers.mouseEnterHandler) {
                this.container.removeEventListener('mouseenter', this.boundHandlers.mouseEnterHandler);
            }
            if (this.boundHandlers.mouseLeaveHandler) {
                this.container.removeEventListener('mouseleave', this.boundHandlers.mouseLeaveHandler);
            }
        }

        // Remove card hover listeners
        this.boundHandlers.cardMouseEnterHandlers.forEach((handler, card) => {
            card.removeEventListener('mouseenter', handler);
        });
        this.boundHandlers.cardMouseEnterHandlers.clear();

        this.boundHandlers.cardMouseLeaveHandlers.forEach((handler, card) => {
            card.removeEventListener('mouseleave', handler);
        });
        this.boundHandlers.cardMouseLeaveHandlers.clear();

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
