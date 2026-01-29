'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Wallet, Target, Lock, Check } from 'lucide-react';
import type { CareerSection as CareerSectionType } from '@/types/report';

interface CareerSectionProps {
  career: CareerSectionType;
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

export function CareerSection({ career, isPaid, onUnlockClick }: CareerSectionProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent" />
        <motion.div
          className="absolute bottom-1/3 left-0 w-80 h-80 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-6"
          >
            <Briefcase className="w-8 h-8 text-emerald-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Кар'єра та фінанси</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Ваш професійний потенціал та шляхи до фінансового успіху
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-10 text-center border-emerald-500/10"
        >
          <p className="text-lg md:text-xl text-text-primary leading-relaxed">
            {career.overview}
          </p>
        </motion.div>

        {/* Strengths & Careers grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Strengths */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
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
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-text-secondary">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Ideal careers */}
          <motion.div
            variants={itemVariants}
            className={`glass rounded-2xl p-6 relative overflow-hidden ${!isPaid ? 'select-none' : ''}`}
          >
            {!isPaid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-text-muted" />
                </div>
                <span className="text-sm text-text-secondary">Доступно в повній версії</span>
              </motion.div>
            )}

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
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
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium cursor-default"
                >
                  {careerItem}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Finance tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`glass rounded-2xl p-6 md:p-8 relative overflow-hidden mb-10 ${!isPaid ? 'select-none' : ''}`}
        >
          {!isPaid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-text-muted" />
              </div>
              <p className="text-text-primary font-medium mb-1">Фінансові поради</p>
              <p className="text-text-muted text-sm mb-4">Доступні у повній версії звіту</p>
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

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
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
                whileHover={{ y: -4 }}
                className="bg-white/5 hover:bg-white/8 rounded-xl p-5 transition-all duration-300"
              >
                <span className="text-3xl mb-3 block">
                  {index === 0 ? '💰' : index === 1 ? '📊' : '🎯'}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Year focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-lg mb-2">Фокус 2026 року</h4>
              <p className="text-text-secondary leading-relaxed">{career.yearFocus}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
