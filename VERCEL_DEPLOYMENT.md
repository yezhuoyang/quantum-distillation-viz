# Vercel Deployment Guide

## Quick Start

This guide will help you deploy the quantum distillation visualization website with the simulation backend to Vercel.

---

## Prerequisites

1. **GitHub Account**: Your code is already on GitHub
2. **Vercel Account**: Sign up at https://vercel.com (free tier works)
3. **Repository**: https://github.com/yezhuoyang/quantum-distillation-viz

---

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Connect to Vercel

1. Go to https://vercel.com/
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

#### Step 2: Import Repository

1. Click **"Add New..."** → **"Project"**
2. Find `yezhuoyang/quantum-distillation-viz` in the list
3. Click **"Import"**

#### Step 3: Configure Project

**Framework Preset**: Select **"Other"** or leave as detected

**Build Settings**:
- **Build Command**: `pnpm build && cp server/simulation.py dist/simulation.py`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

**Root Directory**: Leave as `.` (root)

#### Step 4: Environment Variables (Optional)

No environment variables are required for basic deployment.

If you want to customize:
- `NODE_ENV` = `production`

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 3-5 minutes for build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

---

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy from Repository

```bash
cd /home/ubuntu/quantum-distillation-viz
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time) or Yes (if already created)
- **Project name?** → quantum-distillation-viz
- **Directory?** → ./
- **Override settings?** → No

#### Step 4: Wait for Deployment

The CLI will show deployment progress and provide a URL when complete.

---

## Important Notes

### ⚠️ Python Dependencies

**Issue**: Vercel serverless functions don't natively support Python packages like Qiskit.

**Current Limitation**: The simulation backend requires Python with Qiskit, which is **not directly supported** in Vercel's serverless environment.

### 🔧 Workaround Options

#### Option A: Use Vercel with External API (Recommended)

Deploy the frontend to Vercel, but host the simulation backend separately:

1. **Frontend on Vercel** (static site)
2. **Backend on Railway/Render/Fly.io** (Python + Qiskit)
3. Update API endpoint in frontend to point to external backend

#### Option B: Use Different Platform

Deploy the entire application (frontend + backend) to a platform that supports both Node.js and Python:

**Recommended Platforms**:
1. **Railway** - https://railway.app/
   - Supports Python + Node.js
   - Easy deployment from GitHub
   - Free tier available

2. **Render** - https://render.com/
   - Supports Python + Node.js
   - Auto-deploy from GitHub
   - Free tier available

3. **Fly.io** - https://fly.io/
   - Docker-based deployment
   - Supports any runtime
   - Free tier available

#### Option C: Simplified Vercel Deployment (Frontend Only)

Deploy just the frontend to Vercel and disable the simulation feature:

1. Remove the "Run Simulation" button
2. Keep only the theoretical calculations
3. Deploy as a static site

---

## Recommended: Deploy to Railway

Railway is the best option for this project because it supports both the frontend and Python backend seamlessly.

### Railway Deployment Steps

#### Step 1: Sign Up

1. Go to https://railway.app/
2. Click **"Start a New Project"**
3. Sign in with GitHub

#### Step 2: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Select `yezhuoyang/quantum-distillation-viz`
3. Click **"Deploy Now"**

#### Step 3: Configure

Railway will automatically detect:
- `package.json` for Node.js
- `requirements.txt` for Python dependencies

**Build Command**: Automatically detected from `package.json`
**Start Command**: `pnpm start` (runs `node dist/index.js`)

#### Step 4: Add Python Runtime

1. Go to **Settings** → **Environment**
2. Add environment variable:
   - `NIXPACKS_PYTHON_VERSION` = `3.11`

#### Step 5: Deploy

Railway will automatically build and deploy. You'll get a URL like:
`https://quantum-distillation-viz-production.up.railway.app`

---

## Vercel Deployment (Frontend Only)

If you want to deploy just the frontend to Vercel without the simulation backend:

### Step 1: Disable Simulation Feature

Comment out or remove the simulation button in the frontend:

```typescript
// client/src/pages/MagicStateDistillation.tsx

// Comment out the Run Simulation button
{/* <Button onClick={runSimulation} ...>Run Simulation</Button> */}
```

### Step 2: Update vercel.json

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 3: Deploy

Follow the standard Vercel deployment steps above.

---

## Testing Deployment

After deployment, test the following:

### Frontend Tests
- ✅ Homepage loads
- ✅ Magic State page loads
- ✅ Circuit animation plays
- ✅ Slider adjusts error rate
- ✅ Theoretical calculations update

### Backend Tests (if deployed)
- ✅ "Run Simulation" button appears
- ✅ Clicking button shows "Running..." state
- ✅ Simulation completes and shows results
- ✅ Results display fidelity, acceptance rate, expectation values

### Test Simulation API

```bash
curl -X POST https://your-deployment-url.com/api/simulate \
  -H "Content-Type: application/json" \
  -d '{"shots": 1000, "error_rate": 0.01}'
```

Expected response:
```json
{
  "fidelity": 0.999123,
  "acceptance_rate": 0.0234,
  "expectation_values": {"x": 0.7071, "y": 0.0, "z": 0.7071},
  ...
}
```

---

## Troubleshooting

### Build Fails on Vercel

**Error**: `Cannot find module 'qiskit'`

**Solution**: Vercel doesn't support Python packages. Use Railway or Render instead.

### Simulation Times Out

**Error**: Function execution timed out

**Solution**: 
- Reduce shot count to 1000 or less
- Increase timeout in `vercel.json` (max 300s on Pro plan)
- Use a dedicated backend platform

### API Returns 404

**Error**: `/api/simulate` not found

**Solution**:
- Check that `api/simulate.js` exists
- Verify `vercel.json` rewrites configuration
- Check Vercel function logs in dashboard

### Python Script Not Found

**Error**: `ENOENT: no such file or directory`

**Solution**:
- Ensure `simulation.py` is copied during build
- Check build command includes: `cp server/simulation.py dist/simulation.py`

---

## Cost Considerations

### Vercel Pricing
- **Hobby (Free)**: 
  - 100 GB bandwidth/month
  - 100 hours serverless function execution
  - 10 second function timeout
  - ❌ Not suitable for simulation backend

- **Pro ($20/month)**:
  - 1 TB bandwidth/month
  - 1000 hours function execution
  - 300 second function timeout
  - ⚠️ May work for simulation but expensive

### Railway Pricing
- **Free Tier**:
  - $5 credit/month
  - ~500 hours execution
  - No timeout limits
  - ✅ **Best for this project**

- **Pro ($20/month)**:
  - $20 credit + usage-based
  - Unlimited execution
  - Priority support

### Render Pricing
- **Free Tier**:
  - 750 hours/month
  - Sleeps after 15 min inactivity
  - ✅ Good for this project

---

## Recommended Deployment Strategy

### For Full Features (Circuit + Simulation)

**Use Railway**:
1. Deploy entire app to Railway
2. Supports both Node.js and Python
3. No configuration needed
4. Free tier sufficient for development

### For Frontend Only (Circuit Visualization)

**Use Vercel**:
1. Deploy frontend to Vercel
2. Disable simulation feature
3. Fast CDN delivery
4. Free tier sufficient

### For Production (High Traffic)

**Use Hybrid Approach**:
1. Frontend on Vercel (fast CDN)
2. Backend on Railway/Render (Python support)
3. Update API endpoint in frontend
4. Add caching for simulation results

---

## Next Steps

1. **Choose deployment platform** (Railway recommended)
2. **Push latest changes** to GitHub
3. **Connect repository** to chosen platform
4. **Configure build settings**
5. **Deploy and test**

---

## Support

**Repository**: https://github.com/yezhuoyang/quantum-distillation-viz  
**Issues**: https://github.com/yezhuoyang/quantum-distillation-viz/issues

For deployment help:
- Railway: https://docs.railway.app/
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs

---

**Last Updated**: January 5, 2026  
**Recommended Platform**: Railway (supports full features)  
**Alternative**: Vercel (frontend only, disable simulation)
