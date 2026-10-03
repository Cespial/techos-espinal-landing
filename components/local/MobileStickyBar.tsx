import type { ServiceLineId } from "@/lib/conversion";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";
import CallButton from "./CallButton";

type Props = { pageType: PageType; linea?: ServiceLineId; municipio?: string; servicio?: string };

/** Barra fija inferior en móvil: la acción principal siempre a un toque. */
export default function MobileStickyBar({ pageType, linea, municipio, servicio }: Props) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <WaButton
          source="sticky_bar"
          pageType={pageType}
          linea={linea}
          municipio={municipio}
          servicio={servicio}
          label="Escribir a Henrry"
          size="lg"
          className="flex-1"
        />
        <CallButton source="sticky_bar" pageType={pageType} linea={linea} municipio={municipio} variant="icon" />
      </div>
    </div>
  );
}
