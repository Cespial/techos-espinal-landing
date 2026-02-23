import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo Tu Página en 48 protege tus datos personales. Prácticas de privacidad transparentes para tu tranquilidad.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <h1
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        Política de Privacidad
      </h1>
      <p className="mt-2 font-sans text-body-sm text-text-tertiary">
        Última actualización: febrero 2026
      </p>

      <div className="mt-10 space-y-8 font-sans text-body leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-sans text-h3 text-foreground">1. Información que recopilamos</h2>
          <p className="mt-3">
            Al usar nuestro sitio web o contratar nuestros servicios, podemos recopilar: nombre,
            número de WhatsApp, tipo de negocio y plan seleccionado. Esta información se
            proporciona voluntariamente a través del formulario de contacto o por WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">2. Uso de la información</h2>
          <p className="mt-3">
            Usamos tus datos exclusivamente para: comunicarnos contigo sobre el servicio
            contratado, enviarte actualizaciones del proyecto y mejorar nuestros servicios.
            No vendemos ni compartimos tu información con terceros.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">3. Google Analytics</h2>
          <p className="mt-3">
            Utilizamos Google Analytics para entender cómo los visitantes interactúan con nuestro
            sitio. Esta herramienta recopila datos anónimos como páginas visitadas, tiempo de
            permanencia y dispositivo utilizado. No recopilamos información personal identificable
            a través de Analytics.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">4. Cookies</h2>
          <p className="mt-3">
            Nuestro sitio puede utilizar cookies técnicas necesarias para su funcionamiento y
            cookies de análisis de Google Analytics. Puedes desactivar las cookies desde la
            configuración de tu navegador.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">5. WhatsApp</h2>
          <p className="mt-3">
            Cuando nos contactas por WhatsApp, tus mensajes se procesan a través de la plataforma
            de Meta (WhatsApp). Te recomendamos revisar la política de privacidad de WhatsApp para
            entender cómo manejan tus datos.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">6. Seguridad</h2>
          <p className="mt-3">
            Tomamos medidas razonables para proteger tu información personal. Sin embargo, ningún
            método de transmisión por Internet es 100% seguro.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">7. Tus derechos</h2>
          <p className="mt-3">
            Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier
            momento escribiéndonos por WhatsApp. Atenderemos tu solicitud en un plazo máximo de
            10 días hábiles.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">8. Cambios a esta política</h2>
          <p className="mt-3">
            Podemos actualizar esta política periódicamente. La fecha de última actualización se
            indica al inicio de esta página. El uso continuado del sitio implica la aceptación de
            los cambios.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">9. Contacto</h2>
          <p className="mt-3">
            Para preguntas sobre esta política, escríbenos por WhatsApp o a través del formulario
            de contacto en {SITE_NAME}.
          </p>
        </section>
      </div>
    </main>
  );
}
