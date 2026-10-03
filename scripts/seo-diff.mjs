// Captura o compara título, descripción, H1, enlaces internos, JSON-LD y og:image de las URLs clave.
// Uso: node scripts/seo-diff.mjs capture docs/seo/baseline.json   (con `next start -p 3077` corriendo)
//      node scripts/seo-diff.mjs compare docs/seo/baseline.json
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.env.BASE_URL ?? "http://localhost:3077";
const LINES = ["techos", "pintura", "plomeria"];
const MUNIS = ["medellin","envigado","sabaneta","bello","itagui","la-estrella","caldas","copacabana","girardota","rionegro","la-ceja","marinilla"];
const urls = ["/", "/nosotros", "/cobertura", "/blog", "/blog/como-arreglar-gotera-techo",
  ...LINES.map((l) => `/servicios/${l}`),
  ...LINES.flatMap((l) => MUNIS.map((m) => `/servicios/${l}/${m}`)),
  ...MUNIS.map((m) => `/cobertura/${m}`)];
const pick = (html, re) => (html.match(re)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
async function snapshot(path) {
  const html = await (await fetch(BASE + path)).text();
  const title = pick(html, /<title>([^<]*)<\/title>/);
  const description = pick(html, /<meta name="description" content="([^"]*)"/);
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  const internal = new Set([...html.matchAll(/href="(\/(?:servicios|cobertura)\/[^"#?]*)"/g)].map((m) => m[1])).size;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { JSON.parse(m[1]); return "ok"; } catch { return "BROKEN"; } });
  const og = pick(html, /<meta property="og:image" content="([^"]*)"/);
  return { title, description, h1, internal, ld: ld.join(","), og };
}
const [mode, file] = process.argv.slice(2);
const now = Object.fromEntries(await Promise.all(urls.map(async (u) => [u, await snapshot(u)])));
if (mode === "capture") { writeFileSync(file, JSON.stringify(now, null, 2)); console.log(`baseline: ${urls.length} URLs → ${file}`); process.exit(0); }
const base = JSON.parse(readFileSync(file, "utf8"));
let diffs = 0;
for (const u of urls) {
  for (const k of ["title", "description", "h1"]) if (base[u]?.[k] !== now[u][k]) { diffs++; console.log(`✗ ${u} ${k}\n   antes: ${base[u]?.[k]}\n   ahora: ${now[u][k]}`); }
  if ((now[u].internal) < (base[u]?.internal ?? 0)) { diffs++; console.log(`✗ ${u} enlaces internos ${base[u].internal} → ${now[u].internal}`); }
  if (now[u].ld.includes("BROKEN")) { diffs++; console.log(`✗ ${u} JSON-LD roto`); }
  if (!now[u].og) { diffs++; console.log(`✗ ${u} sin og:image`); }
}
console.log(diffs ? `${diffs} diferencias` : `✓ ${urls.length} URLs sin cambios en título/descr/H1; enlaces y JSON-LD OK`);
process.exit(diffs ? 1 : 0);
