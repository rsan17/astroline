'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';

const analysisSteps = [
  { text: 'Сканування ліній життя...', icon: '📏' },
  { text: 'Аналіз лінії серця...', icon: '❤️' },
  { text: 'Визначення лінії долі...', icon: '✨' },
  { text: 'Розрахунок кількості шлюбів...', icon: '💍' },
  { text: 'Підготовка результатів...', icon: '📊' },
];

export function PalmAnalyzingStep() {
  const { nextStep, updateData, data } = useQuizStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const wasSkipped = data.palmImageUrl === 'skipped';

  useEffect(() => {
    if (wasSkipped) {
      nextStep();
      return;
    }

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % analysisSteps.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2.5, 100));
    }, 100);

    const timeout = setTimeout(() => {
      updateData({
        palmReading: {
          childrenCount: '2-3',
          marriagesCount: '1',
          bigChanges: true,
          wealthIndicator: 'high',
        },
      });
      nextStep();
    }, 4000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [nextStep, updateData, wasSkipped]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      {/* Animated hand with scanning effect */}
      <div className="relative w-48 h-48 mx-auto mb-10">
        {/* Background glow - subtle */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-accent/20 blur-2xl"
        />
        
        {/* Hand emoji */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-7xl"
        >
          🤚
        </motion.div>

        {/* Scanning line */}
        <motion.div
          animate={{ top: ['20%', '80%', '20%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent"
            style={{
              left: `${20 + (i * 12)}%`,
              top: '50%',
            }}
          />
        ))}
      </div>

      {/* Current analysis step */}
      <div className="h-16 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl">{analysisSteps[currentStep].icon}</span>
            <span className="text-lg text-white/80 font-light">
              {analysisSteps[currentStep].text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mx-auto mb-6">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Analysis details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 border border-white/10 rounded-xl p-4"
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-left">
            <span className="text-white/40 font-light">Лінії проаналізовано:</span>
          </div>
          <div className="text-right">
            <motion.span 
              className="text-accent font-medium"
              key={Math.floor(progress / 10)}
            >
              {Math.floor(progress / 10)}/10
            </motion.span>
          </div>
          <div className="text-left">
            <span className="text-white/40 font-light">Точок інтересу:</span>
          </div>
          <div className="text-right">
            <span className="text-accent font-medium">
              {Math.floor(progress / 25) + 1}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
