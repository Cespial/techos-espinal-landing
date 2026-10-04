import Image from "next/image";
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
    <section className={`border-t border-slate-200 ${bg} py-16 md:py-24`} aria-labelledby="local-links-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 id="local-links-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Servicios por municipio
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Atendemos los 12 municipios con los mismos precios de referencia y la misma garantía. Elige el tuyo
              para ver qué hacemos allí.
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
          </div>
          <div className="relative -order-1 aspect-[3/2] overflow-hidden rounded-3xl bg-paper md:order-none">
            <Image
              src="/illustrations/mapa-valle.webp"
              alt="Ilustración del Valle de Aburrá: casas de techo de teja entre las montañas y el río Medellín"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SERVICE_LINE_SEO.map((line) => (
            <div key={line.slug}>
              <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900">
                <Image
                  src={`/brand/icons/${line.slug}.svg`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 mix-blend-multiply"
                  aria-hidden="true"
                />
                <Link href={`/servicios/${line.slug}`} className="hover:underline">
                  {line.heroTitle}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1.5">
                {CROSS_PAGE_SEO.filter((p) => p.lineSlug === line.slug).map((p) => (
                  <li key={`${p.lineSlug}-${p.municipioSlug}`}>
                    <Link
                      href={`/servicios/${p.lineSlug}/${p.municipioSlug}`}
                      className="inline-flex min-h-10 items-center text-sm text-slate-600 hover:text-orange-700 hover:underline"
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
