import { THRESHOLDS, DIMENSIONS } from "@/constants";
import { Dimension } from "@/types";

/**
 * Determines the color of a point based on its score
 */
export function getPointColor(score: number): string {
  if (score >= THRESHOLDS.SCORE.HIGH) {
    return "rgb(37, 99, 235)"; // primary-500
  }
  if (score >= THRESHOLDS.SCORE.MEDIUM) {
    return "rgb(234, 179, 8)"; // accent-400
  }
  return "rgb(239, 68, 68)"; // danger-500
}

/**
 * Calculates the points' positions on the radar
 */
export function calculatePoints(
  dimensions: Dimension[],
  config: RadarConfig,
): RadarPoint[] {
  const angleStep = (2 * Math.PI) / dimensions.length;

  return dimensions.map((dimension, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const distance = config.radius * (1 - dimension.maturity_score);

    return {
      x: config.centerX + distance * Math.cos(angle),
      y: config.centerY + distance * Math.sin(angle),
      dimension,
    };
  });
}

/**
 * Calculates zoom parameters for a specific point
 */
export function calculateZoomToPoint(
  point: RadarPoint,
  config: RadarConfig,
): { x: number; y: number; scale: number } {
  const scale = 2; // Default zoom level
  return {
    x: config.width / 2 - point.x * scale,
    y: config.height / 2 - point.y * scale,
    scale,
  };
}

/**
 * Formats score for display
 */
export function formatScore(score: number): string {
  return `${Math.round(score * 100)}%`;
}

/**
 * Checks if a point is near another point (for collision detection)
 */
export function isPointNear(
  point1: RadarPoint,
  point2: RadarPoint,
  threshold = DIMENSIONS.RADAR.POINTS.RADIUS * 2,
): boolean {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy) < threshold;
}
