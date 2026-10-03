import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { COMPANY_NAME } from "@/lib/conversion";

// Iconos de marca (icon-192/512, maskable-512) entregados por el Espinal Design System,
// ubicados en /public. El favicon.ico, icon.svg y apple-icon.png viven en /app
// (auto-detectados por Next.js como <link> en el <head>).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: "Espinal",
    description:
      "Servicios para el hogar en Medellín y el Valle de Aburrá: techos y cubiertas, pintura y acabados, plomería.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: BRAND,
    lang: "es-CO",
    categories: ["business", "utilities"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
