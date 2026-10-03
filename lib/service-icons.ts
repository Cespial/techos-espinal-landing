import type { LucideIcon } from "lucide-react";
import {
  Shield,
  CloudRain,
  ArrowDownToLine,
  Layers,
  Replace,
  Wrench,
  Sparkles,
  ScanLine,
  Home,
  Building,
  Hammer,
  Ruler,
  Droplet,
  Fence,
  Eraser,
  PaintRoller,
  Droplets,
  Drill,
  Settings,
  Search,
  ShowerHead,
  Toilet,
  Gauge,
  Cylinder,
} from "lucide-react";
import type { ServiceLineId } from "@/lib/conversion";

/* ------------------------------------------------------------------ */
/*  SERVICE_ICON_MAP — one Lucide icon per service                     */
/* ------------------------------------------------------------------ */

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  // Techos
  "impermeabilizacion-cubiertas": Shield,
  "reparacion-goteras": CloudRain,
  "mantenimiento-canoas": ArrowDownToLine,
  "sellado-fisuras": Layers,
  "cambio-teja-puntual": Replace,
  "ajuste-bajantes": Wrench,
  "limpieza-cubierta": Sparkles,
  "revision-puntos-criticos": ScanLine,

  // Pintura
  "pintura-interior": Home,
  "pintura-exterior": Building,
  "resanes-acabados": Hammer,
  "estuco-pulido": Ruler,
  "correccion-humedad-superficial": Droplet,
  "pintura-rejas-barandas": Fence,
  "retoques-post-obra": Eraser,
  "acabado-fachada": PaintRoller,

  // Plomería
  "reparacion-fugas": Droplets,
  "destape-desagues": Drill,
  "ajustes-hidrosanitarios": Settings,
  "deteccion-fuga-visible": Search,
  "cambio-griferia": ShowerHead,
  "ajuste-sanitario": Toilet,
  "revision-presion": Gauge,
  "mantenimiento-red-interna": Cylinder,
};

/* ------------------------------------------------------------------ */
/*  LINE_ACCENT — Tailwind color classes per service line              */
/* ------------------------------------------------------------------ */

export type LineAccent = {
  iconBg: string;
  iconText: string;
  priceBg: string;
  priceText: string;
  accentBar: string;
  /** Clase completa (Tailwind v4 no genera clases construidas en tiempo de ejecución). */
  borderTop: string;
};

export const LINE_ACCENT: Record<ServiceLineId, LineAccent> = {
  techos: {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    priceBg: "bg-orange-50",
    priceText: "text-orange-700",
    accentBar: "bg-orange-500",
    borderTop: "border-t-orange-600",
  },
  pintura: {
    iconBg: "bg-cyan-100",
    iconText: "text-cyan-600",
    priceBg: "bg-cyan-50",
    priceText: "text-cyan-700",
    accentBar: "bg-cyan-500",
    borderTop: "border-t-cyan-600",
  },
  plomeria: {
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    priceBg: "bg-emerald-50",
    priceText: "text-emerald-700",
    accentBar: "bg-emerald-500",
    borderTop: "border-t-emerald-600",
  },
};
