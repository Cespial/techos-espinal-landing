"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, CheckCircle2, Phone, RotateCcw } from "lucide-react";
import {
  buildWaLinkAppointment,
  LINE_OPTIONS,
  MUNICIPALITY_OPTIONS,
  PHONE_DISPLAY,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const HORARIO_OPTIONS = [
  "Mañana (7am-12pm)",
  "Tarde (12pm-6pm)",
  "Cualquier horario",
] as const;

function normalizePhoneInput(value: string) {
  return value.replace(/[^\d+\s()-]/g, "");
}

function hasValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

function getTodayString() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function getMaxDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

type AppointmentSchedulerProps = {
  telLink: string;
};

export default function AppointmentScheduler({ telLink }: AppointmentSchedulerProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [municipio, setMunicipio] = useState("Medellín");
  const [linea, setLinea] = useState("Techos y cubiertas");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState<string>(HORARIO_OPTIONS[0]);
  const [descripcion, setDescripcion] = useState("");
  const [formError, setFormError] = useState("");
  const [showCallFallback, setShowCallFallback] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setShowCallFallback(false);

    if (!nombre.trim()) {
      setFormError("Por favor escribe tu nombre.");
      return;
    }

    if (!telefono.trim() || !hasValidPhone(telefono)) {
      setFormError("Revisa el teléfono. Usa formato de 10 a 13 dígitos.");
      return;
    }

    if (!fecha) {
      setFormError("Selecciona una fecha preferida para la visita.");
      return;
    }

    track("form_submit", {
      source: "appointment_scheduler",
      municipio,
      linea,
      horario,
    });

    const waLink = buildWaLinkAppointment({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      municipio,
      linea,
      fecha,
      horario,
      descripcion: descripcion.trim() || undefined,
    });

    track("cta_whatsapp_click", { source: "appointment_scheduler" });

    const popup = window.open(waLink, "_blank", "noopener,noreferrer");

    if (!popup) {
      setShowCallFallback(true);
    } else {
      setFormSubmitted(true);
    }
  };

  const hasNombreError = formError.includes("nombre");
  const hasTelefonoError = formError.includes("teléfono") || formError.includes("Revisa");
  const hasFechaError = formError.includes("fecha");

  return (
    <section id="agendar" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
          AGENDAR
        </p>
        <div className="mt-4 rounded-2xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 text-white">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Agenda tu visita técnica gratis
              </h2>
            </div>
          </div>
          <p className="mt-3 text-base text-slate-600">
            Llena este formulario y te confirmamos disponibilidad por WhatsApp. No tiene costo.
          </p>

          {formSubmitted ? (
            <div className="mt-8 flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-slate-900">
                ¡Listo! Se abrió WhatsApp
              </h3>
              <p className="max-w-md text-base text-slate-600">
                Envía el mensaje y te confirmamos en menos de 2 horas.
              </p>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                También puedes llamarnos al {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Enviar otro formulario
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Nombre *
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={nombre}
                    aria-required="true"
                    aria-invalid={hasNombreError || undefined}
                    onChange={(e) => {
                      setFormError("");
                      setNombre(e.target.value);
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Teléfono *
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="300 000 0000"
                    value={telefono}
                    aria-required="true"
                    aria-invalid={hasTelefonoError || undefined}
                    onChange={(e) => {
                      setFormError("");
                      setTelefono(normalizePhoneInput(e.target.value));
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Municipio *
                  <select
                    value={municipio}
                    aria-required="true"
                    onChange={(e) => setMunicipio(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    {MUNICIPALITY_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Tipo de servicio *
                  <select
                    value={linea}
                    aria-required="true"
                    onChange={(e) => setLinea(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    {LINE_OPTIONS.map((l) => (
                      <option key={l.id} value={l.label}>{l.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Fecha preferida *
                  <input
                    type="date"
                    min={getTodayString()}
                    max={getMaxDateString()}
                    value={fecha}
                    aria-required="true"
                    aria-invalid={hasFechaError || undefined}
                    onChange={(e) => {
                      setFormError("");
                      setFecha(e.target.value);
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Horario preferido
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    {HORARIO_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Descripción breve del problema (opcional)
                <textarea
                  placeholder="Cuéntanos brevemente qué necesitas resolver..."
                  maxLength={200}
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <span className="mt-1 block text-right text-xs text-slate-400">
                  {descripcion.length}/200
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Agendar por WhatsApp
                </button>
                <a
                  href={telLink}
                  onClick={() => track("cta_call_click", { source: "appointment_scheduler" })}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  O llámanos directo
                </a>
              </div>

              <p className="text-xs text-slate-500">
                Sujeto a disponibilidad. Te confirmamos en menos de 2 horas.
              </p>

              {formError ? (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {formError}
                </p>
              ) : null}

              {showCallFallback ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
                >
                  <p>Si WhatsApp no se abrió, puedes:</p>
                  <ul className="mt-1 list-disc pl-4">
                    <li>
                      <a href={buildWaLinkAppointment({ nombre: nombre.trim(), telefono: telefono.trim(), municipio, linea, fecha, horario, descripcion: descripcion.trim() || undefined })} className="underline">
                        Abrir enlace de WhatsApp directamente
                      </a>
                    </li>
                    <li>
                      <a href={telLink} className="underline">Llamar al {PHONE_DISPLAY}</a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
