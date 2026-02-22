"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface WorldTransitionProps {
  progress: number; // 0 = systems, 0.5 = core, 1 = markets
}

export default function WorldTransition({ progress }: WorldTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prevProgress = useRef(progress);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Kill previous timeline to prevent overlap
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } });
    tlRef.current = tl;

    // Systems zone (0 - 0.33)
    if (progress < 0.33) {
      tl.to(overlayRef.current, { backgroundColor: "transparent" })
        .to(gridRef.current, { opacity: 1 }, "<")
        .to(glowRef.current, { opacity: 0 }, "<");
    }
    // Core zone (0.33 - 0.66)
    else if (progress < 0.66) {
      tl.to(overlayRef.current, { backgroundColor: "transparent" })
        .to(gridRef.current, { opacity: Math.max(0, 1 - (progress - 0.33) * 6) }, "<")
        .to(glowRef.current, { opacity: Math.max(0, (progress - 0.5) * 6) }, "<");
    }
    // Markets zone (0.66 - 1)
    else {
      tl.to(overlayRef.current, { backgroundColor: "transparent" })
        .to(gridRef.current, { opacity: 0 }, "<")
        .to(glowRef.current, { opacity: 1 }, "<");
    }

    prevProgress.current = progress;

    return () => {
      tl.kill();
    };
  }, [progress]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[50]"
      style={{ transition: "background-color 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* Grid overlay for Systems transition */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-bg opacity-0 pointer-events-none"
        style={{ transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
      {/* Glow overlay for Markets transition */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{ transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div
          className="glow-blob"
          style={{
            width: 400,
            height: 400,
            top: "20%",
            left: "10%",
            background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
          }}
        />
        <div
          className="glow-blob"
          style={{
            width: 300,
            height: 300,
            bottom: "10%",
            right: "15%",
            background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
