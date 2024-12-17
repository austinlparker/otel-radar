import { Topic } from "../../types";
import { motion } from "framer-motion";

interface DetailsPanelProps {
  topic: Topic | null;
  onClose: () => void;
  isMobile?: boolean;
}

export default function DetailsPanel({ topic, onClose }: DetailsPanelProps) {
  if (!topic) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed bottom-0 left-0 right-0 h-[80vh]
                 lg:h-full lg:w-96 lg:right-0 lg:left-auto lg:top-0
                 bg-slate-950/90 backdrop-blur border-t lg:border-l border-blue-600/20
                 z-50 overflow-y-auto"
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start p-6 border-b border-blue-600/20">
          <h3 className="text-xl font-bold text-yellow-300 pr-8">
            {topic.concept}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-900/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-blue-100 mb-6">{topic.description}</p>

          <div className="space-y-8">
            {topic.dimensions.map((dim) => (
              <div key={dim.id} className="space-y-4">
                <div>
                  <h4 className="font-medium text-yellow-300 mb-2">
                    {dim.facet}
                  </h4>
                  <p className="text-sm text-blue-200 mb-4">
                    {dim.description}
                  </p>
                </div>

                {/* Maturity Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-300">
                    <span>Maturity Score</span>
                    <span>{Math.round(dim.maturity_score * 100)}%</span>
                  </div>
                  <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.round(dim.maturity_score * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Maturity Score Details */}
                <div className="space-y-2 pl-4">
                  {Object.entries(dim.maturity_score_details).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-xs text-blue-400"
                      >
                        <span>
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </span>
                        <span>{Math.round(value * 100)}%</span>
                      </div>
                    ),
                  )}
                </div>

                {/* Confidence Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-300">
                    <span>Confidence Score</span>
                    <span>{Math.round(dim.confidence_score * 100)}%</span>
                  </div>
                  <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width: `${Math.round(dim.confidence_score * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Confidence Score Breakdown */}
                <div className="space-y-2 pl-4">
                  {Object.entries(dim.confidence_score_breakdown).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-xs text-blue-400"
                      >
                        <span>
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </span>
                        <span>{Math.round(value * 100)}%</span>
                      </div>
                    ),
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {dim.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full
                               bg-blue-900/20 text-blue-300
                               border border-blue-600/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
