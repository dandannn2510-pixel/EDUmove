import '@testing-library/jest-dom';

// Mocks for WebGL / Canvas (JSDOM does not support WebGL/Canvas APIs used by MediaPipe)
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(0) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => []),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  };
}) as any;

// Mock URL.createObjectURL since it doesn't exist in JSDOM
window.URL.createObjectURL = jest.fn();

// Global mock for next/font
jest.mock('next/font/local', () => () => ({
  style: { fontFamily: 'mocked' },
  variable: '--mocked-font',
}));
jest.mock('next/font/google', () => ({
  Prompt: () => ({
    style: { fontFamily: 'mocked-prompt' },
    variable: '--mocked-prompt',
  }),
}));
