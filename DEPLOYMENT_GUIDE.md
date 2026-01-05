# Deployment Guide for Quantum Distillation Visualizer

## Current Status

✅ **Code successfully pushed to GitHub**
- Repository: https://github.com/yezhuoyang/quantum-distillation-viz
- Commit: d94b0e6 - "Fix 15-to-1 Reed-Muller circuit implementation"
- Branch: main

✅ **Local development server working**
- Successfully tested at http://localhost:3000
- All animations and circuit visualizations working correctly

⚠️ **Vercel deployment needs setup**
- The vercel.json configuration exists but deployment not connected

---

## Deployment Options

### Option 1: Connect Repository to Vercel (Recommended)

This is the easiest method and enables automatic deployments on every push.

#### Steps:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `yezhuoyang/quantum-distillation-viz`

3. **Configure Project**
   - Framework Preset: **Other** (or leave as detected)
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`
   - Root Directory: `./` (leave as default)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - Your site will be live at `https://quantum-distillation-viz.vercel.app`

5. **Enable Auto-Deploy**
   - Once connected, every push to `main` branch will automatically deploy
   - You'll get deployment previews for pull requests

---

### Option 2: Deploy via Vercel CLI

If you prefer command-line deployment:

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Repository**
   ```bash
   cd /path/to/quantum-distillation-viz
   vercel --prod
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: quantum-distillation-viz
   - Directory: ./
   - Override settings: No

5. **Deployment Complete**
   - You'll get a production URL
   - Future deployments: just run `vercel --prod`

---

### Option 3: Deploy to Netlify

Alternative hosting platform with similar features:

#### Steps:

1. **Go to Netlify Dashboard**
   - Visit https://app.netlify.com/
   - Sign in with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist/public`
   - Base directory: (leave empty)

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at a Netlify URL
   - You can customize the domain name

---

### Option 4: GitHub Pages

Free hosting directly from GitHub:

#### Steps:

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (you'll need to create this)

2. **Add Deployment Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '22'
             
         - name: Install pnpm
           run: npm install -g pnpm
           
         - name: Install dependencies
           run: pnpm install
           
         - name: Build
           run: pnpm build
           
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist/public
   ```

3. **Push Workflow**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push origin main
   ```

4. **Access Site**
   - After deployment completes, visit:
   - `https://yezhuoyang.github.io/quantum-distillation-viz/`

---

## Recommended: Option 1 (Vercel via Dashboard)

**Why Vercel is recommended:**
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Global CDN for fast loading
- ✅ Free for personal projects
- ✅ Easy rollback to previous versions
- ✅ Built-in analytics
- ✅ Custom domains supported

**Time to deploy:** ~5 minutes for initial setup, then automatic

---

## Testing the Deployment

Once deployed, verify the corrected circuit:

1. Navigate to `/magic-state` page
2. Click the "Full 15-to-1" tab
3. Click the Play button
4. Verify you see:
   - ✅ Correct qubit labels (|+_L⟩ and |g_L⟩)
   - ✅ 4 columns of CNOT gates with different colors
   - ✅ Transversal T†_L gates on all 15 qubits
   - ✅ M_X measurements on all 15 qubits
   - ✅ Output state |ψ_L⟩ on qubit 16

---

## Troubleshooting

### Build Fails

If the build fails, check:
- Node.js version is 22+
- pnpm is being used (not npm)
- All dependencies are in package.json

### Site Shows Old Version

If you see the old circuit after deployment:
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache
- Wait 1-2 minutes for CDN to update

### Vercel Connection Issues

If Vercel can't connect to GitHub:
- Check GitHub permissions in Vercel settings
- Ensure repository is not private (or grant Vercel access)
- Try disconnecting and reconnecting the integration

---

## Next Steps

1. **Choose a deployment method** (recommend Option 1)
2. **Deploy the site**
3. **Test the corrected circuit**
4. **Share the live URL** with students/users

The corrected implementation is ready to go live! 🚀

---

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages

For code issues:
- Open an issue on GitHub
- Check the commit history for changes
