"use client";

import { motion } from "framer-motion";

const terms = [
  "ALPHA", "BETA", "DELTA", "GAMMA", "THETA", "VEGA", "RHO",
  "SHARPE", "SORTINO", "DRAWDOWN", "VOLATILITY", "MOMENTUM",
  "ARBITRAGE", "HEDGING", "LEVERAGE", "LIQUIDITY", "SPREAD",
  "SLIPPAGE", "EXECUTION", "REGIME", "CORRELATION", "COVARIANCE",
];

export default function TickerRibbon() {
  const duplicated = [...terms, ...terms, ...terms];

  return (
    <div className="relative overflow-hidden py-4 border-y border-zinc-800/50">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -33.33 * terms.length - 33.33 * 8] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((term, i) => (
          <span
            key={i}
            className="font-mono-label text-[0.55rem] text-zinc-700 flex-shrink-0"
          >
            {term}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
