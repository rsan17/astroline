'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { CityAutocomplete } from '@/components/ui/CityAutocomplete';
import { Button } from '@/components/ui/Button';

export function BirthPlaceStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();
  const [error, setError] = useState('');

  const handlePlaceChange = (value: string) => {
    updateData({ birthPlace: value });
    setError('');
  };

  const validateAndContinue = () => {
    if (!data.birthPlace || data.birthPlace.trim().length < 2) {
      setError('Будь ласка, оберіть місце народження зі списку');
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
          📍
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Де ви народились?
        </h2>
        <p className="text-text-secondary">
          Місце народження визначає положення зірок на небосхилі
        </p>
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <CityAutocomplete
          value={data.birthPlace || ''}
          onChange={handlePlaceChange}
          placeholder="Почніть вводити назву міста..."
          error={error}
        />
        <p className="text-xs text-text-muted mt-3">
          Введіть назву міста та оберіть зі списку
        </p>
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

