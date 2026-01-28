import { createClient } from '@supabase/supabase-js';

// Database types
export interface Payment {
  id: string;
  reference: string;
  invoice_id: string | null;
  email: string | null;
  report_id: string;
  sun_sign: string | null;
  moon_sign: string | null;
  rising_sign: string | null;
  plan_id: string | null;
  amount: number | null;
  status: string;
  created_at: string;
  paid_at: string | null;
}

export type PaymentInsert = Omit<Payment, 'id' | 'created_at' | 'paid_at'> & {
  id?: string;
  created_at?: string;
  paid_at?: string | null;
};

// Server-side Supabase client (uses service role key to bypass RLS)
// Use this in API routes only!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL is not set');
}

if (!supabaseServiceKey) {
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is not set');
}

// Create server client (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey);
}
