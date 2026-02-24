"use client";

import { CloudSun, Droplets, Thermometer } from "lucide-react";
import CoverageMap from "@/components/sections/CoverageMap";
import {
  COVERAGE_SCHEDULE,
  MUNICIPALITY_OPTIONS,
  buildWaLinkCoverage,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

type WeatherSnapshot = {
  municipality: string;
  temperature: number;
  feelsLike: number;
  humidity: number | null;
  description: string;
  updatedAt: string;
};

type CoverageAvailabilityProps = {
  selectedMunicipality: string;
  onSelect: (municipio: string, source: "mapa" | "chip" | "mapbox") => void;
  weather: WeatherSnapshot | null;
  weatherStatus: "idle" | "loading" | "ready" | "error";
  waLink: string;
};

export default function CoverageAvailability({
  selectedMunicipality,
  onSelect,
  weather,
  weatherStatus,
  waLink,
}: CoverageAvailabilityProps) {
  const otherMunicipalities = MUNICIPALITY_OPTIONS.filter(
    (m) => m !== "Otro" && m !== selectedMunicipality,
  );

  return (
    <section id="cobertura" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Cobertura y disponibilidad
        </h2>
        <p className="mt-3 text-sm text-slate-600 md:text-base">
          Atendemos hogares y negocios en Medellin, Valle de Aburra y municipios cercanos de Antioquia segun disponibilidad operativa.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Map */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Mapa operativo Valle de Aburra
              </p>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                {selectedMunicipality}
              </span>
            </div>
            <CoverageMap
              selectedMunicipality={selectedMunicipality}
              onMunicipalitySelect={(municipio) => onSelect(municipio, "mapbox")}
            />
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Municipio seleccionado</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedMunicipality}</p>
              <p className="mt-2 text-sm text-slate-600">
                Confirma por WhatsApp disponibilidad de ruta para visita tecnica en {selectedMunicipality}.
              </p>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Horario y disponibilidad</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>{COVERAGE_SCHEDULE.hours}</li>
                <li>{COVERAGE_SCHEDULE.responseTime}</li>
                <li className="text-xs text-slate-500">{COVERAGE_SCHEDULE.urgencyNote}</li>
              </ul>
            </div>

            {/* Weather */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5" aria-live="polite">
              <p className="text-sm font-semibold text-slate-900">Condiciones actuales</p>
              {weatherStatus === "loading" ? (
                <p className="mt-2 text-sm text-slate-600">Consultando clima en {selectedMunicipality}...</p>
              ) : null}

              {weatherStatus === "ready" && weather ? (
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="inline-flex items-center gap-2 text-slate-900">
                    <CloudSun className="h-4 w-4 text-orange-500" aria-hidden="true" />
                    {weather.description || "Condicion estable"}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" aria-hidden="true" />
                    {weather.temperature}°C (sensacion {weather.feelsLike}°C)
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-sky-500" aria-hidden="true" />
                    Humedad: {weather.humidity ?? "--"}%
                  </p>
                </div>
              ) : null}

              {weatherStatus === "error" ? (
                <p className="mt-2 text-sm text-slate-600">
                  Clima no disponible. Podemos coordinar visita igual por WhatsApp.
                </p>
              ) : null}
            </div>

            {/* Municipality chips */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                Otros municipios
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {otherMunicipalities.map((municipio) => (
                  <button
                    key={municipio}
                    type="button"
                    onClick={() => onSelect(municipio, "chip")}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 ease-out hover:border-orange-200 active:scale-[0.98]"
                  >
                    {municipio}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={buildWaLinkCoverage(selectedMunicipality)}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("cta_whatsapp_click", { source: "coverage", municipio: selectedMunicipality })
              }
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Confirmar cobertura en {selectedMunicipality}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
