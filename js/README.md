# JavaScript Modules Documentation

This directory contains modularized JavaScript code for the portfolio website, organized for maintainability, reusability, and performance.

## Directory Structure

```
js/
├── data/
│   └── portfolio-data.js      # Centralized portfolio project data
├── modules/
│   ├── accessibility.js       # Image loading & keyboard navigation
│   ├── back-to-top.js         # Back to top floating button (shared)
│   ├── error-handler.js       # Global error handling
│   ├── index-page.js          # Index page specific features
│   ├── mobile-menu.js         # Mobile navigation menu
│   ├── navbar-effects.js      # Navbar scroll & active link effects
│   ├── performance-utils.js   # Performance utilities (throttle, RAF)
│   ├── portfolio-carousel.js  # Portfolio carousel (index page)
│   ├── portfolio-filter.js    # Portfolio filtering (portfolio page)
│   ├── portfolio-modal.js     # Portfolio modal system (shared)
│   ├── portfolio-validator.js # Portfolio data validation (shared)
│   ├── scroll-animations.js   # Intersection Observer animations
│   ├── smooth-scroll.js       # Smooth anchor scrolling
│   ├── structured-data.js     # SEO Schema.org structured data
│   └── testimonials-carousel.js # Auto-rotating testimonials carousel (index page)
├── main-index.js              # Entry point for index.html
└── main-portfolio.js          # Entry point for portfolio.html
```

## Module Descriptions

### Shared Modules (Used by Both Pages)

**`mobile-menu.js`**
- Handles mobile navigation toggle
- Manages menu open/close state
- Handles click-outside and link-click behavior
- **Export:** `MobileMenu` class

**`smooth-scroll.js`**
- Implements smooth scrolling for anchor links
- **Export:** `initSmoothScroll()` function

**`scroll-animations.js`**
- Intersection Observer-based scroll animations
- Fallback for browsers without IntersectionObserver
- **Export:** `initScrollAnimations(selector, options)` function

**`navbar-effects.js`**
- Navbar box-shadow on scroll
- Active navigation link highlighting
- **Exports:** `initNavbarScrollEffect()`, `initActiveNavLinks()`

**`portfolio-modal.js`**
- Portfolio project modal system
- Handles modal open/close/populate
- Image loading states in modal
- **Export:** `PortfolioModal` class

**`error-handler.js`**
- Global error handler for uncaught errors
- Unhandled promise rejection handler
- **Export:** `initGlobalErrorHandlers()` function

**`accessibility.js`**
- Image lazy loading with error handling
- Keyboard navigation enhancements
- Skip link for screen readers
- **Exports:** `ImageLoader` class, `KeyboardNavigation` class

**`structured-data.js`**
- Generates Schema.org JSON-LD markup for SEO
- Person, ProfilePage, Organization, CreativeWork schemas
- Automatically converts portfolio data to structured data
- **Exports:** `initStructuredData(pageType)`, individual schema generators
- **Note:** Single source of truth - generates from existing data

**`performance-utils.js`** *(New - 2025-12-24)*
- Performance optimization utilities
- Throttle and debounce functions for event handlers
- RequestAnimationFrame wrappers with fallbacks
- Optimized scroll handlers for 60fps performance
- Layout measurement caching utilities
- **Exports:** `throttle()`, `debounce()`, `raf()`, `optimizedScrollHandler()`, `cacheElementMeasurements()`, more
- **Used by:** navbar-effects.js, index-page.js, portfolio-carousel.js

**`back-to-top.js`** *(New - 2025-12-25)*
- Floating back-to-top button that appears after scrolling
- Shows/hides based on scroll position (300px threshold)
- Smooth scroll animation to top
- Keyboard accessible with focus management
- GPU-accelerated animations for performance
- **Export:** `BackToTop` class
- **Used by:** Both index.html and portfolio.html

**`portfolio-validator.js`** *(New - 2025-12-25)*
- Schema-based validation for portfolio data
- Type checking (string, array) and constraint validation
- Pattern matching for URLs and paths
- Development-only validation with detailed error reporting
- **Exports:** `validatePortfolioItem()`, `validatePortfolioData()`, `formatValidationErrors()`, `getSchema()`, `ValidationError` class
- **Used by:** portfolio-data.js (auto-validation on localhost)
- **Documentation:** [Portfolio Data Validation Guide](../docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md)

### Page-Specific Modules

**`portfolio-carousel.js`** *(index.html only)*
- Touch/swipe-enabled carousel
- Navigation dots
- Prev/next buttons
- **Export:** `PortfolioCarousel` class

**`testimonials-carousel.js`** *(index.html only - New 2025-12-25)*
- Auto-rotating testimonials carousel
- Displays 2 testimonials side-by-side (1 on mobile)
- 5-second rotation interval with pause-on-hover
- Manual navigation via prev/next buttons and dots
- Smooth fade transitions with GPU acceleration
- Responsive: adapts to viewport (2 cards on desktop, 1 on mobile <769px)
- Full accessibility with ARIA attributes
- **Export:** `TestimonialsCarousel` class
- **Configuration:**
  - `autoRotateInterval`: 5000ms (default)
  - `transitionDuration`: 600ms (default)
  - `cardsPerView`: 2 (auto-adjusts on mobile)
- **Used by:** index.html testimonials section

**`statistics-counter.js`** *(index.html only - New 2025-12-26)*
- Animated count-up effect for hero section statistics
- Triggers on scroll into view using Intersection Observer
- 2-second animation with easeOutExpo easing
- Parses target values and suffix characters (e.g., "5+", "20+")
- RequestAnimationFrame-based animation for smooth 60fps performance
- Animates from 0 to target value, then appends suffix
- **Export:** `StatisticsCounter` class, `initStatisticsCounter()` function
- **Used by:** index.html experience metrics section
- **Features:**
  - One-time animation (doesn't re-trigger on subsequent scrolls)
  - Automatic cleanup to prevent memory leaks
  - Data attributes for target values and suffixes
  - CSS optimizations (tabular-nums, will-change)

**`portfolio-filter.js`** *(portfolio.html only)*
- Portfolio filtering by category
- Smooth show/hide animations
- **Export:** `PortfolioFilter` class

**`index-page.js`** *(index.html only)*
- Hero parallax effect
- Experience cards interaction
- Skill bars animation
- Page load animation
- **Exports:** `initHeroParallax()`, `initExperienceCards()`, `initSkillBarsAnimation()`, `initPageLoadAnimation()`

### Data

**`portfolio-data.js`**
- Centralized portfolio project data (12 projects)
- Shared between index.html and portfolio.html
- **Export:** `portfolioData` object

## Entry Points

### `main-index.js`
Entry point for **index.html**. Initializes:
- All shared modules
- Portfolio carousel
- Testimonials carousel
- Statistics counter
- Hero parallax
- Experience cards
- Skill bars animation
- Scroll animations for index elements

### `main-portfolio.js`
Entry point for **portfolio.html**. Initializes:
- All shared modules
- Portfolio filter
- Staggered grid animation
- Scroll animations for portfolio cards

## Benefits of Modularization

### ✅ **Eliminated Code Duplication**
Before: ~1200 lines across 2 files with significant duplication
After: Shared code extracted into reusable modules

### ✅ **Better Maintainability**
- Each module has a single responsibility
- Changes to shared features only need to be made once
- Clear separation between page-specific and shared code

### ✅ **Improved Performance**
- ES6 modules enable tree-shaking (unused code removal)
- Better browser caching (unchanged modules don't re-download)
- Lazy loading potential for future optimization

### ✅ **Enhanced Testability**
- Isolated modules are easier to unit test
- Clear dependencies make mocking straightforward
- Each module can be tested independently

### ✅ **Better Developer Experience**
- Clear file structure and naming
- Easy to locate specific functionality
- Scalable for future features

## Usage Examples

### Adding a New Shared Feature

1. Create a new module in `js/modules/`:
```javascript
// js/modules/my-feature.js
export function initMyFeature() {
    // Implementation
}
```

2. Import in both entry points:
```javascript
// js/main-index.js & js/main-portfolio.js
import { initMyFeature } from './modules/my-feature.js';

document.addEventListener('DOMContentLoaded', () => {
    initMyFeature();
});
```

### Adding a Page-Specific Feature

1. Create function in appropriate module or new module
2. Import only in the relevant entry point

## Browser Compatibility

ES6 modules are supported in:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

For older browsers, consider using a bundler like Webpack or Rollup to transpile to ES5.

## Migration Notes

### Original Files
The original monolithic files have been backed up:
- `script.js.backup` - Original index page JavaScript
- `portfolio.js.backup` - Original portfolio page JavaScript

### HTML Changes
Updated script tags to use ES6 modules:
```html
<!-- Old -->
<script src="script.js"></script>

<!-- New -->
<script type="module" src="js/main-index.js"></script>
```

## Troubleshooting

**Module not found errors:**
- Check import paths are relative (start with `./` or `../`)
- Verify file extensions (`.js`) are included

**CORS errors in local development:**
- Use a local server (Live Server, Python HTTP server, etc.)
- ES6 modules don't work with `file://` protocol

**Functions not executing:**
- Check browser console for errors
- Verify DOMContentLoaded events are firing
- Ensure selectors match HTML elements

---

**Last Updated:** 2025-12-25
**Migration Date:** 2025-12-24
