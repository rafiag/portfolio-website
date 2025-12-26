// Cross-Browser JavaScript Testing Suite
// Tests JavaScript compatibility, polyfills, Array methods, classList, touch events

const { chromium, firefox, webkit } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

async function testBrowserJavaScript(browserType, browserName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing ${browserName} - JavaScript Compatibility`);
  console.log('='.repeat(60));

  const browser = await browserType.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    browser: browserName,
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
  };

  // Capture console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2000); // Let all scripts execute

    // Test 1: Intersection Observer API (with polyfill check)
    console.log(`\n👁️  Testing Intersection Observer API...`);
    const ioTest = await page.evaluate(() => {
      return {
        supported: 'IntersectionObserver' in window,
        working: typeof IntersectionObserver === 'function'
      };
    });
    if (ioTest.supported && ioTest.working) {
      console.log(`  ✅ Intersection Observer is supported and working`);
      results.passed++;
      results.tests.push({ test: 'Intersection Observer', status: 'PASS' });
    } else {
      console.log(`  ❌ Intersection Observer not supported (polyfill needed)`);
      results.failed++;
      results.tests.push({ test: 'Intersection Observer', status: 'FAIL' });
    }

    // Test 2: Touch Events Support
    console.log(`\n👆 Testing touch events support...`);
    const touchTest = await page.evaluate(() => {
      return {
        ontouchstart: 'ontouchstart' in window,
        touchPoints: navigator.maxTouchPoints > 0,
        pointerEvents: 'PointerEvent' in window
      };
    });
    if (touchTest.ontouchstart || touchTest.touchPoints || touchTest.pointerEvents) {
      console.log(`  ✅ Touch/Pointer events supported`);
      console.log(`     ontouchstart: ${touchTest.ontouchstart}`);
      console.log(`     maxTouchPoints: ${touchTest.touchPoints}`);
      console.log(`     PointerEvent: ${touchTest.pointerEvents}`);
      results.passed++;
      results.tests.push({ test: 'Touch events', status: 'PASS' });
    } else {
      console.log(`  ⚠️  Limited touch event support`);
      results.warnings++;
      results.tests.push({ test: 'Touch events', status: 'WARN' });
    }

    // Test 3: classList Methods
    console.log(`\n📝 Testing classList methods...`);
    const classListTest = await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'test-class';

      const results = {
        add: typeof div.classList.add === 'function',
        remove: typeof div.classList.remove === 'function',
        toggle: typeof div.classList.toggle === 'function',
        contains: typeof div.classList.contains === 'function'
      };

      // Test functionality
      div.classList.add('new-class');
      results.addWorks = div.classList.contains('new-class');

      div.classList.remove('test-class');
      results.removeWorks = !div.classList.contains('test-class');

      div.classList.toggle('toggle-class');
      results.toggleWorks = div.classList.contains('toggle-class');

      return results;
    });

    const allClassListWorks = Object.values(classListTest).every(v => v === true);
    if (allClassListWorks) {
      console.log(`  ✅ classList methods fully supported and working`);
      results.passed++;
      results.tests.push({ test: 'classList methods', status: 'PASS' });
    } else {
      console.log(`  ❌ classList methods not fully supported`);
      console.log(`     ${JSON.stringify(classListTest, null, 2)}`);
      results.failed++;
      results.tests.push({ test: 'classList methods', status: 'FAIL' });
    }

    // Test 4: Array Methods (forEach, filter, map, find, some, every)
    console.log(`\n🔢 Testing Array methods...`);
    const arrayTest = await page.evaluate(() => {
      const testArray = [1, 2, 3, 4, 5];
      const results = {};

      // forEach
      try {
        let sum = 0;
        testArray.forEach(n => sum += n);
        results.forEach = sum === 15;
      } catch (e) {
        results.forEach = false;
      }

      // filter
      try {
        const filtered = testArray.filter(n => n > 3);
        results.filter = filtered.length === 2;
      } catch (e) {
        results.filter = false;
      }

      // map
      try {
        const mapped = testArray.map(n => n * 2);
        results.map = mapped[0] === 2;
      } catch (e) {
        results.map = false;
      }

      // find
      try {
        const found = testArray.find(n => n === 3);
        results.find = found === 3;
      } catch (e) {
        results.find = false;
      }

      // some
      try {
        results.some = testArray.some(n => n > 4);
      } catch (e) {
        results.some = false;
      }

      // every
      try {
        results.every = testArray.every(n => n > 0);
      } catch (e) {
        results.every = false;
      }

      return results;
    });

    const allArrayMethodsWork = Object.values(arrayTest).every(v => v === true);
    if (allArrayMethodsWork) {
      console.log(`  ✅ All Array methods supported`);
      console.log(`     forEach, filter, map, find, some, every: ✅`);
      results.passed++;
      results.tests.push({ test: 'Array methods', status: 'PASS' });
    } else {
      console.log(`  ❌ Some Array methods not supported`);
      Object.entries(arrayTest).forEach(([method, works]) => {
        console.log(`     ${method}: ${works ? '✅' : '❌'}`);
      });
      results.failed++;
      results.tests.push({ test: 'Array methods', status: 'FAIL' });
    }

    // Test 5: Console Errors
    console.log(`\n🚨 Checking for console errors...`);
    if (consoleErrors.length === 0) {
      console.log(`  ✅ No console errors detected`);
      results.passed++;
      results.tests.push({ test: 'No console errors', status: 'PASS' });
    } else {
      console.log(`  ❌ ${consoleErrors.length} console error(s) found:`);
      consoleErrors.forEach((err, i) => {
        console.log(`     ${i + 1}. ${err}`);
      });
      results.failed++;
      results.tests.push({ test: 'No console errors', status: 'FAIL', errors: consoleErrors });
    }

    // Test 6: Page Errors (JavaScript exceptions)
    console.log(`\n💥 Checking for JavaScript exceptions...`);
    if (pageErrors.length === 0) {
      console.log(`  ✅ No JavaScript exceptions detected`);
      results.passed++;
      results.tests.push({ test: 'No JS exceptions', status: 'PASS' });
    } else {
      console.log(`  ❌ ${pageErrors.length} JavaScript exception(s) found:`);
      pageErrors.forEach((err, i) => {
        console.log(`     ${i + 1}. ${err}`);
      });
      results.failed++;
      results.tests.push({ test: 'No JS exceptions', status: 'FAIL', errors: pageErrors });
    }

    // Test 7: ES6 Features (Arrow functions, Template literals, const/let)
    console.log(`\n⚡ Testing ES6 features...`);
    const es6Test = await page.evaluate(() => {
      const results = {};

      // Arrow functions
      try {
        const arrowFunc = () => true;
        results.arrowFunctions = arrowFunc();
      } catch (e) {
        results.arrowFunctions = false;
      }

      // Template literals
      try {
        const name = 'test';
        const template = `Hello ${name}`;
        results.templateLiterals = template === 'Hello test';
      } catch (e) {
        results.templateLiterals = false;
      }

      // const/let
      try {
        let letVar = 1;
        const constVar = 2;
        results.constLet = letVar === 1 && constVar === 2;
      } catch (e) {
        results.constLet = false;
      }

      // Promises
      try {
        results.promises = typeof Promise !== 'undefined' && typeof Promise.resolve === 'function';
      } catch (e) {
        results.promises = false;
      }

      return results;
    });

    const allES6Works = Object.values(es6Test).every(v => v === true);
    if (allES6Works) {
      console.log(`  ✅ ES6 features fully supported`);
      results.passed++;
      results.tests.push({ test: 'ES6 features', status: 'PASS' });
    } else {
      console.log(`  ⚠️  Some ES6 features not supported`);
      Object.entries(es6Test).forEach(([feature, works]) => {
        console.log(`     ${feature}: ${works ? '✅' : '❌'}`);
      });
      results.warnings++;
      results.tests.push({ test: 'ES6 features', status: 'WARN' });
    }

    // Test 8: Fetch API
    console.log(`\n🌐 Testing Fetch API...`);
    const fetchTest = await page.evaluate(() => {
      return {
        supported: typeof fetch === 'function',
        hasAbortController: typeof AbortController !== 'undefined'
      };
    });
    if (fetchTest.supported) {
      console.log(`  ✅ Fetch API supported`);
      console.log(`     AbortController: ${fetchTest.hasAbortController ? '✅' : '❌'}`);
      results.passed++;
      results.tests.push({ test: 'Fetch API', status: 'PASS' });
    } else {
      console.log(`  ❌ Fetch API not supported`);
      results.failed++;
      results.tests.push({ test: 'Fetch API', status: 'FAIL' });
    }

    // Test portfolio.html as well
    console.log(`\n📄 Testing portfolio.html JavaScript...`);
    await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2000);

    const portfolioErrors = [];
    page.on('pageerror', error => {
      portfolioErrors.push(error.message);
    });

    await page.waitForTimeout(1000);

    if (portfolioErrors.length === 0) {
      console.log(`  ✅ portfolio.html - No JavaScript errors`);
      results.passed++;
      results.tests.push({ test: 'portfolio.html JS', status: 'PASS' });
    } else {
      console.log(`  ❌ portfolio.html - ${portfolioErrors.length} error(s)`);
      results.failed++;
      results.tests.push({ test: 'portfolio.html JS', status: 'FAIL' });
    }

  } catch (error) {
    console.log(`\n❌ Critical error during ${browserName} testing:`, error.message);
    results.failed++;
    results.tests.push({ test: 'Overall test', status: 'FAIL', error: error.message });
  } finally {
    await browser.close();
  }

  return results;
}

(async () => {
  console.log('\n🎯 CROSS-BROWSER JAVASCRIPT TEST SUITE');
  console.log('Testing JavaScript compatibility across browsers\n');

  const allResults = [];

  // Test Chrome
  const chromeResults = await testBrowserJavaScript(chromium, 'Chrome');
  allResults.push(chromeResults);

  // Test Firefox
  const firefoxResults = await testBrowserJavaScript(firefox, 'Firefox');
  allResults.push(firefoxResults);

  // Test WebKit (Safari)
  const webkitResults = await testBrowserJavaScript(webkit, 'WebKit (Safari)');
  allResults.push(webkitResults);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 CROSS-BROWSER JAVASCRIPT TEST SUMMARY');
  console.log('='.repeat(60));

  allResults.forEach(result => {
    const total = result.passed + result.failed;
    console.log(`\n${result.browser}:`);
    console.log(`  ✅ Passed: ${result.passed}`);
    console.log(`  ❌ Failed: ${result.failed}`);
    console.log(`  ⚠️  Warnings: ${result.warnings}`);
    if (total > 0) {
      console.log(`  Success Rate: ${((result.passed / total) * 100).toFixed(1)}%`);
    }
  });

  const totalPassed = allResults.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = allResults.reduce((sum, r) => sum + r.failed, 0);
  const totalWarnings = allResults.reduce((sum, r) => sum + r.warnings, 0);
  const totalTests = totalPassed + totalFailed;

  console.log('\n' + '='.repeat(60));
  console.log(`Overall: ${totalPassed}/${totalTests} tests passed (${((totalPassed / totalTests) * 100).toFixed(1)}%)`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log('='.repeat(60));

  console.log('\n✅ Cross-browser JavaScript testing complete!');
})();
