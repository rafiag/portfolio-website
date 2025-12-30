/**
 * Portfolio Modal Module
 * Handles portfolio project modal display and interactions
 *
 * Features:
 * - Opens modal with portfolio project details
 * - Focus trap implementation for accessibility
 * - Keyboard navigation (Escape to close, Tab to cycle)
 * - Focus restoration when modal closes
 * - Click outside to close functionality
 */

import { portfolioData } from '../data/portfolio-data.js';

export class PortfolioModal {
    /**
     * Creates a new PortfolioModal instance
     * @param {string} itemSelector - CSS selector for portfolio items that trigger the modal
     */
    constructor(itemSelector = '.portfolio-item[data-portfolio-id], .portfolio-card[data-portfolio-id]') {
        try {
            this.modal = document.getElementById('portfolioModal');

            if (!this.modal) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioModal: modal element not found');
                }
                return;
            }

            this.modalOverlay = this.modal.querySelector('.modal-overlay');
            this.modalClose = this.modal.querySelector('.modal-close');
            this.portfolioItems = document.querySelectorAll(itemSelector);

            if (this.portfolioItems.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioModal: no portfolio items found');
                }
            }

            // Store the element that triggered the modal for focus restoration
            this.triggerElement = null;

            // Store focusable elements within the modal
            this.focusableElements = [];
            this.firstFocusableElement = null;
            this.lastFocusableElement = null;

            // Store bound event handlers for cleanup
            this.boundHandlers = {
                closeModal: () => this.closeModal(),
                escapeHandler: (e) => {
                    if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                        this.closeModal();
                    }
                },
                focusTrapHandler: (e) => this.handleFocusTrap(e),
                portfolioItemHandlers: new Map()
            };

            this.init();
        } catch (error) {
            console.error('PortfolioModal initialization error:', error);
        }
    }

    /**
     * Initialize the modal by attaching event listeners
     * @returns {void}
     */
    init() {
        try {
            // Add click listeners to all portfolio items
            this.portfolioItems.forEach(item => {
                const handler = (e) => {
                    try {
                        // Store the element that triggered the modal
                        this.triggerElement = e.currentTarget;

                        const portfolioId = item.getAttribute('data-portfolio-id');
                        if (portfolioId && portfolioData[portfolioId]) {
                            this.openModal(portfolioData[portfolioId]);
                        } else {
                            if (window.location.hostname === 'localhost') {
                                console.warn(`Portfolio data not found for ID: ${portfolioId}`);
                            }
                        }
                    } catch (error) {
                        console.error('Error opening modal:', error);
                    }
                };
                item.addEventListener('click', handler);
                // Store handler for cleanup
                this.boundHandlers.portfolioItemHandlers.set(item, handler);
            });

            // Close modal handlers
            if (this.modalClose) {
                this.modalClose.addEventListener('click', this.boundHandlers.closeModal);
            }
            if (this.modalOverlay) {
                this.modalOverlay.addEventListener('click', this.boundHandlers.closeModal);
            }

            // Close on Escape key
            document.addEventListener('keydown', this.boundHandlers.escapeHandler);
        } catch (error) {
            console.error('PortfolioModal init error:', error);
        }
    }

    /**
     * Get all focusable elements within the modal
     * @returns {HTMLElement[]} Array of focusable elements
     */
    getFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        return Array.from(this.modal.querySelectorAll(focusableSelectors))
            .filter(el => {
                // Filter out hidden elements
                return el.offsetParent !== null;
            });
    }

    /**
     * Handle focus trap - keeps focus within modal
     * Implements keyboard navigation with Tab and Shift+Tab
     * @param {KeyboardEvent} e - The keyboard event
     * @returns {void}
     */
    handleFocusTrap(e) {
        // Only trap Tab key
        if (e.key !== 'Tab') {
            return;
        }

        // Get current focusable elements (in case modal content changed)
        this.focusableElements = this.getFocusableElements();

        if (this.focusableElements.length === 0) {
            // No focusable elements, prevent default
            e.preventDefault();
            return;
        }

        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

        // Shift + Tab (backward)
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusableElement) {
                e.preventDefault();
                this.lastFocusableElement.focus();
            }
        }
        // Tab (forward)
        else {
            if (document.activeElement === this.lastFocusableElement) {
                e.preventDefault();
                this.firstFocusableElement.focus();
            }
        }
    }

    /**
     * Open the modal and populate it with portfolio project data
     * @param {Object} data - Portfolio item data object
     * @param {string} data.title - Project title
     * @param {string} data.description - Project description
     * @param {string} data.image - Image URL path
     * @param {string[]} [data.details] - Array of project detail points
     * @param {string[]} [data.tags] - Array of technology/skill tags
     * @param {string} [data.link] - External project URL
     * @returns {void}
     * @throws {Error} If required modal elements are not found in DOM
     */
    openModal(data) {
        try {
            // Show loading state
            this.modal.classList.add('loading');

            // Populate modal content
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalImage = document.getElementById('modalImage');
            const detailsList = document.getElementById('modalDetailsList');
            const tagsContainer = document.getElementById('modalTags');
            const linkButton = document.getElementById('modalLink');

            if (!modalTitle || !modalDescription || !modalImage || !detailsList || !tagsContainer || !linkButton) {
                throw new Error('Modal elements not found in DOM');
            }

            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalImage.alt = data.title;

            // Handle image loading with error state
            modalImage.addEventListener('load', () => {
                this.modal.classList.remove('loading');
            }, { once: true });

            modalImage.addEventListener('error', () => {
                console.error('Failed to load modal image:', data.image);
                this.modal.classList.remove('loading');
                modalImage.alt = `${data.title} - Image failed to load`;
            }, { once: true });

            modalImage.src = data.image;

            // Populate details list
            detailsList.innerHTML = '';
            if (data.details && Array.isArray(data.details)) {
                data.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    detailsList.appendChild(li);
                });
            }

            // Populate tags
            tagsContainer.innerHTML = '';
            if (data.tags && Array.isArray(data.tags)) {
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    tagsContainer.appendChild(span);
                });
            }

            // Show/hide external link button
            if (data.link && data.link.trim() !== '') {
                linkButton.href = data.link;
                linkButton.style.display = 'inline-block';
            } else {
                linkButton.style.display = 'none';
            }

            // Show modal
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Set up focus trap
            document.addEventListener('keydown', this.boundHandlers.focusTrapHandler);

            // Get focusable elements and focus the first one (close button)
            this.focusableElements = this.getFocusableElements();
            if (this.focusableElements.length > 0) {
                // Focus the close button (first focusable element)
                this.focusableElements[0].focus();
            }
        } catch (error) {
            console.error('Error opening modal:', error);
            this.modal.classList.remove('loading');
        }
    }

    /**
     * Close the modal and restore focus to the trigger element
     * Removes active state, re-enables body scroll, and cleans up focus trap
     * @returns {void}
     */
    closeModal() {
        try {
            this.modal.classList.remove('active');
            this.modal.classList.remove('loading');
            document.body.style.overflow = 'auto';

            // Remove focus trap
            document.removeEventListener('keydown', this.boundHandlers.focusTrapHandler);

            // Restore focus to the element that triggered the modal
            if (this.triggerElement) {
                this.triggerElement.focus();
            }
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the modal is no longer needed
     * @returns {void}
     */
    destroy() {
        try {
            // Remove portfolio item listeners
            this.boundHandlers.portfolioItemHandlers.forEach((handler, item) => {
                item.removeEventListener('click', handler);
            });
            this.boundHandlers.portfolioItemHandlers.clear();

            // Remove close button listeners
            if (this.modalClose) {
                this.modalClose.removeEventListener('click', this.boundHandlers.closeModal);
            }
            if (this.modalOverlay) {
                this.modalOverlay.removeEventListener('click', this.boundHandlers.closeModal);
            }

            // Remove escape key listener
            document.removeEventListener('keydown', this.boundHandlers.escapeHandler);

            // Remove focus trap listener
            document.removeEventListener('keydown', this.boundHandlers.focusTrapHandler);

            // Clear references
            this.triggerElement = null;
            this.focusableElements = [];
            this.firstFocusableElement = null;
            this.lastFocusableElement = null;
            this.modal = null;
            this.modalOverlay = null;
            this.modalClose = null;
            this.portfolioItems = null;
            this.boundHandlers = null;
        } catch (error) {
            console.error('PortfolioModal destroy error:', error);
        }
    }
}
