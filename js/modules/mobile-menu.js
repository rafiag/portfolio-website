/**
 * Mobile Menu Module
 * Handles mobile navigation menu toggle and interactions
 */

export class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');

        // Store bound handlers for cleanup
        this.boundHandlers = {
            toggleHandler: () => this.toggle(),
            closeHandler: () => this.close(),
            outsideClickHandler: (e) => {
                if (!this.navLinks.contains(e.target) && !this.menuToggle.contains(e.target)) {
                    this.close();
                }
            },
            linkHandlers: new Map()
        };

        if (this.menuToggle && this.navLinks) {
            this.init();
        }
    }

    init() {
        // Toggle menu on button click
        this.menuToggle.addEventListener('click', this.boundHandlers.toggleHandler);

        // Close menu when clicking on a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            const handler = () => this.close();
            link.addEventListener('click', handler);
            this.boundHandlers.linkHandlers.set(link, handler);
        });

        // Close menu when clicking outside
        document.addEventListener('click', this.boundHandlers.outsideClickHandler);
    }

    toggle() {
        this.menuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    close() {
        this.menuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the mobile menu is no longer needed
     */
    destroy() {
        // Remove toggle button listener
        if (this.menuToggle) {
            this.menuToggle.removeEventListener('click', this.boundHandlers.toggleHandler);
        }

        // Remove link click listeners
        this.boundHandlers.linkHandlers.forEach((handler, link) => {
            link.removeEventListener('click', handler);
        });
        this.boundHandlers.linkHandlers.clear();

        // Remove document click listener
        document.removeEventListener('click', this.boundHandlers.outsideClickHandler);

        // Clear references
        this.menuToggle = null;
        this.navLinks = null;
        this.boundHandlers = null;
    }
}
