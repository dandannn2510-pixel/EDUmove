/**
 * Shared MediaPipe utility — singleton loaders for HandLandmarker and FaceLandmarker.
 * All camera components should use these instead of calling FilesetResolver directly.
 */
import { FilesetResolver, HandLandmarker, FaceLandmarker } from '@mediapipe/tasks-vision';

// ─── Constants ───────────────────────────────────────────────────────────────

const WASM_CDN_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm';

const HAND_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

const FACE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

// ─── Singleton Promises ───────────────────────────────────────────────────────
// These are module-level so they persist across component mounts/unmounts.

let visionPromise: Promise<Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>> | null = null;
let handLandmarkerPromise: Promise<HandLandmarker> | null = null;
let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;

function getVision() {
  if (!visionPromise) {
    visionPromise = FilesetResolver.forVisionTasks(WASM_CDN_URL);
  }
  return visionPromise;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a shared HandLandmarker instance (VIDEO mode).
 * Safe to call from multiple components — loads only once.
 *
 * @param numHands - How many hands to detect (default: 1)
 * @param forceNew - Set true to bypass the singleton (e.g., need different numHands)
 */
export function getHandLandmarker(
  numHands: number = 1,
  forceNew: boolean = false
): Promise<HandLandmarker> {
  if (!handLandmarkerPromise || forceNew) {
    handLandmarkerPromise = getVision().then((vision) =>
      HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: HAND_MODEL_URL,
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
      })
    );
  }
  return handLandmarkerPromise;
}

/**
 * Returns a shared FaceLandmarker instance (VIDEO mode).
 * Safe to call from multiple components — loads only once.
 *
 * @param numFaces - How many faces to detect (default: 2)
 */
export function getFaceLandmarker(numFaces: number = 2): Promise<FaceLandmarker> {
  if (!faceLandmarkerPromise) {
    faceLandmarkerPromise = getVision().then((vision) =>
      FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: FACE_MODEL_URL,
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces,
      })
    );
  }
  return faceLandmarkerPromise;
}
