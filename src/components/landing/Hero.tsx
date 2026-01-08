'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Deterministic star positions to avoid hydration mismatch
const STAR_POSITIONS = [
  { left: '5%', top: '10%', size: 12, delay: 0.2, duration: 4 },
  { left: '15%', top: '25%', size: 10, delay: 0.5, duration: 5 },
  { left: '25%', top: '8%', size: 14, delay: 0.8, duration: 4.5 },
  { left: '35%', top: '35%', size: 9, delay: 0.3, duration: 5.5 },
  { left: '45%', top: '15%', size: 11, delay: 1.0, duration: 4.2 },
  { left: '55%', top: '5%', size: 13, delay: 0.6, duration: 5.2 },
  { left: '65%', top: '28%', size: 10, delay: 0.4, duration: 4.8 },
  { left: '75%', top: '12%', size: 15, delay: 0.9, duration: 5.0 },
  { left: '85%', top: '22%', size: 8, delay: 0.7, duration: 4.3 },
  { left: '92%', top: '8%', size: 12, delay: 1.2, duration: 5.5 },
  // Desktop-only stars (hidden on mobile)
  { left: '8%', top: '60%', size: 11, delay: 0.4, duration: 4.7 },
  { left: '18%', top: '75%', size: 9, delay: 0.9, duration: 5.3 },
  { left: '28%', top: '55%', size: 13, delay: 0.2, duration: 4.4 },
  { left: '38%', top: '68%', size: 10, delay: 0.7, duration: 5.1 },
  { left: '48%', top: '80%', size: 14, delay: 1.1, duration: 4.6 },
  { left: '58%', top: '62%', size: 8, delay: 0.5, duration: 5.4 },
  { left: '68%', top: '78%', size: 12, delay: 0.3, duration: 4.9 },
  { left: '78%', top: '58%', size: 11, delay: 0.8, duration: 5.2 },
  { left: '88%', top: '72%', size: 9, delay: 1.0, duration: 4.5 },
  { left: '95%', top: '65%', size: 13, delay: 0.6, duration: 5.0 },
];

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large glowing orbs - reduced size on mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4ECDC4, transparent)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #667eea, transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating stars - mobile (first 10) */}
        {STAR_POSITIONS.slice(0, 10).map((star, i) => (
          <motion.div
            key={i}
            className="absolute text-white/30"
            style={{
              left: star.left,
              top: star.top,
              fontSize: `${star.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            ✦
          </motion.div>
        ))}
        {/* Desktop-only stars (remaining 10) */}
        {STAR_POSITIONS.slice(10).map((star, i) => (
          <motion.div
            key={i + 10}
            className="absolute text-white/30 hidden md:block"
            style={{
              left: star.left,
              top: star.top,
              fontSize: `${star.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge - smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs sm:text-sm text-text-secondary">Понад 100,000+ користувачів</span>
        </motion.div>

        {/* Main heading - fluid typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bold mb-6 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)' }}
        >
          Відкрийте таємниці{' '}
          <span className="gradient-text">вашої долі</span>{' '}
          у зірках
        </motion.h1>

        {/* Subheading - responsive sizing */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto"
        >
          Персоналізований астрологічний звіт з аналізом натальної карти, 
          прогнозом на 2026 рік та унікальним читанням долоні
        </motion.p>

        {/* CTA buttons - full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/quiz?new=true" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-10 py-5 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Почати безкоштовний тест
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <span className="text-text-muted text-sm">
            ⏱️ Займає лише 3 хвилини
          </span>
        </motion.div>

        {/* Zodiac symbols decoration - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-16 text-3xl opacity-40 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 -mx-4 md:overflow-visible"
        >
          {ZODIAC_SYMBOLS.map((symbol, i) => (
            <motion.span
              key={symbol}
              className="snap-center flex-shrink-0"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on short viewports */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden min-[700px]:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-text-secondary text-center"
        >
          <span className="text-sm block mb-2">Дізнатися більше</span>
          <span className="text-2xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
