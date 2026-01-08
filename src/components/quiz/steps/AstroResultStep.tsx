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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 100,
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
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="text-6xl mb-4"
        >
          🌟
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold gradient-text mb-3"
        >
          Ваша натальна карта
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-text-secondary"
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
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-3xl">
                {sign.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-secondary">{sign.label}</p>
                <p className="text-xl font-bold text-text-primary flex items-center gap-2">
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
        className="glass rounded-2xl p-4 mb-8"
      >
        <p className="text-center text-sm text-text-secondary">
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

