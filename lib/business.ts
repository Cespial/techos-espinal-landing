import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_E164,
  COVERAGE_SCHEDULE,
} from "./conversion";
import { MUNICIPALITY_SEO } from "./seo-data";
import { OWNER, PERSON_ID } from "./owner";

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
  /** Imagen representativa de la página (ruta absoluta o relativa al sitio). */
  image?: string;
};

/**
 * Nodo HomeAndConstructionBusiness completo y consistente para cualquier página.
 * Mismo @id en todo el sitio; cambia solo la URL emisora y el municipio foco.
 */
export function buildLocalBusinessNode(options: LocalBusinessOptions = {}) {
  const { url = SITE_URL, focusMunicipality, description, image } = options;

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
    image: image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE_URL,
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
    founder: { "@id": PERSON_ID },
    employee: [{ "@id": PERSON_ID }],
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
  node.founder = { "@id": PERSON_ID };
  return node;
}

/** Nodo Person de Henrry Espinal, dueño y técnico principal. Se emite en el layout raíz. */
export function buildPersonNode() {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: OWNER.name,
    givenName: OWNER.givenName,
    familyName: OWNER.familyName,
    jobTitle: OWNER.role,
    description: OWNER.bio.join(" "),
    url: `${SITE_URL}/nosotros`,
    telephone: PHONE_E164,
    worksFor: { "@id": ORGANIZATION_ID },
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressLocality: OWNER.city,
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
  };
  if (OWNER.photo) node.image = `${SITE_URL}${OWNER.photo}`;
  return node;
}

/** Autor de los artículos del blog: Henrry Espinal (Person). */
export function buildBlogAuthorNode() {
  return { "@id": PERSON_ID, "@type": "Person", name: OWNER.name, url: `${SITE_URL}/nosotros` };
}
