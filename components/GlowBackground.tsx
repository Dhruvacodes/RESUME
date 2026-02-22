"use client";

import { useEffect, useRef, useState } from "react";

export default function GlowBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Disable on mobile or if user prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReduced) {
      setDisabled(true);
      return;
    }

    let frame: number;
    let time = 0;

    const animate = () => {
      time += 0.005;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${Math.sin(time) * 30}px, ${Math.cos(time * 0.7) * 20}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${Math.cos(time * 0.8) * 25}px, ${Math.sin(time * 0.6) * 30}px)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${Math.sin(time * 0.9) * 20}px, ${Math.cos(time * 0.5) * 25}px)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (disabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        ref={blob1Ref}
        className="glow-blob"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          left: "5%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        ref={blob2Ref}
        className="glow-blob"
        style={{
          width: 400,
          height: 400,
          top: "50%",
          right: "10%",
          background: "radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        ref={blob3Ref}
        className="glow-blob"
        style={{
          width: 350,
          height: 350,
          bottom: "5%",
          left: "30%",
          background: "radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
