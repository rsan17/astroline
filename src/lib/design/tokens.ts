/**
 * Design System Tokens
 * 
 * Centralized design tokens for the Astroline design system.
 * These tokens ensure consistency across all components and can be
 * imported for programmatic use in components and utilities.
 * 
 * See: DESIGN_SYSTEM.md for full documentation
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Color palette with semantic meanings
 */
export const colors = {
  // Background: Dark cosmic theme
  background: {
    DEFAULT: '#0a0f1a',
    secondary: '#1a2f3a',
  },
  // Accent: Teal for cosmic feel
  accent: {
    DEFAULT: '#4ECDC4',
    light: '#6ee7de',
    dark: '#3db3ab',
  },
  // Text: High contrast for readability
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
} as const;

/**
 * RGB values for colors (for opacity usage)
 */
export const colorsRGB = {
  background: { r: 10, g: 15, b: 26 },
  backgroundSecondary: { r: 26, g: 47, b: 58 },
  accent: { r: 78, g: 205, b: 196 },
  textPrimary: { r: 240, g: 240, b: 240 },
  textSecondary: { r: 160, g: 160, b: 160 },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * 4px base unit spacing scale
 * All spacing should use these values for consistency
 */
export const spacing = {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
} as const;

/**
 * Spacing scale as array (for validation)
 */
export const spacingScale = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80] as const;

/**
 * Fibonacci-based spacing for special cases
 */
export const fibonacciSpacing = {
  13: 52,   // 3.25rem
  21: 84,   // 5.25rem
  34: 136,  // 8.5rem
  55: 220,  // 13.75rem
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font families
 */
export const fontFamily = {
  heading: ['Philosopher', 'Georgia', 'serif'],
  body: ['Nunito', 'system-ui', 'sans-serif'],
} as const;

/**
 * Font size scale (in rem)
 */
export const fontSize = {
  '2xs': 0.625,  // 10px
  xs: 0.75,      // 12px
  sm: 0.875,     // 14px
  base: 1,       // 16px
  lg: 1.125,     // 18px
  xl: 1.25,      // 20px
  '2xl': 1.5,    // 24px
  '3xl': 1.875,  // 30px
  '4xl': 2.25,   // 36px
  '5xl': 3,      // 48px
  '6xl': 3.75,   // 60px
} as const;

/**
 * Line heights
 */
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
} as const;

/**
 * Font weights
 */
export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Letter spacing
 */
export const letterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/**
 * Animation durations (in ms)
 * - 300ms: Quick interactions (buttons, hovers)
 * - 600ms: Standard transitions (page reveals)
 * - 1000ms: Deliberate animations (important moments)
 */
export const duration = {
  quick: 300,
  standard: 600,
  deliberate: 1000,
} as const;

/**
 * Easing functions
 */
export const easing = {
  standard: 'ease-in-out',
  entrance: 'ease-out',
  exit: 'ease-in',
  // CSS cubic-bezier values
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Animation presets for Framer Motion
 */
export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.98,
  },
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box shadows
 */
export const shadows = {
  glow: '0 0 20px rgba(78, 205, 196, 0.3)',
  glowLg: '0 0 40px rgba(78, 205, 196, 0.4)',
  glowAccent: '0 20px 40px rgba(78, 205, 196, 0.3)',
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border radius values
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
  full: 9999,
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

/**
 * Responsive breakpoints (in px)
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// =============================================================================
// Z-INDEX
// =============================================================================

/**
 * Z-index scale for layering
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

// =============================================================================
// DESIGN SYSTEM CLASSES
// =============================================================================

/**
 * Design system CSS class names
 */
export const cssClasses = {
  // Glass morphism
  glass: 'glass',
  glassStrong: 'glass-strong',
  // Gradient text
  gradientText: 'gradient-text',
  gradientTextCosmic: 'gradient-text-cosmic',
  // Buttons
  btnPrimary: 'btn-primary',
  btnSecondary: 'btn-secondary',
  btnGhost: 'btn-ghost',
  // Inputs
  inputDefault: 'input-default',
  // Effects
  glow: 'glow',
  glowHover: 'glow-hover',
  pulseGlow: 'pulse-glow',
} as const;

// =============================================================================
// WCAG CONTRAST REQUIREMENTS
// =============================================================================

/**
 * WCAG contrast ratio requirements
 */
export const wcagContrast = {
  AA: {
    normalText: 4.5,
    largeText: 3,
  },
  AAA: {
    normalText: 7,
    largeText: 4.5,
  },
} as const;

// =============================================================================
// EXPORTS
// =============================================================================

export const designTokens = {
  colors,
  colorsRGB,
  spacing,
  spacingScale,
  fibonacciSpacing,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  duration,
  easing,
  motionPresets,
  shadows,
  borderRadius,
  breakpoints,
  zIndex,
  cssClasses,
  wcagContrast,
} as const;

export default designTokens;
