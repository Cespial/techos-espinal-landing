import TechosLanding from "@/components/sections/TechosLanding";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/conversion";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Espinal Multiservicios",
  description:
    "Servicios de techos y cubiertas, pintura y acabados, y plomería para hogares y negocios en Medellín y Valle de Aburrá.",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  areaServed: ["Medellín", "Valle de Aburrá", "Antioquia"],
  serviceType: [
    "Techos y cubiertas",
    "Pintura y acabados",
    "Plomería",
  ],
};

export default function Home() {
  return (
    <>
      <TechosLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
