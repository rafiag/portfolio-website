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
1. Responsive Navigation, 2. Interactive Work Experience, 3. Skills Matrix, 4. Portfolio Carousel, 5. Testimonials Carousel, 6. Animated Statistics Counter, 7. Project Filtering, 8. Modal System with Focus Trap, 9. Scroll Animations, 10. Parallax Effects

**See [README.md](README.md) for detailed feature descriptions and project structure.**

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
- [x] Native Lazy Loading Strategy
- [x] Memory Leak Prevention
- [x] Back-to-Top Button
- [x] Portfolio Data Validation

### Medium Priority
- [x] Add error handling and loading states
- [x] Split JS into modules
- [x] Add structured data (Schema.org)
- [x] Modal Focus Trap
- [x] Testimonials Carousel
- [x] Implement analytics (Google Analytics, Plausible, etc.)
- [x] Set up build process with minification
- [ ] Dark/Light Mode Toggle

### Low Priority
- [x] Add print styles (A4 format)
- [x] Improve animation performance (60fps target)
- [x] Add progressive enhancement for older browsers
- [x] Add metrics display on experience section
- [x] Add short company description to experience details
- [x] Animated Statistics Counter
- [ ] Tooltips for Technical Terms
- [ ] Dynamic Resume Generator

### Future Enhancements
- [ ] Add site to Google Search Console

---

## 📚 Documentation Overview

**Main Documentation:**
- [README.md](README.md) - User-facing documentation, project structure, features, setup instructions
- [js/README.md](js/README.md) - JavaScript module architecture, exports, migration notes
- [tests/README.md](tests/README.md) - Complete test suite (265+ tests, 10 categories), Playwright setup

**Technical Guides in [docs/](docs/):** (10 guides)
- [Analytics Events Guide](docs/ANALYTICS-EVENTS-GUIDE.md)
- [Browser Support Guide](docs/BROWSER-SUPPORT.md)
- [Build Summary](docs/BUILD-SUMMARY.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Memory Leak Prevention](docs/MEMORY-LEAK-PREVENTION.md)
- [Performance Optimization Guide](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md)
- [Portfolio Data Validation Guide](docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md)
- [Print Styles Guide](docs/PRINT-STYLES-GUIDE.md)
- [Resource Hints Guide](docs/RESOURCE-HINTS-GUIDE.md)
- [Structured Data Guide](docs/STRUCTURED-DATA-GUIDE.md)

**Browser Support:**
Chrome 80+, Firefox 75+, Safari 13+, Edge 80+ (Feb 2020+). IE11 shows upgrade notice. See [docs/BROWSER-SUPPORT.md](docs/BROWSER-SUPPORT.md) for details.

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

**1. Development Plan & User Approval**
   - **CRITICAL: Create a development plan BEFORE starting any implementation**
   - The plan must include:
     - Feature overview and objectives
     - Implementation approach (technical strategy, libraries/APIs to use, etc.)
     - Files to be created/modified
     - Potential conflicts with existing features (check [js/modules/](js/modules/), CSS, HTML, event listeners)
     - Testing strategy
     - Documentation updates needed
   - **Present the complete plan to the user and ask: "Does this approach look good? Should I proceed with implementation?"**
   - **Wait for explicit user approval before writing any code**
   - If conflicts are detected, explain what existing functionality might be affected and propose solutions

**2. Implementation**
   - Once the plan is approved, proceed with implementing the feature
   - Follow all code quality standards and guidelines outlined in this document
   - Implement the feature according to the approved plan

**3. Test Coverage Review**
   - After feature implementation, review test scripts in [tests/](tests/) folder
   - Check [tests/README.md](tests/README.md) for existing test categories (10 categories, 265+ tests)
   - Integration approach:
     - **Prefer:** Integrate new tests into existing relevant test scripts
     - **Only create new test file if:** Feature introduces entirely new category not covered by existing tests
   - Common test categories: accessibility, interactive-features, performance, responsive, browser-compatibility

**4. Test Validation**
   - If new test cases are added, rerun the updated test script(s)
   - Verify the new feature is implemented properly
   - Fix any test failures before completing the task
   - Run full test suite if multiple files were modified: `tests\run-all-tests.bat`

**5. Documentation Updates**
   - After feature implementation and testing, update all relevant documentation
   - **Required updates:**
     - [CLAUDE.md](CLAUDE.md) - Add to "Core Features", update "File Structure" if needed, mark To-Do items as completed
     - [README.md](README.md) - Add feature description, update screenshots/examples if visual changes
   - **Optional updates (if applicable):**
     - [tests/README.md](tests/README.md) - Document new test categories
     - [js/README.md](js/README.md) - Document new modules and their exports
     - Create new guide in [docs/](docs/) folder for complex features
     - Update relevant existing guides in [docs/](docs/) if feature modifies existing behavior

**6. User Review & Version Control**
   - After completing all above steps, present the feature to the user for review
   - Show summary of: what was implemented, files modified/created, test results, documentation updates
   - **CRITICAL: Always ask user for explicit confirmation before ANY git operation**
     - Do NOT proceed with `git add`, `git commit`, or `git push` without user approval
     - Present a clear summary and ask: "Should I proceed with committing and pushing these changes?"
     - Wait for explicit "yes" or confirmation before executing any git commands
   - Once approved, commit and push changes:
     ```bash
     git add <relevant-files>
     git commit -m "<type>: <description>"  # See Git Commit Guidelines below
     git push origin <branch-name>
     ```
   - **Important:**
     - One feature = One commit (keep commits atomic and focused)
     - If there are other changes made from outside the session, leave them as is - don't include them in the commit and don't revert them
     - Always verify what's being committed with `git status` and `git diff`
     - Never push without explicit user approval
     - If pushing to main/master, double-check with user first

### Starting the Development Server

**IMPORTANT: Always Check for Existing Servers First**

Before starting a new development server, check if one is already running:

```bash
# Check if server is already running on port 8000
netstat -an | findstr :8000
```

**If a server is already running:**
- ✅ Use the existing server - no need to start a new one
- ✅ Verify it's serving the correct directory
- ❌ Do NOT start another server on the same port (causes conflicts)

**If no server is running:**

```bash
# Windows Environment - Use Bash tool with run_in_background=true
python -m http.server 8000
```

**Why:** DO NOT use `start /B python -m http.server 8000` - the `/B` flag can be misinterpreted as drive B: in Windows. The Bash tool's `run_in_background` parameter handles backgrounding correctly.

**After Starting - Verify:**
```bash
netstat -an | findstr :8000
# Or test with HTTP request:
powershell -Command "Start-Sleep -Seconds 2; try { (Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing).StatusCode } catch { 'Error' }"
```

**Stopping the Server:** Use the `KillShell` tool with the appropriate shell_id.

### Code Quality Standards

**JavaScript Guidelines:**
- Use ES6+ features (const/let, arrow functions, template literals, modules)
- Follow modular architecture - create separate modules in [js/modules/](js/modules/) (see [js/README.md](js/README.md) for module structure)
- All modules must export their main functionality and include cleanup methods to prevent memory leaks (see [docs/MEMORY-LEAK-PREVENTION.md](docs/MEMORY-LEAK-PREVENTION.md))
- Use descriptive variable/function names (no single letters except loop counters)
- Add JSDoc comments for complex functions
- Handle errors gracefully - never let errors crash the page silently

**CSS Guidelines:**
- Use CSS custom properties (variables) defined in `:root` for colors and common values
- Follow mobile-first approach - base styles for mobile, media queries for desktop
- Use semantic class names (`.hero-section`, not `.box1`)
- Leverage GPU acceleration for animations - `transform` and `opacity` only (see [docs/PERFORMANCE-OPTIMIZATION-GUIDE.md](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md))
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
- Validate all data in [portfolio-data.js](js/data/portfolio-data.js) using the validator (see [docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md](docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md))
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

When creating new JavaScript modules, follow the structure in [js/README.md](js/README.md).

**Key Requirements:**
1. **File Naming:** Use kebab-case: `feature-name.js`
2. **Module Structure:** Export class with `init()` and `cleanup()` methods
3. **Integration:** Import in [main-index.js](js/main-index.js) or [main-portfolio.js](js/main-portfolio.js)
4. **Memory Management:** Always implement `cleanup()` method (see [docs/MEMORY-LEAK-PREVENTION.md](docs/MEMORY-LEAK-PREVENTION.md))

**Example:**
```javascript
// js/modules/feature-name.js
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

    cleanup() {
        // Remove all event listeners and clear references
    }
}

export function initFeatureName() {
    return new FeatureName().init();
}
```

See [js/README.md](js/README.md) for detailed module documentation and examples.

### Common Pitfalls & Troubleshooting

**Before Implementation:**
- ❌ Don't guess file paths - always use Read or Glob to verify files exist
- ❌ Don't assume existing code structure - read the actual implementation first
- ❌ Don't create duplicate functionality - check existing modules in [js/modules/](js/modules/) (see [js/README.md](js/README.md))
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
- See [tests/README.md](tests/README.md) for complete testing guide and troubleshooting

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

**Last Updated:** 2025-12-26
**Author:** Rafi Atha
**Contact:** rafiatha.g@gmail.com
