/**
 * Browser Compatibility Check
 * Detects outdated browsers and shows upgrade notice
 * Runs before ES6 modules to ensure compatibility message is shown
 */

(function() {
    'use strict';

    // Detect IE11 and older
    var isIE = navigator.userAgent.indexOf('MSIE') !== -1 ||
               navigator.userAgent.indexOf('Trident/') !== -1;

    // Detect very old browsers that don't support ES6 modules
    var supportsModules = 'noModule' in HTMLScriptElement.prototype;

    if (isIE || !supportsModules) {
        // Create and show upgrade notice
        var upgradeNotice = document.createElement('div');
        upgradeNotice.id = 'browser-upgrade-notice';
        upgradeNotice.innerHTML =
            '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #2b2d31; color: #f8f9fa; z-index: 999999; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif;">' +
                '<div style="max-width: 600px; padding: 40px; text-align: center;">' +
                    '<svg style="width: 80px; height: 80px; margin-bottom: 20px;" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2">' +
                        '<circle cx="12" cy="12" r="10"></circle>' +
                        '<line x1="12" y1="8" x2="12" y2="12"></line>' +
                        '<line x1="12" y1="16" x2="12.01" y2="16"></line>' +
                    '</svg>' +
                    '<h1 style="font-size: 32px; margin: 0 0 16px 0; font-weight: 700;">Browser Not Supported</h1>' +
                    '<p style="font-size: 18px; line-height: 1.6; margin: 0 0 24px 0; color: #b4b8bd;">This portfolio requires a modern web browser to display correctly.</p>' +
                    '<p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; color: #b4b8bd;">Please upgrade to one of the following browsers:</p>' +
                    '<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 32px;">' +
                        '<a href="https://www.google.com/chrome/" style="display: inline-block; padding: 12px 24px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background 0.3s;" onmouseover="this.style.background=\'#ee5a52\'" onmouseout="this.style.background=\'#ff6b6b\'">Chrome</a>' +
                        '<a href="https://www.mozilla.org/firefox/" style="display: inline-block; padding: 12px 24px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background 0.3s;" onmouseover="this.style.background=\'#ee5a52\'" onmouseout="this.style.background=\'#ff6b6b\'">Firefox</a>' +
                        '<a href="https://www.microsoft.com/edge" style="display: inline-block; padding: 12px 24px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background 0.3s;" onmouseover="this.style.background=\'#ee5a52\'" onmouseout="this.style.background=\'#ff6b6b\'">Edge</a>' +
                        '<a href="https://www.apple.com/safari/" style="display: inline-block; padding: 12px 24px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background 0.3s;" onmouseover="this.style.background=\'#ee5a52\'" onmouseout="this.style.background=\'#ff6b6b\'">Safari</a>' +
                    '</div>' +
                    '<p style="font-size: 14px; color: #b4b8bd; margin: 0;">Minimum requirements: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+</p>' +
                '</div>' +
            '</div>';

        // Insert at the very start of body
        if (document.body) {
            document.body.insertBefore(upgradeNotice, document.body.firstChild);
        } else {
            // If body doesn't exist yet, wait for DOM
            document.addEventListener('DOMContentLoaded', function() {
                document.body.insertBefore(upgradeNotice, document.body.firstChild);
            });
        }

        // Prevent page scripts from running
        console.warn('Portfolio requires a modern browser. Current browser is not supported.');
    }
})();
