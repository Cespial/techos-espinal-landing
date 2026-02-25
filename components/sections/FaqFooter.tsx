"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import {
  COMPANY_NAME,
  FAQ_ITEMS,
  PHONE_DISPLAY,
  SITE_URL,
  buildWaLinkFaq,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FaqFooterProps = {
  waLink: string;
  telLink: string;
};

export default function FaqFooter({ waLink, telLink }: FaqFooterProps) {
  return (
    <>
      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Si tu pregunta no está aquí, escríbenos y te respondemos rápido.
          </p>

          <div className="mt-8 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-slate-50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-slate-900 transition-all duration-300 ease-out hover:bg-white">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                  {item.ctaText && (
                    <a
                      href={buildWaLinkFaq()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track("cta_whatsapp_click", { source: item.ctaSource ?? "faq_inline" })}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#15803d]/10 px-3 py-2 text-sm font-semibold text-[#166534] transition-colors hover:bg-[#15803d] hover:text-white focus-visible:ring-2 focus-visible:ring-[#15803d]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {item.ctaText}
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>

          {/* Final CTA - keep dual here (last contact point) */}
          <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center md:p-8">
            <p className="text-xl font-semibold text-slate-900">
              ¿Listo para resolver tu problema?
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              No dejes que se haga más grande. Escríbenos ahora y te ayudamos a resolverlo. La cotización no tiene costo.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={buildWaLinkFaq()}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "faq_final" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir cotización gratis
              </a>
              <a
                href={telLink}
                onClick={() => track("cta_call_click", { source: "faq_final" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Image src="/logo-espinal.svg" alt="Espinal Multiservicios" width={28} height={28} />
                <p className="text-lg font-semibold">{COMPANY_NAME}</p>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Techos, pintura y plomería para casas y negocios en Medellín y el Valle de Aburrá.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Respondemos rápido por WhatsApp o llamada.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "footer" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#15803d] px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir cotización
              </a>
              <a
                href={telLink}
                onClick={() => track("cta_call_click", { source: "footer" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-400 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
            <Link href="/servicios/techos" className="hover:text-slate-900">
              Servicios
            </Link>
            <Link href="/cobertura/medellin" className="hover:text-slate-900">
              Cobertura
            </Link>
            <Link href="/nosotros" className="hover:text-slate-900">
              Nosotros
            </Link>
            <Link href="/blog" className="hover:text-slate-900">
              Blog
            </Link>
            <Link href="/terminos" className="hover:text-slate-900">
              Términos y condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-slate-900">
              Política de privacidad
            </Link>
            <a href={SITE_URL} className="hover:text-slate-900">
              Sitio principal
            </a>
            <span>Teléfono: {PHONE_DISPLAY}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
