import { TooltipProps } from "recharts";
import { Dimension } from "@/types";

interface CustomTooltipData {
  dimension: Dimension;
  score: number;
}

export function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.[0]) return null;

  const data = payload[0].payload as CustomTooltipData;
  if (!data?.dimension) return null;

  return (
    <div className="bg-slate-950/90 backdrop-blur px-4 py-2 rounded-lg border border-blue-600/20 whitespace-nowrap">
      <div className="font-semibold text-yellow-300">
        {data.dimension.facet}
      </div>
      <div className="text-xs text-blue-400 mt-1">
        Score: {(data.score * 100).toFixed(0)}%
      </div>
    </div>
  );
}
