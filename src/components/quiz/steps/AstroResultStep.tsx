'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';

const signInfo: Record<string, { icon: string; element: string }> = {
  'Овен': { icon: '♈', element: '🔥' },
  'Телець': { icon: '♉', element: '🌍' },
  'Близнюки': { icon: '♊', element: '💨' },
  'Рак': { icon: '♋', element: '💧' },
  'Лев': { icon: '♌', element: '🔥' },
  'Діва': { icon: '♍', element: '🌍' },
  'Терези': { icon: '♎', element: '💨' },
  'Скорпіон': { icon: '♏', element: '💧' },
  'Стрілець': { icon: '♐', element: '🔥' },
  'Козеріг': { icon: '♑', element: '🌍' },
  'Водолій': { icon: '♒', element: '💨' },
  'Риби': { icon: '♓', element: '💧' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

export function AstroResultStep() {
  const { data, nextStep, prevStep } = useQuizStore();

  const signs = [
    { label: 'Сонячний знак', value: data.sunSign || 'Лев', icon: '☀️' },
    { label: 'Місячний знак', value: data.moonSign || 'Риби', icon: '🌙' },
    { label: 'Асцендент', value: data.risingSign || 'Скорпіон', icon: '⬆️' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-5xl mb-4"
        >
          🌟
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-heading text-white mb-3"
        >
          Ваша натальна карта
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 font-light"
        >
          Ось що розповідають зірки про вас
        </motion.p>
      </div>

      <div className="space-y-4 mb-8">
        {signs.map((sign, index) => {
          const info = signInfo[sign.value] || { icon: '✨', element: '' };
          
          return (
            <motion.div
              key={sign.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                {sign.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">{sign.label}</p>
                <p className="text-xl font-heading text-white flex items-center gap-2">
                  <span className="text-2xl">{info.icon}</span>
                  {sign.value}
                  <span className="text-lg">{info.element}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8"
      >
        <p className="text-center text-sm text-white/60 font-light">
          ✨ Ваша унікальна комбінація знаків дуже рідкісна! 
          Продовжіть, щоб дізнатись більше.
        </p>
      </motion.div>

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
