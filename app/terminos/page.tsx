import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Términos completos del servicio de diseño web de Tu Página en 48. Entrega garantizada en 48 horas, desde $1.000.000 COP.",
  alternates: { canonical: `${SITE_URL}/terminos` },
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <h1
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        Términos de Servicio
      </h1>
      <p className="mt-2 font-sans text-body-sm text-text-tertiary">
        Última actualización: febrero 2026
      </p>

      <div className="mt-10 space-y-8 font-sans text-body leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-sans text-h3 text-foreground">1. Aceptación</h2>
          <p className="mt-3">
            Al contratar los servicios de {SITE_NAME}, aceptas estos términos en su totalidad.
            Si no estás de acuerdo con alguna parte, no utilices nuestros servicios.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">2. Servicios</h2>
          <p className="mt-3">
            {SITE_NAME} diseña y desarrolla páginas web profesionales. El alcance, entregables y
            plazos de cada proyecto se acuerdan por escrito (WhatsApp o correo electrónico) antes
            de iniciar el trabajo.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">3. Pagos</h2>
          <p className="mt-3">
            Los precios publicados están en pesos colombianos (COP) e incluyen IVA. El pago se
            realiza de forma anticipada según el plan seleccionado. Una vez confirmado el pago,
            iniciamos el desarrollo.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">4. Entrega</h2>
          <p className="mt-3">
            Nos comprometemos a entregar la página web en un plazo máximo de 48 horas hábiles
            después de recibir toda la información necesaria (textos, logo, imágenes). El plazo
            puede variar si el cliente no proporciona los materiales a tiempo.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">5. Revisiones</h2>
          <p className="mt-3">
            Cada plan incluye un número específico de revisiones. Las revisiones adicionales pueden
            generar costos extra que se comunicarán previamente.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">6. Propiedad intelectual</h2>
          <p className="mt-3">
            Una vez completado el pago total, el cliente es propietario del diseño y contenido de
            su página. {SITE_NAME} se reserva el derecho de mostrar el trabajo en su portafolio
            salvo acuerdo contrario por escrito.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">7. Hosting y mantenimiento</h2>
          <p className="mt-3">
            El período de hosting incluido varía según el plan contratado. Después de ese período,
            el cliente puede renovar el servicio o migrar su página a otro proveedor.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">8. Limitación de responsabilidad</h2>
          <p className="mt-3">
            {SITE_NAME} no se responsabiliza por pérdidas indirectas derivadas del uso de la
            página web, incluyendo pero no limitado a pérdida de ingresos o datos.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-h3 text-foreground">9. Contacto</h2>
          <p className="mt-3">
            Para preguntas sobre estos términos, escríbenos por WhatsApp o a través del formulario
            de contacto en nuestra página principal.
          </p>
        </section>
      </div>
    </main>
  );
}
