"use client";

import { buildWaLink, type WaLinkOptions } from "@/lib/conversion";
import { trackWhatsApp, type CtaSource, type PageType } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = WaLinkOptions & {
  source: CtaSource;
  pageType: PageType;
  label: string;
  variant?: "primary" | "secondary" | "inline";
  size?: "md" | "lg";
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] active:scale-[0.99]";
const VARIANT = {
  primary: "bg-[#15803d] text-white hover:bg-[#166d34] shadow-[0_8px_24px_-12px_rgba(21,128,61,0.6)]",
  secondary: "border-2 border-[#15803d] bg-white text-[#166534] hover:bg-[#15803d] hover:text-white",
  inline: "text-[#166534] underline decoration-[#15803d]/40 underline-offset-4 hover:decoration-[#15803d] rounded-none",
};
const SIZE = { md: "min-h-11 px-4 text-sm", lg: "min-h-13 px-6 text-base" };

/** Único botón de WhatsApp del sitio: construye el mensaje y registra la conversión. */
export default function WaButton({
  source,
  pageType,
  label,
  variant = "primary",
  size = "md",
  className = "",
  ...wa
}: Props) {
  const href = buildWaLink(wa);
  const municipio = wa.municipio?.toLowerCase().normalize("NFD").replace(/[^a-z\s-]/g, "").trim().replace(/\s+/g, "-");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() =>
        trackWhatsApp({
          source,
          page_type: pageType,
          linea: wa.linea ?? "general",
          municipio: municipio || "general",
          servicio: wa.servicio,
        })
      }
      className={`${BASE} ${VARIANT[variant]} ${variant === "inline" ? "" : SIZE[size]} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
