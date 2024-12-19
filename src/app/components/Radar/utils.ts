import { THRESHOLDS } from "@/constants";

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
 * Formats score for display
 */
export function formatScore(score: number): string {
  return `${Math.round(score * 100)}%`;
}
