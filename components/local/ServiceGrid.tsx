import Image from "next/image";
import { type ServiceItem, type ServiceLineId } from "@/lib/conversion";
import { lineIcon } from "@/lib/illustrations";
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
        <Image src={lineIcon(linea)} alt="" width={56} height={56} className="h-14 w-14 mix-blend-multiply" aria-hidden="true" />
        <h2 id={`services-${linea}`} className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          {intro ?? "Precios de referencia. El valor final te lo damos por escrito después de revisar."}
        </p>
        <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="grid gap-3 border-t border-slate-200 py-5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-5">
              <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight text-slate-900">{s.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.summary}</p>
              </div>
              <p className="text-sm text-slate-900 sm:min-w-[7.5rem] sm:text-right">
                <span className="text-slate-600">desde </span>
                <span className="font-semibold tabular-nums">{s.basePrice.replace(" COP", "")}</span>
              </p>
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
