// Browser Compatibility Tests
// Tests the portfolio website across Chrome, Firefox, and WebKit (Safari)

const { chromium, firefox, webkit } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

async function testBrowser(browserType, browserName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing ${browserName}`);
  console.log('='.repeat(60));

  const browser = await browserType.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    browser: browserName,
    passed: 0,
    failed: 0,
    tests: []
  };

  try {
    // Test 1: index.html loads successfully
    console.log(`\n📄 Testing index.html...`);
    const indexResponse = await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    if (indexResponse.ok()) {
      console.log(`  ✅ index.html loaded successfully (${indexResponse.status()})`);
      results.passed++;
      results.tests.push({ test: 'index.html loads', status: 'PASS' });
    } else {
      console.log(`  ❌ index.html failed to load (${indexResponse.status()})`);
      results.failed++;
      results.tests.push({ test: 'index.html loads', status: 'FAIL', error: `Status ${indexResponse.status()}` });
    }

    // Test 2: Check CSS Grid support
    console.log(`\n🎨 Testing CSS Grid support...`);
    const gridSupport = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.display = 'grid';
      return div.style.display === 'grid';
    });
    if (gridSupport) {
      console.log(`  ✅ CSS Grid is supported`);
      results.passed++;
      results.tests.push({ test: 'CSS Grid support', status: 'PASS' });
    } else {
      console.log(`  ❌ CSS Grid is NOT supported`);
      results.failed++;
      results.tests.push({ test: 'CSS Grid support', status: 'FAIL' });
    }

    // Test 3: Check Flexbox support
    console.log(`\n📦 Testing Flexbox support...`);
    const flexSupport = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      return div.style.display === 'flex';
    });
    if (flexSupport) {
      console.log(`  ✅ Flexbox is supported`);
      results.passed++;
      results.tests.push({ test: 'Flexbox support', status: 'PASS' });
    } else {
      console.log(`  ❌ Flexbox is NOT supported`);
      results.failed++;
      results.tests.push({ test: 'Flexbox support', status: 'FAIL' });
    }

    // Test 4: Check backdrop-filter support
    console.log(`\n✨ Testing backdrop-filter support...`);
    const backdropSupport = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.backdropFilter = 'blur(10px)';
      return div.style.backdropFilter !== '';
    });
    if (backdropSupport) {
      console.log(`  ✅ backdrop-filter is supported`);
      results.passed++;
      results.tests.push({ test: 'backdrop-filter support', status: 'PASS' });
    } else {
      console.log(`  ⚠️  backdrop-filter is NOT supported (fallback needed)`);
      results.tests.push({ test: 'backdrop-filter support', status: 'WARN', note: 'Fallback should be in place' });
    }

    // Test 5: Check Intersection Observer API
    console.log(`\n👁️  Testing Intersection Observer API...`);
    const ioSupport = await page.evaluate(() => {
      return 'IntersectionObserver' in window;
    });
    if (ioSupport) {
      console.log(`  ✅ Intersection Observer is supported`);
      results.passed++;
      results.tests.push({ test: 'Intersection Observer API', status: 'PASS' });
    } else {
      console.log(`  ❌ Intersection Observer is NOT supported (polyfill needed)`);
      results.failed++;
      results.tests.push({ test: 'Intersection Observer API', status: 'FAIL' });
    }

    // Test 6: portfolio.html loads successfully
    console.log(`\n📄 Testing portfolio.html...`);
    const portfolioResponse = await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
    if (portfolioResponse.ok()) {
      console.log(`  ✅ portfolio.html loaded successfully (${portfolioResponse.status()})`);
      results.passed++;
      results.tests.push({ test: 'portfolio.html loads', status: 'PASS' });
    } else {
      console.log(`  ❌ portfolio.html failed to load (${portfolioResponse.status()})`);
      results.failed++;
      results.tests.push({ test: 'portfolio.html loads', status: 'FAIL', error: `Status ${portfolioResponse.status()}` });
    }

    // Test 7: Check JavaScript modules support (ES6+)
    console.log(`\n📦 Testing JavaScript modules support...`);
    const moduleSupport = await page.evaluate(() => {
      const script = document.createElement('script');
      script.type = 'module';
      return 'noModule' in script;
    });
    if (moduleSupport) {
      console.log(`  ✅ JavaScript modules are supported`);
      results.passed++;
      results.tests.push({ test: 'JavaScript modules (ES6+)', status: 'PASS' });
    } else {
      console.log(`  ❌ JavaScript modules are NOT supported`);
      results.failed++;
      results.tests.push({ test: 'JavaScript modules (ES6+)', status: 'FAIL' });
    }

    // Test 8: Check smooth scroll behavior
    console.log(`\n🎢 Testing smooth scroll behavior...`);
    const smoothScrollSupport = await page.evaluate(() => {
      return 'scrollBehavior' in document.documentElement.style;
    });
    if (smoothScrollSupport) {
      console.log(`  ✅ Smooth scroll is supported`);
      results.passed++;
      results.tests.push({ test: 'Smooth scroll behavior', status: 'PASS' });
    } else {
      console.log(`  ⚠️  Smooth scroll is NOT supported (polyfill recommended)`);
      results.tests.push({ test: 'Smooth scroll behavior', status: 'WARN' });
    }

    // Test 9: Screenshot for visual verification
    console.log(`\n📸 Taking screenshot for visual verification...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: `./tests/screenshots/screenshot-${browserName.toLowerCase()}.png`,
      fullPage: true
    });
    console.log(`  ✅ Screenshot saved: screenshot-${browserName.toLowerCase()}.png`);

  } catch (error) {
    console.log(`\n❌ Error during ${browserName} testing:`, error.message);
    results.failed++;
    results.tests.push({ test: 'Overall browser test', status: 'FAIL', error: error.message });
  } finally {
    await browser.close();
  }

  return results;
}

(async () => {
  console.log('\n🎯 BROWSER COMPATIBILITY TEST SUITE');
  console.log('Testing portfolio website across multiple browsers\n');

  const allResults = [];

  // Test Chrome (Chromium)
  const chromeResults = await testBrowser(chromium, 'Chrome');
  allResults.push(chromeResults);

  // Test Firefox
  const firefoxResults = await testBrowser(firefox, 'Firefox');
  allResults.push(firefoxResults);

  // Test WebKit (Safari)
  const webkitResults = await testBrowser(webkit, 'WebKit (Safari)');
  allResults.push(webkitResults);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 BROWSER COMPATIBILITY TEST SUMMARY');
  console.log('='.repeat(60));

  allResults.forEach(result => {
    const total = result.passed + result.failed;
    console.log(`\n${result.browser}:`);
    console.log(`  ✅ Passed: ${result.passed}`);
    console.log(`  ❌ Failed: ${result.failed}`);
    console.log(`  Success Rate: ${((result.passed / total) * 100).toFixed(1)}%`);
  });

  const totalPassed = allResults.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = allResults.reduce((sum, r) => sum + r.failed, 0);
  const totalTests = totalPassed + totalFailed;

  console.log('\n' + '='.repeat(60));
  console.log(`Overall: ${totalPassed}/${totalTests} tests passed (${((totalPassed / totalTests) * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));

  console.log('\n✅ Browser compatibility testing complete!');
  console.log(`📸 Screenshots saved to: ./tests/screenshots/`);
})();
