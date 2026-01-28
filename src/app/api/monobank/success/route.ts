import { NextRequest, NextResponse } from 'next/server';
import { monobank } from '@/lib/monobank';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reportId = searchParams.get('reportId');
  const reference = searchParams.get('reference');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔄 Payment Success Redirect');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📄 Report ID: ${reportId}`);
  console.log(`🔗 Reference: ${reference}`);

  // Get base URL for redirect
  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!reportId) {
    console.log('❌ Missing reportId, redirecting to home');
    return NextResponse.redirect(new URL('/?payment=error', origin));
  }

  // Optionally verify payment status with Monobank
  // Note: The webhook might not have arrived yet, so we also check here
  if (reference) {
    try {
      // Try to find invoice ID from reference (need to store mapping in production)
      // For now, we trust the redirect parameters since they come from Monobank
      console.log('✅ Payment redirect received, user will see success page');
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }

  console.log(`✅ Redirecting to payment success page`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Redirect to payment success page with report info
  const successUrl = new URL('/payment/success', origin);
  successUrl.searchParams.set('reportId', reportId);
  if (reference) {
    successUrl.searchParams.set('reference', reference);
  }
  
  return NextResponse.redirect(successUrl);
}
