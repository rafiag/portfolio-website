# Portfolio Website - Project Documentation

## What

A modern, responsive portfolio website for **Rafi Atha**, a Data Analyst with 5 years of experience in fintech and e-commerce. The site showcases professional work experience, technical skills, project portfolio, and testimonials through an interactive, accessible web interface.

**Key Pages:**
- [index.html](index.html) - Main landing page with hero, experience, skills, testimonials, featured projects, and contact
- [portfolio.html](portfolio.html) - Full project showcase with filtering capabilities

## Why

**Purpose:** To present a professional online presence that:
- Demonstrates technical expertise in data analytics, BI, and visualization
- Showcases real-world projects with measurable impact
- Provides an engaging user experience that reflects attention to detail
- Serves as a central hub for career opportunities and professional networking

**Target Audience:** Recruiters, hiring managers, potential clients, and professional connections in the data analytics and business intelligence space.

## How

### Technical Stack
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, flexbox, grid, animations, responsive design
- **Vanilla JavaScript** - No frameworks, modern ES6+ features
- **Fonts** - Playfair Display (headings) + Work Sans (body) from Google Fonts

### Core Features
1. **Responsive Navigation** - Fixed navbar with mobile hamburger menu (breakpoint: 480px)
2. **Interactive Work Experience** - Clickable company cards revealing role details
3. **Skills Matrix** - Categorized technical skills with proficiency indicators
4. **Portfolio Carousel** - Touch-enabled project showcase with navigation
5. **Project Filtering** - Dynamic filtering system on portfolio page
6. **Modal System** - Detailed project views with overlay
7. **Scroll Animations** - Intersection Observer API for reveal effects
8. **Parallax Effects** - Subtle hero image movement on scroll

### File Structure
```
./
├── 404.html
├── CLAUDE.md          # This documentation
├── index.html          # Main landing page
├── LICENSE
├── package.json
├── portfolio.html      # Full projects showcase
├── README.md          # Main readme
├── robots.txt
├── sitemap.xml
├── assets/            # Images, logos, resume PDF
│   ├── README.txt
│   └── images/
│       ├── FAVICON-INSTRUCTIONS.md
│       ├── companies/
│       └── portfolio/
├── css/
│   ├── print.css      # Print/PDF optimized styles
│   └── style.css      # Unified styles for all pages
├── docs/              # All technical guides
│   ├── BROWSER-SUPPORT.md
│   ├── CODE-REVIEW-2025-12-24.md
│   ├── PERFORMANCE-OPTIMIZATION-GUIDE.md
│   ├── PRINT-STYLES-GUIDE.md
│   ├── README.md      # Documentation index
│   ├── STRUCTURED-DATA-GUIDE.md
│   ├── TEST-REPORT-2025-12-24.md
│   └── TEST-SUMMARY-UPDATED.md
├── js/
│   ├── browser-check.js
│   ├── main-index.js  # Entry point for index.html
│   ├── main-portfolio.js # Entry point for portfolio.html
│   ├── README.md      # JavaScript modules documentation
│   ├── data/
│   │   └── portfolio-data.js  # Portfolio project data
│   └── modules/       # Modular ES6 JavaScript (13 modules)
│       ├── accessibility.js
│       ├── error-handler.js
│       ├── font-loader.js
│       ├── index-page.js
│       ├── mobile-menu.js
│       ├── navbar-effects.js
│       ├── performance-utils.js
│       ├── portfolio-carousel.js
│       ├── portfolio-filter.js
│       ├── portfolio-modal.js
│       ├── scroll-animations.js
│       ├── smooth-scroll.js
│       └── structured-data.js
├── tests/             # Test suite
│   ├── accessibility.js
│   ├── browser-compatibility.js
│   ├── content-links.js
│   ├── cross-browser-javascript.js
│   ├── error-handling.js
│   ├── interactive-features.js
│   ├── performance.js
│   ├── README.md
│   ├── responsive.js
│   ├── run-all-tests.bat
│   ├── security.js
│   └── seo-meta.js
└── tools/
    └── palette-preview.html
```

### Design Philosophy
- **Mobile-first** responsive approach
- **Dark theme** (#2b2d31) with red accent (#ff6b6b)
- **Performance-focused** with lazy loading and minimal dependencies
- **Accessibility-first** with ARIA labels, semantic HTML, keyboard navigation
- **Progressive enhancement** for broader browser support

---

## To-Do List

### High Priority
- [x] Replace all placeholder content

### Medium Priority
- [x] Add error handling and loading states
- [x] Split JS into modules
- [x] Add structured data (Person, ProfilePage, Organization, CreativeWork schemas)

### Low Priority
- [x] Add print styles (A4 format, intelligent page breaks, optimized for B&W and color)
- [x] Improve animation performance (60fps target: GPU acceleration, throttling, RAF, CSS containment)
- [x] Add progressive enhancement for older browsers (Browser detection, CSS fallbacks, upgrade notices)
- [ ] Implement analytics (Google Analytics, Plausible, etc.)
- [ ] Add contact form

### Future Enhancements
- [ ] Add site to Google Search Console
- [x] Add metrics display on experience section (i.e. total YOE, company, etc)
- [x] Add short company description to experience details

---

## 📚 Documentation

For detailed technical guides, see the [docs/](docs/) folder:

- **[Performance Optimization Guide](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md)** - 60fps optimization, throttling, RAF, GPU acceleration
- **[Print Styles Guide](docs/PRINT-STYLES-GUIDE.md)** - Professional PDF generation, A4 format, page breaks
- **[Structured Data Guide](docs/STRUCTURED-DATA-GUIDE.md)** - SEO with Schema.org, validation, Google integration
- **[Browser Support Guide](docs/BROWSER-SUPPORT.md)** - Compatibility, fallbacks, minimum requirements
- **[JavaScript Modules Documentation](js/README.md)** - Module structure, exports, usage examples
- **[Documentation Index](docs/README.md)** - Complete guide index with quick links

## Browser Support

**Minimum Requirements:**
- Chrome 80+ (February 2020)
- Firefox 75+ (April 2020)
- Safari 13+ (September 2019)
- Edge 80+ (February 2020)

**Unsupported:** IE11 and older browsers show an upgrade notice. See [docs/BROWSER-SUPPORT.md](docs/BROWSER-SUPPORT.md) for details.

---

**Last Updated:** 2025-12-25
**Author:** Rafi Atha
**Contact:** rafiatha.g@gmail.com
