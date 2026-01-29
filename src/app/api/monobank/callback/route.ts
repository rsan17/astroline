import { NextRequest, NextResponse } from 'next/server';
import type { MonobankWebhookPayload } from '@/lib/monobank';
import { getPaymentByReference, updatePaymentStatus, getPaymentStatus } from '@/lib/payment-store';
import { updateReportPaidStatus } from '@/lib/report-store';

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

    // Handle different payment statuses
    switch (payload.status) {
      case 'success':
        console.log('✅ Payment successful!');
        
        // Get payment data from database and send confirmation email
        if (payload.reference) {
          const payment = await getPaymentByReference(payload.reference);
          
          if (payment) {
            // Update report paid status in database
            if (payment.report_id) {
              const reportUpdateResult = await updateReportPaidStatus(payment.report_id, true);
              if (reportUpdateResult.success) {
                console.log(`🔓 Report ${payment.report_id} unlocked successfully`);
              } else {
                console.error(`❌ Failed to unlock report: ${reportUpdateResult.error}`);
              }
            }

            // Send confirmation email
            if (payment.email) {
              try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://astrolog.cards';
                const response = await fetch(`${baseUrl}/api/send-report`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: payment.email,
                    reportId: payment.report_id,
                    sunSign: payment.sun_sign,
                    moonSign: payment.moon_sign,
                    risingSign: payment.rising_sign,
                  }),
                });
                
                if (response.ok) {
                  console.log(`📧 Confirmation email sent to ${payment.email}`);
                } else {
                  console.error('❌ Failed to send email:', await response.text());
                }
              } catch (emailError) {
                console.error('❌ Email sending error:', emailError);
              }
            } else {
              console.log('⚠️ No email found for this payment reference');
            }
          }

          // Update payment status in database
          await updatePaymentStatus(payload.reference, 'success', payload.invoiceId);
        }
        break;

      case 'failure':
        console.log('❌ Payment failed');
        if (payload.reference) {
          await updatePaymentStatus(payload.reference, 'failed', payload.invoiceId);
        }
        break;

      case 'processing':
        console.log('⏳ Payment processing...');
        if (payload.reference) {
          await updatePaymentStatus(payload.reference, 'processing', payload.invoiceId);
        }
        break;

      case 'hold':
        console.log('🔒 Payment on hold');
        if (payload.reference) {
          await updatePaymentStatus(payload.reference, 'hold', payload.invoiceId);
        }
        break;

      case 'reversed':
        console.log('↩️ Payment reversed/refunded');
        if (payload.reference) {
          await updatePaymentStatus(payload.reference, 'reversed', payload.invoiceId);
        }
        break;

      case 'expired':
        console.log('⏰ Invoice expired');
        if (payload.reference) {
          await updatePaymentStatus(payload.reference, 'expired', payload.invoiceId);
        }
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

  const paymentStatus = await getPaymentStatus(reference);
  
  if (!paymentStatus) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  return NextResponse.json(paymentStatus);
}
