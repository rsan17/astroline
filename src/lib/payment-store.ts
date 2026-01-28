/**
 * Payment storage using Supabase
 * Provides functions to create, read, and update payment records
 */

import { supabaseAdmin, isSupabaseConfigured, type Payment, type PaymentInsert } from './supabase';

// ============================================
// Types
// ============================================

export interface PaymentData {
  email?: string;
  reportId: string;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  planId?: string;
  amount?: number;
  invoiceId?: string;
}

export interface PaymentStatus {
  status: string;
  reportId?: string;
  invoiceId: string;
  amount: number;
  modifiedDate: string;
}

// ============================================
// Database Functions
// ============================================

/**
 * Create a new payment record in the database
 */
export async function createPayment(
  reference: string,
  data: PaymentData
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, skipping database insert');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const paymentRecord: PaymentInsert = {
      reference,
      invoice_id: data.invoiceId || null,
      email: data.email || null,
      report_id: data.reportId,
      sun_sign: data.sunSign || null,
      moon_sign: data.moonSign || null,
      rising_sign: data.risingSign || null,
      plan_id: data.planId || null,
      amount: data.amount || null,
      status: 'pending',
    };

    const { error } = await supabaseAdmin
      .from('payments')
      .insert(paymentRecord);

    if (error) {
      console.error('❌ Error creating payment:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Payment record created: ${reference}`);
    return { success: true };
  } catch (err) {
    console.error('❌ Exception creating payment:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Get payment data by reference
 */
export async function getPaymentByReference(
  reference: string
): Promise<Payment | null> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('reference', reference)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        console.log(`⚠️ No payment found for reference: ${reference}`);
        return null;
      }
      console.error('❌ Error fetching payment:', error);
      return null;
    }

    return data as Payment;
  } catch (err) {
    console.error('❌ Exception fetching payment:', err);
    return null;
  }
}

/**
 * Update payment status after successful payment
 */
export async function updatePaymentStatus(
  reference: string,
  status: string,
  invoiceId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const updateData: Partial<Payment> = {
      status,
      ...(invoiceId && { invoice_id: invoiceId }),
      ...(status === 'success' && { paid_at: new Date().toISOString() }),
    };

    const { error } = await supabaseAdmin
      .from('payments')
      .update(updateData)
      .eq('reference', reference);

    if (error) {
      console.error('❌ Error updating payment status:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Payment status updated: ${reference} → ${status}`);
    return { success: true };
  } catch (err) {
    console.error('❌ Exception updating payment:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Get payment status by reference (for status check endpoint)
 */
export async function getPaymentStatus(
  reference: string
): Promise<PaymentStatus | null> {
  const payment = await getPaymentByReference(reference);
  
  if (!payment) {
    return null;
  }

  return {
    status: payment.status,
    reportId: payment.report_id,
    invoiceId: payment.invoice_id || '',
    amount: payment.amount || 0,
    modifiedDate: payment.paid_at || payment.created_at,
  };
}
