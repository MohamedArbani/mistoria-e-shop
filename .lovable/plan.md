

# MISTORIA Website Redesign — Luxury Dark-First Design

## Overview
Redesign the landing page and all public pages to match the reference image's premium dark perfumery aesthetic: deep black backgrounds, gold/amber accents, dramatic hero sections, animated counters, timeline sections, and a rich editorial feel. Light mode will mirror the structure with inverted tones. All animations use Framer Motion.

## Build Fix
- **Calendar.tsx**: Replace deprecated `IconLeft`/`IconRight` with the current `react-day-picker` v9 API (`Chevron` component or equivalent).

## Design Token Updates (index.css)
- Dark mode: deeper blacks (`0 0% 3%`), richer card bg (`0 0% 6%`), gold primary stays, border gets subtle gold tint
- Light mode: warm cream bg stays, slightly refined card/muted tones
- Add new CSS variables: `--gold-glow` for box-shadow effects, `--section-alt` for alternating section backgrounds

## Landing Page Redesign (Index.tsx + HeroSection.tsx)
Inspired directly by the reference, the landing page will have **7 sections**:

1. **Hero Section** — Split layout: left side has heading with gold italic accent ("Sculpting Dreams in a Bottle"), subtitle text, "View All Products" button, trust badges (100+ products, awards icons). Right side shows hero perfume image with floating stats (100k+ Trusted Clients, 80k+ Luxury Perfume, 10Y+ history). Animated counters using Framer Motion `useMotionValue` + `useTransform`. Decorative gold dotted line separator at bottom.

2. **"Elevate Your Senses" Section** — Two-column: left has heading + "Explore More" button, right shows 4 featured product cards in a grid with discount/heart badges, prices with old/new styling. Uses `staggerChildren` animation.

3. **"Journey of Elegance" Timeline Section** — Left side: heading + description + "View Full Details" CTA. Right side: a moody perfume image with golden overlay. Below: star rating (5.0), review count, and "10k+ Bought last month" stat. Framer Motion scroll-triggered reveal.

4. **"Tradition Meets Innovation" Section** — Large heading left, description + CTA right. Below: 6-card grid (3x2) with feature cards — "Exclusivity Redefined", "Artisanal Elegance", "Limited Edition Luxury", "Rare and Exquisite", "Time-Honored" (x2). Center has a vertical perfume image. Gold borders on cards, `whileInView` stagger animations.

5. **"Limited Editions Unveiled" CTA** — Full-width dark section with large heading, "Discover the Collection" button, subtle gold accent line.

6. **Featured Products Carousel** — Horizontal scroll/carousel of product cards with heart icons, ratings, "NEW" badges. Uses existing `ProductCard` but restyled with dark card backgrounds and gold accents. Optional swipe on mobile.

7. **Newsletter / Footer CTA** — Email subscription input + "Subscribe" button. Social media icons row. Links to Privacy, About, Contact.

## Header Redesign (Header.tsx)
- Semi-transparent dark background with blur (`bg-background/60 backdrop-blur-xl`)
- Logo with decorative gold leaf/swirl icon (SVG inline, not image)
- Nav links: "Home", "Signature Collection" (maps to Collections), "Limited Edition" (same), "About Us"
- Right side: search icon, cart icon, theme toggle
- Mobile: slide-in drawer with Framer Motion `AnimatePresence`

## Footer Redesign (Footer.tsx)
- Dark bg with Logo + tagline, social media icons (Facebook, Twitter, YouTube, Instagram, Pinterest)
- Links row: Privacy Policy, About Us, Contact Us
- Newsletter section on right: "Subscribe For Latest Update" with email input
- Copyright bottom

## ProductCard Restyling (ProductCard.tsx)
- Dark card background in dark mode, rounded corners
- Heart/wishlist icon top-right
- Discount badge top-left (gold badge)
- Price with strikethrough original price
- Gold "add to cart" circle button

## Other Pages
- **Collections**: Add a dark hero banner at top with page title, keep existing filter grid but with restyled filter pills (gold outline active state)
- **About**: Add parallax image sections, animated stat counters, editorial two-column layout
- **Contact**: Restyle cards with gold icon backgrounds, add subtle card glow in dark mode
- **FAQ**: Keep accordion but add gold left border accent on expanded items

## Framer Motion Animations (throughout)
- `initial/animate` page transitions on route change
- `whileInView` with `staggerChildren` for grids and feature cards
- `useScroll` + `useTransform` for parallax hero background
- Animated number counters for stats (100k+, 80k+, etc.)
- `AnimatePresence` for mobile menu and cart drawer
- Hover scale/glow effects on product cards and CTAs
- Smooth section reveals with `y: 40 → 0` + `opacity: 0 → 1`

## Files to Create
- `src/components/organisms/StatsCounter.tsx` — Animated counter component
- `src/components/organisms/TimelineSection.tsx` — Journey/timeline section  
- `src/components/organisms/FeaturesGrid.tsx` — Tradition/Innovation feature cards
- `src/components/organisms/NewsletterSection.tsx` — Email subscribe + socials
- `src/components/organisms/ProductCarousel.tsx` — Horizontal product scroll

## Files to Modify
- `src/index.css` — Updated design tokens
- `src/pages/Index.tsx` — Complete landing page rebuild with 7 sections
- `src/components/organisms/HeroSection.tsx` — Split-layout hero with stats
- `src/components/organisms/Header.tsx` — Transparent + blur header with new nav
- `src/components/organisms/Footer.tsx` — Rich footer with socials + newsletter
- `src/components/molecules/ProductCard.tsx` — Dark card styling + wishlist icon
- `src/components/atoms/Logo.tsx` — Add decorative gold icon
- `src/components/ui/calendar.tsx` — Fix build error (IconLeft/IconRight)
- `src/pages/About.tsx`, `Contact.tsx`, `FAQ.tsx`, `Collections.tsx` — Style refinements

## Technical Notes
- No database or backend changes needed
- All existing product types, categories, cart logic, and admin panel remain unchanged
- Framer Motion is already installed — just extending usage
- Hero images continue using existing assets from `src/assets/`

