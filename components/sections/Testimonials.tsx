"use client";

import { Star } from "lucide-react";
import {
  TESTIMONIAL_DATA,
  buildWaLinkFaq,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const LINE_LABEL_MAP: Record<ServiceLineId, string> = {
  techos: "Techos",
  pintura: "Pintura",
  plomeria: "Plomería",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div role="img" className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
          CLIENTES
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          Cada testimonio es de un cliente real en el Valle de Aburrá.
        </p>

        {/* Desktop grid, mobile horizontal scroll */}
        <div className="mt-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {TESTIMONIAL_DATA.map((testimonial) => (
              <article
                key={testimonial.id}
                className="min-w-[280px] max-w-[320px] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md md:min-w-0 md:max-w-none"
              >
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.municipality}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.date}
                    </p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    {LINE_LABEL_MAP[testimonial.serviceLine]}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Scroll indicator dots - mobile only */}
          <div className="mt-3 flex justify-center gap-1.5 md:hidden">
            {TESTIMONIAL_DATA.map((t) => (
              <span
                key={t.id}
                className="h-1.5 w-1.5 rounded-full bg-slate-300"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Tú también puedes resolver tu problema
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Escríbenos ahora y te ayudamos con la misma calidad que a nuestros clientes.
          </p>
          <a
            href={buildWaLinkFaq()}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              track("cta_whatsapp_click", { source: "testimonials" })
            }
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Escríbenos ahora
          </a>
        </div>
      </div>
    </section>
  );
}
