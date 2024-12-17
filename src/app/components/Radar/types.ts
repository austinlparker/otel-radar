import { Dimension } from "@/types";

export interface RechartsScatterProps {
  cx?: number;
  cy?: number;
  payload?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface RadarProps {
  dimensions: Dimension[];
  selectedDimension: Dimension | null;
  onDimensionClick: (dimension: Dimension) => void;
}

export interface DataPoint {
  x: number;
  y: number;
  z: number;
  dimension: Dimension;
  score: number;
}

export interface RingDataPoint {
  x: number;
  y: number;
  z: number;
}
