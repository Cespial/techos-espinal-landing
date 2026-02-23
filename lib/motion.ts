import { useEffect, useState } from "react";

export const MOTION_TOKENS = {
  duration120: 120,
  duration180: 180,
  duration240: 240,
  duration320: 320,
  duration600: 600,
  easingPremium: "cubic-bezier(0.16, 1, 0.3, 1)",
  easingOvershoot: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  staggerDefault: 60,
} as const;

export function useReducedMotionSafe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return prefersReducedMotion;
}
