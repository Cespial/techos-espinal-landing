"use client";

import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { PROCESS_STEPS, buildWaLinkProcess } from "@/lib/conversion";
import { track } from "@/lib/tracking";

type HowWeWorkProps = {
  waLink: string;
  telLink: string;
};

export default function HowWeWork({ waLink, telLink }: HowWeWorkProps) {
  return (
    <section id="proceso" className="border-y border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          ¿Como funciona? Es muy facil
        </h2>
        <p className="mt-3 max-w-4xl text-base text-slate-600">
          No necesitas saber nada tecnico. Solo seguir estos 4 pasos y nosotros nos encargamos del resto.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.id}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
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
            ¿Listo para empezar? Escribenos y te guiamos
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            No importa si no sabes exactamente que necesitas. Cuentanos tu problema y nosotros te decimos que servicio aplica, cuanto cuesta y cuando podemos ir.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={buildWaLinkProcess()}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_whatsapp_click", { source: "process" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a
              href={telLink}
              onClick={() => track("cta_call_click", { source: "process" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              O llamanos directo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
