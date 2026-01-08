'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const elementOptions = [
  { 
    value: 'fire', 
    label: 'Вогонь', 
    icon: '🔥', 
    description: 'Енергія, пристрасть, дія',
    gradient: 'from-orange-500 to-red-600'
  },
  { 
    value: 'water', 
    label: 'Вода', 
    icon: '💧', 
    description: 'Емоції, інтуїція, глибина',
    gradient: 'from-blue-400 to-blue-600'
  },
  { 
    value: 'earth', 
    label: 'Земля', 
    icon: '🌍', 
    description: 'Стабільність, практичність',
    gradient: 'from-green-500 to-emerald-700'
  },
  { 
    value: 'air', 
    label: 'Повітря', 
    icon: '💨', 
    description: 'Інтелект, спілкування, свобода',
    gradient: 'from-cyan-300 to-sky-500'
  },
];

export function ElementStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateData({ element: value });
  };

  const canContinue = !!data.element;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-5xl mb-4"
        >
          ✨
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Який елемент вас притягує?
        </h2>
        <p className="text-text-secondary">
          Оберіть той, з яким відчуваєте найбільший зв'язок
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {elementOptions.map((option, index) => {
          const isSelected = data.element === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300',
                'bg-gradient-to-br',
                option.gradient,
                isSelected && 'ring-4 ring-white/50 shadow-glow-lg'
              )}
            >
              <motion.span 
                className="text-4xl block mb-2"
                animate={isSelected ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {option.icon}
              </motion.span>
              <span className="text-lg font-bold text-white block">
                {option.label}
              </span>
              <span className="text-xs text-white/80 block mt-1">
                {option.description}
              </span>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

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

