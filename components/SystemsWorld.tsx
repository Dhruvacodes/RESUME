"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animated Section ──────────────────────────────────────────── */
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

/* ─── Section Title with neutral accent bar ─────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-[3px] h-10 mt-1 flex-shrink-0 rounded-full bg-zinc-400" />
      <h2 className="font-serif-display text-3xl md:text-5xl leading-tight text-zinc-900">
        {children}
      </h2>
    </div>
  );
}

/* ─── SystemsWorld ──────────────────────────────────────────────── */
export default function SystemsWorld() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "var(--systems-bg)",
        color: "var(--systems-fg)",
      }}
    >
      <div className="noise-overlay" />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-label text-zinc-500 mb-6">Systems</p>
          <h1
            className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight"
            style={{ color: "#000000" }}
          >
            Systems Architecture
            <br />
            &amp; Engineering
          </h1>
          <div className="mt-10 w-24 h-[1px] systems-silver-divider" />
          <p className="mt-6 text-base text-zinc-500 max-w-xl leading-relaxed">
            Designing deterministic, constraint-aware systems across embedded
            firmware, autonomous robotics, and distributed compute.
          </p>
        </motion.div>

        {/* Hero Cards */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            {
              title: "Embedded Systems",
              desc: "Cross-architecture firmware, deterministic migration, hardware-in-the-loop validation",
            },
            {
              title: "Autonomous Robotics",
              desc: "Edge AI perception, multi-sensor fusion, constraint-aware decision systems",
            },
            {
              title: "Distributed Systems",
              desc: "Verifiable compute, distributed orchestration, trust-minimised coordination",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="sys-card p-6 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <h3 className="text-sm font-semibold mb-2 tracking-wide text-zinc-800">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-6 md:left-16">
          <p className="font-mono-label text-zinc-400 text-[0.6rem]">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* ═══ SYSTEMS MARQUEE ═══ */}
      <div className="relative overflow-hidden py-3 border-y border-zinc-300/50 group">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -2400] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 3 }).flatMap((_, r) =>
            [
              "DISTRIBUTED ARCHITECTURE",
              "EMBEDDED SYSTEMS",
              "AUTONOMOUS AGENTS",
              "PERFORMANCE ENGINEERING",
              "SYSTEM ABSTRACTION",
            ].map((term, i) => (
              <span
                key={`${r}-${i}`}
                className="font-mono-label text-[0.55rem] text-zinc-400 flex-shrink-0"
                style={{ letterSpacing: "0.1em" }}
              >
                {term} —
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ═══ ARCHITECTURE & DESIGN PRINCIPLES ═══ */}
      <Section>
        <SectionTitle>Architecture &amp; Design Principles</SectionTitle>
        <p className="text-zinc-500 max-w-2xl leading-relaxed mb-10">
          I build systems that operate reliably under constraint — limited
          compute, adversarial environments, and real-time requirements. My
          focus is determinism, reproducibility, and structural robustness.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {[
            {
              title: "Deterministic Execution",
              items: [
                "Reproducible build pipelines",
                "State-aware validation workflows",
                "Controlled deployment transitions",
              ],
            },
            {
              title: "Failure-Oriented Engineering",
              items: [
                "Stress-first testing",
                "Edge-case modeling",
                "Degradation-aware design",
              ],
            },
            {
              title: "Resource-Constrained Optimisation",
              items: [
                "Hardware-aware model deployment",
                "Latency-sensitive pipelines",
                "Memory-conscious execution",
              ],
            },
            {
              title: "Validation & Verification",
              items: [
                "Walk-forward validation",
                "Simulation-driven testing",
                "Pre-deployment correctness checks",
              ],
            },
          ].map((block) => (
            <div key={block.title} className="sys-card p-6">
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-zinc-800">
                {block.title}
              </h3>
              <ul className="space-y-1.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-zinc-500 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-zinc-400/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ EMBEDDED SYSTEMS ═══ */}
      <Section>
        <p className="font-mono-label text-zinc-400 mb-4">
          Embedded Systems &amp; Firmware
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-zinc-900 mb-8">
          Deterministic Firmware Migration Framework
        </h2>
        <div className="sys-card p-8 max-w-3xl mb-8">
          <p className="text-zinc-600 leading-relaxed mb-6">
            Designed a reproducible framework for cross-architecture firmware
            migration using semantic hardware abstraction layers that decouple
            application logic from platform-specific peripherals. The system
            automates code translation across microcontroller families, validates
            correctness through simulation-based testing, and produces
            deterministic builds with full traceability from source to binary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6">
            {[
              "Semantic hardware abstraction layers",
              "Automated code translation across MCU families",
              "Simulation-based validation pipeline",
              "Register mapping & peripheral translation",
              "Architecture-agnostic interface design",
              "Deterministic build reproducibility",
              "Cross-toolchain compilation",
              "Hardware-in-the-loop verification",
            ].map((skill) => (
              <p
                key={skill}
                className="text-xs text-zinc-500 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-amber-600/40"
              >
                {skill}
              </p>
            ))}
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed italic">
            Focus: reducing manual intervention in platform migration while
            preserving functional correctness across microcontroller
            architectures.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "C/C++",
            "Microcontrollers",
            "Semantic HAL",
            "Build Systems",
            "Simulation Testing",
            "Toolchain Integration",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-zinc-300 px-3 py-1 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ AUTONOMOUS ROBOTICS ═══ */}
      <Section>
        <p className="font-mono-label text-zinc-400 mb-4">
          Autonomous Robotics &amp; Edge AI
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-zinc-900 mb-4">
          AI Perception for Agricultural Robotics
        </h2>
        <p className="text-zinc-400 font-mono-label text-[0.6rem] mb-8">
          Team RoboManipal — World Robotics Championship 2024
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="sys-card p-8">
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              Perception &amp; Decision Pipeline
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Developed the full AI perception stack for an autonomous
              agricultural robot — instance segmentation for individual plant
              identification, active viewpoint optimisation for multi-angle
              canopy observation, 3D spatial tracking using fused camera and
              LiDAR data, and plant-level risk prediction for targeted
              intervention. The system runs real-time inference on edge hardware.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Segmentation", value: "Instance-Level" },
                { label: "Tracking", value: "3D Spatial" },
                { label: "Sensors", value: "Camera + LiDAR" },
                { label: "Deployment", value: "Edge Hardware" },
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-mono-label text-[0.5rem] text-zinc-400 mb-1">
                    {m.label}
                  </p>
                  <p className="text-zinc-800 font-semibold text-sm">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="sys-card p-8">
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              Decision &amp; Deployment
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Constraint-aware path planning with feedback-based control loops.
              Plant-level risk prediction drives targeted intervention planning.
              Full system validated in international competition environments
              with latency profiling and runtime performance tuning on
              resource-constrained hardware.
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed italic">
              Mentored 50+ team members across ML fundamentals, computer vision,
              and edge deployment workflows. Represented India at the World
              Robotics Championship 2024.
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Python",
            "Instance Segmentation",
            "LiDAR",
            "Edge AI",
            "Multi-Sensor Fusion",
            "Robotics Middleware",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-zinc-300 px-3 py-1 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ POST-AGI DIGITAL ECONOMY SIMULATION ═══ */}
      <Section>
        <p className="font-mono-label text-zinc-400 mb-4">
          Simulation &amp; Agent-Based Systems
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-zinc-900 mb-8">
          Post-AGI Digital Economy Simulation
        </h2>
        <div className="sys-card p-8 max-w-3xl mb-8">
          <p className="text-zinc-600 leading-relaxed mb-6">
            Built a large-scale agent-based simulation modeling autonomous
            economic actors in post-AGI tokenised economies. The framework
            introduces reputation currencies and tokenized attention markets as
            coordination primitives, then explores policy interventions for
            wealth distribution dynamics. Simulation results showed a 34%
            reduction in wealth concentration under targeted policy mechanisms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: "Architecture", value: "Agent-Based" },
              { label: "Coordination", value: "Reputation Currencies" },
              { label: "Markets", value: "Tokenized Attention" },
              { label: "Wealth Conc.", value: "−34%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-zinc-800 font-semibold text-sm">
                  {stat.value}
                </p>
                <p className="font-mono-label text-[0.5rem] text-zinc-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed italic">
            Exploring how emergent coordination structures behave at scale —
            from trust-minimised exchange to autonomous resource allocation
            under structural uncertainty.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "Agent-Based Modeling",
            "Simulation Design",
            "Tokenomics",
            "Policy Analysis",
            "Distributed Systems",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-zinc-300 px-3 py-1 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* ═══ CONTACT ═══ */}
      <Section className="pb-32">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="max-w-lg">
          <p className="text-zinc-500 leading-relaxed mb-8">
            Open to discussing research collaboration, systems design, and
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
                <span className="font-mono-label text-zinc-400 w-20">
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
                    className="text-sm text-zinc-700 border-b border-zinc-300 pb-0.5 hover:border-zinc-600 transition-colors duration-300"
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
