import type { ServiceLineId } from "./conversion";

/* ------------------------------------------------------------------ */
/*  MEDICIÓN: dos eventos de conversión, enviados a GA4 vía gtag      */
/* ------------------------------------------------------------------ */

const CTA_SOURCES = [
  "hero", "header", "sticky_bar", "fab", "service_card", "process", "owner",
  "trust", "coverage", "faq", "composer", "final_cta", "footer", "blog_inline",
  "blog_sticky", "blog_banner", "emergency",
] as const;
export type CtaSource = (typeof CTA_SOURCES)[number];

const PAGE_TYPES = [
  "home", "servicio", "servicio_municipio", "cobertura", "cobertura_index",
  "nosotros", "blog", "blog_index", "solucion", "soluciones_index", "legal",
] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export type CtaParams = {
  source: CtaSource;
  page_type: PageType;
  linea?: ServiceLineId | "general";
  municipio?: string;
  servicio?: string;
};

type Win = Window & { dataLayer?: unknown[] };

const LINES = ["techos", "pintura", "plomeria", "general"] as const;
// Valores de baja cardinalidad. No se aceptan nombres, barrios, direcciones ni
// texto del formulario como dimensión de Analytics.
const MUNICIPALITIES = new Set([
  "medellin", "bello", "envigado", "sabaneta", "itagui", "la-estrella", "caldas",
  "copacabana", "girardota", "barbosa", "rionegro", "la-ceja", "marinilla", "general",
]);

// IDs estables y etiquetas ya publicadas: no importa el catálogo comercial al
// cliente y evita enviar campos libres cuando un componente añade contexto.
const SERVICE_ALIASES: Record<string, readonly string[]> = {
  "impermeabilizacion-cubiertas": ["proteccion-contra-goteras-en-el-techo", "impermeabilizacion-techos", "impermeabilizacion-de-techos"],
  "reparacion-goteras": ["reparacion-de-goteras"],
  "mantenimiento-canoas": ["limpieza-de-canales-y-bajantes"],
  "sellado-fisuras": ["sellado-de-fisuras-y-juntas"],
  "cambio-teja-puntual": ["cambio-puntual-de-teja"],
  "ajuste-bajantes": ["ajuste-de-bajantes"],
  "limpieza-cubierta": ["limpieza-de-cubierta"],
  "revision-puntos-criticos": ["revision-del-techo"],
  "pintura-interior": [],
  "pintura-exterior": [],
  "resanes-acabados": ["resanes-y-acabados"],
  "estuco-pulido": ["alisado-de-paredes"],
  "correccion-humedad-superficial": ["tratamiento-de-humedad-en-paredes"],
  "pintura-rejas-barandas": ["pintura-de-rejas-y-barandas"],
  "retoques-post-obra": [],
  "acabado-fachada": ["acabado-de-fachada"],
  "reparacion-fugas": ["reparacion-de-fugas", "reparacion-fugas-agua", "reparacion-de-fugas-de-agua"],
  "destape-desagues": ["destape-de-desagues"],
  "ajustes-hidrosanitarios": ["reparacion-de-llaves-y-conexiones"],
  "deteccion-fuga-visible": ["deteccion-de-fuga-visible"],
  "cambio-griferia": ["cambio-de-griferia"],
  "ajuste-sanitario": ["ajuste-de-sanitario"],
  "revision-presion": ["revision-de-presion-del-agua"],
  "mantenimiento-red-interna": ["mantenimiento-de-tuberias"],
};
const SERVICE_IDS = new Map(Object.entries(SERVICE_ALIASES).flatMap(([id, aliases]) =>
  [id, ...aliases].map((alias) => [alias, id]),
));

function slug(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[\s_]+/g, "-")
    : "";
}

export function normalizeMunicipality(value: unknown): string {
  const normalized = slug(value);
  return MUNICIPALITIES.has(normalized) ? normalized : "general";
}

/** Solo parámetros y valores conocidos; jamás copiar el objeto recibido. */
export function normalizeCtaParams(params: CtaParams): CtaParams | null {
  if (!(CTA_SOURCES as readonly unknown[]).includes(params.source)
    || !(PAGE_TYPES as readonly unknown[]).includes(params.page_type)) return null;
  const servicio = SERVICE_IDS.get(slug(params.servicio));
  return {
    source: params.source,
    page_type: params.page_type,
    linea: (LINES as readonly unknown[]).includes(params.linea) ? params.linea : "general",
    municipio: normalizeMunicipality(params.municipio),
    ...(servicio ? { servicio } : {}),
  };
}

const SOLUTION_LINES: Record<string, ServiceLineId> = {
  "reparacion-goteras": "techos",
  "impermeabilizacion-techos": "techos",
  "pintura-interior": "pintura",
  "reparacion-fugas-agua": "plomeria",
  "destape-desagues": "plomeria",
};

/** Contexto del enlace global del footer sin cargar artículos ni soluciones. */
export function trackingContextFromPath(pathname: string | null): Omit<CtaParams, "source"> {
  const [section, first, second] = (pathname ?? "/").split(/[?#]/)[0].split("/").filter(Boolean);
  const linea = (LINES as readonly unknown[]).includes(first) ? first as ServiceLineId : "general";
  switch (section) {
    case undefined: return { page_type: "home", linea: "general", municipio: "general" };
    case "servicios": return { page_type: second ? "servicio_municipio" : "servicio", linea, municipio: normalizeMunicipality(second) };
    case "cobertura": return { page_type: first ? "cobertura" : "cobertura_index", linea: "general", municipio: normalizeMunicipality(first) };
    case "soluciones": return { page_type: first ? "solucion" : "soluciones_index", linea: SOLUTION_LINES[first] ?? "general", municipio: "general" };
    case "blog": return { page_type: first ? "blog" : "blog_index", linea: "general", municipio: "general" };
    case "nosotros": return { page_type: "nosotros", linea: "general", municipio: "general" };
    default: return { page_type: "legal", linea: "general", municipio: "general" };
  }
}

/**
 * Mismo contrato que el snippet oficial de gtag.js: empuja el objeto `arguments`.
 * Funciona aunque el script de GA4 aún no haya cargado (la cola se procesa después).
 */
export function gtag(...args: unknown[]): void;
export function gtag() {
  if (typeof window === "undefined") return;
  const win = window as Win;
  win.dataLayer = win.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  win.dataLayer.push(arguments);
}

function send(eventName: "cta_whatsapp_click" | "cta_call_click", params: CtaParams) {
  try {
    const payload = normalizeCtaParams(params);
    if (!payload) return;
    gtag("event", eventName, payload);
  } catch {
    // Nunca romper el flujo de conversión por medición.
  }
}

export const trackWhatsApp = (params: CtaParams) => send("cta_whatsapp_click", params);
export const trackCall = (params: CtaParams) => send("cta_call_click", params);
