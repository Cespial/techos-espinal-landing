import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND, INK } from "@/lib/brand";

export const OG_SIZE = { width: 1200, height: 630 };

/** Fuentes Manrope para Satori. */
export async function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [m600, m700, m800] = await Promise.all([
    readFile(join(dir, "manrope-600.woff")),
    readFile(join(dir, "manrope-700.woff")),
    readFile(join(dir, "manrope-800.woff")),
  ]);
  return [
    { name: "Manrope", data: m600, weight: 600 as const, style: "normal" as const },
    { name: "Manrope", data: m700, weight: 700 as const, style: "normal" as const },
    { name: "Manrope", data: m800, weight: 800 as const, style: "normal" as const },
  ];
}

/** Ilustración de assets/og como data URL (Satori no lee rutas ni WebP). */
export async function ogImage(name: string) {
  const buf = await readFile(join(process.cwd(), "assets/og", `${name}.jpg`));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

export function Iso({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect width="100" height="100" rx="23" fill={BRAND} />
      <g fill="none" stroke="#fff" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 52 L50 28 L76 52" />
        <path d="M31 50 L31 72 L69 72 L69 50" />
      </g>
      <rect x="44.5" y="58" width="11" height="14" rx="2" fill="#fff" />
    </svg>
  );
}

export function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
      <Iso s={58} />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "31px", fontWeight: 800, letterSpacing: "-0.03em", color: INK }}>Espinal</span>
        <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "#6e6e6b", marginTop: "7px" }}>
          Multiservicios
        </span>
      </div>
    </div>
  );
}

export function PhoneIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Plantilla común: texto a la izquierda, ilustración a la derecha, barra de marca arriba. */
export function OgFrame({ eyebrow, title, subtitle, footer, image, imageWidth = 470, imagePosition = "center" }: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  footer: string;
  image: string;
  imageWidth?: number;
  imagePosition?: "center" | "right";
}) {
  return (
    <div style={{ width: "1200px", height: "630px", display: "flex", background: "#ffffff", fontFamily: "Manrope", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "12px", background: BRAND }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "72px 56px 56px 64px" }}>
        <Brand />
        {eyebrow && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", alignSelf: "flex-start", marginTop: "44px", padding: "9px 18px", borderRadius: "999px", background: "#fff1ea", color: BRAND, fontSize: "18px", fontWeight: 800 }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "999px", background: BRAND }} />
            {eyebrow}
          </div>
        )}
        <div style={{ display: "flex", marginTop: eyebrow ? "22px" : "48px", fontSize: "56px", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, color: INK }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: "18px", fontSize: "24px", fontWeight: 600, color: "#4a4a48", lineHeight: 1.35 }}>{subtitle}</div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: 800, color: INK }}>
            <PhoneIcon />
            300 733 6333
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: 800, color: INK }}>
            <PinIcon />
            {footer}
          </div>
        </div>
      </div>
      <div style={{ width: `${imageWidth}px`, height: "630px", display: "flex", background: "#f6f1e9", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" width={imageWidth} height={630} style={{ width: `${imageWidth}px`, height: "630px", objectFit: "cover", objectPosition: imagePosition }} />
      </div>
    </div>
  );
}
