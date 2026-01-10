import { NextRequest, NextResponse } from 'next/server';
import { generateAstroReportWithAI, isAIAvailable } from '@/lib/ai';
import type { AIProvider } from '@/lib/ai';
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

    // Log AI availability and request info
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔮 Generating Astrology Report');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${email}`);
    console.log(`☀️ Sun Sign: ${sunSign}`);
    console.log(`🎯 Goals: ${goals?.join(', ') || 'not specified'}`);
    console.log(`💕 Relationship: ${relationshipStatus || 'not specified'}`);
    console.log(`🎨 Color: ${favoriteColor || 'not specified'}`);
    console.log(`🌊 Element: ${element || 'not specified'}`);
    console.log(`🤖 AI Available: ${isAIAvailable()}`);

    // Generate the report with AI enhancement (falls back to static if AI unavailable)
    const { report, provider } = await generateAstroReportWithAI(
      reportId,
      {
        email,
        gender: gender || 'female',
        birthDate,
        birthTime,
        birthPlace,
        sunSign,
        moonSign: moonSign || sunSign,
        risingSign: risingSign || sunSign,
        goals: goals || [],
        relationshipStatus,
        favoriteColor,
        element,
      },
      palmReading,
      false // isPaid
    );

    // Log which AI provider was used
    const providerLabels: Record<AIProvider, string> = {
      groq: '🚀 Groq (LLaMA 3.3)',
      gemini: '💎 Google Gemini',
      static: '📄 Static Fallback',
    };
    console.log(`✅ Report generated using: ${providerLabels[provider]}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // In a real app, you would:
    // 1. Save the report to database (Supabase)
    // 2. Associate it with user account
    // 3. Handle payment status

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
