import type { ServiceLineId } from "@/lib/conversion";

export type Illustration = { src: string; alt: string; width: number; height: number };

const LINE_ALT: Record<ServiceLineId, string> = {
  techos: "Ilustración de un techo de teja de barro con canal y escalera",
  pintura: "Ilustración de una pared con rodillo, escalera y cinta de enmascarar",
  plomeria: "Ilustración de las tuberías bajo un lavaplatos, con gotas de agua y una llave inglesa",
};

/** Escenas editoriales; no representan trabajos realizados por la empresa. */
export function lineIllustration(linea: ServiceLineId): Illustration {
  return { src: `/illustrations/linea-${linea}.webp`, alt: LINE_ALT[linea], width: 960, height: 1200 };
}

/** Paisajes decorativos junto al nombre del municipio; no son mapas ni vistas exactas. */
export function municipioIllustration(slug: string, size: "md" | "sm" = "md"): Illustration {
  return {
    src: `/illustrations/municipio-${slug}${size === "sm" ? "-sm" : ""}.webp`,
    alt: "",
    width: size === "sm" ? 640 : 1200,
    height: size === "sm" ? 427 : 800,
  };
}

export const WORKBENCH: Illustration = {
  src: "/illustrations/equipo-taller.webp",
  alt: "Ilustración de una mesa de trabajo con casco, cinta métrica, brocha, llave y libreta",
  width: 1200,
  height: 800,
};

export const VALLEY_MAP: Illustration = {
  src: "/illustrations/mapa-valle.webp",
  alt: "",
  width: 1200,
  height: 800,
};
