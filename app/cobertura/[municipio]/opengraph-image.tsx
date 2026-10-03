import { ImageResponse } from "next/og";
import { MUNICIPALITY_SEO, getMunicipalitySEO } from "@/lib/seo-data";
import { OG_SIZE, OgFrame, loadFonts, ogImage } from "@/components/og/shared";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Espinal Multiservicios — cobertura local";

export function generateStaticParams() {
  return MUNICIPALITY_SEO.map((m) => ({ municipio: m.slug }));
}

type Props = { params: Promise<{ municipio: string }> };

export default async function Image({ params }: Props) {
  const { municipio } = await params;
  const seo = getMunicipalitySEO(municipio);
  const name = seo?.name ?? "Medellín";
  const [fonts, image] = await Promise.all([loadFonts(), ogImage(`municipio-${seo?.slug ?? "medellin"}`)]);
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Cobertura local"
        title={`Multiservicios en ${name}`}
        subtitle="Techos, pintura y plomería a domicilio en tu municipio."
        footer={`${name} · Antioquia`}
        image={image}
        imageWidth={470}
      />
    ),
    { ...size, fonts },
  );
}
