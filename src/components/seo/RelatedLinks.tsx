'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Calendar } from 'lucide-react';
import { ZODIAC_SIGNS, HOROSCOPE_PERIODS, getZodiacBySlug } from '@/lib/constants/zodiac';

interface RelatedLinksProps {
  currentSignSlug?: string;
  type?: 'zodiac' | 'horoscope' | 'compatibility' | 'all';
  limit?: number;
  className?: string;
}

export function RelatedLinks({
  currentSignSlug,
  type = 'all',
  limit = 6,
  className = '',
}: RelatedLinksProps) {
  const currentSign = currentSignSlug ? getZodiacBySlug(currentSignSlug) : null;

  const otherSigns = ZODIAC_SIGNS.filter((sign) => sign.slug !== currentSignSlug).slice(0, limit);

  const compatibleSigns = currentSign
    ? ZODIAC_SIGNS.filter((sign) => currentSign.compatibleSigns.includes(sign.slug)).slice(0, 4)
    : [];

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Zodiac Signs Links */}
        {(type === 'zodiac' || type === 'all') && (
          <div className="mb-12">
            <h3 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              Інші знаки зодіаку
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {otherSigns.map((sign, index) => (
                <motion.div
                  key={sign.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/zodiac/${sign.slug}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {sign.symbol}
                    </span>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                      {sign.nameUk}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Horoscope Links */}
        {(type === 'horoscope' || type === 'all') && currentSign && (
          <div className="mb-12">
            <h3 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-accent" />
              Гороскопи для {currentSign.nameUkGenitive}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {HOROSCOPE_PERIODS.map((period, index) => (
                <motion.div
                  key={period.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/horoscope/${currentSign.slug}/${period.slug}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 group"
                  >
                    <div>
                      <span className="text-white/90 font-medium block">
                        {period.nameUk.charAt(0).toUpperCase() + period.nameUk.slice(1)}
                      </span>
                      <span className="text-xs text-white/30">
                        {currentSign.symbol} {currentSign.nameUk}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Compatibility Links */}
        {(type === 'compatibility' || type === 'all') && currentSign && compatibleSigns.length > 0 && (
          <div>
            <h3 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-accent" />
              Сумісність {currentSign.nameUkGenitive}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {compatibleSigns.map((sign, index) => (
                <motion.div
                  key={sign.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/compatibility/${currentSign.slug}/${sign.slug}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 group"
                  >
                    <div className="flex items-center text-2xl">
                      <span>{currentSign.symbol}</span>
                      <Heart className="w-4 h-4 text-accent mx-1" />
                      <span>{sign.symbol}</span>
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                      {sign.nameUk}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Signs Grid (when no current sign) */}
        {!currentSign && (type === 'all' || type === 'zodiac') && (
          <div>
            <h3 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              Всі знаки зодіаку
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {ZODIAC_SIGNS.map((sign, index) => (
                <motion.div
                  key={sign.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={`/zodiac/${sign.slug}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {sign.symbol}
                    </span>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors text-center">
                      {sign.nameUk}
                    </span>
                    <span className="text-xs text-white/30">
                      {sign.dates.split(' - ')[0]}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
