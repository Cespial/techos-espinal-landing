import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Términos generales de Espinal Multiservicios para inspección técnica, cotización y ejecución de trabajos.",
  alternates: { canonical: `${SITE_URL}/terminos` },
  robots: { index: false, follow: true },
  openGraph: { images: [{ url: "/og/og-default.png", width: 1200, height: 630 }] },
};

export default function TerminosPage() {
  return (
    <>
      <SiteHeader pageType="legal" />
      <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Términos de servicio", href: "/terminos" }]} />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 md:pb-24 md:pt-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">Términos de servicio</h1>
      <p className="mt-2 text-sm text-slate-600">Última actualización: febrero 2026</p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">1. Alcance del servicio</h2>
          <p className="mt-3">
            {COMPANY_NAME} realiza inspecciones técnicas, mantenimiento y reparaciones de techos.
            El alcance final se define por escrito después del diagnóstico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">2. Cotización y aprobación</h2>
          <p className="mt-3">
            La cotización incluye alcance, valor y tiempos estimados. El trabajo inicia cuando el
            cliente aprueba la propuesta por un canal acordado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">3. Garantía</h2>
          <p className="mt-3">
            La garantía se entrega por escrito y depende del tipo de trabajo, materiales aplicados y
            condiciones de la cubierta. No aplicamos promesas generales iguales para todos los casos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">4. Responsabilidades del cliente</h2>
          <p className="mt-3">
            El cliente debe facilitar acceso seguro al inmueble y reportar condiciones relevantes del
            techo para una ejecución adecuada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">5. Cambios de alcance</h2>
          <p className="mt-3">
            Si durante la ejecución se detectan necesidades no contempladas, se informará el ajuste
            de alcance y valor antes de continuar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">6. Contacto</h2>
          <p className="mt-3">
            Para dudas sobre estos términos, escríbenos por WhatsApp o llamada desde nuestra página principal.
          </p>
        </section>
      </div>
    </main>
      <SiteFooter />
      <MobileStickyBar pageType="legal" />
    </>
  );
}
