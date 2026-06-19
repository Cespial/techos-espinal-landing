import type { MetadataRoute } from "next";
import { COMPANY_NAME } from "@/lib/conversion";

// Iconos referenciados (icon-192.png / icon-512.png / maskable-512.png) los entrega
// el paquete de diseño y se ubican en /public. Hasta entonces, Next.js sirve el
// manifest igual; los íconos faltantes solo afectan la instalación PWA.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: "Espinal",
    description:
      "Servicios para el hogar en Medellín y el Valle de Aburrá: techos y cubiertas, pintura y acabados, plomería.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
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
