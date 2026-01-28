# Technique Catalog

## Comprehensive Visual Techniques Organized by Purpose

This catalog contains 400+ visual techniques organized by what they achieve. Select 1-2 techniques to apply strongly rather than many weakly. Each technique includes when to use it, how to implement it, and examples.

---

## Typography as Form

### Display Typography
**Purpose**: Create immediate visual impact, establish hierarchy

- **Oversized headings**: 4xl-6xl for hero sections, creates dominance
- **Gradient text**: `bg-gradient-to-r from-accent to-teal-300 bg-clip-text text-transparent`
- **Letter spacing variation**: `tracking-tight` for headings, `tracking-wide` for emphasis
- **Font weight contrast**: Bold headings (700-900) vs regular body (400)
- **Mixed case**: `text-transform: uppercase` for labels, mixed for headings
- **Text shadows**: Subtle shadows for depth: `text-shadow: 0 2px 4px rgba(0,0,0,0.1)`
- **Text outlines**: Stroke text for impact: `-webkit-text-stroke: 1px color`
- **Layered text**: Multiple text layers with different opacities
- **Animated text**: Typewriter effect, fade-in, slide-up
- **Text on image**: Overlay text on backgrounds with backdrop blur

### Body Typography
**Purpose**: Optimize readability, create comfortable reading experience

- **Optimal line length**: 45-75 characters per line
- **Line height rhythm**: 1.5-1.75 for body, 1.2-1.4 for headings
- **Paragraph spacing**: 1.5x line-height between paragraphs
- **Font feature settings**: `font-feature-settings: "rlig" 1, "calt" 1` for ligatures
- **Text balance**: `text-wrap: balance` for headings to prevent awkward breaks
- **Hyphenation**: `hyphens: auto` for justified text
- **Text selection styling**: Custom `::selection` colors
- **Reading width**: Max-width containers (65ch for body text)

### Typography Hierarchy
**Purpose**: Guide eye flow, establish information priority

- **Size scale**: 2xl, 3xl, 4xl, 5xl, 6xl with consistent ratios
- **Weight scale**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Color hierarchy**: Primary text (high contrast), secondary (medium), muted (low)
- **Spacing hierarchy**: Larger gaps above headings, tighter within sections
- **Font family variation**: Serif for headings, sans-serif for body (or vice versa)

---

## Color Phenomena

### Color Psychology
**Purpose**: Evoke specific emotions, communicate meaning

- **Warm colors**: Red, orange, yellow (energy, warmth, urgency)
- **Cool colors**: Blue, green, teal (calm, trust, growth)
- **Neutral colors**: Gray, beige, white (balance, sophistication)
- **Accent colors**: Single bright color for actions (Astroline: teal #4ECDC4)
- **Monochromatic**: Single hue with varying saturation/lightness
- **Analogous**: Adjacent colors on color wheel (harmonious)
- **Complementary**: Opposite colors (high contrast, energy)
- **Triadic**: Three evenly spaced colors (balanced, vibrant)

### Color Techniques
**Purpose**: Create depth, hierarchy, visual interest

- **Opacity layers**: `white/10`, `accent/30` for depth without new colors
- **Gradient overlays**: `bg-gradient-to-r from-color1/50 to-color2/50`
- **Color stops**: Precise gradient stops (not default): `from-accent via-teal-300 to-purple-400`
- **Duotone**: Two-color treatment for images
- **Color blocking**: Large areas of solid color for impact
- **Color transitions**: Smooth color changes on hover/interaction
- **Tinted backgrounds**: Subtle color tint on white/black backgrounds
- **Color harmony**: Using color theory (complementary, triadic, etc.)

### Contrast Techniques
**Purpose**: Ensure readability, create emphasis

- **High contrast**: 7:1+ for body text (WCAG AAA)
- **Medium contrast**: 4.5:1 for body text (WCAG AA)
- **Low contrast**: 3:1 for large text (WCAG AA)
- **Contrast inversion**: Light text on dark, dark on light
- **Contrast for emphasis**: High contrast for CTAs, low for secondary

---

## Depth Illusion

### Layering Techniques
**Purpose**: Create visual depth, establish hierarchy

- **Z-index stacking**: Multiple layers with different z-index values
- **Opacity stacking**: Layers with decreasing opacity create depth
- **Blur stacking**: Background blur (`backdrop-blur-sm`) creates separation
- **Shadow stacking**: Multiple shadows for realistic depth
- **Border stacking**: Multiple borders with different colors/widths

### Shadow Techniques
**Purpose**: Suggest elevation, create depth perception

- **Drop shadows**: `shadow-lg` for cards, creates lift
- **Inner shadows**: `shadow-inner` for inset elements
- **Colored shadows**: `shadow-accent/30` for glow effects
- **Multiple shadows**: Combining multiple shadow values
- **Soft shadows**: Large blur radius, low opacity (realistic)
- **Hard shadows**: Small blur radius, high opacity (graphic)
- **Directional shadows**: Shadows that suggest light source
- **Glow shadows**: `shadow-glow` for accent elements

### Glass Morphism
**Purpose**: Modern depth, maintain visibility

- **Backdrop blur**: `backdrop-blur-sm` to `backdrop-blur-xl`
- **Semi-transparent backgrounds**: `bg-white/5` to `bg-white/20`
- **Border highlights**: `border-white/10` to `border-white/30`
- **Layered glass**: Multiple glass layers for depth
- **Glass cards**: Complete glass morphism implementation (Astroline signature)

### 3D Effects
**Purpose**: Create dimensional appearance

- **Perspective**: `perspective-1000` for 3D transforms
- **Transform 3D**: `transform: translateZ()` for depth
- **Rotate 3D**: `rotateX()`, `rotateY()`, `rotateZ()` for 3D rotation
- **Scale depth**: Different scale values suggest depth
- **Parallax**: Background moves slower than foreground

---

## Texture Quality

### Visual Texture
**Purpose**: Add tactile quality, prevent flatness

- **Noise texture**: SVG noise overlay with low opacity (0.03)
- **Grain texture**: Film grain effect for vintage feel
- **Paper texture**: Subtle paper-like texture overlay
- **Fabric texture**: Woven or fabric-like patterns
- **Metal texture**: Brushed metal or metallic finishes

### Pattern Techniques
**Purpose**: Add visual interest, create rhythm

- **Geometric patterns**: Dots, lines, grids as backgrounds
- **Organic patterns**: Flowing, natural patterns
- **Repeating patterns**: Seamless tileable patterns
- **Pattern opacity**: Low opacity patterns (5-10%) for subtlety
- **Pattern scale**: Varying pattern sizes for interest

### Surface Quality
**Purpose**: Suggest material properties

- **Matte finish**: No shine, soft appearance
- **Glossy finish**: Reflective, shiny appearance
- **Rough texture**: Uneven, tactile surface
- **Smooth texture**: Even, polished surface
- **Metallic finish**: Reflective, metal-like appearance

---

## Motion & Animation

### Entrance Animations
**Purpose**: Draw attention, create delight

- **Fade in**: `opacity: 0 → 1` with `duration-300`
- **Slide up**: `translateY(20px) → 0` with `ease-out`
- **Slide in**: `translateX(-20px) → 0` from left
- **Scale in**: `scale(0.9) → 1` with spring effect
- **Rotate in**: `rotate(-5deg) → 0` with fade
- **Stagger**: Sequential animations with 100ms delays
- **Typewriter**: Character-by-character reveal
- **Reveal**: Clip-path or mask reveal

### Hover Animations
**Purpose**: Provide feedback, encourage interaction

- **Scale up**: `scale(1) → 1.05` on hover
- **Lift**: `translateY(0) → -4px` with shadow increase
- **Glow**: Shadow intensity increase on hover
- **Color shift**: Color change on hover
- **Border animation**: Border width/color change
- **Background shift**: Background position/color change
- **Icon animation**: Icon rotation, scale, or color change

### Loading Animations
**Purpose**: Indicate progress, maintain engagement

- **Skeleton loaders**: Placeholder content with shimmer
- **Spinner**: Rotating indicator
- **Progress bar**: Linear progress indicator
- **Pulse**: Breathing animation for loading states
- **Shimmer**: Shining effect across surface
- **Wave**: Wave-like loading animation

### Micro-interactions
**Purpose**: Delight users, provide feedback

- **Button press**: Scale down on click (`scale(0.98)`)
- **Checkmark**: Animated checkmark on success
- **Ripple effect**: Expanding circle on click
- **Magnetic cursor**: Element follows cursor slightly
- **Hover spotlight**: Light follows cursor on hover
- **Smooth scroll**: Eased scrolling behavior

### Animation Principles
**Purpose**: Create natural, pleasing motion

- **Easing functions**: `ease-in-out` (natural), `ease-out` (entrance), `ease-in` (exit)
- **Duration**: 300ms (quick), 600ms (standard), 1000ms (deliberate)
- **Spring physics**: Natural bounce with spring animations
- **Stagger timing**: 100ms increments for sequential animations
- **Reduced motion**: Respect `prefers-reduced-motion`

---

## Spatial Composition

### Grid Systems
**Purpose**: Create order, ensure consistency

- **12-column grid**: Standard web grid system
- **8px base unit**: All spacing multiples of 8px
- **4px base unit**: Finer control (Astroline uses this)
- **Golden ratio grid**: 1.618 proportions
- **Fibonacci grid**: Natural proportions
- **Asymmetric grid**: Intentional imbalance for interest

### Alignment Techniques
**Purpose**: Create order, guide eye

- **Left alignment**: Natural reading flow (LTR languages)
- **Center alignment**: Formal, balanced (headings, CTAs)
- **Right alignment**: Unconventional, modern (decorative)
- **Justified text**: Even edges (use carefully, can create rivers)
- **Baseline alignment**: Text sits on consistent baseline
- **Edge alignment**: Elements align to container edges

### Proximity & Grouping
**Purpose**: Show relationships, create hierarchy

- **Related grouping**: Related items close together (Gestalt)
- **Visual separation**: Unrelated items far apart
- **Card grouping**: Related content in cards
- **Section spacing**: Large gaps between sections (py-20)
- **Component spacing**: Tighter gaps within components (gap-4)

### White Space
**Purpose**: Create breathing room, emphasize content

- **Generous padding**: `px-6 py-8` or larger for breathing room
- **Section gaps**: `py-20` or larger between major sections
- **Component gaps**: `gap-4` to `gap-8` within components
- **Marginal space**: Space around entire layout
- **Negative space**: Intentional empty areas for focus

### Layout Patterns
**Purpose**: Organize content effectively

- **F-pattern**: Eye follows F shape (text-heavy)
- **Z-pattern**: Eye follows Z shape (CTA-focused)
- **Grid layout**: Equal-sized cards in grid
- **Masonry layout**: Pinterest-style staggered grid
- **Asymmetric layout**: Intentional imbalance
- **Centered layout**: Symmetrical, formal
- **Full-bleed**: Content extends to edges

---

## Visual Effects

### Blur Effects
**Purpose**: Create depth, focus attention

- **Background blur**: `backdrop-blur-sm` to `backdrop-blur-xl`
- **Gaussian blur**: Soft, natural blur
- **Motion blur**: Directional blur for motion
- **Selective blur**: Blur background, sharp foreground
- **Layered blur**: Multiple blur levels

### Glow Effects
**Purpose**: Draw attention, create energy

- **Box shadow glow**: `shadow-glow` with colored shadow
- **Text glow**: `text-shadow` with colored glow
- **Pulsing glow**: Animated glow intensity
- **Gradient glow**: Glow with gradient colors
- **Multi-color glow**: Multiple colored glows

### Gradient Techniques
**Purpose**: Add visual interest, create depth

- **Linear gradients**: `bg-gradient-to-r` (horizontal)
- **Radial gradients**: `bg-gradient-radial` (circular)
- **Conic gradients**: Angular gradients
- **Multi-stop gradients**: 3+ color stops
- **Gradient overlays**: Gradients over images
- **Animated gradients**: Moving gradient positions
- **Mesh gradients**: Complex, organic gradients

### Overlay Techniques
**Purpose**: Add depth, improve readability

- **Dark overlay**: Dark layer over images for text readability
- **Light overlay**: Light layer for contrast
- **Gradient overlay**: Gradient for smooth transition
- **Color overlay**: Tinted overlay for mood
- **Pattern overlay**: Pattern for texture
- **Noise overlay**: Subtle noise for texture

---

## Responsive Design Techniques

### Breakpoint Strategy
**Purpose**: Adapt to different screen sizes

- **Mobile-first**: Design for mobile, enhance for larger
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Fluid typography**: `clamp()` for responsive text
- **Container queries**: Size based on container, not viewport
- **Aspect ratio**: Maintain proportions across sizes

### Adaptive Layouts
**Purpose**: Optimize for each device

- **Stack on mobile**: Vertical stacking on small screens
- **Grid on desktop**: Multi-column on large screens
- **Hide on mobile**: `hidden md:block` for desktop-only
- **Show on mobile**: `block md:hidden` for mobile-only
- **Responsive spacing**: Smaller padding on mobile

### Touch Optimization
**Purpose**: Optimize for touch interfaces

- **Touch targets**: Minimum 44x44px for touch
- **Spacing between**: Adequate space between touch targets
- **Swipe gestures**: Support swipe navigation
- **Pull to refresh**: Mobile interaction pattern

---

## Accessibility Techniques

### Color Accessibility
**Purpose**: Ensure colorblind-friendly design

- **Contrast ratios**: WCAG AA (4.5:1) or AAA (7:1)
- **Not color alone**: Use icons, text, patterns with color
- **Colorblind testing**: Test with colorblind simulators
- **High contrast mode**: Support system high contrast

### Typography Accessibility
**Purpose**: Ensure readable text

- **Font size**: Minimum 16px for body text
- **Line height**: 1.5 minimum for readability
- **Line length**: 45-75 characters optimal
- **Font weight**: 400 minimum for body text
- **Text scaling**: Support up to 200% zoom

### Interaction Accessibility
**Purpose**: Ensure usable interactions

- **Focus indicators**: Visible focus states
- **Keyboard navigation**: All interactions keyboard-accessible
- **Screen reader support**: Semantic HTML, ARIA labels
- **Reduced motion**: Respect `prefers-reduced-motion`

---

## Astroline-Specific Techniques

### Cosmic Theme
**Purpose**: Create mystical, space-like atmosphere

- **Star field**: Animated star background
- **Floating stars**: Individual animated stars
- **Cosmic gradients**: Purple, teal, blue gradients
- **Glowing orbs**: Radial gradients with blur
- **Aurora effect**: Shifting gradient overlays

### Glass Morphism (Signature)
**Purpose**: Modern depth, maintain visibility

- **Glass cards**: `glass` class with backdrop blur
- **Strong glass**: `glass-strong` for emphasis
- **Layered glass**: Multiple glass layers
- **Glass buttons**: Glass effect on interactive elements

### Gradient Text (Signature)
**Purpose**: Create visual interest, brand identity

- **Accent gradient**: `gradient-text` (accent to teal)
- **Cosmic gradient**: `gradient-text-cosmic` (purple to pink)
- **Animated gradient**: Moving gradient positions

### Glow Effects (Signature)
**Purpose**: Draw attention, create energy

- **Glow shadow**: `shadow-glow` for cards
- **Hover glow**: `glow-hover` for interactions
- **Pulsing glow**: `pulse-glow` animation
- **Accent glow**: Colored glow matching accent

---

## Technique Selection Guidelines

### Choose 1-2 Techniques Strongly
- Don't apply many techniques weakly
- Select techniques that serve the purpose
- Apply chosen techniques with confidence
- Let other elements be subtle

### Technique Combinations
- **Glass + Glow**: Modern depth (Astroline cards)
- **Gradient Text + Animation**: Dynamic headings
- **Stars + Blur**: Cosmic atmosphere
- **Typography + Spacing**: Readable hierarchy

### When to Use Each Category
- **Typography**: For text-heavy sections, hero sections
- **Color**: For mood, hierarchy, actions
- **Depth**: For cards, modals, layered content
- **Texture**: For backgrounds, surfaces
- **Motion**: For interactions, loading, delight
- **Space**: For all layouts, always important
- **Effects**: For emphasis, atmosphere

---

*Select techniques purposefully. Apply 1-2 strongly rather than many weakly.*
