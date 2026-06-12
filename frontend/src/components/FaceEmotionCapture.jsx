import { useEffect } from "react";
import { Camera, CameraOff, Loader2, ExternalLink } from "lucide-react";
import useFaceEmotion from "../hooks/useFaceEmotion";
import { saveEmotionSession } from "../utils/faceEmotion";

/** Compact in-chat camera toggle (optional). Full experience: Face Emotion Scanner page. */
export default function FaceEmotionCapture({
  onEmotionChange,
  enabled,
  onToggle,
  onOpenScanner,
}) {
  const { videoRef, detected, error, startCamera, stop, isLoading, faceFound } = useFaceEmotion();

  useEffect(() => {
    if (!enabled) {
      stop();
      onEmotionChange?.(null);
      return;
    }

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        if (cancelled) return;
        try {
          await startCamera();
        } catch {
          if (!cancelled) onToggle?.(false);
        }
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      stop();
    };
  }, [enabled, startCamera, stop, onEmotionChange, onToggle]);

  useEffect(() => {
    onEmotionChange?.(detected);
    if (detected) saveEmotionSession(detected);
  }, [detected, onEmotionChange]);

  return (
    <div className="face-emotion-panel">
      <button
        type="button"
        onClick={() => onToggle?.(!enabled)}
        className={`face-emotion-toggle ${enabled ? "face-emotion-toggle--on" : ""}`}
        title={enabled ? "Turn off camera" : "Quick face scan in chat"}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : enabled ? (
          <Camera size={16} />
        ) : (
          <CameraOff size={16} />
        )}
        <span className="hidden sm:inline">{enabled ? "Cam on" : "Quick scan"}</span>
      </button>

      {onOpenScanner && (
        <button
          type="button"
          className="face-emotion-toggle"
          onClick={onOpenScanner}
          title="Open full Face Emotion Scanner"
        >
          <ExternalLink size={14} />
          <span className="hidden sm:inline">Full scanner</span>
        </button>
      )}

      {enabled && (
        <div className="face-emotion-preview-wrap">
          <video ref={videoRef} className="face-emotion-video" playsInline muted />
          {detected ? (
            <span className="face-emotion-badge">
              {detected.emoji} {detected.label}
            </span>
          ) : (
            <span className="face-emotion-badge face-emotion-badge--scan">
              {faceFound ? "Reading…" : "Find face…"}
            </span>
          )}
        </div>
      )}

      {error && <span className="face-emotion-error">{error}</span>}
    </div>
  );
}
