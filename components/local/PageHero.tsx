import { MapPin } from "lucide-react";
import type { ServiceLineId } from "@/lib/conversion";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";
import CallButton from "./CallButton";
import OwnerCard from "./OwnerCard";

type Props = {
  pageType: PageType;
  h1: string;
  intro: string;
  bullets?: readonly string[];
  municipio?: string;
  linea?: ServiceLineId;
  ctaLabel: string;
  /** Muestra la franja de Henrry debajo del hero. */
  withOwner?: boolean;
};

/** Cabecera de las páginas interiores: H1 con palabra clave, intro única y la acción principal. */
export default function PageHero({ pageType, h1, intro, bullets, municipio, linea, ctaLabel, withOwner = true }: Props) {
  return (
    <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {municipio && (
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {municipio}, Antioquia
          </p>
        )}
        <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">{intro}</p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-5 flex max-w-2xl flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b} className="border-l-2 border-orange-600 pl-3">
                {b}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <WaButton source="hero" pageType={pageType} linea={linea} municipio={municipio} label={ctaLabel} size="lg" />
          <CallButton source="hero" pageType={pageType} linea={linea} municipio={municipio} size="lg" />
        </div>
        {withOwner && (
          <div className="mt-8 max-w-2xl">
            <OwnerCard variant="compact" municipio={municipio} />
          </div>
        )}
      </div>
    </section>
  );
}
