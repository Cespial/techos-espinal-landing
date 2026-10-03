import { PROCESS_STEPS, type ServiceLineId } from "@/lib/conversion";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";

type Props = { pageType: PageType; municipio?: string; linea?: ServiceLineId; heading?: string };

/** Los cuatro pasos del servicio, como lista ordenada: es una secuencia real. */
export default function ProcessSteps({ pageType, municipio, linea, heading }: Props) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="process-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {heading ?? (municipio ? `Así trabajamos en ${municipio}` : "Así trabajamos")}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} className="border-t-2 border-slate-900 pt-4">
              <span className="text-sm font-semibold tabular-nums text-slate-600">Paso {step.step}</span>
              <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.detail}</p>
              <p className="mt-2 text-xs text-slate-600">{step.note}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <WaButton source="process" pageType={pageType} linea={linea} municipio={municipio} label="Empezar por el paso 1" size="lg" />
        </div>
      </div>
    </section>
  );
}
