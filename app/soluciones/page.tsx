import type { Metadata } from "next";
import { SITE_URL } from "@/lib/conversion";
import { WORKBENCH } from "@/lib/illustrations";
import { SOLUTIONS } from "@/lib/solutions";
import Breadcrumbs from "@/components/local/Breadcrumbs";
import CtaBand from "@/components/local/CtaBand";
import JsonLd from "@/components/local/JsonLd";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import PageHero from "@/components/local/PageHero";
import RelatedLinks from "@/components/local/RelatedLinks";
import SiteFooter from "@/components/local/SiteFooter";
import SiteHeader from "@/components/local/SiteHeader";
import SolutionLinks from "@/components/local/SolutionLinks";

const title = "Soluciones para tu hogar en Medellín y Bello";
const description = "Reparación de goteras y fugas, pintura interior, impermeabilización y destapes en Medellín, Bello y Valle de Aburrá. Conoce alcances y cómo cotizar.";
const url = `${SITE_URL}/soluciones`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url, languages: { "es-CO": url, "x-default": url } },
  openGraph: { title, description, url, type: "website", locale: "es_CO", images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: "Espinal Multiservicios: soluciones para tu hogar" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/og-default.png"] },
};

export default function SolutionsPage() {
  const pageType = "soluciones_index" as const;

  return (
    <>
      <SiteHeader pageType={pageType} />
      <main id="main-content">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Soluciones" }]} />
        <PageHero
          pageType={pageType}
          h1="¿Qué necesitas resolver en tu casa o negocio?"
          intro="Una gotera, una fuga, un desagüe tapado o un espacio por pintar necesitan propuestas diferentes. Encuentra la solución, conoce qué comprende y comparte tu caso para cotizar en Medellín, Bello y el Valle de Aburrá."
          bullets={["Alcances explicados", "Precios de referencia", "Atención por WhatsApp o llamada"]}
          ctaLabel="Cuéntanos qué pasa"
          illustration={WORKBENCH}
        />
        <SolutionLinks heading="Elige según lo que necesitas" />
        <section aria-labelledby="comparar-propuestas-heading" className="border-t border-slate-200 bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="comparar-propuestas-heading" className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-4xl">Un presupuesto útil empieza con un alcance claro</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                { title: "Describe el problema", text: "Dinos dónde ocurre, desde cuándo y en qué municipio. Puedes enviar fotos desde un lugar seguro, aunque no sepas cuál es la causa." },
                { title: "Distingue lo puntual de lo completo", text: "Reparar una gotera no equivale a cambiar un techo. Pintar una pared no es renovar todo el apartamento. Cada solución explica esa diferencia." },
                { title: "Confirma qué vas a contratar", text: "La propuesta debe detallar trabajo, materiales, precio y condiciones. Las referencias del catálogo orientan; el valor final corresponde al alcance acordado." },
              ].map((item) => <div key={item.title} className="border-t border-slate-200 pt-5"><h3 className="text-xl font-bold text-slate-900">{item.title}</h3><p className="mt-3 text-base leading-relaxed text-slate-700">{item.text}</p></div>)}
            </div>
          </div>
        </section>
        <CtaBand pageType={pageType} heading="¿No sabes qué servicio necesitas?" body="Cuéntanos qué está pasando y en qué barrio estás. Te ayudamos a definir el siguiente paso y confirmamos disponibilidad antes de programar." />
        <RelatedLinks groups={[
          { heading: "Explora el catálogo por oficio", links: [
            { href: "/servicios/techos", label: "Techos y cubiertas" },
            { href: "/servicios/pintura", label: "Pintura y acabados" },
            { href: "/servicios/plomeria", label: "Plomería" },
          ] },
          { heading: "Consulta tu zona", links: [
            { href: "/cobertura/medellin", label: "Medellín" },
            { href: "/cobertura/bello", label: "Bello" },
            { href: "/cobertura", label: "Toda la cobertura" },
          ] },
        ]} />
      </main>
      <SiteFooter />
      <MobileStickyBar pageType={pageType} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${url}#soluciones`,
        name: "Soluciones de Espinal Multiservicios",
        url,
        numberOfItems: SOLUTIONS.length,
        itemListElement: SOLUTIONS.map((solution, index) => ({ "@type": "ListItem", position: index + 1, name: solution.name, url: `${SITE_URL}/soluciones/${solution.slug}` })),
      }} />
    </>
  );
}
