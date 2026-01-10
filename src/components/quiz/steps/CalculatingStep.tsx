'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { calculateZodiacSignFromDate } from '@/lib/utils';

const loadingMessages = [
  { text: 'Аналізуємо позиції планет...', icon: '🪐' },
  { text: 'Визначаємо ваш асцендент...', icon: '⬆️' },
  { text: 'Розраховуємо місячний знак...', icon: '🌙' },
  { text: 'Шукаємо унікальні аспекти...', icon: '✨' },
  { text: 'Готуємо персональний звіт...', icon: '📜' },
];

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export function CalculatingStep() {
  const { data, nextStep, setCalculating, updateData } = useQuizStore();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCalculating(true);

    // Rotate through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 100));
    }, 100);

    // Complete after 5 seconds
    const timeout = setTimeout(() => {
      setCalculating(false);
      
      // Calculate sun sign from birth date
      const calculatedSunSign = data.birthDate 
        ? calculateZodiacSignFromDate(data.birthDate) || 'Лев' // fallback only if date missing or invalid
        : 'Лев'; // fallback only if date missing
      
      // Use calculated sun sign as placeholder for moon and rising signs
      // (proper calculation requires ephemeris data and birth coordinates)
      updateData({
        sunSign: calculatedSunSign,
        moonSign: calculatedSunSign, // placeholder until proper calculation
        risingSign: calculatedSunSign, // placeholder until proper calculation
      });
      nextStep();
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [data.birthDate, nextStep, setCalculating, updateData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      {/* Animated zodiac wheel */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          {zodiacSigns.map((sign, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const x = Math.cos(angle) * 80;
            const y = Math.sin(angle) * 80;
            
            return (
              <motion.span
                key={sign}
                className="absolute text-2xl"
                style={{
                  left: `calc(50% + ${x}px - 12px)`,
                  top: `calc(50% + ${y}px - 12px)`,
                }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.15
                }}
              >
                {sign}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Center glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-accent/30 blur-xl"
        />
        
        {/* Center icon */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-5xl"
        >
          {loadingMessages[currentMessage].icon}
        </motion.div>
      </div>

      {/* Loading message */}
      <div className="h-16 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg text-text-primary"
          >
            {loadingMessages[currentMessage].text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mx-auto">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-text-muted mt-2">{progress}%</p>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-text-secondary mt-8"
      >
        Це займе лише кілька секунд...
      </motion.p>
    </motion.div>
  );
}

