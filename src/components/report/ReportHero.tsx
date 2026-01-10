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
      {/* Animated constellation background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing orb effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Zodiac symbol */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
          className="mb-6"
        >
          <span className="text-8xl md:text-9xl block mb-4">
            {sunSign.symbol}
          </span>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-lg">{getElementEmoji(sunSign.element)}</span>
            <span className="text-text-secondary text-sm">{sunSign.element === 'fire' ? 'Вогонь' : sunSign.element === 'earth' ? 'Земля' : sunSign.element === 'air' ? 'Повітря' : 'Вода'}</span>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          {userName ? (
            <>
              Привіт, <span className="gradient-text">{userName}</span>!
            </>
          ) : (
            <>
              Вітаємо, <span className="gradient-text">{sunSign.name}</span>!
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-text-secondary mb-8"
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
          <div className="glass rounded-xl px-6 py-3">
            <div className="text-2xl mb-1">☀️ {natalChart.sunSign.symbol}</div>
            <div className="text-xs text-text-secondary">Сонце</div>
          </div>
          <div className="glass rounded-xl px-6 py-3">
            <div className="text-2xl mb-1">🌙 {natalChart.moonSign.symbol}</div>
            <div className="text-xs text-text-secondary">Місяць</div>
          </div>
          <div className="glass rounded-xl px-6 py-3">
            <div className="text-2xl mb-1">⬆️ {natalChart.risingSign.symbol}</div>
            <div className="text-xs text-text-secondary">Асцендент</div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator - positioned relative to section, not content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-text-secondary text-center"
        >
          <span className="text-sm">Прокрутіть вниз</span>
          <div className="text-2xl">↓</div>
        </motion.div>
      </motion.div>
    </section>
  );
}

