/**
 * Portfolio Carousel Module
 * Handles portfolio carousel navigation and interactions
 *
 * Features:
 * - Click-based navigation with prev/next buttons
 * - Touch/swipe support for mobile devices
 * - Throttled scroll tracking for performance
 * - Automatic carousel state updates
 *
 * OPTIMIZED: Uses throttling for scroll events
 */

import { throttle } from './performance-utils.js';
import { ANIMATION, LAYOUT } from '../constants.js';

export class PortfolioCarousel {
    /**
     * Creates a new PortfolioCarousel instance
     * Automatically initializes if carousel track and items are found
     */
    constructor() {
        try {
            this.track = document.querySelector('.carousel-track');
            this.prevBtn = document.querySelector('.carousel-prev');
            this.nextBtn = document.querySelector('.carousel-next');
            this.items = document.querySelectorAll('.portfolio-item');
            this.currentIndex = 0;

            // Store bound handlers for cleanup
            this.boundHandlers = {
                prevHandler: null,
                nextHandler: null,
                touchStartHandler: null,
                touchMoveHandler: null,
                touchEndHandler: null,
                scrollHandler: null
            };

            if (!this.track) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: carousel-track element not found');
                }
                return;
            }

            if (this.items.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: no portfolio items found');
                }
                return;
            }

            this.init();
        } catch (error) {
            console.error('PortfolioCarousel initialization error:', error);
        }
    }

    /**
     * Initialize the carousel by attaching event listeners
     * @returns {void}
     */
    init() {
        try {
            this.addEventListeners();
            this.updateCarousel();
        } catch (error) {
            console.error('PortfolioCarousel init error:', error);
        }
    }

    /**
     * Attach all event listeners for carousel interactions
     * Includes button clicks, touch/swipe events, and scroll tracking
     * @returns {void}
     */
    addEventListeners() {
        // Button handlers
        this.boundHandlers.prevHandler = () => this.prev();
        this.boundHandlers.nextHandler = () => this.next();

        this.prevBtn?.addEventListener('click', this.boundHandlers.prevHandler);
        this.nextBtn?.addEventListener('click', this.boundHandlers.nextHandler);

        // Touch/swipe support
        let startX = 0;
        let currentX = 0;

        this.boundHandlers.touchStartHandler = (e) => {
            startX = e.touches[0].clientX;
        };

        this.boundHandlers.touchMoveHandler = (e) => {
            currentX = e.touches[0].clientX;
        };

        this.boundHandlers.touchEndHandler = () => {
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        };

        this.track.addEventListener('touchstart', this.boundHandlers.touchStartHandler);
        this.track.addEventListener('touchmove', this.boundHandlers.touchMoveHandler);
        this.track.addEventListener('touchend', this.boundHandlers.touchEndHandler);

        // Scroll tracking with throttling for better performance
        this.boundHandlers.scrollHandler = throttle(() => {
            const scrollLeft = this.track.scrollLeft;
            const itemWidth = this.items[0].offsetWidth + LAYOUT.CAROUSEL_GAP; // item width + gap
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== this.currentIndex) {
                this.currentIndex = newIndex;
            }
        }, ANIMATION.SCROLL_THROTTLE); // 60fps

        this.track.addEventListener('scroll', this.boundHandlers.scrollHandler, { passive: true });
    }

    /**
     * Navigate to a specific carousel slide
     * @param {number} index - The zero-based index of the slide to navigate to
     * @returns {void}
     */
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    /**
     * Navigate to the previous carousel slide
     * @returns {void}
     */
    prev() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateCarousel();
    }

    /**
     * Navigate to the next carousel slide
     * @returns {void}
     */
    next() {
        this.currentIndex = Math.min(this.items.length - 1, this.currentIndex + 1);
        this.updateCarousel();
    }

    /**
     * Update carousel position to show the current slide
     * Smoothly scrolls the track to the selected item
     * @returns {void}
     */
    updateCarousel() {
        try {
            if (!this.items[0]) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: No items available to update');
                }
                return;
            }
            const itemWidth = this.items[0].offsetWidth + LAYOUT.CAROUSEL_GAP; // item width + gap
            this.track.scrollTo({
                left: this.currentIndex * itemWidth,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error('PortfolioCarousel updateCarousel error:', error);
        }
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the carousel is no longer needed
     * @returns {void}
     */
    destroy() {
        // Remove button listeners
        if (this.prevBtn && this.boundHandlers.prevHandler) {
            this.prevBtn.removeEventListener('click', this.boundHandlers.prevHandler);
        }
        if (this.nextBtn && this.boundHandlers.nextHandler) {
            this.nextBtn.removeEventListener('click', this.boundHandlers.nextHandler);
        }

        // Remove touch event listeners
        if (this.track) {
            if (this.boundHandlers.touchStartHandler) {
                this.track.removeEventListener('touchstart', this.boundHandlers.touchStartHandler);
            }
            if (this.boundHandlers.touchMoveHandler) {
                this.track.removeEventListener('touchmove', this.boundHandlers.touchMoveHandler);
            }
            if (this.boundHandlers.touchEndHandler) {
                this.track.removeEventListener('touchend', this.boundHandlers.touchEndHandler);
            }
            if (this.boundHandlers.scrollHandler) {
                this.track.removeEventListener('scroll', this.boundHandlers.scrollHandler);
            }
        }

        // Clear references
        this.track = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.items = null;
        this.boundHandlers = null;
    }
}
