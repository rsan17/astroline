'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const goalOptions = [
  { value: 'love', label: 'Кохання', icon: '❤️' },
  { value: 'career', label: 'Кар\'єра', icon: '💼' },
  { value: 'health', label: 'Здоров\'я', icon: '🏥' },
  { value: 'finance', label: 'Фінанси', icon: '💰' },
  { value: 'spiritual', label: 'Духовний розвиток', icon: '🧘' },
  { value: 'future', label: 'Майбутнє', icon: '🔮' },
];

const MAX_GOALS = 3;

export function GoalsStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();
  const selectedGoals = data.goals || [];

  const toggleGoal = (value: string) => {
    const isSelected = selectedGoals.includes(value);
    
    if (isSelected) {
      updateData({ goals: selectedGoals.filter(g => g !== value) });
    } else if (selectedGoals.length < MAX_GOALS) {
      updateData({ goals: [...selectedGoals, value] });
    }
  };

  const canContinue = selectedGoals.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl mb-4"
        >
          🎯
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Що вас цікавить найбільше?
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-lg"
          >
            ☝️
          </motion.span>
          <span className="text-sm font-medium text-accent">
            Оберіть до {MAX_GOALS} варіантів
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {goalOptions.map((option, index) => {
          const isSelected = selectedGoals.includes(option.value);
          const isDisabled = !isSelected && selectedGoals.length >= MAX_GOALS;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              onClick={() => toggleGoal(option.value)}
              disabled={isDisabled}
              className={cn(
                'glass rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300',
                isSelected && 'border-accent/50 bg-accent/10 ring-2 ring-accent/20',
                isDisabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              <span className="text-3xl">{option.icon}</span>
              <span className="text-sm font-medium text-text-primary">{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center mb-6">
        <span className="text-sm text-text-muted">
          Обрано: {selectedGoals.length} з {MAX_GOALS}
        </span>
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

