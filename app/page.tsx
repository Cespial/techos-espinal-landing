import TechosLanding from "@/components/sections/TechosLanding";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/conversion";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Techos Espinal",
  description:
    "Impermeabilizacion, reparacion de goteras, canoas y arreglo de techos en Medellin, Antioquia y Valle de Aburra.",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  areaServed: ["Medellin", "Valle de Aburra", "Antioquia"],
  serviceType: [
    "Impermeabilizacion",
    "Reparacion de goteras",
    "Canoas y bajantes",
    "Arreglo de techos",
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
