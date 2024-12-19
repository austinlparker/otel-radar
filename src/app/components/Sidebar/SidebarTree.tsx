"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faFolder,
  faFolderOpen,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarTreeProps } from "@/types";

export default function SidebarTree({
  topics,
  searchQuery,
  selectedConcept,
  onConceptSelect,
}: SidebarTreeProps) {
  const filteredTopics = searchQuery
    ? topics.filter((topic) =>
        topic.concept.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : topics;
  return (
    <div className="space-y-0.5 font-mono">
      {filteredTopics.map((topic) => {
        const isSelected = selectedConcept === topic.concept;

        return (
          <div key={topic.id} className="py-0.5">
            <button
              className={`grid grid-cols-[16px,16px,1fr,40px] items-center
                         w-full px-2 py-1 rounded gap-1
                         text-sm font-medium text-left
                         transition-colors
                         ${
                           isSelected
                             ? "bg-slate-100 dark:bg-blue-900/30 text-slate-900 dark:text-blue-200"
                             : "text-slate-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-blue-900/20"
                         }`}
              onClick={() => onConceptSelect(topic.concept)}
            >
              <FontAwesomeIcon
                icon={isSelected ? faChevronDown : faChevronRight}
                className="w-3 h-3 text-slate-400 dark:text-blue-500"
              />
              <FontAwesomeIcon
                icon={isSelected ? faFolderOpen : faFolder}
                className="w-3.5 h-3.5 text-slate-400 dark:text-blue-500"
              />
              <span className="truncate">{topic.concept}</span>
              <span className="text-xs text-slate-400 dark:text-blue-600 justify-self-start">
                {topic.dimensions.length}
              </span>
            </button>

            {isSelected && (
              <div className="space-y-0.5 mt-0.5">
                {topic.dimensions.map((dim) => (
                  <div
                    key={dim.id}
                    className="grid grid-cols-[16px,16px,1fr,40px] items-center
                               px-2 py-1 rounded ml-7 gap-1
                               text-sm text-slate-500 dark:text-blue-300
                               hover:bg-slate-50 dark:hover:bg-blue-900/10
                               cursor-default"
                  >
                    <div className="w-3" />
                    <FontAwesomeIcon
                      icon={faFile}
                      className="w-3.5 h-3.5 text-slate-400 dark:text-blue-600"
                    />
                    <span className="truncate">{dim.facet}</span>
                    <span className="text-xs text-slate-400 dark:text-blue-600 justify-self-start">
                      {Math.round(dim.maturity_score * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
