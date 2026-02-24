"use client";

import { FormEvent, useState } from "react";
import { Phone, X } from "lucide-react";
import {
  buildTelLink,
  buildWaLink,
  LINE_OPTIONS,
  MUNICIPALITY_OPTIONS,
  SERVICE_DATA,
  URGENCY_OPTIONS,
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

type QuoteModalState = {
  nombre: string;
  telefono: string;
  municipio: string;
  linea: ServiceLineId;
  servicio: string;
  urgencia: string;
};

type QuoteModalProps = {
  initialLinea: ServiceLineId;
  initialServicio?: string;
  initialMunicipio?: string;
  onClose: () => void;
};

function normalizePhoneInput(value: string) {
  return value.replace(/[^\d+\s()-]/g, "");
}

function hasValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export default function QuoteModal({
  initialLinea,
  initialServicio,
  initialMunicipio,
  onClose,
}: QuoteModalProps) {
  const telLink = buildTelLink();
  const [formError, setFormError] = useState("");
  const [showCallFallback, setShowCallFallback] = useState(false);
  const [state, setState] = useState<QuoteModalState>({
    nombre: "",
    telefono: "",
    municipio: initialMunicipio || "Medellin",
    linea: initialLinea,
    servicio: initialServicio || SERVICE_DATA[initialLinea][0].name,
    urgencia: "Solo cotizacion",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedPhone = state.telefono.trim();

    if (sanitizedPhone && !hasValidPhone(sanitizedPhone)) {
      setFormError("Revisa el telefono. Usa formato de 10 a 13 digitos.");
      return;
    }

    setFormError("");
    setShowCallFallback(false);

    track("form_submit", {
      source: "quote_modal",
      linea: state.linea,
      servicio: state.servicio,
      municipio: state.municipio,
      urgencia: state.urgencia,
    });

    const waLink = buildWaLink({
      linea: state.linea,
      servicio: state.servicio,
      municipio: state.municipio,
      urgencia: state.urgencia,
      nombre: state.nombre,
      telefono: sanitizedPhone,
    });

    track("cta_whatsapp_click", {
      source: "modal",
      linea: state.linea,
      servicio: state.servicio,
    });

    const popup = window.open(waLink, "_blank", "noopener,noreferrer");

    if (!popup) {
      setShowCallFallback(true);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/55 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Modal de cotizacion"
        className="mx-auto mt-20 max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
              Cotizacion rapida
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">
              Cotizar por linea
            </h3>
          </div>
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={() => {
              setFormError("");
              onClose();
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Nombre
              <input
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                value={state.nombre}
                onChange={(e) => setState((prev) => ({ ...prev, nombre: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Telefono
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="300 000 0000"
                pattern="[0-9+()\\-\\s]{10,18}"
                value={state.telefono}
                onChange={(e) => {
                  setFormError("");
                  setState((prev) => ({
                    ...prev,
                    telefono: normalizePhoneInput(e.target.value),
                  }));
                }}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Linea
              <select
                value={state.linea}
                onChange={(e) => {
                  const nextLine = e.target.value as ServiceLineId;
                  setState((prev) => ({
                    ...prev,
                    linea: nextLine,
                    servicio: SERVICE_DATA[nextLine][0].name,
                  }));
                }}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                {LINE_OPTIONS.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Servicio
              <select
                value={state.servicio}
                onChange={(e) => setState((prev) => ({ ...prev, servicio: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                {SERVICE_DATA[state.linea].map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Municipio
              <select
                value={state.municipio}
                onChange={(e) => setState((prev) => ({ ...prev, municipio: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                {MUNICIPALITY_OPTIONS.map((municipio) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Urgencia
              <select
                value={state.urgencia}
                onChange={(e) => setState((prev) => ({ ...prev, urgencia: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                {URGENCY_OPTIONS.map((urgency) => (
                  <option key={urgency} value={urgency}>
                    {urgency}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
            </button>
            <a
              href={telLink}
              onClick={() => track("cta_call_click", { source: "modal" })}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-900 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Sujeto a inspeccion tecnica y condiciones del sitio.
          </p>

          {formError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {formError}
            </p>
          ) : null}

          {showCallFallback ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Si WhatsApp no se abrio, usa la llamada directa para continuar.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
