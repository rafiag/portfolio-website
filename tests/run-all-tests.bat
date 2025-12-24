@echo off
echo.
echo ========================================
echo Portfolio Website - Complete Test Suite
echo ========================================
echo.
echo Make sure dev server is running on http://localhost:8000
echo Press Ctrl+C to cancel or
pause
echo.

cd C:\Users\USER\.claude\plugins\cache\playwright-skill\playwright-skill\4.1.0\skills\playwright-skill

echo [1/10] Browser Compatibility Tests
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\browser-compatibility.js"
echo.
pause

echo [2/10] Responsive Testing
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\responsive.js"
echo.
pause

echo [3/10] Interactive Features
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\interactive-features.js"
echo.
pause

echo [4/10] Accessibility (WCAG 2.1)
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\accessibility.js"
echo.
pause

echo [5/10] Performance Tests
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\performance.js"
echo.
pause

echo [6/10] Content & Links
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\content-links.js"
echo.
pause

echo [7/10] Cross-Browser JavaScript
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\cross-browser-javascript.js"
echo.
pause

echo [8/10] SEO & Meta Tags
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\seo-meta.js"
echo.
pause

echo [9/10] Error Handling
echo ========================================
node run.js "d:\Project\Portfolio Website\tests\error-handling.js"
echo.
pause

echo [10/10] Security Tests (Static Analysis - No Playwright)
echo ========================================
cd "d:\Project\Portfolio Website"
node tests\security.js
echo.

echo.
echo ========================================
echo All tests complete!
echo ========================================
echo.
echo Check the test report at:
echo d:\Project\Portfolio Website\TEST-REPORT-2025-12-24.md
echo.
pause
