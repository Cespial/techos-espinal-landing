"use client";

import { ArrowRight } from "lucide-react";
import { PROCESS_STEPS, buildWaLinkProcess } from "@/lib/conversion";
import { track } from "@/lib/tracking";

type HowWeWorkProps = {
  waLink: string;
};

export default function HowWeWork({ waLink }: HowWeWorkProps) {
  return (
    <section id="proceso" className="border-y border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Asi trabajamos
        </h2>
        <p className="mt-3 max-w-4xl text-sm text-slate-600 md:text-base">
          Un proceso claro, sin improvisacion: definimos prioridad, inspeccionamos, cotizamos y ejecutamos con orden.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-lg font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.detail}
              </p>
              <p className="mt-2 text-xs text-slate-500">{step.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={buildWaLinkProcess()}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_whatsapp_click", { source: "process" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
          >
            Iniciar proceso de cotizacion
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
