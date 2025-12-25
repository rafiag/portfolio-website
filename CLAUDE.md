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
5. **Testimonials Carousel** - Auto-rotating carousel showing 2 testimonials at once (1 on mobile) with prev/next buttons, navigation dots, and pause-on-hover
6. **Project Filtering** - Dynamic filtering system on portfolio page
7. **Modal System** - Detailed project views with overlay and focus trap
8. **Scroll Animations** - Intersection Observer API for reveal effects
9. **Parallax Effects** - Subtle hero image movement on scroll

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
│   └── modules/       # Modular ES6 JavaScript (16 modules)
│       ├── accessibility.js
│       ├── back-to-top.js
│       ├── error-handler.js
│       ├── font-loader.js
│       ├── index-page.js
│       ├── mobile-menu.js
│       ├── navbar-effects.js
│       ├── performance-utils.js
│       ├── portfolio-carousel.js
│       ├── portfolio-filter.js
│       ├── portfolio-modal.js
│       ├── portfolio-validator.js
│       ├── scroll-animations.js
│       ├── smooth-scroll.js
│       ├── structured-data.js
│       └── testimonials-carousel.js
├── tests/             # Test suite
│   ├── accessibility.js
│   ├── browser-compatibility.js
│   ├── content-links.js
│   ├── cross-browser-javascript.js
│   ├── error-handling.js
│   ├── interactive-features.js
│   ├── performance.js
│   ├── portfolio-validation.js
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
- [x] Resource Hints in HTML
- [x] Native Lazy Loading Strategy (Use loading="lazy" on below-fold images)
- [x] Memory Leak Prevention (Cleanup methods in classes to remove event listeners)
- [x] Back-to-Top Button (Floating button appearing after scrolling down)
- [x] Portfolio Data Validation (Schema validation portfolio-data.js)

### Medium Priority
- [x] Add error handling and loading states
- [x] Split JS into modules
- [x] Add structured data (Person, ProfilePage, Organization, CreativeWork schemas)
- [x] Modal Focus Trap (Keep tab navigation within modal when open, return focus to trigger element on close)
- [x] Testimonials Carousel (Auto-rotating testimonials with pause-on-hover)
- [ ] Implement analytics (Google Analytics, Plausible, etc.)
- [ ] Dark/Light Mode Toggle

### Low Priority
- [x] Add print styles (A4 format, intelligent page breaks, optimized for B&W and color)
- [x] Improve animation performance (60fps target: GPU acceleration, throttling, RAF, CSS containment)
- [x] Add progressive enhancement for older browsers (Browser detection, CSS fallbacks, upgrade notices)
- [x] Add metrics display on experience section (i.e. total YOE, company, etc)
- [x] Add short company description to experience details
- [ ] Animated Statistics Counter (Count-up animation for your experience metrics in hero section, triggers on scroll into view using Intersection Observer)
- [ ] Tooltips for Technical Terms (Hover/click tooltips explaining jargon such as RFM, DBSCAN, etc.)
- [ ] Dynamic Resume Generator (Generate customizable PDF resume from site data, select which sections to include)

### Future Enhancements
- [ ] Add site to Google Search Console
---

## 📚 Documentation

For detailed technical guides, see the [docs/](docs/) folder:

- **[Performance Optimization Guide](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md)** - 60fps optimization, throttling, RAF, GPU acceleration
- **[Memory Leak Prevention](docs/MEMORY-LEAK-PREVENTION.md)** - Event listener cleanup, DOM reference management, observer lifecycle
- **[Resource Hints Guide](docs/RESOURCE-HINTS-GUIDE.md)** - DNS prefetch, preconnect, preload, and prefetch optimization
- **[Print Styles Guide](docs/PRINT-STYLES-GUIDE.md)** - Professional PDF generation, A4 format, page breaks
- **[Structured Data Guide](docs/STRUCTURED-DATA-GUIDE.md)** - SEO with Schema.org, validation, Google integration
- **[Browser Support Guide](docs/BROWSER-SUPPORT.md)** - Compatibility, fallbacks, minimum requirements
- **[Portfolio Data Validation Guide](docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md)** - Schema validation, type checking, error handling
- **[JavaScript Modules Documentation](js/README.md)** - Module structure, exports, usage examples

## Browser Support

**Minimum Requirements:**
- Chrome 80+ (February 2020)
- Firefox 75+ (April 2020)
- Safari 13+ (September 2019)
- Edge 80+ (February 2020)

**Unsupported:** IE11 and older browsers show an upgrade notice. See [docs/BROWSER-SUPPORT.md](docs/BROWSER-SUPPORT.md) for details.

---

## 🛠️ Development Instructions for AI Agents

### Professional Feedback & Collaboration

**IMPORTANT: Don't Be a Yes-Man**

You are expected to provide honest, professional feedback on user suggestions:

- **If a suggestion has potential issues**, explain them clearly:
  - Performance implications (e.g., "This approach might cause memory leaks because...")
  - Accessibility concerns (e.g., "This could break keyboard navigation for...")
  - Security risks (e.g., "Using innerHTML here exposes the site to XSS attacks...")
  - Maintenance issues (e.g., "This creates tight coupling that will make future changes harder...")
  - Better alternatives (e.g., "Instead of X, consider Y because...")

- **When providing feedback:**
  - Be respectful but direct
  - Explain the "why" behind your concerns
  - Offer alternative solutions when possible
  - Use concrete examples to illustrate the issue
  - Acknowledge valid parts of the suggestion while addressing problems

- **Good feedback examples:**
  - ✅ "This approach could work, but it would conflict with the existing carousel implementation. Instead, we could extend the current carousel module to support this feature, which would maintain consistency and reduce code duplication."
  - ✅ "Adding this animation to the scroll event handler would cause performance issues on mobile devices. A better approach would be to use Intersection Observer API with throttling, which aligns with the performance budgets in this project."
  - ❌ "Sure, I'll implement that exactly as you suggested." (when there are obvious issues)

- **Your role is to be a collaborative partner, not just an order-taker.** The user values quality over blind agreement.

### Feature Development Workflow

When asked to create or implement a new feature, you MUST follow this workflow:

**1. Conflict Detection and User Confirmation**
   - Before implementing, analyze how the new feature interacts with existing features
   - Check for potential conflicts with:
     - Existing JavaScript modules in [js/modules/](js/modules/)
     - CSS styles and animations
     - HTML structure and semantics
     - Event listeners and DOM manipulations
   - If conflicts are detected, ask the user for confirmation before proceeding
   - Explain what existing functionality might be affected

**2. Test Coverage Review**
   - After feature implementation, review test scripts in [tests/](tests/) folder
   - Check [tests/README.md](tests/README.md) for existing test categories
   - Determine if new test cases are needed for the feature
   - Integration approach:
     - **Prefer:** Integrate new tests into existing relevant test scripts
     - **Only create new test file if:** Feature introduces entirely new category not covered by existing tests
   - Common test categories to consider:
     - Accessibility ([tests/accessibility.js](tests/accessibility.js))
     - Interactive features ([tests/interactive-features.js](tests/interactive-features.js))
     - Performance ([tests/performance.js](tests/performance.js))
     - Responsive design ([tests/responsive.js](tests/responsive.js))
     - Browser compatibility ([tests/browser-compatibility.js](tests/browser-compatibility.js))

**3. Test Validation**
   - If new test cases are added, rerun the updated test script(s)
   - Verify the new feature is implemented properly
   - Fix any test failures before completing the task
   - Run full test suite if multiple files were modified:
     ```bash
     cd tests
     run-all-tests.bat
     ```

**4. Documentation Updates**
   - After feature implementation and testing, update all relevant documentation
   - **Required updates:**
     - [CLAUDE.md](CLAUDE.md) - Update project documentation:
       - Add feature to "Core Features" section if user-facing
       - Update "File Structure" if new files/folders added
       - Add to appropriate To-Do list section and mark as completed
       - Update "Last Updated" date
     - [README.md](README.md) - Update user-facing documentation:
       - Add feature description to features list
       - Update screenshots/examples if visual changes
       - Update usage instructions if applicable
   - **Optional updates (if applicable):**
     - [tests/README.md](tests/README.md) - Document new test categories
     - [js/README.md](js/README.md) - Document new modules and their exports
     - Create new guide in [docs/](docs/) folder for complex features
     - Update relevant existing guides in [docs/](docs/) if feature modifies existing behavior

**5. User Review & Version Control**
   - After completing all above steps, present the feature to the user for review
   - Show summary of:
     - What was implemented
     - Files modified/created
     - Test results
     - Documentation updates
   - **Wait for user approval before proceeding to git operations**
   - Once approved, commit and push changes by feature:
     ```bash
     # Stage all changes related to the feature
     git add <relevant-files>

     # Create commit with appropriate message (see Git Commit Guidelines)
     git commit -m "<type>: <description>"

     # Push to remote (only after user approval)
     git push origin <branch-name>
     ```
   - **Important:**
     - One feature = One commit (keep commits atomic and focused)
     - If feature involves multiple logical changes, ask user if they want separate commits
     - Always verify what's being committed with `git status` and `git diff`
     - Never push without explicit user approval
     - If pushing to main/master, double-check with user first

### Starting the Development Server

**IMPORTANT: Always Check for Existing Servers First**

Before starting a new development server, you MUST check if one is already running:

```bash
# Check if server is already running on port 8000
netstat -an | findstr :8000
```

**If a server is already running:**
- ✅ Use the existing server - no need to start a new one
- ✅ Verify it's serving the correct directory
- ❌ Do NOT start another server on the same port (causes conflicts)

**If no server is running, start one:**

**Windows Environment:**
```bash
# DO NOT use 'start /B python -m http.server 8000'
# The /B flag can be misinterpreted as drive B:

# Instead, use the Bash tool with run_in_background=true:
python -m http.server 8000
# (with run_in_background parameter set to true in the tool call)
```

**Why:** The `start /B` command can cause errors in Windows environments where `/B` might be interpreted as a path to the B: drive instead of the "no new window" flag. The Bash tool's `run_in_background` parameter handles backgrounding correctly across platforms.

**After Starting - Verify Server is Running:**
```bash
# Check if server is running on port 8000
netstat -an | findstr :8000

# Or test with a simple HTTP request
powershell -Command "Start-Sleep -Seconds 2; try { (Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing).StatusCode } catch { 'Error' }"
```

**Stopping the Server:**
Use the `KillShell` tool with the appropriate shell_id.

**Multiple Server Warning:**
If you see multiple processes on port 8000 (checked with `netstat -ano | findstr :8000`), this indicates duplicate servers. While they may coexist, it's best practice to stop duplicates to avoid confusion and resource waste.

### Code Quality Standards

**JavaScript Guidelines:**
- Use ES6+ features (const/let, arrow functions, template literals, modules)
- Follow modular architecture - create separate modules in [js/modules/](js/modules/) for distinct functionality
- All modules must export their main functionality and include cleanup methods to prevent memory leaks
- Use descriptive variable/function names (no single letters except loop counters)
- Add JSDoc comments for complex functions
- Handle errors gracefully - never let errors crash the page silently

**CSS Guidelines:**
- Use CSS custom properties (variables) defined in `:root` for colors and common values
- Follow mobile-first approach - base styles for mobile, media queries for desktop
- Use semantic class names (`.hero-section`, not `.box1`)
- Leverage GPU acceleration for animations (`transform`, `opacity` only)
- Maintain dark theme consistency (#2b2d31 background, #ff6b6b accent)

**Accessibility Requirements:**
- All interactive elements must be keyboard accessible (tab navigation)
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, etc.)
- Include ARIA labels for icon buttons and complex widgets
- Maintain WCAG 2.1 AA contrast ratios (4.5:1 for normal text)
- Test with keyboard-only navigation before completing features

**Performance Budgets:**
- Initial page load: < 2 seconds on 3G
- Time to Interactive (TTI): < 3 seconds
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.5 seconds
- All animations: 60fps (use Chrome DevTools Performance tab)
- JavaScript bundle: Keep each module < 15KB unminified

**Security Checklist:**
- Never use `innerHTML` with user-generated content (use `textContent`)
- All external links must have `rel="noopener noreferrer"`
- Validate all data in [portfolio-data.js](js/data/portfolio-data.js) using the validator
- No inline JavaScript in HTML
- Follow existing Content Security Policy patterns

### Git Commit Guidelines

Follow these conventions based on the project's commit history:

**Format:** `<type>: <description>` (lowercase, no period)

**Types:**
- `implement` - New features (e.g., "implement modal focus trap")
- `add` - New content or files (e.g., "add portfolio-data validation")
- `update` - Modifications to existing features (e.g., "update readme.md")
- `fix` - Bug fixes (e.g., "fix carousel touch events")
- `refactor` - Code restructuring without behavior change
- `test` - Test updates (e.g., "update and rerun test case")

**Examples:**
```bash
implement back to top button
add memory leak prevention
update project description in README.md
fix navbar scroll behavior
```

**Important:**
- Keep descriptions concise but descriptive
- Use lowercase for the entire message
- No period at the end
- Focus on what changed, not why (details go in commit body if needed)

### Module Architecture Guidelines

When creating new JavaScript modules in [js/modules/](js/modules/):

**1. File Naming:**
- Use kebab-case: `feature-name.js`
- Name should reflect the module's primary responsibility

**2. Module Structure:**
```javascript
// feature-name.js
export class FeatureName {
    constructor() {
        this.elements = {};
        this.state = {};
        this.listeners = []; // Track for cleanup
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        return this;
    }

    cacheElements() {
        // Store DOM references
    }

    attachEventListeners() {
        // Add event listeners and track them
    }

    cleanup() {
        // Remove all event listeners
        // Clear references to prevent memory leaks
    }
}

// Export factory function for easy initialization
export function initFeatureName() {
    return new FeatureName().init();
}
```

**3. Integration:**
- Import in appropriate entry point ([main-index.js](js/main-index.js) or [main-portfolio.js](js/main-portfolio.js))
- Add to [js/README.md](js/README.md) with description and exports
- Include cleanup in page unload handlers if applicable

**4. Memory Management:**
- Always implement a `cleanup()` method
- Store event listeners in an array for bulk removal
- Clear timers, intervals, and observers in cleanup
- See [docs/MEMORY-LEAK-PREVENTION.md](docs/MEMORY-LEAK-PREVENTION.md) for detailed guidelines

### Common Pitfalls & Troubleshooting

**Before Implementation:**
- ❌ Don't guess file paths - always use Read or Glob to verify files exist
- ❌ Don't assume existing code structure - read the actual implementation first
- ❌ Don't create duplicate functionality - check existing modules in [js/modules/](js/modules/)
- ✅ Do use the Task tool with Explore agent for codebase discovery

**During Development:**
- ❌ Don't use `getElementById` without null checks
- ❌ Don't add event listeners without planning how to remove them
- ❌ Don't hardcode values that are already in CSS custom properties
- ❌ Don't modify [portfolio-data.js](js/data/portfolio-data.js) without running the validator
- ✅ Do test in multiple viewports (mobile: 375px, tablet: 768px, desktop: 1920px)
- ✅ Do check browser console for errors after changes

**Testing Issues:**
- If tests fail, check that the dev server is running on port 8000
- Playwright tests expect specific URLs: `http://localhost:8000/` and `http://localhost:8000/portfolio.html`
- Test failures in [accessibility.js](tests/accessibility.js) usually indicate missing ARIA labels
- Test failures in [performance.js](tests/performance.js) may require checking lazy loading attributes

**Module Integration Issues:**
- Modules must be imported with `.js` extension in ES6 imports
- Check entry point files: [main-index.js](js/main-index.js) for index.html, [main-portfolio.js](js/main-portfolio.js) for portfolio.html
- Module execution order matters - init functions should be called in dependency order

**CSS Issues:**
- Check media query breakpoints: 480px (mobile menu), 768px (tablet), 1024px (desktop)
- Dark theme colors must use existing CSS variables, not hardcoded values
- Animation jank usually means you're animating non-GPU properties (use `transform` and `opacity` only)

**Git Issues:**
- Always check git status before committing to see what actually changed
- Don't commit debugging code (console.logs, commented code, test files)
- Commit message should match existing convention (see Git Commit Guidelines above)

---

**Last Updated:** 2025-12-25
**Author:** Rafi Atha
**Contact:** rafiatha.g@gmail.com
