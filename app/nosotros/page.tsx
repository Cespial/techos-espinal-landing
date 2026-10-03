import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPANY_NAME,
  SITE_URL,
  PHONE_DISPLAY,
  SERVICE_DATA,
  LINE_OPTIONS,
  COVERAGE_SCHEDULE,
} from "@/lib/conversion";
import { OWNER } from "@/lib/owner";
import { BUSINESS_ID, buildPersonNode } from "@/lib/business";
import { MUNICIPALITY_SEO, SERVICE_LINE_SEO } from "@/lib/seo-data";
import JsonLd from "@/components/local/JsonLd";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import OwnerCard from "@/components/local/OwnerCard";
import ProcessSteps from "@/components/local/ProcessSteps";
import TrustSignals from "@/components/local/TrustSignals";
import FaqSection from "@/components/local/FaqSection";
import CtaBand from "@/components/local/CtaBand";
import WaButton from "@/components/local/WaButton";
import CallButton from "@/components/local/CallButton";

const TITLE = `Quiénes somos: el equipo de ${OWNER.name} en ${COMPANY_NAME}`;
const DESCRIPTION = `${COMPANY_NAME} es una empresa de techos, pintura y plomería a domicilio en Medellín y 11 municipios, fundada y dirigida por ${OWNER.name}. Revisamos gratis, damos el precio por escrito y respondemos con garantía firmada.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/nosotros` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/nosotros`,
    type: "profile",
    locale: "es_CO",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: TITLE }],
  },
};

const FAQS = [
  {
    question: `¿Quién es ${OWNER.name}?`,
    answer: `${OWNER.name} es el fundador y técnico principal de ${COMPANY_NAME}. Dirige el equipo que atiende casas y negocios en Medellín y el Valle de Aburrá en techos, pintura y plomería, con precio por escrito antes de empezar y garantía firmada en cada trabajo.`,
  },
  {
    question: `¿Qué hace ${COMPANY_NAME}?`,
    answer: `Tres cosas: techos y cubiertas (goteras, impermeabilización, canales, tejas), pintura y acabados (interior, exterior, resanes, humedad) y plomería (fugas, destapes, grifería, sanitarios). En total 24 servicios con precio de referencia publicado.`,
  },
  {
    question: `¿En qué municipios atiende ${COMPANY_NAME}?`,
    answer: `Medellín, Envigado, Sabaneta, Bello, Itagüí, La Estrella, Caldas, Copacabana, Girardota, Rionegro, La Ceja y Marinilla, en Antioquia.`,
  },
  {
    question: "¿Cuánto cuesta la visita?",
    answer: "Nada. Vamos, revisamos el problema y te explicamos qué hay que hacer. Cobramos solo si decides hacer el trabajo, con el precio que te dimos por escrito.",
  },
  {
    question: `¿Cómo contactar a ${COMPANY_NAME}?`,
    answer: `Por WhatsApp o llamada al ${PHONE_DISPLAY}. Horario: ${COVERAGE_SCHEDULE.hours} ${COVERAGE_SCHEDULE.responseTime} ${COVERAGE_SCHEDULE.urgencyNote}`,
  },
  {
    question: "¿Dan garantía por los trabajos?",
    answer: "Sí. Cada trabajo queda con garantía por escrito; el tiempo depende del servicio y del alcance acordado.",
  },
];

export default function NosotrosPage() {
  const pageType = "nosotros" as const;
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/nosotros`,
    mainEntity: buildPersonNode(),
    about: { "@id": BUSINESS_ID },
  };

  return (
    <>
      <SiteHeader pageType={pageType} />
      <main id="main-content">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: OWNER.name }]} />

        <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
            <div>
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Somos {COMPANY_NAME}, el equipo de {OWNER.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
                Arreglamos techos, pintamos y reparamos la plomería de casas y negocios en Medellín y el Valle de
                Aburrá. {OWNER.givenName} fundó la empresa, dirige el equipo y sigue yendo a las visitas técnicas.
              </p>
              <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
                {OWNER.bio.map((line) => (
                  <li key={line} className="border-l-2 border-orange-600 pl-4">
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WaButton source="hero" pageType={pageType} label="Escríbenos por WhatsApp" size="lg" />
                <CallButton source="hero" pageType={pageType} size="lg" />
              </div>
            </div>
            <OwnerCard variant="hero" />
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24" aria-labelledby="facts-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="facts-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Lo que puedes esperar
            </h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["$0", "cuesta la visita técnica"],
                ["Por escrito", "el precio, antes de empezar"],
                ["Firmada", "la garantía de cada trabajo"],
                [`${MUNICIPALITY_SEO.length}`, "municipios de Antioquia"],
              ].map(([value, label]) => (
                <div key={label} className="border-t-2 border-slate-900 pt-3">
                  <dt className="text-3xl font-bold tracking-tight text-slate-900">{value}</dt>
                  <dd className="mt-1 text-sm text-slate-600">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-paper py-16 md:py-24" aria-labelledby="what-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="what-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Qué hacemos
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {LINE_OPTIONS.map((line) => {
                const seo = SERVICE_LINE_SEO.find((s) => s.slug === line.id);
                const prices = SERVICE_DATA[line.id].map((s) => Number(s.basePrice.replace(/[^0-9]/g, "")));
                const min = Math.min(...prices).toLocaleString("es-CO");
                return (
                  <div key={line.id} className="border-t-2 border-slate-900 pt-4">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      <Link href={`/servicios/${line.id}`} className="hover:underline">
                        {line.label}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{seo?.heroDescription}</p>
                    <p className="mt-3 text-sm text-slate-700">
                      {SERVICE_DATA[line.id].map((s) => s.name).join(", ")}.
                    </p>
                    <p className="mt-3 text-sm text-slate-900">
                      <span className="text-slate-600">desde </span>
                      <span className="font-semibold tabular-nums">${min}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ProcessSteps pageType={pageType} heading="Así trabajamos" />
        <TrustSignals heading="Nuestras reglas" />

        <section className="border-t border-slate-200 bg-white py-16 md:py-24" aria-labelledby="where-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="where-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Dónde trabajamos
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Medellín, Valle de Aburrá y Oriente cercano. {COVERAGE_SCHEDULE.hours} {COVERAGE_SCHEDULE.urgencyNote}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {MUNICIPALITY_SEO.map((m) => (
                <li key={m.slug}>
                  <Link href={`/cobertura/${m.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-700">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection items={FAQS} heading={`Preguntas sobre ${COMPANY_NAME}`} tone="slate" />
        <CtaBand pageType={pageType} heading="¿Hablamos de tu casa?" body="Escríbenos por WhatsApp con una foto del problema y te decimos qué servicio aplica y cuándo podemos ir." />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} />
      <JsonLd data={profileSchema} />
    </>
  );
}
