"use client";

import { Phone } from "lucide-react";
import { track } from "@/lib/tracking";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

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
          Pedir cotizacion
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
