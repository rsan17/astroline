'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useQuizProgress, useQuizStore } from '@/hooks/useQuizStore';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n';

interface QuizProgressProps {
  showBack?: boolean;
  className?: string;
}

const STEP_GROUPS = [
  { start: 1, end: 4, label: 'About You' },
  { start: 5, end: 8, label: 'Preferences' },
  { start: 9, end: 10, label: 'Analysis' },
  { start: 11, end: 13, label: 'Palm' },
  { start: 14, end: 14, label: 'Results' },
];

export function QuizProgress({ showBack = true, className }: QuizProgressProps) {
  const { current, total, percentage } = useQuizProgress();
  const { prevStep, currentStep } = useQuizStore();
  const { t } = useTranslations();

  const getSegmentProgress = (group: typeof STEP_GROUPS[0]) => {
    if (current < group.start) return 0;
    if (current > group.end) return 100;
    const stepsInGroup = group.end - group.start + 1;
    const stepsCompleted = current - group.start;
    return (stepsCompleted / stepsInGroup) * 100;
  };

  return (
    <div className={cn('w-full max-w-lg mx-auto', className)}>
      <div className="flex items-center justify-between mb-4">
        {showBack && currentStep > 1 ? (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => prevStep()}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.quiz.back}</span>
          </motion.button>
        ) : (
          <div />
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm"
        >
          <span className="text-text-secondary">{t.quiz.progress.step}</span>
          <span className="text-white font-semibold">{current}</span>
          <span className="text-text-muted">{t.quiz.progress.of} {total}</span>
        </motion.div>
      </div>

      <div className="flex gap-1.5">
        {STEP_GROUPS.map((group, index) => (
          <div key={index} className="flex-1 relative">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-cosmic rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getSegmentProgress(group)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-center"
      >
        <span className="text-xs text-text-muted">{percentage}% complete</span>
      </motion.div>
    </div>
  );
}
