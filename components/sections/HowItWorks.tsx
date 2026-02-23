"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageCircle, Paintbrush, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { STEPS, HOW_IT_WORKS_FAQ } from "@/lib/constants";

const stepEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STEP_ICONS = {
  chat: MessageCircle,
  paintbrush: Paintbrush,
  rocket: Rocket,
} as const;

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stepsRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="proceso" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Tu página en 3 pasos"
          subtitle="Sin complicaciones. Sin jerga técnica."
        />

        <div ref={stepsRef} className="space-y-0">
          {STEPS.map((step, i) => (
            <div key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ delay: i * 0.14, duration: 0.55, ease: stepEase }}
                className="flex gap-5 md:gap-6"
              >
                <motion.span
                  className="w-10 shrink-0 text-right font-serif text-2xl leading-none text-text-tertiary/25 md:w-16 md:text-5xl"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.06 + i * 0.14, duration: 1.2, ease: "easeOut" }}
                >
                  {step.number}
                </motion.span>
                <div className="pt-1 md:pt-2">
                  {(() => {
                    const StepIcon = STEP_ICONS[step.icon];
                    return (
                      <motion.span
                        aria-hidden="true"
                        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-alt text-text-tertiary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          inView
                            ? {
                                opacity: 1,
                                scale: shouldReduceMotion ? 1 : [0, 1.2, 0.9, 1.05, 1],
                              }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{
                          delay: 0.12 + i * 0.14,
                          duration: shouldReduceMotion ? 0.3 : 0.6,
                          ease: "easeOut",
                        }}
                      >
                        <StepIcon className="h-3.5 w-3.5" />
                      </motion.span>
                    );
                  })()}
                  <span className="mb-2 inline-block rounded-full border border-border bg-badge-bg px-2.5 py-0.5 font-sans text-tiny text-text-secondary">
                    {step.time}
                  </span>
                  <h3 className="font-sans text-h3 leading-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md font-sans text-body leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="relative ml-5 h-11 w-[2px] md:ml-8 md:h-12">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 2 48"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M1 1 L1 47"
                      stroke="#CDCDCD"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{
                        delay: 0.24 + i * 0.16,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <span className="mb-4 inline-block rounded-full border border-border bg-badge-bg px-3 py-1 font-sans text-caption text-text-secondary">
            Tiempo estimado: 48 horas
          </span>
          <Accordion items={HOW_IT_WORKS_FAQ} />
        </div>
      </div>
    </section>
  );
}
