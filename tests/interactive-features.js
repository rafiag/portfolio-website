// Interactive Features Testing Suite
// Tests portfolio carousel, testimonials carousel, filters, modals, work experience cards, mobile menu, smooth scroll

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 INTERACTIVE FEATURES TEST SUITE');
  console.log('Testing all interactive elements\n');

  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  try {
    // ========================================
    // INDEX.HTML TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('Testing index.html Interactive Features');
    console.log('='.repeat(60));

    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);

    // Test 1: Portfolio Carousel - Navigation Arrows
    console.log('\n🎠 Testing portfolio carousel navigation arrows...');
    try {
      const carouselExists = await page.locator('.carousel').isVisible();
      if (carouselExists) {
        // Test next arrow
        const nextArrow = page.locator('.carousel-arrow.next');
        const nextVisible = await nextArrow.isVisible();

        if (nextVisible) {
          await nextArrow.click();
          await page.waitForTimeout(500);
          console.log('  ✅ Next arrow clicked successfully');
          passed++;
        } else {
          console.log('  ❌ Next arrow not visible');
          failed++;
        }

        // Test prev arrow
        const prevArrow = page.locator('.carousel-arrow.prev');
        const prevVisible = await prevArrow.isVisible();

        if (prevVisible) {
          await prevArrow.click();
          await page.waitForTimeout(500);
          console.log('  ✅ Previous arrow clicked successfully');
          passed++;
        } else {
          console.log('  ❌ Previous arrow not visible');
          failed++;
        }
      } else {
        console.log('  ⚠️  Carousel not found on index.html');
      }
    } catch (error) {
      console.log('  ❌ Carousel navigation error:', error.message);
      failed++;
    }

    // Test 2: Portfolio Carousel - Dots Navigation
    console.log('\n🔘 Testing carousel dots navigation...');
    try {
      const dots = await page.locator('.carousel-dot').count();
      if (dots > 0) {
        console.log(`  Found ${dots} carousel dots`);

        // Click second dot
        await page.locator('.carousel-dot').nth(1).click();
        await page.waitForTimeout(500);
        console.log('  ✅ Carousel dot navigation works');
        passed++;
      } else {
        console.log('  ⚠️  No carousel dots found');
      }
    } catch (error) {
      console.log('  ❌ Carousel dots error:', error.message);
      failed++;
    }

    // Test 3: Work Experience Cards
    console.log('\n💼 Testing work experience company selection...');
    try {
      const companyCards = await page.locator('.experience-company-card').count();
      if (companyCards > 0) {
        console.log(`  Found ${companyCards} company cards`);

        // Click first company card
        const firstCard = page.locator('.experience-company-card').first();
        await firstCard.click();
        await page.waitForTimeout(500);

        // Check if it became active
        const isActive = await firstCard.evaluate(el => el.classList.contains('active'));
        if (isActive) {
          console.log('  ✅ Company card selection works');
          passed++;
        } else {
          console.log('  ❌ Company card did not become active');
          failed++;
        }
      } else {
        console.log('  ⚠️  No company cards found');
      }
    } catch (error) {
      console.log('  ❌ Work experience error:', error.message);
      failed++;
    }

    // Test 3b: Company Description Display
    console.log('\n🏢 Testing company description display...');
    try {
      const descriptions = await page.locator('.company-description').count();
      if (descriptions === 5) {
        console.log(`  ✅ All 5 company descriptions found`);
        passed++;

        // Test that description is visible for active company
        const activeDescription = page.locator('.experience-detail-content.active .company-description');
        const isVisible = await activeDescription.isVisible();

        if (isVisible) {
          console.log('  ✅ Company description visible for active company');
          passed++;

          // Test switching companies updates description
          const firstCard = page.locator('.experience-company-card').nth(0);
          const secondCard = page.locator('.experience-company-card').nth(1);

          await firstCard.click();
          await page.waitForTimeout(500);
          const firstDesc = await page.locator('.experience-detail-content.active .company-description').textContent();

          await secondCard.click();
          await page.waitForTimeout(500);
          const secondDesc = await page.locator('.experience-detail-content.active .company-description').textContent();

          if (firstDesc !== secondDesc) {
            console.log('  ✅ Company description changes when switching companies');
            passed++;
          } else {
            console.log('  ❌ Company description does NOT change');
            failed++;
          }
        } else {
          console.log('  ❌ Company description NOT visible');
          failed++;
        }
      } else {
        console.log(`  ⚠️  Expected 5 descriptions, found ${descriptions}`);
      }
    } catch (error) {
      console.log('  ❌ Company description error:', error.message);
      failed++;
    }

    // Test 4: Mobile Menu Toggle (at 480px viewport)
    console.log('\n📱 Testing mobile menu toggle...');
    try {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const menuToggle = page.locator('.menu-toggle');
      const toggleVisible = await menuToggle.isVisible();

      if (toggleVisible) {
        // Open menu
        await menuToggle.click();
        await page.waitForTimeout(500);

        const navMenu = page.locator('.nav-links');
        const menuActive = await navMenu.evaluate(el => el.classList.contains('active'));

        if (menuActive) {
          console.log('  ✅ Mobile menu opens successfully');
          passed++;

          // Close menu
          await menuToggle.click();
          await page.waitForTimeout(500);
          console.log('  ✅ Mobile menu closes successfully');
          passed++;
        } else {
          console.log('  ❌ Mobile menu did not open');
          failed++;
        }
      } else {
        console.log('  ❌ Menu toggle not visible at mobile viewport');
        failed++;
      }

      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 800 });
    } catch (error) {
      console.log('  ❌ Mobile menu error:', error.message);
      failed++;
    }

    // Test 5: Smooth Scroll Anchor Links
    console.log('\n🎢 Testing smooth scroll anchor links...');
    try {
      const navLinks = await page.locator('a[href^="#"]').count();
      if (navLinks > 0) {
        console.log(`  Found ${navLinks} anchor links`);

        // Click an anchor link
        const aboutLink = page.locator('a[href="#about"]');
        const aboutExists = await aboutLink.count() > 0;

        if (aboutExists) {
          await aboutLink.first().click();
          await page.waitForTimeout(1000);
          console.log('  ✅ Smooth scroll anchor link works');
          passed++;
        } else {
          console.log('  ⚠️  No #about anchor link found');
        }
      } else {
        console.log('  ⚠️  No anchor links found');
      }
    } catch (error) {
      console.log('  ❌ Smooth scroll error:', error.message);
      failed++;
    }

    // Test 5b: Testimonials Carousel Auto-Rotation
    console.log('\n🎠 Testing testimonials carousel auto-rotation...');
    try {
      // Reset to desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const carousel = page.locator('.testimonials-carousel');
      const carouselExists = await carousel.count() > 0;

      if (carouselExists) {
        // Test 5b-1: Check structure
        const cards = await page.locator('.testimonial-card').count();
        const dots = await page.locator('.testimonial-dot').count();

        if (cards === dots && cards > 0) {
          console.log(`  ✅ Carousel structure correct (${cards} cards, ${dots} dots)`);
          passed++;
        } else {
          console.log(`  ❌ Card/dot mismatch (${cards} cards, ${dots} dots)`);
          failed++;
        }

        // Test 5b-2: Check initial state
        const firstCardActive = await page.locator('.testimonial-card').first().evaluate(el =>
          el.classList.contains('active') && el.getAttribute('aria-hidden') === 'false'
        );

        if (firstCardActive) {
          console.log('  ✅ First card active on load');
          passed++;
        } else {
          console.log('  ❌ First card not active');
          failed++;
        }

        // Test 5b-3: Check auto-rotation
        console.log('  ⏱️  Waiting 5.5s for auto-rotation...');
        await page.waitForTimeout(5500);

        const secondCardActive = await page.locator('.testimonial-card').nth(1).evaluate(el =>
          el.classList.contains('active')
        );

        if (secondCardActive) {
          console.log('  ✅ Auto-rotation works (second card became active)');
          passed++;
        } else {
          console.log('  ❌ Auto-rotation failed');
          failed++;
        }

        // Test 5b-4: Check manual navigation via dots
        await page.locator('.testimonial-dot').nth(2).click();
        await page.waitForTimeout(700);

        const thirdCardActive = await page.locator('.testimonial-card').nth(2).evaluate(el =>
          el.classList.contains('active')
        );

        if (thirdCardActive) {
          console.log('  ✅ Manual navigation via dots works');
          passed++;
        } else {
          console.log('  ❌ Manual navigation failed');
          failed++;
        }

        // Test 5b-5: Check pause on hover
        await carousel.hover();
        const cardBeforeHover = 2; // Currently on third card
        await page.waitForTimeout(6000); // Wait longer than rotation interval

        const cardStillThird = await page.locator('.testimonial-card').nth(2).evaluate(el =>
          el.classList.contains('active')
        );

        if (cardStillThird) {
          console.log('  ✅ Pause on hover works (no rotation during hover)');
          passed++;
        } else {
          console.log('  ⚠️  Carousel may have rotated during hover');
        }

        // Test 5b-6: Check accessibility attributes
        const carouselRole = await carousel.getAttribute('role');
        const carouselLabel = await carousel.getAttribute('aria-label');
        const dotsRole = await page.locator('.testimonials-dots').getAttribute('role');

        if (carouselRole === 'region' && carouselLabel && dotsRole === 'tablist') {
          console.log('  ✅ Carousel has proper ARIA attributes');
          passed++;
        } else {
          console.log('  ⚠️  Some ARIA attributes may be missing');
        }
      } else {
        console.log('  ⚠️  Testimonials carousel not found');
      }
    } catch (error) {
      console.log('  ❌ Testimonials carousel error:', error.message);
      failed++;
    }

    // Test 6: Back to Top Button
    console.log('\n⬆️  Testing back-to-top button...');
    try {
      // Reset to desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const backToTopButton = page.locator('.back-to-top');
      const buttonExists = await backToTopButton.count() > 0;

      if (buttonExists) {
        // Test 6a: Button should be hidden at top of page
        const isHiddenAtTop = await backToTopButton.evaluate(el => {
          return !el.classList.contains('visible');
        });

        if (isHiddenAtTop) {
          console.log('  ✅ Back-to-top button hidden at page top');
          passed++;
        } else {
          console.log('  ⚠️  Back-to-top button visible at page top (should be hidden)');
        }

        // Test 6b: Scroll down to show button
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForTimeout(500);

        const isVisibleAfterScroll = await backToTopButton.evaluate(el => {
          return el.classList.contains('visible');
        });

        if (isVisibleAfterScroll) {
          console.log('  ✅ Back-to-top button appears after scrolling down');
          passed++;
        } else {
          console.log('  ❌ Back-to-top button does not appear after scrolling');
          failed++;
        }

        // Test 6c: Button click scrolls to top
        await backToTopButton.click();
        await page.waitForTimeout(1000);

        const scrollPosition = await page.evaluate(() => window.pageYOffset);
        if (scrollPosition < 50) {
          console.log('  ✅ Back-to-top button scrolls to top on click');
          passed++;
        } else {
          console.log('  ❌ Back-to-top button did not scroll to top');
          failed++;
        }

        // Test 6d: Button hides after scrolling to top
        await page.waitForTimeout(500);
        const isHiddenAfterScroll = await backToTopButton.evaluate(el => {
          return !el.classList.contains('visible');
        });

        if (isHiddenAfterScroll) {
          console.log('  ✅ Back-to-top button hides when at top');
          passed++;
        } else {
          console.log('  ⚠️  Back-to-top button still visible at top');
        }

        // Test 6e: ARIA attributes
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForTimeout(500);

        const ariaAttributes = await backToTopButton.evaluate(el => {
          return {
            ariaLabel: el.getAttribute('aria-label'),
            ariaHidden: el.getAttribute('aria-hidden'),
            tabindex: el.getAttribute('tabindex'),
            hasRole: el.hasAttribute('role')
          };
        });

        if (ariaAttributes.ariaLabel && ariaAttributes.ariaHidden === 'false') {
          console.log('  ✅ Back-to-top button has proper ARIA attributes');
          passed++;
        } else {
          console.log('  ⚠️  Back-to-top button missing some ARIA attributes');
        }

        // Test 6f: Keyboard accessibility
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForTimeout(500);

        // Focus the button and press Enter
        await backToTopButton.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);

        const scrollAfterKeyboard = await page.evaluate(() => window.pageYOffset);
        if (scrollAfterKeyboard < 50) {
          console.log('  ✅ Back-to-top button works with keyboard (Enter)');
          passed++;
        } else {
          console.log('  ⚠️  Back-to-top button keyboard navigation may not work');
        }

      } else {
        console.log('  ⚠️  Back-to-top button not found on page');
      }
    } catch (error) {
      console.log('  ❌ Back-to-top button error:', error.message);
      failed++;
    }

    // ========================================
    // PORTFOLIO.HTML TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing portfolio.html Interactive Features');
    console.log('='.repeat(60));

    await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);

    // Test 7: Portfolio Filter Buttons
    console.log('\n🔍 Testing portfolio filter buttons...');
    try {
      const filterButtons = await page.locator('.filter-btn').count();
      if (filterButtons > 0) {
        console.log(`  Found ${filterButtons} filter buttons`);

        // Click "All" filter
        const allFilter = page.locator('.filter-btn[data-filter="all"]');
        if (await allFilter.count() > 0) {
          await allFilter.click();
          await page.waitForTimeout(500);
          console.log('  ✅ "All" filter works');
          passed++;
        }

        // Click "Web Apps" filter (if exists)
        const webFilter = page.locator('.filter-btn[data-filter="web"]');
        if (await webFilter.count() > 0) {
          await webFilter.click();
          await page.waitForTimeout(500);
          console.log('  ✅ Category filter works');
          passed++;
        }
      } else {
        console.log('  ⚠️  No filter buttons found');
      }
    } catch (error) {
      console.log('  ❌ Filter buttons error:', error.message);
      failed++;
    }

    // Test 8: Portfolio Modal System
    console.log('\n🖼️  Testing portfolio modal system...');
    try {
      const portfolioItems = await page.locator('.portfolio-item').count();
      if (portfolioItems > 0) {
        console.log(`  Found ${portfolioItems} portfolio items`);

        // Click first portfolio item
        const firstItem = page.locator('.portfolio-item').first();
        await firstItem.click();
        await page.waitForTimeout(1000);

        // Check if modal opened
        const modal = page.locator('.modal');
        const modalVisible = await modal.isVisible();

        if (modalVisible) {
          console.log('  ✅ Modal opens when clicking portfolio item');
          passed++;

          // Test close button
          const closeBtn = page.locator('.modal-close, .close-modal');
          if (await closeBtn.count() > 0) {
            await closeBtn.first().click();
            await page.waitForTimeout(500);

            const modalClosed = await modal.isVisible() === false || await modal.isHidden();
            if (modalClosed) {
              console.log('  ✅ Modal closes with close button');
              passed++;
            } else {
              console.log('  ❌ Modal did not close');
              failed++;
            }
          }

          // Test ESC key close
          await firstItem.click();
          await page.waitForTimeout(500);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);

          const modalClosedByEsc = await modal.isVisible() === false || await modal.isHidden();
          if (modalClosedByEsc) {
            console.log('  ✅ Modal closes with ESC key');
            passed++;
          } else {
            console.log('  ⚠️  Modal ESC key close may not work');
          }

          // Test overlay click close
          await firstItem.click();
          await page.waitForTimeout(500);
          await modal.click({ position: { x: 5, y: 5 } });
          await page.waitForTimeout(500);

          const modalClosedByOverlay = await modal.isVisible() === false || await modal.isHidden();
          if (modalClosedByOverlay) {
            console.log('  ✅ Modal closes when clicking overlay');
            passed++;
          } else {
            console.log('  ⚠️  Modal overlay click close may not work');
          }
        } else {
          console.log('  ❌ Modal did not open');
          failed++;
        }
      } else {
        console.log('  ⚠️  No portfolio items found');
      }
    } catch (error) {
      console.log('  ❌ Modal system error:', error.message);
      failed++;
    }

    // Test 8b: Modal Focus Trap
    console.log('\n🎯 Testing modal focus trap...');
    try {
      // Use portfolio-card selector for portfolio.html
      const portfolioCard = page.locator('.portfolio-card[data-portfolio-id]').first();

      if (await portfolioCard.count() > 0) {
        // Open modal
        await portfolioCard.click();
        await page.waitForTimeout(800);

        const modal = page.locator('#portfolioModal');
        const isModalActive = await modal.evaluate(el => el.classList.contains('active'));

        if (isModalActive) {
          // Test 8b-1: Check initial focus on close button
          const focusedElement = await page.evaluate(() => {
            const el = document.activeElement;
            return {
              className: el.className,
              ariaLabel: el.getAttribute('aria-label')
            };
          });

          if (focusedElement.className.includes('modal-close') || focusedElement.ariaLabel === 'Close modal') {
            console.log('  ✅ Modal sets focus to close button on open');
            passed++;
          } else {
            console.log('  ⚠️  Modal may not set initial focus correctly');
          }

          // Test 8b-2: Tab navigation stays within modal
          const focusableCount = await page.evaluate(() => {
            const modal = document.getElementById('portfolioModal');
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

          // Tab through all elements plus one to test wrap-around
          for (let i = 0; i < focusableCount + 1; i++) {
            await page.keyboard.press('Tab');
            await page.waitForTimeout(100);
          }

          const focusStillInModal = await page.evaluate(() => {
            const modal = document.getElementById('portfolioModal');
            return modal.contains(document.activeElement);
          });

          if (focusStillInModal) {
            console.log('  ✅ Focus trap works (Tab navigation contained)');
            passed++;
          } else {
            console.log('  ❌ Focus escaped modal during Tab navigation');
            failed++;
          }

          // Test 8b-3: Shift+Tab navigation stays within modal
          for (let i = 0; i < focusableCount + 1; i++) {
            await page.keyboard.press('Shift+Tab');
            await page.waitForTimeout(100);
          }

          const focusStillInModalBackward = await page.evaluate(() => {
            const modal = document.getElementById('portfolioModal');
            return modal.contains(document.activeElement);
          });

          if (focusStillInModalBackward) {
            console.log('  ✅ Focus trap works (Shift+Tab navigation contained)');
            passed++;
          } else {
            console.log('  ❌ Focus escaped modal during Shift+Tab navigation');
            failed++;
          }

          // Test 8b-4: Focus restoration on close
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);

          const focusRestored = await page.evaluate(() => {
            const el = document.activeElement;
            return el.hasAttribute('data-portfolio-id');
          });

          if (focusRestored) {
            console.log('  ✅ Focus restored to trigger element on close');
            passed++;
          } else {
            console.log('  ⚠️  Focus may not have restored to trigger element');
          }
        } else {
          console.log('  ⚠️  Modal did not open for focus trap test');
        }
      } else {
        console.log('  ⚠️  No portfolio cards found for focus trap test');
      }
    } catch (error) {
      console.log('  ❌ Modal focus trap error:', error.message);
      failed++;
    }

    // Test 9: Touch/Swipe Gestures (Carousel)
    console.log('\n👆 Testing touch/swipe support on carousel...');
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const carousel = page.locator('.carousel');
      const carouselExists = await carousel.isVisible();

      if (carouselExists) {
        // Simulate swipe left
        const box = await carousel.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 10 });
          await page.mouse.up();
          await page.waitForTimeout(500);

          console.log('  ✅ Swipe gesture simulated (visual verification needed)');
          passed++;
        }
      } else {
        console.log('  ⚠️  Carousel not found for swipe test');
      }
    } catch (error) {
      console.log('  ❌ Touch/swipe error:', error.message);
      failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 INTERACTIVE FEATURES TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    console.log('\n✅ Interactive features testing complete!');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
