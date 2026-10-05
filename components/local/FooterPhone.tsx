"use client";

import { usePathname } from "next/navigation";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/conversion";
import { trackCall, trackingContextFromPath } from "@/lib/tracking";

/** Mantiene el enlace telefónico nativo y registra solo contexto público. */
export default function FooterPhone() {
  const pathname = usePathname();
  return (
    <a
      href={`tel:${PHONE_E164}`}
      className="font-semibold text-slate-900 hover:underline"
      onClick={() => trackCall({ source: "footer", ...trackingContextFromPath(pathname) })}
    >
      {PHONE_DISPLAY}
    </a>
  );
}
