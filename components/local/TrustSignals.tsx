import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { GBP_URL, GBP_REVIEW_URL } from "@/lib/business";

type Props = {
  /** Municipio para personalizar el texto ("en Envigado"). */
  municipality?: string;
  /** Fondo alterno para encajar en el ritmo de la página. */
  tone?: "white" | "slate";
  /** Encabezado de la sección. */
  heading?: string;
};

// Promesas verificables del servicio. Sin cifras de clientes ni calificaciones:
// las reseñas reales viven en Google y se enlazan cuando existe la ficha.
const PROMISES = [
  {
    icon: "visita",
    title: "Visita técnica gratis",
    text: "Vamos, revisamos el problema y te explicamos qué hay que hacer antes de cobrar.",
  },
  {
    icon: "cotizacion",
    title: "Precio claro antes de empezar",
    text: "Te damos la cotización por escrito. Si cambia el alcance, lo acordamos primero.",
  },
  {
    icon: "garantia",
    title: "Garantía por escrito",
    text: "Cada trabajo queda con garantía firmada, según el servicio y el alcance.",
  },
  {
    icon: "cobertura",
    title: "12 municipios",
    text: "Medellín, Valle de Aburrá y Oriente cercano, con la misma garantía en todos.",
  },
] as const;

export default function TrustSignals({
  municipality,
  tone = "slate",
  heading = "Trabajamos con reglas claras",
}: Props) {
  const place = municipality ? ` en ${municipality}` : "";
  const bg = tone === "white" ? "bg-white" : "bg-slate-50";
  const card = tone === "white" ? "bg-slate-50" : "bg-white";

  return (
    <section className={`border-t border-slate-200 ${bg} py-16 md:py-24`} aria-labelledby="trust-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="trust-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          Así atendemos cada casa y negocio{place}: lo que prometemos queda por escrito.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ icon, title, text }) => (
            <article
              key={title}
              className={`rounded-2xl border border-slate-200 ${card} p-5`}
            >
              <Image src={`/brand/icons/${icon}.svg`} alt="" width={24} height={24} aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </article>
          ))}
        </div>

        {GBP_URL ? (
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold text-slate-900">
                  Lee las opiniones de clientes en Google
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Las reseñas las escriben los clientes directamente en nuestra ficha de Google Maps.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={GBP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-orange-400"
              >
                Ver reseñas en Google
              </a>
              {GBP_REVIEW_URL && (
                <a
                  href={GBP_REVIEW_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700" 
                >
                  Déjanos tu reseña
                </a>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-600">
            ¿Ya trabajamos en tu casa?{" "}
            <Link href="/nosotros" className="font-semibold text-orange-700 hover:underline">
              Conoce al equipo
            </Link>{" "}
            y cuéntanos cómo te fue por WhatsApp.
          </p>
        )}
      </div>
    </section>
  );
}
