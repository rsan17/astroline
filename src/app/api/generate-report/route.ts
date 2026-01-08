import { NextRequest, NextResponse } from 'next/server';
import { generateAstroReportWithAI, isAIAvailable } from '@/lib/ai';
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

    // Log AI availability status
    console.log('AI available:', isAIAvailable());

    // Generate the report with AI enhancement (falls back to static if AI unavailable)
    const report = await generateAstroReportWithAI(
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

    // In a real app, you would:
    // 1. Save the report to database (Supabase)
    // 2. Associate it with user account
    // 3. Handle payment status

    return NextResponse.json({ 
      success: true, 
      reportId,
      aiEnhanced: isAIAvailable(),
      report: {
        id: report.id,
        createdAt: report.createdAt,
        sunSign: report.natalChart.sunSign.name,
        moonSign: report.natalChart.moonSign.name,
        risingSign: report.natalChart.risingSign.name,
      }
    });

  } catch (error) {
    console.error('Generate report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
