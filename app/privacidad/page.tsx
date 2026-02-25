import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Conoce cómo Espinal Multiservicios trata los datos personales que recibimos por WhatsApp, llamada o formulario.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <h1
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        Política de privacidad
      </h1>
      <p className="mt-2 font-sans text-body-sm text-text-tertiary">Última actualización: febrero 2026</p>

      <div className="mt-10 space-y-8 font-sans text-body leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-sans text-h3 text-foreground">1. Información que recopilamos</h2>
          <p className="mt-3">
            Cuando nos contactas, podemos recibir datos como nombre, teléfono, municipio, tipo de
            servicio solicitado y nivel de urgencia. Esta información la entregas de forma voluntaria.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">2. Uso de la información</h2>
          <p className="mt-3">
            Usamos estos datos para responder solicitudes, coordinar inspecciones técnicas, enviar
            cotizaciones y hacer seguimiento del servicio. No comercializamos tu información personal.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">3. Herramientas de analítica</h2>
          <p className="mt-3">
            Este sitio puede usar herramientas de analítica para medir interacciones generales (por
            ejemplo, clics en botones de contacto). No se usa esta información para perfilar personas.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">4. WhatsApp y llamadas</h2>
          <p className="mt-3">
            Si escribes por WhatsApp o llamas, tu comunicación se gestiona en plataformas de terceros.
            Te recomendamos revisar sus políticas de privacidad para conocer su tratamiento de datos.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">5. Seguridad</h2>
          <p className="mt-3">
            Aplicamos medidas razonables para proteger la información. Ningún método de transmisión en
            internet garantiza seguridad absoluta.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">6. Tus derechos</h2>
          <p className="mt-3">
            Puedes solicitar actualización o eliminación de tus datos contactándonos por WhatsApp.
            Revisaremos tu solicitud en un plazo razonable.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">7. Cambios a esta política</h2>
          <p className="mt-3">
            Podemos actualizar esta política cuando sea necesario. La versión vigente siempre estará
            publicada en esta página.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">8. Contacto</h2>
          <p className="mt-3">Para preguntas sobre privacidad, escríbenos desde el sitio de {COMPANY_NAME}.</p>
        </section>
      </div>
    </main>
  );
}
