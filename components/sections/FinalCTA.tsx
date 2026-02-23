"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { FORM_PLAN_OPTIONS, WHATSAPP_BASE_URL } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

type FinalCTAFormValues = {
  name: string;
  whatsapp: string;
  business: string;
  plan: string;
};

const inputClass =
  "min-h-12 w-full rounded-[10px] border border-border bg-white px-4 py-3 text-[16px] font-sans text-foreground placeholder:text-text-tertiary transition-[border-color,box-shadow] duration-300 hover:border-border-dark focus:border-foreground/40 focus:shadow-[0_0_0_4px_rgba(10,10,10,0.06),0_0_20px_rgba(10,10,10,0.04)] focus-visible:outline-none focus-visible:ring-0";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [lastUrl, setLastUrl] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinalCTAFormValues>({
    defaultValues: {
      name: "",
      whatsapp: "",
      business: "",
      plan: "Profesional",
    },
  });

  const planRegister = register("plan");

  const handleNext = async () => {
    const valid = await trigger(["name", "plan"]);
    if (valid) {
      trackEvent("form_step_complete", {
        cta_id: "finalcta_step1_complete",
        cta_section: "final_cta",
        cta_intent: "form_progress",
        step: 1,
        selected_plan: getValues("plan"),
        page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      });
      setStep(2);
    }
  };

  const handleBack = () => {
    trackEvent("form_step_back", {
      cta_id: "finalcta_step_back",
      cta_section: "final_cta",
      cta_intent: "form_back",
      step: 2,
      page_path: typeof window !== "undefined" ? window.location.pathname : "/",
    });
    setStep(1);
  };

  const onSubmit = async (data: FinalCTAFormValues) => {
    const normalizedName = data.name.trim();
    const normalizedBusiness = data.business.trim();
    const normalizedPhone = data.whatsapp.replace(/\D/g, "");

    const url = generateWhatsAppURL({
      name: normalizedName,
      plan: data.plan,
      business: `${normalizedBusiness}. Mi WhatsApp es ${normalizedPhone}`,
      source: "formulario",
    });

    setLastUrl(url);

    let analyticsHref = WHATSAPP_BASE_URL;
    try {
      const parsed = new URL(url);
      analyticsHref = `${parsed.origin}${parsed.pathname}`;
    } catch {
      analyticsHref = WHATSAPP_BASE_URL;
    }

    const basePayload = {
      cta_id: "finalcta_submit_whatsapp",
      cta_section: "final_cta",
      cta_intent: "submit_whatsapp",
      cta_label: "Enviar por WhatsApp",
      destination_type: "whatsapp",
      href: analyticsHref,
      page_path: window.location.pathname,
      funnel_stage: "final_cta",
      funnel_step: 4,
    };

    trackEvent("form_submit", {
      ...basePayload,
      selected_plan: data.plan,
      business_type: normalizedBusiness.toLowerCase().slice(0, 80),
    });

    trackEvent("whatsapp_click", {
      ...basePayload,
      selected_plan: data.plan,
      source: "form_submit",
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setSubmitted(false);
    setLastUrl("");
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
          style={{ fontSize: "var(--font-size-h2)" }}
        >
          ¿Listo para tener tu página web?
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-2xl font-sans text-body leading-relaxed text-text-secondary md:text-body-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Escríbenos hoy y mañana ya tienes tu página publicada.
        </motion.p>

        <motion.div
          className="mx-auto mt-10 max-w-lg rounded-[10px] border border-border bg-white p-6 text-left shadow-lg sm:mt-12 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-badge-bg">
                <Check className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="font-sans text-h3 text-foreground">
                ¡Mensaje enviado!
              </h3>
              <p className="mt-2 font-sans text-body-sm text-text-secondary">
                Te responderemos por WhatsApp en máximo 2 horas (Lun-Vie, 8am-6pm).
              </p>
              {lastUrl && (
                <a
                  href={lastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-sans text-body-sm text-text-secondary underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  ¿No se abrió WhatsApp? Haz clic aquí
                </a>
              )}
              <button
                onClick={handleReset}
                className="mt-4 block w-full font-sans text-body-sm text-text-tertiary transition-colors hover:text-foreground"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              {/* Progress indicator */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-foreground" : "bg-border"}`} />
                  <span className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-foreground" : "bg-border"}`} />
                </div>
                <span className="font-sans text-tiny text-text-tertiary">
                  Paso {step} de 2
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="grid gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block font-sans text-caption text-text-tertiary"
                          >
                            Nombre
                          </label>
                          <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Tu nombre"
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            {...register("name", {
                              required: "El nombre es obligatorio.",
                              minLength: {
                                value: 2,
                                message: "Ingresa al menos 2 caracteres.",
                              },
                            })}
                            className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
                          />
                          {errors.name ? (
                            <p id="name-error" role="alert" className="mt-1 font-sans text-tiny text-red-600">{errors.name.message}</p>
                          ) : null}
                        </div>

                        <div>
                          <label
                            htmlFor="plan"
                            className="mb-2 block font-sans text-caption text-text-tertiary"
                          >
                            Plan
                          </label>
                          <select
                            id="plan"
                            aria-invalid={errors.plan ? "true" : "false"}
                            {...planRegister}
                            onChange={(event) => {
                              planRegister.onChange(event);
                              trackEvent("plan_select", {
                                cta_id: "finalcta_plan_select",
                                cta_section: "final_cta",
                                cta_intent: "select_plan",
                                cta_label: event.target.value,
                                destination_type: "none",
                                href: "",
                                page_path: window.location.pathname,
                                funnel_stage: "final_cta",
                                funnel_step: 4,
                                selected_plan: event.target.value,
                              });
                            }}
                            className={`${inputClass} ${errors.plan ? "border-red-400" : ""}`}
                          >
                            {FORM_PLAN_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {errors.plan ? (
                            <p id="plan-error" role="alert" className="mt-1 font-sans text-tiny text-red-600">{errors.plan.message}</p>
                          ) : null}
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        fullWidth
                        ctaId="finalcta_next_step"
                        ctaSection="final_cta"
                        ctaIntent="form_next"
                        ctaLabel="Siguiente"
                        className="btn-shimmer mt-6 font-sans font-medium"
                        onClick={handleNext}
                      >
                        Siguiente &rarr;
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="grid gap-4">
                        <div>
                          <label
                            htmlFor="whatsapp"
                            className="mb-1 block font-sans text-caption text-text-tertiary"
                          >
                            WhatsApp
                          </label>
                          <p id="whatsapp-help" className="mb-2 font-sans text-tiny text-text-tertiary">Para confirmarte en máximo 2 horas</p>
                          <input
                            id="whatsapp"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            placeholder="3001234567"
                            aria-invalid={errors.whatsapp ? "true" : "false"}
                            aria-describedby={errors.whatsapp ? "whatsapp-error whatsapp-help" : "whatsapp-help"}
                            {...register("whatsapp", {
                              required: "El WhatsApp es obligatorio.",
                              pattern: {
                                value: /^\d{7,10}$/,
                                message: "Ingresa un número de 7 a 10 dígitos.",
                              },
                            })}
                            className={`${inputClass} ${errors.whatsapp ? "border-red-400" : ""}`}
                          />
                          {errors.whatsapp ? (
                            <p id="whatsapp-error" role="alert" className="mt-1 font-sans text-tiny text-red-600">{errors.whatsapp.message}</p>
                          ) : null}
                        </div>

                        <div>
                          <label
                            htmlFor="business"
                            className="mb-2 block font-sans text-caption text-text-tertiary"
                          >
                            Tipo de negocio
                          </label>
                          <input
                            id="business"
                            type="text"
                            placeholder="Ejemplo: psicología, restaurante, abogado"
                            aria-invalid={errors.business ? "true" : "false"}
                            aria-describedby={errors.business ? "business-error" : undefined}
                            {...register("business", {
                              required: "El tipo de negocio es obligatorio.",
                            })}
                            className={`${inputClass} ${errors.business ? "border-red-400" : ""}`}
                          />
                          {errors.business ? (
                            <p id="business-error" role="alert" className="mt-1 font-sans text-tiny text-red-600">{errors.business.message}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          size="lg"
                          ctaId="finalcta_back_step"
                          ctaSection="final_cta"
                          ctaIntent="form_back"
                          ctaLabel="Atrás"
                          className="font-sans font-medium"
                          onClick={handleBack}
                        >
                          &larr; Atrás
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          fullWidth
                          ctaId="finalcta_submit_whatsapp"
                          ctaSection="final_cta"
                          ctaIntent="submit_form"
                          ctaLabel="Enviar por WhatsApp"
                          className="btn-shimmer font-sans font-medium"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Enviando..." : "Enviar por WhatsApp →"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </>
          )}
        </motion.div>

        <p className="mt-6 font-sans text-body-sm leading-relaxed text-text-secondary">
          O escríbenos directo:{" "}
          <a
            href={generateWhatsAppURL({ source: "contacto-directo" })}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="true"
            data-cta-id="finalcta_direct_whatsapp"
            data-cta-section="final_cta"
            data-cta-intent="whatsapp"
            data-cta-label="WhatsApp directo"
            className="underline underline-offset-4 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
          >
            Abrir WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
