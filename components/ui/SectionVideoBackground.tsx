"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/motion";
import { cn } from "@/components/ui/cn";

type SectionVideoBackgroundProps = {
  className?: string;
  parallaxY?: MotionValue<number>;
  sweep?: boolean;
  sweepDelayMs?: number;
  enableWebm?: boolean;
};

type NavigatorWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

const VIDEO_WEBM = "/video/slow-majestic.webm";
const VIDEO_MP4 = "/video/slow-majestic.mp4";
const VIDEO_POSTER = "/video/slow-majestic-poster.jpg";

export default function SectionVideoBackground({
  className,
  parallaxY,
  sweep = true,
  sweepDelayMs = 180,
  enableWebm = false,
}: SectionVideoBackgroundProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion) {
      const disableTimer = window.setTimeout(() => {
        setAllowVideo(false);
      }, 0);
      return () => window.clearTimeout(disableTimer);
    }

    const evaluateTimer = window.setTimeout(() => {
      const nav = navigator as NavigatorWithHints;
      const saveData = nav.connection?.saveData === true;
      const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : undefined;
      const lowEndSmallDevice = window.innerWidth < 420 && typeof memory === "number" && memory <= 2;

      setAllowVideo(!(saveData || lowEndSmallDevice));
    }, 0);

    return () => window.clearTimeout(evaluateTimer);
  }, [prefersReducedMotion]);

  const videoStyle = useMemo(
    () => (parallaxY ? { y: parallaxY } : undefined),
    [parallaxY],
  );

  return (
    <div aria-hidden="true" className={cn("section-video-bg", className)}>
      {allowVideo ? (
        <motion.video
          className="section-video-media"
          style={videoStyle}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={VIDEO_POSTER}
        >
          {enableWebm ? <source src={VIDEO_WEBM} type="video/webm" /> : null}
          <source src={VIDEO_MP4} type="video/mp4" />
        </motion.video>
      ) : (
        <motion.img
          src={VIDEO_POSTER}
          alt=""
          className="section-video-media"
          style={videoStyle}
          loading="lazy"
          decoding="async"
        />
      )}

      <span className="section-video-overlay" />
      <span className="section-video-vignette" />
      <span className="section-video-grain" />
      {sweep ? (
        <span
          className="section-video-sweep section-video-sweep-once"
          style={{ animationDelay: `${sweepDelayMs}ms` }}
        />
      ) : null}
    </div>
  );
}
