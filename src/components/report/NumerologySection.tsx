'use client';

import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import type { NumerologyData } from '@/types/report';

interface NumerologySectionProps {
  numerology: NumerologyData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function NumerologySection({ numerology }: NumerologySectionProps) {
  const {
    lifePathNumber,
    lifePathMeaning,
    birthdayNumber,
    birthdayMeaning,
    isMasterNumber,
    personalYear2026,
    personalYearMeaning,
  } = numerology;

  const numberCards = [
    {
      title: 'Число Життєвого Шляху',
      number: lifePathNumber,
      meaning: lifePathMeaning,
      icon: '🛤️',
      description: 'Ваша головна життєва місія',
      gradient: 'from-purple-500 to-indigo-600',
      isMaster: isMasterNumber,
    },
    {
      title: 'Число Дня Народження',
      number: birthdayNumber,
      meaning: birthdayMeaning,
      icon: '🎂',
      description: 'Ваші природжені таланти',
      gradient: 'from-pink-500 to-rose-600',
      isMaster: false,
    },
    {
      title: 'Персональний Рік 2026',
      number: personalYear2026,
      meaning: personalYearMeaning,
      icon: '📅',
      description: 'Тема вашого року',
      gradient: 'from-amber-500 to-orange-600',
      isMaster: false,
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl font-bold text-accent">
          {lifePathNumber}
        </div>
        <div className="absolute bottom-10 right-10 text-9xl font-bold text-purple-500">
          {birthdayNumber}
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mb-6"
          >
            <Hash className="w-8 h-8 text-purple-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Нумерологічний Профіль</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Числа у вашій даті народження розкривають глибинні аспекти вашої особистості та долі
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {numberCards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
            >
              {/* Master number badge */}
              {card.isMaster && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-background text-xs font-bold px-2 py-1 rounded-full">
                  Майстер-число ✨
                </div>
              )}

              {/* Icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">{card.title}</h3>
                  <p className="text-xs text-text-muted">{card.description}</p>
                </div>
              </div>

              {/* Big number display */}
              <div className="flex items-center justify-center my-6">
                <motion.div
                  className={`text-6xl md:text-7xl font-bold bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                >
                  {card.number}
                </motion.div>
              </div>

              {/* Meaning */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {card.meaning}
              </p>

              {/* Decorative gradient line */}
              <div className={`h-1 w-full bg-gradient-to-r ${card.gradient} mt-4 rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Number meanings legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
            📚 Що означають ваші числа
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛤️</span>
              <div>
                <span className="font-medium text-text-primary">Життєвий Шлях</span>
                <p className="text-text-muted">
                  Найважливіше число — показує вашу головну місію в цьому житті, ваші природні здібності та виклики.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎂</span>
              <div>
                <span className="font-medium text-text-primary">День Народження</span>
                <p className="text-text-muted">
                  Вроджені таланти та здібності, з якими ви прийшли у цей світ.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <span className="font-medium text-text-primary">Персональний Рік</span>
                <p className="text-text-muted">
                  Тема та енергія, яка буде домінувати у вашому 2026 році.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <span className="font-medium text-text-primary">Майстер-числа</span>
                <p className="text-text-muted">
                  11, 22, 33 — особливо потужні числа з підвищеним духовним потенціалом.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
