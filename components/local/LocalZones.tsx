import Image from "next/image";
import type { MunicipalityProfile } from "@/lib/seo-data";
import { joinSectors } from "@/lib/seo-data";
import type { Illustration } from "@/lib/illustrations";

type Props = {
  municipio: string;
  profile: MunicipalityProfile;
  tone?: "white" | "slate" | "paper";
  illustration?: Illustration;
};

/** Sectores, vivienda y clima del municipio: el contenido propio de cada página local. */
export default function LocalZones({ municipio, profile, tone = "paper", illustration }: Props) {
  const bg = tone === "slate" ? "bg-slate-50" : tone === "paper" ? "bg-paper" : "bg-white";
  return (
    <section className={`border-t border-slate-200 py-16 md:py-24 ${bg}`} aria-labelledby="zones-heading">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${illustration ? "grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center" : ""}`}>
        <div>
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
        {illustration && (
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-paper">
            <Image src={illustration.src} alt={illustration.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
