'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Brain, FileText, Sparkles } from 'lucide-react';
import { MagicBentoGrid, MagicBentoStep } from '@/components/effects';
import { DotGridSubtle } from '@/components/effects';
import { useTranslations } from '@/lib/i18n';

const STEP_ICONS = [
  <ClipboardList key="clipboard" className="w-6 h-6" />,
  <Brain key="brain" className="w-6 h-6" />,
  <FileText key="file" className="w-6 h-6" />,
  <Sparkles key="sparkles" className="w-6 h-6" />,
];

export function HowItWorks() {
  const { t } = useTranslations();

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background dot grid */}
      <DotGridSubtle maskShape="ellipse" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
            {t.howItWorks.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t.howItWorks.title}{' '}
            <span className="gradient-text">{t.howItWorks.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <MagicBentoGrid columns={{ sm: 1, md: 2, lg: 4 }} gap="md">
          {t.howItWorks.steps.map((step, index) => (
            <MagicBentoStep
              key={index}
              stepNumber={index + 1}
              icon={STEP_ICONS[index]}
              title={step.title}
              description={step.description}
              duration={step.duration}
              delay={index * 0.1}
            />
          ))}
        </MagicBentoGrid>

        {/* Connection lines between steps - desktop only */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
          <div className="max-w-6xl mx-auto px-4">
            <svg
              className="w-full h-4 mt-36"
              viewBox="0 0 1200 16"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 150 8 Q 300 8 450 8 Q 600 8 750 8 Q 900 8 1050 8"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
