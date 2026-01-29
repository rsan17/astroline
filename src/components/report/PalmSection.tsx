'use client';

import { motion } from 'framer-motion';
import type { PalmReading } from '@/types/report';
import { Hand, Heart, Brain, Sparkles, Lock } from 'lucide-react';

interface PalmSectionProps {
  palmReading?: PalmReading;
  isPaid: boolean;
  onUnlockClick?: () => void;
}

export function PalmSection({ palmReading, isPaid, onUnlockClick }: PalmSectionProps) {
  if (!palmReading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <span className="text-6xl mb-4 block">🖐️</span>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Аналіз долоні недоступний
            </h3>
            <p className="text-text-secondary">
              Ви не завантажили фото долоні під час квізу. 
              Пройдіть квіз знову, щоб отримати персональний аналіз.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const palmLines = [
    {
      name: 'Лінія життя',
      icon: <Sparkles className="w-5 h-5" />,
      interpretation: palmReading.lifeLineInterpretation,
      color: 'from-green-400 to-emerald-500',
    },
    {
      name: 'Лінія серця',
      icon: <Heart className="w-5 h-5" />,
      interpretation: palmReading.heartLineInterpretation,
      color: 'from-pink-400 to-red-500',
    },
    {
      name: 'Лінія голови',
      icon: <Brain className="w-5 h-5" />,
      interpretation: palmReading.headLineInterpretation,
      color: 'from-blue-400 to-indigo-500',
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-6"
          >
            <Hand className="w-8 h-8 text-indigo-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Аналіз долоні</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Що розповідають лінії вашої долоні
          </p>
        </motion.div>

        {/* Palm reading SVG visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            <svg className="w-full h-full" viewBox="0 0 200 250">
              {/* Palm outline */}
              <path
                d="M100,20 C60,20 30,50 25,100 C20,150 30,200 50,230 C70,250 130,250 150,230 C170,200 180,150 175,100 C170,50 140,20 100,20"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              
              {/* Life line */}
              <motion.path
                d="M60,80 Q55,120 60,180"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              
              {/* Heart line */}
              <motion.path
                d="M50,100 Q100,80 150,100"
                fill="none"
                stroke="#ec4899"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
              
              {/* Head line */}
              <motion.path
                d="M55,120 Q100,130 140,115"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />

              {/* Legend points */}
              <circle cx="55" cy="180" r="4" fill="#22c55e" />
              <circle cx="100" cy="80" r="4" fill="#ec4899" />
              <circle cx="140" cy="115" r="4" fill="#3b82f6" />
            </svg>

            {/* Legend overlay */}
            <div className="absolute top-4 right-0 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-green-500 rounded" />
                <span className="text-text-muted">Життя</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-pink-500 rounded" />
                <span className="text-text-muted">Серце</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-blue-500 rounded" />
                <span className="text-text-muted">Голова</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Palm line interpretations */}
        <div className={`grid md:grid-cols-3 gap-6 mb-8 relative ${!isPaid ? 'select-none' : ''}`}>
          {/* Blur overlay */}
          {!isPaid && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center rounded-2xl"
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-text-muted" />
                </div>
                <p className="text-text-primary font-medium mb-1">Аналіз ліній долоні</p>
                <p className="text-text-muted text-sm mb-4">Доступний у повній версії звіту</p>
                <button onClick={onUnlockClick} className="btn-primary text-sm px-6">
                  Розблокувати
                </button>
              </div>
            </motion.div>
          )}

          {palmLines.map((line, index) => (
            <motion.div
              key={line.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${line.color} flex items-center justify-center mb-3`}>
                {line.icon}
              </div>
              <h4 className="font-semibold text-text-primary mb-2">{line.name}</h4>
              <p className="text-sm text-text-secondary">{line.interpretation}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional palm insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`glass rounded-2xl p-6 relative overflow-hidden ${!isPaid ? 'select-none' : ''}`}
        >
          {/* Blur overlay */}
          {!isPaid && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5 text-text-muted" />
                </div>
                <span className="text-sm text-text-secondary">Доступно в повній версії</span>
              </div>
            </motion.div>
          )}

          <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Hand className="w-5 h-5 text-accent" />
            Особливі відмітки
          </h4>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-2xl mb-2 block">👶</span>
              <div className="text-sm text-text-muted mb-1">Діти</div>
              <div className="font-semibold text-text-primary">{palmReading.childrenCount}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-2xl mb-2 block">💍</span>
              <div className="text-sm text-text-muted mb-1">Шлюби</div>
              <div className="font-semibold text-text-primary">{palmReading.marriagesCount}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-2xl mb-2 block">🔄</span>
              <div className="text-sm text-text-muted mb-1">Великі зміни</div>
              <div className="font-semibold text-text-primary">{palmReading.bigChanges ? 'Так' : 'Ні'}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-2xl mb-2 block">💰</span>
              <div className="text-sm text-text-muted mb-1">Багатство</div>
              <div className="font-semibold text-text-primary">{palmReading.wealthIndicator}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

