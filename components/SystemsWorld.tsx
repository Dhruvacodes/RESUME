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

/* ─── Project Card ──────────────────────────────────────────────── */
function ProjectCard({
  title,
  description,
  tags,
  note,
}: {
  title: string;
  description: string;
  tags: string[];
  note?: string;
}) {
  return (
    <div className="border border-zinc-300 p-8 bg-white/30">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-zinc-600 text-sm leading-relaxed mb-4">{description}</p>
      {note && (
        <p className="text-zinc-400 text-xs leading-relaxed italic mb-4">
          {note}
        </p>
      )}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-zinc-300 px-3 py-1 text-xs font-mono-label"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SystemsWorld ──────────────────────────────────────────────── */
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
          <p className="font-mono-label text-zinc-500 mb-6">
            Technology & Research
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
            Building Systems
            <br />
            <span className="stroke-text">That Scale</span>
          </h1>
          <div className="mt-12 w-24 h-[1px] bg-zinc-400" />
          <p className="mt-6 text-lg text-zinc-600 max-w-lg leading-relaxed">
            Designing robust systems under real-world constraints — from
            embedded firmware and autonomous robotics to emerging intersections
            of decentralised computation and AI.
          </p>
        </motion.div>
        <div className="absolute bottom-8 left-6 md:left-16">
          <p className="font-mono-label text-zinc-400 text-[0.6rem]">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* Section 01: Firmware Migration */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">
          01 — Embedded Systems
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Firmware Migration Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProjectCard
            title="Deterministic Cross-Architecture Porting"
            description="Designed and implemented a deterministic migration framework that automates firmware porting across different microcontroller architectures. The system reduces manual intervention significantly while maintaining reproducibility and correctness across hardware platforms."
            tags={[
              "Cross-Architecture",
              "Deterministic Migration",
              "Embedded Systems",
              "Automation",
            ]}
            note="Focus: eliminating human error in cross-platform firmware transitions."
          />
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-lg font-semibold mb-4">Design Principles</h3>
            <ul className="space-y-3 text-sm text-zinc-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-zinc-400 flex-shrink-0">01</span>
                <span>
                  Reproducibility over speed — every migration is fully
                  auditable and repeatable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-400 flex-shrink-0">02</span>
                <span>
                  Architecture-agnostic abstractions that translate cleanly
                  between target platforms.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-400 flex-shrink-0">03</span>
                <span>
                  Validation-first workflow ensuring correctness before
                  deployment to hardware.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Section 02: Blockchain + AI */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">
          02 — Emerging Research
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Blockchain &times; AI Convergence
        </h2>
        <div className="max-w-3xl">
          <ProjectCard
            title="Decentralised Computation & Intelligent Systems"
            description="Exploring the intersection of blockchain infrastructure and AI — specifically how decentralised computation models can support trustworthy, auditable AI workflows. The research investigates coordination mechanisms for distributed inference and the role of on-chain verification in maintaining model integrity."
            tags={[
              "Decentralised AI",
              "On-Chain Verification",
              "Distributed Inference",
              "Trust Frameworks",
            ]}
            note="Early-stage research — motivated by the growing need for transparent and verifiable AI systems at scale."
          />
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed italic max-w-3xl mt-6">
          Interested in the structural question: how do you build systems where
          the AI&apos;s reasoning is auditable without sacrificing throughput?
        </p>
      </Section>

      {/* Section 03: Autonomous Robotics */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">
          03 — Autonomous Robotics
        </p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          AI Perception Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProjectCard
            title="Team RoboManipal — AI Researcher"
            description="Developed an end-to-end AI perception and decision system for autonomous robotics. The pipeline integrates real-time object understanding, spatial awareness, and multi-sensor inputs into a unified framework deployed on edge hardware. Represented the team at the World Robotics Championship."
            tags={[
              "Real-Time Perception",
              "Sensor Fusion",
              "Edge AI",
              "Autonomous Systems",
            ]}
          />
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-lg font-semibold mb-4">Impact</h3>
            <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
              <p>
                Trained 50+ team members across ML fundamentals, computer
                vision, and edge deployment workflows.
              </p>
              <p>
                Built internal tooling and documentation to accelerate
                onboarding for new researchers joining the autonomy team.
              </p>
              <p>
                Represented RoboManipal at international competition,
                validating the system under real-world operating conditions.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-zinc-500 mb-4">04 — Contact</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Get In Touch
        </h2>
        <div className="max-w-lg">
          <p className="text-zinc-600 leading-relaxed mb-8">
            Open to discussing research collaboration, systems design,
            and analytical problem-solving.
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
                <span className="font-mono-label text-zinc-500 w-20">
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
                    className="text-sm border-b border-zinc-300 pb-0.5 hover:border-zinc-700 transition-colors duration-300"
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
