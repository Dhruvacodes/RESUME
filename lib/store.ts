import { create } from "zustand";

export type WorldName = "systems" | "core" | "markets";

interface PortfolioState {
  activeWorld: WorldName;
  introCompleted: boolean;
  experimentalMode: boolean;
  verticalPositions: {
    systems: number;
    markets: number;
  };
  isMobile: boolean;
  setActiveWorld: (world: WorldName) => void;
  setIntroCompleted: (completed: boolean) => void;
  setExperimentalMode: (mode: boolean) => void;
  saveVerticalPosition: (world: WorldName, position: number) => void;
  setIsMobile: (mobile: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeWorld: "core",
  introCompleted: false,
  experimentalMode: false,
  verticalPositions: {
    systems: 0,
    markets: 0,
  },
  isMobile: false,
  setActiveWorld: (world) => set({ activeWorld: world }),
  setIntroCompleted: (completed) => set({ introCompleted: completed }),
  setExperimentalMode: (mode) => set({ experimentalMode: mode }),
  saveVerticalPosition: (world, position) =>
    set((state) => ({
      verticalPositions: {
        ...state.verticalPositions,
        [world]: position,
      },
    })),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}));
