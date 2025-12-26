/**
 * CSS Minification Script
 * Minifies CSS files using CSSO
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { minify as minifyCSS } from 'csso';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🎨 Minifying CSS...');

const cssFiles = [
    { input: 'css/style.css', output: 'dist/css/style.min.css' }
];

cssFiles.forEach(({ input, output }) => {
    const inputPath = join(rootDir, input);
    const outputPath = join(rootDir, output);

    const css = readFileSync(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(css, 'utf8');

    // Minify CSS with CSSO
    const minified = minifyCSS(css, {
        restructure: true,
        forceMediaMerge: true,
        comments: false
    });

    const minifiedSize = Buffer.byteLength(minified.css, 'utf8');
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    writeFileSync(outputPath, minified.css, 'utf8');

    console.log(`  ✓ ${input}`);
    console.log(`    ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
});

console.log('✅ CSS minification complete!\n');
