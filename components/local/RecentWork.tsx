import Image from "next/image";
import { RECENT_WORK } from "@/lib/owner";

/** Fotos reales de trabajos. No se muestra nada hasta que existan. */
export default function RecentWork() {
  if (RECENT_WORK.length === 0) return null;
  return (
    <section className="border-t border-slate-200 py-16 md:py-24" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="work-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Trabajos recientes
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {RECENT_WORK.map((photo) => (
            <li key={photo.src} className="overflow-hidden rounded-2xl bg-slate-100">
              <Image src={photo.src} alt={photo.alt} width={800} height={600} className="aspect-[4/3] h-auto w-full object-cover" />
              <p className="px-3 py-2 text-xs text-slate-600">{photo.municipio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
