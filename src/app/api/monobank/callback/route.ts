import { NextRequest, NextResponse } from 'next/server';
import type { MonobankWebhookPayload } from '@/lib/monobank';
import { paymentStatuses } from '@/lib/payment-store';

export async function POST(request: NextRequest) {
  try {
    const payload: MonobankWebhookPayload = await request.json();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📬 Monobank Webhook Received');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📋 Invoice ID: ${payload.invoiceId}`);
    console.log(`📊 Status: ${payload.status}`);
    console.log(`💰 Amount: ${payload.amount / 100} UAH`);
    console.log(`🔗 Reference: ${payload.reference || 'N/A'}`);
    
    if (payload.failureReason) {
      console.log(`❌ Failure reason: ${payload.failureReason}`);
    }

    // Extract reportId from reference (format: ASTRO-{reportId}-{timestamp})
    let reportId: string | undefined;
    if (payload.reference) {
      const parts = payload.reference.split('-');
      if (parts.length >= 2 && parts[0] === 'ASTRO') {
        reportId = parts[1];
      }
    }

    // Store payment status (in production, save to database)
    if (payload.reference) {
      paymentStatuses.set(payload.reference, {
        status: payload.status,
        reportId,
        invoiceId: payload.invoiceId,
        amount: payload.amount,
        modifiedDate: payload.modifiedDate,
      });
    }

    // Handle different payment statuses
    switch (payload.status) {
      case 'success':
        console.log('✅ Payment successful!');
        // In production: Update database, unlock report, send confirmation email
        // Example: await supabase.from('payments').update({ status: 'paid' }).eq('reference', payload.reference);
        break;

      case 'failure':
        console.log('❌ Payment failed');
        break;

      case 'processing':
        console.log('⏳ Payment processing...');
        break;

      case 'hold':
        console.log('🔒 Payment on hold');
        break;

      case 'reversed':
        console.log('↩️ Payment reversed/refunded');
        break;

      case 'expired':
        console.log('⏰ Invoice expired');
        break;
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Monobank expects 200 OK response
    return NextResponse.json({ status: 'ok' });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    // Still return 200 to prevent Monobank from retrying
    return NextResponse.json({ status: 'ok' });
  }
}

// Also handle GET requests to check payment status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
  }

  const paymentStatus = paymentStatuses.get(reference);
  
  if (!paymentStatus) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  return NextResponse.json(paymentStatus);
}
