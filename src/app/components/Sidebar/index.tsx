"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SidebarProps } from "./types";
import SidebarContent from "./SidebarContent";
import SidebarLogo from "./SidebarLogo";
import SidebarFooter from "./SidebarFooter";
import SidebarTree from "./SidebarTree";
import SidebarSearch from "./SidebarSearch";

export default function Sidebar({ topics, onSelectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden lg:flex lg:flex-col lg:w-[320px] h-screen
                      bg-white dark:bg-slate-950/10
                      border-r border-slate-200 dark:border-blue-600/20"
      >
        <SidebarContent
          topics={topics}
          searchQuery={searchQuery}
          selectedConcept={selectedConcept}
          onSearch={handleSearch}
          onConceptSelect={handleConceptSelect}
        />
      </div>

      {/* Mobile Logo - Always Visible */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50
                      bg-white/90 dark:bg-slate-950/90 backdrop-blur
                      border-b border-slate-200 dark:border-blue-600/20"
      >
        <SidebarLogo />
      </div>

      {/* Mobile Footer - Always Visible */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                      bg-white/90 dark:bg-slate-950/90 backdrop-blur
                      border-t border-slate-200 dark:border-blue-600/20"
      >
        <SidebarFooter />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50
                   p-2 rounded-lg
                   bg-white/90 dark:bg-slate-950/90
                   text-slate-600 dark:text-blue-400
                   hover:bg-slate-100 dark:hover:bg-slate-950/80
                   transition-colors"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
      </button>

      {/* Mobile Content Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 dark:bg-slate-950/80
                         z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-[var(--header-height)] bottom-[var(--footer-height)]
                         left-0 right-0
                         bg-white/90 dark:bg-slate-950/90 backdrop-blur
                         z-50 lg:hidden overflow-y-auto"
              style={
                {
                  "--header-height": "88px",
                  "--footer-height": "72px",
                } as React.CSSProperties
              }
            >
              <div className="h-full">
                <SidebarSearch
                  value={searchQuery}
                  onChange={(query) => {
                    handleSearch(query);
                    setIsOpen(false);
                  }}
                  placeholder="Search concepts, dimensions..."
                />
                <div className="px-6 pb-6">
                  <SidebarTree
                    topics={topics}
                    searchQuery={searchQuery}
                    selectedConcept={selectedConcept}
                    onConceptSelect={(conceptId) => {
                      handleConceptSelect(conceptId);
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
