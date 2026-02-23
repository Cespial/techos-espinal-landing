import TechosLanding from "@/components/sections/TechosLanding";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/conversion";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Espinal Multiservicios",
  description:
    "Servicios de techos y cubiertas, pintura y acabados, y plomeria para hogares y negocios en Medellin y Valle de Aburra.",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  areaServed: ["Medellin", "Valle de Aburra", "Antioquia"],
  serviceType: [
    "Techos y cubiertas",
    "Pintura y acabados",
    "Plomeria",
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
