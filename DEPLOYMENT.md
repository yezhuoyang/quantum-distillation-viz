# Deployment Instructions

This document provides step-by-step instructions for deploying the Quantum Distillation Visualizer to various hosting platforms.

## Prerequisites

- GitHub account
- Repository: https://github.com/yezhuoyang/quantum-distillation-viz

## Option 1: Vercel (Recommended - Easiest)

Vercel provides the simplest deployment experience with automatic builds and previews.

### Steps:

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `yezhuoyang/quantum-distillation-viz`

3. **Configure Project**
   - Framework Preset: **Other**
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://quantum-distillation-viz.vercel.app`

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Option 2: Netlify

Netlify is another excellent option with similar ease of use.

### Steps:

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select `yezhuoyang/quantum-distillation-viz`

3. **Configure Build**
   - Build command: `pnpm build`
   - Publish directory: `dist/public`
   - The `netlify.toml` file will handle the rest

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://[random-name].netlify.app`
   - You can customize the subdomain in Site settings

## Option 3: GitHub Pages

GitHub Pages is free but requires manual setup for the workflow.

### Steps:

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (you'll create this)

2. **Manual Build and Deploy**
   ```bash
   # Clone the repository
   git clone https://github.com/yezhuoyang/quantum-distillation-viz.git
   cd quantum-distillation-viz
   
   # Install dependencies
   pnpm install
   
   # Build
   pnpm build
   
   # Install gh-pages package
   pnpm add -D gh-pages
   
   # Deploy
   npx gh-pages -d dist/public
   ```

3. **Access Your Site**
   - Visit `https://yezhuoyang.github.io/quantum-distillation-viz/`

### Automated Deployment (Requires Workflow Permission)

If you have workflow permissions, you can use GitHub Actions:

1. Go to repository Settings → Actions → General
2. Enable "Read and write permissions"
3. Add the workflow file from `.github/workflows/deploy.yml`
4. Push to main branch to trigger automatic deployment

## Option 4: Cloudflare Pages

Cloudflare Pages offers excellent performance with global CDN.

### Steps:

1. **Go to Cloudflare Pages**
   - Visit [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign in or create account

2. **Create Project**
   - Click "Create a project"
   - Connect to GitHub
   - Select `yezhuoyang/quantum-distillation-viz`

3. **Configure Build**
   - Framework preset: **None**
   - Build command: `pnpm build`
   - Build output directory: `dist/public`

4. **Deploy**
   - Click "Save and Deploy"
   - Your site will be live at `https://quantum-distillation-viz.pages.dev`

## Recommended: Vercel

For this project, **Vercel is recommended** because:
- ✅ Zero configuration needed (vercel.json included)
- ✅ Automatic deployments on push
- ✅ Preview deployments for pull requests
- ✅ Excellent performance
- ✅ Free for personal projects
- ✅ Easy custom domain setup

## Post-Deployment

After deployment, update the README.md with your live URL:

```markdown
## 🚀 Live Demo

Visit the live application: [Quantum Distillation Visualizer](https://your-url-here)
```

## Troubleshooting

### Build Fails

If build fails, check:
- Node version is 22+ (set in project settings)
- pnpm is being used (not npm)
- All dependencies are in package.json

### Blank Page

If you see a blank page:
- Check browser console for errors
- Verify output directory is `dist/public` not just `dist`
- Check that routing is configured (vercel.json/netlify.toml)

### 404 on Routes

If `/bell-state` gives 404:
- Ensure SPA routing is configured
- Vercel: Check vercel.json has rewrites
- Netlify: Check netlify.toml has redirects
- GitHub Pages: May need hash routing instead

## Support

For deployment issues:
- Check platform documentation
- Open an issue on GitHub
- Contact the course instructor

---

**Quick Start:** Use Vercel for fastest deployment (< 5 minutes)
