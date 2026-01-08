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
src/
├── app/
│   ├── api/
│   │   └── generate-report/  # AI report generation endpoint
│   ├── quiz/                 # Quiz flow
│   ├── report/               # Report display
│   └── zodiac/               # Zodiac sign pages
├── components/
│   ├── landing/              # Landing page components
│   ├── quiz/                 # Quiz step components
│   ├── report/               # Report section components
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── ai/                   # AI service layer
│   │   ├── astro-report.ts   # Main AI generation
│   │   ├── prompts.ts        # AI prompts
│   │   └── index.ts          # Exports
│   └── report-data.ts        # Static fallback data
└── types/
    └── report.ts             # TypeScript types
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## Deploy on Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

Private project.
