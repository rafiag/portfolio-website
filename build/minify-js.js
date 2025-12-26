/**
 * JavaScript Minification Script
 * Minifies JS files using Terser and removes localhost console logs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { minify } from 'terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📦 Minifying JavaScript...');

// Get all JS files
const jsFiles = [
    // Main entry points
    { input: 'js/main-index.js', output: 'dist/js/main-index.min.js' },
    { input: 'js/main-portfolio.js', output: 'dist/js/main-portfolio.min.js' },
    { input: 'js/browser-check.js', output: 'dist/js/browser-check.min.js' },
    { input: 'js/ga4-init.js', output: 'dist/js/ga4-init.min.js' },
];

// Get all module files
const modulesDir = join(rootDir, 'js', 'modules');
const moduleFiles = readdirSync(modulesDir)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
        input: `js/modules/${f}`,
        output: `dist/js/modules/${f.replace('.js', '.min.js')}`
    }));

// Get all data files
const dataDir = join(rootDir, 'js', 'data');
const dataFiles = readdirSync(dataDir)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
        input: `js/data/${f}`,
        output: `dist/js/data/${f.replace('.js', '.min.js')}`
    }));

const allFiles = [...jsFiles, ...moduleFiles, ...dataFiles];

let totalOriginalSize = 0;
let totalMinifiedSize = 0;

async function minifyFile({ input, output }) {
    const inputPath = join(rootDir, input);
    const outputPath = join(rootDir, output);

    let code = readFileSync(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(code, 'utf8');
    totalOriginalSize += originalSize;

    // Remove localhost-only console logs
    code = removeLocalhostLogs(code);

    // Minify with Terser
    let result;
    try {
        result = await minify(code, {
        module: true,
        ecma: 2020,
        compress: {
            dead_code: true,
            drop_console: false, // Keep console for errors, we already removed localhost ones
            drop_debugger: true,
            unused: false, // Disable to avoid breaking exports
            warnings: false
        },
        mangle: {
            toplevel: false, // Don't mangle exports
            keep_classnames: true,
            keep_fnames: true,
            reserved: ['ImageLoader', 'KeyboardNavigation', 'MobileMenu', 'PortfolioCarousel', 'TestimonialsCarousel', 'PortfolioModal', 'PortfolioFilter', 'BackToTop', 'portfolioData']
        },
        format: {
            comments: false,
            ecma: 2020
        }
        });
    } catch (error) {
        console.error(`  ✗ Error minifying ${input}:`);
        console.error(`    ${error.message}`);
        // Use unminified code if minification fails
        result = { code };
    }

    const minified = result.code || code;
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    totalMinifiedSize += minifiedSize;

    writeFileSync(outputPath, minified, 'utf8');

    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${input} (${savings}% smaller)`);
}

// Helper function to remove localhost console logs
function removeLocalhostLogs(code) {
    // Remove if blocks that check for localhost and only contain console statements
    code = code.replace(/if\s*\(window\.location\.hostname\s*===\s*['"]localhost['"]\)\s*\{[^}]*console\.(log|warn|error|info)\([^}]*\}/g, '');

    // Remove inline localhost checks with console
    code = code.replace(/if\s*\(window\.location\.hostname\s*===\s*['"]localhost['"]\)\s*console\.(log|warn|error|info)\([^;]*;/g, '');

    return code;
}

// Minify all files
console.log('');
for (const file of allFiles) {
    await minifyFile(file);
}

console.log('');
console.log(`📊 Total: ${(totalOriginalSize / 1024).toFixed(2)} KB → ${(totalMinifiedSize / 1024).toFixed(2)} KB`);
console.log(`   Savings: ${(totalOriginalSize - totalMinifiedSize / 1024).toFixed(2)} KB (${((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(1)}% reduction)`);
console.log('✅ JavaScript minification complete!\n');
