'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Star, Sparkles, Crown, Loader2, Lock, Clock, Shield, Zap } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { LaserFlowButton } from '@/components/effects';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';

const generatingPhrases = [
  { text: 'Reading the stars...', icon: '✨' },
  { text: 'Decoding natal chart...', icon: '🌙' },
  { text: 'Analyzing planet positions...', icon: '🪐' },
  { text: 'Aligning energies...', icon: '🔮' },
  { text: 'Composing your forecast...', icon: '📜' },
  { text: 'Generating report...', icon: '⭐' },
];

// Teaser sections that show blurred previews
const TEASER_SECTIONS = [
  { title: 'Natal Chart', preview: 'Your Sun in Sagittarius brings...', unlocked: true },
  { title: '2026 Forecast', preview: 'Q1: A period of transformation awaits...', unlocked: false },
  { title: 'Love Compatibility', preview: 'Best match with Aries, Leo...', unlocked: false },
  { title: 'Career Guidance', preview: 'Your leadership qualities...', unlocked: false },
];

const plans = [
  {
    id: 'trial_1w',
    name: '1 Тиждень',
    price: '42 ₴',
    period: '/тиждень',
    icon: <Star className="w-5 h-5" />,
    features: [
      'Повний астрологічний звіт',
      'Прогноз на тиждень',
      'Базові рекомендації',
    ],
    popular: false,
  },
  {
    id: 'trial_2w',
    name: '2 Тижні',
    price: '229 ₴',
    period: '',
    originalPrice: '419 ₴',
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      'Повний астрологічний звіт',
      'Прогноз на 2 тижні',
      'Персональні рекомендації',
      'Аналіз сумісності',
      'Щоденні оновлення',
    ],
    popular: true,
    badge: 'Найпопулярніший',
  },
  {
    id: 'trial_4w',
    name: '4 Тижні',
    price: '419 ₴',
    period: '',
    originalPrice: '839 ₴',
    icon: <Crown className="w-5 h-5" />,
    features: [
      'Все з плану "2 Тижні"',
      'Прогноз на місяць',
      'Детальний аналіз долоні',
      'Персональний чат з астрологом',
      'Необмежені оновлення',
    ],
    popular: false,
    badge: 'Найвигідніший',
  },
];

export function PaywallStep() {
  const router = useRouter();
  const { t } = useTranslations();
  const { data, prevStep, setReportId } = useQuizStore();
  const [selectedPlan, setSelectedPlan] = useState('trial_2w');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [reportId, setLocalReportId] = useState<string | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds

  // Countdown timer for urgency
  useEffect(() => {
    if (isGenerating) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isGenerating]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Animate through generating phrases
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % generatingPhrases.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Generate report on mount
  useEffect(() => {
    const generateReport = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            gender: data.gender,
            birthDate: data.birthDate,
            birthTime: data.birthTime,
            birthPlace: data.birthPlace,
            sunSign: data.sunSign,
            moonSign: data.moonSign,
            risingSign: data.risingSign,
            palmReading: data.palmReading,
            // Additional fields for AI personalization
            goals: data.goals,
            relationshipStatus: data.relationshipStatus,
            favoriteColor: data.favoriteColor,
            element: data.element,
          }),
        });

        const result = await response.json();
        if (result.success && result.reportId) {
          setLocalReportId(result.reportId);
          setReportId(result.reportId);
          
          // Store the full report in localStorage for the report page
          if (result.report) {
            localStorage.setItem(
              `astroline-report-${result.reportId}`,
              JSON.stringify(result.report)
            );
          }
        }
      } catch (error) {
        console.error('Failed to generate report:', error);
        // Generate a fallback ID
        const fallbackId = Math.random().toString(36).substring(2, 10);
        setLocalReportId(fallbackId);
        setReportId(fallbackId);
      } finally {
        setIsGenerating(false);
      }
    };

    generateReport();
  }, [data, setReportId]);

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // Create payment via Monobank
      const response = await fetch('/api/monobank/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          reportId: reportId,
          email: data.email,
          sunSign: data.sunSign,
          moonSign: data.moonSign,
          risingSign: data.risingSign,
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
          planId: selectedPlan,
        }));
      }

      // Redirect to Monobank payment page
      window.location.href = result.pageUrl;

    } catch (error) {
      console.error('Payment error:', error);
      // Show error to user (you could add a toast notification here)
      alert(error instanceof Error ? error.message : 'Помилка оплати. Спробуйте ще раз.');
      setIsLoading(false);
    }
  };

  const handleViewFreeReport = () => {
    if (reportId) {
      router.push(`/report/${reportId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-lg mx-auto px-1 sm:px-0"
    >
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring' }}
          className="text-4xl sm:text-5xl mb-3 sm:mb-4"
        >
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-2 sm:mb-3">
          {t.quiz.paywall.title}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary">
          {t.quiz.paywall.subtitle}
        </p>
      </div>

      {/* Urgency countdown */}
      {!isGenerating && countdown > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-orange-500/20 border border-gold/30"
        >
          <Clock className="w-4 h-4 text-gold" />
          <span className="text-sm text-gold font-medium">
            Special offer expires in {formatTime(countdown)}
          </span>
        </motion.div>
      )}

      {/* User summary with teaser preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-premium rounded-2xl p-4 mb-6 space-y-4"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{t.quiz.paywall.preparedFor}:</span>
          <span className="text-text-primary font-medium">{data.email}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{t.quiz.paywall.yourSign}:</span>
          <span className="text-accent font-medium">{data.sunSign || 'Leo'} ☀️</span>
        </div>

        {/* Teaser sections preview */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          {TEASER_SECTIONS.map((section, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-lg',
                section.unlocked ? 'bg-accent/10' : 'bg-white/5'
              )}
            >
              <div className="flex items-center gap-2">
                {section.unlocked ? (
                  <Check className="w-4 h-4 text-accent" />
                ) : (
                  <Lock className="w-4 h-4 text-text-muted" />
                )}
                <span className={cn(
                  'text-sm',
                  section.unlocked ? 'text-text-primary' : 'text-text-secondary'
                )}>
                  {section.title}
                </span>
              </div>
              {!section.unlocked && (
                <span className="text-xs text-accent">Unlock</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pricing cards */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {plans.map((plan, index) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              'w-full glass rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 relative overflow-hidden',
              selectedPlan === plan.id && 'ring-2 ring-accent border-accent/50',
              plan.popular && 'border-accent/30'
            )}
          >
            {plan.badge && (
              <span className={cn(
                'absolute top-0 right-0 text-xs font-medium px-3 py-1 rounded-bl-xl',
                plan.popular ? 'bg-accent text-background' : 'bg-gold/80 text-background'
              )}>
                {plan.badge}
              </span>
            )}

            <div className="flex items-start gap-3 sm:gap-4">
              <div className={cn(
                'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                selectedPlan === plan.id 
                  ? 'bg-accent text-background' 
                  : 'bg-white/10 text-text-secondary'
              )}>
                {plan.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-base sm:text-lg font-bold text-text-primary">
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-accent">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-xs sm:text-sm text-text-muted line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm text-text-secondary">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className={cn(
                'w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                selectedPlan === plan.id 
                  ? 'border-accent bg-accent' 
                  : 'border-white/30'
              )}>
                {selectedPlan === plan.id && (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-background" />
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 pl-0 sm:pl-16 space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        {isGenerating ? (
          <Button 
            disabled
            className="w-full text-lg py-5 relative overflow-hidden"
          >
            <motion.span
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{generatingPhrases[phraseIndex].icon}</span>
              <span>{generatingPhrases[phraseIndex].text}</span>
            </motion.span>
          </Button>
        ) : (
          <LaserFlowButton
            variant="gold"
            size="xl"
            onClick={handlePurchase}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
            rightIcon={<Zap className="w-5 h-5" />}
          >
            {isLoading ? 'Processing...' : t.quiz.paywall.getAccess}
          </LaserFlowButton>
        )}

        {/* Free preview option */}
        <button
          onClick={handleViewFreeReport}
          disabled={isGenerating || !reportId}
          className="w-full text-sm text-accent hover:text-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed py-2"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.quiz.paywall.generating}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>👁️</span> {t.quiz.paywall.viewFree}
            </span>
          )}
        </button>

        <button
          onClick={prevStep}
          className="w-full text-sm text-text-muted hover:text-text-secondary transition-colors py-2"
        >
          ← {t.quiz.paywall.backButton}
        </button>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-xs text-text-secondary">{t.quiz.paywall.trustBadges.secure}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <span className="text-sm">🏦</span>
          <span className="text-xs text-text-secondary">monobank</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <span className="text-sm">💳</span>
          <span className="text-xs text-text-secondary">Visa / Mastercard</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <span className="text-sm">↩️</span>
          <span className="text-xs text-text-secondary">{t.quiz.paywall.trustBadges.guarantee}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
