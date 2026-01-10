'use client';

import { motion } from 'framer-motion';
import { Sun, Hand, Calendar, Heart, Briefcase, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Натальна карта',
    description: 'Дізнайтесь про ваш сонячний, місячний знак та асцендент',
  },
  {
    icon: <Hand className="w-6 h-6" />,
    title: 'Аналіз долоні',
    description: 'AI-powered читання ліній вашої долоні',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Прогноз 2026',
    description: 'Детальний прогноз на рік по кварталах',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Сумісність',
    description: 'Найкращі партнери для вашого знаку',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Кар'єра",
    description: 'Професійні поради та ідеальні професії',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Щасливі атрибути',
    description: 'Числа, кольори та дні удачі',
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-white/40 mb-4 block">
            Що включено
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            Ваш персональний гід
          </h2>
          <div className="w-12 h-px bg-white/10 mx-auto" />
        </motion.div>

        {/* Feature grid - clean cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-500">
                <span className="text-accent group-hover:text-accent-light transition-colors">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-heading text-white mb-2 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar - subtle glass */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '100K+', label: 'Користувачів' },
            { value: '4.9', label: 'Рейтинг' },
            { value: '95%', label: 'Точність' },
            { value: '3 хв', label: 'Середній час' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-heading text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
