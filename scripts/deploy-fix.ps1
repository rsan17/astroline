# Скрипт для правильного розгортання на Vercel
$env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"

Write-Host "🚀 Розгортання Astroline на Vercel" -ForegroundColor Cyan
Write-Host ""

# Перевірка авторизації
Write-Host "Перевіряю авторизацію..." -ForegroundColor Yellow
$whoami = & "$env:APPDATA\npm\vercel.cmd" whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Не авторизовано. Запускаю login..." -ForegroundColor Red
    & "$env:APPDATA\npm\vercel.cmd" login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Помилка авторизації" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Авторизовано як: $whoami" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Розгортаю проект..." -ForegroundColor Cyan
Write-Host "Примітка: Коли запитає назву проекту, введіть: astroline" -ForegroundColor Yellow
Write-Host ""

# Розгортання (без --yes, щоб можна було ввести назву)
& "$env:APPDATA\npm\vercel.cmd"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Розгортання успішне!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Наступні кроки:" -ForegroundColor Cyan
    Write-Host "1. Додайте змінні оточення в Vercel Dashboard" -ForegroundColor White
    Write-Host "2. Перевірте URL вашого сайту" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Помилка розгортання" -ForegroundColor Red
    Write-Host "Перевірте повідомлення вище" -ForegroundColor Yellow
}
