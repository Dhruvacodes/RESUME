"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { WorldName } from "@/lib/store";

interface CoreWorldProps {
  navigateToWorld: (world: WorldName) => void;
}

export default function CoreWorld({ navigateToWorld }: CoreWorldProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--core-bg)", color: "#18181B" }}
    >
      {/* Identity Statement */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono-label text-zinc-400 mb-8">Dual Axis</p>
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8">
          Building Systems
          <br />
          That Survive
          <br />
          <span className="italic">Reality</span>
        </h1>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto mb-8" />
        <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
          Engineering at the intersection of distributed systems and
          quantitative markets.
        </p>
      </motion.div>

      {/* Metrics */}
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { value: 8, suffix: "+", label: "Years Experience" },
          { value: 47, suffix: "", label: "Projects Shipped" },
          { value: 99.9, suffix: "%", label: "Uptime Achieved" },
          { value: 12, suffix: "", label: "Research Papers" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-serif-display text-3xl md:text-4xl text-zinc-800">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </div>
            <p className="font-mono-label text-zinc-400 mt-2 text-[0.55rem]">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Directional Hints */}
      <motion.div
        className="mt-20 flex items-center gap-16 md:gap-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => navigateToWorld("systems")}
          className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-700 transition-colors duration-500"
        >
          <motion.span
            className="text-lg"
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ←
          </motion.span>
          <span className="font-mono-label text-[0.65rem] group-hover:tracking-[0.4em] transition-all duration-500">
            Systems
          </span>
        </button>
        <div className="w-[1px] h-8 bg-zinc-300" />
        <button
          onClick={() => navigateToWorld("markets")}
          className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-700 transition-colors duration-500"
        >
          <span className="font-mono-label text-[0.65rem] group-hover:tracking-[0.4em] transition-all duration-500">
            Markets
          </span>
          <motion.span
            className="text-lg"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </button>
      </motion.div>

      {/* Subtle navigation links */}
      <motion.div
        className="absolute bottom-8 flex gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <a href="/resume" className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity">
          Resume
        </a>
        <a href="/ideas" className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity">
          Ideas
        </a>
        <a href="/play" className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity">
          Play
        </a>
      </motion.div>
    </div>
  );
}
