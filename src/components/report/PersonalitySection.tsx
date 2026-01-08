'use client';

import { motion } from 'framer-motion';
import type { PersonalityTrait } from '@/types/report';

interface PersonalitySectionProps {
  traits: PersonalityTrait[];
  isPaid: boolean;
}

export function PersonalitySection({ traits, isPaid }: PersonalitySectionProps) {
  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎭 <span className="gradient-text">Характеристика особистості</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ваші головні риси характеру, визначені зірками
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 relative overflow-hidden ${!isPaid && index > 1 ? 'select-none' : ''}`}
            >
              {/* Blur overlay for unpaid content */}
              {!isPaid && index > 1 && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">🔒</span>
                    <span className="text-sm text-text-secondary">Доступно в повній версії</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-3xl flex-shrink-0"
                >
                  {trait.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-1">{trait.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{trait.description}</p>
                  
                  {/* Strength bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-muted">Рівень</span>
                      <span className="text-xs font-medium text-accent">{trait.strength}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-teal-400"
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
            <p className="text-text-secondary mb-4">
              Розблокуйте повний аналіз особистості
            </p>
            <button className="btn-primary">
              Отримати повний звіт
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

