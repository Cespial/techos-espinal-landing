import RadicalLanding from "@/components/sections/RadicalLanding";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tu Página en 48",
  description:
    "Sistema de despliegue web de alta conversión para Colombia. Páginas profesionales en 48 horas.",
  url: "https://tupaginaen48.com",
  areaServed: {
    "@type": "Country",
    name: "Colombia",
  },
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planes Tu Página en 48",
    itemListElement: [
      { "@type": "Offer", name: "Landing Pro", price: "1000000", priceCurrency: "COP" },
      { "@type": "Offer", name: "Sitio Corporativo", price: "2900000", priceCurrency: "COP" },
      { "@type": "Offer", name: "Custom Dev", price: "4500000", priceCurrency: "COP" },
      {
        "@type": "Offer",
        name: "Add-on Asesoría de Marca y Contenido",
        price: "650000",
        priceCurrency: "COP",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <main id="main-content">
        <RadicalLanding />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
