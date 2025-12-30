/**
 * Shared Constants
 * Centralized constants for consistent values across all modules
 * Prevents magic numbers and improves maintainability
 */

/**
 * Scroll-related thresholds
 */
export const SCROLL_THRESHOLDS = {
    BACK_TO_TOP: 300, // Pixels scrolled before back-to-top button appears
    NAVBAR_STICKY: 100 // Pixels scrolled before navbar becomes sticky (if applicable)
};

/**
 * Animation durations and timing
 */
export const ANIMATION = {
    FRAME_DURATION: 16, // Target frame duration for 60fps (1000ms / 60 = 16.67ms)
    STATS_COUNTER: 2000, // Statistics counter animation duration in ms
    CAROUSEL_TRANSITION: 500, // Carousel slide transition duration in ms
    SCROLL_THROTTLE: 16, // Throttle wait time for scroll handlers (60fps)
    RESIZE_THROTTLE: 250 // Throttle wait time for resize handlers
};

/**
 * Intersection Observer configuration
 */
export const INTERSECTION_OBSERVER = {
    THRESHOLD: 0.1, // Trigger when 10% of element is visible
    ROOT_MARGIN: '50px', // Trigger 50px before entering viewport
    STATS_THRESHOLD: 0.1, // Statistics counter visibility threshold
    STATS_ROOT_MARGIN: '50px' // Statistics counter root margin
};

/**
 * Layout and spacing constants
 */
export const LAYOUT = {
    CAROUSEL_GAP: 32, // Default carousel gap in pixels (2rem = 32px)
    MOBILE_BREAKPOINT: 480, // Mobile breakpoint in pixels
    TABLET_BREAKPOINT: 768, // Tablet breakpoint in pixels
    DESKTOP_BREAKPOINT: 1024 // Desktop breakpoint in pixels
};

/**
 * Performance and accessibility settings
 */
export const PERFORMANCE = {
    DEBOUNCE_DEFAULT: 300, // Default debounce wait time in ms
    THROTTLE_DEFAULT: 100, // Default throttle wait time in ms
    PASSIVE_LISTENER: true // Use passive event listeners where possible
};

/**
 * Development mode detection
 */
export const IS_DEV = window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';

/**
 * Browser feature detection
 */
export const BROWSER_SUPPORT = {
    SMOOTH_SCROLL: 'scrollBehavior' in document.documentElement.style,
    INTERSECTION_OBSERVER: 'IntersectionObserver' in window,
    REQUEST_ANIMATION_FRAME: 'requestAnimationFrame' in window
};
