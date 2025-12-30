/**
 * Scroll Animations Module
 * Handles IntersectionObserver-based scroll animations
 * OPTIMIZED: Uses class toggles and unobserves after animation
 */

import { INTERSECTION_OBSERVER, BROWSER_SUPPORT, IS_DEV } from '../constants.js';

export function initScrollAnimations(selector, options = {}) {
    const defaultOptions = {
        threshold: INTERSECTION_OBSERVER.THRESHOLD,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerOptions = { ...defaultOptions, ...options };

    try {
        if (BROWSER_SUPPORT.INTERSECTION_OBSERVER) {
            const observer = new IntersectionObserver((entries) => {
                // Batch DOM operations
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Use class toggle instead of direct style manipulation
                        entry.target.classList.add('animated-in');

                        // Unobserve after animation to improve performance
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe elements
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Add initial state class
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        } else {
            // Fallback for browsers without IntersectionObserver support
            if (IS_DEV) {
                console.warn('IntersectionObserver not supported, showing all elements immediately');
            }
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animated-in');
            });
        }
    } catch (error) {
        console.error('Scroll animations initialization error:', error);
    }
}
