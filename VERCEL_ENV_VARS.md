# Vercel Environment Variables Configuration

This document lists all environment variables needed for the Astroline deployment on Vercel.

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable below
4. **Important**: Select all environments (Production, Preview, Development) for each variable
5. Click **Save** after adding each variable

## Required Variables

### `NEXT_PUBLIC_APP_URL`
- **Description**: Full URL of your website
- **Example**: `https://astroline-app.vercel.app` (initial) or `https://astroline.com` (after custom domain)
- **Where it's used**:
  - `src/lib/seo.ts` - SEO metadata
  - `src/app/api/send-report/route.ts` - Report URLs in emails
  - `src/app/layout.tsx` - Site URL metadata
- **Environments**: Production, Preview, Development
- **Note**: Update this after connecting custom domain

## Recommended Variables

### `RESEND_API_KEY`
- **Description**: API key for Resend email service
- **How to get**: 
  1. Sign up at https://resend.com
  2. Go to https://resend.com/api-keys
  3. Create a new API key
  4. Copy the key (starts with `re_`)
- **Example**: `re_1234567890abcdef`
- **Where it's used**: `src/lib/resend.ts`, `src/app/api/send-report/route.ts`
- **Environments**: Production, Preview, Development
- **Note**: Required for email sending functionality

### `EMAIL_FROM`
- **Description**: Sender email address for emails
- **Format**: `Name <email@domain.com>`
- **Example**: `Astroline <noreply@astroline.com>`
- **Where it's used**: `src/lib/resend.ts`, `src/app/api/send-report/route.ts`
- **Environments**: Production, Preview, Development
- **Important**: 
  - Domain must be verified in Resend dashboard before emails can be sent
  - For testing, you can use Resend's test domain: `onboarding@resend.dev`
  - For production, verify your domain in Resend → Domains

## Required for Palm Validation

### `GOOGLE_GENERATIVE_AI_API_KEY`
- **Description**: API key for Google Gemini (used for palm photo validation AND AI reports)
- **How to get**:
  1. Go to https://aistudio.google.com/app/apikey
  2. Sign in with Google account
  3. Create a new API key
  4. Copy the key
- **Example**: `AIzaSy1234567890abcdef`
- **Where it's used**: 
  - `src/app/api/validate-palm/route.ts` - **REQUIRED for palm photo validation**
  - `src/lib/ai/astro-report.ts` - fallback AI provider for reports
- **Environments**: Production, Preview, Development
- **⚠️ IMPORTANT**: 
  - **Required for palm validation to work!** Without this key, users cannot validate their palm photos
  - Also used as fallback AI provider for reports if Groq fails
  - Free tier: ~1500 requests/day

## Optional Variables (for AI Reports)

### `GROQ_API_KEY`
- **Description**: API key for Groq (primary AI provider for reports)
- **How to get**:
  1. Sign up at https://console.groq.com
  2. Go to https://console.groq.com/keys
  3. Create a new API key
  4. Copy the key (starts with `gsk_`)
- **Example**: `gsk_1234567890abcdef`
- **Where it's used**: `src/lib/ai/astro-report.ts`
- **Environments**: Production, Preview, Development
- **Note**: 
  - App will work with static report templates if not provided
  - Groq is faster and has higher rate limits than Gemini
  - Recommended as primary AI provider for reports

## Variable Priority

The app will work with the following priority:

1. **Palm Validation**: `GOOGLE_GENERATIVE_AI_API_KEY` is **REQUIRED** for palm photo validation to work
2. **AI Reports**: If `GROQ_API_KEY` is set → Groq for AI-generated reports; if not → falls back to Gemini
3. **Static Reports**: If no AI keys → Static template reports (still functional, but no palm validation)
4. **Email**: If `RESEND_API_KEY` and `EMAIL_FROM` are set → Email sending works
5. **No Email**: If Resend keys not set → Email functionality disabled (reports still accessible via URL)

## Testing Environment Variables

After adding variables, you can test them:

1. **Check build logs**: Variables are available during build
2. **Check function logs**: Go to Vercel Dashboard → Functions → View logs
3. **Test API endpoints**: 
   - `/api/generate-report` - Check if AI is available
   - `/api/send-report` - Test email sending

## Security Notes

- ✅ Never commit `.env.local` files to Git (already in `.gitignore`)
- ✅ Environment variables in Vercel are encrypted at rest
- ✅ Each environment (Production/Preview/Development) can have different values
- ✅ Preview deployments use Preview environment variables
- ✅ Production deployments use Production environment variables

## Troubleshooting

### Variables not working?
- Ensure variables are added to the correct environment (Production/Preview/Development)
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in variable values

### Email not sending?
- Verify `RESEND_API_KEY` is correct
- Check that email domain is verified in Resend dashboard
- Verify `EMAIL_FROM` format: `Name <email@domain.com>`
- Check Vercel function logs for errors

### Palm validation not working?
- **Most common issue**: `GOOGLE_GENERATIVE_AI_API_KEY` is not set in Vercel
- Verify the key starts with `AIzaSy`
- Check Vercel function logs: Deployments → Functions → validate-palm → View logs
- Look for "GOOGLE_GENERATIVE_AI_API_KEY is not configured" error
- Verify API key is valid at https://aistudio.google.com/app/apikey
- Make sure key has quota available (free tier: 1500 requests/day)

### AI reports not working?
- Verify at least one AI API key is set (`GROQ_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY`)
- Check API key format (Groq starts with `gsk_`, Google starts with `AIzaSy`)
- Check Vercel function logs for API errors
- Verify API keys are valid and have credits/quota
