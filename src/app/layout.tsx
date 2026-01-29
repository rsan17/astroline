import type { Metadata, Viewport } from 'next';
import { Philosopher, Nunito } from 'next/font/google';
import './globals.css';
import PreLoader from '@/components/ui/PreLoader';

const philosopher = Philosopher({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '700'],
});

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

// Support both custom domain and Vercel preview URLs
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://astroline.com';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Astroline - Ваш Персональний Астрологічний Гід',
    template: '%s | Astroline',
  },
  description:
    'Відкрийте таємниці вашої долі з персоналізованими астрологічними звітами, аналізом долоні та прогнозом на 2026 рік. Пройдіть безкоштовний тест!',
  keywords: [
    'астрологія',
    'гороскоп',
    'натальна карта',
    'хіромантія',
    'знаки зодіаку',
    'сумісність',
    'прогноз 2026',
    'astrology',
    'horoscope',
    'natal chart',
  ],
  authors: [{ name: 'Astroline' }],
  creator: 'Astroline',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Astroline',
    title: 'Astroline - Ваш Персональний Астрологічний Гід',
    description:
      'Відкрийте таємниці вашої долі з персоналізованими астрологічними звітами та AI-аналізом.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Astroline - Астрологічний Додаток',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astroline - Ваш Персональний Астрологічний Гід',
    description: 'Відкрийте таємниці вашої долі з персоналізованими астрологічними звітами.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#010101',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { GhostCursorGlow } from '@/components/effects';
import { MetaPixel } from '@/components/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${philosopher.variable} ${nunito.variable}`}>
      <head>
        <MetaPixel />
      </head>
      <body className={`${nunito.className} antialiased`}>
        {/* SVG Filter for PreLoader */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        
        {/* PreLoader - temporarily disabled due to loading bug */}
        {/* <PreLoader /> */}
        
        {/* Ghost cursor effect - desktop only */}
        <GhostCursorGlow />
        
        {/* Background effects */}
        <div className="fixed inset-0 star-field opacity-20 pointer-events-none" />
        <div className="fixed inset-0 cosmic-bg pointer-events-none" />
        <div className="aurora" />
        
        {/* Main content */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
