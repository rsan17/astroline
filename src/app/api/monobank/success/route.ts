import { NextRequest, NextResponse } from 'next/server';
import { updateReportPaidStatus } from '@/lib/report-store';

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
  // Priority: NEXT_PUBLIC_BASE_URL > request URL origin
  const requestOrigin = request.nextUrl.origin;
  const origin = process.env.NEXT_PUBLIC_BASE_URL || requestOrigin;
  
  console.log(`🌐 Redirect origin: ${origin}`);

  if (!reportId) {
    console.log('❌ Missing reportId, redirecting to home');
    return NextResponse.redirect(new URL('/?payment=error', origin));
  }

  // Update report paid status in database
  // Note: The webhook might not have arrived yet, so we also update here
  try {
    const result = await updateReportPaidStatus(reportId, true);
    if (result.success) {
      console.log(`🔓 Report ${reportId} unlocked in database`);
    } else {
      console.warn(`⚠️ Could not unlock report in database: ${result.error}`);
    }
  } catch (error) {
    console.error('Error updating report status:', error);
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
