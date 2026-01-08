'use client';

import { motion } from 'framer-motion';
import type { CareerSection as CareerSectionType } from '@/types/report';
import { Briefcase, TrendingUp, Wallet, Target } from 'lucide-react';

interface CareerSectionProps {
  career: CareerSectionType;
  isPaid: boolean;
}

export function CareerSection({ career, isPaid }: CareerSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            💼 <span className="gradient-text">Кар'єра та фінанси</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ваш професійний потенціал і фінансові можливості
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <p className="text-lg text-text-primary leading-relaxed text-center">
            {career.overview}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Професійні сильні сторони</h3>
            </div>
            <ul className="space-y-3">
              {career.strengths.map((strength, index) => (
                <motion.li
                  key={strength}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">✓</span>
                  <span className="text-text-secondary">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Ideal careers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass rounded-2xl p-6 relative overflow-hidden ${!isPaid ? 'select-none' : ''}`}
          >
            {/* Blur overlay */}
            {!isPaid && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🔒</span>
                  <span className="text-sm text-text-secondary">Доступно в повній версії</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Ідеальні професії</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {career.idealCareers.map((careerItem, index) => (
                <motion.span
                  key={careerItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm"
                >
                  {careerItem}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Finance tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-8 glass rounded-2xl p-6 relative overflow-hidden ${!isPaid ? 'select-none' : ''}`}
        >
          {/* Blur overlay */}
          {!isPaid && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🔒</span>
                <span className="text-text-secondary mb-4 block">Розблокуйте фінансові поради</span>
                <button className="btn-primary text-sm">
                  Отримати доступ
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Фінансові поради</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {career.financeTips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4"
              >
                <span className="text-2xl mb-2 block">
                  {index === 0 ? '💰' : index === 1 ? '📊' : '🎯'}
                </span>
                <p className="text-sm text-text-secondary">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Year focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-6 border-accent/20 bg-accent/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Фокус 2026 року</h4>
              <p className="text-text-secondary">{career.yearFocus}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

