# Lovable Build Prompt — Dhruv Agrawal Portfolio: "Dual Axis"

> **Copy-paste this entire document into Lovable as the project prompt.**

---

## Project Overview

Build a stunning, production-ready personal portfolio website for **Dhruv Agrawal** — a Technology & Finance focused analyst. The site is called **"Dual Axis"** and is built around a unique concept: the user navigates between three "worlds" — **Systems** (technology/engineering), **Core** (the central landing hub), and **Markets** (quantitative finance). On desktop, these three worlds sit side-by-side on a horizontal axis and the user scrolls/drags horizontally to move between them. On mobile, the three worlds stack vertically for a natural scroll experience.

The aesthetic is ultra-refined, minimal, and editorial. Think Bloomberg Terminal meets a Swiss-design portfolio meets a luxury brand website. No clutter, no gimmicks — every pixel is intentional. Typography-driven with generous whitespace, subtle animations, and a sense of quiet authority.

**Domain:** dhruvagrawal.app  
**Stack:** React + TypeScript + Tailwind CSS + Framer Motion + GSAP + Zustand for state management  
**Deployment:** Make it deployable and responsive across all devices.

---

## Design System & Visual Language

### Color Palette

```
Systems World (Light, Architectural):
  --systems-bg:     #EBEBE8  (warm light gray)
  --systems-fg:     #18181B  (near-black)
  --systems-accent: #0066FF  (electric blue)
  --systems-muted:  #D4D4D8
  --systems-border: #A1A1AA

Markets World (Dark, Terminal):
  --markets-bg:     #050505  (near-black)
  --markets-fg:     #EBEBEB  (off-white)
  --markets-accent: #10B981  (emerald green)
  --markets-muted:  #27272A
  --markets-border: #3F3F46
  --markets-glow:   rgba(16, 185, 129, 0.15)

Core World (Neutral Hub):
  --core-bg:        #fcfbf9  (warm off-white)  → actually use #F5F3EE for the rendered background
  --core-fg:        #18181B
  --core-muted:     #A1A1AA
```

### Typography

Use Google Fonts:
- **Playfair Display** (serif display) — headings, hero text, editorial titles. Weights: 400–900, italic.
- **Inter** (body sans-serif) — body text, paragraphs, UI elements. Weights: 300–700.
- **Space Grotesk** (mono label) — uppercase labels, section markers, tiny category text. Used as `.font-mono-label` with `text-transform: uppercase; letter-spacing: 0.3em; font-size: 0.7rem`.

### Global Easing

All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` — a smooth, slightly bouncy ease. Apply it everywhere: opacity, transform, color, border.

### Utility Classes & Effects

**Noise overlay:** A fixed, full-screen SVG noise texture at 4% opacity, sitting on z-index 1000, pointer-events none. Creates a subtle film-grain quality. Hide on mobile.

**Glass card (Markets):** `background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px;`

**Shimmer border (Markets):** An animated border effect using gradient background that sweeps left-to-right in a 3-second loop. Use CSS mask to create an animated shimmering border around glass cards. The shimmer color is `rgba(16, 185, 129, 0.3)`.

**Systems card (Light):** `background: rgba(255, 255, 255, 0.55); backdrop-filter: blur(12px); border: 1px solid; border-image: linear-gradient(135deg, rgba(192,192,192,0.35), rgba(212,175,55,0.22), rgba(192,192,192,0.35)) 1;` with hover state that intensifies the gradient. Gold-silver metallic sheen.

**Grid background (Systems):** A subtle 12-column grid with lines at 4% opacity on the Systems world.

**Glow blobs (Markets):** Floating, blurred radial gradient circles (emerald green) that drift slowly with sine-wave animation. 3 blobs of varying sizes (350–500px), positioned at different corners, with `filter: blur(80px); opacity: 0.15;`.

**Selection color:** `::selection { background: rgba(0, 102, 255, 0.2); }`

**Scrollbar:** Ultra-thin 4px, transparent track, gray-30% thumb with 2px border-radius.

**Emerald link underline:** A bottom underline that animates width from 0 to 100% on hover, using `var(--markets-accent)`.

---

## Global State Management (Zustand)

Create a global store with these fields:

```typescript
type WorldName = "systems" | "core" | "markets";

interface PortfolioState {
  activeWorld: WorldName;          // which world is currently visible
  introCompleted: boolean;          // has the intro animation finished
  experimentalMode: boolean;        // easter egg mode
  isMobile: boolean;                // viewport < 1024px
  verticalPositions: { systems: number; markets: number; }; // scroll memory
}
```

---

## Page Structure

### Route: `/` (Home — The Axis)

This is the main experience. It consists of:

#### 1. Intro Overlay (Full-Screen, z-9999)

When the page loads, display a black full-screen overlay. Animate in:
- **"Dhruv Agrawal"** in Playfair Display, white, sizes `text-5xl md:text-7xl lg:text-8xl`, center-aligned. Animates: opacity 0→1, y 30→0, blur 10px→0px over 1.2s with 0.3s delay.
- **"Technology × Finance"** in Space Grotesk (mono-label style), zinc-500, below the name. Fades in at 0.9s delay.
- A thin pulsing vertical line at the bottom center, fading in at 1.8s.
- After **2.5 seconds**, the overlay fades out with a blur(20px) exit over 0.8s. Once gone, set `introCompleted = true` in the store.
- While intro is active, `overflow: hidden` on html and body.

#### 2. Status Strip (Fixed Top Bar)

A 2px-tall colored bar fixed at the top of the viewport (z-100). Color changes based on active world:
- Systems → `bg-systems-accent` (blue)
- Core → `bg-zinc-400`
- Markets → `bg-markets-accent` (emerald)

Below the bar (top-left), display a tiny label in mono-label style at 0.45rem:
- Systems: `"SYSTEMS — Technology & Research"`
- Core: `"DUAL AXIS — Systems ↔ Markets"`
- Markets: `"MARKETS — Quantitative Finance & Trading"`

Color transitions over 1 second.

#### 3. Scroll Progress (Fixed Bottom Bar)

A 1px bar at the very bottom of the viewport (z-100) that fills left-to-right based on vertical scroll progress. Color matches the active world's accent.

#### 4. Custom Cursor (Desktop Only)

Replace the default cursor with a custom one. The cursor style changes per world:
- **Systems:** A 24×24px crosshair (two perpendicular 1px lines in `--systems-fg`).
- **Core:** A small 8×8px circle, `rgba(100,100,100,0.5)`.
- **Markets:** A 32×32px circle with `radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)` and a subtle green glow shadow.

The cursor follows mouse position with a smooth lerp (factor 0.15). `document.body.style.cursor = "none"`. Transition between styles over 500ms.

#### 5. Konami Code Easter Egg

Listen for the Konami Code (↑↑↓↓←→←→BA). When detected, set `experimentalMode = true` and show a small floating badge at top-right: a pill-shaped element with a pulsing emerald dot and text "Experimental Mode" in mono-label at 0.5rem.

Also log styled messages to the browser console on page load:
```
⚡ Dual Axis — Systems ↔ Markets        (green, bold, 16px)
Initializing portfolio interface...       (gray, 11px)
→ Systems kernel loaded                   (blue, 11px)
→ Markets engine online                   (green, 11px)
→ Konami mode: standby                    (gray, 11px)
Try: ↑↑↓↓←→←→BA                          (gray italic, 10px)
```

#### 6. The Axis Container (The Core Navigation)

**Desktop (≥1024px):**

The container is `fixed inset-0 overflow-hidden`. Inside, a flex row of three full-viewport panels (`width: 300vw`) is translated horizontally. The initial position shows the **Core** (center panel) → `translateX(-100vw)`.

- `translateX(0)` = Systems world visible
- `translateX(-100vw)` = Core world visible
- `translateX(-200vw)` = Markets world visible

**Horizontal navigation:**
- **Mouse wheel:** If `|deltaX| > |deltaY|` (horizontal scroll), prevent default and adjust the target position by `deltaX * 0.05`. Vertical scroll passes through to each panel's internal scrollable content.
- **Click-and-drag:** On mousedown, track drag distance. Map pixel delta to vw units: `(deltaPixels / windowWidth) * 100`.
- Both inputs update a `targetX` value. An animation loop (requestAnimationFrame) lerps `currentX` toward `targetX` with factor 0.08 for a smooth, physics-like feel.

**World detection:** Based on `currentX`:
- `|x| < 55` → "systems"
- `55 ≤ |x| < 145` → "core" 
- `|x| ≥ 145` → "markets"

Each panel is `w-screen h-screen flex-shrink-0 overflow-y-auto` — so each world scrolls vertically within its own panel.

**Mobile (<1024px):**

The three worlds stack vertically in order: Core → Systems → Markets. Normal vertical scrolling. Each section has an `id` (`core-section`, `systems-section`, `markets-section`) for programmatic scroll-to navigation.

#### 7. World Transition Overlay

A fixed, pointer-events-none overlay (z-50) that provides visual continuity during horizontal navigation:
- **Grid overlay** (for Systems zone): The grid-bg pattern fades in when approaching Systems, fades out toward Core.
- **Glow overlay** (for Markets zone): Emerald glow blobs fade in when approaching Markets.
- The transitions are driven by the horizontal scroll progress (0 = systems, 0.5 = core, 1 = markets) and animated with GSAP timelines.

---

## The Three Worlds

### SYSTEMS WORLD (Left Panel — Light Theme)

**Background:** `#EBEBE8` (warm gray)  
**Aesthetic:** Clean, architectural, precision-engineered. Swiss design. Gold/silver metallic accents on card borders. Grid background.

**All sections animate in with `useInView` — opacity 0→1, y 60→0, duration 1s, ease smooth, once only, margin -80px.**

#### Systems Hero Section
- Mono-label: `"Systems"` in zinc-500
- Main heading in Playfair Display, sizes `text-4xl md:text-7xl lg:text-[5.5rem]`, line-height 1.05, tracking-tight, color black:
  ```
  Systems Architecture
  & Engineering
  ```
- A 24px-wide, 1px-tall silver gradient divider below
- Subtitle: *"Designing deterministic, constraint-aware systems across embedded firmware, autonomous robotics, and distributed compute."* in zinc-500, max-w-xl
- Three hero cards in a 3-column grid (single column on mobile):
  1. **Embedded Systems** — "Cross-architecture firmware, deterministic migration, hardware-in-the-loop validation"
  2. **Autonomous Robotics** — "Edge AI perception, multi-sensor fusion, constraint-aware decision systems"
  3. **Distributed Systems** — "Verifiable compute, distributed orchestration, trust-minimised coordination"
- Each card uses the `sys-card` style (white glass with gold-silver gradient border)
- Bottom-left: "Scroll to explore" in mono-label (desktop only)

#### Systems Marquee Ribbon
An infinitely scrolling horizontal ribbon of terms, bordered top and bottom by subtle lines. Terms scroll left continuously over 30s:
```
DISTRIBUTED ARCHITECTURE — EMBEDDED SYSTEMS — AUTONOMOUS AGENTS — PERFORMANCE ENGINEERING — SYSTEM ABSTRACTION —
```
Repeated 3 times. Text in mono-label at 0.55rem, zinc-400.

#### Architecture & Design Principles Section
- Section title with a 3px-wide, 10-unit-tall vertical bar accent (zinc-400) beside the heading: **"Architecture & Design Principles"**
- Paragraph: *"I build systems that operate reliably under constraint — limited compute, adversarial environments, and real-time requirements. My focus is determinism, reproducibility, and structural robustness."*
- 2x2 grid of principle cards (sys-card style):
  1. **Deterministic Execution** — Reproducible build pipelines, State-aware validation workflows, Controlled deployment transitions
  2. **Failure-Oriented Engineering** — Stress-first testing, Edge-case modeling, Degradation-aware design
  3. **Resource-Constrained Optimisation** — Hardware-aware model deployment, Latency-sensitive pipelines, Memory-conscious execution
  4. **Validation & Verification** — Walk-forward validation, Simulation-driven testing, Pre-deployment correctness checks
- Each card has bullet items with tiny circular indicators (1px dots)

#### Embedded Systems & Firmware Section
- Mono-label: `"Embedded Systems & Firmware"`
- Heading: **"Deterministic Firmware Migration Framework"** in Playfair Display
- Large sys-card containing:
  - Detailed description paragraph: *"Designed a reproducible framework for cross-architecture firmware migration using semantic hardware abstraction layers that decouple application logic from platform-specific peripherals. The system automates code translation across microcontroller families, validates correctness through simulation-based testing, and produces deterministic builds with full traceability from source to binary."*
  - A 2-column grid of 8 capability bullets with amber-tinted dots:
    - Semantic hardware abstraction layers
    - Automated code translation across MCU families
    - Simulation-based validation pipeline
    - Register mapping & peripheral translation
    - Architecture-agnostic interface design
    - Deterministic build reproducibility
    - Cross-toolchain compilation
    - Hardware-in-the-loop verification
  - Italic note: *"Focus: reducing manual intervention in platform migration while preserving functional correctness across microcontroller architectures."*
- Tech tags below: C/C++, Microcontrollers, Semantic HAL, Build Systems, Simulation Testing, Toolchain Integration

#### Autonomous Robotics & Edge AI Section
- Mono-label: `"Autonomous Robotics & Edge AI"`
- Heading: **"AI Perception for Agricultural Robotics"**
- Sub-label: `"Team RoboManipal — World Robotics Championship 2024"`
- Two side-by-side sys-cards (stacking on mobile):
  1. **Perception & Decision Pipeline:**
     - *"Developed the full AI perception stack for an autonomous agricultural robot — instance segmentation for individual plant identification, active viewpoint optimisation for multi-angle canopy observation, 3D spatial tracking using fused camera and LiDAR data, and plant-level risk prediction for targeted intervention. The system runs real-time inference on edge hardware."*
     - 4 metric boxes: Segmentation → Instance-Level, Tracking → 3D Spatial, Sensors → Camera + LiDAR, Deployment → Edge Hardware
  2. **Decision & Deployment:**
     - *"Constraint-aware path planning with feedback-based control loops. Plant-level risk prediction drives targeted intervention planning. Full system validated in international competition environments with latency profiling and runtime performance tuning on resource-constrained hardware."*
     - Italic: *"Mentored 50+ team members across ML fundamentals, computer vision, and edge deployment workflows. Represented India at the World Robotics Championship 2024."*
- Tags: Python, Instance Segmentation, LiDAR, Edge AI, Multi-Sensor Fusion, Robotics Middleware

#### Post-AGI Digital Economy Simulation Section
- Mono-label: `"Simulation & Agent-Based Systems"`
- Heading: **"Post-AGI Digital Economy Simulation"**
- Large sys-card:
  - *"Built a large-scale agent-based simulation modeling autonomous economic actors in post-AGI tokenised economies. The framework introduces reputation currencies and tokenized attention markets as coordination primitives, then explores policy interventions for wealth distribution dynamics. Simulation results showed a 34% reduction in wealth concentration under targeted policy mechanisms."*
  - 4 centered stat boxes: Architecture → Agent-Based, Coordination → Reputation Currencies, Markets → Tokenized Attention, Wealth Conc. → −34%
  - Italic: *"Exploring how emergent coordination structures behave at scale — from trust-minimised exchange to autonomous resource allocation under structural uncertainty."*
- Tags: Agent-Based Modeling, Simulation Design, Tokenomics, Policy Analysis, Distributed Systems

#### Systems Contact Section
- Section title: **"Get In Touch"** with the vertical bar accent
- Text: *"Open to discussing research collaboration, systems design, and analytical problem-solving."*
- Contact list (label + value):
  - Email: dhruvagrawal479@gmail.com (mailto link)
  - LinkedIn: linkedin.com/in/dhruva02
  - GitHub: github.com/Dhruvacodes
  - Location: Bengaluru, India
- Bottom padding `pb-32` so scrolling feels complete

---

### CORE WORLD (Center Panel — The Hub)

**Background:** `#F5F3EE` (warm cream)  
**Aesthetic:** Clean, centered, typographically dominant. This is the landing page / about section.

#### Core Hero
- **Name:** "Dhruv Agrawal" in Inter (NOT Playfair), weight 600, letter-spacing -0.03em, line-height 1.05, color black. Size: `clamp(2.5rem, 7vw, 6rem)`. Animates in with opacity, y-translate, delay 0.2s.
- **Tagline:** "Technology × Finance" in mono-label style, #737373, 14px, letter-spacing 0.12em. Fades in at 0.5s.
- **Divider:** 64px wide, 1px tall, zinc-400/40. Scale-X from 0 at 0.7s delay.
- **Bio paragraph:** *"Analytical problem-solver with a deep interest in technology-driven systems and capital markets. I study how complex systems behave under stress, how models fail in production, and where structured thinking creates the most leverage."* — max-w-xl centered, color #737373, line-height relaxed. Fades in at 0.9s.

#### Expandable Panels Section
Four accordion-style panels that expand on click. Each panel has a header with the title on the left and a `+` on the right that rotates 45° when open:

1. **Education** (delay 0.6):
  - Manipal Institute of Technology, Manipal — B.Tech CCE · 2024 – Present
   - Bhavan's Bhagwandas Purohit Vidya Mandir, Nagpur — Class XII: 93.6%, Class X: 98.4%

2. **Research Interests** (delay 0.7):
   - **Quantitative Finance** — statistical arbitrage, risk modeling, walk-forward validation
   - **AI & Perception Systems** — real-time inference, sensor fusion, edge deployment
   - **Simulation & Modeling** — agent-based economic frameworks, policy-driven synthetic markets
   - **Systems Thinking** — cross-domain analytical frameworks for complex adaptive systems

3. **Leadership & Initiatives** (delay 0.8):
   - **AI Researcher — Team RoboManipal** — Led AI perception development; trained 50+ members in ML and Edge AI workflows. Represented team at the World Robotics Championship.
   - **Quantitative Research — Finova, MIT Manipal** — Conducted independent research across FX arbitrage, crash forecasting, and portfolio construction. IISc podium recognition.
   - **Member — E-Cell, MIT Manipal** — Engaged with startup ecosystem and innovation-driven initiatives.

4. **Publications & Patent Work** (delay 0.9):
   - *"Research papers and patent applications are in progress across quantitative finance and autonomous systems. Details available upon request."* (italic, zinc-500)

Panels use border zinc-200, hover:bg-zinc-50. Content animates height from 0 to auto with opacity.

#### Directional Navigation Buttons
Two buttons to navigate to the other worlds:
- **← Systems** (left arrow animates bouncing left, mono-label, hover: letter-spacing expands to 0.4em)
- **Markets →** (right arrow animates bouncing right, same style)
- A thin vertical divider between them on desktop
- On mobile, these are full-width buttons with borders stacked vertically

On desktop, clicking triggers horizontal axis navigation. On mobile, it smooth-scrolls to the corresponding section.

#### Contact Links
A row of links in mono-label at 0.6rem, opacity 0.6:
- dhruvagrawal479@gmail.com
- LinkedIn
- GitHub
- Bengaluru, India

#### Page Links
A row of links at low opacity:
- Resume → `/resume`
- Ideas → `/ideas`
- Play → `/play`

---

### MARKETS WORLD (Right Panel — Dark Theme)

**Background:** `#050505` (near-black)  
**Aesthetic:** Dark terminal, Bloomberg-inspired. Emerald green accents. Glass cards with shimmer borders. Floating green glow blobs in the background.

**Background effect:** Three large blurred green circles (glow blobs) drifting with sine/cosine animation. Sizes 500px, 400px, 350px. Each moves independently on a different frequency. Disabled on mobile and for `prefers-reduced-motion`.

#### Markets Hero
- Mono-label: `"Quantitative Finance"` in emerald-500/60
- Heading in Playfair Display, white, same massive sizes as Systems hero:
  ```
  Decoding
  Market
  Dynamics    (this last word in #B5B5B5, slightly muted)
  ```
- 24px wide emerald-500/30 divider
- Subtitle: *"Research across risk modeling, portfolio construction, and statistical inference in financial markets — grounded in analytical rigour, walk-forward validation, and an emphasis on understanding why models fail."* in zinc-400

#### Ticker Ribbon
Infinitely scrolling horizontal ribbon (same as Systems marquee but dark-themed). Terms in zinc-700, mono-label 0.55rem:
```
VOLATILITY — RISK MODELING — BEHAVIORAL SIGNALS — CRASH DYNAMICS — SYSTEMIC INSTABILITY — FACTOR DECOMPOSITION — REGIME SWITCHING — PORTFOLIO CONSTRUCTION — STATISTICAL ARBITRAGE — WALK-FORWARD VALIDATION —
```

#### FX Statistical Arbitrage Section
- Mono-label: `"Statistical Arbitrage"`
- Heading: **"Cross-Currency FX Strategy"**
- Sub-label: `"IISc Podium Recognition"`
- Two glass-cards with shimmer borders side-by-side:
  1. **Dataset & Scope:**
     - *"Built and validated a market-neutral statistical arbitrage strategy on a 14-year, multi-currency FX dataset sampled at 5-second frequency. The approach isolates residual mispricings after removing dominant USD exposure, then applies systematic mean-reversion rules across currency pairs."*
     - 4 metrics: Gross Sharpe → 3.81, Net Sharpe (1bp) → 1.99, Max Drawdown → −13.6%, Profitable → 12/14 Years
  2. **Methodology:**
     - *"All evaluation followed strict walk-forward, out-of-sample protocols — no look-ahead bias, no in-sample optimisation leaked into results. Factor exposures were decomposed to understand systematic vs. idiosyncratic return components. Every finding stress-tested against transaction cost assumptions, regime shifts, and liquidity constraints."*
     - Italic: *"Max drawdown −13.6%, profitable in 12 of 14 years. Validated via walk-forward backtesting with transaction cost sensitivity across multiple cost regimes."*
- Tags (border-zinc-700): Factor Decomposition, Market-Neutral, Walk-Forward OOS, Microstructure Analysis, Risk Management

#### Hybrid Crash Forecasting Section
- Mono-label: `"Risk Modeling & Early Warning"`
- Heading: **"Hybrid Crash Forecasting"**
- Single glass-card with shimmer border:
  - *"Developed a multi-signal crash forecasting system for Bitcoin, fusing EGARCH-based volatility regime detection, LPPL bubble diagnostics, sentiment-derived features, and LSTM sequence modeling into a unified early-warning framework. The system generates probabilistic crash alerts with a 26-day average lead time, validated through rolling-window cross-validation with strict temporal separation."*
  - 4 centered stats: ROC AUC → 0.97, Precision → 89%, Lead Time → 26 Days, Validation → Rolling-Window CV
  - Italic: *"Focus: identifying structural fragility in price dynamics rather than fitting to historical crash patterns. Each signal component captures a distinct market regime dimension — volatility clustering, speculative acceleration, crowd sentiment, and sequential dependencies."*
- Tags: EGARCH, LPPL Bubble Diagnostics, LSTM, Sentiment Signals, Temporal Validation

#### Cross-Asset Portfolio Optimization Section
- Mono-label: `"Portfolio Construction"`
- Heading: **"Cross-Asset Portfolio Optimization"**
- Single glass-card with shimmer border:
  - *"Built a regime-aware, cross-asset allocation framework combining Hierarchical Risk Parity with dynamic regime-switching filters. The system rebalances allocations based on detected market regimes — risk-on, risk-off, and transitional — validated through strict walk-forward protocols on multi-year data spanning equities, fixed income, and commodities."*
  - 4 stats: Return → 148% vs 97.5%, Sharpe → 0.41 → 0.68, Method → HRP + Regime Switch, Validation → Walk-Forward OOS
  - Italic: *"Designed for robustness over headline returns — emphasis on drawdown control, regime resilience, and avoiding over-fit to benign market conditions."*
- Tags: Hierarchical Risk Parity, Regime Switching, Cross-Asset Allocation, Walk-Forward Validation, Drawdown Control

#### Markets Contact Section
- Mono-label: `"Contact"`
- Heading: **"Connect"**
- Text: *"Open to discussing quantitative research, market analysis, and analytical problem-solving."*
- Same contact list but with emerald link underlines and lighter text colors (zinc-300 for values, zinc-600 for labels)
- Bottom padding `pb-32`

---

## Route: `/resume`

A clean, white, typographic resume page. No dark mode. Print-friendly (hide nav elements with `.no-print`).

### Header
- **Dhruv Agrawal** in Playfair Display, text-4xl
- Subtitle: "Technology & Finance Focused Analyst"
- Download PDF button (border, hover:bg-zinc-50) linking to `/resume.pdf`
- Contact links row: email, LinkedIn, GitHub, location (all tiny text, zinc-500)

### Summary Section
*"Analytical problem-solver with a deep interest in technology-driven systems and capital markets. Currently studying Computer and Communication Engineering at Manipal Institute of Technology. Research experience spans quantitative finance, AI perception systems, and simulation-based modeling. Interested in applying structured, cross-domain thinking to high-impact strategic and business challenges."*

### Education (Timeline Layout)
A vertical timeline with dots and a thin vertical line:
1. **B.Tech — Computer and Communication Engineering** — Manipal Institute of Technology, 2024–2028 (Expected)
2. **Class XII (Senior Secondary)** — Bhavan's Bhagwandas Purohit Vidya Mandir, Nagpur — 2023, Grade: 93.6%
3. **Class X (Secondary)** — Same school — 2021, Grade: 98.4%

### Experience
Three positions with bullet points:

1. **AI Researcher — Team RoboManipal** (02/2025 – Present)
   - Developed full AI perception stack for agricultural robot — instance segmentation, active viewpoint optimisation, 3D spatial tracking via camera-LiDAR fusion, and plant-level risk prediction
   - Designed deterministic firmware migration framework with semantic hardware abstraction and simulation-based validation
   - Trained 50+ team members in ML fundamentals, computer vision, and edge deployment workflows
   - Represented India at the World Robotics Championship 2024

2. **Core Team Member — Finova (Finance Club, MIT Manipal)** (01/2024 – Present)
   - Led research task phase covering statistical arbitrage, risk modeling, and portfolio construction
   - Conducted and presented FX statistical arbitrage research — IISc podium recognition
   - Organised fintech workshop (100+ registrations) bridging quantitative methods and applied finance
   - Built multi-signal crash forecasting model and regime-aware portfolio optimisation framework

3. **Executive — E-Cell, MIT Manipal** (09/2025 – Present)
   - Core organising team for Manipal Entrepreneurship Summit (MES) 2026 — 30,000+ attendees, coordinating 150+ startups and 1,300+ competition registrations
   - Collaborated with 12 E-Cells nationwide to draft and present Bharat Yuva Innovation Policy Recommendations
   - Supported strategic partnership outreach and ecosystem expansion initiatives

### Selected Projects
Six projects with title + description:

1. **FX Statistical Arbitrage Research** — Market-neutral cross-currency strategy on a 14-year, 5-second frequency FX dataset. Gross Sharpe 3.81, Net Sharpe 1.99 (1 bp), max drawdown −13.6%, profitable in 12/14 years. Walk-forward OOS evaluation. IISc podium recognition.

2. **Hybrid Crash Forecasting Model** — Multi-signal Bitcoin crash prediction fusing EGARCH volatility regimes, LPPL bubble diagnostics, sentiment features, and LSTM sequence modeling. ROC AUC 0.97, 26-day average lead time, 89% precision.

3. **Cross-Asset Portfolio Optimization** — Regime-aware allocation framework combining Hierarchical Risk Parity with regime switching. 148% return vs 97.5% benchmark, Sharpe improved 0.41 → 0.68. Walk-forward validation with regime-conditional decomposition.

4. **Post-AGI Digital Economy Simulation** — Agent-based framework modeling autonomous economic agents in tokenised economies with reputation currencies and tokenized attention markets. 34% reduction in wealth concentration under targeted policy mechanisms.

5. **AI Perception Pipeline (RoboManipal)** — Full perception stack for agricultural robot — instance segmentation, active viewpoint optimisation, camera-LiDAR fusion, 3D spatial tracking, and plant-level risk prediction. World Robotics Championship 2024.

6. **Firmware Migration Framework** — Deterministic cross-architecture porting using semantic hardware abstraction layers, automated code translation, and simulation-based validation across MCU families.

### Skills
2-column grid:
- **Languages & Frameworks:** Python, C++, TypeScript, MATLAB, SQL, PyTorch, TensorFlow
- **Quantitative Methods:** Statistical Arbitrage, Risk Modeling, Walk-Forward Validation, Portfolio Construction
- **AI & ML:** Computer Vision, Sequence Modeling, Sensor Fusion, Edge Deployment
- **Tools & Platforms:** Git, Docker, Linux, Jupyter, NumPy, Pandas, Scikit-learn

### Publications & Patents
*"Research papers and patent applications in progress — details available upon request."*

### Back link
`← Back to Portfolio` linking to `/`

---

## Route: `/ideas`

A clean white page with long-form analytical essays rendered inline (not separate pages for each essay — all three essays render fully on one page).

### Header
- Back link: `← Back to Portfolio`
- Title: **"Ideas"** in Playfair Display, text-4xl md:text-5xl
- Description: *"Analytical essays on volatility, abstraction, and cross-domain thinking. These are not technical write-ups — they are explorations of the structural patterns that recur across markets, systems, and decision-making under uncertainty."*

### Essay 01: Volatility as a Behavioural Signal
**Subtitle:** *"Why price variance tells you more about people than prices"*

Full text (5 paragraphs):

*"Most treatments of volatility focus on what it measures — the statistical dispersion of returns. But the more interesting question is what it reveals. Volatility is not noise. It is the market's emotional signature, compressed into a time series."*

*"When volatility spikes, the standard interpretation is uncertainty. But uncertainty about what? Usually not about fundamentals — earnings releases, macro data, and policy decisions are scheduled events. The uncertainty is about other participants. Volatility rises when traders stop pricing assets and start pricing each other's reactions."*

*"This is why volatility clusters. Fear is reflexive — my uncertainty about your behaviour amplifies your uncertainty about mine, and the feedback loop compresses into a regime that standard models treat as a parameter shift. But it is not a parameter shift. It is a phase transition in collective behaviour."*

*"The implication for modeling is significant. If volatility is behavioural rather than structural, then models calibrated to historical variance are measuring an effect, not a cause. A more useful approach might be to model the conditions under which behavioural contagion accelerates — network density, information asymmetry, position concentration — and treat volatility as a downstream indicator of those dynamics."*

*"This does not mean volatility models are useless. It means they are most useful when they are treated as diagnostic instruments rather than predictive ones. The question should not be 'what will volatility be tomorrow?' but 'what is the current state of the behavioural system that generates volatility?' The former is a forecasting problem. The latter is a regime identification problem. They require very different tools."*

### Essay 02: Abstraction as a Survival Mechanism
**Subtitle:** *"How systems that generalise outlast systems that optimise"*

Full text (6 paragraphs):

*"There is a recurring pattern in both engineering and biology: systems that survive over long periods are not the ones most optimised for current conditions. They are the ones with the highest capacity for abstraction — the ability to represent problems at a level that remains useful when the specifics change."*

*"Consider the difference between a hand-tuned trading strategy and a risk management framework. The strategy is optimised for a specific market regime — it captures a particular statistical regularity and exploits it efficiently. The framework, by contrast, is designed to function regardless of which regime is active. It does not predict what will happen. It constrains what can go wrong."*

*"The strategy will outperform the framework in the regime it was designed for. But when the regime shifts, the strategy breaks and the framework holds. This is not a trivial observation. It implies that the most robust systems are the ones that sacrifice local performance for structural generality."*

*"In software engineering, this manifests as the tension between optimisation and modularity. A system optimised for one use case runs faster but breaks when requirements change. A modular system runs slower but adapts. The same logic applies to organisations, research methodologies, and career strategies."*

*"The deeper principle is this: abstraction is how systems encode the ability to handle novelty. A system that can only respond to situations it has seen before is fragile. A system that can represent situations at a level that transfers across contexts is antifragile — not because it benefits from disorder, but because it represents problems in a way that remains valid under disorder."*

*"This is why the most valuable skill in complex environments is not expertise in any one domain, but the ability to extract transferable structure from diverse domains. The person who understands risk management, systems architecture, and organisational behaviour at the level of their common abstractions will outperform the specialist in any one of those fields — not immediately, but over time, and especially during transitions."*

### Essay 03: Hybrid Thinking: Where Systems Meet Markets
**Subtitle:** *"The case for cross-domain analytical frameworks"*

Full text (6 paragraphs):

*"Technology and finance are typically studied as separate disciplines. They have different vocabularies, different incentive structures, different failure modes. But at the level of analytical method, they are remarkably convergent."*

*"Both domains deal with complex adaptive systems — environments where the behaviour of the system is shaped by the behaviour of its participants, which is in turn shaped by the behaviour of the system. Markets are complex adaptive systems. Large-scale distributed software is a complex adaptive system. Organisations are complex adaptive systems."*

*"The tools that work in one domain often transfer to the other. Walk-forward validation, a standard technique in quantitative finance, is structurally identical to k-fold cross-validation with temporal ordering in machine learning. Risk parity, a portfolio construction method, embodies the same principle as load balancing in distributed systems — allocate resources in proportion to uncertainty, not in proportion to expected return."*

*"The value of hybrid thinking is not that it produces novel insights in either domain. It is that it produces novel connections between domains. When you understand volatility clustering in markets and cascading failures in distributed systems as instances of the same phenomenon — positive feedback in a coupled network — you gain access to an analytical vocabulary that neither domain provides on its own."*

*"This is not interdisciplinary work in the academic sense. It is not about combining two fields into a third. It is about developing a set of transferable analytical primitives — feedback loops, regime detection, robustness under constraints, information asymmetry — that apply wherever complex systems generate data."*

*"The practical implication is that the strongest analytical positions are held by people who can move fluidly between domains, applying the structural insights from each to the problems of the other. Not generalists who know a little about everything, but integrators who understand the deep structure of multiple fields well enough to see where they rhyme."*

### Footer
- Disclaimer: *"These essays reflect personal analytical perspectives and are not affiliated with any institution or organisation."*
- Back link: `← Back to Portfolio`

---

## Route: `/play`

A dark experimental sandbox page. Background: `zinc-950`. Text: white.

### Header
- Title: **"Play"** in Playfair Display
- Mono-label: `"Experimental Sandbox"`
- Music toggle button with ♪ icon (animates pulse when playing)
- Back link: `← Back`

### Experiment Selector
Three tab buttons in mono-label style. Active tab has emerald border and text. Inactive has zinc-800 border.

### Three Experiments

1. **Chromatic Drift** — A black box with 4 floating blurred color circles (green, blue, purple, amber) that animate in figure-eight patterns with different delays. Center text: "Chromatic Drift" in Playfair Display, white/80.

2. **Grid Pulse** — A 8×6 grid of small cells on zinc-950 background. Each cell pulses opacity and scale with staggered delays (column * 0.1 + row * 0.15). Cells use emerald green at varying opacities.

3. **Particle Field** — 30 white particle dots at random positions. Each floats upward (-200 to -400px) with fading opacity, repeating infinitely at random delays. Center text: "Rising" in Playfair Display.

Experiments transition with AnimatePresence — fade + slide.

### Footer
*"A collection of visual experiments and interactive prototypes. This space exists for creative exploration, separate from the portfolio's main axis."*

Disclaimer: *"These experiments are purely creative — not indicative of production work."*

---

## Interactive & 3D Component Details

### Architecture Diagram (Interactive SVG — Systems World)

An interactive node-connection diagram representing a distributed systems architecture. Nodes are positioned on percentage coordinates within a relative container:

| Node | Label | Position (x%, y%) | Connects To |
|------|-------|--------------------|-------------|
| gateway | API Gateway | 50, 10 | auth, service-a, service-b |
| auth | Auth Service | 20, 35 | db-auth |
| service-a | Core Service | 50, 35 | queue, cache |
| service-b | Analytics | 80, 35 | queue, db-main |
| queue | Message Queue | 50, 60 | worker |
| cache | Cache Layer | 25, 60 | — |
| db-auth | Auth DB | 10, 80 | — |
| db-main | Main DB | 75, 80 | — |
| worker | Workers | 50, 85 | db-main |

- Nodes are small 12px squares with borders
- Connection lines drawn as SVG `<line>` elements
- **On hover:** The hovered node and all its connected nodes highlight in `--systems-accent` blue. Lines thicken from 0.2 to 0.4 and lose their dash pattern. Node labels change color to blue.
- Labels are in mono-label at 0.35rem

### Animated Counter Component
A reusable counter that animates from 0 to a target value when it scrolls into view (IntersectionObserver, threshold 0.3). Uses `easeOutExpo` easing over 1.5 seconds. Supports prefix, suffix, and decimal places. Triggers once.

### Glow Background (Markets)
Three absolutely positioned radial-gradient circles with emerald green cores. Each moves on a sine/cosine path at different frequencies (time * 0.005 increment per frame). Sizes: 500px, 400px, 350px. Disabled on mobile and reduced-motion.

---

## Mobile Responsiveness Requirements

This must be **flawless** on mobile. Key requirements:

1. **Axis Layout:** On screens <1024px, worlds stack vertically (Core → Systems → Markets) with natural vertical scrolling. No horizontal dragging.

2. **Navigation:** The directional buttons in Core become full-width bordered buttons. Clicking smooth-scrolls to the corresponding section.

3. **Typography Scaling:**
   - `.font-mono-label` at ≤768px: `letter-spacing: 0.15em; font-size: 0.6rem;`
   - Hero headings scale down responsively via `clamp()` and responsive Tailwind classes

4. **Noise overlay:** Hidden on mobile for performance.

5. **Custom cursor:** Disabled on mobile — show native cursor.

6. **Glow blobs:** Disabled on mobile.

7. **Touch handling:** `touch-action: manipulation; -webkit-overflow-scrolling: touch;`

8. **Cards:** Stack to single column. Maintain all padding and readability.

9. **Horizontal marquee/ticker ribbons:** Still scroll on mobile but simpler.

10. **Body overflow:** On mobile, `overflow-y: visible; overflow-x: hidden;`.

11. **Print styles** (for Resume page): White background, black text, hide `.no-print` elements.

---

## SEO & Meta

- **Title:** `Dhruv Agrawal — Systems ↔ Markets`
- **Description:** `Technology & Finance Focused Analyst. Exploring complex systems across capital markets, technology infrastructure, and analytical problem-solving.`
- **Keywords:** Dhruv Agrawal, technology, finance, quantitative modeling, distributed systems, AI research, statistical learning, consulting
- **Open Graph & Twitter Cards:** Include og-image at 1200×630
- **Canonical URL:** https://dhruvagrawal.app
- **Robots:** index, follow
- **Sitemap** with all routes: /, /resume, /ideas, /play
- **Favicon and Apple Touch Icon**

---

## Animation Summary

Every animation in the site uses the same easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

| Element | Trigger | Animation |
|---------|---------|-----------|
| Intro name | Page load | opacity + y + blur, 1.2s, delay 0.3s |
| Intro tagline | Page load | opacity + y, 0.8s, delay 0.9s |
| Intro exit | After 2.5s | opacity 0 + blur 20px, 0.8s |
| Section blocks | Scroll into view (once) | opacity 0→1, y 60→0, 1s |
| Expandable panels | Click toggle | height 0↔auto, opacity, 0.5s |
| + icon rotation | Panel open/close | rotate 0↔45°, 0.3s |
| Navigation arrows | Continuous | x bounce ±4px, 2s loop |
| Marquee ribbons | Continuous | translateX 0 → -2400, 30s linear loop |
| Glass card shimmer | Continuous | background-position sweep, 3s loop |
| Glow blobs | Continuous | sine/cosine drift, per-frame |
| Custom cursor | Mouse move | lerp position, factor 0.15 |
| World transitions | Horizontal scroll | GSAP timeline, 1.5s |
| Experiment switch | Tab click | AnimatePresence fade + slide |
| Status strip color | World change | CSS transition 1s |
| Grid pulse cells | Continuous | opacity + scale pulse, staggered |
| Particles | Continuous | y float up + opacity fade, random delays |

---

## Key Technical Notes

1. **Horizontal scrolling interaction (Desktop):** The entire experience is driven by a requestAnimationFrame loop that lerps `currentX` toward `targetX`. Wheel deltaX and drag pixels both control `targetX`. Vertical scroll within each panel is handled by the panel's own `overflow-y: auto`. Only intercept horizontal wheel events (`|deltaX| > |deltaY|`).

2. **Framer Motion** for component-level animations (section reveals, AnimatePresence, motion components).

3. **GSAP** for the world transition overlay (timeline-based, driven by scroll progress).

4. **Zustand** for global state — minimal, no persistence needed.

5. **Smooth scrolling:** Lenis library configured with duration 1.2, smooth wheel, touch multiplier 2.

6. **No image assets needed** — the entire site is typography, color, and code-driven animation. No photos, no illustrations, no icons beyond text symbols (←, →, +, ♪).

7. **Performance:** Use `will-change: transform` sparingly. Disable heavy animations on mobile and reduced-motion preferences. Use passive event listeners for scroll. Lazy-load non-critical components with `dynamic()` and `ssr: false`.

---

## File Structure Target

```
app/
  layout.tsx          (root layout with fonts, metadata, analytics)
  page.tsx            (home — axis experience)
  globals.css         (all global styles, utility classes, media queries)
  resume/page.tsx     (resume page)
  ideas/page.tsx      (ideas/essays page)
  play/page.tsx       (experimental sandbox)

components/
  IntroOverlay.tsx    (fullscreen intro animation)
  AxisContainer.tsx   (horizontal scroll container + mobile stacking)
  CoreWorld.tsx       (center landing/about panel)
  SystemsWorld.tsx    (left technology panel)
  MarketsWorld.tsx    (right finance panel)
  WorldTransition.tsx (GSAP transition overlay)
  StatusStrip.tsx     (top color bar + label)
  ScrollProgress.tsx  (bottom progress bar)
  CursorManager.tsx   (custom cursor)
  KonamiListener.tsx  (easter egg)
  GlowBackground.tsx  (floating green blobs)
  TickerRibbon.tsx    (markets scrolling terms)
  GridBackground.tsx  (systems grid pattern)
  AnimatedCounter.tsx (scroll-triggered number animation)
  ArchitectureDiagram.tsx (interactive SVG node graph)

lib/
  store.ts            (Zustand global state)
```

---

## Final Notes

- The site must feel like a **single cohesive experience**, not separate pages bolted together. The horizontal axis is the signature interaction.
- Everything should feel **weighted and intentional** — no bouncy default animations, no sharp corners, no loud colors. The palette is muted with surgical accent placement.
- The two worlds (Systems and Markets) should feel like **distinct environments** — one light and architectural, one dark and terminal-like — but unified by shared typography, easing, and structural patterns.
- **Content density is high** — do not simplify or truncate any text. Every paragraph, bullet point, and metric value listed above must appear in the final build.
- Mobile is not an afterthought. The stacked vertical experience should feel native and polished, with all content accessible and properly spaced.
