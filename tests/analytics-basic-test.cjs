/**
 * Basic GA4 Loading Test
 *
 * Tests that GA4 scripts load correctly and initialize without errors.
 * Does NOT test custom events (since we're only using Enhanced Measurement).
 */

const { chromium } = require('playwright');

(async () => {
    let browser;
    let passedTests = 0;
    let failedTests = 0;
    const errors = [];

    console.log('\n🔍 Basic GA4 Loading Test\n');
    console.log('Testing GA4 initialization on both pages...\n');

    try {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Collect console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Test 1: GA4 loads on index.html
        console.log('📝 Test 1: Checking GA4 on index.html...');
        await page.goto('http://localhost:8000/index.html');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        const indexGA4 = await page.evaluate(() => {
            const hasGtagScript = Array.from(document.querySelectorAll('script')).some(
                s => s.src && s.src.includes('googletagmanager.com/gtag/js')
            );
            const hasInitScript = Array.from(document.querySelectorAll('script')).some(
                s => s.src && s.src.includes('ga4-init.js')
            );
            const gtagDefined = typeof window.gtag === 'function';
            const dataLayerExists = Array.isArray(window.dataLayer);

            return { hasGtagScript, hasInitScript, gtagDefined, dataLayerExists };
        });

        if (indexGA4.hasGtagScript && indexGA4.hasInitScript && indexGA4.gtagDefined && indexGA4.dataLayerExists) {
            console.log('✅ Test 1 PASSED: GA4 properly loaded on index.html');
            passedTests++;
        } else {
            console.log('❌ Test 1 FAILED: GA4 not properly loaded on index.html');
            console.log(`   - gtag script: ${indexGA4.hasGtagScript}`);
            console.log(`   - init script: ${indexGA4.hasInitScript}`);
            console.log(`   - gtag function: ${indexGA4.gtagDefined}`);
            console.log(`   - dataLayer: ${indexGA4.dataLayerExists}`);
            errors.push('GA4 not loaded on index.html');
            failedTests++;
        }

        // Test 2: No JavaScript errors on index.html
        console.log('\n📝 Test 2: Checking for errors on index.html...');
        const indexErrors = consoleErrors.filter(err =>
            !err.includes('Lighthouse') &&
            !err.includes('DevTools') &&
            !err.includes('Extension')
        );

        if (indexErrors.length === 0) {
            console.log('✅ Test 2 PASSED: No JavaScript errors on index.html');
            passedTests++;
        } else {
            console.log('❌ Test 2 FAILED: JavaScript errors detected');
            indexErrors.forEach(err => console.log(`   - ${err}`));
            errors.push(...indexErrors);
            failedTests++;
        }

        // Test 3: GA4 loads on portfolio.html
        console.log('\n📝 Test 3: Checking GA4 on portfolio.html...');
        consoleErrors.length = 0;
        await page.goto('http://localhost:8000/portfolio.html');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        const portfolioGA4 = await page.evaluate(() => {
            const hasGtagScript = Array.from(document.querySelectorAll('script')).some(
                s => s.src && s.src.includes('googletagmanager.com/gtag/js')
            );
            const hasInitScript = Array.from(document.querySelectorAll('script')).some(
                s => s.src && s.src.includes('ga4-init.js')
            );
            const gtagDefined = typeof window.gtag === 'function';
            const dataLayerExists = Array.isArray(window.dataLayer);

            return { hasGtagScript, hasInitScript, gtagDefined, dataLayerExists };
        });

        if (portfolioGA4.hasGtagScript && portfolioGA4.hasInitScript && portfolioGA4.gtagDefined && portfolioGA4.dataLayerExists) {
            console.log('✅ Test 3 PASSED: GA4 properly loaded on portfolio.html');
            passedTests++;
        } else {
            console.log('❌ Test 3 FAILED: GA4 not properly loaded on portfolio.html');
            console.log(`   - gtag script: ${portfolioGA4.hasGtagScript}`);
            console.log(`   - init script: ${portfolioGA4.hasInitScript}`);
            console.log(`   - gtag function: ${portfolioGA4.gtagDefined}`);
            console.log(`   - dataLayer: ${portfolioGA4.dataLayerExists}`);
            errors.push('GA4 not loaded on portfolio.html');
            failedTests++;
        }

        // Test 4: No JavaScript errors on portfolio.html
        console.log('\n📝 Test 4: Checking for errors on portfolio.html...');
        const portfolioErrors = consoleErrors.filter(err =>
            !err.includes('Lighthouse') &&
            !err.includes('DevTools') &&
            !err.includes('Extension')
        );

        if (portfolioErrors.length === 0) {
            console.log('✅ Test 4 PASSED: No JavaScript errors on portfolio.html');
            passedTests++;
        } else {
            console.log('❌ Test 4 FAILED: JavaScript errors detected');
            portfolioErrors.forEach(err => console.log(`   - ${err}`));
            errors.push(...portfolioErrors);
            failedTests++;
        }

        // Test 5: GA4 config is called with correct Measurement ID
        console.log('\n📝 Test 5: Verifying GA4 configuration...');
        await page.goto('http://localhost:8000/index.html');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const configCheck = await page.evaluate(() => {
            const hasConfig = window.dataLayer && window.dataLayer.some(item => {
                if (Array.isArray(item)) {
                    return item[0] === 'config' && item[1] === 'G-XBG7HNQ9YG';
                }
                return item['0'] === 'config' && item['1'] === 'G-XBG7HNQ9YG';
            });
            return hasConfig;
        });

        if (configCheck) {
            console.log('✅ Test 5 PASSED: GA4 configured with correct Measurement ID');
            passedTests++;
        } else {
            console.log('❌ Test 5 FAILED: GA4 config not found or incorrect');
            errors.push('GA4 configuration missing');
            failedTests++;
        }

    } catch (error) {
        console.error('\n❌ Test suite error:', error.message);
        errors.push(error.message);
        failedTests++;
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    // Summary
    console.log('\n============================================================');
    console.log('📊 TEST SUMMARY');
    console.log('============================================================');
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📝 Total:  ${passedTests + failedTests}`);

    if (failedTests > 0) {
        console.log('\n❌ Errors:');
        errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
        console.log('\n⚠️  Some tests failed. Fix these issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed!');
        console.log('\n✅ GA4 is properly configured and loaded');
        console.log('✅ No critical JavaScript errors detected');
        console.log('\n💡 Next steps:');
        console.log('   1. Open site in browser and check browser console');
        console.log('   2. Verify events in GA4 Realtime: https://analytics.google.com/');
        console.log('   3. Use DebugView for detailed event monitoring');
        process.exit(0);
    }
})();
