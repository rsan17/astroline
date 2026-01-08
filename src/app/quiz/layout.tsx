import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Астрологічний тест - Дізнайтеся свою долю',
  description: 'Пройдіть безкоштовний астрологічний тест та отримайте персоналізований звіт з натальною картою, прогнозом на 2026 рік та аналізом долоні. Займає лише 3 хвилини!',
  keywords: [
    'астрологічний тест',
    'безкоштовний гороскоп',
    'натальна карта онлайн',
    'персональний гороскоп',
    'астрологія україна',
  ],
  openGraph: {
    title: 'Астрологічний тест - Дізнайтеся свою долю | Astroline',
    description: 'Пройдіть безкоштовний астрологічний тест та отримайте персоналізований звіт. Займає лише 3 хвилини!',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Loading fallback for Suspense
function QuizLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-text-secondary">Завантаження...</p>
      </div>
    </div>
  );
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<QuizLoading />}>
      {children}
    </Suspense>
  );
}
