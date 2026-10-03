import Link from "next/link";

type Group = { heading: string; links: { href: string; label: string }[] };

/** Enlaces internos de la página: otras líneas, otros municipios, guías. */
export default function RelatedLinks({ groups, tone = "slate" }: { groups: Group[]; tone?: "white" | "slate" }) {
  return (
    <section className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`} aria-label="Enlaces relacionados">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.heading}>
            <h2 className="text-base font-bold tracking-tight text-slate-900">{g.heading}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-3.5 text-sm text-slate-700 hover:border-orange-300 hover:text-orange-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
