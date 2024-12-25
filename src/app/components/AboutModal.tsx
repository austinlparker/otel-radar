"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ANIMATIONS } from "@/constants";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ANIMATIONS.SPRING.GENTLE}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={ANIMATIONS.SPRING.GENTLE}
              className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 
                         border border-slate-200/50 dark:border-blue-500/20
                         rounded-2xl shadow-2xl relative
                         backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 
                           p-2 rounded-full
                           text-slate-400 hover:text-slate-600 hover:bg-slate-100
                           dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/50
                           transition-all duration-200"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <h2 className="font-michroma text-3xl bg-gradient-to-br from-slate-900 to-slate-700 
                                dark:from-blue-200 dark:to-blue-400 bg-clip-text text-transparent">
                    About The Radar
                  </h2>
                  
                  <div className="text-lg text-slate-600 dark:text-blue-300 leading-relaxed space-y-4">
                    <p>
                      This is an open-source, opinionated project that aims to help you understand the relative maturity of 
                    various components, integrations, and tools in the OpenTelemetry ecosystem. 
                  </p>
                    <p>
                      Our criteria can be found in the <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">radar_data/docs</code> directory of the repository.
                    </p>
                    <p>
                      We welcome contributions, feedback, and suggestions via GitHub issues or pull requests.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl
                                border border-slate-100 dark:border-blue-500/10">
                  <h3 className="font-semibold text-xl text-slate-800 dark:text-blue-200">
                    Score Criteria
                  </h3>
                  <ul className="space-y-3 text-slate-600 dark:text-blue-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>Components have a maturity, and a confidence, score.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>The maturity score is a combination of the experience of using a component, its documentation, and how complete it is.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>The confidence score is a combination of real-world usage that we can confirm, as well as the overall sentiment of users of the component.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>Each category&apos;s position is determined by the aggregate of these individual scores for all child components.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-blue-500/20">
                  <a
                    href="https://honeycomb.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm 
                             text-slate-500 hover:text-slate-700 
                             dark:text-blue-400 dark:hover:text-blue-300 
                             transition-colors"
                  >
                    Created by Honeycomb
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}