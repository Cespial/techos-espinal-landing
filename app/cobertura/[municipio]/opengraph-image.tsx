import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MUNICIPALITY_SEO, getMunicipalitySEO } from "@/lib/seo-data";
import { BRAND, BRAND_SOFT, INK, PAPER } from "@/lib/brand";
import { BRAND_HORIZONTAL } from "@/lib/brand-layout";
import { PHONE_DISPLAY } from "@/lib/conversion";

// OG dinámico por municipio (1200×630), replica la plantilla del Espinal Design System
// (og/og-render.js, línea "servicios" / "Cobertura local"). Se genera estáticamente:
// una imagen por municipio en build (generateStaticParams), sin coste en runtime.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Espinal Multiservicios — cobertura local";

export function generateStaticParams() {
  return MUNICIPALITY_SEO.map((m) => ({ municipio: m.slug }));
}

const SOFT = BRAND_SOFT;

type Props = { params: Promise<{ municipio: string }> };

export default async function Image({ params }: Props) {
  const { municipio } = await params;
  const seo = getMunicipalitySEO(municipio);
  const name = seo?.name ?? "Medellín";

  const fontsDir = join(process.cwd(), "assets/fonts");
  const [m600, m700, m800, logoFile, symbolFile] = await Promise.all([
    readFile(join(fontsDir, "manrope-600.woff")),
    readFile(join(fontsDir, "manrope-700.woff")),
    readFile(join(fontsDir, "manrope-800.woff")),
    readFile(join(process.cwd(), "public/brand/espinal-horizontal-color.svg")),
    readFile(join(process.cwd(), "public/brand/espinal-symbol-color.svg")),
  ]);

  const logo = `data:image/svg+xml;base64,${logoFile.toString("base64")}`;
  const symbol = `data:image/svg+xml;base64,${symbolFile.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: PAPER,
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        {/* Barra de acento superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "12px",
            background: BRAND,
          }}
        />

        {/* Columna izquierda */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "54px 64px 60px",
          }}
        >
          {/* Marca */}
          <div style={{ display: "flex" }}>
            <BrandAsset source={logo} width={300} height={300 * BRAND_HORIZONTAL.height / BRAND_HORIZONTAL.width} />
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              alignSelf: "flex-start",
              marginTop: "32px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: SOFT,
              color: BRAND,
              fontSize: "19px",
              fontWeight: 800,
            }}
          >
            <div style={{ width: "11px", height: "11px", borderRadius: "999px", background: BRAND }} />
            Cobertura local
          </div>

          {/* Título */}
          <div
            style={{
              display: "flex",
              marginTop: "26px",
              fontSize: "62px",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.03,
              color: INK,
              maxWidth: "660px",
            }}
          >
            Multiservicios en {name}
          </div>

          {/* Subtítulo */}
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "25px",
              fontWeight: 600,
              color: INK,
              maxWidth: "580px",
              lineHeight: 1.35,
            }}
          >
            Techos, pintura y plomería a domicilio en tu municipio.
          </div>

          {/* Footer */}
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: 800, color: INK }}>
              <PhoneIcon />
              {PHONE_DISPLAY.replace("(+57) ", "")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: 800, color: INK }}>
              <PinIcon />
              {name} · Antioquia
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div
          style={{
            width: "430px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: SOFT,
            position: "relative",
          }}
        >
          <svg
            width="215"
            height="215"
            viewBox="0 0 24 24"
            fill="none"
            stroke={BRAND}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <div style={{ position: "absolute", right: "32px", bottom: "32px", display: "flex" }}>
            <BrandAsset source={symbol} width={56} height={56} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: m600, weight: 600, style: "normal" },
        { name: "Manrope", data: m700, weight: 700, style: "normal" },
        { name: "Manrope", data: m800, weight: 800, style: "normal" },
      ],
    },
  );
}

function BrandAsset({ source, width, height }: { source: string; width: number; height: number }) {
  // ImageResponse consumes embedded image bytes; next/image is not supported here.
  return <img src={source} alt="" width={width} height={height} />;
}

function PhoneIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
