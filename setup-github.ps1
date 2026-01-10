# PowerShell script to set up GitHub repository for Astroline
# Run this script after installing Git and creating a GitHub repository

Write-Host "🚀 Setting up GitHub repository for Astroline" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the 'astroline 2' directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Check if git is already initialized
if (Test-Path ".git") {
    Write-Host "⚠️  Git repository already initialized" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Add all files
Write-Host ""
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "⚠️  No changes to commit" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "Committing changes..." -ForegroundColor Cyan
    git commit -m "Initial commit: Astroline Next.js app"
    Write-Host "✅ Changes committed" -ForegroundColor Green
}

# Ask for GitHub repository URL
Write-Host ""
Write-Host "📝 GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "If you haven't created a GitHub repository yet:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
Write-Host "2. Create a new repository (e.g., 'astroline-app')" -ForegroundColor Yellow
Write-Host "3. Do NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host ""
$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/astroline-app.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "⚠️  No repository URL provided. Skipping remote setup." -ForegroundColor Yellow
    Write-Host "You can add it later with: git remote add origin <url>" -ForegroundColor Yellow
    exit 0
}

# Add remote
Write-Host ""
Write-Host "Adding remote origin..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $repoUrl
Write-Host "✅ Remote added: $repoUrl" -ForegroundColor Green

# Set main branch
Write-Host ""
Write-Host "Setting up main branch..." -ForegroundColor Cyan
git branch -M main 2>$null
Write-Host "✅ Branch set to 'main'" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "Ready to push to GitHub!" -ForegroundColor Cyan
$push = Read-Host "Push to GitHub now? (y/n)"

if ($push -eq "y") {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 GitHub setup complete! You can now deploy to Vercel." -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to push to GitHub. Please check your credentials and try again." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "To push later, run: git push -u origin main" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com and sign in with GitHub" -ForegroundColor White
Write-Host "2. Import your repository" -ForegroundColor White
Write-Host "3. Set root directory to 'astroline 2'" -ForegroundColor White
Write-Host "4. Add environment variables" -ForegroundColor White
Write-Host "5. Deploy!" -ForegroundColor White
