import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogCTA from "@/components/blog/BlogCTA";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_DISPLAY,
  SERVICE_DATA,
  TESTIMONIAL_DATA,
  SOCIAL_PROOF_STATS,
  buildWaLinkHero,
  type ServiceLineId,
} from "@/lib/conversion";
import { SERVICE_LINE_SEO, getServiceLineSEO } from "@/lib/seo-data";

export function generateStaticParams() {
  return SERVICE_LINE_SEO.map((s) => ({ linea: s.slug }));
}

type Props = { params: Promise<{ linea: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { linea } = await params;
  const data = getServiceLineSEO(linea);
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: `${SITE_URL}/servicios/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `${SITE_URL}/servicios/${data.slug}`,
      type: "website",
      locale: "es_CO",
      images: [{ url: data.ogImage, width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

export default async function ServicioPage({ params }: Props) {
  const { linea } = await params;
  const seo = getServiceLineSEO(linea);
  if (!seo) notFound();

  const lineId = seo.lineId as ServiceLineId;
  const services = SERVICE_DATA[lineId];
  const testimonials = TESTIMONIAL_DATA.filter((t) => t.serviceLine === lineId);
  const waLink = buildWaLinkHero(undefined, seo.heroTitle);

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
        name: "Servicios",
        item: `${SITE_URL}/servicios/techos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.heroTitle,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seo.title,
    description: seo.metaDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_NAME,
      url: SITE_URL,
      telephone: PHONE_DISPLAY,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Medellín",
        addressRegion: "Antioquia",
        addressCountry: "CO",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Medellín",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: seo.title,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          price: s.basePrice.replace(/[^0-9]/g, ""),
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BlogHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
              {COMPANY_NAME}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {seo.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              {seo.heroDescription}
            </p>
            <ul className="mt-6 space-y-2">
              {seo.heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar ahora por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Service grid */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Servicios y precios de referencia
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Precios aproximados. El valor final se define con la visita técnica gratuita.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <h3 className="text-base font-semibold text-slate-900">{service.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{service.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-orange-700">
                    Desde {service.basePrice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Lo que dicen nuestros clientes
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.municipality} &middot; {t.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <BlogCTA serviceLine={lineId} postTitle={seo.title} variant="banner" />
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 space-y-4">
              {seo.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-slate-900 transition-all hover:bg-slate-50">
                    {faq.question}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Explora más servicios
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {SERVICE_LINE_SEO.filter((s) => s.slug !== linea).map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
                >
                  {s.heroTitle}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Blog
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
