// SEO Utilities for Astroline
import type { Metadata } from 'next';
import {
  ZODIAC_SIGNS,
  HOROSCOPE_PERIODS,
  ELEMENTS,
  getZodiacBySlug,
  getPeriodBySlug,
  getCompatibilityPercentage,
  type ZodiacSignData,
} from './constants/zodiac';

// Support both custom domain and Vercel preview URLs
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  || 'https://astroline.com';

// =====================
// Metadata Generators
// =====================

export function generateZodiacMetadata(signSlug: string): Metadata {
  const sign = getZodiacBySlug(signSlug);
  if (!sign) {
    return {
      title: 'Знак зодіаку не знайдено',
      description: 'Запитуваний знак зодіаку не знайдено',
    };
  }

  const title = `${sign.nameUk} ${sign.symbol} - Характеристика знаку зодіаку`;
  const description = `${sign.nameUk} (${sign.dates}) - ${sign.description.slice(0, 150)}... Дізнайтеся про характер, сумісність та гороскоп.`;

  return {
    title,
    description,
    keywords: [
      sign.nameUk,
      `${sign.nameUk} характеристика`,
      `${sign.nameUk} знак зодіаку`,
      `${sign.nameUk} сумісність`,
      `гороскоп ${sign.nameUkGenitive}`,
      `знак зодіаку ${sign.nameUk}`,
      ...sign.traits,
    ],
    alternates: {
      canonical: `${BASE_URL}/zodiac/${sign.slug}`,
      languages: {
        'uk': `${BASE_URL}/zodiac/${sign.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/zodiac/${sign.slug}`,
      type: 'article',
      locale: 'uk_UA',
      siteName: 'Astroline',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateHoroscopeMetadata(signSlug: string, periodSlug: string): Metadata {
  const sign = getZodiacBySlug(signSlug);
  const period = getPeriodBySlug(periodSlug);

  if (!sign || !period) {
    return {
      title: 'Гороскоп не знайдено',
      description: 'Запитуваний гороскоп не знайдено',
    };
  }

  const title = `Гороскоп для ${sign.nameUkGenitive} ${period.nameUk} ${sign.symbol}`;
  const description = `${period.descriptionUk} для ${sign.nameUkGenitive}. Кохання, кар'єра, здоров'я та фінанси. Персональний прогноз від Astroline.`;

  return {
    title,
    description,
    keywords: [
      `гороскоп ${sign.nameUkGenitive}`,
      `${sign.nameUk} ${period.nameUk}`,
      `гороскоп ${period.nameUk}`,
      `${sign.nameUk} прогноз`,
      `астрологічний прогноз ${sign.nameUkGenitive}`,
    ],
    alternates: {
      canonical: `${BASE_URL}/horoscope/${sign.slug}/${period.slug}`,
      languages: {
        'uk': `${BASE_URL}/horoscope/${sign.slug}/${period.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/horoscope/${sign.slug}/${period.slug}`,
      type: 'article',
      locale: 'uk_UA',
      siteName: 'Astroline',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateCompatibilityMetadata(sign1Slug: string, sign2Slug: string): Metadata {
  const sign1 = getZodiacBySlug(sign1Slug);
  const sign2 = getZodiacBySlug(sign2Slug);

  if (!sign1 || !sign2) {
    return {
      title: 'Сумісність не знайдено',
      description: 'Запитувана сумісність не знайдена',
    };
  }

  const percentage = getCompatibilityPercentage(sign1Slug, sign2Slug);
  const title = `Сумісність ${sign1.nameUkGenitive} та ${sign2.nameUkGenitive} ${sign1.symbol}${sign2.symbol} - ${percentage}%`;
  const description = `Детальний аналіз сумісності ${sign1.nameUkGenitive} та ${sign2.nameUkGenitive} у коханні, дружбі та роботі. Дізнайтеся, наскільки ви підходите один одному.`;

  return {
    title,
    description,
    keywords: [
      `${sign1.nameUk} ${sign2.nameUk} сумісність`,
      `сумісність ${sign1.nameUkGenitive} і ${sign2.nameUkGenitive}`,
      `${sign1.nameUk} і ${sign2.nameUk}`,
      `сумісність знаків зодіаку`,
      `${sign1.nameUk} кохання`,
      `${sign2.nameUk} кохання`,
    ],
    alternates: {
      canonical: `${BASE_URL}/compatibility/${sign1.slug}/${sign2.slug}`,
      languages: {
        'uk': `${BASE_URL}/compatibility/${sign1.slug}/${sign2.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/compatibility/${sign1.slug}/${sign2.slug}`,
      type: 'article',
      locale: 'uk_UA',
      siteName: 'Astroline',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// =====================
// JSON-LD Generators
// =====================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astroline',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Ваш персональний астрологічний гід. Персоналізовані звіти, гороскопи та аналіз сумісності.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Ukrainian',
    },
    sameAs: [],
  };
}

export function createWebApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Astroline',
    url: BASE_URL,
    description: 'Персоналізований астрологічний додаток з гороскопами, натальними картами та аналізом долоні.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'UAH',
      description: 'Безкоштовний базовий звіт',
    },
    featureList: [
      'Персональний гороскоп',
      'Натальна карта',
      'Аналіз сумісності',
      'Читання долоні',
      'Прогноз на 2026 рік',
    ],
    inLanguage: 'uk',
  };
}

export function createFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createArticleJsonLd(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished || new Date().toISOString(),
    dateModified: params.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Astroline',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Astroline',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    image: params.image || `${BASE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
    inLanguage: 'uk',
  };
}

export function createZodiacSignJsonLd(sign: ZodiacSignData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${sign.nameUk} ${sign.symbol} - Характеристика знаку зодіаку`,
    description: sign.description,
    url: `${BASE_URL}/zodiac/${sign.slug}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Astroline',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Astroline',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    about: {
      '@type': 'Thing',
      name: sign.nameUk,
      description: sign.description,
    },
    keywords: sign.traits.join(', '),
    inLanguage: 'uk',
  };
}

export function createHoroscopeJsonLd(sign: ZodiacSignData, periodSlug: string, periodName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Гороскоп для ${sign.nameUkGenitive} ${periodName}`,
    description: `Астрологічний прогноз для ${sign.nameUkGenitive} ${periodName}. Кохання, кар'єра, здоров'я.`,
    url: `${BASE_URL}/horoscope/${sign.slug}/${periodSlug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Astroline',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Astroline',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    inLanguage: 'uk',
  };
}

// =====================
// Sitemap Helpers
// =====================

export function generateAllZodiacUrls(): { url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }[] {
  return ZODIAC_SIGNS.map((sign) => ({
    url: `${BASE_URL}/zodiac/${sign.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

export function generateAllHoroscopeUrls(): { url: string; lastModified: Date; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] {
  const urls: { url: string; lastModified: Date; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [];

  for (const sign of ZODIAC_SIGNS) {
    for (const period of HOROSCOPE_PERIODS) {
      const changeFrequency = period.slug === 'daily' ? 'daily' : period.slug === 'weekly' ? 'weekly' : 'monthly';
      urls.push({
        url: `${BASE_URL}/horoscope/${sign.slug}/${period.slug}`,
        lastModified: new Date(),
        changeFrequency,
        priority: period.slug === 'daily' ? 0.9 : 0.7,
      });
    }
  }

  return urls;
}

export function generateAllCompatibilityUrls(): { url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }[] {
  const urls: { url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }[] = [];

  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    for (let j = i; j < ZODIAC_SIGNS.length; j++) {
      urls.push({
        url: `${BASE_URL}/compatibility/${ZODIAC_SIGNS[i].slug}/${ZODIAC_SIGNS[j].slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  return urls;
}

// Export BASE_URL for use in other files
export { BASE_URL };
