"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/lib/store";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { activeWorld } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setProgress((scrollTop / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const barColor =
    activeWorld === "systems"
      ? "var(--systems-accent)"
      : activeWorld === "markets"
      ? "var(--markets-accent)"
      : "#a1a1aa";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] h-[1px] bg-transparent">
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          background: barColor,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
