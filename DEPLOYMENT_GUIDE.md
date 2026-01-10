# 🚀 Vercel Deployment Guide for Astroline

This guide walks you through deploying the Astroline Next.js application to Vercel.

## Prerequisites

- ✅ Node.js >= 18.0.0 installed
- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ (Optional) API keys for Resend, Groq, Google Gemini

## Step 1: Initialize Git Repository

If Git is not installed, download it from https://git-scm.com/download/win

Open PowerShell or Command Prompt in the project root and run:

```powershell
cd "astroline 2"
git init
git add .
git commit -m "Initial commit: Astroline Next.js app"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `astroline-app` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

## Step 3: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in PowerShell:

```powershell
cd "astroline 2"
git remote add origin https://github.com/YOUR_USERNAME/astroline-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Sign in to Vercel**
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository (`astroline-app`)
   - Configure project settings:
     - **Framework Preset**: Next.js (auto-detected)
     - **Root Directory**: `astroline 2` ⚠️ **IMPORTANT: Set this!**
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)

3. **Configure Environment Variables**
   - Before deploying, click "Environment Variables"
   - Add the following variables:

   **Required:**
   - `NEXT_PUBLIC_APP_URL` = `https://your-project-name.vercel.app` (update after first deployment)
   
   **Recommended:**
   - `RESEND_API_KEY` = Your Resend API key from https://resend.com/api-keys
   - `EMAIL_FROM` = `Astroline <noreply@yourdomain.com>` (domain must be verified in Resend)
   
   **Optional (for AI features):**
   - `GROQ_API_KEY` = Your Groq API key from https://console.groq.com/keys
   - `GOOGLE_GENERATIVE_AI_API_KEY` = Your Google Gemini API key from https://aistudio.google.com/app/apikey

   - For each variable, select all environments: **Production**, **Preview**, **Development**

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Note your deployment URL (e.g., `https://astroline-app.vercel.app`)

5. **Update NEXT_PUBLIC_APP_URL**
   - After first deployment, go to Settings → Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` to your actual Vercel URL
   - Redeploy or wait for automatic deployment

### Option B: Via Vercel CLI

If you prefer command line:

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd "astroline 2"

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

When prompted:
- Set root directory to `astroline 2`
- Add environment variables when prompted

## Step 5: Verify Deployment

1. **Test Homepage**
   - Visit your Vercel URL (e.g., `https://astroline-app.vercel.app`)
   - Verify homepage loads correctly

2. **Test API Endpoints**
   - Test `/api/generate-report` with a POST request
   - Test `/api/send-report` (if Resend is configured)
   - Check Vercel function logs for any errors

3. **Verify Environment Variables**
   - Check that `NEXT_PUBLIC_APP_URL` is used in:
     - SEO metadata (view page source)
     - Report URLs
     - Email links

4. **Test Features**
   - Navigate through quiz flow
   - Generate a report
   - Test email sending (if configured)

## Step 6: Connect Custom Domain (When Ready)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `astroline.com`)

2. **Configure DNS**
   Vercel will provide DNS records. Common setup:
   
   **For apex domain** (`astroline.com`):
   - Option 1: Add A records pointing to Vercel IPs (provided by Vercel)
   - Option 2: Use CNAME with `@` → `cname.vercel-dns.com` (if your registrar supports it)
   
   **For www subdomain** (`www.astroline.com`):
   - Add CNAME record: `www` → `cname.vercel-dns.com`

3. **Wait for DNS Propagation**
   - Usually 5-60 minutes, sometimes up to 24 hours
   - Vercel will automatically issue SSL certificate once DNS is verified
   - Check status in Vercel Dashboard → Domains

4. **Update Environment Variable**
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain (e.g., `https://astroline.com`)
   - Redeploy or wait for automatic deployment

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (needs >= 18.0.0)
- Verify all dependencies install: `npm install`
- Check build logs in Vercel Dashboard

### Environment Variables Not Working
- Ensure variables are added to correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### API Routes Fail
- Check Vercel function logs in Dashboard
- Verify environment variables are set
- Check API route code for errors

### Email Not Sending
- Verify Resend API key is correct
- Check that email domain is verified in Resend dashboard
- Verify `EMAIL_FROM` format: `Name <email@domain.com>`

### Custom Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (can take up to 24 hours)
- Check SSL certificate status in Vercel Dashboard
- Ensure domain is added in Vercel project settings

## Post-Deployment Checklist

- [ ] Site accessible on Vercel URL
- [ ] HTTPS working (SSL certificate active)
- [ ] All routes accessible (quiz, horoscope, compatibility, zodiac)
- [ ] API endpoints working (`/api/generate-report`, `/api/send-report`)
- [ ] Environment variables configured correctly
- [ ] `NEXT_PUBLIC_APP_URL` used correctly in SEO and links
- [ ] Email sending works (if Resend configured)
- [ ] AI report generation works (if API keys provided)
- [ ] Automatic deployments from GitHub working
- [ ] Custom domain connected (when ready)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Resend Documentation](https://resend.com/docs)
- [Groq API Documentation](https://console.groq.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Vercel function logs
3. Verify all environment variables are set
4. Check GitHub repository for any issues
5. Review this guide for missed steps
