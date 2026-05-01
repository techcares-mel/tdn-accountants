# CLAUDE.md — TDN Accountants Website

## Project Overview

**Business Name: TDN Accountants**

This is a modern, premium landing page for TDN Accountants, a professional accounting services firm.
The design is inspired by sleek SaaS product sites: bold hero sections, clean feature cards,
trust-building sections, and a strong call-to-action footer. The goal is to convey professionalism,
trustworthiness, and modern expertise to potential clients.

---

## Tech Stack

- **Structure**: Plain HTML5 (semantic elements)
- **Styling**: Vanilla CSS (no Tailwind, no Bootstrap)
- **Logic**: Vanilla JavaScript (ES6+)
- **Fonts**: Google Fonts — `Inter` (body), `Outfit` (headings)
- **Icons**: Inline SVGs or unicode symbols; no external icon libraries unless specified
- **Images**: Generated via AI image tool or royalty-free placeholders

---

## Design System

### Color Palette

| Token            | Value       | Usage                              |
|------------------|-------------|------------------------------------|
| `--color-bg`     | `#0B0F1A`   | Dark page background               |
| `--color-surface`| `#131929`   | Cards, sections                    |
| `--color-border` | `#1E2D45`   | Subtle borders                     |
| `--color-primary`| `#4F8EF7`   | CTAs, links, highlights            |
| `--color-accent` | `#00D4AA`   | Secondary accent (trust/growth)    |
| `--color-text`   | `#E8EDF5`   | Body text                          |
| `--color-muted`  | `#8896AB`   | Secondary / subheadings            |
| `--color-white`  | `#FFFFFF`   | Headings                           |

### Typography

```css
--font-heading: 'Outfit', sans-serif;
--font-body:    'Inter', sans-serif;

--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   1.25rem;
--text-2xl:  1.5rem;
--text-3xl:  1.875rem;
--text-4xl:  2.25rem;
--text-5xl:  3rem;
--text-6xl:  3.75rem;
```

### Spacing

```css
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
```

### Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 9999px;
```

---

## Page Structure

The website is a single-page layout (`index.html`) with these sections in order:

### 1. Navigation (`<nav>`)
- Logo (left): firm name + small shield/chart icon
- Nav links (center): Services, About, Pricing, Blog, Contact
- CTA button (right): "Book a Free Consultation" — filled primary color
- Sticky on scroll, subtle blur backdrop (`backdrop-filter`)

### 2. Hero Section (`<section id="hero">`)
- Tag line badge: e.g. `✦ Trusted by 500+ businesses`
- H1: Bold, large — e.g. **"Your Finances, Handled with Precision"**
- Subheading: 1–2 sentence value proposition
- Two CTA buttons: Primary ("Get Started") + Ghost ("See Our Services")
- Hero visual: Illustrated dashboard mockup or abstract financial graphic (generated image)
- Subtle animated gradient background or mesh

### 3. "Built Different" / Features Grid (`<section id="features">`)
- Section label: "Why Choose Us"
- H2: "Accounting that works as hard as you do"
- 3–4 feature cards in a grid:
  - 🔒 **Tax Compliance** — Stay penalty-free with expert filing
  - 📊 **Real-Time Reporting** — Always know where your money stands
  - 💼 **Payroll Management** — Accurate, on-time, every time
  - 🤝 **Dedicated Advisor** — A real person in your corner

### 4. Services Detail (`<section id="services">`)
- Two-column alternating layout (text left / visual right, then reversed)
- Services covered:
  1. Bookkeeping & Reconciliation
  2. Tax Planning & Lodgement
  3. Business Advisory
  4. SMSF & Superannuation
- Each with a short description and a "Learn more →" link

### 5. Social Proof / Stats (`<section id="stats">`)
- Dark background strip
- 3–4 bold stats:
  - `500+` Clients Served
  - `$50M+` Taxes Saved
  - `15+` Years Experience
  - `98%` Client Retention
- Animated count-up on scroll into view (IntersectionObserver)

### 6. Testimonials (`<section id="testimonials">`)
- Section label: "Client Stories"
- H2: "What our clients say"
- 3 testimonial cards with: quote, client name, business type, star rating
- Subtle card hover lift effect

### 7. Pricing (`<section id="pricing">`)
- 3 tier cards: Starter / Growth / Enterprise
- Each card: price/month, feature list, CTA button
- Most popular card highlighted with primary gradient border

### 8. Blog / Resources (`<section id="blog">`)
- 3 article cards with category tag, title, excerpt, and read-time
- Hover effect reveals "Read article →"

### 9. CTA Banner (`<section id="cta">`)
- Full-width dark section with accent gradient
- H2: "Be financially unstoppable."
- Subtext + email capture form or "Book Now" button

### 10. Footer (`<footer>`)
- Logo + tagline
- 4-column links: Services | Company | Resources | Legal
- Social icons (LinkedIn, Facebook, Instagram)
- Copyright line

---

## Animation & Interactions

- **Scroll reveal**: Sections fade + slide up on scroll (`IntersectionObserver`)
- **Count-up animation**: Stats numbers count up when visible
- **Hover effects**: Cards lift with `transform: translateY(-4px)` + shadow
- **Button states**: Smooth `transition` on hover/active
- **Nav**: Transparent → blurred dark on scroll
- **Hero gradient**: Slow animated mesh or gradient shift

---

## SEO Requirements

- `<title>`: "PrecisionBooks | Accounting & Tax Services"
- `<meta name="description">`: Compelling 150-char description
- One `<h1>` per page; logical heading hierarchy (h2 → h3)
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- All images have descriptive `alt` attributes
- `lang="en"` on `<html>`

---

## File Structure

```
First Project/
├── index.html          # Main single-page website
├── style.css           # All styles (design tokens + components)
├── main.js             # Scroll animations, count-up, nav behavior
├── assets/
│   ├── hero.webp       # Hero section image
│   ├── service-1.webp  # Bookkeeping visual
│   ├── service-2.webp  # Tax planning visual
│   └── logo.svg        # Site logo
└── CLAUDE.md           # This file
```

---

## Development Notes

- **Business Name**: TDN Accountants (use consistently throughout)
- **Mobile-first responsive design**; breakpoints at `480px`, `768px`, and `1200px`
- All sections must have **scroll animations** (fade-in, slide-up, scale-in) via IntersectionObserver
- No external CSS frameworks; all styles written from scratch
- Prefer CSS custom properties for theming
- JavaScript must be unobtrusive — page works without JS enabled
- Keep all IDs unique and descriptive for browser testing
- Use `preconnect` for Google Fonts in `<head>`
- Hamburger menu for mobile navigation
- Touch-friendly tap targets (min 44px)

---

## Tone & Brand Voice

- **Professional** but **approachable** — not stiff or overly corporate
- **Confident** — numbers, results, and guarantees front and center
- **Modern** — design reflects that this firm uses current tools and thinking
- Avoid stock-photo clichés; prefer abstract financial illustrations

---

*Last updated: May 2026 — TDN Accountants*
