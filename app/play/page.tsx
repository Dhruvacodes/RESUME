"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FloatingShape({
  delay,
  x,
  y,
  size,
  color,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        filter: "blur(40px)",
        opacity: 0.3,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function PlayPage() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeExperiment, setActiveExperiment] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
      );
      audioRef.current.loop = true;
    }
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  const experiments = [
    {
      name: "Chromatic Drift",
      component: (
        <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
          <FloatingShape delay={0} x={20} y={30} size={200} color="rgba(16,185,129,0.5)" />
          <FloatingShape delay={1} x={60} y={50} size={150} color="rgba(0,102,255,0.5)" />
          <FloatingShape delay={2} x={40} y={20} size={180} color="rgba(168,85,247,0.4)" />
          <FloatingShape delay={3} x={80} y={70} size={120} color="rgba(245,158,11,0.4)" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif-display text-3xl text-white/80">Chromatic Drift</p>
          </div>
        </div>
      ),
    },
    {
      name: "Grid Pulse",
      component: (
        <div className="relative w-full h-[400px] bg-zinc-950 rounded-lg overflow-hidden p-8">
          <div className="grid grid-cols-8 grid-rows-6 gap-2 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-zinc-800 rounded-sm"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  delay: (i % 8) * 0.1 + Math.floor(i / 8) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `rgba(16, 185, 129, ${0.1 + (i % 8) * 0.05})`,
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Particle Field",
      component: (
        <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200 - Math.random() * 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif-display text-3xl text-white/60">Rising</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 flex justify-between items-center">
        <div>
          <h1 className="font-serif-display text-4xl mb-2">Play</h1>
          <p className="font-mono-label text-zinc-500 text-[0.6rem]">
            Experimental Sandbox
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMusic}
            className="px-4 py-2 border border-zinc-700 text-sm hover:border-zinc-500 transition-colors duration-300 flex items-center gap-2"
          >
            <span className={musicPlaying ? "animate-pulse" : ""}>♪</span>
            {musicPlaying ? "Pause" : "Music"}
          </button>
          <a
            href="/"
            className="text-sm text-zinc-500 hover:text-white transition-colors duration-300"
          >
            ← Back
          </a>
        </div>
      </header>

      {/* Experiment selector */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <div className="flex gap-4">
          {experiments.map((exp, i) => (
            <button
              key={i}
              onClick={() => setActiveExperiment(i)}
              className={`font-mono-label text-[0.6rem] px-4 py-2 border transition-all duration-300 ${
                activeExperiment === i
                  ? "border-markets-accent text-markets-accent"
                  : "border-zinc-800 text-zinc-600 hover:border-zinc-600"
              }`}
            >
              {exp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active experiment */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperiment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {experiments[activeExperiment].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-zinc-800">
        <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
          A collection of visual experiments and interactive prototypes.
          This space exists for creative exploration,
          separate from the portfolio&apos;s main axis.
        </p>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <p className="font-mono-label text-[0.5rem] text-zinc-700">
          These experiments are purely creative — not indicative of production work.
        </p>
      </div>
    </div>
  );
}
