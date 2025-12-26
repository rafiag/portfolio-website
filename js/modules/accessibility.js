/**
 * Accessibility Module
 * Handles image loading and keyboard navigation enhancements
 */

// Image Loading Handler with Error Handling
export class ImageLoader {
    constructor() {
        // Select all images, not just lazy-loaded ones
        this.images = document.querySelectorAll('img');
        // Store bound handlers for cleanup
        this.imageHandlers = new Map();
        this.init();
    }

    init() {
        this.images.forEach(img => {
            // Skip hero/LCP images with fetchpriority="high" to avoid render delay
            if (img.getAttribute('fetchpriority') === 'high') {
                return;
            }

            // Add loading class
            img.classList.add('image-loading');

            // Create bound handlers
            const loadHandler = () => {
                img.classList.remove('image-loading');
                img.classList.add('image-loaded');
            };

            const errorHandler = () => {
                img.classList.remove('image-loading');
                img.classList.add('image-error');

                // Set fallback placeholder
                const fallbackSrc = this.createPlaceholder(img.alt || 'Image');
                img.src = fallbackSrc;

                // Add aria-label for accessibility
                img.setAttribute('aria-label', `Failed to load: ${img.alt || 'image'}`);

                if (window.location.hostname === 'localhost') {
                    console.warn(`Failed to load image: ${img.dataset.originalSrc || img.src}`);
                }
            };

            // Handle successful load
            img.addEventListener('load', loadHandler);

            // Handle error
            img.addEventListener('error', errorHandler);

            // Store handlers for cleanup
            this.imageHandlers.set(img, { load: loadHandler, error: errorHandler });

            // Store original src for error logging
            if (!img.dataset.originalSrc) {
                img.dataset.originalSrc = img.src;
            }
        });
    }

    createPlaceholder(altText) {
        // Create a simple SVG placeholder
        const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3E${encodeURIComponent(altText)}%3C/text%3E%3C/svg%3E`;
        return svg;
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the image loader is no longer needed
     */
    destroy() {
        // Remove all image event listeners
        this.imageHandlers.forEach((handlers, img) => {
            img.removeEventListener('load', handlers.load);
            img.removeEventListener('error', handlers.error);
        });
        this.imageHandlers.clear();
        this.images = null;
    }
}

// Keyboard Navigation Enhancement
export class KeyboardNavigation {
    constructor() {
        // Store elements and handlers for cleanup
        this.mobileMenuToggle = null;
        this.portfolioItems = null;
        this.companyCards = null;
        this.skipLink = null;
        this.handlers = new Map();
        this.init();
    }

    init() {
        // Handle mobile menu toggle with keyboard
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (this.mobileMenuToggle) {
            const handler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.mobileMenuToggle.click();
                }
            };
            this.mobileMenuToggle.addEventListener('keydown', handler);
            this.handlers.set(this.mobileMenuToggle, handler);
        }

        // Handle portfolio item keyboard navigation
        this.portfolioItems = document.querySelectorAll('.portfolio-item[tabindex="0"]');
        this.portfolioItems.forEach(item => {
            const handler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            };
            item.addEventListener('keydown', handler);
            this.handlers.set(item, handler);
        });

        // Handle experience company card keyboard navigation
        this.companyCards = document.querySelectorAll('.experience-company-card');
        this.companyCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            const handler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            };
            card.addEventListener('keydown', handler);
            this.handlers.set(card, handler);
        });

        // Skip to main content link
        this.addSkipLink();
    }

    addSkipLink() {
        this.skipLink = document.createElement('a');
        this.skipLink.href = '#experience';
        this.skipLink.className = 'skip-link';
        this.skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(this.skipLink, document.body.firstChild);
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when keyboard navigation is no longer needed
     */
    destroy() {
        // Remove all keydown event listeners
        this.handlers.forEach((handler, element) => {
            element.removeEventListener('keydown', handler);
        });
        this.handlers.clear();

        // Remove skip link from DOM
        if (this.skipLink && this.skipLink.parentNode) {
            this.skipLink.parentNode.removeChild(this.skipLink);
        }

        // Clear references
        this.mobileMenuToggle = null;
        this.portfolioItems = null;
        this.companyCards = null;
        this.skipLink = null;
    }
}
