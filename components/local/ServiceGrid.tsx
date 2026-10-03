import { type ServiceItem, type ServiceLineId } from "@/lib/conversion";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";

type Props = {
  pageType: PageType;
  linea: ServiceLineId;
  services: ServiceItem[];
  heading: string;
  intro?: string;
  municipio?: string;
  tone?: "white" | "slate";
};

/** Lista de servicios con precio «desde» y cotización por WhatsApp en cada fila. */
export default function ServiceGrid({ pageType, linea, services, heading, intro, municipio, tone = "white" }: Props) {
  return (
    <section className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`} aria-labelledby={`services-${linea}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id={`services-${linea}`} className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          {intro ?? "Precios de referencia. El valor final te lo doy por escrito después de revisar."}
        </p>
        <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="flex flex-col gap-3 border-t border-slate-200 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight text-slate-900">{s.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.summary}</p>
                <p className="mt-2 text-sm text-slate-900">
                  <span className="text-slate-500">desde </span>
                  <span className="font-semibold tabular-nums">{s.basePrice.replace(" COP", "")}</span>
                </p>
              </div>
              <WaButton
                source="service_card"
                pageType={pageType}
                linea={linea}
                municipio={municipio}
                servicio={s.name}
                label="Cotizar"
                variant="secondary"
                className="shrink-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
