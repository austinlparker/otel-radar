import { useState, useEffect } from "react";
import { THRESHOLDS } from "@/constants";

export function useResponsive() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({
        width,
        height,
        isMobile: width < THRESHOLDS.BREAKPOINTS.MOBILE,
        isTablet:
          width >= THRESHOLDS.BREAKPOINTS.MOBILE &&
          width < THRESHOLDS.BREAKPOINTS.TABLET,
        isDesktop: width >= THRESHOLDS.BREAKPOINTS.TABLET,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
}
