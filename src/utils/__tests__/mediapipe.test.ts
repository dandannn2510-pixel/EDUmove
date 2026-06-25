import { getHandLandmarker, getFaceLandmarker } from '../mediapipe';

// Mock the MediaPipe vision tasks library
jest.mock('@mediapipe/tasks-vision', () => {
  return {
    FilesetResolver: {
      forVisionTasks: jest.fn().mockResolvedValue('MOCK_VISION_INSTANCE'),
    },
    HandLandmarker: {
      createFromOptions: jest.fn().mockImplementation((vision, options) => {
        return Promise.resolve({
          type: 'HandLandmarker',
          options
        });
      }),
    },
    FaceLandmarker: {
      createFromOptions: jest.fn().mockImplementation((vision, options) => {
        return Promise.resolve({
          type: 'FaceLandmarker',
          options
        });
      }),
    },
  };
});

describe('mediapipe utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create HandLandmarker with default numHands = 1', async () => {
    const landmarker = await getHandLandmarker();
    expect(landmarker).toBeDefined();
    expect((landmarker as any).type).toBe('HandLandmarker');
    expect((landmarker as any).options.numHands).toBe(1);
  });

  it('should upgrade to higher numHands if requested', async () => {
    const landmarker = await getHandLandmarker(4);
    expect((landmarker as any).options.numHands).toBe(4);
  });

  it('should return the cached instance if smaller numHands requested', async () => {
    const first = await getHandLandmarker(4);
    const second = await getHandLandmarker(2); // Should return the existing instance with 4 hands
    expect(first).toBe(second);
  });

  it('should force a new instance if forceNew is true', async () => {
    const first = await getHandLandmarker(4);
    const forced = await getHandLandmarker(2, true);
    expect(first).not.toBe(forced); // These will technically be different promises/objects
    expect((forced as any).options.numHands).toBe(4); // Because currentMaxHands is 4, it uses 4
  });

  it('should create FaceLandmarker with default numFaces = 2', async () => {
    const faceAI = await getFaceLandmarker();
    expect((faceAI as any).type).toBe('FaceLandmarker');
    expect((faceAI as any).options.numFaces).toBe(2);
  });
});
