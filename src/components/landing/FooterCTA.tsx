'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { LaserFlowButton } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';

export function FooterCTA() {
  const { t } = useTranslations();

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent" />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="glass-premium rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border-accent/20">
          {/* Decorative glow orbs */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-cosmic/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="relative z-10 mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-amber-500/20"
            >
              <Sparkles className="w-10 h-10 text-gold" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative z-10"
          >
            {t.footerCta?.title || 'Готові дізнатись свою'}{' '}
            <span className="gradient-text">{t.footerCta?.titleHighlight || 'долю'}</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl mx-auto relative z-10"
          >
            {t.footerCta?.subtitle || 'Пройдіть безкоштовний астрологічний тест і отримайте персональний звіт за лічені хвилини'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <Link href="/quiz?new=true" className="block sm:inline-block">
              <LaserFlowButton
                variant="purple"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="min-w-[280px]"
              >
                {t.common.getStarted}
              </LaserFlowButton>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-white/5 relative z-10"
          >
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Без реєстрації</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Clock className="w-4 h-4 text-accent" />
              <span>Результат за 3 хвилини</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Zap className="w-4 h-4 text-gold" />
              <span>100% безкоштовний тест</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
