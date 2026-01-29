'use client';

import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon, ArrowUp } from 'lucide-react';
import { getElementEmoji } from '@/lib/report-data';
import type { NatalChart } from '@/types/report';
import { isUnknownSign } from '@/types/report';

interface ReportHeroProps {
  natalChart: NatalChart;
  userName?: string;
}

// Animation variants following design system (600ms for transitions)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function ReportHero({ natalChart, userName }: ReportHeroProps) {
  const { sunSign, moonSign, risingSign } = natalChart;
  
  const elementName = {
    fire: 'Вогонь',
    earth: 'Земля',
    air: 'Повітря',
    water: 'Вода',
  }[sunSign.element];

  const elementGradient = {
    fire: 'from-orange-500 to-red-600',
    earth: 'from-emerald-500 to-green-600',
    air: 'from-cyan-400 to-blue-500',
    water: 'from-blue-500 to-indigo-600',
  }[sunSign.element];
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%)` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)` }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${10 + (i * 17) % 80}%`,
              top: `${10 + (i * 23) % 80}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Zodiac symbol with glow */}
        <motion.div variants={scaleVariants} className="mb-8">
          <motion.div
            className="relative inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-8xl md:text-9xl lg:text-[10rem] block filter drop-shadow-[0_0_30px_rgba(78,205,196,0.3)]">
              {sunSign.symbol}
            </span>
          </motion.div>
          
          {/* Element badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full glass"
          >
            <span className="text-xl">{getElementEmoji(sunSign.element)}</span>
            <span className="text-text-secondary text-sm font-medium">{elementName}</span>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm text-text-secondary uppercase tracking-wider">Ваш персональний звіт</span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          {userName ? (
            <>
              Вітаємо, <span className="gradient-text">{userName}</span>!
            </>
          ) : (
            <>
              Вітаємо, <span className="gradient-text">{sunSign.name}</span>!
            </>
          )}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto"
        >
          Ваша унікальна космічна карта розкриває таємниці вашої особистості, 
          долі та потенціалу на 2026 рік
        </motion.p>

        {/* Natal chart cards */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {/* Sun Sign */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="glass rounded-2xl px-6 py-4 md:px-8 md:py-5 min-w-[120px]"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-3xl md:text-4xl">{sunSign.symbol}</span>
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Сонце</div>
            <div className="text-sm font-medium text-text-primary mt-1">{sunSign.name}</div>
          </motion.div>

          {/* Moon Sign */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="glass rounded-2xl px-6 py-4 md:px-8 md:py-5 min-w-[120px]"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-blue-300" />
              <span className="text-3xl md:text-4xl">
                {isUnknownSign(moonSign) ? '?' : moonSign.symbol}
              </span>
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Місяць</div>
            <div className="text-sm font-medium text-text-primary mt-1">
              {isUnknownSign(moonSign) ? 'Невідомо' : moonSign.name}
            </div>
          </motion.div>

          {/* Rising Sign */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="glass rounded-2xl px-6 py-4 md:px-8 md:py-5 min-w-[120px]"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <ArrowUp className="w-5 h-5 text-accent" />
              <span className="text-3xl md:text-4xl">
                {isUnknownSign(risingSign) ? '?' : risingSign.symbol}
              </span>
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Асцендент</div>
            <div className="text-sm font-medium text-text-primary mt-1">
              {isUnknownSign(risingSign) ? 'Невідомо' : risingSign.name}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text-secondary text-center flex flex-col items-center"
          >
            <span className="text-sm mb-2">Прокрутіть для перегляду звіту</span>
            <motion.div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-2.5 bg-accent rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
