'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Наскільки точні астрологічні прогнози?',
    answer: 'Наші прогнози базуються на класичній астрології та сучасних алгоритмах. 95% користувачів підтверджують високу точність персоналізованих звітів. Однак, астрологія — це керівництво, а не точна наука, і остаточні рішення завжди за вами.',
  },
  {
    question: 'Як працює аналіз долоні?',
    answer: "Ми використовуємо технологію комп'ютерного зору та AI для аналізу ліній долоні. Система розпізнає лінію життя, серця та голови, інтерпретуючи їх значення за класичними методами хіромантії.",
  },
  {
    question: 'Чи безпечні мої персональні дані?',
    answer: 'Абсолютно! Ми використовуємо шифрування банківського рівня для захисту ваших даних. Фото долоні обробляються та видаляються одразу після аналізу. Ми ніколи не продаємо та не передаємо вашу інформацію третім сторонам.',
  },
  {
    question: 'Скільки часу займає проходження квізу?',
    answer: 'Весь квіз займає приблизно 3-5 хвилин. Після завершення ви одразу отримаєте попередній перегляд звіту, а повна версія буде доступна після оформлення підписки.',
  },
  {
    question: 'Чи можу я скасувати підписку?',
    answer: 'Так, ви можете скасувати підписку в будь-який момент. Оплата проходить через Stripe з повним захистом. Ми також пропонуємо 7-денну гарантію повернення коштів, якщо вам не сподобається сервіс.',
  },
  {
    question: 'Чи потрібно знати точний час народження?',
    answer: 'Для найточнішого результату бажано знати час народження, оскільки він впливає на розрахунок асценденту. Однак, якщо ви не знаєте точний час, ми все одно зможемо створити детальний звіт на основі дати та місця народження.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-2xl lg:max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-white/40 mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            Часті запитання
          </h2>
          <div className="w-12 h-px bg-white/10 mx-auto" />
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-white/90">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-accent" />
                  ) : (
                    <Plus className="w-5 h-5 text-white/40" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/60 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
