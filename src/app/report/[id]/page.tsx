'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuizStore } from '@/hooks/useQuizStore';
import { generateReport } from '@/lib/report-data';
import type { FullReport } from '@/types/report';
import {
  ReportHero,
  NatalChartSection,
  PersonalitySection,
  ForecastSection,
  LoveSection,
  CareerSection,
  PalmSection,
  LuckySection,
  ShareSection,
} from '@/components/report';

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.id as string;
  const paymentSuccess = searchParams.get('payment') === 'success';
  const { data } = useQuizStore();
  const [report, setReport] = useState<FullReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(paymentSuccess);

  // Load report effect
  useEffect(() => {
    const loadReport = () => {
      try {
        const storedReport = localStorage.getItem(`astroline-report-${reportId}`);
        
        if (storedReport) {
          const parsedReport = JSON.parse(storedReport) as FullReport;
          console.log('✅ Loaded AI-generated report from localStorage');
          setReport(parsedReport);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.warn('⚠️ Failed to load report from localStorage:', error);
      }

      console.log('📄 Generating static fallback report (direct URL access)');
      const generatedReport = generateReport(
        reportId,
        {
          email: data.email || 'user@example.com',
          gender: data.gender || 'female',
          birthDate: data.birthDate || '1990-01-01',
          birthTime: data.birthTime,
          birthPlace: data.birthPlace,
          sunSign: data.sunSign || 'Лев',
          moonSign: data.moonSign || 'Риби',
          risingSign: data.risingSign || 'Скорпіон',
        },
        data.palmReading,
        false
      );
      setReport(generatedReport);
      setIsLoading(false);
    };

    const timer = setTimeout(loadReport, 800);
    return () => clearTimeout(timer);
  }, [reportId, data]);

  // Auto-hide success toast after 5 seconds - MUST be before any conditional returns!
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => setShowSuccessToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  // Conditional returns AFTER all hooks
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!report) {
    return <ErrorScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Payment success toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3"
          >
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold">Оплата успішна!</p>
              <p className="text-sm text-white/90">Ваш повний звіт розблоковано</p>
            </div>
            <button 
              onClick={() => setShowSuccessToast(false)}
              className="ml-4 text-white/70 hover:text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold gradient-text">
            ✨ Astroline
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary hidden md:block">
              {report.natalChart.sunSign.symbol} {report.natalChart.sunSign.name}
            </span>
            {!report.isPaid && (
              <button className="btn-primary text-sm py-2 px-4">
                🔓 Розблокувати
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <ReportHero natalChart={report.natalChart} />
        
        <NatalChartSection natalChart={report.natalChart} />
        
        <PersonalitySection 
          traits={report.personality} 
          isPaid={report.isPaid} 
        />
        
        <ForecastSection 
          forecasts={report.forecast2026} 
          isPaid={report.isPaid} 
        />
        
        <LoveSection 
          love={report.love} 
          isPaid={report.isPaid} 
        />
        
        <CareerSection 
          career={report.career} 
          isPaid={report.isPaid} 
        />
        
        <PalmSection 
          palmReading={report.palmReading} 
          isPaid={report.isPaid} 
        />
        
        <LuckySection lucky={report.lucky} />
        
        <ShareSection 
          reportId={reportId}
          email={report.userData.email}
          sunSign={report.natalChart.sunSign.name}
        />
      </main>

      {/* Sticky CTA for unpaid */}
      {!report.isPaid && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/10 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-text-primary font-medium">Розблокуйте повний звіт</p>
              <p className="text-sm text-text-secondary">Отримайте всі інсайти та прогнози</p>
            </div>
            <button className="btn-primary flex-shrink-0 w-full sm:w-auto">
              🔮 Отримати повний доступ
            </button>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className={`py-12 px-4 text-center border-t border-white/10 ${!report.isPaid ? 'pb-32' : ''}`}>
        <p className="text-text-muted text-sm">
          © 2026 Astroline. Усі права захищені.
        </p>
      </footer>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl mb-6"
        >
          🌟
        </motion.div>
        <h2 className="text-2xl font-bold gradient-text mb-3">
          Завантажуємо ваш звіт
        </h2>
        <p className="text-text-secondary">
          Зірки вирівнюються...
        </p>
        
        {/* Loading bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-teal-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-6xl mb-6 block">😕</span>
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Звіт не знайдено
        </h2>
        <p className="text-text-secondary mb-6">
          Можливо, цей звіт було видалено або посилання неправильне
        </p>
        <a href="/" className="btn-primary inline-block">
          Пройти квіз
        </a>
      </div>
    </div>
  );
}

