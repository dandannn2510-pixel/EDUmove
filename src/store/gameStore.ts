import { create } from 'zustand';

interface GameState {
  leftScore: number;
  rightScore: number;
  currentPhase: 'MAIN' | 'PRE_TEST' | 'VIDEO' | 'POST_TEST' | 'SUMMARY';
  addLeftScore: (points: number) => void;
  addRightScore: (points: number) => void;
  setPhase: (phase: 'MAIN' | 'PRE_TEST' | 'VIDEO' | 'POST_TEST' | 'SUMMARY') => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  leftScore: 0,
  rightScore: 0,
  currentPhase: 'MAIN',
  addLeftScore: (points) => set((state) => ({ leftScore: state.leftScore + points })),
  addRightScore: (points) => set((state) => ({ rightScore: state.rightScore + points })),
  setPhase: (phase) => set({ currentPhase: phase }),
  resetGame: () => set({ leftScore: 0, rightScore: 0, currentPhase: 'MAIN' }),
}));