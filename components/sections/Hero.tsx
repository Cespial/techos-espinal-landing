"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { HERO } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";

const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Pre-compute dot grid circles to avoid Array.from on every render */
const DOT_GRID = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 7 }, (_, col) => {
    const dist = Math.sqrt((row - 3) ** 2 + (col - 3) ** 2);
    return { key: `${row}-${col}`, cx: 20 + col * 40, cy: 20 + row * 40, opacity: Math.max(0.04, 0.18 - dist * 0.035) };
  })
).flat();

export default function Hero() {
  const whatsappUrl = generateWhatsAppURL({ source: "hero" });
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textYRaw = useTransform(scrollYProgress, [0, 0.45], [0, shouldReduceMotion ? 0 : -16]);

  const textY = useSpring(textYRaw, { stiffness: 110, damping: 24, mass: 0.7 });

  return (
    <section ref={sectionRef} id="inicio" className="hero-bg relative pt-32 pb-16 md:pt-40 md:pb-24">
      <motion.div
        className="mx-auto max-w-5xl px-6 text-center md:text-left"
        style={{ y: textY, willChange: "transform" }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: heroEase }}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-badge-bg px-3.5 py-1.5 font-sans text-caption text-text-secondary"
        >
          <span
            className="badge-dot-pulse inline-block h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: "var(--color-success)" }}
            aria-hidden="true"
          />
          {HERO.badge}
        </motion.span>

        <motion.h1
          className="mt-7 max-w-4xl font-serif font-bold text-foreground md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: heroEase }}
          style={{
            fontSize: "var(--font-size-display)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          Tu Página Web
          <br />
          Profesional en 48 Horas
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl font-sans text-body leading-relaxed text-text-secondary md:mt-6 md:text-body-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.62, ease: heroEase }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full flex-col gap-3 sm:max-w-none sm:flex-row md:mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.52, ease: heroEase }}
        >
          <Button
            variant="primary"
            size="lg"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            ctaId="hero_primary_whatsapp"
            ctaSection="hero"
            ctaIntent="whatsapp"
            ctaLabel="Quiero mi página"
            className="btn-shimmer btn-shimmer-active hero-cta-pulse shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.18)] font-sans font-medium sm:w-auto"
          >
            Quiero mi página en 48h &rarr;
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="#catalogo"
            fullWidth
            ctaId="hero_secondary_catalog"
            ctaSection="hero"
            ctaIntent="browse_catalog"
            ctaLabel="Ver catálogo de páginas"
            className="font-sans font-medium transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Ver catálogo de páginas
          </Button>
        </motion.div>

        <motion.p
          className="mt-5 flex items-center gap-2 font-sans text-body-sm text-text-secondary justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: heroEase }}
          role="status"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          <span className="font-medium text-foreground">127</span> profesionales ya tienen su página
        </motion.p>
      </motion.div>

      {/* Abstract grid — desktop only, right side to balance left-aligned text */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.2, ease: heroEase }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {DOT_GRID.map((dot) => (
            <circle key={dot.key} cx={dot.cx} cy={dot.cy} r="2" fill="#0A0A0A" opacity={dot.opacity} />
          ))}
          {/* Geometric accent: rotated square */}
          <rect
            x="100"
            y="100"
            width="80"
            height="80"
            rx="4"
            transform="rotate(45 140 140)"
            stroke="#0A0A0A"
            strokeWidth="1"
            opacity="0.06"
            fill="none"
          />
        </svg>
      </motion.div>
    </section>
  );
}
