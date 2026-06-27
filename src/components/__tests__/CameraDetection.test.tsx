import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CameraDetection from '../CameraDetection';
import { useGameStore } from '@/store/gameStore';

// Mock the MediaPipe utility
jest.mock('@/utils/mediapipe', () => ({
  getHandLandmarker: jest.fn().mockResolvedValue({
    detectForVideo: jest.fn(() => ({ landmarks: [] }))
  })
}));

// Mock react-webcam
jest.mock('react-webcam', () => {
  const MockWebcam = React.forwardRef<HTMLVideoElement, React.VideoHTMLAttributes<HTMLVideoElement>>(
    function MockWebcam(props, ref) {
      return <video data-testid="webcam" ref={ref} {...props} />;
    }
  );
  MockWebcam.displayName = 'MockWebcam';
  return MockWebcam;
});

const mockQuestions = [
  { q: 'Test Q1', choiceA: 'A1', choiceB: 'B1', choiceC: 'C1', choiceD: 'D1', ans: 'A' as const },
  { q: 'Test Q2', choiceA: 'A2', choiceB: 'B2', choiceC: 'C2', choiceD: 'D2', ans: 'B' as const }
];

describe('CameraDetection Component', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders INTRO status initially', () => {
    render(<CameraDetection questions={mockQuestions} onFinish={jest.fn()} />);
    expect(screen.getByText('เตรียมพร้อมเข้าสู่ Pre-test')).toBeInTheDocument();
  });

  it('transitions from INTRO to SHOW_TITLE when start button clicked', () => {
    render(<CameraDetection questions={mockQuestions} onFinish={jest.fn()} experimentName="TEST_EXP" />);
    const startBtn = screen.getByText(/เปิดกล้องเริ่มเกม/);
    
    act(() => {
      fireEvent.click(startBtn);
    });

    expect(screen.getByText('TEST_EXP')).toBeInTheDocument();
  });

  it('transitions automatically through READY to PLAYING', () => {
    render(<CameraDetection questions={mockQuestions} onFinish={jest.fn()} />);
    
    // Click start to go to SHOW_TITLE
    act(() => { fireEvent.click(screen.getByText(/เปิดกล้อง/)); });
    
    // Fast forward 3s -> READY
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText(/โจทย์ข้อที่ 1/)).toBeInTheDocument();

    // Fast forward 4s (READY timer: 3, 2, 1, 0 -> PLAYING)
    for(let i=0; i<4; i++) {
      act(() => { jest.advanceTimersByTime(1000); });
    }
    expect(screen.getByText('ข้อ 1: Test Q1')).toBeInTheDocument();
    
    // Ensure countdown timer is visible and decrementing
    expect(screen.getByText(/⏱️ 9 วิ/)).toBeInTheDocument();
  });
});
