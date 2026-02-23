"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-in" | "fade-in-up";
  delay?: number;
}

const animations = {
  "fade-in": {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  "fade-in-up": {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
};

export default function ScrollReveal({
  children,
  className,
  variant = "fade-in-up",
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const anim = animations[variant];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      transition={{ ...anim.transition, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
