import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type NavigatorWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

export const usePerformanceMode = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof navigator === "undefined") return;

    const nav = navigator as NavigatorWithHints;
    const hasSaveData = Boolean(nav.connection?.saveData);
    const lowMemory = (nav.deviceMemory ?? 8) <= 2;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 2;

    // Only downgrade on clearly constrained hardware or explicit data-saving preference.
    setIsLowEndDevice(hasSaveData || (lowMemory && lowCpu));
  }, []);

  return useMemo(
    () => ({
      prefersReducedMotion,
      isLowEndDevice,
      disableHeavyAnimations: false, // Forcing to false so animations are always visible
      isMounted,
    }),
    [prefersReducedMotion, isLowEndDevice, isMounted]
  );
};
