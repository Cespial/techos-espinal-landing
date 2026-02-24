"use client";

import { useState } from "react";
import { ArrowRight, Droplets, MessageCircle, Paintbrush, Wrench } from "lucide-react";
import {
  LINE_OPTIONS,
  SERVICE_DATA,
  WA_BASE_URL,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

const TAB_CONFIG: {
  id: ServiceLineId;
  icon: typeof Wrench;
  shortLabel: string;
  description: string;
  activeClasses: string;
  inactiveClasses: string;
}[] = [
  {
    id: "techos",
    icon: Wrench,
    shortLabel: "Techos",
    description: "Goteras, filtraciones, canoas, impermeabilizacion y mantenimiento de cubiertas.",
    activeClasses: "border-orange-500 bg-orange-50 text-orange-800",
    inactiveClasses: "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50/50",
  },
  {
    id: "pintura",
    icon: Paintbrush,
    shortLabel: "Pintura",
    description: "Pintura interior, exterior, fachadas, resanes, estuco y retoques post-obra.",
    activeClasses: "border-cyan-500 bg-cyan-50 text-cyan-800",
    inactiveClasses: "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/50",
  },
  {
    id: "plomeria",
    icon: Droplets,
    shortLabel: "Plomeria",
    description: "Fugas, destapes, griferia, sanitarios y mantenimiento de red hidraulica.",
    activeClasses: "border-emerald-500 bg-emerald-50 text-emerald-800",
    inactiveClasses: "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50",
  },
];

function buildServiceWaLink(serviceName: string, lineLabel: string) {
  const msg = `Hola, necesito cotizar: ${serviceName} (${lineLabel}). ¿Me pueden dar precio y disponibilidad?`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<ServiceLineId>("techos");

  const activeConfig = TAB_CONFIG.find((t) => t.id === activeTab)!;
  const activeServices = SERVICE_DATA[activeTab];
  const activeLineLabel = LINE_OPTIONS.find((l) => l.id === activeTab)?.label ?? "";

  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          ¿Que necesitas resolver?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Selecciona el tipo de servicio que buscas. Te mostramos todo lo que hacemos en esa area, con precios de referencia, para que puedas cotizar directamente el que necesitas.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Tipo de servicio">
          {TAB_CONFIG.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  track("service_tab_select", { linea: tab.id });
                }}
                className={`inline-flex min-h-12 items-center gap-2.5 rounded-xl border-2 px-5 py-2.5 text-base font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${
                  isActive ? tab.activeClasses : tab.inactiveClasses
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {tab.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active tab description */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">
            {activeLineLabel}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {activeConfig.description}
          </p>
        </div>

        {/* Service list */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-label={`Servicios de ${activeLineLabel}`}
          className="mt-6"
        >
          <p className="mb-4 text-sm font-medium text-slate-500">
            {activeServices.length} servicios disponibles en {activeLineLabel.toLowerCase()}. Toca &quot;Cotizar este servicio&quot; en el que necesites y te atendemos por WhatsApp.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {activeServices.map((service) => {
              const waLink = buildServiceWaLink(service.name, activeLineLabel);

              return (
                <article
                  key={service.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {service.name}
                    </h3>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Desde
                      </p>
                      <p className="text-base font-bold text-slate-900">
                        {service.basePrice}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.summary}
                  </p>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track("cta_whatsapp_click", {
                        source: "service_item",
                        linea: activeTab,
                        servicio: service.id,
                      })
                    }
                    className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Cotizar este servicio
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        {/* Pricing disclaimer */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            ¿Como funciona el precio?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">
            Los valores que ves son precios base de referencia. El precio final depende del tamaño del trabajo, los materiales y el estado del sitio. Por eso primero hacemos una visita tecnica gratuita para darte un precio exacto y sin sorpresas.
          </p>
        </div>
      </div>
    </section>
  );
}
