"use client";

import Link from "next/link";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import {
  COMPANY_NAME,
  FAQ_ITEMS,
  PHONE_DISPLAY,
  SITE_URL,
  buildWaLinkFaq,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

type FaqFooterProps = {
  waLink: string;
  telLink: string;
};

export default function FaqFooter({ waLink, telLink }: FaqFooterProps) {
  return (
    <>
      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Preguntas que nos hacen seguido
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Si tienes otra duda que no esta aqui, escribenos y te respondemos rapido.
          </p>

          <div className="mt-8 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="group rounded-xl border border-slate-200 bg-slate-50"
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
                </div>
              </details>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center md:p-8">
            <p className="text-xl font-semibold text-slate-900">
              ¿Tienes un problema en tu casa o negocio?
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              No dejes que se haga mas grande. Escribenos ahora y te ayudamos a resolverlo. La cotizacion no tiene costo.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={buildWaLinkFaq()}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "faq_final" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Pedir cotizacion gratis
              </a>
              <a
                href={telLink}
                onClick={() => track("cta_call_click", { source: "faq_final" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
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
              <p className="text-lg font-semibold">{COMPANY_NAME}</p>
              <p className="mt-1 text-sm text-slate-600">
                Techos, pintura y plomeria para casas y negocios en Medellin y el Valle de Aburra.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Respondemos rapido por WhatsApp o llamada.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "footer" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir cotizacion
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
            <Link href="/terminos" className="hover:text-slate-900">
              Terminos y condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-slate-900">
              Politica de privacidad
            </Link>
            <a href={SITE_URL} className="hover:text-slate-900">
              Sitio principal
            </a>
            <span>Telefono: {PHONE_DISPLAY}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
