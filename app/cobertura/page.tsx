import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { municipioIllustration, VALLEY_MAP } from "@/lib/illustrations";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import WaButton from "@/components/local/WaButton";
import CallButton from "@/components/local/CallButton";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import LocalLinks from "@/components/local/LocalLinks";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";
import { MUNICIPALITY_SEO, SERVICE_LINE_SEO } from "@/lib/seo-data";

const TITLE = "Cobertura en Medellín y el Valle de Aburrá";
const DESCRIPTION =
  "Espinal Multiservicios atiende techos, pintura y plomería en Medellín y los municipios del Valle de Aburrá y el Oriente antioqueño. Encuentra tu municipio y cotiza por WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/cobertura` },
  openGraph: {
    title: `${TITLE} | ${COMPANY_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/cobertura`,
    type: "website",
    locale: "es_CO",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: `${TITLE} | ${COMPANY_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${COMPANY_NAME}`,
    description: DESCRIPTION,
    images: ["/og/og-default.png"],
  },
};

export default function CoberturaIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cobertura",
        item: `${SITE_URL}/cobertura`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/cobertura`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: MUNICIPALITY_SEO.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: m.name,
        url: `${SITE_URL}/cobertura/${m.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <SiteHeader pageType="cobertura_index" />

      <main id="main-content" className="pb-24 md:pb-0">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-slate-600">
                <Link href="/" className="hover:text-orange-700">
                  Inicio
                </Link>{" "}
                <span aria-hidden="true">/</span> <span className="text-slate-700">Cobertura</span>
              </nav>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {TITLE}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{DESCRIPTION}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <WaButton source="hero" pageType="cobertura_index" label="Cotizar por WhatsApp" size="lg" />
                <CallButton source="hero" pageType="cobertura_index" size="lg" />
              </div>
            </div>
            <Image
              src={VALLEY_MAP.src}
              alt={VALLEY_MAP.alt}
              width={VALLEY_MAP.width}
              height={VALLEY_MAP.height}
              sizes="(min-width: 1152px) 464px, (min-width: 1024px) 42vw, calc(100vw - 32px)"
              className="h-auto w-full rounded-3xl"
            />
          </div>
        </section>

        {/* Municipios */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Municipios donde trabajamos
            </h2>
            <p className="mt-2 text-slate-600">
              Selecciona tu municipio para ver los servicios disponibles y precios de referencia.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MUNICIPALITY_SEO.map((m) => {
                const illustration = municipioIllustration(m.slug, "sm");
                return (
                  <li key={m.slug}>
                    <Link
                      href={`/cobertura/${m.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-orange-300 hover:shadow-sm"
                    >
                      <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        width={illustration.width}
                        height={illustration.height}
                        sizes="(min-width: 1024px) 310px, (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 32px)"
                        className="h-auto w-full"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-lg font-semibold text-slate-900">{m.name}</span>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                          {m.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-700">
                          Ver cobertura en {m.name}
                          <ArrowRight
                            className="h-4 w-4 transition group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Servicios */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Qué hacemos
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {SERVICE_LINE_SEO.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:shadow-sm"
                  >
                    <span className="text-lg font-semibold text-slate-900">{s.heroTitle}</span>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {s.heroDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-700">
                      Ver servicio
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LocalLinks tone="slate" />
      </main>

      <SiteFooter />
      <MobileStickyBar pageType="cobertura_index" />
    </>
  );
}
