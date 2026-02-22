"use client";

import { useEffect, useCallback } from "react";
import { usePortfolioStore } from "@/lib/store";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export default function KonamiListener() {
  const { setExperimentalMode, experimentalMode } = usePortfolioStore();

  const handleKeySequence = useCallback(() => {
    let sequence: string[] = [];
    let timeout: NodeJS.Timeout;

    const handler = (e: KeyboardEvent) => {
      sequence.push(e.code);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sequence = [];
      }, 2000);

      if (sequence.length > KONAMI_CODE.length) {
        sequence = sequence.slice(-KONAMI_CODE.length);
      }

      if (
        sequence.length === KONAMI_CODE.length &&
        sequence.every((key, i) => key === KONAMI_CODE[i])
      ) {
        setExperimentalMode(true);
        sequence = [];
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setExperimentalMode]);

  useEffect(() => {
    const cleanup = handleKeySequence();
    return cleanup;
  }, [handleKeySequence]);

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c⚡ Dual Axis — Systems ↔ Markets",
      "color: #10B981; font-size: 16px; font-weight: bold;"
    );
    console.log(
      "%cInitializing portfolio interface...",
      "color: #666; font-size: 11px;"
    );
    console.log(
      "%c→ Systems kernel loaded",
      "color: #0066FF; font-size: 11px;"
    );
    console.log(
      "%c→ Markets engine online",
      "color: #10B981; font-size: 11px;"
    );
    console.log(
      "%c→ Konami mode: standby",
      "color: #999; font-size: 11px;"
    );
    console.log(
      "%cTry: ↑↑↓↓←→←→BA",
      "color: #999; font-size: 10px; font-style: italic;"
    );
  }, []);

  if (!experimentalMode) return null;

  return (
    <div className="fixed top-4 right-4 z-[9998] flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-emerald-500/30 rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="font-mono-label text-[0.5rem] text-emerald-400">
        Experimental Mode
      </span>
    </div>
  );
}
