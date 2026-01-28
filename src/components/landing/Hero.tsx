'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { GalaxyBackground } from '@/components/effects';
import { LaserFlowButton } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// Constellation positions for floating decoration
const CONSTELLATIONS = [
  { left: '5%', top: '15%', rotation: 15, scale: 0.8 },
  { left: '85%', top: '20%', rotation: -20, scale: 0.9 },
  { left: '10%', top: '70%', rotation: 30, scale: 0.7 },
  { left: '90%', top: '65%', rotation: -15, scale: 0.85 },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const floatVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
      {/* Galaxy Background */}
      <GalaxyBackground intensity="high" enableParallax />

      {/* Floating constellation decorations - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {CONSTELLATIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-accent/20"
            style={{
              left: pos.left,
              top: pos.top,
              transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
            }}
            variants={floatVariants}
            animate="animate"
            custom={i}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="30" cy="20" r="1.5" fill="currentColor" />
              <circle cx="50" cy="15" r="2" fill="currentColor" />
              <circle cx="70" cy="30" r="1.5" fill="currentColor" />
              <circle cx="40" cy="50" r="2" fill="currentColor" />
              <circle cx="60" cy="60" r="1.5" fill="currentColor" />
              <line x1="10" y1="10" x2="30" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="30" y1="20" x2="50" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="50" y1="15" x2="70" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="30" y1="20" x2="40" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="40" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Trust Badge */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-8"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-text-secondary">{t.hero.badge}</span>
        </motion.div>

        {/* Main Heading with staggered reveal */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-heading font-bold mb-6 leading-[1.1] px-2 sm:px-0"
          style={{ fontSize: 'clamp(2rem, 5vw + 1rem, 4.5rem)' }}
        >
          <span className="text-text-primary">{t.hero.title} </span>
          <br className="sm:hidden" />
          <span className="gradient-text">{t.hero.titleHighlight}</span>
          <br className="hidden sm:block" />
          <span className="text-text-primary"> {t.hero.titleEnd}</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <Link href="/quiz?new=true" className="w-full sm:w-auto">
            <LaserFlowButton
              variant="purple"
              size="xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto min-w-[280px]"
            >
              {t.hero.cta}
            </LaserFlowButton>
          </Link>

          <motion.span
            className="text-text-muted text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="inline-flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              {t.hero.ctaSubtext}
            </span>
          </motion.span>
        </motion.div>

        {/* Inline Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/5"
        >
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Users className="w-4 h-4 text-accent" />
            <span>100K+ {t.socialProof.users}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
              ))}
            </div>
            <span>4.9 {t.socialProof.rating}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Shield className="w-4 h-4 text-green-500" />
            <span>{t.socialProof.verified}</span>
          </div>
        </motion.div>

        {/* Zodiac symbols decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mt-12 text-xl sm:text-2xl opacity-30 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 -mx-4 md:overflow-visible"
        >
          {ZODIAC_SYMBOLS.map((symbol, i) => (
            <motion.span
              key={symbol}
              className="snap-center flex-shrink-0"
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden min-[700px]:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-text-secondary text-center flex flex-col justify-center items-center"
        >
          <span className="text-xs block mb-2">{t.hero.scrollHint}</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1 h-2 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
