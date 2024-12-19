export interface Topic {
  id: number;
  concept: string;
  description: string;
  dimensions: Dimension[];
}

export interface Dimension {
  id: number;
  facet: string;
  description: string;
  maturity_score: number;
  maturity_score_details: MaturityScoreDetails;
  confidence_score: number;
  confidence_score_breakdown: ConfidenceScoreBreakdown;
  tags: string[];
}

export interface MaturityScoreDetails {
  developer_experience_score: number;
  documentation_score: number;
  completeness_score: number;
}

export interface ConfidenceScoreBreakdown {
  real_world_score: number;
  sentiment_score: number;
}

// Radar component types
export interface RadarProps {
  dimensions: Dimension[];
  selectedDimension: Dimension | null;
  onDimensionClick: (dimension: Dimension) => void;
}

export interface RadarData {
  key: string;
  value: number;
  dimension: Dimension;
}

export interface RadarTooltipProps {
  dimension: Dimension;
  position: {
    x: number;
    y: number;
  };
}

export interface RadarProps {
  dimensions: Dimension[];
  selectedDimension: Dimension | null;
  onDimensionClick: (dimension: Dimension) => void;
}

// Sidebar component types
export interface SidebarProps {
  topics: Topic[];
  onSelectionChange: (conceptId: string | null, searchQuery?: string) => void;
}

export interface DetailsPanelProps {
  topic: Topic | null;
  onClose: () => void;
  isMobile?: boolean;
}
