import type { Config } from 'tailwindcss';

/**
 * Astroline Design System - Tailwind Configuration
 * 
 * This configuration implements the Astroline design system with:
 * - 4px base unit spacing system
 * - Semantic color palette with cosmic theme
 * - Typography scale for clear hierarchy
 * - Animation timing aligned with design philosophy
 * 
 * See: src/lib/design/DESIGN_SYSTEM.md for full documentation
 */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Astroline Premium Mystical Color Palette
        // Background: Deep cosmic blacks with purple undertones
        background: {
          DEFAULT: '#050510', // Deepest black with purple undertone
          secondary: '#0d0d24', // Midnight blue - cards, elevated surfaces
          tertiary: '#13132d', // Slightly lighter - hover states
        },
        // Primary Accent: Vivid purple for mystical feel
        accent: {
          DEFAULT: '#9333ea', // Vivid purple - primary CTAs
          light: '#a855f7', // Lighter purple - hover states
          dark: '#7e22ce', // Darker purple - pressed states
        },
        // Secondary Accent: Cosmic blue for depth
        cosmic: {
          DEFAULT: '#3b82f6', // Cosmic blue - secondary actions
          light: '#60a5fa', // Light cosmic - hover
          dark: '#2563eb', // Dark cosmic - pressed
        },
        // Gold: Premium emphasis and special elements
        gold: {
          DEFAULT: '#fbbf24', // Warm gold - premium features
          light: '#fcd34d', // Light gold - highlights
          dark: '#f59e0b', // Dark gold - accents
        },
        // Teal: Keep for compatibility, secondary use
        teal: {
          DEFAULT: '#4ECDC4',
          light: '#6ee7de',
          dark: '#3db3ab',
        },
        // Text: High contrast for readability on dark background
        text: {
          primary: '#f0f0f0', // Main text - high contrast (WCAG AA: 12.6:1)
          secondary: '#a0a0a0', // Secondary text - medium contrast (WCAG AA: 4.8:1)
          muted: '#6b7280', // Muted text - low emphasis, labels
        },
        // Semantic colors: Clear meaning for user feedback
        success: '#22c55e', // Success states, positive feedback
        warning: '#f59e0b', // Warning states, caution
        error: '#ef4444', // Error states, destructive actions
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Nunito', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Philosopher', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        // 4px base unit system for consistent spacing rhythm
        // Following design system: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px
        '18': '4.5rem', // 72px - custom spacing
        '88': '22rem', // 352px - custom spacing
        '128': '32rem', // 512px - custom spacing
        // Additional 4px-based values for finer control
        '13': '3.25rem', // 52px (13 * 4px)
        '21': '5.25rem', // 84px (21 * 4px) - Fibonacci-based
        '34': '8.5rem', // 136px (34 * 4px) - Fibonacci-based
        '55': '13.75rem', // 220px (55 * 4px) - Fibonacci-based
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.3)',
        'glow-lg': '0 0 40px rgba(147, 51, 234, 0.4)',
        'glow-accent': '0 20px 40px rgba(147, 51, 234, 0.3)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.3)',
        'glow-cosmic': '0 0 30px rgba(59, 130, 246, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(147, 51, 234, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, #3b82f6 0%, #9333ea 50%, #ec4899 100%)',
        'gradient-accent': 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-mystical': 'linear-gradient(135deg, #050510 0%, #0d0d24 50%, #1e1b4b 100%)',
        'gradient-laser': 'linear-gradient(90deg, transparent 0%, #9333ea 20%, #3b82f6 50%, #9333ea 80%, transparent 100%)',
      },
      animation: {
        // Animation timing aligned with design philosophy:
        // - 300ms for quick interactions
        // - 600ms for standard transitions
        // - 1000ms+ for deliberate, noticeable animations
        'float': 'float 3s ease-in-out infinite', // Gentle floating motion
        'float-slow': 'float 6s ease-in-out infinite', // Slower floating for large elements
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite', // Breathing glow effect
        'pulse-glow-gold': 'pulse-glow-gold 2s ease-in-out infinite', // Gold glow
        'spin-slow': 'spin 20s linear infinite', // Slow rotation for cosmic elements
        'spin-slower': 'spin 40s linear infinite', // Even slower rotation
        'twinkle': 'twinkle 2s ease-in-out infinite', // Star twinkling effect
        'shimmer': 'shimmer 2s linear infinite', // Loading shimmer effect
        'laser-flow': 'laser-flow 3s linear infinite', // Laser beam animation
        'gradient-shift': 'gradient-shift 8s ease infinite', // Background gradient animation
        'star-move': 'star-move 120s linear infinite', // Star field movement
        // Standard interaction timings
        'fade-in': 'fade-in 0.3s ease-out', // Quick fade (300ms)
        'slide-up': 'slide-up 0.6s ease-out', // Standard slide (600ms)
        'scale-in': 'scale-in 0.3s ease-out', // Quick scale (300ms)
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite', // Subtle bounce
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)',
          },
        },
        'pulse-glow-gold': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)',
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'laser-flow': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'star-move': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-2000px) translateX(-1000px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        // Standard interaction animations
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        // Standard transition durations aligned with design system
        '300': '300ms', // Quick interactions (buttons, hovers)
        '400': '400ms', // Standard interactions
        '600': '600ms', // Page transitions, section reveals
        '1000': '1000ms', // Deliberate, noticeable animations
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
