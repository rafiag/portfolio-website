# Troubleshooting Guide

## ❌ "Loading failed for module" Errors

If you're seeing console errors like:
```
Loading module from "http://localhost:8000/js/modules/..." failed
```

### **Solution 1: Check Your URL**

**The Problem:** Opening HTML files directly with `file://` protocol breaks ES6 modules due to CORS restrictions.

**Check your browser address bar:**
- ❌ **WRONG:** `file:///d:/Project/Portfolio%20Website/index.html`
- ✅ **CORRECT:** `http://localhost:8000/index.html`

**Fix:**
1. Make sure the development server is running:
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

2. Open your browser to: `http://localhost:8000/index.html`

3. **Never double-click HTML files** - always use the server URL

---

### **Solution 2: Check Which Version You're Viewing**

**Development version** (source files):
- URL: `http://localhost:8000/index.html`
- Uses: `js/main-index.js`, `css/style.css`
- Full-sized, unminified code with comments

**Production version** (built files):
- URL: `http://localhost:8000/dist/index.html`
- Uses: `js/main-index.min.js`, `css/style.min.css`
- Minified, optimized code

**Make sure you're accessing the right one!**

---

### **Solution 3: Clear Browser Cache**

If you recently ran `npm run build`, your browser might be caching old files.

**Hard refresh:**
- **Windows:** `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Or:** Open DevTools → Network tab → Check "Disable cache"

---

### **Solution 4: Check Console for Specific Errors**

Open browser DevTools (F12) and look for:

1. **404 errors** - File not found
   ```
   GET http://localhost:8000/js/modules/something.js 404
   ```
   **Fix:** Check if the file exists at that path

2. **MIME type errors**
   ```
   Failed to load module script: Expected JavaScript MIME type
   ```
   **Fix:** Server must serve `.js` files with `Content-Type: text/javascript`
   - Python's `http.server` does this correctly
   - If using another server, check its configuration

3. **CORS errors**
   ```
   Cross-Origin Request Blocked
   ```
   **Fix:** Use `http://localhost:8000`, not `file://`

---

## 🔧 Development Server Issues

### Server Won't Start

**Error:** `Address already in use` or port 8000 occupied

**Check what's using port 8000:**
```bash
netstat -an | findstr :8000
```

**Kill the process:**
```bash
# Find the PID from netstat output, then:
taskkill /F /PID <PID>
```

**Or use a different port:**
```bash
python -m http.server 8001
# Then visit http://localhost:8001
```

---

### Server Running But Page Won't Load

**Check if server is responding:**
```bash
powershell -Command "(Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing).StatusCode"
```

**Should return:** `200`

**If not:**
1. Restart the server
2. Check firewall settings
3. Try a different browser
4. Check if `index.html` exists in the project root

---

## 🏗️ Build Issues

### Module Import Errors in Production Build

**Error:** `Loading module from 'http://localhost:8000/dist/js/modules/performance-utils.js' was blocked because of a disallowed MIME type`

**Cause:** After running `npm run build`, minified module files were importing from non-minified paths (e.g., `./performance-utils.js` instead of `./performance-utils.min.js`)

**Fix:** This is now handled automatically in the build process. The `build/minify-js.js` script updates all import paths to use `.min.js` extensions.

**If you still see this error:**
1. Delete the `dist/` folder
2. Run `npm run build` again
3. Hard refresh your browser (`Ctrl + F5`)

---

### "npm run build" Fails

**Common errors:**

1. **`npm: command not found`**
   - **Fix:** Install Node.js from https://nodejs.org

2. **`Cannot find module 'csso'`**
   - **Fix:** Install dependencies:
     ```bash
     npm install
     ```

3. **`Permission denied`**
   - **Fix (Windows):** Run as administrator
   - **Fix (Mac/Linux):** `sudo npm install`

---

### dist/ Folder Is Empty After Build

**Check for build errors:**
```bash
npm run build
```

**Look for error messages in the output**

**Common issues:**
- Missing source files
- Invalid JavaScript syntax
- File permissions

---

## 🌐 GitHub Pages Issues

### Site Not Updating After Push

1. **Check GitHub Actions workflow:**
   - Go to repository → Actions tab
   - Look for green checkmark (success) or red X (failed)
   - Click on failed workflow to see error logs

2. **Hard refresh browser:**
   - `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

3. **Clear GitHub Pages cache:**
   - Settings → Pages → "Clear cache" button

4. **Wait a few minutes:**
   - Deployments can take 1-5 minutes

---

### GitHub Actions Workflow Failing

**Error: "npm ci failed"**
```bash
# Make sure package-lock.json is committed
git add package-lock.json
git commit -m "add package-lock.json"
git push
```

**Error: "Build failed"**
- Test locally first: `npm run build`
- Fix any errors shown
- Commit and push the fixes

**Error: "Module not found"**
- Check all imports use `.js` extensions
- Example: `import { Foo } from './foo.js'` (NOT `'./foo'`)

---

## 🎨 CSS Not Loading

### Styles Not Applied

1. **Check browser DevTools → Network tab**
   - Look for `style.css` or `style.min.css`
   - Should show `200 OK` status

2. **If 404:**
   - Development: Use `css/style.css`
   - Production: Use `css/style.min.css`
   - Check the `<link>` tag in HTML matches the file that exists

3. **If 200 but no styles:**
   - Check for CSS syntax errors in browser console
   - Inspect elements to see if styles are being applied

---

## 📱 Testing on Mobile

### Can't Access localhost:8000 on Phone

**Option 1: Use your computer's IP address**
1. Find your IP address:
   ```bash
   ipconfig  # Windows
   # Look for "IPv4 Address" under your network adapter
   ```

2. On your phone, visit: `http://YOUR_IP:8000`
   - Example: `http://192.168.1.5:8000`

**Option 2: Use ngrok for public URL**
```bash
npx ngrok http 8000
# Copy the forwarding URL (e.g., https://abc123.ngrok.io)
```

---

## 🐛 JavaScript Errors

### "Unexpected token" or Syntax Errors

**After running `npm run build`:**
- Build process might have broken something
- Check `dist/` folder files for issues

**Solution:**
1. Test source files first:
   ```bash
   # Visit http://localhost:8000/index.html (not dist/index.html)
   ```

2. If source works but build fails:
   - Check build logs for warnings
   - Some files might not minify well (accessibility.js, portfolio-modal.js)
   - This is expected and they'll still work, just less minified

---

### "Module not found" in Imports

**Error example:**
```
Failed to resolve module specifier "performance-utils"
```

**Fix:** All imports need `.js` extension:
```javascript
// ❌ Wrong:
import { throttle } from './performance-utils';

// ✅ Correct:
import { throttle } from './performance-utils.js';
```

---

## 📊 Performance Issues

### Page Loading Slowly

1. **Check if using production build:**
   - Production (`dist/`) should be faster
   - Run: `npm run build:serve`

2. **Check browser DevTools → Network tab:**
   - Look for slow requests (red bars)
   - Check total page size

3. **Expected sizes:**
   - Development: ~320 KB total
   - Production: ~220 KB total (42% smaller)

---

## 🔐 Content Security Policy Errors

### "Refused to load..." CSP Errors

**If you see CSP violations in console:**

1. **For external resources:**
   - Add domain to CSP in `index.html` `<meta>` tag
   - Example: Adding new font provider

2. **For inline scripts (avoid):**
   - Move scripts to external `.js` files
   - Never use `'unsafe-inline'` for scripts

---

## ✅ Quick Diagnostics Checklist

Run through this checklist:

- [ ] Development server is running (`npm start` or `python -m http.server 8000`)
- [ ] Browser URL is `http://localhost:8000/` (not `file://`)
- [ ] Browser console shows no errors (F12 → Console tab)
- [ ] Network tab shows all files loading (200 OK status)
- [ ] All `.js` files in source use ES6 modules (`import`/`export`)
- [ ] All imports have `.js` file extensions
- [ ] No syntax errors in JavaScript (check console)
- [ ] CSS file exists and is loading
- [ ] Hard refresh attempted (`Ctrl + F5`)

---

## 📞 Still Having Issues?

1. **Check browser console** (F12) - Copy the exact error message
2. **Check Network tab** - See which files are failing to load
3. **Test in incognito mode** - Rules out caching/extension issues
4. **Try different browser** - Rules out browser-specific issues
5. **Check server logs** - Look for errors in terminal where server is running

---

**Common Commands Reference:**

```bash
# Start development server
npm start

# Build production version
npm run build

# Test production build locally
npm run build:serve

# Install dependencies
npm install

# Check for server on port 8000
netstat -an | findstr :8000

# Hard restart everything
# 1. Stop server (Ctrl+C)
# 2. Clear browser cache
# 3. npm install
# 4. npm start
```

---

**Last Updated:** 2025-12-26
