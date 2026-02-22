"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GridBackground from "./GridBackground";

const sectionVariants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

export default function SystemsWorld() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--systems-bg)", color: "var(--systems-fg)" }}
    >
      <GridBackground />
      <div className="noise-overlay" />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-label text-zinc-500 mb-6">Technology & Research</p>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
            <span className="stroke-text">AI,</span> Systems
            <br />
            & Simulation
          </h1>
          <div className="mt-12 w-24 h-[1px] bg-zinc-400" />
          <p className="mt-6 text-lg text-zinc-600 max-w-lg leading-relaxed">
            Building and validating analytical systems under real-world
            constraints — from edge AI perception to large-scale
            economic simulation.
          </p>
        </motion.div>
        <div className="absolute bottom-8 left-6 md:left-16">
          <p className="font-mono-label text-zinc-400 text-[0.6rem]">Scroll to explore</p>
        </div>
      </section>

      {/* Section 01: AI Perception & Edge Systems */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">01 — AI Perception & Edge Systems</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Autonomous Perception Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-lg font-semibold mb-4">Team RoboManipal — AI Researcher</h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Built an AI perception and prescriptive decision system for autonomous
              robotics. Integrated instance segmentation, 3D spatial tracking, and
              multi-sensor fusion into a unified real-time pipeline. Represented the
              team at the World Robotics Championship.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Instance Segmentation", "3D Tracking", "Sensor Fusion", "Edge Deployment"].map((tag) => (
                <span key={tag} className="border border-zinc-300 px-3 py-1 text-xs font-mono-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-lg font-semibold mb-4">Firmware Migration Framework</h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Designed a deterministic firmware migration framework that automated
              cross-architecture microcontroller porting. Reduced manual intervention
              and ensured reproducibility across hardware platforms.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Deterministic Migration", "Cross-Architecture", "Embedded Systems", "Automation"].map((tag) => (
                <span key={tag} className="border border-zinc-300 px-3 py-1 text-xs font-mono-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-3xl">
          <p className="text-zinc-500 text-sm leading-relaxed italic">
            Focus throughout: robustness, reproducibility, and performance under
            real-world constraints — not just benchmark optimisation.
          </p>
        </div>
      </Section>

      {/* Section 02: Simulation & Digital Economy Modeling */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">02 — Simulation & Digital Economy</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Post-AGI Economic Simulation
        </h2>
        <div className="border border-zinc-300 p-8 bg-white/30 max-w-3xl mb-8">
          <h3 className="text-lg font-semibold mb-4">Agent-Based Economic Framework</h3>
          <p className="text-zinc-600 leading-relaxed mb-6">
            Designed a Post-AGI Digital Economy Simulation Framework exploring structural
            interventions in macro-level digital economies. The framework models autonomous
            economic agents interacting within tokenised reputation systems and synthetic
            labour markets.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Model Type", value: "Agent-Based" },
              { label: "Wealth Concentration", value: "−34%" },
              { label: "Labour Markets", value: "Synthetic" },
              { label: "Interventions", value: "Policy Protocols" },
            ].map((item, i) => (
              <div key={i} className="border border-zinc-200 p-3 text-center">
                <p className="font-mono-label text-[0.5rem] text-zinc-500 mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-zinc-800">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Agent-Based Modeling", "Tokenised Reputation", "Synthetic Labour", "Policy Simulation"].map((tag) => (
              <span key={tag} className="border border-zinc-300 px-3 py-1 text-xs font-mono-label">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed italic max-w-3xl">
          Designed to test structural interventions in macro-level digital economies —
          moving beyond optimisation toward understanding systemic dynamics.
        </p>
      </Section>

      {/* Section 03: Research Methodology */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">03 — Research Methodology</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Analytical Rigour
        </h2>
        <p className="text-zinc-600 mb-8 max-w-2xl leading-relaxed">
          Emphasis on stress-testing assumptions rather than optimising surface-level
          metrics. Every research project follows a validation-first methodology.
        </p>
        <div className="max-w-3xl space-y-6">
          {[
            {
              phase: "Walk-Forward Validation",
              desc: "Out-of-sample testing on rolling windows to ensure model generalisation, not curve-fitting.",
            },
            {
              phase: "Regime-Aware Modeling",
              desc: "Segmenting analysis by market or system regime to avoid averaging away structural differences.",
            },
            {
              phase: "Parameter Sensitivity Testing",
              desc: "Systematic variation of inputs to identify fragile assumptions and robust parameter ranges.",
            },
            {
              phase: "Causality-Preserving Evaluation",
              desc: "Ensuring evaluation protocols respect temporal ordering and avoid look-ahead bias.",
            },
            {
              phase: "Robustness Under Execution Constraints",
              desc: "Validating model performance under realistic latency, cost, and capacity constraints.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start">
              <span className="font-mono-label text-zinc-400 text-sm mt-1 flex-shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="border-l border-zinc-300 pl-6">
                <h3 className="text-lg font-semibold mb-1">{item.phase}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-zinc-500 mb-4">04 — Contact</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Get In Touch</h2>
        <div className="max-w-lg">
          <p className="text-zinc-600 leading-relaxed mb-8">
            Open to discussing research collaboration, strategic consulting,
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
                <span className="font-mono-label text-zinc-500 w-20">{link.label}</span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="text-sm border-b border-zinc-300 pb-0.5 hover:border-systems-accent transition-colors duration-300"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="text-sm text-zinc-600">{link.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
