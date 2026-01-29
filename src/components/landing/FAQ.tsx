'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function FAQ() {
  const { t } = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = t.faq.items.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-80 h-80 translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-teal-500/20 mb-6"
          >
            <HelpCircle className="w-7 h-7 text-accent" />
          </motion.div>
          
          <span className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-4 block">
            {t.faq.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t.faq.title}{' '}
            <span className="gradient-text">{t.faq.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted transition-colors group-focus-within:text-accent" />
            <input
              type="text"
              placeholder="Пошук питань..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 glass rounded-2xl"
            >
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-text-secondary">
                Питань за вашим запитом не знайдено
              </p>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={cn(
                  'glass rounded-2xl overflow-hidden transition-all duration-300',
                  openIndex === index && 'border-accent/30 shadow-glow'
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 py-5 sm:px-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className={cn(
                    'font-semibold text-sm sm:text-base transition-colors',
                    openIndex === index ? 'text-text-primary' : 'text-text-primary group-hover:text-white'
                  )}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      openIndex === index ? 'bg-accent/20 shadow-[0_0_15px_rgba(78,205,196,0.3)]' : 'bg-white/5 group-hover:bg-white/10'
                    )}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-accent" />
                    ) : (
                      <Plus className="w-4 h-4 text-text-secondary" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-text-secondary leading-relaxed text-sm sm:text-base border-t border-white/5 pt-4 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary mb-4">
            Не знайшли відповідь на своє питання?
          </p>
          <motion.a
            href="mailto:support@astroline.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            Напишіть нам
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
