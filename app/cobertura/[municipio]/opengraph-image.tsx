import { ImageResponse } from "next/og";
import { MUNICIPALITY_SEO, getMunicipalitySEO } from "@/lib/seo-data";
import { OG_SIZE, OgFrame, loadOgAssets } from "@/components/og/shared";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Espinal Multiservicios — cobertura local";

export function generateStaticParams() {
  return MUNICIPALITY_SEO.map((m) => ({ municipio: m.slug }));
}

type Props = { params: Promise<{ municipio: string }> };

/** The municipality cards are rendered statically at build time. */
export default async function Image({ params }: Props) {
  const { municipio } = await params;
  const seo = getMunicipalitySEO(municipio);
  const name = seo?.name ?? "Medellín";
  const imageName = seo?.slug === "barbosa" ? "og-fondo" : `municipio-${seo?.slug ?? "medellin"}`;
  const { fonts, ...artwork } = await loadOgAssets(imageName);
  return new ImageResponse(
    <OgFrame
      {...artwork}
      eyebrow={`${name} · Antioquia`}
      title={`Multiservicios\nen ${name}`}
      subtitle={"Techos, pintura y plomería.\nVamos a tu casa o negocio."}
      imageFit="contain"
    />,
    { ...size, fonts },
  );
}
