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
        // Cosmic Minimalist Color Palette
        cosmic: {
          bg: '#1a1f2e',
          'bg-secondary': '#252b3d',
          accent: '#548FC2',
          'accent-light': '#6ba3d1',
          'accent-dark': '#4278a8',
          text: '#e2e8f0',
          heading: '#ffffff',
          muted: '#8b9dc3',
        },
        // Legacy support (mapped to new colors)
        background: {
          DEFAULT: '#1a1f2e',
          secondary: '#252b3d',
        },
        accent: {
          DEFAULT: '#548FC2',
          light: '#6ba3d1',
          dark: '#4278a8',
        },
        text: {
          primary: '#e2e8f0',
          secondary: 'rgba(255, 255, 255, 0.6)',
          muted: 'rgba(255, 255, 255, 0.4)',
        },
        // Semantic colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        gold: '#FFD700',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
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
        'glow': '0 0 20px rgba(84, 143, 194, 0.2)',
        'glow-lg': '0 0 40px rgba(84, 143, 194, 0.3)',
        'glow-accent': '0 20px 40px rgba(84, 143, 194, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, #548FC2 0%, #8b9dc3 100%)',
        'gradient-accent': 'linear-gradient(135deg, #548FC2 0%, #6ba3d1 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(84, 143, 194, 0.2)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(84, 143, 194, 0.4)',
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
