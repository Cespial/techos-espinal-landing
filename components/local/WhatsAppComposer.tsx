"use client";

import { useState, type FormEvent } from "react";
import { LINE_OPTIONS, buildWaLink, type ServiceLineId } from "@/lib/conversion";
import { OWNER } from "@/lib/owner";
import { trackWhatsApp, type PageType } from "@/lib/tracking";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { lineIcon } from "@/lib/illustrations";

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
      setError("Cuéntanos en una frase qué pasa, así te respondemos con más precisión.");
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
          Cuéntanos tu problema
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Escribe aquí y el mensaje se abre en WhatsApp listo para enviar. Te responde el equipo de {OWNER.givenName}.
        </p>
        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800 sm:col-span-2">
            Tu nombre (opcional)
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="given-name"
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-slate-900"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-slate-800">¿De qué se trata?</legend>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {LINE_OPTIONS.map((l) => {
                const active = linea === l.id;
                return (
                  <label
                    key={l.id}
                    className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                      active ? "border-slate-900 text-slate-900" : "border-slate-300 text-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="linea"
                      value={l.id}
                      checked={active}
                      onChange={() => setLinea(l.id)}
                      className="sr-only"
                    />
                    <Image src={lineIcon(l.id)} alt="" width={32} height={32} className="h-8 w-8 shrink-0 mix-blend-multiply" aria-hidden="true" />
                    <span className="leading-tight">{l.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800 sm:col-span-2">
            ¿Qué pasa?
            <textarea
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              rows={3}
              placeholder="Ejemplo: se moja la pared del cuarto cuando llueve; casa de dos pisos en Envigado."
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "composer-error" : undefined}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-slate-900"
            />
            {error && (
              <span id="composer-error" role="alert" className="text-sm text-red-700">
                {error}
              </span>
            )}
          </label>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-wa px-6 text-base font-semibold text-white transition-colors hover:bg-wa-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Abrir en WhatsApp
            </button>
            <p className="text-sm text-slate-600">Si puedes, manda una foto del problema por el mismo chat.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
