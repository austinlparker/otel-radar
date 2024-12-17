"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import DetailsPanel from "./components/DetailsPanel";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { getTopics } from "../lib/topics";

import { Topic, Dimension } from "@/types";

interface FilteredData {
  concept: string | null;
  dimensions: Dimension[];
  searchQuery: string;
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
      // Initialize with all dimensions
      setFilteredData({
        concept: null,
        dimensions: loadedTopics.flatMap((t) => t.dimensions),
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
      // Show all dimensions if nothing is selected/searched
      setFilteredData({
        concept: null,
        dimensions: topics.flatMap((t) => t.dimensions),
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

        <div className="flex-1 relative">
          <Radar
            dimensions={filteredData.dimensions}
            selectedDimension={
              selectedTopic ? selectedTopic.dimensions[0] : null
            }
            onDimensionClick={(dimension) => {
              const topic = topics.find((t) =>
                t.dimensions.some((d) => d.id === dimension.id),
              );
              setSelectedTopic(topic || null);
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
