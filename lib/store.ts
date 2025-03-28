import { create } from 'zustand'

interface PatternState {
  density: number
  setDensity: (density: number) => void
}

export const usePatternStore = create<PatternState>((set) => ({
  density: 1.3,
  setDensity: (density) => set({ density }),
})) 