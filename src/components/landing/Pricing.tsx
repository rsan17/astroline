'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Shield, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LaserFlowButton } from '@/components/effects';
import { DotGridCosmic } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Pricing() {
  const { t } = useTranslations();
  const [hoveredPlan, setHoveredPlan] = useState<'oneTime' | 'subscription' | null>(null);

  return (
    <section id="pricing" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <DotGridCosmic maskShape="ellipse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
            {t.pricing.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t.pricing.title}{' '}
            <span className="gradient-text">{t.pricing.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* One-Time Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredPlan('oneTime')}
            onMouseLeave={() => setHoveredPlan(null)}
            className={cn(
              'relative glass rounded-3xl p-6 sm:p-8 transition-all duration-300',
              hoveredPlan === 'oneTime' && 'border-cosmic/50 shadow-glow-cosmic'
            )}
          >
            {/* Plan Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cosmic/20 to-cosmic-dark/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-cosmic" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{t.pricing.oneTime.name}</h3>
                  <p className="text-sm text-text-secondary">{t.pricing.oneTime.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-text-primary">{t.pricing.oneTime.price}</span>
                <span className="text-text-secondary">{t.pricing.oneTime.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {t.pricing.oneTime.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <Check className="w-5 h-5 text-cosmic flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/quiz?new=true" className="block">
              <LaserFlowButton
                variant="cosmic"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t.pricing.oneTime.cta}
              </LaserFlowButton>
            </Link>
          </motion.div>

          {/* Subscription Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredPlan('subscription')}
            onMouseLeave={() => setHoveredPlan(null)}
            className={cn(
              'relative rounded-3xl p-6 sm:p-8 transition-all duration-300',
              'gradient-border-gold',
              hoveredPlan === 'subscription' && 'shadow-glow-gold'
            )}
          >
            {/* Recommended Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-dark to-gold text-background text-sm font-semibold">
                <Crown className="w-4 h-4" />
                {t.pricing.subscription.badge}
              </span>
            </div>

            {/* Plan Header */}
            <div className="mb-6 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{t.pricing.subscription.name}</h3>
                  <p className="text-sm text-text-secondary">{t.pricing.subscription.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold gradient-text-gold">{t.pricing.subscription.price}</span>
                <span className="text-text-secondary">{t.pricing.subscription.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {t.pricing.subscription.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <Check className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/quiz?new=true" className="block">
              <LaserFlowButton
                variant="gold"
                size="lg"
                className="w-full"
                rightIcon={<Zap className="w-4 h-4" />}
              >
                {t.pricing.subscription.cta}
              </LaserFlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-text-secondary">{t.pricing.guarantee}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
