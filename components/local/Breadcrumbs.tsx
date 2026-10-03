import Link from "next/link";
import { buildBreadcrumbSchema, type Crumb } from "@/lib/schema";
import JsonLd from "./JsonLd";

/** Migas visibles + BreadcrumbList. El último elemento es la página actual. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta" className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last || !c.href ? (
                <span className="text-slate-800" aria-current={last ? "page" : undefined}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-slate-900 hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={buildBreadcrumbSchema(items)} />
    </nav>
  );
}
