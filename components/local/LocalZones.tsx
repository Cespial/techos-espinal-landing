import type { MunicipalityProfile } from "@/lib/seo-data";
import { joinSectors } from "@/lib/seo-data";

type Props = { municipio: string; profile: MunicipalityProfile; tone?: "white" | "slate" };

/** Sectores, vivienda y clima del municipio: el contenido propio de cada página local. */
export default function LocalZones({ municipio, profile, tone = "slate" }: Props) {
  return (
    <section className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`} aria-labelledby="zones-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="zones-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Zonas que atendemos en {municipio}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
          Cubrimos todo {municipio}, incluidos {joinSectors(profile.sectors, profile.sectors.length)}. Trabajamos sobre todo en{" "}
          {profile.housing}.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{profile.climate}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Sectores de ${municipio}`}>
          {profile.sectors.map((sector) => (
            <li key={sector} className="rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
              {sector}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
