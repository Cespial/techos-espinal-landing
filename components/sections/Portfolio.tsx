"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TESTIMONIALS } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";

function TestimonialAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-caption font-semibold text-foreground/70"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-foreground text-foreground"
              : "fill-border text-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Portfolio() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0.08);
  const whatsappUrl = generateWhatsAppURL({ source: "testimonios" });

  const updateProgress = useCallback(() => {
    const element = cardsRef.current;
    if (!element) {
      return;
    }

    const maxScroll = element.scrollWidth - element.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(1);
      return;
    }

    setScrollProgress(element.scrollLeft / maxScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => updateProgress();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateProgress]);

  return (
    <section id="portafolio" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Páginas que ya están convirtiendo clientes"
          subtitle="Resultados reales de profesionales que ya dieron el paso."
        />

        <div
          ref={cardsRef}
          onScroll={updateProgress}
          className="portfolio-snap-track -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 touch-pan-x [scroll-padding-left:1.25rem] [scroll-padding-right:1.25rem] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
              transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              className="min-w-[85vw] max-w-[360px] snap-start rounded-[10px] border border-border bg-white p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-border-dark hover:shadow-card-hover sm:min-w-[320px] sm:p-8 md:min-w-0 md:max-w-none"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-3 font-serif text-body-lg leading-relaxed text-foreground">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <TestimonialAvatar name={testimonial.name} color={testimonial.avatarColor} />
                  <div>
                    <p className="font-sans text-body-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-body-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 md:hidden">
          <div className="h-1 w-full rounded-full bg-border/70">
            <motion.div
              className="h-full origin-left rounded-full bg-foreground"
              animate={{ scaleX: Math.max(scrollProgress, 0.08) }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              variant="primary"
              size="lg"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              ctaId="portfolio_results_whatsapp"
              ctaSection="portfolio"
              ctaIntent="whatsapp"
              className="btn-shimmer font-sans text-body-sm font-medium"
            >
              Quiero resultados así &rarr;
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
