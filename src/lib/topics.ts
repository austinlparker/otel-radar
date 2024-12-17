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
