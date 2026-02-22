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

      {/* ═══ FX Statistical Arbitrage ═══ */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          Statistical Arbitrage
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-4">
          Cross-Currency FX Strategy
        </h2>
        <p className="text-emerald-500/60 font-mono-label text-[0.6rem] mb-8">
          IISc Podium Recognition
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Dataset &amp; Scope
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Built and validated a market-neutral statistical arbitrage strategy
              on a 14-year, multi-currency FX dataset sampled at 5-second
              frequency. The approach isolates residual mispricings after
              removing dominant USD exposure, then applies systematic
              mean-reversion rules across currency pairs.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Gross Sharpe", value: "3.81" },
                { label: "Net Sharpe (1bp)", value: "1.99" },
                { label: "Max Drawdown", value: "−13.6%" },
                { label: "Profitable", value: "12/14 Years" },
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
              Methodology
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              All evaluation followed strict walk-forward, out-of-sample
              protocols — no look-ahead bias, no in-sample optimisation leaked
              into results. Factor exposures were decomposed to understand
              systematic vs. idiosyncratic return components. Every finding
              stress-tested against transaction cost assumptions, regime shifts,
              and liquidity constraints.
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed italic">
              Max drawdown −13.6%, profitable in 12 of 14 years. Validated
              via walk-forward backtesting with transaction cost sensitivity
              across multiple cost regimes.
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Factor Decomposition",
            "Market-Neutral",
            "Walk-Forward OOS",
            "Microstructure Analysis",
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

      {/* ═══ Hybrid Risk Forecasting ═══ */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          Risk Modeling &amp; Early Warning
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Hybrid Crash Forecasting
        </h2>
        <div className="glass-card shimmer-border p-8 max-w-3xl mb-8">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Developed a multi-signal crash forecasting system for Bitcoin,
            fusing EGARCH-based volatility regime detection, LPPL bubble
            diagnostics, sentiment-derived features, and LSTM sequence modeling
            into a unified early-warning framework. The system generates
            probabilistic crash alerts with a 26-day average lead time,
            validated through rolling-window cross-validation with strict
            temporal separation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: "ROC AUC", value: "0.97" },
              { label: "Precision", value: "89%" },
              { label: "Lead Time", value: "26 Days" },
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
            Focus: identifying structural fragility in price dynamics rather
            than fitting to historical crash patterns. Each signal component
            captures a distinct market regime dimension — volatility clustering,
            speculative acceleration, crowd sentiment, and sequential
            dependencies.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "EGARCH",
            "LPPL Bubble Diagnostics",
            "LSTM",
            "Sentiment Signals",
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

      {/* ═══ Cross-Asset Portfolio Optimization ═══ */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          Portfolio Construction
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Cross-Asset Portfolio Optimization
        </h2>
        <div className="glass-card shimmer-border p-8 max-w-3xl mb-8">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Built a regime-aware, cross-asset allocation framework combining
            Hierarchical Risk Parity with dynamic regime-switching filters.
            The system rebalances allocations based on detected market regimes
            — risk-on, risk-off, and transitional — validated through strict
            walk-forward protocols on multi-year data spanning equities, fixed
            income, and commodities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: "Return", value: "148% vs 97.5%" },
              { label: "Sharpe", value: "0.41 → 0.68" },
              { label: "Method", value: "HRP + Regime Switch" },
              { label: "Validation", value: "Walk-Forward OOS" },
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
            Designed for robustness over headline returns — emphasis on
            drawdown control, regime resilience, and avoiding over-fit to
            benign market conditions.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Hierarchical Risk Parity",
            "Regime Switching",
            "Cross-Asset Allocation",
            "Walk-Forward Validation",
            "Drawdown Control",
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
          Contact
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
