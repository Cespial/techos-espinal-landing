import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND, INK } from "@/lib/brand";
import { BRAND_HORIZONTAL } from "@/lib/brand-layout";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/conversion";

export const OG_SIZE = { width: 1200, height: 630 };

/** Embedded fonts and artwork keep build-time rendering independent of the network. */
export async function loadOgAssets(imageName: string) {
  const [m600, m700, m800, logo, illustration] = await Promise.all([
    ...[600, 700, 800].map((weight) => readFile(join(process.cwd(), `assets/fonts/manrope-${weight}.woff`))),
    readFile(join(process.cwd(), "public/brand/espinal-horizontal-color.svg")),
    readFile(join(process.cwd(), "assets/og", `${imageName}.jpg`)),
  ]);
  return {
    fonts: [
      { name: "Manrope", data: m600, weight: 600 as const, style: "normal" as const },
      { name: "Manrope", data: m700, weight: 700 as const, style: "normal" as const },
      { name: "Manrope", data: m800, weight: 800 as const, style: "normal" as const },
    ],
    logo: `data:image/svg+xml;base64,${logo.toString("base64")}`,
    illustration: `data:image/jpeg;base64,${illustration.toString("base64")}`,
  };
}

type OgFrameProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  logo: string;
  illustration: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "right";
};

/** One composition for the five stable PNG URLs and twelve generated municipality cards. */
export function OgFrame({ eyebrow, title, subtitle, logo, illustration, imageFit = "cover", imagePosition = "center" }: OgFrameProps) {
  return (
    <div style={{ width: 1200, height: 630, display: "flex", position: "relative", overflow: "hidden", background: "#FFFFFF", color: INK, fontFamily: "Manrope" }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: 460, height: 630, display: "flex", overflow: "hidden" }}>
        {/* ImageResponse embeds source bytes; next/image is not supported in OG renders. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={illustration} alt="" width={460} height={630} style={{ width: 460, height: 630, objectFit: imageFit, objectPosition: imagePosition }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 8, background: BRAND }} />
      <div style={{ display: "flex", flexDirection: "column", width: 732, padding: "48px 40px 44px 64px" }}>
        {/* Exact outlined brand master: the emblem and custom wordmark are never redrawn here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={300} height={300 * BRAND_HORIZONTAL.height / BRAND_HORIZONTAL.width} />
        <div style={{ display: "flex", marginTop: 34, fontSize: 20, fontWeight: 800, color: BRAND }}>{eyebrow}</div>
        <div style={{ display: "flex", whiteSpace: "pre-wrap", marginTop: 17, fontSize: 56, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08 }}>{title}</div>
        <div style={{ display: "flex", whiteSpace: "pre-wrap", marginTop: 22, maxWidth: 570, fontSize: 24, fontWeight: 600, color: "#5C646B", lineHeight: 1.4 }}>{subtitle}</div>
      </div>
      <div style={{ position: "absolute", left: 64, bottom: 43, display: "flex", alignItems: "center", gap: 26, fontSize: 20, fontWeight: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.91 19.5 19.5 0 0 1 2 2.18 2 2 0 0 1 4 0h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8 7.91a16 16 0 0 0 6 6l1.28-1.24a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" transform="translate(0 1) scale(.92)" />
          </svg>
          {PHONE_DISPLAY.replace("(+57) ", "")}
        </div>
        <div style={{ display: "flex", color: "#5C646B" }}>{new URL(SITE_URL).hostname}</div>
      </div>
    </div>
  );
}

export const STATIC_OG_CARDS = [
  {
    file: "og-default.png", image: "og-fondo", imagePosition: "right" as const,
    eyebrow: "Medellín y Valle de Aburrá", title: "Techos, pintura\ny plomería a domicilio",
    subtitle: "Henrry Espinal y su equipo.\nVisita gratis y precio por escrito.",
  },
  {
    file: "og-techos.png", image: "linea-techos",
    eyebrow: "Medellín y Valle de Aburrá", title: "Techos y cubiertas\na domicilio",
    subtitle: "Reparación de goteras, impermeabilización\ny mantenimiento de techos.",
  },
  {
    file: "og-pintura.png", image: "linea-pintura",
    eyebrow: "Medellín y Valle de Aburrá", title: "Pintura y acabados\na domicilio",
    subtitle: "Preparamos las paredes y pintamos\ntu casa o negocio con buen acabado.",
  },
  {
    file: "og-plomeria.png", image: "linea-plomeria",
    eyebrow: "Medellín y Valle de Aburrá", title: "Plomería\na domicilio",
    subtitle: "Reparamos fugas, destapamos desagües\ny revisamos las tuberías de tu casa.",
  },
  {
    file: "og-blog-servicios.png", image: "og-fondo", imagePosition: "right" as const,
    eyebrow: "El blog de Espinal", title: "Guías para cuidar\ntu casa",
    subtitle: "Techos, pintura y plomería.\nConsejos prácticos para tu hogar.",
  },
] as const;
