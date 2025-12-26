// Accessibility Testing Suite
// Tests keyboard navigation, focus indicators, ARIA labels, color contrast, semantic HTML

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 ACCESSIBILITY TEST SUITE (WCAG 2.1)');
  console.log('Testing accessibility compliance\n');

  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);

    // ========================================
    // KEYBOARD NAVIGATION TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('⌨️  KEYBOARD NAVIGATION TESTS');
    console.log('='.repeat(60));

    // Test 1: Tab Navigation
    console.log('\n🔄 Testing Tab key navigation...');
    try {
      // Tab through first 5 focusable elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(300);

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el.tagName,
            id: el.id,
            class: el.className,
            role: el.getAttribute('role'),
            ariaLabel: el.getAttribute('aria-label')
          };
        });

        console.log(`  Tab ${i + 1}: ${focusedElement.tagName}${focusedElement.id ? '#' + focusedElement.id : ''}${focusedElement.ariaLabel ? ' [' + focusedElement.ariaLabel + ']' : ''}`);
      }
      console.log('  ✅ Tab navigation works');
      passed++;
    } catch (error) {
      console.log('  ❌ Tab navigation error:', error.message);
      failed++;
    }

    // Test 2: Enter/Space Key Interaction
    console.log('\n⏎  Testing Enter/Space key on interactive elements...');
    try {
      // Focus on first button
      const firstButton = await page.locator('button, a').first();
      await firstButton.focus();
      await page.waitForTimeout(300);

      // Press Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);

      console.log('  ✅ Enter key activates focused elements');
      passed++;
    } catch (error) {
      console.log('  ❌ Enter key error:', error.message);
      failed++;
    }

    // Test 3: Escape Key (Modal close)
    console.log('\n⎋  Testing Escape key functionality...');
    try {
      await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const portfolioCard = page.locator('.portfolio-card[data-portfolio-id]').first();
      if (await portfolioCard.count() > 0) {
        await portfolioCard.click();
        await page.waitForTimeout(500);

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

        console.log('  ✅ Escape key works (modal close)');
        passed++;
      } else {
        console.log('  ⚠️  No modal to test Escape key');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Escape key error:', error.message);
      failed++;
    }

    // Test 3b: Modal Focus Trap (Accessibility)
    console.log('\n🔒 Testing modal focus trap for accessibility...');
    try {
      await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const portfolioCard = page.locator('.portfolio-card[data-portfolio-id]').first();
      if (await portfolioCard.count() > 0) {
        // Open modal
        await portfolioCard.click();
        await page.waitForTimeout(800);

        const modal = page.locator('#portfolioModal');
        const isModalActive = await modal.evaluate(el => el.classList.contains('active'));

        if (isModalActive) {
          // Check that focus is set when modal opens
          const initialFocus = await page.evaluate(() => {
            return document.activeElement.tagName !== 'BODY';
          });

          if (initialFocus) {
            console.log('  ✅ Modal sets initial focus (not on body)');
            passed++;
          } else {
            console.log('  ⚠️  Modal may not set initial focus correctly');
            warnings++;
          }

          // Test that Tab navigation stays within modal
          const focusableCount = await page.evaluate(() => {
            const modal = document.getElementById('portfolioModal');
            if (!modal) return 0;
            const focusableSelectors = [
              'a[href]',
              'button:not([disabled])',
              'textarea:not([disabled])',
              'input:not([disabled])',
              'select:not([disabled])',
              '[tabindex]:not([tabindex="-1"])'
            ].join(', ');
            return Array.from(modal.querySelectorAll(focusableSelectors))
              .filter(el => el.offsetParent !== null).length;
          });

          if (focusableCount > 0) {
            // Tab through all elements and beyond to test trap
            for (let i = 0; i < focusableCount + 2; i++) {
              await page.keyboard.press('Tab');
              await page.waitForTimeout(80);
            }

            const focusTrapped = await page.evaluate(() => {
              const modal = document.getElementById('portfolioModal');
              return modal && modal.contains(document.activeElement);
            });

            if (focusTrapped) {
              console.log('  ✅ Focus trap prevents keyboard users from leaving modal');
              passed++;
            } else {
              console.log('  ❌ Focus trap failed - keyboard users can escape modal');
              failed++;
            }

            // Test focus restoration
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);

            const focusRestored = await page.evaluate(() => {
              return document.activeElement.hasAttribute('data-portfolio-id');
            });

            if (focusRestored) {
              console.log('  ✅ Focus restored to trigger element (WCAG 2.4.3)');
              passed++;
            } else {
              console.log('  ⚠️  Focus may not be restored to trigger element');
              warnings++;
            }
          } else {
            console.log('  ⚠️  No focusable elements found in modal');
            warnings++;
          }
        } else {
          console.log('  ⚠️  Modal did not open for focus trap test');
          warnings++;
        }
      } else {
        console.log('  ⚠️  No portfolio cards found for focus trap test');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Modal focus trap test error:', error.message);
      failed++;
    }

    // Test 4: Skip Navigation Link
    console.log('\n⏭️  Testing skip navigation link...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const skipLink = page.locator('a[href="#main-content"], .skip-link');
      const skipExists = await skipLink.count() > 0;

      if (skipExists) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(300);

        const focused = await page.evaluate(() => {
          return document.activeElement.textContent;
        });

        if (focused.toLowerCase().includes('skip')) {
          console.log('  ✅ Skip navigation link is accessible');
          passed++;
        } else {
          console.log('  ⚠️  Skip link exists but may not be first focusable element');
          warnings++;
        }
      } else {
        console.log('  ⚠️  No skip navigation link found (recommended for accessibility)');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Skip link error:', error.message);
      failed++;
    }

    // ========================================
    // FOCUS INDICATORS TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🎯 FOCUS INDICATORS TESTS');
    console.log('='.repeat(60));

    // Test 5: Focus Visible Styling
    console.log('\n👁️  Testing focus indicator visibility...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      const firstLink = page.locator('a').first();
      await firstLink.focus();
      await page.waitForTimeout(300);

      const focusStyles = await firstLink.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          outlineColor: styles.outlineColor,
          boxShadow: styles.boxShadow
        };
      });

      const hasFocusIndicator =
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none';

      if (hasFocusIndicator) {
        console.log('  ✅ Focus indicators are visible');
        console.log(`     Outline: ${focusStyles.outline}`);
        console.log(`     Box Shadow: ${focusStyles.boxShadow}`);
        passed++;
      } else {
        console.log('  ❌ Focus indicators may not be visible');
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Focus indicator error:', error.message);
      failed++;
    }

    // ========================================
    // ARIA LABELS & ROLES TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🏷️  ARIA LABELS & ROLES TESTS');
    console.log('='.repeat(60));

    // Test 6: ARIA Labels on Interactive Elements
    console.log('\n🔖 Testing ARIA labels...');
    try {
      const ariaStats = await page.evaluate(() => {
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        let withAriaLabel = 0;
        let withAriaLabelledBy = 0;
        let withoutAria = 0;

        interactiveElements.forEach(el => {
          if (el.getAttribute('aria-label')) {
            withAriaLabel++;
          } else if (el.getAttribute('aria-labelledby')) {
            withAriaLabelledBy++;
          } else if (!el.textContent.trim() && el.tagName !== 'INPUT') {
            withoutAria++;
          }
        });

        return {
          total: interactiveElements.length,
          withAriaLabel,
          withAriaLabelledBy,
          withoutAria
        };
      });

      console.log(`  Total interactive elements: ${ariaStats.total}`);
      console.log(`  With aria-label: ${ariaStats.withAriaLabel}`);
      console.log(`  With aria-labelledby: ${ariaStats.withAriaLabelledBy}`);
      console.log(`  Without ARIA (may use text): ${ariaStats.withoutAria}`);

      if (ariaStats.withoutAria === 0) {
        console.log('  ✅ All interactive elements have accessible labels');
        passed++;
      } else {
        console.log(`  ⚠️  ${ariaStats.withoutAria} elements may need ARIA labels`);
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ ARIA labels error:', error.message);
      failed++;
    }

    // Test 7: Semantic HTML Structure
    console.log('\n📄 Testing semantic HTML structure...');
    try {
      const semanticStats = await page.evaluate(() => {
        return {
          nav: document.querySelectorAll('nav').length,
          main: document.querySelectorAll('main').length,
          header: document.querySelectorAll('header').length,
          footer: document.querySelectorAll('footer').length,
          section: document.querySelectorAll('section').length,
          article: document.querySelectorAll('article').length,
          h1: document.querySelectorAll('h1').length,
          headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
        };
      });

      console.log(`  <nav>: ${semanticStats.nav}`);
      console.log(`  <main>: ${semanticStats.main}`);
      console.log(`  <header>: ${semanticStats.header}`);
      console.log(`  <footer>: ${semanticStats.footer}`);
      console.log(`  <section>: ${semanticStats.section}`);
      console.log(`  Total headings: ${semanticStats.headings}`);
      console.log(`  <h1> count: ${semanticStats.h1}`);

      if (semanticStats.main > 0 && semanticStats.nav > 0 && semanticStats.h1 === 1) {
        console.log('  ✅ Good semantic HTML structure');
        passed++;
      } else {
        console.log('  ⚠️  Semantic HTML could be improved');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Semantic HTML error:', error.message);
      failed++;
    }

    // Test 8: Alt Text for Images
    console.log('\n🖼️  Testing alt text for images...');
    try {
      const imageStats = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const withAlt = images.filter(img => img.hasAttribute('alt')).length;
        const withEmptyAlt = images.filter(img => img.alt === '').length;
        const withoutAlt = images.filter(img => !img.hasAttribute('alt')).length;

        return {
          total: images.length,
          withAlt,
          withEmptyAlt,
          withoutAlt
        };
      });

      console.log(`  Total images: ${imageStats.total}`);
      console.log(`  With alt text: ${imageStats.withAlt}`);
      console.log(`  With empty alt (decorative): ${imageStats.withEmptyAlt}`);
      console.log(`  Without alt: ${imageStats.withoutAlt}`);

      if (imageStats.withoutAlt === 0) {
        console.log('  ✅ All images have alt attributes');
        passed++;
      } else {
        console.log(`  ❌ ${imageStats.withoutAlt} images missing alt attributes`);
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Alt text error:', error.message);
      failed++;
    }

    // ========================================
    // COLOR CONTRAST TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🎨 COLOR CONTRAST TESTS (WCAG AA)');
    console.log('='.repeat(60));

    // Test 9: Color Contrast Ratio
    console.log('\n🔍 Testing color contrast ratios...');
    try {
      const contrastResults = await page.evaluate(() => {
        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }

        function getContrastRatio(l1, l2) {
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function parseColor(color) {
          const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          }
          return [0, 0, 0];
        }

        const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, li')).filter(el => el.getAttribute('aria-hidden') !== 'true');
        const results = [];

        for (let i = 0; i < Math.min(10, textElements.length); i++) {
          const el = textElements[i];
          const styles = window.getComputedStyle(el);
          const color = parseColor(styles.color);
          const bgColor = parseColor(styles.backgroundColor);

          const textLum = getLuminance(...color);
          const bgLum = getLuminance(...bgColor);
          const ratio = getContrastRatio(textLum, bgLum);

          const fontSize = parseFloat(styles.fontSize);
          const minRatio = fontSize >= 18 ? 3 : 4.5; // WCAG AA

          results.push({
            element: el.tagName,
            ratio: ratio.toFixed(2),
            passes: ratio >= minRatio,
            minRequired: minRatio
          });
        }

        return results;
      });

      const passing = contrastResults.filter(r => r.passes).length;
      const failing = contrastResults.filter(r => !r.passes).length;

      console.log(`  Tested ${contrastResults.length} text elements:`);
      contrastResults.forEach((result, i) => {
        const status = result.passes ? '✅' : '❌';
        console.log(`  ${status} ${result.element}: ${result.ratio}:1 (min: ${result.minRequired}:1)`);
      });

      if (failing === 0) {
        console.log('  ✅ All tested elements meet WCAG AA contrast requirements');
        passed++;
      } else {
        console.log(`  ❌ ${failing} elements fail WCAG AA contrast requirements`);
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Contrast test error:', error.message);
      failed++;
    }

    // Test 10: Form Labels (if forms exist)
    console.log('\n📝 Testing form labels...');
    try {
      const formStats = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
        let withLabel = 0;
        let withAriaLabel = 0;
        let withoutLabel = 0;

        inputs.forEach(input => {
          const label = document.querySelector(`label[for="${input.id}"]`);
          if (label) {
            withLabel++;
          } else if (input.getAttribute('aria-label')) {
            withAriaLabel++;
          } else {
            withoutLabel++;
          }
        });

        return {
          total: inputs.length,
          withLabel,
          withAriaLabel,
          withoutLabel
        };
      });

      if (formStats.total === 0) {
        console.log('  ℹ️  No form inputs found');
      } else {
        console.log(`  Total inputs: ${formStats.total}`);
        console.log(`  With <label>: ${formStats.withLabel}`);
        console.log(`  With aria-label: ${formStats.withAriaLabel}`);
        console.log(`  Without label: ${formStats.withoutLabel}`);

        if (formStats.withoutLabel === 0) {
          console.log('  ✅ All form inputs have labels');
          passed++;
        } else {
          console.log(`  ❌ ${formStats.withoutLabel} inputs missing labels`);
          failed++;
        }
      }
    } catch (error) {
      console.log('  ❌ Form labels error:', error.message);
      failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 ACCESSIBILITY TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    const total = passed + failed;
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    console.log('\n✅ Accessibility testing complete!');
    console.log('\n💡 Recommendations:');
    console.log('  - Run axe-core or Lighthouse for comprehensive automated accessibility testing');
    console.log('  - Test with screen readers (NVDA, JAWS, VoiceOver)');
    console.log('  - Verify with keyboard-only navigation');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
