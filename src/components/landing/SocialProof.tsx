'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const avatars = [
  '👩', '👨', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦳',
];

export function SocialProof() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto flex flex-col justify-center items-center"
      >
        <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 w-fit">
          {/* Mobile/Tablet: vertical layout, Desktop: horizontal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8">
            {/* User avatars */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
              <div className="flex -space-x-2 sm:-space-x-3">
                {avatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 border-2 border-background flex items-center justify-center text-sm sm:text-base lg:text-lg"
                  >
                    {avatar}
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary text-sm sm:text-base">100,000+</div>
                <div className="text-xs sm:text-sm text-text-secondary">користувачів</div>
              </div>
            </div>

            {/* Divider - horizontal on mobile, vertical on desktop */}
            <div className="w-full h-px md:w-px md:h-12 bg-white/10" />

            {/* Rating */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary text-sm sm:text-base">4.9 / 5.0</div>
                <div className="text-xs sm:text-sm text-text-secondary">рейтинг</div>
              </div>
            </div>

            {/* Divider - horizontal on mobile, vertical on desktop */}
            <div className="w-full h-px md:w-px md:h-12 bg-white/10" />

            {/* Trust badge */}
            <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl">✓</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary text-sm sm:text-base">Перевірено</div>
                <div className="text-xs sm:text-sm text-text-secondary">астрологами</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
