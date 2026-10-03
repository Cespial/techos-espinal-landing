import type { ServiceLineId } from "@/lib/conversion";

export type Illustration = { src: string; alt: string; width: number; height: number };

const LINE_ALT: Record<ServiceLineId, string> = {
  techos: "Ilustración de un techo de teja de barro con canal y escalera, como los que reparamos en el Valle de Aburrá",
  pintura: "Ilustración de una pared a medio pintar con rodillo, escalera y cinta de enmascarar",
  plomeria: "Ilustración del sifón y la llave de paso bajo un lavaplatos, con gotas de agua y una llave inglesa",
};

/** Ilustración vertical (4:5) de cada línea para el hero de servicios y cruzadas. */
export function lineIllustration(linea: ServiceLineId): Illustration {
  return { src: `/illustrations/linea-${linea}.webp`, alt: LINE_ALT[linea], width: 960, height: 1200 };
}

/** Viñeta del paisaje de cada municipio (3:2). `size` «sm» es la miniatura para tarjetas. */
export function municipioIllustration(slug: string, name: string, size: "md" | "sm" = "md"): Illustration {
  return {
    src: `/illustrations/municipio-${slug}${size === "sm" ? "-sm" : ""}.webp`,
    alt: `Ilustración del paisaje de ${name}: casas de teja de barro entre montañas`,
    width: size === "sm" ? 640 : 1200,
    height: size === "sm" ? 427 : 800,
  };
}

export const WORKBENCH: Illustration = {
  src: "/illustrations/equipo-taller.webp",
  alt: "Ilustración de una mesa de trabajo con casco, cinta métrica, brocha, llave y libreta de cotización",
  width: 1200,
  height: 800,
};

export const VALLEY_MAP: Illustration = {
  src: "/illustrations/mapa-valle.webp",
  alt: "Ilustración del Valle de Aburrá: casas de techo de teja entre las montañas y el río Medellín",
  width: 1200,
  height: 800,
};

export function lineIcon(linea: ServiceLineId): string {
  return `/illustrations/icono-${linea}.webp`;
}
