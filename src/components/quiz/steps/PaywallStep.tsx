'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Star, Sparkles, Crown } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'trial_1w',
    name: '1 Тиждень',
    price: '$1',
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
    price: '$5.49',
    period: '',
    originalPrice: '$9.99',
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
    price: '$9.99',
    period: '',
    originalPrice: '$19.99',
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
  const { data, prevStep, setReportId } = useQuizStore();
  const [selectedPlan, setSelectedPlan] = useState('trial_2w');
  const [isLoading, setIsLoading] = useState(false);
  const [reportId, setLocalReportId] = useState<string | null>(null);

  // Generate report on mount
  useEffect(() => {
    const generateReport = async () => {
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
          }),
        });

        const result = await response.json();
        if (result.success && result.reportId) {
          setLocalReportId(result.reportId);
          setReportId(result.reportId);
        }
      } catch (error) {
        console.error('Failed to generate report:', error);
        // Generate a fallback ID
        const fallbackId = Math.random().toString(36).substring(2, 10);
        setLocalReportId(fallbackId);
        setReportId(fallbackId);
      }
    };

    generateReport();
  }, [data, setReportId]);

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In real app: redirect to Stripe checkout
    // For now, redirect to report page (free preview)
    if (reportId) {
      router.push(`/report/${reportId}`);
    }
    setIsLoading(false);
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
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring' }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Ваш звіт готовий!
        </h2>
        <p className="text-text-secondary">
          Оберіть план, щоб отримати повний доступ
        </p>
      </div>

      {/* User summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Підготовлено для:</span>
          <span className="text-text-primary font-medium">{data.email}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-text-secondary">Ваш знак:</span>
          <span className="text-accent font-medium">{data.sunSign || 'Лев'} ☀️</span>
        </div>
      </motion.div>

      {/* Pricing cards */}
      <div className="space-y-4 mb-8">
        {plans.map((plan, index) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              'w-full glass rounded-2xl p-5 text-left transition-all duration-300 relative overflow-hidden',
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

            <div className="flex items-start gap-4">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                selectedPlan === plan.id 
                  ? 'bg-accent text-background' 
                  : 'bg-white/10 text-text-secondary'
              )}>
                {plan.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-text-primary">
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-text-muted line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-sm text-text-secondary">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                selectedPlan === plan.id 
                  ? 'border-accent bg-accent' 
                  : 'border-white/30'
              )}>
                {selectedPlan === plan.id && (
                  <Check className="w-4 h-4 text-background" />
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 pl-16 space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
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
        <Button 
          onClick={handlePurchase} 
          isLoading={isLoading}
          className="w-full text-lg py-5"
        >
          {isLoading ? 'Обробка...' : 'Отримати доступ'}
        </Button>

        {/* Free preview option */}
        <button
          onClick={handleViewFreeReport}
          disabled={!reportId}
          className="w-full text-sm text-accent hover:text-accent-light transition-colors disabled:opacity-50"
        >
          👁️ Переглянути безкоштовний попередній перегляд
        </button>

        <button
          onClick={prevStep}
          className="w-full text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          ← Повернутись назад
        </button>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center justify-center gap-6 mt-8 text-xs text-text-muted"
      >
        <span className="flex items-center gap-1">
          🔒 Безпечна оплата
        </span>
        <span className="flex items-center gap-1">
          💳 Stripe
        </span>
        <span className="flex items-center gap-1">
          ↩️ Гарантія повернення
        </span>
      </motion.div>
    </motion.div>
  );
}
