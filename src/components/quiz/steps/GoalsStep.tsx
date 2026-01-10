'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const goalOptions = [
  { value: 'love', label: 'Кохання', icon: '❤️' },
  { value: 'career', label: "Кар'єра", icon: '💼' },
  { value: 'health', label: "Здоров'я", icon: '🏥' },
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
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl mb-4"
        >
          🎯
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-heading text-white mb-3">
          Що вас цікавить найбільше?
        </h2>
        <p className="text-white/60 font-light">
          Оберіть до {MAX_GOALS} варіантів
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {goalOptions.map((option, index) => {
          const isSelected = selectedGoals.includes(option.value);
          const isDisabled = !isSelected && selectedGoals.length >= MAX_GOALS;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              onClick={() => toggleGoal(option.value)}
              disabled={isDisabled}
              className={cn(
                'bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-500',
                'hover:bg-white/[0.05] hover:border-white/10',
                isSelected && 'border-accent/50 bg-accent/10',
                isDisabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              <span className="text-3xl">{option.icon}</span>
              <span className="text-sm font-medium text-white/90">{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-white/30">
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
