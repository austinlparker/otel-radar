"use client";

import { useState } from "react";
import { SidebarContentProps } from "./types";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarTree from "./SidebarTree";
import SidebarFooter from "./SidebarFooter";
import { Topic } from "@/types";

export default function SidebarContent({
  topics,
  onSelectionChange,
  onClose,
}: SidebarContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedConcept(null);
    onSelectionChange(null, query);
  };

  const handleConceptSelect = (conceptId: string) => {
    const newSelection = conceptId === selectedConcept ? null : conceptId;
    setSelectedConcept(newSelection);
    setSearchQuery("");
    onSelectionChange(newSelection, "");
  };

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader onClose={onClose} />

      <div className="flex-1 overflow-hidden flex flex-col">
        <SidebarSearch
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search concepts, dimensions..."
        />

        <div className="flex-1 overflow-y-auto px-6">
          <SidebarTree
            topics={topics}
            searchQuery={searchQuery}
            selectedConcept={selectedConcept}
            onConceptSelect={handleConceptSelect}
          />
        </div>
      </div>

      <SidebarFooter />
    </div>
  );
}
