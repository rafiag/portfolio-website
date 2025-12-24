/**
 * Font Loader Module
 * Handles async font loading without inline event handlers (CSP compliant)
 */

/**
 * Load Google Fonts asynchronously
 */
export function initFontLoader() {
    const fontLink = document.getElementById('google-fonts');
    if (fontLink && fontLink.media === 'print') {
        // Change media to 'all' to activate the stylesheet
        fontLink.media = 'all';
    }
}
