'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const avatars = [
  '👩', '👨', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦳',
];

export function SocialProof() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-row items-center justify-between gap-6 lg:gap-8">
          {/* User avatars */}
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
            <div className="flex -space-x-3">
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 border-2 border-background flex items-center justify-center text-base sm:text-lg"
                >
                  {avatar}
                </motion.div>
              ))}
            </div>
            <div className="mt-3 lg:mt-0 lg:ml-4">
              <div className="font-semibold text-text-primary">100,000+</div>
              <div className="text-sm text-text-secondary">щасливих користувачів</div>
            </div>
          </div>

          {/* Horizontal divider for mobile/tablet */}
          <div className="lg:hidden w-full h-px bg-white/10" />

          {/* Vertical divider for desktop */}
          <div className="hidden lg:block w-px h-12 bg-white/10" />

          {/* Rating */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 text-center lg:text-left">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <div>
              <div className="font-semibold text-text-primary">4.9 / 5.0</div>
              <div className="text-sm text-text-secondary">середній рейтинг</div>
            </div>
          </div>

          {/* Horizontal divider for mobile/tablet */}
          <div className="lg:hidden w-full h-px bg-white/10" />

          {/* Vertical divider for desktop */}
          <div className="hidden lg:block w-px h-12 bg-white/10" />

          {/* Trust badge */}
          <div className="flex flex-col lg:flex-row items-center gap-3 text-center lg:text-left">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <div className="font-semibold text-text-primary">Перевірено</div>
              <div className="text-sm text-text-secondary">астрологами</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
