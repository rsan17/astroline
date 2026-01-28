import { NextRequest, NextResponse } from 'next/server';
import { monobank, PRICE_PLANS, type PlanId } from '@/lib/monobank';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, reportId, email } = body;

    // Validate required fields
    if (!planId || !reportId) {
      return NextResponse.json(
        { error: 'Missing required fields: planId and reportId are required' },
        { status: 400 }
      );
    }

    // Validate plan
    const plan = PRICE_PLANS[planId as PlanId];
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Check if Monobank is configured
    if (!monobank.isConfigured()) {
      console.error('❌ Monobank is not configured');
      return NextResponse.json(
        { error: 'Payment system is not configured' },
        { status: 500 }
      );
    }

    // Get base URL for redirects
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Create unique reference for this payment
    const reference = `ASTRO-${reportId}-${Date.now()}`;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💳 Creating Monobank Payment');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${email || 'not provided'}`);
    console.log(`📋 Plan: ${plan.name} (${plan.priceUAH} UAH)`);
    console.log(`🔗 Reference: ${reference}`);
    console.log(`📄 Report ID: ${reportId}`);

    // Create invoice in Monobank
    const invoice = await monobank.createInvoice({
      amount: plan.priceKopecks,
      ccy: 980, // UAH
      merchantPaymInfo: {
        reference,
        destination: `Astroline - ${plan.name} доступ до астрологічного звіту`,
        basketOrder: [
          {
            name: `Астрологічний звіт - ${plan.name}`,
            qty: 1,
            sum: plan.priceKopecks,
            unit: 'шт',
          },
        ],
      },
      redirectUrl: `${origin}/api/monobank/success?reportId=${reportId}&reference=${reference}`,
      webHookUrl: `${origin}/api/monobank/callback`,
      validity: 3600, // 1 hour
      paymentType: 'debit',
    });

    console.log(`✅ Invoice created: ${invoice.invoiceId}`);
    console.log(`🔗 Payment URL: ${invoice.pageUrl}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json({
      success: true,
      invoiceId: invoice.invoiceId,
      pageUrl: invoice.pageUrl,
      reference,
    });

  } catch (error) {
    console.error('❌ Create payment error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment' },
      { status: 500 }
    );
  }
}
