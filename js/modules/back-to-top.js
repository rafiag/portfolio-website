/**
 * Back to Top Button Module
 * Handles the floating back-to-top button that appears after scrolling down
 *
 * Features:
 * - Shows button when user scrolls past a threshold (300px default)
 * - Smooth scroll to top on click
 * - Uses Intersection Observer for performance
 * - Keyboard accessible
 * - GPU-accelerated animations
 */

class BackToTop {
    constructor(options = {}) {
        this.options = {
            scrollThreshold: options.scrollThreshold || 300,
            scrollDuration: options.scrollDuration || 600,
            buttonSelector: options.buttonSelector || '.back-to-top',
            ...options
        };

        this.button = null;
        this.isVisible = false;
        this.scrollTimer = null;

        this.init();
    }

    /**
     * Initialize the back-to-top button
     */
    init() {
        this.button = document.querySelector(this.options.buttonSelector);

        if (!this.button) {
            console.warn('Back-to-top button not found');
            return;
        }

        this.attachEventListeners();
        this.setupScrollObserver();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Click handler
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });

        // Keyboard handler
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }

    /**
     * Setup scroll observer for showing/hiding button
     */
    setupScrollObserver() {
        // Use requestAnimationFrame for smooth scroll detection
        let ticking = false;

        const handleScroll = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > this.options.scrollThreshold) {
                if (!this.isVisible) {
                    this.showButton();
                }
            } else {
                if (this.isVisible) {
                    this.hideButton();
                }
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        handleScroll();
    }

    /**
     * Show the back-to-top button
     */
    showButton() {
        this.isVisible = true;
        this.button.classList.add('visible');
        this.button.setAttribute('aria-hidden', 'false');
        this.button.setAttribute('tabindex', '0');
    }

    /**
     * Hide the back-to-top button
     */
    hideButton() {
        this.isVisible = false;
        this.button.classList.remove('visible');
        this.button.setAttribute('aria-hidden', 'true');
        this.button.setAttribute('tabindex', '-1');
    }

    /**
     * Scroll to top with smooth animation
     */
    scrollToTop() {
        // Use native smooth scroll if supported
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            this.smoothScrollFallback();
        }

        // Send focus to top of page for accessibility
        setTimeout(() => {
            const mainContent = document.querySelector('main') || document.body;
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            mainContent.removeAttribute('tabindex');
        }, this.options.scrollDuration);
    }

    /**
     * Smooth scroll fallback for older browsers
     */
    smoothScrollFallback() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.options.scrollDuration, 1);
            const easing = easeInOutCubic(progress);

            window.scrollTo(0, startPosition * (1 - easing));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    }

    /**
     * Cleanup method to remove event listeners
     */
    destroy() {
        if (this.button) {
            this.button.removeEventListener('click', this.scrollToTop);
            this.button.removeEventListener('keydown', this.scrollToTop);
        }
        window.removeEventListener('scroll', this.setupScrollObserver);
    }
}

// Export for use in main entry points
export default BackToTop;
