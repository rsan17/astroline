'use client';

import { motion } from 'framer-motion';
import type { NatalChart } from '@/types/report';
import { getElementEmoji, getElementColorClass } from '@/lib/report-data';

interface NatalChartSectionProps {
  natalChart: NatalChart;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function NatalChartSection({ natalChart }: NatalChartSectionProps) {
  const { sunSign, moonSign, risingSign, sunDescription, moonDescription, risingDescription } = natalChart;

  const chartData = [
    {
      title: 'Сонячний знак',
      sign: sunSign,
      description: sunDescription,
      icon: '☀️',
      position: 'Ваша суть і его',
    },
    {
      title: 'Місячний знак',
      sign: moonSign,
      description: moonDescription,
      icon: '🌙',
      position: 'Ваші емоції',
    },
    {
      title: 'Асцендент',
      sign: risingSign,
      description: risingDescription,
      icon: '⬆️',
      position: 'Як вас бачать',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-white/40 mb-4 block">
            Натальна карта
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            🌌 Ваша астрологічна ДНК
          </h2>
          <div className="w-12 h-px bg-white/10 mx-auto" />
        </motion.div>

        {/* SVG Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#548FC2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8b9dc3" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Connection lines */}
              <motion.line
                x1="100" y1="30" x2="35" y2="145"
                stroke="#548FC2" strokeWidth="1" strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.line
                x1="35" y1="145" x2="165" y2="145"
                stroke="#8b9dc3" strokeWidth="1" strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.line
                x1="165" y1="145" x2="100" y2="30"
                stroke="#548FC2" strokeWidth="1" strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </svg>

            {/* Sign positions */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl">{sunSign.symbol}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8"
            >
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl">{moonSign.symbol}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
            >
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl">{risingSign.symbol}</span>
              </div>
            </motion.div>

            {/* Center decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="text-3xl opacity-20 text-white/40"
              >
                ✧
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Detailed cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {chartData.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getElementColorClass(item.sign.element)} flex items-center justify-center`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-heading text-white">{item.title}</h3>
                  <p className="text-xs text-white/40">{item.position}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{item.sign.symbol}</span>
                <span className="text-xl font-heading text-white">{item.sign.name}</span>
                <span>{getElementEmoji(item.sign.element)}</span>
              </div>

              <p className="text-sm text-white/60 font-light leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span>Планета: {item.sign.rulingPlanet}</span>
                <span className="capitalize">
                  {item.sign.modality === 'cardinal' ? 'Кардинальний' : item.sign.modality === 'fixed' ? 'Фіксований' : 'Мутабельний'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
