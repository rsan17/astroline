# 🚀 Deploy Now - Quick Instructions

## Current Status
- ✅ Vercel CLI is installed (v50.1.6)
- ✅ Project is ready for deployment
- ⚠️  Vercel authentication required

## Quick Deployment Steps

### Option 1: Use the Deployment Script (Recommended)

1. **Open PowerShell in the project directory:**
   ```powershell
   cd "C:\Users\rober\Desktop\astro\astroline 2"
   ```

2. **Run the deployment script:**
   ```powershell
   .\deploy.ps1
   ```

3. **Complete Vercel login when prompted:**
   - A browser window will open, or you'll see a URL
   - Visit the URL and authorize the CLI
   - Return to PowerShell after authentication

4. **Follow the deployment prompts:**
   - Link to existing project or create new one
   - Confirm project settings
   - Wait for deployment to complete

### Option 2: Manual Deployment Commands

1. **Navigate to project:**
   ```powershell
   cd "C:\Users\rober\Desktop\astro\astroline 2"
   ```

2. **Login to Vercel:**
   ```powershell
   $env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"
   & "$env:APPDATA\npm\vercel.cmd" login
   ```
   - Complete the browser authentication
   - Return to PowerShell after login

3. **Deploy:**
   ```powershell
   & "$env:APPDATA\npm\vercel.cmd" --yes
   ```

4. **For production deployment:**
   ```powershell
   & "$env:APPDATA\npm\vercel.cmd" --prod
   ```

## Important Notes

### Root Directory Configuration
When Vercel asks about project settings:
- **Root Directory**: Leave empty or set to `.` (current directory)
- Since you're already in `astroline 2`, the root is correct
- If deploying from parent directory, set root to `astroline 2`

### Environment Variables
After first deployment, add environment variables in Vercel Dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add variables (see `VERCEL_ENV_VARS.md` for details):
   - `NEXT_PUBLIC_APP_URL` (required)
   - `RESEND_API_KEY` (recommended)
   - `EMAIL_FROM` (recommended)
   - `GROQ_API_KEY` (optional)
   - `GOOGLE_GENERATIVE_AI_API_KEY` (optional)
3. Select all environments (Production, Preview, Development)
4. Redeploy after adding variables

## Troubleshooting

**"No existing credentials found"**
- Run `vercel login` first
- Complete browser authentication

**"Cannot find module" errors**
- Run `npm install` in the project directory first

**Build fails**
- Check Node.js version: `node --version` (needs >= 18.0.0)
- Verify all dependencies: `npm install`

**Deployment succeeds but site doesn't work**
- Check environment variables are set
- Verify `NEXT_PUBLIC_APP_URL` matches your Vercel URL
- Check Vercel function logs for errors

## Next Steps After Deployment

1. ✅ Note your deployment URL (e.g., `https://astroline-app.vercel.app`)
2. ✅ Update `NEXT_PUBLIC_APP_URL` in Vercel Dashboard
3. ✅ Add other environment variables
4. ✅ Test the site and API endpoints
5. ✅ Connect custom domain (when ready)

## Need Help?

- See `DEPLOYMENT_GUIDE.md` for detailed instructions
- See `VERCEL_ENV_VARS.md` for environment variable details
- Check Vercel Dashboard → Deployments for build logs
