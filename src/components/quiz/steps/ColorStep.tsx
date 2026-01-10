'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const colorOptions = [
  { value: 'red', label: 'Червоний', color: '#ef4444', meaning: 'Пристрасть' },
  { value: 'blue', label: 'Синій', color: '#548FC2', meaning: 'Спокій' },
  { value: 'green', label: 'Зелений', color: '#22c55e', meaning: 'Гармонія' },
  { value: 'purple', label: 'Фіолетовий', color: '#a855f7', meaning: 'Духовність' },
  { value: 'gold', label: 'Золотий', color: '#fbbf24', meaning: 'Успіх' },
  { value: 'teal', label: 'Бірюзовий', color: '#4ECDC4', meaning: 'Інтуїція' },
];

export function ColorStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateData({ favoriteColor: value });
  };

  const canContinue = !!data.favoriteColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl mb-4"
        >
          🎨
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-heading text-white mb-3">
          Ваш улюблений колір
        </h2>
        <p className="text-white/60 font-light">
          Кольори мають глибокий зв'язок з вашою енергією
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {colorOptions.map((option, index) => {
          const isSelected = data.favoriteColor === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'relative aspect-square rounded-2xl transition-all duration-300',
                isSelected && 'ring-2 ring-white/50'
              )}
              style={{ backgroundColor: option.color }}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              )}
              <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-white drop-shadow-lg">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {data.favoriteColor && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-white/60 font-light">
            {colorOptions.find(c => c.value === data.favoriteColor)?.meaning}
          </span>
        </motion.div>
      )}

      <div className="flex gap-4 justify-center">
        <Button variant="secondary" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={nextStep} disabled={!canContinue}>
          Продовжити
        </Button>
      </div>
    </motion.div>
  );
}
