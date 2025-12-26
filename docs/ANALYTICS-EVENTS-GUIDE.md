# Analytics Events Guide

## Overview

This document outlines all analytics events tracked on the portfolio website using Google Analytics 4 (GA4). It serves as a reference for understanding what user interactions are being tracked, their properties, and implementation status.

**Last Updated:** 2025-12-26
**Analytics Provider:** Google Analytics 4 (GA4)
**Measurement ID:** `G-XBG7HNQ9YG`

---

## Table of Contents

1. [Automatic Events (GA4 Enhanced Measurement)](#automatic-events-ga4-enhanced-measurement)
2. [Custom Events (Manual Implementation)](#custom-events-manual-implementation)
3. [Event Naming Conventions](#event-naming-conventions)
4. [Implementation Checklist](#implementation-checklist)

---

## Automatic Events (GA4 Enhanced Measurement)

These events are tracked automatically by Google Analytics when Enhanced Measurement is enabled. No custom code required.

### Event: `page_view`

| Property | Value |
|----------|-------|
| **Event Name** | `page_view` |
| **Type** | Page View |
| **Trigger** | Every time a page loads (index.html, portfolio.html) |
| **Source** | GA4 Built-in (Enhanced Measurement) |
| **Implemented** | ✅ True |

**Event Properties:**
- `page_location` - Full URL of the page
- `page_title` - Document title
- `page_referrer` - Previous page URL

---

### Event: `scroll`

| Property | Value |
|----------|-------|
| **Event Name** | `scroll` |
| **Type** | Scroll Depth |
| **Trigger** | When user scrolls to 90% of page depth |
| **Source** | GA4 Built-in (Enhanced Measurement) |
| **Implemented** | ✅ True |

**Event Properties:**
- `percent_scrolled` - Always 90 (GA4 default threshold)

---

### Event: `click` (Outbound Links)

| Property | Value |
|----------|-------|
| **Event Name** | `click` |
| **Type** | Outbound Click |
| **Trigger** | Clicks on external links (LinkedIn, GitHub, email mailto:, external project links) |
| **Source** | GA4 Built-in (Enhanced Measurement) |
| **Implemented** | ✅ True |

**Event Properties:**
- `link_domain` - Destination domain
- `link_url` - Full destination URL
- `outbound` - true

**Tracked Links:**
- LinkedIn profile links (hero, footer)
- GitHub profile links (hero, footer)
- Email links (hero, contact section, footer)
- External project links in portfolio modals

---

### Event: `file_download`

| Property | Value |
|----------|-------|
| **Event Name** | `file_download` |
| **Type** | File Download |
| **Trigger** | Clicks on downloadable files (PDF, DOC, etc.) |
| **Source** | GA4 Built-in (Enhanced Measurement) |
| **Implemented** | ✅ True |

**Event Properties:**
- `file_extension` - File type (pdf, doc, etc.)
- `file_name` - Name of downloaded file
- `link_url` - Full URL to file

**Tracked Downloads:**
- Resume PDF (when implemented)
- Any other downloadable assets

---

## Implementation Details

### Files

1. **[js/ga4-init.js](../js/ga4-init.js)** - External GA4 initialization script
   - CSP-compliant (no inline scripts)
   - Initializes GA4 with measurement ID
   - Enables automatic page_view tracking

2. **[index.html](../index.html)** - Main page
   - Loads GA4 gtag.js library (async)
   - Loads ga4-init.js for configuration
   - Updated CSP to allow GA4 domains

3. **[portfolio.html](../portfolio.html)** - Portfolio page
   - Same GA4 setup as index.html

### Content Security Policy (CSP)

Both HTML files include these CSP directives for GA4:

```
script-src: https://www.googletagmanager.com https://www.google-analytics.com
img-src: https://www.google-analytics.com https://www.googletagmanager.com
connect-src: https://www.google-analytics.com https://analytics.google.com
```

### Resource Hints

DNS prefetch hints are added to improve GA4 loading performance:

```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

---

## Testing Analytics

### 1. Real-time Reports
View live user activity:
- **URL:** https://analytics.google.com/analytics/web/#/p480360623/realtime/overview
- Shows active users, page views, events in real-time
- Verify page_view events fire when you navigate

### 2. DebugView (Recommended)
Detailed event debugging:
- **URL:** https://analytics.google.com/analytics/web/#/a286422688w406987313p480360623/debugview/overview
- Enable debug mode: Install "Google Analytics Debugger" Chrome extension
- See all events with parameters as they fire
- Verify scroll, click, and file_download events

### 3. Browser Console
Monitor GA4 in your browser:

```javascript
// Check if GA4 is loaded
console.log('GA4 loaded:', typeof gtag === 'function');

// View dataLayer contents
console.log('dataLayer:', window.dataLayer);

// Monitor new events (run before interacting with page)
const originalPush = window.dataLayer.push;
window.dataLayer.push = function() {
    console.log('GA4 Event:', arguments);
    return originalPush.apply(this, arguments);
};
```

### 4. Manual Testing Checklist

Test these interactions and verify in DebugView:

- [ ] **Page View**
  - Load index.html → verify `page_view` event
  - Navigate to portfolio.html → verify `page_view` event

- [ ] **Scroll**
  - Scroll to bottom of page → verify `scroll` event (90% depth)

- [ ] **Outbound Clicks**
  - Click any external link (if available) → verify `click` event

- [ ] **File Downloads**
  - Click "Download Resume" button → verify `file_download` event

---

## Viewing Data in GA4 Dashboard

### Reports Location

1. **Realtime Report**
   - Shows last 30 minutes of activity
   - Path: Reports → Realtime

2. **Engagement Reports**
   - Page views and screens
   - Events (scroll, click, file_download)
   - Path: Reports → Engagement

3. **User Acquisition**
   - Traffic sources (direct, referral, organic search)
   - Path: Reports → Acquisition

### Custom Exploration

Create custom reports:
1. Go to "Explore" in left sidebar
2. Create new exploration
3. Add dimensions: Event name, Page location, Country
4. Add metrics: Event count, Users, Sessions

---

## Custom Events (Manual Implementation)

> **⚠️ IMPLEMENTATION STATUS:** Custom event tracking is **NOT YET IMPLEMENTED**. This section documents the planned custom events for future implementation. Currently, only GA4 Enhanced Measurement (automatic events) is active.
>
> **Current Testing:** The analytics test suite ([tests/analytics-basic-test.cjs](../tests/analytics-basic-test.cjs)) verifies Enhanced Measurement only. Custom event tests will be added when these features are implemented.

These events require custom JavaScript code in a dedicated analytics module.

### Event: `portfolio_interaction`

| Property | Value |
|----------|-------|
| **Event Name** | `portfolio_interaction` |
| **Type** | Click / Interaction |
| **Trigger** | User interacts with portfolio carousel or project cards |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `interaction_type` | string | Type of interaction | `'carousel_next'`, `'carousel_prev'`, `'dot_click'`, `'project_click'`, `'modal_open'` |
| `project_title` | string | Title of the portfolio project | `'Sales Performance Dashboard'`, `'Customer Segmentation Analysis'` |
| `project_category` | string | Project category/type | `'Business Intelligence'`, `'Data Visualization'`, `'Machine Learning'` |
| `slide_index` | number | Current slide position (0-based) | `0`, `1`, `2`, `3`, `4` |

**Tracked Interactions:**
- Carousel next button click ([index.html](../index.html))
- Carousel previous button click ([index.html](../index.html))
- Carousel dot navigation click ([index.html](../index.html))
- Project card click to open modal ([portfolio.html](../portfolio.html))
- Modal open event ([portfolio.html](../portfolio.html))

---

### Event: `experience_interaction`

| Property | Value |
|----------|-------|
| **Event Name** | `experience_interaction` |
| **Type** | Click |
| **Trigger** | User clicks on work experience cards in the experience section |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `company` | string | Company name | `'E-Commerce Platform'`, `'Fintech Startup'`, `'Digital Marketing Agency'` |
| `role` | string | Job title at the company | `'Senior Data Analyst'`, `'Data Analyst'`, `'Junior Data Analyst'` |
| `action` | string | Type of interaction | `'card_click'`, `'details_expand'`, `'details_collapse'` |
| `position_index` | number | Card position in the grid (0-based) | `0`, `1`, `2`, `3`, `4` |
| `years_experience` | string | Duration of employment | `'2 years'`, `'1.5 years'`, `'1 year'` |

**Tracked Interactions:**
- Company card click to reveal details ([index.html](../index.html) #experience section)
- Role details expansion
- Role details collapse (if applicable)

---

### Event: `navigation_click`

| Property | Value |
|----------|-------|
| **Event Name** | `navigation_click` |
| **Type** | Click |
| **Trigger** | User clicks navigation links in header or mobile menu |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `link_text` | string | Text of the clicked navigation link | `'About'`, `'Experience'`, `'Skills'`, `'Portfolio'`, `'Contact'` |
| `nav_type` | string | Navigation type | `'header'`, `'mobile_menu'`, `'smooth_scroll'` |
| `destination_section` | string | Target section ID | `'#about'`, `'#experience'`, `'#skills'`, `'#portfolio'`, `'#contact'` |
| `is_mobile` | boolean | Whether mobile menu was used | `true`, `false` |

**Tracked Interactions:**
- Desktop navigation bar clicks ([index.html](../index.html), [portfolio.html](../portfolio.html))
- Mobile hamburger menu clicks ([index.html](../index.html), [portfolio.html](../portfolio.html))
- Smooth scroll anchor link clicks

---

### Event: `contact_interaction`

| Property | Value |
|----------|-------|
| **Event Name** | `contact_interaction` |
| **Type** | Click |
| **Trigger** | User clicks contact buttons/links (email, LinkedIn, GitHub) |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `contact_method` | string | Type of contact method | `'email'`, `'linkedin'`, `'github'` |
| `location` | string | Where on the page the button is located | `'hero'`, `'contact_section'`, `'footer'` |
| `button_style` | string | Visual style of the button | `'primary'`, `'secondary'`, `'icon_only'` |

**Tracked Interactions:**
- Email button clicks (hero, contact section, footer)
- LinkedIn button clicks (hero, contact section, footer)
- GitHub button clicks (hero, contact section, footer)

**Note:** Actual outbound clicks are tracked by GA4's automatic outbound link tracking. This event tracks the *intent* to contact with additional context.

---

### Event: `testimonials_interaction`

| Property | Value |
|----------|-------|
| **Event Name** | `testimonials_interaction` |
| **Type** | Click / Interaction |
| **Trigger** | User interacts with testimonials carousel |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `action` | string | Type of interaction | `'next'`, `'prev'`, `'dot_click'`, `'pause_on_hover'`, `'resume_auto_rotate'` |
| `testimonial_index` | number | Current testimonial position (0-based) | `0`, `1`, `2`, `3` |
| `is_auto_rotate` | boolean | Whether auto-rotation triggered the change | `true`, `false` |
| `testimonial_author` | string | Name of testimonial author | `'Sarah Chen'`, `'Michael Rodriguez'`, etc. |

**Tracked Interactions:**
- Next button click ([index.html](../index.html) #testimonials section)
- Previous button click ([index.html](../index.html) #testimonials section)
- Dot navigation click ([index.html](../index.html) #testimonials section)
- Mouse hover pause (if user stops auto-rotation)
- Auto-rotation resume (when hover ends)

---

### Event: `cta_click`

| Property | Value |
|----------|-------|
| **Event Name** | `cta_click` |
| **Type** | Click |
| **Trigger** | User clicks call-to-action buttons |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `cta_text` | string | Button text content | `'Show All Projects'`, `'Download Resume'`, `'View Portfolio'` |
| `cta_location` | string | Section where CTA appears | `'hero'`, `'portfolio_section'`, `'contact_section'` |
| `destination` | string | Where the CTA leads | `'/portfolio.html'`, `'/assets/resume.pdf'`, `'#contact'` |
| `cta_type` | string | Type of CTA action | `'internal_link'`, `'file_download'`, `'scroll_to_section'` |

**Tracked CTAs:**
- "Show All Projects" button ([index.html](../index.html) #portfolio section)
- "Download Resume" button ([index.html](../index.html) hero section)
- "View Portfolio" button ([index.html](../index.html) hero section)
- Any other primary CTA buttons

---

### Event: `filter_interaction`

| Property | Value |
|----------|-------|
| **Event Name** | `filter_interaction` |
| **Type** | Click |
| **Trigger** | User applies filters on portfolio page |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `filter_category` | string | Filter category applied | `'all'`, `'Business Intelligence'`, `'Data Visualization'`, `'Machine Learning'`, `'Statistical Analysis'` |
| `results_count` | number | Number of projects shown after filtering | `5`, `3`, `2`, `8` |
| `previous_filter` | string | Previously active filter | `'all'`, `'Business Intelligence'`, etc. |

**Tracked Interactions:**
- Filter button clicks ([portfolio.html](../portfolio.html))
- "All" filter selection
- Category-specific filter selection

---

### Event: `back_to_top_click`

| Property | Value |
|----------|-------|
| **Event Name** | `back_to_top_click` |
| **Type** | Click |
| **Trigger** | User clicks the "Back to Top" floating button |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `scroll_position` | number | Pixel position when clicked | `2400`, `3500`, `5000` |
| `page_section` | string | Estimated section user was viewing | `'experience'`, `'portfolio'`, `'contact'`, `'footer'` |
| `scroll_percentage` | number | Percentage of page scrolled | `45`, `78`, `95` |

**Tracked Interactions:**
- Back to top button click (appears after scrolling down 300px on both pages)

---

### Event: `mobile_menu_toggle`

| Property | Value |
|----------|-------|
| **Event Name** | `mobile_menu_toggle` |
| **Type** | Click |
| **Trigger** | User opens or closes mobile hamburger menu |
| **Source** | Custom Code ([js/modules/analytics.js](../js/modules/analytics.js)) |
| **Implemented** | ⬜ False |

**Event Properties:**

| Parameter Name | Type | Description | Example Values |
|---------------|------|-------------|----------------|
| `action` | string | Whether menu was opened or closed | `'open'`, `'close'` |
| `trigger_type` | string | How the menu was toggled | `'hamburger_click'`, `'close_button'`, `'nav_link_click'`, `'outside_click'` |
| `page` | string | Which page the menu was used on | `'index'`, `'portfolio'` |

**Tracked Interactions:**
- Hamburger icon click (opens menu)
- Close button click (closes menu)
- Navigation link click (auto-closes menu)
- Outside click (auto-closes menu)

---

## Event Naming Conventions

To maintain consistency across all analytics events, follow these naming conventions:

### Event Names
- Use **snake_case**: `portfolio_interaction`, `cta_click`
- Be descriptive but concise: `contact_interaction` not `user_clicked_contact_button`
- Group related events with common prefixes when possible

### Parameter Names
- Use **snake_case**: `project_title`, `interaction_type`, `is_mobile`
- Use descriptive names: `contact_method` not `method`
- Boolean parameters should start with `is_` or `has_`: `is_auto_rotate`, `has_thumbnail`

### Parameter Values
- Use **lowercase with underscores** for categorical values: `'carousel_next'`, `'mobile_menu'`
- Use **Title Case** for user-facing content: `'Business Intelligence'`, `'Sales Performance Dashboard'`
- Be consistent across similar events

---

## Implementation Checklist

### Setup Phase
- [x] Create Google Analytics 4 account
- [x] Create GA4 property for portfolio website
- [x] Configure web data stream
- [x] Obtain Measurement ID (`G-XXXXXXXXXX`)
- [x] Enable Enhanced Measurement in GA4
- [ ] Configure custom dimensions for numeric parameters (if needed)

### Development Phase
- [x] Add GA4 tracking script to [index.html](../index.html)
- [x] Add GA4 tracking script to [portfolio.html](../portfolio.html)
- [x] Create external [js/ga4-init.js](../js/ga4-init.js) initialization file
- [ ] Create [js/modules/analytics.js](../js/modules/analytics.js) module *(not needed for Enhanced Measurement only)*
- [ ] Implement `portfolio_interaction` event tracking *(not implemented - future enhancement)*
- [ ] Implement `experience_interaction` event tracking *(not implemented - future enhancement)*
- [ ] Implement `navigation_click` event tracking *(not implemented - future enhancement)*
- [ ] Implement `contact_interaction` event tracking *(not implemented - future enhancement)*
- [ ] Implement `testimonials_interaction` event tracking *(not implemented - future enhancement)*
- [ ] Implement `cta_click` event tracking *(not implemented - future enhancement)*
- [ ] Implement `filter_interaction` event tracking *(not implemented - future enhancement)*
- [ ] Implement `back_to_top_click` event tracking *(not implemented - future enhancement)*
- [ ] Implement `mobile_menu_toggle` event tracking *(not implemented - future enhancement)*
- [ ] Initialize analytics module in [main-index.js](../js/main-index.js) *(not needed - using only built-in tracking)*
- [ ] Initialize analytics module in [main-portfolio.js](../js/main-portfolio.js) *(not needed - using only built-in tracking)*

### Testing Phase
- [ ] Test all events fire correctly in GA4 DebugView
- [ ] Verify event parameters are captured correctly
- [ ] Test on mobile devices (especially mobile menu tracking)
- [ ] Test Enhanced Measurement events (scroll, outbound clicks, downloads)
- [ ] Verify no console errors in browser
- [ ] Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)

### Documentation Phase
- [ ] Update [CLAUDE.md](../CLAUDE.md) to mark analytics as completed
- [ ] Update [README.md](../README.md) with analytics feature description
- [ ] Update [js/README.md](../js/README.md) with analytics module documentation
- [ ] Create user guide for viewing analytics reports (if needed)

### Deployment Phase
- [ ] Commit analytics implementation
- [ ] Push to production
- [ ] Verify events are appearing in GA4 real-time reports
- [ ] Set up custom reports/dashboards in GA4 (optional)
- [ ] Configure conversion events (optional: `cta_click` for "Download Resume")

---

## Usage & Analysis

### Key Metrics to Monitor

**Engagement Metrics:**
- Which portfolio projects get the most interactions?
- Do visitors prefer LinkedIn or email for contact?
- Which experience cards are most engaging?
- How far do users scroll before leaving?

**Navigation Patterns:**
- Most clicked navigation sections
- Mobile vs desktop menu usage
- Smooth scroll vs direct access patterns

**Conversion Tracking:**
- CTA click-through rates
- Contact method preferences
- Portfolio page visit rate from index.html

### Creating Custom Reports in GA4

1. **Portfolio Project Performance:**
   - Event: `portfolio_interaction`
   - Group by: `project_title`
   - Metrics: Event count, unique users

2. **Contact Method Preferences:**
   - Event: `contact_interaction`
   - Group by: `contact_method`
   - Secondary dimension: `location`

3. **Navigation Heatmap:**
   - Event: `navigation_click`
   - Group by: `link_text`
   - Secondary dimension: `nav_type`

4. **User Journey Flow:**
   - Sequential events: `page_view` → `experience_interaction` → `portfolio_interaction` → `contact_interaction`

---

## Troubleshooting

### Analytics Not Loading

**Check browser console for errors:**
```javascript
// Should return true
typeof gtag === 'function'

// Should show config event
window.dataLayer.some(item => item['0'] === 'config')
```

**Common Issues:**
1. **CSP blocking scripts** - Check browser console for CSP violations
2. **Ad blocker enabled** - GA4 may be blocked by ad blockers
3. **Script loading failed** - Check network tab for failed requests

### Events Not Showing in GA4

1. **Wait 24-48 hours** - Standard reports may have delay
2. **Use Realtime/DebugView** - See events immediately
3. **Check Enhanced Measurement** - Verify it's enabled in GA4 Admin
4. **Clear browser cache** - Old cached scripts may not track

### Verification Steps

Run this in browser console:
```javascript
// 1. Check gtag exists
console.log('gtag:', typeof gtag);

// 2. Check dataLayer has config
console.log('GA4 configured:', window.dataLayer?.some(i => i['1'] === 'G-XBG7HNQ9YG'));

// 3. Monitor for 30 seconds
let eventCount = 0;
const original = window.dataLayer.push;
window.dataLayer.push = function() {
    eventCount++;
    console.log(`Event ${eventCount}:`, arguments[0]);
    return original.apply(this, arguments);
};
console.log('Monitoring events for 30 seconds...');
setTimeout(() => {
    console.log(`Total events captured: ${eventCount}`);
    window.dataLayer.push = original;
}, 30000);
```

### Future Custom Event Enhancements

Potential custom tracking to add later (not currently implemented):
- Portfolio carousel interactions (slide changes)
- Filter button clicks on portfolio page
- Work experience card expansions
- Testimonials carousel interactions
- Mobile menu toggle
- Contact button clicks
- Back-to-top button usage

**Note:** Custom events would require implementing a custom analytics module. Current implementation uses only GA4 built-in features to avoid complexity and potential tracking issues.

---

## Resources

- **GA4 Dashboard:** https://analytics.google.com/analytics/web/#/p480360623/
- **GA4 Enhanced Measurement:** https://support.google.com/analytics/answer/9216061
- **GA4 Events Reference:** https://support.google.com/analytics/answer/9322688
- **Measurement Protocol (API):** https://developers.google.com/analytics/devguides/collection/protocol/ga4

---

## Privacy & Compliance

**Data Collection Notice:**
- All analytics are anonymized by GA4
- No personally identifiable information (PII) is collected
- IP addresses are anonymized by Google
- No custom user identifiers are sent

**GDPR Considerations:**
- Consider adding cookie consent banner for EU visitors
- Provide opt-out mechanism if required
- Update privacy policy to mention GA4 usage

**Data Retention:**
- GA4 default: 14 months (can be configured in GA4 settings)
- Recommend reviewing data retention settings based on your needs

---

## Troubleshooting

### Events Not Appearing in GA4

1. **Check DebugView:**
   - GA4 → Configure → DebugView
   - Events should appear in real-time

2. **Verify Measurement ID:**
   - Ensure correct `G-XXXXXXXXXX` in tracking script
   - Check browser console for errors

3. **Check Event Parameters:**
   - Max 25 parameters per event
   - Parameter names must be < 40 characters
   - Parameter values must be < 100 characters

### Performance Issues

- Analytics should add < 50KB to page weight
- GA4 script loads asynchronously (non-blocking)
- Custom events are queued and sent in batches
- No impact on Core Web Vitals expected

---

**Document Version:** 1.0
**Last Updated:** 2025-12-26
**Maintained By:** Rafi Atha
**Contact:** rafiatha.g@gmail.com
