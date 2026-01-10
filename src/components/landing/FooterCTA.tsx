'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FooterCTA() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Subtle decorative gradient */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-cosmic-muted/5 rounded-full blur-3xl" />
          
          {/* Content */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="text-4xl mb-6 block">✨</span>

            <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
              Готові дізнатися свою долю?
            </h2>

            <p className="text-lg text-white/60 font-light mb-10 max-w-md mx-auto">
              Пройдіть безкоштовний астрологічний тест та отримайте 
              персоналізований звіт за лічені хвилини
            </p>

            <Link href="/quiz?new=true">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-white font-medium px-10 py-5 rounded-full transition-all duration-300"
              >
                Почати безкоштовно
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <p className="text-white/40 text-sm mt-6 font-light">
              Без реєстрації • Результат за 3 хвилини • 100% безкоштовний тест
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
