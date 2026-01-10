# Script to open the deployed Vercel site
$env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"

Write-Host "🔍 Шукаю URL вашого розгортання..." -ForegroundColor Cyan
Write-Host ""

# Try to get the URL from user input
$url = Read-Host "Введіть URL вашого сайту на Vercel (наприклад: https://astroline-xxxxx.vercel.app)"

if ([string]::IsNullOrWhiteSpace($url)) {
    Write-Host "`n⚠️  URL не надано. Спробую знайти автоматично..." -ForegroundColor Yellow
    
    # Try to get from Vercel CLI
    try {
        $deployments = & "$env:APPDATA\npm\vercel.cmd" ls --yes 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Знайдено розгортання!" -ForegroundColor Green
            # Parse URL from output
            $url = ($deployments | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1).Matches.Value
        }
    } catch {
        Write-Host "Не вдалося отримати список автоматично." -ForegroundColor Yellow
    }
}

if ([string]::IsNullOrWhiteSpace($url)) {
    Write-Host "`n❌ Не вдалося знайти URL автоматично." -ForegroundColor Red
    Write-Host "`nЩоб знайти URL:" -ForegroundColor Cyan
    Write-Host "1. Відкрийте https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "2. Знайдіть ваш проект" -ForegroundColor White
    Write-Host "3. Скопіюйте URL з картки проекту" -ForegroundColor White
    Write-Host "`nАбо запустіть цей скрипт знову і введіть URL вручну." -ForegroundColor Yellow
    exit 1
}

# Validate URL
if ($url -notmatch "^https?://") {
    $url = "https://$url"
}

Write-Host "`n✅ Відкриваю сайт: $url" -ForegroundColor Green
Start-Process $url

Write-Host "`n🎉 Сайт відкрито в браузері!" -ForegroundColor Green
