"use client";

import { PROCESS_STEPS, buildWaLinkProcess } from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function HowWeWork() {
  return (
    <section id="proceso" className="border-y border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
          PROCESO
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Así de fácil es el proceso
        </h2>
        <p className="mt-3 max-w-4xl text-base text-slate-600">
          No necesitas saber nada técnico. Solo seguir estos 4 pasos y nosotros nos encargamos del resto.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.id}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              {/* Connector line between steps */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute -right-3 top-[30px] hidden h-0 w-6 border-t-2 border-dashed border-orange-200 lg:block" aria-hidden="true" />
              )}
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 text-xl font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.detail}
              </p>
              <p className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-800">
                {step.note}
              </p>
            </article>
          ))}
        </div>

        {/* Clear CTA block */}
        <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center md:p-8">
          <p className="text-lg font-semibold text-slate-900 md:text-xl">
            ¿Tienes un problema? Cuéntanos y te ayudamos
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            No importa si no sabes exactamente qué necesitas. Cuéntanos tu problema y nosotros te decimos qué servicio aplica, cuánto cuesta y cuándo podemos ir. Respuesta en menos de 2 horas en horario laboral.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={buildWaLinkProcess()}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_whatsapp_click", { source: "process" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
