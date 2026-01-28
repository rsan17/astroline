# 🏦 Підключення Monobank Оплати

## Крок 1: Отримання токена

1. **Відкрийте ФОП рахунок в monobank** (якщо ще не маєте)
   - Можна зробити в застосунку за кілька хвилин

2. **Увійдіть у веб-кабінет**: https://web.monobank.ua

3. **Перейдіть до еквайрингу**:
   - Меню "Інтернет" → "Управління еквайрингом"
   - Або "Додати інструмент" → "Plata by Mono"

4. **Скопіюйте токен**:
   - У налаштуваннях еквайрингу знайдіть "Токен для API"
   - Скопіюйте його (починається з `u...`)

## Крок 2: Налаштування змінних оточення

### Локальна розробка

Додайте в `.env.local`:

```bash
MONOBANK_TOKEN=uEXr_ваш_токен_тут
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Vercel Production

1. Відкрийте ваш проєкт на Vercel
2. Settings → Environment Variables
3. Додайте:
   - `MONOBANK_TOKEN` = ваш токен
   - `NEXT_PUBLIC_BASE_URL` = https://ваш-домен.vercel.app

## Крок 3: Налаштування Webhook URL

Після деплою на Vercel:

1. Зайдіть у веб-кабінет monobank
2. Знайдіть налаштування еквайрингу
3. Вкажіть Webhook URL:
   ```
   https://ваш-домен.vercel.app/api/monobank/callback
   ```

## Як це працює

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Клієнт     │────▶│   Astroline  │────▶│   Monobank   │
│   (браузер)  │     │   (Next.js)  │     │   API        │
└──────────────┘     └──────────────┘     └──────────────┘
                            │                    │
                            │  1. Create Invoice │
                            │───────────────────▶│
                            │                    │
                            │  2. Invoice URL    │
                            │◀───────────────────│
                            │                    │
                            │  3. Redirect user  │
┌──────────────┐            │                    │
│   Monobank   │◀───────────────────────────────│
│   Payment    │                                 │
│   Page       │            │                    │
└──────────────┘            │                    │
       │                    │                    │
       │  4. Payment done   │                    │
       │───────────────────▶│                    │
       │                    │                    │
       │                    │  5. Webhook notify │
       │                    │◀───────────────────│
       │                    │                    │
       │  6. Redirect to    │                    │
       │     success page   │                    │
       │◀───────────────────│                    │
```

## API Endpoints

### POST `/api/monobank/create-payment`

Створює платіж і повертає URL для редіректу.

**Request:**
```json
{
  "planId": "trial_2w",
  "reportId": "abc123",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "invoiceId": "2411234567890",
  "pageUrl": "https://pay.mbnk.biz/...",
  "reference": "ASTRO-abc123-1706443200000"
}
```

### POST `/api/monobank/callback`

Webhook для отримання статусу платежу від Monobank.

### GET `/api/monobank/success`

Редірект після успішної оплати.

## Тарифні плани

| ID | Назва | Ціна (UAH) |
|----|-------|------------|
| `trial_1w` | 1 Тиждень | 42 ₴ |
| `trial_2w` | 2 Тижні | 229 ₴ |
| `trial_4w` | 4 Тижні | 419 ₴ |

## Тестування

### Тестовий режим

Для тестування можна:
1. Використати тестову картку monobank
2. Або створити платіж на 1 копійку для тесту

### Перевірка локально

Для локального тестування webhook використовуйте ngrok:

```bash
ngrok http 3000
```

І вкажіть ngrok URL як webhook в monobank:
```
https://xxxx-xxx-xxx.ngrok.io/api/monobank/callback
```

## Коди помилок

| Код | Опис |
|-----|------|
| `success` | Оплата успішна |
| `failure` | Оплата не пройшла |
| `processing` | В обробці |
| `hold` | Кошти заблоковані |
| `reversed` | Повернення коштів |
| `expired` | Час оплати вичерпано |

## Підтримка

- Документація Monobank API: https://api.monobank.ua/docs/checkout.html
- Підтримка еквайрингу: https://acquiring.monobank.ua/docs

## Безпека

⚠️ **НІКОЛИ** не публікуйте MONOBANK_TOKEN в репозиторії!

Використовуйте:
- `.env.local` для локальної розробки (в .gitignore)
- Environment Variables у Vercel для production
