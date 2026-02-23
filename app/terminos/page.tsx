import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/conversion";

export const metadata: Metadata = {
  title: "Terminos de Servicio",
  description:
    "Terminos generales de Techos Espinal para inspeccion tecnica, cotizacion y ejecucion de trabajos en techos.",
  alternates: { canonical: `${SITE_URL}/terminos` },
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <h1
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        Terminos de Servicio
      </h1>
      <p className="mt-2 font-sans text-body-sm text-text-tertiary">Ultima actualizacion: febrero 2026</p>

      <div className="mt-10 space-y-8 font-sans text-body leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-sans text-h3 text-foreground">1. Alcance del servicio</h2>
          <p className="mt-3">
            {COMPANY_NAME} realiza inspecciones tecnicas, mantenimiento y reparaciones de techos.
            El alcance final se define por escrito despues del diagnostico.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">2. Cotizacion y aprobacion</h2>
          <p className="mt-3">
            La cotizacion incluye alcance, valor y tiempos estimados. El trabajo inicia cuando el
            cliente aprueba la propuesta por un canal acordado.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">3. Garantia</h2>
          <p className="mt-3">
            La garantia se entrega por escrito y depende del tipo de trabajo, materiales aplicados y
            condiciones de la cubierta. No aplicamos promesas generales iguales para todos los casos.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">4. Responsabilidades del cliente</h2>
          <p className="mt-3">
            El cliente debe facilitar acceso seguro al inmueble y reportar condiciones relevantes del
            techo para una ejecucion adecuada.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">5. Cambios de alcance</h2>
          <p className="mt-3">
            Si durante la ejecucion se detectan necesidades no contempladas, se informara el ajuste
            de alcance y valor antes de continuar.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">6. Contacto</h2>
          <p className="mt-3">
            Para dudas sobre estos terminos, escribenos por WhatsApp o llamada desde nuestra pagina principal.
          </p>
        </section>
      </div>
    </main>
  );
}
