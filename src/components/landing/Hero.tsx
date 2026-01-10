'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
      {/* Subtle background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #548FC2, transparent)' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8b9dc3, transparent)' }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Minimal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <span className="text-sm text-white/60 font-light">Понад 100,000+ користувачів</span>
        </motion.div>

        {/* Main heading - Philosopher font, white */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading text-white tracking-wide leading-tight"
        >
          Astroline
        </motion.h1>

        {/* Subheading - lighter, elegant */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-cosmic-muted font-light max-w-lg mx-auto leading-relaxed"
        >
          Відкрийте таємниці вашої долі через призму давньої мудрості. 
          Мінімалістичні інсайти для сучасної душі.
        </motion.p>

        {/* CTA button - clean style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <Link href="/quiz?new=true">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
            >
              Почати безкоштовний тест
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <p className="text-white/40 text-sm mt-4 font-light">
            Займає лише 3 хвилини
          </p>
        </motion.div>

        {/* Zodiac symbols - subtle floating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-16 text-2xl opacity-30"
        >
          {ZODIAC_SYMBOLS.map((symbol, i) => (
            <motion.span
              key={symbol}
              className="text-white/60"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/30 text-center"
        >
          <span className="text-xs uppercase tracking-widest block mb-2">Прокрутіть вниз</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
