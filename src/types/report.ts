// Report Types for Astroline

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: string;
}

// Unknown sign placeholder for when birth time/place not provided
export interface UnknownSign {
  isUnknown: true;
  reason: 'no_birth_time' | 'no_birth_place';
}

export interface NatalChart {
  sunSign: ZodiacSign;
  moonSign: ZodiacSign | UnknownSign;
  risingSign: ZodiacSign | UnknownSign;
  sunDescription: string;
  moonDescription: string | null;
  risingDescription: string | null;
}

// Numerology types
export interface NumerologyData {
  lifePathNumber: number;
  lifePathMeaning: string;
  birthdayNumber: number;
  birthdayMeaning: string;
  isMasterNumber: boolean;
  personalYear2026: number;
  personalYearMeaning: string;
}

export interface PersonalityTrait {
  title: string;
  description: string;
  strength: number; // 1-100
  icon: string;
}

export interface QuarterlyForecast {
  quarter: string;
  title: string;
  description: string;
  focus: string[];
  luckyDays: string[];
}

export interface Compatibility {
  sign: string;
  symbol: string;
  percentage: number;
  description: string;
}

export interface LoveSection {
  overview: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  topMatches: Compatibility[];
}

export interface CareerSection {
  overview: string;
  strengths: string[];
  idealCareers: string[];
  financeTips: string[];
  yearFocus: string;
}

export interface PalmReading {
  childrenCount: string;
  marriagesCount: string;
  bigChanges: boolean;
  wealthIndicator: string;
  lifeLineInterpretation: string;
  heartLineInterpretation: string;
  headLineInterpretation: string;
}

export interface LuckyAttributes {
  numbers: number[];
  numbersExplanation?: string;
  days: string[];
  daysExplanation?: string;
  colors: string[];
  colorsExplanation?: string;
  gems: string[];
  gemsExplanation?: string;
  direction: string;
  directionExplanation?: string;
}

export interface FullReport {
  id: string;
  createdAt: string;
  userData: {
    email: string;
    gender: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
  };
  natalChart: NatalChart;
  numerology?: NumerologyData;
  personality: PersonalityTrait[];
  forecast2026: QuarterlyForecast[];
  love: LoveSection;
  career: CareerSection;
  palmReading?: PalmReading;
  lucky: LuckyAttributes;
  isPaid: boolean;
}

// Helper type guard to check if sign is unknown
export function isUnknownSign(sign: ZodiacSign | UnknownSign): sign is UnknownSign {
  return 'isUnknown' in sign && sign.isUnknown === true;
}