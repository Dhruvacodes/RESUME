"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowBackground from "./GlowBackground";
import TickerRibbon from "./TickerRibbon";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className={`relative px-6 md:px-16 lg:px-24 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function MarketsWorld() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--markets-bg)", color: "var(--markets-fg)" }}
    >
      <GlowBackground />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-label text-emerald-500/60 mb-6">
            Quantitative Finance
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-white">
            Decoding
            <br />
            Market
            <br />
            <span className="text-markets-accent">Dynamics</span>
          </h1>
          <div className="mt-12 w-24 h-[1px] bg-emerald-500/30" />
          <p className="mt-6 text-lg text-zinc-400 max-w-lg leading-relaxed">
            Research across risk modeling, portfolio construction, and
            statistical inference in financial markets — grounded in analytical
            rigour, walk-forward validation, and an emphasis on understanding
            why models fail.
          </p>
        </motion.div>
      </section>

      <TickerRibbon />

      {/* Section 01: Hybrid Risk Modeling */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          01 — Risk Modeling & Early Warning
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Hybrid Crash Forecasting
        </h2>
        <div className="glass-card shimmer-border p-8 max-w-3xl mb-8">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Developed a multi-signal risk modeling system for cryptocurrency
            markets. The approach combines volatility regime detection, bubble
            diagnostics, sentiment-derived features, and sequence-based deep
            learning to generate early warning signals for crash events.
            Validated using temporally-consistent evaluation protocols.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: "Domain", value: "Cryptocurrency" },
              { label: "Approach", value: "Multi-Signal Hybrid" },
              { label: "Validation", value: "Rolling-Window CV" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed italic">
            Focus: building a framework that identifies structural fragility in
            price dynamics rather than fitting to historical crash patterns.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Volatility Modeling",
            "Bubble Diagnostics",
            "Sentiment Signals",
            "Deep Learning",
            "Temporal Validation",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Section 02: HF Dataset Research */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          02 — High-Frequency FX Research
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Large-Scale FX Dataset Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Dataset Scope
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Worked with a 14-year, multi-currency FX dataset sampled at
              5-second frequency. Research focused on understanding
              microstructure patterns, factor exposures, and the statistical
              properties of returns at high temporal resolution.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Time Span", value: "14 Years" },
                { label: "Frequency", value: "5-Second" },
                { label: "Asset Class", value: "FX Pairs" },
                { label: "Focus", value: "Microstructure" },
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-mono-label text-[0.5rem] text-zinc-500 mb-1">
                    {m.label}
                  </p>
                  <p className="text-white font-semibold text-sm">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Research Methodology
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Analysis followed a strict walk-forward protocol — no look-ahead
              bias, no in-sample optimisation leaked into evaluation. Factor
              exposures were decomposed to understand systematic vs. idiosyncratic
              return components. Every finding was stress-tested against
              transaction cost assumptions and regime shifts.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 03: Statistical Arbitrage Research */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          03 — Statistical Arbitrage
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-4">
          Cross-Currency Factor Strategy
        </h2>
        <p className="text-emerald-500/60 font-mono-label text-[0.6rem] mb-8">
          IISc Podium Recognition
        </p>
        <div className="glass-card shimmer-border p-8 max-w-3xl mb-8">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Constructed and validated a market-neutral strategy for the FX
            market. The approach isolates residual signals after removing
            dominant factor exposures, then applies systematic rules to trade
            across currency pairs. All results validated on out-of-sample data
            using walk-forward protocols.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: "Construction", value: "Market-Neutral" },
              { label: "Validation", value: "Walk-Forward OOS" },
              { label: "Recognition", value: "IISc Podium" },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-semibold text-sm">{m.value}</p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500 mt-1">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed italic">
            Emphasis on understanding why the strategy works structurally — not
            just that it produces favourable backtested numbers. Detailed
            methodology available upon request.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Factor Decomposition",
            "Market-Neutral",
            "Walk-Forward Validation",
            "Risk Management",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-emerald-500/60 mb-4">
          04 — Contact
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Connect
        </h2>
        <div className="max-w-lg">
          <p className="text-zinc-400 leading-relaxed mb-8">
            Open to discussing quantitative research, market analysis, and
            analytical problem-solving.
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Email",
                value: "dhruvagrawal479@gmail.com",
                href: "mailto:dhruvagrawal479@gmail.com",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/dhruva02",
                href: "https://linkedin.com/in/dhruva02",
              },
              {
                label: "GitHub",
                value: "github.com/Dhruvacodes",
                href: "https://github.com/Dhruvacodes",
              },
              { label: "Location", value: "Bengaluru, India", href: null },
            ].map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono-label text-zinc-600 w-20">
                  {link.label}
                </span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="emerald-link text-sm text-zinc-300 cursor-pointer"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="text-sm text-zinc-300">{link.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
