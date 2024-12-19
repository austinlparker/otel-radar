import { motion } from "framer-motion";
import { RadarTooltipProps } from "@/types";
import { ANIMATIONS } from "@/constants";
import { formatScore } from "./utils";

export function RadarTooltip({ dimension, position }: RadarTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={ANIMATIONS.SPRING.GENTLE}
      className="absolute pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -120%)",
      }}
    >
      <div
        className="
        bg-slate-950/90 backdrop-blur
        px-4 py-3 rounded-lg
        border border-primary-500/20
        max-w-xs shadow-lg
      "
      >
        <div className="font-semibold text-accent-300 mb-1">
          {dimension.facet}
        </div>
        <div className="text-sm text-primary-200 mb-2">
          {dimension.description}
        </div>
        <div className="text-xs text-primary-400">
          Score: {formatScore(dimension.maturity_score)}
        </div>
        {dimension.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dimension.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-1.5 py-0.5
                  text-xs rounded-full
                  bg-primary-900/20 text-primary-300
                  border border-primary-500/20
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
