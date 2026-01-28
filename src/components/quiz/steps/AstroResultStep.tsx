'use client';

import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon, ArrowUp } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';

const signInfo: Record<string, { icon: string; element: string; color: string }> = {
  'Овен': { icon: '♈', element: '🔥', color: 'from-red-500/20 to-orange-500/20' },
  'Телець': { icon: '♉', element: '🌍', color: 'from-green-500/20 to-emerald-500/20' },
  'Близнюки': { icon: '♊', element: '💨', color: 'from-cyan-500/20 to-blue-500/20' },
  'Рак': { icon: '♋', element: '💧', color: 'from-blue-500/20 to-indigo-500/20' },
  'Лев': { icon: '♌', element: '🔥', color: 'from-yellow-500/20 to-orange-500/20' },
  'Діва': { icon: '♍', element: '🌍', color: 'from-emerald-500/20 to-teal-500/20' },
  'Терези': { icon: '♎', element: '💨', color: 'from-pink-500/20 to-purple-500/20' },
  'Скорпіон': { icon: '♏', element: '💧', color: 'from-purple-500/20 to-red-500/20' },
  'Стрілець': { icon: '♐', element: '🔥', color: 'from-orange-500/20 to-red-500/20' },
  'Козеріг': { icon: '♑', element: '🌍', color: 'from-stone-500/20 to-slate-500/20' },
  'Водолій': { icon: '♒', element: '💨', color: 'from-blue-500/20 to-cyan-500/20' },
  'Риби': { icon: '♓', element: '💧', color: 'from-indigo-500/20 to-purple-500/20' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AstroResultStep() {
  const { data, nextStep, prevStep } = useQuizStore();

  const signs = [
    { label: 'Сонячний знак', value: data.sunSign || 'Лев', icon: Sun, colorIcon: 'text-yellow-400' },
    { label: 'Місячний знак', value: data.moonSign || 'Риби', icon: Moon, colorIcon: 'text-blue-300' },
    { label: 'Асцендент', value: data.risingSign || 'Скорпіон', icon: ArrowUp, colorIcon: 'text-accent' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-amber-500/20 mb-4"
        >
          <Sparkles className="w-8 h-8 text-gold" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold gradient-text mb-3"
        >
          Ваша натальна карта
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary"
        >
          Ось що розповідають зірки про вас
        </motion.p>
      </div>

      {/* Sign cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 mb-8"
      >
        {signs.map((sign) => {
          const info = signInfo[sign.value] || { icon: '✨', element: '', color: 'from-accent/20 to-teal-500/20' };
          const IconComponent = sign.icon;
          
          return (
            <motion.div
              key={sign.label}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-accent/30 transition-all duration-300"
            >
              <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                <IconComponent className={`w-6 h-6 ${sign.colorIcon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-muted font-medium uppercase tracking-wider">{sign.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl">{info.icon}</span>
                  <span className="text-xl font-bold text-text-primary">{sign.value}</span>
                  <span className="text-lg">{info.element}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-5 mb-8 border-gold/20 bg-gold/5"
      >
        <p className="text-center text-sm text-text-secondary flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          Ваша унікальна комбінація знаків дуже рідкісна! Продовжіть, щоб дізнатись більше.
          <Sparkles className="w-4 h-4 text-gold" />
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-4 justify-center"
      >
        <Button variant="secondary" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={nextStep}>
          Продовжити
        </Button>
      </motion.div>
    </motion.div>
  );
}
