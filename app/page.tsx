"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioStore } from "@/lib/store";
import IntroOverlay from "@/components/IntroOverlay";
import AxisContainer from "@/components/AxisContainer";
import StatusStrip from "@/components/StatusStrip";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiListener from "@/components/KonamiListener";

const CursorManager = dynamic(() => import("@/components/CursorManager"), {
  ssr: false,
});

export default function Home() {
  const { introCompleted, setIsMobile, isMobile } = usePortfolioStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  // Unlock body overflow for mobile
  useEffect(() => {
    if (isMobile && introCompleted) {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    } else if (!introCompleted) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, [isMobile, introCompleted]);

  return (
    <main className="relative">
      <IntroOverlay />
      {introCompleted && (
        <>
          <StatusStrip />
          <AxisContainer />
          <ScrollProgress />
          <CursorManager />
          <KonamiListener />
        </>
      )}
    </main>
  );
}
