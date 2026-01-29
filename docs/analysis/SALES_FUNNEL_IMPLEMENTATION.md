# Воронка продажів та покращена структура квізу

## Аналіз sub.astroline.today

На основі детального аналізу сайту sub.astroline.today було виявлено ключові механізми продажів та збору даних.

---

## 1. Структура воронки продажів

### Етапи воронки

```
Welcome Screen (engagement hook)
     ↓
Gender Selection (easy first step)
     ↓
Birth Data Collection (value exchange)
     ↓
Transition Animation (building anticipation)
     ↓
Personality Questions (deepening engagement)
     ↓
More Transitions (showing "analysis")
     ↓
Email Capture (with blur preview)
     ↓
Report Loader (final anticipation)
     ↓
Presummary Paywall (soft sell with preview)
     ↓
Main Paywall (main conversion point)
     ↓
Upsell #1: Guides
     ↓
Upsell #2: Compatibility
     ↓
Upsell #3: Birth Chart
     ↓
Upsell #4: Astrologer Pack
     ↓
Success Page + App Download
```

---

## 2. Психологічні тригери

### 2.1 Urgency (Терміновість)
- **Countdown Timer**: 30 хвилин на головному paywall
- **"Limited Time Offer"**: Знижки з таймером
- **"Spots Left"**: Обмежена кількість консультацій

### 2.2 Social Proof (Соціальний доказ)
- Кількість користувачів: "2,847,392 users"
- Рейтинг: 4.8/5
- Trustpilot відгуки
- "Based on 847 cosmic parameters"

### 2.3 Value Stacking (Накопичення цінності)
- Показ частинок звіту під час квізу
- Blur ефект на email сторінці (показує готовий звіт)
- Presummary з превью результатів
- "What you'll discover" списки

### 2.4 Loss Aversion (Уникнення втрати)
- "Don't miss your personalized report"
- "Your results will expire in..."
- "Special offer ending soon"

### 2.5 Commitment & Consistency
- Починається з легких питань (стать)
- Поступово збільшується engagement
- Після 5+ хвилин квізу - сильніша мотивація завершити

---

## 3. Точки збору даних

### 3.1 Базові дані (обов'язкові)
| Крок | Дані | Мета |
|------|------|------|
| Gender | Стать | Персоналізація |
| Birthday | Дата народження | Знак зодіаку |
| Birthtime | Час народження | Асцендент |
| Birthplace | Місце народження | Натальна карта |

### 3.2 Психографічні дані
| Крок | Дані | Мета |
|------|------|------|
| Relationship | Статус відносин | Сегментація + контент |
| Goals | Цілі/інтереси | Персоналізація upsells |
| Colors | Улюблений колір | Engagement |
| Element | Стихія | Додаткова персоналізація |

### 3.3 Email (критично важливий)
- Показується **після** накопичення цінності
- **Blur ефект** показує готовий звіт за email
- Checkbox для підписки на розсилку
- Альтернатива: вхід через Google/Apple

### 3.4 Партнерські дані (для compatibility)
- Дата народження партнера
- Час народження партнера
- Місце народження партнера

### 3.5 Спеціальні дані
- **Palm Reading**: фото долоні
- **Face Reading**: фото обличчя
- **Astrocartography**: поточне місце проживання

---

## 4. Transition екрани (Loading states)

### Мета transitions:
1. **Створення очікування** - користувач чекає, відчуває що щось відбувається
2. **Підвищення perceived value** - "аналіз" здається складнішим
3. **Зниження bounce rate** - важче піти під час "розрахунку"
4. **Storytelling** - розповідь про те що відбувається

### Типи transitions:
```
TRANSITION_SUN - "Analyzing your Sun sign..."
TRANSITION_BIRTH_CHART - "Creating your natal chart..."
TRANSITION_MOON_PHASE - "Calculating your Moon phase..."
TRANSITION_COMPATIBILITY - "Analyzing cosmic connection..."
TRANSITION_SOULMATE_PORTRAIT - "Your soulmate portrait is ready!"
```

### Структура transition екрану:
1. Заголовок (що відбувається)
2. Підзаголовок (чому це важливо)
3. Анімація (планети, карти, рука, тощо)
4. Progress steps:
   - "Reading birth data..."
   - "Calculating positions..."
   - "Analyzing aspects..."
   - "Generating insights..."

---

## 5. Paywall стратегії

### 5.1 Presummary Paywall
- Показує **часткові результати** безкоштовно
- "Here's what we discovered..."
- Список того що буде в повному звіті
- М'який підхід до продажу

### 5.2 Main Paywall
- **3 плани** (найпопулярніший посередині)
- Таймер зворотного відліку
- Money-back guarantee
- Trust indicators
- Testimonials

### 5.3 Pricing структура
```
7-Day Trial     $1.99  (80% off)  - Hook
Monthly         $19.99 (50% off)  - Default selected
Yearly          $49.99 (58% off)  - Best value
```

### 5.4 Special Offers (Upsells)
Показуються **після** основної покупки:

1. **Compatibility Report** - $9.99 (75% off)
2. **Birth Chart Report** - $12.99 (74% off)
3. **Astrologer Pack** - $49.99 (50% off) + 15 хв безкоштовно

### 5.5 No Funds Offer
Якщо користувач відмовляється:
- Popup з ще більшою знижкою
- "We understand - here's a special deal"
- $0.99 за тиждень (90% off)

---

## 6. Імплементовані файли

### Нова архітектура квізу:

```
src/lib/quiz/
├── types.ts        # Типи для всіх компонентів квізу
├── flows.ts        # Конфігурація flows та paywall
└── index.ts        # Експорти

src/hooks/
└── useAdvancedQuizStore.ts  # Новий store з підтримкою flows
```

### Доступні flows:
1. **default** - Стандартний астрологічний звіт
2. **soulmate** - Пошук споріднених душ
3. **palm_reading** - Читання долоні
4. **moon** - Місячний цикл
5. **human_design** - Human Design
6. **witch_type** - Тип відьми
7. **astrocartography** - Астрокартографія
8. **tarot** - Таро
9. **compatibility** - Сумісність

---

## 7. Наступні кроки імплементації

### Фаза 1: Компоненти
- [ ] Welcome екрани для кожного flow
- [ ] Transition компоненти з анімаціями
- [ ] Нові quiz step компоненти

### Фаза 2: Paywall
- [ ] Presummary paywall з preview
- [ ] Main paywall з таймером
- [ ] Upsell modal компоненти
- [ ] No funds offer popup

### Фаза 3: Інтеграція
- [ ] Stripe/Solidgate інтеграція
- [ ] Email capture з blur preview
- [ ] Analytics events

### Фаза 4: A/B тестування
- [ ] Remote config система
- [ ] Різні flow варіації
- [ ] Pricing experiments

---

## 8. Ключові метрики для відстеження

### Conversion Funnel:
- Welcome → Gender: очікувано 95%+
- Gender → Email: очікувано 40-60%
- Email → Paywall: очікувано 90%+
- Paywall → Purchase: очікувано 3-8%
- Purchase → Upsell #1: очікувано 15-25%
- Upsell #1 → Upsell #2: очікувано 10-15%

### Engagement Metrics:
- Середній час на квізі
- Drop-off по кроках
- Email capture rate
- Upsell acceptance rate

---

## 9. Best Practices від sub.astroline.today

1. **Почати легко** - перший крок (стать) максимально простий
2. **Transitions після кожного блоку** - створюють anticipation
3. **Email з blur preview** - показати цінність перед збором
4. **Presummary перед paywall** - м'який підхід
5. **Multiple upsells** - кожен з різним value proposition
6. **No funds offer** - остання спроба конверсії
7. **Timer urgency** - але не aggressive (30 хв, не 5 хв)
8. **Social proof everywhere** - рейтинги, користувачі, відгуки
