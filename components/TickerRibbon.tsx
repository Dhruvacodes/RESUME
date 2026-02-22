"use client";

import { motion } from "framer-motion";

const terms = [
  "VOLATILITY",
  "RISK MODELING",
  "BEHAVIORAL SIGNALS",
  "CRASH DYNAMICS",
  "SYSTEMIC INSTABILITY",
  "FACTOR DECOMPOSITION",
  "REGIME SWITCHING",
  "PORTFOLIO CONSTRUCTION",
  "STATISTICAL ARBITRAGE",
  "WALK-FORWARD VALIDATION",
];

export default function TickerRibbon() {
  const duplicated = [...terms, ...terms, ...terms];

  return (
    <div className="relative overflow-hidden py-3 border-y border-zinc-800/50 group">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -2400] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((term, i) => (
          <span
            key={i}
            className="font-mono-label text-[0.55rem] text-zinc-700 flex-shrink-0"
            style={{ letterSpacing: "0.1em" }}
          >
            {term} —
          </span>
        ))}
      </motion.div>
    </div>
  );
}
