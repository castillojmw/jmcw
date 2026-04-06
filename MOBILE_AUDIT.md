# Mobile Usability Audit Report

## Executive Summary

The portfolio site has several critical mobile usability issues, primarily around **typography sizing** and **touch target dimensions**. The desktop experience is polished, but mobile visitors will encounter unreadable text, undersized interactive elements, and navigation friction.

---

## Priority 1: Critical Typography Issues

### 1.1 Body Text is Dangerously Small on Mobile

**File:** `src/components/core/Typography/Typography.module.scss`

| Element | Desktop Base | Mobile (<480px) | WCAG Minimum |
|---------|-------------|-----------------|--------------|
| Body 4 | 0.625rem (10px) | **0.5rem (8px)** | 12px |
| Body 5 | 0.5rem (8px) | **0.375rem (6px)** | 12px |
| Body 6 | 0.4375rem (~7px) | **0.3125rem (5px)** | 12px |

**Impact:** Card descriptions (`Body level={4}`) render at **8px** on mobile. Navigation items using Body 5/6 are 6-8px. This is inaccessible and renders content unreadable.

**Affected Components:**
- `Card.tsx` — description uses `level={4}` (8px mobile)
- `Footer.tsx` — footer links use `level={5}` (6-8px mobile)
- `Header.tsx` — nav links have no mobile text size override

**Recommendation:**
```scss
// Mobile should have LARGEST text, not smallest
// Current: scales down. Should: scale up.
@media (--screen-xs) {
  .body1 { font-size: 1.125rem; }  // Already decent
  .body2 { font-size: 1rem; }
  .body3 { font-size: 0.875rem; }  // Was 0.75rem, bump up
  .body4 { font-size: 0.875rem; }  // Was 0.625rem (10px), FIX
  .body5 { font-size: 0.75rem; }   // Was 0.5rem (8px), FIX
  .body6 { font-size: 0.625rem; }  // Was 0.4375rem, FIX
}
```

### 1.2 Heading Scale is Inverted

**Issue:** Desktop base is 2rem, scaling UP to 5rem at md breakpoint. Mobile gets 3rem, which is larger than desktop base but smaller than tablet/desktop.

**Current:**
```
Base (no media query): H1 = 2rem
@media (--screen-xs): H1 = 3rem
@media (--screen-sm): H1 = 4rem
@media (--screen-md): H1 = 5rem
```

This is backwards — mobile gets a medium size while desktop gets the largest. For a full-viewport hero this might be intentional, but verify H1 is readable at 3rem on small screens.

---

## Priority 2: Touch Target Issues

### 2.1 Buttons Have Insufficient Touch Padding

**File:** `src/components/Button/Button.module.scss`

```scss
.button {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.6rem;   // 9.6px — too small
  padding-bottom: 0.6rem; // 9.6px — too small
}
```

**WCAG Requirement:** Touch targets should be at least 44x44px (Apple) or 48x48dp (Google).

**Current:** ~40px wide on mobile. Touch target fails on height.

**Recommendation:**
```scss
.button {
  padding: 0.875rem 1.5rem;  // Minimum 44px height
  min-height: 44px;
  min-width: 44px;
}
```

### 2.2 Header Navigation Not Mobile-Friendly

**File:** `src/components/Header/Header.tsx`

**Issue:** Navigation links display inline on all screens. No hamburger menu for mobile. On a 320px screen, 4 nav links + email icon will overflow or wrap badly.

**Current:** `useMediaQuery` checks for `max-width: ${BREAKPOINTS.md}` but applies same layout, just changes gap.

### 2.3 Card Touch Targets

**File:** `src/pages/Home/Home.tsx`

The entire card area is clickable, but the "Find out more here" text link inside `Card.tsx` is ~13px font with no extra touch padding.

---

## Priority 3: Layout & Spacing Issues

### 3.1 Section Padding Doesn't Scale for Mobile

**File:** `src/index.css`

```scss
.section {
  padding-left: 4rem;   // On 320px screen: 4rem = ~64px
  padding-right: 4rem;  // Leaves ~192px for content on a 320px screen
  margin-bottom: 16rem; // Excessive
}
```

**Recommendation:**
```scss
@media (max-width: 768px) {
  .section {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 8rem;
  }
}
```

### 3.2 Container Padding Insufficient

**File:** `src/index.css`

```scss
.container {
  padding: 0 2rem;  // 32px on each side for mobile
}
```

At 320px viewport, 64px total padding leaves 256px content area. Consider reducing to `1rem` (16px) on mobile.

### 3.3 Home Page Card Section Spacing

**File:** `src/pages/Home/Home.module.scss`

```scss
.cardContainer {
  grid-template-columns: 1fr;  // Good for mobile
}

section style {
  padding-top: 16rem;  // Excessive
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 16rem; // Very large gap
}
```

The 16rem vertical spacing looks good on desktop but likely too aggressive for mobile scrolling.

---

## Priority 4: Form & Interactive Elements

### 4.1 Contact Form is 2-Column on Desktop, Stacks on Mobile

**File:** `src/pages/Contact.css`

Good: `grid-template-columns: 1fr 1fr` collapses at 968px. However:
- Form wrapper padding: `2.5rem` at desktop → `1rem` at 600px
- Labels are uppercase with `letter-spacing: 0.1em` — harder to read on mobile

### 4.2 Social Buttons Too Small

**File:** `src/pages/Contact.css`

```scss
.social-btn {
  padding: 0.5rem 1rem;  // ~40px height, borderline
  font-size: 0.9rem;     // 14.4px on desktop
  border: 1px solid #2a2a2a;
}
```

On mobile these should be full-width or at minimum 44px height.

---

## Priority 5: Missing Mobile Optimizations

### 5.1 No Safe Area Handling

The fixed header and full-viewport sections don't account for:
- `env(safe-area-inset-top)` for notched devices
- `env(safe-area-inset-bottom)` for home indicator

### 5.2 Hero Chevron Animation

**File:** `src/pages/Home/Home.module.scss`

```scss
.chevronArrow {
  width: 56px;
  height: 56px;
  fill: white;
}
```

56px is good for touch, but the animation wrapper is `position: absolute; bottom: 2rem` — may be cut off by mobile browser UI.

### 5.3 CSS Custom Properties Not Defined

**Issue:** Files reference `--color-content-primary`, `--color-text-primary` etc. but these aren't defined in any seen CSS. May cause `color: undefined` behavior.

**Files affected:** `Button.module.scss`, `Footer.module.scss`, `Typography.module.scss`

---

## Summary: Critical Fixes by Priority

| Priority | Issue | Fix |
|----------|-------|-----|
| P1 | Body 4/5/6 unreadable on mobile | Increase `font-size` in `@media (--screen-xs)` |
| P1 | Button touch targets too small | Increase padding to ensure 44px min height |
| P2 | Nav has no mobile hamburger | Implement mobile menu toggle |
| P2 | Section padding bleeds off-screen | Add mobile-specific padding limits |
| P3 | Social buttons undersized | Ensure 44px min height, consider full-width |
| P3 | CSS variables undefined | Define in `:root` or `index.css` |
| P4 | Missing safe area insets | Add `env(safe-area-inset-*)` where needed |

---

## Files to Review

1. `src/components/core/Typography/Typography.module.scss` — Fix body text scaling
2. `src/components/Button/Button.module.scss` — Fix touch targets
3. `src/components/Header/Header.tsx` — Add hamburger menu
4. `src/index.css` — Define CSS custom properties
5. `src/pages/Contact.css` — Social button sizing
6. `src/pages/Home/Home.module.scss` — Section spacing
