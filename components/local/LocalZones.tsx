import Image from "next/image";
import type { Illustration } from "@/lib/illustrations";
import type { MunicipalityProfile } from "@/lib/seo-data";
import { joinSectors } from "@/lib/seo-data";

type Props = { municipio: string; profile: MunicipalityProfile; tone?: "white" | "slate" | "paper"; illustration?: Illustration };

/** Sectores de referencia y datos que ayudan a coordinar una visita. */
export default function LocalZones({ municipio, profile, tone = "slate", illustration }: Props) {
  return (
    <section className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : tone === "paper" ? "bg-paper" : "bg-white"}`} aria-labelledby="zones-heading">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${illustration ? "grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center" : ""}`}>
        <div>
          <h2 id="zones-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Zonas que atendemos en {municipio}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Cubrimos todo {municipio}. Algunos sectores de referencia son {joinSectors(profile.sectors, profile.sectors.length)}.
            Puedes consultar atención para {profile.propertyTypes}.
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{profile.bookingNote}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Sectores de ${municipio}`}>
            {profile.sectors.map((sector) => (
              <li key={sector} className="rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
                {sector}
              </li>
            ))}
          </ul>
        </div>
        {illustration && (
          <Image
            src={illustration.src}
            alt={illustration.alt}
            width={illustration.width}
            height={illustration.height}
            sizes="(min-width: 1152px) 480px, (min-width: 768px) 42vw, calc(100vw - 32px)"
            className="h-auto w-full rounded-3xl"
          />
        )}
      </div>
    </section>
  );
}
