'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { OptionPill } from '@/components/ui/OptionPill';

const genderOptions = [
  { value: 'female', label: 'Жінка', icon: '👩' },
  { value: 'male', label: 'Чоловік', icon: '👨' },
  { value: 'non-binary', label: 'Небінарний', icon: '✨' },
] as const;

export function GenderStep() {
  const { data, updateData, nextStep } = useQuizStore();

  const handleSelect = (value: 'female' | 'male' | 'non-binary') => {
    updateData({ gender: value });
    setTimeout(() => nextStep(), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Хто ви?
        </h2>
        <p className="text-text-secondary">
          Це допоможе персоналізувати ваш астрологічний звіт
        </p>
      </div>

      <div className="space-y-3">
        {genderOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OptionPill
              icon={option.icon}
              label={option.label}
              selected={data.gender === option.value}
              onClick={() => handleSelect(option.value)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

