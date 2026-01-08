'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OptionPill } from '@/components/ui/OptionPill';

export function BirthTimeStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ birthTime: e.target.value });
  };

  const handleDontKnow = () => {
    updateData({ birthTime: 'unknown' });
    nextStep();
  };

  const canContinue = !!data.birthTime;

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
          🕐
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          О котрій годині?
        </h2>
        <p className="text-text-secondary">
          Час народження потрібен для точного розрахунку асцендента
        </p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <Input
          type="time"
          value={data.birthTime === 'unknown' ? '' : (data.birthTime || '')}
          onChange={handleTimeChange}
          icon={<Clock className="w-5 h-5" />}
          label="Час народження"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <OptionPill
          icon="🤷"
          label="Не знаю точний час"
          description="Ми використаємо приблизний час (12:00)"
          selected={data.birthTime === 'unknown'}
          onClick={handleDontKnow}
        />
      </motion.div>

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

