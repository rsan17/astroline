'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Share2, Lock, ArrowRight } from 'lucide-react';
import { LaserFlowButton } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Zodiac compatibility matrix (simplified)
const COMPATIBILITY: Record<string, Record<string, number>> = {
  aries: { aries: 70, taurus: 50, gemini: 80, cancer: 45, leo: 90, virgo: 55, libra: 60, scorpio: 65, sagittarius: 95, capricorn: 50, aquarius: 75, pisces: 60 },
  taurus: { aries: 50, taurus: 85, gemini: 45, cancer: 90, leo: 55, virgo: 95, libra: 70, scorpio: 80, sagittarius: 40, capricorn: 90, aquarius: 50, pisces: 85 },
  gemini: { aries: 80, taurus: 45, gemini: 75, cancer: 50, leo: 85, virgo: 55, libra: 90, scorpio: 45, sagittarius: 75, capricorn: 40, aquarius: 95, pisces: 50 },
  cancer: { aries: 45, taurus: 90, gemini: 50, cancer: 80, leo: 55, virgo: 75, libra: 45, scorpio: 95, sagittarius: 50, capricorn: 60, aquarius: 40, pisces: 90 },
  leo: { aries: 90, taurus: 55, gemini: 85, cancer: 55, leo: 70, virgo: 50, libra: 80, scorpio: 60, sagittarius: 95, capricorn: 50, aquarius: 65, pisces: 55 },
  virgo: { aries: 55, taurus: 95, gemini: 55, cancer: 75, leo: 50, virgo: 80, libra: 60, scorpio: 85, sagittarius: 45, capricorn: 95, aquarius: 55, pisces: 65 },
  libra: { aries: 60, taurus: 70, gemini: 90, cancer: 45, leo: 80, virgo: 60, libra: 75, scorpio: 55, sagittarius: 80, capricorn: 55, aquarius: 90, pisces: 60 },
  scorpio: { aries: 65, taurus: 80, gemini: 45, cancer: 95, leo: 60, virgo: 85, libra: 55, scorpio: 70, sagittarius: 55, capricorn: 75, aquarius: 50, pisces: 95 },
  sagittarius: { aries: 95, taurus: 40, gemini: 75, cancer: 50, leo: 95, virgo: 45, libra: 80, scorpio: 55, sagittarius: 80, capricorn: 50, aquarius: 85, pisces: 55 },
  capricorn: { aries: 50, taurus: 90, gemini: 40, cancer: 60, leo: 50, virgo: 95, libra: 55, scorpio: 75, sagittarius: 50, capricorn: 85, aquarius: 60, pisces: 70 },
  aquarius: { aries: 75, taurus: 50, gemini: 95, cancer: 40, leo: 65, virgo: 55, libra: 90, scorpio: 50, sagittarius: 85, capricorn: 60, aquarius: 80, pisces: 65 },
  pisces: { aries: 60, taurus: 85, gemini: 50, cancer: 90, leo: 55, virgo: 65, libra: 60, scorpio: 95, sagittarius: 55, capricorn: 70, aquarius: 65, pisces: 85 },
};

const ZODIAC_SIGNS = [
  { name: 'Aries', slug: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
  { name: 'Taurus', slug: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
  { name: 'Gemini', slug: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
  { name: 'Cancer', slug: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
  { name: 'Leo', slug: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
  { name: 'Virgo', slug: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
  { name: 'Libra', slug: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', slug: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', slug: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', slug: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', slug: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
  { name: 'Pisces', slug: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' },
];

interface CompatibilityCalculatorProps {
  isPremium?: boolean;
  className?: string;
}

export function CompatibilityCalculator({ isPremium = false, className }: CompatibilityCalculatorProps) {
  const { t } = useTranslations();
  const [yourSign, setYourSign] = useState<string | null>(null);
  const [partnerSign, setPartnerSign] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!yourSign || !partnerSign) return;
    
    setIsCalculating(true);
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCalculating(false);
    setShowResult(true);
  };

  const getCompatibility = () => {
    if (!yourSign || !partnerSign) return 0;
    return COMPATIBILITY[yourSign]?.[partnerSign] || 50;
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return { text: 'Perfect Match! 💕', color: 'text-green-400' };
    if (score >= 75) return { text: 'Great Connection! 💖', color: 'text-accent' };
    if (score >= 60) return { text: 'Good Potential 💗', color: 'text-cosmic' };
    if (score >= 45) return { text: 'Challenging 🔥', color: 'text-gold' };
    return { text: 'Opposites Attract? 💫', color: 'text-text-secondary' };
  };

  const compatibility = getCompatibility();
  const label = getCompatibilityLabel(compatibility);

  const handleShare = () => {
    const text = `I checked my compatibility with ${partnerSign} on Astroline - we got ${compatibility}%! 💕`;
    if (navigator.share) {
      navigator.share({ text, url: 'https://astrolog.cards' });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className={cn('max-w-md mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center"
        >
          <Heart className="w-8 h-8 text-pink-500" />
        </motion.div>
        <h2 className="text-2xl font-bold gradient-text mb-2">
          {t.features.compatibility.title}
        </h2>
        <p className="text-text-secondary">
          {t.features.compatibility.subtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Your Sign */}
            <div>
              <label className="block text-sm text-text-secondary mb-3">
                {t.features.compatibility.yourDate}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.slug}
                    onClick={() => setYourSign(sign.slug)}
                    className={cn(
                      'p-2 rounded-xl text-center transition-all duration-300',
                      'bg-white/5 border border-white/10',
                      yourSign === sign.slug && 'border-accent/50 bg-accent/10 shadow-glow'
                    )}
                  >
                    <span className="text-xl block">{sign.symbol}</span>
                    <span className="text-xs text-text-secondary">{sign.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Sign */}
            <div>
              <label className="block text-sm text-text-secondary mb-3">
                {t.features.compatibility.partnerDate}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.slug}
                    onClick={() => setPartnerSign(sign.slug)}
                    className={cn(
                      'p-2 rounded-xl text-center transition-all duration-300',
                      'bg-white/5 border border-white/10',
                      partnerSign === sign.slug && 'border-pink-500/50 bg-pink-500/10'
                    )}
                  >
                    <span className="text-xl block">{sign.symbol}</span>
                    <span className="text-xs text-text-secondary">{sign.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <LaserFlowButton
              variant="purple"
              size="lg"
              onClick={handleCalculate}
              disabled={!yourSign || !partnerSign}
              isLoading={isCalculating}
              className="w-full"
              rightIcon={<Heart className="w-4 h-4" />}
            >
              {t.features.compatibility.calculate}
            </LaserFlowButton>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6"
          >
            {/* Hearts animation */}
            <div className="flex items-center justify-center gap-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-4xl"
              >
                {ZODIAC_SIGNS.find(s => s.slug === yourSign)?.symbol}
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3 }}
              >
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-4xl"
              >
                {ZODIAC_SIGNS.find(s => s.slug === partnerSign)?.symbol}
              </motion.div>
            </div>

            {/* Score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="relative"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-accent/20 border-4 border-pink-500/50 flex items-center justify-center">
                <span className="text-4xl font-bold text-text-primary">{compatibility}%</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={cn('text-xl font-semibold', label.color)}
            >
              {label.text}
            </motion.p>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Result</span>
              </button>

              {!isPremium && (
                <div className="pt-2">
                  <p className="text-xs text-text-muted mb-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Get detailed relationship report
                  </p>
                  <LaserFlowButton
                    variant="gold"
                    size="md"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t.features.compatibility.fullReport}
                  </LaserFlowButton>
                </div>
              )}

              <button
                onClick={() => {
                  setShowResult(false);
                  setYourSign(null);
                  setPartnerSign(null);
                }}
                className="w-full text-sm text-accent hover:text-accent-light transition-colors py-2"
              >
                Try another combination
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
