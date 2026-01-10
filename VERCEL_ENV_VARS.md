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

## Optional Variables (for AI Features)

### `GROQ_API_KEY`
- **Description**: API key for Groq (primary AI provider)
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
  - Recommended as primary AI provider

### `GOOGLE_GENERATIVE_AI_API_KEY`
- **Description**: API key for Google Gemini (fallback AI provider)
- **How to get**:
  1. Go to https://aistudio.google.com/app/apikey
  2. Sign in with Google account
  3. Create a new API key
  4. Copy the key
- **Example**: `AIzaSy1234567890abcdef`
- **Where it's used**: `src/lib/ai/astro-report.ts` (fallback if Groq fails)
- **Environments**: Production, Preview, Development
- **Note**: 
  - App will work with static report templates if not provided
  - Used as fallback if Groq API is unavailable
  - At least one AI key is recommended for enhanced reports

## Variable Priority

The app will work with the following priority:

1. **AI Reports**: If `GROQ_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY` is set → AI-generated reports
2. **Static Reports**: If no AI keys → Static template reports (still functional)
3. **Email**: If `RESEND_API_KEY` and `EMAIL_FROM` are set → Email sending works
4. **No Email**: If Resend keys not set → Email functionality disabled (reports still accessible via URL)

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

### AI not working?
- Verify at least one AI API key is set
- Check API key format (Groq starts with `gsk_`, Google starts with `AIzaSy`)
- Check Vercel function logs for API errors
- Verify API keys are valid and have credits/quota
