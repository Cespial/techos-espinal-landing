"use client";

import { ArrowRight, Droplets, Paintbrush, Wrench } from "lucide-react";
import {
  LINE_STORY,
  SERVICE_DATA,
  buildWaLinkTechos,
  buildWaLinkPintura,
  buildWaLinkPlomeria,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

type ServiceColumnsProps = {
  onQuoteOpen: (input: { linea: ServiceLineId; servicio?: string; source: string }) => void;
};

const COLUMNS: {
  id: ServiceLineId;
  icon: typeof Wrench;
  color: string;
  bgColor: string;
  borderColor: string;
  buildLink: () => string;
}[] = [
  {
    id: "techos",
    icon: Wrench,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    buildLink: buildWaLinkTechos,
  },
  {
    id: "pintura",
    icon: Paintbrush,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    buildLink: buildWaLinkPintura,
  },
  {
    id: "plomeria",
    icon: Droplets,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    buildLink: buildWaLinkPlomeria,
  },
];

export default function ServiceColumns({ onQuoteOpen }: ServiceColumnsProps) {
  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Nuestros servicios
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Tres lineas especializadas para hogares y negocios en Medellin y el Valle de Aburra.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {COLUMNS.map((col) => {
            const Icon = col.icon;
            const story = LINE_STORY[col.id];
            const services = SERVICE_DATA[col.id];
            const topServices = services.slice(0, 4);

            return (
              <article
                key={col.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Placeholder photo area */}
                <div className={`flex h-40 items-center justify-center rounded-t-2xl ${col.bgColor}`}>
                  <Icon className={`h-12 w-12 ${col.color} opacity-40`} aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className={`inline-flex w-fit items-center gap-2 rounded-full ${col.bgColor} ${col.borderColor} border px-3 py-1 text-xs font-semibold ${col.color}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {story.title.split(" ").slice(0, 3).join(" ")}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {story.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                    {story.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">
                      Servicios destacados
                    </p>
                    <ul className="mt-2 space-y-1">
                      {topServices.map((svc) => (
                        <li key={svc.id} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{svc.name}</span>
                          <span className="text-xs font-semibold text-slate-500">
                            desde {svc.basePrice.replace(" COP", "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col gap-2 pt-5">
                    <a
                      href={col.buildLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        track("cta_whatsapp_click", { source: `service_card_${col.id}` })
                      }
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
                    >
                      Cotizar por WhatsApp
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        onQuoteOpen({ linea: col.id, source: `service_card_${col.id}` });
                        track("quote_modal_open", { source: `service_card_${col.id}`, linea: col.id });
                      }}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
                    >
                      Ver todos los servicios
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Valores base. El costo final depende del area, acceso, materiales y estado actual del sitio. Sujeto a inspeccion tecnica.
        </p>
      </div>
    </section>
  );
}
