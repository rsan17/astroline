/**
 * In-memory storage for payment statuses
 * In production, use a database instead
 */

export interface PaymentStatus {
  status: string;
  reportId?: string;
  invoiceId: string;
  amount: number;
  modifiedDate: string;
}

// Using Map for in-memory storage (resets on server restart)
// In production, replace with database queries
export const paymentStatuses = new Map<string, PaymentStatus>();
