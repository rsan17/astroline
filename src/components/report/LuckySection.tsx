'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { LuckyAttributes } from '@/types/report';

interface LuckySectionProps {
  lucky: LuckyAttributes;
}

export function LuckySection({ lucky }: LuckySectionProps) {
  const sections = [
    {
      title: 'Щасливі числа',
      icon: '🔢',
      items: lucky.numbers.map(n => n.toString()),
      color: 'from-yellow-400 to-amber-500',
      explanation: lucky.numbersExplanation,
    },
    {
      title: 'Щасливі дні',
      icon: '📅',
      items: lucky.days,
      color: 'from-green-400 to-emerald-500',
      explanation: lucky.daysExplanation,
    },
    {
      title: 'Щасливі кольори',
      icon: '🎨',
      items: lucky.colors,
      color: 'from-pink-400 to-rose-500',
      explanation: lucky.colorsExplanation,
    },
    {
      title: 'Щасливі камені',
      icon: '💎',
      items: lucky.gems,
      color: 'from-blue-400 to-indigo-500',
      explanation: lucky.gemsExplanation,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 mb-6"
          >
            <Star className="w-8 h-8 text-yellow-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Щасливі атрибути</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Персоналізовані талісмани для вашого знаку
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-3xl shadow-lg`}
              >
                {section.icon}
              </motion.div>
              <h3 className="font-semibold text-text-primary mb-3">{section.title}</h3>
              <div className="space-y-2 mb-3">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent/50" />
                    <span className="text-text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>
              {/* AI-personalized explanation */}
              {section.explanation && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-text-muted mt-3 pt-3 border-t border-white/10 italic"
                >
                  {section.explanation}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lucky direction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🧭</span>
              <div className="text-sm text-text-muted">Щасливий напрямок</div>
              <div className="text-xl font-bold text-accent mt-1">{lucky.direction}</div>
            </div>

            {/* Compass visualization */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                {/* Direction markers */}
                <text x="50" y="15" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Пн</text>
                <text x="90" y="53" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Сх</text>
                <text x="50" y="95" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Пд</text>
                <text x="10" y="53" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Зх</text>

                {/* Active direction indicator */}
                <motion.circle
                  cx={
                    lucky.direction === 'Північ' ? 50 :
                    lucky.direction === 'Схід' ? 85 :
                    lucky.direction === 'Південь' ? 50 :
                    15
                  }
                  cy={
                    lucky.direction === 'Північ' ? 15 :
                    lucky.direction === 'Схід' ? 50 :
                    lucky.direction === 'Південь' ? 85 :
                    50
                  }
                  r="6"
                  fill="#4ECDC4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                />

                {/* Compass needle */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2={
                    lucky.direction === 'Північ' ? 50 :
                    lucky.direction === 'Схід' ? 75 :
                    lucky.direction === 'Південь' ? 50 :
                    25
                  }
                  y2={
                    lucky.direction === 'Північ' ? 25 :
                    lucky.direction === 'Схід' ? 50 :
                    lucky.direction === 'Південь' ? 75 :
                    50
                  }
                  stroke="#4ECDC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <circle cx="50" cy="50" r="4" fill="#4ECDC4" />
              </svg>
            </div>

            <div className="text-center max-w-xs">
              <p className="text-sm text-text-secondary">
                {lucky.directionExplanation || (
                  <>Розташуйте робочий стіл чи ліжко у напрямку <span className="text-accent font-medium">{lucky.direction}</span> для залучення позитивної енергії</>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

