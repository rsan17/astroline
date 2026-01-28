# Design Review Checklist

## Pre and Post-Implementation Review Questions

Use this checklist before starting design work and after implementation to ensure quality and consistency with the Astroline design system.

---

## Pre-Implementation Checklist

### Purpose & Goals
- [ ] What is this component/section for?
- [ ] What user goal does it serve?
- [ ] What information must be communicated?
- [ ] What action should the user take?
- [ ] What emotion should this evoke?

### Design System Alignment
- [ ] Have I reviewed [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)?
- [ ] Have I consulted [REFERENCE_LIBRARY.md](./REFERENCE_LIBRARY.md)?
- [ ] Have I reviewed [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md)?
- [ ] Do I understand the spacing system (4px base unit)?
- [ ] Do I know which colors to use from the palette?
- [ ] Have I reviewed similar components for consistency?

### Technique Selection
- [ ] Have I reviewed [TECHNIQUE_CATALOG.md](./TECHNIQUE_CATALOG.md)?
- [ ] Have I selected 1-2 techniques to apply strongly?
- [ ] Do the selected techniques serve the purpose?
- [ ] Am I avoiding applying many techniques weakly?

### Planning
- [ ] Have I sketched or wireframed the design?
- [ ] Have I identified signature elements to include?
- [ ] Have I planned responsive behavior?
- [ ] Have I considered accessibility requirements?
- [ ] Have I planned animation timing and easing?

---

## Post-Implementation Checklist

### Design Interrogation (Level 1-5)

#### Level 1: First Principles
- [ ] Does this achieve its stated purpose?
- [ ] Does it serve the user's goal?
- [ ] Is all required information present?
- [ ] Is the desired action clear?
- [ ] Does it evoke the intended emotion?

#### Level 2: Element Analysis

**Typography**
- [ ] Is every font choice intentional?
- [ ] Does typography hierarchy guide the eye?
- [ ] Is text readable (45-75 characters per line)?
- [ ] Are line heights appropriate (1.5-1.75 for body)?
- [ ] Is letter spacing refined?
- [ ] Does text use `text-balance` where appropriate?

**Color**
- [ ] Does every color serve a purpose?
- [ ] Are contrast ratios WCAG AA compliant (4.5:1)?
- [ ] Do colors follow semantic meaning (accent = action)?
- [ ] Are opacity layers intentional (`white/10`, `accent/30`)?
- [ ] Is the color palette consistent?

**Layout**
- [ ] Is there a consistent grid system?
- [ ] Are elements aligned to a system?
- [ ] Does visual hierarchy guide the eye naturally?
- [ ] Is white space used intentionally?
- [ ] Are related items grouped (proximity)?

**Spacing**
- [ ] Does spacing follow the 4px base unit system?
- [ ] Is spacing consistent throughout?
- [ ] Is there visual rhythm?
- [ ] Does spacing scale appropriately on mobile?
- [ ] Are section gaps appropriate (`py-20`)?

**Imagery/Icons**
- [ ] Does every image/icon add meaning?
- [ ] Are images consistent in style?
- [ ] Are icons from the same set (lucide-react)?
- [ ] Are sizes appropriate for importance?

#### Level 3: Reference Checking
- [ ] What would Stripe do here? (clarity, spacing)
- [ ] What would Linear do here? (minimalism, precision)
- [ ] What would Apple do here? (restraint, focus)
- [ ] Does this follow Swiss design principles? (grid, hierarchy)
- [ ] Could this learn from Bauhaus? (form follows function)

#### Level 4: Uniqueness Assessment
- [ ] Does this feel hand-crafted, not template-based?
- [ ] Does it reflect Astroline's cosmic personality?
- [ ] Are signature elements present? (glass, gradients, stars)
- [ ] Would a designer recognize this as Astroline?
- [ ] Are there unique touches beyond defaults?

#### Level 5: Removal Testing
- [ ] Can I remove any decorative elements?
- [ ] Can the color palette be reduced?
- [ ] Can spacing be tighter without losing meaning?
- [ ] Are all animations essential?
- [ ] Is every element necessary?

### Design System Compliance

#### Spacing System
- [ ] Uses 4px base unit (0.25rem multiples)
- [ ] Follows spacing scale (4px, 8px, 12px, 16px, etc.)
- [ ] Maintains consistent rhythm
- [ ] Responsive spacing appropriate

#### Color System
- [ ] Uses design system colors (not arbitrary)
- [ ] Follows semantic meaning
- [ ] Maintains contrast requirements
- [ ] Uses opacity layers appropriately

#### Typography System
- [ ] Uses design system fonts (Philosopher, Nunito)
- [ ] Follows size hierarchy
- [ ] Uses appropriate weights
- [ ] Maintains line height rhythm

#### Component Patterns
- [ ] Uses signature patterns (glass, gradients)
- [ ] Follows button patterns (`btn-primary`, etc.)
- [ ] Uses input patterns (`input-default`)
- [ ] Follows section patterns

### Visual Quality

#### Polish
- [ ] Typography is refined (spacing, balance)
- [ ] Colors are precise (exact values, not rounded)
- [ ] Spacing is exact (not approximate)
- [ ] Animations are smooth (proper timing, easing)
- [ ] Borders and shadows are refined

#### Consistency
- [ ] Matches other components in style
- [ ] Uses same spacing system
- [ ] Uses same color palette
- [ ] Uses same typography scale
- [ ] Follows same animation patterns

#### Restraint
- [ ] Bold elements balanced by subtle ones
- [ ] No more than 2-3 elements competing for attention
- [ ] Clear visual hierarchy
- [ ] Restraint maintained throughout

### Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] Works on large desktop (1280px+)
- [ ] Touch targets minimum 44x44px
- [ ] Text is readable at all sizes
- [ ] Spacing scales appropriately
- [ ] Layout adapts gracefully

### Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader labels present (ARIA)
- [ ] Reduced motion respected
- [ ] Touch targets adequate (44x44px minimum)
- [ ] Semantic HTML used
- [ ] Alt text for images

### Performance
- [ ] Animations are performant (GPU-accelerated)
- [ ] Images are optimized
- [ ] No layout shift (CLS)
- [ ] Fast load time
- [ ] Smooth interactions (60fps)

### Animation Quality
- [ ] Animations are purposeful (not decorative)
- [ ] Timing is consistent (300ms, 600ms)
- [ ] Easing is appropriate (`ease-in-out`)
- [ ] Stagger delays are consistent (100ms increments)
- [ ] Reduced motion is respected
- [ ] Animations enhance, not distract

### Signature Elements
- [ ] Glass morphism where appropriate
- [ ] Gradient text for headings
- [ ] Cosmic theme elements (stars, orbs)
- [ ] Glow effects for emphasis
- [ ] Astroline personality reflected

---

## Quality Gates

### Must Pass (Blocking)
- [ ] Purpose is clear and achieved
- [ ] WCAG AA contrast compliance
- [ ] Keyboard navigation works
- [ ] Responsive on all breakpoints
- [ ] Uses design system patterns
- [ ] No template-based feel

### Should Pass (Recommended)
- [ ] All five interrogation levels pass
- [ ] Signature elements present
- [ ] Animations are smooth
- [ ] Spacing is consistent
- [ ] Typography is refined
- [ ] Restraint is maintained

### Nice to Have (Optional)
- [ ] Unique touches beyond defaults
- [ ] Advanced techniques applied
- [ ] Perfect polish on all details
- [ ] Performance optimized
- [ ] WCAG AAA compliance

---

## Review Process

### Self-Review
1. Complete pre-implementation checklist
2. Implement design
3. Complete post-implementation checklist
4. Fix any blocking issues
5. Refine based on recommendations

### Peer Review
1. Share component with team
2. Review against checklist
3. Discuss findings
4. Iterate based on feedback
5. Re-review until quality gates pass

### Design System Review
1. Compare to design system documentation
2. Verify compliance with guidelines
3. Check consistency with other components
4. Ensure signature elements present
5. Confirm uniqueness and polish

---

## Common Issues & Solutions

### Spacing Issues
- **Problem**: Inconsistent spacing, arbitrary values
- **Solution**: Use 4px base unit system, follow scale
- **Check**: Verify all spacing uses scale values

### Color Issues
- **Problem**: Arbitrary colors, poor contrast
- **Solution**: Use design system palette, check contrast
- **Check**: Verify WCAG AA compliance

### Typography Issues
- **Problem**: Poor hierarchy, unreadable text
- **Solution**: Follow typography scale, ensure readability
- **Check**: Verify line length, line height, contrast

### Animation Issues
- **Problem**: Distracting, inconsistent timing
- **Solution**: Use standard timing (300ms, 600ms), purposeful motion
- **Check**: Verify reduced motion support

### Responsive Issues
- **Problem**: Doesn't work on mobile, poor scaling
- **Solution**: Mobile-first approach, test all breakpoints
- **Check**: Verify touch targets, readability

---

## Quick Reference

### Before Starting
1. Review purpose and goals
2. Consult design system docs
3. Select 1-2 techniques
4. Plan responsive behavior

### After Implementation
1. Run five-level interrogation
2. Verify design system compliance
3. Check responsive design
4. Verify accessibility
5. Confirm signature elements

### Before Shipping
1. All blocking issues resolved
2. Peer review completed
3. Quality gates passed
4. Documentation updated

---

*Use this checklist systematically to ensure every component meets Astroline's design standards.*
