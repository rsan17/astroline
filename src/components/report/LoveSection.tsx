'use client';

import { motion } from 'framer-motion';
import type { LoveSection as LoveSectionType } from '@/types/report';

interface LoveSectionProps {
  love: LoveSectionType;
  isPaid: boolean;
}

export function LoveSection({ love, isPaid }: LoveSectionProps) {
  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            💕 <span className="gradient-text">Кохання та стосунки</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ваша астрологічна сумісність та поради для серця
          </p>
        </motion.div>

        {/* Overview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <p className="text-lg text-text-primary leading-relaxed text-center">
            {love.overview}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">💪</span> Сильні сторони в коханні
            </h3>
            <ul className="space-y-3">
              {love.strengths.map((strength, index) => (
                <motion.li
                  key={strength}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> Над чим працювати
            </h3>
            <ul className="space-y-3">
              {love.challenges.map((challenge, index) => (
                <motion.li
                  key={challenge}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  {challenge}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Compatibility section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative ${!isPaid ? 'select-none' : ''}`}
        >
          <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Найкраща сумісність
          </h3>

          <div className="grid md:grid-cols-3 gap-4 relative">
            {/* Blur overlay for unpaid */}
            {!isPaid && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🔒</span>
                  <span className="text-text-secondary mb-4 block">Розблокуйте сумісність</span>
                  <button className="btn-primary text-sm">
                    Отримати доступ
                  </button>
                </div>
              </div>
            )}

            {love.topMatches.map((match, index) => (
              <motion.div
                key={match.sign}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-5 text-center ${
                  index === 0 ? 'ring-2 ring-pink-500/50 bg-pink-500/5' : ''
                }`}
              >
                {index === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-500 text-white text-xs rounded-full">
                    Найкращий матч
                  </span>
                )}
                <span className="text-4xl block mb-2">{match.symbol}</span>
                <h4 className="font-bold text-text-primary text-lg mb-1">{match.sign}</h4>
                
                {/* Compatibility percentage */}
                <div className="mb-3">
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-red-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${match.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-sm text-accent mt-1 block">{match.percentage}%</span>
                </div>

                <p className="text-xs text-text-secondary">{match.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advice card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-6 border-pink-500/20 bg-pink-500/5"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">💝</span>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Порада на 2026 рік</h4>
              <p className="text-text-secondary">{love.advice}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

