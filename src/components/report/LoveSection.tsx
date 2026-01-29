'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Lock, Check, AlertCircle } from 'lucide-react';
import type { LoveSection as LoveSectionType } from '@/types/report';

interface LoveSectionProps {
  love: LoveSectionType;
  isPaid: boolean;
  onUnlockClick?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function LoveSection({ love, isPaid, onUnlockClick }: LoveSectionProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent" />
        <motion.div
          className="absolute top-1/3 right-0 w-80 h-80 translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-red-500/20 mb-6"
          >
            <Heart className="w-8 h-8 text-pink-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Кохання та стосунки</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Ваша астрологічна сумісність та ключі до щасливих стосунків
          </p>
        </motion.div>

        {/* Overview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-10 text-center border-pink-500/10"
        >
          <p className="text-lg md:text-xl text-text-primary leading-relaxed">
            {love.overview}
          </p>
        </motion.div>

        {/* Strengths & Challenges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* Strengths */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-6 hover:border-green-500/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Сильні сторони в коханні</h3>
            </div>
            <ul className="space-y-3">
              {love.strengths.map((strength, index) => (
                <motion.li
                  key={strength}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span className="text-text-secondary">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-6 hover:border-yellow-500/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Над чим працювати</h3>
            </div>
            <ul className="space-y-3">
              {love.challenges.map((challenge, index) => (
                <motion.li
                  key={challenge}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  <span className="text-text-secondary">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Compatibility section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Найкраща сумісність
          </h3>

          <div className={`grid md:grid-cols-3 gap-5 relative ${!isPaid ? 'select-none' : ''}`}>
            {/* Locked overlay */}
            {!isPaid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex flex-col items-center justify-center rounded-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Lock className="w-7 h-7 text-text-muted" />
                </div>
                <p className="text-text-primary font-medium mb-1">Сумісність знаків</p>
                <p className="text-text-muted text-sm mb-4">Доступна у повній версії звіту</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onUnlockClick}
                  className="btn-primary text-sm px-6"
                >
                  Розблокувати
                </motion.button>
              </motion.div>
            )}

            {love.topMatches.map((match, index) => (
              <motion.div
                key={match.sign}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={isPaid ? { scale: 1.03, y: -4 } : {}}
                className={`glass rounded-2xl p-6 text-center relative transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-pink-500/30 bg-pink-500/5' : ''
                }`}
              >
                {index === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-medium rounded-full shadow-lg">
                    Найкращий матч
                  </span>
                )}
                
                <motion.span
                  className="text-5xl block mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {match.symbol}
                </motion.span>
                <h4 className="font-bold text-text-primary text-lg mb-3">{match.sign}</h4>
                
                {/* Compatibility bar */}
                <div className="mb-4">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${match.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-pink-400 mt-2 block">{match.percentage}%</span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">{match.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advice card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-2xl p-6 md:p-8 border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-transparent"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-lg mb-2">Порада на 2026 рік</h4>
              <p className="text-text-secondary leading-relaxed">{love.advice}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
