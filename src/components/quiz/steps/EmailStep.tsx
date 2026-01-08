'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Gift } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function EmailStep() {
  const { data, updateData, nextStep, prevStep } = useQuizStore();
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ email: e.target.value });
    setError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {
    if (!data.email) {
      setError('Введіть email адресу');
      return;
    }
    if (!validateEmail(data.email)) {
      setError('Введіть коректну email адресу');
      return;
    }
    nextStep();
  };

  const benefits = [
    { icon: <Gift className="w-4 h-4" />, text: 'Отримайте повний звіт на пошту' },
    { icon: <Shield className="w-4 h-4" />, text: 'Ніякого спаму, обіцяємо' },
  ];

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
          transition={{ type: 'spring' }}
          className="text-5xl mb-4"
        >
          📧
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Майже готово!
        </h2>
        <p className="text-text-secondary">
          Куди надіслати ваш персональний астрологічний звіт?
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <Input
          type="email"
          value={data.email || ''}
          onChange={handleEmailChange}
          placeholder="your@email.com"
          icon={<Mail className="w-5 h-5" />}
          error={error}
          autoComplete="email"
        />

        <div className="mt-4 space-y-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <span className="text-accent">{benefit.icon}</span>
              {benefit.text}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl p-4 mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="flex -space-x-2">
            {['👩', '👨', '👩‍🦰', '🧑'].map((emoji, i) => (
              <span 
                key={i} 
                className="w-6 h-6 rounded-full bg-background-secondary flex items-center justify-center text-xs border border-white/10"
              >
                {emoji}
              </span>
            ))}
          </div>
          <span className="text-text-secondary">
            <span className="text-accent font-medium">12,847</span> людей вже отримали свій звіт
          </span>
        </div>
      </motion.div>

      <div className="flex gap-4 justify-center">
        <Button variant="secondary" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={handleContinue}>
          Отримати звіт
        </Button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-text-muted text-center mt-6"
      >
        🔒 Натискаючи кнопку, ви погоджуєтесь з нашою Політикою конфіденційності
      </motion.p>
    </motion.div>
  );
}

