# ✨ Astroline

Персоналізований астрологічний сервіс з AI-powered генерацією звітів.

## Features

- 🔮 Персоналізовані астрологічні звіти на основі натальної карти
- 🤖 AI-генерація з Groq (Llama 3.3) та Google Gemini
- 🎯 Прогноз на 2026 рік по кварталах
- 💕 Аналіз сумісності
- 💼 Кар'єрні поради
- 🖐️ Аналіз долоні (coming soon)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Vercel AI SDK (Groq + Gemini)
- **State**: Zustand
- **Forms**: React Hook Form + Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` file in the project root:

```bash
# AI Providers (Free Tiers Available)
# At least one is required for AI-generated reports

# GROQ - Primary AI Provider
# Get your free API key at: https://console.groq.com/keys
# Free tier: ~6000 requests/day
GROQ_API_KEY=gsk_your_groq_api_key_here

# GOOGLE GEMINI - Fallback AI Provider  
# Get your free API key at: https://aistudio.google.com/app/apikey
# Free tier: ~1500 requests/day
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

> **Note**: If no AI keys are provided, the app falls back to static templates.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## AI Integration

The app uses a fallback strategy for AI:

```
User Data → Groq (primary) → Report
              ↓ (if rate limit)
           Gemini (fallback) → Report
              ↓ (if error)
           Static Templates → Report
```

### Free Tier Limits

| Provider | Model | Daily Limit | Use Case |
|----------|-------|-------------|----------|
| Groq | Llama 3.3 70B | ~6000 req | Primary generation |
| Gemini | 1.5 Flash | ~1500 req | Fallback |

## Project Structure

```
astroline/
├── docs/                     # 📚 Вся документація проекту
│   ├── START_HERE.md         # Початок роботи
│   ├── QUICK_START.md        # Швидкий старт
│   ├── LOCAL_SETUP.md        # Локальне налаштування
│   ├── DEPLOYMENT_GUIDE.md   # Деплой на Vercel
│   ├── API_KEYS_SETUP.md     # Налаштування API ключів
│   ├── MONOBANK_SETUP.md     # Інтеграція Monobank
│   ├── RESEND_SETUP_GUIDE.md # Email сервіс
│   └── ...                   # Інші гайди
│
├── scripts/                  # 🔧 PowerShell скрипти
│   ├── deploy.ps1            # Деплой скрипт
│   ├── deploy-fix.ps1        # Виправлення деплою
│   ├── setup-github.ps1      # GitHub налаштування
│   └── open-site.ps1         # Відкрити сайт
│
├── src/
│   ├── app/                  # 📱 Next.js App Router
│   │   ├── api/              # API endpoints
│   │   ├── quiz/             # Quiz flow
│   │   ├── report/           # Report display
│   │   ├── zodiac/           # Zodiac sign pages
│   │   ├── horoscope/        # Horoscope pages
│   │   └── compatibility/    # Compatibility calculator
│   │
│   ├── components/           # 🧩 React компоненти
│   │   ├── effects/          # Візуальні ефекти (Galaxy, etc)
│   │   ├── features/         # Feature компоненти
│   │   ├── landing/          # Landing page секції
│   │   ├── quiz/             # Quiz step компоненти
│   │   ├── report/           # Report секції
│   │   ├── seo/              # SEO компоненти
│   │   ├── shared/           # Спільні компоненти
│   │   └── ui/               # UI kit (Button, Card, etc)
│   │
│   ├── hooks/                # 🎣 React hooks
│   ├── emails/               # 📧 Email templates
│   ├── lib/                  # 📦 Утиліти та сервіси
│   │   ├── ai/               # AI service layer
│   │   ├── constants/        # Константи
│   │   ├── design/           # Design system docs
│   │   ├── i18n/             # Локалізація (uk/en)
│   │   └── quiz/             # Quiz логіка
│   │
│   └── types/                # 📝 TypeScript типи
│
├── public/                   # 🖼️ Статичні файли
├── README.md                 # Цей файл
├── env.example               # Приклад .env файлу
└── package.json              # Dependencies
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## Documentation

Вся документація знаходиться в папці `docs/`:

### 📚 Основні документи
| Документ | Опис |
|----------|------|
| [START_HERE.md](docs/START_HERE.md) | 🚀 Початок роботи з проектом |
| [QUICK_START.md](docs/QUICK_START.md) | ⚡ Швидкий старт |
| [PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) | 📋 Огляд проекту |
| [IDEAS.md](docs/IDEAS.md) | 💡 Ідеї для розвитку |

### 🔧 Налаштування (`docs/setup/`)
| Документ | Опис |
|----------|------|
| [LOCAL_SETUP.md](docs/setup/LOCAL_SETUP.md) | 💻 Локальне налаштування |
| [API_KEYS_SETUP.md](docs/setup/API_KEYS_SETUP.md) | 🔑 Налаштування API ключів |
| [MONOBANK_SETUP.md](docs/setup/MONOBANK_SETUP.md) | 💳 Інтеграція Monobank |
| [RESEND_SETUP_GUIDE.md](docs/setup/RESEND_SETUP_GUIDE.md) | 📧 Email сервіс |

### 🚀 Деплой (`docs/deployment/`)
| Документ | Опис |
|----------|------|
| [DEPLOYMENT_GUIDE.md](docs/deployment/DEPLOYMENT_GUIDE.md) | 📖 Повний гайд з деплою |
| [DEPLOY_NOW.md](docs/deployment/DEPLOY_NOW.md) | ⚡ Швидкий деплой |
| [VERCEL_SETUP_CHECKLIST.md](docs/deployment/VERCEL_SETUP_CHECKLIST.md) | ✅ Чеклист Vercel |

### 📊 Аналіз (`docs/analysis/`)
| Документ | Опис |
|----------|------|
| [SECURITY_CHECK.md](docs/analysis/SECURITY_CHECK.md) | 🔒 Перевірка безпеки |
| [SALES_FUNNEL_IMPLEMENTATION.md](docs/analysis/SALES_FUNNEL_IMPLEMENTATION.md) | 📈 Sales funnel |

## Deploy on Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

> 📖 Детальніше: [DEPLOYMENT_GUIDE.md](docs/deployment/DEPLOYMENT_GUIDE.md)

## License

Private project.
