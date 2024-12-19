import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";
import { motion, AnimatePresence } from "framer-motion";
import { RadarProps, RadarPoint } from "@/types";
import { DIMENSIONS, ANIMATIONS } from "@/constants";
import { getPointColor } from "./utils";
import { RadarTooltip } from "./RadarTooltip";
import { useResponsive } from "@/hooks/useResponsive";
import { MobileView } from "./MobileView";

function Radar({
  dimensions,
  selectedDimension,
  onDimensionClick,
}: RadarProps) {
  const { isMobile } = useResponsive();

  return (
    <div className="w-full h-full">
      {isMobile ? (
        <MobileView
          dimensions={dimensions}
          onDimensionClick={onDimensionClick}
        />
      ) : (
        <ParentSize>
          {({ width, height }) => (
            <RadarChart
              width={width}
              height={height}
              dimensions={dimensions}
              selectedDimension={selectedDimension}
              onDimensionClick={onDimensionClick}
            />
          )}
        </ParentSize>
      )}
    </div>
  );
}

interface RadarChartProps extends RadarProps {
  width: number;
  height: number;
  levels?: number;
}

function RadarChart({
  width,
  height,
  dimensions,
  selectedDimension,
  onDimensionClick,
  levels = 5,
}: RadarChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<RadarPoint | null>(null);
  const { isMobile } = useResponsive();

  const config = useMemo(() => {
    // Calculate available space with margins
    const margin = isMobile ? 20 : 40;
    const availableSize = Math.min(width, height) - margin * 2;

    // On mobile, account for header/footer space and constrain size
    const maxSize = isMobile
      ? Math.min(availableSize, window.innerHeight - 200)
      : availableSize;
    const radius = maxSize / 2;

    return {
      width: maxSize,
      height: maxSize,
      radius,
      centerX: width / 2, // Center in available space
      centerY: height / 2,
      pointRadius: isMobile
        ? DIMENSIONS.RADAR.POINTS.RADIUS * 0.8
        : DIMENSIONS.RADAR.POINTS.RADIUS,
    };
  }, [width, height, isMobile]);

  const radiusScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [config.radius, 0], // Inverted range - higher scores closer to center
        domain: [0, 1],
      }),
    [config.radius],
  );

  const { points } = useMemo(() => {
    const angleStep = (2 * Math.PI) / dimensions.length;
    const points = dimensions.map((dim, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const radius = radiusScale(dim.maturity_score);
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        dimension: dim,
      };
    });

    const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
    return { points, polygonPoints };
  }, [dimensions, radiusScale]);

  const circles = useMemo(
    () =>
      Array.from({ length: levels }).map((_, i) => ({
        radius: ((i + 1) * config.radius) / levels,
      })),
    [levels, config.radius],
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient
            id="radar-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
            <stop
              offset="100%"
              stopColor="rgb(37, 99, 235)"
              stopOpacity="0.05"
            />
          </radialGradient>
        </defs>

        <Group top={config.centerY} left={config.centerX}>
          {/* Background gradient */}
          <circle r={config.radius} fill="url(#radar-gradient)" />

          {/* Level circles */}
          {circles.map((circle, i) => (
            <motion.circle
              key={`level-${i}`}
              r={circle.radius}
              className="fill-none stroke-primary-500/40"
              strokeDasharray="6,4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}

          {/* Dimension lines */}
          {points.map((point, i) => (
            <motion.line
              key={`line-${i}`}
              x1={0}
              y1={0}
              x2={point.x}
              y2={point.y}
              className="stroke-primary-500/40"
              strokeDasharray="6,4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Points */}
          {points.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={DIMENSIONS.RADAR.POINTS.RADIUS}
              className={`
                cursor-pointer transition-colors
                ${
                  point.dimension === selectedDimension
                    ? "stroke-2 stroke-accent-400 filter drop-shadow-lg"
                    : "stroke-2 stroke-slate-50/10 dark:stroke-slate-950/10"
                }
              `}
              fill={getPointColor(point.dimension.maturity_score)}
              whileHover={{
                scale:
                  DIMENSIONS.RADAR.POINTS.RADIUS_HOVER /
                  DIMENSIONS.RADAR.POINTS.RADIUS,
                transition: { duration: ANIMATIONS.DURATION.FAST },
              }}
              onClick={() => onDimensionClick(point.dimension)}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </Group>
      </svg>

      <AnimatePresence>
        {hoveredPoint && (
          <RadarTooltip
            dimension={hoveredPoint.dimension}
            position={{
              x: config.centerX + hoveredPoint.x,
              y: config.centerY + hoveredPoint.y,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Radar;
