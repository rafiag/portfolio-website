// Error Handling Testing Suite
// Tests image load failures, JavaScript errors, graceful degradation, 404 page, broken link handling

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 ERROR HANDLING TEST SUITE');
  console.log('Testing error handling and graceful degradation\n');

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  // Capture console errors and warnings
  const consoleMessages = {
    errors: [],
    warnings: [],
    logs: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.errors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleMessages.warnings.push(msg.text());
    } else if (msg.type() === 'log') {
      consoleMessages.logs.push(msg.text());
    }
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  // Capture failed requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      method: request.method(),
      failure: request.failure()?.errorText || 'Unknown error'
    });
  });

  try {
    // ========================================
    // IMAGE LOAD FAILURE TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('Testing Image Load Failures');
    console.log('='.repeat(60));

    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2000); // Let images try to load

    // Test 1: Broken Image Handling
    console.log('\n🖼️  Testing broken image handling...');
    const imageLoadResults = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const results = {
        total: images.length,
        loaded: 0,
        failed: 0,
        hasFallback: 0,
        brokenImages: []
      };

      images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
          results.loaded++;
        } else {
          results.failed++;
          results.brokenImages.push({
            src: img.src,
            alt: img.alt,
            hasOnerror: img.onerror !== null,
            className: img.className
          });

          // Check if image has fallback handling
          if (img.onerror || img.classList.contains('fallback-img') || img.style.display === 'none') {
            results.hasFallback++;
          }
        }
      });

      return results;
    });

    console.log(`  Total images: ${imageLoadResults.total}`);
    console.log(`  Loaded successfully: ${imageLoadResults.loaded}`);
    console.log(`  Failed to load: ${imageLoadResults.failed}`);
    console.log(`  With fallback handling: ${imageLoadResults.hasFallback}`);

    if (imageLoadResults.failed > 0) {
      console.log(`\n  Broken images details:`);
      imageLoadResults.brokenImages.forEach((img, i) => {
        const fallbackStatus = img.hasOnerror ? '✅ Has onerror handler' : '❌ No fallback';
        console.log(`    ${i + 1}. ${img.src.substring(img.src.lastIndexOf('/') + 1)}`);
        console.log(`       Alt: "${img.alt}"`);
        console.log(`       ${fallbackStatus}`);
      });

      if (imageLoadResults.hasFallback === imageLoadResults.failed) {
        console.log(`  ✅ All broken images have fallback handling`);
        passed++;
      } else {
        console.log(`  ❌ ${imageLoadResults.failed - imageLoadResults.hasFallback} broken images lack fallback handling`);
        failed++;
      }
    } else {
      console.log(`  ✅ All images loaded successfully`);
      passed++;
    }

    // ========================================
    // JAVASCRIPT ERROR LOGGING
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing JavaScript Error Logging');
    console.log('='.repeat(60));

    // Test 2: Console Errors
    console.log('\n🚨 Checking console errors...');
    if (consoleMessages.errors.length === 0) {
      console.log(`  ✅ No console errors detected`);
      passed++;
    } else {
      console.log(`  ❌ ${consoleMessages.errors.length} console error(s) found:`);
      consoleMessages.errors.forEach((err, i) => {
        console.log(`    ${i + 1}. ${err.substring(0, 100)}`);
      });
      failed++;
    }

    // Test 3: Page Errors (Uncaught Exceptions)
    console.log('\n💥 Checking uncaught JavaScript exceptions...');
    if (pageErrors.length === 0) {
      console.log(`  ✅ No uncaught exceptions detected`);
      passed++;
    } else {
      console.log(`  ❌ ${pageErrors.length} uncaught exception(s) found:`);
      pageErrors.forEach((err, i) => {
        console.log(`    ${i + 1}. ${err.message}`);
        if (err.stack) {
          console.log(`       ${err.stack.substring(0, 150)}...`);
        }
      });
      failed++;
    }

    // Test 4: Failed Network Requests
    console.log('\n🌐 Checking failed network requests...');
    if (failedRequests.length === 0) {
      console.log(`  ✅ No failed network requests`);
      passed++;
    } else {
      console.log(`  ⚠️  ${failedRequests.length} failed request(s):`);
      failedRequests.forEach((req, i) => {
        console.log(`    ${i + 1}. ${req.method} ${req.url}`);
        console.log(`       Error: ${req.failure}`);
      });
      warnings++;
    }

    // ========================================
    // GRACEFUL DEGRADATION TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing Graceful Degradation');
    console.log('='.repeat(60));

    // Test 5: JavaScript Disabled Fallback
    console.log('\n🔌 Testing with JavaScript disabled...');
    const contextNoJS = await browser.newContext({
      javaScriptEnabled: false
    });
    const pageNoJS = await contextNoJS.newPage();

    try {
      await pageNoJS.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });

      const contentVisible = await pageNoJS.evaluate(() => {
        const body = document.body;
        const hasContent = body.textContent.trim().length > 100;
        const hasNoscript = document.querySelectorAll('noscript').length > 0;

        return {
          hasContent,
          hasNoscript,
          bodyVisible: window.getComputedStyle(body).display !== 'none'
        };
      });

      if (contentVisible.hasContent && contentVisible.bodyVisible) {
        console.log(`  ✅ Site remains accessible without JavaScript`);
        console.log(`     Content visible: ${contentVisible.hasContent}`);
        console.log(`     Has <noscript> tags: ${contentVisible.hasNoscript}`);
        passed++;
      } else {
        console.log(`  ⚠️  Site may not be fully accessible without JavaScript`);
        console.log(`     Content visible: ${contentVisible.hasContent}`);
        console.log(`     Has <noscript> tags: ${contentVisible.hasNoscript}`);
        warnings++;
      }
    } catch (e) {
      console.log(`  ⚠️  Could not test without JavaScript: ${e.message}`);
      warnings++;
    } finally {
      await contextNoJS.close();
    }

    // Test 6: Missing CSS Handling
    console.log('\n🎨 Testing without CSS...');
    const contextNoCSS = await browser.newContext();
    const pageNoCSS = await contextNoCSS.newPage();

    // Block CSS requests
    await pageNoCSS.route('**/*.css', route => route.abort());

    try {
      await pageNoCSS.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await pageNoCSS.waitForTimeout(1000);

      const contentStructure = await pageNoCSS.evaluate(() => {
        return {
          hasNav: document.querySelectorAll('nav').length > 0,
          hasMain: document.querySelectorAll('main, [role="main"]').length > 0,
          hasFooter: document.querySelectorAll('footer').length > 0,
          hasHeadings: document.querySelectorAll('h1, h2, h3').length > 0,
          textContent: document.body.textContent.trim().length
        };
      });

      if (contentStructure.hasNav && contentStructure.hasHeadings && contentStructure.textContent > 500) {
        console.log(`  ✅ Content structure remains intact without CSS`);
        console.log(`     Semantic HTML provides fallback structure`);
        passed++;
      } else {
        console.log(`  ⚠️  Content may be harder to navigate without CSS`);
        warnings++;
      }
    } catch (e) {
      console.log(`  ⚠️  Could not test without CSS: ${e.message}`);
      warnings++;
    } finally {
      await contextNoCSS.close();
    }

    // ========================================
    // 404 ERROR PAGE TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing 404 Error Page');
    console.log('='.repeat(60));

    // Test 7: 404 Page Existence
    console.log('\n🔍 Testing 404 error page...');
    try {
      const response404 = await page.goto(`${TARGET_URL}/this-page-does-not-exist-12345.html`, {
        waitUntil: 'domcontentloaded',
        timeout: 5000
      });

      if (response404) {
        const status = response404.status();
        console.log(`  HTTP Status: ${status}`);

        if (status === 404) {
          // Check if there's a custom 404 page
          const pageContent = await page.content();
          const has404Content = pageContent.toLowerCase().includes('404') ||
                               pageContent.toLowerCase().includes('not found') ||
                               pageContent.toLowerCase().includes('page not found');

          if (has404Content) {
            console.log(`  ✅ Custom 404 page exists`);
            passed++;
          } else {
            console.log(`  ⚠️  404 status returned but no custom error page`);
            warnings++;
          }
        } else if (status === 200) {
          console.log(`  ⚠️  Non-existent page returns 200 (should be 404)`);
          warnings++;
        }
      }
    } catch (e) {
      console.log(`  ⚠️  Could not test 404 page: ${e.message}`);
      warnings++;
    }

    // ========================================
    // ERROR BOUNDARY TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing Error Recovery');
    console.log('='.repeat(60));

    // Test 8: Try/Catch in Critical Functions
    console.log('\n🛡️  Testing error recovery mechanisms...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

    const hasErrorHandling = await page.evaluate(() => {
      const results = {
        hasWindowErrorHandler: typeof window.onerror === 'function',
        hasUnhandledRejectionHandler: typeof window.onunhandledrejection === 'function',
        hasErrorEventListener: false
      };

      // Check if there are error event listeners
      const listeners = window.getEventListeners ? window.getEventListeners(window) : {};
      results.hasErrorEventListener = listeners.error && listeners.error.length > 0;

      return results;
    });

    console.log(`  Global error handler: ${hasErrorHandling.hasWindowErrorHandler ? '✅' : '⚠️'}`);
    console.log(`  Unhandled rejection handler: ${hasErrorHandling.hasUnhandledRejectionHandler ? '✅' : '⚠️'}`);

    if (hasErrorHandling.hasWindowErrorHandler || hasErrorHandling.hasUnhandledRejectionHandler) {
      console.log(`  ✅ Global error handling implemented`);
      passed++;
    } else {
      console.log(`  ⚠️  No global error handling detected`);
      warnings++;
    }

    // Test 9: Portfolio Page Error Handling
    console.log('\n📄 Testing portfolio.html error handling...');
    const portfolioErrors = [];
    const portfolioPage = await context.newPage();

    portfolioPage.on('pageerror', error => {
      portfolioErrors.push(error.message);
    });

    await portfolioPage.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await portfolioPage.waitForTimeout(2000);

    if (portfolioErrors.length === 0) {
      console.log(`  ✅ No errors on portfolio page`);
      passed++;
    } else {
      console.log(`  ❌ ${portfolioErrors.length} error(s) on portfolio page`);
      portfolioErrors.forEach((err, i) => {
        console.log(`    ${i + 1}. ${err}`);
      });
      failed++;
    }

    await portfolioPage.close();

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 ERROR HANDLING TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    const total = passed + failed;
    if (total > 0) {
      console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    }
    console.log('='.repeat(60));

    console.log('\n💡 Error Handling Recommendations:');
    console.log('  - Add onerror handlers to all images for fallback display');
    console.log('  - Implement global window.onerror for logging');
    console.log('  - Add window.onunhandledrejection for Promise errors');
    console.log('  - Create a custom styled 404.html page');
    console.log('  - Ensure site remains usable without JavaScript');
    console.log('  - Add try/catch blocks around critical functionality');
    console.log('  - Consider error reporting service (Sentry, etc.)');

    console.log('\n✅ Error handling testing complete!');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
