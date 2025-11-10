# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InfoBatak.id is a static cultural portal website built with Next.js that preserves and educates about Batak history, culture, customs, script, and clan (marga) system. The site is fully static (SSG) for optimal performance, security, and SEO.

## Development Commands

```bash
# Development
pnpm dev             # Start dev server at http://localhost:3000

# Production
pnpm build           # Build static site to out/ directory
pnpx serve out       # Preview production build locally

# Code Quality
pnpm lint            # Run ESLint
pnpm format          # Format code with Prettier (includes Tailwind class sorting)
```

## Architecture & Key Concepts

### Static Site Generation (SSG)

- Configured with `output: 'export'` in next.config.ts
- All pages are pre-rendered at build time
- Output goes to `out/` directory as static HTML
- No server-side rendering or API routes

### Content Management Architecture

Content is split between two approaches:

1. **JSON Data Files** (`content/data/`)
   - `fakta.json`: "Did You Know" facts displayed across the site
   - `marga.json`: Clan (marga) data with 6 rumpun (Toba, Karo, Simalungun, Pakpak, Angkola, Mandailing)
   - Accessed via helper functions in `lib/data.ts`

2. **Markdown Files** (future)
   - Planned for blog posts and long-form content
   - Uses gray-matter, remark, and remark-html

### Theme System

- Uses `next-themes` for dark/light mode toggle
- Theme preference persists in localStorage
- Color palette inspired by Batak flag (Red, White, Black)
- **Light Mode**: White background, black text, red (#C1272D) accent
- **Dark Mode**: Black background, white text, red accent (consistent)

### Key Component Patterns

**TahukahKamu Component** (`components/ui/TahukahKamu.tsx`)

- Reusable "Did You Know?" component
- Must fetch from `fakta.json` via `lib/data.ts`
- Used on homepage (random fact), sidebars, and embeddable in content

**Interactive Marga Page** (`app/marga/page.tsx`)

- Client-side filtering by rumpun (6 groups)
- Animated card gallery using Framer Motion
- Must use `getAllMarga()` and `getMargaByRumpun()` from `lib/data.ts`

### TypeScript Types

All types are centralized in `types/index.ts`:

- `Marga`: Clan data structure with id, nama, rumpun, deskripsi
- `Rumpun`: Union type of 6 clan groups
- `Fakta`: Did You Know fact structure
- `Article` & `ArticleMetadata`: For future blog/news content

### Path Aliases

- `@/*` maps to root directory (configured in tsconfig.json)
- Always use `@/` imports, never relative paths from root

## Design Principles

### Color Consistency

- Accent color (`#C1272D`) must remain consistent across light/dark modes
- Use Tailwind's custom `accent` color class
- Background/foreground swap between modes but accent stays the same

### Animations

- Framer Motion is used for page transitions and micro-interactions
- Keep animations smooth and subtle
- Use on interactive elements like cards, filters, and navigation

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Navbar has desktop menu and mobile hamburger menu
- All pages must be fully responsive

## Common Development Tasks

### Adding New Fakta (Did You Know Facts)

Edit `content/data/fakta.json` and add new object with id, teks, kategori fields.

### Adding New Marga (Clans)

Edit `content/data/marga.json` and add new object with id, nama, rumpun, deskripsi fields.

### Creating New Pages

- All pages go in `app/` directory (App Router)
- Use TypeScript (.tsx)
- Import shared layout components from `components/layout/`
- Follow existing page structure patterns

### Styling Guidelines

- Use Tailwind CSS classes exclusively
- Follow the established color system (background, foreground, accent)
- Maintain consistent spacing and typography
- Use `text-foreground`, `bg-background`, `text-accent` for theme-aware styling

## Important Technical Notes

### Static Export Limitations

- No server-side code (API routes, getServerSideProps)
- No Image Optimization (images.unoptimized: true in config)
- All data must be available at build time
- Client-side interactivity via React hooks is fine

### Navigation Structure

Navigation is defined in `components/layout/Navbar.tsx` as `navLinks` array:

- Single-level links: `{ href, label }`
- Dropdown menus: `{ label, subLinks: [{ href, label }] }`
- "Budaya" has 3 sub-pages: Adat Istiadat, Kesenian, Aksara Batak

### Current Routes

- `/` - Homepage with hero, featured sections, TahukahKamu
- `/sejarah` - History page with sidebar
- `/budaya/adat-istiadat` - Customs and traditions
- `/budaya/kesenian` - Arts (Tortor, Gondang)
- `/budaya/aksara-batak` - Educational page about Batak script
- `/marga` - Interactive clan directory with filters
- `/berita` - News/blog (placeholder)
- `/tentang` - About page

## Project Context

This website targets:

1. Young Batak generation learning their cultural roots
2. Batak diaspora abroad
3. Students, researchers, tourists interested in Batak culture

The aesthetic is clean, modern, and highly readable with educational focus. Content accuracy and cultural sensitivity are paramount.
