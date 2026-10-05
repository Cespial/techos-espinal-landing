import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS_ID } from "@/lib/business";
import { LINE_OPTIONS, SITE_URL } from "@/lib/conversion";
import { lineIllustration } from "@/lib/illustrations";
import { SOLUTIONS, getSolutionBySlug, getSolutionService } from "@/lib/solutions";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import CallButton from "@/components/local/CallButton";
import FaqSection from "@/components/local/FaqSection";
import JsonLd from "@/components/local/JsonLd";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import PageHero from "@/components/local/PageHero";
import RelatedLinks from "@/components/local/RelatedLinks";
import SiteFooter from "@/components/local/SiteFooter";
import SiteHeader from "@/components/local/SiteHeader";
import SolutionLinks from "@/components/local/SolutionLinks";
import WaButton from "@/components/local/WaButton";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  const url = `${SITE_URL}/soluciones/${solution.slug}`;
  const image = `/og/og-${solution.linea}.png`;

  return {
    title: solution.title,
    description: solution.description,
    alternates: { canonical: url, languages: { "es-CO": url, "x-default": url } },
    openGraph: {
      title: solution.title,
      description: solution.description,
      url,
      type: "website",
      locale: "es_CO",
      images: [{ url: image, width: 1200, height: 630, alt: `Espinal Multiservicios: ${solution.name.toLowerCase()}` }],
    },
    twitter: { card: "summary_large_image", title: solution.title, description: solution.description, images: [image] },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  const service = getSolutionService(solution);
  const pageType = "solucion" as const;
  const url = `${SITE_URL}/soluciones/${solution.slug}`;
  const lineLabel = LINE_OPTIONS.find((line) => line.id === solution.linea)?.label ?? solution.name;

  return (
    <>
      <SiteHeader pageType={pageType} linea={solution.linea} />
      <main id="main-content">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Soluciones", href: "/soluciones" }, { name: solution.name }]} />
        <PageHero
          pageType={pageType}
          h1={solution.title}
          intro={solution.intro}
          bullets={solution.bullets}
          linea={solution.linea}
          servicio={solution.name}
          ctaLabel="Consultar mi caso"
          illustration={lineIllustration(solution.linea)}
        />

        <nav aria-label="En esta solución" className="border-y border-slate-200 bg-paper">
          <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-6 px-4 py-2 text-sm font-semibold sm:px-6">
            {[
              { href: "#alcance", label: "Qué comprende" },
              { href: "#precio", label: "Precio y presupuesto" },
              { href: "#cotizar", label: "Qué enviar para cotizar" },
              { href: "#faq", label: "Preguntas frecuentes" },
            ].map((item) => (
              <li key={item.href}><a href={item.href} className="inline-flex min-h-11 items-center text-slate-700 hover:text-orange-700 hover:underline">{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="situacion-heading" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="situacion-heading" className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-4xl">{solution.situationHeading}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{solution.situationIntro}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {solution.situations.map((item) => (
                <div key={item.title} className="border-t-2 border-brand-soft pt-5">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="alcance" aria-labelledby="alcance-heading" className="border-t border-slate-200 bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="alcance-heading" className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-4xl">Qué comprende la propuesta</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">Antes de empezar, dejamos por escrito qué se va a hacer y qué queda fuera. Estos son los puntos que debemos definir para tu caso.</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900">El alcance que acordamos</h3>
                <ul className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
                  {solution.scope.map((item) => <li key={item} className="border-l-2 border-brand pl-4">{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Trabajos que no se deben dar por incluidos</h3>
                <ul className="mt-5 list-disc space-y-4 pl-5 text-base leading-relaxed text-slate-700">
                  {solution.separateScope.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Si aparece una necesidad adicional, su alcance y precio se acuerdan antes de realizarla.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="comparar-heading" className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="comparar-heading" className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-4xl">{solution.comparisonHeading}</h2>
            <dl className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
              {solution.comparison.map((item) => (
                <div key={item.title} className="border-t border-slate-200 pt-5">
                  <dt className="text-xl font-bold text-slate-900">{item.title}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-slate-700">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="precio" aria-labelledby="precio-heading" className="border-t border-slate-200 bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="precio-heading" className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-4xl">Cuánto cuesta y qué cambia el presupuesto</h2>
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <p className="text-sm font-semibold text-slate-600">{solution.name}: referencia del catálogo</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"><span className="text-lg font-medium">desde </span>{service.basePrice.replace(" COP", "")}<span className="ml-1 text-sm font-semibold">COP</span></p>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{solution.priceNote}</p>
                <WaButton source="service_card" pageType={pageType} linea={solution.linea} servicio={solution.name} label="Cotizar este trabajo" className="mt-6 w-full sm:w-auto" />
              </div>
              <dl className="grid gap-6 sm:grid-cols-2">
                {solution.priceFactors.map((item) => (
                  <div key={item.title}>
                    <dt className="text-base font-bold text-slate-900">{item.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">La orientación inicial sirve para definir el siguiente paso. Si necesitas un diagnóstico o una intervención adicional, confirmamos su alcance y si tiene costo antes de realizarla.</p>
          </div>
        </section>

        <section id="cotizar" aria-labelledby="cotizar-heading" className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
            <div>
              <h2 id="cotizar-heading" className="text-3xl font-semibold text-slate-900 md:text-4xl">Cuéntanos qué necesitas resolver</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">Henrry y su equipo reciben tu solicitud. Esta información nos ayuda a entender el caso y a coordinar la revisión; no necesitas tener un diagnóstico hecho.</p>
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-700">
                {solution.messageItems.map((item) => <li key={item} className="pl-1">{item}</li>)}
              </ol>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <WaButton source="final_cta" pageType={pageType} linea={solution.linea} servicio={solution.name} label="Consultar por WhatsApp" size="lg" />
                <CallButton source="final_cta" pageType={pageType} linea={solution.linea} size="lg" />
              </div>
            </div>
            <div className="self-start rounded-3xl border border-slate-200 bg-paper p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900">Medellín, Bello y el Valle de Aburrá</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">Indica municipio y barrio para confirmar las condiciones de atención y la disponibilidad. Si vives en un edificio o conjunto, cuéntanos los requisitos de ingreso y quién autoriza el trabajo.</p>
              <ul className="mt-5 space-y-2 text-sm font-semibold">
                {[
                  { href: `/servicios/${solution.linea}/medellin`, label: `${lineLabel} en Medellín` },
                  { href: `/servicios/${solution.linea}/bello`, label: `${lineLabel} en Bello` },
                  { href: "/cobertura", label: "Consultar otras zonas de cobertura" },
                ].map((link) => <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center text-orange-700 underline decoration-orange-200 underline-offset-4 hover:decoration-orange-700">{link.label}</Link></li>)}
              </ul>
            </div>
          </div>
        </section>

        <FaqSection items={solution.faqs} />
        <SolutionLinks linea={solution.linea} excludeSlug={solution.slug} heading="Otras soluciones que pueden ayudarte" tone="slate" />
        <RelatedLinks tone="white" groups={[
          { heading: "Guías para entender el trabajo", links: solution.guides },
          { heading: "Más información de Espinal", links: [
            { href: `/servicios/${solution.linea}`, label: `Ver catálogo de ${lineLabel.toLowerCase()}` },
            { href: "/soluciones", label: "Todas las soluciones" },
            { href: "/nosotros", label: "Conoce a Henrry y su equipo" },
          ] },
        ]} />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} linea={solution.linea} servicio={solution.name} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: solution.name,
        description: solution.description,
        serviceType: solution.name,
        url,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "Place", name: "Valle de Aburrá, Antioquia, Colombia" },
      }} />
    </>
  );
}
