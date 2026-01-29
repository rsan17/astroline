// Numerology calculations for Astroline
// Based on Pythagorean numerology system

import type { NumerologyData } from '@/types/report';

// Master numbers that should not be reduced
const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduce a number to a single digit (1-9) or master number (11, 22, 33)
 */
function reduceToSingleDigit(num: number, preserveMasterNumbers = true): number {
  // Handle master numbers
  if (preserveMasterNumbers && MASTER_NUMBERS.includes(num)) {
    return num;
  }

  // Keep reducing until single digit
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);

    // Check for master number after each reduction
    if (preserveMasterNumbers && MASTER_NUMBERS.includes(num)) {
      return num;
    }
  }

  return num;
}

/**
 * Calculate Life Path Number from birth date
 * The most important number in numerology - represents life purpose
 * 
 * Example: 1990-08-15 → 1+9+9+0+0+8+1+5 = 33 (Master Number)
 */
export function calculateLifePathNumber(birthDate: string): { number: number; isMaster: boolean } {
  // Parse date string (YYYY-MM-DD)
  const digits = birthDate.replace(/-/g, '').split('');
  
  // Sum all digits
  const sum = digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  // Reduce to single digit or master number
  const lifePathNumber = reduceToSingleDigit(sum, true);
  const isMaster = MASTER_NUMBERS.includes(lifePathNumber);

  return { number: lifePathNumber, isMaster };
}

/**
 * Calculate Birthday Number (just the day reduced)
 * Represents natural talents and abilities
 * 
 * Example: 15 → 1+5 = 6
 */
export function calculateBirthdayNumber(birthDate: string): number {
  // Extract day from YYYY-MM-DD format
  const day = parseInt(birthDate.split('-')[2], 10);
  
  // Reduce to single digit (master numbers not typically used for birthday number)
  return reduceToSingleDigit(day, false);
}

/**
 * Calculate Personal Year Number for a given year
 * Shows the theme and energy of that year for the person
 * 
 * Formula: Birth Month + Birth Day + Current Year
 */
export function calculatePersonalYear(birthDate: string, year: number): number {
  const parts = birthDate.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  // Sum: month + day + each digit of year
  const yearDigits = String(year).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  const total = month + day + yearDigits;
  
  return reduceToSingleDigit(total, false);
}

/**
 * Get meaning/interpretation for Life Path Number
 */
export function getLifePathMeaning(number: number, lang: 'uk' | 'en' = 'uk'): string {
  const meanings: Record<number, { uk: string; en: string }> = {
    1: {
      uk: 'Ви — природжений лідер і новатор. Ваш життєвий шлях — прокладати нові шляхи, бути незалежним та надихати інших своєю сміливістю.',
      en: 'You are a natural leader and innovator. Your life path is to pioneer new trails, be independent, and inspire others with your courage.',
    },
    2: {
      uk: 'Ви — дипломат і миротворець. Ваша місія — створювати гармонію, підтримувати інших та використовувати інтуїцію для розуміння людей.',
      en: 'You are a diplomat and peacemaker. Your mission is to create harmony, support others, and use intuition to understand people.',
    },
    3: {
      uk: 'Ви — творча душа і комунікатор. Ваш шлях — самовираження через мистецтво, слово та натхнення інших своїм оптимізмом.',
      en: 'You are a creative soul and communicator. Your path is self-expression through art, words, and inspiring others with your optimism.',
    },
    4: {
      uk: 'Ви — будівничий і організатор. Ваше призначення — створювати стабільні фундаменти, працювати систематично та досягати довгострокових цілей.',
      en: 'You are a builder and organizer. Your purpose is to create stable foundations, work systematically, and achieve long-term goals.',
    },
    5: {
      uk: 'Ви — шукач свободи та пригод. Ваш життєвий шлях — дослідження, адаптація до змін та допомога іншим прийняти різноманітність життя.',
      en: 'You are a freedom seeker and adventurer. Your life path is exploration, adapting to change, and helping others embrace life diversity.',
    },
    6: {
      uk: 'Ви — опікун і цілитель. Ваша місія — турбота про сім\'ю та громаду, створення краси та гармонії в житті інших.',
      en: 'You are a caretaker and healer. Your mission is caring for family and community, creating beauty and harmony in others\' lives.',
    },
    7: {
      uk: 'Ви — шукач істини та мудрості. Ваш шлях — глибокий аналіз, духовний розвиток та розкриття прихованих знань.',
      en: 'You are a seeker of truth and wisdom. Your path is deep analysis, spiritual development, and uncovering hidden knowledge.',
    },
    8: {
      uk: 'Ви — господар матеріального світу. Ваше призначення — досягнення успіху, управління ресурсами та використання влади для добра.',
      en: 'You are a master of the material world. Your purpose is achieving success, managing resources, and using power for good.',
    },
    9: {
      uk: 'Ви — гуманіст і мудрець. Ваш життєвий шлях — служіння людству, завершення циклів та передача мудрості іншим.',
      en: 'You are a humanitarian and sage. Your life path is serving humanity, completing cycles, and passing wisdom to others.',
    },
    11: {
      uk: 'Майстер-число 11: Ви — духовний посланець. Ваша місія — надихати та просвітлювати, використовуючи потужну інтуїцію та творчий геній.',
      en: 'Master Number 11: You are a spiritual messenger. Your mission is to inspire and enlighten, using powerful intuition and creative genius.',
    },
    22: {
      uk: 'Майстер-число 22: Ви — майстер-будівничий. Ваше призначення — втілювати великі мрії в реальність та створювати щось значуще для людства.',
      en: 'Master Number 22: You are a master builder. Your purpose is to turn big dreams into reality and create something significant for humanity.',
    },
    33: {
      uk: 'Майстер-число 33: Ви — майстер-вчитель. Ваша місія — піднімати свідомість людства через безумовну любов та служіння.',
      en: 'Master Number 33: You are a master teacher. Your mission is to raise human consciousness through unconditional love and service.',
    },
  };

  return meanings[number]?.[lang] || meanings[number]?.uk || 'Унікальний шлях самопізнання та розвитку.';
}

/**
 * Get meaning for Birthday Number
 */
export function getBirthdayMeaning(number: number, lang: 'uk' | 'en' = 'uk'): string {
  const meanings: Record<number, { uk: string; en: string }> = {
    1: {
      uk: 'Ви народжені бути першим. Природна ініціативність, оригінальність мислення та здатність починати нові справи.',
      en: 'You are born to be first. Natural initiative, original thinking, and the ability to start new things.',
    },
    2: {
      uk: 'Ви народжені для партнерства. Тактовність, дипломатичність та вміння бачити обидві сторони ситуації.',
      en: 'You are born for partnership. Tactfulness, diplomacy, and the ability to see both sides of a situation.',
    },
    3: {
      uk: 'Ви народжені творити. Артистичність, оптимізм та природний дар комунікації й самовираження.',
      en: 'You are born to create. Artistry, optimism, and a natural gift for communication and self-expression.',
    },
    4: {
      uk: 'Ви народжені будувати. Практичність, організованість та здатність створювати надійні структури.',
      en: 'You are born to build. Practicality, organization, and the ability to create reliable structures.',
    },
    5: {
      uk: 'Ви народжені для свободи. Адаптивність, цікавість та природна любов до різноманітності й пригод.',
      en: 'You are born for freedom. Adaptability, curiosity, and a natural love for variety and adventure.',
    },
    6: {
      uk: 'Ви народжені опікуватись. Відповідальність, любов до краси та природний талант до гармонізації.',
      en: 'You are born to care. Responsibility, love of beauty, and a natural talent for harmonizing.',
    },
    7: {
      uk: 'Ви народжені досліджувати. Аналітичність, інтуїція та глибокий інтерес до таємниць життя.',
      en: 'You are born to investigate. Analytical nature, intuition, and deep interest in life\'s mysteries.',
    },
    8: {
      uk: 'Ви народжені для успіху. Амбітність, діловий інстинкт та здатність керувати і досягати.',
      en: 'You are born for success. Ambition, business instinct, and the ability to lead and achieve.',
    },
    9: {
      uk: 'Ви народжені служити. Співчутливість, широта поглядів та природний потяг допомагати іншим.',
      en: 'You are born to serve. Compassion, broad-mindedness, and a natural urge to help others.',
    },
  };

  return meanings[number]?.[lang] || meanings[number]?.uk || 'Унікальні природні таланти та здібності.';
}

/**
 * Get meaning for Personal Year
 */
export function getPersonalYearMeaning(number: number, lang: 'uk' | 'en' = 'uk'): string {
  const meanings: Record<number, { uk: string; en: string }> = {
    1: {
      uk: '2026 — рік нових початків. Час ставити нові цілі, починати проекти та проявляти ініціативу.',
      en: '2026 is a year of new beginnings. Time to set new goals, start projects, and take initiative.',
    },
    2: {
      uk: '2026 — рік партнерства. Зосередьтесь на стосунках, співпраці та терплячому очікуванні результатів.',
      en: '2026 is a year of partnership. Focus on relationships, cooperation, and patient waiting for results.',
    },
    3: {
      uk: '2026 — рік самовираження. Творчість, спілкування та радість життя будуть у центрі уваги.',
      en: '2026 is a year of self-expression. Creativity, communication, and joy of life will be in focus.',
    },
    4: {
      uk: '2026 — рік фундаменту. Час для важкої роботи, організації та створення стабільної бази.',
      en: '2026 is a year of foundation. Time for hard work, organization, and creating a stable base.',
    },
    5: {
      uk: '2026 — рік змін. Очікуйте несподіванок, подорожей та нових досвідів. Будьте гнучкими.',
      en: '2026 is a year of change. Expect surprises, travel, and new experiences. Be flexible.',
    },
    6: {
      uk: '2026 — рік відповідальності. Сім\'я, дім та турбота про близьких будуть пріоритетом.',
      en: '2026 is a year of responsibility. Family, home, and caring for loved ones will be a priority.',
    },
    7: {
      uk: '2026 — рік рефлексії. Час для самоаналізу, навчання та духовного розвитку.',
      en: '2026 is a year of reflection. Time for self-analysis, learning, and spiritual development.',
    },
    8: {
      uk: '2026 — рік досягнень. Фокус на кар\'єрі, фінансах та матеріальному успіху.',
      en: '2026 is a year of achievement. Focus on career, finances, and material success.',
    },
    9: {
      uk: '2026 — рік завершення. Час відпустити старе, завершити цикли та підготуватись до нового.',
      en: '2026 is a year of completion. Time to let go of the old, complete cycles, and prepare for new.',
    },
  };

  return meanings[number]?.[lang] || meanings[number]?.uk || 'Рік особистого зростання та нових можливостей.';
}

/**
 * Calculate all numerology data from birth date
 */
export function calculateNumerology(birthDate: string, lang: 'uk' | 'en' = 'uk'): NumerologyData {
  const { number: lifePathNumber, isMaster } = calculateLifePathNumber(birthDate);
  const birthdayNumber = calculateBirthdayNumber(birthDate);
  const personalYear2026 = calculatePersonalYear(birthDate, 2026);

  return {
    lifePathNumber,
    lifePathMeaning: getLifePathMeaning(lifePathNumber, lang),
    birthdayNumber,
    birthdayMeaning: getBirthdayMeaning(birthdayNumber, lang),
    isMasterNumber: isMaster,
    personalYear2026,
    personalYearMeaning: getPersonalYearMeaning(personalYear2026, lang),
  };
}
