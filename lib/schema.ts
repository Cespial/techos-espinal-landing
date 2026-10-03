import { SITE_URL, type ServiceItem } from "./conversion";
import { buildLocalBusinessNode, AREA_SERVED } from "./business";

export type Crumb = { name: string; href?: string };

export function buildBreadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };
}

type ServiceSchemaOptions = {
  url: string;
  name: string;
  description: string;
  services: ServiceItem[];
  municipio?: { name: string; lat: number; lng: number };
};

/** Nodo Service con su catálogo de ofertas, para páginas de línea y cruzadas. */
export function buildServiceSchema(o: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    description: o.description,
    url: o.url,
    provider: buildLocalBusinessNode({ url: o.url, focusMunicipality: o.municipio }),
    areaServed: o.municipio ? { "@type": "City", name: o.municipio.name } : AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: o.name,
      itemListElement: o.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "COP",
          price: s.basePrice.replace(/[^0-9]/g, ""),
          priceType: "https://schema.org/MinPrice",
        },
      })),
    },
  };
}
