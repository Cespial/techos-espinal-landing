"use client";

import { useState } from "react";
import { ArrowRight, Droplets, Paintbrush, Wrench } from "lucide-react";
import {
  LINE_OPTIONS,
  LINE_STORY,
  SERVICE_DATA,
  WA_BASE_URL,
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
    description: "Goteras, filtraciones, canoas, impermeabilización y mantenimiento de cubiertas.",
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
    shortLabel: "Plomería",
    description: "Fugas, destapes, grifería, sanitarios y mantenimiento de red hidráulica.",
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
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
          NUESTROS SERVICIOS
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Nuestros servicios — elige el que necesitas
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Tenemos tres áreas de servicio. Elige una pestaña para ver todos los servicios disponibles con precios de referencia. Puedes cotizar cualquiera directamente.
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

        {/* Service list */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-label={`Servicios de ${activeLineLabel}`}
          className="mt-6"
        >
          <p className="mb-4 text-sm font-medium text-slate-500">
            {activeServices.length} servicios disponibles en {activeLineLabel.toLowerCase()}. Toca &quot;Pedir cotización de esto&quot; en el que necesites y te atendemos por WhatsApp.
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
                    className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Pedir cotización de esto
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
            ¿Cómo funciona el precio?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">
            Los valores que ves son precios base de referencia. El precio final depende del tamaño del trabajo, los materiales y el estado del sitio. Por eso primero hacemos una visita técnica gratuita para darte un precio exacto y sin sorpresas.
          </p>
        </div>
      </div>
    </section>
  );
}
