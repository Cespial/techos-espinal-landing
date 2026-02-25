"use client";

import { useState } from "react";
import { Droplets, Info, Paintbrush, Wrench } from "lucide-react";
import {
  LINE_OPTIONS,
  LINE_STORY,
  SERVICE_DATA,
  WA_BASE_URL,
  buildWaLinkHero,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

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
    description: "Goteras, techos que filtran, canales tapados.",
    activeClasses: "border-orange-500 bg-orange-50 text-orange-800",
    inactiveClasses: "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50/50",
  },
  {
    id: "pintura",
    icon: Paintbrush,
    shortLabel: "Pintura",
    description: "Pintar paredes, fachadas, arreglar grietas.",
    activeClasses: "border-cyan-500 bg-cyan-50 text-cyan-800",
    inactiveClasses: "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/50",
  },
  {
    id: "plomeria",
    icon: Droplets,
    shortLabel: "Plomería",
    description: "Fugas de agua, desagües tapados, llaves dañadas.",
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
  const activeStory = LINE_STORY[activeTab];

  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
          NUESTROS SERVICIOS
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          ¿Qué necesitas arreglar?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Toca el botón del servicio que necesitas para ver opciones y precios. Si no sabes cuál elegir, escríbenos y te ayudamos.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Selección de tipo de servicio">
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
                className={`inline-flex min-h-12 items-center gap-2.5 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out active:scale-[0.98] sm:text-base ${
                  isActive ? tab.activeClasses : tab.inactiveClasses
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {tab.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Escape hatch - "¿No sabes qué necesitas?" */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">
            ¿No sabes exactamente qué necesitas?
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Cuéntanos tu problema por WhatsApp y te decimos cuál servicio aplica.
          </p>
          <a
            href={buildWaLinkHero()}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_whatsapp_click", { source: "service_escape_hatch" })}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#15803d]/10 px-4 py-2.5 text-sm font-semibold text-[#166534] transition-colors hover:bg-[#15803d] hover:text-white focus-visible:ring-2 focus-visible:ring-[#15803d]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Describir mi problema
          </a>
        </div>

        {/* Active tab description + story bullets */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">
            {activeLineLabel}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {activeConfig.description}
          </p>
          <ul className="mt-3 space-y-1">
            {activeStory.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing disclaimer - BEFORE the grid */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-900">Precios base de referencia.</strong>{" "}
              El valor final se confirma con una visita técnica gratuita — sin compromiso ni sorpresas.
            </p>
          </div>
        </div>

        {/* Service list */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-label={`Servicios de ${activeLineLabel}`}
          className="mt-6"
        >
          <p className="mb-4 text-sm font-medium text-slate-500">
            {activeServices.length} servicios disponibles en {activeLineLabel.toLowerCase()}.
          </p>

          <div key={activeTab} className="grid gap-4 sm:grid-cols-2">
            {activeServices.map((service, index) => {
              const waLink = buildServiceWaLink(service.name, activeLineLabel);

              return (
                <article
                  key={service.id}
                  className="animate-fade-up flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {service.name}
                    </h3>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
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
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border-2 border-[#15803d] bg-[#15803d]/10 px-4 text-sm font-semibold text-[#166534] transition-all duration-300 ease-out hover:bg-[#15803d] hover:text-white focus-visible:ring-2 focus-visible:ring-[#15803d] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Cotizar esto
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
