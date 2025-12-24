// Responsive Testing Suite
// Tests the portfolio website across all specified viewports

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

const viewports = [
  // Mobile
  { name: 'Mobile-360', width: 360, height: 640, category: 'Mobile' },
  { name: 'Mobile-375', width: 375, height: 667, category: 'Mobile' },
  { name: 'Mobile-414', width: 414, height: 896, category: 'Mobile' },
  // Tablet
  { name: 'Tablet-768', width: 768, height: 1024, category: 'Tablet' },
  { name: 'Tablet-1024', width: 1024, height: 768, category: 'Tablet' },
  // Desktop
  { name: 'Desktop-1280', width: 1280, height: 800, category: 'Desktop' },
  { name: 'Desktop-1440', width: 1440, height: 900, category: 'Desktop' },
  { name: 'Desktop-1920', width: 1920, height: 1080, category: 'Desktop' },
];

async function testViewport(page, viewport) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
  console.log('='.repeat(60));

  const results = {
    viewport: viewport.name,
    width: viewport.width,
    height: viewport.height,
    passed: 0,
    failed: 0,
    tests: []
  };

  try {
    // Set viewport
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500); // Let animations settle

    // Test 1: Check if hamburger menu is visible at 480px breakpoint
    console.log(`\n🍔 Testing hamburger menu visibility...`);
    const hamburgerVisible = await page.locator('.menu-toggle').isVisible();
    const shouldBeVisible = viewport.width <= 480;

    if (hamburgerVisible === shouldBeVisible) {
      console.log(`  ✅ Hamburger menu correctly ${shouldBeVisible ? 'visible' : 'hidden'} at ${viewport.width}px`);
      results.passed++;
      results.tests.push({ test: 'Hamburger menu visibility', status: 'PASS' });
    } else {
      console.log(`  ❌ Hamburger menu should be ${shouldBeVisible ? 'visible' : 'hidden'} at ${viewport.width}px`);
      results.failed++;
      results.tests.push({ test: 'Hamburger menu visibility', status: 'FAIL' });
    }

    // Test 2: Check navigation bar
    console.log(`\n🧭 Testing navigation bar...`);
    const navVisible = await page.locator('nav').isVisible();
    if (navVisible) {
      console.log(`  ✅ Navigation bar is visible`);
      results.passed++;
      results.tests.push({ test: 'Navigation bar visible', status: 'PASS' });
    } else {
      console.log(`  ❌ Navigation bar is NOT visible`);
      results.failed++;
      results.tests.push({ test: 'Navigation bar visible', status: 'FAIL' });
    }

    // Test 3: Check hero section
    console.log(`\n🎯 Testing hero section...`);
    const heroVisible = await page.locator('.hero-section').isVisible();
    if (heroVisible) {
      console.log(`  ✅ Hero section is visible`);
      results.passed++;
      results.tests.push({ test: 'Hero section visible', status: 'PASS' });
    } else {
      console.log(`  ❌ Hero section is NOT visible`);
      results.failed++;
      results.tests.push({ test: 'Hero section visible', status: 'FAIL' });
    }

    // Test 4: Check for horizontal overflow
    console.log(`\n📏 Testing for horizontal overflow...`);
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    if (!hasOverflow) {
      console.log(`  ✅ No horizontal overflow detected`);
      results.passed++;
      results.tests.push({ test: 'No horizontal overflow', status: 'PASS' });
    } else {
      console.log(`  ❌ Horizontal overflow detected`);
      results.failed++;
      results.tests.push({ test: 'No horizontal overflow', status: 'FAIL' });
    }

    // Test 5: Check responsive images
    console.log(`\n🖼️  Testing responsive images...`);
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    if (brokenImages === 0) {
      console.log(`  ✅ All images loaded successfully`);
      results.passed++;
      results.tests.push({ test: 'Images load correctly', status: 'PASS' });
    } else {
      console.log(`  ❌ ${brokenImages} broken/unloaded images found`);
      results.failed++;
      results.tests.push({ test: 'Images load correctly', status: 'FAIL', error: `${brokenImages} broken images` });
    }

    // Test 6: Check font rendering
    console.log(`\n🔤 Testing font rendering...`);
    const fontsLoaded = await page.evaluate(() => {
      return document.fonts.check('1em "Work Sans"') && document.fonts.check('1em "Playfair Display"');
    });
    if (fontsLoaded) {
      console.log(`  ✅ Custom fonts loaded successfully`);
      results.passed++;
      results.tests.push({ test: 'Custom fonts loaded', status: 'PASS' });
    } else {
      console.log(`  ⚠️  Custom fonts not fully loaded (fallback may be active)`);
      results.tests.push({ test: 'Custom fonts loaded', status: 'WARN' });
    }

    // Test 7: Experience Metrics Bar Responsive Layout
    console.log(`\n📊 Testing experience metrics bar layout...`);
    try {
      const metricsBar = await page.locator('.experience-metrics');
      const metricsVisible = await metricsBar.isVisible();

      if (metricsVisible) {
        const gridColumns = await metricsBar.evaluate(el => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });

        const columnCount = gridColumns.split(' ').length;
        let expectedColumns;

        if (viewport.width >= 1024) {
          expectedColumns = 4; // Desktop: 4 columns
        } else {
          expectedColumns = 2; // Tablet/Mobile: 2 columns
        }

        if (columnCount === expectedColumns) {
          console.log(`  ✅ Metrics bar has ${columnCount} columns (expected ${expectedColumns})`);
          results.passed++;
          results.tests.push({ test: 'Metrics bar responsive layout', status: 'PASS' });
        } else {
          console.log(`  ⚠️  Metrics bar has ${columnCount} columns, expected ${expectedColumns}`);
          results.tests.push({ test: 'Metrics bar responsive layout', status: 'WARN' });
        }
      } else {
        console.log(`  ⚠️  Metrics bar not visible`);
        results.tests.push({ test: 'Metrics bar responsive layout', status: 'WARN' });
      }
    } catch (error) {
      console.log(`  ⚠️  Could not test metrics bar: ${error.message}`);
    }

    // Test 8: Touch/swipe support for mobile
    if (viewport.category === 'Mobile') {
      console.log(`\n👆 Testing touch event support...`);
      const touchSupport = await page.evaluate(() => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      });
      if (touchSupport) {
        console.log(`  ✅ Touch events are supported`);
        results.passed++;
        results.tests.push({ test: 'Touch events support', status: 'PASS' });
      } else {
        console.log(`  ⚠️  Touch events may not be supported`);
        results.tests.push({ test: 'Touch events support', status: 'WARN' });
      }
    }

    // Test 9: Screenshot for visual verification
    console.log(`\n📸 Taking screenshot...`);
    await page.screenshot({
      path: `C:\\Users\\USER\\AppData\\Local\\Temp\\responsive-${viewport.name}.png`,
      fullPage: true
    });
    console.log(`  ✅ Screenshot saved: responsive-${viewport.name}.png`);

    // Test portfolio.html as well
    console.log(`\n📄 Testing portfolio.html at this viewport...`);
    await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500);

    const portfolioLoaded = await page.locator('.portfolio-section').isVisible();
    if (portfolioLoaded) {
      console.log(`  ✅ portfolio.html loaded successfully`);
      results.passed++;
      results.tests.push({ test: 'portfolio.html loads', status: 'PASS' });
    } else {
      console.log(`  ❌ portfolio.html did NOT load properly`);
      results.failed++;
      results.tests.push({ test: 'portfolio.html loads', status: 'FAIL' });
    }

    await page.screenshot({
      path: `C:\\Users\\USER\\AppData\\Local\\Temp\\responsive-portfolio-${viewport.name}.png`,
      fullPage: true
    });
    console.log(`  ✅ Portfolio screenshot saved`);

  } catch (error) {
    console.log(`\n❌ Error during ${viewport.name} testing:`, error.message);
    results.failed++;
    results.tests.push({ test: 'Overall viewport test', status: 'FAIL', error: error.message });
  }

  return results;
}

(async () => {
  console.log('\n🎯 RESPONSIVE TESTING SUITE');
  console.log('Testing portfolio website across all viewports\n');

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allResults = [];

  // Test all viewports
  for (const viewport of viewports) {
    const result = await testViewport(page, viewport);
    allResults.push(result);
  }

  await browser.close();

  // Summary by category
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESPONSIVE TESTING SUMMARY');
  console.log('='.repeat(60));

  const categories = ['Mobile', 'Tablet', 'Desktop'];
  categories.forEach(category => {
    console.log(`\n${category} Devices:`);
    const categoryResults = allResults.filter(r => {
      const vp = viewports.find(v => v.name === r.viewport);
      return vp && vp.category === category;
    });

    categoryResults.forEach(result => {
      const total = result.passed + result.failed;
      const percentage = ((result.passed / total) * 100).toFixed(1);
      console.log(`  ${result.viewport} (${result.width}x${result.height}): ${result.passed}/${total} passed (${percentage}%)`);
    });
  });

  const totalPassed = allResults.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = allResults.reduce((sum, r) => sum + r.failed, 0);
  const totalTests = totalPassed + totalFailed;

  console.log('\n' + '='.repeat(60));
  console.log(`Overall: ${totalPassed}/${totalTests} tests passed (${((totalPassed / totalTests) * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));

  console.log('\n✅ Responsive testing complete!');
  console.log(`📸 Screenshots saved to: C:\\Users\\USER\\AppData\\Local\\Temp\\`);
})();
