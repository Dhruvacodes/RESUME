"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import GridBackground from "./GridBackground";
import ArchitectureDiagram from "./ArchitectureDiagram";

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
          <p className="font-mono-label text-zinc-500 mb-6">Systems Engineering</p>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
            <span className="stroke-text">Building</span>
            <br />
            Infrastructure
            <br />
            That <span className="stroke-text">Scales</span>
          </h1>
          <div className="mt-12 w-24 h-[1px] bg-zinc-400" />
          <p className="mt-6 text-lg text-zinc-600 max-w-lg leading-relaxed">
            Distributed systems, fault-tolerant architectures, and
            performance engineering for production-grade platforms.
          </p>
        </motion.div>
        <div className="absolute bottom-8 left-6 md:left-16">
          <p className="font-mono-label text-zinc-400 text-[0.6rem]">Scroll to explore</p>
        </div>
      </section>

      {/* Architecture */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">01 — Architecture</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          System Design Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Event-Driven Architecture",
              desc: "Asynchronous message passing with guaranteed delivery. Built for throughput and resilience under load.",
              metric: "99.97%",
              label: "Uptime SLA",
            },
            {
              title: "Microservices Orchestration",
              desc: "Service mesh with circuit breakers, retry policies, and graceful degradation patterns.",
              metric: "< 50ms",
              label: "p99 Latency",
            },
            {
              title: "Data Pipeline Engineering",
              desc: "Stream processing with exactly-once semantics. Real-time ETL for terabyte-scale ingestion.",
              metric: "2.4TB",
              label: "Daily Throughput",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="border border-zinc-300 p-6 bg-white/30"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono-label text-zinc-500 mb-2">{card.label}</p>
              <p className="font-serif-display text-3xl mb-3 text-systems-accent">
                {card.metric}
              </p>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <p className="font-mono-label text-zinc-500 mb-4 text-[0.55rem]">Interactive Architecture Map</p>
          <ArchitectureDiagram />
        </div>
      </Section>

      {/* AI Perception */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">02 — AI Perception</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Machine Perception Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-xl font-semibold mb-4">Computer Vision Pipeline</h3>
            <p className="text-zinc-600 leading-relaxed mb-4">
              End-to-end inference pipeline for real-time object detection and segmentation.
              Optimized for edge deployment with TensorRT acceleration.
            </p>
            <div className="flex gap-3 flex-wrap">
              {["PyTorch", "ONNX", "TensorRT", "OpenCV"].map((tag) => (
                <span key={tag} className="border border-zinc-300 px-3 py-1 text-xs font-mono-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-zinc-300 p-8 bg-white/30">
            <h3 className="text-xl font-semibold mb-4">NLP Processing Engine</h3>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Transformer-based extraction pipeline with custom tokenization.
              Fine-tuned for domain-specific entity recognition and classification.
            </p>
            <div className="flex gap-3 flex-wrap">
              {["Transformers", "spaCy", "BERT", "FastAPI"].map((tag) => (
                <span key={tag} className="border border-zinc-300 px-3 py-1 text-xs font-mono-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Simulation Systems */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">03 — Simulation</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Simulation & Modeling
        </h2>
        <div className="max-w-3xl">
          <p className="text-lg text-zinc-600 leading-relaxed mb-8">
            Monte Carlo simulation frameworks for risk analysis and system modeling.
            Agent-based modeling for complex adaptive systems with emergent behavior tracking.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 10000000, suffix: "+", label: "Simulations Run" },
              { value: 47, suffix: "", label: "Model Variants" },
              { value: 99.2, suffix: "%", label: "Convergence Rate" },
              { value: 340, suffix: "ms", label: "Avg Sim Time" },
            ].map((stat, i) => (
              <div key={i} className="border border-zinc-300 p-4 bg-white/30 text-center">
                <div className="font-serif-display text-2xl md:text-3xl text-systems-accent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-mono-label text-zinc-500 mt-2 text-[0.55rem]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Research Methodology */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">04 — Research</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Research Methodology
        </h2>
        <div className="max-w-3xl space-y-6">
          {[
            {
              phase: "Hypothesis Formation",
              desc: "Literature review, domain analysis, and systematic problem decomposition.",
            },
            {
              phase: "Experimental Design",
              desc: "Controlled experiments with statistical rigor. A/B testing frameworks and causal inference.",
            },
            {
              phase: "Implementation & Validation",
              desc: "Reproducible pipelines, version-controlled experiments, and automated evaluation.",
            },
            {
              phase: "Publication & Knowledge Transfer",
              desc: "Technical writing, conference submissions, and open-source contribution.",
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

      {/* Model Graveyard */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">05 — Model Graveyard</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Failed Experiments
        </h2>
        <p className="text-zinc-600 mb-8 max-w-2xl">
          Not every model makes it to production. These are the experiments that taught
          valuable lessons before being retired.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "LSTM-Attention v1", reason: "Overfitting on synthetic data", date: "2024-03" },
            { name: "GAN-Augmentor", reason: "Mode collapse at scale", date: "2024-06" },
            { name: "Graph-RL Agent", reason: "Reward hacking in simulation", date: "2024-09" },
            { name: "Diffusion Planner", reason: "Inference latency > 2s", date: "2025-01" },
            { name: "Sparse MoE v2", reason: "Routing instability", date: "2025-05" },
            { name: "Causal Transformer", reason: "Insufficient causal signal", date: "2025-08" },
          ].map((model, i) => (
            <div
              key={i}
              className="border border-zinc-300 border-dashed p-4 bg-white/20 opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold line-through">{model.name}</h4>
                <span className="font-mono-label text-[0.5rem] text-zinc-400">{model.date}</span>
              </div>
              <p className="text-xs text-zinc-500">{model.reason}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Technical Journal */}
      <Section>
        <p className="font-mono-label text-zinc-500 mb-4">06 — Journal</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">
          Technical Journal
        </h2>
        <div className="max-w-2xl space-y-6">
          {[
            {
              title: "On the Limits of Distributed Consensus",
              date: "2025-12",
              excerpt: "Exploring Byzantine fault tolerance in heterogeneous network topologies.",
            },
            {
              title: "Efficient Attention Mechanisms for Edge Inference",
              date: "2025-09",
              excerpt: "Reducing quadratic complexity while preserving long-range dependencies.",
            },
            {
              title: "Causal Inference in Observational System Metrics",
              date: "2025-06",
              excerpt: "Moving beyond correlation in production monitoring and alerting.",
            },
          ].map((entry, i) => (
            <div key={i} className="border-b border-zinc-300 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{entry.title}</h3>
                <span className="font-mono-label text-[0.5rem] text-zinc-400 flex-shrink-0 ml-4">
                  {entry.date}
                </span>
              </div>
              <p className="text-sm text-zinc-600">{entry.excerpt}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section className="pb-32">
        <p className="font-mono-label text-zinc-500 mb-4">07 — Contact</p>
        <h2 className="font-serif-display text-3xl md:text-5xl mb-8">Get In Touch</h2>
        <div className="max-w-lg">
          <p className="text-zinc-600 leading-relaxed mb-8">
            Open to discussing systems architecture, research collaboration,
            or technical advisory roles.
          </p>
          <div className="space-y-3">
            {[
              { label: "Email", value: "hello@dualaxis.dev" },
              { label: "GitHub", value: "github.com/dualaxis" },
              { label: "LinkedIn", value: "linkedin.com/in/dualaxis" },
            ].map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono-label text-zinc-500 w-20">{link.label}</span>
                <span className="text-sm border-b border-zinc-300 pb-0.5 hover:border-systems-accent transition-colors duration-300">
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
