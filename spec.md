# Tattva Innovation — AI SaaS Redesign

## Current State
The site is a political technology consultancy website with these sections: Hero, Services (4 cards), Data-Driven Campaigns, Strategic Advantage, Testimonials, How It Works, FAQ, Lead Form, Blog. It uses a navy/gold institutional color scheme. Admin panel at /admin allows editing site content via `setSiteContent`/`getSiteContent`, managing blog posts, testimonials, and viewing leads. Backend exposes `setSiteContent`, `getSiteContent`, `getAllSiteContent`, `getVisibleTestimonials`, `createTestimonial`, `updateTestimonial`, `deleteTestimonial`, `getAllPosts`, `createPost`, `updatePost`, `deletePost`, `getLeads`, `submitLead`, `isCallerAdmin`, `claimOwnerAdmin`.

## Requested Changes (Diff)

### Add
- New dark tech color system globally: #0A0F1F (primary), #5B8CFF (accent), #00FFC1 (secondary neon), gradient dark (#0A0F1F → #131A2B)
- Fonts: Inter (body) + Sora (headings) via Google Fonts
- New Products section ("Our AI Product Ecosystem") with 4 editable product cards with icon, name, description, demo link, hover animation
- New Solutions section ("Solutions We Power") with 3 editable solution cards
- New Dashboard Preview section with 3 CSS/SVG mockup panels (voter analytics, AI sales, business automation) with hover effects
- New Stats/Why Tattva section with editable numbers (100+ AI Features, 10+ Automation Modules, Multiple Industry Solutions)
- New Pricing section with monthly/yearly toggle, 3 tiers (Starter, Growth highlighted, Enterprise), editable from admin
- New Demo section ("See Tattva AI in Action") with 3 demo cards with external links and video preview placeholders
- Animated hero background: CSS grid animation with glowing nodes and connecting lines
- Glassmorphism card styles throughout
- Scroll-triggered fade-in animations via Intersection Observer
- Floating CTA button (Book Demo)
- Dark/light mode toggle in navbar
- Interactive AI chatbot assistant widget (floating)
- Micro-interactions: button hover glow, card lift effects

### Modify
- Hero: new headline "AI Systems Powering Businesses, Governments & Campaigns", subheadline, two CTAs [View Products][Book Live Demo], all editable
- Navbar: restructure to Home | Products | Solutions | Pricing | Demo | About | Contact + Book Demo button (gold/neon gradient)
- Testimonials: keep existing backend, reskin cards with glassmorphism dark style
- Lead form/Contact: keep backend `submitLead`, update to dark theme with editable CTA
- Footer: dark theme, editable links and copyright via siteContent
- Admin panel: add new content keys for all new sections (products, solutions, stats, pricing, demo titles/descriptions)
- All text content loaded from `getSiteContent` and editable in admin "Site Content" tab

### Remove
- Old color system (navy/gold institutional palette)
- Old section designs (HowItWorks, FAQ, DataDriven, StrategicAdvantage, WhyUs, Services) — replaced by new sections
- Old political-focused copy tone

## Implementation Plan
1. Update `index.css` and global styles: dark background, Inter + Sora fonts, CSS variables for new palette, glassmorphism utilities, scroll animation utilities
2. Rewrite `Navbar.tsx`: new links, dark sticky glass navbar, Book Demo CTA, dark/light toggle
3. Rewrite `HeroSection.tsx`: animated canvas/CSS background, new copy, two CTAs, trust badges
4. Create `ProductsSection.tsx`: 4 product cards with icon, name, desc, demo link — all content from siteContent
5. Create `SolutionsSection.tsx`: 3 solution cards from siteContent
6. Create `DashboardPreviewSection.tsx`: CSS-built mockup panels with hover animations
7. Create `StatsSection.tsx` (Why Tattva): animated counters, editable stats
8. Create `PricingSection.tsx`: monthly/yearly toggle, 3 plan cards, editable from siteContent
9. Create `DemoSection.tsx`: 3 demo cards with links, video placeholder thumbnails
10. Keep `TestimonialsSection.tsx`: reskin to dark glassmorphism
11. Keep `LeadFormSection.tsx`/`ContactPage.tsx`: reskin to dark theme
12. Rewrite `Footer.tsx`: dark theme, editable via siteContent
13. Add `FloatingCTA.tsx`: floating "Book Demo" button
14. Add `ChatbotWidget.tsx`: simple floating AI assistant widget (static UI)
15. Update `HomePage.tsx`: new section order
16. Update `AdminPage.tsx`: add new content keys for all new sections
17. Validate and fix any build errors
