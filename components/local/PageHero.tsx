import Image from "next/image";
import { MapPin } from "lucide-react";
import type { ServiceLineId } from "@/lib/conversion";
import type { PageType } from "@/lib/tracking";
import type { Illustration } from "@/lib/illustrations";
import { OWNER } from "@/lib/owner";
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
  /** Ilustración de la línea o del municipio; va a la derecha con la franja de Henrry encima. */
  illustration?: Illustration;
  /** Muestra la franja de Henrry (debajo del texto si no hay ilustración). */
  withOwner?: boolean;
};

/** Cabecera de las páginas interiores: H1 con palabra clave, intro única y la acción principal. */
export default function PageHero({ pageType, h1, intro, bullets, municipio, linea, ctaLabel, illustration, withOwner = true }: Props) {
  const portrait = illustration ? illustration.height > illustration.width : false;
  return (
    <section className="bg-white pb-12 pt-6 md:pb-16 md:pt-10">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${illustration ? "grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center" : ""}`}>
        <div>
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
                <li key={b} className="border-l-2 border-brand pl-3">
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WaButton source="page_hero" pageType={pageType} linea={linea} municipio={municipio} label={ctaLabel} size="lg" />
            <CallButton source="page_hero" pageType={pageType} linea={linea} municipio={municipio} size="lg" />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <span className="h-2 w-2 shrink-0 rounded-full bg-wa" aria-hidden="true" />
            {OWNER.promise}
          </p>
          {withOwner && !illustration && (
            <div className="mt-8 max-w-2xl">
              <OwnerCard variant="compact" municipio={municipio} />
            </div>
          )}
        </div>
        {illustration && (
          <div className="relative">
            <div className={`relative overflow-hidden rounded-3xl bg-paper ${portrait ? "aspect-[4/3] md:aspect-[4/5]" : "aspect-[3/2]"}`}>
              <Image
                src={illustration.src}
                alt={illustration.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className={`object-cover ${portrait ? "object-top" : ""}`}
              />
            </div>
            {withOwner && (
              <div className="relative -mt-10 px-4 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:translate-y-6 md:px-6">
                <OwnerCard variant="compact" municipio={municipio} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
