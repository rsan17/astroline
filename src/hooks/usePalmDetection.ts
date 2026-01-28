'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  HandLandmarker,
  FilesetResolver,
  type HandLandmarkerResult,
} from '@mediapipe/tasks-vision';

// Hand landmark indices for palm detection
// Based on MediaPipe hand landmarks model
const PALM_LANDMARKS = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_FINGER_MCP: 5,
  INDEX_FINGER_PIP: 6,
  INDEX_FINGER_DIP: 7,
  INDEX_FINGER_TIP: 8,
  MIDDLE_FINGER_MCP: 9,
  MIDDLE_FINGER_PIP: 10,
  MIDDLE_FINGER_DIP: 11,
  MIDDLE_FINGER_TIP: 12,
  RING_FINGER_MCP: 13,
  RING_FINGER_PIP: 14,
  RING_FINGER_DIP: 15,
  RING_FINGER_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20,
};

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface PalmDetectionResult {
  detected: boolean;
  landmarks: HandLandmark[] | null;
  handedness: 'Left' | 'Right' | null;
  confidence: number;
  isPalmOpen: boolean;
  isPalmFacingCamera: boolean;
  palmBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}

interface UsePalmDetectionOptions {
  onDetection?: (result: PalmDetectionResult) => void;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

export function usePalmDetection(options: UsePalmDetectionOptions = {}) {
  const {
    onDetection,
    minDetectionConfidence = 0.5,
    minTrackingConfidence = 0.5,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<PalmDetectionResult | null>(null);
  
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize MediaPipe HandLandmarker
  useEffect(() => {
    let isMounted = true;

    const initializeHandLandmarker = async () => {
      // Prevent double initialization
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      try {
        setIsLoading(true);
        setError(null);

        // Load the MediaPipe vision tasks
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        // Create the hand landmarker
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: minDetectionConfidence,
          minHandPresenceConfidence: minDetectionConfidence,
          minTrackingConfidence: minTrackingConfidence,
        });

        if (isMounted) {
          handLandmarkerRef.current = handLandmarker;
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize hand detection:', err);
        if (isMounted) {
          setError('Не вдалося завантажити модель розпізнавання руки');
          setIsLoading(false);
        }
      }
    };

    initializeHandLandmarker();

    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Close the hand landmarker when unmounting
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
        handLandmarkerRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [minDetectionConfidence, minTrackingConfidence]);

  // Process detection results
  const processResults = useCallback(
    (results: HandLandmarkerResult): PalmDetectionResult => {
      if (!results.landmarks || results.landmarks.length === 0) {
        return {
          detected: false,
          landmarks: null,
          handedness: null,
          confidence: 0,
          isPalmOpen: false,
          isPalmFacingCamera: false,
          palmBoundingBox: null,
        };
      }

      const landmarks = results.landmarks[0];
      const handedness = results.handednesses?.[0]?.[0]?.categoryName as
        | 'Left'
        | 'Right'
        | null;
      const confidence = results.handednesses?.[0]?.[0]?.score ?? 0;

      // Calculate if palm is open by checking finger extension
      const isPalmOpen = checkPalmOpen(landmarks);

      // Check if palm is facing camera (palm side visible, not back of hand)
      const isPalmFacingCamera = checkPalmFacingCamera(landmarks);

      // Calculate bounding box
      const palmBoundingBox = calculateBoundingBox(landmarks);

      return {
        detected: true,
        landmarks: landmarks as HandLandmark[],
        handedness,
        confidence,
        isPalmOpen,
        isPalmFacingCamera,
        palmBoundingBox,
      };
    },
    []
  );

  // Detect hand in video element (for real-time camera detection)
  const detectFromVideo = useCallback(
    (video: HTMLVideoElement): PalmDetectionResult | null => {
      if (!handLandmarkerRef.current || video.readyState < 2) {
        return null;
      }

      try {
        const startTimeMs = performance.now();
        const results = handLandmarkerRef.current.detectForVideo(
          video,
          startTimeMs
        );
        const processed = processResults(results);
        setLastResult(processed);
        onDetection?.(processed);
        return processed;
      } catch (err) {
        console.error('Video detection error:', err);
        return null;
      }
    },
    [processResults, onDetection]
  );

  // Detect hand in static image
  const detectFromImage = useCallback(
    async (
      imageSource: HTMLImageElement | HTMLCanvasElement | ImageBitmap
    ): Promise<PalmDetectionResult | null> => {
      if (!handLandmarkerRef.current) {
        return null;
      }

      try {
        // Switch to IMAGE mode for static detection
        await handLandmarkerRef.current.setOptions({ runningMode: 'IMAGE' });
        
        const results = handLandmarkerRef.current.detect(imageSource);
        const processed = processResults(results);
        setLastResult(processed);
        onDetection?.(processed);

        // Switch back to VIDEO mode
        await handLandmarkerRef.current.setOptions({ runningMode: 'VIDEO' });

        return processed;
      } catch (err) {
        console.error('Image detection error:', err);
        return null;
      }
    },
    [processResults, onDetection]
  );

  // Detect from data URL (base64 image)
  const detectFromDataUrl = useCallback(
    async (dataUrl: string): Promise<PalmDetectionResult | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = async () => {
          const result = await detectFromImage(img);
          resolve(result);
        };
        img.onerror = () => {
          console.error('Failed to load image from data URL');
          resolve(null);
        };
        img.src = dataUrl;
      });
    },
    [detectFromImage]
  );

  // Start continuous detection from video
  const startContinuousDetection = useCallback(
    (video: HTMLVideoElement) => {
      const detect = () => {
        if (video.readyState >= 2) {
          detectFromVideo(video);
        }
        animationFrameRef.current = requestAnimationFrame(detect);
      };
      detect();
    },
    [detectFromVideo]
  );

  // Stop continuous detection
  const stopContinuousDetection = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    isLoading,
    error,
    lastResult,
    detectFromVideo,
    detectFromImage,
    detectFromDataUrl,
    startContinuousDetection,
    stopContinuousDetection,
    isReady: !isLoading && !error && handLandmarkerRef.current !== null,
  };
}

// Helper function to check if palm is open (fingers extended)
function checkPalmOpen(landmarks: { x: number; y: number; z: number }[]): boolean {
  // Check if fingers are extended by comparing tip positions to MCP joints
  const fingers = [
    {
      tip: PALM_LANDMARKS.INDEX_FINGER_TIP,
      pip: PALM_LANDMARKS.INDEX_FINGER_PIP,
      mcp: PALM_LANDMARKS.INDEX_FINGER_MCP,
    },
    {
      tip: PALM_LANDMARKS.MIDDLE_FINGER_TIP,
      pip: PALM_LANDMARKS.MIDDLE_FINGER_PIP,
      mcp: PALM_LANDMARKS.MIDDLE_FINGER_MCP,
    },
    {
      tip: PALM_LANDMARKS.RING_FINGER_TIP,
      pip: PALM_LANDMARKS.RING_FINGER_PIP,
      mcp: PALM_LANDMARKS.RING_FINGER_MCP,
    },
    {
      tip: PALM_LANDMARKS.PINKY_TIP,
      pip: PALM_LANDMARKS.PINKY_PIP,
      mcp: PALM_LANDMARKS.PINKY_MCP,
    },
  ];

  let extendedFingers = 0;

  for (const finger of fingers) {
    const tipY = landmarks[finger.tip].y;
    const pipY = landmarks[finger.pip].y;
    const mcpY = landmarks[finger.mcp].y;

    // Finger is extended if tip is above (lower y value) than PIP and MCP
    // Allow some tolerance for natural hand position
    if (tipY < pipY && pipY < mcpY + 0.05) {
      extendedFingers++;
    }
  }

  // Consider palm open if at least 3 fingers are extended
  return extendedFingers >= 3;
}

// Helper function to check if palm is facing camera
function checkPalmFacingCamera(
  landmarks: { x: number; y: number; z: number }[]
): boolean {
  // Compare z-values of palm and finger tips
  // If palm base (wrist area) has higher z than fingertips, palm is facing camera
  const wrist = landmarks[PALM_LANDMARKS.WRIST];
  const middleFingerBase = landmarks[PALM_LANDMARKS.MIDDLE_FINGER_MCP];
  const middleFingerTip = landmarks[PALM_LANDMARKS.MIDDLE_FINGER_TIP];

  // Palm is facing camera if the palm is relatively flat in z-direction
  // and wrist/base z is greater than or equal to fingertip z
  const palmDepth = Math.abs(wrist.z - middleFingerBase.z);
  const fingerDepth = Math.abs(middleFingerBase.z - middleFingerTip.z);

  // Palm facing camera: relatively flat palm with fingertips not pointing at camera
  return palmDepth < 0.15 && fingerDepth < 0.2;
}

// Helper function to calculate bounding box
function calculateBoundingBox(
  landmarks: { x: number; y: number; z: number }[]
): { x: number; y: number; width: number; height: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const landmark of landmarks) {
    minX = Math.min(minX, landmark.x);
    minY = Math.min(minY, landmark.y);
    maxX = Math.max(maxX, landmark.x);
    maxY = Math.max(maxY, landmark.y);
  }

  // Add some padding
  const padding = 0.05;
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(1, maxX + padding);
  maxY = Math.min(1, maxY + padding);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

// Export types for use in components
export type { UsePalmDetectionOptions };
