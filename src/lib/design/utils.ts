/**
 * Design System Utilities
 * 
 * Utility functions for design elevation, validation, and consistency
 * across the Astroline design system.
 * 
 * See: DESIGN_SYSTEM.md for full documentation
 */

import { spacingScale, cssClasses, wcagContrast, colorsRGB } from './tokens';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface DesignElevationResult {
  passed: boolean;
  issues: string[];
  recommendations: string[];
  score: number;
}

export interface PrincipleCheckResult {
  principle: string;
  passed: boolean;
  message: string;
}

export interface TechniqueSuggestion {
  technique: string;
  category: string;
  purpose: string;
  whenToUse: string;
}

export interface ReferenceSuggestion {
  source: string;
  principle: string;
  application: string;
}

export interface ComponentCheckInput {
  hasGlassMorphism?: boolean;
  hasGradientText?: boolean;
  spacingConsistent?: boolean;
  usesDesignSystemColors?: boolean;
  hasSignatureElements?: boolean;
  restraintMaintained?: boolean;
  typographyRefined?: boolean;
  animationsPurposeful?: boolean;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Parse hex color to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    const normalized = v / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function calculateContrastRatio(color1: string | RGB, color2: string | RGB): number {
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2;
  
  if (!rgb1 || !rgb2) return 0;
  
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG AA standards
 */
export function meetsWCAGAA(contrastRatio: number, isLargeText = false): boolean {
  const requirement = isLargeText ? wcagContrast.AA.largeText : wcagContrast.AA.normalText;
  return contrastRatio >= requirement;
}

/**
 * Check if contrast meets WCAG AAA standards
 */
export function meetsWCAGAAA(contrastRatio: number, isLargeText = false): boolean {
  const requirement = isLargeText ? wcagContrast.AAA.largeText : wcagContrast.AAA.normalText;
  return contrastRatio >= requirement;
}

/**
 * Get contrast level description
 */
export function getContrastLevel(contrastRatio: number): 'poor' | 'AA-large' | 'AA' | 'AAA' {
  if (contrastRatio >= wcagContrast.AAA.normalText) return 'AAA';
  if (contrastRatio >= wcagContrast.AA.normalText) return 'AA';
  if (contrastRatio >= wcagContrast.AA.largeText) return 'AA-large';
  return 'poor';
}

/**
 * Check contrast between design system colors
 */
export function checkDesignSystemContrast(): { pair: string; ratio: number; level: string }[] {
  const results = [];
  
  // Text on background
  const textOnBg = calculateContrastRatio(colorsRGB.textPrimary, colorsRGB.background);
  results.push({ pair: 'text-primary on background', ratio: textOnBg, level: getContrastLevel(textOnBg) });
  
  const textSecOnBg = calculateContrastRatio(colorsRGB.textSecondary, colorsRGB.background);
  results.push({ pair: 'text-secondary on background', ratio: textSecOnBg, level: getContrastLevel(textSecOnBg) });
  
  // Accent on background
  const accentOnBg = calculateContrastRatio(colorsRGB.accent, colorsRGB.background);
  results.push({ pair: 'accent on background', ratio: accentOnBg, level: getContrastLevel(accentOnBg) });
  
  return results;
}

// =============================================================================
// SPACING UTILITIES
// =============================================================================

/**
 * Validate spacing value against 4px base unit system
 */
export function validateSpacing(value: string | number): boolean {
  if (typeof value === 'number') {
    return spacingScale.includes(value as typeof spacingScale[number]);
  }
  
  // Extract number from Tailwind classes like "p-6", "gap-4"
  const match = value.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    const pxValue = num * 4;
    return spacingScale.includes(pxValue as typeof spacingScale[number]);
  }
  
  return false;
}

/**
 * Get spacing scale values
 */
export function getSpacingScale(): readonly number[] {
  return spacingScale;
}

/**
 * Get closest valid spacing value
 */
export function getClosestSpacing(value: number): number {
  return spacingScale.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Get next spacing value in scale
 */
export function getNextSpacing(current: number): number | null {
  const index = spacingScale.indexOf(current as typeof spacingScale[number]);
  if (index === -1 || index === spacingScale.length - 1) return null;
  return spacingScale[index + 1];
}

/**
 * Get previous spacing value in scale
 */
export function getPreviousSpacing(current: number): number | null {
  const index = spacingScale.indexOf(current as typeof spacingScale[number]);
  if (index <= 0) return null;
  return spacingScale[index - 1];
}

/**
 * Convert pixels to Tailwind spacing class number
 */
export function pxToTailwind(px: number): number {
  return px / 4;
}

/**
 * Convert Tailwind spacing class number to pixels
 */
export function tailwindToPx(tw: number): number {
  return tw * 4;
}

/**
 * Get spacing recommendation for context
 */
export function getSpacingRecommendation(context: 'component' | 'section' | 'card' | 'element'): {
  px: number;
  tailwind: string;
  description: string;
} {
  const recommendations = {
    component: { px: 16, tailwind: 'gap-4', description: 'Internal component spacing' },
    section: { px: 80, tailwind: 'py-20', description: 'Between major sections' },
    card: { px: 24, tailwind: 'p-6', description: 'Card internal padding' },
    element: { px: 8, tailwind: 'gap-2', description: 'Between small elements' },
  };
  return recommendations[context];
}

// =============================================================================
// DESIGN PRINCIPLE CHECKING
// =============================================================================

/**
 * Check if design follows design principles
 */
export function checkDesignPrinciples(component: ComponentCheckInput): PrincipleCheckResult[] {
  const results: PrincipleCheckResult[] = [];

  results.push({
    principle: 'Signature Elements',
    passed: Boolean(component.hasSignatureElements),
    message: component.hasSignatureElements
      ? 'Signature elements (glass, gradients, cosmic theme) are present'
      : 'Consider adding signature elements (glass morphism, gradient text, cosmic theme)',
  });

  results.push({
    principle: 'Spacing Consistency',
    passed: Boolean(component.spacingConsistent),
    message: component.spacingConsistent
      ? 'Spacing follows 4px base unit system'
      : 'Spacing should follow the 4px base unit system for consistency',
  });

  results.push({
    principle: 'Design System Colors',
    passed: Boolean(component.usesDesignSystemColors),
    message: component.usesDesignSystemColors
      ? 'Uses design system color palette'
      : 'Should use design system colors (background, accent, text-primary, etc.)',
  });

  results.push({
    principle: 'Restraint',
    passed: Boolean(component.restraintMaintained),
    message: component.restraintMaintained
      ? 'Bold choices balanced by subtlety'
      : 'Ensure bold elements are balanced by subtle counterparts',
  });

  results.push({
    principle: 'Typography Refinement',
    passed: Boolean(component.typographyRefined),
    message: component.typographyRefined
      ? 'Typography is refined with proper spacing and hierarchy'
      : 'Perfect letter spacing, line heights, and text balance',
  });

  results.push({
    principle: 'Purposeful Animation',
    passed: Boolean(component.animationsPurposeful),
    message: component.animationsPurposeful
      ? 'Animations serve a clear function'
      : 'Ensure all animations serve a function and enhance the experience',
  });

  return results;
}

// =============================================================================
// TECHNIQUE & REFERENCE SUGGESTIONS
// =============================================================================

const techniquesMap: Record<string, TechniqueSuggestion[]> = {
  depth: [
    { technique: 'Glass Morphism', category: 'Depth Illusion', purpose: 'Create modern depth while maintaining visibility', whenToUse: 'For cards, containers, and interactive elements' },
    { technique: 'Layered Shadows', category: 'Depth Illusion', purpose: 'Suggest elevation and create depth perception', whenToUse: 'For cards, buttons, and elevated elements' },
  ],
  emphasis: [
    { technique: 'Gradient Text', category: 'Typography as Form', purpose: 'Create immediate visual impact', whenToUse: 'For headings, hero text, and emphasis' },
    { technique: 'Glow Effects', category: 'Visual Effects', purpose: 'Draw attention and create energy', whenToUse: 'For CTAs, important elements, and interactive states' },
  ],
  hierarchy: [
    { technique: 'Typography Scale', category: 'Typography as Form', purpose: 'Guide eye flow and establish hierarchy', whenToUse: 'For all text content to create visual hierarchy' },
    { technique: 'Spacing Rhythm', category: 'Spatial Composition', purpose: 'Create visual rhythm and guide eye', whenToUse: 'For all layouts to maintain consistent spacing' },
  ],
  motion: [
    { technique: 'Entrance Animations', category: 'Motion & Animation', purpose: 'Draw attention and create delight', whenToUse: 'For page loads, section reveals, and content entrances' },
    { technique: 'Hover Interactions', category: 'Motion & Animation', purpose: 'Provide feedback and encourage interaction', whenToUse: 'For buttons, cards, and interactive elements' },
  ],
  cosmic: [
    { technique: 'Star Fields', category: 'Astroline-Specific', purpose: 'Create mystical atmosphere', whenToUse: 'For backgrounds, hero sections' },
    { technique: 'Aurora Effects', category: 'Astroline-Specific', purpose: 'Add ethereal movement', whenToUse: 'For background overlays, special sections' },
  ],
};

/**
 * Get design techniques for specific purpose
 */
export function getDesignTechniques(purpose: string): TechniqueSuggestion[] {
  return techniquesMap[purpose.toLowerCase()] || [];
}

/**
 * Get all available technique categories
 */
export function getTechniqueCategories(): string[] {
  return Object.keys(techniquesMap);
}

const referencesMap: Record<string, ReferenceSuggestion[]> = {
  clarity: [{ source: 'Stripe', principle: 'Clarity above all', application: 'Use generous spacing, clear typography hierarchy, minimal chrome' }],
  minimalism: [{ source: 'Linear', principle: 'Extreme minimalism', application: 'Remove everything unnecessary, focus on essential elements' }],
  restraint: [{ source: 'Apple', principle: 'Restraint and focus', application: 'Less is more, one thing at a time, perfectly executed' }],
  emotion: [{ source: 'Airbnb', principle: 'Emotional connection', application: 'Use visuals to tell a story, create warmth through color and typography' }],
  grid: [{ source: 'Swiss Design', principle: 'Grid systems', application: 'Use consistent grid, clear hierarchy, mathematical precision' }],
};

/**
 * Get design references for specific context
 */
export function getDesignReferences(context: string): ReferenceSuggestion[] {
  return referencesMap[context.toLowerCase()] || [];
}

// =============================================================================
// DESIGN ELEVATION
// =============================================================================

/**
 * Apply design elevation protocol
 * Systematically reviews and scores component design
 */
export function applyDesignElevation(component: ComponentCheckInput & { purpose?: string }): DesignElevationResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  const checks: { condition: boolean; issue: string; recommendation: string; penalty: number }[] = [
    { condition: !component.purpose, issue: 'Purpose is not clearly defined', recommendation: 'Define the component purpose and user goal', penalty: 20 },
    { condition: !component.hasSignatureElements, issue: 'Missing signature elements', recommendation: 'Add glass morphism, gradient text, or cosmic theme elements', penalty: 15 },
    { condition: !component.spacingConsistent, issue: 'Spacing inconsistent', recommendation: 'Use spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px', penalty: 10 },
    { condition: !component.usesDesignSystemColors, issue: 'Not using design system colors', recommendation: 'Use: background, accent, text-primary, text-secondary', penalty: 10 },
    { condition: !component.restraintMaintained, issue: 'Bold elements not balanced', recommendation: 'Ensure bold choices have subtle counterparts', penalty: 10 },
    { condition: !component.typographyRefined, issue: 'Typography not refined', recommendation: 'Perfect letter spacing, line heights, and text balance', penalty: 10 },
    { condition: !component.animationsPurposeful, issue: 'Animations may not be purposeful', recommendation: 'Ensure all animations enhance the experience', penalty: 5 },
  ];

  checks.forEach(({ condition, issue, recommendation, penalty }) => {
    if (condition) {
      issues.push(issue);
      recommendations.push(recommendation);
      score -= penalty;
    }
  });

  // Positive feedback
  if (component.hasGlassMorphism) recommendations.push('✓ Glass morphism adds modern depth');
  if (component.hasGradientText) recommendations.push('✓ Gradient text creates visual interest');

  return {
    passed: issues.length === 0,
    issues,
    recommendations,
    score: Math.max(0, score),
  };
}

// =============================================================================
// COMPONENT VALIDATION
// =============================================================================

/**
 * Validate component against design system
 */
export function validateComponent(component: {
  className?: string;
  spacing?: string[];
  colors?: string[];
}): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate spacing
  component.spacing?.forEach((spacing) => {
    if (!validateSpacing(spacing)) {
      warnings.push(`Spacing "${spacing}" may not follow 4px base unit system`);
    }
  });

  // Check for design system classes
  const designSystemClassList = Object.values(cssClasses);
  
  if (component.className) {
    const hasDesignSystemClass = designSystemClassList.some((cls) =>
      component.className?.includes(cls)
    );
    if (!hasDesignSystemClass) {
      warnings.push('Consider using design system classes for consistency');
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

// =============================================================================
// ANIMATION UTILITIES
// =============================================================================

/**
 * Get animation timing recommendations
 */
export function getAnimationTiming(purpose: 'interaction' | 'transition' | 'deliberate'): {
  duration: number;
  easing: string;
  description: string;
} {
  const timings = {
    interaction: { duration: 300, easing: 'ease-in-out', description: 'Quick feedback for buttons, hovers' },
    transition: { duration: 600, easing: 'ease-out', description: 'Page transitions, section reveals' },
    deliberate: { duration: 1000, easing: 'ease-in-out', description: 'Important moments, deliberate motion' },
  };
  return timings[purpose];
}

/**
 * Get stagger delay for sequential animations
 */
export function getStaggerDelay(index: number, baseDelay = 100): number {
  return index * baseDelay;
}

// =============================================================================
// EXPORT
// =============================================================================

export const designUtils = {
  // Color utilities
  hexToRgb,
  getLuminance,
  calculateContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  getContrastLevel,
  checkDesignSystemContrast,
  // Spacing utilities
  validateSpacing,
  getSpacingScale,
  getClosestSpacing,
  getNextSpacing,
  getPreviousSpacing,
  pxToTailwind,
  tailwindToPx,
  getSpacingRecommendation,
  // Design principles
  checkDesignPrinciples,
  // Techniques & references
  getDesignTechniques,
  getTechniqueCategories,
  getDesignReferences,
  // Elevation
  applyDesignElevation,
  validateComponent,
  // Animation
  getAnimationTiming,
  getStaggerDelay,
};

export default designUtils;
