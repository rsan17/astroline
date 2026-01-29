'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { generateReport } from '@/lib/report-data';
import type { FullReport } from '@/types/report';
import {
  ReportHero,
  NatalChartSection,
  NumerologySection,
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
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(paymentSuccess);

  // Load report effect
  useEffect(() => {
    const loadReport = async () => {
      // 1. First, try to fetch from database API
      try {
        console.log('🔍 Fetching report from database...');
        const response = await fetch(`/api/report/${reportId}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.report) {
            console.log('✅ Loaded report from database');
            let dbReport = result.report as FullReport;
            
            // Check if payment was successful (from Monobank redirect)
            if (paymentSuccess && !dbReport.isPaid) {
              console.log('💳 Unlocking report after successful Monobank payment');
              dbReport.isPaid = true;
              
              // Update in database
              await fetch(`/api/report/${reportId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPaid: true }),
              });
              
              // Also update localStorage for consistency
              localStorage.setItem(`astroline-report-${reportId}`, JSON.stringify(dbReport));
              localStorage.removeItem(`astroline-payment-${reportId}`);
            }
            
            setReport(dbReport);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn('⚠️ Failed to fetch report from database:', error);
      }

      // 2. Fallback to localStorage
      try {
        const storedReport = localStorage.getItem(`astroline-report-${reportId}`);
        
        if (storedReport) {
          const parsedReport = JSON.parse(storedReport) as FullReport;
          console.log('✅ Loaded AI-generated report from localStorage');
          
          // Check if payment was successful (from Monobank redirect)
          if (paymentSuccess && !parsedReport.isPaid) {
            console.log('💳 Unlocking report after successful Monobank payment');
            parsedReport.isPaid = true;
            localStorage.setItem(`astroline-report-${reportId}`, JSON.stringify(parsedReport));
            
            // Clear payment reference from localStorage
            localStorage.removeItem(`astroline-payment-${reportId}`);
          }
          
          setReport(parsedReport);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.warn('⚠️ Failed to load report from localStorage:', error);
      }

      // 3. Last resort: generate static fallback report
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
        paymentSuccess // Unlock if coming from successful payment
      );
      setReport(generatedReport);
      setIsLoading(false);
    };

    const timer = setTimeout(loadReport, 300);
    return () => clearTimeout(timer);
  }, [reportId, data, paymentSuccess]);

  // Auto-hide success toast after 5 seconds - MUST be before any conditional returns!
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => setShowSuccessToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  // Handle payment purchase
  const handlePurchase = async () => {
    if (isPaymentLoading) return;
    
    setIsPaymentLoading(true);
    
    try {
      // Create payment via Monobank with default plan (trial_4w = 4 weeks / 419 UAH)
      const moonSignName = report?.natalChart?.moonSign && 'name' in report.natalChart.moonSign 
        ? report.natalChart.moonSign.name 
        : data.moonSign;
      const risingSignName = report?.natalChart?.risingSign && 'name' in report.natalChart.risingSign 
        ? report.natalChart.risingSign.name 
        : data.risingSign;
      
      const response = await fetch('/api/monobank/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: 'trial_4w', // Default plan - 4 weeks access
          reportId: reportId,
          email: report?.userData?.email || data.email,
          sunSign: report?.natalChart?.sunSign?.name || data.sunSign,
          moonSign: moonSignName,
          risingSign: risingSignName,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create payment');
      }

      // Store reference for later verification
      if (result.reference) {
        localStorage.setItem(`astroline-payment-${reportId}`, JSON.stringify({
          reference: result.reference,
          invoiceId: result.invoiceId,
          planId: 'trial_4w',
        }));
      }

      // Redirect to Monobank payment page
      window.location.href = result.pageUrl;

    } catch (error) {
      console.error('Payment error:', error);
      alert(error instanceof Error ? error.message : 'Помилка оплати. Спробуйте ще раз.');
      setIsPaymentLoading(false);
    }
  };

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
              <button 
                onClick={handlePurchase}
                disabled={isPaymentLoading}
                className="btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2"
              >
                {isPaymentLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Завантаження...
                  </>
                ) : (
                  '🔓 Розблокувати'
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <ReportHero natalChart={report.natalChart} />
        
        <NatalChartSection natalChart={report.natalChart} />
        
        {/* Numerology Section - always visible */}
        {report.numerology && (
          <NumerologySection numerology={report.numerology} />
        )}
        
        <PersonalitySection 
          traits={report.personality} 
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
        />
        
        <ForecastSection 
          forecasts={report.forecast2026} 
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
        />
        
        <LoveSection 
          love={report.love} 
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
        />
        
        <CareerSection 
          career={report.career} 
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
        />
        
        <PalmSection 
          palmReading={report.palmReading} 
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
        />
        
        <LuckySection lucky={report.lucky} />
        
        <ShareSection 
          reportId={reportId}
          email={report.userData.email}
          sunSign={report.natalChart.sunSign.name}
          moonSign={'name' in report.natalChart.moonSign ? report.natalChart.moonSign.name : undefined}
          risingSign={'name' in report.natalChart.risingSign ? report.natalChart.risingSign.name : undefined}
          isPaid={report.isPaid}
          onUnlockClick={handlePurchase}
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
            <button 
              onClick={handlePurchase}
              disabled={isPaymentLoading}
              className="btn-primary flex-shrink-0 w-full sm:w-auto disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPaymentLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Завантаження...
                </>
              ) : (
                '🔮 Отримати повний доступ'
              )}
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

