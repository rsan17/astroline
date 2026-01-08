'use client';

import { motion } from 'framer-motion';
import { useQuizProgress } from '@/hooks/useQuizStore';

export function QuizProgress() {
  const { current, total, percentage } = useQuizProgress();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span>Крок {current} з {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

