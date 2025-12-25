/**
 * Portfolio Modal Module
 * Handles portfolio project modal display and interactions
 */

import { portfolioData } from '../data/portfolio-data.js';

export class PortfolioModal {
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

            // Store bound event handlers for cleanup
            this.boundHandlers = {
                closeModal: () => this.closeModal(),
                escapeHandler: (e) => {
                    if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                        this.closeModal();
                    }
                },
                portfolioItemHandlers: new Map()
            };

            this.init();
        } catch (error) {
            console.error('PortfolioModal initialization error:', error);
        }
    }

    init() {
        try {
            // Add click listeners to all portfolio items
            this.portfolioItems.forEach(item => {
                const handler = () => {
                    try {
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
        } catch (error) {
            console.error('Error opening modal:', error);
            this.modal.classList.remove('loading');
        }
    }

    closeModal() {
        try {
            this.modal.classList.remove('active');
            this.modal.classList.remove('loading');
            document.body.style.overflow = 'auto';
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }

    /**
     * Cleanup method to remove all event listeners and prevent memory leaks
     * Call this method when the modal is no longer needed
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

            // Clear references
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
