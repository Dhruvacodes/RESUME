"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import SystemsWorld from "./SystemsWorld";
import CoreWorld from "./CoreWorld";
import MarketsWorld from "./MarketsWorld";
import WorldTransition from "./WorldTransition";

export default function AxisContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { activeWorld, setActiveWorld, introCompleted, isMobile } = usePortfolioStore();
  const [horizontalProgress, setHorizontalProgress] = useState(0.5);
  const [axisHintActive, setAxisHintActive] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);
  const currentX = useRef(-100); // Start at core (center)
  const targetX = useRef(-100);
  const animationFrame = useRef<number>(0);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const updateWorld = useCallback(
    (xPercent: number) => {
      const absX = Math.abs(xPercent);
      if (absX < 55) {
        if (activeWorld !== "systems") setActiveWorld("systems");
      } else if (absX < 145) {
        if (activeWorld !== "core") setActiveWorld("core");
      } else {
        if (activeWorld !== "markets") setActiveWorld("markets");
      }
      // Progress: 0 = systems, 0.5 = core, 1 = markets
      setHorizontalProgress(clamp(absX / 200, 0, 1));
    },
    [activeWorld, setActiveWorld]
  );

  const animate = useCallback(() => {
    currentX.current += (targetX.current - currentX.current) * 0.08;

    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${currentX.current}vw)`;
    }

    updateWorld(currentX.current);
    animationFrame.current = requestAnimationFrame(animate);
  }, [updateWorld]);

  useEffect(() => {
    if (isMobile || !introCompleted) return;

    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [animate, isMobile, introCompleted]);

  // Wheel handler for horizontal scrolling
  useEffect(() => {
    if (isMobile || !introCompleted) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle explicit horizontal scroll for world navigation
      // Vertical scroll passes through to panel overflow-y-auto
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        targetX.current = clamp(targetX.current - e.deltaX * 0.05, -200, 0);
        e.preventDefault();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [isMobile, introCompleted]);

  // Drag handler
  useEffect(() => {
    if (isMobile || !introCompleted) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStart.current = e.clientX;
      scrollStart.current = targetX.current;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStart.current;
      targetX.current = clamp(
        scrollStart.current + (delta / window.innerWidth) * 100,
        -200,
        0
      );
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isMobile, introCompleted]);

  // Touch handler for mobile swipe
  useEffect(() => {
    if (!isMobile || !introCompleted) return;
    // On mobile, worlds are stacked vertically, no horizontal swiping needed
    return;
  }, [isMobile, introCompleted]);

  // Opening horizontal hint animation
  useEffect(() => {
    if (isMobile || !introCompleted) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const dismissHint = (resetToCenter = true) => {
      if (cancelled) return;
      cancelled = true;
      timers.forEach(clearTimeout);
      setAxisHintActive(false);
      if (resetToCenter) {
        targetX.current = -100;
      }
    };

    const handleUserNavigationStart = () => dismissHint(false);
    const handleKeyboardStart = () => dismissHint(true);

    window.addEventListener("wheel", handleUserNavigationStart, {
      once: true,
      passive: true,
    });
    window.addEventListener("mousedown", handleUserNavigationStart, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", handleUserNavigationStart, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", handleKeyboardStart, {
      once: true,
      passive: true,
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const peekVw = prefersReducedMotion
      ? 0
      : Math.min(18, Math.max(12, (190 / window.innerWidth) * 100));

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setAxisHintActive(true);
      }, 350)
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        targetX.current = -100 + peekVw;
      }, 700)
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        targetX.current = -100 - peekVw;
      }, 1550)
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        targetX.current = -100;
      }, 2450)
    );

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setAxisHintActive(false);
      }, 3600)
    );

    return () => {
      dismissHint();
      window.removeEventListener("wheel", handleUserNavigationStart);
      window.removeEventListener("mousedown", handleUserNavigationStart);
      window.removeEventListener("touchstart", handleUserNavigationStart);
      window.removeEventListener("keydown", handleKeyboardStart);
    };
  }, [isMobile, introCompleted]);

  // Navigate to a specific world
  const navigateToWorld = useCallback(
    (world: "systems" | "core" | "markets") => {
      if (isMobile) {
        const el = document.getElementById(`${world}-section`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const targets = { systems: 0, core: -100, markets: -200 };
      targetX.current = targets[world];
    },
    [isMobile]
  );

  // If mobile, render stacked
  if (isMobile) {
    return (
      <div
        className="relative w-full"
        style={{
          overflowX: "hidden",
          overflowY: "visible",
          minHeight: "100vh",
        }}
      >
        <div id="core-section">
          <CoreWorld navigateToWorld={navigateToWorld} />
        </div>
        <div id="systems-section">
          <SystemsWorld />
        </div>
        <div id="markets-section">
          <MarketsWorld />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      <WorldTransition progress={horizontalProgress} />
      <AnimatePresence>
        {axisHintActive && (
          <motion.div
            className="pointer-events-none fixed inset-y-0 left-0 right-0 z-[140] hidden lg:flex items-center justify-between px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="flex items-center gap-3 rounded border border-zinc-300/70 bg-[#F5F3EE]/85 px-4 py-3 text-zinc-700 shadow-[0_12px_40px_rgba(24,24,27,0.08)] backdrop-blur-md"
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -18, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-lg" aria-hidden="true">
                &larr;
              </span>
              <span className="font-mono-label text-[0.58rem]">Systems</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3 rounded border border-zinc-700/50 bg-zinc-950/85 px-4 py-3 text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-md"
              initial={{ x: 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 18, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono-label text-[0.58rem]">Markets</span>
              <span className="text-lg" aria-hidden="true">
                &rarr;
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={innerRef}
        className="axis-horizontal flex h-screen"
        style={{
          width: "300vw",
          transform: `translateX(${currentX.current}vw)`,
          willChange: "transform",
        }}
      >
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <SystemsWorld />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <CoreWorld navigateToWorld={navigateToWorld} />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <MarketsWorld />
        </div>
      </div>
    </div>
  );
}
