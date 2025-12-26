/**
 * Clean Build Script
 * Removes and recreates the dist directory
 */

import { existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

console.log('🧹 Cleaning build directory...');

// Remove dist directory if it exists
if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
    console.log('✓ Removed old dist directory');
}

// Create fresh dist directory structure
mkdirSync(distDir);
mkdirSync(join(distDir, 'css'));
mkdirSync(join(distDir, 'js'));
mkdirSync(join(distDir, 'js', 'modules'));
mkdirSync(join(distDir, 'js', 'data'));
mkdirSync(join(distDir, 'assets'));
mkdirSync(join(distDir, 'assets', 'images'));
mkdirSync(join(distDir, 'assets', 'images', 'companies'));
mkdirSync(join(distDir, 'assets', 'images', 'portfolio'));

console.log('✓ Created dist directory structure');
console.log('✅ Clean complete!\n');
