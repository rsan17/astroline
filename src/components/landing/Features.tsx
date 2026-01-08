'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Hand, Calendar, Heart, Briefcase, Sparkles, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Натальна карта',
    description: 'Дізнайтесь про ваш сонячний, місячний знак та асцендент',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: <Hand className="w-6 h-6" />,
    title: 'Аналіз долоні',
    description: 'AI-powered читання ліній вашої долоні',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Прогноз 2026',
    description: 'Детальний прогноз на рік по кварталах',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Сумісність',
    description: 'Найкращі партнери для вашого знаку',
    color: 'from-pink-400 to-red-500',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Кар\'єра',
    description: 'Професійні поради та ідеальні професії',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Щасливі атрибути',
    description: 'Числа, кольори та дні удачі',
    color: 'from-amber-400 to-yellow-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Features() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
            Що включено
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ваш персональний{' '}
            <span className="gradient-text">астрологічний гід</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            Отримайте глибокий аналіз вашої особистості та майбутнього 
            на основі давніх знань та сучасних технологій
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="feature-card glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group h-full flex flex-col"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary mt-auto">
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
          className="mt-12 md:mt-16 glass rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            { value: '100K+', label: 'Користувачів' },
            { value: '4.9', label: 'Рейтинг', suffix: '⭐' },
            { value: '95%', label: 'Точність' },
            { value: '3 хв', label: 'Середній час' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1">
                {stat.value} {stat.suffix}
              </div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
