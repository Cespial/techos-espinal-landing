import TechosLanding from "@/components/sections/TechosLanding";
import { FAQ_ITEMS, SITE_URL } from "@/lib/conversion";
import { buildLocalBusinessNode } from "@/lib/business";

const structuredData = {
  "@context": "https://schema.org",
  ...buildLocalBusinessNode({
    description:
      "Servicios de techos y cubiertas, pintura y acabados, y plomería para hogares y negocios en Medellín y Valle de Aburrá.",
  }),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Espinal Multiservicios",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Techos y cubiertas",
        url: `${SITE_URL}/servicios/techos`,
        description:
          "Impermeabilización, reparación de goteras, mantenimiento de canoas y cubiertas.",
      },
      {
        "@type": "OfferCatalog",
        name: "Pintura y acabados",
        url: `${SITE_URL}/servicios/pintura`,
        description:
          "Pintura interior y exterior, resanes, estuco y acabado de fachadas.",
      },
      {
        "@type": "OfferCatalog",
        name: "Plomería",
        url: `${SITE_URL}/servicios/plomeria`,
        description:
          "Reparación de fugas, destape de desagües, cambio de grifería y mantenimiento hidráulico.",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <TechosLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
