/**
 * Index Page Specific Features
 * Handles features unique to the index.html page
 * OPTIMIZED: Uses requestAnimationFrame for smooth 60fps animations
 */

import { optimizedScrollHandler } from './performance-utils.js';

// Parallax effect for hero image
export function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Use optimized scroll handler with requestAnimationFrame
        const handleParallax = optimizedScrollHandler(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            // Use transform for GPU acceleration (already has will-change in CSS)
            heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        });

        window.addEventListener('scroll', handleParallax, { passive: true });
    }
}

// Experience company card selection
export function initExperienceCards() {
    const companyCards = document.querySelectorAll('.experience-company-card');
    const detailContents = document.querySelectorAll('.experience-detail-content');

    if (companyCards.length === 0 || detailContents.length === 0) {
        return;
    }

    companyCards.forEach(card => {
        card.addEventListener('click', () => {
            const companyId = card.getAttribute('data-company');

            // Remove active class from all cards and contents
            companyCards.forEach(c => c.classList.remove('active'));
            detailContents.forEach(d => d.classList.remove('active'));

            // Add active class to clicked card and corresponding content
            card.classList.add('active');
            const activeContent = document.querySelector(`.experience-detail-content[data-company="${companyId}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// Skill bars animation
export function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-level');

    if (skillBars.length === 0 || !('IntersectionObserver' in window)) {
        return;
    }

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Page load animation
export function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}
