export const EMOTION_META = {
  neutral: { emoji: "😐", label: "Neutral", mood: "neutral", color: "#94a3b8" },
  happy: { emoji: "🙂", label: "Happy", mood: "happy", color: "#22d3ee" },
  sad: { emoji: "☹️", label: "Sad", mood: "sad", color: "#6366f1" },
  angry: { emoji: "😠", label: "Frustrated", mood: "sad", color: "#f97316" },
  fearful: { emoji: "😨", label: "Anxious", mood: "sad", color: "#a78bfa" },
  disgusted: { emoji: "😣", label: "Uncomfortable", mood: "sad", color: "#84cc16" },
  surprised: { emoji: "😲", label: "Surprised", mood: "happy", color: "#facc15" },
};

export const EXPRESSION_ORDER = Object.keys(EMOTION_META);

export const FACE_EMOTION_SESSION_KEY = "braino_face_emotion";

const MODEL_URLS = [
  "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model",
  "/models/face-api",
];

export function expressionsToScores(expressions) {
  if (!expressions) return null;
  const scores = {};
  for (const key of EXPRESSION_ORDER) {
    scores[key] = expressions[key] ?? 0;
  }
  return scores;
}

export function getDominantExpression(expressions, minScore = 0.2) {
  const scores = expressionsToScores(expressions);
  if (!scores) return null;

  let top = "neutral";
  let topScore = 0;
  for (const [name, score] of Object.entries(scores)) {
    if (score > topScore) {
      topScore = score;
      top = name;
    }
  }

  if (topScore < minScore) return null;

  return {
    expression: top,
    confidence: topScore,
    scores,
    ...EMOTION_META[top],
  };
}

export function smoothDominant(history, minScore = 0.2) {
  if (!history.length) return null;
  const totals = {};
  for (const item of history) {
    if (!item?.scores) continue;
    for (const [k, v] of Object.entries(item.scores)) {
      totals[k] = (totals[k] || 0) + v;
    }
  }
  const avg = {};
  const n = history.length;
  for (const key of EXPRESSION_ORDER) {
    avg[key] = (totals[key] || 0) / n;
  }
  return getDominantExpression(avg, minScore);
}

export function saveEmotionSession(emotion) {
  if (!emotion) {
    sessionStorage.removeItem(FACE_EMOTION_SESSION_KEY);
    return;
  }
  sessionStorage.setItem(
    FACE_EMOTION_SESSION_KEY,
    JSON.stringify({
      expression: emotion.expression,
      label: emotion.label,
      emoji: emotion.emoji,
      mood: emotion.mood,
      confidence: emotion.confidence,
      at: Date.now(),
    })
  );
}

export function loadEmotionSession(maxAgeMs = 30 * 60 * 1000) {
  try {
    const raw = sessionStorage.getItem(FACE_EMOTION_SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.at > maxAgeMs) {
      sessionStorage.removeItem(FACE_EMOTION_SESSION_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function loadFaceModels(faceapi) {
  let lastError;
  for (const base of MODEL_URLS) {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(base);
      await faceapi.nets.faceExpressionNet.loadFromUri(base);
      return base;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("Could not load face models");
}
