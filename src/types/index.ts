export interface RadarData {
  topics: Topic[];
}

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
  maturity_score_details: {
    developer_experience_score: number;
    documentation_score: number;
    completeness_score: number;
  };
  confidence_score: number;
  confidence_score_breakdown: {
    real_world_score: number;
    sentiment_score: number;
  };
  tags: string[];
}
