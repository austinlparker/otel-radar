import { Topic } from "@/types";

let cachedTopics: Topic[] | null = null;

export async function getTopics(): Promise<Topic[]> {
  if (cachedTopics) {
    return cachedTopics;
  }

  try {
    const response = await fetch("/api/topics");
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }

    const topics = (await response.json()) as Topic[];
    cachedTopics = topics;
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  }
}

export function calculateTopicAverageScore(topic: Topic): number {
  const scores = topic.dimensions.map((d) => d.maturity_score);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
