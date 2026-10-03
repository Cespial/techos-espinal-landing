import { FAQ_ITEMS, SITE_URL } from "@/lib/conversion";
import { buildLocalBusinessNode } from "@/lib/business";
import JsonLd from "@/components/local/JsonLd";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import HomeHero from "@/components/local/HomeHero";
import ServiceCards from "@/components/local/ServiceCards";
import ProcessSteps from "@/components/local/ProcessSteps";
import TrustSignals from "@/components/local/TrustSignals";
import RecentWork from "@/components/local/RecentWork";
import OwnerCard from "@/components/local/OwnerCard";
import LocalLinks from "@/components/local/LocalLinks";
import FaqSection from "@/components/local/FaqSection";
import WhatsAppComposer from "@/components/local/WhatsAppComposer";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import WhatsAppFab from "@/components/ui/WhatsAppFab";

const businessSchema = {
  "@context": "https://schema.org",
  ...buildLocalBusinessNode({
    description:
      "Henrry Espinal repara techos, pinta y arregla la plomería de casas y negocios en Medellín y Valle de Aburrá. Visita gratis, precio por escrito y garantía firmada.",
  }),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Espinal Multiservicios",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Techos y cubiertas", url: `${SITE_URL}/servicios/techos`, description: "Impermeabilización, reparación de goteras, mantenimiento de canoas y cubiertas." },
      { "@type": "OfferCatalog", name: "Pintura y acabados", url: `${SITE_URL}/servicios/pintura`, description: "Pintura interior y exterior, resanes, estuco y acabado de fachadas." },
      { "@type": "OfferCatalog", name: "Plomería", url: `${SITE_URL}/servicios/plomeria`, description: "Reparación de fugas, destape de desagües, cambio de grifería y mantenimiento hidráulico." },
    ],
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader pageType="home" />
      <main id="main-content">
        <HomeHero />
        <ServiceCards pageType="home" />
        <ProcessSteps pageType="home" />
        <TrustSignals />
        <RecentWork />
        <OwnerCard variant="full" />
        <LocalLinks tone="slate" />
        <FaqSection items={FAQ_ITEMS} />
        <WhatsAppComposer pageType="home" />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType="home" />
      <WhatsAppFab pageType="home" />
      <JsonLd data={businessSchema} />
    </>
  );
}
