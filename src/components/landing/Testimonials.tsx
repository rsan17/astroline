'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Олена К.',
    sign: 'Скорпіон ♏',
    avatar: '👩',
    text: 'Неймовірно точний прогноз! Все, що було написано про мій характер — правда на 100%. Рекомендую всім, хто хоче краще зрозуміти себе.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Андрій М.',
    sign: 'Лев ♌',
    avatar: '👨',
    text: 'Спочатку скептично ставився, але результати вразили. Особливо корисним був розділ про кар\'єру — саме ті поради, які мені були потрібні.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Марія С.',
    sign: 'Риби ♓',
    avatar: '👩‍🦰',
    text: 'Аналіз долоні — це щось неймовірне! AI точно визначив кількість дітей і важливі зміни в житті. Дуже рекомендую!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Дмитро Л.',
    sign: 'Козеріг ♑',
    avatar: '👨‍🦱',
    text: 'Прогноз на 2026 рік допоміг спланувати важливі рішення. Окремо дякую за розділ сумісності — нарешті знайшов свою половинку!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Катерина В.',
    sign: 'Близнюки ♊',
    avatar: '👩‍🦳',
    text: 'Користуюсь Astroline вже пів року. Щоденні прогнози завжди збуваються. Це моя улюблена астро-апка!',
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-accent to-purple-500 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
            Відгуки
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Що кажуть <span className="gradient-text">наші користувачі</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100 || velocity.x > 500) prev();
                if (offset.x < -100 || velocity.x < -500) next();
              }}
              className="glass rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 cursor-grab active:cursor-grabbing"
            >
              {/* Quote icon - responsive */}
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-accent/30 mb-4 sm:mb-6" />

              {/* Testimonial text - responsive */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-primary mb-6 sm:mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center text-xl sm:text-2xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-accent">
                      {testimonials[currentIndex].sign}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls - arrows and dots */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            {/* Previous button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:border-accent/50 transition-all"
              aria-label="Попередній відгук"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </motion.button>

            {/* Navigation dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="p-2 -m-1"
                  aria-label={`Перейти до відгуку ${i + 1}`}
                >
                  <span
                    className={`block w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'bg-accent w-6 sm:w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:border-accent/50 transition-all"
              aria-label="Наступний відгук"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
