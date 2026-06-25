import { useGameStore } from '../gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useGameStore.getState().resetGame();
  });

  it('should initialize with default state', () => {
    const state = useGameStore.getState();
    expect(state.leftScore).toBe(0);
    expect(state.rightScore).toBe(0);
    expect(state.currentPhase).toBe('MAIN');
  });

  it('should add points to leftScore', () => {
    useGameStore.getState().addLeftScore(100);
    expect(useGameStore.getState().leftScore).toBe(100);
    
    useGameStore.getState().addLeftScore(50);
    expect(useGameStore.getState().leftScore).toBe(150);
  });

  it('should add points to rightScore', () => {
    useGameStore.getState().addRightScore(100);
    expect(useGameStore.getState().rightScore).toBe(100);
  });

  it('should set phase correctly', () => {
    useGameStore.getState().setPhase('PRE_TEST');
    expect(useGameStore.getState().currentPhase).toBe('PRE_TEST');

    useGameStore.getState().setPhase('SUMMARY');
    expect(useGameStore.getState().currentPhase).toBe('SUMMARY');
  });

  it('should reset game state to defaults', () => {
    useGameStore.getState().addLeftScore(200);
    useGameStore.getState().setPhase('POST_TEST');
    
    useGameStore.getState().resetGame();
    
    const state = useGameStore.getState();
    expect(state.leftScore).toBe(0);
    expect(state.rightScore).toBe(0);
    expect(state.currentPhase).toBe('MAIN');
  });
});
