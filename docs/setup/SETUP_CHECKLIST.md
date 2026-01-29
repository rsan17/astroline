# 🚀 Setup Checklist for Windows

## ✅ Prerequisites Check

### 1. **Node.js Installation** ❌ MISSING
   - **Status**: Node.js is not installed or not in PATH
   - **Required**: Node.js >= 18.0.0
   - **Action**: 
     - Download from: https://nodejs.org/
     - Install LTS version (recommended: v20.x or v22.x)
     - Restart terminal after installation
     - Verify: `node --version` should show v18.0.0 or higher

### 2. **npm Installation** ❌ MISSING
   - **Status**: npm is not installed (comes with Node.js)
   - **Action**: Install Node.js (npm comes bundled)
   - **Verify**: `npm --version` should work after Node.js installation

### 3. **Dependencies** ✅ INSTALLED
   - **Status**: `node_modules` folder exists
   - **Note**: You may need to reinstall after Node.js setup
   - **Action**: Run `npm install` in the project directory

## 📋 Environment Variables Setup

### Required for Full Functionality:

Create `.env.local` file in `astroline 2/` directory:

```env
# AI Providers (at least one recommended)
GROQ_API_KEY=gsk_your_groq_api_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Optional: Email functionality
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=Astroline <noreply@astroline.com>

# Optional: App URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note**: The app will work without AI keys (uses static templates), but AI features won't be available.

## 🔧 Setup Steps

1. **Install Node.js**
   ```powershell
   # Download and install from https://nodejs.org/
   # Then verify:
   node --version
   npm --version
   ```

2. **Navigate to project directory**
   ```powershell
   cd "astroline 2"
   ```

3. **Install/Reinstall dependencies**
   ```powershell
   npm install
   ```

4. **Create environment file** (if needed)
   ```powershell
   # Create .env.local file with the variables above
   ```

5. **Start development server**
   ```powershell
   npm run dev
   ```

6. **Open browser**
   - Navigate to: http://localhost:3000

## ⚠️ Windows-Specific Notes

### Path Issues
- ✅ Project uses relative paths - should work on Windows
- ✅ No hardcoded Unix paths detected
- ✅ Next.js handles path separators automatically

### Potential Issues Found

1. **Missing Dependency**: `@svgr/webpack` is referenced in `next.config.mjs` but not in `package.json`
   - **Impact**: Only affects if you import SVG files as React components
   - **Fix**: Either remove the webpack config or add the dependency

2. **PowerShell Commands**: 
   - Use `;` instead of `&&` for chaining commands
   - Or use separate commands

## ✅ Verification Checklist

After setup, verify:

- [ ] Node.js installed and in PATH
- [ ] npm installed and working
- [ ] Dependencies installed (`node_modules` exists)
- [ ] `.env.local` file created (optional but recommended)
- [ ] `npm run dev` starts without errors
- [ ] Website accessible at http://localhost:3000

## 🐛 Troubleshooting

### "node is not recognized"
- Install Node.js from nodejs.org
- Restart terminal/PowerShell
- Check PATH environment variable

### "npm is not recognized"
- Comes with Node.js, reinstall Node.js if missing

### Port 3000 already in use
- Change port: `npm run dev -- -p 3001`
- Or kill process using port 3000

### Module not found errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📝 Next Steps

Once everything is set up:
1. Test the website locally
2. Check if AI features work (if API keys provided)
3. Test the quiz flow
4. Verify report generation
