'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
    text: "Спочатку скептично ставився, але результати вразили. Особливо корисним був розділ про кар'єру — саме ті поради, які мені були потрібні.",
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
    <section id="testimonials" className="py-20 md:py-28 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-white/40 mb-4 block">
            Відгуки
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            Що кажуть наші користувачі
          </h2>
          <div className="w-12 h-px bg-white/10 mx-auto" />
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 cursor-grab active:cursor-grabbing"
            >
              {/* Quote mark - subtle */}
              <div className="text-4xl text-white/10 font-heading mb-6">"</div>

              {/* Testimonial text */}
              <p className="text-lg md:text-xl text-white/80 font-light mb-8 leading-relaxed">
                {testimonials[currentIndex].text}
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white">
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
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Previous button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Попередній відгук"
            >
              <ChevronLeft className="w-5 h-5 text-white/60" />
            </motion.button>

            {/* Navigation dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="p-1"
                  aria-label={`Перейти до відгуку ${i + 1}`}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
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
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Наступний відгук"
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
