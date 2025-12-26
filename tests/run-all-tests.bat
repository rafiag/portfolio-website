@echo off
echo.
echo ========================================
echo Portfolio Website - Complete Test Suite
echo ========================================
@REM echo.
@REM echo Make sure dev server is running on http://localhost:8000
@REM echo Press Ctrl+C to cancel or
@REM pause
@REM echo.

REM Store current directory
set "PROJECT_ROOT=%~dp0.."
cd /d "%PROJECT_ROOT%"

echo [1/12] Portfolio Data Validation (No Playwright)
echo ========================================
node tests\portfolio-validation.js
if errorlevel 1 (
    echo ERROR: Portfolio validation tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [2/12] Security Tests (Static Analysis - No Playwright)
echo ========================================
node tests\security.js
if errorlevel 1 (
    echo ERROR: Security tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [3/12] Browser Compatibility Tests
echo ========================================
node tests\browser-compatibility.cjs
if errorlevel 1 (
    echo ERROR: Browser compatibility tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [4/12] Responsive Testing
echo ========================================
node tests\responsive.cjs
if errorlevel 1 (
    echo ERROR: Responsive tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [5/12] Interactive Features (inc. Back-to-Top Button)
echo ========================================
node tests\interactive-features.cjs
if errorlevel 1 (
    echo ERROR: Interactive features tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [6/12] Accessibility (WCAG 2.1)
echo ========================================
node tests\accessibility.cjs
if errorlevel 1 (
    echo ERROR: Accessibility tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [7/12] Performance Tests (inc. Font Loading)
echo ========================================
node tests\performance.cjs
if errorlevel 1 (
    echo ERROR: Performance tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [8/12] Content ^& Links
echo ========================================
node tests\content-links.cjs
if errorlevel 1 (
    echo ERROR: Content & links tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [9/12] Cross-Browser JavaScript
echo ========================================
node tests\cross-browser-javascript.cjs
if errorlevel 1 (
    echo ERROR: Cross-browser JavaScript tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [10/12] SEO ^& Meta Tags (inc. Resource Hints)
echo ========================================
node tests\seo-meta.cjs
if errorlevel 1 (
    echo ERROR: SEO & meta tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [11/12] Error Handling ^& Memory Leak Prevention
echo ========================================
node tests\error-handling.cjs
if errorlevel 1 (
    echo ERROR: Error handling tests failed!
    pause
    exit /b 1
)
echo.
pause

echo [12/12] Analytics Tests (Google Analytics 4)
echo ========================================
node tests\analytics-basic-test.cjs
if errorlevel 1 (
    echo ERROR: Analytics tests failed!
    pause
    exit /b 1
)
echo.

echo.
echo ========================================
echo All tests complete!
echo ========================================
echo Total: 270+ tests across 12 categories
echo.
echo Test categories:
echo 1. Portfolio Data Validation (37 tests)
echo 2. Security (6 tests)
echo 3. Browser Compatibility (24 tests)
echo 4. Responsive Design (56 tests)
echo 5. Interactive Features (21 tests)
echo 6. Accessibility - WCAG 2.1 (13 tests)
echo 7. Performance (11 tests)
echo 8. Content ^& Links (13 tests)
echo 9. Cross-Browser JavaScript (27 tests)
echo 10. SEO ^& Meta Tags (33 tests)
echo 11. Error Handling ^& Memory (14 tests)
echo 12. Analytics - GA4 (5 tests)
echo.
echo Recent updates include:
echo - Google Analytics 4 integration (5 tests)
echo - Font Loading performance (3 tests)
echo - Resource Hints validation (3 tests)
echo - Back-to-Top Button (6 tests)
echo - Memory Leak Prevention (5 tests)
echo - Portfolio Data Validation (37 tests)
echo.
echo Check the test reports in the tests/result-docs/ folder
echo.
pause
