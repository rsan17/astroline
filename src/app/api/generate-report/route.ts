import { NextRequest, NextResponse } from 'next/server';
import { generateAstroReportWithAI, isAIAvailable } from '@/lib/ai';
import type { AIProvider } from '@/lib/ai';
import { saveReport } from '@/lib/report-store';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      gender, 
      birthDate, 
      birthTime, 
      birthPlace, 
      sunSign, 
      moonSign, 
      risingSign,
      palmReading,
      // Additional fields for AI personalization
      goals,
      relationshipStatus,
      favoriteColor,
      element,
      // Language for report generation
      locale,
    } = body;

    // Validate required fields
    if (!email || !birthDate || !sunSign) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique report ID
    const reportId = crypto.randomBytes(8).toString('hex');

    // Determine language (default to Ukrainian)
    const lang: 'uk' | 'en' = locale === 'en' ? 'en' : 'uk';

    // Log AI availability and request info
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔮 Generating Astrology Report');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${email}`);
    console.log(`☀️ Sun Sign: ${sunSign}`);
    console.log(`🌙 Moon Sign: ${moonSign || 'not provided (no birth time)'}`);
    console.log(`⬆️ Rising Sign: ${risingSign || 'not provided (no birth place)'}`);
    console.log(`🎯 Goals: ${goals?.join(', ') || 'not specified'}`);
    console.log(`💕 Relationship: ${relationshipStatus || 'not specified'}`);
    console.log(`🎨 Color: ${favoriteColor || 'not specified'}`);
    console.log(`🌊 Element: ${element || 'not specified'}`);
    console.log(`🌐 Language: ${lang}`);
    console.log(`🤖 AI Available: ${isAIAvailable()}`);

    // Generate the report with AI enhancement (falls back to static if AI unavailable)
    // Note: moonSign and risingSign are only valid if birthTime/birthPlace provided
    const { report, provider } = await generateAstroReportWithAI(
      reportId,
      {
        email,
        gender: gender || 'female',
        birthDate,
        birthTime,
        birthPlace,
        sunSign,
        moonSign: birthTime ? moonSign : undefined, // Only use if birth time provided
        risingSign: birthPlace ? risingSign : undefined, // Only use if birth place provided
        goals: goals || [],
        relationshipStatus,
        favoriteColor,
        element,
      },
      palmReading,
      false, // isPaid
      lang
    );

    // Log which AI provider was used
    const providerLabels: Record<AIProvider, string> = {
      groq: '🚀 Groq (LLaMA 3.3)',
      gemini: '💎 Google Gemini',
      static: '📄 Static Fallback',
    };
    console.log(`✅ Report generated using: ${providerLabels[provider]}`);

    // Save report to database (Supabase)
    const dbResult = await saveReport(reportId, email, report);
    if (dbResult.success) {
      console.log(`💾 Report saved to database: ${reportId}`);
    } else {
      console.warn(`⚠️ Could not save report to database: ${dbResult.error}`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json({ 
      success: true, 
      reportId,
      aiEnhanced: provider !== 'static',
      provider,
      report // Return the full report object
    });

  } catch (error) {
    console.error('❌ Generate report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
