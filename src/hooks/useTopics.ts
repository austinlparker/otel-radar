import { useState, useEffect } from "react";
import { Topic } from "@/types";
import { getTopics } from "@/lib/topics";

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load topics"),
        );
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  return { topics, loading, error };
}
