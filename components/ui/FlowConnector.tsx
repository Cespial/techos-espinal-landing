"use client";

import { motion } from "framer-motion";

type FlowConnectorProps = {
  d: string;
  isInView: boolean;
  delay: number;
  duration?: number;
  markerEnd?: string;
};

export function FlowConnector({
  d,
  isInView,
  delay,
  duration = 0.6,
  markerEnd,
}: FlowConnectorProps) {
  return (
    <motion.path
      d={d}
      stroke="#D4D4D4"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={markerEnd}
      initial={{ pathLength: 0 }}
      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
    />
  );
}

type FlowDotProps = {
  x: number;
  y: number;
  isInView: boolean;
  delay: number;
  r?: number;
};

export function FlowDot({ x, y, isInView, delay, r = 4 }: FlowDotProps) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={r}
      fill="#D4D4D4"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay, duration: 0.25, ease: "easeOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  );
}
