import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Palm validation result structure
interface PalmValidationResult {
  isValid: boolean;
  confidence: number;
  feedback: string;
  details: {
    isOpenPalm: boolean;
    isPalmVisible: boolean;
    areLinesVisible: boolean;
    isGoodLighting: boolean;
    isPalmLargeEnough: boolean;
  };
  suggestions: string[];
}

// Validation prompt for Gemini Vision
const PALM_VALIDATION_PROMPT = `You are an expert palm reader assistant. Analyze this image and determine if it's suitable for palm reading analysis.

Check the following criteria and respond in JSON format:

1. **isOpenPalm**: Is this an open palm facing the camera (not a fist, not the back of the hand, not a closed hand)?
2. **isPalmVisible**: Is the palm clearly visible and not obscured by objects, shadows, or cut off by the frame?
3. **areLinesVisible**: Can you see the main palm lines (heart line, head line, life line)? They don't need to be perfectly clear, but visible.
4. **isGoodLighting**: Is the lighting adequate to see the palm details? Not too dark, not overexposed.
5. **isPalmLargeEnough**: Does the palm take up at least 40% of the image area?

Based on these criteria, determine if the image is valid for palm reading.

Respond ONLY with valid JSON in this exact format:
{
  "isValid": true/false,
  "confidence": 0-100,
  "feedback": "Brief feedback message in Ukrainian",
  "details": {
    "isOpenPalm": true/false,
    "isPalmVisible": true/false,
    "areLinesVisible": true/false,
    "isGoodLighting": true/false,
    "isPalmLargeEnough": true/false
  },
  "suggestions": ["Array of improvement suggestions in Ukrainian if not valid, empty array if valid"]
}

Important:
- Be strict but fair - the image should clearly show a palm suitable for reading
- If the image is not a palm at all (e.g., face, object, landscape), mark all details as false
- Provide helpful, specific suggestions in Ukrainian if the image needs improvement
- If the palm is acceptable but could be better, still mark as valid with suggestions`;

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('GOOGLE_GENERATIVE_AI_API_KEY is not configured');
      return NextResponse.json(
        { 
          error: 'SERVICE_UNAVAILABLE',
          isValid: false,
          serviceUnavailable: true,
          feedback: 'Сервіс перевірки долоні тимчасово недоступний.',
          suggestions: ['Ви можете пропустити цей крок і продовжити без аналізу долоні'],
          confidence: 0,
          details: {
            isOpenPalm: false,
            isPalmVisible: false,
            areLinesVisible: false,
            isGoodLighting: false,
            isPalmLargeEnough: false,
          },
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided', isValid: false },
        { status: 400 }
      );
    }

    // Validate base64 image format
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format', isValid: false },
        { status: 400 }
      );
    }

    try {
      // Call Gemini Vision for palm validation
      // Pass the full data URL - the AI SDK will handle parsing it
      const { text } = await generateText({
        model: google('gemini-1.5-flash'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: PALM_VALIDATION_PROMPT,
              },
              {
                type: 'image',
                image: image, // Pass full data URL
              },
            ],
          },
        ],
        temperature: 0.1, // Low temperature for consistent validation
      });

      // Parse Gemini response
      const result = parseValidationResponse(text);
      
      console.log('Palm validation result:', {
        isValid: result.isValid,
        confidence: result.confidence,
        details: result.details,
      });

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('Gemini API error:', aiError);
      
      // AI service error - allow user to skip
      return NextResponse.json({
        isValid: false,
        confidence: 0,
        feedback: 'Не вдалося перевірити зображення. Ви можете спробувати ще раз або пропустити цей крок.',
        details: {
          isOpenPalm: false,
          isPalmVisible: false,
          areLinesVisible: false,
          isGoodLighting: false,
          isPalmLargeEnough: false,
        },
        suggestions: [
          'Спробуйте завантажити інше зображення',
          'Або пропустіть цей крок і продовжіть без аналізу долоні',
        ],
        error: 'AI_SERVICE_ERROR',
        serviceUnavailable: true,
      });
    }
  } catch (error) {
    console.error('Palm validation error:', error);
    return NextResponse.json(
      { 
        error: 'SERVICE_UNAVAILABLE',
        isValid: false,
        serviceUnavailable: true,
        feedback: 'Помилка перевірки зображення. Ви можете пропустити цей крок.',
        suggestions: ['Спробуйте ще раз або пропустіть аналіз долоні'],
        confidence: 0,
        details: {
          isOpenPalm: false,
          isPalmVisible: false,
          areLinesVisible: false,
          isGoodLighting: false,
          isPalmLargeEnough: false,
        },
      },
      { status: 500 }
    );
  }
}

// Parse and validate Gemini response
function parseValidationResponse(text: string): PalmValidationResult {
  try {
    // Clean up the response - remove markdown code blocks if present
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.slice(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    const parsed = JSON.parse(cleanText);

    // Validate required fields
    const result: PalmValidationResult = {
      isValid: Boolean(parsed.isValid),
      confidence: typeof parsed.confidence === 'number' 
        ? Math.max(0, Math.min(100, parsed.confidence)) 
        : 50,
      feedback: typeof parsed.feedback === 'string' 
        ? parsed.feedback 
        : parsed.isValid 
          ? 'Зображення долоні прийнято!' 
          : 'Будь ласка, завантажте чітке фото відкритої долоні.',
      details: {
        isOpenPalm: Boolean(parsed.details?.isOpenPalm),
        isPalmVisible: Boolean(parsed.details?.isPalmVisible),
        areLinesVisible: Boolean(parsed.details?.areLinesVisible),
        isGoodLighting: Boolean(parsed.details?.isGoodLighting),
        isPalmLargeEnough: Boolean(parsed.details?.isPalmLargeEnough),
      },
      suggestions: Array.isArray(parsed.suggestions) 
        ? parsed.suggestions.filter((s: unknown) => typeof s === 'string')
        : [],
    };

    // Recalculate isValid based on details if not already valid
    if (!result.isValid) {
      const { isOpenPalm, isPalmVisible, areLinesVisible } = result.details;
      // Must have at least these three critical criteria
      result.isValid = isOpenPalm && isPalmVisible && areLinesVisible;
    }

    return result;
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', parseError);
    console.error('Raw response:', text);
    
    // Default fallback response
    return {
      isValid: false,
      confidence: 0,
      feedback: 'Не вдалося розпізнати зображення. Переконайтеся, що це фото відкритої долоні.',
      details: {
        isOpenPalm: false,
        isPalmVisible: false,
        areLinesVisible: false,
        isGoodLighting: false,
        isPalmLargeEnough: false,
      },
      suggestions: [
        'Розкрийте долоню повністю',
        'Переконайтеся, що долоня добре освітлена',
        'Зробіть фото ближче до долоні',
      ],
    };
  }
}
