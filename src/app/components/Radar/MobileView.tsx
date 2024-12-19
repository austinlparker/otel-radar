import { motion } from "framer-motion";
import { Dimension } from "@/types";
import { getPointColor, formatScore } from "./utils";

interface MobileViewProps {
  dimensions: Dimension[];
  onDimensionClick: (dimension: Dimension) => void;
}

export function MobileView({ dimensions, onDimensionClick }: MobileViewProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 min-h-full">
          {dimensions.map((dimension) => (
            <motion.div
              key={dimension.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => onDimensionClick(dimension)}
              className="bg-white dark:bg-slate-950/90 p-4 rounded-lg
                           border border-slate-200 dark:border-blue-600/20
                           cursor-pointer
                           hover:bg-slate-50 dark:hover:bg-slate-950/80
                           transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-slate-900 dark:text-blue-200">
                  {dimension.facet}
                </h3>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getPointColor(dimension.maturity_score),
                  }}
                />
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600 dark:text-blue-300">
                  <span>Maturity Score</span>
                  <span>{formatScore(dimension.maturity_score)}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-blue-900/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dimension.maturity_score * 100}%`,
                      backgroundColor: getPointColor(dimension.maturity_score),
                    }}
                  />
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-blue-400 mt-2 line-clamp-2">
                {dimension.description}
              </p>

              {/* Tags */}
              {dimension.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {dimension.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full
                                           bg-slate-100 dark:bg-blue-900/20
                                           text-slate-600 dark:text-blue-300
                                           border border-slate-200 dark:border-blue-600/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {dimension.tags.length > 3 && (
                    <span className="text-xs text-slate-500 dark:text-blue-400">
                      +{dimension.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
