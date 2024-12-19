export const COLORS = {
  PRIMARY: {
    DEFAULT: "var(--color-primary-500)",
    HOVER: "var(--color-primary-600)",
    MUTED: "var(--color-primary-300)",
  },
  ACCENT: {
    DEFAULT: "var(--color-accent-400)",
    HOVER: "var(--color-accent-500)",
    MUTED: "var(--color-accent-300)",
  },
  DANGER: {
    DEFAULT: "var(--color-danger-500)",
    HOVER: "var(--color-danger-600)",
  },
} as const;

export const DIMENSIONS = {
  SIDEBAR: {
    WIDTH: 320,
    MOBILE_HEIGHT: "80vh",
  },
  RADAR: {
    WIDTH: 800,
    HEIGHT: 800,
    MARGIN: 100,
    POINTS: {
      RADIUS: 10,
      RADIUS_HOVER: 15,
      STROKE_WIDTH: 2,
    },
    CIRCLES: {
      INTERVALS: [0.2, 0.4, 0.6, 0.8, 1],
      STROKE_OPACITY: 0.4,
    },
  },
} as const;

export const ANIMATIONS = {
  DURATION: {
    FAST: 200,
    MEDIUM: 500,
    SLOW: 750,
  },
  SPRING: {
    GENTLE: { type: "spring", damping: 25 },
    BOUNCY: { type: "spring", damping: 15 },
  },
} as const;

export const THRESHOLDS = {
  SCORE: {
    HIGH: 0.7,
    MEDIUM: 0.4,
    LOW: 0,
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 1024,
    DESKTOP: 1280,
  },
} as const;
