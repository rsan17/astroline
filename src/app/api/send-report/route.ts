import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { ReportEmail } from '@/emails/ReportEmail';
import { zodiacSigns } from '@/lib/report-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, reportId, sunSign, moonSign, risingSign } = body;

    // Validate required fields
    if (!email || !reportId) {
      return NextResponse.json(
        { error: 'Email and reportId are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get zodiac signs data
    const sun = zodiacSigns[sunSign || 'Лев'];
    const moon = zodiacSigns[moonSign || 'Риби'];
    const rising = zodiacSigns[risingSign || 'Скорпіон'];

    // Build report URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://astroline.com';
    const reportUrl = `${baseUrl}/report/${reportId}`;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      reply_to: EMAIL_CONFIG.replyTo,
      subject: `✨ Ваш астрологічний звіт готовий, ${sun?.name || 'Зірко'}!`,
      react: ReportEmail({
        sunSign: sun?.name || 'Лев',
        sunSymbol: sun?.symbol || '♌',
        moonSign: moon?.name || 'Риби',
        moonSymbol: moon?.symbol || '♓',
        risingSign: rising?.name || 'Скорпіон',
        risingSymbol: rising?.symbol || '♏',
        reportUrl,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Send report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

