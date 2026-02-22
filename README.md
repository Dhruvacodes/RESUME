# Dual Axis — Systems ↔ Markets

> An immersive portfolio experience at the intersection of **distributed systems engineering** and **quantitative markets**.

**Live →** [dhruvagrawal.app](https://dhruvagrawal.app)

---

## Architecture

The portfolio is built as a **horizontal tri-panel canvas** (300vw) with three distinct "worlds":

| World | Theme | Design Language |
|-------|-------|----------------|
| **Systems** | Distributed infrastructure | Industrial editorial — monospace, grid overlays, clip-path reveals |
| **Core** | Identity & navigation | Warm cream minimal — serif type, animated counters |
| **Markets** | Quantitative finance | Dark glass fintech — emerald glow, glass cards, shimmer borders |

Users navigate horizontally via scroll, drag, or touch. World transitions trigger atmospheric GSAP timelines with adaptive cursor, status bars, and ambient backgrounds.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router), TypeScript (strict) |
| Styling | TailwindCSS 3.4, CSS custom properties |
| Animation | GSAP 3.14, Framer Motion 12 |
| Scroll | Lenis smooth scroll |
| State | Zustand 5 |
| Content | MDX via gray-matter + next-mdx-remote |
| Deployment | Vercel (standalone output, edge-optimized) |

## Getting Started

```bash
# Clone & install
git clone https://github.com/your-username/dual-axis.git
cd dual-axis
npm install

# Create environment file
cp .env.example .env.local

# Development
npm run dev        # → http://localhost:3000

# Quality checks
npm run lint       # ESLint
npm run type-check # TypeScript strict
npm run format     # Prettier

# Production build
npm run build
npm run start
```

## Project Structure

```
dual-axis/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page — orchestrates intro + axis
│   ├── globals.css         # Design tokens, utilities, animations
│   ├── robots.ts           # Dynamic robots.txt
│   ├── sitemap.ts          # Dynamic sitemap.xml
│   ├── resume/page.tsx     # Resume page
│   ├── play/page.tsx       # Visual experiments
│   └── ideas/              # MDX-powered blog
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── AxisContainer.tsx   # 300vw horizontal canvas
│   ├── SystemsWorld.tsx    # Left panel — systems engineering
│   ├── CoreWorld.tsx       # Center panel — identity
│   ├── MarketsWorld.tsx    # Right panel — quantitative markets
│   ├── WorldTransition.tsx # GSAP atmospheric transitions
│   ├── IntroOverlay.tsx    # Cinematic intro sequence
│   ├── CursorManager.tsx   # World-adaptive cursor
│   ├── Analytics.tsx       # GA / Plausible (env-gated)
│   └── ...                 # AnimatedCounter, GlowBackground, etc.
├── lib/
│   ├── store.ts            # Zustand global state
│   ├── lenis.ts            # Smooth scroll singleton
│   ├── worldMemory.ts      # Scroll position persistence
│   └── mdx.ts              # MDX loader utilities
├── content/ideas/          # MDX articles
├── public/                 # Static assets
├── next.config.mjs         # Production config + security headers
├── tailwind.config.ts      # Custom design tokens
├── vercel.json             # Deployment + redirect config
└── .github/workflows/      # CI pipeline
```

## Deployment

The project is configured for **Vercel** with:

- Standalone output for minimal cold starts
- Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- AVIF/WebP image optimization
- www → non-www redirect
- Font caching (1 year immutable)

Push to `main` triggers CI (lint → type-check → build). Vercel auto-deploys on success.

## Performance

- **GSAP timeline cleanup** — previous timelines killed before new ones start
- **Reduced motion** — glow animations disabled for `prefers-reduced-motion: reduce`
- **Mobile optimization** — glow disabled on viewport < 768px, custom cursor hidden
- **Passive event listeners** — all scroll/touch/mouse handlers
- **rAF-driven animations** — no `setInterval` anywhere
- **Dynamic imports** — heavy components loaded on demand

## License

MIT © Dhruv Agrawal
