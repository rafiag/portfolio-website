# Rafi Atha - Portfolio Website

My personal portfolio website showcasing 5 years of experience as a Data Analyst in fintech and e-commerce. Built from scratch using vanilla JavaScript, HTML5, and CSS3 - no frameworks, just clean, performant code.

<!-- **Live Site:** [Your domain here] -->

## About This Project

I built this portfolio to showcase not just my data analytics work, but also my attention to detail and commitment to quality. Every aspect was crafted with intention - from the smooth animations to the clean code structure and thorough testing.

## What's Inside

### 🏠 Main Page ([index.html](index.html))
- **Hero Section** - Career highlights with 5 years experience across fintech and e-commerce
- **Animated Statistics** - Count-up animation for experience metrics (5+ years, 5 companies, 3 industries, 20+ products)
- **Experience Timeline** - Interactive company cards featuring Kredivo Group, Mapan, LinkAja!, tvOne, and Telkom Indonesia
- **Skills Matrix** - Technical proficiencies in data analytics, BI tools, Python, SQL, and visualization
- **Testimonials Carousel** - Auto-rotating carousel displaying 2 testimonials at once (1 on mobile) with manual controls and pause-on-hover
- **Featured Projects** - Touch-enabled carousel showcasing my best work
- **Contact Section** - Direct links to reach me

### 📂 Portfolio Page ([portfolio.html](portfolio.html))
- **Real Projects** - RFM analysis, customer segmentation, BI dashboards, and more
- **Smart Filtering** - Category-based project filtering with smooth animations
- **Detailed Modals** - Full project descriptions with technologies and impact metrics

### ⚙️ Technical Highlights

What makes this portfolio different:

- **Modular Architecture** - 17 ES6 modules with clear separation of concerns
- **Performance First** - GPU-accelerated animations, lazy loading, resource hints
- **Accessibility** - WCAG 2.1 compliant with full keyboard navigation and ARIA labels
- **SEO Optimized** - Structured data (Schema.org), Open Graph, Twitter Cards
- **Print Ready** - Professional PDF generation with intelligent page breaks
- **Battle Tested** - 265+ automated tests covering 10 categories
- **Security Hardened** - Content Security Policy, secure external links, XSS protection
- **Cross-Browser** - Works on Chrome, Firefox, Safari, Edge (no IE11)

## Project Structure

```
portfolio-website/
├── index.html              # Main landing page
├── portfolio.html          # Full project showcase
├── 404.html               # Custom 404 error page
├── robots.txt             # Search engine instructions
├── sitemap.xml            # Site structure for SEO
├── CNAME                  # Custom domain configuration
├── .nojekyll              # Bypass Jekyll processing on GitHub Pages
├── css/
│   ├── style.css          # All styles (unified for both pages)
│   └── print.css          # Professional PDF/print styles
├── js/
│   ├── main-index.js      # Entry point for index page
│   ├── main-portfolio.js  # Entry point for portfolio page
│   ├── browser-check.js   # IE11 detection and upgrade notice
│   ├── ga4-init.js        # Google Analytics 4 initialization
│   ├── modules/           # 17 modular ES6 files
│   │   ├── accessibility.js
│   │   ├── back-to-top.js
│   │   ├── error-handler.js
│   │   ├── font-loader.js
│   │   ├── index-page.js
│   │   ├── mobile-menu.js
│   │   ├── navbar-effects.js
│   │   ├── performance-utils.js
│   │   ├── portfolio-carousel.js
│   │   ├── portfolio-filter.js
│   │   ├── portfolio-modal.js
│   │   ├── portfolio-validator.js
│   │   ├── scroll-animations.js
│   │   ├── smooth-scroll.js
│   │   ├── statistics-counter.js
│   │   ├── structured-data.js
│   │   └── testimonials-carousel.js
│   └── data/
│       └── portfolio-data.js  # Portfolio project data
├── assets/
│   ├── images/
│   │   ├── companies/     # Company logos (5 companies)
│   │   ├── portfolio/     # Project screenshots
│   │   └── profile.webp   # Profile photo
│   ├── og-image.webp      # Open Graph social media image
│   └── resume.pdf         # Downloadable resume
├── docs/                  # 10 technical guides
│   ├── ANALYTICS-EVENTS-GUIDE.md
│   ├── BROWSER-SUPPORT.md
│   ├── BUILD-SUMMARY.md
│   ├── DEPLOYMENT.md
│   ├── MEMORY-LEAK-PREVENTION.md
│   ├── PERFORMANCE-OPTIMIZATION-GUIDE.md
│   ├── PORTFOLIO-DATA-VALIDATION-GUIDE.md
│   ├── PRINT-STYLES-GUIDE.md
│   ├── RESOURCE-HINTS-GUIDE.md
│   └── STRUCTURED-DATA-GUIDE.md
├── tests/                 # Comprehensive test suite (12 test files)
│   ├── accessibility.js
│   ├── analytics-basic-test.cjs
│   ├── browser-compatibility.js
│   ├── content-links.js
│   ├── cross-browser-javascript.js
│   ├── error-handling.js
│   ├── interactive-features.js
│   ├── performance.js
│   ├── portfolio-validation.js
│   ├── responsive.js
│   ├── security.js
│   ├── seo-meta.js
│   ├── run-all-tests.bat
│   └── README.md
├── build/                 # Build output directory
├── dist/                  # Distribution files (minified)
├── tools/                 # Build and development tools
├── .github/               # GitHub Actions workflows
├── package.json           # npm dependencies and scripts
└── CLAUDE.md              # AI assistant project instructions
```

## Running Locally

**Quick start:**
```bash
# Clone or download this repository
# Then start a local server:
npm start              # Starts server on http://localhost:8000

# Or use alternatives:
npm run serve          # Python-based server
npm run serve:alt      # npx http-server
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## Testing & Quality Assurance

I take quality seriously. This portfolio includes **265+ automated tests** across **10 categories** covering:

- **Browser Compatibility** - Chrome, Firefox, Safari/WebKit
- **Responsive Design** - 8 viewports from 360px to 1920px (56 tests)
- **Accessibility** - WCAG 2.1 compliance, keyboard navigation
- **Performance** - Core Web Vitals, lazy loading, load times
- **SEO** - Structured data, Open Graph, meta tags (30+ tests)
- **Security** - CSP compliance, XSS protection
- **Interactive Features** - Carousel, filters, modals
- **Error Handling** - 404 pages, graceful degradation

**Run the test suite:**
```bash
# Install Playwright (first time only)
npm install --save-dev playwright
npx playwright install

# Start dev server
npm start

# Run all tests (Windows)
cd tests
run-all-tests.bat
```

See detailed test reports in [tests/README.md](tests/README.md)

## Design Choices

I wanted this portfolio to feel distinctive yet professional:

- **Typography** - Playfair Display for sophistication + Work Sans for readability
- **Color Scheme** - Dark theme (#2b2d31) with red accents (#ff6b6b) for emphasis
- **Layout** - Editorial-inspired with clean hierarchy and breathing room
- **Animations** - Subtle and purposeful, running at 60fps
- **Mobile-First** - Touch-optimized interactions, hamburger menu at 480px breakpoint

## Browser Support

Works on all modern browsers:
- Chrome 80+ (February 2020)
- Firefox 75+ (April 2020)
- Safari 13+ (September 2019)
- Edge 80+ (February 2020)

IE11 users see an upgrade notice. See [docs/BROWSER-SUPPORT.md](docs/BROWSER-SUPPORT.md) for details.

## Technical Documentation

Deep dives into implementation details in the [docs/](docs/) folder:

- [Performance Optimization Guide](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md) - 60fps techniques, GPU acceleration
- [Print Styles Guide](docs/PRINT-STYLES-GUIDE.md) - Professional PDF generation
- [Structured Data Guide](docs/STRUCTURED-DATA-GUIDE.md) - SEO with Schema.org
- [Browser Support](docs/BROWSER-SUPPORT.md) - Compatibility and fallbacks
- [JavaScript Modules](js/README.md) - Module architecture and usage

## How It Was Built

This portfolio was developed with assistance from **Claude Code**, Anthropic's AI coding agent. I provided the direction, content, and design vision - Claude helped bring it to life with clean, well-structured code and best practices. It's a collaboration that showcases what's possible when human creativity meets AI capabilities.

## License

This is my personal portfolio. Feel free to use the code structure and techniques as learning material, but please don't copy the content or design wholesale - build something that's uniquely yours.

---

Built with care by **Rafi Atha** | Data Analyst with 5 years in fintech & e-commerce
Developed with assistance from [Claude Code](https://claude.ai/code) by Anthropic
