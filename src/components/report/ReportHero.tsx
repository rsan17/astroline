'use client';

import { motion } from 'framer-motion';
import { getElementEmoji } from '@/lib/report-data';
import type { NatalChart } from '@/types/report';

interface ReportHeroProps {
  natalChart: NatalChart;
  userName?: string;
}

export function ReportHero({ natalChart, userName }: ReportHeroProps) {
  const { sunSign } = natalChart;
  
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Subtle glowing orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(84, 143, 194, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Zodiac symbol */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.3 }}
          className="mb-8"
        >
          <span className="text-7xl md:text-8xl block mb-4">
            {sunSign.symbol}
          </span>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-lg">{getElementEmoji(sunSign.element)}</span>
            <span className="text-white/40 text-sm font-light">
              {sunSign.element === 'fire' ? 'Вогонь' : sunSign.element === 'earth' ? 'Земля' : sunSign.element === 'air' ? 'Повітря' : 'Вода'}
            </span>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-heading text-white mb-4"
        >
          {userName ? (
            <>
              Привіт, <span className="text-accent">{userName}</span>!
            </>
          ) : (
            <>
              Вітаємо, <span className="text-accent">{sunSign.name}</span>!
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/60 font-light mb-10"
        >
          Ваш персональний астрологічний звіт готовий
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
            <div className="text-2xl mb-1">☀️ {natalChart.sunSign.symbol}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Сонце</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
            <div className="text-2xl mb-1">🌙 {natalChart.moonSign.symbol}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Місяць</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
            <div className="text-2xl mb-1">⬆️ {natalChart.risingSign.symbol}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Асцендент</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/30 text-center"
        >
          <span className="text-xs uppercase tracking-widest">Прокрутіть вниз</span>
          <div className="text-lg mt-1">↓</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
