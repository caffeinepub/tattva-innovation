# Tattva Innovation

## Current State
- AdminPage has a flat `SiteContentTab` that renders all content groups as sequential cards -- hard to navigate with many fields
- Solution detail pages support 3 hardcoded slides per solution; slide images are editable via URL in admin but slide text (title, subtitle, description, features) is not editable
- No ability to add/remove slides from admin
- Image fields are URL-only; no file upload capability
- Home page hero has no image upload support

## Requested Changes (Diff)

### Add
- Per-slide text editing in admin: `sol_page_{n}_slide_{s}_title`, `sol_page_{n}_slide_{s}_subtitle`, `sol_page_{n}_slide_{s}_desc`, `sol_page_{n}_slide_{s}_features` (pipe-separated) site content keys
- Slide count per solution stored as `sol_page_{n}_slide_count` (1–5); admin can add slides up to 5, remove down to 1
- Image upload component: file picker that uploads to blob storage and saves the resulting URL as site content; used for slide images and hero image
- Hero image upload: `hero_image` site content key; HeroSection shows uploaded image if set
- `useImageUpload` hook that uses StorageClient to upload and return a public URL

### Modify
- AdminPage `SiteContentTab`: replace flat sequential cards with an accordion-based UI grouped by section; each group is collapsible, clearly labelled, with a save button per section
- Solution detail admin section: render per-solution accordion items, each with sub-tabs for page settings and per-slide editing; slide add/remove controls
- SolutionDetailPage: read slide count from site content; read per-slide text from site content with fallbacks to defaults; support up to 5 slides

### Remove
- The raw URL-only image fields for slides (replaced with upload + optional manual URL fallback)

## Implementation Plan
1. Create `useImageUpload` hook in `src/frontend/src/hooks/useImageUpload.ts` using StorageClient and loadConfig
2. Create `ImageUploadField` component for admin: shows current image thumbnail if set, file picker button, and optional URL override input
3. Rewrite `SiteContentTab` in AdminPage: use shadcn Accordion for collapsible groups; hero section includes image upload; keep per-group save buttons
4. Rewrite solution detail admin section with per-solution accordion, per-slide editing (title, subtitle, description, features, image upload), add/remove slide buttons
5. Update `SolutionDetailPage`: read `sol_page_{n}_slide_count`, read per-slide text from site content with fallback to DEFAULT_DATA, render dynamic number of slides
