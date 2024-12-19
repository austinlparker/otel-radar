"use client";

import { SidebarContentProps } from "@/types";
import SidebarLogo from "./SidebarLogo";
import SidebarSearch from "./SidebarSearch";
import SidebarTree from "./SidebarTree";
import SidebarFooter from "./SidebarFooter";

export default function SidebarContent({
  topics,
  searchQuery,
  selectedConcept,
  onSearch,
  onConceptSelect,
}: SidebarContentProps) {
  return (
    <div
      className="h-full flex flex-col bg-white dark:bg-slate-950/90
                    backdrop-blur border-r border-slate-200 dark:border-blue-600/20"
    >
      <SidebarLogo />
      <div className="flex-1 overflow-hidden flex flex-col">
        <SidebarSearch
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search concepts, dimensions..."
        />
        <div className="flex-1 overflow-y-auto px-6">
          <SidebarTree
            topics={topics}
            searchQuery={searchQuery}
            selectedConcept={selectedConcept}
            onConceptSelect={onConceptSelect}
          />
        </div>
      </div>
      <SidebarFooter />
    </div>
  );
}
