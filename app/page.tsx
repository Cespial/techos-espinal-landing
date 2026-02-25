import TechosLanding from "@/components/sections/TechosLanding";
import {
  FAQ_ITEMS,
  PHONE_DISPLAY,
  SITE_URL,
  SOCIAL_PROOF_STATS,
  TESTIMONIAL_DATA,
} from "@/lib/conversion";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Espinal Multiservicios",
  description:
    "Servicios de techos y cubiertas, pintura y acabados, y plomería para hogares y negocios en Medellín y Valle de Aburrá.",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Medellín",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.2442,
    longitude: -75.5812,
  },
  areaServed: ["Medellín", "Valle de Aburrá", "Antioquia"],
  serviceType: [
    "Techos y cubiertas",
    "Pintura y acabados",
    "Plomería",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SOCIAL_PROOF_STATS.avgRating,
    bestRating: 5,
    ratingCount: SOCIAL_PROOF_STATS.jobsCompleted,
  },
  review: TESTIMONIAL_DATA.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.text,
    datePublished: t.date,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Espinal Multiservicios",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Techos y cubiertas",
        description:
          "Impermeabilización, reparación de goteras, mantenimiento de canoas y cubiertas.",
      },
      {
        "@type": "OfferCatalog",
        name: "Pintura y acabados",
        description:
          "Pintura interior y exterior, resanes, estuco y acabado de fachadas.",
      },
      {
        "@type": "OfferCatalog",
        name: "Plomería",
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
