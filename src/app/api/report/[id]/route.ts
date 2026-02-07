import { NextRequest, NextResponse } from 'next/server';
import { getReport, updateReportPaidStatus } from '@/lib/report-store';

// GET - Fetch a report by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    const report = await getReport(reportId);

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Log report structure for verification
    const hasExtendedFields = !!(
      report.natalChart?.sunDescriptionExtended ||
      report.natalChart?.moonDescriptionExtended ||
      report.natalChart?.risingDescriptionExtended
    );
    console.log(`📊 API GET /api/report/${reportId} - Report structure:`);
    console.log(`   - Has extended fields: ${hasExtendedFields}`);
    console.log(`   - sunDescription length: ${report.natalChart?.sunDescription?.length || 0} chars`);
    console.log(`   - sunDescriptionExtended: ${report.natalChart?.sunDescriptionExtended?.length || 0} paragraphs`);
    console.log(`   - moonDescriptionExtended: ${report.natalChart?.moonDescriptionExtended?.length || 0} paragraphs`);
    console.log(`   - risingDescriptionExtended: ${report.natalChart?.risingDescriptionExtended?.length || 0} paragraphs`);
    console.log(`   - love.overviewExtended: ${report.love?.overviewExtended ? 'present' : 'missing'}`);
    console.log(`   - career.opportunities2026: ${report.career?.opportunities2026 ? 'present' : 'missing'}`);

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error('❌ Error fetching report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update report paid status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;
    const body = await request.json();
    const { isPaid } = body;

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    if (typeof isPaid !== 'boolean') {
      return NextResponse.json(
        { error: 'isPaid must be a boolean' },
        { status: 400 }
      );
    }

    const result = await updateReportPaidStatus(reportId, isPaid);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update report' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Report ${reportId} paid status updated to ${isPaid}`,
    });
  } catch (error) {
    console.error('❌ Error updating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
