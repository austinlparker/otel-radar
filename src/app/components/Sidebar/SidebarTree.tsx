"use client";

import { Topic } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faFolder,
  faFolderOpen,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarTreeProps {
  topics: Topic[];
  searchQuery: string;
  selectedConcept: string | null;
  onConceptSelect: (conceptId: string) => void;
}

export default function SidebarTree({
  topics,
  searchQuery,
  selectedConcept,
  onConceptSelect,
}: SidebarTreeProps) {
  const renderTopic = (topic: Topic) => {
    const isSelected = selectedConcept === topic.concept;
    const matchesSearch =
      searchQuery &&
      (topic.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.dimensions.some(
          (dim) =>
            dim.facet.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dim.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    if (searchQuery && !matchesSearch) {
      return null;
    }

    return (
      <div key={topic.id} className="py-0.5">
        <button
          className={`grid grid-cols-[16px,16px,1fr,40px] items-center w-full px-2 py-1 rounded
                     hover:bg-blue-900/20 transition-colors gap-1
                     text-sm font-medium text-left
                     ${isSelected ? "bg-blue-900/30 text-blue-200" : "text-blue-400"}`}
          onClick={() => onConceptSelect(topic.concept)}
        >
          <FontAwesomeIcon
            icon={isSelected ? faChevronDown : faChevronRight}
            className="w-3 h-3 text-blue-500"
          />
          <FontAwesomeIcon
            icon={isSelected ? faFolderOpen : faFolder}
            className="w-3.5 h-3.5 text-blue-500"
          />
          <span className="truncate">{topic.concept}</span>
          <span className="text-xs text-blue-600 justify-self-start">
            {topic.dimensions.length}
          </span>
        </button>

        {isSelected && (
          <div className="space-y-0.5 mt-0.5">
            {topic.dimensions.map((dim) => (
              <div
                key={dim.id}
                className="grid grid-cols-[16px,16px,1fr,40px] items-center px-2 py-1 rounded ml-7
                           text-sm text-blue-300 hover:bg-blue-900/10 gap-1
                           cursor-default"
              >
                <div className="w-3" /> {/* Spacer for chevron alignment */}
                <FontAwesomeIcon
                  icon={faFile}
                  className="w-3.5 h-3.5 text-blue-600"
                />
                <span className="truncate">{dim.facet}</span>
                <span className="text-xs text-blue-600 justify-self-start">
                  {Math.round(dim.maturity_score * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <div className="space-y-0.5 font-mono">{topics.map(renderTopic)}</div>;
}
