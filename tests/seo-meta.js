// SEO & Meta Tags Testing Suite
// Tests meta tags, Open Graph, Twitter Cards, structured data, canonical URLs, sitemap, robots.txt

const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8000';

(async () => {
  console.log('\n🎯 SEO & META TAGS TEST SUITE');
  console.log('Testing SEO optimization and metadata\n');

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  try {
    // ========================================
    // INDEX.HTML SEO TESTS
    // ========================================
    console.log('='.repeat(60));
    console.log('Testing index.html SEO & Meta Tags');
    console.log('='.repeat(60));

    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });

    // Test 1: Title Tag
    console.log('\n📝 Testing title tag...');
    const metaData = await page.evaluate(() => {
      return {
        title: document.title,
        titleLength: document.title.length,
        description: document.querySelector('meta[name="description"]')?.content || '',
        descLength: (document.querySelector('meta[name="description"]')?.content || '').length,
        keywords: document.querySelector('meta[name="keywords"]')?.content || '',
        author: document.querySelector('meta[name="author"]')?.content || '',
        viewport: document.querySelector('meta[name="viewport"]')?.content || '',
        charset: document.querySelector('meta[charset]')?.getAttribute('charset') || '',
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        language: document.documentElement.lang || ''
      };
    });

    console.log(`  Title: "${metaData.title}" (${metaData.titleLength} chars)`);
    if (metaData.title && metaData.titleLength >= 30 && metaData.titleLength <= 60) {
      console.log(`  ✅ Title tag is optimal (30-60 chars)`);
      passed++;
    } else if (metaData.title && metaData.titleLength <= 70) {
      console.log(`  ⚠️  Title tag acceptable but could be improved`);
      warnings++;
    } else if (!metaData.title) {
      console.log(`  ❌ Title tag is missing`);
      failed++;
    } else {
      console.log(`  ⚠️  Title tag length not optimal (${metaData.titleLength} chars)`);
      warnings++;
    }

    // Test 2: Meta Description
    console.log('\n📄 Testing meta description...');
    console.log(`  Description: "${metaData.description}" (${metaData.descLength} chars)`);
    if (metaData.description && metaData.descLength >= 120 && metaData.descLength <= 160) {
      console.log(`  ✅ Meta description is optimal (120-160 chars)`);
      passed++;
    } else if (metaData.description && metaData.descLength <= 170) {
      console.log(`  ⚠️  Meta description acceptable but could be improved`);
      warnings++;
    } else if (!metaData.description) {
      console.log(`  ❌ Meta description is missing`);
      failed++;
    } else {
      console.log(`  ⚠️  Meta description length not optimal (${metaData.descLength} chars)`);
      warnings++;
    }

    // Test 3: Viewport Meta Tag
    console.log('\n📱 Testing viewport meta tag...');
    console.log(`  Viewport: "${metaData.viewport}"`);
    if (metaData.viewport.includes('width=device-width')) {
      console.log(`  ✅ Viewport meta tag is correct`);
      passed++;
    } else if (metaData.viewport) {
      console.log(`  ⚠️  Viewport meta tag present but may need adjustment`);
      warnings++;
    } else {
      console.log(`  ❌ Viewport meta tag is missing`);
      failed++;
    }

    // Test 4: Language Attribute
    console.log('\n🌐 Testing language attribute...');
    console.log(`  Language: "${metaData.language}"`);
    if (metaData.language) {
      console.log(`  ✅ Language attribute is set`);
      passed++;
    } else {
      console.log(`  ⚠️  Language attribute missing (recommended for SEO)`);
      warnings++;
    }

    // Test 5: Robots Meta Tag
    console.log('\n🤖 Testing robots meta tag...');
    if (metaData.robots) {
      console.log(`  Robots: "${metaData.robots}"`);
      console.log(`  ✅ Robots meta tag is set`);
      passed++;
    } else {
      console.log(`  ℹ️  No robots meta tag (defaults to index,follow)`);
    }

    // Test 6: Canonical URL
    console.log('\n🔗 Testing canonical URL...');
    if (metaData.canonical) {
      console.log(`  Canonical: "${metaData.canonical}"`);
      console.log(`  ✅ Canonical URL is set`);
      passed++;
    } else {
      console.log(`  ⚠️  Canonical URL missing (recommended for production)`);
      warnings++;
    }

    // Test 7: Open Graph Tags
    console.log('\n📱 Testing Open Graph tags...');
    const ogTags = await page.evaluate(() => {
      return {
        'og:title': document.querySelector('meta[property="og:title"]')?.content || '',
        'og:description': document.querySelector('meta[property="og:description"]')?.content || '',
        'og:image': document.querySelector('meta[property="og:image"]')?.content || '',
        'og:url': document.querySelector('meta[property="og:url"]')?.content || '',
        'og:type': document.querySelector('meta[property="og:type"]')?.content || '',
        'og:site_name': document.querySelector('meta[property="og:site_name"]')?.content || '',
        'og:locale': document.querySelector('meta[property="og:locale"]')?.content || ''
      };
    });

    const requiredOG = ['og:title', 'og:description', 'og:image', 'og:url'];
    const missingOG = requiredOG.filter(tag => !ogTags[tag]);

    Object.entries(ogTags).forEach(([tag, content]) => {
      const status = content ? '✅' : '⚠️';
      console.log(`  ${status} ${tag}: ${content || 'missing'}`);
    });

    if (missingOG.length === 0) {
      console.log(`  ✅ All required Open Graph tags present`);
      passed++;
    } else {
      console.log(`  ⚠️  Missing Open Graph tags: ${missingOG.join(', ')}`);
      warnings++;
    }

    // Test 8: Twitter Card Tags
    console.log('\n🐦 Testing Twitter Card tags...');
    const twitterTags = await page.evaluate(() => {
      return {
        'twitter:card': document.querySelector('meta[name="twitter:card"]')?.content || '',
        'twitter:title': document.querySelector('meta[name="twitter:title"]')?.content || '',
        'twitter:description': document.querySelector('meta[name="twitter:description"]')?.content || '',
        'twitter:image': document.querySelector('meta[name="twitter:image"]')?.content || '',
        'twitter:site': document.querySelector('meta[name="twitter:site"]')?.content || '',
        'twitter:creator': document.querySelector('meta[name="twitter:creator"]')?.content || ''
      };
    });

    const hasTwitterCard = twitterTags['twitter:card'];
    Object.entries(twitterTags).forEach(([tag, content]) => {
      const status = content ? '✅' : '⚠️';
      console.log(`  ${status} ${tag}: ${content || 'missing'}`);
    });

    if (hasTwitterCard) {
      console.log(`  ✅ Twitter Card is configured`);
      passed++;
    } else {
      console.log(`  ⚠️  Twitter Card not configured (recommended for Twitter sharing)`);
      warnings++;
    }

    // Test 9: Structured Data (JSON-LD)
    console.log('\n📊 Testing structured data (JSON-LD)...');
    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent);
        } catch (e) {
          return { error: 'Invalid JSON' };
        }
      });
    });

    if (structuredData.length > 0) {
      console.log(`  ✅ Found ${structuredData.length} structured data block(s)`);
      structuredData.forEach((data, i) => {
        if (data['@type']) {
          console.log(`     ${i + 1}. Type: ${data['@type']}`);
          passed++;
        } else if (data.error) {
          console.log(`     ${i + 1}. ❌ ${data.error}`);
          failed++;
        }
      });
    } else {
      console.log(`  ⚠️  No structured data found (recommended for rich snippets)`);
      warnings++;
    }

    // Test 10: Headings Hierarchy
    console.log('\n📑 Testing headings hierarchy...');
    const headings = await page.evaluate(() => {
      const h1s = document.querySelectorAll('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');
      const h4s = document.querySelectorAll('h4');
      const h5s = document.querySelectorAll('h5');
      const h6s = document.querySelectorAll('h6');

      return {
        h1: { count: h1s.length, text: Array.from(h1s).map(h => h.textContent.trim()) },
        h2: { count: h2s.length },
        h3: { count: h3s.length },
        h4: { count: h4s.length },
        h5: { count: h5s.length },
        h6: { count: h6s.length }
      };
    });

    console.log(`  H1: ${headings.h1.count} (${headings.h1.text.join(', ').substring(0, 50)}...)`);
    console.log(`  H2: ${headings.h2.count}, H3: ${headings.h3.count}, H4: ${headings.h4.count}, H5: ${headings.h5.count}, H6: ${headings.h6.count}`);

    if (headings.h1.count === 1) {
      console.log(`  ✅ Exactly one H1 tag (SEO best practice)`);
      passed++;
    } else if (headings.h1.count === 0) {
      console.log(`  ❌ No H1 tag found`);
      failed++;
    } else {
      console.log(`  ⚠️  Multiple H1 tags (${headings.h1.count}) - should be only one`);
      warnings++;
    }

    // ========================================
    // PORTFOLIO.HTML SEO TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing portfolio.html SEO & Meta Tags');
    console.log('='.repeat(60));

    await page.goto(`${TARGET_URL}/portfolio.html`, { waitUntil: 'networkidle', timeout: 10000 });

    const portfolioMeta = await page.evaluate(() => {
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || ''
      };
    });

    console.log(`\n📝 Portfolio page title: "${portfolioMeta.title}"`);
    console.log(`📄 Portfolio page description: "${portfolioMeta.description}"`);

    if (portfolioMeta.title && portfolioMeta.description) {
      console.log(`  ✅ Portfolio page has proper meta tags`);
      passed++;
    } else {
      console.log(`  ⚠️  Portfolio page missing some meta tags`);
      warnings++;
    }

    // ========================================
    // EXTERNAL RESOURCES TESTS
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('Testing External Resources (robots.txt, sitemap.xml)');
    console.log('='.repeat(60));

    // Test 11: robots.txt
    console.log('\n🤖 Testing robots.txt...');
    try {
      const robotsResponse = await page.goto(`${TARGET_URL}/robots.txt`, { timeout: 5000 });
      if (robotsResponse && robotsResponse.ok()) {
        const robotsContent = await robotsResponse.text();
        console.log(`  ✅ robots.txt found`);
        console.log(`     Preview: ${robotsContent.substring(0, 100)}...`);
        passed++;
      } else {
        console.log(`  ⚠️  robots.txt not found (recommended for production)`);
        warnings++;
      }
    } catch (e) {
      console.log(`  ⚠️  robots.txt not found (recommended for production)`);
      warnings++;
    }

    // Test 12: sitemap.xml
    console.log('\n🗺️  Testing sitemap.xml...');
    try {
      const sitemapResponse = await page.goto(`${TARGET_URL}/sitemap.xml`, { timeout: 5000 });
      if (sitemapResponse && sitemapResponse.ok()) {
        const sitemapContent = await sitemapResponse.text();
        console.log(`  ✅ sitemap.xml found`);
        console.log(`     Preview: ${sitemapContent.substring(0, 100)}...`);
        passed++;
      } else {
        console.log(`  ⚠️  sitemap.xml not found (recommended for SEO)`);
        warnings++;
      }
    } catch (e) {
      console.log(`  ⚠️  sitemap.xml not found (recommended for SEO)`);
      warnings++;
    }

    // Test 13: Favicon
    console.log('\n🎨 Testing favicon...');
    const favicon = await page.evaluate(() => {
      const icons = [];
      document.querySelectorAll('link[rel*="icon"]').forEach(link => {
        icons.push({
          rel: link.rel,
          href: link.href,
          sizes: link.sizes ? link.sizes.toString() : ''
        });
      });
      return icons;
    });

    if (favicon.length > 0) {
      console.log(`  ✅ Found ${favicon.length} favicon(s)`);
      favicon.forEach(icon => {
        console.log(`     ${icon.rel}: ${icon.href} ${icon.sizes ? `(${icon.sizes})` : ''}`);
      });
      passed++;
    } else {
      console.log(`  ⚠️  No favicon found`);
      warnings++;
    }

    // Test 14: Image Alt Tags (SEO)
    console.log('\n🖼️  Testing image alt attributes for SEO...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    const imageAltStats = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const withAlt = images.filter(img => img.alt && img.alt.trim().length > 0).length;
      const emptyAlt = images.filter(img => img.hasAttribute('alt') && img.alt.trim().length === 0).length;
      const noAlt = images.filter(img => !img.hasAttribute('alt')).length;

      return {
        total: images.length,
        withAlt,
        emptyAlt,
        noAlt
      };
    });

    console.log(`  Total images: ${imageAltStats.total}`);
    console.log(`  With descriptive alt: ${imageAltStats.withAlt}`);
    console.log(`  With empty alt (decorative): ${imageAltStats.emptyAlt}`);
    console.log(`  Without alt: ${imageAltStats.noAlt}`);

    if (imageAltStats.noAlt === 0) {
      console.log(`  ✅ All images have alt attributes (good for SEO)`);
      passed++;
    } else {
      console.log(`  ❌ ${imageAltStats.noAlt} images missing alt attributes`);
      failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SEO & META TAGS TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    const total = passed + failed;
    if (total > 0) {
      console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    }
    console.log('='.repeat(60));

    console.log('\n💡 SEO Recommendations:');
    console.log('  - Ensure all meta descriptions are 120-160 characters');
    console.log('  - Add canonical URLs when site is deployed');
    console.log('  - Create robots.txt and sitemap.xml for production');
    console.log('  - Consider adding Twitter Card meta tags');
    console.log('  - Implement structured data (JSON-LD) for rich snippets');
    console.log('  - Use exactly one H1 per page');
    console.log('  - Set og:url when deployed to production domain');

    console.log('\n✅ SEO & Meta tags testing complete!');

  } catch (error) {
    console.log('\n❌ Critical error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();
