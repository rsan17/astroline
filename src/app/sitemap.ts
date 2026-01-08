import { MetadataRoute } from 'next';
import {
  generateAllZodiacUrls,
  generateAllHoroscopeUrls,
  generateAllCompatibilityUrls,
  BASE_URL,
} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const zodiacUrls = generateAllZodiacUrls();
  const horoscopeUrls = generateAllHoroscopeUrls();
  const compatibilityUrls = generateAllCompatibilityUrls();

  return [
    ...staticPages,
    ...zodiacUrls,
    ...horoscopeUrls,
    ...compatibilityUrls,
  ];
}
