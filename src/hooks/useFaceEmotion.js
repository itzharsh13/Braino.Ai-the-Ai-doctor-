import { useState, useRef, useCallback, useEffect } from "react";
import * as faceapi from "@vladmandic/face-api";
import {
  getDominantExpression,
  expressionsToScores,
  smoothDominant,
  loadFaceModels,
} from "../utils/faceEmotion";

const DETECT_INTERVAL_MS = 400;
const SMOOTH_WINDOW = 5;

function waitForVideoReady(video) {
  return new Promise((resolve, reject) => {
    if (!video) {
      reject(new Error("No video element"));
      return;
    }
    if (video.readyState >= 2) {
      resolve();
      return;
    }
    const onReady = () => {
      video.removeEventListener("loadeddata", onReady);
      resolve();
    };
    video.addEventListener("loadeddata", onReady);
    setTimeout(() => reject(new Error("Video timeout")), 12000);
  });
}

export default function useFaceEmotion() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const historyRef = useRef([]);
  const activeRef = useRef(false);
  const modelsReadyRef = useRef(false);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [detected, setDetected] = useState(null);
  const [scores, setScores] = useState(null);
  const [faceFound, setFaceFound] = useState(false);

  const stopCamera = useCallback(() => {
    activeRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    const video = videoRef.current;
    if (video) video.srcObject = null;
    historyRef.current = [];
    setFaceFound(false);
  }, []);

  const runDetectTick = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !activeRef.current || !modelsReadyRef.current) return;

    try {
      const result = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.4 }))
        .withFaceExpressions();

      if (!result) {
        setFaceFound(false);
        return;
      }

      setFaceFound(true);
      const rawScores = expressionsToScores(result.expressions);
      setScores(rawScores);

      const instant = getDominantExpression(result.expressions, 0.15);
      if (instant) {
        historyRef.current.push(instant);
        if (historyRef.current.length > SMOOTH_WINDOW) {
          historyRef.current.shift();
        }
      }

      const smoothed = smoothDominant(historyRef.current, 0.18) || instant;
      if (smoothed) setDetected(smoothed);
    } catch {
      /* skip frame */
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setStatus("loading");

    try {
      if (!modelsReadyRef.current) {
        await loadFaceModels(faceapi);
        modelsReadyRef.current = true;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) throw new Error("Camera view not ready");

      video.srcObject = stream;
      await video.play();
      await waitForVideoReady(video);

      activeRef.current = true;
      setStatus("active");

      await runDetectTick();
      intervalRef.current = setInterval(runDetectTick, DETECT_INTERVAL_MS);
    } catch (err) {
      const msg =
        err?.name === "NotAllowedError"
          ? "Camera permission denied. Allow camera in browser settings."
          : err?.message?.includes("Video")
            ? "Camera preview failed to start. Try again."
            : err?.message || "Camera unavailable";
      setError(msg);
      setStatus("error");
      stopCamera();
      throw err;
    }
  }, [runDetectTick, stopCamera]);

  const stop = useCallback(() => {
    stopCamera();
    setDetected(null);
    setScores(null);
    setStatus(modelsReadyRef.current ? "ready" : "idle");
  }, [stopCamera]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return {
    videoRef,
    status,
    error,
    detected,
    scores,
    faceFound,
    startCamera,
    stop,
    isActive: status === "active",
    isLoading: status === "loading",
  };
}
