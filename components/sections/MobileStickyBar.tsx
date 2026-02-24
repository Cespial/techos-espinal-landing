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
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("cta_whatsapp_click", { source: "mobile_bar" })}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#15803d] px-3 text-sm font-bold text-white active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Cotizar por WhatsApp
        </a>
        <a
          href={telLink}
          onClick={() => track("cta_call_click", { source: "mobile_bar" })}
          aria-label="Llamar"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white active:scale-[0.98]"
        >
          <Phone className="h-5 w-5 text-slate-700" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
