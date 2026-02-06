import { NextRequest, NextResponse } from 'next/server';
import { monobank, PRICE_PLANS, type PlanId } from '@/lib/monobank';
import { createPayment } from '@/lib/payment-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, reportId, email, sunSign, moonSign, risingSign } = body;

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

    // Get base URL for redirects
    // Priority: NEXT_PUBLIC_BASE_URL > request URL origin > localhost (only for dev)
    const requestOrigin = request.nextUrl.origin;
    const isLocalhost = requestOrigin.includes('localhost');
    const origin = process.env.NEXT_PUBLIC_BASE_URL || (isLocalhost ? requestOrigin : requestOrigin);
    
    console.log(`🌐 Redirect origin: ${origin} (from: ${requestOrigin})`);
    
    // Create unique reference for this payment
    const reference = `ASTRO-${reportId}-${Date.now()}`;

    // 🧪 TEST MODE: Skip payment for testing
    if (process.env.SKIP_PAYMENT === 'true') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🧪 TEST MODE: Skipping payment');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📧 Email: ${email || 'not provided'}`);
      console.log(`📋 Plan: ${plan.name} (${plan.priceUAH} UAH) - FREE FOR TESTING`);
      console.log(`🔗 Reference: ${reference}`);
      console.log(`📄 Report ID: ${reportId}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Return fake success URL that goes directly to success page
      const successUrl = `${origin}/api/monobank/success?reportId=${reportId}&reference=${reference}`;
      
      return NextResponse.json({
        success: true,
        invoiceId: `TEST-${Date.now()}`,
        pageUrl: successUrl,
        reference,
        testMode: true,
      });
    }

    // Check if Monobank is configured
    if (!monobank.isConfigured()) {
      console.error('❌ Monobank is not configured');
      return NextResponse.json(
        { error: 'Payment system is not configured' },
        { status: 500 }
      );
    }

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

    // Store payment data in Supabase for email sending after successful payment
    const dbResult = await createPayment(reference, {
      email,
      reportId,
      sunSign,
      moonSign,
      risingSign,
      planId,
      amount: plan.priceKopecks,
      invoiceId: invoice.invoiceId,
    });

    if (dbResult.success) {
      console.log(`📧 Payment data stored in database for reference: ${reference}`);
    } else {
      console.warn(`⚠️ Could not store payment in database: ${dbResult.error}`);
    }

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
