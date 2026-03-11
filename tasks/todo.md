# Euro Rental Cars LLC — Website Redesign

## Project Summary
Complete 7-page luxury car rental website. Dark Karzone-inspired design: near-black backgrounds, yellow/lime (#CDFF00) accents, bold typography, cinematic car photography. Stack: HTML5 + CSS3 + Vanilla JS (GSAP for animations, Swiper.js for carousels).

## File Structure
```
/
├── index.html          (Home)
├── fleet.html          (Standard Fleet)
├── exotic-fleet.html   (Exotic Fleet)
├── booking.html        (Booking Form)
├── programs.html       (Euro Programs)
├── policy.html         (Privacy Policy)
├── contact.html        (Contact)
├── css/
│   └── styles.css      (Global design system + all page styles)
├── js/
│   └── main.js         (Animations, interactions, nav)
└── tasks/todo.md
```
Images are referenced directly from root: `./filename.jpg`

## Todo

### Phase 1: Design System
- [x] Create css/styles.css — design tokens, reset, global typography, components (nav, footer, buttons, cards)
- [x] Create js/main.js — nav behavior, scroll animations, GSAP setup, carousel init

### Phase 2: Pages
- [x] index.html — Home page (hero video, about, featured vehicles showcase, brand logos, customer service, contact strip)
- [x] fleet.html — Standard Fleet page
- [x] exotic-fleet.html — Exotic Fleet grid (10 vehicles)
- [x] booking.html — Booking submission form
- [x] programs.html — Euro Programs (3 programs)
- [x] policy.html — Privacy Policy
- [x] contact.html — Contact page with form + Google Maps embed

### Phase 3: Polish
- [x] Verify all image references resolve correctly
- [x] Verify navigation links across all pages
- [x] JSON-LD structured data — Vehicle Products on exotic-fleet.html, AutoRental on contact.html
- [x] Open Graph meta tags on all pages
- [x] CSS components verified (btn-outline, page-hero, section-pad, etc.)

## Review

### Completed — All 7 Pages
| Page | Key Features |
|------|-------------|
| index.html | Hero video, vehicle showcase carousel (4 exotics), about section, brand logos, contact strip |
| fleet.html | Mercedes showcase, Black Ruby card, booking policy card, exotic fleet teaser |
| exotic-fleet.html | 10-vehicle grid (2 featured), JSON-LD schemas, price range bar, hover book CTA |
| booking.html | Full 15-field form, sticky sidebar, vehicle dropdown, success state |
| programs.html | 3 programs with alternating layouts, Euro Investment full-width card |
| policy.html | Sticky ToC, 10 policy sections, rental/privacy/terms content |
| contact.html | Contact info cards, hours, Google Maps embed, contact form with success state, CTA strip |

### Action Required (Client)
- Replace `https://formspree.io/f/placeholder` in booking.html and contact.html with real Formspree endpoint
- Update Google Maps embed src in contact.html with verified Place ID for the address
- Add real social media URLs for X/Twitter, LinkedIn, Instagram in all footers (currently `href="#"`)

## Design Decisions
- Images referenced as `./filename.jpg` (all in root dir)
- Google Fonts: Bebas Neue (display headlines) + Inter (body) — both CDN
- GSAP via CDN for scroll animations + hero effects
- Swiper.js via CDN for vehicle carousel
- No build step — pure static HTML/CSS/JS
- SVG logo: "EURO" in #CDFF00, "RENTAL CARS LLC" in white, geometric diamond mark

## Notes
- corvette_stingray.jpg missing from brief's exotic list — it's in the images, include it
- hero_video.mp4 is in root — referenced as `./euro_hero_video.mp4`
- No `/euro_images/` subdirectory exists — all images are in project root
