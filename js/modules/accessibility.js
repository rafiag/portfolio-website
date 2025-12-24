/**
 * Accessibility Module
 * Handles image loading and keyboard navigation enhancements
 */

// Image Loading Handler with Error Handling
export class ImageLoader {
    constructor() {
        // Select all images, not just lazy-loaded ones
        this.images = document.querySelectorAll('img');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            // Add loading class
            img.classList.add('image-loading');

            // Handle successful load
            img.addEventListener('load', () => {
                img.classList.remove('image-loading');
                img.classList.add('image-loaded');
            });

            // Handle error
            img.addEventListener('error', () => {
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
            });

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
}

// Keyboard Navigation Enhancement
export class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        // Handle mobile menu toggle with keyboard
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    mobileMenuToggle.click();
                }
            });
        }

        // Handle portfolio item keyboard navigation
        const portfolioItems = document.querySelectorAll('.portfolio-item[tabindex="0"]');
        portfolioItems.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Handle experience company card keyboard navigation
        const companyCards = document.querySelectorAll('.experience-company-card');
        companyCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Skip to main content link
        this.addSkipLink();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#experience';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}
