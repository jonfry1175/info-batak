# Product Requirements Document (PRD): infobatak.id

**Version: 1.0**

This document contains the functional and technical specifications for the cultural portal website project, **infobatak.id**.

## 1. Project Vision & Mission

- **Vision:** To become the primary digital portal that is informative, modern, and engaging regarding all aspects of Batak culture and history.
- **Mission:** To preserve, educate, and share knowledge about Batak history, culture, customs, script, and the _marga_ (clan) system with the younger generation and the general public.

## 2. Target Audience

1.  **The Batak Community:** The younger generation seeking to learn their cultural roots, as well as the Batak diaspora abroad.
2.  **The General Public:** Students, researchers, tourists, or anyone interested in learning about Batak culture.

## 3. Architecture & Technology

- **Website Type:** **Static Site (Static Site Generator / SSG)**.
- **Reasoning:** Optimized for speed, security (no server-side database), and SEO.
- **Mandatory Tech Stack:**
  - **Framework:** Next.js (configured for static export, `output: 'export'`).
  - **Language:** TypeScript.
  - **Styling:** Tailwind CSS.
  - **Animation:** Framer Motion (for smooth page transitions & micro-interactions).
- **Content:** Most page content (like blog articles, history) will be managed via **Markdown (.md)** files.

## 4. Design Theme & Visuals (Critical)

- **Aesthetic:** Clean, modern, and highly readable.
- **Main Color Palette:** Inspired by the Batak flag (Red, White, Black).
- **Mandatory Feature: Dark Mode Toggle**
  - There must be a toggle button (in the header/navbar) to switch between Light and Dark Mode. User preference should be saved (e.g., in `localStorage`).

- **Palette Implementation (Light Mode / Default):**
  - **Background:** Predominantly **White** (`#FFFFFF` or `#FEFEFE`).
  - **Main Text:** **Black** (`#212121`).
  - **Accent (Links, Buttons, Headings):** **Red** (A deep, Batak-style blood red).

- **Palette Implementation (Dark Mode):**
  - **Background:** **Black** (`#212121` or similar).
  - **Main Text:** **White** (`#FFFFFF`).
  - **Accent (Links, Buttons, Headings):** **Red** (Use the same red as light mode for consistency).

## 5. Website Structure (Sitemap)

1.  `/` (Home)
2.  `/history`
3.  `/culture/customs`
4.  `/culture/arts`
5.  `/culture/batak-script` (See Feature 6.1)
6.  `/marga` (See Feature 6.2)
7.  `/news` (Blog/article archive page)
8.  `/news/[slug]/[id]` (Article detail page, must have a sidebar)
9.  `/about`

## 6. Key Functional Feature Details

### 6.1. Batak Script Page (`/culture/batak-script`)

- **Purpose:** Purely educational, **NOT** a converter tool.
- **Required Content:** This page must provide an in-depth explanation of:
  1.  **Definition:** What is the Batak Script?
  2.  **History:** How the script evolved and was used (e.g., on Pustaha).
  3.  **Reading Guide:** A clear visual guide explaining `Ina ni Surat` (mother letters) and `Anak ni Surat` (diacritics).

### 6.2. Interactive Marga (Clan) Page (`/marga`)

- **Purpose:** To present the clan system in a visual and interactive way.
- **Group Filter Feature:**
  - At the top of the page, there must be a filter component (e.g., _Tabs_ or _Buttons_).
  - The filter options are the 6 groups: **Toba**, **Karo**, **Simalungun**, **Pakpak**, **Angkola**, **Mandailing**.
- **Marga Gallery Feature:**
  - Below the filter, display a **visual grid/gallery**.
  - Each clan (marga) must be represented as an attractively designed **"Card"**.
  - This gallery must filter dynamically. If the user clicks "Toba", the gallery should update to show only the cards for Toba clans.

### 6.3. "Did You Know?" Component

- **Purpose:** To increase user engagement with short, interesting facts.
- **Form:** A reusable React component (`<DidYouKnow />`).
- **Data Source:** The content (facts) for this component must be managed in a single, centralized **`fakta.json`** file.
- **Placement Rules:**
  1.  **Homepage (`/`):** Display one random fact.
  2.  **Sidebar:** Displayed in the sidebar of the `/news/[slug]/[id]` and `/history` pages.
  3.  **Inline:** The component must be embeddable within Markdown content (if needed) to break up long text.
