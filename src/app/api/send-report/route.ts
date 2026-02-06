import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { ReportEmail } from '@/emails/ReportEmail';
import { zodiacSigns } from '@/lib/report-data';
import { getReport } from '@/lib/report-store';
import { renderToBuffer } from '@react-pdf/renderer';
import { ReportPDF } from '@/pdf';
import type { FullReport } from '@/types/report';
import React from 'react';

// Helper function to generate PDF buffer
async function generatePdfBuffer(report: FullReport): Promise<Buffer> {
  const element = React.createElement(ReportPDF, { report });
  // @ts-expect-error - react-pdf types are strict about Document vs ReactElement
  return await renderToBuffer(element);
}

export async function POST(request: NextRequest) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Send Report Email Request');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    const body = await request.json();
    const { email, reportId, sunSign, moonSign, risingSign } = body;

    console.log(`📄 Report ID: ${reportId}`);
    console.log(`📧 Email: ${email}`);
    console.log(`⭐ Signs: ${sunSign} / ${moonSign} / ${risingSign}`);

    // Validate required fields
    if (!email || !reportId) {
      console.error('❌ Missing required fields');
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

    // Get zodiac signs data for email template
    const sun = zodiacSigns[sunSign || 'Лев'];
    const moon = zodiacSigns[moonSign || 'Риби'];
    const rising = zodiacSigns[risingSign || 'Скорпіон'];

    // Build report URL - використовуємо astrolog.cards для email посилань
    const emailBaseUrl = process.env.EMAIL_APP_URL || 'https://astrolog.cards';
    const reportUrl = `${emailBaseUrl}/report/${reportId}`;

    // Try to fetch full report from database for PDF generation
    let pdfBuffer: Buffer | null = null;
    try {
      console.log('📄 Fetching report for PDF generation...');
      const fullReport = await getReport(reportId);
      
      if (fullReport) {
        console.log('📄 Generating PDF...');
        // Generate PDF from report data
        pdfBuffer = await generatePdfBuffer(fullReport);
        console.log(`✅ PDF generated successfully (${pdfBuffer.length} bytes)`);
      } else {
        console.warn('⚠️ Report not found in database, sending email without PDF');
      }
    } catch (pdfError) {
      console.error('❌ PDF generation failed:', pdfError);
      // Continue without PDF - graceful degradation
    }

    // Prepare email options
    const emailOptions: Parameters<typeof resend.emails.send>[0] = {
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
    };

    // Add PDF attachment if available
    if (pdfBuffer) {
      emailOptions.attachments = [
        {
          filename: `astroline-report-${reportId}.pdf`,
          content: pdfBuffer,
        },
      ];
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('📤 Sending email via Resend...');
    console.log(`📎 PDF attached: ${!!pdfBuffer}`);

    // Send email via Resend
    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('❌ Resend error:', error);
      // Preserve the original error message from Resend for better debugging
      const errorMessage = error.message || 'Unknown error occurred';
      return NextResponse.json(
        { error: `Failed to send email: ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log(`✅ Email sent successfully! ID: ${data?.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Email sent successfully',
      hasPdf: !!pdfBuffer,
    });

  } catch (error) {
    console.error('❌ Send report error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
