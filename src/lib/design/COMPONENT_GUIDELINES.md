# Component Design Guidelines

## Design Patterns and Rules for Astroline Components

This guide provides specific design patterns, spacing rules, animation guidelines, and accessibility requirements for building components in the Astroline design system.

---

## Design Patterns

### Glass Morphism Cards
**Signature pattern for Astroline**

#### Implementation
```tsx
<div className="glass rounded-2xl p-6">
  {/* Content */}
</div>
```

#### Rules
- **Background**: `bg-white/5` with `backdrop-blur-sm`
- **Border**: `border border-white/10`
- **Border radius**: `rounded-2xl` (1rem)
- **Padding**: `p-6` (1.5rem) minimum, scale up for larger cards
- **Hover**: `hover:border-accent/30 hover:bg-white/[0.07]`
- **Use for**: Content cards, feature cards, information containers

#### Variations
- **Strong glass**: `glass-strong` for emphasis (higher opacity, more blur)
- **Interactive**: Add `cursor-pointer` and hover effects
- **Selected**: Add `card-selected` class for active states

---

### Gradient Text
**Signature pattern for headings**

#### Implementation
```tsx
<h1 className="gradient-text">
  Your Heading
</h1>
```

#### Rules
- **Class**: `gradient-text` (accent to teal) or `gradient-text-cosmic` (purple to pink)
- **Use for**: Primary headings, hero text, emphasis
- **Don't use for**: Body text, long paragraphs
- **Contrast**: Ensure background provides enough contrast

#### Variations
- **Accent gradient**: `gradient-text` - teal gradient (primary)
- **Cosmic gradient**: `gradient-text-cosmic` - purple/pink gradient (special)

---

### Button Patterns
**Consistent button styles**

#### Primary Button
```tsx
<button className="btn-primary">
  Action
</button>
```

#### Rules
- **Background**: Gradient from accent to teal
- **Padding**: `px-6 py-3` (mobile), `px-8 py-4` (desktop)
- **Border radius**: `rounded-full`
- **Shadow**: `shadow-glow` for emphasis
- **Hover**: Scale up (`scale-105`), increase shadow
- **Use for**: Primary CTAs, main actions

#### Secondary Button
```tsx
<button className="btn-secondary">
  Secondary Action
</button>
```

#### Rules
- **Style**: Outlined with accent border
- **Padding**: `px-4 py-2.5` (mobile), `px-6 py-3` (desktop)
- **Border radius**: `rounded-full`
- **Hover**: Background tint, border brightens
- **Use for**: Secondary actions, alternative options

#### Ghost Button
```tsx
<button className="btn-ghost">
  Tertiary Action
</button>
```

#### Rules
- **Style**: Minimal, text-only
- **Padding**: `px-3 py-1.5` (mobile), `px-4 py-2` (desktop)
- **Hover**: Subtle background tint
- **Use for**: Tertiary actions, less important options

---

### Input Patterns
**Form input styling**

#### Implementation
```tsx
<input className="input-default" />
```

#### Rules
- **Background**: `bg-white/5`
- **Border**: `border border-white/20`
- **Border radius**: `rounded-xl`
- **Padding**: `px-4 py-3`
- **Focus**: `focus:border-accent focus:ring-2 focus:ring-accent/20`
- **Placeholder**: `placeholder-white/40`

---

### Section Patterns
**Consistent section layouts**

#### Standard Section
```tsx
<section className="py-20 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

#### Rules
- **Vertical padding**: `py-20` (5rem) between major sections
- **Horizontal padding**: `px-4` (mobile), `px-6` (desktop)
- **Max width**: `max-w-7xl` for content, `max-w-4xl` for text
- **Centering**: `mx-auto` for centered layouts

#### Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center">
  {/* Background elements */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

#### Rules
- **Height**: `min-h-screen` for full viewport
- **Background**: Cosmic elements (stars, orbs, gradients)
- **Z-index**: Background `z-0`, content `z-10`
- **Centering**: Flexbox centering for content

---

## Spacing System

### Base Unit
**4px base unit** (0.25rem)

### Spacing Scale
- **4px** (0.25rem) - `gap-1`, `p-1` - Tight spacing
- **8px** (0.5rem) - `gap-2`, `p-2` - Component internal spacing
- **12px** (0.75rem) - `gap-3`, `p-3` - Small gaps
- **16px** (1rem) - `gap-4`, `p-4` - Standard spacing
- **20px** (1.25rem) - `gap-5`, `p-5` - Medium spacing
- **24px** (1.5rem) - `gap-6`, `p-6` - Card padding
- **32px** (2rem) - `gap-8`, `p-8` - Large spacing
- **40px** (2.5rem) - `gap-10`, `p-10` - Extra large spacing
- **48px** (3rem) - `gap-12`, `p-12` - Section spacing
- **64px** (4rem) - `gap-16`, `p-16` - Major spacing
- **80px** (5rem) - `py-20` - Section vertical padding

### Spacing Rules
1. **Consistency**: Use scale values, not arbitrary numbers
2. **Rhythm**: Maintain consistent spacing rhythm
3. **Proximity**: Related items close (small gaps), unrelated far (large gaps)
4. **Responsive**: Scale spacing appropriately (smaller on mobile)

### Spacing Examples
```tsx
// Component internal spacing
<div className="flex gap-4 p-6">
  {/* 16px gap, 24px padding */}
</div>

// Section spacing
<section className="py-20">
  {/* 80px vertical padding */}
</section>

// Card spacing
<div className="glass p-6 mb-8">
  {/* 24px padding, 32px margin bottom */}
</div>
```

---

## Typography Rules

### Font Families
- **Headings**: `font-heading` (Philosopher - serif)
- **Body**: `font-sans` (Nunito - sans-serif)

### Font Sizes
- **Hero**: `text-4xl md:text-5xl lg:text-6xl` or `clamp(1.75rem, 4vw + 0.5rem, 3.5rem)`
- **H1**: `text-4xl md:text-5xl lg:text-6xl`
- **H2**: `text-3xl md:text-4xl`
- **H3**: `text-2xl md:text-3xl`
- **H4**: `text-xl md:text-2xl`
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Font Weights
- **Headings**: `font-bold` (700) or `font-semibold` (600)
- **Body**: `font-normal` (400) or `font-medium` (500)
- **Emphasis**: `font-semibold` (600)

### Line Heights
- **Headings**: `leading-tight` (1.25)
- **Body**: `leading-normal` (1.5) or `leading-relaxed` (1.75)
- **Display**: `leading-none` (1) for large text

### Letter Spacing
- **Headings**: `tracking-tight` (-0.025em)
- **Body**: Default (0)
- **Labels**: `tracking-wide` (0.025em) for uppercase

### Typography Rules
1. **Hierarchy**: Clear size differences (2-3x ratio)
2. **Readability**: 45-75 characters per line
3. **Balance**: Use `text-balance` for headings
4. **Contrast**: Ensure WCAG AA contrast (4.5:1)

---

## Color Usage

### Color Palette
- **Background**: `bg-background` (#0a0f1a)
- **Background Secondary**: `bg-background-secondary` (#1a2f3a)
- **Accent**: `bg-accent` (#4ECDC4)
- **Text Primary**: `text-text-primary` (#f0f0f0)
- **Text Secondary**: `text-text-secondary` (#a0a0a0)
- **Text Muted**: `text-text-muted` (#6b7280)

### Color Rules
1. **Semantic meaning**: Colors carry meaning (accent = action)
2. **Contrast**: Ensure WCAG AA contrast (4.5:1 for body)
3. **Opacity layers**: Use opacity for depth (`white/10`, `accent/30`)
4. **Consistency**: Use palette colors, not arbitrary values

### Color Usage Examples
```tsx
// Primary action
<button className="bg-accent text-background">

// Secondary text
<p className="text-text-secondary">

// Glass effect
<div className="bg-white/5 border-white/10">

// Accent glow
<div className="shadow-glow border-accent/30">
```

---

## Animation Guidelines

### Animation Timing
- **Quick interactions**: 300ms (`duration-300`)
- **Standard transitions**: 600ms (`duration-600`)
- **Deliberate animations**: 1000ms (`duration-1000`)

### Easing Functions
- **Natural motion**: `ease-in-out` (most common)
- **Entrances**: `ease-out` (start fast, end slow)
- **Exits**: `ease-in` (start slow, end fast)
- **Spring physics**: Use Framer Motion spring for natural feel

### Animation Patterns

#### Hover Animations
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  className="transition-all duration-300"
>
```

#### Entrance Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "ease-out" }}
>
```

#### Stagger Animations
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1, duration: 0.6 }}
  >
))}
```

### Animation Rules
1. **Purposeful**: Every animation serves a function
2. **Consistent**: Use standard timing (300ms, 600ms)
3. **Smooth**: Use appropriate easing
4. **Accessible**: Respect `prefers-reduced-motion`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Layout Patterns

### Container Patterns
```tsx
// Full width with max content width
<div className="w-full max-w-7xl mx-auto px-4 md:px-6">

// Text container (optimal reading width)
<div className="max-w-3xl mx-auto">

// Grid container
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Flexbox Patterns
```tsx
// Centered content
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Responsive column/row
<div className="flex flex-col md:flex-row gap-4">
```

### Grid Patterns
```tsx
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
```

---

## Responsive Design

### Breakpoints
- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (extra large)

### Mobile-First Approach
```tsx
// Mobile first, enhance for larger
<div className="text-base md:text-lg lg:text-xl">
<div className="px-4 md:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Responsive Rules
1. **Mobile-first**: Design for mobile, enhance for larger
2. **Fluid typography**: Use `clamp()` for responsive text
3. **Flexible layouts**: Use flexbox/grid for adaptability
4. **Touch targets**: Minimum 44x44px for touch

---

## Accessibility Requirements

### Color Contrast
- **Body text**: WCAG AA (4.5:1 contrast ratio)
- **Large text**: WCAG AA (3:1 contrast ratio)
- **Interactive elements**: High contrast for visibility

### Focus Indicators
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
```

### Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order
- Skip links for main content

### Screen Reader Support
```tsx
// Semantic HTML
<button aria-label="Close dialog">
  <X />
</button>

// ARIA labels
<div role="region" aria-label="Main content">
```

### Accessibility Checklist
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Reduced motion respected
- [ ] Touch targets minimum 44x44px

---

## Component-Specific Guidelines

### Cards
- Use `glass` class for glass morphism
- Minimum padding `p-6`
- Border radius `rounded-2xl`
- Hover effects for interactivity

### Buttons
- Use button classes (`btn-primary`, `btn-secondary`, `btn-ghost`)
- Minimum touch target 44x44px
- Clear focus states
- Loading states for async actions

### Forms
- Use `input-default` class
- Clear labels and placeholders
- Error states visible
- Success feedback

### Navigation
- Clear hierarchy
- Active states visible
- Mobile-friendly (hamburger menu)
- Accessible keyboard navigation

---

## Quality Checklist

Before finalizing any component:

- [ ] Follows spacing system (4px base unit)
- [ ] Uses design system colors
- [ ] Typography follows hierarchy
- [ ] Animations are purposeful and smooth
- [ ] Responsive on all breakpoints
- [ ] Accessible (contrast, keyboard, screen reader)
- [ ] Uses signature patterns (glass, gradients)
- [ ] Consistent with other components
- [ ] Performance optimized
- [ ] Tested in different browsers

---

*Follow these guidelines to ensure consistent, high-quality components across Astroline.*
