# ✅ Vercel Setup Checklist

Use this checklist to ensure all steps are completed for deploying Astroline to Vercel.

## Pre-Deployment

- [ ] Git is installed and configured
- [ ] GitHub account created
- [ ] GitHub repository created (see `DEPLOYMENT_GUIDE.md`)
- [ ] Code pushed to GitHub
- [ ] Vercel account created (sign up at https://vercel.com)

## Vercel Project Setup

- [ ] Signed in to Vercel with GitHub account
- [ ] Created new project from GitHub repository
- [ ] **Root Directory set to `astroline 2`** ⚠️ CRITICAL
- [ ] Framework Preset: Next.js (auto-detected)
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)
- [ ] Install Command: `npm install` (default)
- [ ] Node.js Version: 18.x or higher

## Environment Variables

### Required
- [ ] `NEXT_PUBLIC_APP_URL` added
  - Initial value: `https://your-project-name.vercel.app`
  - Added to: Production, Preview, Development

### Recommended
- [ ] `RESEND_API_KEY` added
  - Get from: https://resend.com/api-keys
  - Added to: Production, Preview, Development
- [ ] `EMAIL_FROM` added
  - Format: `Astroline <noreply@yourdomain.com>`
  - Domain verified in Resend dashboard
  - Added to: Production, Preview, Development

### Optional (AI Features)
- [ ] `GROQ_API_KEY` added (recommended)
  - Get from: https://console.groq.com/keys
  - Added to: Production, Preview, Development
- [ ] `GOOGLE_GENERATIVE_AI_API_KEY` added (fallback)
  - Get from: https://aistudio.google.com/app/apikey
  - Added to: Production, Preview, Development

## First Deployment

- [ ] Clicked "Deploy" in Vercel Dashboard
- [ ] Build completed successfully (check build logs)
- [ ] No build errors or warnings
- [ ] Deployment URL noted (e.g., `https://astroline-app.vercel.app`)
- [ ] Updated `NEXT_PUBLIC_APP_URL` to actual Vercel URL
- [ ] Redeployed or waited for automatic deployment

## Post-Deployment Verification

### Site Accessibility
- [ ] Homepage loads at Vercel URL
- [ ] HTTPS working (SSL certificate active)
- [ ] All routes accessible:
  - [ ] `/` (homepage)
  - [ ] `/quiz` (quiz page)
  - [ ] `/horoscope/[sign]/[period]` (horoscope)
  - [ ] `/compatibility/[sign1]/[sign2]` (compatibility)
  - [ ] `/zodiac/[sign]` (zodiac signs)
  - [ ] `/report/[id]` (report page)

### API Endpoints
- [ ] `/api/generate-report` - Tested with POST request
- [ ] `/api/send-report` - Tested email sending (if Resend configured)
- [ ] Checked Vercel function logs for errors

### Environment Variables
- [ ] `NEXT_PUBLIC_APP_URL` used in SEO metadata (check page source)
- [ ] Report URLs use correct base URL
- [ ] Email links use correct domain

### Features
- [ ] Quiz flow works end-to-end
- [ ] Report generation works
- [ ] AI enhancement works (if API keys provided)
- [ ] Email sending works (if Resend configured)
- [ ] Static templates work (if AI keys not provided)

## Custom Domain (When Ready)

- [ ] Domain purchased/available
- [ ] Domain added in Vercel Dashboard → Settings → Domains
- [ ] DNS records configured at domain registrar:
  - [ ] Apex domain (`astroline.com`) - A records or CNAME
  - [ ] WWW subdomain (`www.astroline.com`) - CNAME record
- [ ] DNS propagation completed (5-60 minutes, up to 24 hours)
- [ ] SSL certificate issued by Vercel (automatic)
- [ ] Domain accessible via HTTPS
- [ ] `NEXT_PUBLIC_APP_URL` updated to custom domain
- [ ] Site redeployed with new URL

## Additional Configuration

- [ ] Automatic deployments from GitHub enabled
- [ ] Preview deployments for pull requests working
- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking configured (optional)
- [ ] Monitoring set up (optional)

## Troubleshooting Reference

If something doesn't work, check:
- [ ] Build logs in Vercel Dashboard
- [ ] Function logs in Vercel Dashboard
- [ ] Environment variables are set correctly
- [ ] Root directory is `astroline 2`
- [ ] All dependencies installed correctly
- [ ] Node.js version is >= 18.0.0

## Notes

- Keep this checklist updated as you complete each step
- Refer to `DEPLOYMENT_GUIDE.md` for detailed instructions
- Refer to `VERCEL_ENV_VARS.md` for environment variable details
