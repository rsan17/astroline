// Report Types for Astroline
// Extended types for comprehensive PDF report generation

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

// Extended natal chart with multi-paragraph descriptions
export interface NatalChart {
  sunSign: ZodiacSign;
  moonSign: ZodiacSign | UnknownSign;
  risingSign: ZodiacSign | UnknownSign;
  // Extended descriptions - array of paragraphs for detailed content
  sunDescription: string;
  sunDescriptionExtended?: string[]; // Additional paragraphs for PDF
  moonDescription: string | null;
  moonDescriptionExtended?: string[]; // Additional paragraphs for PDF
  risingDescription: string | null;
  risingDescriptionExtended?: string[]; // Additional paragraphs for PDF
  // Synergy analysis between signs
  signsSynergy?: string;
}

// Extended numerology with subtitles and detailed meanings
export interface NumerologyData {
  lifePathNumber: number;
  lifePathSubtitle?: string; // e.g., "Будівничий. Організатор. Стратег."
  lifePathMeaning: string;
  lifePathMeaningExtended?: string[]; // Additional paragraphs
  birthdayNumber: number;
  birthdaySubtitle?: string;
  birthdayMeaning: string;
  birthdayMeaningExtended?: string[]; // Additional paragraphs
  isMasterNumber: boolean;
  personalYear2026: number;
  personalYearSubtitle?: string;
  personalYearMeaning: string;
  personalYearMeaningExtended?: string[]; // Additional paragraphs
}

export interface PersonalityTrait {
  title: string;
  description: string;
  strength: number; // 1-100
  icon: string;
}

// Hidden talent with detailed multi-paragraph description
export interface HiddenTalent {
  title: string;
  description: string;
  extendedDescription?: string; // Second paragraph for PDF
}

// Extended quarterly forecast with structured sections
export interface QuarterlyForecast {
  quarter: string;
  title: string;
  description: string;
  focus: string[];
  luckyDays: string[];
  // Structured forecast by area (for PDF)
  careerForecast?: string;
  financeForecast?: string;
  relationshipsForecast?: string;
  advice?: string;
  warning?: string;
}

// Extended compatibility with explanation
export interface Compatibility {
  sign: string;
  symbol: string;
  percentage: number;
  description: string;
  // Why this match works - detailed explanation for PDF
  whyItWorks?: string;
}

// Extended love section with detailed content
export interface LoveSection {
  overview: string;
  overviewExtended?: string; // Second paragraph
  strengths: string[];
  strengthsDetailed?: Array<{title: string; description: string}>; // Detailed version for PDF
  challenges: string[];
  challengesDetailed?: Array<{title: string; description: string}>; // Detailed version for PDF
  advice: string;
  adviceItems?: Array<{title: string; description: string}>; // Structured advice for PDF
  idealPartnerTraits?: string[];
  bestMonthsForLove?: string[];
  redFlags?: string[];
  topMatches: Compatibility[];
}

// Extended career section with financial strategies
export interface CareerSection {
  overview: string;
  strengths: string[];
  strengthsDetailed?: Array<{title: string; description: string}>; // Detailed version for PDF
  idealCareers: string[];
  idealCareersDetailed?: Array<{title: string; description: string}>; // With explanations
  financeTips: string[];
  financeTipsDetailed?: Array<{title: string; description: string}>; // Detailed strategies
  yearFocus: string;
  yearFocusItems?: Array<{title: string; description: string}>; // Structured focus items
  opportunities2026?: string;
  warningPeriods?: string[];
  actionSteps?: string[];
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
  hiddenTalents?: HiddenTalent[]; // Separate hidden talents section
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
