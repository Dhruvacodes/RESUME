"use client";

import { motion } from "framer-motion";
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
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6">
          Dhruv Agrawal
        </h1>
        <p className="font-mono-label text-zinc-500 mb-8 text-[0.65rem]">
          Technology × Finance
        </p>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto mb-8" />
        <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed mb-8">
          Exploring complex systems across capital markets, distributed
          architectures, and large-scale simulation.
        </p>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          Computer and Communication Engineering student at Manipal Institute of
          Technology with strong foundations in statistical learning, systems
          thinking, and quantitative modeling. Interested in applying analytical
          rigor to high-impact strategic and business challenges.
        </p>
      </motion.div>

      {/* Highlight Blocks */}
      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          {
            title: "IISc Podium Recognition",
            desc: "FX Statistical Arbitrage Research",
          },
          {
            title: "14-Year HF Market Dataset",
            desc: "5-second frequency, multi-currency",
          },
          {
            title: "World Robotics Championship",
            desc: "Represented RoboManipal at international level",
          },
          {
            title: "50+ Members Trained",
            desc: "ML & Edge AI workshops and mentorship",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border border-zinc-200 p-5 text-left"
          >
            <h3 className="text-sm font-semibold text-zinc-800 mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {item.desc}
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

      {/* Contact Info */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6 text-[0.6rem] font-mono-label text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <a href="mailto:dhruvagrawal479@gmail.com" className="hover:text-zinc-700 transition-colors">
          dhruvagrawal479@gmail.com
        </a>
        <a href="https://linkedin.com/in/dhruva02" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">
          LinkedIn
        </a>
        <a href="https://github.com/Dhruvacodes" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">
          GitHub
        </a>
        <span>Bengaluru, India</span>
      </motion.div>

      {/* Navigation links */}
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
