# Tattva Innovation

## Current State
- FloatingCTA (Book Demo) is at `bottom-24 right-5` mobile and `md:bottom-8 md:right-8` desktop, overlapping with FloatingWhatsApp at `bottom-6 right-6 z-50`
- Select dropdowns (e.g. organization type in Book Demo form) use `bg-popover` which renders transparently on the dark background
- Admin panel Dialogs/AlertDialogs/popovers have transparent backgrounds due to same CSS variable issue
- Solutions section cards have an "Explore Solution" link but it's not clickable and goes nowhere
- No solution detail pages exist

## Requested Changes (Diff)

### Add
- Solution detail pages at `/solutions/political-campaign`, `/solutions/business-automation`, `/solutions/enterprise-ai`
- Each solution page shows: hero with editable background color/gradient, title, tagline, long description, product images (placeholder SVG/CSS), demo link button
- New content group in AdminPage `contentGroups` for each solution page: background, headline, tagline, description, demo link, image caption
- Routes for solution pages in App.tsx
- A dynamic route `/solutions/:slug` handled by a `SolutionDetailPage` component

### Modify
- FloatingCTA: change desktop position from `md:bottom-8 md:right-8` to `md:bottom-24 md:right-8` so it sits above WhatsApp
- `index.css`: set `--popover` CSS variable to a dark solid color (e.g. `0.13 0.03 250` in oklch ≈ #131A2B dark navy) to fix transparent dropdown backgrounds everywhere
- SolutionsSection: make "Explore Solution" a real link using TanStack Router `Link` to `/solutions/:slug`
- AdminPage: add new "Solution Pages" content group with fields for each solution's page-specific content (bg, headline, tagline, long description, demo link)

### Remove
- Nothing removed

## Implementation Plan
1. Fix FloatingCTA bottom positioning on desktop
2. Fix `--popover` CSS variable to solid dark background in index.css
3. Create `SolutionDetailPage.tsx` that reads solution slug from URL, loads content via `useSiteText`, renders editable sections
4. Add solution routes to App.tsx
5. Update SolutionsSection to link cards to solution pages using TanStack Router Link
6. Add solution page content fields to AdminPage contentGroups
