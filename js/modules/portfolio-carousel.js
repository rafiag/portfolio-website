/**
 * Portfolio Carousel Module
 * Handles portfolio carousel navigation and interactions
 * OPTIMIZED: Uses throttling for scroll events
 */

import { throttle } from './performance-utils.js';

export class PortfolioCarousel {
    constructor() {
        try {
            this.track = document.querySelector('.carousel-track');
            this.prevBtn = document.querySelector('.carousel-prev');
            this.nextBtn = document.querySelector('.carousel-next');
            this.dotsContainer = document.querySelector('.carousel-dots');
            this.items = document.querySelectorAll('.portfolio-item');
            this.currentIndex = 0;

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

            if (!this.dotsContainer) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: carousel-dots container not found');
                }
                return;
            }

            this.init();
        } catch (error) {
            console.error('PortfolioCarousel initialization error:', error);
        }
    }

    init() {
        try {
            this.createDots();
            this.addEventListeners();
            this.updateCarousel();
        } catch (error) {
            console.error('PortfolioCarousel init error:', error);
        }
    }

    createDots() {
        try {
            this.items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
            this.dots = document.querySelectorAll('.carousel-dot');
        } catch (error) {
            console.error('PortfolioCarousel createDots error:', error);
        }
    }

    addEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Touch/swipe support
        let startX = 0;
        let currentX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        // Scroll tracking with throttling for better performance
        const handleScroll = throttle(() => {
            const scrollLeft = this.track.scrollLeft;
            const itemWidth = this.items[0].offsetWidth + 32; // item width + gap
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== this.currentIndex) {
                this.currentIndex = newIndex;
                this.updateDots();
            }
        }, 16); // 60fps

        this.track.addEventListener('scroll', handleScroll, { passive: true });
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
        this.currentIndex = Math.min(this.items.length - 1, this.currentIndex + 1);
        this.updateCarousel();
    }

    updateCarousel() {
        try {
            if (!this.items[0]) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: No items available to update');
                }
                return;
            }
            const itemWidth = this.items[0].offsetWidth + 32; // item width + gap
            this.track.scrollTo({
                left: this.currentIndex * itemWidth,
                behavior: 'smooth'
            });
            this.updateDots();
        } catch (error) {
            console.error('PortfolioCarousel updateCarousel error:', error);
        }
    }

    updateDots() {
        try {
            if (!this.dots || this.dots.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioCarousel: No dots available to update');
                }
                return;
            }
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        } catch (error) {
            console.error('PortfolioCarousel updateDots error:', error);
        }
    }
}
