'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FooterCTA() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Decorative elements - smaller on mobile */}
          <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* Animated emoji */}
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              scale: { duration: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-5xl sm:text-6xl mb-6 block"
          >
            ✨
          </motion.span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готові дізнатися свою{' '}
            <span className="gradient-text">долю</span>?
          </h2>

          <p className="text-base sm:text-lg text-text-secondary mb-8 sm:mb-10 max-w-xl mx-auto">
            Пройдіть безкоштовний астрологічний тест та отримайте 
            персоналізований звіт за лічені хвилини
          </p>

          <Link href="/quiz?new=true" className="block sm:inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-12 py-5 flex items-center justify-center gap-3 w-full sm:w-auto mx-auto"
            >
              Почати безкоштовно
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <p className="text-text-muted text-xs sm:text-sm mt-6">
            Без реєстрації • Результат за 3 хвилини • 100% безкоштовний тест
          </p>
        </div>
      </motion.div>
    </section>
  );
}
