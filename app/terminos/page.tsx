import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Términos generales de Espinal Multiservicios para inspección técnica, cotización y ejecución de trabajos.",
  alternates: { canonical: `${SITE_URL}/terminos` },
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <h1
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        Términos de servicio
      </h1>
      <p className="mt-2 font-sans text-body-sm text-text-tertiary">Última actualización: febrero 2026</p>

      <div className="mt-10 space-y-8 font-sans text-body leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-sans text-h3 text-foreground">1. Alcance del servicio</h2>
          <p className="mt-3">
            {COMPANY_NAME} realiza inspecciones técnicas, mantenimiento y reparaciones de techos.
            El alcance final se define por escrito después del diagnóstico.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">2. Cotización y aprobación</h2>
          <p className="mt-3">
            La cotización incluye alcance, valor y tiempos estimados. El trabajo inicia cuando el
            cliente aprueba la propuesta por un canal acordado.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">3. Garantía</h2>
          <p className="mt-3">
            La garantía se entrega por escrito y depende del tipo de trabajo, materiales aplicados y
            condiciones de la cubierta. No aplicamos promesas generales iguales para todos los casos.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">4. Responsabilidades del cliente</h2>
          <p className="mt-3">
            El cliente debe facilitar acceso seguro al inmueble y reportar condiciones relevantes del
            techo para una ejecución adecuada.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">5. Cambios de alcance</h2>
          <p className="mt-3">
            Si durante la ejecución se detectan necesidades no contempladas, se informará el ajuste
            de alcance y valor antes de continuar.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">6. Contacto</h2>
          <p className="mt-3">
            Para dudas sobre estos términos, escríbenos por WhatsApp o llamada desde nuestra página principal.
          </p>
        </section>
      </div>
    </main>
  );
}
