"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Clock, CloudSun, Droplets, Thermometer, Zap, AlertTriangle } from "lucide-react";

const CoverageMap = dynamic(() => import("@/components/sections/CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-500 md:h-[420px]">
      Cargando mapa...
    </div>
  ),
});
import {
  MUNICIPALITY_OPTIONS,
  buildWaLinkCoverage,
  buildWaLinkEmergency,
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
}: CoverageAvailabilityProps) {
  const [mapVisible, setMapVisible] = useState(false);
  const mapSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const otherMunicipalities = MUNICIPALITY_OPTIONS.filter(
    (m) => m !== "Otro" && m !== selectedMunicipality,
  );

  return (
    <section id="cobertura" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
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
          <div ref={mapSentinelRef} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Mapa operativo Valle de Aburrá
              </p>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                {selectedMunicipality}
              </span>
            </div>
            {mapVisible ? (
              <CoverageMap
                selectedMunicipality={selectedMunicipality}
                onMunicipalitySelect={(municipio) => onSelect(municipio, "mapbox")}
              />
            ) : (
              <div className="flex h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-500 md:h-[420px]">
                Cargando mapa...
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Municipio seleccionado</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedMunicipality}</p>
              <p className="mt-2 text-sm text-slate-600">
                Sí, atendemos en {selectedMunicipality}. Agenda tu visita técnica gratis.
              </p>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
                <li className="flex items-center gap-3 text-sm">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                  <a
                    href={buildWaLinkEmergency()}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("cta_whatsapp_click", { source: "emergency" })}
                    className="font-semibold text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
                  >
                    Urgencias: escríbenos por WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Weather */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
              <p className="text-sm font-semibold text-slate-900">Condiciones actuales</p>
              <div className="transition-opacity duration-300">
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
            </div>

            {/* Municipality chips - 44px touch target */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Otros municipios
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {otherMunicipalities.map((municipio) => (
                  <button
                    key={municipio}
                    type="button"
                    onClick={() => onSelect(municipio, "chip")}
                    className="min-h-[44px] rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out hover:border-orange-200 active:scale-[0.98]"
                  >
                    {municipio}
                  </button>
                ))}
              </div>
            </div>

            {/* Single merged CTA */}
            <a
              href={buildWaLinkCoverage(selectedMunicipality)}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("cta_whatsapp_click", { source: "coverage", municipio: selectedMunicipality })
              }
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Agendar visita en {selectedMunicipality}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
