"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PLANS, PLAN_COMPARISON_FEATURES } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";

export default function Plans() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });
  const glowInView = useInView(cardsRef, { amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const planIdMap: Record<string, string> = {
    Básico: "plans_basic_whatsapp",
    Profesional: "plans_professional_whatsapp",
    Premium: "plans_premium_whatsapp",
  };

  return (
    <section id="planes" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Planes claros, sin letra pequeña"
          subtitle="Pagas una vez y te entregamos una página lista para trabajar por tu negocio."
        />

        <div ref={cardsRef} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3 lg:gap-6">
          {PLANS.map((plan, index) => {
            const whatsappUrl = generateWhatsAppURL({ plan: plan.name, source: "planes" });
            const isProfessional = plan.popular;
            const delay = isProfessional ? 0.1 : 0.28 + (index === 0 ? 0.06 : 0.14);

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 42, scale: 0.96 }}
                animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 42, scale: 0.96 }}
                transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className={`relative order-none rounded-[10px] bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out sm:p-8 ${
                  isProfessional
                    ? "order-first border-2 border-foreground shadow-lg md:order-none"
                    : "border border-border shadow-card hover:border-border-dark hover:shadow-card-hover"
                }`}
              >
                {isProfessional && (
                  <span
                    className={`pointer-events-none absolute -inset-3 -z-10 rounded-[18px] bg-foreground/6 blur-2xl ${
                      glowInView ? "plan-professional-glow" : ""
                    }`}
                  />
                )}

                {isProfessional && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 font-sans text-caption text-white">
                    Más popular
                  </span>
                )}

                <h3 className="font-sans text-h3 text-foreground">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <p
                    className="whitespace-nowrap font-serif font-semibold text-foreground"
                    style={{
                      fontSize: "var(--font-size-price)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ${plan.price}
                  </p>
                  <span className="font-sans text-tiny text-text-tertiary">COP</span>
                </div>
                <p className="mt-1 font-sans text-body-sm text-text-secondary">
                  Pago único <span className="text-text-tertiary">· Sin cuota mensual</span>
                </p>
                {plan.priceNote && (
                  <p className="mt-1 font-sans text-tiny text-text-tertiary">
                    {plan.priceNote}
                  </p>
                )}

                <p className="mt-3 font-sans text-body leading-relaxed text-text-secondary">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 font-sans text-body-sm leading-relaxed text-foreground/80"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isProfessional ? "primary" : "secondary"}
                  size="lg"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  ctaId={planIdMap[plan.name] || "plans_unknown_whatsapp"}
                  ctaSection="plans"
                  ctaIntent="whatsapp"
                  className={`mt-8 font-sans text-body-sm font-medium ${isProfessional ? "btn-shimmer" : ""}`}
                >
                  {plan.cta}
                </Button>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-6 text-center font-sans text-tiny text-text-tertiary">
          Todos los precios en pesos colombianos (COP). IVA incluido.
        </p>
        <p className="mt-2 text-center font-sans text-body-sm text-text-secondary">
          <a
            href={generateWhatsAppURL({ source: "planes-custom" })}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="true"
            data-cta-id="plans_custom_whatsapp"
            data-cta-section="plans"
            data-cta-intent="whatsapp"
            className="underline underline-offset-4 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
          >
            ¿Necesitas algo diferente? Escríbenos &rarr;
          </a>
        </p>

        <div className="mt-12 hidden md:block">
          <div className="overflow-hidden rounded-[10px] border border-border">
            <table className="w-full text-left font-sans text-body-sm">
              <thead>
                <tr className="border-b border-border bg-badge-bg">
                  <th className="px-5 py-3 font-medium text-text-secondary">Característica</th>
                  <th className="px-5 py-3 text-center font-medium text-text-secondary">Básico</th>
                  <th className="px-5 py-3 text-center font-medium text-text-secondary bg-foreground/[0.02]">Profesional</th>
                  <th className="px-5 py-3 text-center font-medium text-text-secondary">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PLAN_COMPARISON_FEATURES.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-5 py-3 text-foreground">{row.feature}</td>
                    {(["basic", "professional", "premium"] as const).map((plan) => {
                      const val = row[plan];
                      return (
                        <td
                          key={plan}
                          className={`px-5 py-3 text-center ${plan === "professional" ? "bg-foreground/[0.02]" : ""}`}
                        >
                          {val === true ? (
                            <Check className="mx-auto h-4 w-4 text-foreground" />
                          ) : val === false ? (
                            <Minus className="mx-auto h-4 w-4 text-border-dark" />
                          ) : (
                            <span className="text-foreground">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
