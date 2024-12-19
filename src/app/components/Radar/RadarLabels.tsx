import { motion } from "framer-motion";
import { RadarData } from "@/types";
import { ANIMATIONS } from "@/constants";

interface RadarLabelsProps {
  data: RadarData[];
  radius: number;
  className?: string;
}

export function RadarLabels({
  data,
  radius,
  className = "",
}: RadarLabelsProps) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: ANIMATIONS.DURATION.MEDIUM }}
    >
      {data.map((d, i) => {
        const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
        const x = Math.cos(angle) * (radius + 30); // 30px padding for labels
        const y = Math.sin(angle) * (radius + 30);

        return (
          <text
            key={`radar-label-${i}`}
            x={x}
            y={y}
            className={className}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {d.key}
          </text>
        );
      })}
    </motion.g>
  );
}
