'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { ConfettiEffect, EmojiConfetti } from '@/components/ui/ConfettiEffect';
import { Check, Sparkles, Star, Heart, Briefcase, Hand } from 'lucide-react';
import { trackPurchase } from '@/lib/analytics';

const includedFeatures = [
  { icon: Star, text: 'Повна натальна карта' },
  { icon: Sparkles, text: 'Прогноз на 2026 рік' },
  { icon: Heart, text: 'Кохання та відносини' },
  { icon: Briefcase, text: "Кар'єра та фінанси" },
  { icon: Hand, text: 'Читання долоні' },
];

// Main page wrapper with Suspense
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl mb-4"
        >
          🌟
        </motion.div>
        <p className="text-text-secondary">Завантаження...</p>
      </div>
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reportId = searchParams.get('reportId');
  const reference = searchParams.get('reference');
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(true);
  const hasTrackedPurchase = useRef(false);

  // Unlock report in localStorage and track purchase
  useEffect(() => {
    if (reportId) {
      try {
        const storedReport = localStorage.getItem(`astroline-report-${reportId}`);
        if (storedReport) {
          const report = JSON.parse(storedReport);
          if (!report.isPaid) {
            report.isPaid = true;
            localStorage.setItem(`astroline-report-${reportId}`, JSON.stringify(report));
            console.log('✅ Report unlocked successfully');
          }
        }
        // Clear payment reference
        localStorage.removeItem(`astroline-payment-${reportId}`);
      } catch (error) {
        console.error('Error unlocking report:', error);
      }
    }
    
    // Track purchase event for Meta Pixel (only once)
    if (!hasTrackedPurchase.current) {
      hasTrackedPurchase.current = true;
      trackPurchase({
        value: 149, // Price in UAH
        currency: 'UAH',
        orderId: reference || undefined,
        content_name: 'Astrology Report',
      });
      console.log('📊 Meta Pixel: Purchase event tracked');
    }
    
    // Short delay before showing content
    const timer = setTimeout(() => setIsUnlocking(false), 500);
    return () => clearTimeout(timer);
  }, [reportId, reference]);

  const handleViewReport = () => {
    if (reportId) {
      router.push(`/report/${reportId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      {/* Confetti effects */}
      <ConfettiEffect 
        isActive={showConfetti} 
        duration={4000}
        particleCount={80}
        colors={['#4ECDC4', '#FFD700', '#A855F7', '#F59E0B', '#22C55E']}
        onComplete={() => setShowConfetti(false)}
      />
      <EmojiConfetti 
        isActive={showConfetti}
        duration={4000}
        emojis={['✨', '🌟', '💫', '⭐', '🎉', '🎊', '💜', '🔮']}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-2"
          >
            Оплата успішна!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-text-secondary mb-8"
          >
            Ваш повний звіт розблоковано
          </motion.p>

          {/* Included features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mb-8"
          >
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-text-primary text-sm">{feature.text}</span>
                <Check className="w-4 h-4 text-green-400 ml-auto" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={handleViewReport}
            disabled={isUnlocking}
            className="w-full btn-primary py-4 text-lg font-semibold rounded-2xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {isUnlocking ? 'Розблоковуємо...' : 'Переглянути звіт'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_100%] group-hover:animate-shimmer" />
          </motion.button>

          {/* Reference info */}
          {reference && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-xs text-text-muted mt-4"
            >
              Номер замовлення: {reference}
            </motion.p>
          )}
        </div>

        {/* Support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-text-muted text-sm mt-6"
        >
          Виникли питання?{' '}
          <a href="mailto:support@astrolog.cards" className="text-accent hover:underline">
            Напишіть нам
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
