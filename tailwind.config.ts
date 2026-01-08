import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Astroline Brand Colors
        background: {
          DEFAULT: '#0a0f1a',
          secondary: '#1a2f3a',
        },
        accent: {
          DEFAULT: '#4ECDC4',
          light: '#6ee7de',
          dark: '#3db3ab',
        },
        text: {
          primary: '#f0f0f0',
          secondary: '#a0a0a0',
          muted: '#6b7280',
        },
        // Semantic colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        gold: '#FFD700',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Nunito', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Philosopher', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(78, 205, 196, 0.3)',
        'glow-lg': '0 0 40px rgba(78, 205, 196, 0.4)',
        'glow-accent': '0 20px 40px rgba(78, 205, 196, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-accent': 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(78, 205, 196, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(78, 205, 196, 0.6)',
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
      },
      transitionDuration: {
        '400': '400ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
