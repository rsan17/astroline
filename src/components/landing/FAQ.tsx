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
    answer: 'Ми використовуємо технологію комп\'ютерного зору та AI для аналізу ліній долоні. Система розпізнає лінію життя, серця та голови, інтерпретуючи їх значення за класичними методами хіромантії.',
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
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl lg:max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Часті <span className="gradient-text">запитання</span>
          </h2>
          <p className="text-text-secondary">
            Відповіді на найпопулярніші питання про Astroline
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left min-h-[56px]"
              >
                <span className="font-semibold text-text-primary text-sm sm:text-base">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 sm:w-5 sm:h-5 text-accent" />
                  ) : (
                    <Plus className="w-6 h-6 sm:w-5 sm:h-5 text-text-secondary" />
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
                    <div className="px-4 pb-4 sm:px-6 sm:pb-5 text-text-secondary leading-relaxed text-sm sm:text-base">
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
