/**
 * Google Analytics 4 Initialization
 * Measurement ID: G-XBG7HNQ9YG
 *
 * This file initializes GA4 tracking with Enhanced Measurement enabled.
 * Automatically tracks:
 * - Page views
 * - Scrolls (90% depth)
 * - Outbound clicks
 * - File downloads
 *
 * No custom event tracking - uses only GA4 built-in features.
 */

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XBG7HNQ9YG', {
    'send_page_view': true
});
