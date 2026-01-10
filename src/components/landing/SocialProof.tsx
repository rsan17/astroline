'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const avatars = ['👩', '👨', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦳'];

export function SocialProof() {
  return (
    <section className="py-12 md:py-16 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto flex flex-col justify-center items-center"
      >
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 w-fit">
          {/* Layout: vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* User avatars */}
            <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-center md:justify-start">
              <div className="flex -space-x-3">
                {avatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 border-2 border-cosmic-bg flex items-center justify-center text-base"
                  >
                    {avatar}
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-heading text-white text-base">100,000+</div>
                <div className="text-xs text-white/40">користувачів</div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px md:w-px md:h-12 bg-white/10" />

            {/* Rating */}
            <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-center md:justify-start">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-heading text-white text-base">4.9 / 5.0</div>
                <div className="text-xs text-white/40">рейтинг</div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px md:w-px md:h-12 bg-white/10" />

            {/* Trust badge */}
            <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg text-accent">✓</span>
              </div>
              <div className="text-left">
                <div className="font-heading text-white text-base">Перевірено</div>
                <div className="text-xs text-white/40">астрологами</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
