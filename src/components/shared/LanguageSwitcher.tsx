'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLocale, localeNames, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'minimal';
}

export function LanguageSwitcher({ className, variant = 'dropdown' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const localeOptions: Locale[] = ['uk', 'en'];

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Toggle variant - simple button switching between locales
  if (variant === 'toggle') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLocale(locale === 'uk' ? 'en' : 'uk')}
        className={cn(
          'flex items-center justify-center gap-2 px-3 py-2 rounded-full',
          'bg-white/5 border border-white/10',
          'hover:bg-white/10 hover:border-accent/30',
          'transition-all duration-300',
          'min-w-[72px]', // Fixed width to prevent jumping
          className
        )}
      >
        <Globe className="w-4 h-4 text-text-secondary flex-shrink-0" />
        <span className="text-sm font-medium text-text-primary w-6 text-center">
          {locale.toUpperCase()}
        </span>
      </motion.button>
    );
  }

  // Minimal variant - just text, no background
  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {localeOptions.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={cn(
              'text-sm transition-colors duration-300',
              locale === loc
                ? 'text-accent font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={cn('relative', className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl',
          'bg-white/5 border border-white/10',
          'hover:bg-white/10 hover:border-accent/30',
          'transition-all duration-300',
          'min-w-[140px]', // Fixed width to prevent jumping
          isOpen && 'border-accent/50'
        )}
      >
        <Globe className="w-4 h-4 text-text-secondary flex-shrink-0" />
        <span className="text-sm text-text-primary flex-1 text-left">{localeNames[locale]}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-secondary"
        >
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full mt-2 right-0 z-50',
                'min-w-[160px] py-2 rounded-xl',
                'bg-background-secondary/95 backdrop-blur-lg',
                'border border-white/10 shadow-xl'
              )}
            >
              {localeOptions.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3',
                    'px-4 py-2.5 text-left',
                    'transition-colors duration-200',
                    locale === loc
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-primary hover:bg-white/5'
                  )}
                >
                  <span className="text-sm">{localeNames[loc]}</span>
                  {locale === loc && (
                    <Check className="w-4 h-4 text-accent" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
