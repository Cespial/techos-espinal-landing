import type { ServiceLineId } from "@/lib/conversion";
import { OWNER } from "@/lib/owner";
import type { CtaSource, PageType } from "@/lib/tracking";
import WaButton from "./WaButton";
import CallButton from "./CallButton";

type Props = {
  pageType: PageType;
  heading: string;
  body: string;
  linea?: ServiceLineId;
  municipio?: string;
  source?: CtaSource;
};

/** Banda de cierre: una pregunta directa y las dos formas de contactar a Henrry. */
export default function CtaBand({ pageType, heading, body, linea, municipio, source = "final_cta" }: Props) {
  return (
    <section className="border-t border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div className="max-w-xl">
            <p className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{heading}</p>
            <p className="mt-2 text-base text-slate-700">{body}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <WaButton source={source} pageType={pageType} linea={linea} municipio={municipio} label={`Escribirle a ${OWNER.givenName}`} size="lg" />
            <CallButton source={source} pageType={pageType} linea={linea} municipio={municipio} size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
