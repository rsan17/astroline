/**
 * Report storage using Supabase
 * Provides functions to create, read, and update report records
 */

import { supabaseAdmin, isSupabaseConfigured, type Report, type ReportInsert } from './supabase';
import type { FullReport } from '@/types/report';

// ============================================
// Database Functions
// ============================================

/**
 * Save a report to the database
 */
export async function saveReport(
  reportId: string,
  email: string | null,
  reportData: FullReport
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, skipping database insert');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const reportRecord: ReportInsert = {
      id: reportId,
      email: email,
      report_data: reportData,
      is_paid: reportData.isPaid || false,
    };

    // Log report structure for verification
    const hasExtendedFields = !!(
      reportData.natalChart?.sunDescriptionExtended ||
      reportData.natalChart?.moonDescriptionExtended ||
      reportData.natalChart?.risingDescriptionExtended
    );
    console.log(`📊 Report structure check:`);
    console.log(`   - Has extended fields: ${hasExtendedFields}`);
    console.log(`   - sunDescriptionExtended: ${reportData.natalChart?.sunDescriptionExtended?.length || 0} items`);
    console.log(`   - moonDescriptionExtended: ${reportData.natalChart?.moonDescriptionExtended?.length || 0} items`);
    console.log(`   - risingDescriptionExtended: ${reportData.natalChart?.risingDescriptionExtended?.length || 0} items`);
    console.log(`   - sunDescription length: ${reportData.natalChart?.sunDescription?.length || 0} chars`);
    console.log(`   - love.overviewExtended: ${reportData.love?.overviewExtended ? 'present' : 'missing'}`);
    console.log(`   - career.opportunities2026: ${reportData.career?.opportunities2026 ? 'present' : 'missing'}`);

    const { error } = await supabaseAdmin
      .from('reports')
      .upsert(reportRecord, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error saving report:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Report saved to database: ${reportId}`);
    return { success: true };
  } catch (err) {
    console.error('❌ Exception saving report:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Get a report from the database by ID
 */
export async function getReport(reportId: string): Promise<FullReport | null> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        console.log(`⚠️ No report found in database for ID: ${reportId}`);
        return null;
      }
      console.error('❌ Error fetching report:', error);
      return null;
    }

    const report = data as Report;
    const reportData = report.report_data;
    
    // Log loaded report structure for verification
    console.log(`📊 Loaded report structure check:`);
    console.log(`   - sunDescriptionExtended: ${reportData.natalChart?.sunDescriptionExtended?.length || 0} items`);
    console.log(`   - moonDescriptionExtended: ${reportData.natalChart?.moonDescriptionExtended?.length || 0} items`);
    console.log(`   - risingDescriptionExtended: ${reportData.natalChart?.risingDescriptionExtended?.length || 0} items`);
    console.log(`   - sunDescription length: ${reportData.natalChart?.sunDescription?.length || 0} chars`);
    console.log(`   - love.overviewExtended: ${reportData.love?.overviewExtended ? 'present' : 'missing'}`);
    console.log(`   - career.opportunities2026: ${reportData.career?.opportunities2026 ? 'present' : 'missing'}`);
    
    return reportData;
  } catch (err) {
    console.error('❌ Exception fetching report:', err);
    return null;
  }
}

/**
 * Update report paid status in the database
 */
export async function updateReportPaidStatus(
  reportId: string,
  isPaid: boolean
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured');
    return { success: false, error: 'Database not configured' };
  }

  try {
    // First, get the current report
    const { data: currentReport, error: fetchError } = await supabaseAdmin
      .from('reports')
      .select('report_data')
      .eq('id', reportId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        console.log(`⚠️ No report found to update for ID: ${reportId}`);
        return { success: false, error: 'Report not found' };
      }
      console.error('❌ Error fetching report for update:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // Update the report_data with isPaid and the is_paid column
    const updatedReportData = {
      ...currentReport.report_data,
      isPaid: isPaid,
    };

    const { error: updateError } = await supabaseAdmin
      .from('reports')
      .update({
        is_paid: isPaid,
        report_data: updatedReportData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('❌ Error updating report paid status:', updateError);
      return { success: false, error: updateError.message };
    }

    console.log(`✅ Report paid status updated: ${reportId} → ${isPaid}`);
    return { success: true };
  } catch (err) {
    console.error('❌ Exception updating report:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Check if a report exists in the database
 */
export async function reportExists(reportId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('reports')
      .select('id')
      .eq('id', reportId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  } catch {
    return false;
  }
}
