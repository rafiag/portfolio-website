# Portfolio Website - Project Documentation

## What

A modern, responsive portfolio website for **Rafi Atha**, a Data Analyst with 5 years of experience in fintech and e-commerce. Showcases work experience, skills, projects, and testimonials through an interactive, accessible interface.

**Key Pages:**
- [index.html](index.html) - Landing page with hero, experience, skills, testimonials, projects, contact
- [portfolio.html](portfolio.html) - Full project showcase with filtering

## Why

**Purpose:** Professional online presence demonstrating technical expertise in data analytics, BI, and visualization with measurable impact.

**Target Audience:** Recruiters, hiring managers, clients, and professional connections in data analytics/BI.

## How

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), Google Fonts (Playfair Display + Work Sans)

**Core Features:** Responsive Navigation, Interactive Experience Timeline, Skills Matrix, Portfolio Carousel, Testimonials Carousel with Keyword Highlighting, Statistics Counter, Project Filtering, Modal System, Scroll Animations, Parallax Effects

**Design:** Mobile-first, dark theme (#2b2d31) with red accent (#ff6b6b), performance-focused, accessibility-first, progressive enhancement

**Details:** See [README.md](README.md) for complete feature descriptions and project structure.

---

## To-Do List

### High Priority
- [x] Replace placeholder content, Resource hints, Lazy loading, Memory leak prevention, Back-to-top button, Portfolio validation

### Medium Priority
- [x] Error handling, Module architecture, Structured data, Modal focus trap, Testimonials carousel, Analytics, Build process
- [ ] Dark/Light Mode Toggle

### Low Priority
- [x] Print styles, Animation performance (60fps), Progressive enhancement, Metrics display, Statistics counter
- [ ] Tooltips for technical terms, Dynamic resume generator

### Future
- [ ] Google Search Console integration

---

## 📚 Documentation

**Main:**
- [README.md](README.md) - User docs, structure, features, setup
- [js/README.md](js/README.md) - Module architecture, exports
- [tests/README.md](tests/README.md) - Test suite (270+ tests, 11 categories)

**Technical Guides ([docs/](docs/)):**
- [Analytics Events](docs/ANALYTICS-EVENTS-GUIDE.md), [Browser Support](docs/BROWSER-SUPPORT.md), [Build Summary](docs/BUILD-SUMMARY.md), [Deployment](docs/DEPLOYMENT.md), [Memory Leak Prevention](docs/MEMORY-LEAK-PREVENTION.md), [Performance Optimization](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md), [Portfolio Data Validation](docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md), [Print Styles](docs/PRINT-STYLES-GUIDE.md), [Resource Hints](docs/RESOURCE-HINTS-GUIDE.md), [Structured Data](docs/STRUCTURED-DATA-GUIDE.md)

**Browser Support:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+ (Feb 2020+). IE11 shows upgrade notice.

---

## 📝 Documentation Management

**CRITICAL:** Before creating ANY documentation file, follow this process:

**Priority Order:**
1. **Update existing [docs/](docs/) file** - Add new section if related
2. **Update module README** - [js/README.md](js/README.md) or [tests/README.md](tests/README.md)
3. **Update [README.md](README.md)** - For user-facing features
4. **Create new file in [docs/](docs/)** - ONLY if substantial (200+ lines), distinct topic, ask user first

**Rules:**
- ❌ NEVER create docs in root folder (except README.md, CLAUDE.md, LICENSE)
- ❌ NEVER create docs in random subfolders (css/, assets/, etc.)
- ✅ Ask user: "Should I add this to [existing-doc] or create new [docs/NEW-GUIDE.md]?"
- ✅ New files must: use UPPERCASE-KEBAB-CASE.md, include frontmatter, update this file's guide list

**Examples:**
- JS utility → Add to [js/README.md](js/README.md), not new file
- Testing approach → Add to [tests/README.md](tests/README.md), not new file
- Performance technique → Add to [PERFORMANCE-OPTIMIZATION-GUIDE.md](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md), not new file
- Major new feature (200+ lines) → Ask user, then create [docs/FEATURE-GUIDE.md](docs/)

**When updating docs:** Update "Last Updated" date, add to TOC if new section, update CLAUDE.md/README.md if new file

---

## 🛠️ Development Instructions

### Professional Feedback

**Don't Be a Yes-Man** - Provide honest, professional feedback:
- Flag performance issues, accessibility concerns, security risks, maintenance problems
- Explain "why", offer alternatives, use concrete examples
- Be respectful but direct - user values quality over blind agreement
- ✅ Good: "This would conflict with carousel. Instead, extend existing module to reduce duplication."
- ❌ Bad: "Sure, I'll implement exactly as suggested." (when there are issues)

### Feature Development Workflow

**1. Plan & Approval (REQUIRED)**
- Create plan BEFORE coding: overview, approach, files, conflicts, testing, docs
- Ask: "Does this approach look good? Should I proceed?"
- Wait for explicit approval

**2. Implementation**
- Follow code quality standards below
- Implement per approved plan

**3. Test Coverage**
- Review [tests/](tests/) folder (270+ tests, 11 categories)
- Prefer integrating into existing test files vs creating new
- Rerun updated tests, fix failures
- Run `tests\run-all-tests.bat` if multiple files modified

**4. Documentation**
- **Required:** Update [CLAUDE.md](CLAUDE.md) (mark todos, add features), [README.md](README.md) (describe features)
- **Optional:** Update [tests/README.md](tests/README.md), [js/README.md](js/README.md), or create/update [docs/](docs/) guide

**5. Version Control**
- Present summary: implemented, files changed, test results, docs updated
- **Ask user:** "Should I proceed with committing and pushing?"
- Wait for explicit approval
- One feature = one atomic commit
- Leave unrelated changes alone, verify with `git status`/`git diff`

### Development Server

**Check first:** `netstat -an | findstr :8000`
- If running → Use existing server
- If not → `python -m http.server 8000` (use Bash tool with `run_in_background=true`)
- Verify: Check netstat or test with PowerShell HTTP request
- **IMPORTANT:** Do NOT kill server after testing - leave it running for future tests
- Stop: Use `KillShell` tool ONLY when explicitly asked by user

### Code Quality

**JavaScript:**
- ES6+ (const/let, arrows, templates, modules), modular architecture ([js/modules/](js/modules/))
- All modules need `cleanup()` for memory leak prevention ([docs/MEMORY-LEAK-PREVENTION.md](docs/MEMORY-LEAK-PREVENTION.md))
- Descriptive names, JSDoc for complex functions, graceful error handling

**CSS:**
- CSS variables (`:root`), mobile-first, semantic classes (`.hero-section`)
- GPU animations: `transform`/`opacity` only ([docs/PERFORMANCE-OPTIMIZATION-GUIDE.md](docs/PERFORMANCE-OPTIMIZATION-GUIDE.md))
- Dark theme: #2b2d31 bg, #ff6b6b accent

**Accessibility:**
- Keyboard accessible, semantic HTML, ARIA labels, WCAG 2.1 AA contrast (4.5:1), test keyboard navigation

**Performance:**
- Page load <2s (3G), TTI <3s, CLS <0.1, FCP <1.5s, animations 60fps, modules <15KB

**Security:**
- Never `innerHTML` with user content (use `textContent`), external links need `rel="noopener noreferrer"`
- Validate [portfolio-data.js](js/data/portfolio-data.js) ([docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md](docs/PORTFOLIO-DATA-VALIDATION-GUIDE.md))
- No inline JS, follow CSP patterns

### Git Commits

**Format:** `<type>: <description>` (lowercase, no period)

**Types:** `implement` (new features), `add` (new content/files), `update` (modify existing), `fix` (bugs), `refactor`, `test`

**Examples:** `implement back to top button`, `fix carousel touch events`

### Module Architecture

**Requirements:**
1. File: `kebab-case.js` in [js/modules/](js/modules/)
2. Structure: Export class with `init()` and `cleanup()` methods
3. Import in [main-index.js](js/main-index.js) or [main-portfolio.js](js/main-portfolio.js)
4. Memory: Implement `cleanup()` ([docs/MEMORY-LEAK-PREVENTION.md](docs/MEMORY-LEAK-PREVENTION.md))

**Template:**
```javascript
// js/modules/feature-name.js
export class FeatureName {
    constructor() {
        this.elements = {};
        this.listeners = []; // Track for cleanup
    }
    init() {
        this.cacheElements();
        this.attachEventListeners();
        return this;
    }
    cleanup() {
        // Remove listeners, clear references
    }
}
export function initFeatureName() {
    return new FeatureName().init();
}
```

See [js/README.md](js/README.md) for details.

### Common Pitfalls

**Before:** Read files first (don't guess paths), check existing modules, use Task tool with Explore agent

**During:** Null checks for DOM queries, plan listener cleanup, use CSS variables (not hardcoded), validate portfolio data, test viewports (375px, 768px, 1920px), check console

**Testing:** Server on port 8000, URLs: `http://localhost:8000/` and `/portfolio.html`, see [tests/README.md](tests/README.md)

**Modules:** Import with `.js` extension, check entry points ([main-index.js](js/main-index.js), [main-portfolio.js](js/main-portfolio.js)), init order matters

**CSS:** Breakpoints: 480px (mobile menu), 768px (tablet), 1024px (desktop), use CSS variables, GPU props only (`transform`/`opacity`)

**Git:** Check status before commit, no debug code (console.logs, comments), follow commit conventions

---

**Last Updated:** 2025-12-26
**Author:** Rafi Atha
**Contact:** rafiatha.g@gmail.com