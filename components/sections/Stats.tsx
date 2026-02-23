"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Páginas entregadas" },
  { value: 48, suffix: "h", label: "Tiempo promedio de entrega" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 1, prefix: "$", suffix: "M COP", label: "Precio desde" },
];

const statEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AnimatedStatValue({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);
  const [didPulse, setDidPulse] = useState(false);
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 55, damping: 20, mass: 0.9 });
  const hasMounted = useRef(false);

  useEffect(() => {
    if (isInView && !hasMounted.current) {
      hasMounted.current = true;
      count.set(0);
      count.set(value);
    }
  }, [isInView, count, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    const rounded = Math.round(latest);
    setDisplay((previous) => (previous === rounded ? previous : rounded));
    if (rounded >= value && !didPulse) {
      setDidPulse(true);
    }
  });

  return (
    <span ref={valueRef} className="relative inline-flex items-center">
      <span>
        {prefix}
        {display}
        {suffix}
      </span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-full bg-foreground/8 blur-xl"
        initial={{ opacity: 0 }}
        animate={didPulse ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
    </span>
  );
}

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section className="border-y border-border py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div ref={gridRef} className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.12, duration: 0.48, ease: statEase }}
              className="text-center md:text-left"
            >
              <p className="font-serif font-bold text-[clamp(2rem,8vw,3rem)] leading-none tracking-[-0.02em] text-foreground">
                <AnimatedStatValue
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 font-sans text-body-sm leading-relaxed text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
