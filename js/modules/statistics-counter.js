/**
 * Statistics Counter Module
 * Provides animated count-up effect for statistics in the hero section
 * Triggers on scroll into view using Intersection Observer
 */

import { INTERSECTION_OBSERVER } from '../constants.js';

export class StatisticsCounter {
    constructor() {
        this.counters = [];
        this.observer = null;
        this.hasAnimated = false;
        this.currentAnimationId = null;
    }

    /**
     * Initialize the statistics counter
     * @returns {StatisticsCounter} Returns this for chaining
     */
    init() {
        this.cacheElements();
        if (this.counters.length > 0) {
            this.setupObserver();
        }
        return this;
    }

    /**
     * Cache all metric value elements
     */
    cacheElements() {
        const metricElements = document.querySelectorAll('.metric-value');

        metricElements.forEach(element => {
            const text = element.textContent.trim();
            const hasSuffix = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''), 10);

            if (!isNaN(number)) {
                this.counters.push({
                    element,
                    target: number,
                    suffix: hasSuffix ? '+' : '',
                    current: 0
                });

                // Set initial state to 0
                element.textContent = '0';
                element.setAttribute('data-target', number);
                if (hasSuffix) {
                    element.setAttribute('data-suffix', '+');
                }
            }
        });
    }

    /**
     * Setup Intersection Observer to trigger animation on scroll
     */
    setupObserver() {
        const options = {
            threshold: INTERSECTION_OBSERVER.STATS_THRESHOLD,
            rootMargin: INTERSECTION_OBSERVER.STATS_ROOT_MARGIN
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                    // Unobserve after animation to prevent re-triggering
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe the metrics container
        const metricsContainer = document.querySelector('.experience-metrics');
        if (metricsContainer) {
            this.observer.observe(metricsContainer);
        }
    }

    /**
     * Animate all counters simultaneously
     * Animation completes independently of scroll position
     * Optimized for minimal DOM operations and 60fps performance
     */
    animateCounters() {
        const duration = 500; // .5 seconds animation for better visibility
        const startTime = performance.now();
        const countersLength = this.counters.length;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            // Use for loop instead of forEach for better performance
            for (let i = 0; i < countersLength; i++) {
                const counter = this.counters[i];
                const value = Math.floor(easeOutQuart * counter.target);

                // Only update DOM if value changed
                if (value !== counter.current) {
                    counter.current = value;
                    counter.element.textContent = value + counter.suffix;
                }
            }

            if (progress < 1) {
                // Continue animation regardless of scroll position
                this.currentAnimationId = requestAnimationFrame(animate);
            } else {
                // Ensure final values are exact (batch update)
                for (let i = 0; i < countersLength; i++) {
                    const counter = this.counters[i];
                    counter.element.textContent = counter.target + counter.suffix;
                }
                this.currentAnimationId = null;
            }
        };

        // Start animation
        this.currentAnimationId = requestAnimationFrame(animate);
    }

    /**
     * Cleanup method to prevent memory leaks
     */
    cleanup() {
        // Cancel any running animation
        if (this.currentAnimationId) {
            cancelAnimationFrame(this.currentAnimationId);
            this.currentAnimationId = null;
        }

        // Disconnect observer
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        this.counters = [];
        this.hasAnimated = false;
    }
}

/**
 * Factory function for easy initialization
 * @returns {StatisticsCounter} Initialized counter instance
 */
export function initStatisticsCounter() {
    return new StatisticsCounter().init();
}
