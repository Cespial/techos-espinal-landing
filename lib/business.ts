import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_E164,
  COVERAGE_SCHEDULE,
} from "./conversion";
import { MUNICIPALITY_SEO } from "./seo-data";

/* ------------------------------------------------------------------ */
/*  ENTIDAD DEL NEGOCIO (fuente única para JSON-LD y NAP visible)      */
/* ------------------------------------------------------------------ */

// Identificadores estables del grafo JSON-LD. Todas las páginas reutilizan
// el mismo @id para que Google una los nodos en una sola entidad.
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Perfiles externos. Se rellenan por variables de entorno en Vercel cuando
// existan; mientras estén vacíos no se emiten (nunca enlaces inventados).
export const GBP_URL = process.env.NEXT_PUBLIC_GBP_URL ?? "";
export const GBP_REVIEW_URL = process.env.NEXT_PUBLIC_GBP_REVIEW_URL ?? "";
export const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "";

export const SAME_AS = [GBP_URL, FACEBOOK_URL, INSTAGRAM_URL].filter(Boolean);

// Dueño o responsable técnico que firma el blog (E-E-A-T). Si no está
// definido, el autor sigue siendo la organización.
export const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME ?? "";

export const PRICE_RANGE = "$$";

export const LOGO_URL = `${SITE_URL}/logo-icon.png`;
export const DEFAULT_IMAGE_URL = `${SITE_URL}/og/og-default.png`;

// NAP visible (nombre, área, teléfono, horario) para footer y páginas.
export const NAP = {
  name: COMPANY_NAME,
  area: "Medellín y Valle de Aburrá, Antioquia",
  phoneE164: PHONE_E164,
  hours: COVERAGE_SCHEDULE.hours,
} as const;

export const OPENING_HOURS_SPECIFICATION = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "07:00",
  closes: "18:00",
} as const;

export const SERVICE_TYPES = [
  "Techos y cubiertas",
  "Pintura y acabados",
  "Plomería",
] as const;

export const KNOWS_ABOUT = [
  "Reparación de techos",
  "Impermeabilización de cubiertas",
  "Reparación de goteras",
  "Pintura interior y exterior",
  "Resanes y acabados de paredes",
  "Tratamiento de humedad en paredes",
  "Reparación de fugas de agua",
  "Destape de desagües",
  "Cambio de grifería",
  "Mantenimiento del hogar",
  "Plomería residencial y comercial",
] as const;

// Los 12 municipios como nodos City con coordenadas (areaServed real).
export const AREA_SERVED = MUNICIPALITY_SEO.map((m) => ({
  "@type": "City",
  name: m.name,
  containedInPlace: { "@type": "AdministrativeArea", name: "Antioquia" },
}));

type LocalBusinessOptions = {
  /** URL de la página que emite el nodo (por defecto, el home). */
  url?: string;
  /** Municipio foco de la página; si se da, va primero en areaServed y en address. */
  focusMunicipality?: { name: string; lat: number; lng: number };
  /** Descripción específica de la página. */
  description?: string;
};

/**
 * Nodo HomeAndConstructionBusiness completo y consistente para cualquier página.
 * Mismo @id en todo el sitio; cambia solo la URL emisora y el municipio foco.
 */
export function buildLocalBusinessNode(options: LocalBusinessOptions = {}) {
  const { url = SITE_URL, focusMunicipality, description } = options;

  const areaServed = focusMunicipality
    ? [
        {
          "@type": "City",
          name: focusMunicipality.name,
          containedInPlace: { "@type": "AdministrativeArea", name: "Antioquia" },
        },
        ...AREA_SERVED.filter((a) => a.name !== focusMunicipality.name),
      ]
    : AREA_SERVED;

  const node: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: COMPANY_NAME,
    url,
    mainEntityOfPage: url,
    telephone: PHONE_E164,
    image: DEFAULT_IMAGE_URL,
    logo: LOGO_URL,
    priceRange: PRICE_RANGE,
    currenciesAccepted: "COP",
    paymentAccepted: "Efectivo, transferencia bancaria, Nequi",
    address: {
      "@type": "PostalAddress",
      addressLocality: focusMunicipality?.name ?? "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: focusMunicipality?.lat ?? 6.2518,
      longitude: focusMunicipality?.lng ?? -75.5636,
    },
    areaServed,
    serviceType: SERVICE_TYPES,
    knowsAbout: KNOWS_ABOUT,
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    parentOrganization: { "@id": ORGANIZATION_ID },
    // NOTA SEO: sin aggregateRating ni review. Solo se añaden cuando existan
    // reseñas reales verificables (Google Business Profile).
  };

  if (description) node.description = description;
  if (SAME_AS.length > 0) node.sameAs = SAME_AS;
  if (GBP_URL) node.hasMap = GBP_URL;

  return node;
}

/** Nodo Organization del layout raíz, enlazado al negocio por @id. */
export function buildOrganizationNode() {
  const node: Record<string, unknown> = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    image: DEFAULT_IMAGE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer service",
      availableLanguage: "Spanish",
      areaServed: "CO",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    knowsAbout: KNOWS_ABOUT,
  };
  if (SAME_AS.length > 0) node.sameAs = SAME_AS;
  if (OWNER_NAME) {
    node.founder = { "@type": "Person", name: OWNER_NAME, url: `${SITE_URL}/nosotros` };
  }
  return node;
}

/** Autor de los artículos del blog: Person si hay dueño declarado, si no la organización. */
export function buildBlogAuthorNode() {
  if (OWNER_NAME) {
    return {
      "@type": "Person",
      name: OWNER_NAME,
      jobTitle: "Responsable técnico",
      worksFor: { "@id": ORGANIZATION_ID },
      url: `${SITE_URL}/nosotros`,
    };
  }
  return { "@id": ORGANIZATION_ID, "@type": "Organization", name: COMPANY_NAME, url: SITE_URL };
}
