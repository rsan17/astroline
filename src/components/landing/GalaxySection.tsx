'use client';

import { motion } from 'framer-motion';
import { Sparkles, MousePointer2 } from 'lucide-react';
import { Galaxy } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';

export function GalaxySection() {
  const { t } = useTranslations();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0">
        <Galaxy
          density={0.8}
          hueShift={280}
          glowIntensity={0.4}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
          speed={0.8}
          mouseRepulsion
          repulsionStrength={2.5}
          transparent={false}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Hint for interaction - desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center justify-center gap-2 mb-8"
          >
            <MousePointer2 className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-text-secondary/80">
              {t.galaxy?.hint || 'Рухайте курсором по зірках'}
            </span>
          </motion.div>

          {/* Main content - subtle, not overwhelming */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-premium rounded-2xl p-6 sm:p-8 md:p-10 max-w-2xl mx-auto backdrop-blur-xl"
          >
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              {t.galaxy?.title || 'Ваші зірки чекають'}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base">
              {t.galaxy?.subtitle || 'Кожна зірка — частина вашої унікальної історії'}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Height for the section */}
      <div className="h-[300px] md:h-[400px] lg:h-[500px]" />
    </section>
  );
}
