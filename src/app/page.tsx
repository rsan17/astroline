'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import {
  Hero,
  HowItWorks,
  WhatYouDiscover,
  Pricing,
  Testimonials,
  FAQ,
  FooterCTA,
  // GalaxySection, // hidden for now
} from '@/components/landing';
import { LanguageSwitcher } from '@/components/shared';
import { JsonLd, RelatedLinks } from '@/components/seo';
import {
  createOrganizationJsonLd,
  createWebApplicationJsonLd,
  createFAQJsonLd,
} from '@/lib/seo';
import { ZODIAC_SIGNS } from '@/lib/constants/zodiac';
import { useTranslations } from '@/lib/i18n';

// FAQ data for JSON-LD
const faqData = [
  {
    question: 'How accurate are the astrological predictions?',
    answer: 'Our predictions are based on classical astrology and modern algorithms. 95% of users confirm high accuracy of personalized reports.',
  },
  {
    question: 'How does palm analysis work?',
    answer: 'We use computer vision and AI technology to analyze palm lines.',
  },
  {
    question: 'Is my personal data safe?',
    answer: 'Absolutely! We use bank-level encryption to protect your data.',
  },
  {
    question: 'How long does the quiz take?',
    answer: 'The entire quiz takes approximately 3-5 minutes.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time.',
  },
];

export default function LandingPage() {
  const { t } = useTranslations();

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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-lg border-b border-white/5 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-lg md:text-xl font-bold"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-white">Astroline</span>
          </motion.a>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher variant="toggle" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link
                href="/quiz"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                         bg-white/10 border border-white/20 text-white
                         hover:bg-white/15 hover:border-white/30
                         transition-all duration-300"
              >
                {t.nav.quiz}
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouDiscover />
        
        {/* Pricing - temporarily hidden */}
        {/* <Pricing /> */}
        
        {/* Zodiac Signs Section for SEO */}
        <RelatedLinks type="zodiac" className="border-t border-white/10" />
        
        <Testimonials />
        
        {/* Interactive Galaxy Section - hidden for now */}
        {/* <GalaxySection /> */}
        
        <FAQ />
        <FooterCTA />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-xl font-bold text-white">{t.footer.brand}</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {t.footer.tagline}
              </p>
              <LanguageSwitcher variant="dropdown" />
            </div>

            {/* Zodiac Links */}
            <div className="sm:col-span-2 lg:col-span-2">
              <h4 className="font-semibold text-text-primary mb-4">{t.footer.zodiacSigns}</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                {ZODIAC_SIGNS.map((sign) => (
                  <li key={sign.slug}>
                    <Link
                      href={`/zodiac/${sign.slug}`}
                      className="text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-1"
                    >
                      <span>{sign.symbol}</span>
                      <span>{sign.nameUk}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">{t.footer.product.title}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quiz" className="text-text-secondary hover:text-accent transition-colors">
                    {t.footer.product.quiz}
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-text-secondary hover:text-accent transition-colors">
                    {t.footer.product.features}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-text-secondary hover:text-accent transition-colors">
                    {t.pricing.label}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-text-secondary hover:text-accent transition-colors">
                    {t.faq.label}
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors">
                    {t.footer.legal.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-text-secondary hover:text-accent transition-colors">
                    {t.footer.legal.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              {t.footer.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-text-muted text-sm">
              <span className="flex items-center gap-1">
                🔒 {t.footer.badges.secure}
              </span>
              <span className="flex items-center gap-1">
                💳 {t.footer.badges.stripe}
              </span>
              <span className="flex items-center gap-1">
                🇺🇦 {t.footer.badges.ukraine}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
