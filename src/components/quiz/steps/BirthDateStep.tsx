'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle } from 'lucide-react';
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
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-teal-500/20 mb-4"
        >
          <span className="text-4xl">🎂</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold gradient-text mb-3"
        >
          Коли ви народились?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary"
        >
          Дата народження визначає положення планет у момент вашого появлення на світ
        </motion.p>
      </div>

      {/* Input card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <Input
          type="date"
          value={data.birthDate || ''}
          onChange={handleDateChange}
          icon={<Calendar className="w-5 h-5" />}
          error={error}
          max={new Date().toISOString().split('T')[0]}
          min="1900-01-01"
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-3 text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Info hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-xs text-text-muted">
          💡 Для більш точного прогнозу введіть точну дату
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 justify-center"
      >
        <Button variant="secondary" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={validateAndContinue}>
          Продовжити
        </Button>
      </motion.div>
    </motion.div>
  );
}
