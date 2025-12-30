/**
 * Portfolio Filter Module
 * Handles portfolio filtering functionality
 *
 * Features:
 * - Dynamic filtering of portfolio cards by category
 * - Smooth fade-in/fade-out animations
 * - Active filter button state management
 * - Memory-safe timer cleanup
 */

export class PortfolioFilter {
    /**
     * Creates a new PortfolioFilter instance
     * Automatically initializes if filter buttons and cards are found
     */
    constructor() {
        try {
            this.filterBtns = document.querySelectorAll('.filter-btn');
            this.portfolioCards = document.querySelectorAll('.portfolio-card');

            // Store bound handlers and active timers for cleanup
            this.boundHandlers = new Map();
            this.activeTimers = new Set();

            if (this.filterBtns.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioFilter: no filter buttons found');
                }
                return;
            }

            if (this.portfolioCards.length === 0) {
                if (window.location.hostname === 'localhost') {
                    console.warn('PortfolioFilter: no portfolio cards found');
                }
                return;
            }

            this.init();
        } catch (error) {
            console.error('PortfolioFilter initialization error:', error);
        }
    }

    /**
     * Initialize the filter by attaching click listeners to filter buttons
     * @returns {void}
     */
    init() {
        try {
            this.filterBtns.forEach(btn => {
                const handler = () => this.filter(btn);
                btn.addEventListener('click', handler);
                this.boundHandlers.set(btn, handler);
            });
        } catch (error) {
            console.error('PortfolioFilter init error:', error);
        }
    }

    /**
     * Filter portfolio cards based on the clicked filter button
     * Shows/hides cards with smooth fade animations
     * @param {HTMLElement} btn - The filter button that was clicked
     * @returns {void}
     */
    filter(btn) {
        try {
            const filter = btn.dataset.filter;

            if (!filter) {
                if (window.location.hostname === 'localhost') {
                    console.warn('Filter button missing data-filter attribute');
                }
                return;
            }

            // Update active button
            this.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            this.portfolioCards.forEach(card => {
                const categories = card.dataset.category || '';
                const categoryList = categories.split(' ');

                // Show card if filter is 'all' or if any category matches
                const shouldShow = filter === 'all' || categoryList.includes(filter);

                if (shouldShow) {
                    card.style.display = 'block';
                    const timerId = setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        this.activeTimers.delete(timerId);
                    }, 10);
                    this.activeTimers.add(timerId);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    const timerId = setTimeout(() => {
                        card.style.display = 'none';
                        this.activeTimers.delete(timerId);
                    }, 400);
                    this.activeTimers.add(timerId);
                }
            });
        } catch (error) {
            console.error('Portfolio filter error:', error);
        }
    }

    /**
     * Cleanup method to remove all event listeners and clear timers
     * Call this method when the filter is no longer needed
     * @returns {void}
     */
    destroy() {
        // Clear all active timers
        this.activeTimers.forEach(timerId => {
            clearTimeout(timerId);
        });
        this.activeTimers.clear();

        // Remove filter button listeners
        this.boundHandlers.forEach((handler, btn) => {
            btn.removeEventListener('click', handler);
        });
        this.boundHandlers.clear();

        // Clear references
        this.filterBtns = null;
        this.portfolioCards = null;
    }
}
