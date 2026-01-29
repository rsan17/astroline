# Детальний аналіз сайту sub.astroline.today

## Загальна інформація

**URL:** https://sub.astroline.today  
**Назва:** Personalized Astrology Report - Quiz and Personalized prediction - Astroline  
**Опис:** "Get Personalized Powerful Predictions! Complete a 1-minute quiz to get a personalized astrology report."  
**Тип:** Single Page Application (React)  
**Розмір JS бандлу:** ~1.75 MB

---

## Технологічний стек

### Frontend
- **React** - основний фреймворк
- **CSS Modules** - для стилізації (`.style_xxx__hash`)
- **React Modal** - для модальних вікон
- **i18next** - для інтернаціоналізації
- **Framer Motion** або подібне - для анімацій

### Backend інтеграції
- **Firebase** - автентифікація користувачів
  - Project ID: `astroline-web-2-0`
  - Auth Domain: `sub.astroline.today`
  - App ID: `1:613807524683:web:e129a7700398c98400f6ce`
- **Sentry** - моніторинг помилок
- **Google Tag Manager** - аналітика

### Платіжні системи
- **Solidgate** - основний провайдер карткових платежів
- **PayPal** - альтернативний спосіб оплати
- **Apple Pay** - для iOS пристроїв
- **Google Pay** - для Android пристроїв
- **Recurly** - управління підписками

### Зовнішні сервіси
- `mutator.magnus.ms` - A/B тестування та remote config
- `astrology.astroline.app` - API для астрологічних даних
- `astroline.go.link/p` - Adjust лінки для атрибуції

---

## Локалізація

### Підтримувані мови
| Код | Мова |
|-----|------|
| en | English |
| de | German |
| es-ES | Spanish (Spain) |
| es-MX | Spanish (Mexico) |
| fr | French |
| pt-BR | Portuguese (Brazil) |
| pt-PT | Portuguese (Portugal) |
| ja | Japanese |
| ar | Arabic |
| ko | Korean |
| it | Italian |

### Типи контенту для перекладу
- `index.json` - основні переклади
- `index_face_reading.json` - для функції читання обличчя
- `manage.json` - управління акаунтом
- `no_proofread.json` - неперевірені переклади
- Контексти:
  - `astrology_chart.json`
  - `birth_chart.json`
  - `human_design.json`
  - `natal_chart.json`
  - `rising_sign.json`

---

## Структура квізу

### Типи привітальних екранів (Welcome Screens)
```
QUIZ_WELCOME_TAROT_FULLSCREEN
QUIZ_WELCOME_PALM_CONTENT_SCREEN_BG
QUIZ_WELCOME_TAROT_GENDER_FULLSCREEN
QUIZ_WELCOME_MOON
QUIZ_WELCOME_TAROT_CONTENT_SCREEN_BG
QUIZ_WELCOME_TAROT_CONTENT_VIDEO_BG
QUIZ_WELCOME_MAP_GENDER_FULLSCREEN
QUIZ_WELCOME_WITCHES_GENDER_FULLSCREEN
QUIZ_WELCOME_MAP_VIDEO
QUIZ_WELCOME
QUIZ_WELCOME_PALM_UNLOCK
QUIZ_BIRHT_CHART_WELCOME
QUIZ_RISING_SIGN_WELCOME
QUIZ_TAROT_CARDS_WELCOME
QUIZ_NUMEROLOGY_SECRETS_WELCOME
QUIZ_HUMAN_DESIGN_SECRETS_WELCOME
ZODIAC_WHEEL_WELCOME
```

### Степи вибору статі
```
COMMON_GENDER
CHRISTMAS_GENDER
ASTROLOGY_REPORT_GENDER
QUIZ_WELCOME_TAROT_GENDER_FULLSCREEN
QUIZ_WELCOME_MAP_GENDER_FULLSCREEN
QUIZ_WELCOME_WITCHES_GENDER_FULLSCREEN
QUIZ_WELCOME_SOULMATE_GENDER_FULLSCREEN
```

### Основні степи квізу
```
QUIZ_BIRTHDAY - дата народження
QUIZ_BIRTHPLACE - місце народження
QUIZ_BIRTHTIME - час народження
QUIZ_RELATIONSHIP_STATUS - статус відносин
QUIZ_FUTURE_GOALS - цілі на майбутнє
QUIZ_COLORS - вибір кольору
QUIZ_ELEMENT - вибір стихії
QUIZ_EMAIL - введення email
QUIZ_MAILING - підписка на розсилку
QUIZ_SURVEY - опитування
```

### Степи для читання долоні (Palm Reading)
```
QUIZ_PALM_READING - завантаження фото долоні
QUIZ_TRANSITION_PALM_READING_PREPARATION
QUIZ_TRANSITION_HEAD_HEART
QUIZ_TRANSITION_HAND_DARK
QUIZ_TRANSITION_TARO_PALM_READING
QUIZ_TRANSITION_MAP_HAND
QUIZ_TRANSITION_MAP_HAND_WITH_GRANDPA
```

### Степи для астрокартографії
```
QUIZ_ASTROCARTOGRAPHY_WELCOME
QUIZ_ASTROCARTOGRAPHY_INTEREST_PLACES
QUIZ_ASTROCARTOGRAPHY_ENERGY_PLACES
QUIZ_ASTROCARTOGRAPHY_CHALLENGES_PLACES
QUIZ_ASTROCARTOGRAPHY_MAP_LOADER
QUIZ_TRANSITION_ASTROCARTOGRAPHY_LINES
QUIZ_TRANSITION_EXPERTISE_CARTGRAPHY
QUIZ_TRANSITION_STORIES_ASTROCARTOGRAPHY
```

### Степи для Human Design
```
QUIZ_HUMAN_DESIGN_SECRETS_WELCOME
QUIZ_HUMAN_DESIGN_ENERGY_FLOW
QUIZ_HUMAN_DESIGN_ACT_GROUP
QUIZ_HUMAN_DESIGN_USER_CARD
QUIZ_TRANSITION_HUMAN_DESIGN_ANIMATION
QUIZ_TRANSITION_HUMAN_DESIGN_BODY_CENTER
```

### Степи для Soulmate (пошук партнера)
```
QUIZ_WELCOME_SOULMATE_GENDER_FULLSCREEN
QUIZ_SOULMATE_GENDER
QUIZ_SOULMATE_AGE_GROUP
QUIZ_SOULMATE_APPEARANCE
QUIZ_SOULMATE_NOTICE_FIRST
QUIZ_SOULMATE_LEAD_BY
QUIZ_SOULMATE_BIGGEST_STRUGGLE
QUIZ_SOULMATE_KIND_OF_CONNECTION
QUIZ_SOULMATE_DRAWN_TO_ENERGY
QUIZ_SOULMATE_LOVE_SIGNAL
QUIZ_SOULMATE_FEELINGS_IN_RELATIONSHIP
QUIZ_SOULMATE_MAIN_WORRY
QUIZ_SOULMATE_CREATE_FUTURE
QUIZ_TRANSITION_SOULMATE_PORTRAIT_READY
```

### Степи для Moon (місячний цикл)
```
QUIZ_WELCOME_MOON
QUIZ_MOON_NOTICE_PARTNER
QUIZ_MOON_MATTERS_MOST
QUIZ_MOON_LACK_PAST
QUIZ_MOON_TIME_APART
QUIZ_MOON_PARTNER_COMPATIBILITY
QUIZ_MOON_PARTNER_GENDER
QUIZ_MOON_PARTNER_ANY_INFORMATION
QUIZ_MOON_PARTNER_RECALL_WHEN_MET
QUIZ_MOON_PARTNER_MAKE_IMPRESSION
QUIZ_MOON_PARTNER_SPENT_FREE_TIME
QUIZ_MOON_PARTNER_CLOTHING_STYLE
QUIZ_MOON_PARTNER_BEHAVE_IN_GROUP
QUIZ_MOON_PARTNER_SOCIAL_MEDIA
QUIZ_TRANSITION_MOON_PHASE
QUIZ_TRANSITION_MOON_PHASE_PARTNER
QUIZ_TRANSITION_MOON_ZODIAC
QUIZ_TRANSITION_USER_MOON_PHASE
QUIZ_TRANSITION_PARTNER_MOON_PHASE
```

### Степи для Witch Type
```
QUIZ_WELCOME_WITCHES_GENDER_FULLSCREEN
QUIZ_WITCHES_WHERE_MOST_COMFORTABLE
QUIZ_WITCHES_WHEN_BIGGEST_SHIFTS
QUIZ_WITCH_TYPE_FEEL
QUIZ_WITCH_TYPE_DRAWS
QUIZ_WITCH_MAGICAL_TOOL
QUIZ_WITCHES_TRANSITION_BIRTH_CHART
QUIZ_TRANSITION_WITCH_POTENTIAL
QUIZ_TRANSITION_WITCH_POWER_CHANNELS
```

### Транзишн степи (анімаційні переходи)
```
QUIZ_MAGIC
QUIZ_REPORT_LOADER
QUIZ_TRANSITION_SUN
QUIZ_TRANSITION_ASCENDANT
QUIZ_TRANSITION_HOROSCOPE
QUIZ_TRANSITION_BIRTH_CHART
QUIZ_TRANSITION_LOADER_ANIMATION
QUIZ_TRANSITION_FINAL_TOUCHES
QUIZ_TRANSITION_CARDS_SAY
QUIZ_TRANSITION_ANIMATION_TAROT
QUIZ_TRANSITION_BIRTH_CHART_ANIMATION
QUIZ_TRANSITION_BUBBLE
QUIZ_BUBBLE_PREPARING_TRANSITION
QUIZ_TRANSITION_USER_CARD
QUIZ_TRANSITION_PARTNER_CARD
QUIZ_TRANSITION_PLANETS
QUIZ_TRANSITION_PLANETS_HOUSES
QUIZ_TRANSITION_ELEMENTS
QUIZ_TRANSITION_ASC
```

---

## Дані користувача

### Gender (Стать)
```javascript
const GENDERS = [
  'FEMALE',    // Жіноча
  'MALE',      // Чоловіча
  'NON_BINARY' // Небінарна
];
```

### Relationship Status (Статус відносин)
```javascript
const RELATIONSHIP_STATUS = [
  'SOULMATE',   // Споріднена душа
  'ENGAGED',    // Заручені
  'MARRIED',    // Одружені
  'DIFFICULT',  // Складні відносини
  'SINGLE'      // Неодружені
];
```

### Palm Lines (Лінії долоні)
```javascript
const PALM_LINES = {
  LOVE: 'love',  // Лінія кохання - #F27067
  HEAD: 'head',  // Лінія голови - #F9D05D
  LIFE: 'life',  // Лінія життя - #19CEBB
  FATE: 'fate'   // Лінія долі - #C583FA
};
```

### Profile API
```javascript
// PUT /profile
{
  name: string,           // Ім'я користувача
  gender: 0|1|2,          // Індекс статі
  marital_status: 0-4,    // Індекс статусу відносин
  birthdate: 'YYYY-MM-DD',// Дата народження
  birthtime: number,      // Час у хвилинах від опівночі
  birth_place: string,    // Місце народження
  lat: number,            // Широта
  lon: number,            // Довгота
  lang: string,           // Мова
  email: string,          // Email
  is_unsubscriber: 0|1    // Чи відписаний від розсилки
}
```

---

## Продукти та підписки

### Типи продуктів
```javascript
const PRODUCTS = {
  COMPATIBILITY: 'COMPATIBILITY',
  BIRTH_CHART: 'BIRTH_CHART',
  ASTROCARTOGRAPHY: 'ASTROCARTOGRAPHY',
  PALM_READING: 'PALM_READING',
  WITCH_TYPE: 'WITCH_TYPE',
  MOON: 'MOON',
  HOROSCOPE: 'HOROSCOPE',
  GUIDES: 'GUIDES',
  ASTROLOGERS_SINGLE_PACK: 'ASTROLOGERS_SINGLE_PACK',
  COMPLEX_PACK: 'COMPLEX_PACK'
};
```

### Назви продуктів (англійською)
- Advisors Consultation
- Birth Chart Report
- Birth Chart Hardcover Book
- Compatibility Report
- Compatibility Report + Birth Chart Report
- Astrocartography Report
- Palm Reading
- Styling Guide
- Styling Tips
- Color Type Report
- Secondary Subscription
- Subscription

### Сторінки підписки
```javascript
const SUBSCRIPTION_PAGES = {
  '/subscription/presummary':     'PRESUMMARY',
  '/subscription/main':           'MAIN',
  '/subscription/success':        'SUCCESS',
  '/subscription/create_account': 'CREATE_ACCOUNT',
  '/subscription/improve-reports-compatibility':    'COMPATIBILITY',
  '/subscription/improve-reports-birth-chart':      'BIRTH_CHART',
  '/subscription/improve-reports-palm-reading':     'PALM_READING',
  '/subscription/improve-reports-astrocartography': 'ASTROCARTOGRAPHY',
  '/subscription/improve-reports-witch-type':       'WITCH_TYPE',
  '/subscription/improve-reports-moon':             'MOON',
  '/subscription/improve-reports-horoscope':        'HOROSCOPE',
  '/subscription/guides':                           'GUIDES',
  '/subscription/single-pack-offer':                'ASTROLOGERS_SINGLE_PACK',
  '/subscription/astrologer-minutes-sub':           'ASTROLOGERS_MINUTES_SUB',
  '/subscription/astrologer-minutes-sub-plans':     'ASTROLOGERS_MINUTES_SUB_PLANS',
  '/subscription/complex_pack':                     'COMPLEX_PACK'
};
```

---

## Кольорова схема

### Основна тема (Light)
```css
:root {
  --loader-color: #142b35;
  --loader-bg-color: #142933;      /* Темно-синій фон */
  --loader-text-color: #faf6e8;    /* Кремовий текст */
  --loader-circle-color: #16786c; /* Бірюзовий */
}
```

### Темна тема
```css
.theme-dark {
  --backgroundBlockColor: #111827;
  --loader-bg-color: #111827;
  --loader-text-color: #f4f8ff;
  --loader-circle-color: #5671ff;  /* Синій */
}
```

### Кольори ліній долоні
| Лінія | Light Mode | Dark Mode |
|-------|------------|-----------|
| Love | #F27067 | #FF406E |
| Head | #F9D05D | #FFE141 |
| Life | #19CEBB / #14D5C2 | #50E7B4 |
| Fate | #C583FA | #B67BFF |

### Текстові кольори
- Title H1: `#f2e6c4` (золотистий)
- Title H2: `#f2e6c4`
- Title H3: `#d0b894` (темніший золотистий)
- Title H4: `#2d2d2d` (темно-сірий)
- Primary text: `#faf6e8` (кремовий)
- Sidebar text: `#faf6e8`
- Dark background: `#1e3b48`

### Кнопки
```css
--buttonBackground: #27baa7;        /* Бірюзовий */
--buttonBorderRadius: 50px;
--buttonMinHeight: 55px;
--buttonFontFamily: Philosopher, sans-serif;
--buttonFontSize: 1.375rem;
--buttonTitleColor: #fff;
```

### Інпути
```css
--inputCaretColor: #16786c;
--inputBorder: #14d5c2;
--inputBgColor: transparent;
```

---

## Типографіка

### Шрифти
1. **Philosopher** (400, 700) - заголовки
2. **Open Sans** (400, 500, 600, 700) - основний текст
3. **Crimson Pro** (600, 700) - акцентний текст

### Розміри шрифтів (Design System)
```css
--typography-font_size-h_extra_large: 52px;
--typography-font_size-h_large_plus: 40px;
--typography-font_size-h_large: 36px;
--typography-font_size-h1: 28px;
--typography-font_size-h2: 24px;
--typography-font_size-h3: 22px;
--typography-font_size-h4: 20px;
--typography-font_size-h5: 18px;
--typography-font_size-h6: 16px;
--typography-font_size-h7: 14px;
--typography-font_size-body_hyper: 24px;
--typography-font_size-body_l: 20px;
--typography-font_size-body_m: 18px;
--typography-font_size-body_s: 16px;
--typography-font_size-caption_l: 14px;
--typography-font_size-caption_m: 12px;
--typography-font_size-caption_s: 10px;
--typography-font_size-caption_xxs: 8px;
```

---

## API Endpoints

### Основні ендпоінти
```
POST /goals/save          - Зберегти цілі користувача
PUT  /profile             - Оновити профіль
POST /profile/set-profile-params - Встановити параметри профілю
POST /auth/firebase/create - Створити Firebase акаунт
POST /auth/firebase/auth   - Авторизація через Firebase
POST /accrue-time          - Нарахувати час (для консультацій)
```

### Зовнішні URL
- Support: `https://help.astroline.today`
- Support Email: `astroline.app@support-team.app`
- App Link: `https://app.astroline.today/`
- Adjust: `https://astroline.go.link/p`

---

## Особливі функції

### Face Reading (Читання обличчя)
```
QUIZ_FACE_READING
QUIZ_TRANSITION_MAP_FACE_TO_HAND
QUIZ_TRANSITION_MAP_HAND_TO_FACE
```

### Tarot Cards
```
QUIZ_TAROT
QUIZ_TAROT_CARDS_WELCOME
QUIZ_TAROT_SEPARATE_CARDS_TRANS
QUIZ_TAROT_CARDS_TOGETHER_TRANS
QUIZ_TRANSITION_ANIMATION_TAROT
QUIZ_TRANSITION_CARDS_SAY
```

### Scratch Card (Скретч-картка)
```
QUIZ_SCRATCH
```

### Stories (Історії)
```
QUIZ_TRANSITION_STORIES_ASTROCARTOGRAPHY
QUIZ_TRANSITION_STORIES_BIRTH_CHART
QUIZ_TRANSITION_STORIES_PALM_READING
QUIZ_TRANSITION_STORIES_PLANETS
```

---

## Рекомендації для інтеграції з поточним проектом

### 1. Структура квізу
Поточний проект має 14 степів, sub.astroline має набагато більше варіацій. Можна додати:
- Human Design степи
- Soulmate пошук
- Witch Type визначення
- Astrocartography

### 2. Локалізація
Додати підтримку більшої кількості мов за прикладом sub.astroline:
- Німецька, Французька, Іспанська
- Японська, Корейська
- Арабська
- Італійська

### 3. Платіжні системи
Інтегрувати додаткові способи оплати:
- Solidgate для карткових платежів
- PayPal
- Apple Pay / Google Pay

### 4. Дизайн
- Використати подібну кольорову схему
- Додати темну тему
- Застосувати шрифти Philosopher + Open Sans
- Реалізувати анімаційні транзишни

### 5. Продукти
Розширити лінійку продуктів:
- Compatibility Report
- Astrocartography Report
- Palm Reading
- Human Design
- Witch Type
