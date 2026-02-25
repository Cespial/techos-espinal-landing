"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Award, Clock, Star } from "lucide-react";
import { SOCIAL_PROOF_STATS } from "@/lib/conversion";

function useCountUp(target: number, duration: number = 1500, decimals: number = 0) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Reset to 0 and start animation in the same frame to avoid CLS flash
    requestAnimationFrame(() => {
      setValue(0);
      const start = performance.now();

      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        setValue(Number(current.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    });
  }, [target, duration, decimals]);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  return { value, ref };
}

const STAT_CONFIG = [
  {
    target: SOCIAL_PROOF_STATS.jobsCompleted,
    suffix: "+",
    label: "trabajos realizados",
    icon: Award,
    decimals: 0,
  },
  {
    target: SOCIAL_PROOF_STATS.avgRating,
    suffix: "/5",
    label: "de clientes satisfechos",
    icon: Star,
    decimals: 1,
  },
  {
    target: SOCIAL_PROOF_STATS.yearsExperience,
    suffix: "+ años",
    label: "de experiencia",
    icon: Clock,
    decimals: 0,
  },
];

export default function SocialProofBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STAT_CONFIG.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  target,
  suffix,
  label,
  icon: Icon,
  decimals,
}: (typeof STAT_CONFIG)[number]) {
  const { value, ref } = useCountUp(target, 1500, decimals);

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-orange-600" aria-hidden="true" />
        <span ref={ref} className="text-2xl font-bold text-slate-900">
          {value}{suffix}
        </span>
      </div>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
}
