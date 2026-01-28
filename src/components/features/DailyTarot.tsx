'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Lock, Clock } from 'lucide-react';
import { LaserFlowButton } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Tarot card data
const TAROT_CARDS = [
  { name: 'The Fool', meaning: 'New beginnings, innocence, spontaneity', emoji: '🃏' },
  { name: 'The Magician', meaning: 'Manifestation, resourcefulness, power', emoji: '🎩' },
  { name: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine', emoji: '🌙' },
  { name: 'The Empress', meaning: 'Femininity, beauty, nature, abundance', emoji: '👑' },
  { name: 'The Emperor', meaning: 'Authority, structure, control, fatherhood', emoji: '🦁' },
  { name: 'The Hierophant', meaning: 'Tradition, conformity, spirituality', emoji: '📿' },
  { name: 'The Lovers', meaning: 'Love, harmony, relationships, choices', emoji: '💕' },
  { name: 'The Chariot', meaning: 'Control, willpower, success, determination', emoji: '⚡' },
  { name: 'Strength', meaning: 'Courage, persuasion, influence, compassion', emoji: '🦋' },
  { name: 'The Hermit', meaning: 'Soul-searching, introspection, inner guidance', emoji: '🔮' },
  { name: 'Wheel of Fortune', meaning: 'Good luck, karma, life cycles, destiny', emoji: '🎡' },
  { name: 'Justice', meaning: 'Justice, fairness, truth, law', emoji: '⚖️' },
  { name: 'The Star', meaning: 'Hope, faith, purpose, renewal, spirituality', emoji: '⭐' },
  { name: 'The Moon', meaning: 'Illusion, fear, anxiety, subconscious', emoji: '🌕' },
  { name: 'The Sun', meaning: 'Positivity, fun, warmth, success, vitality', emoji: '☀️' },
  { name: 'The World', meaning: 'Completion, integration, accomplishment', emoji: '🌍' },
];

interface DailyTarotProps {
  isPremium?: boolean;
  className?: string;
}

export function DailyTarot({ isPremium = false, className }: DailyTarotProps) {
  const { t } = useTranslations();
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof TAROT_CARDS[0] | null>(null);
  const [canDraw, setCanDraw] = useState(true);
  const [nextDrawTime, setNextDrawTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState('');

  // Check if user can draw today
  useEffect(() => {
    const lastDraw = localStorage.getItem('astroline-last-tarot-draw');
    if (lastDraw && !isPremium) {
      const lastDrawDate = new Date(lastDraw);
      const now = new Date();
      const tomorrow = new Date(lastDrawDate);
      tomorrow.setHours(24, 0, 0, 0);

      if (now < tomorrow) {
        setCanDraw(false);
        setNextDrawTime(tomorrow);
        
        // Load saved card
        const savedCard = localStorage.getItem('astroline-daily-card');
        if (savedCard) {
          setSelectedCard(JSON.parse(savedCard));
          setIsFlipped(true);
        }
      }
    }
  }, [isPremium]);

  // Countdown timer
  useEffect(() => {
    if (!nextDrawTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = nextDrawTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCanDraw(true);
        setNextDrawTime(null);
        setCountdown('');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextDrawTime]);

  const handleDraw = () => {
    if (!canDraw && !isPremium) return;

    // Select random card
    const randomIndex = Math.floor(Math.random() * TAROT_CARDS.length);
    const card = TAROT_CARDS[randomIndex];
    setSelectedCard(card);

    // Animate flip
    setTimeout(() => setIsFlipped(true), 500);

    // Save draw time and card (for non-premium)
    if (!isPremium) {
      localStorage.setItem('astroline-last-tarot-draw', new Date().toISOString());
      localStorage.setItem('astroline-daily-card', JSON.stringify(card));
      
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      setNextDrawTime(tomorrow);
      setCanDraw(false);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setSelectedCard(null);
  };

  return (
    <div className={cn('max-w-md mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-cosmic/20 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-gold" />
        </motion.div>
        <h2 className="text-2xl font-bold gradient-text mb-2">
          {t.features.tarot.title}
        </h2>
        <p className="text-text-secondary">
          {t.features.tarot.subtitle}
        </p>
      </div>

      {/* Card display area */}
      <div className="relative perspective-1000 h-80 mb-6">
        <AnimatePresence mode="wait">
          {!selectedCard ? (
            // Card back (deck)
            <motion.div
              key="deck"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 preserve-3d"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent/30 via-cosmic/30 to-gold/30 border-2 border-white/20 flex items-center justify-center cursor-pointer hover:border-accent/50 transition-colors"
                onClick={canDraw || isPremium ? handleDraw : undefined}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🎴
                  </motion.div>
                  <p className="text-text-secondary text-sm">
                    {canDraw || isPremium ? 'Tap to draw your card' : 'Come back tomorrow'}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            // Card front (revealed)
            <motion.div
              key="card"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: isFlipped ? 0 : -90 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute inset-0 preserve-3d"
            >
              <div className="w-full h-full rounded-2xl glass-premium border border-accent/30 p-6 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="text-7xl mb-6"
                >
                  {selectedCard.emoji}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-3"
                >
                  {selectedCard.name}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-text-secondary text-center"
                >
                  {selectedCard.meaning}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {!canDraw && !isPremium && nextDrawTime && (
          <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
            <Clock className="w-4 h-4" />
            <span>{t.features.tarot.newDraw} {countdown}</span>
          </div>
        )}

        {isPremium && selectedCard && (
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3 text-accent hover:text-accent-light transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Draw another card</span>
          </button>
        )}

        {!isPremium && (
          <div className="text-center">
            <p className="text-xs text-text-muted mb-3 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t.features.tarot.premium}
            </p>
            <LaserFlowButton variant="gold" size="md">
              Upgrade to Premium
            </LaserFlowButton>
          </div>
        )}
      </div>
    </div>
  );
}
