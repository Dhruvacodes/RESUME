"use client";

import { usePortfolioStore } from "@/lib/store";

export default function StatusStrip() {
  const { activeWorld } = usePortfolioStore();

  const getStatusText = () => {
    switch (activeWorld) {
      case "systems":
        return "SYSTEMS — Technology & Research";
      case "markets":
        return "MARKETS — Quantitative Finance & Trading";
      default:
        return "DUAL AXIS — Systems ↔ Markets";
    }
  };

  const getBgColor = () => {
    switch (activeWorld) {
      case "systems":
        return "bg-systems-accent";
      case "markets":
        return "bg-markets-accent";
      default:
        return "bg-zinc-400";
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] h-[2px] ${getBgColor()} transition-colors duration-1000`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="absolute top-[2px] left-4 py-1">
        <span
          className="font-mono-label text-[0.45rem] opacity-40 transition-opacity duration-500 hover:opacity-80"
          style={{
            color:
              activeWorld === "markets" ? "var(--markets-fg)" : "var(--systems-fg)",
          }}
        >
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}
