import { Topic, Dimension } from "@/types";
import { DIMENSIONS } from "./constants";

interface TopicPosition {
  topic: Topic;
  x: number;
  y: number;
}

interface DimensionPosition {
  dimension: Dimension;
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function checkCollision(
  point1: Point,
  point2: Point,
  minDistance: number,
): boolean {
  return getDistance(point1, point2) < minDistance;
}

function adjustPosition(
  currentPoint: Point,
  existingPoints: Point[],
  angle: number,
  minDistance: number,
  radius: number,
): Point {
  let adjustedPoint = { ...currentPoint };
  let distance = Math.sqrt(
    currentPoint.x * currentPoint.x + currentPoint.y * currentPoint.y,
  );

  while (
    existingPoints.some((p) => checkCollision(adjustedPoint, p, minDistance))
  ) {
    distance += 15; // Fixed increment

    if (distance > radius * 1.1) {
      distance = radius * 0.9; // Fixed fallback
    }

    adjustedPoint = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  }

  return adjustedPoint;
}

export function calculateDimensionPositions(
  dimensions: Dimension[],
  radius: number,
): DimensionPosition[] {
  // Sort by ID for consistency
  const sortedDimensions = [...dimensions].sort((a, b) => a.id - b.id);

  return sortedDimensions.map((dimension, index) => {
    // Calculate angle based on position in array
    const angleStep = (2 * Math.PI) / dimensions.length;
    const angle = angleStep * index;

    // Distance from center based on score
    const distance = radius * (1 - dimension.maturity_score);

    return {
      dimension,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });
}

export function calculateTopicPositions(
  topics: Topic[],
  radius: number,
): TopicPosition[] {
  // Since we no longer have categories, let's distribute topics evenly around the circle
  return topics.map((topic, index) => {
    const angleStep = (2 * Math.PI) / topics.length;
    const angle = angleStep * index;

    const score = calculateAverageScore(topic);
    const distance = radius * (1 - score); // Higher score = closer to center

    return {
      topic,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });
}

export function calculateAverageScore(topic: Topic): number {
  const scores = topic.dimensions.map((dim) => {
    // You could choose to weigh these differently
    const maturityWeight = 0.7;
    const confidenceWeight = 0.3;

    return (
      dim.maturity_score * maturityWeight +
      dim.confidence_score * confidenceWeight
    );
  });

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

export function getRingData(radius: number) {
  return [
    { x: 0, y: 0, z: radius * 0.33 }, // Inner ring
    { x: 0, y: 0, z: radius * 0.66 }, // Middle ring
    { x: 0, y: 0, z: radius }, // Outer ring
  ];
}
