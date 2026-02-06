import { Resend } from 'resend';

// Initialize Resend client
// In production, use environment variable
const apiKey = process.env.RESEND_API_KEY;

// Log warning if not configured (only in development)
if (!apiKey && process.env.NODE_ENV === 'development') {
  console.warn('⚠️ RESEND_API_KEY not configured - email sending will fail');
}

export const resend = new Resend(apiKey || 'dummy_key_not_configured');

// Check if Resend is properly configured
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'Astroline <noreply@astroline.com>',
  replyTo: 'support@astroline.com',
};

