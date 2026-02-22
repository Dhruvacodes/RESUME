"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
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
            Quantitative Markets
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
            Algorithmic trading, risk modeling, and quantitative research
            at the frontier of computational finance.
          </p>
        </motion.div>

        {/* Hero Metrics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: 2.4, suffix: "x", label: "Sharpe Ratio" },
            { value: 340, suffix: "ms", label: "Avg Execution" },
            { value: 99.7, suffix: "%", label: "Fill Rate" },
            { value: 15, suffix: "M+", label: "Trades Processed" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="font-serif-display text-2xl md:text-3xl text-markets-accent">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono-label text-zinc-500 mt-2 text-[0.55rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <TickerRibbon />

      {/* FX Arbitrage */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">01 — FX Arbitrage</p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Cross-Currency Arbitrage Engine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Triangular Arbitrage Detection
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Real-time detection of pricing inefficiencies across major and emerging
              currency pairs. Sub-millisecond signal generation with latency-optimized
              execution paths.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["FIX Protocol", "Co-location", "FPGA", "Python"].map((tag) => (
                <span key={tag} className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card shimmer-border p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Market Microstructure Analysis
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Order book dynamics modeling with level-3 tick data.
              Liquidity regime detection and spread decomposition.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-serif-display text-xl text-markets-accent">
                  <AnimatedCounter end={0.3} suffix="ms" />
                </p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500">Signal Latency</p>
              </div>
              <div>
                <p className="font-serif-display text-xl text-markets-accent">
                  <AnimatedCounter end={847} suffix="" />
                </p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500">Pairs Monitored</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Crash Forecasting */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          02 — Crash Forecasting
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Tail Risk & Regime Detection
        </h2>
        <div className="glass-card shimmer-border p-8 max-w-3xl">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Probabilistic regime-switching models for early warning systems.
            Combining volatility surface dynamics, credit spread analysis, and
            cross-asset correlation breakdown detection.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: 73, suffix: "%", label: "Prediction Accuracy" },
              { value: 4.2, suffix: "hrs", label: "Avg Lead Time" },
              { value: 18, suffix: "", label: "Regimes Identified" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif-display text-2xl text-markets-accent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-mono-label text-[0.5rem] text-zinc-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Portfolio Optimization */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          03 — Portfolio Optimization
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Adaptive Allocation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Mean-Variance Optimization",
              desc: "Classical Markowitz with Black-Litterman views. Dynamic rebalancing with transaction cost optimization.",
            },
            {
              title: "Risk Parity Framework",
              desc: "Equal risk contribution across asset classes. Leverage-adjusted volatility targeting with drawdown controls.",
            },
            {
              title: "ML-Enhanced Allocation",
              desc: "Reinforcement learning for dynamic portfolio construction. Regime-aware position sizing with uncertainty quantification.",
            },
          ].map((card, i) => (
            <div key={i} className="glass-card glass-card-hover shimmer-border p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Risk Dashboard */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          04 — Risk Dashboard
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Real-Time Risk Monitoring
        </h2>
        <div className="glass-card p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "VaR (95%)", value: 2.3, suffix: "%" },
              { label: "Max Drawdown", value: 8.7, suffix: "%" },
              { label: "Beta", value: 0.42, suffix: "" },
              { label: "Sortino", value: 3.1, suffix: "" },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <p className="font-mono-label text-[0.55rem] text-zinc-500 mb-2">
                  {metric.label}
                </p>
                <p className="font-serif-display text-3xl text-markets-accent">
                  <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <p className="text-zinc-500 text-sm">
              Live monitoring across 12 asset classes with sub-second refresh.
              Automated circuit breakers and position limit enforcement.
            </p>
          </div>
        </div>
      </Section>

      {/* Strategy Lab */}
      <Section>
        <p className="font-mono-label text-emerald-500/60 mb-4">
          05 — Strategy Lab
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Research & Backtesting
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            {
              name: "Momentum Regime",
              status: "Production",
              sharpe: "2.1",
              period: "2019–Present",
            },
            {
              name: "Statistical Arb",
              status: "Paper Trading",
              sharpe: "1.8",
              period: "2024–Present",
            },
            {
              name: "Vol Surface",
              status: "Backtesting",
              sharpe: "2.7",
              period: "2025 Q1",
            },
            {
              name: "Cross-Asset",
              status: "Research",
              sharpe: "–",
              period: "2025 Q4",
            },
          ].map((strategy, i) => (
            <div key={i} className="glass-card glass-card-hover p-6 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{strategy.name}</h3>
                <p className="text-zinc-500 text-sm mt-1">{strategy.period}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-mono-label ${
                  strategy.status === "Production"
                    ? "text-markets-accent"
                    : strategy.status === "Paper Trading"
                    ? "text-yellow-500"
                    : "text-zinc-500"
                }`}>
                  {strategy.status}
                </p>
                {strategy.sharpe !== "–" && (
                  <p className="text-zinc-400 text-xs mt-1">
                    Sharpe: {strategy.sharpe}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-emerald-500/60 mb-4">06 — Contact</p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-8">
          Connect
        </h2>
        <div className="max-w-lg">
          <p className="text-zinc-400 leading-relaxed mb-8">
            Interested in quantitative research, algorithmic trading, or
            market microstructure discussions.
          </p>
          <div className="space-y-3">
            {[
              { label: "Email", value: "markets@dualaxis.dev" },
              { label: "GitHub", value: "github.com/dualaxis" },
              { label: "Twitter", value: "@dualaxis_quant" },
            ].map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono-label text-zinc-600 w-20">{link.label}</span>
                <span className="emerald-link text-sm text-zinc-300 cursor-pointer">
                  {link.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
