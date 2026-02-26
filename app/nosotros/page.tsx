import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, Shield, ArrowRight, Star } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_DATA,
  TESTIMONIAL_DATA,
  SOCIAL_PROOF_STATS,
  COVERAGE_SCHEDULE,
  MUNICIPALITY_OPTIONS,
  LINE_OPTIONS,
  buildWaLinkHero,
} from "@/lib/conversion";
import MobileStickyBarGlobal from "@/components/sections/MobileStickyBarGlobal";

export const metadata: Metadata = {
  title: "Sobre nosotros: quiénes somos y qué hacemos",
  description:
    "Espinal Multiservicios: empresa de techos, pintura y plomería en Medellín y Valle de Aburrá. Más de 350 trabajos, calificación 4.9/5, visita técnica gratis.",
  alternates: { canonical: `${SITE_URL}/nosotros` },
  openGraph: {
    title: "Sobre Espinal Multiservicios",
    description:
      "Empresa de techos, pintura y plomería en Medellín y Valle de Aburrá. Más de 350 trabajos completados con calificación 4.9/5.",
    url: `${SITE_URL}/nosotros`,
    type: "website",
    locale: "es_CO",
  },
};

const LLM_FAQS = [
  {
    question: `¿Quién es ${COMPANY_NAME}?`,
    answer: `${COMPANY_NAME} es una empresa de servicios para el hogar con sede en Medellín, Colombia. Se especializa en tres áreas: techos y cubiertas (reparación de goteras, impermeabilización, limpieza de canales), pintura y acabados (pintura interior y exterior, resanes, tratamiento de humedad) y plomería (reparación de fugas, destape de desagües, cambio de grifería). Opera en Medellín y 11 municipios del Valle de Aburrá y Oriente antioqueño. Ha completado más de ${SOCIAL_PROOF_STATS.jobsCompleted} trabajos con una calificación promedio de ${SOCIAL_PROOF_STATS.avgRating}/5.`,
  },
  {
    question: `¿Qué servicios ofrece ${COMPANY_NAME}?`,
    answer: `Ofrece 24 servicios en tres categorías. Techos y cubiertas: impermeabilización (desde $350.000), reparación de goteras (desde $180.000), limpieza de canales (desde $150.000), sellado de fisuras (desde $210.000), cambio de teja (desde $190.000), ajuste de bajantes (desde $170.000), limpieza de cubierta (desde $140.000) y revisión del techo (desde $130.000). Pintura y acabados: pintura interior (desde $280.000), exterior (desde $320.000), resanes (desde $210.000), alisado de paredes (desde $240.000), tratamiento de humedad (desde $250.000), pintura de rejas (desde $160.000), retoques post-obra (desde $140.000) y acabado de fachada (desde $330.000). Plomería: reparación de fugas (desde $170.000), destape de desagües (desde $160.000), reparación de llaves (desde $140.000), detección de fuga (desde $130.000), cambio de grifería (desde $150.000), ajuste de sanitario (desde $165.000), revisión de presión (desde $120.000) y mantenimiento de tuberías (desde $200.000). Todos los precios son en pesos colombianos (COP) y son de referencia; el valor final se define con visita técnica gratuita.`,
  },
  {
    question: `¿En qué ciudades y municipios atiende ${COMPANY_NAME}?`,
    answer: `Atiende en 12 municipios: Medellín, Envigado, Sabaneta, Bello, Itagüí, La Estrella, Caldas, Copacabana, Girardota, Rionegro, La Ceja y Marinilla. Todos están ubicados en el departamento de Antioquia, Colombia, en la región del Valle de Aburrá y el Oriente antioqueño.`,
  },
  {
    question: "¿Cuánto cuesta un plomero en Medellín?",
    answer:
      "Los servicios de plomería en Medellín con Espinal Multiservicios empiezan desde $120.000 COP. La revisión de presión del agua cuesta desde $120.000, la detección de fuga desde $130.000, la reparación de llaves desde $140.000, el cambio de grifería desde $150.000, el destape de desagües desde $160.000, el ajuste de sanitario desde $165.000, la reparación de fugas desde $170.000 y el mantenimiento de tuberías desde $200.000. La visita técnica y la cotización son gratuitas.",
  },
  {
    question: "¿Cuánto cuesta pintar un apartamento en Medellín?",
    answer:
      "Pintar un apartamento en Medellín puede costar entre $800.000 y $3.500.000 COP dependiendo del tamaño y estado de las paredes. Un estudio: $800.000-$1.200.000. Apartamento de 2 habitaciones: $1.200.000-$2.000.000. Apartamento de 3 habitaciones: $1.800.000-$2.800.000. Apartamento grande (4+ habitaciones): $2.500.000-$3.500.000+. Incluye mano de obra, pintura y limpieza final.",
  },
  {
    question: "¿Cuánto cuesta impermeabilizar un techo en Medellín?",
    answer:
      "La impermeabilización de techos en Medellín empieza desde $350.000 COP. El costo por m² varía según el sistema: acrílico $18.000-$30.000/m², manto asfáltico $35.000-$55.000/m², poliuretano $40.000-$65.000/m², silicona elastomérica $45.000-$70.000/m². Un techo pequeño (30-50 m²) cuesta $700.000-$1.500.000; uno mediano (60-100 m²) $1.200.000-$3.000.000; uno grande (150+ m²) $3.000.000-$7.000.000+.",
  },
  {
    question: `¿Cómo contactar a ${COMPANY_NAME}?`,
    answer: `Se puede contactar por WhatsApp al ${PHONE_DISPLAY} o por llamada telefónica al mismo número. El horario de atención es ${COVERAGE_SCHEDULE.hours}. ${COVERAGE_SCHEDULE.responseTime} ${COVERAGE_SCHEDULE.urgencyNote} También se puede solicitar una cotización desde el sitio web ${SITE_URL}.`,
  },
  {
    question: `¿${COMPANY_NAME} da garantía por los trabajos?`,
    answer:
      "Sí. Espinal Multiservicios entrega garantía por escrito en cada trabajo. El tiempo de garantía depende del tipo de servicio, los materiales utilizados y las condiciones del inmueble. La garantía se explica antes de iniciar el trabajo.",
  },
];

export default function NosotrosPage() {
  const waLink = buildWaLinkHero();

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
        name: "Nosotros",
      },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre ${COMPANY_NAME}`,
    description: metadata.description,
    url: `${SITE_URL}/nosotros`,
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_NAME,
      url: SITE_URL,
      telephone: PHONE_E164,
      description:
        "Empresa de techos y cubiertas, pintura y acabados, y plomería para hogares y negocios en Medellín y Valle de Aburrá, Colombia.",
      foundingLocation: {
        "@type": "Place",
        name: "Medellín, Antioquia, Colombia",
      },
      areaServed: MUNICIPALITY_OPTIONS.filter((m) => m !== "Otro").map(
        (m) => ({ "@type": "City", name: m }),
      ),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: SOCIAL_PROOF_STATS.avgRating,
        bestRating: 5,
        ratingCount: SOCIAL_PROOF_STATS.jobsCompleted,
      },
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 2,
        maxValue: 10,
      },
      knowsAbout: [
        "Reparación de techos",
        "Impermeabilización de cubiertas",
        "Reparación de goteras",
        "Pintura interior y exterior",
        "Tratamiento de humedad en paredes",
        "Reparación de fugas de agua",
        "Destape de desagües",
        "Mantenimiento del hogar",
        "Plomería residencial y comercial",
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LLM_FAQS.map((faq) => ({
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

      <main id="main-content" className="pt-20 pb-20 md:pb-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
              SOBRE NOSOTROS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {COMPANY_NAME}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Somos una empresa de servicios para el hogar en Medellín y el Valle de Aburrá.
              Nos especializamos en <strong>techos y cubiertas</strong>, <strong>pintura y acabados</strong> y{" "}
              <strong>plomería</strong>. Hemos completado más de{" "}
              <strong>{SOCIAL_PROOF_STATS.jobsCompleted} trabajos</strong> con una calificación
              promedio de <strong>{SOCIAL_PROOF_STATS.avgRating}/5</strong>.
            </p>
          </div>
        </section>

        {/* Key facts */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Datos clave
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-3xl font-bold text-slate-900">{SOCIAL_PROOF_STATS.jobsCompleted}+</p>
                <p className="mt-1 text-sm text-slate-600">Trabajos completados</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <p className="text-3xl font-bold text-slate-900">{SOCIAL_PROOF_STATS.avgRating}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">Calificación promedio</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-3xl font-bold text-slate-900">12</p>
                <p className="mt-1 text-sm text-slate-600">Municipios de cobertura</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-3xl font-bold text-slate-900">24</p>
                <p className="mt-1 text-sm text-slate-600">Servicios disponibles</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services summary */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Nuestros servicios
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Ofrecemos {Object.values(SERVICE_DATA).flat().length} servicios en tres categorías.
              Todos incluyen visita técnica gratuita y cotización sin compromiso.
            </p>

            <div className="mt-8 space-y-6">
              {LINE_OPTIONS.map((line) => {
                const services = SERVICE_DATA[line.id];
                const prices = services.map((s) =>
                  parseInt(s.basePrice.replace(/[^0-9]/g, ""), 10),
                );
                const minPrice = Math.min(...prices);
                return (
                  <div key={line.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">{line.label}</h3>
                      <Link
                        href={`/servicios/${line.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800"
                      >
                        Ver todos
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {services.length} servicios desde ${minPrice.toLocaleString("es-CO")} COP.{" "}
                      {services.map((s) => s.name).join(", ")}.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Cobertura
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Atendemos hogares y negocios en 12 municipios de Antioquia, Colombia.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {MUNICIPALITY_OPTIONS.filter((m) => m !== "Otro").map((m) => {
                const slug = m
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <Link
                    key={m}
                    href={`/cobertura/${slug}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
                  >
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {m}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Cómo trabajamos
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-orange-700">Paso 1</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Nos cuentas el problema</p>
                <p className="mt-1 text-sm text-slate-600">
                  Nos escribes por WhatsApp o nos llamas. Nos cuentas qué pasa y te decimos qué servicio necesitas.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-orange-700">Paso 2</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Vamos a revisar</p>
                <p className="mt-1 text-sm text-slate-600">
                  Vamos a tu casa o negocio, miramos el problema y te explicamos qué hay que hacer. Sin costo.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-orange-700">Paso 3</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Te damos el precio</p>
                <p className="mt-1 text-sm text-slate-600">
                  Te decimos exactamente qué vamos a hacer, qué materiales se usan y cuánto cuesta. Sin sorpresas.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-orange-700">Paso 4</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Hacemos el trabajo</p>
                <p className="mt-1 text-sm text-slate-600">
                  Hacemos el trabajo, limpiamos todo y te damos garantía por escrito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Contacto
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Teléfono y WhatsApp</p>
                  <p className="text-sm text-slate-600">{PHONE_DISPLAY}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Horario</p>
                  <p className="text-sm text-slate-600">{COVERAGE_SCHEDULE.hours}</p>
                  <p className="text-sm text-slate-600">{COVERAGE_SCHEDULE.responseTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Ubicación</p>
                  <p className="text-sm text-slate-600">Medellín, Antioquia, Colombia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Garantía</p>
                  <p className="text-sm text-slate-600">Garantía por escrito en cada trabajo</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Lo que dicen nuestros clientes
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIAL_DATA.map((t) => (
                <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-5">
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
                  <p className="mt-3 text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.municipality} &middot; {t.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LLM-targeted FAQ */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Preguntas frecuentes sobre {COMPANY_NAME}
            </h2>
            <div className="mt-8 space-y-4">
              {LLM_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 bg-slate-50"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-slate-900 transition-all hover:bg-white">
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
        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">Explora más</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/servicios/techos"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Techos y cubiertas
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/servicios/pintura"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Pintura y acabados
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/servicios/plomeria"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Plomería
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/cobertura/medellin"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Cobertura
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                Blog
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MobileStickyBarGlobal />
      <BlogFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
