import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_E164,
  COVERAGE_SCHEDULE,
} from "./conversion";
import { COVERAGE_AREAS } from "./coverage-areas";
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

// Municipios de cobertura como áreas de servicio, no como sedes del negocio.
export const AREA_SERVED = COVERAGE_AREAS.map((m) => ({
  "@type": "City",
  name: m.name,
  containedInPlace: { "@type": "AdministrativeArea", name: "Antioquia" },
}));

type LocalBusinessOptions = {
  /** Compatibilidad con las llamadas existentes. La entidad conserva su URL principal. */
  url?: string;
  /** Municipio ya atendido que se muestra primero en areaServed; no cambia la sede. */
  focusMunicipality?: { name: string; lat: number; lng: number };
  /** Descripción específica de la página. */
  description?: string;
};

/**
 * Nodo HomeAndConstructionBusiness completo y consistente para cualquier página.
 * Mismo @id, URL y localidad pública en todo el sitio. Los municipios son áreas
 * de servicio. No publicamos una dirección privada ni coordenadas sin verificar.
 */
export function buildLocalBusinessNode(options: LocalBusinessOptions = {}) {
  const { focusMunicipality, description } = options;

  const focusedArea = AREA_SERVED.find((area) => area.name === focusMunicipality?.name);
  const areaServed = focusedArea
    ? [
        focusedArea,
        ...AREA_SERVED.filter((area) => area.name !== focusedArea.name),
      ]
    : AREA_SERVED;

  const node: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: COMPANY_NAME,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    telephone: PHONE_E164,
    image: DEFAULT_IMAGE_URL,
    logo: LOGO_URL,
    priceRange: PRICE_RANGE,
    currenciesAccepted: "COP",
    paymentAccepted: "Efectivo, transferencia bancaria, Nequi",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    areaServed,
    serviceType: SERVICE_TYPES,
    knowsAbout: KNOWS_ABOUT,
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    parentOrganization: { "@id": ORGANIZATION_ID },
    founder: { "@id": PERSON_ID },
    employee: [{ "@id": PERSON_ID }],
    // Las reseñas propias no se marcan como review/aggregateRating del negocio.
    // Obtener reseñas reales en Google no habilita estrellas autorreferenciales.
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
