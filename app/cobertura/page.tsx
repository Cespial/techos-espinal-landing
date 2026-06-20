import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import MobileStickyBarGlobal from "@/components/sections/MobileStickyBarGlobal";
import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WA_BASE_URL,
} from "@/lib/conversion";
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

      <BlogHeader />

      <main id="main-content" className="pt-20 pb-24 md:pb-0">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-slate-500">
              <Link href="/" className="hover:text-orange-600">
                Inicio
              </Link>{" "}
              <span aria-hidden="true">/</span> <span className="text-slate-700">Cobertura</span>
            </nav>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {TITLE}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{DESCRIPTION}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WA_BASE_URL}
                className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar por WhatsApp
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Municipios */}
        <section className="bg-slate-50 py-12 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Municipios donde trabajamos
            </h2>
            <p className="mt-2 text-slate-600">
              Selecciona tu municipio para ver los servicios disponibles y precios de referencia.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MUNICIPALITY_SEO.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/cobertura/${m.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-600" aria-hidden="true" />
                      <span className="text-lg font-semibold text-slate-900">{m.name}</span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {m.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                      Ver cobertura en {m.name}
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

        {/* Servicios */}
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Nuestros servicios
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
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-600">
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
      </main>

      <BlogFooter />
      <MobileStickyBarGlobal />
    </>
  );
}
