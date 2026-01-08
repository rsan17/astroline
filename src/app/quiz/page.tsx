'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { useQuizStore } from '@/hooks/useQuizStore';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const { currentStep, reset } = useQuizStore();

  // Check for ?new=true to start fresh
  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      reset();
      // Clean up URL
      window.history.replaceState({}, '', '/quiz');
    }
  }, [searchParams, reset]);

  const handleReset = () => {
    if (confirm('Ви впевнені, що хочете почати спочатку? Усі ваші відповіді будуть втрачені.')) {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Logo/Brand */}
      <motion.div 
        className="mb-8 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <a href="/" className="text-3xl font-bold gradient-text">
          ✨ Astroline
        </a>
        {currentStep > 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
            title="Почати спочатку"
          >
            <RotateCcw className="w-3 h-3" />
            Спочатку
          </motion.button>
        )}
      </motion.div>

      {/* Progress Bar */}
      <QuizProgress />

      {/* Quiz Steps */}
      <QuizContainer />

      {/* Footer */}
      <motion.footer 
        className="mt-auto pt-8 text-center text-sm text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>🔒 Ваші дані в безпеці та конфіденційні</p>
      </motion.footer>
    </div>
  );
}

