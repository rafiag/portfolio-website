/**
 * Portfolio Filter Module
 * Handles portfolio filtering functionality
 */

export class PortfolioFilter {
    constructor() {
        try {
            this.filterBtns = document.querySelectorAll('.filter-btn');
            this.portfolioCards = document.querySelectorAll('.portfolio-card');

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

    init() {
        try {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => this.filter(btn));
            });
        } catch (error) {
            console.error('PortfolioFilter init error:', error);
        }
    }

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
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        } catch (error) {
            console.error('Portfolio filter error:', error);
        }
    }
}
