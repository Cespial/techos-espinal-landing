// Convierte las piezas elegidas del set 2 (PNG sueltos de Midjourney) en los WebP que usa el sitio.
// Uso: node scripts/ilustraciones.mjs ~/Downloads/mj/set2/elegidas
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const out = (p) => join(process.cwd(), "public", p);
const kb = (p) => Math.round(statSync(p).size / 1024);
const SPEC = {
  linea: [{ w: 960, h: 1200, q: 72, suffix: "" }],
  municipio: [{ w: 1200, h: 800, q: 72, suffix: "" }, { w: 640, h: 427, q: 74, suffix: "-sm" }],
  "equipo-taller": [{ w: 1200, h: 800, q: 72, suffix: "" }],
  "og-fondo": [{ w: 1456, h: 816, q: 82, suffix: "" }],
};
for (const f of readdirSync(dir).filter((f) => f.endsWith(".png")).sort()) {
  const name = f.replace(/\.png$/, "");
  const kind = name.startsWith("linea-") ? "linea" : name.startsWith("municipio-") ? "municipio" : name;
  for (const s of SPEC[kind] ?? []) {
    const dest = out(`illustrations/${name}${s.suffix}.webp`);
    await sharp(join(dir, f)).resize(s.w, s.h, { fit: "cover" }).webp({ quality: s.q }).toFile(dest);
    console.log(`${name}${s.suffix}.webp ${s.w}×${s.h} ${kb(dest)} KB`);
  }
}
// La línea de techos reutiliza el hero existente.
await sharp(out("illustrations/hero-techo.webp")).toFile(out("illustrations/linea-techos.webp"));
console.log("linea-techos.webp (copia de hero-techo)");

// Copias JPEG para las imágenes Open Graph generadas con Satori (no lee WebP).
const ogDir = join(process.cwd(), "assets/og");
const { mkdirSync } = await import("node:fs");
mkdirSync(ogDir, { recursive: true });
const ogJobs = [
  ["og-fondo", 1456, 816], ["linea-techos", 960, 1200], ["linea-pintura", 960, 1200], ["linea-plomeria", 960, 1200],
  ...["medellin","envigado","sabaneta","bello","itagui","la-estrella","caldas","copacabana","girardota","rionegro","la-ceja","marinilla"].map((m) => [`municipio-${m}`, 900, 600]),
];
for (const [name, w, h] of ogJobs) {
  const dest = join(ogDir, `${name}.jpg`);
  await sharp(out(`illustrations/${name}.webp`)).resize(w, h, { fit: "cover" }).jpeg({ quality: 82 }).toFile(dest);
  console.log(`assets/og/${name}.jpg ${kb(dest)} KB`);
}
