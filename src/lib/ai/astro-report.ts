// AI-powered astrology report generation with Groq (primary) and Gemini (fallback)

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { buildAstroReportPrompt, type UserDataForPrompt } from './prompts';
import { generateReport as generateStaticReport, zodiacSigns } from '../report-data';
import type { FullReport } from '@/types/report';

// Create Groq client using OpenAI-compatible API
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});

// AI-generated content structure
interface AIGeneratedContent {
  sunDescription: string;
  moonDescription: string;
  risingDescription: string;
  personalityOverview: string;
  hiddenTalents: string[];
  lifeLesson: string;
  forecast2026: {
    overall: string;
    q1: { title: string; description: string; focus: string[]; advice: string };
    q2: { title: string; description: string; focus: string[]; advice: string };
    q3: { title: string; description: string; focus: string[]; advice: string };
    q4: { title: string; description: string; focus: string[]; advice: string };
  };
  love: {
    overview: string;
    strengths: string[];
    challenges: string[];
    idealPartnerTraits: string[];
    advice2026: string;
    bestMonthsForLove: string[];
  };
  career: {
    overview: string;
    strengths: string[];
    idealCareers: string[];
    financeTips: string[];
    opportunities2026: string;
    warningPeriods: string[];
  };
}

// Generate AI content with Groq (primary) or Gemini (fallback)
async function generateAIContent(userData: UserDataForPrompt): Promise<AIGeneratedContent | null> {
  const prompt = buildAstroReportPrompt(userData);

  // Try Groq first (faster, higher limits)
  if (process.env.GROQ_API_KEY) {
    try {
      const { text } = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt,
        temperature: 0.7,
      });

      return parseAIResponse(text);
    } catch (error) {
      console.warn('Groq API failed, trying Gemini fallback:', error);
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

      return parseAIResponse(text);
    } catch (error) {
      console.warn('Gemini API failed:', error);
    }
  }

  // Both failed, return null to trigger static fallback
  return null;
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
    
    // Validate required fields exist
    if (!parsed.sunDescription || !parsed.forecast2026 || !parsed.love || !parsed.career) {
      console.warn('AI response missing required fields');
      return null;
    }

    return parsed as AIGeneratedContent;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.error('Raw response:', text.slice(0, 500));
    return null;
  }
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
    moonSign: string;
    risingSign: string;
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
  isPaid: boolean = false
): Promise<FullReport> {
  // Always generate static report as base/fallback
  const staticReport = generateStaticReport(
    reportId,
    {
      email: userData.email,
      gender: userData.gender,
      birthDate: userData.birthDate,
      birthTime: userData.birthTime,
      birthPlace: userData.birthPlace,
      sunSign: userData.sunSign,
      moonSign: userData.moonSign || userData.sunSign,
      risingSign: userData.risingSign || userData.sunSign,
    },
    palmData,
    isPaid
  );

  // Try to enhance with AI
  const aiContent = await generateAIContent({
    gender: userData.gender,
    birthDate: userData.birthDate,
    birthTime: userData.birthTime,
    birthPlace: userData.birthPlace,
    sunSign: userData.sunSign,
    moonSign: userData.moonSign || userData.sunSign,
    risingSign: userData.risingSign || userData.sunSign,
    goals: userData.goals,
    relationshipStatus: userData.relationshipStatus,
    favoriteColor: userData.favoriteColor,
    element: userData.element,
  });

  // If AI failed, return static report
  if (!aiContent) {
    console.log('Using static report (AI unavailable)');
    return staticReport;
  }

  // Merge AI content with static structure
  console.log('Using AI-enhanced report');
  
  return {
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
  };
}

// Check if AI is available
export function isAIAvailable(): boolean {
  return !!(process.env.GROQ_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}
