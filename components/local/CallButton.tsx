"use client";

import { Phone } from "lucide-react";
import { buildTelLink, PHONE_DISPLAY, type ServiceLineId } from "@/lib/conversion";
import { trackCall, type CtaSource, type PageType } from "@/lib/tracking";

type Props = {
  source: CtaSource;
  pageType: PageType;
  linea?: ServiceLineId;
  municipio?: string;
  label?: string;
  variant?: "secondary" | "ghost" | "icon";
  size?: "md" | "lg";
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:scale-[0.99]";
const VARIANT = {
  secondary: "border border-slate-300 bg-white text-slate-900 hover:border-slate-900",
  ghost: "text-slate-900 hover:bg-slate-100",
  icon: "h-12 w-12 shrink-0 border border-slate-300 bg-white text-slate-700 hover:border-slate-900",
};
const SIZE = { md: "min-h-11 px-4 text-sm", lg: "min-h-13 px-6 text-base" };

/** Único botón de llamada del sitio: registra la conversión. */
export default function CallButton({
  source,
  pageType,
  linea,
  municipio,
  label = `Llamar al ${PHONE_DISPLAY.replace("(+57) ", "")}`,
  variant = "secondary",
  size = "md",
  className = "",
}: Props) {
  return (
    <a
      href={buildTelLink()}
      onClick={() =>
        trackCall({ source, page_type: pageType, linea: linea ?? "general", municipio: municipio ?? "general" })
      }
      aria-label={variant === "icon" ? `Llamar al ${PHONE_DISPLAY}` : undefined}
      className={`${BASE} ${VARIANT[variant]} ${variant === "icon" ? "" : SIZE[size]} ${className}`}
    >
      <Phone className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} aria-hidden="true" />
      {variant !== "icon" && label}
    </a>
  );
}
