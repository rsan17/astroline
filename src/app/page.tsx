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
    answer: "Ми використовуємо технологію комп'ютерного зору та AI для аналізу ліній долоні.",
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
    <div className="min-h-screen selection:bg-accent/30">
      {/* JSON-LD Structured Data */}
      <JsonLd
        data={[
          createOrganizationJsonLd(),
          createWebApplicationJsonLd(),
          createFAQJsonLd(faqData),
        ]}
      />

      {/* Navigation - minimal cosmic style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-bg/80 backdrop-blur-sm border-b border-white/5 pt-[env(safe-area-inset-top)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-heading text-white tracking-wide"
          >
            Astroline
          </motion.a>
          <motion.a
            href="/quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/30 px-4 py-2 rounded-full transition-all duration-300"
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
        <RelatedLinks type="zodiac" className="border-t border-white/5" />
        
        <Testimonials />
        <FAQ />
        <FooterCTA />
      </main>

      {/* Footer - minimal cosmic style */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
              <h3 className="text-xl font-heading text-white mb-4">Astroline</h3>
              <p className="text-white/40 text-sm font-light max-w-md mx-auto sm:mx-0 leading-relaxed">
                Ваш персональний астрологічний гід. Відкрийте таємниці вашої долі 
                з персоналізованими звітами та прогнозами.
              </p>
            </div>

            {/* Zodiac Links */}
            <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Знаки зодіаку</h4>
              <ul className="grid grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-2 text-sm">
                {ZODIAC_SIGNS.map((sign) => (
                  <li key={sign.slug}>
                    <Link
                      href={`/zodiac/${sign.slug}`}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {sign.symbol} {sign.nameUk}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quiz" className="text-white/40 hover:text-white transition-colors">
                    Пройти квіз
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-white/40 hover:text-white transition-colors">
                    Можливості
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/40 hover:text-white transition-colors">
                    Відгуки
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white/40 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/40 hover:text-white transition-colors">
                    Конфіденційність
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/40 hover:text-white transition-colors">
                    Умови використання
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-white/30 text-sm font-light text-center sm:text-left">
              © {new Date().getFullYear()} Astroline. Guided by the stars.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/30 text-sm font-light">
              <span>🔒 Безпечна оплата</span>
              <span>💳 Stripe</span>
              <span>🇺🇦 Україна</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
