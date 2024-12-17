"use client";

import { useMemo, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateDimensionPositions, getRingData } from "./utils";
import { COLORS, DIMENSIONS } from "./constants";
import { CustomTooltip } from "./CustomTooltip";
import { ZoomWrapper } from "./ZoomWrapper";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import {
  RadarProps,
  DataPoint,
  RingDataPoint,
  RechartsScatterProps,
} from "./types";

export default function Radar({
  dimensions,
  selectedDimension,
  onDimensionClick,
}: RadarProps) {
  const radius = 600;
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const handleClick = (data: DataPoint) => {
    if (data?.dimension) {
      onDimensionClick(data.dimension);
      transformRef.current?.centerView(2, 500);
    }
  };

  const data = useMemo(() => {
    const positions = calculateDimensionPositions(dimensions, radius);
    return positions.map(({ dimension, x, y }) => ({
      x,
      y,
      z:
        dimension === selectedDimension
          ? DIMENSIONS.DOT_RADIUS_HOVER
          : DIMENSIONS.DOT_RADIUS,
      dimension,
      score: dimension.maturity_score,
    }));
  }, [dimensions, selectedDimension]);

  const ringData: RingDataPoint[] = useMemo(
    () => getRingData(radius),
    [radius],
  );

  const getPointColor = (score: number) => {
    if (score >= 0.7) return COLORS.GREEN;
    if (score >= 0.4) return COLORS.YELLOW;
    return COLORS.RED;
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full aspect-square max-w-[1400px] max-h-[900px]">
        <ZoomWrapper ref={transformRef}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
            >
              <XAxis
                type="number"
                dataKey="x"
                domain={[-radius - 50, radius + 50]}
                hide
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[-radius - 50, radius + 50]}
                hide
              />
              <ZAxis
                type="number"
                dataKey="z"
                range={[
                  DIMENSIONS.DOT_RADIUS * 2,
                  DIMENSIONS.DOT_RADIUS_HOVER * 2,
                ]}
              />

              <Scatter
                data={ringData}
                fill="none"
                cursor="default"
                shape={(props: RechartsScatterProps) => (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={props.payload?.z}
                    stroke={COLORS.GREEN}
                    strokeDasharray="5,5"
                    fillOpacity={0}
                    className="transition-all duration-300"
                  />
                )}
              />

              <Scatter
                data={data}
                cursor="pointer"
                onClick={(point) => handleClick(point as DataPoint)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getPointColor(entry.score)}
                    className={`
                                    cursor-pointer transition-all duration-300
                                    ${
                                      entry.dimension === selectedDimension
                                        ? "stroke-2 stroke-yellow-400 filter drop-shadow-lg"
                                        : ""
                                    }
                                  `}
                  />
                ))}
              </Scatter>
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                isAnimationActive={false}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ZoomWrapper>
      </div>
    </div>
  );
}
