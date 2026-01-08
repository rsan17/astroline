'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function BirthDateStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();
  const [error, setError] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateData({ birthDate: value });
    setError('');
  };

  const validateAndContinue = () => {
    if (!data.birthDate) {
      setError('Будь ласка, введіть дату народження');
      return;
    }

    const date = new Date(data.birthDate);
    const now = new Date();
    const minDate = new Date('1900-01-01');

    if (date > now) {
      setError('Дата не може бути в майбутньому');
      return;
    }

    if (date < minDate) {
      setError('Введіть коректну дату');
      return;
    }

    nextStep();
  };

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
          🎂
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Коли ви народились?
        </h2>
        <p className="text-text-secondary">
          Дата народження визначає положення планет у момент вашого появлення на світ
        </p>
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <Input
          type="date"
          value={data.birthDate || ''}
          onChange={handleDateChange}
          icon={<Calendar className="w-5 h-5" />}
          error={error}
          max={new Date().toISOString().split('T')[0]}
          min="1900-01-01"
        />
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant="secondary" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={validateAndContinue}>
          Продовжити
        </Button>
      </div>
    </motion.div>
  );
}

