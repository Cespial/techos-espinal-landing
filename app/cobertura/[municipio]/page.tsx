import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, SERVICE_DATA, LINE_OPTIONS, HIGHLIGHT_SERVICES } from "@/lib/conversion";
import { MUNICIPALITY_SEO, getMunicipalitySEO, SERVICE_LINE_SEO, getMunicipalityProfile } from "@/lib/seo-data";
import { buildLocalBusinessNode } from "@/lib/business";
import { getAllPosts } from "@/lib/blog-utils";
import JsonLd from "@/components/local/JsonLd";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import PageHero from "@/components/local/PageHero";
import LocalZones from "@/components/local/LocalZones";
import CtaBand from "@/components/local/CtaBand";
import RelatedLinks from "@/components/local/RelatedLinks";
import TrustSignals from "@/components/local/TrustSignals";
import WaButton from "@/components/local/WaButton";

export function generateStaticParams() {
  return MUNICIPALITY_SEO.map((m) => ({ municipio: m.slug }));
}

type Props = { params: Promise<{ municipio: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { municipio } = await params;
  const data = getMunicipalitySEO(municipio);
  if (!data) return {};
  const url = `${SITE_URL}/cobertura/${data.slug}`;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    // og:image la provee app/cobertura/[municipio]/opengraph-image.tsx (generada en build).
    openGraph: { title: data.title, description: data.metaDescription, url, type: "website", locale: "es_CO" },
    twitter: { card: "summary_large_image", title: data.title, description: data.metaDescription },
  };
}

export default async function CoberturaPage({ params }: Props) {
  const { municipio } = await params;
  const seo = getMunicipalitySEO(municipio);
  if (!seo) notFound();
  const profile = getMunicipalityProfile(seo.slug);
  const pageType = "cobertura" as const;

  return (
    <>
      <SiteHeader pageType={pageType} municipio={seo.name} />
      <main id="main-content">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Cobertura", href: "/cobertura" }, { name: seo.name }]} />
        <PageHero
          pageType={pageType}
          h1={`Techos, pintura y plomería en ${seo.name}`}
          intro={seo.description}
          municipio={seo.name}
          ctaLabel={`Cotizar en ${seo.name}`}
        />

        {/* Las tres líneas con sus servicios más pedidos en este municipio */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24" aria-labelledby="lines-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="lines-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Qué hacemos en {seo.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Precios de referencia. El valor final te lo damos por escrito después de la visita gratis.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {LINE_OPTIONS.map((line) => {
                const lineSeo = SERVICE_LINE_SEO.find((s) => s.slug === line.id);
                const items = SERVICE_DATA[line.id].filter((s) => HIGHLIGHT_SERVICES[line.id].includes(s.id));
                return (
                  <article key={line.id} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      <Link href={`/servicios/${line.id}/${seo.slug}`} className="hover:underline">
                        {lineSeo?.heroTitle ?? line.label}
                      </Link>
                    </h3>
                    <ul className="mt-4 flex-1 divide-y divide-slate-100">
                      {items.map((s) => (
                        <li key={s.id} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                          <span className="text-slate-800">{s.name}</span>
                          <span className="shrink-0 font-semibold tabular-nums text-slate-900">
                            <span className="font-normal text-slate-600">desde </span>
                            {s.basePrice.replace(" COP", "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <WaButton source="service_card" pageType={pageType} linea={line.id} municipio={seo.name} label={`Cotizar ${line.label.toLowerCase()}`} className="mt-5" />
                    <Link href={`/servicios/${line.id}/${seo.slug}`} className="mt-3 inline-flex min-h-10 items-center justify-center text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
                      Ver {line.label.toLowerCase()} en {seo.name}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {profile && <LocalZones municipio={seo.name} profile={profile} tone="paper" />}
        <TrustSignals municipality={seo.name} />
        <CtaBand
          pageType={pageType}
          municipio={seo.name}
          heading={`¿Necesitas ayuda en ${seo.name}?`}
          body="Cuéntanos qué pasa y coordinamos la visita gratis. Te damos el precio por escrito antes de empezar."
        />
        <RelatedLinks
          groups={[
            {
              heading: "Guías y precios",
              links: getAllPosts().slice(0, 4).map((post) => ({ href: `/blog/${post.slug}`, label: post.title })),
            },
            {
              heading: "También atendemos en",
              links: MUNICIPALITY_SEO.filter((m) => m.slug !== municipio).map((m) => ({ href: `/cobertura/${m.slug}`, label: m.name })),
            },
          ]}
        />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} municipio={seo.name} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildLocalBusinessNode({
            url: `${SITE_URL}/cobertura/${seo.slug}`,
            focusMunicipality: { name: seo.name, lat: seo.lat, lng: seo.lng },
            description: seo.metaDescription,
          }),
        }}
      />
    </>
  );
}
