import Link from "next/link";
import { CROSS_PAGE_SEO, MUNICIPALITY_SEO, SERVICE_LINE_SEO } from "@/lib/seo-data";

type Props = {
  /** Fondo de la sección. */
  tone?: "white" | "slate";
};

/**
 * Bloque de enlaces rastreables a las 12 páginas de municipio y a las 36 páginas
 * servicio×municipio. Server component: HTML plano, sin JS en el cliente.
 */
export default function LocalLinks({ tone = "white" }: Props) {
  const bg = tone === "white" ? "bg-white" : "bg-slate-50";

  return (
    <section className={`border-t border-slate-200 ${bg} py-12 md:py-16`} aria-labelledby="local-links-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="local-links-heading" className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Servicios por municipio
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Atiendo los 12 municipios con los mismos precios de referencia y la misma garantía. Elige el tuyo
          para ver qué hago allí.
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Municipios">
          {MUNICIPALITY_SEO.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/cobertura/${m.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-700"
              >
                {m.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SERVICE_LINE_SEO.map((line) => (
            <div key={line.slug}>
              <h3 className="text-base font-bold tracking-tight text-slate-900">
                <Link href={`/servicios/${line.slug}`} className="hover:underline">
                  {line.heroTitle}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1.5">
                {CROSS_PAGE_SEO.filter((p) => p.lineSlug === line.slug).map((p) => (
                  <li key={`${p.lineSlug}-${p.municipioSlug}`}>
                    <Link
                      href={`/servicios/${p.lineSlug}/${p.municipioSlug}`}
                      className="inline-flex min-h-8 items-center text-sm text-slate-600 hover:text-orange-700 hover:underline"
                    >
                      {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
