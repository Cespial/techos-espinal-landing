import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceLineId } from "@/lib/conversion";
import { SERVICE_LINE_SEO, MUNICIPALITY_SEO } from "@/lib/seo-data";

type Props = {
  serviceLines: ServiceLineId[];
  municipalities: string[];
};

const LINE_LABEL: Record<ServiceLineId, string> = {
  techos: "Reparación de techos y goteras",
  pintura: "Pintura y acabados",
  plomeria: "Plomería a domicilio",
};

/**
 * Enlaces internos rastreables desde cada artículo hacia la página de servicio
 * y hacia las páginas servicio×municipio que el artículo menciona.
 */
export default function RelatedServices({ serviceLines, municipalities }: Props) {
  const lines = serviceLines.filter((l) => SERVICE_LINE_SEO.some((s) => s.slug === l));
  if (lines.length === 0) return null;
  const primary = lines[0];
  const munis = municipalities
    .map((name) => MUNICIPALITY_SEO.find((m) => m.name === name))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .slice(0, 4);

  return (
    <aside
      aria-labelledby="related-services-heading"
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
    >
      <h2 id="related-services-heading" className="text-lg font-semibold text-slate-900">
        ¿Necesitas que lo hagamos nosotros?
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {lines.map((line) => (
          <li key={line}>
            <Link
              href={`/servicios/${line}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:underline"
            >
              {LINE_LABEL[line]} en Medellín
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
        {munis
          .filter((m) => m.slug !== "medellin")
          .map((m) => (
            <li key={m.slug}>
              <Link
                href={`/servicios/${primary}/${m.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-orange-700 hover:underline"
              >
                {LINE_LABEL[primary]} en {m.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
