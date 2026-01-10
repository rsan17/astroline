# 🚀 Quick Start: Deploy to Vercel

This is a condensed guide. For detailed instructions, see `DEPLOYMENT_GUIDE.md`.

## Prerequisites Checklist

- [ ] Git installed (https://git-scm.com/download/win)
- [ ] GitHub account
- [ ] Vercel account (https://vercel.com)
- [ ] (Optional) API keys ready (Resend, Groq, Google Gemini)

## 5-Minute Setup

### 1. Push to GitHub (2 minutes)

```powershell
# Option A: Use the automated script
cd "astroline 2"
.\setup-github.ps1

# Option B: Manual commands
cd "astroline 2"
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/astroline-app.git
git push -u origin main
```

### 2. Deploy to Vercel (3 minutes)

1. Go to https://vercel.com → **Add New** → **Project**
2. Select your GitHub repository
3. **⚠️ IMPORTANT**: Set **Root Directory** to `astroline 2`
4. Click **Deploy** (skip environment variables for now)
5. Wait for deployment (2-5 minutes)
6. Note your deployment URL

### 3. Add Environment Variables

Go to **Settings** → **Environment Variables** and add:

**Required:**
- `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`

**Recommended:**
- `RESEND_API_KEY` = Your Resend key
- `EMAIL_FROM` = `Astroline <noreply@yourdomain.com>`

**Optional (AI):**
- `GROQ_API_KEY` = Your Groq key
- `GOOGLE_GENERATIVE_AI_API_KEY` = Your Gemini key

**Important:** Select all environments (Production, Preview, Development) for each variable.

### 4. Redeploy

After adding variables, trigger a new deployment or wait for automatic deployment.

## Verify Deployment

- ✅ Visit your Vercel URL
- ✅ Test homepage and navigation
- ✅ Test `/api/generate-report` endpoint
- ✅ Test `/api/send-report` (if Resend configured)

## Connect Custom Domain (Later)

1. **Vercel Dashboard** → **Settings** → **Domains**
2. Add your domain
3. Configure DNS records (Vercel provides instructions)
4. Wait for DNS propagation (5-60 minutes)
5. Update `NEXT_PUBLIC_APP_URL` to your custom domain
6. Redeploy

## Need Help?

- 📖 **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- 📋 **Checklist**: See `VERCEL_SETUP_CHECKLIST.md`
- 🔑 **Environment Variables**: See `VERCEL_ENV_VARS.md`

## Common Issues

**Build fails?**
- Check Node.js version (needs >= 18.0.0)
- Verify root directory is set to `astroline 2`

**Environment variables not working?**
- Ensure added to all environments (Production/Preview/Development)
- Redeploy after adding variables

**Email not sending?**
- Verify Resend API key
- Check domain is verified in Resend dashboard
