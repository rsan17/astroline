'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuarterlyForecast } from '@/types/report';

interface ForecastSectionProps {
  forecasts: QuarterlyForecast[];
  isPaid: boolean;
}

export function ForecastSection({ forecasts, isPaid }: ForecastSectionProps) {
  const [activeQuarter, setActiveQuarter] = useState(0);

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🔮 <span className="gradient-text">Прогноз на 2026 рік</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Що приготували для вас зірки у кожному кварталі
          </p>
        </motion.div>

        {/* Timeline navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex glass rounded-full p-1">
            {forecasts.map((forecast, index) => (
              <button
                key={forecast.quarter}
                onClick={() => setActiveQuarter(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeQuarter === index
                    ? 'bg-accent text-background'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {forecast.quarter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline visual */}
        <div className="relative mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 rounded-full" />
          <div className="flex justify-between relative">
            {forecasts.map((forecast, index) => (
              <motion.button
                key={forecast.quarter}
                onClick={() => setActiveQuarter(index)}
                className="relative"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= activeQuarter
                      ? 'bg-accent shadow-glow'
                      : 'bg-white/10'
                  }`}
                  animate={{
                    scale: activeQuarter === index ? 1.2 : 1,
                  }}
                >
                  {index < activeQuarter ? (
                    <span className="text-background text-sm">✓</span>
                  ) : (
                    <span className={`text-xs ${activeQuarter === index ? 'text-background' : 'text-text-secondary'}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-xs text-text-muted whitespace-nowrap">
                  {forecast.quarter}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

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
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🔒</span>
                  <span className="text-text-secondary mb-4 block">Розблокуйте повний прогноз</span>
                  <button className="btn-primary text-sm">
                    Отримати доступ
                  </button>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <span className="text-4xl mb-3 block">
                {activeQuarter === 0 ? '🌱' : activeQuarter === 1 ? '🌸' : activeQuarter === 2 ? '☀️' : '🍂'}
              </span>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {forecasts[activeQuarter].title}
              </h3>
              <p className="text-text-secondary">
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

