"use client";

import { Clock, CloudSun, Droplets, Thermometer, Zap, AlertTriangle } from "lucide-react";
import CoverageMap from "@/components/sections/CoverageMap";
import {
  MUNICIPALITY_OPTIONS,
  buildWaLinkCoverage,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

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
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
          COBERTURA
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          ¿Dónde atendemos?
        </h2>
        <p className="mt-3 text-sm text-slate-600 md:text-base">
          Cubrimos Medellín y todo el Valle de Aburrá. Selecciona tu municipio para confirmar disponibilidad y agendar una visita.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Map */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Mapa operativo Valle de Aburrá
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
                Sí, atendemos en {selectedMunicipality}. Agenda tu visita técnica gratis.
              </p>
            </div>

            {/* Schedule - timeline visual */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Horario y disponibilidad</p>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  Lunes a sábado: 7:00 a.m. - 6:00 p.m.
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Zap className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  Respuesta en menos de 2 horas
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  Urgencias: escríbenos por WhatsApp
                </li>
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
                    {weather.description || "Condición estable"}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" aria-hidden="true" />
                    {weather.temperature}°C (sensación {weather.feelsLike}°C)
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

            {/* CTAs */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="#agendar"
                onClick={() =>
                  track("cta_agendar_click", { source: "coverage", municipio: selectedMunicipality })
                }
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.98]"
              >
                Agendar visita en {selectedMunicipality}
              </a>
              <a
                href={buildWaLinkCoverage(selectedMunicipality)}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("cta_whatsapp_click", { source: "coverage", municipio: selectedMunicipality })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 text-base font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
