"use client";

import { useState, type FormEvent } from "react";
import { LINE_OPTIONS, buildWaLink, type ServiceLineId } from "@/lib/conversion";
import { OWNER } from "@/lib/owner";
import { trackWhatsApp, type PageType } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = { pageType: PageType; municipio?: string };

/** Redacta el mensaje de WhatsApp por el cliente: tres campos y se abre el chat. */
export default function WhatsAppComposer({ pageType, municipio }: Props) {
  const [nombre, setNombre] = useState("");
  const [linea, setLinea] = useState<ServiceLineId>("techos");
  const [problema, setProblema] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!problema.trim()) {
      setError("Cuéntame en una frase qué pasa, así te respondo con más precisión.");
      return;
    }
    setError("");
    const context = `${nombre.trim() ? `soy ${nombre.trim()}. ` : ""}${problema.trim()}`;
    trackWhatsApp({ source: "composer", page_type: pageType, linea, municipio: municipio ?? "general" });
    window.location.href = buildWaLink({ intent: "composer", linea, municipio, context });
  };

  return (
    <section id="contacto" className="border-t border-slate-200 bg-slate-50 py-16 md:py-24" aria-labelledby="composer-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="composer-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Cuéntame tu problema
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Escribe aquí y el mensaje se abre en WhatsApp listo para enviármelo. Te respondo yo, {OWNER.givenName}.
        </p>
        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Tu nombre (opcional)
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="given-name"
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-slate-900 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            ¿De qué se trata?
            <select
              value={linea}
              onChange={(e) => setLinea(e.target.value as ServiceLineId)}
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-slate-900 focus:outline-none"
            >
              {LINE_OPTIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800 sm:col-span-2">
            ¿Qué pasa?
            <textarea
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              rows={3}
              placeholder="Ejemplo: gotea el techo del cuarto cuando llueve fuerte."
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "composer-error" : undefined}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            {error && (
              <span id="composer-error" role="alert" className="text-sm text-red-700">
                {error}
              </span>
            )}
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-colors hover:bg-[#166d34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Abrir en WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
