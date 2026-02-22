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
            Capital
            <br />
            Markets &
            <br />
            <span className="text-markets-accent">Quant Research</span>
          </h1>
          <div className="mt-12 w-24 h-[1px] bg-emerald-500/30" />
          <p className="mt-6 text-lg text-zinc-400 max-w-lg leading-relaxed">
            Statistical arbitrage, risk modeling, and portfolio construction
            grounded in analytical rigour and walk-forward validation.
          </p>
        </motion.div>
      </section>

      <TickerRibbon />

      {/* Section 01: FX Statistical Arbitrage */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">01 — FX Statistical Arbitrage</p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-4">
          Cross-Currency Factor Strategy
        </h2>
        <p className="text-emerald-500/60 font-mono-label text-[0.6rem] mb-8">
          IISc Podium Recognition
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Strategy Design
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Built and validated a market-neutral FX strategy on a 14-year dataset
              at 5-second frequency. Applied factor decomposition to remove USD
              exposure, then traded residual momentum signals across currency pairs.
              Walk-forward backtesting ensured out-of-sample integrity.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Market-Neutral", "Factor Decomposition", "Residual Momentum", "Walk-Forward"].map((tag) => (
                <span key={tag} className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Verified Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Net Sharpe (1 bp cost)", value: "1.99" },
                { label: "Max Drawdown", value: "−13.6%" },
                { label: "Profitable Years", value: "12 / 14" },
                { label: "Dataset Span", value: "14 Years" },
                { label: "Frequency", value: "5-Second" },
                { label: "Construction", value: "Market-Neutral" },
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-mono-label text-[0.5rem] text-zinc-500 mb-1">{m.label}</p>
                  <p className="text-white font-semibold text-sm">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Section 02: Bitcoin Crash Forecasting */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          02 — Hybrid Crash Forecasting
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Bitcoin Risk & Early Warning
        </h2>
        <div className="glass-card shimmer-border p-8 max-w-3xl mb-8">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Developed a hybrid risk modeling and early detection system combining
            EGARCH volatility modeling, LPPL bubble diagnostics, sentiment signals,
            and attention-based LSTM to forecast Bitcoin crash events. Rolling-window
            cross-validation ensured temporal integrity of all predictions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "26 days", label: "Early Warning Lead" },
              { value: "0.97", label: "ROC AUC" },
              { value: "EGARCH", label: "Volatility Model" },
              { value: "LPPL + LSTM", label: "Detection Pipeline" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["EGARCH", "LPPL Diagnostics", "Sentiment Signals", "Attention LSTM", "Rolling CV"].map((tag) => (
            <span key={tag} className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Section 03: Cross-Asset Portfolio Optimization */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          03 — Portfolio Optimisation
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Cross-Asset Allocation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Analytical Framework
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Constructed a cross-asset portfolio using Hierarchical Risk Parity
              with regime switching and walk-forward optimisation. The emphasis was
              on building a robust allocation framework rather than chasing headline
              returns.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Hierarchical Risk Parity", "Regime Switching", "Walk-Forward", "Risk Decomposition"].map((tag) => (
                <span key={tag} className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Performance Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Portfolio Return", value: "148%" },
                { label: "Benchmark Return", value: "97.5%" },
                { label: "Sharpe (Strategy)", value: "0.68" },
                { label: "Sharpe (Benchmark)", value: "0.41" },
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-mono-label text-[0.5rem] text-zinc-500 mb-1">{m.label}</p>
                  <p className="text-white font-semibold text-sm">{m.value}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-xs mt-4 leading-relaxed">
              Regime-conditional performance decomposition used to understand
              return sources — not surface-level optimisation.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-emerald-500/60 mb-4">04 — Contact</p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Connect
        </h2>
        <div className="max-w-lg">
          <p className="text-zinc-400 leading-relaxed mb-8">
            Open to discussing quantitative research, market analysis,
            and analytical problem-solving.
          </p>
          <div className="space-y-3">
            {[
              { label: "Email", value: "dhruvagrawal479@gmail.com", href: "mailto:dhruvagrawal479@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/dhruva02", href: "https://linkedin.com/in/dhruva02" },
              { label: "GitHub", value: "github.com/Dhruvacodes", href: "https://github.com/Dhruvacodes" },
              { label: "Location", value: "Bengaluru, India", href: null },
            ].map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono-label text-zinc-600 w-20">{link.label}</span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
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
