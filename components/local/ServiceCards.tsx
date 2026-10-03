import Link from "next/link";
import { SERVICE_DATA, LINE_OPTIONS, LINE_STORY, type ServiceLineId } from "@/lib/conversion";
import { LINE_ACCENT } from "@/lib/service-icons";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";

type Props = { pageType: PageType; municipio?: string };

/**
 * Las tres líneas con sus servicios más pedidos y el precio «desde», visibles sin
 * clics ni pestañas. Cada fila cotiza por WhatsApp; cada línea enlaza a su página.
 */
export default function ServiceCards({ pageType, municipio }: Props) {
  return (
    <section id="servicios" className="border-t border-slate-200 bg-slate-50 py-16 md:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="services-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          ¿Qué necesitas arreglar?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Precios de referencia por servicio. El valor final te lo doy por escrito después de revisar.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {LINE_OPTIONS.map((line) => {
            const id = line.id as ServiceLineId;
            const accent = LINE_ACCENT[id];
            const services = SERVICE_DATA[id].slice(0, 4);
            return (
              <article key={id} className="flex flex-col rounded-3xl border border-slate-200 bg-white">
                <div className={`border-b border-slate-200 p-6 border-t-4 rounded-t-3xl ${accent.accentBar.replace("bg-", "border-t-")}`}>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">{line.label}</h3>
                  <p className="mt-1 text-sm text-slate-600">{LINE_STORY[id].summary}</p>
                </div>
                <ul className="flex-1 divide-y divide-slate-100 px-6">
                  {services.map((service) => (
                    <li key={service.id} className="flex items-baseline justify-between gap-3 py-3">
                      <span className="text-sm text-slate-800">{service.name}</span>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                        <span className="font-normal text-slate-500">desde </span>
                        {service.basePrice.replace(" COP", "")}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 p-6 pt-4">
                  <WaButton source="service_card" pageType={pageType} linea={id} municipio={municipio} label={`Cotizar ${line.label.toLowerCase()}`} />
                  <Link href={`/servicios/${id}`} className="inline-flex min-h-10 items-center justify-center text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
                    Ver los {SERVICE_DATA[id].length} servicios de {line.label.toLowerCase()}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-slate-600">
          ¿No sabes qué es?{" "}
          <WaButton source="service_card" pageType={pageType} intent="duda" municipio={municipio} label="Descríbeme el problema por WhatsApp" variant="inline" />{" "}
          y te digo qué servicio aplica.
        </p>
      </div>
    </section>
  );
}
