'use client';

import { motion } from 'framer-motion';
import { Sparkles, Lock } from 'lucide-react';
import type { PersonalityTrait } from '@/types/report';

interface PersonalitySectionProps {
  traits: PersonalityTrait[];
  isPaid: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function PersonalitySection({ traits, isPaid }: PersonalitySectionProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6"
          >
            <span className="text-3xl">🎭</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Характеристика особистості</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Ваші головні риси характеру, визначені розташуванням зірок у момент вашого народження
          </p>
        </motion.div>

        {/* Traits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {traits.map((trait, index) => {
            const isLocked = !isPaid && index > 1;
            
            return (
              <motion.div
                key={trait.title}
                variants={itemVariants}
                whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
                className={`group relative glass rounded-2xl p-6 transition-all duration-300 ${
                  !isLocked ? 'hover:border-accent/30 hover:shadow-glow' : ''
                }`}
              >
                {/* Locked overlay */}
                {isLocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl"
                  >
                    <Lock className="w-8 h-8 text-text-muted mb-3" />
                    <span className="text-sm text-text-secondary">Доступно в повній версії</span>
                  </motion.div>
                )}

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
                  >
                    {trait.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {trait.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {trait.description}
                    </p>
                    
                    {/* Strength indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Рівень</span>
                        <span className="text-sm font-bold text-accent">{trait.strength}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${trait.strength}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Unlock CTA */}
        {!isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center glass rounded-2xl p-8">
              <Sparkles className="w-10 h-10 text-gold mb-4" />
              <p className="text-text-secondary mb-6 max-w-md">
                Розблокуйте повний аналіз усіх {traits.length} рис вашої особистості
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                Отримати повний звіт
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
