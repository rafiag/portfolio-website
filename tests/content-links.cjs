// Content & Links Validation Testing Suite
// Tests external links, email/phone links, LinkedIn, resume PDF, meta tags

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 CONTENT & LINKS VALIDATION TEST SUITE');
  console.log('Testing all links and content integrity\n');

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  try {
    // ========================================
    // EXTERNAL LINKS TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('🔗 EXTERNAL LINKS TESTS');
    console.log('='.repeat(60));

    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });

    // Test 1: External Links with rel="noopener"
    console.log('\n🔐 Testing external links security (rel="noopener")...');
    try {
      const externalLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="http"]'));
        const results = [];

        links.forEach(link => {
          const href = link.href;
          const rel = link.rel;
          const target = link.target;
          const hasNoopener = rel.includes('noopener');
          const hasNoreferrer = rel.includes('noreferrer');

          results.push({
            href: href.substring(0, 50),
            target,
            rel,
            hasNoopener,
            hasNoreferrer,
            secure: hasNoopener || target !== '_blank'
          });
        });

        return results;
      });

      console.log(`  Found ${externalLinks.length} external links`);

      const insecureLinks = externalLinks.filter(link => !link.secure && link.target === '_blank');

      externalLinks.forEach(link => {
        const status = link.secure ? '✅' : '❌';
        console.log(`  ${status} ${link.href}...`);
        console.log(`     target="${link.target}" rel="${link.rel}"`);
      });

      if (insecureLinks.length === 0) {
        console.log('  ✅ All external links use rel="noopener"');
        passed++;
      } else {
        console.log(`  ❌ ${insecureLinks.length} external links missing rel="noopener"`);
        failed++;
      }
    } catch (error) {
      console.log('  ❌ External links error:', error.message);
      failed++;
    }

    // Test 2: Email Link (mailto:)
    console.log('\n📧 Testing email link...');
    try {
      const emailLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
        return links.map(link => ({
          href: link.href,
          text: link.textContent.trim()
        }));
      });

      if (emailLinks.length > 0) {
        console.log(`  Found ${emailLinks.length} email link(s):`);
        emailLinks.forEach(link => {
          console.log(`  ✅ ${link.href}`);
          if (link.href.includes('rafiatha.g@gmail.com')) {
            console.log('     Correct email address verified');
            passed++;
          }
        });
      } else {
        console.log('  ⚠️  No email links found');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Email link error:', error.message);
      failed++;
    }

    // Test 3: Phone Link (tel:)
    console.log('\n📱 Testing phone link...');
    try {
      const phoneLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="tel:"]'));
        return links.map(link => ({
          href: link.href,
          text: link.textContent.trim()
        }));
      });

      if (phoneLinks.length > 0) {
        console.log(`  Found ${phoneLinks.length} phone link(s):`);
        phoneLinks.forEach(link => {
          console.log(`  ✅ ${link.href}`);
          if (link.href.includes('+6282118764518')) {
            console.log('     Correct phone number verified');
            passed++;
          }
        });
      } else {
        console.log('  ⚠️  No phone links found');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Phone link error:', error.message);
      failed++;
    }

    // Test 4: LinkedIn Profile Link
    console.log('\n💼 Testing LinkedIn profile link...');
    try {
      const linkedInLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="linkedin.com"]'));
        return links.map(link => ({
          href: link.href,
          target: link.target,
          rel: link.rel
        }));
      });

      if (linkedInLinks.length > 0) {
        console.log(`  Found ${linkedInLinks.length} LinkedIn link(s):`);
        linkedInLinks.forEach(link => {
          console.log(`  ✅ ${link.href}`);
          console.log(`     target="${link.target}" rel="${link.rel}"`);

          if (link.target === '_blank' && link.rel.includes('noopener')) {
            console.log('     Security: OK');
            passed++;
          } else if (link.target !== '_blank') {
            console.log('     ⚠️  Opens in same tab');
            warnings++;
          } else {
            console.log('     ❌ Missing rel="noopener"');
            failed++;
          }
        });
      } else {
        console.log('  ⚠️  No LinkedIn link found');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ LinkedIn link error:', error.message);
      failed++;
    }

    // Test 5: Resume PDF Link
    console.log('\n📄 Testing resume PDF download link...');
    try {
      const resumeLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*=".pdf"], a[download*=".pdf"], a:has-text("resume"), a:has-text("CV")'));
        return links.map(link => ({
          href: link.href,
          download: link.download,
          text: link.textContent.trim().substring(0, 30)
        }));
      });

      if (resumeLinks.length > 0) {
        console.log(`  Found ${resumeLinks.length} potential resume link(s):`);
        resumeLinks.forEach(link => {
          console.log(`  ✅ ${link.text}: ${link.href}`);
          if (link.download) {
            console.log(`     Download attribute: "${link.download}"`);
          }
        });
        passed++;
      } else {
        console.log('  ⚠️  No resume PDF link found');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Resume link error:', error.message);
      failed++;
    }

    // ========================================
    // IMAGE TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🖼️  IMAGE VALIDATION TESTS');
    console.log('='.repeat(60));

    // Test 6: All Project Images Load
    console.log('\n📷 Testing project images...');
    try {
      await page.waitForTimeout(1000); // Wait for images to load
      const imageResults = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const results = [];

        images.forEach(img => {
          results.push({
            src: img.src.substring(img.src.lastIndexOf('/') + 1),
            alt: img.alt,
            loaded: img.complete && img.naturalWidth > 0,
            width: img.naturalWidth,
            height: img.naturalHeight
          });
        });

        return results;
      });

      console.log(`  Total images: ${imageResults.length}`);

      const loaded = imageResults.filter(img => img.loaded).length;
      const broken = imageResults.filter(img => !img.loaded).length;

      console.log(`  ✅ Loaded: ${loaded}`);
      if (broken > 0) {
        console.log(`  ❌ Broken: ${broken}`);
        imageResults.filter(img => !img.loaded).forEach(img => {
          console.log(`     - ${img.src}`);
        });
        failed++;
      } else {
        console.log('  ✅ All images loaded successfully');
        passed++;
      }

      // Check for missing alt text
      const missingAlt = imageResults.filter(img => !img.alt).length;
      if (missingAlt > 0) {
        console.log(`  ⚠️  ${missingAlt} images missing alt text`);
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Image test error:', error.message);
      failed++;
    }

    // ========================================
    // META TAGS TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('🏷️  META TAGS & SEO TESTS');
    console.log('='.repeat(60));

    // Test 7: Essential Meta Tags
    console.log('\n📋 Testing essential meta tags...');
    try {
      const metaTags = await page.evaluate(() => {
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || '',
          viewport: document.querySelector('meta[name="viewport"]')?.content || '',
          charset: document.querySelector('meta[charset]')?.getAttribute('charset') || '',
          ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
          ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
          ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
          ogUrl: document.querySelector('meta[property="og:url"]')?.content || '',
          twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || ''
        };
      });

      console.log(`  Title: "${metaTags.title}" (${metaTags.title.length} chars)`);
      if (metaTags.title && metaTags.title.length <= 60) {
        console.log('  ✅ Title tag is good (≤60 chars)');
        passed++;
      } else if (metaTags.title.length > 60) {
        console.log('  ⚠️  Title tag is too long (>60 chars)');
        warnings++;
      } else {
        console.log('  ❌ Title tag missing');
        failed++;
      }

      console.log(`  Description: "${metaTags.description}" (${metaTags.description.length} chars)`);
      if (metaTags.description && metaTags.description.length <= 160) {
        console.log('  ✅ Meta description is good (≤160 chars)');
        passed++;
      } else if (metaTags.description.length > 160) {
        console.log('  ⚠️  Meta description is too long (>160 chars)');
        warnings++;
      } else {
        console.log('  ❌ Meta description missing');
        failed++;
      }

      console.log(`  Viewport: "${metaTags.viewport}"`);
      if (metaTags.viewport) {
        console.log('  ✅ Viewport meta tag present');
        passed++;
      } else {
        console.log('  ❌ Viewport meta tag missing');
        failed++;
      }

      console.log(`  Charset: "${metaTags.charset}"`);
      if (metaTags.charset) {
        console.log('  ✅ Charset meta tag present');
        passed++;
      } else {
        console.log('  ❌ Charset meta tag missing');
        failed++;
      }

      // Open Graph tags
      console.log('\n  Open Graph Tags:');
      console.log(`    og:title: ${metaTags.ogTitle ? '✅' : '⚠️'} ${metaTags.ogTitle}`);
      console.log(`    og:description: ${metaTags.ogDescription ? '✅' : '⚠️'} ${metaTags.ogDescription}`);
      console.log(`    og:image: ${metaTags.ogImage ? '✅' : '⚠️'} ${metaTags.ogImage}`);
      console.log(`    og:url: ${metaTags.ogUrl ? '✅' : '⚠️'} ${metaTags.ogUrl}`);

      if (metaTags.ogTitle && metaTags.ogDescription) {
        console.log('  ✅ Basic Open Graph tags present');
        passed++;
      } else {
        console.log('  ⚠️  Some Open Graph tags missing');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Meta tags error:', error.message);
      failed++;
    }

    // Test 8: Favicon
    console.log('\n🎨 Testing favicon...');
    try {
      const favicon = await page.evaluate(() => {
        const icon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        return icon ? icon.href : null;
      });

      if (favicon) {
        console.log(`  ✅ Favicon found: ${favicon}`);
        passed++;
      } else {
        console.log('  ⚠️  No favicon found');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Favicon error:', error.message);
      failed++;
    }

    // ========================================
    // PORTFOLIO.HTML TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing portfolio.html');
    console.log('='.repeat(60));

    await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });

    // Test 9: Portfolio Page Meta Tags
    console.log('\n📋 Testing portfolio.html meta tags...');
    try {
      const portfolioMeta = await page.evaluate(() => {
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || ''
        };
      });

      console.log(`  Title: "${portfolioMeta.title}"`);
      console.log(`  Description: "${portfolioMeta.description}"`);

      if (portfolioMeta.title && portfolioMeta.description) {
        console.log('  ✅ Portfolio page has meta tags');
        passed++;
      } else {
        console.log('  ⚠️  Portfolio page missing some meta tags');
        warnings++;
      }
    } catch (error) {
      console.log('  ❌ Portfolio meta tags error:', error.message);
      failed++;
    }

    // Test 10: Broken Links Check
    console.log('\n🔗 Testing for broken internal links...');
    try {
      const internalLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]'));
        return links.map(link => link.href);
      });

      console.log(`  Found ${internalLinks.length} internal links`);

      let brokenLinks = 0;
      for (const link of internalLinks.slice(0, 10)) { // Test first 10 to save time
        try {
          const response = await page.goto(link, { timeout: 5000, waitUntil: 'domcontentloaded' });
          if (!response.ok()) {
            console.log(`  ❌ Broken: ${link} (${response.status()})`);
            brokenLinks++;
          }
        } catch (e) {
          console.log(`  ❌ Error loading: ${link}`);
          brokenLinks++;
        }
      }

      if (brokenLinks === 0) {
        console.log('  ✅ No broken internal links found');
        passed++;
      } else {
        console.log(`  ❌ ${brokenLinks} broken internal links`);
        failed++;
      }
    } catch (error) {
      console.log('  ❌ Broken links check error:', error.message);
      failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONTENT & LINKS TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    const total = passed + failed;
    if (total > 0) {
      console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    }
    console.log('='.repeat(60));

    console.log('\n✅ Content & Links validation testing complete!');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
