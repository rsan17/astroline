# 🚀 START HERE - Deploy to Vercel

## ✅ What's Ready
- ✅ Vercel CLI installed (v50.1.6)
- ✅ Project configured and ready
- ✅ All deployment files prepared
- ⚠️  Just need Vercel authentication

## 🎯 Deploy in 3 Steps

### Step 1: Open PowerShell in Project Directory

```powershell
cd "C:\Users\rober\Desktop\astro\astroline 2"
```

### Step 2: Login to Vercel

```powershell
$env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"
& "$env:APPDATA\npm\vercel.cmd" login
```

**What happens:**
- A browser window will open, OR you'll see a URL like `https://vercel.com/oauth/device?user_code=XXXXX`
- Visit the URL and click "Authorize"
- Return to PowerShell - it will detect the authorization automatically

### Step 3: Deploy

```powershell
& "$env:APPDATA\npm\vercel.cmd" --yes
```

**Or use the automated script:**
```powershell
.\deploy.ps1
```

## 📋 During Deployment

You'll be asked:
1. **Link to existing project?** → Choose "No" (first time) or "Yes" (if you already have a project)
2. **Project name?** → Press Enter for default or type a name
3. **Root directory?** → Press Enter (already in correct directory)
4. **Override settings?** → Press Enter for defaults

The deployment will take 2-5 minutes.

## 🔑 After First Deployment

### 1. Note Your URL
You'll see something like: `https://astroline-app-xxxxx.vercel.app`

### 2. Add Environment Variables
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Add these (see `VERCEL_ENV_VARS.md` for details):**

**Required:**
- `NEXT_PUBLIC_APP_URL` = `https://your-project-name.vercel.app`

**Recommended:**
- `RESEND_API_KEY` = Your Resend API key
- `EMAIL_FROM` = `Astroline <noreply@yourdomain.com>`

**Optional (AI):**
- `GROQ_API_KEY` = Your Groq key
- `GOOGLE_GENERATIVE_AI_API_KEY` = Your Gemini key

**Important:** Select all environments (Production, Preview, Development) for each variable.

### 3. Redeploy
After adding variables, either:
- Push a new commit (if connected to GitHub), OR
- Run: `vercel --prod` for production deployment

## 🎉 That's It!

Your site will be live at your Vercel URL. Test it:
- Visit the homepage
- Test the quiz flow
- Test API endpoints

## 📚 More Help

- **Quick Guide**: `QUICK_START.md`
- **Full Guide**: `DEPLOYMENT_GUIDE.md`
- **Environment Variables**: `VERCEL_ENV_VARS.md`
- **Checklist**: `VERCEL_SETUP_CHECKLIST.md`

## 🆘 Troubleshooting

**"No existing credentials found"**
→ Run `vercel login` first (Step 2 above)

**Build fails**
→ Check Node.js version: `node --version` (needs >= 18.0.0)
→ Run `npm install` first

**Site works but API fails**
→ Check environment variables are set
→ Check Vercel function logs in dashboard

---

**Ready?** Run the 3 steps above! 🚀
