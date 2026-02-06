// AI-powered astrology report generation with Groq (primary) and Gemini (fallback)
// Extended for comprehensive PDF report generation

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { buildAstroReportPrompt, type UserDataForPrompt, type ZodiacVerificationResult } from './prompts';
import { generateReport as generateStaticReport, zodiacSigns } from '../report-data';
import { ZODIAC_SIGNS } from '../constants/zodiac';
import type { FullReport, HiddenTalent } from '@/types/report';

// Create Groq client using OpenAI-compatible API
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});


// Astrological properties verification result
interface AstrologicalPropertiesResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Verify zodiac sign from birth date
 * Calculates the correct sun sign based on exact date ranges
 * Handles year boundaries (e.g., Capricorn: Dec 22 - Jan 19)
 */
function verifyZodiacSignFromDate(birthDate: string, providedSign: string): ZodiacVerificationResult {
  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate)) {
    return {
      isValid: false,
      calculatedSign: providedSign,
      warning: `Invalid date format: ${birthDate}. Expected YYYY-MM-DD format.`,
    };
  }

  const date = new Date(birthDate + 'T00:00:00'); // Use UTC to avoid timezone issues
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Validate date is valid
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      calculatedSign: providedSign,
      warning: `Invalid date: ${birthDate}`,
    };
  }

  // Calculate sign based on exact date ranges
  let calculatedSign = '';

  // Овен (Aries): March 21 - April 19
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    calculatedSign = 'Овен';
  }
  // Телець (Taurus): April 20 - May 20
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    calculatedSign = 'Телець';
  }
  // Близнюки (Gemini): May 21 - June 20
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    calculatedSign = 'Близнюки';
  }
  // Рак (Cancer): June 21 - July 22
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    calculatedSign = 'Рак';
  }
  // Лев (Leo): July 23 - August 22
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    calculatedSign = 'Лев';
  }
  // Діва (Virgo): August 23 - September 22
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    calculatedSign = 'Діва';
  }
  // Терези (Libra): September 23 - October 22
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    calculatedSign = 'Терези';
  }
  // Скорпіон (Scorpio): October 23 - November 21
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    calculatedSign = 'Скорпіон';
  }
  // Стрілець (Sagittarius): November 22 - December 21
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    calculatedSign = 'Стрілець';
  }
  // Козеріг (Capricorn): December 22 - January 19 (year boundary)
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    calculatedSign = 'Козеріг';
  }
  // Водолій (Aquarius): January 20 - February 18
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    calculatedSign = 'Водолій';
  }
  // Риби (Pisces): February 19 - March 20
  else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    calculatedSign = 'Риби';
  }

  // If no sign calculated, something went wrong
  if (!calculatedSign) {
    return {
      isValid: false,
      calculatedSign: providedSign,
      warning: `Could not calculate zodiac sign from date: ${birthDate}`,
    };
  }

  const isValid = calculatedSign === providedSign;

  return {
    isValid,
    calculatedSign,
    warning: isValid
      ? undefined
      : `Birth date ${birthDate} does not match provided sun sign ${providedSign}. Using calculated sign ${calculatedSign}`,
  };
}

/**
 * Verify astrological properties (element, modality, ruling planet) match the sign
 */
function verifyAstrologicalProperties(signName: string): AstrologicalPropertiesResult {
  const errors: string[] = [];

  // Find sign in constants by Ukrainian name
  const sign = ZODIAC_SIGNS.find((s) => s.nameUk === signName);

  if (!sign) {
    return {
      isValid: false,
      errors: [`Sign "${signName}" not found in zodiac constants`],
    };
  }

  // Verify element matches sign
  const expectedElement = sign.element;
  const expectedModality = sign.modality;

  // Get sign data from report-data for comparison
  const reportSign = zodiacSigns[signName];
  if (reportSign) {
    // Map report-data element to constants element
    const elementMap: Record<string, string> = {
      fire: 'fire',
      earth: 'earth',
      air: 'air',
      water: 'water',
    };

    if (elementMap[reportSign.element] !== expectedElement) {
      errors.push(
        `Element mismatch: expected ${expectedElement}, got ${reportSign.element}`
      );
    }

    // Map report-data modality to constants modality
    const modalityMap: Record<string, string> = {
      cardinal: 'cardinal',
      fixed: 'fixed',
      mutable: 'mutable',
    };

    if (modalityMap[reportSign.modality] !== expectedModality) {
      errors.push(
        `Modality mismatch: expected ${expectedModality}, got ${reportSign.modality}`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// AI provider type
export type AIProvider = 'groq' | 'gemini' | 'static';

// Extended AI-generated content structure for comprehensive PDF
interface AIGeneratedContent {
  natalChart: {
    sunDescription: string;
    sunDescriptionExtended?: string[];
    moonDescription: string;
    moonDescriptionExtended?: string[];
    risingDescription: string;
    risingDescriptionExtended?: string[];
    signsSynergy?: string;
  };
  numerology?: {
    lifePathSubtitle?: string;
    lifePathMeaning: string;
    lifePathMeaningExtended?: string[];
    birthdaySubtitle?: string;
    birthdayMeaning: string;
    birthdayMeaningExtended?: string[];
    personalYearSubtitle?: string;
    personalYearMeaning: string;
    personalYearMeaningExtended?: string[];
  };
  personality: {
    traits: Array<{title: string; description: string}>;
    hiddenTalents: Array<{title: string; description: string; extendedDescription?: string}>;
    lifeLesson: string;
  };
  forecast2026: {
    overall: string;
    keyDates?: string[];
    quarters: Array<{
      quarter: string;
      title: string;
      careerForecast?: string;
      financeForecast?: string;
      relationshipsForecast?: string;
      focus: string[];
      advice?: string;
      warning?: string;
    }>;
  };
  love: {
    overview: string;
    overviewExtended?: string;
    strengthsDetailed?: Array<{title: string; description: string}>;
    challengesDetailed?: Array<{title: string; description: string}>;
    adviceItems?: Array<{title: string; description: string}>;
    idealPartnerTraits?: string[];
    bestMonthsForLove?: string[];
    compatibility?: Array<{sign: string; percentage: number; whyItWorks?: string}>;
  };
  career: {
    overview: string;
    strengthsDetailed?: Array<{title: string; description: string}>;
    idealCareersDetailed?: Array<{title: string; description: string}>;
    financeTipsDetailed?: Array<{title: string; description: string}>;
    yearFocusItems?: Array<{title: string; description: string}>;
    opportunities2026?: string;
    warningPeriods?: string[];
    actionSteps?: string[];
  };
  lucky?: {
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
  };
}

// AI generation result with provider tracking
interface AIGenerationResult {
  content: AIGeneratedContent | null;
  provider: AIProvider;
}

// Generate AI content with Groq (primary) or Gemini (fallback)
async function generateAIContent(
  userData: UserDataForPrompt
): Promise<AIGenerationResult> {
  // Validate date format before proceeding
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(userData.birthDate)) {
    console.error(`Invalid birth date format: ${userData.birthDate}. Expected YYYY-MM-DD.`);
    return { content: null, provider: 'static' };
  }

  const prompt = buildAstroReportPrompt(userData);

  // Try Groq first (faster, higher limits)
  if (process.env.GROQ_API_KEY) {
    try {
      const { text } = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt,
        temperature: 0.7,
        maxOutputTokens: 8192,
      });

      const parsed = parseAIResponse(text);
      if (parsed) {
        console.log('✅ Successfully generated AI content with Groq (LLaMA 3.3)');
        return { content: parsed, provider: 'groq' };
      }
      // If parsing failed, try Gemini fallback
      console.warn('⚠️ Groq response parsing failed, trying Gemini fallback');
    } catch (error) {
      console.warn('⚠️ Groq API failed, trying Gemini fallback:', error instanceof Error ? error.message : error);
    }
  }

  // Fallback to Gemini
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const { text } = await generateText({
        model: google('gemini-1.5-flash'),
        prompt,
        temperature: 0.7,
        maxOutputTokens: 8192,
      });

      const parsed = parseAIResponse(text);
      if (parsed) {
        console.log('✅ Successfully generated AI content with Gemini 1.5 Flash');
        return { content: parsed, provider: 'gemini' };
      }
      console.warn('⚠️ Gemini response parsing failed');
    } catch (error) {
      console.warn('⚠️ Gemini API failed:', error instanceof Error ? error.message : error);
    }
  }

  // Both failed, return null to trigger static fallback
  console.error('❌ Both AI models failed or returned invalid responses, using static fallback');
  return { content: null, provider: 'static' };
}

// Parse AI response, handling potential formatting issues
function parseAIResponse(text: string): AIGeneratedContent | null {
  try {
    // Remove potential markdown code blocks
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.slice(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    const parsed = JSON.parse(cleanText);
    
    // Validate required fields for extended format
    const missingFields: string[] = [];
    
    // Check natalChart structure
    if (!parsed.natalChart || typeof parsed.natalChart !== 'object') {
      missingFields.push('natalChart');
    } else {
      if (!parsed.natalChart.sunDescription) missingFields.push('natalChart.sunDescription');
      if (!parsed.natalChart.moonDescription) missingFields.push('natalChart.moonDescription');
      if (!parsed.natalChart.risingDescription) missingFields.push('natalChart.risingDescription');
    }

    // Check personality structure
    if (!parsed.personality || typeof parsed.personality !== 'object') {
      missingFields.push('personality');
    } else {
      if (!Array.isArray(parsed.personality.traits)) missingFields.push('personality.traits');
      if (!Array.isArray(parsed.personality.hiddenTalents)) missingFields.push('personality.hiddenTalents');
    }

    // Check forecast2026 structure
    if (!parsed.forecast2026 || typeof parsed.forecast2026 !== 'object') {
      missingFields.push('forecast2026');
    } else {
      if (!parsed.forecast2026.overall) missingFields.push('forecast2026.overall');
      if (!Array.isArray(parsed.forecast2026.quarters)) missingFields.push('forecast2026.quarters');
    }

    // Check love structure
    if (!parsed.love || typeof parsed.love !== 'object') {
      missingFields.push('love');
    } else {
      if (!parsed.love.overview) missingFields.push('love.overview');
    }

    // Check career structure
    if (!parsed.career || typeof parsed.career !== 'object') {
      missingFields.push('career');
    } else {
      if (!parsed.career.overview) missingFields.push('career.overview');
    }

    if (missingFields.length > 0) {
      console.warn('AI response missing or invalid required fields:', missingFields.join(', '));
      return null;
    }

    return parsed as AIGeneratedContent;
  } catch (error) {
    console.error('Failed to parse AI response:', error instanceof Error ? error.message : error);
    console.error('Raw response (first 500 chars):', text.slice(0, 500));
    return null;
  }
}

// Result type for generateAstroReportWithAI
export interface GenerateReportResult {
  report: FullReport;
  provider: AIProvider;
}

// Main export: Generate full report with AI enhancement
export async function generateAstroReportWithAI(
  reportId: string,
  userData: {
    email: string;
    gender: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
    sunSign: string;
    moonSign?: string;
    risingSign?: string;
    goals?: string[];
    relationshipStatus?: string;
    favoriteColor?: string;
    element?: string;
  },
  palmData?: {
    childrenCount: string;
    marriagesCount: string;
    bigChanges: boolean;
    wealthIndicator: string;
  },
  isPaid: boolean = false,
  lang: 'uk' | 'en' = 'uk'
): Promise<GenerateReportResult> {
  // Step 1: Verify birth date matches zodiac sign (MANDATORY)
  const verificationResult = verifyZodiacSignFromDate(userData.birthDate, userData.sunSign);
  
  // Auto-correct sun sign if mismatch detected
  let correctedSunSign = userData.sunSign;
  if (!verificationResult.isValid && verificationResult.calculatedSign) {
    correctedSunSign = verificationResult.calculatedSign;
    if (verificationResult.warning) {
      console.warn(verificationResult.warning);
    }
  }

  // Step 2: Verify astrological properties
  const propertiesResult = verifyAstrologicalProperties(correctedSunSign);
  if (!propertiesResult.isValid && propertiesResult.errors.length > 0) {
    console.warn(`Astrological properties verification issues for ${correctedSunSign}:`, propertiesResult.errors);
  }

  // Determine if Moon/Rising signs can be calculated
  const hasBirthTime = !!userData.birthTime;
  const hasBirthPlace = !!userData.birthPlace;
  
  // Moon sign requires birth time, Rising requires birth place
  const effectiveMoonSign = hasBirthTime ? (userData.moonSign || null) : null;
  const effectiveRisingSign = hasBirthPlace ? (userData.risingSign || null) : null;

  // Always generate static report as base/fallback (using corrected sign)
  const staticReport = generateStaticReport(
    reportId,
    {
      email: userData.email,
      gender: userData.gender,
      birthDate: userData.birthDate,
      birthTime: userData.birthTime,
      birthPlace: userData.birthPlace,
      sunSign: correctedSunSign, // Use corrected sign
      moonSign: effectiveMoonSign,
      risingSign: effectiveRisingSign,
    },
    palmData,
    isPaid,
    lang
  );

  // Try to enhance with AI (using corrected sign)
  const aiResult = await generateAIContent({
    gender: userData.gender,
    birthDate: userData.birthDate,
    birthTime: userData.birthTime,
    birthPlace: userData.birthPlace,
    sunSign: correctedSunSign, // Use corrected sign
    moonSign: effectiveMoonSign || 'невідомо',
    risingSign: effectiveRisingSign || 'невідомо',
    goals: userData.goals,
    relationshipStatus: userData.relationshipStatus,
    favoriteColor: userData.favoriteColor,
    element: userData.element,
    lang,
  });

  // If AI failed, return static report
  if (!aiResult.content) {
    console.log('📄 Using static report (AI unavailable)');
    return { report: staticReport, provider: 'static' };
  }

  const aiContent = aiResult.content;

  // Merge AI content with static structure
  console.log(`🚀 Using AI-enhanced report (provider: ${aiResult.provider})`);
  
  // Create hidden talents from AI content
  const hiddenTalents: HiddenTalent[] = aiContent.personality.hiddenTalents?.map(talent => ({
    title: talent.title,
    description: talent.description,
    extendedDescription: talent.extendedDescription,
  })) || [];

  // Get zodiac symbols for compatibility
  const getZodiacSymbol = (signName: string): string => {
    const symbols: Record<string, string> = {
      'Овен': '♈', 'Телець': '♉', 'Близнюки': '♊', 'Рак': '♋',
      'Лев': '♌', 'Діва': '♍', 'Терези': '♎', 'Скорпіон': '♏',
      'Стрілець': '♐', 'Козеріг': '♑', 'Водолій': '♒', 'Риби': '♓',
    };
    return symbols[signName] || '★';
  };

  const enhancedReport: FullReport = {
    ...staticReport,
    natalChart: {
      ...staticReport.natalChart,
      sunDescription: aiContent.natalChart.sunDescription,
      sunDescriptionExtended: aiContent.natalChart.sunDescriptionExtended,
      moonDescription: aiContent.natalChart.moonDescription,
      moonDescriptionExtended: aiContent.natalChart.moonDescriptionExtended,
      risingDescription: aiContent.natalChart.risingDescription,
      risingDescriptionExtended: aiContent.natalChart.risingDescriptionExtended,
      signsSynergy: aiContent.natalChart.signsSynergy,
    },
    numerology: staticReport.numerology ? {
      ...staticReport.numerology,
      lifePathSubtitle: aiContent.numerology?.lifePathSubtitle,
      lifePathMeaning: aiContent.numerology?.lifePathMeaning || staticReport.numerology.lifePathMeaning,
      lifePathMeaningExtended: aiContent.numerology?.lifePathMeaningExtended,
      birthdaySubtitle: aiContent.numerology?.birthdaySubtitle,
      birthdayMeaning: aiContent.numerology?.birthdayMeaning || staticReport.numerology.birthdayMeaning,
      birthdayMeaningExtended: aiContent.numerology?.birthdayMeaningExtended,
      personalYearSubtitle: aiContent.numerology?.personalYearSubtitle,
      personalYearMeaning: aiContent.numerology?.personalYearMeaning || staticReport.numerology.personalYearMeaning,
      personalYearMeaningExtended: aiContent.numerology?.personalYearMeaningExtended,
    } : undefined,
    personality: aiContent.personality.traits?.map((trait, i) => ({
      title: trait.title,
      description: trait.description,
      strength: 70 + Math.floor(Math.random() * 25), // 70-95%
      icon: staticReport.personality[i]?.icon || '✨',
    })) || staticReport.personality,
    hiddenTalents,
    forecast2026: aiContent.forecast2026.quarters?.map((q, i) => ({
      quarter: q.quarter,
      title: q.title,
      description: q.careerForecast || '', // Keep for backward compat
      focus: q.focus || [],
      luckyDays: staticReport.forecast2026[i]?.luckyDays || [],
      careerForecast: q.careerForecast,
      financeForecast: q.financeForecast,
      relationshipsForecast: q.relationshipsForecast,
      advice: q.advice,
      warning: q.warning,
    })) || staticReport.forecast2026,
    love: {
      overview: aiContent.love.overview,
      overviewExtended: aiContent.love.overviewExtended,
      strengths: aiContent.love.strengthsDetailed?.map(s => s.title) || staticReport.love.strengths,
      strengthsDetailed: aiContent.love.strengthsDetailed,
      challenges: aiContent.love.challengesDetailed?.map(c => c.title) || staticReport.love.challenges,
      challengesDetailed: aiContent.love.challengesDetailed,
      advice: aiContent.love.adviceItems?.[0]?.description || staticReport.love.advice,
      adviceItems: aiContent.love.adviceItems,
      idealPartnerTraits: aiContent.love.idealPartnerTraits,
      bestMonthsForLove: aiContent.love.bestMonthsForLove,
      topMatches: aiContent.love.compatibility?.map(c => ({
        sign: c.sign,
        symbol: getZodiacSymbol(c.sign),
        percentage: c.percentage,
        description: staticReport.love.topMatches.find(m => m.sign === c.sign)?.description || '',
        whyItWorks: c.whyItWorks,
      })) || staticReport.love.topMatches,
    },
    career: {
      overview: aiContent.career.overview,
      strengths: aiContent.career.strengthsDetailed?.map(s => s.title) || staticReport.career.strengths,
      strengthsDetailed: aiContent.career.strengthsDetailed,
      idealCareers: aiContent.career.idealCareersDetailed?.map(c => c.title) || staticReport.career.idealCareers,
      idealCareersDetailed: aiContent.career.idealCareersDetailed,
      financeTips: aiContent.career.financeTipsDetailed?.map(t => t.title) || staticReport.career.financeTips,
      financeTipsDetailed: aiContent.career.financeTipsDetailed,
      yearFocus: aiContent.career.opportunities2026 || staticReport.career.yearFocus,
      yearFocusItems: aiContent.career.yearFocusItems,
      opportunities2026: aiContent.career.opportunities2026,
      warningPeriods: aiContent.career.warningPeriods,
      actionSteps: aiContent.career.actionSteps,
    },
    // Merge AI-generated lucky attributes if available
    lucky: aiContent.lucky ? {
      numbers: aiContent.lucky.numbers || staticReport.lucky.numbers,
      numbersExplanation: aiContent.lucky.numbersExplanation,
      days: aiContent.lucky.days || staticReport.lucky.days,
      daysExplanation: aiContent.lucky.daysExplanation,
      colors: aiContent.lucky.colors || staticReport.lucky.colors,
      colorsExplanation: aiContent.lucky.colorsExplanation,
      gems: aiContent.lucky.gems || staticReport.lucky.gems,
      gemsExplanation: aiContent.lucky.gemsExplanation,
      direction: aiContent.lucky.direction || staticReport.lucky.direction,
      directionExplanation: aiContent.lucky.directionExplanation,
    } : staticReport.lucky,
  };

  return { report: enhancedReport, provider: aiResult.provider };
}

// Check if AI is available
export function isAIAvailable(): boolean {
  return !!(process.env.GROQ_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}
