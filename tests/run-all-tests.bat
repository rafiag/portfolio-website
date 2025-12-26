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

echo [1/11] Browser Compatibility Tests
echo ========================================
node run.js "%~dp0browser-compatibility.js"
echo.
pause

echo [2/11] Responsive Testing
echo ========================================
node run.js "%~dp0responsive.js"
echo.
pause

echo [3/11] Interactive Features (inc. Back-to-Top Button)
echo ========================================
node run.js "%~dp0interactive-features.js"
echo.
pause

echo [4/11] Accessibility (WCAG 2.1)
echo ========================================
node run.js "%~dp0accessibility.js"
echo.
pause

echo [5/11] Performance Tests (inc. Font Loading)
echo ========================================
node run.js "%~dp0performance.js"
echo.
pause

echo [6/11] Content & Links
echo ========================================
node run.js "%~dp0content-links.js"
echo.
pause

echo [7/11] Cross-Browser JavaScript
echo ========================================
node run.js "%~dp0cross-browser-javascript.js"
echo.
pause

echo [8/11] SEO & Meta Tags (inc. Resource Hints)
echo ========================================
node run.js "%~dp0seo-meta.js"
echo.
pause

echo [9/11] Error Handling & Memory Leak Prevention
echo ========================================
node run.js "%~dp0error-handling.js"
echo.
pause

echo [10/11] Security Tests (Static Analysis - No Playwright)
echo ========================================
cd /d "%~dp0.."
node tests\security.js
echo.
pause

echo [11/11] Analytics Tests (Google Analytics 4)
echo ========================================
node tests\analytics-basic-test.cjs
echo.

echo.
echo ========================================
echo All tests complete!
echo ========================================
echo Total: 270+ tests across 11 categories
echo.
echo Recent updates include:
echo - Google Analytics 4 integration (5 tests)
echo - Font Loading performance (3 tests)
echo - Resource Hints validation (3 tests)
echo - Back-to-Top Button (6 tests)
echo - Memory Leak Prevention (5 tests)
echo.
echo Check the test reports in the docs/ folder
echo (TEST-REPORT-2025-12-24.md and TEST-SUMMARY-UPDATED.md)
echo.
pause
