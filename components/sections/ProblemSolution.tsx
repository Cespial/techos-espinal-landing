"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const PROBLEMS = [
  {
    num: "01",
    text: "Cotizaste con varias agencias y todas te cobraron millones que no tienes",
    warning: false,
  },
  {
    num: "02",
    text: "Te prometieron dos semanas y ya perdiste la cuenta de cuántos meses llevas esperando",
    warning: false,
  },
  {
    num: "03",
    text: "Tu competencia ya tiene página y tú sigues invisible",
    warning: true,
  },
  {
    num: "04",
    text: "No sabes nada de tecnología y cada vez que preguntas te hablan en otro idioma",
    warning: true,
  },
];

function useIsDesktopBreakpoint() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const onChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return isDesktop;
}

/* ─── Desktop: scrollytelling with sticky card ─── */

function ProblemItem({
  index,
  text,
  warning,
  active,
}: {
  index: string;
  text: string;
  warning: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`flex gap-4 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 translate-y-0"
          : "opacity-40 translate-y-0"
      }`}
    >
      <span className="mt-0.5 shrink-0 font-sans text-tiny text-text-tertiary">
        {index}.
      </span>
      <p
        className={`font-sans text-body leading-relaxed ${
          warning ? "text-foreground font-medium" : "text-foreground"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function DesktopScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const lastCounter = useRef<number>(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Track which problem is active based on scroll */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) setActiveIndex(0);
    else if (latest < 0.30) setActiveIndex(1);
    else if (latest < 0.45) setActiveIndex(2);
    else if (latest < 0.60) setActiveIndex(3);
    else setActiveIndex(3);
  });

  /* Solution panel: starts subtle, becomes fully visible in second half */
  const solutionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0.5, 1]);
  const solutionY = useTransform(scrollYProgress, [0.45, 0.65], [12, 0]);

  /* Stats counter: animates in the final stretch */
  const countProgress = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const countSpring = useSpring(countProgress, { stiffness: 82, damping: 20, mass: 0.8 });
  const countValue = useTransform(countSpring, (latest) => Math.round(latest * 73));

  useMotionValueEvent(countValue, "change", (latest) => {
    const safeValue = Math.max(0, Math.min(73, latest));
    if (safeValue !== lastCounter.current) {
      lastCounter.current = safeValue;
      setCounter(safeValue);
    }
  });

  return (
    <div ref={containerRef} className="relative mx-auto min-h-[150vh] max-w-6xl px-6">
      <div className="sticky top-28 z-10 pb-12">
        <SectionHeading title="¿Por qué sigues sin página web?" />

        <div className="relative z-10 mt-10 grid grid-cols-1 gap-10 rounded-2xl border border-border/80 bg-white p-10 shadow-sm md:grid-cols-2 md:gap-12">
          {/* Left column: problems list */}
          <div>
            <p className="font-sans text-h3 text-foreground/90">
              ¿Te suena familiar?
            </p>

            <div className="mt-6 space-y-5">
              {PROBLEMS.map((item, i) => (
                <ProblemItem
                  key={item.num}
                  index={item.num}
                  text={item.text}
                  warning={item.warning}
                  active={i <= activeIndex}
                />
              ))}
            </div>

            <p className="mt-6 font-sans text-body-sm text-text-secondary">
              <span className="font-medium text-foreground">El 78%</span> de los clientes
              buscan en Google antes de contratar un servicio.
            </p>
          </div>

          {/* Right column: solution — ALWAYS visible, enhanced by scroll */}
          <motion.div
            style={{
              opacity: solutionOpacity,
              y: solutionY,
            }}
          >
            <h2
              className="font-serif font-semibold text-foreground"
              style={{
                fontSize: "var(--font-size-h2-lg)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              Nosotros lo hacemos diferente.
            </h2>

            <p
              className="mt-3 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text font-serif text-[clamp(1.45rem,3vw,1.95rem)] text-transparent"
              style={{ lineHeight: 1.1, letterSpacing: "-0.015em" }}
            >
              48 horas. Tu página lista.
            </p>

            <p className="mt-3 font-sans text-body text-text-secondary md:text-body-lg">
              Así de simple.
            </p>

            <p className="mt-4 max-w-xl font-sans text-body leading-relaxed text-text-secondary">
              Sin reuniones interminables, sin jerga técnica. Nos escribes por WhatsApp, nos
              cuentas tu negocio, y en máximo 48 horas tienes tu página web publicada y recibiendo
              clientes.
            </p>

            <div className="node-border mt-6 bg-node-bg p-6">
              <div className="relative inline-flex items-center">
                <p
                  className="font-serif text-foreground"
                  style={{ fontSize: "var(--font-size-h2-lg)" }}
                >
                  {counter}%
                </p>
              </div>
              <p className="mt-1 font-sans text-body-sm text-text-secondary">
                de profesionales en Colombia no tienen página web. Tú puedes tener la tuya en 48
                horas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: static layout, no scroll magic ─── */

function MobileNarrative() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6">
      <SectionHeading title="¿Por qué sigues sin página web?" />

      <div className="rounded-2xl border border-border/80 bg-white p-5">
        <p className="font-sans text-h3 text-foreground/90">¿Te suena familiar?</p>

        <div className="mt-5 space-y-4">
          {PROBLEMS.map((item) => (
            <div key={item.num} className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-sans text-tiny text-text-tertiary">
                {item.num}.
              </span>
              <p
                className={`font-sans text-body leading-relaxed ${
                  item.warning ? "text-foreground font-medium" : "text-foreground"
                }`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-sans text-body-sm text-text-secondary">
          <span className="font-medium text-foreground">El 78%</span> de los clientes
          buscan en Google antes de contratar un servicio.
        </p>
      </div>

      <div className="node-border mt-6 bg-white p-5">
        <h2
          className="font-serif font-semibold text-foreground"
          style={{
            fontSize: "var(--font-size-h2-lg)",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
          }}
        >
          Nosotros lo hacemos diferente.
        </h2>
        <p
          className="mt-2 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text font-serif text-[clamp(1.3rem,5.5vw,1.65rem)] text-transparent"
          style={{ lineHeight: 1.1, letterSpacing: "-0.015em" }}
        >
          48 horas. Tu página lista.
        </p>
        <p className="mt-2 font-sans text-body text-text-secondary">Así de simple.</p>
        <p className="mt-3 font-sans text-body leading-relaxed text-text-secondary">
          Sin reuniones interminables, sin jerga técnica. Nos escribes por WhatsApp, nos cuentas
          tu negocio, y en máximo 48 horas tienes tu página web publicada y recibiendo clientes.
        </p>

        <div className="node-border mt-5 bg-node-bg p-4">
          <p
            className="font-serif text-foreground"
            style={{ fontSize: "var(--font-size-h2-lg)" }}
          >
            73%
          </p>
          <p className="mt-1 font-sans text-body-sm text-text-secondary">
            de profesionales en Colombia no tienen página web. Tú puedes tener la tuya en 48
            horas.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Reduced motion: fully static, no animation ─── */

function ReducedMotionFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeading title="¿Por qué sigues sin página web?" />

      <div className="mt-10 grid grid-cols-1 gap-8 rounded-2xl border border-border/80 bg-white p-6 md:grid-cols-2 md:p-10">
        <div className="space-y-4">
          <p className="font-sans text-h3 text-foreground/90">¿Te suena familiar?</p>
          {PROBLEMS.map((item) => (
            <div key={item.num} className="flex gap-4">
              <span className="mt-0.5 shrink-0 font-sans text-tiny text-text-tertiary">
                {item.num}.
              </span>
              <p
                className={`font-sans text-body leading-relaxed ${
                  item.warning ? "text-foreground font-medium" : "text-foreground"
                }`}
              >
                {item.text}
              </p>
            </div>
          ))}

          <p className="mt-6 font-sans text-body-sm text-text-secondary">
            <span className="font-medium text-foreground">El 78%</span> de los clientes
            buscan en Google antes de contratar un servicio.
          </p>
        </div>

        <div>
          <h2
            className="font-serif font-semibold text-foreground"
            style={{
              fontSize: "var(--font-size-h2-lg)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            Nosotros lo hacemos diferente.
          </h2>
          <p
            className="mt-3 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text font-serif text-[clamp(1.45rem,3vw,1.95rem)] text-transparent"
            style={{ lineHeight: 1.1, letterSpacing: "-0.015em" }}
          >
            48 horas. Tu página lista.
          </p>
          <p className="mt-3 font-sans text-body text-text-secondary md:text-body-lg">
            Así de simple.
          </p>
          <p className="mt-4 max-w-xl font-sans text-body leading-relaxed text-text-secondary">
            Sin reuniones interminables, sin jerga técnica. Nos escribes por WhatsApp, nos cuentas
            tu negocio, y en máximo 48 horas tienes tu página web publicada y recibiendo clientes.
          </p>
          <div className="node-border mt-6 bg-node-bg p-6">
            <p
              className="font-serif text-foreground"
              style={{ fontSize: "var(--font-size-h2-lg)" }}
            >
              73%
            </p>
            <p className="mt-1 font-sans text-body-sm text-text-secondary">
              de profesionales en Colombia no tienen página web. Tú puedes tener la tuya en 48
              horas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktopBreakpoint();

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="problema-solucion">
      <h2 id="problema-solucion" className="sr-only">
        ¿Por qué sigues sin página web?
      </h2>
      {shouldReduceMotion ? (
        <ReducedMotionFallback />
      ) : isDesktop ? (
        <DesktopScrollytelling />
      ) : (
        <MobileNarrative />
      )}
    </section>
  );
}
