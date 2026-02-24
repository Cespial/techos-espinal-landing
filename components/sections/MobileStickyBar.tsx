"use client";

import { Phone } from "lucide-react";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type MobileStickyBarProps = {
  waLink: string;
  telLink: string;
};

export default function MobileStickyBar({ waLink, telLink }: MobileStickyBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("cta_whatsapp_click", { source: "mobile_bar" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-xs font-semibold text-slate-900 active:scale-[0.98] sm:text-sm"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Pedir cotización
        </a>
        <a
          href={telLink}
          onClick={() => track("cta_call_click", { source: "mobile_bar" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Llamar
        </a>
      </div>
    </div>
  );
}
