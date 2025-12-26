# Deployment Guide

This guide explains how to deploy the optimized production build to GitHub Pages.

## 🎯 Deployment Strategy

Since the production files are in the `dist/` folder (which is gitignored), you need to configure GitHub Pages to build and deploy automatically.

---

## ✅ Option 1: GitHub Actions (Recommended)

This approach automatically builds and deploys your site whenever you push to the `main` branch.

### Setup Steps:

1. **GitHub Actions workflow is already created** at `.github/workflows/deploy.yml`

2. **Configure GitHub Pages Settings:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (left sidebar)
   - Under **Source**, select:
     - **Source:** `GitHub Actions`
   - Save the settings

3. **Push your code:**
   ```bash
   git add .
   git commit -m "add build process and github actions deployment"
   git push origin main
   ```

4. **GitHub Actions will automatically:**
   - Install dependencies
   - Run `npm run build`
   - Deploy the `dist/` folder to GitHub Pages
   - Your site will be live at: `https://rafiatha.github.io`

### How It Works:
- Every push to `main` triggers the workflow
- The workflow builds your site using `npm run build`
- The optimized `dist/` folder is deployed
- You never commit the `dist/` folder to git

### Monitoring Deployment:
- Go to the **Actions** tab in your repository
- You'll see the deployment progress
- Green checkmark = successful deployment
- Click on any workflow run to see logs

---

## 🔄 Option 2: Manual Build + Commit (Not Recommended)

If you prefer not to use GitHub Actions:

### Setup Steps:

1. **Remove `dist/` from `.gitignore`:**
   ```bash
   # Edit .gitignore and remove the "dist/" line
   ```

2. **Build and commit:**
   ```bash
   npm run build
   git add dist
   git commit -m "add production build"
   git push origin main
   ```

3. **Configure GitHub Pages:**
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/dist`
   - Save

**Downsides:**
- ❌ Have to manually rebuild before each commit
- ❌ Git history polluted with minified code
- ❌ Larger repository size
- ❌ Merge conflicts in minified files

---

## 🚀 Option 3: Separate `gh-pages` Branch (Alternative)

Build and deploy to a separate branch:

### Setup Steps:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages:**
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Save

**When to use:**
- Manual control over deployments
- Don't want automatic deployments on every push

---

## 📋 Recommended Setup (Option 1)

### Current Configuration:
✅ `.github/workflows/deploy.yml` created
✅ `dist/` folder in `.gitignore` (keeps repo clean)
✅ GitHub Actions will handle everything automatically

### What You Need to Do:

1. **Enable GitHub Pages with Actions:**
   ```
   GitHub.com → Your Repo → Settings → Pages → Source: "GitHub Actions"
   ```

2. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "add build process and github actions deployment"
   git push origin main
   ```

3. **Wait 1-2 minutes** for GitHub Actions to build and deploy

4. **Visit your site:** `https://rafiatha.github.io`

---

## 🔍 Troubleshooting

### GitHub Actions failing?

**Check the workflow logs:**
- Go to the **Actions** tab
- Click on the failed workflow
- Expand the failed step to see error details

**Common issues:**

1. **"npm ci failed"**
   - Make sure `package-lock.json` is committed
   - Solution: `git add package-lock.json && git commit`

2. **"Build failed"**
   - Test locally: `npm run build`
   - Fix any errors shown
   - Commit the fixes

3. **"Pages deployment failed"**
   - Check GitHub Pages settings
   - Make sure "Source" is set to "GitHub Actions"
   - Check repository permissions

### Site not updating?

1. **Hard refresh your browser:** `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. **Clear GitHub Pages cache:** Settings → Pages → "Clear cache" button
3. **Check Actions tab:** Make sure the latest workflow completed successfully

### Want to test before deploying?

```bash
# Build and serve locally
npm run build:serve

# Visit http://localhost:8000
# This serves the production files from dist/
```

---

## 📊 Deployment Checklist

Before pushing to production:

- [ ] Run `npm run build` locally to test
- [ ] Check `dist/` folder was created successfully
- [ ] Test production build locally: `npm run build:serve`
- [ ] Verify all pages load correctly
- [ ] Check browser console for errors
- [ ] Test on mobile (responsive design)
- [ ] Verify all links work
- [ ] Check images load properly
- [ ] Commit your source code changes
- [ ] Push to GitHub
- [ ] Monitor GitHub Actions deployment
- [ ] Verify live site after deployment

---

## 🎛️ GitHub Pages Settings Reference

**Current Repository:** `rafiatha/rafiatha.github.io`
**Production URL:** `https://rafiatha.github.io`

**Recommended Settings:**
- **Source:** GitHub Actions
- **Custom domain:** (optional) Set if you have one
- **Enforce HTTPS:** ✅ Enabled (automatic for .github.io)

---

## 🔄 Workflow Summary

### Development:
1. Make changes to source files (HTML, CSS, JS)
2. Test locally: `npm start`
3. Commit changes: `git add . && git commit -m "message"`

### Deployment:
1. Push to GitHub: `git push origin main`
2. GitHub Actions automatically:
   - Installs dependencies
   - Runs `npm run build`
   - Deploys `dist/` to GitHub Pages
3. Site is live in 1-2 minutes

**You never manually build or commit the `dist/` folder!** 🎉

---

## 📝 Notes

- **Build time:** ~30-60 seconds on GitHub Actions
- **Deployment time:** ~1-2 minutes total
- **Caching:** GitHub Actions caches `node_modules` for faster builds
- **Cost:** Free for public repositories
- **Workflow file:** `.github/workflows/deploy.yml`

---

**Last Updated:** 2025-12-26
**Deployment Method:** GitHub Actions (Recommended)
