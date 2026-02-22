"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorldName } from "@/lib/store";

interface CoreWorldProps {
  navigateToWorld: (world: WorldName) => void;
}

/* ─── Expandable Panel ─────────────────────────────────────────── */
function ExpandablePanel({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-zinc-200 overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-50 transition-colors duration-300"
      >
        <span className="text-sm font-semibold text-zinc-800 tracking-wide">
          {title}
        </span>
        <motion.span
          className="text-zinc-400 text-lg select-none"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-5 text-sm text-zinc-600 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── CoreWorld ─────────────────────────────────────────────────── */
export default function CoreWorld({ navigateToWorld }: CoreWorldProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-6 py-16"
      style={{
        background: "#F5F3EE",
        color: "#18181B",
      }}
    >
      {/* ── Hero ── */}
      <div className="text-center max-w-3xl mt-6">
        {/* Name */}
        <motion.h1
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#000000",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Dhruv Agrawal
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-mono-label"
          style={{
            fontSize: "14px",
            color: "#737373",
            marginTop: "24px",
            letterSpacing: "0.12em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Technology × Finance
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 h-[1px] bg-zinc-400/40 mx-auto"
          style={{ marginTop: "40px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Paragraph */}
        <motion.p
          className="text-base max-w-xl mx-auto leading-relaxed"
          style={{ color: "#737373", marginTop: "40px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Analytical problem-solver with a deep interest in technology-driven
          systems and capital markets. I study how complex systems behave under
          stress, how models fail in production, and where structured thinking
          creates the most leverage.
        </motion.p>
      </div>

      {/* ── Expandable Panels ── */}
      <div className="mt-12 w-full max-w-2xl space-y-3">
        <ExpandablePanel title="Education" delay={0.6}>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-zinc-800">
                Manipal Institute of Technology, Manipal
              </p>
              <p className="text-zinc-500 text-xs">
                B.Tech — Computer and Communication Engineering · 2023 – Present
              </p>
            </div>
            <div>
              <p className="font-semibold text-zinc-800">
                Bhavan&apos;s Bhagwandas Purohit Vidya Mandir, Nagpur
              </p>
              <p className="text-zinc-500 text-xs">
                Class XII — 93.6% · Class X — 98.4%
              </p>
            </div>
          </div>
        </ExpandablePanel>

        <ExpandablePanel title="Research Interests" delay={0.7}>
          <ul className="list-none space-y-2">
            <li>
              <span className="font-medium text-zinc-800">Quantitative Finance</span>{" "}
              — statistical arbitrage, risk modeling, walk-forward validation
            </li>
            <li>
              <span className="font-medium text-zinc-800">AI & Perception Systems</span>{" "}
              — real-time inference, sensor fusion, edge deployment
            </li>
            <li>
              <span className="font-medium text-zinc-800">Simulation & Modeling</span>{" "}
              — agent-based economic frameworks, policy-driven synthetic markets
            </li>
            <li>
              <span className="font-medium text-zinc-800">Systems Thinking</span>{" "}
              — cross-domain analytical frameworks for complex adaptive systems
            </li>
          </ul>
        </ExpandablePanel>

        <ExpandablePanel title="Leadership & Initiatives" delay={0.8}>
          <ul className="list-none space-y-2">
            <li>
              <span className="font-medium text-zinc-800">AI Researcher — Team RoboManipal</span>
              <br />
              Led AI perception development; trained 50+ members in ML and Edge AI workflows.
              Represented team at the World Robotics Championship.
            </li>
            <li>
              <span className="font-medium text-zinc-800">Quantitative Research — Finova, MIT Manipal</span>
              <br />
              Conducted independent research across FX arbitrage, crash forecasting,
              and portfolio construction. IISc podium recognition.
            </li>
            <li>
              <span className="font-medium text-zinc-800">Member — E-Cell, MIT Manipal</span>
              <br />
              Engaged with startup ecosystem and innovation-driven initiatives.
            </li>
          </ul>
        </ExpandablePanel>

        <ExpandablePanel title="Publications & Patent Work" delay={0.9}>
          <p className="text-zinc-500 italic">
            Research papers and patent applications are in progress across
            quantitative finance and autonomous systems. Details available upon
            request.
          </p>
        </ExpandablePanel>
      </div>

      {/* ── Directional Nav ── */}
      <motion.div
        className="mt-14 flex items-center gap-16 md:gap-32"
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

      {/* ── Contact ── */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6 text-[0.6rem] font-mono-label"
        style={{ color: "#737373" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <a
          href="mailto:dhruvagrawal479@gmail.com"
          className="hover:text-zinc-700 transition-colors"
        >
          dhruvagrawal479@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/dhruva02"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-700 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Dhruvacodes"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-700 transition-colors"
        >
          GitHub
        </a>
        <span>Bengaluru, India</span>
      </motion.div>

      {/* ── Page Links ── */}
      <motion.div
        className="mt-10 flex gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <a
          href="/resume"
          className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity"
        >
          Resume
        </a>
        <a
          href="/ideas"
          className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity"
        >
          Ideas
        </a>
        <a
          href="/play"
          className="font-mono-label text-[0.55rem] hover:opacity-100 transition-opacity"
        >
          Play
        </a>
      </motion.div>
    </div>
  );
}
