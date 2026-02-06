# Скрипт для перевірки всіх tier підписок на продакшині
# Використання: .\scripts\test-subscription-tiers.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$ProductionUrl = ""
)

Write-Host "Perevirka tier pidpisok na produktyni" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Якщо URL не вказано, запитати
if ([string]::IsNullOrEmpty($ProductionUrl)) {
    Write-Host "Vvedit URL vashogo produktynu (napryklad: https://astroline-xxxxx.vercel.app)" -ForegroundColor Yellow
    $ProductionUrl = Read-Host "Production URL"
}

# Перевірка формату URL
if (-not $ProductionUrl.StartsWith("http://") -and -not $ProductionUrl.StartsWith("https://")) {
    Write-Host "Pomilka: URL povinen pochynatisya z http:// abo https://" -ForegroundColor Red
    exit 1
}

# Видалення зайвих слешів в кінці
$ProductionUrl = $ProductionUrl.TrimEnd('/')

Write-Host ""
Write-Host "Dostupni tier pidpiski:" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "1. trial_1w - 1 Tydzen (42 UAH)" -ForegroundColor White
Write-Host "2. trial_2w - 2 Tydni (229 UAH)" -ForegroundColor White
Write-Host "3. trial_4w - 4 Tydni (419 UAH)" -ForegroundColor White
Write-Host ""

# Тестові дані для створення звіту
$testData = @{
    email = "test@example.com"
    gender = "other"
    birthDate = "1990-01-01"
    birthTime = "12:00"
    birthPlace = "Kyiv, Ukraine"
    sunSign = "Leo"
    moonSign = "Aries"
    risingSign = "Gemini"
    palmReading = "right"
    goals = @("career", "love")
    relationshipStatus = "single"
    favoriteColor = "blue"
    element = "fire"
    locale = "uk"
}

Write-Host "Krok 1: Stvorennya testovogo zvit..." -ForegroundColor Cyan
try {
    $generateResponse = Invoke-RestMethod -Uri "$ProductionUrl/api/generate-report" -Method POST -ContentType "application/json" -Body ($testData | ConvertTo-Json -Depth 10)
    
    if ($generateResponse.success -and $generateResponse.reportId) {
        $reportId = $generateResponse.reportId
        Write-Host "Zvit stvoreno: $reportId" -ForegroundColor Green
    } else {
        Write-Host "Pomilka stvorennya zvit" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Pomilka pri stvorenni zvit: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Krok 2: Perevirka vsih tier pidpisok..." -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Список планів для перевірки
$plans = @(
    @{ id = "trial_1w"; name = "1 Tydzen"; price = "42 UAH" },
    @{ id = "trial_2w"; name = "2 Tydni"; price = "229 UAH" },
    @{ id = "trial_4w"; name = "4 Tydni"; price = "419 UAH" }
)

$results = @()

foreach ($plan in $plans) {
    Write-Host "Perevirka planu: $($plan.name) ($($plan.price))" -ForegroundColor Yellow
    
    $paymentData = @{
        planId = $plan.id
        reportId = $reportId
        email = $testData.email
        sunSign = $testData.sunSign
        moonSign = $testData.moonSign
        risingSign = $testData.risingSign
    }
    
    try {
        $paymentResponse = Invoke-RestMethod -Uri "$ProductionUrl/api/monobank/create-payment" -Method POST -ContentType "application/json" -Body ($paymentData | ConvertTo-Json)
        
        if ($paymentResponse.success) {
            Write-Host "  Plan '$($plan.name)' pratsyue korektno" -ForegroundColor Green
            Write-Host "     - Invoice ID: $($paymentResponse.invoiceId)" -ForegroundColor Gray
            Write-Host "     - Reference: $($paymentResponse.reference)" -ForegroundColor Gray
            Write-Host "     - Payment URL: $($paymentResponse.pageUrl)" -ForegroundColor Gray
            
            $results += @{
                Plan = $plan.name
                Status = "Pratcyue"
                InvoiceId = $paymentResponse.invoiceId
                Reference = $paymentResponse.reference
                PageUrl = $paymentResponse.pageUrl
            }
        } else {
            Write-Host "  Plan '$($plan.name)' ne pratsyue: $($paymentResponse.error)" -ForegroundColor Red
            $results += @{
                Plan = $plan.name
                Status = "Pomilka: $($paymentResponse.error)"
                InvoiceId = ""
                Reference = ""
                PageUrl = ""
            }
        }
    } catch {
        $errorMessage = $_.Exception.Message
        Write-Host "  Pomilka pri perevirtsi planu '$($plan.name)': $errorMessage" -ForegroundColor Red
        $results += @{
            Plan = $plan.name
            Status = "Pomilka: $errorMessage"
            InvoiceId = ""
            Reference = ""
            PageUrl = ""
        }
    }
    
    Write-Host ""
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Pidsumok perevirki:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

foreach ($result in $results) {
    $color = if ($result.Status -like "*Pratcyue*") { "Green" } else { "Red" }
    Write-Host "$($result.Status) - $($result.Plan)" -ForegroundColor $color
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Перевірка чи всі плани працюють
$allWorking = $results | Where-Object { $_.Status -like "*Pratcyue*" } | Measure-Object | Select-Object -ExpandProperty Count

if ($allWorking -eq 3) {
    Write-Host "Vsi tier pidpiski pratsyut korektno!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Nastupni kroki:" -ForegroundColor Yellow
    Write-Host "   1. Perevit realnu oplatu cherez Monobank" -ForegroundColor White
    Write-Host "   2. Perevit shcho webhook callback pratsyue" -ForegroundColor White
    Write-Host "   3. Perevit shcho email zvit vidpravlyaetsya pislya oplati" -ForegroundColor White
} else {
    Write-Host "Deaki tier pidpiski ne pratsyut!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Perevit:" -ForegroundColor Yellow
    Write-Host "   1. Chi vstanovleno MONOBANK_TOKEN v Vercel" -ForegroundColor White
    Write-Host "   2. Chi SKIP_PAYMENT ne vstanovleno v true" -ForegroundColor White
    Write-Host "   3. Chi NEXT_PUBLIC_BASE_URL vstanovleno pravilno" -ForegroundColor White
    Write-Host "   4. Perevit logi v Vercel Dashboard" -ForegroundColor White
}

Write-Host ""
Write-Host "Report ID dlya testuvannya: $reportId" -ForegroundColor Cyan
Write-Host ""
