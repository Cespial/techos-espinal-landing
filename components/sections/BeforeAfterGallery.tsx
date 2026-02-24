"use client";

import { Camera } from "lucide-react";
import { BEFORE_AFTER_ITEMS } from "@/lib/conversion";

export default function BeforeAfterGallery() {
  return (
    <section id="galeria" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Evidencia de trabajos
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Resultados reales en hogares y negocios del Valle de Aburra. Fotos de casos atendidos por nuestro equipo.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE_AFTER_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Placeholder before/after area */}
              <div className="grid grid-cols-2">
                <div className="flex h-36 flex-col items-center justify-center bg-slate-100">
                  <Camera className="h-8 w-8 text-slate-300" aria-hidden="true" />
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Antes
                  </span>
                </div>
                <div className="flex h-36 flex-col items-center justify-center bg-slate-50">
                  <Camera className="h-8 w-8 text-slate-300" aria-hidden="true" />
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Despues
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.location} · {item.linea === "techos" ? "Techos" : item.linea === "pintura" ? "Pintura" : "Plomeria"}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Fotos de referencia. Resultados varian segun condiciones del sitio.
        </p>
      </div>
    </section>
  );
}
