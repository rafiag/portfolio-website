/**
 * Mobile Menu Module
 * Handles mobile navigation menu toggle and interactions
 */

export class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');

        if (this.menuToggle && this.navLinks) {
            this.init();
        }
    }

    init() {
        // Toggle menu on button click
        this.menuToggle.addEventListener('click', () => {
            this.toggle();
        });

        // Close menu when clicking on a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.close();
            }
        });
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
}
