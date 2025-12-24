# Portfolio Website

A distinctive, production-grade portfolio website with an editorial-meets-modern aesthetic.

## Features

### Responsive Design
The website is fully responsive and optimized for all device sizes:

- **Desktop (1440px+)**: Full layout with all features
- **Laptop/Tablet (1024px)**: Optimized two-column and single-column layouts
- **Tablet Portrait (768px)**: Mobile-friendly single column layout
- **Mobile (480px)**: Compact design with hamburger menu navigation
- **Small Mobile (360px)**: Optimized for smallest devices

### Sections

1. **Landing Page**
   - Hero section with photo and career highlights
   - Previous companies (Kredivo Group, Mapan, LinkAja!, tvOne, Telkom Indonesia)
   - Key skills
   - Short bio with call-to-action

2. **Work Experience**
   - Timeline layout with company logos
   - Role and date information
   - Detailed descriptions

3. **Skills**
   - Four categories: Frontend, Backend, Design, Tools
   - Animated skill level indicators

4. **Testimonials**
   - 4 testimonial cards with quotes
   - Names, positions, and testimonies

5. **Portfolio Highlights**
   - Interactive carousel (swipe-enabled on mobile)
   - Navigation buttons and dots
   - "See All Projects" button

6. **All Projects Page**
   - 12 portfolio items
   - Filter by category (All, Web Apps, Mobile, Design)
   - Grid layout that adapts to screen size

7. **Contact**
   - Email, phone, and LinkedIn
   - Icon-based layout

### Advanced Features

- ✅ **Performance Optimized** - 60fps animations with GPU acceleration
- ✅ **Accessibility First** - WCAG 2.1 compliant with ARIA labels and keyboard navigation
- ✅ **SEO Enhanced** - Structured data, Open Graph, and meta tags
- ✅ **Error Handling** - Graceful fallbacks and user-friendly error states
- ✅ **Progressive Enhancement** - Works in older browsers with fallbacks
- ✅ **Security Hardened** - Content Security Policy and secure external links
- ✅ **Print Optimized** - Professional PDF generation with A4 formatting

## Files

- `index.html` - Main portfolio page
- `portfolio.html` - All projects page
- `404.html` - Custom error page
- `package.json` - Project configuration and scripts
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - XML sitemap for search engines
- `css/style.css` - All styles and responsive media queries
- `css/print.css` - Print/PDF optimized styles
- `js/main-index.js` - Entry point for index.html (loads modular JS)
- `js/main-portfolio.js` - Entry point for portfolio.html (loads modular JS)
- `js/browser-check.js` - Browser compatibility detection
- `js/modules/` - 13 modular ES6 JavaScript files
- `js/data/portfolio-data.js` - Portfolio project data
- `assets/` - Images, logos, and other media assets
- `docs/` - Technical documentation and guides
- `tests/` - Comprehensive test suite
- `tools/` - Development utilities

## Customization

### Update Your Information

1. **Personal Details** (index.html):
   - Replace "Your Name" with your actual name
   - Update the photo URL (line 47)
   - Modify bio, skills, and company information
   - Update contact details (email, phone, LinkedIn)

2. **Images**:
   - Add your company logos
   - Add portfolio project images
   - Add your profile photo

3. **Colors** (style.css, lines 1-9):
   - `--color-accent`: Change the red accent color (#ff6b6b)
   - `--color-bg`: Modify background color (#2b2d31)
   - `--color-text`: Adjust text color (#f8f9fa)

### Responsive Breakpoints

- **1024px**: Tablet landscape
- **768px**: Tablet portrait and mobile landscape
- **480px**: Mobile devices (hamburger menu activates)
- **360px**: Extra small mobile devices

## Usage

Simply open `index.html` in any modern web browser. All files work together seamlessly.

## Development

### Local Development Server
```bash
npm start              # Start local dev server on port 8000
npm run serve          # Alternative server using Python
npm run serve:alt      # Alternative using npx http-server
```

### Testing

The portfolio includes a comprehensive **Playwright-based test suite** with **189+ tests** across 10 categories.

**Quick Start:**
```bash
# 1. Install Playwright (first time only)
npm install --save-dev playwright
npx playwright install

# 2. Start dev server (keep running)
npm start

# 3. Run security test (no Playwright required)
node tests/security.js

# 4. Run all Playwright tests (Windows)
cd tests
run-all-tests.bat
```

**Test Categories:**
- Browser compatibility (24 tests) - Chrome, Firefox, Safari/WebKit
- Responsive design (56 tests) - 8 viewports from 360px to 1920px
- Interactive features (8 tests) - Carousel, filters, modals, navigation
- Accessibility (10 tests) - WCAG 2.1 compliance, keyboard nav, ARIA
- Performance (8 tests) - Load times, Core Web Vitals, lazy loading
- Content & links (13 tests) - Link security, meta tags, images
- Cross-browser JavaScript (27 tests) - ES6 support, console errors
- SEO & meta tags (30+ tests) - Structured data, Open Graph, Twitter Cards
- Error handling (9 tests) - 404 pages, graceful degradation
- Security (6 tests) - CSP compliance, XSS protection, secure links

**Latest Results:** ~92.6% pass rate (169/189+ tests) | See [tests/README.md](tests/README.md) for detailed reports

### Validation
```bash
npm run validate:html  # Validate HTML markup
npm run validate:css   # Validate CSS styles
```

## Browser Compatibility

**Minimum Requirements:**
- Chrome 80+ (February 2020)
- Firefox 75+ (April 2020)
- Safari 13+ (September 2019)
- Edge 80+ (February 2020)

**Fully Tested:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Unsupported:** IE11 and older browsers show an upgrade notice.

## Design Philosophy

The website features:
- **Typography**: Playfair Display (elegant serif) + Work Sans (clean sans-serif)
- **Color Palette**: Dark theme with red accents
- **Style**: Editorial sophistication meets modern web design
- **Animations**: Smooth, purposeful transitions
- **Mobile-First**: Optimized for touch interactions

The `tools/` directory contains development utilities including a palette preview tool for design customization.

## Documentation

Comprehensive technical documentation is available in the `docs/` folder:
- Performance optimization guides
- Print styles documentation
- Structured data implementation
- Browser support details
- Code review reports
- Test summaries
