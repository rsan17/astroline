'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Hero,
  Features,
  SocialProof,
  Testimonials,
  FAQ,
  FooterCTA,
} from '@/components/landing';
import { JsonLd, RelatedLinks } from '@/components/seo';
import {
  createOrganizationJsonLd,
  createWebApplicationJsonLd,
  createFAQJsonLd,
} from '@/lib/seo';
import { ZODIAC_SIGNS } from '@/lib/constants/zodiac';

// FAQ data for JSON-LD (matching FAQ component)
const faqData = [
  {
    question: 'Наскільки точні астрологічні прогнози?',
    answer: 'Наші прогнози базуються на класичній астрології та сучасних алгоритмах. 95% користувачів підтверджують високу точність персоналізованих звітів.',
  },
  {
    question: 'Як працює аналіз долоні?',
    answer: 'Ми використовуємо технологію комп\'ютерного зору та AI для аналізу ліній долоні.',
  },
  {
    question: 'Чи безпечні мої персональні дані?',
    answer: 'Абсолютно! Ми використовуємо шифрування банківського рівня для захисту ваших даних.',
  },
  {
    question: 'Скільки часу займає проходження квізу?',
    answer: 'Весь квіз займає приблизно 3-5 хвилин.',
  },
  {
    question: 'Чи можу я скасувати підписку?',
    answer: 'Так, ви можете скасувати підписку в будь-який момент.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <JsonLd
        data={[
          createOrganizationJsonLd(),
          createWebApplicationJsonLd(),
          createFAQJsonLd(faqData),
        ]}
      />

      {/* Navigation - safe area support + responsive */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm md:backdrop-blur-md border-b border-white/5 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-3 flex items-center justify-between">
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-bold gradient-text"
          >
            ✨ Astroline
          </motion.a>
          <motion.a
            href="/quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="btn-secondary text-sm py-2 px-4"
          >
            Почати тест
          </motion.a>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Hero />
        <SocialProof />
        <Features />
        
        {/* Zodiac Signs Section for SEO */}
        <RelatedLinks type="zodiac" className="border-t border-white/10" />
        
        <Testimonials />
        <FAQ />
        <FooterCTA />
      </main>

      {/* Footer with sitemap links - responsive grid */}
      <footer className="border-t border-white/10 py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand - full width on mobile, 2 cols on sm, 1 col on lg */}
            <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
              <h3 className="text-xl font-bold gradient-text mb-4">✨ Astroline</h3>
              <p className="text-text-secondary text-sm max-w-md mx-auto sm:mx-0">
                Ваш персональний астрологічний гід. Відкрийте таємниці вашої долі 
                з персоналізованими звітами та прогнозами.
              </p>
            </div>

            {/* Zodiac Links - merged into single column with 2-col internal grid */}
            <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <h4 className="font-semibold text-text-primary mb-4">Знаки зодіаку</h4>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {ZODIAC_SIGNS.map((sign) => (
                  <li key={sign.slug}>
                    <Link
                      href={`/zodiac/${sign.slug}`}
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      {sign.symbol} {sign.nameUk}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-text-primary mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quiz" className="text-text-secondary hover:text-accent transition-colors">
                    Пройти квіз
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-text-secondary hover:text-accent transition-colors">
                    Можливості
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-text-secondary hover:text-accent transition-colors">
                    Відгуки
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-text-secondary hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors">
                    Конфіденційність
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-text-secondary hover:text-accent transition-colors">
                    Умови використання
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar - centered on mobile */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-text-muted text-sm text-center sm:text-left">
              © 2026 Astroline. Усі права захищені.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-text-muted text-sm">
              <span>🔒 Безпечна оплата</span>
              <span>💳 Stripe</span>
              <span>🇺🇦 Зроблено в Україні</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
