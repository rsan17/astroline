'use client';

import { motion } from 'framer-motion';
import { useQuizProgress } from '@/hooks/useQuizStore';

export function QuizProgress() {
  const { current, total, percentage } = useQuizProgress();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 mb-3">
        <span>Крок {current} з {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
