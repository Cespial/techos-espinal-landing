import type { ServiceLineId } from "./conversion";

/* ------------------------------------------------------------------ */
/*  MEDICIÓN: dos eventos de conversión, enviados a GA4 vía gtag      */
/* ------------------------------------------------------------------ */

export type CtaSource =
  | "hero"
  | "header"
  | "sticky_bar"
  | "fab"
  | "service_card"
  | "process"
  | "owner"
  | "trust"
  | "coverage"
  | "faq"
  | "composer"
  | "final_cta"
  | "footer"
  | "blog_inline"
  | "blog_sticky"
  | "blog_banner"
  | "emergency";

export type PageType =
  | "home"
  | "servicio"
  | "servicio_municipio"
  | "cobertura"
  | "cobertura_index"
  | "nosotros"
  | "blog"
  | "blog_index"
  | "legal";

export type CtaParams = {
  source: CtaSource;
  page_type: PageType;
  linea?: ServiceLineId | "general";
  municipio?: string;
  servicio?: string;
};

type Win = Window & { dataLayer?: unknown[] };

/**
 * Mismo contrato que el snippet oficial de gtag.js: empuja el objeto `arguments`.
 * Funciona aunque el script de GA4 aún no haya cargado (la cola se procesa después).
 */
export function gtag(..._args: unknown[]) {
  if (typeof window === "undefined") return;
  const win = window as Win;
  win.dataLayer = win.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  win.dataLayer.push(arguments);
}

function send(eventName: "cta_whatsapp_click" | "cta_call_click", params: CtaParams) {
  try {
    gtag("event", eventName, {
      linea: "general",
      municipio: "general",
      ...params,
    });
    if (process.env.NODE_ENV !== "production") {
      console.log("[track]", eventName, params);
    }
  } catch {
    // Nunca romper el flujo de conversión por medición.
  }
}

export const trackWhatsApp = (params: CtaParams) => send("cta_whatsapp_click", params);
export const trackCall = (params: CtaParams) => send("cta_call_click", params);
