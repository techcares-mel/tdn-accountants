# CLAUDE.md — TDN Accountants Website

## Project Overview

**Business Name: TDN Accountants & Advisers**

A premium, modern landing page for TDN Accountants & Advisers — a professional accounting and advisory firm based in Footscray, Victoria.

**Design inspiration:** flecto.io / status.app aesthetic from godly.website — ultra-dark backgrounds, massive bold typography, bento-grid feature layouts, gradient text highlights, glowing card borders, product dashboard mockups, and a colorful gradient CTA section. Think: a premium SaaS product site, adapted for a trusted accounting firm.

**Goal:** Convey precision, modernity, and absolute trust. The site should feel like the firm operates at the cutting edge — not a traditional accounting firm, but a financially unstoppable partner.

---

## Logo

**File:** `assets/logo.png` (TDN Accountants & Advisers — red square with t/d/n letters)

- Use `assets/logo.png` in nav and footer — never text or emoji replacements
- Display at height `44px` in nav; `52px` in footer
- Add `filter: brightness(1.05)` on hover

---

## Business Details

- **Address:** Level 1, 73 Nicholson Street, Footscray, Victoria 3011, AU
- **Phone:** (to be added)
- **Email:** (to be added)

---

## Tech Stack

- **Structure:** Plain HTML5 (semantic elements)
- **Styling:** Vanilla CSS (no Tailwind, no Bootstrap) — all from scratch using CSS custom properties
- **Logic:** Vanilla JavaScript (ES6+)
- **Fonts:** Google Fonts — `Inter` (body/UI), `Outfit` (headings/display)
- **Icons:** Inline SVGs only — no external icon libraries
- **Images:** `assets/` folder — logo.png + section visuals

---

## Design System

### Color Palette

| Token                | Value       | Usage                                      |
|----------------------|-------------|--------------------------------------------|
| `--color-bg`         | `#07090F`   | Page background (near-black)               |
| `--color-bg-2`       | `#0A0E18`   | Alternate section backgrounds              |
| `--color-surface`    | `#0D1117`   | Cards, panels                              |
| `--color-surface-2`  | `#141C28`   | Elevated/hover card states                 |
| `--color-border`     | `#1A2535`   | Default borders                            |
| `--color-border-glow`| `#C0272D30` | Glowing border (brand red, low opacity)    |
| `--color-primary`    | `#C0272D`   | Brand red — CTAs, highlights (from logo)   |
| `--color-primary-lg` | `#E8373E`   | Lighter red — hover states                 |
| `--color-accent`     | `#00D4AA`   | Teal/green — trust, growth, positive       |
| `--color-accent-2`   | `#4F8EF7`   | Blue — data, reporting, tech               |
| `--color-text`       | `#DDE3ED`   | Body text                                  |
| `--color-muted`      | `#6B7A92`   | Secondary text, labels                     |
| `--color-white`      | `#FFFFFF`   | Headings, high-contrast text               |
| `--gradient-brand`   | `linear-gradient(135deg, #C0272D, #E8373E)` | Primary gradient |
| `--gradient-accent`  | `linear-gradient(135deg, #00D4AA, #4F8EF7)` | Accent gradient  |
| `--gradient-glow`    | `radial-gradient(ellipse at center, #C0272D20 0%, transparent 70%)` | Hero glow |

### Typography

```css
--font-heading: 'Outfit', sans-serif;
--font-body:    'Inter', sans-serif;

/* Display sizes for hero/section headings */
--text-xs:      0.75rem;
--text-sm:      0.875rem;
--text-base:    1rem;
--text-lg:      1.125rem;
--text-xl:      1.25rem;
--text-2xl:     1.5rem;
--text-3xl:     1.875rem;
--text-4xl:     2.25rem;
--text-5xl:     3rem;
--text-6xl:     3.75rem;
--text-7xl:     4.5rem;   /* Hero H1 on desktop */
--text-8xl:     6rem;     /* Max display size */

/* Heading weights */
--weight-heading: 800;
--weight-display: 900;
--weight-body: 400;
--weight-medium: 500;
--weight-semi: 600;
```

### Spacing

```css
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
--space-32: 8rem;
```

### Border Radius

```css
--radius-sm:   6px;
--radius-md:   12px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-2xl:  40px;
--radius-full: 9999px;
```

### Shadows & Glow Effects

```css
--shadow-card:    0 1px 3px rgba(0,0,0,.4), 0 4px 16px rgba(0,0,0,.3);
--shadow-hover:   0 8px 32px rgba(0,0,0,.5), 0 0 0 1px var(--color-border);
--glow-primary:   0 0 40px rgba(192,39,45,.25), 0 0 80px rgba(192,39,45,.1);
--glow-accent:    0 0 40px rgba(0,212,170,.2);
--glow-card:      0 0 0 1px #C0272D30, 0 8px 32px rgba(192,39,45,.1);
```

---

## Page Structure

Single-page layout (`index.html`). Sections in order:

---

### 1. Navigation (`<nav id="navbar">`)

**Style:** Transparent on load → blurred dark (`backdrop-filter: blur(20px)`) on scroll

- **Left:** `assets/logo.png` at `height: 44px`
- **Center:** Links — Services, About, Pricing, Contact
- **Right:** Ghost "Log in" link + filled red CTA "Book a Consultation"
- Sticky; transitions smoothly
- Mobile: hamburger icon → full-screen overlay menu

---

### 2. Hero (`<section id="hero">`)

**Layout:** Two columns — left: text + CTAs; right: floating dashboard card mockup

**Text block:**
- Small badge pill: `★ Trusted by 500+ Australian businesses`
- H1 (display size, 7xl desktop): Two-line headline with gradient word:
  > **"Your Finances,**
  > **Handled with** `<span class="gradient-text">Precision.</span>`"
- Subheading (muted, lg): "Expert accounting, tax strategy, and advisory — built for Australian businesses that want to grow."
- Two CTAs: `[Book a Free Consultation]` (red filled) + `[See Our Services →]` (ghost)
- Small trust row below CTAs: ✓ No lock-in  ✓ Free first consult  ✓ 15+ years experience

**Right visual:**
- Floating card mockup simulating a financial dashboard (HTML/CSS built — no image needed):
  - Revenue chart bar (using CSS bars)
  - "Tax Saved: $124,500" metric card
  - "Next BAS Due: 28 Oct" reminder card
  - Cards have subtle glow borders and backdrop-blur

**Background:**
- Deep dark `#07090F`
- Large radial glow behind H1 (`--gradient-glow`)
- Subtle animated floating gradient orbs (CSS keyframes, low opacity)

---

### 3. Logo / Trust Strip (`<section id="trust">`)

**Style:** Dark strip, no section heading

- Label: "Proudly serving businesses across Australia"
- 5–6 placeholder business category logos (text-based if no images): "Retail", "Construction", "Healthcare", "Hospitality", "Legal", "Property"
- Subtle horizontal scroll animation (CSS marquee) on mobile

---

### 4. Features — Bento Grid (`<section id="features">`)

**Style:** Inspired by flecto.io's "Built Different" section — bento-style card grid

- Section label (pill badge): "Why TDN"
- H2: "Accounting that works as **hard as you do**" (bold word gradient)
- Subtext: "We combine deep expertise with modern tools to give you full financial clarity."

**Bento grid layout (CSS Grid, not equal cards):**
```
[ Large card — Tax Compliance (2 cols wide)  ] [ Small — Payroll    ]
[ Small — Real-Time Reports                  ] [ Large — Advisory (2 cols wide) ]
```

Each card:
- Dark surface (`--color-surface`) with `1px` border (`--color-border`)
- Glowing border on hover (`--glow-card`)
- Inline SVG icon (top-left, accent colored)
- Short bold title + 1-sentence description
- Large cards include a small visual element (CSS chart bars, a metric display)

Cards:
1. **Tax Compliance & Lodgement** *(large)* — "Stay penalty-free. We handle BAS, income tax, and FBT on time, every time."
2. **Payroll Management** *(small)* — "STP compliant, always on time."
3. **Real-Time Reporting** *(small)* — "Your numbers, live and clear."
4. **Dedicated Business Advisor** *(large)* — "A real expert in your corner — not a call centre."

---

### 5. Services (`<section id="services">`)

**Style:** Alternating two-column rows (text / visual mockup), flecto.io booking-flow style

Each service row:
- Tag label (e.g. "01 — Bookkeeping")
- H3 heading
- 2–3 sentence description
- `Learn more →` link in brand red
- Right side: CSS-built visual card (data table mockup, chart, calendar, etc.)

Services:
1. **Bookkeeping & Reconciliation** — "Never lose track of a transaction."
2. **Tax Planning & Lodgement** — "Maximise your return, minimise your risk."
3. **Business Advisory** — "Strategy that moves the needle."
4. **SMSF & Superannuation** — "Your retirement, managed with care."

---

### 6. Stats Strip (`<section id="stats">`)

**Style:** Full-width dark strip with large display numbers — glowing accent colors

Layout: 4 columns

| Stat | Label |
|------|-------|
| `500+` | Clients Served |
| `$50M+` | Taxes Saved |
| `15+` | Years Experience |
| `98%` | Client Retention |

- Numbers animate (count-up) via `IntersectionObserver` when scrolled into view
- Number color: alternates between `--color-primary` and `--color-accent`
- Thin top/bottom border separating from adjacent sections

---

### 7. Testimonials (`<section id="testimonials">`)

**Style:** 3-card horizontal grid

- Section label: "Client Stories"
- H2: "Trusted by businesses across Victoria"
- Each card:
  - `"..."` quote text
  - Client name + business type
  - ★★★★★ star rating (accent color)
  - Subtle card lift on hover (`translateY(-4px)`)
  - Left border accent stripe in `--color-primary`

---

### 8. Pricing (`<section id="pricing">`)

**Style:** 3 tier cards — Starter / Growth / Enterprise

- Section label: "Simple Pricing"
- H2: "Transparent, no-surprises pricing"
- Cards: surface background, border, feature list with ✓ checkmarks
- **Growth** card: glowing red border (`--glow-card`), "Most Popular" badge
- Each card has a CTA button

---

### 9. CTA Banner (`<section id="cta">`)

**Style:** Full-width gradient section — the "Be unstoppable" moment

- Background: `linear-gradient(135deg, #C0272D 0%, #8B1A1A 50%, #0D1117 100%)`
- Large H2 (display): **"Be financially unstoppable."**
- Subtext: "Join 500+ Australian businesses who trust TDN to handle their numbers."
- Single large CTA button: `Book a Free Consultation` (white filled, red text)
- Subtle noise/grain texture overlay (CSS `background-image: url(data:...)`)

---

### 10. Footer (`<footer>`)

- Logo (`assets/logo.png`, height 52px) + tagline
- **Address block:**
  ```
  Level 1, 73 Nicholson Street
  Footscray, Victoria 3011, AU
  ```
- 4-column links: Services | Company | Resources | Legal
- Social icons: LinkedIn, Facebook, Instagram (inline SVG)
- Bottom bar: `© 2026 TDN Accountants & Advisers. All rights reserved.`

---

## Animation & Interactions

- **Scroll reveal:** All sections fade-in + slide-up 24px via `IntersectionObserver` — `opacity: 0 → 1`, `translateY(24px → 0)`, 0.5s ease
- **Staggered children:** Feature cards and grid items reveal with 80ms stagger delay
- **Count-up:** Stats animate from 0 to target on scroll-into-view
- **Hero orbs:** Floating radial gradient orbs, slow `keyframes` animation (12–18s loops), `opacity: 0.15`
- **Gradient text pulse:** `.gradient-text` has subtle background-position animation
- **Hover — cards:** `translateY(-4px)` + `box-shadow: var(--shadow-hover)` + glow border fade-in
- **Hover — buttons:** Scale `1.02` + brightness shift
- **Nav scroll:** `background: transparent` → `background: rgba(7,9,15,.85)` + `backdrop-filter: blur(20px)`
- **Bento cards:** Larger cards get a slow radial gradient sweep on hover

---

## Gradient Text Utility

```css
.gradient-text {
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-accent {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Apply to key words in H1, H2s for visual punch.

---

## SEO Requirements

- `<title>`: "TDN Accountants & Advisers | Expert Accounting in Footscray, Melbourne"
- `<meta name="description">`: "TDN Accountants & Advisers — expert tax, bookkeeping, and business advisory services for Australian businesses. Based in Footscray, Victoria."
- One `<h1>` per page; logical `h2 → h3` hierarchy
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`
- All images have descriptive `alt` attributes
- `lang="en"` on `<html>`

---

## File Structure

```
First Project/
├── index.html            # Main single-page website
├── style.css             # All styles — design tokens + components
├── main.js               # Scroll animations, count-up, nav, bento interactions
├── assets/
│   ├── logo.png          # TDN Accountants & Advisers logo (USE THIS)
│   ├── logo.svg          # SVG fallback
│   └── status.app__ref=godly.png  # Design reference screenshot
└── CLAUDE.md             # This file
```

---

## Development Notes

- **Business Name:** TDN Accountants & Advisers (use full name in footer/SEO; "TDN" shorthand in nav)
- **Logo:** Always use `assets/logo.png` — never text or emoji
- **Mobile-first responsive:** Breakpoints at `480px`, `768px`, `1024px`, `1280px`
- All sections must have **scroll reveal animations** via `IntersectionObserver`
- **Bento grid** collapses to single column on mobile
- No external CSS frameworks — all custom
- Use CSS custom properties exclusively for theming
- JavaScript must be unobtrusive — page works without JS
- `preconnect` for Google Fonts in `<head>`
- Hamburger → full-screen overlay menu on mobile
- Touch-friendly tap targets: minimum `44px`
- Dashboard mockups in hero and services sections are **CSS-built** (no images needed) — use div/span elements styled to look like financial UI components

---

## Tone & Brand Voice

- **Bold + trustworthy** — confident numbers, real results
- **Modern but approachable** — premium feel, not corporate stiffness
- **Australian** — use AUD, ATO, BAS, STP references naturally
- **Action-oriented** — CTAs use verbs: "Book", "Start", "Get", "See"
- Avoid clichés — no handshake stock photos, no briefcase emojis

---

*Last updated: May 2026 — TDN Accountants & Advisers*
