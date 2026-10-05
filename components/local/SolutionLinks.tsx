import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LINE_OPTIONS, type ServiceLineId } from "@/lib/conversion";
import { SOLUTIONS, getSolutionsByLine } from "@/lib/solutions";

type Props = {
  linea?: ServiceLineId;
  excludeSlug?: string;
  heading?: string;
  intro?: string;
  tone?: "white" | "slate";
  id?: string;
};

/** Enlaces de servidor por necesidad: misma fuente en catálogo, páginas locales y guías. */
export default function SolutionLinks({
  linea,
  excludeSlug,
  heading = "Encuentra la solución que necesitas",
  intro = "Consulta qué comprende cada trabajo, qué puede cambiar el presupuesto y qué información enviar para cotizar.",
  tone = "white",
  id = "soluciones",
}: Props) {
  const solutions = (linea ? getSolutionsByLine(linea) : SOLUTIONS).filter((item) => item.slug !== excludeSlug);
  if (solutions.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id={`${id}-heading`} className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">{intro}</p>
        <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
          {solutions.map((solution) => (
            <li key={solution.slug} className="border-t border-slate-200">
              <Link href={`/soluciones/${solution.slug}`} className="group flex min-h-36 items-start justify-between gap-5 py-6">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{LINE_OPTIONS.find((line) => line.id === solution.linea)?.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-orange-700">{solution.name}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-700">{solution.summary}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-orange-700 underline decoration-orange-200 underline-offset-4 group-hover:decoration-orange-700">Ver alcance y cotización</span>
                </div>
                <ArrowUpRight aria-hidden="true" className="mt-6 h-5 w-5 shrink-0 text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
