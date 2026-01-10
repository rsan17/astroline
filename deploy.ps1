# PowerShell script to deploy Astroline to Vercel
# This script handles the deployment process

Write-Host "🚀 Deploying Astroline to Vercel" -ForegroundColor Cyan
Write-Host ""

# Add Node.js and npm to PATH
$env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"

# Check if Vercel CLI is installed
try {
    $vercelVersion = & "$env:APPDATA\npm\vercel.cmd" --version 2>&1
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

# Navigate to project directory
$projectDir = Join-Path $PSScriptRoot "."
if (-not (Test-Path (Join-Path $projectDir "package.json"))) {
    Write-Host "❌ Error: package.json not found in $projectDir" -ForegroundColor Red
    exit 1
}

Set-Location $projectDir
Write-Host "✅ Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Check if already logged in
Write-Host "Checking Vercel authentication..." -ForegroundColor Cyan
$whoami = & "$env:APPDATA\npm\vercel.cmd" whoami 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Already logged in as: $whoami" -ForegroundColor Green
} else {
    Write-Host "⚠️  Not logged in. You'll need to authenticate." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please complete the login process:" -ForegroundColor Cyan
    Write-Host "1. A browser window will open, or visit the URL shown" -ForegroundColor White
    Write-Host "2. Authorize the Vercel CLI" -ForegroundColor White
    Write-Host "3. Return here after authentication" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Press [ENTER] to start login"
    & "$env:APPDATA\npm\vercel.cmd" login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Starting deployment..." -ForegroundColor Cyan
Write-Host ""

# Deploy to Vercel
# Using --yes to accept defaults, but user can still configure
Write-Host "Deploying project..." -ForegroundColor Cyan
Write-Host "Note: If this is your first deployment, you'll be prompted to:" -ForegroundColor Yellow
Write-Host "  - Link to existing project or create new one" -ForegroundColor Yellow
Write-Host "  - Set project settings" -ForegroundColor Yellow
Write-Host ""

$deploy = & "$env:APPDATA\npm\vercel.cmd" --yes 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Add environment variables in Vercel Dashboard:" -ForegroundColor White
    Write-Host "   - Go to your project → Settings → Environment Variables" -ForegroundColor White
    Write-Host "   - Add NEXT_PUBLIC_APP_URL, RESEND_API_KEY, etc." -ForegroundColor White
    Write-Host "   - See VERCEL_ENV_VARS.md for details" -ForegroundColor White
    Write-Host ""
    Write-Host "2. For production deployment, run:" -ForegroundColor White
    Write-Host "   vercel --prod" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Check the error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Not logged in (run: vercel login)" -ForegroundColor White
    Write-Host "  - Build errors (check package.json and dependencies)" -ForegroundColor White
    Write-Host "  - Missing environment variables (add in Vercel Dashboard)" -ForegroundColor White
    exit 1
}
