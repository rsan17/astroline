import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { ReportEmail } from '@/emails/ReportEmail';
import { zodiacSigns } from '@/lib/report-data';

// Preview endpoint для перегляду email шаблону
// Відкрийте в браузері: http://localhost:3000/api/preview-email
export async function GET() {
  try {
    // Тестові дані
    const testData = {
      sunSign: 'Лев',
      sunSymbol: '♌',
      moonSign: 'Риби',
      moonSymbol: '♓',
      risingSign: 'Скорпіон',
      risingSymbol: '♏',
      reportUrl: 'https://astrolog.cards/report/test123',
      recipientName: 'Тестовий Користувач',
    };

    // Рендеримо email компонент в HTML
    const emailHtml = render(
      ReportEmail({
        sunSign: testData.sunSign,
        sunSymbol: testData.sunSymbol,
        moonSign: testData.moonSign,
        moonSymbol: testData.moonSymbol,
        risingSign: testData.risingSign,
        risingSymbol: testData.risingSymbol,
        reportUrl: testData.reportUrl,
        recipientName: testData.recipientName,
      })
    );

    // Повертаємо HTML
    return new NextResponse(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Preview email error:', error);
    return NextResponse.json(
      { error: 'Failed to render email preview' },
      { status: 500 }
    );
  }
}
