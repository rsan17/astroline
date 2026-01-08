// Zodiac Constants for Astroline SEO Pages

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';
export type ZodiacModality = 'cardinal' | 'fixed' | 'mutable';
export type HoroscopePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ZodiacSignData {
  slug: string;
  nameUk: string;
  nameUkGenitive: string; // для "Гороскоп для Овна"
  symbol: string;
  element: ZodiacElement;
  modality: ZodiacModality;
  rulingPlanet: string;
  rulingPlanetUk: string;
  dates: string;
  dateRange: { start: string; end: string };
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatibleSigns: string[];
  incompatibleSigns: string[];
}

export const ZODIAC_SIGNS: ZodiacSignData[] = [
  {
    slug: 'oven',
    nameUk: 'Овен',
    nameUkGenitive: 'Овна',
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    rulingPlanet: 'Mars',
    rulingPlanetUk: 'Марс',
    dates: '21 березня - 19 квітня',
    dateRange: { start: '03-21', end: '04-19' },
    description: 'Овен — перший знак зодіаку, символ нових початків та необмеженої енергії. Люди, народжені під цим знаком, відзначаються сміливістю, рішучістю та природним лідерством. Вони завжди готові приймати виклики та вести за собою інших.',
    traits: ['Енергійний', 'Сміливий', 'Незалежний', 'Імпульсивний', 'Конкурентний'],
    strengths: ['Лідерські якості', 'Ентузіазм', 'Чесність', 'Відвага', 'Оптимізм'],
    weaknesses: ['Нетерплячість', 'Імпульсивність', 'Егоїзм', 'Агресивність'],
    compatibleSigns: ['lev', 'strelets', 'blyzneta', 'vodoliy'],
    incompatibleSigns: ['rak', 'kozerig', 'terezi'],
  },
  {
    slug: 'telets',
    nameUk: 'Телець',
    nameUkGenitive: 'Тельця',
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    rulingPlanet: 'Venus',
    rulingPlanetUk: 'Венера',
    dates: '20 квітня - 20 травня',
    dateRange: { start: '04-20', end: '05-20' },
    description: 'Телець — знак стабільності, надійності та чуттєвої насолоди. Люди цього знаку цінують комфорт, красу та матеріальний добробут. Вони терплячі, наполегливі та здатні досягати своїх цілей завдяки постійній праці.',
    traits: ['Надійний', 'Терплячий', 'Практичний', 'Відданий', 'Чуттєвий'],
    strengths: ['Стабільність', 'Наполегливість', 'Вірність', 'Практичність', 'Художній смак'],
    weaknesses: ['Впертість', 'Матеріалізм', 'Лінь', 'Власницькі інстинкти'],
    compatibleSigns: ['diva', 'kozerig', 'rak', 'ryby'],
    incompatibleSigns: ['lev', 'vodoliy', 'skorpion'],
  },
  {
    slug: 'blyzneta',
    nameUk: 'Близнюки',
    nameUkGenitive: 'Близнюків',
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    rulingPlanetUk: 'Меркурій',
    dates: '21 травня - 20 червня',
    dateRange: { start: '05-21', end: '06-20' },
    description: 'Близнюки — знак комунікації, інтелекту та адаптивності. Представники цього знаку мають живий розум, допитливість та здатність швидко переключатися між різними темами та заняттями.',
    traits: ['Комунікабельний', 'Допитливий', 'Адаптивний', 'Різнобічний', 'Дотепний'],
    strengths: ['Інтелект', 'Красномовність', 'Гнучкість', 'Швидке мислення', 'Товариськість'],
    weaknesses: ['Непостійність', 'Поверховість', 'Нервозність', 'Нерішучість'],
    compatibleSigns: ['terezi', 'vodoliy', 'oven', 'lev'],
    incompatibleSigns: ['diva', 'ryby', 'skorpion'],
  },
  {
    slug: 'rak',
    nameUk: 'Рак',
    nameUkGenitive: 'Рака',
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    rulingPlanet: 'Moon',
    rulingPlanetUk: 'Місяць',
    dates: '21 червня - 22 липня',
    dateRange: { start: '06-21', end: '07-22' },
    description: 'Рак — знак емоційної глибини, сімейних цінностей та інтуїції. Люди цього знаку дуже чутливі, турботливі та віддані своїм близьким. Вони мають сильний захисний інстинкт і цінують домашній затишок.',
    traits: ['Емоційний', 'Турботливий', 'Інтуїтивний', 'Захисний', 'Ностальгійний'],
    strengths: ['Емпатія', 'Вірність', 'Уява', 'Наполегливість', 'Материнські якості'],
    weaknesses: ['Примхливість', 'Надмірна чутливість', 'Песимізм', 'Маніпулятивність'],
    compatibleSigns: ['skorpion', 'ryby', 'telets', 'diva'],
    incompatibleSigns: ['oven', 'terezi', 'kozerig'],
  },
  {
    slug: 'lev',
    nameUk: 'Лев',
    nameUkGenitive: 'Лева',
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    rulingPlanet: 'Sun',
    rulingPlanetUk: 'Сонце',
    dates: '23 липня - 22 серпня',
    dateRange: { start: '07-23', end: '08-22' },
    description: 'Лев — знак творчості, щедрості та природної харизми. Представники цього знаку народжені бути в центрі уваги. Вони впевнені в собі, великодушні та здатні надихати оточуючих своєю енергією.',
    traits: ['Харизматичний', 'Творчий', 'Щедрий', 'Впевнений', 'Амбітний'],
    strengths: ['Лідерство', 'Креативність', 'Щирість', 'Великодушність', 'Оптимізм'],
    weaknesses: ['Гордість', 'Егоцентризм', 'Впертість', 'Потреба в захопленні'],
    compatibleSigns: ['oven', 'strelets', 'blyzneta', 'terezi'],
    incompatibleSigns: ['telets', 'skorpion', 'vodoliy'],
  },
  {
    slug: 'diva',
    nameUk: 'Діва',
    nameUkGenitive: 'Діви',
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    rulingPlanetUk: 'Меркурій',
    dates: '23 серпня - 22 вересня',
    dateRange: { start: '08-23', end: '09-22' },
    description: 'Діва — знак аналітичного мислення, практичності та прагнення до досконалості. Люди цього знаку уважні до деталей, організовані та завжди прагнуть покращити все навколо себе.',
    traits: ['Аналітичний', 'Практичний', 'Організований', 'Скромний', 'Старанний'],
    strengths: ['Увага до деталей', 'Надійність', 'Аналітичність', 'Працелюбність', 'Скромність'],
    weaknesses: ['Критичність', 'Перфекціонізм', 'Тривожність', 'Надмірна скромність'],
    compatibleSigns: ['telets', 'kozerig', 'rak', 'skorpion'],
    incompatibleSigns: ['blyzneta', 'strelets', 'ryby'],
  },
  {
    slug: 'terezi',
    nameUk: 'Терези',
    nameUkGenitive: 'Терезів',
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    rulingPlanet: 'Venus',
    rulingPlanetUk: 'Венера',
    dates: '23 вересня - 22 жовтня',
    dateRange: { start: '09-23', end: '10-22' },
    description: 'Терези — знак гармонії, справедливості та естетичної краси. Представники цього знаку прагнуть балансу у всьому, цінують партнерство та мають природний талант у дипломатії.',
    traits: ['Дипломатичний', 'Справедливий', 'Соціальний', 'Естетичний', 'Романтичний'],
    strengths: ['Дипломатичність', 'Справедливість', 'Шарм', 'Естетичний смак', 'Кооперативність'],
    weaknesses: ['Нерішучість', 'Уникання конфліктів', 'Залежність від інших', 'Поверховість'],
    compatibleSigns: ['blyzneta', 'vodoliy', 'lev', 'strelets'],
    incompatibleSigns: ['rak', 'kozerig', 'oven'],
  },
  {
    slug: 'skorpion',
    nameUk: 'Скорпіон',
    nameUkGenitive: 'Скорпіона',
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    rulingPlanet: 'Pluto',
    rulingPlanetUk: 'Плутон',
    dates: '23 жовтня - 21 листопада',
    dateRange: { start: '10-23', end: '11-21' },
    description: 'Скорпіон — знак глибини, пристрасті та трансформації. Люди цього знаку інтенсивні, таємничі та мають надзвичайну здатність до відродження. Вони проникають у суть речей і не бояться темних сторін життя.',
    traits: ['Інтенсивний', 'Пристрасний', 'Таємничий', 'Рішучий', 'Лояльний'],
    strengths: ['Рішучість', 'Сміливість', 'Вірність', 'Ресурсність', 'Інтуїція'],
    weaknesses: ['Ревнощі', 'Скритність', 'Мстивість', 'Підозрілість'],
    compatibleSigns: ['rak', 'ryby', 'diva', 'kozerig'],
    incompatibleSigns: ['lev', 'vodoliy', 'telets', 'blyzneta'],
  },
  {
    slug: 'strelets',
    nameUk: 'Стрілець',
    nameUkGenitive: 'Стрільця',
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    rulingPlanet: 'Jupiter',
    rulingPlanetUk: 'Юпітер',
    dates: '22 листопада - 21 грудня',
    dateRange: { start: '11-22', end: '12-21' },
    description: 'Стрілець — знак пригод, філософії та розширення горизонтів. Представники цього знаку оптимістичні, вільнолюбні та постійно прагнуть нових знань і вражень. Вони щирі та мають великий ентузіазм до життя.',
    traits: ['Оптимістичний', 'Авантюрний', 'Філософський', 'Щирий', 'Незалежний'],
    strengths: ['Оптимізм', 'Чесність', 'Щедрість', 'Ентузіазм', 'Відкритість'],
    weaknesses: ['Безтактність', 'Нетерплячість', 'Безвідповідальність', 'Надмірний оптимізм'],
    compatibleSigns: ['oven', 'lev', 'terezi', 'vodoliy'],
    incompatibleSigns: ['diva', 'ryby', 'blyzneta'],
  },
  {
    slug: 'kozerig',
    nameUk: 'Козеріг',
    nameUkGenitive: 'Козерога',
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    rulingPlanet: 'Saturn',
    rulingPlanetUk: 'Сатурн',
    dates: '22 грудня - 19 січня',
    dateRange: { start: '12-22', end: '01-19' },
    description: 'Козеріг — знак амбіцій, дисципліни та довгострокового планування. Люди цього знаку серйозні, відповідальні та здатні досягати найвищих вершин завдяки наполегливій праці та терпінню.',
    traits: ['Амбітний', 'Дисциплінований', 'Відповідальний', 'Практичний', 'Терплячий'],
    strengths: ['Амбіційність', 'Дисципліна', 'Відповідальність', 'Організованість', 'Терплячість'],
    weaknesses: ['Песимізм', 'Впертість', 'Холодність', 'Надмірна серйозність'],
    compatibleSigns: ['telets', 'diva', 'skorpion', 'ryby'],
    incompatibleSigns: ['oven', 'rak', 'terezi'],
  },
  {
    slug: 'vodoliy',
    nameUk: 'Водолій',
    nameUkGenitive: 'Водолія',
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    rulingPlanet: 'Uranus',
    rulingPlanetUk: 'Уран',
    dates: '20 січня - 18 лютого',
    dateRange: { start: '01-20', end: '02-18' },
    description: 'Водолій — знак інновацій, незалежності та гуманізму. Представники цього знаку оригінальні, прогресивні та завжди випереджають свій час. Вони цінують свободу та мають сильні ідеали.',
    traits: ['Оригінальний', 'Незалежний', 'Гуманітарний', 'Інтелектуальний', 'Ексцентричний'],
    strengths: ['Оригінальність', 'Незалежність', 'Інтелект', 'Прогресивність', 'Ідеалізм'],
    weaknesses: ['Відстороненість', 'Впертість', 'Непередбачуваність', 'Екстремізм'],
    compatibleSigns: ['blyzneta', 'terezi', 'oven', 'strelets'],
    incompatibleSigns: ['telets', 'skorpion', 'lev'],
  },
  {
    slug: 'ryby',
    nameUk: 'Риби',
    nameUkGenitive: 'Риб',
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    rulingPlanet: 'Neptune',
    rulingPlanetUk: 'Нептун',
    dates: '19 лютого - 20 березня',
    dateRange: { start: '02-19', end: '03-20' },
    description: 'Риби — знак інтуїції, творчості та духовності. Люди цього знаку надзвичайно чутливі, емпатійні та мають багату уяву. Вони здатні глибоко відчувати емоції інших і часто мають художні таланти.',
    traits: ['Інтуїтивний', 'Творчий', 'Чутливий', 'Мрійливий', 'Співчутливий'],
    strengths: ['Інтуїція', 'Творчість', 'Емпатія', 'Духовність', 'Адаптивність'],
    weaknesses: ['Втеча від реальності', 'Надмірна чутливість', 'Невизначеність', 'Жертовність'],
    compatibleSigns: ['rak', 'skorpion', 'telets', 'kozerig'],
    incompatibleSigns: ['blyzneta', 'diva', 'strelets'],
  },
];

export const HOROSCOPE_PERIODS: { slug: HoroscopePeriod; nameUk: string; descriptionUk: string }[] = [
  {
    slug: 'daily',
    nameUk: 'на сьогодні',
    descriptionUk: 'Щоденний гороскоп з прогнозом на день',
  },
  {
    slug: 'weekly',
    nameUk: 'на тиждень',
    descriptionUk: 'Тижневий гороскоп з детальним прогнозом',
  },
  {
    slug: 'monthly',
    nameUk: 'на місяць',
    descriptionUk: 'Місячний гороскоп з важливими датами',
  },
  {
    slug: 'yearly',
    nameUk: 'на 2026 рік',
    descriptionUk: 'Річний гороскоп з прогнозом на весь рік',
  },
];

export const ELEMENTS: Record<ZodiacElement, { nameUk: string; description: string; signs: string[] }> = {
  fire: {
    nameUk: 'Вогонь',
    description: 'Знаки вогню відзначаються пристрастю, енергією та ентузіазмом. Вони імпульсивні, сміливі та завжди готові до дій.',
    signs: ['oven', 'lev', 'strelets'],
  },
  earth: {
    nameUk: 'Земля',
    description: 'Земні знаки практичні, надійні та стабільні. Вони цінують матеріальний комфорт і мають твердий погляд на життя.',
    signs: ['telets', 'diva', 'kozerig'],
  },
  air: {
    nameUk: 'Повітря',
    description: 'Повітряні знаки інтелектуальні, комунікабельні та соціальні. Вони люблять ідеї, спілкування та нові знайомства.',
    signs: ['blyzneta', 'terezi', 'vodoliy'],
  },
  water: {
    nameUk: 'Вода',
    description: 'Водні знаки емоційні, інтуїтивні та глибокі. Вони мають сильну емпатію та багатий внутрішній світ.',
    signs: ['rak', 'skorpion', 'ryby'],
  },
};

export const MODALITIES: Record<ZodiacModality, { nameUk: string; description: string }> = {
  cardinal: {
    nameUk: 'Кардинальний',
    description: 'Кардинальні знаки — ініціатори та лідери. Вони починають нові проєкти та ведуть за собою інших.',
  },
  fixed: {
    nameUk: 'Фіксований',
    description: 'Фіксовані знаки стабільні та наполегливі. Вони підтримують та розвивають почате.',
  },
  mutable: {
    nameUk: 'Мутабельний',
    description: 'Мутабельні знаки адаптивні та гнучкі. Вони легко пристосовуються до змін.',
  },
};

// Helper functions
export function getZodiacBySlug(slug: string): ZodiacSignData | undefined {
  return ZODIAC_SIGNS.find((sign) => sign.slug === slug);
}

export function getPeriodBySlug(slug: string): (typeof HOROSCOPE_PERIODS)[number] | undefined {
  return HOROSCOPE_PERIODS.find((period) => period.slug === slug);
}

export function getAllZodiacSlugs(): string[] {
  return ZODIAC_SIGNS.map((sign) => sign.slug);
}

export function getAllPeriodSlugs(): HoroscopePeriod[] {
  return HOROSCOPE_PERIODS.map((period) => period.slug);
}

export function getCompatibilityPercentage(sign1Slug: string, sign2Slug: string): number {
  const sign1 = getZodiacBySlug(sign1Slug);
  const sign2 = getZodiacBySlug(sign2Slug);

  if (!sign1 || !sign2) return 50;

  // Same sign
  if (sign1Slug === sign2Slug) return 75;

  // Compatible signs
  if (sign1.compatibleSigns.includes(sign2Slug)) return 85 + Math.floor(Math.random() * 10);

  // Incompatible signs
  if (sign1.incompatibleSigns.includes(sign2Slug)) return 35 + Math.floor(Math.random() * 15);

  // Same element
  if (sign1.element === sign2.element) return 70 + Math.floor(Math.random() * 10);

  // Default
  return 50 + Math.floor(Math.random() * 20);
}
