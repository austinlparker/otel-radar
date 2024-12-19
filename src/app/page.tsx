"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import DetailsPanel from "./components/DetailsPanel";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { getTopics } from "../lib/topics";
import { calculateTopicAverageScore } from "../lib/topics";

import { Topic, Dimension } from "@/types";

interface FilteredData {
  concept: string | null;
  dimensions: Dimension[];
  searchQuery: string;
}

interface AggregatedDimension extends Dimension {
  isAggregate?: boolean;
  parentTopic?: Topic;
}

const Radar = dynamic(() => import("./components/Radar/index"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-gray-500">Loading radar...</div>
    </div>
  ),
});

export default function Home() {
  const { isMobile } = useResponsive();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [filteredData, setFilteredData] = useState<FilteredData>({
    concept: null,
    dimensions: [],
    searchQuery: "",
  });

  useEffect(() => {
    const loadTopics = async () => {
      const loadedTopics = await getTopics();
      setTopics(loadedTopics);
      const aggregateDimensions: AggregatedDimension[] = loadedTopics.map(
        (topic) => ({
          id: topic.id,
          facet: topic.concept,
          description: topic.description,
          maturity_score: calculateTopicAverageScore(topic),
          maturity_score_details: {
            developer_experience_score: 0,
            documentation_score: 0,
            completeness_score: 0,
          },
          confidence_score: 1,
          confidence_score_breakdown: {
            real_world_score: 1,
            sentiment_score: 1,
          },
          tags: [],
          isAggregate: true,
          parentTopic: topic,
        }),
      );

      setFilteredData({
        concept: null,
        dimensions: aggregateDimensions,
        searchQuery: "",
      });
    };

    loadTopics();
  }, []);

  const handleSelectionChange = (
    conceptId: string | null,
    searchQuery: string = "",
  ) => {
    if (!conceptId && !searchQuery) {
      const aggregateDimensions: AggregatedDimension[] = topics.map(
        (topic) => ({
          id: topic.id,
          facet: topic.concept,
          description: topic.description,
          maturity_score: calculateTopicAverageScore(topic),
          maturity_score_details: {
            developer_experience_score: 0,
            documentation_score: 0,
            completeness_score: 0,
          },
          confidence_score: 1,
          confidence_score_breakdown: {
            real_world_score: 1,
            sentiment_score: 1,
          },
          tags: [],
          isAggregate: true,
          parentTopic: topic,
        }),
      );

      setFilteredData({
        concept: null,
        dimensions: aggregateDimensions,
        searchQuery: "",
      });
      return;
    }

    if (conceptId) {
      // Filter to show only dimensions from selected concept
      const selectedTopic = topics.find((t) => t.concept === conceptId);
      setFilteredData({
        concept: conceptId,
        dimensions: selectedTopic?.dimensions || [],
        searchQuery: "",
      });
    } else if (searchQuery) {
      // Filter dimensions based on search
      const matchingDimensions = topics.flatMap((topic) =>
        topic.dimensions.filter(
          (dim) =>
            dim.facet.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dim.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
      setFilteredData({
        concept: null,
        dimensions: matchingDimensions,
        searchQuery,
      });
    }
  };

  return (
    <ErrorBoundary>
      <main className="flex max-h-screen overflow-hidden">
        <Sidebar topics={topics} onSelectionChange={handleSelectionChange} />

        <div className="flex-1 relative h-screen pt-[88px] pb-[72px] lg:pt-0 lg:pb-0">
          <Radar
            dimensions={filteredData.dimensions}
            selectedDimension={
              selectedTopic ? selectedTopic.dimensions[0] : null
            }
            onDimensionClick={(dimension) => {
              if ((dimension as AggregatedDimension).isAggregate) {
                // Handle aggregate dimension click
                const aggregateDim = dimension as AggregatedDimension;
                setSelectedTopic(aggregateDim.parentTopic || null);
              } else {
                // Handle regular dimension click
                const topic = topics.find((t) =>
                  t.dimensions.some((d) => d.id === dimension.id),
                );
                setSelectedTopic(topic || null);
              }
            }}
          />

          <AnimatePresence>
            {selectedTopic && (
              <DetailsPanel
                topic={selectedTopic}
                onClose={() => setSelectedTopic(null)}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </ErrorBoundary>
  );
}
