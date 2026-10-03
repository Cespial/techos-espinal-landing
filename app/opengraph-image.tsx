import { ImageResponse } from "next/og";
import { OG_SIZE, OgFrame, loadFonts, ogImage } from "@/components/og/shared";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Espinal Multiservicios: techos, pintura y plomería a domicilio en Medellín";

export default async function Image() {
  const [fonts, image] = await Promise.all([loadFonts(), ogImage("og-fondo")]);
  return new ImageResponse(
    (
      <OgFrame
        title="Techos, pintura y plomería a domicilio"
        subtitle="Visita técnica gratis, precio por escrito y garantía firmada. Equipo de Henrry Espinal."
        footer="Medellín y Valle de Aburrá"
        image={image}
        imageWidth={520}
        imagePosition="right"
      />
    ),
    { ...size, fonts },
  );
}
