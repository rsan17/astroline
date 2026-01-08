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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🌌 <span className="gradient-text">Натальна карта</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Три ключові знаки, які формують вашу унікальну астрологічну ДНК
          </p>
        </motion.div>

        {/* SVG Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#667eea" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Zodiac wheel */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="url(#ringGradient)" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              
              {/* Connection lines */}
              <motion.line
                x1="100" y1="30" x2="35" y2="145"
                stroke="#4ECDC4" strokeWidth="1" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.line
                x1="35" y1="145" x2="165" y2="145"
                stroke="#667eea" strokeWidth="1" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.line
                x1="165" y1="145" x2="100" y2="30"
                stroke="#764ba2" strokeWidth="1" strokeOpacity="0.5"
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
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-glow">
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
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-glow">
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
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-glow">
                <span className="text-2xl md:text-3xl">{risingSign.symbol}</span>
              </div>
            </motion.div>

            {/* Center decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="text-4xl opacity-30"
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
              className="glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getElementColorClass(item.sign.element)} flex items-center justify-center`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.position}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{item.sign.symbol}</span>
                <span className="text-xl font-bold text-text-primary">{item.sign.name}</span>
                <span>{getElementEmoji(item.sign.element)}</span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
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

