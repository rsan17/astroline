// Report Types for Astroline

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: string;
}

export interface NatalChart {
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  risingSign: ZodiacSign;
  sunDescription: string;
  moonDescription: string;
  risingDescription: string;
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
  days: string[];
  colors: string[];
  gems: string[];
  direction: string;
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
  personality: PersonalityTrait[];
  forecast2026: QuarterlyForecast[];
  love: LoveSection;
  career: CareerSection;
  palmReading?: PalmReading;
  lucky: LuckyAttributes;
  isPaid: boolean;
}

