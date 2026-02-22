"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/lib/store";

export default function CursorManager() {
  const { activeWorld, isMobile } = usePortfolioStore();
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;

    document.body.style.cursor = "none";

    let frame: number;
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Throttle with rAF
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  if (isMobile) return null;

  const getCursorStyle = () => {
    switch (activeWorld) {
      case "systems":
        return {
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          border: "none",
          background: "transparent",
          boxShadow: "none",
          // Crosshair via pseudo-elements handled by CSS below
        };
      case "markets":
        return {
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)",
          boxShadow: "0 0 20px rgba(16,185,129,0.15)",
          border: "none",
        };
      default:
        return {
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "rgba(100,100,100,0.5)",
          border: "none",
          boxShadow: "none",
        };
    }
  };

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] transition-[width,height,background,box-shadow] duration-500"
      style={{
        ...getCursorStyle(),
        willChange: "transform",
      }}
    >
      {activeWorld === "systems" && (
        <>
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 h-full"
            style={{ width: 1, background: "var(--systems-fg)", transform: "translateX(-0.5px)" }}
          />
          {/* Horizontal line */}
          <div
            className="absolute top-1/2 left-0 w-full"
            style={{ height: 1, background: "var(--systems-fg)", transform: "translateY(-0.5px)" }}
          />
        </>
      )}
    </div>
  );
}
