/**
 * Meta Pixel Event Tracking Helper
 * 
 * Використовуйте ці функції для трекінгу конверсій на сайті.
 * Документація: https://developers.facebook.com/docs/meta-pixel/reference
 */

// Типи для Meta Pixel
declare global {
  interface Window {
    fbq: (
      action: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Стандартні події Meta Pixel
 */
export const MetaPixelEvents = {
  // Стандартні події
  PageView: 'PageView',
  ViewContent: 'ViewContent',
  Search: 'Search',
  AddToCart: 'AddToCart',
  AddToWishlist: 'AddToWishlist',
  InitiateCheckout: 'InitiateCheckout',
  AddPaymentInfo: 'AddPaymentInfo',
  Purchase: 'Purchase',
  Lead: 'Lead',
  CompleteRegistration: 'CompleteRegistration',
  Contact: 'Contact',
  CustomizeProduct: 'CustomizeProduct',
  Donate: 'Donate',
  FindLocation: 'FindLocation',
  Schedule: 'Schedule',
  StartTrial: 'StartTrial',
  SubmitApplication: 'SubmitApplication',
  Subscribe: 'Subscribe',
} as const;

/**
 * Перевіряє чи доступний fbq
 */
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Трекінг стандартної події
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!isFbqAvailable()) {
    console.warn('[Meta Pixel] fbq not available');
    return;
  }
  
  window.fbq('track', eventName, params);
}

/**
 * Трекінг кастомної події
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!isFbqAvailable()) {
    console.warn('[Meta Pixel] fbq not available');
    return;
  }
  
  window.fbq('trackCustom', eventName, params);
}

// ============================================
// Готові функції для ключових конверсій
// ============================================

/**
 * Користувач почав квіз
 */
export function trackQuizStart(): void {
  trackCustomEvent('QuizStart');
}

/**
 * Користувач завершив квіз
 */
export function trackQuizComplete(data?: {
  zodiacSign?: string;
  quizType?: string;
}): void {
  trackEvent(MetaPixelEvents.Lead, {
    content_name: 'Quiz Completed',
    ...data,
  });
  trackCustomEvent('QuizComplete', data);
}

/**
 * Користувач переглядає сторінку оплати
 */
export function trackInitiateCheckout(data: {
  value: number;
  currency?: string;
  content_name?: string;
}): void {
  trackEvent(MetaPixelEvents.InitiateCheckout, {
    currency: data.currency || 'UAH',
    value: data.value,
    content_name: data.content_name || 'Astrology Report',
  });
}

/**
 * Успішна оплата (найважливіша конверсія!)
 */
export function trackPurchase(data: {
  value: number;
  currency?: string;
  orderId?: string;
  content_name?: string;
}): void {
  trackEvent(MetaPixelEvents.Purchase, {
    currency: data.currency || 'UAH',
    value: data.value,
    content_name: data.content_name || 'Astrology Report',
    content_type: 'product',
    order_id: data.orderId,
  });
}

/**
 * Користувач переглядає репорт
 */
export function trackViewReport(data?: {
  reportType?: string;
  zodiacSign?: string;
}): void {
  trackEvent(MetaPixelEvents.ViewContent, {
    content_type: 'product',
    content_name: 'Astrology Report',
    ...data,
  });
}

/**
 * Користувач поділився репортом
 */
export function trackShare(data?: {
  method?: string;
}): void {
  trackCustomEvent('Share', data);
}
