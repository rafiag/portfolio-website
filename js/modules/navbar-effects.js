/**
 * Navbar Effects Module
 * Handles navbar scroll effects and active link highlighting
 * OPTIMIZED: Uses throttling and requestAnimationFrame for 60fps performance
 */

import { throttle, cacheElementMeasurements, optimizedScrollHandler } from './performance-utils.js';

export function initNavbarScrollEffect() {
    try {
        const nav = document.querySelector('.nav');

        if (nav) {
            // Use optimized scroll handler with requestAnimationFrame
            const handleScroll = optimizedScrollHandler(() => {
                try {
                    const currentScroll = window.pageYOffset;

                    // Use class toggle instead of direct style manipulation
                    if (currentScroll > 100) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                } catch (error) {
                    console.error('Navbar scroll effect error:', error);
                }
            });

            window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
            if (window.location.hostname === 'localhost') {
                console.warn('Navigation element not found');
            }
        }
    } catch (error) {
        console.error('Navbar scroll effect initialization error:', error);
    }
}

export function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length === 0 || navLinkItems.length === 0) {
        return;
    }

    // Cache section measurements to avoid layout thrashing
    const sectionMeasurements = Array.from(sections).map(section => ({
        element: section,
        id: section.getAttribute('id'),
        ...cacheElementMeasurements(section)
    }));

    // Throttled update function (max 60fps)
    const updateActiveNavLink = throttle(() => {
        const scrollPosition = window.scrollY + 200;

        // Find active section
        let activeSection = null;
        for (const section of sectionMeasurements) {
            if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
                activeSection = section.id;
                break;
            }
        }

        // Update active links in a single batch
        if (activeSection) {
            navLinkItems.forEach(link => {
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }, 16); // 60fps

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // Recalculate measurements on resize (debounced)
    window.addEventListener('resize', throttle(() => {
        sectionMeasurements.forEach((cached, index) => {
            const section = sections[index];
            const newMeasurements = cacheElementMeasurements(section);
            Object.assign(cached, newMeasurements);
        });
    }, 250), { passive: true });
}
