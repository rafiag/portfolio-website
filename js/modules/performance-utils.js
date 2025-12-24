/**
 * Performance Utilities Module
 * Helpers for optimizing animations and event handlers
 */

/**
 * Throttle function - limits how often a function can execute
 * @param {Function} func - Function to throttle
 * @param {number} wait - Minimum time between executions in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, wait = 16) { // 16ms ≈ 60fps
    let timeout = null;
    let previous = 0;

    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

/**
 * Debounce function - delays execution until after wait time has passed
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 250) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Request animation frame wrapper with fallback
 * @param {Function} callback - Function to execute on next frame
 * @returns {number} Request ID
 */
export function raf(callback) {
    return window.requestAnimationFrame
        ? window.requestAnimationFrame(callback)
        : setTimeout(callback, 16);
}

/**
 * Cancel animation frame with fallback
 * @param {number} id - Request ID to cancel
 */
export function cancelRaf(id) {
    return window.cancelAnimationFrame
        ? window.cancelAnimationFrame(id)
        : clearTimeout(id);
}

/**
 * Optimized scroll handler using requestAnimationFrame
 * @param {Function} callback - Function to execute on scroll
 * @returns {Function} Optimized scroll handler
 */
export function optimizedScrollHandler(callback) {
    let ticking = false;

    return function() {
        if (!ticking) {
            raf(() => {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get cached element measurements to avoid layout thrashing
 * @param {HTMLElement} element - Element to measure
 * @returns {Object} Cached measurements
 */
export function cacheElementMeasurements(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: element.offsetTop,
        height: element.offsetHeight,
        width: element.offsetWidth,
        rect: rect
    };
}

/**
 * Batch read and write operations to minimize reflows
 * @param {Function} readCallback - Read operations
 * @param {Function} writeCallback - Write operations
 */
export function batchReadWrite(readCallback, writeCallback) {
    raf(() => {
        const readData = readCallback();
        raf(() => {
            writeCallback(readData);
        });
    });
}
