'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { uk, type TranslationKeys } from './locales/uk';
import { en } from './locales/en';

// Available locales
export type Locale = 'uk' | 'en';

export const locales: Record<Locale, TranslationKeys> = {
  uk,
  en,
};

export const localeNames: Record<Locale, string> = {
  uk: 'Українська',
  en: 'English',
};

// Zustand store for locale management with persistence
interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

export const useLocale = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: 'uk', // Default to Ukrainian
      setLocale: (locale: Locale) => {
        set({ locale, t: locales[locale] });
      },
      t: uk, // Default translations
    }),
    {
      name: 'astroline-locale',
      onRehydrateStorage: () => (state) => {
        // Ensure translations are synced after rehydration
        if (state) {
          state.t = locales[state.locale];
        }
      },
    }
  )
);

// Hook to get translations
export function useTranslations() {
  const { locale, t, setLocale } = useLocale();
  return { locale, t, setLocale };
}

// Utility function to get nested translation value
export function getNestedValue<T>(obj: T, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return path if not found
    }
  }
  
  return typeof result === 'string' ? result : path;
}

// Server-side translation getter (for metadata, etc.)
export function getTranslations(locale: Locale = 'uk'): TranslationKeys {
  return locales[locale];
}

// Detect browser locale
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'uk';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('uk')) return 'uk';
  if (browserLang.startsWith('en')) return 'en';
  
  // Default to Ukrainian
  return 'uk';
}

// Re-export types
export type { TranslationKeys };
export { uk, en };
