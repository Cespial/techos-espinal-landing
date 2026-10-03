import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import Breadcrumbs from "@/components/local/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Conoce cómo Espinal Multiservicios trata los datos personales que recibimos por WhatsApp, llamada o formulario.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader pageType="legal" />
      <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Política de privacidad", href: "/privacidad" }]} />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 md:pb-24 md:pt-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">Política de privacidad</h1>
      <p className="mt-2 text-sm text-slate-600">Última actualización: febrero 2026</p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">1. Información que recopilamos</h2>
          <p className="mt-3">
            Cuando nos contactas, podemos recibir datos como nombre, teléfono, municipio, tipo de
            servicio solicitado y nivel de urgencia. Esta información la entregas de forma voluntaria.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">2. Uso de la información</h2>
          <p className="mt-3">
            Usamos estos datos para responder solicitudes, coordinar inspecciones técnicas, enviar
            cotizaciones y hacer seguimiento del servicio. No comercializamos tu información personal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">3. Herramientas de analítica</h2>
          <p className="mt-3">
            Este sitio puede usar herramientas de analítica para medir interacciones generales (por
            ejemplo, clics en botones de contacto). No se usa esta información para perfilar personas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">4. WhatsApp y llamadas</h2>
          <p className="mt-3">
            Si escribes por WhatsApp o llamas, tu comunicación se gestiona en plataformas de terceros.
            Te recomendamos revisar sus políticas de privacidad para conocer su tratamiento de datos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">5. Seguridad</h2>
          <p className="mt-3">
            Aplicamos medidas razonables para proteger la información. Ningún método de transmisión en
            internet garantiza seguridad absoluta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">6. Tus derechos</h2>
          <p className="mt-3">
            Puedes solicitar actualización o eliminación de tus datos contactándonos por WhatsApp.
            Revisaremos tu solicitud en un plazo razonable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">7. Cambios a esta política</h2>
          <p className="mt-3">
            Podemos actualizar esta política cuando sea necesario. La versión vigente siempre estará
            publicada en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">8. Contacto</h2>
          <p className="mt-3">Para preguntas sobre privacidad, escríbenos desde el sitio de {COMPANY_NAME}.</p>
        </section>
      </div>
    </main>
      <SiteFooter />
      <MobileStickyBar pageType="legal" />
    </>
  );
}
