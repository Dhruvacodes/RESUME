"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animated Section ──────────────────────────────────────────── */
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

/* ─── Section Title with gold accent bar ────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-[3px] h-10 mt-1 flex-shrink-0 rounded-full systems-gold-bar" />
      <h2 className="font-serif-display text-3xl md:text-5xl leading-tight">
        {children}
      </h2>
    </div>
  );
}

/* ─── Technical Stack Row ───────────────────────────────────────── */
function TechStack({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-6">
      {items.map((item, i) => (
        <span key={item} className="text-xs text-zinc-500">
          {item}
          {i < items.length - 1 && <span className="ml-2 text-zinc-600/40">•</span>}
        </span>
      ))}
    </div>
  );
}

/* ─── Skill Block ───────────────────────────────────────────────── */
function SkillBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="systems-metallic-card p-6">
      <h3 className="text-sm font-semibold mb-3 tracking-wide">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-xs text-zinc-500 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-zinc-400/50"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── SystemsWorld ──────────────────────────────────────────────── */
export default function SystemsWorld() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#1a1a1d", color: "#e4e4e7" }}
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
            style={{
              background: "linear-gradient(90deg, #C0C0C0, #D4AF37, #C0C0C0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Systems Architecture
            <br />
            &amp; Engineering
          </h1>
          <div className="mt-10 w-24 h-[1px] systems-silver-divider" />
          <p className="mt-6 text-base text-zinc-400 max-w-xl leading-relaxed">
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
              className="systems-metallic-card p-6 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <h3 className="text-sm font-semibold mb-2 tracking-wide text-zinc-200">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-6 md:left-16">
          <p className="font-mono-label text-zinc-600 text-[0.6rem]">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* ═══ ARCHITECTURE & DESIGN PRINCIPLES ═══ */}
      <Section>
        <SectionTitle>Architecture &amp; Design Principles</SectionTitle>
        <p className="text-zinc-400 max-w-2xl leading-relaxed mb-10">
          I build systems that operate reliably under constraint — limited
          compute, adversarial environments, and real-time requirements. My
          focus is determinism, reproducibility, and structural robustness.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          <SkillBlock
            title="Deterministic Execution"
            items={[
              "Reproducible build pipelines",
              "State-aware validation workflows",
              "Controlled deployment transitions",
            ]}
          />
          <SkillBlock
            title="Failure-Oriented Engineering"
            items={[
              "Stress-first testing",
              "Edge-case modeling",
              "Degradation-aware design",
            ]}
          />
          <SkillBlock
            title="Resource-Constrained Optimisation"
            items={[
              "Hardware-aware model deployment",
              "Latency-sensitive pipelines",
              "Memory-conscious execution",
            ]}
          />
          <SkillBlock
            title="Validation & Verification"
            items={[
              "Walk-forward validation",
              "Simulation-driven testing",
              "Pre-deployment correctness checks",
            ]}
          />
        </div>
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ EMBEDDED SYSTEMS ═══ */}
      <Section>
        <SectionTitle>Embedded Systems &amp; Firmware Engineering</SectionTitle>

        <div className="systems-metallic-card p-8 max-w-3xl mb-8">
          <h3 className="text-base font-semibold text-zinc-200 mb-3">
            Deterministic Firmware Migration Framework
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            Designed a reproducible framework for cross-architecture firmware
            migration, reducing manual intervention while preserving correctness
            across microcontroller platforms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {[
              "Hardware abstraction layers",
              "Cross-toolchain compilation",
              "Register mapping & peripheral translation",
              "Architecture-agnostic interface design",
              "Deterministic build reproducibility",
              "Hardware-in-the-loop validation",
            ].map((skill) => (
              <p
                key={skill}
                className="text-xs text-zinc-500 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-gold-accent/60"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

        <TechStack
          items={[
            "C/C++",
            "Microcontrollers",
            "HAL",
            "Build Systems",
            "Toolchain Integration",
            "Debugging",
          ]}
        />
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ AUTONOMOUS ROBOTICS ═══ */}
      <Section>
        <SectionTitle>Autonomous Robotics &amp; Edge AI Systems</SectionTitle>

        <div className="systems-metallic-card p-8 max-w-3xl mb-8">
          <p className="font-mono-label text-zinc-600 text-[0.55rem] mb-3">
            Team RoboManipal — AI Research
          </p>
          <h3 className="text-base font-semibold text-zinc-200 mb-3">
            AI Perception &amp; Decision Pipeline
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            Developed an end-to-end perception and decision framework integrating
            real-time object understanding, spatial reasoning, and multi-sensor
            inputs deployed on edge hardware. Validated in international
            competition environments.
          </p>

          {/* Three-column skill groups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                Perception Layer
              </p>
              <ul className="space-y-1">
                {[
                  "Real-time object detection",
                  "Sensor fusion",
                  "Spatial coordinate transforms",
                  "Edge inference optimisation",
                ].map((s) => (
                  <li key={s} className="text-xs text-zinc-500 leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                Decision Layer
              </p>
              <ul className="space-y-1">
                {[
                  "Constraint-aware path planning",
                  "Feedback-based control loops",
                  "Task-state modeling",
                ].map((s) => (
                  <li key={s} className="text-xs text-zinc-500 leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                Deployment
              </p>
              <ul className="space-y-1">
                {[
                  "Edge hardware optimisation",
                  "Latency profiling",
                  "Runtime performance tuning",
                ].map((s) => (
                  <li key={s} className="text-xs text-zinc-500 leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed italic">
            Mentored 50+ students across ML fundamentals and deployment
            workflows. Represented team at the World Robotics Championship.
          </p>
        </div>

        <TechStack
          items={[
            "Python",
            "Computer Vision",
            "Edge AI",
            "Multi-Sensor Systems",
            "Robotics Middleware",
          ]}
        />
      </Section>

      <div className="max-w-5xl mx-auto systems-silver-divider h-[1px]" />

      {/* ═══ DISTRIBUTED & VERIFIABLE SYSTEMS ═══ */}
      <Section>
        <SectionTitle>Distributed &amp; Verifiable Compute Systems</SectionTitle>

        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-8">
          Researching coordination mechanisms for distributed inference and
          verifiable execution in decentralised environments. Focused on
          structural trust, auditability, and throughput constraints.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {[
            "Distributed task orchestration",
            "On-chain verification models",
            "Auditability frameworks",
            "Trust-minimised computation",
          ].map((area) => (
            <div key={area} className="systems-metallic-card px-5 py-4">
              <p className="text-sm text-zinc-300">{area}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ CONTACT ═══ */}
      <Section className="pb-32">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="max-w-lg">
          <p className="text-zinc-400 leading-relaxed mb-8">
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
                    className="text-sm text-zinc-300 border-b border-zinc-700 pb-0.5 hover:border-zinc-400 transition-colors duration-300"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="text-sm text-zinc-400">{link.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
