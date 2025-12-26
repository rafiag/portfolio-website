/**
 * HTML Minification Script
 * Minifies HTML files and updates references to minified assets
 */

import { readFileSync, writeFileSync, copyFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { minify } from 'html-minifier-terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📄 Minifying HTML...');

const htmlFiles = ['index.html', 'portfolio.html'];

async function minifyHtml(filename) {
    const inputPath = join(rootDir, filename);
    const outputPath = join(rootDir, 'dist', filename);

    let html = readFileSync(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(html, 'utf8');

    // Update asset references to minified versions
    html = html.replace(/src="js\/main-index\.js"/g, 'src="js/main-index.min.js"');
    html = html.replace(/src="js\/main-portfolio\.js"/g, 'src="js/main-portfolio.min.js"');
    html = html.replace(/src="js\/browser-check\.js"/g, 'src="js/browser-check.min.js"');
    html = html.replace(/src="js\/ga4-init\.js"/g, 'src="js/ga4-init.min.js"');
    html = html.replace(/href="css\/style\.css"/g, 'href="css/style.min.css"');

    // Minify HTML
    const minified = await minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
        removeEmptyAttributes: false, // Keep empty alt attributes for accessibility
        conservativeCollapse: true // Preserve line breaks where needed
    });

    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    writeFileSync(outputPath, minified, 'utf8');

    console.log(`  ✓ ${filename}`);
    console.log(`    ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
}

// Minify all HTML files
for (const file of htmlFiles) {
    await minifyHtml(file);
}

// Copy static assets
console.log('\n📦 Copying static assets...');

// Copy assets directory (images, PDFs, etc.)
const assetsToCopy = [
    { from: 'assets/resume.pdf', to: 'dist/assets/resume.pdf' },
    { from: 'assets/og-image.webp', to: 'dist/assets/og-image.webp' },
    { from: 'assets/images/profile.webp', to: 'dist/assets/images/profile.webp' },
    { from: 'favicon.ico', to: 'dist/favicon.ico' },
    { from: 'assets/images/favicon-16x16.png', to: 'dist/assets/images/favicon-16x16.png' },
    { from: 'assets/images/favicon-32x32.png', to: 'dist/assets/images/favicon-32x32.png' },
    { from: 'assets/images/apple-touch-icon.png', to: 'dist/assets/images/apple-touch-icon.png' },
];

// Copy company logos
const companiesDir = join(rootDir, 'assets', 'images', 'companies');
const companyLogos = readdirSync(companiesDir);
companyLogos.forEach(logo => {
    assetsToCopy.push({
        from: `assets/images/companies/${logo}`,
        to: `dist/assets/images/companies/${logo}`
    });
});

// Copy portfolio images
const portfolioDir = join(rootDir, 'assets', 'images', 'portfolio');
const portfolioImages = readdirSync(portfolioDir);
portfolioImages.forEach(image => {
    assetsToCopy.push({
        from: `assets/images/portfolio/${image}`,
        to: `dist/assets/images/portfolio/${image}`
    });
});

assetsToCopy.forEach(({ from, to }) => {
    const fromPath = join(rootDir, from);
    const toPath = join(rootDir, to);
    try {
        copyFileSync(fromPath, toPath);
        console.log(`  ✓ ${from}`);
    } catch (error) {
        console.log(`  ⚠ Warning: Could not copy ${from} (may not exist)`);
    }
});

console.log('\n✅ HTML minification and asset copying complete!\n');
