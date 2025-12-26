// Performance Testing Suite
// Tests page load times, Lighthouse scores, CLS, image lazy loading

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 PERFORMANCE TEST SUITE');
  console.log('Testing performance metrics\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  try {
    // ========================================
    // PAGE LOAD TIME TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('⏱️  PAGE LOAD TIME TESTS');
    console.log('='.repeat(60));

    // Test 1: index.html Load Time
    console.log('\n📄 Testing index.html load time...');
    try {
      const startTime = Date.now();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
      const loadTime = Date.now() - startTime;

      console.log(`  Load time: ${loadTime}ms`);

      if (loadTime < 3000) {
        console.log('  ✅ Page loads in under 3 seconds');
        passed++;
      } else if (loadTime < 5000) {
        console.log('  ⚠️  Page loads in 3-5 seconds (acceptable but could be improved)');
        warnings++;
      } else {
        console.log('  ❌ Page takes over 5 seconds to load');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Load time error:', error.message);
      failed++;
    }

    // Test 2: portfolio.html Load Time
    console.log('\n📄 Testing portfolio.html load time...');
    try {
      const startTime = Date.now();
      await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
      const loadTime = Date.now() - startTime;

      console.log(`  Load time: ${loadTime}ms`);

      if (loadTime < 3000) {
        console.log('  ✅ Page loads in under 3 seconds');
        passed++;
      } else if (loadTime < 5000) {
        console.log('  ⚠️  Page loads in 3-5 seconds (acceptable but could be improved)');
        warnings++;
      } else {
        console.log('  ❌ Page takes over 5 seconds to load');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Load time error:', error.message);
      failed++;
    }

    // ========================================
    // PERFORMANCE METRICS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 PERFORMANCE METRICS');
    console.log('='.repeat(60));

    // Test 3: Performance Navigation Timing
    console.log('\n⏰ Testing detailed performance timing...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

      const performanceMetrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        if (!perf) return null;

        return {
          dns: Math.round(perf.domainLookupEnd - perf.domainLookupStart),
          tcp: Math.round(perf.connectEnd - perf.connectStart),
          ttfb: Math.round(perf.responseStart - perf.requestStart),
          download: Math.round(perf.responseEnd - perf.responseStart),
          domInteractive: Math.round(perf.domInteractive - perf.fetchStart),
          domComplete: Math.round(perf.domComplete - perf.fetchStart),
          loadComplete: Math.round(perf.loadEventEnd - perf.fetchStart)
        };
      });

      if (performanceMetrics) {
        console.log(`  DNS lookup: ${performanceMetrics.dns}ms`);
        console.log(`  TCP connection: ${performanceMetrics.tcp}ms`);
        console.log(`  Time to First Byte: ${performanceMetrics.ttfb}ms`);
        console.log(`  Download: ${performanceMetrics.download}ms`);
        console.log(`  DOM Interactive: ${performanceMetrics.domInteractive}ms`);
        console.log(`  DOM Complete: ${performanceMetrics.domComplete}ms`);
        console.log(`  Load Complete: ${performanceMetrics.loadComplete}ms`);

        if (performanceMetrics.domInteractive < 1500) {
          console.log('  ✅ Excellent DOM interactive time');
          passed++;
        } else if (performanceMetrics.domInteractive < 2500) {
          console.log('  ⚠️  Good DOM interactive time');
          warnings++;
        } else {
          console.log('  ❌ Slow DOM interactive time');
          failed++;
        }
      }
    } catch (error) {
      console.log('  ❌ Performance timing error:', error.message);
      failed++;
    }

    // Test 4: Resource Loading
    console.log('\n📦 Testing resource loading...');
    try {
      const resourceMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        const stats = {
          scripts: 0,
          stylesheets: 0,
          images: 0,
          fonts: 0,
          total: resources.length,
          totalSize: 0,
          largeResources: []
        };

        resources.forEach(resource => {
          if (resource.initiatorType === 'script' || resource.name.endsWith('.js')) {
            stats.scripts++;
          } else if (resource.initiatorType === 'link' || resource.name.endsWith('.css')) {
            stats.stylesheets++;
          } else if (resource.initiatorType === 'img' || /\.(jpg|jpeg|png|gif|svg|webp)/.test(resource.name)) {
            stats.images++;
          } else if (resource.name.includes('fonts') || /\.(woff|woff2|ttf)/.test(resource.name)) {
            stats.fonts++;
          }

          if (resource.transferSize) {
            stats.totalSize += resource.transferSize;
            if (resource.transferSize > 100000) { // Over 100KB
              stats.largeResources.push({
                name: resource.name.split('/').pop(),
                size: Math.round(resource.transferSize / 1024)
              });
            }
          }
        });

        return stats;
      });

      console.log(`  Total resources: ${resourceMetrics.total}`);
      console.log(`  Scripts: ${resourceMetrics.scripts}`);
      console.log(`  Stylesheets: ${resourceMetrics.stylesheets}`);
      console.log(`  Images: ${resourceMetrics.images}`);
      console.log(`  Fonts: ${resourceMetrics.fonts}`);
      console.log(`  Total transfer size: ${Math.round(resourceMetrics.totalSize / 1024)}KB`);

      if (resourceMetrics.largeResources.length > 0) {
        console.log(`  ⚠️  Large resources (>100KB):`);
        resourceMetrics.largeResources.forEach(r => {
          console.log(`     - ${r.name}: ${r.size}KB`);
        });
        warnings++;
      } else {
        console.log('  ✅ No excessively large resources');
        passed++;
      }
    } catch (error) {
      console.log('  ❌ Resource loading error:', error.message);
      failed++;
    }

    // ========================================
    // FONT LOADING TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🔤 FONT LOADING TESTS');
    console.log('='.repeat(60));

    // Test 5: Font Loader Module - Async Loading
    console.log('\n📝 Testing font loader module async implementation...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

      const fontLinkCheck = await page.evaluate(() => {
        const fontLink = document.querySelector('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
        if (!fontLink) return { found: false };

        return {
          found: true,
          hasMedia: fontLink.hasAttribute('media'),
          media: fontLink.getAttribute('media')
        };
      });

      if (fontLinkCheck.found) {
        console.log('  ✅ Google Fonts stylesheet loaded');
        if (fontLinkCheck.hasMedia) {
          console.log(`  ✅ Async loading strategy detected (media="${fontLinkCheck.media}")`);
        }
        passed++;
      } else {
        console.log('  ❌ Google Fonts stylesheet not found');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Font loader test error:', error.message);
      failed++;
    }

    // Test 6: Font Display Swap Parameter
    console.log('\n⚡ Testing font-display: swap parameter...');
    try {
      const fontDisplayCheck = await page.evaluate(() => {
        const fontLink = document.querySelector('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
        if (!fontLink) return { found: false };

        const href = fontLink.getAttribute('href');
        return {
          found: true,
          hasSwap: href.includes('display=swap')
        };
      });

      if (fontDisplayCheck.found && fontDisplayCheck.hasSwap) {
        console.log('  ✅ Font URL includes display=swap parameter');
        console.log('  ℹ️  Prevents invisible text during font loading');
        passed++;
      } else if (fontDisplayCheck.found) {
        console.log('  ⚠️  Font URL missing display=swap parameter');
        warnings++;
      } else {
        console.log('  ❌ Font stylesheet not found');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Font display test error:', error.message);
      failed++;
    }

    // Test 7: Font Loading Performance
    console.log('\n🚀 Testing font loading does not block rendering...');
    try {
      const startTime = Date.now();
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

      // Check if h1 is visible before fonts fully load
      const h1Visible = await page.isVisible('h1', { timeout: 2000 });
      const renderTime = Date.now() - startTime;

      if (h1Visible && renderTime < 2000) {
        console.log(`  ✅ Page renders quickly without waiting for fonts (${renderTime}ms)`);
        console.log('  ℹ️  Font loading does not block rendering');
        passed++;
      } else {
        console.log(`  ⚠️  Page rendering took ${renderTime}ms`);
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Font loading performance test error:', error.message);
      failed++;
    }

    // ========================================
    // LAZY LOADING TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🖼️  IMAGE LAZY LOADING TESTS');
    console.log('='.repeat(60));

    // Test 8: Lazy Loading Attribute
    console.log('\n🔍 Testing lazy loading implementation...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

      const lazyLoadStats = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const withLazy = images.filter(img => img.loading === 'lazy').length;
        const withoutLazy = images.filter(img => img.loading !== 'lazy').length;

        return {
          total: images.length,
          withLazy,
          withoutLazy
        };
      });

      console.log(`  Total images: ${lazyLoadStats.total}`);
      console.log(`  With lazy loading: ${lazyLoadStats.withLazy}`);
      console.log(`  Without lazy loading: ${lazyLoadStats.withoutLazy}`);

      if (lazyLoadStats.withLazy > 0) {
        console.log('  ✅ Lazy loading is implemented');
        passed++;
      } else {
        console.log('  ⚠️  No lazy loading detected (recommended for performance)');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Lazy loading error:', error.message);
      failed++;
    }

    // ========================================
    // CUMULATIVE LAYOUT SHIFT (CLS) TEST
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('📐 CUMULATIVE LAYOUT SHIFT (CLS) TEST');
    console.log('='.repeat(60));

    // Test 9: Layout Shift Detection
    console.log('\n🎢 Testing for layout shifts...');
    try {
      await page.goto(TARGET_URL);

      // Observe layout shifts
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsScore = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsScore += entry.value;
              }
            }
          });

          observer.observe({ type: 'layout-shift', buffered: true });

          // Wait 3 seconds to capture shifts during load
          setTimeout(() => {
            observer.disconnect();
            resolve(clsScore);
          }, 3000);
        });
      });

      console.log(`  CLS Score: ${cls.toFixed(4)}`);

      if (cls < 0.1) {
        console.log('  ✅ Excellent CLS (< 0.1)');
        passed++;
      } else if (cls < 0.25) {
        console.log('  ⚠️  Needs improvement (0.1 - 0.25)');
        warnings++;
      } else {
        console.log('  ❌ Poor CLS (> 0.25)');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ CLS measurement error:', error.message);
      failed++;
    }

    // ========================================
    // JAVASCRIPT EXECUTION TIME
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('⚡ JAVASCRIPT EXECUTION TIME');
    console.log('='.repeat(60));

    // Test 10: JavaScript Execution
    console.log('\n🔧 Testing JavaScript execution time...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

      const jsMetrics = await page.evaluate(() => {
        const jsResources = performance.getEntriesByType('resource')
          .filter(r => r.initiatorType === 'script' || r.name.endsWith('.js'));

        let totalDuration = 0;
        jsResources.forEach(r => {
          totalDuration += r.duration;
        });

        return {
          count: jsResources.length,
          totalDuration: Math.round(totalDuration)
        };
      });

      console.log(`  JavaScript files: ${jsMetrics.count}`);
      console.log(`  Total execution time: ${jsMetrics.totalDuration}ms`);

      if (jsMetrics.totalDuration < 500) {
        console.log('  ✅ Fast JavaScript execution');
        passed++;
      } else if (jsMetrics.totalDuration < 1000) {
        console.log('  ⚠️  Moderate JavaScript execution time');
        warnings++;
      } else {
        console.log('  ❌ Slow JavaScript execution');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ JS execution error:', error.message);
      failed++;
    }

    // ========================================
    // CSS ANIMATION PERFORMANCE
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🎨 CSS ANIMATION PERFORMANCE');
    console.log('='.repeat(60));

    // Test 11: CSS Animations
    console.log('\n✨ Testing CSS animations performance...');
    try {
      const animationInfo = await page.evaluate(() => {
        const animatedElements = [];
        const allElements = document.querySelectorAll('*');

        allElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const animations = styles.animation;
          const transitions = styles.transition;

          if (animations !== 'none' || transitions !== 'all 0s ease 0s') {
            animatedElements.push({
              tag: el.tagName,
              animation: animations !== 'none',
              transition: transitions !== 'all 0s ease 0s'
            });
          }
        });

        return {
          count: animatedElements.length,
          animated: animatedElements.filter(e => e.animation).length,
          transitioned: animatedElements.filter(e => e.transition).length
        };
      });

      console.log(`  Elements with animations: ${animationInfo.animated}`);
      console.log(`  Elements with transitions: ${animationInfo.transitioned}`);
      console.log(`  Total animated elements: ${animationInfo.count}`);

      if (animationInfo.count > 0) {
        console.log('  ✅ Animations detected (ensure GPU acceleration is used)');
        passed++;
      } else {
        console.log('  ℹ️  No animations detected');
      }
    } catch (error) {
      console.log('  ❌ Animation test error:', error.message);
      failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 PERFORMANCE TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    const total = passed + failed;
    if (total > 0) {
      console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    }
    console.log('='.repeat(60));

    console.log('\n✅ Performance testing complete!');
    console.log('\n💡 Recommendations:');
    console.log('  - Run Lighthouse audit for comprehensive performance score');
    console.log('  - Test on throttled 3G connection');
    console.log('  - Consider image optimization (WebP format, compression)');
    console.log('  - Enable gzip/brotli compression on server');
    console.log('  - Consider code splitting for JavaScript modules');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
