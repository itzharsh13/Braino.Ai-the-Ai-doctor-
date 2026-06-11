import { motion } from 'framer-motion';

const moodMotion = {
  very_sad: {
    idle: {
      y: [0, 6, 2, 8, 0],
      rotate: [-8, -4, -10, -6, -8],
      scale: [1, 0.92, 0.95, 0.9, 1],
      transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
    },
    selected: {
      y: [0, 10, 4],
      rotate: [-12, -8, -12],
      scale: [1.15, 1.05, 1.15],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
    },
    tap: { scale: 0.85, y: 8 },
  },
  sad: {
    idle: {
      y: [0, 4, 0],
      rotate: [-4, 4, -4],
      transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
    },
    selected: {
      y: [0, 6, 2],
      rotate: [-6, 6, -6],
      scale: [1.12, 1.08, 1.12],
      transition: { duration: 2, repeat: Infinity },
    },
    tap: { scale: 0.88, y: 4 },
  },
  neutral: {
    idle: {
      y: [0, -2, 0, 2, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
    selected: {
      scale: [1.1, 1.14, 1.1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 2.2, repeat: Infinity },
    },
    tap: { scale: 0.92 },
  },
  happy: {
    idle: {
      y: [0, -6, -2, -8, 0],
      rotate: [0, 6, -6, 4, 0],
      scale: [1, 1.04, 1, 1.06, 1],
      transition: { duration: 2.4, repeat: Infinity, ease: 'easeOut' },
    },
    selected: {
      y: [0, -12, -6, -14, 0],
      rotate: [0, 10, -10, 0],
      scale: [1.15, 1.22, 1.15],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut' },
    },
    tap: { scale: 1.2, y: -8 },
  },
  very_happy: {
    idle: {
      y: [0, -10, -4, -12, 0],
      rotate: [-6, 6, -8, 8, -6],
      scale: [1, 1.08, 1.02, 1.1, 1],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
    },
    selected: {
      y: [0, -18, -8, -20, 0],
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1.2, 1.35, 1.25, 1.38, 1.2],
      transition: { duration: 0.9, repeat: Infinity, ease: 'easeOut' },
    },
    tap: { scale: 1.3, y: -14, rotate: 12 },
  },
};

const moodGlow = {
  very_sad: 'rgba(59, 130, 246, 0.5)',
  sad: 'rgba(99, 102, 241, 0.45)',
  neutral: 'rgba(148, 163, 184, 0.4)',
  happy: 'rgba(34, 211, 238, 0.5)',
  very_happy: 'rgba(250, 204, 21, 0.55)',
};

export default function MoodEmoji({ moodValue, emoji, size = 'md', selected = false, onClick }) {
  const motionState = selected ? 'selected' : 'idle';
  const variants = moodMotion[moodValue] || moodMotion.neutral;

  const sizeClass =
    size === 'lg' ? 'mood-emoji--lg' : size === 'sm' ? 'mood-emoji--sm' : 'mood-emoji--md';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`mood-emoji-btn ${sizeClass} ${selected ? 'mood-emoji-btn--selected' : ''}`}
      style={{ '--mood-glow': moodGlow[moodValue] }}
      whileTap={variants.tap}
      layout
    >
      {selected && (
        <motion.span
          className="mood-emoji-ring"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <motion.span
        className="mood-emoji-face"
        animate={motionState}
        variants={variants}
        initial={false}
      >
        {emoji}
      </motion.span>
      {selected && moodValue === 'very_happy' && (
        <>
          <motion.span
            className="mood-sparkle mood-sparkle--1"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          >
            ✦
          </motion.span>
          <motion.span
            className="mood-sparkle mood-sparkle--2"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          >
            ✦
          </motion.span>
        </>
      )}
      {selected && moodValue === 'very_sad' && (
        <motion.span
          className="mood-tear"
          animate={{ y: [0, 14], opacity: [0.8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeIn' }}
        >
          💧
        </motion.span>
      )}
    </motion.button>
  );
}
