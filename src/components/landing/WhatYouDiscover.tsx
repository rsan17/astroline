'use client';

import { motion } from 'framer-motion';
import { Sun, Calendar, Heart, Briefcase, Hand, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MagicBentoCard } from '@/components/effects';
import { LaserFlowButton } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';

const CARD_ICONS = [
  <Sun key="sun" className="w-5 h-5" />,
  <Calendar key="calendar" className="w-5 h-5" />,
  <Heart key="heart" className="w-5 h-5" />,
  <Briefcase key="briefcase" className="w-5 h-5" />,
  <Hand key="hand" className="w-5 h-5" />,
];

const CARD_COLORS = [
  'from-yellow-500/20 to-orange-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-pink-500/20 to-red-500/20',
  'from-green-500/20 to-emerald-500/20',
  'from-purple-500/20 to-violet-500/20',
];

export function WhatYouDiscover() {
  const { t } = useTranslations();

  return (
    <section id="discover" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-4 block">
            {t.discover.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t.discover.title}{' '}
            <span className="gradient-text">{t.discover.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Discovery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {t.discover.cards.map((card, index) => (
            <MagicBentoCard
              key={index}
              className="group"
              delay={index * 0.1}
              spotlightColor={index % 2 === 0 ? 'rgba(147, 51, 234, 0.15)' : 'rgba(59, 130, 246, 0.15)'}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${CARD_COLORS[index]} flex items-center justify-center text-white`}>
                    {CARD_ICONS[index]}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-text-muted text-xs">
                    <Lock className="w-3 h-3" />
                    <span>{t.discover.premium}</span>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {card.description}
                </p>

                {/* Blurred Preview */}
                <div className="mt-auto relative">
                  <div className="glass rounded-xl p-4 relative overflow-hidden">
                    {/* Blur overlay */}
                    <div className="absolute inset-0 backdrop-blur-xl bg-background/90 flex items-center justify-center z-10">
                      <span className="flex items-center gap-2 text-xs text-accent">
                        <Lock className="w-3 h-3" />
                        {t.discover.unlockToReveal}
                      </span>
                    </div>
                    
                    {/* Preview text (blurred) */}
                    <p className="text-sm text-text-secondary select-none">
                      {card.preview}
                    </p>
                  </div>
                </div>
              </div>
            </MagicBentoCard>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/quiz?new=true">
            <LaserFlowButton
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.discover.cta}
            </LaserFlowButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
