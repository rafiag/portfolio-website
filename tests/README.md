# Portfolio Website - Test Suite

Comprehensive end-to-end testing suite using Playwright with **11 test categories** covering **270+ individual tests**.

---

## 📋 Test Files Overview

| # | File | Category | Tests | Description |
|---|------|----------|-------|-------------|
| 1 | `browser-compatibility.js` | Browser Support | 24 | Chrome, Firefox, WebKit - CSS Grid, Flexbox, ES6 modules |
| 2 | `responsive.js` | Responsive Design | 56 | 8 viewports (360px-1920px), breakpoints, overflow, layout |
| 3 | `interactive-features.js` | Interactivity | 21 | Carousel, filters, modals, mobile menu, smooth scroll, **back-to-top button**, **modal focus trap**, **statistics counter** |
| 4 | `accessibility.js` | WCAG 2.1 | 13 | Keyboard nav, ARIA, color contrast, semantic HTML, **modal focus trap** |
| 5 | `performance.js` | Performance | 11 | Load times, CLS, **lazy loading**, **font loading**, Core Web Vitals |
| 6 | `content-links.js` | Content & SEO | 13 | Links security, meta tags, images, Open Graph |
| 7 | `cross-browser-javascript.js` | JavaScript | 27 | ES6, Array methods, console errors (3 browsers) |
| 8 | `seo-meta.js` | SEO & Performance | 33 | Structured data, Twitter Cards, robots.txt, sitemap, **resource hints** |
| 9 | `error-handling.js` | Error Recovery & Memory | 14 | 404 pages, graceful degradation, fallbacks, **memory leak prevention** |
| 10 | `security.js` | Security | 6 | CSP compliance, XSS protection, external links, mixed content (static analysis) |
| 11 | `portfolio-validation.js` | Data Validation | 50+ | Schema validation, type checking, field constraints, edge cases |
| 12 | `analytics-basic-test.cjs` | Analytics | 5 | **Google Analytics 4**, Enhanced Measurement, tracking initialization |

**Total: 270+ tests** | Files tested: `index.html`, `portfolio.html`, `portfolio-data.js`

---

## 🚀 Quick Start

### 1. Install Playwright (First Time Only)

```bash
# From project root directory
npm install --save-dev playwright
npx playwright install
```

### 2. Start Development Server

Before running tests, start the local web server:

```bash
# From project root - Keep this terminal window open
python -m http.server 8000

# Or use Node.js http-server:
# npx http-server -p 8000
```

Verify the server is running by visiting http://localhost:8000 in your browser.

### 3. Run Tests

**Option A: Run All Tests (Recommended)**

Windows:
```bash
# From project root
tests\run-all-tests.bat
```

Linux/Mac:
```bash
# Run tests individually or create a shell script similar to run-all-tests.bat
```

**Option B: Run Non-Playwright Tests (No Playwright Required)**

```bash
# From project root
node tests/security.js
node tests/portfolio-validation.js
```

**Option C: Run Individual Playwright Tests**

```bash
# From project root
node tests/browser-compatibility.js
node tests/responsive.js
node tests/interactive-features.js
node tests/accessibility.js
node tests/performance.js
node tests/content-links.js
node tests/cross-browser-javascript.js
node tests/seo-meta.js
node tests/error-handling.js
node tests/analytics-basic-test.cjs
```

### 4. Generate Test Summary Report

After running all tests, create a comprehensive summary report:

**Manual Method:**
1. Copy the test output from your terminal/console
2. Create a new file: `docs/TEST-SUMMARY-YYYY-MM-DD.md`
3. Use this template structure:

```markdown
# Test Summary Report - YYYY-MM-DD

## Overview
- **Date**: YYYY-MM-DD
- **Total Tests**: X/Y passed
- **Overall Success Rate**: XX%

## Test Results by Category

### 1. Browser Compatibility
- **Score**: X/24 (XX%)
- **Status**: ✅/⚠️/❌
- **Notes**: [Key findings]

### 2. Responsive Design
- **Score**: X/56 (XX%)
- **Status**: ✅/⚠️/❌
- **Notes**: [Key findings]

[... Continue for all 10 test categories ...]

## Issues Found

### 🔴 Critical Issues
1. [Issue description]

### 🟡 Medium Priority
1. [Issue description]

### 🟢 Low Priority
1. [Issue description]

## Recommendations
- [Action items]

## Next Steps
- [Future improvements]
```

4. Fill in the test results from console output
5. Save the file in the `tests/result-docs/` folder

**Automated Method (Future Enhancement):**
- A test reporter script could be added to automatically generate markdown reports
- Example implementation would parse test output and format as markdown

**Best Practices:**
- Run tests before major commits or deployments
- Keep test summary reports dated for version tracking
- Compare results between runs to track improvements
- Update [docs/README.md](../docs/README.md) index with new report links

---

## 🔧 Test Configuration

### Common Settings
```javascript
const TARGET_URL = 'http://localhost:8000';  // Change for production
const TIMEOUT = 10000;                        // 10 seconds
const HEADLESS = false;                       // Browser visible (true for CI/CD)
```

### Browsers
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

### Viewports
- Mobile: 360px, 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

---

## 📸 Test Artifacts

**Screenshots**: `./screenshots/` and `C:\Users\USER\AppData\Local\Temp\`
**Reports**:
- [../docs/TEST-REPORT-2025-12-24.md](../docs/TEST-REPORT-2025-12-24.md) - Initial comprehensive report
- [../docs/TEST-SUMMARY-UPDATED.md](../docs/TEST-SUMMARY-UPDATED.md) - Latest results and improvements

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Executable doesn't exist" | `npx playwright install` |
| "Cannot find module 'playwright'" | `npm install --save-dev playwright` (install locally) |
| Connection refused | Start dev server: `python -m http.server 8000` |
| Selector mismatches | Update selectors in test files to match actual HTML |

---

## 🤖 For AI Agents: Running Temporary Test Scripts

When creating temporary test scripts for feature validation, follow these guidelines:

### Installing Playwright for Test Scripts

**The Problem:**
- Test scripts use `require('playwright')` which requires Playwright in `node_modules/`
- Global Playwright (`npx playwright install`) only installs browsers, not the Node.js module
- Running `node tests/your-test.js` fails with "Cannot find module 'playwright'"

**The Solution:**
Install Playwright locally as a dev dependency:

```bash
# ✅ CORRECT: Install Playwright to node_modules/
npm install --save-dev playwright

# Then install browser binaries (if not already done)
npx playwright install

# Now test scripts work
node tests/your-temporary-test.js
```

**Alternative - Temporary Installation (No package.json Changes):**

If you want to avoid modifying package.json:

```bash
# Install to node_modules/ without saving to package.json
npm install --no-save playwright

# Run test
node tests/your-temporary-test.js
```

**Note:** `--no-save` installs Playwright for the current session only. It won't persist in package.json but will be available in `node_modules/`.

**Common Mistakes to Avoid:**

```bash
# ❌ WRONG: npx -p doesn't inject modules into Node.js resolution
npx -p playwright node tests/your-test.js
# Still fails: Cannot find module 'playwright'

# ❌ WRONG: Global installation doesn't help Node.js scripts
npx playwright install
node tests/your-test.js
# Still fails: Cannot find module 'playwright'

# ✅ CORRECT: Install to node_modules/ first
npm install --save-dev playwright
node tests/your-test.js
```

### Temporary Test Workflow

**Step 0: Ensure Playwright is Installed**
```bash
# Check if Playwright module exists
node -e "require('playwright')" 2>nul && echo "Playwright installed" || echo "Not installed"

# If not installed, install it (choose one):
# Option A: Permanent (recommended for frequent testing)
npm install --save-dev playwright

# Option B: Temporary (no package.json changes)
npm install --no-save playwright
```

**Step 1: Create Test Script**
```javascript
// tests/temp-feature-validation.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Your test logic here
    await page.goto('http://localhost:8000');

    await browser.close();
})();
```

**Step 2: Run Test**
```bash
# From project root - now this works with local installation
node tests/temp-feature-validation.js
```

**Step 3: Validate Feature**
- Check console output for test results
- Verify feature works as expected
- Note any failures or issues

**Step 4: Integrate or Clean Up**
- **If tests should be permanent:** Integrate into existing test files (see table above)
- **If temporary only:** Delete the test file after validation
- Update test documentation if adding new test categories

### Best Practices

1. **Naming Convention:** Use `temp-` prefix for temporary test files
   ```
   tests/temp-carousel-validation.js
   tests/temp-modal-focus.js
   ```

2. **Cleanup:** Always delete temporary test files after validation
   ```bash
   # After validation complete
   del tests/temp-*.js  # Windows
   rm tests/temp-*.js   # Linux/Mac
   ```

3. **Integration Over Duplication:**
   - ✅ Add tests to existing files when possible (e.g., `interactive-features.js`)
   - ❌ Don't create new test files for features covered by existing categories

4. **Server Requirement:** Always ensure dev server is running
   ```bash
   # Check server status first
   netstat -an | findstr :8000

   # Start if not running
   python -m http.server 8000
   ```

### Example: Complete Temporary Test Workflow

```bash
# 1. One-time setup - Install Playwright if not already installed
npm install --save-dev playwright
npx playwright install

# 2. Ensure dev server is running
netstat -an | findstr :8000

# 3. Create temporary test
# (Create tests/temp-analytics-validation.js with your test code)

# 4. Run test directly with node
node tests/temp-analytics-validation.js

# 5. Review results
# ✅ All tests passed? Great!

# 6. Integrate permanent tests into existing file
# Add relevant test cases to tests/interactive-features.js

# 7. Clean up temporary file
del tests/temp-analytics-validation.js

# 8. Run full test suite to verify integration
tests\run-all-tests.bat
```

### Why Playwright Needs Local Installation

**Key Understanding:**
- `require('playwright')` in Node.js looks for modules in `node_modules/` directory
- Global npm packages (installed with `npm install -g` or via `npx`) are NOT in the module resolution path
- `npx playwright install` only installs **browser binaries** (Chrome, Firefox, WebKit executables)
- `npx -p playwright node script.js` makes the **CLI tool** available, but NOT the **Node.js module**

**Two Separate Things:**
1. **Playwright CLI/Browsers** - Installed globally via `npx playwright install`
2. **Playwright Node.js Module** - Must be in `node_modules/` for `require('playwright')` to work

**Solution:**
Install Playwright locally with `npm install --save-dev playwright` so Node.js can find it when test scripts use `require('playwright')`.

---

## 📚 Documentation

**Project Docs:**
- [CLAUDE.md](../CLAUDE.md) - Project overview and documentation
- [TEST-REPORT-2025-12-24.md](../docs/TEST-REPORT-2025-12-24.md) - Initial detailed test results
- [TEST-SUMMARY-UPDATED.md](../docs/TEST-SUMMARY-UPDATED.md) - Latest test results with improvements
- [Performance Guide](../docs/PERFORMANCE-OPTIMIZATION-GUIDE.md)
- [Structured Data Guide](../docs/STRUCTURED-DATA-GUIDE.md)

**Playwright:**
- [Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

---

## 🤝 Contributing

When adding tests:
1. Use naming: `{category}-{subcategory}.js`
2. Include clear console output with ✅ ❌ ⚠️ ℹ️ symbols
3. Add summary statistics at end
4. Update this README

---

**Last Updated**: 2025-12-26 | **Framework**: Playwright + Native | **Total Tests**: 270+

---

## 🆕 Recent Updates

### 2025-12-26

**Test Suite Enhancement** - Complete test integration and coverage improvement

1. **Google Analytics 4 Integration** (analytics-basic-test.cjs) - 5 new tests
   - GA4 script injection and initialization
   - Enhanced Measurement configuration (page views, scrolls, outbound clicks)
   - Data layer setup verification
   - Tracking ID validation
   - Note: Custom events planned for future implementation

2. **Font Loading Performance** (performance.js) - 3 new tests
   - Font loader module async implementation validation
   - Font-display: swap parameter verification
   - Font loading non-blocking render check

3. **Test Suite Integration**
   - Analytics tests integrated into main test suite (11th category)
   - Updated run-all-tests.bat with proper sequencing
   - Test count updated across all documentation (270+ tests)
   - Analytics documentation clarified (Enhanced Measurement only, custom events future)

4. **Statistics Counter Animation** (interactive-features.js) - 3 tests (added earlier)
   - Initial counter state validation (starts at 0)
   - Count-up animation completion check
   - Data attributes verification (data-target, data-suffix)

### 2025-12-25

### New Tests Added for Recent Features:
1. **Resource Hints Validation** (seo-meta.js) - 3 new tests
   - DNS prefetch, preconnect, preload detection
   - Google Fonts optimization validation
   - Preload 'as' attribute validation

2. **Back-to-Top Button** (interactive-features.js) - 6 new tests
   - Button visibility on scroll
   - Scroll-to-top functionality
   - ARIA attributes validation
   - Keyboard accessibility (Enter key)
   - Auto-hide when at page top

3. **Memory Leak Prevention** (error-handling.js) - 5 new tests
   - Event listener management
   - Passive listeners detection
   - IntersectionObserver usage
   - Timer cleanup validation
   - Component instance cleanup (modals/carousels)

4. **Portfolio Data Validation** (portfolio-validation.js) - 50+ new tests
   - Schema validation for all fields
   - Required field validation
   - Type checking (string, array)
   - Length constraints validation
   - Pattern matching (URLs, paths)
   - Array item validation
   - Edge case handling

5. **Modal Focus Trap** - 7 new tests (4 in interactive-features.js, 3 in accessibility.js)
   - Initial focus set to close button on modal open
   - Tab navigation contained within modal (forward)
   - Shift+Tab navigation contained within modal (backward)
   - Focus restoration to trigger element on close (Escape, button, overlay)
   - WCAG 2.4.3 compliance validation
   - Keyboard user accessibility verification

**Test Coverage Improvement:** +76 tests (189 → 265+)
