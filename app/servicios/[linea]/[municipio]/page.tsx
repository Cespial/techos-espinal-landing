import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SERVICE_DATA, type ServiceLineId } from "@/lib/conversion";
import {
  CROSS_PAGE_SEO,
  getCrossPageSEO,
  getServiceLineSEO,
  getMunicipalitySEO,
  SERVICE_LINE_SEO,
  MUNICIPALITY_SEO,
  getMunicipalityProfile,
} from "@/lib/seo-data";
import { buildServiceSchema } from "@/lib/schema";
import JsonLd from "@/components/local/JsonLd";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import PageHero from "@/components/local/PageHero";
import { lineIllustration, municipioIllustration } from "@/lib/illustrations";
import ServiceGrid from "@/components/local/ServiceGrid";
import LocalZones from "@/components/local/LocalZones";
import ProcessSteps from "@/components/local/ProcessSteps";
import CtaBand from "@/components/local/CtaBand";
import FaqSection from "@/components/local/FaqSection";
import RelatedLinks from "@/components/local/RelatedLinks";
import TrustSignals from "@/components/local/TrustSignals";

export function generateStaticParams() {
  return CROSS_PAGE_SEO.map((p) => ({ linea: p.lineSlug, municipio: p.municipioSlug }));
}

type Props = { params: Promise<{ linea: string; municipio: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { linea, municipio } = await params;
  const data = getCrossPageSEO(linea, municipio);
  if (!data) return {};
  const url = `${SITE_URL}/servicios/${linea}/${municipio}`;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url,
      type: "website",
      locale: "es_CO",
      images: [{ url: `/og/og-${linea}.png`, width: 1200, height: 630, alt: data.title }],
    },
    twitter: { card: "summary_large_image", title: data.title, description: data.metaDescription, images: [`/og/og-${linea}.png`] },
  };
}

export default async function CrossPage({ params }: Props) {
  const { linea, municipio } = await params;
  const cross = getCrossPageSEO(linea, municipio);
  const lineSeo = getServiceLineSEO(linea);
  const muniSeo = getMunicipalitySEO(municipio);
  if (!cross || !lineSeo || !muniSeo) notFound();

  const lineId = lineSeo.lineId as ServiceLineId;
  const services = SERVICE_DATA[lineId];
  const profile = getMunicipalityProfile(muniSeo.slug);
  const pageType = "servicio_municipio" as const;
  const url = `${SITE_URL}/servicios/${linea}/${municipio}`;

  return (
    <>
      <SiteHeader pageType={pageType} linea={lineId} municipio={muniSeo.name} />
      <main id="main-content">
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: cross.lineLabel, href: `/servicios/${linea}` },
            { name: muniSeo.name },
          ]}
        />
        <PageHero
          pageType={pageType}
          h1={cross.h1}
          intro={cross.intro}
          bullets={lineSeo.heroBullets}
          municipio={muniSeo.name}
          linea={lineId}
          ctaLabel={`Cotizar en ${muniSeo.name}`}
          illustration={lineIllustration(lineId)}
        />
        <ServiceGrid
          pageType={pageType}
          linea={lineId}
          services={services}
          municipio={muniSeo.name}
          heading={`Servicios de ${cross.lineLabel.toLowerCase()} en ${muniSeo.name}`}
          intro={`Precios de referencia para ${muniSeo.name}. El valor final te lo damos por escrito después de la visita gratis.`}
          tone="slate"
        />
        {profile && <LocalZones municipio={muniSeo.name} profile={profile} tone="paper" illustration={municipioIllustration(muniSeo.slug)} />}
        <ProcessSteps pageType={pageType} municipio={muniSeo.name} linea={lineId} />
        <TrustSignals municipality={muniSeo.name} />
        <FaqSection
          items={cross.faqs}
          heading={`Preguntas frecuentes sobre ${cross.lineLabel.toLowerCase()} en ${muniSeo.name}`}
        />
        <CtaBand
          pageType={pageType}
          linea={lineId}
          municipio={muniSeo.name}
          heading={`¿Necesitas ${cross.lineLabel.toLowerCase()} en ${muniSeo.name}?`}
          body="Cuéntanos qué pasa y coordinamos la visita gratis. Te damos el precio por escrito antes de empezar."
        />
        <RelatedLinks
          groups={[
            {
              heading: `Más servicios en ${muniSeo.name}`,
              links: SERVICE_LINE_SEO.filter((s) => s.slug !== linea).map((s) => ({
                href: `/servicios/${s.slug}/${municipio}`,
                label: `${s.heroTitle} en ${muniSeo.name}`,
              })),
            },
            {
              heading: `${cross.lineLabel} en otros municipios`,
              links: MUNICIPALITY_SEO.filter((m) => m.slug !== municipio).map((m) => ({
                href: `/servicios/${linea}/${m.slug}`,
                label: m.name,
              })),
            },
          ]}
        />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} linea={lineId} municipio={muniSeo.name} />
      <JsonLd
        data={buildServiceSchema({
          url,
          name: cross.h1,
          description: cross.metaDescription,
          services,
          municipio: { name: muniSeo.name, lat: muniSeo.lat, lng: muniSeo.lng },
        })}
      />
    </>
  );
}
