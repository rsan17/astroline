'use client';

import { motion } from 'framer-motion';
import { Sun, Hand, Calendar, Heart, Briefcase, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Натальна карта',
    description: 'Дізнайтесь про ваш сонячний, місячний знак та асцендент',
    color: 'from-yellow-400 to-orange-500',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
  },
  {
    icon: <Hand className="w-6 h-6" />,
    title: 'Аналіз долоні',
    description: 'AI-powered читання ліній вашої долоні',
    color: 'from-purple-400 to-pink-500',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Прогноз 2026',
    description: 'Детальний прогноз на рік по кварталах',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-[0_0_30px_rgba(96,165,250,0.3)]',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Сумісність',
    description: 'Найкращі партнери для вашого знаку',
    color: 'from-pink-400 to-red-500',
    glow: 'shadow-[0_0_30px_rgba(244,114,182,0.3)]',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Кар\'єра',
    description: 'Професійні поради та ідеальні професії',
    color: 'from-green-400 to-emerald-500',
    glow: 'shadow-[0_0_30px_rgba(74,222,128,0.3)]',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Щасливі атрибути',
    description: 'Числа, кольори та дні удачі',
    color: 'from-amber-400 to-yellow-500',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Features() {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-accent/10"
          >
            Що включено
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ваш персональний{' '}
            <span className="gradient-text">астрологічний гід</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            Отримайте глибокий аналіз вашої особистості та майбутнього 
            на основі давніх знань та сучасних технологій
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="feature-card glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group h-full flex flex-col"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 ${feature.glow} transition-shadow group-hover:shadow-lg`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary mt-auto leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 glass rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            { value: '100K+', label: 'Користувачів', icon: '👥' },
            { value: '4.9', label: 'Рейтинг', icon: '⭐' },
            { value: '95%', label: 'Точність', icon: '🎯' },
            { value: '3 хв', label: 'Середній час', icon: '⏱️' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
