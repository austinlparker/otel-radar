import { Dimension } from "@/types";

interface DimensionPosition {
  dimension: Dimension;
  x: number;
  y: number;
}

export function calculateDimensionPositions(
  dimensions: Dimension[],
  radius: number,
): DimensionPosition[] {
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

export function getRingData(radius: number) {
  return [
    { x: 0, y: 0, z: radius * 0.33 }, // Inner ring
    { x: 0, y: 0, z: radius * 0.66 }, // Middle ring
    { x: 0, y: 0, z: radius }, // Outer ring
  ];
}
