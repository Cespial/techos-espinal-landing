"use client";

import { ArrowRight } from "lucide-react";
import {
  SERVICE_DATA,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

type PricingRangesProps = {
  onQuoteOpen: (input: { linea: ServiceLineId; servicio?: string; source: string }) => void;
};

const PRICING_LINES: { id: ServiceLineId; label: string; topN: number }[] = [
  { id: "techos", label: "Techos y cubiertas", topN: 4 },
  { id: "pintura", label: "Pintura y acabados", topN: 4 },
  { id: "plomeria", label: "Plomeria", topN: 4 },
];

export default function PricingRanges({ onQuoteOpen }: PricingRangesProps) {
  return (
    <section id="precios" className="border-y border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Precios de referencia
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Valores base por linea de servicio. El costo final se confirma despues de la visita tecnica.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRICING_LINES.map((line) => {
            const services = SERVICE_DATA[line.id].slice(0, line.topN);

            return (
              <div
                key={line.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {line.label}
                </h3>

                <ul className="mt-4 divide-y divide-slate-200">
                  {services.map((svc) => (
                    <li
                      key={svc.id}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">{svc.name}</p>
                        <p className="text-xs text-slate-500">{svc.summary}</p>
                      </div>
                      <div className="ml-3 shrink-0 text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Desde</p>
                        <p className="text-sm font-semibold text-slate-900">{svc.basePrice}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    onQuoteOpen({ linea: line.id, source: `pricing_${line.id}` });
                    track("quote_modal_open", { source: `pricing_${line.id}`, linea: line.id });
                  }}
                  className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
                >
                  Cotizar {line.label.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs leading-relaxed text-slate-600">
            <strong>Condiciones:</strong> Los valores mostrados son bases orientativas y no constituyen una cotizacion formal. El valor final depende del area a intervenir, acceso, materiales, estado actual del sitio y resultado de la inspeccion tecnica. Todos los precios estan en COP e incluyen mano de obra. Materiales pueden o no estar incluidos segun el servicio.
          </p>
        </div>
      </div>
    </section>
  );
}
