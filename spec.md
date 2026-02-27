# Tattva Innovation Website

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full marketing website for Tattva Innovation, an Indian tech company
- Hero section with headline, subheading, "Book Free Demo" CTA and "Chat on WhatsApp" CTA
- Services section with 4 cards: Voter Management Software, Inward-Outward & Visitor Management, Website Development, Custom AI Automation Apps
- Why Choose Us section highlighting: affordable pricing, custom-built solutions, secure data, fast deployment, local India support
- How It Works section (3-step process)
- Testimonials section with placeholder testimonials (swappable via admin panel)
- FAQ section with accordion
- Lead capture form (Name, Phone, Organization Type, Message) -- saves to backend
- Floating WhatsApp chat button linked to +9822422123
- Blog section: functional blog with public post listing and detail pages
- Admin panel (login-protected) to: create/edit/delete blog posts, manage/edit testimonials
- Authorization for admin access

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan

### Backend (Motoko)
- Lead model: id, name, phone, orgType, message, createdAt
- Blog post model: id, title, slug, content (markdown), excerpt, author, publishedAt, isPublished
- Testimonial model: id, quote, name, role, organization, isVisible
- APIs:
  - submitLead(name, phone, orgType, message) -> Result
  - getPublishedPosts() -> [Post]
  - getPost(slug) -> ?Post
  - getTestimonials() -> [Testimonial]
  - Admin (auth-gated): createPost, updatePost, deletePost, updateTestimonial, getLeads, toggleTestimonialVisibility

### Frontend Pages/Sections
- `/` -- Landing page with all sections (Hero, Services, Why Us, How It Works, Testimonials, FAQ, Lead Form)
- `/blog` -- Blog listing page
- `/blog/:slug` -- Blog post detail page
- `/admin` -- Admin panel (login required): tabs for Blog Posts, Testimonials, Leads

### Design
- White background, blue (#1D4ED8 range) and dark charcoal (#1F2937) accents
- Mobile-first responsive
- Floating WhatsApp button (bottom-right, fixed) linking to https://wa.me/9822422123
- Clean typography, professional, minimal
