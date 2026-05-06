# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mobclub** is a React + Vite SPA for a premium pilates studio in A Coruña, Spain — a marketing/booking website with integrated email capture and reservation system.

- **Framework**: React 19.2 with React Router v7
- **Build Tool**: Vite 7.2.4
- **Language**: JavaScript (JSX)
- **Styling**: Per-component CSS + global CSS variables
- **Deployment**: Netlify

## Commands

```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build
npm run lint     # ESLint check
```

## Routing

Routes are defined in [src/App.jsx](src/App.jsx). All routes are wrapped in `PageTransition` for consistent animations. `Nav` is rendered on all valid routes.

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Landing page composed of sections |
| `/reserva` | Reserva | Embeds external Viday iframe |
| `/embarazo` | Embarazo | Pregnancy program |
| `/posparto` | Posparto | Postpartum program |
| `/legal` | Legal | Privacy/legal info |
| `/empleo` | Empleo | Careers page |
| `/confirmacion` | Confirmacion | Post email-signup confirmation |
| `/bienvenida` | Bienvenida | Welcome page |

Hash anchors (e.g. `/#precios`) are handled by `smoothScrollTo()` in [src/utils/smoothScroll.js](src/utils/smoothScroll.js), which supports both in-page scrolling and cross-page navigation with a hash.

## Architecture

### Section Components

Most page sections use the `SectionLayout` wrapper ([src/components/SectionLayout.jsx](src/components/SectionLayout.jsx)), which handles background images, gradient overlays, and scroll-reveal animations automatically. Content is split into `section1Content` and `section2Content` props for layout.

```jsx
<SectionLayout
  sectionId="contact"
  h4Text="Contacto"
  h2Lines={["Ponte en contacto", "con nosotros"]}
  backgroundImage={backgroundImage}
  section1Content={<Map />}
  section2Content={<Cards />}
/>
```

### Animations

- **Scroll reveal**: `useScrollReveal` hook ([src/hooks/useScrollReveal.js](src/hooks/useScrollReveal.js)) uses `IntersectionObserver` (threshold: 0.08) to add `.revealed` class when elements enter the viewport.
- **CSS classes**: `.reveal` / `.revealed` are defined in [src/styles/global.css](src/styles/global.css) with stagger variants.
- **Typewriter**: `TypewriterText` component animates the hero text letter-by-letter.

### Email Capture

`EmailCapture` and `EmailPhoneCapture` POST to an n8n webhook:

```
https://n8n.gridded.agency/webhook/mobclubEmailCapture
```

Payload includes email, tag, acceptance status, page context (URL, path, referrer), and browser info. On success, navigates to `/confirmacion`.

### SEO

Each page renders a `SEO` component ([src/components/SEO.jsx](src/components/SEO.jsx)) that dynamically sets `<title>`, `<meta description>`, and OG/Twitter tags. Site URL is hardcoded as `https://mobclub.es`.

### CSS Architecture

Global CSS variables are in [src/styles/global.css](src/styles/global.css):
- Colors: `--color-mob-green` (primary), `--color-white`, `--color-black`, `--color-gray`, `--color-greige`, `--color-gray-dark`
- Font: `--font-inter`
- Button classes: `.btn-cta`, `.btn-section`, `.btn-action`

Component styles are colocated alongside each component file. Mobile-first with breakpoint at `800px`.

## External Integrations

| Integration | Purpose |
|---|---|
| n8n webhook | Email capture form submissions |
| Viday (iframe) | Class booking on `/reserva` |
| Google Tag Manager (`GTM-NM35ZJHL`) | Analytics |
| Meta Pixel | Marketing (fires after cookie consent) |
| Usercentrics (`nAvPFfvqszkW2y`) | Cookie consent manager |
| Google Maps embed | Location in Contact section |
| Google Fonts | Inter (500, 700, 900) loaded in `index.html` |

## Netlify Config

[netlify.toml](netlify.toml) sets `npm run build` with `dist/` as publish dir. A `200` catch-all redirect ensures all routes serve `index.html` for SPA fallback.

## Adding a New Page

1. Create `src/pages/NewPage.jsx` with `SEO` component at top
2. Add route in [src/App.jsx](src/App.jsx)
3. Add nav link in [src/components/Nav.jsx](src/components/Nav.jsx)

## Adding a Section to Home

1. Create `src/components/NewSection.jsx` + colocated `.css`
2. Use `SectionLayout` for consistent structure and scroll reveal
3. Import and mount in [src/pages/Home.jsx](src/pages/Home.jsx)
