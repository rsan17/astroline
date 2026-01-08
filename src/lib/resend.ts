import { Resend } from 'resend';

// Initialize Resend client
// In production, use environment variable
export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'Astroline <noreply@astroline.com>',
  replyTo: 'support@astroline.com',
};

