import { ImageResponse } from "next/og";
import { SERVICE_LINE_SEO, getServiceLineSEO } from "@/lib/seo-data";
import { OG_SIZE, OgFrame, loadFonts, ogImage } from "@/components/og/shared";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Espinal Multiservicios: servicios a domicilio en Medellín";

export function generateStaticParams() {
  return SERVICE_LINE_SEO.map((s) => ({ linea: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ linea: string }> }) {
  const { linea } = await params;
  const seo = getServiceLineSEO(linea);
  const [fonts, image] = await Promise.all([loadFonts(), ogImage(`linea-${seo?.slug ?? "techos"}`)]);
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Servicio a domicilio"
        title={seo?.heroTitle ?? "Espinal Multiservicios"}
        subtitle={seo?.heroDescription ?? ""}
        footer="Medellín y Valle de Aburrá"
        image={image}
        imageWidth={470}
      />
    ),
    { ...size, fonts },
  );
}
