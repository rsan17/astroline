'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { OptionPill } from '@/components/ui/OptionPill';
import { Button } from '@/components/ui/Button';

const relationshipOptions = [
  { value: 'single', label: 'Вільний/на', icon: '💫', description: 'Шукаю свою половинку' },
  { value: 'dating', label: 'У стосунках', icon: '💑', description: 'Зустрічаюсь з кимось' },
  { value: 'married', label: 'Одружений/а', icon: '💍', description: 'У шлюбі' },
  { value: 'complicated', label: 'Все складно', icon: '🌀', description: 'Непростий період' },
];

export function RelationshipStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateData({ relationshipStatus: value });
  };

  const canContinue = !!data.relationshipStatus;

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
          💕
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-heading text-white mb-3">
          Ваш сімейний статус
        </h2>
        <p className="text-white/60 font-light">
          Це допоможе краще інтерпретувати ваші астрологічні аспекти
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {relationshipOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OptionPill
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={data.relationshipStatus === option.value}
              onClick={() => handleSelect(option.value)}
            />
          </motion.div>
        ))}
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
