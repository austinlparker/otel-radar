import { useState, useEffect } from "react";
import { THRESHOLDS } from "@/constants";

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < THRESHOLDS.BREAKPOINTS.MOBILE,
        isTablet:
          width >= THRESHOLDS.BREAKPOINTS.MOBILE &&
          width < THRESHOLDS.BREAKPOINTS.TABLET,
        isDesktop: width >= THRESHOLDS.BREAKPOINTS.TABLET,
      });
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
