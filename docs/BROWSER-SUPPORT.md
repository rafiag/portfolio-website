# Browser Support Guide

## Overview

This portfolio website is built with modern web standards and requires a recent browser for full functionality. Older browsers (IE11, old Edge, Safari < 13) will see an upgrade notice.

---

## Minimum Browser Requirements

### ✅ Fully Supported Browsers

| Browser | Minimum Version | Released |
|---------|-----------------|----------|
| **Chrome** | 80+ | February 2020 |
| **Firefox** | 75+ | April 2020 |
| **Safari** | 13+ | September 2019 |
| **Edge** | 80+ (Chromium) | February 2020 |
| **Opera** | 67+ | March 2020 |
| **Samsung Internet** | 13+ | February 2020 |

**Note:** These browsers support all modern features used in this portfolio including ES6 modules, CSS Grid, CSS custom properties, and IntersectionObserver API.

---

## Unsupported Browsers

### ❌ Not Supported

- **Internet Explorer 11** and earlier (shows upgrade notice)
- **Edge Legacy** (< 80, pre-Chromium) (shows upgrade notice)
- **Safari** < 13 (shows upgrade notice)
- **Chrome** < 80 (shows upgrade notice)
- **Firefox** < 75 (shows upgrade notice)

**Reason:** These browsers lack support for ES6 modules, CSS Grid, and other modern web features. Users see a friendly upgrade notice instead of broken functionality.

---

## Browser Detection & Fallbacks

### 1. **Browser Compatibility Check**

**File:** [js/browser-check.js](../js/browser-check.js)

**What it does:**
- Detects IE11 using User Agent string
- Detects browsers without ES6 module support (`noModule` check)
- Shows full-screen upgrade notice with browser download links
- Prevents page scripts from loading on unsupported browsers

**User Experience:**
```
┌─────────────────────────────────────┐
│  ⚠  Browser Not Supported           │
│                                      │
│  This portfolio requires a modern   │
│  web browser to display correctly.  │
│                                      │
│  Please upgrade to:                 │
│  [Chrome] [Firefox] [Edge] [Safari] │
│                                      │
│  Minimum requirements: Chrome 80+,  │
│  Firefox 75+, Safari 13+, Edge 80+  │
└─────────────────────────────────────┘
```

---

### 2. **NoScript Fallback**

Both [index.html](../index.html) and [portfolio.html](../portfolio.html) include:

```html
<noscript>
  <div>
    JavaScript is required. Please enable JavaScript
    in your browser settings to view this portfolio.
  </div>
</noscript>
```

**User Experience:**
- Users with JavaScript disabled see a notice to enable it
- Red banner at top of page
- Links to browser settings

---

### 3. **CSS Fallbacks**

**File:** [style.css](../style.css)

#### **CSS Custom Properties Fallback**

```css
body {
    /* Fallback for browsers without CSS variables */
    font-family: 'Work Sans', sans-serif;
    background-color: #2b2d31;
    color: #f8f9fa;
    /* Modern browsers override with variables */
    font-family: var(--font-body);
    background-color: var(--color-bg);
    color: var(--color-text);
}
```

**Result:** Older browsers get hard-coded colors; modern browsers use CSS variables.

#### **CSS Grid Fallback**

```css
.portfolio-grid {
    /* Fallback: Flexbox for browsers without Grid */
    display: flex;
    flex-wrap: wrap;
    margin: -1.5rem;
}

@supports (display: grid) {
    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 3rem;
        margin: 0;
    }
}
```

**Result:** Browsers without Grid support get Flexbox layout; Grid browsers get optimized Grid layout.

---

## Progressive Enhancement Strategy

### **Level 1: Critical HTML/CSS** (All Browsers)
- Semantic HTML structure
- Basic layout with Flexbox fallback
- Readable content
- Navigation links work

### **Level 2: Modern CSS** (Chrome 80+, Firefox 75+, Safari 13+)
- CSS Grid layouts
- CSS custom properties (variables)
- CSS animations
- backdrop-filter effects
- CSS containment

### **Level 3: Modern JavaScript** (Chrome 80+, Firefox 75+, Safari 13+)
- ES6 modules
- Arrow functions, template literals
- IntersectionObserver for scroll animations
- requestAnimationFrame for 60fps
- Passive event listeners

### **Level 4: Advanced Features** (Latest Browsers)
- CSS aspect-ratio
- scroll-snap
- prefers-reduced-motion
- prefers-contrast

---

## Feature Support Matrix

| Feature | Chrome 80+ | Firefox 75+ | Safari 13+ | IE11 | Fallback |
|---------|------------|-------------|------------|------|----------|
| **ES6 Modules** | ✅ | ✅ | ✅ | ❌ | Upgrade notice |
| **CSS Grid** | ✅ | ✅ | ✅ | ❌ | Flexbox layout |
| **CSS Variables** | ✅ | ✅ | ✅ | ❌ | Hard-coded values |
| **IntersectionObserver** | ✅ | ✅ | ✅ | ❌ | Elements shown immediately |
| **requestAnimationFrame** | ✅ | ✅ | ✅ | ❌ | setTimeout fallback |
| **backdrop-filter** | ✅ | ✅ | ✅ | ❌ | Solid background |
| **CSS containment** | ✅ | ✅ | ⚠️ Partial | ❌ | Ignored gracefully |
| **aspect-ratio** | ✅ 88+ | ✅ 89+ | ✅ 15+ | ❌ | Explicit height |
| **scroll-snap** | ✅ | ✅ | ✅ | ❌ | Works without snap |
| **prefers-reduced-motion** | ✅ | ✅ | ✅ 10.1+ | ❌ | Ignored gracefully |

---

## Testing Browser Compatibility

### **Desktop Browsers**

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest, macOS only)
- ✅ Edge (latest)

### **Mobile Browsers**

Test on:
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)
- ✅ Samsung Internet (Android)
- ✅ Firefox Mobile

### **Older Browsers for Testing**

To verify fallbacks work:
1. **IE11** - Should show upgrade notice immediately
2. **Safari 12** - Should show upgrade notice
3. **Chrome 70** - Should show upgrade notice

---

## User Analytics Recommendations

Track browser usage to validate support decisions:

```javascript
// Example analytics tracking
{
  browser: 'Chrome',
  version: '120',
  supported: true,
  features: {
    esModules: true,
    cssGrid: true,
    cssVariables: true
  }
}
```

**Expected Results:**
- Modern browsers: 99%+
- IE11/old browsers: < 1%

---

## Maintenance & Updates

### **When to Update Minimum Requirements**

Consider raising minimum versions when:
1. Usage of older browsers drops below 0.5%
2. New CSS/JS features become essential
3. Performance optimizations require newer APIs

### **How to Update**

1. Update `js/browser-check.js` detection logic
2. Test new features in target browsers
3. Update this documentation
4. Update browser version numbers in user notices

---

## Browser-Specific Notes

### **Safari**

- ✅ Supports all features from Safari 13+
- ⚠️ Safari 12 and below show upgrade notice
- 📱 iOS Safari same version support as macOS Safari

### **Chrome/Edge**

- ✅ Full support from version 80+
- ✅ Edge switched to Chromium in version 80 (fully compatible with Chrome)
- 🎯 Best performance (V8 engine optimized for ES6+)

### **Firefox**

- ✅ Full support from version 75+
- ✅ Excellent CSS Grid support
- ✅ Strong privacy features (doesn't affect functionality)

### **Mobile Browsers**

- ✅ Modern mobile browsers (2020+) fully supported
- ✅ iOS Safari 13+ supported
- ✅ Chrome Mobile fully supported
- ✅ Samsung Internet 13+ supported

---

## Common Issues & Solutions

### **Issue: User reports blank page**

**Possible Causes:**
1. JavaScript disabled → Shows NoScript notice
2. Very old browser → Shows upgrade notice
3. Browser extensions blocking scripts

**Solution:** Check console for errors, verify JavaScript is enabled

---

### **Issue: Layout looks broken**

**Possible Causes:**
1. Browser doesn't support CSS Grid (very rare)
2. Custom CSS injected by extension

**Solution:** Check if `@supports (display: grid)` works, disable extensions

---

### **Issue: Animations don't work**

**Possible Causes:**
1. IntersectionObserver not supported (fallback should show elements immediately)
2. `prefers-reduced-motion` enabled (intentional)

**Solution:** Expected behavior - content still accessible

---

## Resources

- **Can I Use:** https://caniuse.com/
- **MDN Browser Compatibility:** https://developer.mozilla.org/en-US/docs/Web/
- **Browser Market Share:** https://gs.statcounter.com/

---

**Implementation Date:** 2025-12-24
**Last Updated:** 2025-12-24
**Status:** ✅ Active

**Browser Support Policy:** Modern browsers only (2020+), with graceful upgrade notices for older browsers.
