"use client";

import { useEffect, useRef, useCallback, useState } from "react";
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
      // Use deltaX for horizontal scroll, deltaY for vertical-to-horizontal
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetX.current = clamp(targetX.current - delta * 0.05, -200, 0);
      e.preventDefault();
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

  // Navigate to a specific world
  const navigateToWorld = useCallback(
    (world: "systems" | "core" | "markets") => {
      if (isMobile) return;
      const targets = { systems: 0, core: -100, markets: -200 };
      targetX.current = targets[world];
    },
    [isMobile]
  );

  // If mobile, render stacked
  if (isMobile) {
    return (
      <div className="w-screen">
        <SystemsWorld />
        <CoreWorld navigateToWorld={navigateToWorld} />
        <MarketsWorld />
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
