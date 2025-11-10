# 21st.dev Integration Plan for InfoBatak.id

## Executive Summary

This document outlines the comprehensive plan to integrate 21st.dev UI components into the InfoBatak.id cultural portal website. The integration will transform the current minimal component library into a professional, accessible, and maintainable design system while preserving the unique Batak cultural identity.

**Project Readiness Score**: 8/10 ✓
**Approach**: Full Refactor with complete shadcn/ui compatibility
**Timeline**: ~3-4 days for full implementation
**Risk Level**: Low (no architectural conflicts)

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Integration Approach](#integration-approach)
3. [Implementation Phases](#implementation-phases)
4. [Detailed Step-by-Step Plan](#detailed-step-by-step-plan)
5. [Component Mapping](#component-mapping)
6. [Testing & Validation](#testing--validation)
7. [Success Criteria](#success-criteria)
8. [Rollback Plan](#rollback-plan)

---

## Current State Analysis

### Existing Component Inventory

**UI Components** (`/components/ui/`):
- `DarkModeToggle.tsx` - Custom dark/light mode toggle
- `TahukahKamu.tsx` - Custom "Did You Know?" information card

**Layout Components** (`/components/layout/`):
- `Navbar.tsx` - Navigation with dropdown menus and mobile hamburger
- `Footer.tsx` - Multi-column footer with links
- `Sidebar.tsx` - Sidebar wrapper for TahukahKamu

**Provider Components**:
- `ThemeProvider.tsx` - next-themes wrapper

**Total**: 6 custom components, ~500 lines of code

### Technology Stack

```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "tailwindcss": "^4",
  "framer-motion": "^12.23.24",
  "next-themes": "^0.4.6"
}
```

### Theme System

**Color Palette** (Batak Flag Colors):
- **Red**: `#C1272D` (Accent - MUST remain consistent)
- **White**: `#FEFEFE` (Light mode background)
- **Black**: `#212121` (Dark mode background)

**Current Implementation**:
- CSS custom properties in `globals.css`
- Inline `@theme` directive (Tailwind v4)
- Dark mode via `next-themes` with class strategy

### Configuration Gaps

| File | Status | Action Needed |
|------|--------|---------------|
| `components.json` | ❌ Missing | **CREATE** - shadcn/ui configuration |
| `tailwind.config.ts` | ❌ Missing | **CREATE** - Migrate from inline CSS |
| `lib/utils.ts` | ❌ Missing | **CREATE** - cn() helper function |
| `globals.css` | ✓ Exists | **UPDATE** - Add shadcn/ui variables |

---

## Integration Approach

### Selected Strategy: Full Refactor

**Rationale**:
- User explicitly chose full refactor approach
- Provides best long-term maintainability
- Complete design system consistency
- Easier onboarding for future developers
- Better IDE support and autocomplete

**Key Principles**:
1. **Preserve Cultural Identity** - Batak red (#C1272D) stays constant
2. **Maintain SSG Compatibility** - All components client-side only
3. **Accessibility First** - WCAG 2.1 AA minimum
4. **Progressive Enhancement** - Build on existing functionality
5. **Type Safety** - Full TypeScript throughout

---

## Implementation Phases

### Phase 1: Foundation Setup (Day 1)

**Objective**: Establish shadcn/ui infrastructure

**Tasks**:
1. ✅ Create `components.json` configuration file
2. ✅ Create `tailwind.config.ts` with theme migration
3. ✅ Update `globals.css` with shadcn/ui CSS variables
4. ✅ Create `lib/utils.ts` with `cn()` helper
5. ✅ Install dependencies (CVA, clsx, tailwind-merge, lucide-react)

**Deliverables**:
- Working shadcn/ui foundation
- Theme system compatible with both existing and new components
- Utility functions ready for use

---

### Phase 2: Core Component Installation (Day 1-2)

**Objective**: Install essential 21st.dev components via Magic MCP

**Components to Install**:

1. **Button Component**
   - Command: Use Magic MCP `21st_magic_component_builder`
   - Variants: default, destructive, outline, secondary, ghost, link
   - Sizes: default, sm, lg, icon
   - Features: Disabled state, loading state, icon support

2. **Card Component**
   - Variants: default, elevated, outlined
   - Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
   - Features: Hover states, theme-aware

3. **Alert Component**
   - Variants: default, destructive, warning, success
   - Features: Dismissible, icon support, title + description

4. **Badge Component**
   - Variants: default, secondary, destructive, outline
   - Sizes: default, sm, lg
   - Features: Interactive (clickable), removable

5. **Navigation Menu Component**
   - Features: Nested menus, keyboard navigation, mobile-responsive
   - Accessibility: Full ARIA support

6. **Dropdown Menu Component**
   - Sub-components: DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
   - Features: Keyboard navigation, positioning

**Installation Method**:
```typescript
// Use Magic MCP tool for each component
mcp__magic__21st_magic_component_builder({
  message: "Install [Component] from 21st.dev",
  searchQuery: "[component-name]",
  absolutePathToCurrentFile: "/path/to/components/ui/[component].tsx",
  absolutePathToProjectDirectory: "/home/jonfry/Desktop/project/info-batak",
  standaloneRequestQuery: "Detailed component requirements..."
})
```

**Deliverables**:
- 6 new UI components in `/components/ui/`
- Type-safe component APIs
- Full documentation in component files

---

### Phase 3: Component Refactoring (Day 2-3)

**Objective**: Replace existing custom components with 21st.dev versions

#### 3.1 DarkModeToggle.tsx Refactor

**Current Implementation**:
```tsx
// Custom button with SVG icons
<button onClick={toggleTheme}>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```

**New Implementation**:
```tsx
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function DarkModeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

**Benefits**:
- Consistent button styling
- Better accessibility
- Smooth icon transitions
- Matches other buttons site-wide

---

#### 3.2 TahukahKamu.tsx Refactor

**Current Implementation**:
```tsx
// Custom card with left border accent
<div className="border-l-4 border-accent bg-background p-4">
  <h3>Tahukah Kamu?</h3>
  <p>{fakta.teks}</p>
</div>
```

**New Implementation**:
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

export function TahukahKamu() {
  return (
    <Alert className="border-l-4 border-l-accent">
      <Info className="h-4 w-4 text-accent" />
      <AlertTitle className="flex items-center gap-2">
        Tahukah Kamu?
        <Badge variant="secondary">{fakta.kategori}</Badge>
      </AlertTitle>
      <AlertDescription>{fakta.teks}</AlertDescription>
    </Alert>
  )
}
```

**Benefits**:
- Proper semantic structure
- Category badge for filtering
- Icon for visual interest
- Better screen reader support

---

#### 3.3 Navbar.tsx Refactor

**Current Implementation**:
- Custom CSS dropdown menus
- Manual focus management
- Inline styled buttons
- Complex mobile hamburger logic

**New Implementation**:
```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Desktop Navigation
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/">Beranda</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Budaya</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/budaya/adat-istiadat">
          Adat Istiadat
        </NavigationMenuLink>
        <NavigationMenuLink href="/budaya/kesenian">
          Kesenian
        </NavigationMenuLink>
        <NavigationMenuLink href="/budaya/aksara-batak">
          Aksara Batak
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

// Mobile Navigation (Hamburger)
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu className="h-5 w-5" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Beranda</DropdownMenuItem>
    {/* ... */}
  </DropdownMenuContent>
</DropdownMenu>
```

**Benefits**:
- Built-in keyboard navigation
- ARIA labels automatic
- Better mobile UX
- Consistent styling
- Reduced code complexity

---

#### 3.4 Page-Level Button Replacements

**Files to Update**:
- `app/page.tsx` - Homepage CTAs
- `app/marga/page.tsx` - Filter buttons (Rumpun selector)
- `app/budaya/*/page.tsx` - Navigation buttons

**Pattern**:
```tsx
// Before
<button className="px-4 py-2 bg-accent text-white rounded">
  Lihat Semua Marga
</button>

// After
import { Button } from "@/components/ui/button"

<Button variant="default">
  Lihat Semua Marga
</Button>
```

**Marga Filter Buttons**:
```tsx
// Before
<button
  onClick={() => setSelectedRumpun(rumpun)}
  className={selectedRumpun === rumpun ? 'bg-accent' : 'bg-gray-200'}
>
  {rumpun}
</button>

// After
<Button
  variant={selectedRumpun === rumpun ? 'default' : 'outline'}
  onClick={() => setSelectedRumpun(rumpun)}
>
  {rumpun}
</Button>
```

---

#### 3.5 Badge Integration

**Add to Marga Cards** (`app/marga/page.tsx`):
```tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

{margaList.map((marga) => (
  <Card key={marga.id}>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        {marga.nama}
        <Badge variant="secondary">{marga.rumpun}</Badge>
      </CardTitle>
      <CardDescription>{marga.deskripsi}</CardDescription>
    </CardHeader>
  </Card>
))}
```

**Add to Fakta Categories**:
```tsx
// In TahukahKamu component
<Badge variant="outline">{fakta.kategori}</Badge>
```

**Deliverables**:
- All custom components refactored
- Consistent component patterns
- Improved accessibility
- Reduced custom CSS

---

### Phase 4: Quality Assurance & Testing (Day 3-4)

**Objective**: Verify all functionality, accessibility, and visual consistency

#### 4.1 Theme Testing

**Test Cases**:
1. ✅ Light mode renders correctly
2. ✅ Dark mode renders correctly
3. ✅ Theme toggle works smoothly
4. ✅ No flash of unstyled content (FOUC)
5. ✅ Batak red (#C1272D) appears consistently in both themes
6. ✅ All text has sufficient contrast (WCAG AA)
7. ✅ Smooth transitions on theme switch (0.3s)

**Testing Method**:
```bash
# Start dev server
pnpm dev

# Manual testing in browser
# 1. Toggle theme multiple times
# 2. Refresh page in both modes
# 3. Check all pages for color consistency
# 4. Use browser DevTools to inspect CSS variables
```

---

#### 4.2 Responsive Behavior Testing

**Breakpoints to Test**:
- Mobile: 320px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

**Components to Test**:
- Navbar (mobile hamburger vs desktop menu)
- Marga cards (grid responsiveness)
- Footer (column stacking)
- Buttons (touch targets min 44px)

**Testing Method**:
```bash
# Use browser responsive mode
# Test at: 375px, 768px, 1280px, 1920px
```

---

#### 4.3 Accessibility Audit

**Checks**:
1. ✅ All buttons have accessible names
2. ✅ Keyboard navigation works (Tab, Enter, Escape)
3. ✅ Focus indicators visible
4. ✅ ARIA labels on interactive elements
5. ✅ Semantic HTML structure
6. ✅ Color contrast ratios pass WCAG AA
7. ✅ Screen reader compatibility

**Tools**:
- Chrome Lighthouse
- axe DevTools browser extension
- Manual keyboard navigation test

---

#### 4.4 Build & SSG Verification

**Test Commands**:
```bash
# Clean previous builds
rm -rf .next out

# Build static site
pnpm build

# Verify output
ls -la out/

# Preview production build
pnpx serve out

# Test navigation in production build
# Verify no runtime errors in browser console
```

**Expected Output**:
- No build errors
- All pages exported to `out/` directory
- Images unoptimized (as configured)
- Client-side interactivity works
- No hydration errors

---

#### 4.5 Code Quality

**Format Code**:
```bash
pnpm format
```

**Lint Code**:
```bash
pnpm lint
```

**Expected**:
- No linting errors
- Consistent Tailwind class ordering
- TypeScript types correct
- No unused imports

---

## Detailed Step-by-Step Plan

### Step 1: Foundation Setup ✅ COMPLETED

#### 1.1 Create `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Status**: ✅ File created

---

#### 1.2 Create `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--foreground)",
        },
        batak: {
          red: "#c1272d",
          white: "#fefefe",
          black: "#212121",
        },
        card: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
        },
        popover: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--foreground)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "var(--foreground)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 45%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "var(--foreground)",
        },
        border: "hsl(0 0% 90%)",
        input: "hsl(0 0% 90%)",
        ring: "var(--accent)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Status**: ✅ File created

---

#### 1.3 Update `globals.css`

**Status**: ✅ Updated with shadcn/ui CSS variables

---

#### 1.4 Create `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Status**: ✅ File created

---

#### 1.5 Install Dependencies

```bash
pnpm install class-variance-authority clsx tailwind-merge lucide-react
```

**Status**: ✅ Installed

---

### Step 2: Component Installation (PENDING)

#### 2.1 Install Button Component

**Method**: Magic MCP Tool

```typescript
// Tool call
mcp__magic__21st_magic_component_builder({
  message: "Install Button component from 21st.dev with variants",
  searchQuery: "button",
  absolutePathToCurrentFile: "/home/jonfry/Desktop/project/info-batak/components/ui/button.tsx",
  absolutePathToProjectDirectory: "/home/jonfry/Desktop/project/info-batak",
  standaloneRequestQuery: "Create a Button component with variants (default, destructive, outline, secondary, ghost, link) and sizes (sm, default, lg, icon) using CVA"
})
```

**Alternative**: Manual shadcn/ui installation
```bash
npx shadcn@latest add button
```

**Expected Output**: `/components/ui/button.tsx`

---

#### 2.2 Install Card Component

```typescript
mcp__magic__21st_magic_component_builder({
  message: "Install Card component from 21st.dev",
  searchQuery: "card",
  absolutePathToCurrentFile: "/home/jonfry/Desktop/project/info-batak/components/ui/card.tsx",
  absolutePathToProjectDirectory: "/home/jonfry/Desktop/project/info-batak",
  standaloneRequestQuery: "Create Card component with CardHeader, CardTitle, CardDescription, CardContent, CardFooter sub-components"
})
```

**Alternative**:
```bash
npx shadcn@latest add card
```

---

#### 2.3 Install Alert Component

```bash
npx shadcn@latest add alert
```

---

#### 2.4 Install Badge Component

```bash
npx shadcn@latest add badge
```

---

#### 2.5 Install Navigation Menu Component

```bash
npx shadcn@latest add navigation-menu
```

**Note**: Requires additional dependencies
```bash
pnpm install @radix-ui/react-navigation-menu
```

---

#### 2.6 Install Dropdown Menu Component

```bash
npx shadcn@latest add dropdown-menu
```

**Note**: Requires additional dependencies
```bash
pnpm install @radix-ui/react-dropdown-menu
```

---

### Step 3: Component Refactoring (PENDING)

#### 3.1 Refactor DarkModeToggle.tsx

**File**: `/components/ui/DarkModeToggle.tsx`

**Implementation**: See Phase 3.1 above

---

#### 3.2 Refactor TahukahKamu.tsx

**File**: `/components/ui/TahukahKamu.tsx`

**Implementation**: See Phase 3.2 above

---

#### 3.3 Refactor Navbar.tsx

**File**: `/components/layout/Navbar.tsx`

**Implementation**: See Phase 3.3 above

**Complexity**: High (most complex refactor)

**Estimated Time**: 2-3 hours

---

#### 3.4 Update Homepage Buttons

**File**: `/app/page.tsx`

**Changes**:
- Replace inline button styles with `<Button>` component
- Add icon support with `lucide-react`
- Ensure responsive sizing

---

#### 3.5 Update Marga Page

**File**: `/app/marga/page.tsx`

**Changes**:
- Replace filter buttons with `<Button variant="outline">`
- Add `<Badge>` to marga cards
- Use `<Card>` component for marga display

---

#### 3.6 Update Other Pages

**Files**:
- `/app/sejarah/page.tsx`
- `/app/budaya/adat-istiadat/page.tsx`
- `/app/budaya/kesenian/page.tsx`
- `/app/budaya/aksara-batak/page.tsx`
- `/app/berita/page.tsx`
- `/app/tentang/page.tsx`

**Changes**: Replace any inline buttons with `<Button>` component

---

### Step 4: Testing & Validation (PENDING)

#### 4.1 Theme Testing Checklist

- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Theme toggle button works
- [ ] Batak red (#C1272D) consistent in both themes
- [ ] No FOUC on page load
- [ ] Smooth theme transitions (0.3s)
- [ ] All text readable (contrast check)

---

#### 4.2 Responsive Testing Checklist

- [ ] Mobile (375px): All components render correctly
- [ ] Tablet (768px): Layout adapts properly
- [ ] Desktop (1280px): Full layout displays
- [ ] Navbar: Mobile hamburger vs desktop menu
- [ ] Cards: Grid responsiveness
- [ ] Touch targets: Minimum 44px on mobile

---

#### 4.3 Accessibility Testing Checklist

- [ ] Keyboard navigation works (Tab, Shift+Tab)
- [ ] Focus indicators visible
- [ ] ARIA labels present on interactive elements
- [ ] Screen reader announces component names
- [ ] Color contrast passes WCAG AA
- [ ] Buttons have accessible names
- [ ] Dropdown menus keyboard accessible

---

#### 4.4 Build Verification

```bash
# Run build
pnpm build

# Check for errors
echo $?  # Should be 0

# Preview production
pnpx serve out

# Manual testing in browser
```

**Checklist**:
- [ ] Build completes without errors
- [ ] All pages exported to `out/`
- [ ] Production site works correctly
- [ ] No console errors
- [ ] Client-side interactivity functional

---

#### 4.5 Code Quality

```bash
# Format
pnpm format

# Lint
pnpm lint
```

**Checklist**:
- [ ] No linting errors
- [ ] Code properly formatted
- [ ] No unused imports
- [ ] TypeScript types correct

---

## Component Mapping

### Before → After

| Current Component | 21st.dev Replacement | Complexity | Time Est. |
|-------------------|----------------------|------------|-----------|
| Custom buttons (inline) | `<Button>` | Low | 30 min |
| DarkModeToggle.tsx | `<Button variant="ghost">` + icons | Low | 30 min |
| TahukahKamu.tsx | `<Alert>` + `<Badge>` | Medium | 1 hour |
| Navbar.tsx (desktop) | `<NavigationMenu>` | High | 2 hours |
| Navbar.tsx (mobile) | `<DropdownMenu>` | Medium | 1 hour |
| Marga cards | `<Card>` + `<Badge>` | Medium | 1 hour |
| Filter buttons | `<Button variant="outline">` | Low | 30 min |
| Footer links | Keep as-is (no change) | N/A | N/A |

**Total Estimated Time**: ~8 hours of development

---

## Success Criteria

### Functional Requirements

✅ **All existing functionality preserved**
- Dark/light mode toggle works
- Navigation (desktop + mobile) functional
- Marga filtering works
- TahukahKamu facts display correctly
- All internal links work

✅ **New functionality added**
- Consistent button system across site
- Professional card components
- Badge system for categorization
- Improved keyboard navigation
- Better mobile UX

---

### Design Requirements

✅ **Visual Consistency**
- Batak red (#C1272D) appears consistently
- Spacing follows consistent scale
- Typography hierarchy maintained
- Hover states smooth and predictable
- Transitions feel natural

✅ **Theme System**
- Light mode renders correctly
- Dark mode renders correctly
- No FOUC on page load
- Theme preference persists
- All components theme-aware

---

### Accessibility Requirements

✅ **WCAG 2.1 AA Compliance**
- Color contrast ratios pass
- Keyboard navigation works
- ARIA labels present
- Focus indicators visible
- Screen reader compatible
- Touch targets 44px minimum

---

### Technical Requirements

✅ **Build & Performance**
- `pnpm build` succeeds
- SSG outputs to `out/` directory
- No runtime errors
- No hydration mismatches
- Client-side JS < 200KB increase

✅ **Code Quality**
- No ESLint errors
- TypeScript types correct
- Prettier formatted
- No unused imports
- Component props typed

---

## Testing & Validation

### Manual Testing Protocol

**1. Visual Inspection**
- Load each page in browser
- Toggle dark/light mode
- Check color consistency
- Verify layout responsiveness

**2. Interaction Testing**
- Click all buttons
- Navigate all menus
- Test mobile hamburger
- Try keyboard navigation
- Test theme toggle

**3. Cross-Browser Testing**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

**4. Device Testing**
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

---

### Automated Testing

**Lighthouse Audit**:
```bash
# Run in Chrome DevTools
# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 90+
# - SEO: 95+
```

**axe DevTools**:
- Install browser extension
- Run on each page
- Fix all critical/serious issues

---

## Rollback Plan

### If Critical Issues Arise

**Git Rollback**:
```bash
# If integrated but broken
git log --oneline  # Find last good commit
git revert <commit-hash>

# Or reset to previous state
git reset --hard <commit-hash>
```

**Selective Rollback**:
- Keep foundation files (`components.json`, `tailwind.config.ts`)
- Rollback only problematic component refactors
- Debug and fix incrementally

**Component-Level Rollback**:
```bash
# Restore individual component
git checkout HEAD~1 -- components/ui/TahukahKamu.tsx
```

---

## Dependencies Reference

### Required Packages

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.553.0",
    "tailwind-merge": "^3.4.0",
    "@radix-ui/react-navigation-menu": "^1.2.2",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-slot": "^1.1.1"
  }
}
```

### Installation Command

```bash
pnpm install class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-navigation-menu @radix-ui/react-dropdown-menu @radix-ui/react-slot
```

---

## File Structure After Integration

```
info-batak/
├── .claude/
│   └── agents/
│       └── ui-ux-tailwind-expert.md
├── app/
│   ├── globals.css              # ✅ UPDATED
│   ├── layout.tsx
│   ├── page.tsx                 # 🔄 TO UPDATE
│   ├── marga/
│   │   └── page.tsx             # 🔄 TO UPDATE
│   ├── budaya/
│   │   ├── adat-istiadat/page.tsx
│   │   ├── kesenian/page.tsx
│   │   └── aksara-batak/page.tsx
│   ├── sejarah/page.tsx
│   ├── berita/page.tsx
│   └── tentang/page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx           # 🆕 NEW (from 21st.dev)
│   │   ├── card.tsx             # 🆕 NEW (from 21st.dev)
│   │   ├── alert.tsx            # 🆕 NEW (from 21st.dev)
│   │   ├── badge.tsx            # 🆕 NEW (from 21st.dev)
│   │   ├── navigation-menu.tsx  # 🆕 NEW (from 21st.dev)
│   │   ├── dropdown-menu.tsx    # 🆕 NEW (from 21st.dev)
│   │   ├── DarkModeToggle.tsx   # 🔄 TO REFACTOR
│   │   └── TahukahKamu.tsx      # 🔄 TO REFACTOR
│   ├── layout/
│   │   ├── Navbar.tsx           # 🔄 TO REFACTOR
│   │   ├── Footer.tsx           # ✅ KEEP AS-IS
│   │   └── Sidebar.tsx          # ✅ KEEP AS-IS
│   └── ThemeProvider.tsx        # ✅ KEEP AS-IS
├── lib/
│   ├── data.ts                  # ✅ KEEP AS-IS
│   └── utils.ts                 # 🆕 NEW
├── content/
│   └── data/
│       ├── fakta.json
│       └── marga.json
├── types/
│   └── index.ts
├── components.json              # 🆕 NEW
├── tailwind.config.ts           # 🆕 NEW
├── tsconfig.json                # ✅ KEEP AS-IS
├── next.config.ts               # ✅ KEEP AS-IS
├── postcss.config.mjs           # ✅ KEEP AS-IS
├── package.json                 # 🔄 TO UPDATE (deps)
└── CLAUDE.md                    # ✅ KEEP AS-IS
```

**Legend**:
- ✅ KEEP AS-IS: No changes needed
- 🔄 TO UPDATE: Needs modification
- 🆕 NEW: New file to create

---

## Additional Recommendations

### 1. Component Documentation

Create `/docs/components.md` with:
- Usage examples for each component
- Variant demonstrations
- Accessibility notes
- Props documentation

### 2. Storybook (Optional Future Enhancement)

Consider adding Storybook for component development:
```bash
pnpm add -D @storybook/nextjs
npx storybook@latest init
```

### 3. Component Testing (Optional Future Enhancement)

Add Jest + React Testing Library:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### 4. CI/CD Integration

Add GitHub Actions workflow to:
- Run `pnpm lint` on PRs
- Run `pnpm build` to verify SSG
- Check for TypeScript errors
- Run accessibility tests

---

## Timeline Estimate

### Day 1 (Foundation)
- ✅ Create configuration files (1 hour) **COMPLETED**
- ✅ Install dependencies (30 min) **COMPLETED**
- Install core components via Magic MCP (2 hours)
- **Total**: 3.5 hours

### Day 2 (Refactoring)
- Refactor DarkModeToggle (30 min)
- Refactor TahukahKamu (1 hour)
- Refactor Navbar (3 hours)
- **Total**: 4.5 hours

### Day 3 (Page Updates)
- Update homepage (1 hour)
- Update Marga page (1.5 hours)
- Update other pages (1.5 hours)
- **Total**: 4 hours

### Day 4 (Testing & Polish)
- Theme testing (1 hour)
- Responsive testing (1 hour)
- Accessibility audit (1 hour)
- Build verification (30 min)
- Bug fixes (1 hour)
- **Total**: 4.5 hours

**Grand Total**: ~16.5 hours (2-3 days of focused work)

---

## Notes & Considerations

### Cultural Sensitivity
- All component text should remain in Indonesian
- Maintain educational tone in component descriptions
- Preserve Batak cultural references and context
- Ensure component naming doesn't conflict with cultural terms

### Performance Considerations
- Monitor bundle size increase (target: <200KB)
- Lazy load components where possible
- Use code splitting for route-based chunks
- Optimize Framer Motion animations

### Future Scalability
- Component library can be extended easily
- Design tokens centralized in Tailwind config
- Easy to add new shadcn/ui components
- Foundation supports future features (forms, search, etc.)

---

## Questions & Answers

**Q: Will this break existing functionality?**
A: No. We're enhancing, not replacing functionality. All existing features will work.

**Q: Can we still use Framer Motion?**
A: Yes! Framer Motion works perfectly alongside 21st.dev components.

**Q: What if a component doesn't fit our needs?**
A: We can customize any 21st.dev component. They're just React components with Tailwind.

**Q: How do we maintain the Batak red color?**
A: The accent color is locked in `tailwind.config.ts` and CSS variables. It won't change.

**Q: Can we still use custom components?**
A: Absolutely. Footer and Sidebar are staying as-is. Mix and match as needed.

---

## Resources

### Documentation
- [21st.dev Official Docs](https://21st.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

### Community
- [shadcn/ui Discord](https://discord.com/invite/shadcn)
- [Tailwind CSS Discord](https://discord.com/invite/tailwindcss)

### Tools
- [Lighthouse](https://developer.chrome.com/docs/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Conclusion

This plan provides a comprehensive roadmap for integrating 21st.dev into InfoBatak.id. The foundation has been established (✅ Phase 1 complete), and the remaining phases are clearly defined with specific tasks, timelines, and success criteria.

The integration will:
- ✅ Maintain cultural identity (Batak red preserved)
- ✅ Improve accessibility (WCAG AA compliance)
- ✅ Enhance maintainability (component library)
- ✅ Preserve SSG architecture (no breaking changes)
- ✅ Provide better developer experience (TypeScript, autocomplete)

**Next Steps**: Execute Phases 2-4 following this plan.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-11
**Author**: Claude Code
**Project**: InfoBatak.id
