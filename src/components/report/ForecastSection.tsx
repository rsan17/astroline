'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuarterlyForecast } from '@/types/report';

interface ForecastSectionProps {
  forecasts: QuarterlyForecast[];
  isPaid: boolean;
  onUnlockClick?: () => void;
}

const quarterIcons = ['🌱', '🌸', '☀️', '🍂'];
const quarterNames = ['Січень — Березень', 'Квітень — Червень', 'Липень — Вересень', 'Жовтень — Грудень'];

export function ForecastSection({ forecasts, isPaid, onUnlockClick }: ForecastSectionProps) {
  const [activeQuarter, setActiveQuarter] = useState(0);

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Прогноз на 2026 рік</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Що приготували для вас зірки у кожному кварталі
          </p>
        </motion.div>

        {/* Quarter Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-10"
        >
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-white/10 hidden md:block" />
          <motion.div 
            className="absolute left-0 top-6 h-0.5 bg-gradient-to-r from-accent to-accent/50 hidden md:block"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeQuarter / (forecasts.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          
          {/* Quarter buttons */}
          <div className="flex justify-between md:justify-around relative">
            {forecasts.map((forecast, index) => (
              <motion.button
                key={forecast.quarter}
                onClick={() => setActiveQuarter(index)}
                className="group flex flex-col items-center gap-2 relative z-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                    activeQuarter === index
                      ? 'bg-accent shadow-glow shadow-accent/40'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                  animate={{
                    scale: activeQuarter === index ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className={activeQuarter === index ? 'grayscale-0' : 'grayscale opacity-60 group-hover:opacity-80'}>
                    {quarterIcons[index]}
                  </span>
                </motion.div>
                <div className="text-center">
                  <span className={`block text-sm font-medium transition-colors ${
                    activeQuarter === index ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'
                  }`}>
                    {forecast.quarter}
                  </span>
                  <span className="hidden md:block text-xs text-text-muted mt-0.5">
                    {quarterNames[index]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Forecast content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuarter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`glass rounded-2xl p-8 relative overflow-hidden ${!isPaid && activeQuarter > 0 ? 'select-none' : ''}`}
          >
            {/* Blur overlay for unpaid content */}
            {!isPaid && activeQuarter > 0 && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center">
                <motion.div 
                  className="text-center p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-text-primary font-medium mb-1">Прогноз на {forecasts[activeQuarter].quarter}</p>
                  <p className="text-text-muted text-sm mb-4">Доступний у повній версії звіту</p>
                  <button onClick={onUnlockClick} className="btn-primary text-sm px-6">
                    Розблокувати
                  </button>
                </motion.div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{quarterIcons[activeQuarter]}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                    {forecasts[activeQuarter].title}
                  </h3>
                  <span className="text-sm text-text-muted">{quarterNames[activeQuarter]}</span>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {forecasts[activeQuarter].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Focus areas */}
              <div className="bg-white/5 rounded-xl p-5">
                <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span>🎯</span> Фокус кварталу
                </h4>
                <div className="flex flex-wrap gap-2">
                  {forecasts[activeQuarter].focus.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lucky days */}
              <div className="bg-white/5 rounded-xl p-5">
                <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span>🍀</span> Щасливі дні
                </h4>
                <div className="space-y-2">
                  {forecasts[activeQuarter].luckyDays.map((day) => (
                    <div
                      key={day}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

