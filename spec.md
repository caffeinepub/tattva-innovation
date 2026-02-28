# Tattva Innovation

## Current State
Full website for Tattva Innovation (Political Technology & AI Automation Specialist) with:
- Hero, Services, DataDriven, StrategicAdvantage, Testimonials, FAQ, LeadForm, Footer sections
- Admin panel at /admin with tabs for Blog Posts, Testimonials, Leads (all backend-managed)
- Backend (Motoko): blog posts, testimonials, leads, authorization (admin roles)
- Color system: Deep Navy #0B1F3A, Royal Blue #1E4ED8, Gold #C8A951, foreground #090b47
- Some text on light backgrounds uses `text-foreground/55` or `text-foreground/60` which may render as low-contrast

## Requested Changes (Diff)

### Add
- Backend: `SiteContent` key-value store (key: Text, value: Text) with `getSiteContent`, `getAllSiteContent`, `setSiteContent` (admin-only write)
- AdminPage: new "Site Content" tab allowing admin to edit all static text on the website (hero headline, subheadline, trust badges, service titles/descriptions, campaign intelligence section, strategic advantage items, FAQ questions/answers, lead form heading, footer tagline, etc.)
- Frontend: all editable text sections load from backend `siteContent` and fall back to hardcoded defaults if not set

### Modify
- Fix text visibility: ensure all text on white (#FFFFFF) and light grey (#F5F7FA) backgrounds has sufficient contrast — replace opacity-reduced foreground text (like `text-foreground/55`) with proper solid colors like `text-[#4a5568]` or `text-[#374151]` that are still readable but not overpowering
- AdminPage: add "Site Content" tab with grouped editors for each section of the site
- HeroSection, ServicesSection, DataDrivenSection, StrategicAdvantageSection, FaqSection, LeadFormSection: read text from `useSiteContent` hook that queries backend, fall back to defaults

### Remove
- Nothing removed

## Implementation Plan
1. Update `main.mo`: add SiteContent type, Map, getSiteContent/getAllSiteContent (public query), setSiteContent (admin-only), seed with initial content keys matching all site text
2. Fix CSS contrast: update opacity-muted text classes on light backgrounds to use explicit readable colors
3. Create `useSiteContent` hook that queries `getAllSiteContent` and returns a lookup function with fallback to defaults
4. Update each section component to use the hook for their text
5. Add "Site Content" tab to AdminPage with grouped fields per section — each field calls setSiteContent on save
6. Build and validate
