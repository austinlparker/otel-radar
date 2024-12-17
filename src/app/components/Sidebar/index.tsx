"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SidebarProps } from "./types";
import SidebarContent from "./SidebarContent";

export default function Sidebar({ topics, onSelectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-[320px] h-screen bg-slate-950/10 border-r border-blue-600/20">
        <SidebarContent topics={topics} onSelectionChange={onSelectionChange} />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-950/90 text-blue-400 hover:bg-slate-950/80 transition-colors"
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 right-0 h-[80vh] bg-slate-950/90 z-50 lg:hidden border-b border-blue-600/20 backdrop-blur"
            >
              <SidebarContent
                topics={topics}
                onSelectionChange={onSelectionChange}
                onClose={() => setIsOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
