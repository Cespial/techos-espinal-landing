import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SERVICE_DATA, type ServiceLineId } from "@/lib/conversion";
import { SERVICE_LINE_SEO, MUNICIPALITY_SEO, getServiceLineSEO } from "@/lib/seo-data";
import { buildServiceSchema } from "@/lib/schema";
import JsonLd from "@/components/local/JsonLd";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import PageHero from "@/components/local/PageHero";
import { lineIllustration } from "@/lib/illustrations";
import ServiceGrid from "@/components/local/ServiceGrid";
import ProcessSteps from "@/components/local/ProcessSteps";
import CtaBand from "@/components/local/CtaBand";
import FaqSection from "@/components/local/FaqSection";
import RelatedLinks from "@/components/local/RelatedLinks";
import TrustSignals from "@/components/local/TrustSignals";

export function generateStaticParams() {
  return SERVICE_LINE_SEO.map((s) => ({ linea: s.slug }));
}

type Props = { params: Promise<{ linea: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { linea } = await params;
  const data = getServiceLineSEO(linea);
  if (!data) return {};
  const url = `${SITE_URL}/servicios/${data.slug}`;
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
      images: [{ url: data.ogImage, width: 1200, height: 630, alt: data.title }],
    },
    twitter: { card: "summary_large_image", title: data.title, description: data.metaDescription, images: [data.ogImage] },
  };
}

export default async function ServicioPage({ params }: Props) {
  const { linea } = await params;
  const seo = getServiceLineSEO(linea);
  if (!seo) notFound();
  const lineId = seo.lineId as ServiceLineId;
  const services = SERVICE_DATA[lineId];
  const pageType = "servicio" as const;
  const url = `${SITE_URL}/servicios/${seo.slug}`;

  return (
    <>
      <SiteHeader pageType={pageType} linea={lineId} />
      <main id="main-content">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: seo.heroTitle }]} />
        <PageHero
          pageType={pageType}
          h1={seo.heroTitle}
          intro={seo.heroDescription}
          bullets={seo.heroBullets}
          linea={lineId}
          ctaLabel="Cotizar por WhatsApp"
          illustration={lineIllustration(lineId)}
        />
        <ServiceGrid pageType={pageType} linea={lineId} services={services} heading="Servicios y precios de referencia" tone="slate" />
        <ProcessSteps pageType={pageType} linea={lineId} />
        <TrustSignals />
        <FaqSection items={seo.faqs} />
        <CtaBand
          pageType={pageType}
          linea={lineId}
          heading={`¿Necesitas ${seo.heroTitle.toLowerCase().startsWith("que") ? "ayuda con el techo" : seo.heroTitle.toLowerCase()}?`}
          body="Cuéntanos qué pasa y coordinamos la visita gratis. Te damos el precio por escrito antes de empezar."
        />
        <RelatedLinks
          groups={[
            {
              heading: "Otros servicios",
              links: [
                ...SERVICE_LINE_SEO.filter((s) => s.slug !== linea).map((s) => ({ href: `/servicios/${s.slug}`, label: s.heroTitle })),
                { href: "/blog", label: "Guías y precios" },
              ],
            },
            {
              heading: `${seo.heroTitle} por municipio`,
              links: MUNICIPALITY_SEO.map((m) => ({ href: `/servicios/${linea}/${m.slug}`, label: m.name })),
            },
          ]}
        />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} linea={lineId} />
      <JsonLd data={buildServiceSchema({ url, name: seo.title, description: seo.metaDescription, services })} />
    </>
  );
}
