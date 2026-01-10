'use client';

import { motion } from 'framer-motion';
import type { PersonalityTrait } from '@/types/report';

interface PersonalitySectionProps {
  traits: PersonalityTrait[];
  isPaid: boolean;
}

export function PersonalitySection({ traits, isPaid }: PersonalitySectionProps) {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-white/40 mb-4 block">
            Особистість
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            🎭 Характеристика особистості
          </h2>
          <div className="w-12 h-px bg-white/10 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden ${!isPaid && index > 1 ? 'select-none' : ''}`}
            >
              {/* Blur overlay for unpaid content */}
              {!isPaid && index > 1 && (
                <div className="absolute inset-0 bg-cosmic-bg/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">🔒</span>
                    <span className="text-sm text-white/40 font-light">Доступно в повній версії</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl flex-shrink-0"
                >
                  {trait.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading text-white mb-1">{trait.title}</h3>
                  <p className="text-sm text-white/60 font-light mb-4">{trait.description}</p>
                  
                  {/* Strength bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/30 uppercase tracking-widest">Рівень</span>
                      <span className="text-xs font-medium text-accent">{trait.strength}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trait.strength}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-white/60 font-light mb-4">
              Розблокуйте повний аналіз особистості
            </p>
            <button className="bg-accent hover:bg-accent-light text-white font-medium py-3 px-6 rounded-full transition-colors">
              Отримати повний звіт
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
