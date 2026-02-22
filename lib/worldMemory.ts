import { WorldName } from "./store";

const worldMemory: Record<string, number> = {
  systems: 0,
  markets: 0,
};

export function saveScrollPosition(world: WorldName, position: number) {
  worldMemory[world] = position;
}

export function getScrollPosition(world: WorldName): number {
  return worldMemory[world] || 0;
}

export function resetAllPositions() {
  worldMemory.systems = 0;
  worldMemory.markets = 0;
}
