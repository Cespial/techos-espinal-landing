import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_ICON_MAP, LINE_ACCENT } from "@/lib/service-icons";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_DISPLAY,
  WA_BASE_URL,
  SERVICE_DATA,
  LINE_OPTIONS,
  buildWaLinkCoverage,
} from "@/lib/conversion";
import { MUNICIPALITY_SEO, getMunicipalitySEO, SERVICE_LINE_SEO } from "@/lib/seo-data";
import MobileStickyBarGlobal from "@/components/sections/MobileStickyBarGlobal";
import { getAllPosts } from "@/lib/blog-utils";
import { buildLocalBusinessNode } from "@/lib/business";
import TrustSignals from "@/components/sections/TrustSignals";

export function generateStaticParams() {
  return MUNICIPALITY_SEO.map((m) => ({ municipio: m.slug }));
}

type Props = { params: Promise<{ municipio: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { municipio } = await params;
  const data = getMunicipalitySEO(municipio);
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: `${SITE_URL}/cobertura/${data.slug}` },
    // og:image y twitter:image los provee app/cobertura/[municipio]/opengraph-image.tsx
    // (OG dinámico por municipio, generado en build). No declarar images aquí.
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `${SITE_URL}/cobertura/${data.slug}`,
      type: "website",
      locale: "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

const HIGHLIGHT_SERVICES: Record<string, string[]> = {
  techos: ["impermeabilizacion-cubiertas", "reparacion-goteras", "mantenimiento-canoas"],
  pintura: ["pintura-interior", "pintura-exterior", "correccion-humedad-superficial"],
  plomeria: ["reparacion-fugas", "destape-desagues", "cambio-griferia"],
};

export default async function CoberturaPage({ params }: Props) {
  const { municipio } = await params;
  const seo = getMunicipalitySEO(municipio);
  if (!seo) notFound();

  const waLink = buildWaLinkCoverage(seo.name);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cobertura",
        item: `${SITE_URL}/cobertura`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.name,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    ...buildLocalBusinessNode({
      url: `${SITE_URL}/cobertura/${seo.slug}`,
      focusMunicipality: { name: seo.name, lat: seo.lat, lng: seo.lng },
      description: seo.metaDescription,
    }),
  };

  return (
    <>
      <BlogHeader />

      <main id="main-content" className="pt-20 pb-20 md:pb-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {seo.name}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Servicios en {seo.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              {seo.description}
            </p>
            <div className="mt-8">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar en {seo.name}
              </a>
            </div>
          </div>
        </section>

        {/* 3 Service line cards */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Nuestros servicios en {seo.name}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {SERVICE_LINE_SEO.map((line) => (
                <Link
                  key={line.slug}
                  href={`/servicios/${line.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-slate-900">
                    {line.heroTitle}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {line.heroDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-700 transition-colors group-hover:text-orange-800">
                    Ver servicios y precios
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Highlighted services with prices */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Servicios destacados y precios
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Precios de referencia para {seo.name}. El valor final se define con visita técnica gratuita.
            </p>

            <div className="mt-8 space-y-8">
              {LINE_OPTIONS.map((line) => {
                const ids = HIGHLIGHT_SERVICES[line.id] ?? [];
                const items = SERVICE_DATA[line.id].filter((s) => ids.includes(s.id));
                return (
                  <div key={line.id}>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {line.label}
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {items.map((service) => {
                        const serviceWaLink = `${WA_BASE_URL}?text=${encodeURIComponent(`Hola, necesito cotizar: ${service.name} (${line.label}) en ${seo.name}. ¿Me pueden dar precio y disponibilidad?`)}`;
                        const accent = LINE_ACCENT[line.id];
                        const ServiceIcon = SERVICE_ICON_MAP[service.id];
                        return (
                          <div
                            key={service.id}
                            className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm border-l-[3px] ${accent.accentBar.replace("bg-", "border-l-")}`}
                          >
                            <div className="flex items-start gap-2.5 p-4">
                              {ServiceIcon && (
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent.iconBg}`}>
                                  <ServiceIcon className={`h-4 w-4 ${accent.iconText}`} aria-hidden="true" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-900">
                                  {service.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-600">
                                  {service.summary}
                                </p>
                                <div className={`mt-2 inline-block rounded-md px-2 py-0.5 ${accent.priceBg}`}>
                                  <p className={`text-sm font-bold ${accent.priceText}`}>
                                    Desde {service.basePrice}
                                  </p>
                                </div>
                                <a
                                  href={serviceWaLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#15803d] bg-[#15803d]/10 px-4 text-sm font-semibold text-[#166534] transition-all duration-300 ease-out hover:bg-[#15803d] hover:text-white focus-visible:ring-2 focus-visible:ring-[#15803d] active:scale-[0.98]"
                                >
                                  <WhatsAppIcon className="h-4 w-4" />
                                  Cotizar esto
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center md:p-8">
              <p className="text-xl font-semibold text-slate-900">
                ¿Necesitás ayuda en {seo.name}?
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
                Escríbenos por WhatsApp. Coordinamos una visita técnica gratuita y te damos un precio claro antes de empezar.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar en {seo.name}
              </a>
            </div>
          </div>
        </section>

        {/* Related blog articles */}
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Artículos relacionados
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {getAllPosts().slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-orange-700">
                    {post.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                    {post.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Internal links to other municipalities */}
        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              También atendemos en
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {MUNICIPALITY_SEO.filter((m) => m.slug !== municipio).map((m) => (
                <Link
                  key={m.slug}
                  href={`/cobertura/${m.slug}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
                >
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TrustSignals municipality={seo.name} tone="white" />
      </main>

      <MobileStickyBarGlobal />
      <BlogFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
