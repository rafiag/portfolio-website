/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

// Store handlers for cleanup
const anchorHandlers = new Map();

export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const handler = function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
        anchor.addEventListener('click', handler);
        // Store handler for cleanup
        anchorHandlers.set(anchor, handler);
    });
}

/**
 * Cleanup function to remove all anchor click listeners
 * Call this function when smooth scroll is no longer needed
 */
export function cleanupSmoothScroll() {
    anchorHandlers.forEach((handler, anchor) => {
        anchor.removeEventListener('click', handler);
    });
    anchorHandlers.clear();
}
