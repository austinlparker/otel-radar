export const COLORS = {
  GREEN: "#2563eb", // blue-600
  YELLOW: "#eab308", // yellow-500
  RED: "#ef4444", // red-500
  DEVELOPER: "#3b82f6", // blue-500
  OPERATIONS: "#ef4444", // red-500
} as const;

export const DIMENSIONS = {
  MARGIN: 80,
  DOT_RADIUS: 100,
  DOT_RADIUS_HOVER: 105,
  MIN_SPACING: 110,
} as const;

export const RING_CONFIG = [
  { radius: 0.33, color: COLORS.GREEN, opacity: 0.4 },
  { radius: 0.66, color: COLORS.YELLOW, opacity: 0.35 },
  { radius: 1.0, color: COLORS.RED, opacity: 0.3 },
] as const;

export const ANIMATIONS = {
  DURATION: 750,
  TOOLTIP_FADE: 200,
  ZOOM: {
    MIN_SCALE: 1,
    MAX_SCALE: 4,
    TRANSITION_DURATION: 1000,
  },
} as const;
