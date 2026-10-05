/** Cobertura comercial. Una zona atendida no representa una oficina ni exige una página propia. */
export const COVERAGE_AREAS = [
  { slug: "medellin", name: "Medellín", region: "valle", hasLocalPage: true },
  { slug: "bello", name: "Bello", region: "valle", hasLocalPage: true },
  { slug: "envigado", name: "Envigado", region: "valle", hasLocalPage: true },
  { slug: "sabaneta", name: "Sabaneta", region: "valle", hasLocalPage: true },
  { slug: "itagui", name: "Itagüí", region: "valle", hasLocalPage: true },
  { slug: "la-estrella", name: "La Estrella", region: "valle", hasLocalPage: true },
  { slug: "caldas", name: "Caldas", region: "valle", hasLocalPage: true },
  { slug: "copacabana", name: "Copacabana", region: "valle", hasLocalPage: true },
  { slug: "girardota", name: "Girardota", region: "valle", hasLocalPage: true },
  { slug: "barbosa", name: "Barbosa", region: "valle", hasLocalPage: false },
  { slug: "rionegro", name: "Rionegro", region: "oriente", hasLocalPage: true },
  { slug: "la-ceja", name: "La Ceja", region: "oriente", hasLocalPage: true },
  { slug: "marinilla", name: "Marinilla", region: "oriente", hasLocalPage: true },
] as const;

export const COVERAGE_COUNT = COVERAGE_AREAS.length;

export function coverageHref(area: (typeof COVERAGE_AREAS)[number]) {
  return area.hasLocalPage ? `/cobertura/${area.slug}` : `/cobertura#${area.slug}`;
}
