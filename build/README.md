# Build Scripts

This directory contains build scripts for minifying and optimizing the portfolio website for production deployment.

## Prerequisites

Make sure you have Node.js installed (version 14.0.0 or higher).

Install dependencies:
```bash
npm install
```

## Build Commands

### Full Build
Runs all build steps (clean, CSS, JS, HTML):
```bash
npm run build
```

### Individual Build Steps

**Clean:** Remove and recreate the `dist/` directory
```bash
npm run build:clean
```

**CSS Minification:** Minify CSS files
```bash
npm run build:css
```

**JavaScript Minification:** Minify JS files and remove localhost console logs
```bash
npm run build:js
```

**HTML Minification:** Minify HTML and copy static assets
```bash
npm run build:html
```

### Test Production Build
Build and serve the production files:
```bash
npm run build:serve
```

## Build Scripts

### clean.js
- Removes existing `dist/` directory
- Creates fresh directory structure
- Prepares for new build

### minify-css.js
- Minifies CSS using CSSO
- Removes comments and whitespace
- Optimizes media queries
- **Expected savings:** ~10% (6 KB)

### minify-js.js
- Minifies JavaScript using Terser
- Removes localhost-only console logs
- Preserves ES6 modules structure
- Mangles variable names (except exports)
- **Expected savings:** ~35-40% (45 KB)

### minify-html.js
- Minifies HTML files
- Updates asset references to `.min.js` and `.min.css`
- Copies static assets (images, PDFs, fonts)
- **Expected savings:** ~10% (4 KB)

## Output

All minified files are placed in the `dist/` directory:

```
dist/
├── index.html              (minified)
├── portfolio.html          (minified)
├── favicon.ico
├── css/
│   └── style.min.css       (minified)
├── js/
│   ├── main-index.min.js   (minified)
│   ├── main-portfolio.min.js (minified)
│   ├── browser-check.min.js (minified)
│   ├── ga4-init.min.js     (minified)
│   ├── modules/            (all minified)
│   └── data/               (all minified)
└── assets/
    ├── images/
    └── resume.pdf
```

## Expected File Size Reductions

| Asset Type | Original | Minified | Savings |
|------------|----------|----------|---------|
| CSS | 58 KB | ~52 KB | ~6 KB (10%) |
| JavaScript | 120 KB | ~75 KB | ~45 KB (38%) |
| HTML | 42 KB | ~38 KB | ~4 KB (10%) |
| **Total** | **220 KB** | **~165 KB** | **~55 KB (25%)** |

## Deployment

After building, the `dist/` directory contains the production-ready website. Deploy this directory to your hosting service:

```bash
# Build first
npm run build

# Then deploy dist/ folder to your hosting service
# Example: GitHub Pages, Netlify, Vercel, etc.
```

## Development vs Production

**Development (source files):**
- Readable code with comments
- Console logs for debugging
- Uncompressed for easier debugging
- Run with: `npm start`

**Production (dist/ folder):**
- Minified and optimized
- No localhost console logs
- Maximum performance
- Smallest file sizes
- Run with: `npm run build:serve`

## Localhost Console Log Removal

The build process automatically removes console logs that are wrapped in localhost checks:

**Development (kept):**
```javascript
if (window.location.hostname === 'localhost') {
    console.log('Debug info');
}
```

**Production (removed automatically):**
The build script strips these blocks entirely, reducing bundle size.

## Notes

- Source maps are not generated (consider adding for debugging production issues)
- All ES6 module structure is preserved
- Class names and exports are not mangled to maintain API compatibility
- The build process is deterministic (same input = same output)
