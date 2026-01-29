// AI-powered astrology report generation with Groq (primary) and Gemini (fallback)

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { buildAstroReportPrompt, type UserDataForPrompt, type ZodiacVerificationResult } from './prompts';
import { generateReport as generateStaticReport, zodiacSigns } from '../report-data';
import { ZODIAC_SIGNS, getZodiacBySlug } from '../constants/zodiac';
import type { FullReport } from '@/types/report';

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
  const expectedRulingPlanet = sign.rulingPlanetUk;

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

// AI-generated content structure (extended for enhanced prompt)
interface AIGeneratedContent {
  personalIntro?: string;
  sunDescription: string;
  moonDescription: string;
  risingDescription: string;
  signsSynergy?: string;
  personalityOverview: string;
  hiddenTalents: string[];
  lifeLesson: string;
  elementAnalysis?: string;
  colorMeaning?: string;
  forecast2026: {
    overall: string;
    keyDates?: string[];
    q1: { title: string; description: string; focus: string[]; advice: string; warning?: string };
    q2: { title: string; description: string; focus: string[]; advice: string; warning?: string };
    q3: { title: string; description: string; focus: string[]; advice: string; warning?: string };
    q4: { title: string; description: string; focus: string[]; advice: string; warning?: string };
  };
  love: {
    overview: string;
    strengths: string[];
    challenges: string[];
    idealPartnerTraits: string[];
    advice2026: string;
    bestMonthsForLove: string[];
    redFlags?: string[];
  };
  career: {
    overview: string;
    strengths: string[];
    idealCareers: string[];
    financeTips: string[];
    opportunities2026: string;
    warningPeriods: string[];
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
    
    // Enhanced validation of required fields
    const missingFields: string[] = [];
    
    if (!parsed.sunDescription || typeof parsed.sunDescription !== 'string') {
      missingFields.push('sunDescription');
    }
    if (!parsed.moonDescription || typeof parsed.moonDescription !== 'string') {
      missingFields.push('moonDescription');
    }
    if (!parsed.risingDescription || typeof parsed.risingDescription !== 'string') {
      missingFields.push('risingDescription');
    }
    if (!parsed.forecast2026 || typeof parsed.forecast2026 !== 'object') {
      missingFields.push('forecast2026');
    } else {
      // Validate forecast structure
      if (!parsed.forecast2026.overall || !parsed.forecast2026.q1 || !parsed.forecast2026.q2 || 
          !parsed.forecast2026.q3 || !parsed.forecast2026.q4) {
        missingFields.push('forecast2026 (incomplete structure)');
      }
    }
    if (!parsed.love || typeof parsed.love !== 'object') {
      missingFields.push('love');
    } else {
      if (!parsed.love.overview || !Array.isArray(parsed.love.strengths) || 
          !Array.isArray(parsed.love.challenges)) {
        missingFields.push('love (incomplete structure)');
      }
    }
    if (!parsed.career || typeof parsed.career !== 'object') {
      missingFields.push('career');
    } else {
      if (!parsed.career.overview || !Array.isArray(parsed.career.strengths) || 
          !Array.isArray(parsed.career.idealCareers)) {
        missingFields.push('career (incomplete structure)');
      }
    }
    if (!Array.isArray(parsed.hiddenTalents)) {
      missingFields.push('hiddenTalents');
    }
    if (!parsed.lifeLesson || typeof parsed.lifeLesson !== 'string') {
      missingFields.push('lifeLesson');
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
  
  const enhancedReport: FullReport = {
    ...staticReport,
    natalChart: {
      ...staticReport.natalChart,
      sunDescription: aiContent.sunDescription,
      moonDescription: aiContent.moonDescription,
      risingDescription: aiContent.risingDescription,
    },
    personality: [
      ...staticReport.personality,
      // Add AI-discovered hidden talents as traits
      ...aiContent.hiddenTalents.slice(0, 2).map((talent, i) => ({
        title: talent,
        description: 'Прихований талант, виявлений через аналіз вашої натальної карти',
        strength: 75 + i * 5,
        icon: '✨',
      })),
    ],
    forecast2026: [
      {
        quarter: 'Q1 2026',
        title: aiContent.forecast2026.q1.title,
        description: aiContent.forecast2026.q1.description,
        focus: aiContent.forecast2026.q1.focus,
        luckyDays: staticReport.forecast2026[0]?.luckyDays || [],
      },
      {
        quarter: 'Q2 2026',
        title: aiContent.forecast2026.q2.title,
        description: aiContent.forecast2026.q2.description,
        focus: aiContent.forecast2026.q2.focus,
        luckyDays: staticReport.forecast2026[1]?.luckyDays || [],
      },
      {
        quarter: 'Q3 2026',
        title: aiContent.forecast2026.q3.title,
        description: aiContent.forecast2026.q3.description,
        focus: aiContent.forecast2026.q3.focus,
        luckyDays: staticReport.forecast2026[2]?.luckyDays || [],
      },
      {
        quarter: 'Q4 2026',
        title: aiContent.forecast2026.q4.title,
        description: aiContent.forecast2026.q4.description,
        focus: aiContent.forecast2026.q4.focus,
        luckyDays: staticReport.forecast2026[3]?.luckyDays || [],
      },
    ],
    love: {
      overview: aiContent.love.overview,
      strengths: aiContent.love.strengths,
      challenges: aiContent.love.challenges,
      advice: aiContent.love.advice2026,
      topMatches: staticReport.love.topMatches, // Keep static compatibility data
    },
    career: {
      overview: aiContent.career.overview,
      strengths: aiContent.career.strengths,
      idealCareers: aiContent.career.idealCareers,
      financeTips: aiContent.career.financeTips,
      yearFocus: aiContent.career.opportunities2026,
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
